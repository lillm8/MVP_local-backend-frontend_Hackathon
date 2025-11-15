import pytest


@pytest.mark.asyncio
async def test_list_restaurants(client):
    resp = await client.get("/api/v1/restaurants")
    assert resp.status_code == 200
    data = resp.json()
    assert "data" in data
    assert "total" in data



