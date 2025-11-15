"""Supplier model and member relationship."""
from datetime import datetime
from typing import Optional
from uuid import UUID

from sqlalchemy import ForeignKey, Index, Numeric, String, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import BaseModel
from app.domain.users.models import User


class MemberRole(str):
    """Member role enumeration."""
    OWNER = "owner"
    STAFF = "staff"


class Supplier(BaseModel):
    """
    Supplier organization model.
    
    Represents a food supplier/b wholesaler that provides products to restaurants.
    Fields include location (lat/lon) for distance calculations.
    """
    __tablename__ = "suppliers"
    
    # Basic information
    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    contact_email: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    city: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    
    # Location (for distance calculations)
    lat: Mapped[Optional[float]] = mapped_column(Numeric(10, 7), nullable=True)
    lon: Mapped[Optional[float]] = mapped_column(Numeric(10, 7), nullable=True)
    
    # Status
    active: Mapped[bool] = mapped_column(default=True, index=True)
    
    # Relationships
    members: Mapped[list["SupplierMember"]] = relationship(
        "SupplierMember", back_populates="supplier", lazy="selectin"
    )
    products: Mapped[list["Product"]] = relationship(
        "Product", back_populates="supplier", lazy="selectin"
    )
    orders: Mapped[list["Order"]] = relationship(
        "Order", back_populates="supplier", lazy="selectin"
    )
    
    # Indexes
    __table_args__ = (
        Index("idx_suppliers_active", "active"),
        Index("idx_suppliers_city", "city"),
    )
    
    def __repr__(self):
        return f"<Supplier(id={self.id}, name={self.name}, active={self.active})>"


class SupplierMember(BaseModel):
    """
    Supplier membership model for ownership checks.
    
    Links accounts to suppliers with role (OWNER or STAFF).
    Used to enforce that only authorized accounts can manage supplier resources.
    """
    __tablename__ = "supplier_members"
    
    # Foreign keys
    user_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    supplier_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("suppliers.id"), nullable=False, index=True)
    
    # Role (OWNER or STAFF)
    role: Mapped[str] = mapped_column(String(20), nullable=False, default=MemberRole.STAFF)
    
    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="supplier_memberships", lazy="selectin")
    supplier: Mapped["Supplier"] = relationship("Supplier", back_populates="members", lazy="selectin")
    
    # Unique constraint: one account can have one membership per supplier
    __table_args__ = (
        UniqueConstraint("user_id", "supplier_id", name="uq_supplier_members_user_supplier"),
    )
    
    def __repr__(self):
        return f"<SupplierMember(account_id={self.account_id}, supplier_id={self.supplier_id}, role={self.role})>"

