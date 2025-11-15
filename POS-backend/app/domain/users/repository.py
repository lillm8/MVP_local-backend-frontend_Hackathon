"""User repository for data access layer."""
from typing import Optional
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.users.models import User


class UserRepository:
    """Repository for user data access operations."""
    
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def create_user(self, email: str, clerk_user_id: str, role: str) -> User:
        """
        Create a new user in the database.
        
        Args:
            email: User email address
            clerk_user_id: Clerk's user identifier
            role: User role (restaurant, supplier, admin)
        
        Returns:
            Created User object
        """
        user = User(
            email=email,
            clerk_user_id=clerk_user_id,
            role=role
        )
        self.session.add(user)
        await self.session.commit()
        await self.session.refresh(user)
        return user
    
    async def get_by_email(self, email: str) -> Optional[User]:
        """
        Get user by email address (excluding soft-deleted).
        
        Args:
            email: User email address
        
        Returns:
            User object or None
        """
        stmt = select(User).where(
            User.email == email,
            User.deleted_at.is_(None)  # Soft delete filter
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
    
    async def get_by_clerk_id(self, clerk_user_id: str) -> Optional[User]:
        """
        Get user by Clerk user ID (excluding soft-deleted).
        
        Args:
            clerk_user_id: Clerk's user identifier
        
        Returns:
            User object or None
        """
        stmt = select(User).where(
            User.clerk_user_id == clerk_user_id,
            User.deleted_at.is_(None)  # Soft delete filter
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
    
    async def get_by_id(self, user_id: UUID) -> Optional[User]:
        """
        Get user by ID (excluding soft-deleted).
        
        Args:
            user_id: User UUID
        
        Returns:
            User object or None
        """
        stmt = select(User).where(
            User.id == user_id,
            User.deleted_at.is_(None)  # Soft delete filter
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

