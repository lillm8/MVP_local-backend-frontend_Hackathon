// Supplier API types (Infrastructure contracts)

export interface SupplierFilters {
  businessType?: string;
  minRating?: number;
  deliveryRadius?: number;
  search?: string;
  isVerified?: boolean;
}

export interface SupplierSearchParams {
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  filters?: SupplierFilters;
}

