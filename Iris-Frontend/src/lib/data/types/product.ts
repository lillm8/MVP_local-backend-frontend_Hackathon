// Product API types (Infrastructure contracts)

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  supplierId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  tags?: string[];
  isAvailable?: boolean;
}

export interface ProductSearchParams {
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'price' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  filters?: ProductFilters;
}

