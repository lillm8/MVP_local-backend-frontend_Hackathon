# Cursor Instructions: How to Generate the Iris Backend Master System Prompt

This document tells **Cursor** exactly how to produce the **Master System Prompt (Backend)** for the Iris project. It includes **inputs/decisions** already made, the **structure** the prompt must follow, and **hard requirements** Cursor must enforce in generated code.

---

## 1) Source Inputs (decisions already made)
- **Language/Runtime:** Python 3.11
- **Package manager:** `requirements.txt` + `venv` (no Poetry)
  - Init: `python -m venv .venv` → activate (`venv\Scripts\Activate.ps1` on Windows / `source .venv/bin/activate` on macOS/Linux) → `pip install -r requirements.txt`
- **Architecture:** SOLID + Clean Architecture
- **Tooling:** ruff, black, isort, mypy (strict)
- **Commits/CI:** Conventional Commits; GitHub Actions default
- **Docs:** OpenAPI enabled and easy to find (clear path/name); developer docs in `/docs/`
- **API style:** **REST** (versioned `/api/v1/`), **custom error codes** with human-readable messages
- **Pagination:** Cursor chooses best approach and documents it; remind to finalize in README
- **Filtering/Sorting:** Cursor chooses sensible convention and documents it; remind to finalize in README
- **Rate limiting & CORS:** enabled; must NOT break supplier mirroring connectors
- **Auth:** Clerk; roles = restaurant/supplier/admin; email+password flow
- **Payments:** Stripe Connect in **SEK**, **test mode** for now
- **DB:** Neon serverless Postgres; UUID PKs; multi-currency ready (store currency code); Europe/Stockholm timezone
- **Units/Currency:** Monetary rounding to 2 decimals; min price 0.001 SEK; units flexible (kg/L/pcs)
- **Soft delete:** yes (`deleted_at`); strict GDPR architecture with retention and Right to Erasure
- **Retention policy (configurable):**
  - Login info (email + password hash): hard-delete after 30 days from soft-delete/inactive
  - Audit/access logs: 1 year
  - Financial/invoices: 7 years
  - Implement **hard-deletion as a separate serverless function** (Lambda/Cloud Function) to optimize Neon usage
- **Neon optimization:** short-lived connections, pooling, branch-per-feature; minimize cold-start impact
- **ML/OCR/Weather:** Prophet (forecasting), OpenWeather (weather), Tesseract self-hosted (OCR MVP)
- **Recommendation weights:** based on reliability, price, distance — **leave TODO placeholders to insert numeric weights**
- **Reconciliation tolerances:** ±0.5% for price and quantity
- **Supplier Connectors (Authenticated Mirror):** first = Martin & Servera, Menigo; **read-only + cart deep-link**; basic IP rotation + header spoofing; consent UI must state:
  1) Data pulled only for the duration of the current session
  2) Credentials are NOT stored (temporary tokens only)
  3) User temporarily delegates control for automated retrieval
- **Schedules:** use defaults from PDR; no extra maintenance windows
- **Observability:** keep PDR metric set; choose reasonable SLO/SLA
- **Deploy:** Backend on **AWS**; Frontend already built (Vercel); README/docs live in `/docs/`
- **Legal:** no extra guidance here (do not modify)

---

## 2) Output Goal
Generate a **single Master System Prompt (Backend)** that Cursor will use permanently for this repo. The prompt must:
- Encode all requirements above.
- Instruct Cursor how to scaffold, extend, and maintain the codebase.
- Include **guardrails** (security, GDPR, Neon optimization, rate limiting/CORS for connectors).
- Define **what to generate** when the PDR/README changes (migrations, tests, docs, metrics).

The prompt must be **concise, directive, and code-first**, not conversational.

---

## 3) Required Structure of the Master System Prompt
Cursor must create the prompt with the following sections (headings **must** appear in this order):

1. **Role & Mission**  
   State that Cursor acts as Backend Architect/Developer enforcing SOLID + Clean Architecture; owns FastAPI, SQLAlchemy, Alembic, Celery, Prometheus, Stripe, Clerk, Neon.

2. **Authoritative Inputs**  
   Reference `/docs/Backend_PDR.md` and `/docs/README.md` as sources of truth. If they change, code must be reconciled automatically.

3. **Tech Stack & Tooling**  
   List Python 3.11, FastAPI, SQLAlchemy, Alembic, Celery, Redis, Prometheus, Stripe, Clerk, Neon; ruff/black/isort/mypy strict; requirements.txt + venv instructions.

4. **Repository & File Structure**  
   Enforce Router → Service → Repository → Schemas per domain; include directories `app/api/v1`, `app/domain/*`, `app/core`, `app/db`, `workers`, `alembic/versions`. Keep docs in `/docs/`.

5. **API Conventions**  
   REST only; `/api/v1`; JSON; custom error codes with human-readable `message`; clear error envelope; pagination & filtering/sorting convention picked by Cursor with TODO in `/docs/README.md` to confirm; rate limiting & CORS configured not to affect connector traffic.

