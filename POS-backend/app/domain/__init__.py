"""Domain logic modules."""

# Import models that are referenced by string in other modules
# Keep this lightweight to avoid circular imports
from app.domain.menus.models import RestaurantMenuItem  # noqa: F401

