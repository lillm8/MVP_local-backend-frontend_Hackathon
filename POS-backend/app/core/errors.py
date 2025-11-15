"""Custom exceptions and error handlers."""
from datetime import datetime
from typing import Any, Optional

from fastapi import Request, status
from fastapi.responses import JSONResponse


class AppError(Exception):
    """Base exception for application errors."""
    
    def __init__(self, message: str, status_code: int = 500, error_type: Optional[str] = None):
        self.message = message
        self.status_code = status_code
        self.error_type = error_type or self.__class__.__name__


class NotFoundError(AppError):
    """Resource not found error."""
    
    def __init__(self, message: str):
        super().__init__(message, status_code=404, error_type="NotFoundError")


class ValidationError(AppError):
    """Validation error."""
    
    def __init__(self, message: str):
        super().__init__(message, status_code=422, error_type="ValidationError")


class ConflictError(AppError):
    """Resource conflict error (e.g., duplicate email)."""
    
    def __init__(self, message: str):
        super().__init__(message, status_code=409, error_type="ConflictError")


async def app_error_handler(request: Request, exc: AppError) -> JSONResponse:
    """
    Global error handler for custom application errors.
    Returns consistent error envelope as per PDR specifications.
    """
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.error_type,
            "message": exc.message,
            "status": exc.status_code,
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }
    )


async def general_error_handler(request: Request, exc: Exception) -> JSONResponse:
    """
    Global error handler for unexpected exceptions.
    Returns consistent error envelope.
    """
    return JSONResponse(
        status_code=500,
        content={
            "error": "InternalServerError",
            "message": "An unexpected error occurred",
            "status": 500,
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }
    )

