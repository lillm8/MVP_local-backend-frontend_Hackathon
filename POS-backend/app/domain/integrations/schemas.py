"""Pydantic schemas for supplier connector integrations."""
from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class SupplierConnectionResponse(BaseModel):
    """Response schema for supplier connection."""
    id: UUID
    restaurant_id: UUID
    supplier_key: str
    status: str
    scopes: list[str]
    last_sync_at: Optional[datetime]
    consent_given_at: datetime
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class SupplierConnectionCreate(BaseModel):
    """Request schema for creating supplier connection."""
    restaurant_id: UUID
    supplier_key: str = Field(..., description="Supplier identifier (e.g., 'martin_servera', 'menigo')")
    scopes: list[str] = Field(
        default=["catalog", "pricing"],
        description="Granted scopes: catalog, pricing, orders"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "restaurant_id": "550e8400-e29b-41d4-a716-446655440000",
                "supplier_key": "martin_servera",
                "scopes": ["catalog", "pricing", "orders"]
            }
        }


class ConnectorConnectRequest(BaseModel):
    """Request to initiate connector connection (consent + session capture)."""
    restaurant_id: UUID
    consent_accepted: bool = Field(..., description="User explicitly accepted consent terms")
    
    class Config:
        json_schema_extra = {
            "example": {
                "restaurant_id": "550e8400-e29b-41d4-a716-446655440000",
                "consent_accepted": True
            }
        }


class CatalogCacheResponse(BaseModel):
    """Response schema for cached catalog items."""
    id: UUID
    connection_id: UUID
    product_external_id: str
    name: str
    price: float
    currency: str
    unit: str
    synced_at: datetime
    
    class Config:
        from_attributes = True

