"""Product API endpoints with trigram search and ownership guards."""
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.security import get_current_user, require_role
from app.domain.products.schemas import (
    ProductCreate,
    ProductListResponse,
    ProductResponse,
    ProductUpdate,
)
from app.domain.products.service import ProductService


router = APIRouter()


def get_product_service(db: AsyncSession = Depends(get_db)) -> ProductService:
    return ProductService(db)


@router.get("", response_model=ProductListResponse)
async def list_products(
    limit: int = Query(
        default=settings.PAGE_LIMIT_DEFAULT,
        ge=1,
        le=settings.MAX_PAGE_LIMIT,
        description="Number of items per page",
    ),
    offset: int = Query(default=0, ge=0, description="Number of items to skip"),
    supplier_id: Optional[UUID] = Query(None, description="Filter by supplier ID"),
    active: Optional[bool] = Query(None, description="Filter by active status"),
    q: Optional[str] = Query(None, description="Trigram search on name and SKU"),
    service: ProductService = Depends(get_product_service),
):
    products, total = await service.list_products(
        limit=limit, offset=offset, supplier_id=supplier_id, active=active, q=q
    )
    return ProductListResponse(
        data=[ProductResponse.model_validate(p) for p in products],
        total=total,
        limit=limit,
        offset=offset,
    )


@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(
    data: ProductCreate,
    service: ProductService = Depends(get_product_service),
    current_user: dict = Depends(require_role("ADMIN", "SUPPLIER")),
):
    created = await service.create_product(
        data=data,
        current_account_id=current_user.get("account_id") or current_user.get("sub"),
        current_role=current_user.get("role", ""),
    )
    return ProductResponse.model_validate(created)


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(
    product_id: UUID,
    service: ProductService = Depends(get_product_service),
):
    product = await service.get_product(product_id)
    return ProductResponse.model_validate(product)


@router.patch("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: UUID,
    data: ProductUpdate,
    service: ProductService = Depends(get_product_service),
    current_user: dict = Depends(require_role("ADMIN", "SUPPLIER")),
):
    updated = await service.update_product(
        product_id=product_id,
        data=data,
        current_account_id=current_user.get("account_id") or current_user.get("sub"),
        current_role=current_user.get("role", ""),
    )
    return ProductResponse.model_validate(updated)


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    product_id: UUID,
    service: ProductService = Depends(get_product_service),
    current_user: dict = Depends(require_role("ADMIN", "SUPPLIER")),
):
    await service.delete_product(
        product_id=product_id,
        current_account_id=current_user.get("account_id") or current_user.get("sub"),
        current_role=current_user.get("role", ""),
    )



