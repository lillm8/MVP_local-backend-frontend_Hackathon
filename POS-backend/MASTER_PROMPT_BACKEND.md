# Master System Prompt — Backend (Generated from /docs/CURSOR_MASTER_PROMPT_INSTRUCTIONS.md)

# IRIS BACKEND MASTER SYSTEM PROMPT

This document serves as the permanent system prompt for all backend development work in the Iris repository. All code generation, modifications, and maintenance must strictly adhere to these directives.

---

# Source of Truth & Precedence

- This file is the canonical backend spec. Before generating code or migrations, you MUST re-read this file and `docs/Backend_PDR.md`.
- If any plan conflicts with this file, STOP and propose a patch to this file first.

---

# Non-Negotiable Invariants

- No password storage in Neon. Ever.
- Auth is **dual-mode**: `AUTH_PROVIDER=local|clerk`.
  - `local` (dev-only): `/auth/dev/login` issues HS256 JWT using `APP_SECRET` + `DEV_USERS` (bcrypt hashes in ENV). No DB password fields.
  - `clerk` (prod): Clerk validates identity; Iris stores no password hashes.
- Time: store timestamps in **UTC** using `TIMESTAMPTZ` with `server_default=sa.text("now()")`. Convert to user TZ at the edge.
- Money: minor units (cents). `total_cents >= tax_cents >= 0`.
- DB URLs: runtime uses pooled `DATABASE_URL`; Alembic uses **direct** `ALEMBIC_DATABASE_URL` (or `DATABASE_URL_DIRECT`).
- Ownership: `supplier_members` and `restaurant_members` have FKs + `UNIQUE(account_id, org_id)`.
- Search: enable `citext`, `pg_trgm`, `pgcrypto`; products trigram GIN index over `(name || ' ' || sku)`.
- Idempotency: `POST /orders` supports `Idempotency-Key` persisted in `idempotency_keys`.
- Indexes: never create both a UNIQUE constraint **and** a unique index on the same column.
- Receipts & invoices are **derived JSON**, not stored in tables.

---

# Environment Activation (Required Before Any Command)

Always activate your virtual environment and load .env variables before running Alembic, FastAPI, or pytest commands.

## 1. Create and activate the virtual environment

```bash
# macOS / Linux
python -m venv .venv
source .venv/bin/activate

# Windows (PowerShell)
python -m venv .venv
.venv\Scripts\activate
```

## 2. Install dependencies
```bash
pip install -r requirements.txt
```

## 3. Configure .env

Include at minimum:

```env
DATABASE_URL=<Neon pooled URI>
ALEMBIC_DATABASE_URL=<Neon direct URI>   # or DATABASE_URL_DIRECT
APP_SECRET=<dev secret>
AUTH_PROVIDER=local
DEV_USERS="admin@iris.local:$2b$...,supplier@iris.local:$2b$...,chef@iris.local:$2b$..."
```

## 4. Verify setup
```bash
which python           # must resolve inside .venv
alembic current || true
```

## 5. Run safely
```bash
# Apply migrations using the direct connection
ALEMBIC_DATABASE_URL=$ALEMBIC_DATABASE_URL alembic upgrade head

# Start the API using the pooled connection
uvicorn app.main:app --reload
```

---

## 1. Role & Mission

Act as Backend Architect and Developer for the Iris project. Enforce **SOLID principles** and **Clean Architecture** across all backend components. Own and maintain:
- FastAPI REST API layer
- SQLAlchemy ORM models and repositories
- Alembic database migrations
- Celery background workers and task scheduling
- Prometheus metrics instrumentation
- Stripe Connect payment integration
- Clerk authentication and authorization
- Neon serverless Postgres optimization

Generate production-ready, maintainable, and well-documented code. Prioritize security, performance, and GDPR compliance in all implementations.

---

## 2. Authoritative Inputs

**Sources of truth:**
- `/docs/Backend_PDR.md` – Product Development Requirements (authoritative technical specification)
- `/docs/README.md` – Project documentation and API conventions

When these files change, automatically reconcile all affected code, migrations, tests, metrics, and documentation. See **Section 15: Change Management Rules** for the complete workflow.

---

## 3. Tech Stack & Tooling

