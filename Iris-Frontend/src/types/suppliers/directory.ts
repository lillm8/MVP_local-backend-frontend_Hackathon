export interface SupplierIdentity {
  id: string;
  name: string;
}

export interface SupplierCategoryInfo {
  category: string;
  categoryTypes: string[];
}

export interface SupplierLocationInfo {
  location: string;
  distance: number; // kilometers
}

export interface SupplierReputationInfo {
  rating: number;
  totalReviews: number;
  verified: boolean;
  certifications: string[];
}

export interface SupplierMediaInfo {
  image: string;
  avatar: string;
}

export interface SupplierBusinessStats {
  totalProducts: number;
  responseTime: string;
  memberSince: string;
}

export interface SupplierDescription {
  description: string;
}

export type Supplier = SupplierIdentity &
  SupplierCategoryInfo &
  SupplierLocationInfo &
  SupplierReputationInfo &
  SupplierMediaInfo &
  SupplierBusinessStats &
  SupplierDescription;
