"""Pydantic schemas for carts and cart items."""
from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class CartCreate(BaseModel):
    """Create a cart for a restaurant (RESTAURANT role)."""
    restaurant_id: UUID


class CartResponse(BaseModel):
    id: UUID
    restaurant_id: UUID
    created_by_account_id: UUID
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class CartItemCreate(BaseModel):
    product_id: UUID
    qty: float = Field(..., gt=0)


class CartItemUpdate(BaseModel):
    qty: float = Field(..., gt=0)


class CartItemResponse(BaseModel):
    id: UUID
    cart_id: UUID
    product_id: UUID
    qty: float
    unit_price_cents: int
    tax_rate: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True



