"""Restaurant service containing business logic."""
from typing import Optional, TYPE_CHECKING
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.errors import NotFoundError
from app.domain.restaurants.repository import RestaurantRepository
from app.domain.restaurants.schemas import RestaurantCreate, RestaurantUpdate

if TYPE_CHECKING:
    from app.domain.restaurants.models import Restaurant


class RestaurantService:
    """Service layer for restaurants."""

    def __init__(self, session: AsyncSession):
        self.repository = RestaurantRepository(session)

    async def create_restaurant(self, data: RestaurantCreate) -> "Restaurant":
        """Create a new restaurant."""
        return await self.repository.create(**data.model_dump())

    async def get_restaurant(self, restaurant_id: UUID) -> "Restaurant":
        """Fetch a restaurant by ID or raise NotFoundError."""
        restaurant = await self.repository.get_by_id(restaurant_id)
        if not restaurant:
            raise NotFoundError(f"Restaurant with ID {restaurant_id} not found")
        return restaurant

    async def list_restaurants(
        self,
        limit: int = 50,
        offset: int = 0,
        active: Optional[bool] = None,
        city: Optional[str] = None,
    ) -> tuple[list["Restaurant"], int]:
        """List restaurants with pagination and filters."""
        return await self.repository.list_all(limit=limit, offset=offset, active=active, city=city)

    async def update_restaurant(
        self,
        restaurant_id: UUID,
        data: RestaurantUpdate,
    ) -> "Restaurant":
        """Update an existing restaurant by ID."""
        restaurant = await self.get_restaurant(restaurant_id)
        update_data = {k: v for k, v in data.model_dump().items() if v is not None}
        return await self.repository.update(restaurant, **update_data)

    async def delete_restaurant(self, restaurant_id: UUID) -> None:
        """Soft delete a restaurant by ID."""
        restaurant = await self.get_restaurant(restaurant_id)
        await self.repository.delete(restaurant)