6. **Security & Auth**  
   Clerk auth (email+password), roles (restaurant/supplier/admin), RBAC & ownership checks, JWT lifetimes; audit logs for sensitive actions. Cursor must explain security policy inline in generated code comments.

7. **Data, GDPR & Retention**  
   UUID PKs; soft delete with `deleted_at`. Retention policies as listed; **hard-delete as serverless function** (not in API process). Make retention periods configurable. Confirm Europe/Stockholm timezone and currency handling.

8. **Database & Neon**  
   Connection pooling (pooled for app; direct for migrations), short-lived connections, branch-per-feature strategy, Neon cold-start mitigation.

9. **Migrations & Branching**  
   Alembic: one migration per feature; apply to Neon `staging` first then `main`; commands provided; Cursor automates migrations when models change.

10. **Background Jobs**  
    Celery jobs: forecast nightly, pricing hourly, invoice OCR on upload, notifications real-time, connector sync nightly/on-demand, cart prefill on checkout, invoice pull after checkout. Include job table in docs.

11. **Supplier Account Connectors (Authenticated Mirror)**  
    Playwright-based connectors; read + cart deep-link; IP rotation + header spoofing; consent UI statements; never store credentials (temporary tokens only). Security, audit, metrics, and endpoints as in PDR.

12. **ML & OCR Modules**  
    Prophet, OpenWeather, Tesseract; recommendation weights left as TODOs; ±0.5% reconciliation tolerances.

13. **Observability & SLOs**  
    Metrics list from PDR; add SLOs (recommend 99.9% API uptime, p95 < 300ms, job success ≥ 98%, MTTR < 30m). Cursor must add docstrings explaining each metric when wiring.

14. **Testing Policy**  
    Unit, integration, worker, minimal e2e; coverage targets TBD; generate tests alongside code; mark TODO where business fixtures are needed.

15. Change Management Rules (authoritative)
When `/docs/Backend_PDR.md` or `/docs/README.md` changes, Cursor must:
- update models, services, repositories, routers, and tasks to match the PDR;
- autogenerate an Alembic migration and apply it only to the Neon `staging` branch (not `main`) until reviewed;
- update background schedules, metrics instrumentation, and tests;
- update docs (jobs table + metrics) accordingly;
- commit via Conventional Commits referencing the relevant PDR sections.


16. **Deliverables Checklist**  
    A bullet list Cursor can follow per feature: models, migrations, routers/services/repos, DTOs, tests, metrics, docs, env var notes.

---

## 4) Concrete Requirements Cursor Must Encode in the Prompt Text
- REST only; versioned `/api/v1`.
- Error envelope shape and custom codes with human-readable messages.
- requirements.txt + venv setup; pin dev tools (ruff/black/isort/mypy).
- OpenAPI docs available at a predictable path (`/docs` and `/openapi.json`) and linked in `/docs/README.md`.
- Clerk integration with roles; RBAC decorators/guards.
- Stripe Connect set to SEK test mode; mark TODOs for live keys.
- Monetary rounding (2 decimals); min price 0.001 SEK; currency code field in monetary tables.
- Soft-delete in models; retention service implemented as **serverless** hard-delete job.
- Neon optimization (pooling, short-lived connections, branches).
- Celery tasks + schedules exactly as listed; include metrics and logging.
- Supplier connectors with consent, proxy basics, and no password storage.
- Metrics: include names from PDR and docstrings explaining them.
- SLOs: 99.9% uptime (backend API), p95 < 300ms, job success ≥ 98%, MTTR < 30m.
- Testing: generate tests for services/repos/routers/tasks; mark TODOs where domain data is needed.
- Rate limiting and CORS: configure to allow internal connector traffic/unaffected outbounds.
- Pagination/filtering/sorting: Cursor picks defaults and documents them with a TODO to confirm in `/docs/README.md`.

---

## 5) Style Rules for the Prompt
- Professional, directive, and concise. No conversational tone.
- Use imperative voice (“Do X”, “Enforce Y”).  
- Prefer bullet lists and tables for clarity.
- Include short inline rationale where helpful (one line max).

---

## 6) Final Output from Cursor
Cursor must produce **one file** at the repo root named:
```
MASTER_PROMPT_BACKEND.md
```
containing the sections above, ready to be used as the always-on system prompt for backend work.

Also:
- Add `/docs/README.md` entries for API docs location, pagination/filtering decisions (with TODO if undecided).
- Ensure `requirements.txt`, `ruff.toml`, `.pre-commit-config.yaml` (optional), `pyproject.toml` for tool configs if needed, and minimal Celery/Prometheus wiring stubs exist.

---

## 7) Non-Blocking Notes
- Frontend is already built. Backend must remain compatible with the provided Frontend Master System Prompt (mentions REST/GraphQL). We use **REST-only** now; if frontend requests GraphQL, open a discussion but do not add it automatically.
