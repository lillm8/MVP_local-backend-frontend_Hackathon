# IRIS BACKEND PRODUCT DEVELOPMENT REQUIREMENTS (PDR)
Version: 1.1

---

## 1. Overview
The backend powers the Iris marketplace by automating supplier–restaurant interactions, pricing, forecasting, reconciliation, and supplier integrations. It replaces manual communications (SMS, emails, PDFs) with a unified, secure, data-driven API layer.

---

## 2. Core Objectives
- Unify all data flows with an API-driven architecture.
- Automate forecasting, pricing, and reconciliation.
- Enable transparent supplier performance metrics.
- Provide hooks for external integrations and background automation.

---

## 3. Architecture Overview
| Layer | Technology | Role |
|-------|-------------|------|
| API Gateway | FastAPI + GraphQL | REST-only/GraphQL endpoints |
| Database | PostgreSQL via Neon | Serverless Postgres |
| ORM/Migrations | SQLAlchemy + Alembic | Model mapping + schema versioning |
| Cache/Queue | Redis + Celery | Background jobs and task queue |
| Storage | Cloudinary / AWS S3 | File and image hosting |
| Auth | Clerk / Auth0 | Role-based authentication |
| Payments | Stripe Connect | Split payments and payouts |
| Hosting | Render / AWS ECS | Containerized deployment |
| Observability | Prometheus + Grafana | Metrics and alerts |

---

## 4. File Structure
```
app/
  api/v1/
  core/                # config, security, errors, events, tasks
  domain/              # per domain services, repositories, schemas, models
  db/                  # base, session
  workers/             # celery workers
  __init__.py
alembic/
  versions/
alembic.ini
```

Each domain (Products, Orders, Invoices, Suppliers, Integrations) follows the **Router → Service → Repository → Schemas** structure to enforce SOLID.

---

## 5. Error Handling Standard
All errors return consistent JSON:
```json
{
  "error": "NotFoundError",
  "message": "Supplier not found",
  "status": 404,
  "timestamp": "2025-10-25T12:00:00Z"
}
```
FastAPI global exception handlers ensure all raised exceptions conform to this shape.

---

## 6. Service Layer Contracts
Each domain must implement:
- Router (`/api/v1/domain`)
- Service (business logic)
- Repository (data access)
- Schemas (Pydantic DTOs for request/response)

This maintains SOLID and separation of concerns.

---

## 7. Event System
- **Internal async events (Redis/Celery):** Background tasks inside Iris (e.g., send notification, update forecast).  
- **External webhooks:** Outbound events for future integrations (e.g., notify partner systems on order completion).

Defined events:
| Event | Type | Purpose |
|--------|------|----------|
| OrderPlaced | Internal | Trigger notifications and forecasts |
| DeliveryMarked | Internal | Update supplier metrics |
| InvoiceMatched | Internal + External | Trigger accounting webhook |

---

## 8. Background Jobs (Celery)
| Job | Frequency | Purpose |
|------|------------|----------|
| Forecast update | Nightly | Train and store new demand predictions |
| Price refresh | Hourly | Adjust dynamic prices |
| Invoice OCR | On upload | Extract and reconcile invoice lines |
| Notifications dispatch | Real-time | Push order and delivery updates |
| Connector sync | On-demand/Nightly | Sync supplier catalogs |
| Cart prefill | On checkout | Prepare wholesaler cart |
| Invoice pull | After checkout | Fetch confirmations/invoices |

---

## 9. Security Policies
- JWT-based auth with refresh flow.
- Role-based access control: restaurant/supplier/admin.
- Ownership checks per resource.
- Audit logs for sensitive actions.
- Encrypted secret storage (KMS/Vault).

Cursor must explain these security mechanisms inline when generated.

---

## 10. Performance Benchmarks
- API p95 latency < 300ms  
- Forecast retrain < 10 minutes  
- Reconciliation throughput ≥ 100 invoices/min

---

