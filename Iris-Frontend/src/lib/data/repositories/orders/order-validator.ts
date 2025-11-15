import { Order, OrderStatus } from '@/types';
import { CreateOrderRequest } from '@/lib/data/types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateOrderData(
  orderData: CreateOrderRequest
): ValidationResult {
  const errors: string[] = [];

  // Validate required fields
  if (!orderData.supplierId) {
    errors.push('Supplier ID is required');
  }

  if (!orderData.items || orderData.items.length === 0) {
    errors.push('Order must contain at least one item');
  }

  if (!orderData.deliveryAddress) {
    errors.push('Delivery address is required');
  }

  // Validate items
  if (orderData.items) {
    orderData.items.forEach((item, index) => {
      if (!item.productId) {
        errors.push(`Item ${index + 1}: Product ID is required`);
      }

      if (item.quantity <= 0) {
        errors.push(`Item ${index + 1}: Quantity must be greater than 0`);
      }
    });
  }

  // Validate delivery address
  if (orderData.deliveryAddress) {
    const address = orderData.deliveryAddress;
    if (
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zipCode
    ) {
      errors.push(
        'Delivery address must include street, city, state, and zip code'
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateOrderStatusUpdate(
  currentStatus: Order['status'],
  newStatus: Order['status']
): ValidationResult {
  const errors: string[] = [];

  // Define valid status transitions
  const validTransitions: Record<Order['status'], Order['status'][]> = {
    [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
    [OrderStatus.CONFIRMED]: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
    [OrderStatus.PREPARING]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
    [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
    [OrderStatus.DELIVERED]: [], // No transitions from delivered
    [OrderStatus.CANCELLED]: [], // No transitions from cancelled
    [OrderStatus.RETURNED]: [], // No transitions from returned
  };

  if (!validTransitions[currentStatus].includes(newStatus)) {
    errors.push(
      `Cannot change order status from ${currentStatus} to ${newStatus}`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function canCancelOrder(order: Order): boolean {
  return (
    order.status === OrderStatus.PENDING ||
    order.status === OrderStatus.CONFIRMED
  );
}

export function canUpdateOrder(order: Order): boolean {
  return (
    order.status !== OrderStatus.DELIVERED &&
    order.status !== OrderStatus.CANCELLED
  );
}
