'use client';

import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { Clock, Package, ShoppingCart, Star, TrendingUp } from 'lucide-react';
import type {
  SupplierDisplayInfo,
  SupplierContentInfo,
  SupplierStats,
} from '@/components/types/supplier-profile';

export interface SupplierInfoSectionProps {
  display: SupplierDisplayInfo;
  content: SupplierContentInfo;
  stats: SupplierStats;
}

export function SupplierInfoSection({
  display,
  content,
  stats,
}: SupplierInfoSectionProps) {
  const { rating, totalReviews, memberSince } = display;
  const { description, certifications } = content;
  return (
    <div className='p-6'>
      <div className='mb-4 flex items-center gap-6'>
        <div className='flex items-center gap-2'>
          <Star className='h-5 w-5 fill-primary text-primary' />
          <span className='text-lg'>{rating}</span>
          <span className='text-sm text-muted-foreground'>
            ({totalReviews} reviews)
          </span>
        </div>
        <div className='h-6 w-px bg-border' />
        <div className='text-sm text-muted-foreground'>
          Member since {memberSince}
        </div>
      </div>

      <p className='mb-4 leading-relaxed text-foreground'>{description}</p>

      <div className='mb-4'>
        <p className='mb-2 text-sm text-muted-foreground'>Certifications</p>
        <div className='flex flex-wrap gap-2'>
          {certifications.map((cert, index) => (
            <Badge key={index} variant='outline'>
              {cert}
            </Badge>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-4 gap-4 rounded-2xl bg-muted/30 p-4'>
        <div>
          <div className='mb-1 flex items-center gap-2 text-sm text-muted-foreground'>
            <Package className='h-4 w-4' />
            Products
          </div>
          <div>{stats.totalProducts}</div>
        </div>
        <div>
          <div className='mb-1 flex items-center gap-2 text-sm text-muted-foreground'>
            <ShoppingCart className='h-4 w-4' />
            Total Orders
          </div>
          <div>{stats.totalOrders}</div>
        </div>
        <div>
          <div className='mb-1 flex items-center gap-2 text-sm text-muted-foreground'>
            <Clock className='h-4 w-4' />
            Response Time
          </div>
          <div>{stats.responseTime}</div>
        </div>
        <div>
          <div className='mb-1 flex items-center gap-2 text-sm text-muted-foreground'>
            <TrendingUp className='h-4 w-4' />
            Delivery Rate
          </div>
          <div>{stats.deliveryRate}</div>
        </div>
      </div>
    </div>
  );
}
