"""User model for authentication and role management.
    
CRITICAL: This model does NOT store passwords. Authentication is handled
entirely by Clerk. We store only user metadata in our database.
"""
from datetime import datetime
from typing import Optional

from sqlalchemy import Index, String, UniqueConstraint
from app.db.base import BaseModel
from sqlalchemy.orm import Mapped, mapped_column, relationship


class UserRole(str):
    """User role enumeration."""
    RESTAURANT = "restaurant"
    SUPPLIER = "supplier"
    ADMIN = "admin"


class User(BaseModel):
    """
    User model storing only metadata (no password).
    
    Fields:
    - id: UUID primary key
    - email: Unique email address
    - clerk_user_id: Clerk's unique identifier (for authentication lookup)
    - role: User role (restaurant, supplier, admin)
    - created_at, updated_at, deleted_at: Timestamps for audit and soft delete
    
    Password handling:
    - Passwords are stored ONLY in Clerk
    - We retrieve clerk_user_id from Clerk and store it here
    - Never store password or password_hash in this model
    """
    __tablename__ = "users"
    
    # Email and authentication
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    clerk_user_id: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    
    # User role (restaurant, supplier, or admin)
    role: Mapped[str] = mapped_column(String(50), nullable=False, default=UserRole.RESTAURANT)
    
    # Indexes for efficient queries
    __table_args__ = (
        UniqueConstraint("email", name="uq_users_email"),
        UniqueConstraint("clerk_user_id", name="uq_users_clerk_user_id"),
        Index("idx_users_role", "role"),
    )
    
    # Relationships
    supplier_memberships: Mapped[list["SupplierMember"]] = relationship(
        "SupplierMember", back_populates="user", lazy="selectin"
    )
    restaurant_memberships: Mapped[list["RestaurantMember"]] = relationship(
        "RestaurantMember", back_populates="user", lazy="selectin"
    )
    
    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, role={self.role})>"