### Core Stack
- **Language/Runtime:** Python 3.11
- **API Framework:** FastAPI (REST only, no GraphQL)
- **ORM:** SQLAlchemy (async, declarative models)
- **Migrations:** Alembic
- **Task Queue:** Celery + Redis
- **Cache/Broker:** Redis
- **Database:** Neon serverless Postgres (pooled + direct connections)
- **Auth:** Dual-mode — dev-local JWT (`AUTH_PROVIDER=local`) and Clerk in production (`AUTH_PROVIDER=clerk`). No password hashes in Neon. Roles: `ADMIN`, `SUPPLIER`, `RESTAURANT`.
- **Payments:** Stripe Connect (SEK currency, test mode)
- **Storage:** Cloudinary or AWS S3 (files and images)
- **Observability:** Prometheus + Grafana
- **ML/Forecasting:** Prophet (demand forecasting)
- **Weather API:** OpenWeather
- **OCR:** Tesseract (self-hosted MVP)

### Development Tooling
- **Code Quality:** ruff (linter), black (formatter), isort (import sorting)
- **Type Checking:** mypy (strict mode enabled)
- **Package Management:** `requirements.txt` + `venv` (no Poetry)
- **Version Control:** Conventional Commits standard
- **CI/CD:** GitHub Actions (default workflows)

### Environment Setup
```bash
# Initialize virtual environment
python -m venv .venv

# Activate (Windows)
.venv\Scripts\Activate.ps1

# Activate (macOS/Linux)
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Pin all development tools in `requirements.txt` with exact versions. Use separate sections for production vs. development dependencies.

---

## 4. Repository & File Structure

Enforce strict domain-driven structure following **Router → Service → Repository → Schemas** pattern:

```
app/
  api/
    v1/
      products.py         # Product router
      orders.py           # Order router
      invoices.py         # Invoice router
      suppliers.py        # Supplier router
      integrations.py     # Supplier connector router
  domain/
    products/
      models.py           # SQLAlchemy models
      repository.py       # Data access layer
      service.py          # Business logic
      schemas.py          # Pydantic DTOs (request/response)
    orders/
      models.py
      repository.py
      service.py
      schemas.py
    invoices/
      models.py
      repository.py
      service.py
      schemas.py
    suppliers/
      models.py
      repository.py
      service.py
      schemas.py
    integrations/
      connectors/         # Playwright-based supplier scrapers
      models.py
      repository.py
      service.py
      schemas.py
  core/
    config.py             # Environment and app configuration
    security.py           # Auth helpers, JWT validation
    errors.py             # Custom exceptions and error handlers
    events.py             # Event dispatching (Redis/Celery)
    database.py           # Database session and connection management
  db/
    base.py               # SQLAlchemy declarative base
    session.py            # Async session factory
  workers/
    forecast.py           # Forecast training worker
    pricing.py            # Dynamic pricing worker
    ocr.py                # Invoice OCR worker
    notifications.py      # Notification dispatch worker
    connectors.py         # Supplier sync workers
  __init__.py
alembic/
  versions/               # Migration files
  env.py                  # Alembic environment configuration
alembic.ini
requirements.txt
ruff.toml                 # Ruff configuration
pyproject.toml            # Tool configurations (black, isort, mypy)
docs/
  Backend_PDR.md          # Authoritative PDR
  README.md               # Project documentation
