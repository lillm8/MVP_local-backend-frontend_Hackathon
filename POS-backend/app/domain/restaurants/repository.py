"""Restaurant repository for data access operations."""
from typing import Optional
from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.restaurants.models import Restaurant


class RestaurantRepository:
    """Repository for restaurant data access operations."""

    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, **kwargs) -> Restaurant:
        """Create a new restaurant."""
        restaurant = Restaurant(**kwargs)
        self.session.add(restaurant)
        await self.session.commit()
        await self.session.refresh(restaurant)
        return restaurant

    async def get_by_id(self, restaurant_id: UUID) -> Optional[Restaurant]:
        """Get restaurant by ID (excluding soft-deleted)."""
        stmt = select(Restaurant).where(
            Restaurant.id == restaurant_id,
            Restaurant.deleted_at.is_(None),
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def list_all(
        self,
        limit: int = 50,
        offset: int = 0,
        active: Optional[bool] = None,
        city: Optional[str] = None,
    ) -> tuple[list[Restaurant], int]:
        """
        List restaurants with pagination and optional filters.

        Returns:
            Tuple of (restaurants list, total count)
        """
        base_query = select(Restaurant).where(Restaurant.deleted_at.is_(None))

        if active is not None:
            base_query = base_query.where(Restaurant.active == active)
        if city:
            base_query = base_query.where(Restaurant.city == city)

        count_query = select(func.count()).select_from(base_query.subquery())
        total_result = await self.session.execute(count_query)
        total = total_result.scalar_one()

        paginated = base_query.limit(limit).offset(offset).order_by(Restaurant.created_at.desc())
        result = await self.session.execute(paginated)
        restaurants = result.scalars().all()
        return list(restaurants), total

    async def update(self, restaurant: Restaurant, **kwargs) -> Restaurant:
        """Update restaurant fields and persist."""
        for key, value in kwargs.items():
            if value is not None:
                setattr(restaurant, key, value)

        from datetime import datetime, timezone
        from sqlalchemy import update

        await self.session.execute(
            update(Restaurant)
            .where(Restaurant.id == restaurant.id)
            .values(updated_at=datetime.now(timezone.utc))
        )
        await self.session.commit()
        await self.session.refresh(restaurant)
        return restaurant

    async def delete(self, restaurant: Restaurant) -> None:
        """Soft delete restaurant by setting deleted_at."""
        from datetime import datetime, timezone
        from sqlalchemy import update

        await self.session.execute(
            update(Restaurant)
            .where(Restaurant.id == restaurant.id)
            .values(deleted_at=datetime.now(timezone.utc))
        )
        await self.session.commit()



