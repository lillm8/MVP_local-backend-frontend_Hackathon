"""Product service with ownership checks and search."""
from typing import Optional, TYPE_CHECKING
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.errors import NotFoundError
from app.core.ownership import check_supplier_ownership
from app.domain.products.repository import ProductRepository
from app.domain.products.schemas import ProductCreate, ProductUpdate

if TYPE_CHECKING:
    from app.domain.products.models import Product


class ProductService:
    """Service layer for products."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.repository = ProductRepository(session)

    async def create_product(
        self,
        data: ProductCreate,
        current_account_id: UUID,
        current_role: str,
    ) -> "Product":
        # Ownership check for supplier
        owns = await check_supplier_ownership(
            self.session, current_role, current_account_id, data.supplier_id
        )
        if not owns:
            from fastapi import HTTPException, status

            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden: not owner of supplier")

        return await self.repository.create(**data.model_dump())

    async def get_product(self, product_id: UUID) -> "Product":
        product = await self.repository.get_by_id(product_id)
        if not product:
            raise NotFoundError(f"Product with ID {product_id} not found")
        return product

    async def list_products(
        self,
        limit: int = 50,
        offset: int = 0,
        supplier_id: Optional[UUID] = None,
        active: Optional[bool] = None,
        q: Optional[str] = None,
    ) -> tuple[list["Product"], int]:
        return await self.repository.list_all(
            limit=limit, offset=offset, supplier_id=supplier_id, active=active, q=q
        )

    async def update_product(
        self,
        product_id: UUID,
        data: ProductUpdate,
        current_account_id: UUID,
        current_role: str,
    ) -> "Product":
        product = await self.get_product(product_id)
        owns = await check_supplier_ownership(
            self.session, current_role, current_account_id, product.supplier_id
        )
        if not owns:
            from fastapi import HTTPException, status

            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden: not owner of supplier")

        update_data = {k: v for k, v in data.model_dump().items() if v is not None}
        return await self.repository.update(product, **update_data)

    async def delete_product(
        self,
        product_id: UUID,
        current_account_id: UUID,
        current_role: str,
    ) -> None:
        product = await self.get_product(product_id)
        owns = await check_supplier_ownership(
            self.session, current_role, current_account_id, product.supplier_id
        )
        if not owns:
            from fastapi import HTTPException, status

            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden: not owner of supplier")

        await self.repository.delete(product)



