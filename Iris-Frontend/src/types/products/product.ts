// Main product type exports

export { ProductCategory } from './product-category';
export type { NutritionalInfo } from './product-nutrition';
export type {
  ProductIdentity,
  ProductCategorization,
  ProductPricing,
  ProductMedia,
  ProductSupplier,
  ProductTimestamps,
  BaseProduct,
} from './product-base';
export type { ProductFilters, ProductSearchParams } from './product-search';

import { NutritionalInfo } from './product-nutrition';
import { BaseProduct } from './product-base';

// Product metadata for additional information
export interface ProductMetadata {
  nutritionalInfo?: NutritionalInfo;
  stockQuantity?: number;
}

// Complete product interface combining base and metadata
export interface Product extends BaseProduct, ProductMetadata {}