## 11. Testing Scope
- Unit tests for services and repositories.  
- Integration tests for endpoints.  
- Worker tests (mock ML and OCR).  
- E2E tests for major user flows.

---

## 12. Migrations & Branching (Alembic + Neon)
- One Alembic migration per feature branch.  
- Apply migrations to `staging` branch first, then `main`.  
- Neon branch names match Git branch names.  
- Commands:
  ```bash
  alembic revision --autogenerate -m "change message"
  alembic upgrade head
  ```
Cursor should scaffold these commands and manage Alembic migrations automatically when models change.

---

## 13. Environment Variables
```
# DATABASE_URL: pooled Neon URI (PgBouncer) for the running app.
DATABASE_URL=postgresql+asyncpg://user:pass@POOLED_HOST/db?sslmode=require

# DATABASE_URL_DIRECT: direct Neon URI for Alembic migrations (DDL).
DATABASE_URL_DIRECT=postgresql://user:pass@DIRECT_HOST/db?sslmode=require

# REDIS_URL: Celery broker and result backend.
REDIS_URL=redis://:password@host:6379/0

# STRIPE_SECRET_KEY / STRIPE_PUBLISHABLE_KEY: Stripe Connect credentials.
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# CLERK_API_KEY: authentication and user management API key.
CLERK_API_KEY=...

# FIREBASE_KEY: push notification service credentials.
FIREBASE_KEY=...
```
Cursor must include inline comments explaining each variable’s purpose.

---

## 14. Monitoring & Metrics
| Metric | Description |
|---------|--------------|
| iris_api_requests_total | Number of API requests received |
| iris_api_errors_total | Count of failed (4xx/5xx) responses |
| iris_api_latency_seconds | Histogram of request durations |
| iris_forecast_job_duration_seconds | Duration of forecast retraining jobs |
| connector_sync_success_total | Successful supplier syncs |
| connector_dom_failures_total | Connector automation failures |

Cursor must explain each metric inline when implemented.

---

## 15. Supplier Account Connector (Authenticated Mirror)
### Goal
Allow restaurants to securely connect wholesaler accounts (e.g., Martin & Servera) to mirror their catalog, prices, and order data without official integrations.

### User Flow
1. Restaurant clicks “Connect Supplier” → chooses supplier.
2. Iris shows consent (scopes: read catalog, prices, orders).  
3. Restaurant authenticates; short-lived session token captured.  
4. Background job syncs catalog, prices, and stock.  
5. Iris normalizes and displays supplier data in the marketplace.  
6. At checkout, Iris pre-fills supplier’s cart and redirects for confirmation.  

### Components
- Headless browser (Playwright) per supplier.
- Celery workers for crawling and sync.
- Vault/KMS for token encryption.
- Normalizer service to map supplier data → Iris schema.
- Consent and token models.

### Data Models
- `supplier_connection`: restaurant_id, supplier_key, status, scopes, last_sync_at.  
- `supplier_session_secret`: encrypted token reference.  
- `supplier_catalog_cache`: normalized supplier product data.

### API Endpoints
| Endpoint | Method | Purpose |
|-----------|---------|----------|
| /integrations/{supplier}/connect | POST | Begin consent + session |
| /integrations/{supplier}/status | GET | Return connection status |
| /integrations/{supplier}/sync | POST | Trigger catalog sync |
| /integrations/{supplier}/cart/prefill | POST | Prefill wholesaler cart |
| /integrations/{supplier} | DELETE | Disconnect and delete tokens |

### Background Jobs
- Connector sync: nightly or on-demand.  
- DOM watcher: detect selector changes.  
- Cart prefill: run during checkout.  
- Invoice pull: fetch confirmations.

### Security
- Explicit opt-in consent.  
- Short-lived session tokens.  
- No password storage.  
- Complete audit logging and disconnect workflow.

