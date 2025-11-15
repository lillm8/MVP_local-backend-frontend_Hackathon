"""Cart repository: carts and cart items data access and mutations."""
from typing import Optional
from uuid import UUID

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.carts.models import Cart, CartItem, CartStatus
from app.domain.products.models import Product


class CartRepository:
    """Repository for cart operations."""

    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_cart(self, restaurant_id: UUID, created_by_account_id: UUID) -> Cart:
        cart = Cart(restaurant_id=restaurant_id, created_by_account_id=created_by_account_id, status=CartStatus.OPEN)
        self.session.add(cart)
        await self.session.commit()
        await self.session.refresh(cart)
        return cart

    async def get_cart(self, cart_id: UUID) -> Optional[Cart]:
        stmt = select(Cart).where(Cart.id == cart_id, Cart.deleted_at.is_(None))
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def add_item(self, cart: Cart, product: Product, qty: float) -> CartItem:
        item = CartItem(
            cart_id=cart.id,
            product_id=product.id,
            qty=qty,
            unit_price_cents=product.price_cents,
            tax_rate=product.tax_rate,
        )
        self.session.add(item)
        await self.session.commit()
        await self.session.refresh(item)
        return item

    async def get_item(self, cart_id: UUID, item_id: UUID) -> Optional[CartItem]:
        stmt = select(CartItem).where(CartItem.id == item_id, CartItem.cart_id == cart_id, CartItem.deleted_at.is_(None))
        res = await self.session.execute(stmt)
        return res.scalar_one_or_none()

    async def update_item_qty(self, item: CartItem, qty: float) -> CartItem:
        item.qty = qty
        await self.session.execute(
            update(CartItem).where(CartItem.id == item.id).values(qty=qty)
        )
        await self.session.commit()
        await self.session.refresh(item)
        return item

    async def delete_item(self, item: CartItem) -> None:
        from datetime import datetime, timezone
        await self.session.execute(
            update(CartItem).where(CartItem.id == item.id).values(deleted_at=datetime.now(timezone.utc))
        )
        await self.session.commit()



