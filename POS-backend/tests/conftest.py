import os
import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import AsyncSession

from app.main import app
from app.core.database import AsyncSessionLocal


@pytest_asyncio.fixture
async def db_session() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session


@pytest_asyncio.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as ac:
        yield ac


@pytest.fixture
def auth_headers_admin() -> dict:
    # Minimal stub: tests can set a valid token via /auth/dev/login instead
    return {}