### Metrics
| Metric | Description |
|---------|--------------|
| connector_sync_success_total | Successful supplier syncs |
| connector_sync_duration_seconds | Time per sync run |
| connector_dom_failures_total | DOM/selector breakages |
| connector_cart_prefill_total | Prefill operations executed |

### KPIs
- % of restaurants connected to at least one supplier.  
- Sync success rate.  
- Cart prefill completion rate.  
- Time saved (reported).

### Difficulty
- **Technical:** Medium-high (headless browser maintenance).  
- **Legal:** Medium (must stay user-consented).  
- **Operational:** Medium (requires ongoing connector upkeep).

---

## 16. Performance & Monitoring Summary
Cursor must ensure automatic metric instrumentation and include short inline docstrings explaining each metric.

---

## 17. Development & Deployment Workflow

### Environment Activation & Command Order

Before running any backend commands:

1. **Activate the virtual environment**  
   ```bash
   # macOS/Linux
   source .venv/bin/activate
   # Windows
   .venv\Scripts\activate
   ```

2. **Install dependencies and set required env vars** (`DATABASE_URL`, `ALEMBIC_DATABASE_URL`, `APP_SECRET`, `AUTH_PROVIDER`, `DEV_USERS`).

3. **Apply migrations using the direct database URI:**
   ```bash
   alembic -x url=$ALEMBIC_DATABASE_URL upgrade head
   ```

4. **Start FastAPI with the pooled connection:**
   ```bash
   uvicorn app.main:app --reload
   ```

5. **Run pytest or seeding commands only after activation.**

### Authentication Modes

The backend supports dual-mode authentication:

- **Local Mode (`AUTH_PROVIDER=local`):** Development-only authentication using `DEV_USERS` environment variable with pre-hashed passwords. Access via `/auth/dev/login` endpoint.
- **Clerk Mode (`AUTH_PROVIDER=clerk`):** Production authentication using Clerk service with email+password. JWT tokens issued by Clerk.

**Critical:** No passwords are stored in Neon database. Local mode uses env var hashes; Clerk mode delegates to Clerk service.

### Database Timestamps

All database timestamps are stored in UTC:
- Use `TIMESTAMPTZ` (PostgreSQL timezone-aware timestamp type)
- Set `server_default=sa.text('now()')` for automatic UTC timestamps
- Convert to `Europe/Stockholm` timezone only for user-facing displays

---

## 18. Security, Testing & Ops Checkpoints
- All sensitive actions logged with trace IDs.  
- Tests auto-generated for services and endpoints.  
- Neon + Alembic migrations validated per branch before deploy.  
- Celery monitoring via Flower or Grafana.

---

## 19. Outcome
A secure, modular backend adhering to SOLID principles, supporting forecasting, reconciliation, dynamic pricing, and supplier integrations — ready for Cursor-assisted full-stack generation.
<!-- 417aceae-825d-48e7-9f9f-a550d84229a0 1dca677a-a130-44f7-87e7-a6b75c86dd24 -->
# POS Backend MVP (Dev-Only Local Auth, No External Keys)

## Scope

- Marketplace core: accounts, suppliers, restaurants, products, carts, orders, receipts/invoices JSON
- Dev-only local auth; Clerk scaffold placeholder (no external calls)
- Member tables for ownership checks with role enums
- Pagination with configurable limits, trigram search
- Idempotent order creation with transactions and row locking
- CORS, JSON logging, request IDs, DB-backed health checks
- Use Neon Postgres + Alembic; one initial migration; no passwords in DB

## Auth & Identity (DEV-ONLY)

- Feature flag: `AUTH_PROVIDER=local|clerk` (default: local)
- Local mode: `POST /auth/dev/login` issues HS256 JWT with `APP_SECRET`
- `DEV_USERS` env: `email:$2b$hash,...`
- Claims: `sub`, `email`, `role` in {ADMIN,SUPPLIER,RESTAURANT}
- Clerk mode: `verify_clerk_jwt` placeholder (no calls)
- `GET /me` derives account from JWT

