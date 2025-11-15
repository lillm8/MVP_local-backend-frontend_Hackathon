// Order utility functions

import { Order } from '@/types';

export function calculateTotalAmount(items: Order['items']): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

export function getOrderStatusColor(status: Order['status']): string {
  const statusColors: Record<Order['status'], string> = {
    pending: 'yellow',
    confirmed: 'blue',
    preparing: 'orange',
    shipped: 'purple',
    delivered: 'green',
    cancelled: 'red',
    returned: 'gray',
  };

  return statusColors[status] || 'gray';
}

export function getOrderStatusText(status: Order['status']): string {
  const statusTexts: Record<Order['status'], string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    preparing: 'Preparing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    returned: 'Returned',
  };

  return statusTexts[status] || 'Unknown';
}

export function formatOrderDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatOrderTime(date: string): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getOrderProgress(status: Order['status']): number {
  const progressMap: Record<Order['status'], number> = {
    pending: 10,
    confirmed: 25,
    preparing: 50,
    shipped: 75,
    delivered: 100,
    cancelled: 0,
    returned: 0,
  };

  return progressMap[status] || 0;
}
