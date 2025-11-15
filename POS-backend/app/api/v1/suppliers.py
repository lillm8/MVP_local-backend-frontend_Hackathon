"""Supplier API endpoints."""
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.security import require_role
from app.domain.suppliers.service import SupplierService
from app.domain.suppliers.schemas import (
    SupplierCreate,
    SupplierUpdate,
    SupplierResponse,
    SupplierListResponse,
)

router = APIRouter()


def get_supplier_service(db: AsyncSession = Depends(get_db)) -> SupplierService:
    """Dependency to get supplier service."""
    return SupplierService(db)


@router.post("", response_model=SupplierResponse, status_code=status.HTTP_201_CREATED)
async def create_supplier(
    data: SupplierCreate,
    service: SupplierService = Depends(get_supplier_service),
    _: dict = Depends(require_role("ADMIN")),
):
    """
    Create a new supplier (ADMIN only).
    
    Args:
        data: Supplier creation data
        service: Supplier service
        _: Current user (admin role required)
    
    Returns:
        Created supplier
    """
    supplier = await service.create_supplier(data)
    return SupplierResponse.model_validate(supplier)


@router.get("", response_model=SupplierListResponse)
async def list_suppliers(
    limit: int = Query(
        default=settings.PAGE_LIMIT_DEFAULT,
        ge=1,
        le=settings.MAX_PAGE_LIMIT,
        description="Number of items per page"
    ),
    offset: int = Query(default=0, ge=0, description="Number of items to skip"),
    active: Optional[bool] = Query(None, description="Filter by active status"),
    service: SupplierService = Depends(get_supplier_service),
):
    """
    List all suppliers with pagination.
    
    Args:
        limit: Number of items per page
        offset: Number of items to skip
        active: Filter by active status
        service: Supplier service
    
    Returns:
        Paginated list of suppliers
    """
    suppliers, total = await service.list_suppliers(limit=limit, offset=offset, active=active)
    
    return SupplierListResponse(
        data=[SupplierResponse.model_validate(s) for s in suppliers],
        total=total,
        limit=limit,
        offset=offset,
    )


@router.get("/{supplier_id}", response_model=SupplierResponse)
async def get_supplier(
    supplier_id: UUID,
    service: SupplierService = Depends(get_supplier_service),
):
    """
    Get supplier by ID.
    
    Args:
        supplier_id: Supplier UUID
        service: Supplier service
    
    Returns:
        Supplier details
    
    Raises:
        404: If supplier not found
    """
    supplier = await service.get_supplier(supplier_id)
    return SupplierResponse.model_validate(supplier)


@router.patch("/{supplier_id}", response_model=SupplierResponse)
async def update_supplier(
    supplier_id: UUID,
    data: SupplierUpdate,
    service: SupplierService = Depends(get_supplier_service),
    _: dict = Depends(require_role("ADMIN")),
):
    """
    Update supplier (ADMIN only).
    
    Args:
        supplier_id: Supplier UUID
        data: Update data
        service: Supplier service
        _: Current user (admin role required)
    
    Returns:
        Updated supplier
    """
    supplier = await service.update_supplier(supplier_id, data)
    return SupplierResponse.model_validate(supplier)


@router.delete("/{supplier_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_supplier(
    supplier_id: UUID,
    service: SupplierService = Depends(get_supplier_service),
    _: dict = Depends(require_role("ADMIN")),
):
    """
    Delete supplier (ADMIN only, soft delete).
    
    Args:
        supplier_id: Supplier UUID
        service: Supplier service
        _: Current user (admin role required)
    """
    await service.delete_supplier(supplier_id)


