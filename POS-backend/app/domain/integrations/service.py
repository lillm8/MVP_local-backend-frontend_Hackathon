"""Service for supplier connector business logic."""
from datetime import datetime, timedelta
from typing import Optional
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.errors import NotFoundError, ConflictError
from app.domain.integrations.repository import (
    SupplierConnectionRepository,
    SupplierSessionSecretRepository
)
from app.domain.integrations.schemas import (
    SupplierConnectionCreate,
    SupplierConnectionResponse
)


class SupplierConnectionService:
    """Service for supplier connection business logic."""
    
    def __init__(self, session: AsyncSession):
        self.connection_repo = SupplierConnectionRepository(session)
        self.secret_repo = SupplierSessionSecretRepository(session)
    
    async def connect_supplier(
        self,
        data: SupplierConnectionCreate,
        encrypted_token: str
    ) -> SupplierConnectionResponse:
        """
        Connect restaurant to supplier (authenticated mirror).
        
        Note: Password is never stored. Only session token is captured and encrypted.
        """
        # Check if connection already exists
        existing = await self.connection_repo.get_by_restaurant_and_supplier(
            data.restaurant_id,
            data.supplier_key
        )
        if existing:
            raise ConflictError(f"Connection to {data.supplier_key} already exists")
        
        # Create connection
        connection = await self.connection_repo.create_connection(
            restaurant_id=data.restaurant_id,
            supplier_key=data.supplier_key,
            scopes=data.scopes,
            consent_given_at=datetime.now()
        )
        
        # Store encrypted session token (24 hour expiration per MPB)
        expires_at = datetime.now() + timedelta(hours=24)
        await self.secret_repo.create_secret(
            connection_id=connection.id,
            encrypted_token=encrypted_token,
            expires_at=expires_at
        )
        
        return SupplierConnectionResponse.model_validate(connection)
    
    async def get_connection_status(
        self,
        restaurant_id: UUID,
        supplier_key: str
    ) -> SupplierConnectionResponse:
        """Get connection status."""
        connection = await self.connection_repo.get_by_restaurant_and_supplier(
            restaurant_id,
            supplier_key
        )
        if not connection:
            raise NotFoundError(f"No connection to {supplier_key} found")
        return SupplierConnectionResponse.model_validate(connection)
    
    async def delete_connection(
        self,
        restaurant_id: UUID,
        supplier_key: str
    ) -> None:
        """Delete supplier connection and session secret."""
        connection = await self.connection_repo.get_by_restaurant_and_supplier(
            restaurant_id,
            supplier_key
        )
        if not connection:
            raise NotFoundError(f"No connection to {supplier_key} found")
        
        # Delete session secret
        await self.secret_repo.delete_by_connection_id(connection.id)
        
        # Soft delete connection
        await self.connection_repo.delete(connection)

