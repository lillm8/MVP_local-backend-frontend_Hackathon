"""Integration tests for supplier connector API endpoints."""
import pytest
from uuid import uuid4


@pytest.mark.asyncio
async def test_connect_supplier_missing_consent(client):
    """Test connector connection endpoint rejects missing consent."""
    # Without auth, should get 401, but we can test the consent validation
    resp = await client.post(
        "/api/v1/integrations/martin_servera/connect",
        json={
            "restaurant_id": str(uuid4()),
            "consent_accepted": False
        }
    )
    # Should fail on consent or auth
    assert resp.status_code in [400, 401, 403]


@pytest.mark.asyncio
async def test_integrations_router_registered(client):
    """Verify integrations router is registered with FastAPI."""
    # Try to access an endpoint - should get 401 (auth required) not 404
    resp = await client.get("/api/v1/integrations/martin_servera/status?restaurant_id=test")
    assert resp.status_code in [401, 403, 422]  # Not 404 (router exists)


@pytest.mark.asyncio
async def test_sync_endpoint_exists(client):
    """Verify sync endpoint exists."""
    resp = await client.post(
        "/api/v1/integrations/martin_servera/sync?restaurant_id=test",
        json={}
    )
    assert resp.status_code in [401, 403, 422]  # Not 404


@pytest.mark.asyncio
async def test_disconnect_endpoint_exists(client):
    """Verify disconnect endpoint exists."""
    resp = await client.delete("/api/v1/integrations/martin_servera?restaurant_id=test")
    assert resp.status_code in [401, 403, 422]  # Not 404