## RBAC & Ownership

- Roles: `ADMIN`, `SUPPLIER`, `RESTAURANT`
- `require_role(*roles)` dependency
- Ownership via `supplier_members` and `restaurant_members` tables
- Suppliers mutate only their own resources

## Data Model

**Accounts & Organizations:**

- `accounts(id UUID PK, external_id TEXT NULL, email CITEXT UNIQUE, role ENUM('ADMIN','SUPPLIER','RESTAURANT'), org_id UUID NULL, created_at, updated_at)`
- `suppliers(id, name, contact_email, phone, city, lat NUMERIC(10,7), lon NUMERIC(10,7), active, created_at, updated_at)`
- `restaurants(id, name, contact_email, city, delivery_prefs JSONB, active, created_at, updated_at)`
- `supplier_members(id, account_id FK, supplier_id FK, role ENUM('OWNER','STAFF'), UNIQUE(account_id, supplier_id), created_at, updated_at)`
- `restaurant_members(id, account_id FK, restaurant_id FK, role ENUM('OWNER','STAFF'), UNIQUE(account_id, restaurant_id), created_at, updated_at)`

**Products:**

- `products(id, supplier_id FK, name, sku UNIQUE, unit, price_cents INT CHECK(>=0), tax_rate NUMERIC(5,2) CHECK(0-100), active, stock_qty INT CHECK(>=0), availability_status ENUM, created_at, updated_at)`

**Carts & Items:**

- `carts(id, restaurant_id FK, status ENUM('open','converted'), created_by_account_id FK, created_at, updated_at)`
- `cart_items(id, cart_id FK, product_id FK, qty NUMERIC(12,3) CHECK(>0), unit_price_cents INT CHECK(>=0), tax_rate NUMERIC(5,2) CHECK(0-100), created_at, updated_at)`

**Orders:**

- `orders(id, cart_id FK, buyer_restaurant_id FK, supplier_id FK, status ENUM('placed','confirmed','delivered','cancelled'), total_cents INT, tax_cents INT, CHECK(total_cents >= tax_cents AND tax_cents >= 0), payment_method ENUM, paid_at TIMESTAMPTZ, created_by_account_id FK, created_at, updated_at, delivered_at TIMESTAMPTZ)`

**Idempotency:**

- `idempotency_keys(id, key TEXT UNIQUE NOT NULL, order_id UUID FK→orders NULL, created_at TIMESTAMPTZ)`

All timestamps: TIMESTAMPTZ (UTC); money: minor units (cents)

## Indices & Extensions

- Enable `citext`, `pg_trgm` in migration
- `products(sku)` UNIQUE, `(supplier_id, active)`, `CREATE INDEX idx_products_search ON products USING GIN ((name || ' ' || sku) gin_trgm_ops)`
- `orders(buyer_restaurant_id, supplier_id, status, created_at DESC)`
- `UNIQUE(account_id, supplier_id)`, `UNIQUE(account_id, restaurant_id)`
- `idempotency_keys(key)` UNIQUE

## Alembic ENUMs

- Use explicit `op.execute("CREATE TYPE ...")` for all ENUMs

## API Surface

**Health/misc:** `GET /health` (DB check + pool stats), `GET /version`, `POST /echo`
**Auth:** `POST /auth/dev/login`, `GET /me`
**Suppliers:** `POST /suppliers` [ADMIN], `GET /suppliers?limit&offset`, `GET /suppliers/{id}`
**Restaurants:** `POST /restaurants` [ADMIN], `GET /restaurants?limit&offset`, `GET /restaurants/{id}`
**Products:**