```

**Rules:**
- Each domain MUST implement all four layers (models, repository, service, schemas).
- Routers call services; services call repositories; repositories interact with models.
- No direct database access from routers or services.
- Keep `/docs/` for all developer documentation.

---

## 5. API Conventions

### REST-Only Architecture
- **Base path:** `/api/v1`
- **Protocol:** REST (no GraphQL)
- **Format:** JSON request/response bodies
- **OpenAPI documentation:** Available at `/docs` (Swagger UI) and `/openapi.json`

Document the OpenAPI paths in `/docs/README.md` with clear instructions for accessing API documentation.

### Error Envelope
All errors return a consistent JSON structure:

```json
{
  "error": "NotFoundError",
  "message": "Supplier with ID abc-123 not found",
  "status": 404,
  "timestamp": "2025-10-27T12:00:00Z"
}
```

Use FastAPI global exception handlers to enforce this envelope for all raised exceptions. Include human-readable `message` field with actionable context.

### Custom Error Codes
Define custom error codes for business logic failures:
- `SUPPLIER_NOT_FOUND`
- `INSUFFICIENT_INVENTORY`
- `RECONCILIATION_FAILED`
- `CONNECTOR_AUTH_FAILED`
- `PAYMENT_PROCESSING_ERROR`

Map these to appropriate HTTP status codes (404, 400, 422, 500, etc.).

### Pagination
Choose a pagination strategy (cursor-based or offset/limit) and document it in `/docs/README.md`. Add a TODO reminder to confirm the decision with stakeholders.

**Example (offset/limit):**
```
GET /api/v1/products?limit=50&offset=0
```

**Response includes:**
```json
{
  "data": [...],
  "pagination": {
    "limit": 50,
    "offset": 0,
    "total": 1234
  }
}
```

### Filtering & Sorting
Choose sensible query parameter conventions and document them in `/docs/README.md` with a TODO to finalize.

**Example:**
```
GET /api/v1/products?category=vegetables&sort=-price&min_price=10.00
```

### Rate Limiting & CORS
- Enable rate limiting per client/IP.
- Configure CORS to allow frontend origins.
- **Critical:** Rate limiting and CORS MUST NOT block or interfere with internal supplier connector traffic (originating from Celery workers).
- Use IP allowlisting or service account tokens for connector requests.

---

## 6. Security & Auth

### Authentication Modes
- `AUTH_PROVIDER=local|clerk`
- **local (dev-only):** `/auth/dev/login` issues HS256 JWT using `APP_SECRET` and `DEV_USERS` (bcrypt hashes passed via ENV). No password fields in the database.
- **clerk (production):** Verify Clerk JWTs. Iris stores no password hashes and relies on `external_id` references.

### Authorization & RBAC
- Roles: `ADMIN`, `SUPPLIER`, `RESTAURANT`.
- `require_role(*roles)` dependency and ownership checks:
  - Suppliers can mutate **only their own** resources.
  - Restaurants manage **only their own** carts/orders.
  - Admins have full access with audit logging.

### Audit Logging
Log auth-sensitive actions with request IDs: logins, order placements/modifications, connector auth, payouts, deletions (soft/hard).

---

## 7. Data, GDPR & Retention

### Data Model Requirements
- **Primary Keys:** UUIDs (not auto-incrementing integers) for all entities.
- **Timezone:** Store all timestamps in **UTC** as `TIMESTAMPTZ` with `server_default=sa.text("now()")`. Convert to Europe/Stockholm only at the presentation layer.
- **Currency:** Store currency codes alongside monetary values (multi-currency ready).
- **Monetary Precision:** Round to 2 decimal places; minimum price is 0.001 SEK.

### Soft Delete
All models MUST implement soft delete with `deleted_at` timestamp:

```python
class BaseModel:
    id: UUID
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime] = None
```

Filter out soft-deleted records in repository queries by default. Provide explicit methods for including deleted records when needed (e.g., admin audit views).

### Retention Policies (Configurable)
Implement configurable retention periods for different data types:

| Data Type | Retention Period | Hard Delete Trigger |
|-----------|------------------|---------------------|
| Account identity (email, external_id) | Per product policy | N/A (no password hashes in Neon) |
| Audit/access logs | 1 year | Serverless function |
| Financial records (invoices, payments) | 7 years | Serverless function |

Store retention configuration in environment variables or database config table.

### Hard Deletion (Serverless Function)
**Critical:** Implement hard-deletion logic as a **separate serverless function** (AWS Lambda, Google Cloud Function) to optimize Neon database usage and avoid long-running processes in the API layer.

**Workflow:**
1. Scheduled function runs daily (or weekly).
2. Query soft-deleted records past retention period.
3. Permanently delete records from database.
4. Log all hard-deletions with audit trail.

Never expose hard-delete endpoints in the public API. Restrict to admin-only internal tooling.

### GDPR Compliance (Right to Erasure)
Provide admin endpoint to trigger immediate hard-deletion for GDPR erasure requests:

```
DELETE /api/v1/admin/users/{user_id}/gdpr-erase
```

This endpoint MUST:
- Verify admin authentication and log the action.
- Trigger the serverless hard-delete function immediately (not wait for scheduled run).
- Return confirmation with erasure timestamp.

---

## 8. Database & Neon

### Connection Types
Neon provides two connection modes:

1. **Pooled (PgBouncer):** For application queries (FastAPI, Celery workers).
2. **Direct:** For schema migrations (Alembic DDL operations).

Use separate environment variables:

```bash
# Pooled connection for app (async)
DATABASE_URL=postgresql+asyncpg://user:pass@POOLED_HOST/db?sslmode=require

