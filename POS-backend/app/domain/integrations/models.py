"""Models for supplier connector integrations (authenticated mirror)."""
from datetime import datetime
from typing import Optional, TYPE_CHECKING
from decimal import Decimal

from sqlalchemy import String, Text, Index, ForeignKey, Numeric, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, Mapped, mapped_column

from app.db.base import BaseModel

if TYPE_CHECKING:
    from app.domain.restaurants.models import Restaurant


class SupplierConnection(BaseModel):
    """
    Supplier connection model for authenticated mirroring.
    
    Allows restaurants to connect their existing supplier accounts (e.g., Martin & Servera, Menigo)
    to mirror catalog, pricing, and order data without official API integrations.
    
    Security: No passwords stored. Only session tokens captured via headless browser automation.
    """
    __tablename__ = "supplier_connections"
    
    # Restaurant that owns this connection
    restaurant_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("restaurants.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    
    # Supplier identifier (e.g., "martin_servera", "menigo")
    supplier_key: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    
    # Connection status: "active", "disconnected", "failed"
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="active", index=True)
    
    # Scopes granted: ["catalog", "pricing", "orders"]
    scopes: Mapped[list[str]] = mapped_column(JSON, nullable=False, default=list)
    
    # Last successful sync timestamp
    last_sync_at: Mapped[Optional[datetime]] = mapped_column(
        nullable=True
    )
    
    # Consent given timestamp (GDPR requirement)
    consent_given_at: Mapped[datetime] = mapped_column(
        nullable=False
    )
    
    # Relationships
    restaurant: Mapped["Restaurant"] = relationship("Restaurant", back_populates="supplier_connections")
    session_secret: Mapped[Optional["SupplierSessionSecret"]] = relationship(
        "SupplierSessionSecret", back_populates="connection", uselist=False
    )
    catalog_cache: Mapped[list["SupplierCatalogCache"]] = relationship(
        "SupplierCatalogCache", back_populates="connection", cascade="all, delete-orphan"
    )
    
    # Indexes
    __table_args__ = (
        Index("idx_supplier_connections_restaurant", "restaurant_id"),
        Index("idx_supplier_connections_supplier", "supplier_key"),
        Index("idx_supplier_connections_status", "status"),
    )
    
    def __repr__(self):
        return f"<SupplierConnection(id={self.id}, supplier={self.supplier_key}, status={self.status})>"


class SupplierSessionSecret(BaseModel):
    """
    Encrypted session token for supplier connector authentication.
    
    CRITICAL: Store only encrypted tokens. Never store passwords.
    Tokens are short-lived (24 hours) and captured via Playwright automation.
    """
    __tablename__ = "supplier_session_secrets"
    
    # Link to connection
    connection_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("supplier_connections.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
        index=True
    )
    
    # Encrypted session token (KMS/Vault encryption)
    encrypted_token: Mapped[str] = mapped_column(Text, nullable=False)
    
    # Token expiration timestamp (24 hours from creation per MASTER_PROMPT_BACKEND.md)
    expires_at: Mapped[datetime] = mapped_column(
        nullable=False,
        index=True
    )
    
    # Relationships
    connection: Mapped["SupplierConnection"] = relationship("SupplierConnection", back_populates="session_secret")
    
    # Indexes
    __table_args__ = (
        Index("idx_session_secrets_expires", "expires_at"),
    )
    
    def __repr__(self):
        return f"<SupplierSessionSecret(connection_id={self.connection_id}, expires_at={self.expires_at})>"


class SupplierCatalogCache(BaseModel):
    """
    Cached normalized supplier product data.
    
    Stores product data mirrored from supplier portals for quick marketplace display.
    """
    __tablename__ = "supplier_catalog_cache"
    
    # Link to connection
    connection_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("supplier_connections.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    
    # External product identifier from supplier portal
    product_external_id: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    
    # Normalized product information
    name: Mapped[str] = mapped_column(String(500), nullable=False)
    price: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    currency: Mapped[str] = mapped_column(String(10), nullable=False, default="SEK")
    unit: Mapped[str] = mapped_column(String(50), nullable=False)  # kg, L, pcs
    
    # Last sync timestamp for this product
    synced_at: Mapped[datetime] = mapped_column(
        nullable=False,
        index=True
    )
    
    # Relationships
    connection: Mapped["SupplierConnection"] = relationship("SupplierConnection", back_populates="catalog_cache")
    
    # Indexes
    __table_args__ = (
        Index("idx_catalog_cache_connection", "connection_id"),
        Index("idx_catalog_cache_external_id", "product_external_id"),
        Index("idx_catalog_cache_synced", "synced_at"),
    )
    
    def __repr__(self):
        return f"<SupplierCatalogCache(id={self.id}, product={self.name}, price={self.price})>"

