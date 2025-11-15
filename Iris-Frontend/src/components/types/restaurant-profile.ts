// Presentation layer types for restaurant profile components
// Aligns with 4-layer architecture - Domain/Application types used by Presentation layer

export interface RestaurantDisplayInfo {
  rating: number;
  totalReviews: number;
  location: string;
  memberSince: string;
}

export interface RestaurantContentInfo {
  description: string;
  cuisine: string[];
}

export interface RestaurantStats {
  seatingCapacity: number;
  avgMonthlyOrders: number;
  established: string;
  orderVolume: string;
}