- `GET /products?supplier_id&active&q&limit&offset` (trigram search on `q`)
- `POST /products` [SUPPLIER owner|ADMIN]
- `GET/PATCH/DELETE /products/{id}` [owner|ADMIN]
**Carts:**
- `POST /carts` [RESTAURANT], `GET /carts/{id}` [owner]
- `POST /carts/{id}/items`, `PATCH/DELETE /carts/{id}/items/{item_id}` [owner]
**Orders:**
- `POST /orders` (Idempotency-Key header, transaction + SELECT FOR UPDATE, decrement stock) [RESTAURANT]
- `GET /orders/{id}` [participants], `GET /orders?restaurant_id&supplier_id&status&limit&offset`
- `POST /orders/{id}/confirm` [SUPPLIER owner], `POST /orders/{id}/deliver` [SUPPLIER owner] (409 on invalid transitions)
- `GET /orders/{id}/receipt`, `GET /orders/{id}/invoice` (JSON)

## Pagination

- Env: `PAGE_LIMIT_DEFAULT`, `MAX_PAGE_LIMIT`
- All list endpoints accept `limit`, `offset`

## Concurrency & Idempotency

- Order creation: transaction + `SELECT ... FOR UPDATE` on products & cart_items
- `Idempotency-Key` header: on duplicate, return existing order (200)
- Invalid state transitions return 409

## Configuration

- Env: `DATABASE_URL` (pooled), `ALEMBIC_DATABASE_URL` (direct, alias `DATABASE_URL_DIRECT`)
- `APP_SECRET`, `AUTH_PROVIDER=local`, `DEV_USERS`
- `CORS_ORIGINS`, `PAGE_LIMIT_DEFAULT=50`, `MAX_PAGE_LIMIT=100`

## Ops & Observability

- CORS middleware with `CORS_ORIGINS`
- JSON structured logging
- Request IDs in responses
- Health check: `SELECT 1` + pool stats

## Validation & Testing

- Pytest + httpx:
- Dev auth, RBAC, ownership checks
- Pagination & trigram search
- Supplier-scoped product CRUD, ownership violations
- Cart→order, state transitions (409), idempotent retry
- Receipt/invoice JSON
- Keep DB connectivity test

## Seed

- 1 ADMIN, 1 SUPPLIER (+ org + membership), 1 RESTAURANT (+ org + membership), 4–6 products
- No passwords in DB

## Docs

- Update `docs/Backend_PDR.md`, `MASTER_PROMPT_BACKEND.md`:
- Dual auth, RBAC, entities, member tables, order state machine
- Pagination, search, idempotency, transactions
- ALEMBIC_DATABASE_URL preference

## Acceptance

- All endpoints work under `AUTH_PROVIDER=local`, no external keys
- Migration applied; tests pass
- No password data in Neon

# POS Backend MVP Implementation Status

## Completed

### Configuration
- [x] Added `AUTH_PROVIDER`, `DEV_USERS`, `APP_SECRET` to config
- [x] Added `ALEMBIC_DATABASE_URL` (preferred), `DATABASE_URL_DIRECT` fallback
- [x] Added `PAGE_LIMIT_DEFAULT=50`, `MAX_PAGE_LIMIT=100`
- [x] Added `CORS_ORIGINS="*"`
- [x] Made `extra = "ignore"` to allow extra env vars

### Security & Auth
- [x] Implemented local JWT auth with `POST /auth/dev/login`
- [x] Added `create_local_jwt()` for HS256 signing
- [x] Added `verify_password()` with bcrypt
- [x] Added `require_role(*roles)` dependency for RBAC
- [x] Updated `get_current_user` to support local/Clerk modes
- [x] Added Clerk placeholder function
- [x] Added `GET /me` endpoint

### Models Created
- [x] `Account` model (replaces User, no password fields)
- [x] `Supplier` model with lat/lon, active flag
- [x] `Restaurant` model with delivery_prefs JSONB
- [x] `SupplierMember` model with account_id, supplier_id, role
- [x] `RestaurantMember` model with account_id, restaurant_id, role
- [x] `Product` model with CHECK constraints (price_cents >= 0, stock_qty >= 0, tax_rate 0-100)
- [x] `Cart` model with status enum (open/converted)
- [x] `CartItem` model with CHECK constraints (qty > 0)
- [x] `Order` model with status enum (placed/confirmed/delivered/cancelled)
- [x] `IdempotencyKey` model for deduplication

