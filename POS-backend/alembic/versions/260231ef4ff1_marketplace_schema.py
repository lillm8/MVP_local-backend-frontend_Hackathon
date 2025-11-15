"""marketplace schema

Revision ID: 260231ef4ff1
Revises: 3728b83cace8
Create Date: 2025-10-28 19:22:40.031192

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from sqlalchemy.engine.reflection import Inspector

# revision identifiers, used by Alembic.
revision: str = '260231ef4ff1'
down_revision: Union[str, None] = '3728b83cace8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Enable extensions for CITEXT and trigram search
    op.execute("CREATE EXTENSION IF NOT EXISTS citext")
    op.execute("CREATE EXTENSION IF NOT EXISTS pg_trgm")
    
    # Create accounts table
    op.create_table('accounts',
    sa.Column('external_id', sa.String(length=255), nullable=True),
    sa.Column('email', postgresql.CITEXT(), nullable=False),
    sa.Column('role', sa.String(length=50), nullable=False),
    sa.Column('org_id', sa.UUID(), nullable=True),
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email', name='uq_accounts_email'),
    sa.UniqueConstraint('external_id', name='uq_accounts_external_id')
    )
    # Non-duplicate indexes
    op.create_index('idx_accounts_org_id', 'accounts', ['org_id'], unique=False)
    op.create_index('idx_accounts_role', 'accounts', ['role'], unique=False)
    op.create_index(op.f('ix_accounts_external_id'), 'accounts', ['external_id'], unique=False)
    
    # Create suppliers table
    op.create_table('suppliers',
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('contact_email', sa.String(length=255), nullable=False),
    sa.Column('phone', sa.String(length=50), nullable=True),
    sa.Column('city', sa.String(length=100), nullable=True),
    sa.Column('lat', sa.Numeric(precision=10, scale=7), nullable=True),
    sa.Column('lon', sa.Numeric(precision=10, scale=7), nullable=True),
    sa.Column('active', sa.Boolean(), nullable=False),
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('idx_suppliers_active', 'suppliers', ['active'], unique=False)
    op.create_index('idx_suppliers_city', 'suppliers', ['city'], unique=False)
    op.create_index(op.f('ix_suppliers_name'), 'suppliers', ['name'], unique=False)
    
    # Create restaurants table
    op.create_table('restaurants',
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('contact_email', sa.String(length=255), nullable=False),
    sa.Column('city', sa.String(length=100), nullable=True),
    sa.Column('delivery_prefs', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
    sa.Column('active', sa.Boolean(), nullable=False),
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('idx_restaurants_active', 'restaurants', ['active'], unique=False)
    op.create_index('idx_restaurants_city', 'restaurants', ['city'], unique=False)
    op.create_index(op.f('ix_restaurants_name'), 'restaurants', ['name'], unique=False)
    
    # Create supplier_members table
    op.create_table('supplier_members',
    sa.Column('account_id', sa.UUID(), nullable=False),
    sa.Column('supplier_id', sa.UUID(), nullable=False),
    sa.Column('role', sa.String(length=20), nullable=False),
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('account_id', 'supplier_id', name='uq_supplier_members_account_supplier')
    )
    op.create_index(op.f('ix_supplier_members_account_id'), 'supplier_members', ['account_id'], unique=False)
    op.create_index(op.f('ix_supplier_members_supplier_id'), 'supplier_members', ['supplier_id'], unique=False)
    
    # Create restaurant_members table with composite unique constraint
    op.create_table('restaurant_members',
    sa.Column('account_id', sa.UUID(), nullable=False),
    sa.Column('restaurant_id', sa.UUID(), nullable=False),
    sa.Column('role', sa.String(length=20), nullable=False),
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('account_id', 'restaurant_id', name='uq_restaurant_members_account_restaurant')
    )
    op.create_index(op.f('ix_restaurant_members_account_id'), 'restaurant_members', ['account_id'], unique=False)
    op.create_index(op.f('ix_restaurant_members_restaurant_id'), 'restaurant_members', ['restaurant_id'], unique=False)
    
    # Create products table
    op.create_table('products',
    sa.Column('supplier_id', sa.UUID(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('sku', sa.String(length=100), nullable=False),
    sa.Column('unit', sa.String(length=50), nullable=False),
    sa.Column('price_cents', sa.Integer(), nullable=False),
    sa.Column('tax_rate', sa.Numeric(precision=5, scale=2), nullable=False),
    sa.Column('stock_qty', sa.Integer(), nullable=False),
    sa.Column('availability_status', sa.String(length=20), nullable=False),
    sa.Column('active', sa.Boolean(), nullable=False),
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
    sa.CheckConstraint('price_cents >= 0', name='ck_products_price_cents'),
    sa.CheckConstraint('stock_qty >= 0', name='ck_products_stock_qty'),
    sa.CheckConstraint('tax_rate >= 0 AND tax_rate <= 100', name='ck_products_tax_rate'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('sku', name='uq_products_sku'),
    sa.ForeignKeyConstraint(['supplier_id'], ['suppliers.id'], )
    )
    op.create_index('idx_products_supplier_active', 'products', ['supplier_id', 'active'], unique=False)
    op.create_index(op.f('ix_products_active'), 'products', ['active'], unique=False)
    op.create_index(op.f('ix_products_name'), 'products', ['name'], unique=False)
    op.create_index(op.f('ix_products_sku'), 'products', ['sku'], unique=True)
    op.create_index(op.f('ix_products_supplier_id'), 'products', ['supplier_id'], unique=False)
    # GIN trigram search index
    op.execute("CREATE INDEX idx_products_search ON products USING gin ((name || ' ' || sku) gin_trgm_ops)")
    
    # Create carts table
    op.create_table('carts',
    sa.Column('restaurant_id', sa.UUID(), nullable=False),
    sa.Column('created_by_account_id', sa.UUID(), nullable=False),
    sa.Column('status', sa.String(length=20), nullable=False),
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], ),
    sa.ForeignKeyConstraint(['created_by_account_id'], ['accounts.id'], )
    )
    op.create_index('idx_carts_restaurant_status', 'carts', ['restaurant_id', 'status'], unique=False)
    op.create_index(op.f('ix_carts_created_by_account_id'), 'carts', ['created_by_account_id'], unique=False)
    op.create_index(op.f('ix_carts_restaurant_id'), 'carts', ['restaurant_id'], unique=False)
    op.create_index(op.f('ix_carts_status'), 'carts', ['status'], unique=False)
    
    # Create restaurant_menu_items table
    op.create_table('restaurant_menu_items',
    sa.Column('restaurant_id', sa.UUID(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=2000), nullable=True),
    sa.Column('category', sa.String(length=16), nullable=False),
    sa.Column('price_cents', sa.Integer(), nullable=False),
    sa.Column('active', sa.Boolean(), nullable=False),
    sa.Column('position', sa.Integer(), nullable=True),
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
    sa.CheckConstraint('price_cents >= 0', name='ck_menu_items_price_cents'),
    sa.PrimaryKeyConstraint('id'),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], )
    )
    op.create_index('idx_menu_items_restaurant_category', 'restaurant_menu_items', ['restaurant_id', 'category'], unique=False)
    op.create_index(op.f('ix_restaurant_menu_items_active'), 'restaurant_menu_items', ['active'], unique=False)
    op.create_index(op.f('ix_restaurant_menu_items_category'), 'restaurant_menu_items', ['category'], unique=False)
    op.create_index(op.f('ix_restaurant_menu_items_name'), 'restaurant_menu_items', ['name'], unique=False)
    op.create_index(op.f('ix_restaurant_menu_items_restaurant_id'), 'restaurant_menu_items', ['restaurant_id'], unique=False)
    
    # Create cart_items table
    op.create_table('cart_items',
    sa.Column('cart_id', sa.UUID(), nullable=False),
    sa.Column('product_id', sa.UUID(), nullable=False),
    sa.Column('qty', sa.Numeric(precision=12, scale=3), nullable=False),
    sa.Column('unit_price_cents', sa.Integer(), nullable=False),
    sa.Column('tax_rate', sa.Numeric(precision=5, scale=2), nullable=False),
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
    sa.CheckConstraint('qty > 0', name='ck_cart_items_qty'),
    sa.CheckConstraint('tax_rate >= 0 AND tax_rate <= 100', name='ck_cart_items_tax_rate'),
    sa.CheckConstraint('unit_price_cents >= 0', name='ck_cart_items_unit_price_cents'),
    sa.ForeignKeyConstraint(['cart_id'], ['carts.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('idx_cart_items_cart', 'cart_items', ['cart_id'], unique=False)
    op.create_index('idx_cart_items_product', 'cart_items', ['product_id'], unique=False)
    op.create_index(op.f('ix_cart_items_cart_id'), 'cart_items', ['cart_id'], unique=False)
    op.create_index(op.f('ix_cart_items_product_id'), 'cart_items', ['product_id'], unique=False)
    
    # Create orders table with tz-aware timestamps
    op.create_table('orders',
    sa.Column('cart_id', sa.UUID(), nullable=False),
    sa.Column('buyer_restaurant_id', sa.UUID(), nullable=False),
    sa.Column('supplier_id', sa.UUID(), nullable=False),
    sa.Column('created_by_account_id', sa.UUID(), nullable=False),
    sa.Column('status', sa.String(length=20), nullable=False),
    sa.Column('total_cents', sa.Integer(), nullable=False),
    sa.Column('tax_cents', sa.Integer(), nullable=False),
    sa.Column('payment_method', sa.String(length=20), nullable=False),
    sa.Column('paid_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('delivered_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
    sa.CheckConstraint('tax_cents >= 0', name='ck_orders_tax_cents'),
    sa.CheckConstraint('total_cents >= tax_cents', name='ck_orders_total_cents'),
    sa.ForeignKeyConstraint(['buyer_restaurant_id'], ['restaurants.id'], ),
    sa.ForeignKeyConstraint(['cart_id'], ['carts.id'], ),
    sa.ForeignKeyConstraint(['supplier_id'], ['suppliers.id'], ),
    sa.ForeignKeyConstraint(['created_by_account_id'], ['accounts.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('cart_id', name='uq_orders_cart_id')
    )
    op.create_index('idx_orders_created_at', 'orders', ['created_at'], unique=False)
    op.create_index('idx_orders_restaurant_supplier_status', 'orders', ['buyer_restaurant_id', 'supplier_id', 'status', 'created_at'], unique=False)
    op.create_index('idx_orders_status', 'orders', ['status'], unique=False)
    op.create_index(op.f('ix_orders_buyer_restaurant_id'), 'orders', ['buyer_restaurant_id'], unique=False)
    op.create_index(op.f('ix_orders_created_by_account_id'), 'orders', ['created_by_account_id'], unique=False)
    op.create_index(op.f('ix_orders_supplier_id'), 'orders', ['supplier_id'], unique=False)
    op.create_index(op.f('ix_orders_status'), 'orders', ['status'], unique=False)
    
    # Create idempotency_keys table with tz-aware timestamp
    op.create_table('idempotency_keys',
    sa.Column('key', sa.String(length=255), nullable=False),
    sa.Column('order_id', sa.UUID(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('key', name='uq_idempotency_keys_key')
    )
    op.create_index('idx_idempotency_keys_key', 'idempotency_keys', ['key'], unique=True)
    op.create_index('idx_idempotency_keys_order', 'idempotency_keys', ['order_id'], unique=False)
    op.create_index(op.f('ix_idempotency_keys_created_at'), 'idempotency_keys', ['created_at'], unique=False)
    op.create_index(op.f('ix_idempotency_keys_order_id'), 'idempotency_keys', ['order_id'], unique=False)
    
    # Migrate users data to accounts if users table exists
    bind = op.get_bind()
    insp = Inspector.from_engine(bind)
    tables = insp.get_table_names()
    
    if 'users' in tables:
        # Copy rows while avoiding duplicates
        op.execute("""
            INSERT INTO accounts (id, external_id, email, role, org_id, created_at, updated_at)
            SELECT gen_random_uuid(), u.clerk_user_id, lower(u.email), u.role, NULL, now(), now()
            FROM users u
            ON CONFLICT (email) DO NOTHING
        """)
    
    # Drop old users table indexes and table
    op.drop_index('idx_users_role', table_name='users')
    op.drop_index('ix_users_clerk_user_id', table_name='users')
    op.drop_index('ix_users_email', table_name='users')
    op.drop_table('users')


def downgrade() -> None:
    # Recreate users table with UTC defaults
    op.create_table('users',
    sa.Column('email', sa.VARCHAR(length=255), autoincrement=False, nullable=False),
    sa.Column('clerk_user_id', sa.VARCHAR(length=255), autoincrement=False, nullable=False),
    sa.Column('role', sa.VARCHAR(length=50), autoincrement=False, nullable=False),
    sa.Column('id', sa.UUID(), autoincrement=False, nullable=False),
    sa.Column('created_at', postgresql.TIMESTAMP(timezone=True), server_default=sa.text('now()'), autoincrement=False, nullable=False),
    sa.Column('updated_at', postgresql.TIMESTAMP(timezone=True), server_default=sa.text('now()'), autoincrement=False, nullable=False),
    sa.Column('deleted_at', postgresql.TIMESTAMP(timezone=True), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='users_pkey'),
    sa.UniqueConstraint('clerk_user_id', name='uq_users_clerk_user_id'),
    sa.UniqueConstraint('email', name='uq_users_email')
    )
    op.create_index('ix_users_email', 'users', ['email'], unique=False)
    op.create_index('ix_users_clerk_user_id', 'users', ['clerk_user_id'], unique=False)
    op.create_index('idx_users_role', 'users', ['role'], unique=False)
    
    # Drop idempotency_keys
    op.drop_index(op.f('ix_idempotency_keys_order_id'), table_name='idempotency_keys')
    op.drop_index(op.f('ix_idempotency_keys_created_at'), table_name='idempotency_keys')
    op.drop_index('idx_idempotency_keys_order', table_name='idempotency_keys')
    op.drop_index('idx_idempotency_keys_key', table_name='idempotency_keys')
    op.drop_table('idempotency_keys')
    
    # Drop orders
    op.drop_index(op.f('ix_orders_status'), table_name='orders')
    op.drop_index(op.f('ix_orders_supplier_id'), table_name='orders')
    op.drop_index(op.f('ix_orders_created_by_account_id'), table_name='orders')
    op.drop_index(op.f('ix_orders_buyer_restaurant_id'), table_name='orders')
    op.drop_index('idx_orders_status', table_name='orders')
    op.drop_index('idx_orders_restaurant_supplier_status', table_name='orders')
    op.drop_index('idx_orders_created_at', table_name='orders')
    op.drop_table('orders')
    
    # Drop cart_items
    op.drop_index(op.f('ix_cart_items_product_id'), table_name='cart_items')
    op.drop_index(op.f('ix_cart_items_cart_id'), table_name='cart_items')
    op.drop_index('idx_cart_items_product', table_name='cart_items')
    op.drop_index('idx_cart_items_cart', table_name='cart_items')
    op.drop_table('cart_items')
    
    # Drop restaurant_menu_items
    op.drop_index(op.f('ix_restaurant_menu_items_restaurant_id'), table_name='restaurant_menu_items')
    op.drop_index(op.f('ix_restaurant_menu_items_name'), table_name='restaurant_menu_items')
    op.drop_index(op.f('ix_restaurant_menu_items_category'), table_name='restaurant_menu_items')
    op.drop_index(op.f('ix_restaurant_menu_items_active'), table_name='restaurant_menu_items')
    op.drop_index('idx_menu_items_restaurant_category', table_name='restaurant_menu_items')
    op.drop_table('restaurant_menu_items')
    
    # Drop carts
    op.drop_index(op.f('ix_carts_status'), table_name='carts')
    op.drop_index(op.f('ix_carts_restaurant_id'), table_name='carts')
    op.drop_index(op.f('ix_carts_created_by_account_id'), table_name='carts')
    op.drop_index('idx_carts_restaurant_status', table_name='carts')
    op.drop_table('carts')
    
    # Drop products (trigram index will be dropped with table)
    op.drop_index(op.f('ix_products_supplier_id'), table_name='products')
    op.drop_index(op.f('ix_products_sku'), table_name='products')
    op.drop_index(op.f('ix_products_name'), table_name='products')
    op.drop_index(op.f('ix_products_active'), table_name='products')
    op.drop_index('idx_products_supplier_active', table_name='products')
    op.drop_table('products')
    
    # Drop restaurant_members (no unique single-column index to drop)
    op.drop_index(op.f('ix_restaurant_members_restaurant_id'), table_name='restaurant_members')
    op.drop_index(op.f('ix_restaurant_members_account_id'), table_name='restaurant_members')
    op.drop_table('restaurant_members')
    
    # Drop restaurants
    op.drop_index(op.f('ix_restaurants_name'), table_name='restaurants')
    op.drop_index('idx_restaurants_city', table_name='restaurants')
    op.drop_index('idx_restaurants_active', table_name='restaurants')
    op.drop_table('restaurants')
    
    # Drop supplier_members
    op.drop_index(op.f('ix_supplier_members_supplier_id'), table_name='supplier_members')
    op.drop_index(op.f('ix_supplier_members_account_id'), table_name='supplier_members')
    op.drop_table('supplier_members')
    
    # Drop suppliers
    op.drop_index(op.f('ix_suppliers_name'), table_name='suppliers')
    op.drop_index('idx_suppliers_city', table_name='suppliers')
    op.drop_index('idx_suppliers_active', table_name='suppliers')
    op.drop_table('suppliers')
    
    # Drop accounts
    op.drop_index(op.f('ix_accounts_external_id'), table_name='accounts')
    op.drop_index('idx_accounts_role', table_name='accounts')
    op.drop_index('idx_accounts_org_id', table_name='accounts')
    op.drop_table('accounts')
    
    # Drop extensions
    op.execute("DROP EXTENSION IF EXISTS pg_trgm")
    op.execute("DROP EXTENSION IF EXISTS citext")
