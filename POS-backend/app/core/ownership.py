"""Ownership helpers for supplier and restaurant resources."""
from typing import Optional
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.users.models import UserRole
from app.domain.restaurants.models import RestaurantMember
from app.domain.suppliers.models import SupplierMember


async def check_supplier_ownership(
    session: AsyncSession,
    user_role: str,
    user_id: UUID,
    supplier_id: UUID,
) -> bool:
    """
    Check if the account owns or belongs to the supplier.
    Admins bypass ownership checks.
    """
    if user_role and user_role.lower() == UserRole.ADMIN:
        return True

    stmt = select(SupplierMember).where(
        SupplierMember.user_id == user_id,
        SupplierMember.supplier_id == supplier_id,
    )
    result = await session.execute(stmt)
    membership = result.scalar_one_or_none()
    return membership is not None


async def check_restaurant_ownership(
    session: AsyncSession,
    user_role: str,
    user_id: UUID,
    restaurant_id: UUID,
) -> bool:
    """
    Check if the account owns or belongs to the restaurant.
    Admins bypass ownership checks.
    """
    if user_role and user_role.lower() == UserRole.ADMIN:
        return True

    stmt = select(RestaurantMember).where(
        RestaurantMember.user_id == user_id,
        RestaurantMember.restaurant_id == restaurant_id,
    )
    result = await session.execute(stmt)
    membership = result.scalar_one_or_none()
    return membership is not None



