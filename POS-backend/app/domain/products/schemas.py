"""Pydantic schemas for products domain."""
from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class ProductCreate(BaseModel):
    """Create product request (SUPPLIER owner or ADMIN)."""
    supplier_id: UUID
    name: str = Field(..., min_length=1, max_length=255)
    sku: str = Field(..., min_length=1, max_length=100)
    unit: str = Field(..., min_length=1, max_length=50)
    price_cents: int = Field(..., ge=0)
    tax_rate: float = Field(..., ge=0, le=100)
    stock_qty: int = Field(0, ge=0)
    availability_status: str = Field("available")
    active: bool = Field(True)


class ProductUpdate(BaseModel):
    """Update product request."""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    unit: Optional[str] = Field(None, min_length=1, max_length=50)
    price_cents: Optional[int] = Field(None, ge=0)
    tax_rate: Optional[float] = Field(None, ge=0, le=100)
    stock_qty: Optional[int] = Field(None, ge=0)
    availability_status: Optional[str] = None
    active: Optional[bool] = None


class ProductResponse(BaseModel):
    """Product response DTO."""
    id: UUID
    supplier_id: UUID
    name: str
    sku: str
    unit: str
    price_cents: int
    tax_rate: float
    stock_qty: int
    availability_status: str
    active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ProductListResponse(BaseModel):
    """Paginated product list response."""
    data: list[ProductResponse]
    total: int
    limit: int
    offset: int



