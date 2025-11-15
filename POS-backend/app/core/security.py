"""Security and authentication helpers for local and Clerk JWT validation."""
import bcrypt
import jwt
from datetime import datetime, timedelta
from functools import wraps
from typing import Callable, Optional

from clerk_backend_api import Clerk
from sqlalchemy import select
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.core.config import settings
from app.core.database import AsyncSessionLocal
from app.domain.users.models import User

# HTTP Bearer token scheme
security = HTTPBearer()

# Clerk client for JWT validation (only used when AUTH_PROVIDER=clerk)
clerk_client: Optional[Clerk] = None
if settings.AUTH_PROVIDER == "clerk" and settings.CLERK_API_KEY:
    clerk_client = Clerk(api_key=settings.CLERK_API_KEY)


def validate_local_jwt(token: str) -> dict:
    """
    Validate local JWT token signed with APP_SECRET.
    
    Args:
        token: JWT token from Authorization header
    
    Returns:
        Decoded token payload with user information
    
    Raises:
        HTTPException: If token is invalid or APP_SECRET is missing
    """
    if not settings.APP_SECRET:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="APP_SECRET not configured for local authentication"
        )
    
    try:
        decoded = jwt.decode(token, settings.APP_SECRET, algorithms=["HS256"])
        return decoded
    except jwt.InvalidTokenError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication token: {str(e)}"
        )


def validate_clerk_jwt(token: str) -> dict:
    """
    Validate Clerk JWT token (placeholder for future Clerk integration).
    
    Args:
        token: JWT token from Authorization header
    
    Returns:
        Decoded token payload with user information
    
    Raises:
        HTTPException: If token is invalid or Clerk is not configured
    """
    if not clerk_client:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Clerk authentication is not configured"
        )
    try:
        decoded = clerk_client.verify_token(token)
        return decoded
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication token: {str(e)}"
        )


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> dict:
    """
    Dependency to extract current user from JWT token.
    Uses AUTH_PROVIDER to determine which validation method to use.
    
    Args:
        credentials: HTTP Bearer credentials from request
    
    Returns:
        User information from decoded JWT token
    """
    token = credentials.credentials
    if settings.AUTH_PROVIDER == "local":
        payload = validate_local_jwt(token)
    else:
        payload = validate_clerk_jwt(token)

    # Resolve email -> user_id and inject into payload for ownership checks
    email = payload.get("email") or payload.get("sub")
    if email:
        try:
            async with AsyncSessionLocal() as session:
                res = await session.execute(
                    select(User.id, User.role).where(User.email == email, User.deleted_at.is_(None))
                )
                row = res.first()
                if row:
                    user_id, user_role = row
                    payload["user_id"] = user_id
                    # Backward-compatible alias expected by existing services
                    payload["account_id"] = user_id
                    # Prefer DB role if present
                    if user_role:
                        payload["role"] = str(user_role).upper()
        except Exception:
            # Non-fatal if lookup fails
            pass

    return payload


def require_role(*roles: str):
    """
    Dependency to enforce role-based access control (RBAC).
    
    Args:
        roles: One or more allowed roles (admin, supplier, restaurant)
    
    Returns:
        Dependency function
    
    Usage:
        @router.get("/endpoint")
        async def endpoint(current_user = Depends(require_role("admin", "supplier"))):
            ...
    """
    async def role_checker(
        current_user: dict = Depends(get_current_user)
    ) -> dict:
        user_role = current_user.get('role', '').upper()
        allowed_roles = [role.upper() for role in roles]
        
        if user_role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Required role(s): {', '.join(allowed_roles)}"
            )
        
        return current_user
    
    return role_checker


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a bcrypt hash."""
    return bcrypt.checkpw(
        plain_password.encode('utf-8'),
        hashed_password.encode('utf-8')
    )


def create_local_jwt(email: str, role: str) -> str:
    """
    Create a local JWT token for a user.
    
    Args:
        email: User email
        role: User role (admin, supplier, restaurant)
    
    Returns:
        Signed JWT token
    
    Raises:
        ValueError: If APP_SECRET is not configured
    """
    if not settings.APP_SECRET:
        raise ValueError("APP_SECRET not configured for local authentication")
    
    payload = {
        "sub": email,  # Subject (user identifier)
        "email": email,
        "role": role.upper(),
        "iat": datetime.utcnow(),
        "exp": datetime.utcnow() + timedelta(days=7)  # 7-day expiry
    }
    return jwt.encode(payload, settings.APP_SECRET, algorithm="HS256")