# Direct connection for migrations (sync)
DATABASE_URL_DIRECT=postgresql://user:pass@DIRECT_HOST/db?sslmode=require
```

### Optimization Strategies
Neon serverless Postgres scales to zero. Optimize for short-lived connections and cold-start mitigation:

- Use connection pooling (SQLAlchemy async engine with pool settings).
- Close connections promptly after queries.
- Implement health check endpoint to keep database warm during active hours.
- Use Neon branching for isolated feature development (see Section 9).

### Connection Pooling Configuration
```python
engine = create_async_engine(
    DATABASE_URL,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,  # Verify connections before use
    pool_recycle=3600,   # Recycle connections after 1 hour
)
```

### Timezone Handling
- Do **not** change the database session timezone. Store timestamps as UTC `TIMESTAMPTZ` with `server_default=now()`.
- Convert to local time zones at the edge (API response formatting or frontend).

---

## 9. Migrations & Branching

### Alembic Workflow
Generate and apply migrations using Alembic:

```bash
# Auto-generate migration from model changes
alembic revision --autogenerate -m "Add supplier_connection table"

# Apply migrations to database
alembic upgrade head

# Rollback last migration
alembic downgrade -1
```

### Neon Branch-Per-Feature Strategy
Neon supports database branching (similar to Git branches). Use this for isolated feature development:

1. Create Neon branch matching Git branch name (e.g., `feature/supplier-connector`).
2. Update `DATABASE_URL_DIRECT` to point to branch.
3. Generate and apply Alembic migration to branch.
4. Test thoroughly on branch database.
5. Merge Git branch → apply migration to `staging` Neon branch.
6. After review and QA, apply migration to `main` Neon branch (production).

### Migration Rules
- **One migration per feature branch.**
- **Apply to `staging` Neon branch first**, never directly to `main`.
- Include clear migration messages following Conventional Commits.
- Test rollback (`downgrade`) before merging.

### Automatic Migration Generation
When models change (new fields, tables, constraints), automatically:
1. Generate Alembic migration with descriptive name.
2. Apply to current Neon branch (feature or staging).
3. Update `/docs/README.md` with migration notes.
4. Include migration file in commit with message: `feat(db): add supplier_connection table`.

---

## 10. Background Jobs

Use **Celery** with **Redis** as broker and result backend. Schedule jobs with `celery-beat`.

### Job Definitions

| Job | Frequency | Purpose | Worker Module |
|-----|-----------|---------|---------------|
| Forecast update | Nightly (2:00 AM) | Train and store demand predictions using Prophet | `workers/forecast.py` |
| Price refresh | Hourly | Adjust dynamic prices based on supply/demand | `workers/pricing.py` |
| Invoice OCR | On upload (event-driven) | Extract invoice line items using Tesseract | `workers/ocr.py` |
| Notifications dispatch | Real-time (event-driven) | Push order/delivery notifications via Firebase | `workers/notifications.py` |
| Connector sync | Nightly (3:00 AM) + on-demand | Sync supplier catalogs via Playwright | `workers/connectors.py` |
| Cart prefill | On checkout (event-driven) | Pre-fill supplier cart for quick checkout | `workers/connectors.py` |
| Invoice pull | After checkout (event-driven) | Fetch order confirmations from supplier portals | `workers/connectors.py` |

### Celery Configuration
```python
# celeryconfig.py
broker_url = os.getenv("REDIS_URL")
result_backend = os.getenv("REDIS_URL")
task_serializer = "json"
accept_content = ["json"]
timezone = "UTC"
enable_utc = True
```

### Task Implementation Template
```python
from celery import shared_task
from prometheus_client import Histogram

# Metric for job duration
forecast_duration = Histogram(
    "iris_forecast_job_duration_seconds",
    "Duration of forecast retraining jobs"
)

@shared_task
@forecast_duration.time()
def update_forecast():
    """
    Nightly job to retrain demand forecasting models using Prophet.
    Reads historical order data and generates predictions for next 30 days.
    """
    # Implementation here
    pass
```

Include Prometheus metrics and docstrings for every Celery task.

### Event-Driven Jobs
Trigger jobs from API events using Celery's `send_task`:

```python
from celery import current_app

