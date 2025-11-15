'use client';

import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { Package } from 'lucide-react';

export interface Order {
  id: string;
  date: string;
  items: string[];
  total: string;
  status: string;
}

export interface OrderHistoryCardProps {
  orders: Order[];
}

export function OrderHistoryCard({ orders }: OrderHistoryCardProps) {
  return (
    <Card className='rounded-3xl border-0 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] lg:col-span-2'>
      <div className='mb-4 flex items-center gap-2'>
        <Package className='h-5 w-5 text-primary' />
        <h3>Order History</h3>
      </div>
      <p className='mb-4 text-sm text-muted-foreground'>
        Recent orders from this restaurant
      </p>
      <div className='space-y-3'>
        {orders.map(order => (
          <div
            key={order.id}
            className='duration-250 rounded-xl border border-border p-4 transition-all hover:border-primary/50'
          >
            <div className='mb-3 flex items-start justify-between'>
              <div>
                <h4 className='mb-1'>{order.id}</h4>
                <p className='text-sm text-muted-foreground'>{order.date}</p>
              </div>
              <div className='text-right'>
                <div className='mb-1 text-primary'>{order.total}</div>
                <Badge variant='outline'>{order.status}</Badge>
              </div>
            </div>
            <div className='flex flex-wrap gap-1'>
              {order.items.map((item, idx) => (
                <span
                  key={idx}
                  className='rounded-lg bg-muted/50 px-2 py-1 text-xs'
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
