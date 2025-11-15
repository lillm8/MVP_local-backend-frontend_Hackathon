"""Domain logic modules."""

# Import models that are referenced by string in other modules
# Keep this lightweight to avoid circular imports
from app.domain.menus.models import RestaurantMenuItem  # noqa: F401
from app.domain.integrations.models import (
    SupplierConnection,
    SupplierSessionSecret,
    SupplierCatalogCache,
)  # noqa: F401

