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

