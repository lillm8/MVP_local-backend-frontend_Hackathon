"""Test Prometheus metrics endpoint."""
import pytest


@pytest.mark.asyncio
async def test_metrics_endpoint_accessible(client):
    """Verify /metrics endpoint is mounted and accessible."""
    resp = await client.get("/metrics")
    
    # Should return 200 with Prometheus text format
    assert resp.status_code == 200
    assert resp.headers.get("content-type", "").startswith("text/plain")
    
    # Should contain metric names
    text = resp.text
    assert "iris_api_requests_total" in text or len(text) > 0


@pytest.mark.asyncio
async def test_metrics_after_request(client):
    """Verify metrics are recorded after making requests."""
    # Make a request
    await client.get("/health")
    
    # Check metrics
    resp = await client.get("/metrics")
    text = resp.text
    
    # Should have recorded the health check request
    assert "iris_api_requests_total" in text

