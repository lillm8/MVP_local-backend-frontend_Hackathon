"""Order repository with transactional creation and state transitions."""
from datetime import datetime, timezone
from typing import Optional
from uuid import UUID

from sqlalchemy import Select, and_, func, select, text, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.carts.models import Cart, CartItem, CartStatus
from app.domain.orders.models import IdempotencyKey, Order, OrderStatus
from app.domain.products.models import Product


class OrderRepository:
    """Repository handling transactional order creation and updates."""

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_id(self, order_id: UUID) -> Optional[Order]:
        stmt = select(Order).where(Order.id == order_id, Order.deleted_at.is_(None))
        res = await self.session.execute(stmt)
        return res.scalar_one_or_none()

    async def list_all(
        self,
        limit: int = 50,
        offset: int = 0,
        restaurant_id: Optional[UUID] = None,
        supplier_id: Optional[UUID] = None,
        status: Optional[str] = None,
    ) -> tuple[list[Order], int]:
        base = select(Order).where(Order.deleted_at.is_(None))
        if restaurant_id:
            base = base.where(Order.buyer_restaurant_id == restaurant_id)
        if supplier_id:
            base = base.where(Order.supplier_id == supplier_id)
        if status:
            base = base.where(Order.status == status)

        count = (await self.session.execute(select(func.count()).select_from(base.subquery()))).scalar_one()
        result = await self.session.execute(base.order_by(Order.created_at.desc()).limit(limit).offset(offset))
        return list(result.scalars().all()), count

    async def get_idempotency(self, key: str) -> Optional[IdempotencyKey]:
        stmt = select(IdempotencyKey).where(IdempotencyKey.key == key)
        res = await self.session.execute(stmt)
        return res.scalar_one_or_none()

    async def create_order_transactional(
        self,
        *,
        idempotency_key: str,
        cart_id: UUID,
        buyer_restaurant_id: UUID,
        supplier_id: UUID,
        created_by_account_id: UUID,
        payment_method: str,
    ) -> Order:
        """
        Transactional order creation with SELECT ... FOR UPDATE and stock decrement.
        Enforces idempotency via idempotency_keys table.
        """
        async with self.session.begin():
            existing_key = await self.get_idempotency(idempotency_key)
            if existing_key and existing_key.order_id:
                # Return existing order
                order = await self.get_by_id(existing_key.order_id)
                if order:
                    return order
            elif existing_key:
                # In-progress duplicate
                from app.core.errors import ConflictError

                raise ConflictError("Duplicate idempotency key in progress")

            # Insert idempotency key placeholder
            new_key = IdempotencyKey(
                key=idempotency_key,
                order_id=None,
                created_at=datetime.now(timezone.utc),
            )
            self.session.add(new_key)

            # Lock cart and items
            cart = (
                await self.session.execute(
                    select(Cart).where(Cart.id == cart_id, Cart.deleted_at.is_(None)).with_for_update()
                )
            ).scalar_one_or_none()
            if not cart or cart.status != CartStatus.OPEN:
                from app.core.errors import ConflictError

                raise ConflictError("Cart not open or not found")

            items = (
                await self.session.execute(
                    select(CartItem).where(CartItem.cart_id == cart_id, CartItem.deleted_at.is_(None)).with_for_update()
                )
            ).scalars().all()
            if not items:
                from app.core.errors import ConflictError

                raise ConflictError("Cart is empty")

            total_cents = 0
            tax_cents = 0

            # Lock products and check stock
            for item in items:
                product = (
                    await self.session.execute(
                        select(Product).where(Product.id == item.product_id, Product.deleted_at.is_(None)).with_for_update()
                    )
                ).scalar_one_or_none()
                if not product:
                    from app.core.errors import ConflictError

                    raise ConflictError("Product not found during order creation")
                # Quantity is numeric; convert to int cents math using stored snapshot
                line_total = int(item.unit_price_cents) * float(item.qty)
                total_cents += int(round(line_total))
                tax_cents += int(round(line_total * float(item.tax_rate) / 100.0))

                if product.stock_qty is not None and product.stock_qty < float(item.qty):
                    from app.core.errors import ConflictError

                    raise ConflictError("Insufficient inventory")

                # Decrement stock
                await self.session.execute(
                    update(Product).where(Product.id == product.id).values(stock_qty=Product.stock_qty - item.qty)
                )

            # Create order
            order = Order(
                cart_id=cart_id,
                buyer_restaurant_id=buyer_restaurant_id,
                supplier_id=supplier_id,
                created_by_account_id=created_by_account_id,
                status=OrderStatus.PLACED,
                total_cents=int(total_cents),
                tax_cents=int(tax_cents),
                payment_method=payment_method,
            )
            self.session.add(order)

            # Mark cart converted
            await self.session.execute(
                update(Cart).where(Cart.id == cart_id).values(status=CartStatus.CONVERTED)
            )

            await self.session.flush()
            # Link idempotency key
            await self.session.execute(
                update(IdempotencyKey).where(IdempotencyKey.key == idempotency_key).values(order_id=order.id)
            )

        # Outside transaction, refresh
        await self.session.refresh(order)
        return order

    async def set_status(self, order: Order, status: str) -> Order:
        await self.session.execute(
            update(Order).where(Order.id == order.id).values(status=status)
        )
        await self.session.commit()
        await self.session.refresh(order)
        return order



