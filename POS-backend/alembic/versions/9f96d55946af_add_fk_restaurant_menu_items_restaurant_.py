"""add FK restaurant_menu_items.restaurant_id -> restaurants.id

Revision ID: 9f96d55946af
Revises: 217f99766b71
Create Date: 2025-10-29 17:20:57.210211

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# Compliance:
# - OWNER-FK: adds missing FK from menu items to restaurants
# - EXT-PGTRGM: not applicable in this revision
# - UTC-TZ / NO-PW-DB / POOL-DIRECT: not applicable
# This migration is idempotent and safe to re-run; guarded DDL where custom.

# revision identifiers, used by Alembic.
revision: str = '9f96d55946af'
down_revision: Union[str, None] = '217f99766b71'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add FK: restaurant_menu_items.restaurant_id -> restaurants.id
    op.execute(
        """
        DO $$ BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM pg_constraint WHERE conname = 'restaurant_menu_items_restaurant_id_fkey'
        ) THEN
            ALTER TABLE restaurant_menu_items
            ADD CONSTRAINT restaurant_menu_items_restaurant_id_fkey
            FOREIGN KEY (restaurant_id) REFERENCES restaurants(id);
        END IF;
        END $$;
        """
    )


def downgrade() -> None:
    op.execute("ALTER TABLE restaurant_menu_items DROP CONSTRAINT IF EXISTS restaurant_menu_items_restaurant_id_fkey")

