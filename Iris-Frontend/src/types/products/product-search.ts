// Product search and filter types

import { ProductCategory } from './product-category';

export interface ProductFilters {
  category?: ProductCategory;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  supplierId?: string;
  isAvailable?: boolean;
  tags?: string[];
  search?: string;
}

export interface ProductSearchParams {
  filters?: ProductFilters;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'price' | 'createdAt' | 'rating';
  sortOrder?: 'asc' | 'desc';
}
