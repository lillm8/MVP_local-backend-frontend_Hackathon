"""Supplier repository for data access layer."""
from typing import Optional
from uuid import UUID

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.suppliers.models import Supplier
from app.db.base import BaseModel


class SupplierRepository:
    """Repository for supplier data access operations."""
    
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def create(self, **kwargs) -> Supplier:
        """Create a new supplier."""
        supplier = Supplier(**kwargs)
        self.session.add(supplier)
        await self.session.commit()
        await self.session.refresh(supplier)
        return supplier
    
    async def get_by_id(self, supplier_id: UUID) -> Optional[Supplier]:
        """Get supplier by ID (excluding soft-deleted)."""
        stmt = select(Supplier).where(
            Supplier.id == supplier_id,
            Supplier.deleted_at.is_(None)
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
    
    async def list_all(
        self,
        limit: int = 50,
        offset: int = 0,
        active: Optional[bool] = None
    ) -> tuple[list[Supplier], int]:
        """
        List all suppliers with pagination.
        
        Returns:
            Tuple of (suppliers list, total count)
        """
        # Build base query
        base_query = select(Supplier).where(Supplier.deleted_at.is_(None))
        
        # Apply filters
        if active is not None:
            base_query = base_query.where(Supplier.active == active)
        
        # Get total count
        count_query = select(func.count()).select_from(base_query.subquery())
        total_result = await self.session.execute(count_query)
        total = total_result.scalar_one()
        
        # Get paginated results
        paginated_query = base_query.limit(limit).offset(offset).order_by(Supplier.created_at.desc())
        result = await self.session.execute(paginated_query)
        suppliers = result.scalars().all()
        
        return list(suppliers), total
    
    async def update(self, supplier: Supplier, **kwargs) -> Supplier:
        """Update supplier fields."""
        for key, value in kwargs.items():
            if value is not None:
                setattr(supplier, key, value)
        
        # Update timestamp (UTC)
        from datetime import datetime, timezone
        from sqlalchemy import update
        await self.session.execute(
            update(Supplier)
            .where(Supplier.id == supplier.id)
            .values(updated_at=datetime.now(timezone.utc))
        )
        
        await self.session.commit()
        await self.session.refresh(supplier)
        return supplier
    
    async def delete(self, supplier: Supplier) -> None:
        """Soft delete supplier."""
        from datetime import datetime, timezone
        from sqlalchemy import update
        await self.session.execute(
            update(Supplier)
            .where(Supplier.id == supplier.id)
            .values(deleted_at=datetime.now(timezone.utc))
        )
        await self.session.commit()

