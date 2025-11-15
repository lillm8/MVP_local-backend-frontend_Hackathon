import pytest


@pytest.mark.asyncio
async def test_list_products(client):
    resp = await client.get("/api/v1/products")
    assert resp.status_code == 200
    data = resp.json()
    assert "data" in data
    assert "total" in data



