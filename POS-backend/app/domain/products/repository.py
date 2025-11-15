"""Product repository with filters and trigram search."""
from typing import Optional
from uuid import UUID

from sqlalchemy import func, select, text
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.products.models import Product


class ProductRepository:
    """Repository for product data access operations."""

    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, **kwargs) -> Product:
        product = Product(**kwargs)
        self.session.add(product)
        await self.session.commit()
        await self.session.refresh(product)
        return product

    async def get_by_id(self, product_id: UUID) -> Optional[Product]:
        stmt = select(Product).where(
            Product.id == product_id,
            Product.deleted_at.is_(None),
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def list_all(
        self,
        limit: int = 50,
        offset: int = 0,
        supplier_id: Optional[UUID] = None,
        active: Optional[bool] = None,
        q: Optional[str] = None,
    ) -> tuple[list[Product], int]:
        """List products with filters, pagination, and trigram search."""
        base_query = select(Product).where(Product.deleted_at.is_(None))

        if supplier_id is not None:
            base_query = base_query.where(Product.supplier_id == supplier_id)
        if active is not None:
            base_query = base_query.where(Product.active == active)
        if q:
            # Use trigram similarity on concatenated name and sku
            # Requires pg_trgm extension and a GIN/GIST index per migration
            base_query = base_query.where(
                text("(name || ' ' || sku) % :q")
            ).params(q=q)

        count_query = select(func.count()).select_from(base_query.subquery())
        total = (await self.session.execute(count_query)).scalar_one()

        if q:
            # Order by similarity when searching
            paginated = base_query.order_by(text("similarity(name || ' ' || sku, :q) DESC")).limit(limit).offset(offset).params(q=q)
        else:
            paginated = base_query.order_by(Product.created_at.desc()).limit(limit).offset(offset)

        products = (await self.session.execute(paginated)).scalars().all()
        return list(products), total

    async def update(self, product: Product, **kwargs) -> Product:
        for key, value in kwargs.items():
            if value is not None:
                setattr(product, key, value)
        from datetime import datetime, timezone
        from sqlalchemy import update
        await self.session.execute(
            update(Product)
            .where(Product.id == product.id)
            .values(updated_at=datetime.now(timezone.utc))
        )
        await self.session.commit()
        await self.session.refresh(product)
        return product

    async def delete(self, product: Product) -> None:
        from datetime import datetime, timezone
        from sqlalchemy import update
        await self.session.execute(
            update(Product)
            .where(Product.id == product.id)
            .values(deleted_at=datetime.now(timezone.utc))
        )
        await self.session.commit()



