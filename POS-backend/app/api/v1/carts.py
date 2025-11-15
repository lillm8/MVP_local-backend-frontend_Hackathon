"""Cart API endpoints with ownership checks."""
from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import require_role
from app.domain.carts.schemas import CartCreate, CartItemCreate, CartItemResponse, CartItemUpdate, CartResponse
from app.domain.carts.service import CartService


router = APIRouter()


def get_cart_service(db: AsyncSession = Depends(get_db)) -> CartService:
    return CartService(db)


@router.post("", response_model=CartResponse, status_code=status.HTTP_201_CREATED)
async def create_cart(
    data: CartCreate,
    service: CartService = Depends(get_cart_service),
    current_user: dict = Depends(require_role("RESTAURANT", "ADMIN")),
):
    cart = await service.create_cart(
        restaurant_id=data.restaurant_id,
        current_account_id=current_user.get("account_id") or current_user.get("sub"),
        current_role=current_user.get("role", ""),
    )
    return CartResponse.model_validate(cart)


@router.get("/{cart_id}", response_model=CartResponse)
async def get_cart(
    cart_id: UUID,
    service: CartService = Depends(get_cart_service),
    current_user: dict = Depends(require_role("RESTAURANT", "ADMIN")),
):
    cart = await service.get_cart(
        cart_id=cart_id,
        current_account_id=current_user.get("account_id") or current_user.get("sub"),
        current_role=current_user.get("role", ""),
    )
    return CartResponse.model_validate(cart)


@router.post("/{cart_id}/items", response_model=CartItemResponse, status_code=status.HTTP_201_CREATED)
async def add_item(
    cart_id: UUID,
    data: CartItemCreate,
    service: CartService = Depends(get_cart_service),
    current_user: dict = Depends(require_role("RESTAURANT", "ADMIN")),
):
    item = await service.add_item(
        cart_id=cart_id,
        product_id=data.product_id,
        qty=data.qty,
        current_account_id=current_user.get("account_id") or current_user.get("sub"),
        current_role=current_user.get("role", ""),
    )
    return CartItemResponse.model_validate(item)


@router.patch("/{cart_id}/items/{item_id}", response_model=CartItemResponse)
async def update_item(
    cart_id: UUID,
    item_id: UUID,
    data: CartItemUpdate,
    service: CartService = Depends(get_cart_service),
    current_user: dict = Depends(require_role("RESTAURANT", "ADMIN")),
):
    item = await service.update_item(
        cart_id=cart_id,
        item_id=item_id,
        data=data,
        current_account_id=current_user.get("account_id") or current_user.get("sub"),
        current_role=current_user.get("role", ""),
    )
    return CartItemResponse.model_validate(item)


@router.delete("/{cart_id}/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(
    cart_id: UUID,
    item_id: UUID,
    service: CartService = Depends(get_cart_service),
    current_user: dict = Depends(require_role("RESTAURANT", "ADMIN")),
):
    await service.delete_item(
        cart_id=cart_id,
        item_id=item_id,
        current_account_id=current_user.get("account_id") or current_user.get("sub"),
        current_role=current_user.get("role", ""),
    )



