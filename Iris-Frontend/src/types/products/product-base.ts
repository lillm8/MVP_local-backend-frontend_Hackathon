// Core product base interfaces

// Core product identification and basic info
export interface ProductIdentity {
  id: string;
  name: string;
  description: string;
}

// Product categorization
export interface ProductCategorization {
  category: import('./product-category').ProductCategory;
  subcategory?: string;
  tags: string[];
}

// Product pricing and availability
export interface ProductPricing {
  price: number;
  unit: string;
  isAvailable: boolean;
  minimumOrderQuantity: number;
}

// Product media
export interface ProductMedia {
  image?: string;
  images?: string[];
}

// Product supplier information
export interface ProductSupplier {
  supplierId: string;
  supplierName: string;
}

// Product timestamps
export interface ProductTimestamps {
  createdAt: string;
  updatedAt: string;
}

// Base product interface combining focused interfaces
export interface BaseProduct
  extends ProductIdentity,
    ProductCategorization,
    ProductPricing,
    ProductMedia,
    ProductSupplier,
    ProductTimestamps {}