### Alembic Setup
- [x] Updated `alembic/env.py` to import all models
- [x] Updated to use `settings.get_direct_db_url` property
- [x] Ready for migration generation

## TODO

### Migration Creation
- [ ] Run `alembic revision --autogenerate` to create migration
- [ ] Manually edit migration to:
  - Enable `citext` and `pg_trgm` extensions
  - Create all ENUMs with explicit `op.execute()`
  - Drop old `users` table
  - Add GIN trigram index: `CREATE INDEX idx_products_search ON products USING GIN ((name || ' ' || sku) gin_trgm_ops);`
  - Add CHECK constraints as defined in models
  - Add composite unique indexes for member tables

### API Endpoints
- [ ] Pagination helper function
- [ ] Suppliers router: POST [ADMIN], GET list/detail
- [ ] Restaurants router: POST [ADMIN], GET list/detail
- [ ] Products router: GET (with trigram search), POST [SUPPLIER owner|ADMIN], GET/PATCH/DELETE
- [ ] Carts router: POST [RESTAURANT], GET [owner], POST/PATCH/DELETE items
- [ ] Orders router: POST (with idempotency + SELECT FOR UPDATE), confirm/deliver [SUPPLIER owner], receipt/invoice JSON
- [ ] Health endpoint: DB check + pool stats
- [ ] Version endpoint
- [ ] Echo endpoint

### Middleware & Observability
- [ ] CORS middleware with configurable origins
- [ ] JSON structured logging
- [ ] Request ID middleware
- [ ] Update health endpoint to check DB

### Ownership Checks
- [ ] Helper functions to check supplier ownership
- [ ] Helper functions to check restaurant ownership
- [ ] Integrate ownership checks into API endpoints

### Tests
- [ ] Dev auth login test
- [ ] RBAC tests
- [ ] Pagination tests
- [ ] Trigram search tests
- [ ] Product CRUD with ownership tests
- [ ] Cart→order flow tests
- [ ] Idempotent order creation tests
- [ ] State transition tests (409 on invalid)
- [ ] Receipt/invoice JSON tests

### Seed Data
- [ ] Create seed fixture with:
  - 1 ADMIN account
  - 1 SUPPLIER account + supplier org + membership
  - 1 RESTAURANT account + restaurant org + membership
  - 4-6 products
- [ ] No passwords in DB, use DEV_USERS env

### Documentation
- [ ] Update `Backend_PDR.md`
- [ ] Update `MASTER_PROMPT_BACKEND.md`

## Current State

### Can't Complete Migration Due To:
1. Missing .env file (gitignored as expected)
2. Need to create .env.example with required variables
3. Need to install dependencies (pyjwt, bcrypt added to requirements.txt)
4. Models have circular imports that need TYPE_CHECKING workarounds

### Next Steps:
1. Install dependencies: `pip install pyjwt bcrypt`
2. Create .env file with:
   - DATABASE_URL (pooled)
   - ALEMBIC_DATABASE_URL or DATABASE_URL_DIRECT (direct)
   - APP_SECRET (random string)
   - DEV_USERS (comma-separated email:hash pairs)
3. Run `alembic revision --autogenerate` to create migration
4. Manually edit migration to add extensions, ENUMs, indexes
5. Run `alembic upgrade head` to apply migration
6. Continue with API endpoints, tests, seed data

## Notes
- All models use TIMESTAMPTZ for UTC timestamps
- All monetary values stored in minor units (cents)
- Using CITEXT for case-insensitive email comparison
- Using pg_trgm GIN index for fuzzy product search
- Member tables enforce ownership: UNIQUE(account_id, org_id)
- Order creation will use transactions + SELECT FOR UPDATE
- Idempotency handled via idempotency_keys table


