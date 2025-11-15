"""Order service: idempotent creation, state machine, receipts/invoices."""
from datetime import datetime, timezone
from typing import Optional
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.errors import ConflictError, NotFoundError
from app.core.ownership import check_restaurant_ownership, check_supplier_ownership
from app.domain.orders.models import Order, OrderStatus
from app.domain.orders.repository import OrderRepository
from app.domain.orders.schemas import OrderCreate


class OrderService:
    def __init__(self, session: AsyncSession):
        self.session = session
        self.repo = OrderRepository(session)

    async def create_order(
        self,
        data: OrderCreate,
        idempotency_key: str,
        current_account_id: UUID,
        current_role: str,
    ) -> Order:
        # Ownership: requester must own the buyer restaurant (or admin)
        owns = await check_restaurant_ownership(self.session, current_role, current_account_id, data.buyer_restaurant_id)
        if not owns:
            from fastapi import HTTPException, status

            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden: not owner of restaurant")

        if not idempotency_key:
            raise ConflictError("Missing Idempotency-Key header")

        return await self.repo.create_order_transactional(
            idempotency_key=idempotency_key,
            cart_id=data.cart_id,
            buyer_restaurant_id=data.buyer_restaurant_id,
            supplier_id=data.supplier_id,
            created_by_account_id=current_account_id,
            payment_method=data.payment_method,
        )

    async def get_order(self, order_id: UUID, current_user_id: UUID, current_role: str) -> Order:
        order = await self.repo.get_by_id(order_id)
        if not order:
            raise NotFoundError(f"Order {order_id} not found")
        # Access: restaurant members or supplier members (or admin)
        owns_restaurant = await check_restaurant_ownership(self.session, current_role, current_user_id, order.buyer_restaurant_id)
        owns_supplier = await check_supplier_ownership(self.session, current_role, current_user_id, order.supplier_id)
        if not (owns_restaurant or owns_supplier):
            from fastapi import HTTPException, status

            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden: not participant")
        return order

    async def list_orders(
        self,
        limit: int = 50,
        offset: int = 0,
        restaurant_id: Optional[UUID] = None,
        supplier_id: Optional[UUID] = None,
        status: Optional[str] = None,
        current_user_id: UUID | None = None,
        current_role: str | None = None,
    ) -> tuple[list[Order], int]:
        # List, then filter down to only those the user participates in (if provided)
        orders, total = await self.repo.list_all(limit=limit, offset=offset, restaurant_id=restaurant_id, supplier_id=supplier_id, status=status)
        if current_user_id is None:
            return orders, total
        filtered: list[Order] = []
        for o in orders:
            owns_restaurant = await check_restaurant_ownership(self.session, current_role or "", current_user_id, o.buyer_restaurant_id)
            owns_supplier = await check_supplier_ownership(self.session, current_role or "", current_user_id, o.supplier_id)
            if owns_restaurant or owns_supplier:
                filtered.append(o)
        return filtered, len(filtered)

    async def confirm_order(self, order_id: UUID, current_user_id: UUID, current_role: str) -> Order:
        order = await self.repo.get_by_id(order_id)
        if not order:
            raise NotFoundError("Order not found")
        # Supplier ownership required
        owns = await check_supplier_ownership(self.session, current_role, current_user_id, order.supplier_id)
        if not owns:
            from fastapi import HTTPException, status

            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden: supplier ownership required")
        if order.status != OrderStatus.PLACED:
            raise ConflictError("Invalid state transition")
        return await self.repo.set_status(order, OrderStatus.CONFIRMED)

    async def deliver_order(self, order_id: UUID, current_user_id: UUID, current_role: str) -> Order:
        order = await self.repo.get_by_id(order_id)
        if not order:
            raise NotFoundError("Order not found")
        owns = await check_supplier_ownership(self.session, current_role, current_user_id, order.supplier_id)
        if not owns:
            from fastapi import HTTPException, status

            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden: supplier ownership required")
        if order.status != OrderStatus.CONFIRMED:
            raise ConflictError("Invalid state transition")
        # Set delivered status and timestamp
        order = await self.repo.set_status(order, OrderStatus.DELIVERED)
        await self.session.execute(
            # minimal update for delivered_at
            Order.__table__.update().where(Order.id == order.id).values(delivered_at=datetime.now(timezone.utc))
        )
        await self.session.commit()
        await self.session.refresh(order)
        return order

    async def get_receipt_json(self, order_id: UUID, current_user_id: UUID, current_role: str) -> dict:
        order = await self.get_order(order_id, current_user_id, current_role)
        # Build derived receipt JSON
        return {
            "order_id": order.id,
            "buyer_restaurant_id": order.buyer_restaurant_id,
            "supplier_id": order.supplier_id,
            "lines": [],  # For MVP, omit line breakdown; can be derived from cart_items
            "total_cents": order.total_cents,
            "tax_cents": order.tax_cents,
            "created_at": order.created_at,
        }

    async def get_invoice_json(self, order_id: UUID, current_user_id: UUID, current_role: str) -> dict:
        order = await self.get_order(order_id, current_user_id, current_role)
        return {
            "order_id": order.id,
            "supplier_id": order.supplier_id,
            "buyer_restaurant_id": order.buyer_restaurant_id,
            "lines": [],
            "total_cents": order.total_cents,
            "tax_cents": order.tax_cents,
            "issued_at": datetime.now(timezone.utc),
        }



