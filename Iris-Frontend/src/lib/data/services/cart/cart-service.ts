// Cart service layer
// Business logic for cart operations

import { apiClient } from '../../repositories/client';
import { endpoints } from '../../repositories/endpoints';
import { CartItem, Cart } from '@/types/cart';

export class CartService {
  /**
   * Get current cart
   */
  async getCart(): Promise<Cart> {
    return apiClient.get<Cart>(endpoints.cart.get());
  }

  /**
   * Add item to cart
   */
  async addItem(item: Omit<CartItem, 'id'>): Promise<CartItem> {
    return apiClient.post<CartItem>(endpoints.cart.addItem(), item);
  }

  /**
   * Update cart item quantity
   */
  async updateItemQuantity(
    itemId: string,
    quantity: number
  ): Promise<CartItem> {
    return apiClient.put<CartItem>(endpoints.cart.updateItem(itemId), {
      quantity,
    });
  }

  /**
   * Remove item from cart
   */
  async removeItem(itemId: string): Promise<void> {
    return apiClient.delete<void>(endpoints.cart.removeItem(itemId));
  }

  /**
   * Clear entire cart
   */
  async clearCart(): Promise<void> {
    return apiClient.delete<void>(endpoints.cart.clear());
  }

  /**
   * Get cart item count
   */
  async getItemCount(): Promise<number> {
    const cart = await this.getCart();
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Get cart total
   */
  async getTotal(): Promise<number> {
    const cart = await this.getCart();
    return cart.items.reduce((total, item) => total + item.totalPrice, 0);
  }
}

export const cartService = new CartService();
