"""Database connection and session management for Neon."""
from urllib.parse import urlparse, urlencode, parse_qs
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from app.core.config import settings

# Ensure DATABASE_URL uses async driver (postgresql+asyncpg://)
# If user provided postgresql://, convert it to postgresql+asyncpg://
db_url = settings.DATABASE_URL
if db_url.startswith("postgresql://") and not db_url.startswith("postgresql+asyncpg://"):
    db_url = db_url.replace("postgresql://", "postgresql+asyncpg://", 1)

# Fix query parameters for asyncpg: convert sslmode to ssl
parsed = urlparse(db_url)
if parsed.query:
    params = parse_qs(parsed.query)
    # Remove unsupported parameters (asyncpg doesn't support these)
    for unsupported in ['channel_binding']:
        if unsupported in params:
            del params[unsupported]
    # Convert sslmode=require to ssl=require (asyncpg format)
    if 'sslmode' in params:
        sslmode_val = params.pop('sslmode')[0]
        # If sslmode was "require", convert to ssl=require
        if sslmode_val == 'require':
            params['ssl'] = ['require']
    # Add ssl=require if not already present (we need SSL for Neon)
    if 'ssl' not in params:
        params['ssl'] = ['require']
    # Rebuild query string
    query = urlencode(params, doseq=True)
    db_url = f"{parsed.scheme}://{parsed.netloc}{parsed.path}?{query}"

# Create async engine for Neon using pooled connection
# Note: Neon's PgBouncer already handles connection pooling, so we use a small local pool
# to avoid double pooling. This minimizes connection overhead and cold-start impact.
engine = create_async_engine(
    db_url,
    pool_size=5,              # Small pool since PgBouncer manages concurrency
    max_overflow=0,           # No overflow connections needed
    pool_timeout=30,          # Connection timeout in seconds
    pool_pre_ping=True,       # Verify connections before use (prevents stale connections)
    future=True,              # Use async engine
)

# Async session maker
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,   # Keep objects after commit for queries
)


async def get_db() -> AsyncSession:
    """
    Dependency for FastAPI routes to get database session.
    Automatically closes session after request completes.
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