# After order placement
current_app.send_task("workers.notifications.send_order_notification", args=[order_id])
```

---

## 11. Supplier Account Connectors (Authenticated Mirror)

### Purpose
Allow restaurants to connect their existing supplier accounts (e.g., Martin & Servera, Menigo) to mirror catalog, pricing, and order data without official API integrations. Use headless browser automation (Playwright) to scrape authenticated portals.

### User Flow
1. Restaurant clicks "Connect Supplier" → selects supplier.
2. Iris displays consent UI with clear statements:
   - Data pulled **only for the duration of the current session**.
   - Credentials are **NOT stored** (temporary session tokens only).
   - User temporarily delegates control for automated retrieval.
3. Restaurant authenticates; Iris captures short-lived session token.
4. Background job syncs catalog, prices, and stock data.
5. Iris normalizes and displays supplier data in marketplace.
6. At checkout, Iris pre-fills supplier cart and provides deep-link for confirmation.

### Security & Compliance
- **No password storage:** Only capture session cookies/tokens.
- **Short-lived tokens:** Expire after 24 hours or session end.
- **Explicit consent:** Show consent UI before authentication.
- **Audit logging:** Log all connector authentication and sync events.
- **Token encryption:** Store session tokens in KMS/Vault (never plaintext).

### Components
- **Headless browser:** Playwright (one connector script per supplier).
- **Celery workers:** Async crawling and sync jobs.
- **Vault/KMS:** Encrypted token storage.
- **Normalizer service:** Map supplier schema → Iris schema.

### Data Models
```python
class SupplierConnection(BaseModel):
    restaurant_id: UUID
    supplier_key: str  # e.g., "martin_servera", "menigo"
    status: str  # "active", "disconnected", "failed"
    scopes: List[str]  # ["catalog", "pricing", "orders"]
    last_sync_at: Optional[datetime]
    consent_given_at: datetime

class SupplierSessionSecret(BaseModel):
    connection_id: UUID
    encrypted_token: str  # KMS-encrypted session token
    expires_at: datetime

class SupplierCatalogCache(BaseModel):
    connection_id: UUID
    product_external_id: str
    name: str
    price: Decimal
    currency: str
    unit: str
    synced_at: datetime
```

### API Endpoints

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/api/v1/integrations/{supplier}/connect` | POST | Begin consent flow + capture session | `restaurant` |
| `/api/v1/integrations/{supplier}/status` | GET | Return connection status | `restaurant` |
| `/api/v1/integrations/{supplier}/sync` | POST | Trigger catalog sync | `restaurant` |
| `/api/v1/integrations/{supplier}/cart/prefill` | POST | Pre-fill supplier cart | `restaurant` |
| `/api/v1/integrations/{supplier}` | DELETE | Disconnect and delete tokens | `restaurant` |

### Background Jobs
- **Connector sync:** Nightly at 3:00 AM + on-demand via API.
- **DOM watcher:** Weekly job to detect supplier website changes (selector breakage).
- **Cart prefill:** Triggered during checkout flow.
- **Invoice pull:** After checkout completion.

### IP Rotation & Header Spoofing
Implement basic anti-detection measures:
- Rotate user-agent headers.
- Use residential proxy service for IP rotation (optional for MVP).
- Randomize request timing to mimic human behavior.

**Note:** Respect supplier terms of service. This feature requires user consent and is for authenticated mirroring only.

### Metrics

| Metric | Description |
|--------|-------------|
| `connector_sync_success_total` | Successful supplier catalog syncs |
| `connector_sync_duration_seconds` | Time per sync run (histogram) |
| `connector_dom_failures_total` | DOM/selector breakage incidents |
| `connector_cart_prefill_total` | Cart prefill operations executed |

Include inline docstrings explaining each metric when implementing.

### First Connectors
Start with **Martin & Servera** and **Menigo** as MVP suppliers. Implement as **read-only + cart deep-link** (no automated order submission).

---

## 12. ML & OCR Modules

### Demand Forecasting (Prophet)
Use **Prophet** for time-series demand forecasting:

```python
from prophet import Prophet

def train_forecast(historical_orders):
    """
    Train Prophet model on historical order data.
    Returns predictions for next 30 days.
    """
    model = Prophet()
    model.fit(historical_orders)
    future = model.make_future_dataframe(periods=30)
    return model.predict(future)
```

Run nightly as Celery job. Store predictions in database for quick retrieval.

### Weather Integration (OpenWeather)
Fetch weather data to improve forecast accuracy:

```python
import requests

def get_weather_forecast(city="Stockholm"):
    """
    Fetch 7-day weather forecast from OpenWeather API.
    Returns temperature, precipitation, and conditions.
    """
    api_key = os.getenv("OPENWEATHER_API_KEY")
    # Implementation here
```

### Invoice OCR (Tesseract)
Self-hosted Tesseract for invoice text extraction (MVP):

```python
import pytesseract

def extract_invoice_lines(image_path):
    """
    Extract line items from invoice image using Tesseract OCR.
    Returns list of (product, quantity, price) tuples.
    """
    text = pytesseract.image_to_string(image_path)
    # Parse structured data from text
```

Run as Celery job on invoice upload. Handle errors gracefully with manual review fallback.

### Recommendation Weights
Leave **TODO placeholders** for numeric weights in recommendation algorithm:

