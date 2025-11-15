"""Restaurant menu items categorized into drinks, snacks, starters, food."""
from typing import Optional
from uuid import UUID

from sqlalchemy import CheckConstraint, Index, Integer, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import BaseModel


class MenuCategory(str):
    DRINK = "DRINK"
    SNACK = "SNACK"
    STARTER = "STARTER"
    FOOD = "FOOD"


class RestaurantMenuItem(BaseModel):
    """
    Menu item offered by a restaurant.
    Money stored in minor units (cents). Uses UTC timestamps from BaseModel.
    """
    __tablename__ = "restaurant_menu_items"

    restaurant_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("restaurants.id"), nullable=False, index=True)

    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    description: Mapped[Optional[str]] = mapped_column(String(2000), nullable=True)
    category: Mapped[str] = mapped_column(String(16), nullable=False, index=True, default=MenuCategory.FOOD)

    price_cents: Mapped[int] = mapped_column(Integer, nullable=False)
    active: Mapped[bool] = mapped_column(default=True, index=True)
    position: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)  # sorting within category

    # Relationships
    restaurant: Mapped["Restaurant"] = relationship("Restaurant", back_populates="menu_items", lazy="selectin")

    __table_args__ = (
        Index("idx_menu_items_restaurant_category", "restaurant_id", "category"),
        CheckConstraint("price_cents >= 0", name="ck_menu_items_price_cents"),
    )

    def __repr__(self):
        return f"<RestaurantMenuItem(id={self.id}, restaurant_id={self.restaurant_id}, name={self.name}, category={self.category})>"



