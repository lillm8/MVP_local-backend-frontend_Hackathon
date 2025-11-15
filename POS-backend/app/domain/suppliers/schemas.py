"""Pydantic schemas for suppliers."""
from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class SupplierCreate(BaseModel):
    """Request schema for creating a supplier."""
    name: str = Field(..., min_length=1, max_length=255, description="Supplier name")
    contact_email: EmailStr = Field(..., description="Contact email address")
    phone: Optional[str] = Field(None, max_length=50, description="Phone number")
    city: Optional[str] = Field(None, max_length=100, description="City")
    lat: Optional[float] = Field(None, ge=-90, le=90, description="Latitude")
    lon: Optional[float] = Field(None, ge=-180, le=180, description="Longitude")
    active: bool = Field(True, description="Active status")


class SupplierUpdate(BaseModel):
    """Request schema for updating a supplier."""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    contact_email: Optional[EmailStr] = None
    phone: Optional[str] = Field(None, max_length=50)
    city: Optional[str] = Field(None, max_length=100)
    lat: Optional[float] = Field(None, ge=-90, le=90)
    lon: Optional[float] = Field(None, ge=-180, le=180)
    active: Optional[bool] = None


class SupplierResponse(BaseModel):
    """Response schema for supplier."""
    id: UUID
    name: str
    contact_email: str
    phone: Optional[str]
    city: Optional[str]
    lat: Optional[float]
    lon: Optional[float]
    active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class SupplierListResponse(BaseModel):
    """Response schema for paginated supplier list."""
    data: list[SupplierResponse]
    total: int
    limit: int
    offset: int


