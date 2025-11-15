"""Supplier service for business logic."""
from typing import TYPE_CHECKING, Optional
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.suppliers.repository import SupplierRepository
from app.domain.suppliers.schemas import SupplierCreate, SupplierUpdate
from app.core.errors import NotFoundError

if TYPE_CHECKING:
    from app.domain.suppliers.models import Supplier


class SupplierService:
    """Service for supplier business logic."""
    
    def __init__(self, session: AsyncSession):
        self.repository = SupplierRepository(session)
    
    async def create_supplier(self, data: SupplierCreate) -> "Supplier":
        """Create a new supplier."""
        return await self.repository.create(**data.model_dump())
    
    async def get_supplier(self, supplier_id: UUID) -> "Supplier":
        """Get supplier by ID."""
        supplier = await self.repository.get_by_id(supplier_id)
        if not supplier:
            raise NotFoundError(f"Supplier with ID {supplier_id} not found")
        return supplier
    
    async def list_suppliers(
        self,
        limit: int = 50,
        offset: int = 0,
        active: Optional[bool] = None
    ) -> tuple[list["Supplier"], int]:
        """List suppliers with pagination."""
        return await self.repository.list_all(limit=limit, offset=offset, active=active)
    
    async def update_supplier(
        self,
        supplier_id: UUID,
        data: SupplierUpdate
    ) -> "Supplier":
        """Update supplier."""
        supplier = await self.get_supplier(supplier_id)
        
        # Only update non-None fields
        update_data = {k: v for k, v in data.model_dump().items() if v is not None}
        return await self.repository.update(supplier, **update_data)
    
    async def delete_supplier(self, supplier_id: UUID) -> None:
        """Delete supplier (soft delete)."""
        supplier = await self.get_supplier(supplier_id)
        await self.repository.delete(supplier)

