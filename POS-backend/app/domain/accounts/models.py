"""Account model for user authentication and role management.
    
CRITICAL: This model does NOT store passwords. Authentication is handled
entirely by external providers (Clerk or local JWT). We store only user metadata.
"""
from datetime import datetime
from typing import Optional
from uuid import UUID

from typing import TYPE_CHECKING

from sqlalchemy import Enum as SAEnum, ForeignKey, Index, String, UniqueConstraint
from sqlalchemy.dialects.postgresql import CITEXT, UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import BaseModel

if TYPE_CHECKING:
    from app.domain.suppliers.models import SupplierMember
    from app.domain.restaurants.models import RestaurantMember


class AccountRole(str):
    """Account role enumeration."""
    ADMIN = "admin"
    SUPPLIER = "supplier"
    RESTAURANT = "restaurant"


class Account(BaseModel):
    """
    Account model storing only metadata (no password).
    
    Fields:
    - id: UUID primary key
    - external_id: External auth provider user ID (e.g., Clerk user_id)
    - email: Unique email address (case-insensitive CITEXT)
    - role: Account role (admin, supplier, restaurant)
    - org_id: Organization ID (supplier or restaurant)
    - created_at, updated_at, deleted_at: Timestamps for audit and soft delete
    """
    __tablename__ = "accounts"
    
    # External auth provider ID (Clerk user_id when AUTH_PROVIDER=clerk)
    external_id: Mapped[Optional[str]] = mapped_column(String(255), nullable=True, index=True)
    
    # Email and authentication (case-insensitive)
    email: Mapped[str] = mapped_column(CITEXT, unique=True, nullable=False, index=True)
    
    # Account role (admin, supplier, or restaurant)
    role: Mapped[str] = mapped_column(String(50), nullable=False, default=AccountRole.RESTAURANT)
    
    # Organization ID (links to supplier or restaurant)
    org_id: Mapped[Optional[UUID]] = mapped_column(PGUUID(as_uuid=True), nullable=True, index=True)
    
    # Relationships
    supplier_memberships: Mapped[list["SupplierMember"]] = relationship(
        "SupplierMember", back_populates="account", lazy="selectin"
    )
    restaurant_memberships: Mapped[list["RestaurantMember"]] = relationship(
        "RestaurantMember", back_populates="account", lazy="selectin"
    )
    
    # Indexes for efficient queries
    __table_args__ = (
        UniqueConstraint("email", name="uq_accounts_email"),
        UniqueConstraint("external_id", name="uq_accounts_external_id"),
        Index("idx_accounts_role", "role"),
        Index("idx_accounts_org_id", "org_id"),
    )
    
    def __repr__(self):
        return f"<Account(id={self.id}, email={self.email}, role={self.role})>"
