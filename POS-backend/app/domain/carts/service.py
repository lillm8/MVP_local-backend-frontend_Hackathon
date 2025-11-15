"""Cart service with ownership checks and item operations."""
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.errors import NotFoundError, ConflictError
from app.core.ownership import check_restaurant_ownership
from app.domain.carts.models import CartStatus
from app.domain.carts.repository import CartRepository
from app.domain.carts.schemas import CartItemUpdate
from app.domain.products.repository import ProductRepository


class CartService:
    """Service layer for carts and cart items."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.repo = CartRepository(session)
        self.product_repo = ProductRepository(session)

    async def create_cart(self, restaurant_id: UUID, current_account_id: UUID, current_role: str):
        owns = await check_restaurant_ownership(self.session, current_role, current_account_id, restaurant_id)
        if not owns:
            from fastapi import HTTPException, status

            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden: not owner of restaurant")
        return await self.repo.create_cart(restaurant_id=restaurant_id, created_by_account_id=current_account_id)

    async def get_cart(self, cart_id: UUID, current_account_id: UUID, current_role: str):
        cart = await self.repo.get_cart(cart_id)
        if not cart:
            raise NotFoundError(f"Cart {cart_id} not found")
        owns = await check_restaurant_ownership(self.session, current_role, current_account_id, cart.restaurant_id)
        if not owns:
            from fastapi import HTTPException, status

            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden: not owner of restaurant")
        return cart

    async def add_item(self, cart_id: UUID, product_id: UUID, qty: float, current_account_id: UUID, current_role: str):
        cart = await self.get_cart(cart_id, current_account_id, current_role)
        if cart.status != CartStatus.OPEN:
            raise ConflictError("Cart is not open")

        product = await self.product_repo.get_by_id(product_id)
        if not product:
            raise NotFoundError(f"Product {product_id} not found")

        return await self.repo.add_item(cart, product, qty)

    async def update_item(self, cart_id: UUID, item_id: UUID, data: CartItemUpdate, current_account_id: UUID, current_role: str):
        cart = await self.get_cart(cart_id, current_account_id, current_role)
        if cart.status != CartStatus.OPEN:
            raise ConflictError("Cart is not open")
        item = await self.repo.get_item(cart_id, item_id)
        if not item:
            raise NotFoundError(f"Cart item {item_id} not found")
        return await self.repo.update_item_qty(item, data.qty)

    async def delete_item(self, cart_id: UUID, item_id: UUID, current_account_id: UUID, current_role: str):
        cart = await self.get_cart(cart_id, current_account_id, current_role)
        if cart.status != CartStatus.OPEN:
            raise ConflictError("Cart is not open")
        item = await self.repo.get_item(cart_id, item_id)
        if not item:
            raise NotFoundError(f"Cart item {item_id} not found")
        await self.repo.delete_item(item)



