"""Orders API with idempotent creation and state transitions."""
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, Header, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.security import require_role
from app.domain.orders.schemas import InvoiceResponse, OrderCreate, OrderListResponse, OrderResponse, ReceiptResponse
from app.domain.orders.service import OrderService


router = APIRouter()


def get_order_service(db: AsyncSession = Depends(get_db)) -> OrderService:
    return OrderService(db)


@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(
    data: OrderCreate,
    idempotency_key: str | None = Header(None, alias="Idempotency-Key"),
    service: OrderService = Depends(get_order_service),
    current_user: dict = Depends(require_role("RESTAURANT", "ADMIN")),
):
    order = await service.create_order(
        data=data,
        idempotency_key=idempotency_key or "",
        current_account_id=current_user.get("account_id") or current_user.get("sub"),
        current_role=current_user.get("role", ""),
    )
    return OrderResponse.model_validate(order)


@router.get("", response_model=OrderListResponse)
async def list_orders(
    limit: int = Query(default=settings.PAGE_LIMIT_DEFAULT, ge=1, le=settings.MAX_PAGE_LIMIT),
    offset: int = Query(default=0, ge=0),
    restaurant_id: Optional[UUID] = Query(None),
    supplier_id: Optional[UUID] = Query(None),
    status: Optional[str] = Query(None),
    service: OrderService = Depends(get_order_service),
    current_user: dict = Depends(require_role("ADMIN", "SUPPLIER", "RESTAURANT")),
):
    orders, total = await service.list_orders(
        limit=limit,
        offset=offset,
        restaurant_id=restaurant_id,
        supplier_id=supplier_id,
        status=status,
        current_user_id=current_user.get("account_id") or current_user.get("sub"),
        current_role=current_user.get("role", ""),
    )
    return OrderListResponse(
        data=[OrderResponse.model_validate(o) for o in orders],
        total=total,
        limit=limit,
        offset=offset,
    )


@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(
    order_id: UUID,
    service: OrderService = Depends(get_order_service),
    current_user: dict = Depends(require_role("ADMIN", "SUPPLIER", "RESTAURANT")),
):
    order = await service.get_order(
        order_id=order_id,
        current_user_id=current_user.get("account_id") or current_user.get("sub"),
        current_role=current_user.get("role", ""),
    )
    return OrderResponse.model_validate(order)


@router.post("/{order_id}/confirm", response_model=OrderResponse)
async def confirm_order(
    order_id: UUID,
    service: OrderService = Depends(get_order_service),
    current_user: dict = Depends(require_role("SUPPLIER", "ADMIN")),
):
    order = await service.confirm_order(
        order_id=order_id,
        current_user_id=current_user.get("account_id") or current_user.get("sub"),
        current_role=current_user.get("role", ""),
    )
    return OrderResponse.model_validate(order)


@router.post("/{order_id}/deliver", response_model=OrderResponse)
async def deliver_order(
    order_id: UUID,
    service: OrderService = Depends(get_order_service),
    current_user: dict = Depends(require_role("SUPPLIER", "ADMIN")),
):
    order = await service.deliver_order(
        order_id=order_id,
        current_user_id=current_user.get("account_id") or current_user.get("sub"),
        current_role=current_user.get("role", ""),
    )
    return OrderResponse.model_validate(order)


@router.get("/{order_id}/receipt", response_model=ReceiptResponse)
async def get_receipt(
    order_id: UUID,
    service: OrderService = Depends(get_order_service),
    current_user: dict = Depends(require_role("ADMIN", "SUPPLIER", "RESTAURANT")),
):
    data = await service.get_receipt_json(
        order_id=order_id,
        current_user_id=current_user.get("account_id") or current_user.get("sub"),
        current_role=current_user.get("role", ""),
    )
    return data


@router.get("/{order_id}/invoice", response_model=InvoiceResponse)
async def get_invoice(
    order_id: UUID,
    service: OrderService = Depends(get_order_service),
    current_user: dict = Depends(require_role("ADMIN", "SUPPLIER", "RESTAURANT")),
):
    data = await service.get_invoice_json(
        order_id=order_id,
        current_user_id=current_user.get("account_id") or current_user.get("sub"),
        current_role=current_user.get("role", ""),
    )
    return data