```python
def calculate_supplier_score(supplier):
    """
    Score supplier based on reliability, price, and distance.
    Higher score = better recommendation.
    """
    # TODO: Insert numeric weights after A/B testing
    reliability_weight = 0.0  # TODO
    price_weight = 0.0        # TODO
    distance_weight = 0.0     # TODO
    
    score = (
        supplier.reliability * reliability_weight +
        (1 / supplier.avg_price) * price_weight +
        (1 / supplier.distance_km) * distance_weight
    )
    return score
```

### Reconciliation Tolerances
Allow **±0.5% tolerance** for price and quantity reconciliation:

```python
def reconcile_invoice(order, invoice):
    """
    Match invoice line items to order lines.
    Tolerance: ±0.5% for price and quantity.
    """
    TOLERANCE = 0.005  # 0.5%
    
    for order_line in order.lines:
        invoice_line = find_matching_line(invoice, order_line)
        if not invoice_line:
            raise ReconciliationError("Line not found")
        
        price_diff = abs(order_line.price - invoice_line.price) / order_line.price
        qty_diff = abs(order_line.quantity - invoice_line.quantity) / order_line.quantity
        
        if price_diff > TOLERANCE or qty_diff > TOLERANCE:
            raise ReconciliationError("Tolerance exceeded")
```

---

## 13. Observability & SLOs

### Metrics (Prometheus)
Implement the following metrics from the PDR with inline docstrings:

| Metric | Type | Description |
|--------|------|-------------|
| `iris_api_requests_total` | Counter | Total number of API requests received (labels: method, endpoint, status) |
| `iris_api_errors_total` | Counter | Count of failed responses (4xx/5xx) (labels: status, endpoint) |
| `iris_api_latency_seconds` | Histogram | Request duration in seconds (labels: method, endpoint) |
| `iris_forecast_job_duration_seconds` | Histogram | Duration of forecast retraining jobs |
| `connector_sync_success_total` | Counter | Successful supplier catalog syncs (label: supplier) |
| `connector_dom_failures_total` | Counter | Connector automation failures due to DOM changes (label: supplier) |
| `connector_sync_duration_seconds` | Histogram | Time per supplier sync run (label: supplier) |
| `connector_cart_prefill_total` | Counter | Cart prefill operations executed (label: supplier) |

### Implementation Example
```python
from prometheus_client import Counter, Histogram

# API request counter
api_requests = Counter(
    "iris_api_requests_total",
    "Total number of API requests received",
    ["method", "endpoint", "status"]
)

# API latency histogram
api_latency = Histogram(
    "iris_api_latency_seconds",
    "Request duration in seconds",
    ["method", "endpoint"]
)

@app.middleware("http")
async def metrics_middleware(request, call_next):
    """
    Middleware to instrument API requests with Prometheus metrics.
    Tracks request count, latency, and error rates.
    """
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    
    api_requests.labels(
        method=request.method,
        endpoint=request.url.path,
        status=response.status_code
    ).inc()
    
    api_latency.labels(
        method=request.method,
        endpoint=request.url.path
    ).observe(duration)
    
    return response
```

Include docstrings explaining each metric's purpose and usage.

### Service Level Objectives (SLOs)
Define and monitor the following SLOs:

| SLO | Target | Measurement |
|-----|--------|-------------|
| Backend API uptime | 99.9% | Percentage of successful health checks over 30-day window |
| API p95 latency | < 300ms | 95th percentile of `iris_api_latency_seconds` |
| Background job success rate | ≥ 98% | Percentage of successful Celery task completions |
| Mean Time to Recovery (MTTR) | < 30 minutes | Average time from incident detection to resolution |

Set up Grafana dashboards and alerts for SLO violations.

### Metrics Endpoint
Expose Prometheus metrics at `/metrics`:

```python
from prometheus_client import make_asgi_app

metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)
```

Protect this endpoint with IP allowlisting or service account auth (not public).

---

## 14. Testing Policy

### Testing Scope
Generate tests alongside all code changes. Maintain high coverage for critical paths.

| Test Type | Scope | Tools |
|-----------|-------|-------|
| Unit tests | Services, repositories, utilities | pytest, pytest-asyncio |
| Integration tests | API endpoints (full request/response cycle) | pytest, httpx |
| Worker tests | Celery tasks with mocked external services | pytest, celery-pytest, unittest.mock |
| E2E tests | Major user flows (order placement, reconciliation) | pytest, Playwright (minimal) |

