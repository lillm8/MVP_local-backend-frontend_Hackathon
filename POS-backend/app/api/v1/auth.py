"""Authentication endpoints for local and Clerk auth."""
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.errors import ValidationError
from app.core.security import create_local_jwt, get_current_user, verify_password


class DevLoginRequest(BaseModel):
    """Dev login request with email and password."""
    email: str
    password: str


class DevLoginResponse(BaseModel):
    """Dev login response with JWT token."""
    access_token: str
    token_type: str = "bearer"


class MeResponse(BaseModel):
    """Current user information."""
    sub: str
    email: str
    role: str


router = APIRouter()


@router.post("/dev/login", response_model=DevLoginResponse)
async def dev_login(request: DevLoginRequest):
    """
    Dev-only login endpoint for local authentication.
    
    Validates credentials against DEV_USERS environment variable.
    Returns JWT token for API access.
    
    Args:
        request: Email and password
    
    Returns:
        JWT access token
    
    Raises:
        401 Unauthorized: If credentials are invalid
        503 Service Unavailable: If local auth is not enabled
    """
    if settings.AUTH_PROVIDER != "local":
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Local auth is not enabled. Set AUTH_PROVIDER=local"
        )
    
    if not settings.DEV_USERS:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="DEV_USERS not configured"
        )
    
    # Parse DEV_USERS: "email:$2b$hash,email2:$2b$hash,..."
    users = {}
    for user_str in settings.DEV_USERS.split(","):
        user_str = user_str.strip()
        if ":" in user_str:
            email, hashed = user_str.split(":", 1)
            users[email] = hashed
    
    # Validate credentials
    if request.email not in users:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    hashed_password = users[request.email]
    if not verify_password(request.password, hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Extract role from email (simplified - in real implementation, fetch from DB)
    # For now, infer role from email prefix
    role = "ADMIN"  # Default role
    email_lower = request.email.lower()
    if "supplier" in email_lower:
        role = "SUPPLIER"
    elif "restaurant" in email_lower or "chef" in email_lower:
        role = "RESTAURANT"
    
    # Create JWT
    token = create_local_jwt(request.email, role)
    
    return DevLoginResponse(access_token=token, token_type="bearer")


@router.get("/me", response_model=MeResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    """
    Get current authenticated user information.
    
    Args:
        current_user: Authenticated user from JWT token
    
    Returns:
        Current user information (sub, email, role)
    """
    return MeResponse(
        sub=current_user.get("sub", ""),
        email=current_user.get("email", ""),
        role=current_user.get("role", "")
    )

