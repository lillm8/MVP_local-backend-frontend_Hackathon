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
