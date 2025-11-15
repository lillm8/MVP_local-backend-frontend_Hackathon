'use client';

import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { TrendingUp } from 'lucide-react';

export interface SupplierAnalytics {
  totalRevenue: string;
  totalOrders: number;
  avgOrderValue: string;
  lastOrderDate: string;
  orderFrequency: string;
  topProducts: string[];
}

export interface SupplierAnalyticsCardProps {
  analytics: SupplierAnalytics;
}

export function SupplierAnalyticsCard({
  analytics,
}: SupplierAnalyticsCardProps) {
  return (
    <Card className='rounded-3xl border-0 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='mb-4 flex items-center gap-2'>
        <TrendingUp className='h-5 w-5 text-primary' />
        <h3>Your Analytics</h3>
      </div>
      <p className='mb-4 text-sm text-muted-foreground'>
        Performance with this restaurant
      </p>
      <div className='space-y-4'>
        <div className='rounded-xl bg-primary/5 p-4'>
          <div className='mb-1 text-sm text-muted-foreground'>
            Total Revenue
          </div>
          <div className='text-2xl text-primary'>{analytics.totalRevenue}</div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <div className='rounded-xl bg-muted/30 p-3'>
            <div className='mb-1 text-xs text-muted-foreground'>Orders</div>
            <div className='font-medium'>{analytics.totalOrders}</div>
          </div>
          <div className='rounded-xl bg-muted/30 p-3'>
            <div className='mb-1 text-xs text-muted-foreground'>Avg Order</div>
            <div className='font-medium'>{analytics.avgOrderValue}</div>
          </div>
        </div>
        <div className='space-y-2 text-sm'>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Last Order:</span>
            <span>{analytics.lastOrderDate}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Frequency:</span>
            <span>{analytics.orderFrequency}</span>
          </div>
        </div>
        <div>
          <div className='mb-2 text-sm text-muted-foreground'>Top Products</div>
          <div className='flex flex-wrap gap-1'>
            {analytics.topProducts.map((product, idx) => (
              <Badge key={idx} variant='outline' className='text-xs'>
                {product}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
