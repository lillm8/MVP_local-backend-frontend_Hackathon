// Product repository for API interactions

import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { Product } from '@/types';
import { ProductFilters, ProductSearchParams, PaginatedResponse } from '@/lib/data/types';

export class ProductRepository {
  /**
   * Fetch all products with optional filtering and pagination
   */
  async getAll(
    params?: ProductSearchParams
  ): Promise<PaginatedResponse<Product>> {
    return apiClient.get<PaginatedResponse<Product>>(
      endpoints.products.list(),
      params
    );
  }

  /**
   * Fetch a single product by ID
   */
  async getById(id: string): Promise<Product> {
    return apiClient.get<Product>(endpoints.products.detail(id));
  }

  /**
   * Search products with filters
   */
  async search(
    filters: ProductFilters,
    params?: Omit<ProductSearchParams, 'filters'>
  ): Promise<PaginatedResponse<Product>> {
    return apiClient.get<PaginatedResponse<Product>>(
      endpoints.products.search(),
      {
        ...params,
        ...filters,
      }
    );
  }

  /**
   * Get product categories
   */
  async getCategories(): Promise<string[]> {
    return apiClient.get<string[]>(endpoints.products.categories());
  }

  /**
   * Create a new product (supplier only)
   */
  async create(
    product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Product> {
    return apiClient.post<Product>(endpoints.products.create(), product);
  }

  /**
   * Update an existing product (supplier only)
   */
  async update(
    id: string,
    product: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Product> {
    return apiClient.put<Product>(endpoints.products.update(id), product);
  }

  /**
   * Delete a product (supplier only)
   */
  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(endpoints.products.delete(id));
  }

  /**
   * Get products by supplier
   */
  async getBySupplier(
    supplierId: string,
    params?: Omit<ProductSearchParams, 'filters'>
  ): Promise<PaginatedResponse<Product>> {
    return apiClient.get<PaginatedResponse<Product>>(
      endpoints.suppliers.products(supplierId),
      params
    );
  }

  /**
   * Get featured products
   */
  async getFeatured(limit = 10): Promise<Product[]> {
    const response = await this.getAll({
      limit,
      filters: { isAvailable: true },
    });
    return response.data;
  }

  /**
   * Get products by category
   */
  async getByCategory(
    category: string,
    params?: Omit<ProductSearchParams, 'filters'>
  ): Promise<PaginatedResponse<Product>> {
    return this.search({ category }, params);
  }

  /**
   * Get products by price range
   */
  async getByPriceRange(
    minPrice: number,
    maxPrice: number,
    params?: Omit<ProductSearchParams, 'filters'>
  ): Promise<PaginatedResponse<Product>> {
    return this.search({ minPrice, maxPrice }, params);
  }

  /**
   * Get products by tags
   */
  async getByTags(
    tags: string[],
    params?: Omit<ProductSearchParams, 'filters'>
  ): Promise<PaginatedResponse<Product>> {
    return this.search({ tags }, params);
  }
}

export const productRepository = new ProductRepository();
