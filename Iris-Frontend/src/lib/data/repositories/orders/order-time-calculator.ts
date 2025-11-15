// Order time calculation utilities

import { Order, OrderStatus } from '@/types';

// Strategy pattern for delivery time calculation
interface DeliveryTimeStrategy {
  getTime(): string;
}

class PendingDeliveryTime implements DeliveryTimeStrategy {
  getTime(): string {
    return '2-3 hours';
  }
}

class ConfirmedDeliveryTime implements DeliveryTimeStrategy {
  getTime(): string {
    return '1-2 hours';
  }
}

class PreparingDeliveryTime implements DeliveryTimeStrategy {
  getTime(): string {
    return '30-60 minutes';
  }
}

class ShippedDeliveryTime implements DeliveryTimeStrategy {
  getTime(): string {
    return 'Out for delivery';
  }
}

class DeliveredDeliveryTime implements DeliveryTimeStrategy {
  getTime(): string {
    return 'Delivered';
  }
}

class CancelledDeliveryTime implements DeliveryTimeStrategy {
  getTime(): string {
    return 'Cancelled';
  }
}

class ReturnedDeliveryTime implements DeliveryTimeStrategy {
  getTime(): string {
    return 'Returned';
  }
}

class UnknownDeliveryTime implements DeliveryTimeStrategy {
  getTime(): string {
    return 'Unknown';
  }
}

// Strategy factory for extensibility
class DeliveryTimeStrategyFactory {
  private static strategies: Map<OrderStatus, DeliveryTimeStrategy> = new Map();
  private static unknownStrategy = new UnknownDeliveryTime();

  static {
    // Initialize strategies only once
    this.strategies.set(OrderStatus.PENDING, new PendingDeliveryTime());
    this.strategies.set(OrderStatus.CONFIRMED, new ConfirmedDeliveryTime());
    this.strategies.set(OrderStatus.PREPARING, new PreparingDeliveryTime());
    this.strategies.set(OrderStatus.SHIPPED, new ShippedDeliveryTime());
    this.strategies.set(OrderStatus.DELIVERED, new DeliveredDeliveryTime());
    this.strategies.set(OrderStatus.CANCELLED, new CancelledDeliveryTime());
    this.strategies.set(OrderStatus.RETURNED, new ReturnedDeliveryTime());
  }

  static getStrategy(status: Order['status']): DeliveryTimeStrategy {
    return this.strategies.get(status) || this.unknownStrategy;
  }
}

export function getEstimatedDeliveryTime(status: Order['status']): string {
  const strategy = DeliveryTimeStrategyFactory.getStrategy(status);
  return strategy.getTime();
}
