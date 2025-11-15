export interface BaseSearchParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface SearchParams extends BaseSearchParams {
  status?: string;
  supplierId?: string;
  customerId?: string;
  restaurantId?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  verified?: boolean;
  minRating?: number;
  maxDistance?: number;
}
