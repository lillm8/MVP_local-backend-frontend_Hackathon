"""Unit tests for supplier connector models."""
import pytest
from datetime import datetime, timedelta
from uuid import uuid4

from app.domain.integrations.models import (
    SupplierConnection,
    SupplierSessionSecret,
    SupplierCatalogCache
)


def test_supplier_connection_model():
    """Test SupplierConnection model initialization."""
    connection = SupplierConnection(
        restaurant_id=uuid4(),
        supplier_key="martin_servera",
        status="active",
        scopes=["catalog", "pricing"],
        consent_given_at=datetime.now()
    )
    
    assert connection.supplier_key == "martin_servera"
    assert connection.status == "active"
    assert len(connection.scopes) == 2
    assert "catalog" in connection.scopes


def test_supplier_session_secret_model():
    """Test SupplierSessionSecret model initialization."""
    secret = SupplierSessionSecret(
        connection_id=uuid4(),
        encrypted_token="encrypted_token_123",
        expires_at=datetime.now() + timedelta(hours=24)
    )
    
    assert secret.encrypted_token == "encrypted_token_123"
    assert secret.expires_at > datetime.now()


def test_supplier_catalog_cache_model():
    """Test SupplierCatalogCache model initialization."""
    cache = SupplierCatalogCache(
        connection_id=uuid4(),
        product_external_id="prod_123",
        name="Tomatoes",
        price=25.50,
        currency="SEK",
        unit="kg",
        synced_at=datetime.now()
    )
    
    assert cache.name == "Tomatoes"
    assert cache.price == 25.50
    assert cache.currency == "SEK"
    assert cache.unit == "kg"

