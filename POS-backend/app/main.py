"""FastAPI application entry point."""
from fastapi import FastAPI, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from prometheus_client import make_asgi_app

from app.api.v1 import auth, suppliers
from app.api.v1 import restaurants as restaurants_router
from app.api.v1 import products as products_router
from app.api.v1 import carts as carts_router
from app.api.v1 import orders as orders_router
from app.api.v1 import integrations as integrations_router
from app.core.database import get_db, AsyncSessionLocal, engine
from app.core.errors import (
    ConflictError,
    NotFoundError,
    ValidationError,
    app_error_handler,
    general_error_handler,
)
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.middleware import RequestIDMiddleware, JSONAccessLogMiddleware
from app.core.metrics import metrics_middleware

# Create FastAPI app
app = FastAPI(
    title="Iris Backend API",
    description="Backend API for Iris marketplace - supplier-restaurant automation platform",
    version="1.0.0",
    docs_url="/docs",           # OpenAPI Swagger UI
    openapi_url="/openapi.json"  # OpenAPI JSON spec
)
# CORS
origins = [o.strip() for o in settings.CORS_ORIGINS.split(",") if o.strip()] if settings.CORS_ORIGINS else ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins != ["*"] else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request ID + JSON access logging
app.add_middleware(RequestIDMiddleware)
app.add_middleware(JSONAccessLogMiddleware)

# Prometheus metrics middleware (per MASTER_PROMPT_BACKEND.md §13)
app.middleware("http")(metrics_middleware)

# Register global error handlers
app.add_exception_handler(NotFoundError, app_error_handler)
app.add_exception_handler(ValidationError, app_error_handler)
app.add_exception_handler(ConflictError, app_error_handler)
app.add_exception_handler(Exception, general_error_handler)

# Register API routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(suppliers.router, prefix="/api/v1/suppliers", tags=["Suppliers"])
app.include_router(restaurants_router.router, prefix="/api/v1/restaurants", tags=["Restaurants"])
app.include_router(products_router.router, prefix="/api/v1/products", tags=["Products"])
app.include_router(carts_router.router, prefix="/api/v1/carts", tags=["Carts"])
app.include_router(orders_router.router, prefix="/api/v1/orders", tags=["Orders"])
app.include_router(integrations_router.router, prefix="/api/v1/integrations", tags=["Supplier Connectors"])

# Mount Prometheus metrics endpoint (per MASTER_PROMPT_BACKEND.md §13)
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "name": "Iris Backend API",
        "version": "1.0.0",
        "docs": "/docs",
        "openapi": "/openapi.json"
    }


@app.get("/health")
async def health_check():
    """Health check: DB connectivity + pool stats."""
    db_ok = False
    try:
        async with AsyncSessionLocal() as session:
            await session.execute(text("SELECT 1"))
            db_ok = True
    except Exception:
        db_ok = False

    pool = getattr(engine, "sync_engine", engine).pool
    pool_stats = {
        "size": getattr(pool, "size", lambda: None)() if hasattr(pool, "size") else None,
        "checkedin": getattr(pool, "checkedin", lambda: None)() if hasattr(pool, "checkedin") else None,
        "checkedout": getattr(pool, "checkedout", lambda: None)() if hasattr(pool, "checkedout") else None,
    }

    status_text = "healthy" if db_ok else "unhealthy"
    return {"status": status_text, "database": "ok" if db_ok else "error", "pool": pool_stats}


@app.get("/version")
async def version():
    """API version info."""
    return {"version": app.version if hasattr(app, "version") else "1.0.0", "api": "v1"}


@app.post("/echo")
async def echo(request: Request):
    """Echo back the JSON body for testing."""
    try:
        body = await request.json()
    except Exception:
        body = None
    return {"echo": body}

