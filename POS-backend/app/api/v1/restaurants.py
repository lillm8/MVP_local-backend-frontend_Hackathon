"""Restaurant API endpoints."""
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.security import require_role
from app.domain.restaurants.schemas import (
    RestaurantCreate,
    RestaurantListResponse,
    RestaurantResponse,
    RestaurantUpdate,
)
from app.domain.restaurants.service import RestaurantService


router = APIRouter()


def get_restaurant_service(db: AsyncSession = Depends(get_db)) -> RestaurantService:
    """Dependency to get restaurant service."""
    return RestaurantService(db)


@router.post("", response_model=RestaurantResponse, status_code=status.HTTP_201_CREATED)
async def create_restaurant(
    data: RestaurantCreate,
    service: RestaurantService = Depends(get_restaurant_service),
    _: dict = Depends(require_role("ADMIN")),
):
    """
    Create a new restaurant (ADMIN only).
    """
    restaurant = await service.create_restaurant(data)
    return RestaurantResponse.model_validate(restaurant)


@router.get("", response_model=RestaurantListResponse)
async def list_restaurants(
    limit: int = Query(
        default=settings.PAGE_LIMIT_DEFAULT,
        ge=1,
        le=settings.MAX_PAGE_LIMIT,
        description="Number of items per page",
    ),
    offset: int = Query(default=0, ge=0, description="Number of items to skip"),
    active: Optional[bool] = Query(None, description="Filter by active status"),
    city: Optional[str] = Query(None, description="Filter by exact city"),
    service: RestaurantService = Depends(get_restaurant_service),
):
    """List restaurants with pagination and optional filters."""
    restaurants, total = await service.list_restaurants(
        limit=limit, offset=offset, active=active, city=city
    )
    return RestaurantListResponse(
        data=[RestaurantResponse.model_validate(r) for r in restaurants],
        total=total,
        limit=limit,
        offset=offset,
    )


@router.get("/{restaurant_id}", response_model=RestaurantResponse)
async def get_restaurant(
    restaurant_id: UUID,
    service: RestaurantService = Depends(get_restaurant_service),
):
    """Get a restaurant by ID."""
    restaurant = await service.get_restaurant(restaurant_id)
    return RestaurantResponse.model_validate(restaurant)


@router.patch("/{restaurant_id}", response_model=RestaurantResponse)
async def update_restaurant(
    restaurant_id: UUID,
    data: RestaurantUpdate,
    service: RestaurantService = Depends(get_restaurant_service),
    _: dict = Depends(require_role("ADMIN")),
):
    """Update a restaurant (ADMIN only)."""
    restaurant = await service.update_restaurant(restaurant_id, data)
    return RestaurantResponse.model_validate(restaurant)


@router.delete("/{restaurant_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_restaurant(
    restaurant_id: UUID,
    service: RestaurantService = Depends(get_restaurant_service),
    _: dict = Depends(require_role("ADMIN")),
):
    """Delete a restaurant (ADMIN only, soft delete)."""
    await service.delete_restaurant(restaurant_id)



