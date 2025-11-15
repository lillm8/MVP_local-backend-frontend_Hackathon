import pytest


@pytest.mark.asyncio
async def test_health(client):
    resp = await client.get("/health")
    assert resp.status_code == 200
    data = resp.json()
    assert "status" in data
    assert "database" in data


@pytest.mark.asyncio
async def test_version_and_echo(client):
    v = await client.get("/version")
    assert v.status_code == 200
    e = await client.post("/echo", json={"x": 1})
    assert e.status_code == 200
    assert e.json()["echo"]["x"] == 1