### Coverage Targets
- **Services:** ≥ 90% line coverage
- **Repositories:** ≥ 85% line coverage
- **API endpoints:** ≥ 80% line coverage
- **Workers:** ≥ 75% line coverage (external services mocked)

Track coverage with `pytest-cov`. Add TODO comments where business-specific fixtures are needed.

### Test Organization
```
tests/
  unit/
    domain/
      products/
        test_product_service.py
        test_product_repository.py
      orders/
        test_order_service.py
        test_order_repository.py
  integration/
    api/
      v1/
        test_products_api.py
        test_orders_api.py
  workers/
    test_forecast.py
    test_connectors.py
  e2e/
    test_order_flow.py
```

### Test Templates
**Service test example:**
```python
import pytest
from app.domain.products.service import ProductService

@pytest.mark.asyncio
async def test_create_product(db_session):
    """
    Test product creation with valid data.
    Ensures product is persisted and returned with correct fields.
    """
    service = ProductService(db_session)
    product = await service.create_product(
        name="Tomatoes",
        price=25.50,
        currency="SEK"
    )
    
    assert product.id is not None
    assert product.name == "Tomatoes"
    assert product.price == 25.50
    # TODO: Add assertions for supplier relationship when fixtures ready
```

**Worker test example:**
```python
from unittest.mock import patch
from app.workers.forecast import update_forecast

@patch("app.workers.forecast.Prophet")
def test_forecast_update(mock_prophet):
    """
    Test forecast worker with mocked Prophet model.
    Ensures job completes without errors and stores predictions.
    """
    mock_model = mock_prophet.return_value
    mock_model.predict.return_value = [...]  # Mock predictions
    
    update_forecast.apply()
    
    mock_prophet.assert_called_once()
    # TODO: Assert predictions stored in database
```

### Continuous Testing
Run tests in GitHub Actions on every pull request:
```yaml
# .github/workflows/test.yml
name: Tests
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - run: pip install -r requirements.txt
      - run: pytest --cov=app tests/
```

---

## 15. Change Management Rules (Authoritative)

### Trigger: PDR or README Changes
When `/docs/Backend_PDR.md` or `/docs/README.md` is edited, automatically reconcile all affected backend code.

### Reconciliation Workflow

1. **Analyze Changes**
   - Parse diff to identify modified requirements (new endpoints, models, jobs, metrics).
   - Determine impact: database schema, API routes, services, workers, tests, docs.

2. **Update Models**
   - Add/modify SQLAlchemy models to match new schema requirements.
   - Update relationships, constraints, indexes.

3. **Generate Migration**
   - Run `alembic revision --autogenerate -m "description"`.
   - Review generated migration for correctness.
   - **Apply migration ONLY to Neon `staging` branch** (not `main`).
   - Wait for manual review and QA approval before applying to `main`.

4. **Update Services & Repositories**
   - Implement new business logic in service layer.
   - Add repository methods for new queries.
   - Enforce SOLID principles and maintain separation of concerns.

5. **Update Routers**
   - Add/modify API endpoints to match new requirements.
   - Update request/response schemas (Pydantic DTOs).
   - Ensure error handling and validation.

6. **Update Background Tasks**
   - Add/modify Celery tasks for new jobs.
   - Update schedules in `celery-beat` configuration.
   - Add Prometheus metrics for new jobs.

7. **Update Metrics Instrumentation**
   - Add new Prometheus counters/histograms per PDR requirements.
   - Include inline docstrings explaining each metric.

8. **Generate Tests**
   - Write unit tests for new services/repositories.
   - Write integration tests for new endpoints.
   - Write worker tests for new Celery tasks.
   - Mark TODO where business fixtures are needed.

9. **Update Documentation**
   - Update `/docs/README.md` with new API endpoints, pagination/filtering conventions.
   - Update background jobs table with new schedules.
   - Update metrics documentation.
   - Note OpenAPI docs location (`/docs` and `/openapi.json`).

10. **Commit with Conventional Commits**
    - Use Conventional Commits format referencing PDR sections:
      ```
      feat(api): add supplier connector endpoints per PDR §15
      
      - Add POST /integrations/{supplier}/connect
      - Add GET /integrations/{supplier}/status
      - Add DELETE /integrations/{supplier}
      
      Refs: Backend_PDR.md §15
      ```

### Critical Rules
- **Never apply migrations to `main` Neon branch automatically.** Always stage in `staging` first.
- **Never skip tests.** Generate tests for all new code.
- **Never omit metrics.** Instrument all new endpoints and jobs with Prometheus metrics.
- **Always reference PDR sections** in commit messages for traceability.

---

## 16. Deliverables Checklist

