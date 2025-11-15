// Order card component
// Displays order information in a card format

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Order } from '@/types';

interface OrderCardProps {
  order: Order;
  onViewDetails?: (orderId: string) => void;
  onCancel?: (orderId: string) => void;
}

export function OrderCard({ order, onViewDetails, onCancel }: OrderCardProps) {
  return (
    <Card className='w-full'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg'>Order #{order.id}</CardTitle>
          <Badge
            variant={order.status === 'delivered' ? 'default' : 'secondary'}
          >
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <p className='text-sm text-muted-foreground'>
            Created: {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p className='text-sm'>Total: ${order.total.toFixed(2)}</p>
          <p className='text-sm'>Items: {order.items.length}</p>
        </div>
        <div className='mt-4 flex gap-2'>
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(order.id)}
              className='text-sm text-blue-600 hover:underline'
            >
              View Details
            </button>
          )}
          {onCancel && order.status === 'pending' && (
            <button
              onClick={() => onCancel(order.id)}
              className='text-sm text-red-600 hover:underline'
            >
              Cancel
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
