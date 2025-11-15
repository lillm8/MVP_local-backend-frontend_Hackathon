// Order status component
// Displays order status with appropriate styling

import React from 'react';
import { Badge } from '@components/ui/badge';
import { OrderStatus as OrderStatusType } from '@/types';

interface OrderStatusProps {
  status: OrderStatusType;
  className?: string;
}

const VARIANT_MAP: Record<
  OrderStatusType,
  'default' | 'secondary' | 'destructive'
> = {
  pending: 'secondary',
  confirmed: 'default',
  preparing: 'default',
  shipped: 'default',
  delivered: 'default',
  cancelled: 'destructive',
  returned: 'secondary',
};

const LABEL_MAP: Record<OrderStatusType, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  returned: 'Returned',
};

export function OrderStatus(props: OrderStatusProps) {
  const { status, className } = props;
  const variant = VARIANT_MAP[status] ?? 'secondary';
  const label = LABEL_MAP[status] ?? status;
  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
