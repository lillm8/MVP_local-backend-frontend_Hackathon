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
- [ ] Update `docs/Backend_PDR.md`
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


