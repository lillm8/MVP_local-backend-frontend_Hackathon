"""Pydantic schemas for restaurants domain."""
from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class RestaurantCreate(BaseModel):
    """Request schema for creating a restaurant (ADMIN only)."""
    name: str = Field(..., min_length=1, max_length=255, description="Restaurant name")
    contact_email: EmailStr = Field(..., description="Contact email address")
    city: Optional[str] = Field(None, max_length=100, description="City")
    delivery_prefs: Optional[dict] = Field(None, description="Delivery preferences JSON")
    active: bool = Field(True, description="Active status")


class RestaurantUpdate(BaseModel):
    """Request schema for updating a restaurant (ADMIN only)."""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    contact_email: Optional[EmailStr] = None
    city: Optional[str] = Field(None, max_length=100)
    delivery_prefs: Optional[dict] = None
    active: Optional[bool] = None


class RestaurantResponse(BaseModel):
    """Response schema for a restaurant."""
    id: UUID
    name: str
    contact_email: str
    city: Optional[str]
    delivery_prefs: Optional[dict]
    active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class RestaurantListResponse(BaseModel):
    """Paginated response for restaurants list."""
    data: list[RestaurantResponse]
    total: int
    limit: int
    offset: int



