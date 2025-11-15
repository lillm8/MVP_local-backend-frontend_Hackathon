// Product service layer
// Business logic for product operations
// Translates between domain types and API types

import { productRepository } from '../../repositories/products/product-repository';
import { Product, ProductFilters, ProductSearchParams } from '@/types';
import {
  ProductFilters as ApiProductFilters,
  ProductSearchParams as ApiProductSearchParams,
  PaginatedResponse,
} from '@/lib/data/types';

// Helper to convert domain ProductFilters to API ProductFilters
function toApiFilters(filters: ProductFilters): ApiProductFilters {
  return {
    ...filters,
    category: filters.category ? String(filters.category) : undefined,
  };
}

// Helper to convert domain ProductSearchParams to API ProductSearchParams
function toApiParams(
  params?: ProductSearchParams
): ApiProductSearchParams | undefined {
  if (!params) return undefined;
  return {
    ...params,
    filters: params.filters ? toApiFilters(params.filters) : undefined,
  };
}

export class ProductService {
  /**
   * Get all products with optional filtering
   */
  async getProducts(
    params?: ProductSearchParams
  ): Promise<PaginatedResponse<Product>> {
    return productRepository.getAll(toApiParams(params));
  }

  /**
   * Get a single product by ID
   */
  async getProductById(id: string): Promise<Product> {
    return productRepository.getById(id);
  }

  /**
   * Search products with filters
   */
  async searchProducts(
    filters: ProductFilters,
    params?: Omit<ProductSearchParams, 'filters'>
  ): Promise<PaginatedResponse<Product>> {
    const apiFilters = toApiFilters(filters);
    const apiParams = params
      ? ({ ...params } as Omit<ApiProductSearchParams, 'filters'>)
      : undefined;
    return productRepository.search(apiFilters, apiParams);
  }

  /**
   * Get product categories
   */
  async getCategories(): Promise<string[]> {
    return productRepository.getCategories();
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit = 10): Promise<Product[]> {
    return productRepository.getFeatured(limit);
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(
    category: string,
    params?: Omit<ProductSearchParams, 'filters'>
  ): Promise<PaginatedResponse<Product>> {
    const apiParams = params
      ? ({ ...params } as Omit<ApiProductSearchParams, 'filters'>)
      : undefined;
    return productRepository.getByCategory(category, apiParams);
  }

  /**
   * Get products by supplier
   */
  async getProductsBySupplier(
    supplierId: string,
    params?: Omit<ProductSearchParams, 'filters'>
  ): Promise<PaginatedResponse<Product>> {
    const apiParams = params
      ? ({ ...params } as Omit<ApiProductSearchParams, 'filters'>)
      : undefined;
    return productRepository.getBySupplier(supplierId, apiParams);
  }

  /**
   * Create a new product (supplier only)
   */
  async createProduct(
    product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Product> {
    return productRepository.create(product);
  }

  /**
   * Update an existing product (supplier only)
   */
  async updateProduct(
    id: string,
    product: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Product> {
    return productRepository.update(id, product);
  }

  /**
   * Delete a product (supplier only)
   */
  async deleteProduct(id: string): Promise<void> {
    return productRepository.delete(id);
  }
}

export const productService = new ProductService();
