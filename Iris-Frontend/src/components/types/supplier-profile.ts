// Presentation layer types for supplier profile components
// Aligns with 4-layer architecture - Domain/Application types used by Presentation layer

export interface SupplierDisplayInfo {
  rating: number;
  totalReviews: number;
  memberSince: string;
}

export interface SupplierContentInfo {
  description: string;
  certifications: string[];
}

export interface SupplierStats {
  totalProducts: number;
  totalOrders: number;
  responseTime: string;
  deliveryRate: string;
}

