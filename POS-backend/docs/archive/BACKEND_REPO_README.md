# Iris Backend - POS System

Backend API for the Iris marketplace - automating supplier-restaurant interactions with forecasting, pricing, and reconciliation.

## Tech Stack

- **Python**: 3.11
- **Framework**: FastAPI (REST-only)
- **Database**: Neon serverless PostgreSQL
- **ORM**: SQLAlchemy (async)
- **Migrations**: Alembic
- **Authentication**: Clerk
- **Payments**: Stripe Connect (SEK, test mode)
- **Background Jobs**: Celery + Redis

## Backend Environment Activation

You must activate your Python environment before running any backend commands.

```bash
# 1) Create & activate venv
python -m venv .venv
source .venv/bin/activate    # macOS/Linux
.venv\Scripts\activate       # Windows

# 2) Install deps
pip install -r requirements.txt

# 3) Verify connection
which python
alembic current || true
```

**Do not run `alembic`, `uvicorn`, or `pytest` outside the activated environment.**

### Example workflow
```bash
# Apply migrations
ALEMBIC_DATABASE_URL=$ALEMBIC_DATABASE_URL alembic upgrade head

# Run API
uvicorn app.main:app --reload
```

## Quick Start

### 1. Environment Setup

```bash
# Create virtual environment
python -m venv .venv

# Activate (Windows PowerShell)
.venv\Scripts\Activate.ps1

# Activate (macOS/Linux)
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Database URLs
DATABASE_URL=postgresql+asyncpg://user:pass@POOLED_HOST/db?sslmode=require
DATABASE_URL_DIRECT=postgresql://user:pass@DIRECT_HOST/db?sslmode=require
# Or use ALEMBIC_DATABASE_URL for Alembic migrations
ALEMBIC_DATABASE_URL=postgresql://user:pass@DIRECT_HOST/db?sslmode=require

# Application
APP_SECRET=<dev secret>
AUTH_PROVIDER=local  # or 'clerk' for production

# Development users (local auth mode only)
# Format: "email:bcrypt_hash,email2:bcrypt_hash,..."
DEV_USERS="admin@iris.local:$2b$...,supplier@iris.local:$2b$...,chef@iris.local:$2b$..."

# Clerk Authentication (production mode)
CLERK_API_KEY=your_clerk_api_key

# Stripe (test mode)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Redis (for Celery)
REDIS_URL=redis://:password@host:6379/0
```

### 3. Database Setup

Generate and apply initial migrations (ensure virtual environment is activated):

```bash
# Generate initial migration
alembic revision --autogenerate -m "Initial schema with users table"

# Apply to database using direct connection
ALEMBIC_DATABASE_URL=$ALEMBIC_DATABASE_URL alembic upgrade head
```

### 4. Run the Server

```bash
uvicorn app.main:app --reload
```

The API will be available at:
- **API**: http://localhost:8000
- **Docs**: http://localhost:8000/docs
- **OpenAPI**: http://localhost:8000/openapi.json

## Project Structure

```
app/
  api/v1/              # API routers
  core/                # config, security, database, errors
  domain/              # domain logic (users, products, orders, etc.)
  db/                  # database base and session
  workers/             # Celery workers
alembic/
  versions/            # migration files
```

Each domain follows **Router → Service → Repository → Schemas** (SOLID principles).

## Development

### Code Quality

```bash
# Lint
ruff check app/

# Format
black app/

# Type check
mypy app/

# Run all
ruff check app/ && black app/ && mypy app/
```

### Testing

```bash
# Run tests
pytest

# With coverage
pytest --cov=app tests/
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/dev/login` - Development login (requires `AUTH_PROVIDER=local` and `DEV_USERS` configured)
- `GET /api/v1/auth/me` - Get current user info

**Note:** For production, use Clerk authentication (`AUTH_PROVIDER=clerk`). The `/auth/register` endpoint is not available; user registration is handled by Clerk.

### Background Jobs

Celery workers process background tasks:

- `update_forecast` - Nightly forecast training (2:00 AM UTC)

### Monitoring

- `GET /metrics` - Prometheus metrics endpoint
- `GET /health` - Health check with DB connectivity
- See `README.md` for complete API documentation and Celery job table.

## Documentation

- **Master Prompt**: `MASTER_PROMPT_BACKEND.md`
- **PDR**: `Backend_PDR.md`
- **Engineering Workflow**: `README.md`
- **Canonical PDR aggregate**: `backend-pdr.md`
- **Canonical system prompt aggregate**: `backend-system-prompt.md`

## License

[Your License Here]
