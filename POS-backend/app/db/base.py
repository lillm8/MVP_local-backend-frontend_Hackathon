"""SQLAlchemy declarative base with UUID primary keys and soft delete support."""
from datetime import datetime
from typing import Optional
from uuid import uuid4

from sqlalchemy import DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    """Base class for all database models."""
    pass


class BaseModel(Base):
    """
    Abstract base model with UUID primary key, timestamps, and soft delete.
    
    All models should inherit from this to ensure:
    - UUID primary keys (not auto-incrementing integers)
    - Consistent timestamp handling (created_at, updated_at)
    - Soft delete support (deleted_at for GDPR compliance)
    - Timezone-aware timestamps (Europe/Stockholm)
    """
    __abstract__ = True
    
    # UUID primary key
    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid4,
        server_default=None,
    )
    
    # Timestamps (timezone-aware, UTC now())
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
    
    # Soft delete (GDPR compliance)
    deleted_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
        default=None,
    )
    
    def soft_delete(self):
        """Mark record as soft deleted."""
        self.deleted_at = func.now()
    
    @property
    def is_deleted(self) -> bool:
        """Check if record is soft deleted."""
        return self.deleted_at is not None

# Import models to ensure they are registered for relationship resolution
# Avoid circular import issues by placing imports at module end
# Model registration is handled by importing domain packages in app.domain.__init__

