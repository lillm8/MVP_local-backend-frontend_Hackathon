"""Product model with supplier relationship."""
from datetime import datetime
from typing import Optional
from uuid import UUID

from sqlalchemy import CheckConstraint, ForeignKey, Index, Integer, Numeric, String, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import BaseModel


class AvailabilityStatus(str):
    """Product availability status."""
    AVAILABLE = "available"
    PREORDER = "preorder"
    UNAVAILABLE = "unavailable"


class Product(BaseModel):
    """
    Product model representing items offered by suppliers.
    
    All monetary values stored in minor units (cents).
    Includes CHECK constraints for data integrity.
    """
    __tablename__ = "products"
    
    # Supplier relationship
    supplier_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("suppliers.id"), nullable=False, index=True)
    
    # Product information
    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    sku: Mapped[str] = mapped_column(String(100), nullable=False, unique=True, index=True)
    unit: Mapped[str] = mapped_column(String(50), nullable=False)  # kg, L, piece, etc.
    
    # Pricing (in cents)
    price_cents: Mapped[int] = mapped_column(Integer, nullable=False)
    tax_rate: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)  # 0-100%
    
    # Inventory
    stock_qty: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    availability_status: Mapped[str] = mapped_column(String(20), nullable=False, default=AvailabilityStatus.AVAILABLE)
    
    # Status
    active: Mapped[bool] = mapped_column(default=True, index=True)
    
    # Relationships
    supplier: Mapped["Supplier"] = relationship("Supplier", back_populates="products", lazy="selectin")
    cart_items: Mapped[list["CartItem"]] = relationship("CartItem", back_populates="product", lazy="selectin")
    
    # Indexes and constraints
    __table_args__ = (
        UniqueConstraint("sku", name="uq_products_sku"),
        Index("idx_products_supplier_active", "supplier_id", "active"),
        # Trigram GIN index is created via Alembic migration (idx_products_search)
        CheckConstraint("price_cents >= 0", name="ck_products_price_cents"),
        CheckConstraint("stock_qty >= 0", name="ck_products_stock_qty"),
        CheckConstraint("tax_rate >= 0 AND tax_rate <= 100", name="ck_products_tax_rate"),
    )
    
    def __repr__(self):
        return f"<Product(id={self.id}, name={self.name}, sku={self.sku}, price_cents={self.price_cents})>"

