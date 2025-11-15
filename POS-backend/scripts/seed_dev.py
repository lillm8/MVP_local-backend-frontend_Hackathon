"""Dev-only seed script for SQLite hackathon database.

Usage (from POS-backend root):

    DEV_MODE=true python scripts/seed_dev.py

This will:
- Drop and recreate all tables using SQLAlchemy models (no Alembic).
- Insert a demo restaurant, 3 suppliers, and ~15 orders with
  paid/due/overdue statuses.

This script must NOT be run against production Neon/Postgres.
"""

import asyncio
from datetime import datetime, timedelta, timezone

from app.core.config import settings
from app.core.database import engine, AsyncSessionLocal
from app.db.base import Base
from app.domain.users.models import User, UserRole
from app.domain.restaurants.models import Restaurant
from app.domain.suppliers.models import Supplier
from app.domain.products.models import Product
from app.domain.carts.models import Cart, CartStatus
from app.domain.orders.models import Order, OrderStatus, PaymentMethod


async def init_dev_db_and_seed() -> None:
    """Initialize SQLite schema and seed demo data.

    This function is Dev-only and requires DEV_MODE=true to be set.
    """

    if not settings.DEV_MODE:
        raise RuntimeError(
            "DEV_MODE must be true to run scripts/seed_dev.py. "
            "Refusing to touch non-dev database."
        )

    # Drop & recreate schema for a clean dev database
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        # Demo user (treated as restaurant owner)
        dev_user = User(
            email="dev@iris.local",
            clerk_user_id="dev-clerk-user",  # Dummy value for dev
            role=UserRole.RESTAURANT,
        )
        session.add(dev_user)
        await session.flush()

        # Single demo restaurant
        restaurant = Restaurant(
            name="Demo Restaurant",
            contact_email="demo-restaurant@iris.local",
            city="Stockholm",
            delivery_prefs={"note": "Hackathon demo restaurant"},
        )
        session.add(restaurant)
        await session.flush()

        # A few suppliers
        supplier_specs = [
            ("Fresh Veg AB", "veg@supplier.local", "Stockholm"),
            ("Seafood & Co", "seafood@supplier.local", "Gothenburg"),
            ("Bakery Central", "bakery@supplier.local", "Stockholm"),
        ]
        suppliers: list[Supplier] = []
        for name, email, city in supplier_specs:
            supplier = Supplier(
                name=name,
                contact_email=email,
                city=city,
                active=True,
            )
            session.add(supplier)
            suppliers.append(supplier)

        await session.flush()

        # Create a mix of paid / due / overdue orders
        now = datetime.now(timezone.utc)
        orders: list[Order] = []

        for i in range(15):
            supplier = suppliers[i % len(suppliers)]

            # Each order gets its own cart
            cart = Cart(
                restaurant_id=restaurant.id,
                created_by_user_id=dev_user.id,
                status=CartStatus.CONVERTED,
            )
            session.add(cart)
            await session.flush()

            total_cents = 10_000 + i * 1_500  # 100 SEK + increments
            tax_cents = int(total_cents * 0.25)
            created_at = now - timedelta(days=i)

            # First 5 are paid, next 5 are overdue, rest are due
            paid_at: datetime | None = None
            if i < 5:
                paid_at = created_at + timedelta(days=1)

            order = Order(
                cart_id=cart.id,
                buyer_restaurant_id=restaurant.id,
                supplier_id=supplier.id,
                created_by_account_id=dev_user.id,
                status=OrderStatus.PLACED,
                total_cents=total_cents,
                tax_cents=tax_cents,
                payment_method=PaymentMethod.MOCK,
                paid_at=paid_at,
                created_at=created_at,
            )
            session.add(order)
            orders.append(order)

        await session.commit()


async def _async_main() -> None:
    await init_dev_db_and_seed()


if __name__ == "__main__":
    asyncio.run(_async_main())
