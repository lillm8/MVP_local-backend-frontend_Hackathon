"""Simple development seed script (no passwords in DB)."""
import asyncio
from uuid import uuid4

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import AsyncSessionLocal
from app.domain.suppliers.models import Supplier, SupplierMember
from app.domain.restaurants.models import Restaurant, RestaurantMember
from app.domain.products.models import Product


async def seed():
    async with AsyncSessionLocal() as session:  # type: AsyncSession
        # Create supplier
        supplier = Supplier(name="Demo Supplier", contact_email="supplier@example.com", city="Stockholm", active=True)
        session.add(supplier)
        # Create restaurant
        restaurant = Restaurant(name="Demo Restaurant", contact_email="restaurant@example.com", city="Stockholm", active=True)
        session.add(restaurant)
        await session.flush()

        # Create memberships (use fake account UUIDs for now; real IDs would come from accounts table/JWT)
        supplier_member = SupplierMember(account_id=uuid4(), supplier_id=supplier.id, role="owner")
        restaurant_member = RestaurantMember(account_id=uuid4(), restaurant_id=restaurant.id, role="owner")
        session.add_all([supplier_member, restaurant_member])

        # Create some products
        products = [
            Product(supplier_id=supplier.id, name="Tomatoes", sku="SKU-TOM", unit="kg", price_cents=2500, tax_rate=12, stock_qty=100, active=True),
            Product(supplier_id=supplier.id, name="Olive Oil", sku="SKU-OLV", unit="L", price_cents=9900, tax_rate=12, stock_qty=50, active=True),
            Product(supplier_id=supplier.id, name="Flour", sku="SKU-FLR", unit="kg", price_cents=1200, tax_rate=12, stock_qty=200, active=True),
        ]
        session.add_all(products)
        await session.commit()
        print("Seed complete.")


if __name__ == "__main__":
    asyncio.run(seed())



