// Product formatting utilities
// Data transformation and formatting for products

import { Product } from '@/types';

export class ProductFormatters {
  /**
   * Format product price for display
   */
  static formatPrice(price: number, currency = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(price);
  }

  /**
   * Format product weight for display
   */
  static formatWeight(weight: number, unit = 'kg'): string {
    return `${weight} ${unit}`;
  }

  /**
   * Format product dimensions for display
   */
  static formatDimensions(
    length: number,
    width: number,
    height: number,
    unit = 'cm'
  ): string {
    return `${length} × ${width} × ${height} ${unit}`;
  }

  /**
   * Format product availability status
   */
  static formatAvailability(isAvailable: boolean): string {
    return isAvailable ? 'Available' : 'Out of Stock';
  }

  /**
   * Format product rating for display
   */
  static formatRating(rating: number, maxRating = 5): string {
    return `${rating.toFixed(1)}/${maxRating}`;
  }

  /**
   * Format product tags for display
   */
  static formatTags(tags: string[]): string {
    return tags.join(', ');
  }

  /**
   * Format product creation date
   */
  static formatCreatedDate(date: string | Date): string {
    const createdDate = new Date(date);
    return createdDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  /**
   * Format product for search display
   */
  static formatForSearch(product: Product): string {
    const parts = [product.name, product.category];

    if (product.tags && product.tags.length > 0) {
      parts.push(...product.tags);
    }

    return parts.join(' ').toLowerCase();
  }

  /**
   * Format product summary for cards
   */
  static formatSummary(product: Product, maxLength = 100): string {
    if (product.description.length <= maxLength) {
      return product.description;
    }

    return product.description.substring(0, maxLength).trim() + '...';
  }

  /**
   * Format product images for display
   */
  static formatImageUrl(imageUrl: string, size = 'medium'): string {
    // This would integrate with your image CDN service
    // For now, return the original URL
    return imageUrl;
  }
}
