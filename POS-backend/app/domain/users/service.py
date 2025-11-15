"""User service for business logic and Clerk integration."""
from typing import Optional

from clerk_backend_api import Clerk
from clerk_backend_api.api.users import create_user as create_clerk_user
from clerk_backend_api.models.create_user_request import CreateUserRequest
from clerk_backend_api.models.user import User as ClerkUser
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.domain.users.repository import UserRepository
from app.domain.users.schemas import UserResponse


class UserService:
    """Service for user business logic."""
    
    def __init__(self, session: AsyncSession):
        self.repository = UserRepository(session)
        self.clerk_client = Clerk(api_key=settings.CLERK_API_KEY)
    
    async def register_user(self, email: str, password: str, role: str = "restaurant") -> UserResponse:
        """
        Register a new user by creating them in Clerk and storing metadata in Neon.
        
        Args:
            email: User email address
            password: User password (forwarded to Clerk, never logged or persisted)
            role: User role (default: restaurant)
        
        Returns:
            UserResponse with user data
        
        Raises:
            ValueError: If email already exists
            Exception: If Clerk user creation fails
        """
        # Check if user already exists
        existing_user = await self.repository.get_by_email(email)
        if existing_user:
            raise ValueError(f"User with email {email} already exists")
        
        # Create user in Clerk
        # Note: Password is passed to Clerk's API and never logged or stored locally
        clerk_request = CreateUserRequest(
            email_address=[email],
            password=password,  # Forwarded to Clerk, never logged
            skip_password_checks=False,
        )
        
        try:
            # Call Clerk's server API to create user
            clerk_response: ClerkUser = create_clerk_user.sync(
                client=self.clerk_client,
                body=clerk_request
            )
            
            # Get clerk_user_id from response
            clerk_user_id = clerk_response.id
            
        except Exception as e:
            # Log error but never log password
            raise Exception(f"Failed to create user in Clerk: {str(e)}")
        
        # Store user metadata in Neon (email, clerk_user_id, role)
        # No password is stored - authentication handled by Clerk
        user = await self.repository.create_user(
            email=email,
            clerk_user_id=clerk_user_id,
            role=role
        )
        
        return UserResponse.model_validate(user)
    
    async def get_user_by_email(self, email: str) -> Optional[UserResponse]:
        """
        Get user by email address.
        
        Args:
            email: User email address
        
        Returns:
            UserResponse or None
        """
        user = await self.repository.get_by_email(email)
        if not user:
            return None
        return UserResponse.model_validate(user)

