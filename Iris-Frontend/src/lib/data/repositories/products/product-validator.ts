// Product validation utilities
// Validation logic for product data

import { Product } from '@/types';

export interface ProductValidationError {
  field: string;
  message: string;
}

export interface ProductValidationResult {
  isValid: boolean;
  errors: ProductValidationError[];
}

export class ProductValidator {
  /**
   * Validate product data
   */
  static validateProduct(product: Partial<Product>): ProductValidationResult {
    const errors: ProductValidationError[] = [];

    // Required fields validation
    if (!product.name || product.name.trim().length === 0) {
      errors.push({
        field: 'name',
        message: 'Product name is required',
      });
    }

    if (!product.description || product.description.trim().length === 0) {
      errors.push({
        field: 'description',
        message: 'Product description is required',
      });
    }

    if (product.price === undefined || product.price === null) {
      errors.push({
        field: 'price',
        message: 'Product price is required',
      });
    } else if (product.price < 0) {
      errors.push({
        field: 'price',
        message: 'Product price must be positive',
      });
    }

    if (!product.category || product.category.trim().length === 0) {
      errors.push({
        field: 'category',
        message: 'Product category is required',
      });
    }

    if (!product.supplierId || product.supplierId.trim().length === 0) {
      errors.push({
        field: 'supplierId',
        message: 'Supplier ID is required',
      });
    }

    // Optional field validation
    if (product.name && product.name.length > 100) {
      errors.push({
        field: 'name',
        message: 'Product name must be less than 100 characters',
      });
    }

    if (product.description && product.description.length > 1000) {
      errors.push({
        field: 'description',
        message: 'Product description must be less than 1000 characters',
      });
    }

    if (product.images && product.images.length > 10) {
      errors.push({
        field: 'images',
        message: 'Maximum 10 images allowed per product',
      });
    }

    if (product.tags && product.tags.length > 20) {
      errors.push({
        field: 'tags',
        message: 'Maximum 20 tags allowed per product',
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate product search filters
   */
  static validateSearchFilters(filters: any): ProductValidationResult {
    const errors: ProductValidationError[] = [];

    if (filters.minPrice !== undefined && filters.minPrice < 0) {
      errors.push({
        field: 'minPrice',
        message: 'Minimum price must be positive',
      });
    }

    if (filters.maxPrice !== undefined && filters.maxPrice < 0) {
      errors.push({
        field: 'maxPrice',
        message: 'Maximum price must be positive',
      });
    }

    if (
      filters.minPrice !== undefined &&
      filters.maxPrice !== undefined &&
      filters.minPrice > filters.maxPrice
    ) {
      errors.push({
        field: 'priceRange',
        message: 'Minimum price cannot be greater than maximum price',
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
