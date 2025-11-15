import { Order, SearchParams, PaginatedResponse } from '@/types';
import { CreateOrderRequest } from '@/lib/data/types';
import { OrderRepository } from '../../repositories/orders/order-repository';
import {
  validateOrderData,
  validateOrderStatusUpdate,
  canCancelOrder,
  canUpdateOrder,
} from '../../repositories/orders/order-validator';
import {
  calculateTotalAmount,
  getOrderStatusColor,
  getOrderStatusText,
} from '../../repositories/orders/order-utils';

import { OrderServiceErrorHandler } from '../../repositories/orders/order-error-handler';

export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async getOrders(params?: SearchParams): Promise<PaginatedResponse<Order>> {
    try {
      return await this.orderRepository.getAll(params);
    } catch (error) {
      throw OrderServiceErrorHandler.handleServiceError('fetch orders', error);
    }
  }

  async getOrderById(id: string): Promise<Order> {
    try {
      return await this.orderRepository.getById(id);
    } catch (error) {
      throw OrderServiceErrorHandler.createError(
        `Failed to fetch order with id ${id}`,
        error
      );
    }
  }

  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    try {
      // Validate order data
      const validation = validateOrderData(orderData);
      if (!validation.isValid) {
        throw OrderServiceErrorHandler.handleValidationError(validation);
      }

      // Transform items to include required fields and calculate total amount
      const orderItems = orderData.items.map((item, index) => ({
        id: (index + 1).toString(),
        productId: item.productId,
        productName: `Product ${item.productId}`, // Mock product name
        quantity: item.quantity,
        unitPrice: 10, // Mock unit price
        totalPrice: item.quantity * 10,
        unit: 'kg', // Mock unit
      }));

      const totalAmount = calculateTotalAmount(orderItems);

      const orderWithTotal = {
        ...orderData,
        totalAmount,
      };

      return await this.orderRepository.create(orderWithTotal);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw OrderServiceErrorHandler.handleServiceError('create order', error);
    }
  }

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    try {
      // Get current order to validate status transition
      const currentOrder = await this.orderRepository.getById(id);
      const validation = validateOrderStatusUpdate(currentOrder.status, status);

      if (!validation.isValid) {
        throw OrderServiceErrorHandler.handleValidationError(validation);
      }

      return await this.orderRepository.updateStatus(id, status);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw OrderServiceErrorHandler.handleServiceError(
        'update order status',
        error
      );
    }
  }

  async updateOrder(id: string, data: Partial<Order>): Promise<Order> {
    try {
      return await this.orderRepository.update(id, data);
    } catch (error) {
      throw OrderServiceErrorHandler.handleServiceError('update order', error);
    }
  }

  async deleteOrder(id: string): Promise<void> {
    try {
      await this.orderRepository.delete(id);
    } catch (error) {
      throw OrderServiceErrorHandler.handleServiceError('delete order', error);
    }
  }

  async getSupplierOrders(
    supplierId: string,
    params?: SearchParams
  ): Promise<PaginatedResponse<Order>> {
    try {
      return await this.orderRepository.getBySupplier(supplierId, params);
    } catch (error) {
      throw OrderServiceErrorHandler.handleServiceError(
        'fetch supplier orders',
        error
      );
    }
  }

  async getCustomerOrders(
    customerId: string,
    params?: SearchParams
  ): Promise<PaginatedResponse<Order>> {
    try {
      return await this.orderRepository.getByCustomer(customerId, params);
    } catch (error) {
      throw OrderServiceErrorHandler.handleServiceError(
        'fetch customer orders',
        error
      );
    }
  }

  // Business logic methods
  calculateTotalAmount(items: Order['items']): number {
    return calculateTotalAmount(items);
  }

  getOrderStatusColor(status: Order['status']): string {
    return getOrderStatusColor(status);
  }

  getOrderStatusText(status: Order['status']): string {
    return getOrderStatusText(status);
  }

  canCancelOrder(order: Order): boolean {
    return canCancelOrder(order);
  }

  canUpdateOrder(order: Order): boolean {
    return canUpdateOrder(order);
  }
}
