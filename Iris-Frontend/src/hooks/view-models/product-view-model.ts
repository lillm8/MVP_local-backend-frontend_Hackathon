// Product ViewModel
// Business logic for product-related UI operations

import { BaseViewModel } from './base-view-model';
import { productService } from '@/lib/data/services/products/product-service';
import { Product, ProductFilters } from '@/types/products';
import { PaginatedResponse } from '@/lib/data/types';

export interface ProductListState {
  products: Product[];
  loading: boolean;
  error: Error | null;
  hasError: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  filters: ProductFilters;
  hasActiveFilters: boolean;
}

export class ProductViewModel extends BaseViewModel<
  PaginatedResponse<Product>
> {
  private searchQuery = '';

  constructor() {
    super();
  }

  /**
   * Get current product list state
   */
  get productListState(): ProductListState {
    const state = this.state;
    return {
      products: state.data?.data || [],
      loading: state.loading,
      error: state.error,
      hasError: state.hasError,
      pagination: state.pagination,
      filters: state.filters,
      hasActiveFilters: state.hasActiveFilters,
    };
  }

  /**
   * Load products with current filters and pagination
   */
  async loadData(): Promise<void> {
    await this.executeAsync(
      () => this.loadProducts(),
      result => {
        if (result) {
          this.pagination.setTotal(result.pagination.total);
        }
      }
    );
  }

  /**
   * Refresh products
   */
  async refresh(): Promise<void> {
    this.reset();
    await this.loadData();
  }

  /**
   * Search products
   */
  async searchProducts(query: string): Promise<void> {
    this.searchQuery = query;
    this.filters.setFilters({ search: query });
    await this.loadData();
  }

  /**
   * Filter products
   */
  async filterProducts(filters: Partial<ProductFilters>): Promise<void> {
    this.filters.setFilters(filters);
    await this.loadData();
  }

  /**
   * Clear all filters
   */
  async clearFilters(): Promise<void> {
    this.filters.clearFilters();
    this.searchQuery = '';
    await this.loadData();
  }

  /**
   * Load products by category
   */
  async loadProductsByCategory(category: string): Promise<void> {
    this.filters.setFilters({ category });
    await this.loadData();
  }

  /**
   * Load products by supplier
   */
  async loadProductsBySupplier(supplierId: string): Promise<void> {
    await this.executeAsync(
      () =>
        productService.getProductsBySupplier(supplierId, {
          page: this.pagination.page,
          limit: this.pagination.limit,
        }),
      result => {
        if (result) {
          this.setData(result);
          this.pagination.setTotal(result.pagination.total);
        }
      }
    );
  }

  /**
   * Load featured products
   */
  async loadFeaturedProducts(limit = 10): Promise<void> {
    await this.executeAsync(
      () => productService.getFeaturedProducts(limit),
      result => {
        if (result) {
          this.setData({
            data: result,
            pagination: {
              page: 1,
              limit: result.length,
              total: result.length,
              totalPages: 1,
              hasNext: false,
              hasPrev: false,
            },
          });
        }
      }
    );
  }

  /**
   * Go to next page
   */
  async nextPage(): Promise<void> {
    this.pagination.nextPage();
    await this.loadData();
  }

  /**
   * Go to previous page
   */
  async previousPage(): Promise<void> {
    this.pagination.previousPage();
    await this.loadData();
  }

  /**
   * Change page size
   */
  async changePageSize(limit: number): Promise<void> {
    this.pagination.setLimit(limit);
    this.pagination.setPage(1);
    await this.loadData();
  }

  /**
   * Get product by ID
   */
  async getProductById(id: string): Promise<Product | null> {
    return this.executeAsync(() => productService.getProductById(id));
  }

  /**
   * Get product categories
   */
  async getCategories(): Promise<string[]> {
    const result = await this.executeAsync(() =>
      productService.getCategories()
    );
    return result ?? [];
  }

  /**
   * Private method to load products
   */
  private async loadProducts(): Promise<PaginatedResponse<Product>> {
    const { filters, pagination } = this.state;

    if (this.searchQuery) {
      return productService.searchProducts(filters, {
        page: pagination.page,
        limit: pagination.limit,
      });
    }

    return productService.getProducts({
      page: pagination.page,
      limit: pagination.limit,
      filters,
    });
  }
}

// Hook for using ProductViewModel
export function useProductViewModel(): ProductViewModel {
  return new ProductViewModel();
}
