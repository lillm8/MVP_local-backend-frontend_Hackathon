"""Order model with state machine and idempotency."""
from datetime import datetime
from typing import Optional
from uuid import UUID

from sqlalchemy import CheckConstraint, ForeignKey, Index, Integer, String
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import BaseModel


class OrderStatus(str):
    """Order status enumeration."""
    PLACED = "placed"
    CONFIRMED = "confirmed"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"


class PaymentMethod(str):
    """Payment method enumeration."""
    CASH = "cash"
    CARD = "card"
    MOCK = "mock"


class Order(BaseModel):
    """
    Order model for B2B transactions.
    
    Represents a completed purchase from a restaurant to a supplier.
    Includes state machine with valid transitions (placed → confirmed → delivered).
    All monetary values in minor units (cents).
    """
    __tablename__ = "orders"
    
    # Relationships
    cart_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("carts.id"), nullable=False, unique=True, index=True)
    buyer_restaurant_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("restaurants.id"), nullable=False, index=True)
    supplier_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("suppliers.id"), nullable=False, index=True)
    created_by_account_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), nullable=False, index=True)
    
    # State machine
    status: Mapped[str] = mapped_column(String(20), nullable=False, default=OrderStatus.PLACED, index=True)
    
    # Pricing (in cents)
    total_cents: Mapped[int] = mapped_column(Integer, nullable=False)
    tax_cents: Mapped[int] = mapped_column(Integer, nullable=False)
    
    # Payment
    payment_method: Mapped[str] = mapped_column(String(20), nullable=False, default=PaymentMethod.MOCK)
    paid_at: Mapped[Optional[datetime]] = mapped_column(nullable=True, default=None)
    
    # Delivery tracking
    delivered_at: Mapped[Optional[datetime]] = mapped_column(nullable=True, default=None)
    
    # Relationships
    cart: Mapped["Cart"] = relationship("Cart", back_populates="order", lazy="selectin")
    restaurant: Mapped["Restaurant"] = relationship("Restaurant", back_populates="orders", lazy="selectin")
    supplier: Mapped["Supplier"] = relationship("Supplier", back_populates="orders", lazy="selectin")
    
    # Indexes and constraints
    __table_args__ = (
        Index("idx_orders_restaurant_supplier_status", "buyer_restaurant_id", "supplier_id", "status", "created_at"),
        Index("idx_orders_status", "status"),
        Index("idx_orders_created_at", "created_at"),
        CheckConstraint("total_cents >= tax_cents", name="ck_orders_total_cents"),
        CheckConstraint("tax_cents >= 0", name="ck_orders_tax_cents"),
    )
    
    def __repr__(self):
        return f"<Order(id={self.id}, restaurant_id={self.buyer_restaurant_id}, supplier_id={self.supplier_id}, status={self.status})>"


class IdempotencyKey(BaseModel):
    """
    Idempotency key model for preventing duplicate order creation.
    
    Stores key, order_id, and timestamp for deduplication.
    Used to return existing order response on retry with same key.
    """
    __tablename__ = "idempotency_keys"
    
    # Unique key for deduplication
    key: Mapped[str] = mapped_column(String(255), nullable=False, unique=True, index=True)
    
    # Reference to order (null until order is created)
    order_id: Mapped[Optional[UUID]] = mapped_column(PGUUID(as_uuid=True), ForeignKey("orders.id"), nullable=True, index=True)
    
    # Timestamp (for cleanup)
    created_at: Mapped[datetime] = mapped_column(nullable=False, index=True)
    
    # Relationships
    order: Mapped[Optional["Order"]] = relationship("Order", foreign_keys=[order_id], lazy="selectin")
    
    # Indexes
    __table_args__ = (
        Index("idx_idempotency_keys_key", "key", unique=True),
        Index("idx_idempotency_keys_order", "order_id"),
    )
    
    def __repr__(self):
        return f"<IdempotencyKey(key={self.key}, order_id={self.order_id})>"
