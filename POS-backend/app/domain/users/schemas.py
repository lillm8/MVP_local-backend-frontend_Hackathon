"""Pydantic schemas for user request/response DTOs."""
from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class UserRegisterRequest(BaseModel):
    """Request schema for user registration.
    
    Note: Password is never persisted in our database.
    It is passed only to Clerk's server API for authentication.
    """
    email: EmailStr
    password: str = Field(..., min_length=8, description="Password (forwarded to Clerk, never stored)")
    role: str = Field(default="restaurant", description="User role: restaurant, supplier, or admin")
    
    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "password": "SecurePass123!",
                "role": "restaurant"
            }
        }


class UserResponse(BaseModel):
    """Response schema for user data (no password field)."""
    id: UUID
    email: str
    clerk_user_id: str
    role: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True  # Enable ORM mode for SQLAlchemy
        json_schema_extra = {
            "example": {
                "id": "550e8400-e29b-41d4-a716-446655440000",
                "email": "user@example.com",
                "clerk_user_id": "user_abc123",
                "role": "restaurant",
                "created_at": "2025-10-27T12:00:00+01:00",
                "updated_at": "2025-10-27T12:00:00+01:00"
            }
        }

