"""Pydantic schemas for orders and receipts/invoices."""
from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class OrderCreate(BaseModel):
    """Create order request (RESTAURANT owner)."""
    cart_id: UUID
    buyer_restaurant_id: UUID
    supplier_id: UUID
    payment_method: str = Field("mock")


class OrderResponse(BaseModel):
    id: UUID
    cart_id: UUID
    buyer_restaurant_id: UUID
    supplier_id: UUID
    created_by_account_id: UUID
    status: str
    total_cents: int
    tax_cents: int
    payment_method: str
    paid_at: Optional[datetime]
    delivered_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class OrderListResponse(BaseModel):
    data: list[OrderResponse]
    total: int
    limit: int
    offset: int


class ReceiptResponse(BaseModel):
    """Derived JSON receipt."""
    order_id: UUID
    buyer_restaurant_id: UUID
    supplier_id: UUID
    lines: list[dict]
    total_cents: int
    tax_cents: int
    created_at: datetime


class InvoiceResponse(BaseModel):
    """Derived JSON invoice."""
    order_id: UUID
    supplier_id: UUID
    buyer_restaurant_id: UUID
    lines: list[dict]
    total_cents: int
    tax_cents: int
    issued_at: datetime



