# Iris — Engineering Workflow & Update Guide

This README describes how to propose and ship changes to the Iris backend and frontend projects, and what Cursor should automatically do when this file or the PDR is updated.

---

## 0) Source of Truth

- **Backend_PDR.md** — Product Development Requirements (feature and schema specifications).
- **POS-backend/** — FastAPI project (routers, services, repos, schemas, Alembic migrations).
- **Iris-Frontend/** — Next.js project (UI + API integration).
- **README.md (this file)** — Process rules and Cursor automation instructions.

If **README.md** or **Backend_PDR.md** changes, **Cursor must treat those edits as authoritative** and reconcile the codebase (models, endpoints, jobs, tests, docs).

---

## 1) Update Flow

1. **Propose a change**
   - Edit **Backend_PDR.md** to describe new feature or schema/API change.
   - If the change affects workflow or process, update **README.md** too.

2. **Create a branch**
   - Git branch name = `feature/<short-description>`.
   - Neon branch name = same as Git branch.

3. **Implement**
   - Backend: update SQLAlchemy models, routers, services, and Celery tasks.
   - Frontend: modify pages, components, and API calls.
   - Generate Alembic migrations for DB schema changes.

4. **Test**
   - Unit tests for services/repos.
   - Integration tests for endpoints.
   - Worker tests for background jobs.
   - End-to-end tests for user flows.

5. **Document**
   - Update API docs, jobs table, metrics, and PDR references.

6. **Review & Deploy**
   - Apply migrations to **Neon staging**, QA, then deploy to **main** branch.

---

## 2) What Cursor Must Do When README/PDR Changes

### A) Schema Changes
- Update **SQLAlchemy models**.
- Generate Alembic migration:  
  ```bash
  alembic revision --autogenerate -m "message"
  alembic upgrade head
  ```
- Update DTOs/schemas, repositories, and tests.

### B) API Changes
- Update FastAPI routers and endpoints.
- Adjust services, repositories, and tests.
- Sync frontend API calls and docs.

### C) Background Jobs
- Update or create Celery tasks and schedules.
- Update metrics and job documentation.
- Add task-related tests.

### D) Security/Permissions
- Update JWT/RBAC checks and tests.

### E) Metrics
- Add or adjust Prometheus metrics with inline comments.

Cursor must annotate code with short comments linking changes to PDR sections.

---

## 3) Project Structure

```
POS-backend/
  app/
    api/v1/
    core/          # config, security, errors, tasks
    domain/        # per domain service/repo/schema/model
    db/
    workers/
  alembic/
    versions/
  alembic.ini
```

Each domain follows **Router → Service → Repository → Schemas** (SOLID).

---

## 4) Alembic Migrations

**Purpose:** Version-controlled schema changes.  
**Run inside:** `POS-backend` folder.

**Typical workflow:**
```bash
alembic revision --autogenerate -m "add table"
alembic upgrade head
```

**URIs:**
- App: `DATABASE_URL` (Pooled, PgBouncer)
- Alembic: `DATABASE_URL_DIRECT` (Direct, DDL)

---

## 5) Background Jobs Table

| Job | Schedule | Description |
|------|-----------|-------------|
| Forecast update | Nightly | Train and store new demand predictions |
| Price refresh | Hourly | Adjust dynamic prices |
| Invoice OCR | On upload | Extract and reconcile invoice lines |
| Notifications dispatch | Real-time | Push order and delivery updates |
| Connector sync | On-demand/Nightly | Sync supplier catalogs |
| Cart prefill | On checkout | Prepare wholesaler cart |
| Invoice pull | After checkout | Fetch confirmations/invoices |

---

## 6) Metrics & Monitoring

| Metric | Description |
|---------|-------------|
| iris_api_requests_total | Number of API requests |
| iris_api_errors_total | Count of 4xx/5xx responses |
| iris_api_latency_seconds | API latency histogram |
| iris_forecast_job_duration_seconds | Forecast job duration |
| connector_sync_success_total | Successful supplier syncs |
| connector_dom_failures_total | Failed supplier automation |

Cursor must include docstrings describing what each metric measures.

---

## 7) .env Configuration Reference

This project uses environment variables for Dev Mode (SQLite) and Production (Neon/Postgres).

- **DEV_MODE**: Enable developer-only features and guards. Required for `scripts/seed_dev.py`.
- **DEV_DATABASE_URL**: SQLite DSN for Dev Mode (default `sqlite+aiosqlite:///./dev.db`). The file is created at `POS-backend/dev.db`.
- **DATABASE_URL**: Pooled Neon async DSN used by the running app in production.
- **DATABASE_URL_DIRECT**: Direct Neon DSN for Alembic (DDL operations).
- **ALEMBIC_DATABASE_URL**: Preferred direct DSN for Alembic; overrides `DATABASE_URL_DIRECT` if set.
- **AUTH_PROVIDER, APP_SECRET, DEV_USERS**: Auth configuration. `AUTH_PROVIDER=local` for hackathon; `APP_SECRET` signs local JWTs; `DEV_USERS` is `email:hashedpassword` pairs for dev login.
- **STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY**: Stripe test keys used during hackathon.
- **REDIS_URL**: Optional; Celery broker/result backend.

Copy-paste `.env.example`:

```env
# DEV MODE
DEV_MODE=true
DEV_DATABASE_URL=sqlite+aiosqlite:///./dev.db

# POSTGRES (PRODUCTION)
DATABASE_URL=
DATABASE_URL_DIRECT=
ALEMBIC_DATABASE_URL=

# AUTH
AUTH_PROVIDER=local
APP_SECRET=
DEV_USERS="email:hashedpassword"

# STRIPE TEST (for hackathon)
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=

# OTHER OPTIONAL VARS
REDIS_URL=
```

---

## 8) Commit & PR Conventions

- **Conventional Commits** (e.g., `feat: add order sync job`).
- PRs must state:
  - Purpose & PDR section.
  - Migration details.
  - Test plan.
  - Env var additions (if any).

---

## 9) Performance Benchmarks

- p95 latency < 300ms  
- Forecast retrain < 10 minutes  
- Reconciliation ≥ 100 invoices/min

Cursor should add logging/timers to monitor these.

---

## 10) Security & Permissions

- JWT-based authentication.
- Role-based access (restaurant, supplier, admin).
- Ownership checks per resource.
- Audit logs for sensitive actions.
- Secrets encrypted (KMS/Vault).

Cursor should explain these policies inline in generated code.

---

## 11) API Documentation

- **OpenAPI docs:** Access at `/docs` (Swagger UI) and `/openapi.json` (OpenAPI spec)
- **Location:** http://localhost:8000/docs (development)
- **Metrics endpoint:** Access Prometheus metrics at `/metrics` (http://localhost:8000/metrics)
- **Pagination:** Offset/limit approach (default: 50 items, max: 100)
- **Filtering/Sorting:** TODO - Document query parameter format once finalized

---

## How to Launch the Project in Developer Mode (SQLite Dev Mode)

 Minimal steps to run backend + frontend locally using SQLite.

 - **Backend working directory:** `MVP_local-backend-frontend_Hackathon/POS-backend`
 - **SQLite file location:** `POS-backend/dev.db`
 - **Python:** 3.11+

 1) Create and activate virtualenv, install dependencies
```bash
python -m venv .venv
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
# macOS/Linux
source .venv/bin/activate
pip install -r requirements.txt
```

 2) Set Dev Mode environment
```bash
export DEV_MODE=true
# optional: set SQLite DSN (default creates POS-backend/dev.db)
export DEV_DATABASE_URL=sqlite+aiosqlite:///./dev.db
```

 3) Seed the dev database
```bash
python scripts/seed_dev.py
```

 4) Start the FastAPI server
```bash
uvicorn app.main:app --reload --port 8000
```

 5) Launch the frontend against the dev backend
```bash
cd Iris-Frontend
export NEXT_PUBLIC_API_URL=http://localhost:8000
npm install
npm run dev
```

 Notes:
 - `dev.db` is created at `POS-backend/dev.db`. Delete it to reset the local database.
 - If you prefer not to activate the virtualenv, on Windows you can prefix commands with `..\.venv\Scripts\python.exe -m` when running from the project root.

---

## Production Mode (Neon/Postgres)

 Use Neon/Postgres. Do NOT set `DEV_MODE`.

 1) .env with required Postgres URLs
```env
DATABASE_URL=postgresql+asyncpg://user:pass@POOLED_HOST/db?sslmode=require
DATABASE_URL_DIRECT=postgresql://user:pass@DIRECT_HOST/db?sslmode=require
ALEMBIC_DATABASE_URL=postgresql://user:pass@DIRECT_HOST/db?sslmode=require
```

 2) Run Alembic migrations
```bash
alembic upgrade head
```

 3) Run API (production settings)
```bash
# uvicorn
uvicorn app.main:app --host 0.0.0.0 --port 8000
# or gunicorn
gunicorn -k uvicorn.workers.UvicornWorker app.main:app --workers 2 --bind 0.0.0.0:8000
```

## Frontend in production mode
Set the frontend API base URL:
```bash
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

---

## 12) Final Notes

If this README or PDR changes, **Cursor must synchronize the codebase**:  
- Update affected models, routers, and tasks.  
- Regenerate migrations.  
- Adjust tests and metrics.
