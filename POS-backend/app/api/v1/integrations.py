"""Supplier connector integration API endpoints."""
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, Path, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user, require_role
from app.domain.integrations.schemas import (
    SupplierConnectionCreate,
    SupplierConnectionResponse,
    ConnectorConnectRequest
)
from app.domain.integrations.service import SupplierConnectionService

router = APIRouter()


def get_integration_service(db: AsyncSession = Depends(get_db)) -> SupplierConnectionService:
    """Dependency to get integration service."""
    return SupplierConnectionService(db)


@router.post(
    "/{supplier}/connect",
    response_model=SupplierConnectionResponse,
    status_code=status.HTTP_201_CREATED
)
async def connect_supplier(
    supplier: str = Path(..., description="Supplier key (e.g., 'martin_servera', 'menigo')"),
    request: ConnectorConnectRequest = Depends(),
    service: SupplierConnectionService = Depends(get_integration_service),
    current_user: dict = Depends(require_role("RESTAURANT", "ADMIN")),
):
    """
    Connect restaurant to supplier via authenticated mirror.
    
    Security:
    - User must explicitly accept consent
    - Session token is captured and encrypted (never password)
    - Short-lived token (24 hour expiration)
    """
    if not request.consent_accepted:
        from fastapi import HTTPException
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Consent must be accepted"
        )
    
    # TODO: Implement Playwright automation to capture session token
    # For now, use a placeholder encrypted token
    encrypted_token = "encrypted_session_token_placeholder"
    
    # Create connection data
    connection_data = SupplierConnectionCreate(
        restaurant_id=request.restaurant_id,
        supplier_key=supplier,
        scopes=["catalog", "pricing"]
    )
    
    connection = await service.connect_supplier(connection_data, encrypted_token)
    return connection


@router.get("/{supplier}/status", response_model=SupplierConnectionResponse)
async def get_connection_status(
    supplier: str = Path(..., description="Supplier key"),
    restaurant_id: UUID,
    service: SupplierConnectionService = Depends(get_integration_service),
    current_user: dict = Depends(require_role("RESTAURANT", "ADMIN")),
):
    """Get connection status for a supplier."""
    status_data = await service.get_connection_status(restaurant_id, supplier)
    return status_data


@router.post("/{supplier}/sync", status_code=status.HTTP_202_ACCEPTED)
async def trigger_sync(
    supplier: str = Path(..., description="Supplier key"),
    restaurant_id: UUID,
    service: SupplierConnectionService = Depends(get_integration_service),
    current_user: dict = Depends(require_role("RESTAURANT", "ADMIN")),
):
    """
    Trigger catalog sync for supplier connection.
    
    This triggers a Celery background job to sync catalog data.
    """
    # TODO: Trigger Celery worker to sync catalog
    # For now, just return accepted status
    return {"status": "syncing", "supplier": supplier}


@router.delete("/{supplier}", status_code=status.HTTP_204_NO_CONTENT)
async def disconnect_supplier(
    supplier: str = Path(..., description="Supplier key"),
    restaurant_id: UUID,
    service: SupplierConnectionService = Depends(get_integration_service),
    current_user: dict = Depends(require_role("RESTAURANT", "ADMIN")),
):
    """Disconnect supplier and delete session token."""
    await service.delete_connection(restaurant_id, supplier)

