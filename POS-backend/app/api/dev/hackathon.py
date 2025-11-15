"""Hackathon / dev-only invoice and summary endpoints.

These endpoints are only included when settings.DEV_MODE is True.
They operate on the current SQLAlchemy models against the dev SQLite DB.
"""

from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.domain.orders.models import Order
from app.domain.suppliers.models import Supplier


router = APIRouter()


class InvoiceOut(BaseModel):
    """Invoice-like record for hackathon UI."""

    id: UUID
    supplier_id: UUID
    supplier_name: str
    amount_cents: int
    amount: float
    due_date: datetime
    status: str  # paid | due | overdue


class SummaryOut(BaseModel):
    total_due_cents: int
    total_paid_cents: int
    total_overdue_cents: int
    total_due: float
    total_paid: float
    total_overdue: float


class SupplierSummaryOut(BaseModel):
    supplier_id: UUID
    supplier_name: str
    total_due_cents: int
    total_paid_cents: int
    total_overdue_cents: int


class SummaryWithSuppliersOut(SummaryOut):
    per_supplier: List[SupplierSummaryOut]


class PayAllRequest(BaseModel):
    """Request body for paying invoices in dev mode."""

    invoice_ids: Optional[List[UUID]] = None


class PayAllResponse(BaseModel):
    invoices: List[InvoiceOut]
    summary: SummaryWithSuppliersOut


async def _load_invoices(session: AsyncSession) -> List[InvoiceOut]:
    """Load invoice-like records derived from orders.

    For hackathon simplicity, we derive invoices directly from Order rows
    and compute due status from created_at and paid_at.
    """

    stmt = (
        select(Order, Supplier.id, Supplier.name)
        .join(Supplier, Supplier.id == Order.supplier_id)
        .where(Order.deleted_at.is_(None))
        .order_by(Order.created_at.desc())
    )
    result = await session.execute(stmt)

    rows = result.all()
    now = datetime.now(timezone.utc)
    invoices: List[InvoiceOut] = []

    for order, supplier_id, supplier_name in rows:
        created = order.created_at
        if created.tzinfo is None:
            created = created.replace(tzinfo=timezone.utc)
        due_date = created + timedelta(days=14)

        if order.paid_at is not None:
            status = "paid"
        elif now > due_date:
            status = "overdue"
        else:
            status = "due"

        invoices.append(
            InvoiceOut(
                id=order.id,
                supplier_id=supplier_id,
                supplier_name=supplier_name,
                amount_cents=order.total_cents,
                amount=order.total_cents / 100.0,
                due_date=due_date,
                status=status,
            )
        )

    return invoices


def _compute_summary(invoices: List[InvoiceOut]) -> SummaryWithSuppliersOut:
    total_due_cents = sum(i.amount_cents for i in invoices if i.status == "due")
    total_paid_cents = sum(i.amount_cents for i in invoices if i.status == "paid")
    total_overdue_cents = sum(i.amount_cents for i in invoices if i.status == "overdue")

    # Aggregate per supplier
    per_supplier_map: dict[UUID, dict[str, int | str]] = {}
    for inv in invoices:
        key = inv.supplier_id
        agg = per_supplier_map.setdefault(
            key,
            {
                "supplier_name": inv.supplier_name,
                "total_due_cents": 0,
                "total_paid_cents": 0,
                "total_overdue_cents": 0,
            },
        )
        if inv.status == "due":
            agg["total_due_cents"] += inv.amount_cents
        elif inv.status == "paid":
            agg["total_paid_cents"] += inv.amount_cents
        elif inv.status == "overdue":
            agg["total_overdue_cents"] += inv.amount_cents

    per_supplier: List[SupplierSummaryOut] = []
    for supplier_id, agg in per_supplier_map.items():
        per_supplier.append(
            SupplierSummaryOut(
                supplier_id=supplier_id,
                supplier_name=str(agg["supplier_name"]),
                total_due_cents=int(agg["total_due_cents"]),
                total_paid_cents=int(agg["total_paid_cents"]),
                total_overdue_cents=int(agg["total_overdue_cents"]),
            )
        )

    return SummaryWithSuppliersOut(
        total_due_cents=total_due_cents,
        total_paid_cents=total_paid_cents,
        total_overdue_cents=total_overdue_cents,
        total_due=total_due_cents / 100.0,
        total_paid=total_paid_cents / 100.0,
        total_overdue=total_overdue_cents / 100.0,
        per_supplier=per_supplier,
    )


@router.get("/invoices", response_model=List[InvoiceOut])
async def get_invoices(db: AsyncSession = Depends(get_db)) -> List[InvoiceOut]:
    """Return all invoice-like records for the demo restaurant.

    Currently returns all orders in the dev DB, derived as invoices.
    """

    invoices = await _load_invoices(db)
    return invoices


@router.get("/summary", response_model=SummaryWithSuppliersOut)
async def get_summary(db: AsyncSession = Depends(get_db)) -> SummaryWithSuppliersOut:
    """Return totals for paid/due/overdue invoices and per-supplier sums."""

    invoices = await _load_invoices(db)
    return _compute_summary(invoices)


@router.post("/pay-all", response_model=PayAllResponse)
async def pay_all(
    payload: PayAllRequest,
    db: AsyncSession = Depends(get_db),
) -> PayAllResponse:
    """Simulate paying all or selected invoices.

    - If invoice_ids is provided, mark those orders as paid.
    - Otherwise, mark all unpaid orders as paid.
    """

    # Load current orders
    stmt = select(Order).where(Order.deleted_at.is_(None))
    result = await db.execute(stmt)
    orders = list(result.scalars().all())

    now = datetime.now(timezone.utc)

    ids_to_pay: Optional[set[UUID]] = None
    if payload.invoice_ids:
        ids_to_pay = set(payload.invoice_ids)

    for order in orders:
        if ids_to_pay is not None and order.id not in ids_to_pay:
            continue
        if order.paid_at is not None:
            continue
        order.paid_at = now
        db.add(order)

    await db.commit()

    invoices = await _load_invoices(db)
    summary = _compute_summary(invoices)
    return PayAllResponse(invoices=invoices, summary=summary)
