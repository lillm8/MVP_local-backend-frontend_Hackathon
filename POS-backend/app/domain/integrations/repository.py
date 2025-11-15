"""Repository for supplier connector data access."""
from datetime import datetime
from typing import Optional
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.integrations.models import (
    SupplierConnection,
    SupplierSessionSecret,
    SupplierCatalogCache
)


class SupplierConnectionRepository:
    """Repository for supplier connection data access."""
    
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def create_connection(
        self,
        restaurant_id: UUID,
        supplier_key: str,
        scopes: list[str],
        consent_given_at: datetime
    ) -> SupplierConnection:
        """Create a new supplier connection."""
        connection = SupplierConnection(
            restaurant_id=restaurant_id,
            supplier_key=supplier_key,
            scopes=scopes,
            consent_given_at=consent_given_at
        )
        self.session.add(connection)
        await self.session.commit()
        await self.session.refresh(connection)
        return connection
    
    async def get_by_restaurant_and_supplier(
        self,
        restaurant_id: UUID,
        supplier_key: str
    ) -> Optional[SupplierConnection]:
        """Get connection by restaurant and supplier."""
        stmt = select(SupplierConnection).where(
            SupplierConnection.restaurant_id == restaurant_id,
            SupplierConnection.supplier_key == supplier_key,
            SupplierConnection.deleted_at.is_(None)
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
    
    async def get_by_id(self, connection_id: UUID) -> Optional[SupplierConnection]:
        """Get connection by ID."""
        stmt = select(SupplierConnection).where(
            SupplierConnection.id == connection_id,
            SupplierConnection.deleted_at.is_(None)
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
    
    async def list_by_restaurant(self, restaurant_id: UUID) -> list[SupplierConnection]:
        """List all connections for a restaurant."""
        stmt = select(SupplierConnection).where(
            SupplierConnection.restaurant_id == restaurant_id,
            SupplierConnection.deleted_at.is_(None)
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())
    
    async def update_last_sync(self, connection_id: UUID) -> None:
        """Update last sync timestamp."""
        connection = await self.get_by_id(connection_id)
        if connection:
            connection.last_sync_at = datetime.now()
            await self.session.commit()
    
    async def delete(self, connection: SupplierConnection) -> None:
        """Soft delete connection."""
        connection.soft_delete()
        await self.session.commit()


class SupplierSessionSecretRepository:
    """Repository for session secret data access."""
    
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def create_secret(
        self,
        connection_id: UUID,
        encrypted_token: str,
        expires_at: datetime
    ) -> SupplierSessionSecret:
        """Create or update session secret."""
        # Check if secret already exists
        stmt = select(SupplierSessionSecret).where(
            SupplierSessionSecret.connection_id == connection_id
        )
        result = await self.session.execute(stmt)
        existing = result.scalar_one_or_none()
        
        if existing:
            existing.encrypted_token = encrypted_token
            existing.expires_at = expires_at
            await self.session.commit()
            return existing
        
        secret = SupplierSessionSecret(
            connection_id=connection_id,
            encrypted_token=encrypted_token,
            expires_at=expires_at
        )
        self.session.add(secret)
        await self.session.commit()
        await self.session.refresh(secret)
        return secret
    
    async def get_by_connection_id(self, connection_id: UUID) -> Optional[SupplierSessionSecret]:
        """Get session secret by connection ID."""
        stmt = select(SupplierSessionSecret).where(
            SupplierSessionSecret.connection_id == connection_id,
            SupplierSessionSecret.deleted_at.is_(None)
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
    
    async def delete_by_connection_id(self, connection_id: UUID) -> None:
        """Delete session secret."""
        secret = await self.get_by_connection_id(connection_id)
        if secret:
            secret.soft_delete()
            await self.session.commit()

