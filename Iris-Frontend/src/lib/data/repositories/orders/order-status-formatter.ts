// Order status formatting utilities

import { Order, OrderStatus } from '@/types';

// Status configuration mapping to reduce cyclomatic complexity
const STATUS_CONFIG = {
  [OrderStatus.PENDING]: {
    color: 'bg-yellow-100 text-yellow-800',
    text: 'Pending',
    progress: 20,
  },
  [OrderStatus.CONFIRMED]: {
    color: 'bg-blue-100 text-blue-800',
    text: 'Confirmed',
    progress: 40,
  },
  [OrderStatus.PREPARING]: {
    color: 'bg-orange-100 text-orange-800',
    text: 'Preparing',
    progress: 60,
  },
  [OrderStatus.SHIPPED]: {
    color: 'bg-green-100 text-green-800',
    text: 'Shipped',
    progress: 80,
  },
  [OrderStatus.DELIVERED]: {
    color: 'bg-gray-100 text-gray-800',
    text: 'Delivered',
    progress: 100,
  },
  [OrderStatus.CANCELLED]: {
    color: 'bg-red-100 text-red-800',
    text: 'Cancelled',
    progress: 0,
  },
  [OrderStatus.RETURNED]: {
    color: 'bg-purple-100 text-purple-800',
    text: 'Returned',
    progress: 0,
  },
} as const;

const DEFAULT_CONFIG = {
  color: 'bg-gray-100 text-gray-800',
  text: 'Unknown',
  progress: 0,
};

export function getOrderStatusColor(status: Order['status']): string {
  return STATUS_CONFIG[status]?.color ?? DEFAULT_CONFIG.color;
}

export function getOrderStatusText(status: Order['status']): string {
  return STATUS_CONFIG[status]?.text ?? DEFAULT_CONFIG.text;
}

export function getOrderProgress(status: Order['status']): number {
  return STATUS_CONFIG[status]?.progress ?? DEFAULT_CONFIG.progress;
}
