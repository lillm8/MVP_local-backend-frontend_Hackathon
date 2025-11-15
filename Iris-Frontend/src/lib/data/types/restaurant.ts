// Restaurant API types (Infrastructure contracts)

export interface RestaurantFilters {
  cuisineType?: string;
  minRating?: number;
  search?: string;
  isVerified?: boolean;
}

export interface RestaurantSearchParams {
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  filters?: RestaurantFilters;
}

