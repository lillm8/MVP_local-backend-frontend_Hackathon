"""Cart and cart item models."""
from datetime import datetime
from typing import Optional
from uuid import UUID

from sqlalchemy import CheckConstraint, ForeignKey, Index, Integer, Numeric, String
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import BaseModel


class CartStatus(str):
    """Cart status enumeration."""
    OPEN = "open"
    CONVERTED = "converted"


class Cart(BaseModel):
    """
    Shopping cart model for restaurants.
    
    A cart can contain multiple items and is linked to a restaurant.
    Status is 'open' while building, 'converted' after order creation.
    """
    __tablename__ = "carts"
    
    # Restaurant relationship
    restaurant_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("restaurants.id"), nullable=False, index=True)
    
    # Creator
    created_by_user_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    
    # Status
    status: Mapped[str] = mapped_column(String(20), nullable=False, default=CartStatus.OPEN, index=True)
    
    # Relationships
    restaurant: Mapped["Restaurant"] = relationship("Restaurant", back_populates="carts", lazy="selectin")
    items: Mapped[list["CartItem"]] = relationship("CartItem", back_populates="cart", lazy="selectin", cascade="all, delete-orphan")
    order: Mapped[Optional["Order"]] = relationship("Order", back_populates="cart", uselist=False, lazy="selectin")
    
    # Indexes
    __table_args__ = (
        Index("idx_carts_restaurant_status", "restaurant_id", "status"),
    )
    
    def __repr__(self):
        return f"<Cart(id={self.id}, restaurant_id={self.restaurant_id}, status={self.status})>"


class CartItem(BaseModel):
    """
    Cart item model representing a product in a cart.
    
    Stores qty, unit_price_cents, and tax_rate at time of add (for price consistency).
    Includes CHECK constraints for data integrity.
    """
    __tablename__ = "cart_items"
    
    # Relationships
    cart_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("carts.id", ondelete="CASCADE"), nullable=False, index=True)
    product_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("products.id"), nullable=False, index=True)
    
    # Quantity and pricing (snapshot at time of add)
    qty: Mapped[float] = mapped_column(Numeric(12, 3), nullable=False)
    unit_price_cents: Mapped[int] = mapped_column(Integer, nullable=False)  # Price per unit in cents
    tax_rate: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)  # 0-100%
    
    # Relationships
    cart: Mapped["Cart"] = relationship("Cart", back_populates="items", lazy="selectin")
    product: Mapped["Product"] = relationship("Product", back_populates="cart_items", lazy="selectin")
    
    # Indexes and constraints
    __table_args__ = (
        Index("idx_cart_items_cart", "cart_id"),
        Index("idx_cart_items_product", "product_id"),
        CheckConstraint("qty > 0", name="ck_cart_items_qty"),
        CheckConstraint("unit_price_cents >= 0", name="ck_cart_items_unit_price_cents"),
        CheckConstraint("tax_rate >= 0 AND tax_rate <= 100", name="ck_cart_items_tax_rate"),
    )
    
    def __repr__(self):
        return f"<CartItem(id={self.id}, cart_id={self.cart_id}, product_id={self.product_id}, qty={self.qty})>"
