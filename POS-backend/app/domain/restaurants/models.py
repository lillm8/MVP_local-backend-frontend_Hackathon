"""Restaurant model and member relationship."""
from datetime import datetime
from typing import Optional
from uuid import UUID

from sqlalchemy import ForeignKey, Index, String
from sqlalchemy.dialects.postgresql import JSONB, UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import BaseModel
from app.domain.users.models import User


class Restaurant(BaseModel):
    """
    Restaurant organization model.
    
    Represents a restaurant that orders products from suppliers.
    Fields include delivery preferences stored as JSONB.
    """
    __tablename__ = "restaurants"
    
    # Basic information
    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    contact_email: Mapped[str] = mapped_column(String(255), nullable=False)
    city: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    
    # Delivery preferences (JSONB for flexibility)
    # Example: {"min_order_value": 500.00, "delivery_days": ["monday", "wednesday", "friday"]}
    delivery_prefs: Mapped[Optional[dict]] = mapped_column(JSONB, nullable=True)
    
    # Status
    active: Mapped[bool] = mapped_column(default=True, index=True)
    
    # Relationships
    members: Mapped[list["RestaurantMember"]] = relationship(
        "RestaurantMember", back_populates="restaurant", lazy="selectin"
    )
    carts: Mapped[list["Cart"]] = relationship(
        "Cart", back_populates="restaurant", lazy="selectin"
    )
    orders: Mapped[list["Order"]] = relationship(
        "Order", back_populates="restaurant", lazy="selectin"
    )
    menu_items: Mapped[list["RestaurantMenuItem"]] = relationship(
        "RestaurantMenuItem", back_populates="restaurant", lazy="selectin", cascade="all, delete-orphan"
    )
    supplier_connections: Mapped[list["SupplierConnection"]] = relationship(
        "SupplierConnection", back_populates="restaurant", lazy="selectin", cascade="all, delete-orphan"
    )
    
    # Indexes
    __table_args__ = (
        Index("idx_restaurants_active", "active"),
        Index("idx_restaurants_city", "city"),
    )
    
    def __repr__(self):
        return f"<Restaurant(id={self.id}, name={self.name}, active={self.active})>"


class RestaurantMember(BaseModel):
    """
    Restaurant membership model for ownership checks.
    
    Links accounts to restaurants with role (OWNER or STAFF).
    Used to enforce that only authorized accounts can manage restaurant resources.
    """
    __tablename__ = "restaurant_members"
    
    # Foreign keys
    user_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    restaurant_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("restaurants.id"), nullable=False, index=True)
    
    # Role (OWNER or STAFF)
    role: Mapped[str] = mapped_column(String(20), nullable=False, default="staff")
    
    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="restaurant_memberships", lazy="selectin")
    restaurant: Mapped["Restaurant"] = relationship("Restaurant", back_populates="members", lazy="selectin")
    
    # Unique constraint: one account can have one membership per restaurant
    __table_args__ = (
        Index("idx_restaurant_members_user_restaurant", "user_id", "restaurant_id"),
        Index("idx_restaurant_members_user_id", "user_id", unique=True),  # Simplified for MVP
    )
    
    def __repr__(self):
        return f"<RestaurantMember(account_id={self.account_id}, restaurant_id={self.restaurant_id}, role={self.role})>"
