// Order actions component
// Provides action buttons for orders

import React from 'react';
import { Button } from '@components/ui/button';
import { OrderStatus as OrderStatusType } from '@/types';

interface OrderActionsProps {
  orderId: string;
  status: OrderStatusType;
  onViewDetails?: (orderId: string) => void;
  onCancel?: (orderId: string) => void;
  onTrack?: (orderId: string) => void;
  onReorder?: (orderId: string) => void;
}

export function OrderActions({
  orderId,
  status,
  onViewDetails,
  onCancel,
  onTrack,
  onReorder,
}: OrderActionsProps) {
  const canCancel = status === 'pending' || status === 'confirmed';
  const canTrack = status === 'shipped' || status === 'delivered';
  const canReorder = status === 'delivered';

  return (
    <div className='flex gap-2'>
      {onViewDetails && (
        <Button
          variant='outline'
          size='sm'
          onClick={() => onViewDetails(orderId)}
        >
          View Details
        </Button>
      )}

      {canCancel && onCancel && (
        <Button
          variant='destructive'
          size='sm'
          onClick={() => onCancel(orderId)}
        >
          Cancel Order
        </Button>
      )}

      {canTrack && onTrack && (
        <Button variant='outline' size='sm' onClick={() => onTrack(orderId)}>
          Track Order
        </Button>
      )}

      {canReorder && onReorder && (
        <Button variant='default' size='sm' onClick={() => onReorder(orderId)}>
          Reorder
        </Button>
      )}
    </div>
  );
}