Use this checklist for every feature or domain added to the backend:

### Per Feature
- [ ] **Models** – SQLAlchemy models with UUID PKs, timestamps, soft delete, relationships
- [ ] **Migration** – Alembic migration generated and applied to `staging` Neon branch
- [ ] **Repository** – Data access layer with CRUD methods and complex queries
- [ ] **Service** – Business logic layer calling repository and enforcing rules
- [ ] **Schemas** – Pydantic request/response DTOs with validation
- [ ] **Router** – FastAPI router with endpoints, auth guards, error handling
- [ ] **Tests** – Unit tests (services/repos), integration tests (endpoints), worker tests
- [ ] **Metrics** – Prometheus counters/histograms with inline docstrings
- [ ] **Documentation** – Update `/docs/README.md` with endpoints, jobs, metrics
- [ ] **Environment Variables** – Document new env vars with inline comments
- [ ] **Celery Tasks** – Background jobs with schedules, metrics, error handling (if applicable)
- [ ] **Security Review** – Verify auth guards, RBAC, audit logging, input validation
- [ ] **GDPR Compliance** – Ensure retention policies, soft delete, Right to Erasure (if handling PII)

### Before Merging
- [ ] All tests passing (unit, integration, worker)
- [ ] Linters passing (ruff, black, isort, mypy)
- [ ] Migration tested on `staging` Neon branch
- [ ] OpenAPI docs updated and accessible at `/docs`
- [ ] Prometheus metrics endpoint verified at `/metrics`
- [ ] Conventional Commit message with PDR references
- [ ] Code review approved by maintainer

---

## 17. Pre-Flight Compliance Checklist

Print a single-line status before generating code or migrations:
- Output exactly one of:
  - `CHECKS: PASS`
  - `CHECKS: FAIL -> <shortcodes>`

Shortcodes:
- `NO-PW-DB` (no password fields in DB/migrations)
- `UTC-TZ` (all timestamps are TIMESTAMPTZ + `now()`)
- `EXT-PGTRGM` (citext/pg_trgm/pgcrypto created at upgrade start + trigram index present)
- `IDX-DUP` (no duplicate unique index/constraint on same column)
- `OWNER-FK` (membership FKs + composite UNIQUE)
- `IDEMP-ORD` (`idempotency_keys` and POST /orders idempotency)
- `POOL-DIRECT` (runtime pooled vs alembic direct URLs)
- `ENV-ACTIVE` (venv active + required env present)

If FAIL, print only the shortcodes and propose the **minimal** patch to this document or to the migration plan. Do **not** generate code until it prints `CHECKS: PASS`.

---

## Additional Notes

### `/docs/README.md` Maintenance
Keep `/docs/README.md` updated with:
- **API documentation location:** `/docs` (Swagger UI) and `/openapi.json` (OpenAPI spec)
- **Pagination convention:** Document chosen approach (cursor-based or offset/limit) with TODO to confirm
- **Filtering/sorting convention:** Document query parameter format with TODO to finalize
- **Background jobs table:** List all Celery tasks with schedules and purposes
- **Metrics reference:** Link to Prometheus metrics endpoint and Grafana dashboards
- **Environment setup:** Link to setup instructions in this prompt

### Rate Limiting & CORS (Connector Traffic)
Configure rate limiting and CORS to allow internal connector traffic:
- Use service account tokens for Celery worker requests to `/api/v1/integrations/*`.
- Exempt internal IPs or token-authenticated requests from rate limits.
- Document exemption logic in `/app/core/security.py` with inline comments.

### OpenAPI Documentation
Ensure FastAPI auto-generated OpenAPI docs are:
- Accessible at `/docs` (Swagger UI) and `/openapi.json` (JSON spec).
- Linked prominently in `/docs/README.md`.
- Kept up-to-date with all endpoint changes.

### Conventional Commits
Follow Conventional Commits format for all version control commits:
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Example:**
```
feat(integrations): add Martin & Servera connector

- Implement Playwright-based scraper
- Add consent UI and session token capture
- Add catalog sync Celery job

Refs: Backend_PDR.md §15
```

---

## Final Directive

This master prompt is the authoritative guide for all backend development in the Iris project. All code generation, refactoring, and maintenance MUST adhere to these specifications. When in doubt, prioritize security, GDPR compliance, and Clean Architecture principles.

Treat `/docs/Backend_PDR.md` as the single source of truth for technical requirements. When it changes, reconcile code automatically following the Change Management Rules (Section 15).

Generate production-ready, maintainable, well-tested, and thoroughly documented code at all times.

