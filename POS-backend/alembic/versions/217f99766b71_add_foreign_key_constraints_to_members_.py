"""add foreign key constraints to members and products

Revision ID: 217f99766b71
Revises: 260231ef4ff1
Create Date: 2025-10-29 16:45:32.584585

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# Compliance:
# - OWNER-FK: adds missing FKs and UNIQUE constraints for membership tables
# - EXT-PGTRGM: ensures pg_trgm extension and trigram GIN index for product search
# - UTC-TZ / NO-PW-DB / POOL-DIRECT: not applicable (no timestamp or auth changes)
# This migration is idempotent and safe to re-run; all operations use IF NOT EXISTS.

# revision identifiers, used by Alembic.
revision: str = '217f99766b71'
down_revision: Union[str, None] = '260231ef4ff1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Minimal, zero-downtime migration to add missing FKs and constraints per PDR
    # Ensure pg_trgm is available for search indexes
    op.execute("CREATE EXTENSION IF NOT EXISTS pg_trgm")

    # Add FK: restaurant_members.account_id -> accounts.id
    op.execute(
        """
        DO $$ BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM pg_constraint WHERE conname = 'restaurant_members_account_id_fkey'
        ) THEN
            ALTER TABLE restaurant_members
            ADD CONSTRAINT restaurant_members_account_id_fkey
            FOREIGN KEY (account_id) REFERENCES accounts(id);
        END IF;
        END $$;
        """
    )
    # Add FK: restaurant_members.restaurant_id -> restaurants.id
    op.execute(
        """
        DO $$ BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM pg_constraint WHERE conname = 'restaurant_members_restaurant_id_fkey'
        ) THEN
            ALTER TABLE restaurant_members
            ADD CONSTRAINT restaurant_members_restaurant_id_fkey
            FOREIGN KEY (restaurant_id) REFERENCES restaurants(id);
        END IF;
        END $$;
        """
    )
    # Ensure composite UNIQUE on restaurant_members (account_id, restaurant_id)
    op.execute(
        """
        DO $$ BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM pg_constraint WHERE conname = 'uq_restaurant_members_account_restaurant'
        ) THEN
            ALTER TABLE restaurant_members
            ADD CONSTRAINT uq_restaurant_members_account_restaurant
            UNIQUE (account_id, restaurant_id);
        END IF;
        END $$;
        """
    )

    # Add FK: supplier_members.account_id -> accounts.id
    op.execute(
        """
        DO $$ BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM pg_constraint WHERE conname = 'supplier_members_account_id_fkey'
        ) THEN
            ALTER TABLE supplier_members
            ADD CONSTRAINT supplier_members_account_id_fkey
            FOREIGN KEY (account_id) REFERENCES accounts(id);
        END IF;
        END $$;
        """
    )
    # Add FK: supplier_members.supplier_id -> suppliers.id
    op.execute(
        """
        DO $$ BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM pg_constraint WHERE conname = 'supplier_members_supplier_id_fkey'
        ) THEN
            ALTER TABLE supplier_members
            ADD CONSTRAINT supplier_members_supplier_id_fkey
            FOREIGN KEY (supplier_id) REFERENCES suppliers(id);
        END IF;
        END $$;
        """
    )
    # Ensure composite UNIQUE on supplier_members (account_id, supplier_id)
    op.execute(
        """
        DO $$ BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM pg_constraint WHERE conname = 'uq_supplier_members_account_supplier'
        ) THEN
            ALTER TABLE supplier_members
            ADD CONSTRAINT uq_supplier_members_account_supplier
            UNIQUE (account_id, supplier_id);
        END IF;
        END $$;
        """
    )

    # Add FK: products.supplier_id -> suppliers.id
    op.execute(
        """
        DO $$ BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM pg_constraint WHERE conname = 'products_supplier_id_fkey'
        ) THEN
            ALTER TABLE products
            ADD CONSTRAINT products_supplier_id_fkey
            FOREIGN KEY (supplier_id) REFERENCES suppliers(id);
        END IF;
        END $$;
        """
    )

    # Add FK: carts.restaurant_id -> restaurants.id
    op.execute(
        """
        DO $$ BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM pg_constraint WHERE conname = 'carts_restaurant_id_fkey'
        ) THEN
            ALTER TABLE carts
            ADD CONSTRAINT carts_restaurant_id_fkey
            FOREIGN KEY (restaurant_id) REFERENCES restaurants(id);
        END IF;
        END $$;
        """
    )

    # Ensure trigram GIN index for product search over (name || ' ' || sku)
    op.execute(
        """
        DO $$ BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM pg_class c
            JOIN pg_namespace n ON n.oid = c.relnamespace
            WHERE c.relname = 'idx_products_search' AND n.nspname = 'public'
        ) THEN
            CREATE INDEX idx_products_search ON products
            USING gin (((name || ' ' || sku)) gin_trgm_ops);
        END IF;
        END $$;
        """
    )


def downgrade() -> None:
    # Safely remove only objects created in this revision, using IF EXISTS to avoid dropping pre-existing constraints.
    op.execute("DROP INDEX IF EXISTS idx_products_search")

    op.execute("ALTER TABLE products DROP CONSTRAINT IF EXISTS products_supplier_id_fkey")
    op.execute("ALTER TABLE supplier_members DROP CONSTRAINT IF EXISTS uq_supplier_members_account_supplier")
    op.execute("ALTER TABLE supplier_members DROP CONSTRAINT IF EXISTS supplier_members_supplier_id_fkey")
    op.execute("ALTER TABLE supplier_members DROP CONSTRAINT IF EXISTS supplier_members_account_id_fkey")
    op.execute("ALTER TABLE restaurant_members DROP CONSTRAINT IF EXISTS uq_restaurant_members_account_restaurant")
    op.execute("ALTER TABLE restaurant_members DROP CONSTRAINT IF EXISTS restaurant_members_restaurant_id_fkey")
    op.execute("ALTER TABLE restaurant_members DROP CONSTRAINT IF EXISTS restaurant_members_account_id_fkey")

