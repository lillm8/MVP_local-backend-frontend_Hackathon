'use client';

import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import {
  Calendar,
  DollarSign,
  MapPin,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import type {
  RestaurantDisplayInfo,
  RestaurantContentInfo,
  RestaurantStats,
} from '@/components/types/restaurant-profile';

export interface RestaurantInfoSectionProps {
  display: RestaurantDisplayInfo;
  content: RestaurantContentInfo;
  stats: RestaurantStats;
}

export function RestaurantInfoSection({
  display,
  content,
  stats,
}: RestaurantInfoSectionProps) {
  const { rating, totalReviews, location, memberSince } = display;
  const { description, cuisine } = content;
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
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <MapPin className='h-4 w-4' />
          {location}
        </div>
        <div className='h-6 w-px bg-border' />
        <div className='text-sm text-muted-foreground'>
          Member since {memberSince}
        </div>
      </div>

      <p className='mb-4 leading-relaxed text-foreground'>{description}</p>

      <div className='mb-4'>
        <p className='mb-2 text-sm text-muted-foreground'>Cuisine Types</p>
        <div className='flex flex-wrap gap-2'>
          {cuisine.map((type, idx) => (
            <Badge key={idx} variant='outline'>
              {type}
            </Badge>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-4 gap-4 rounded-2xl bg-muted/30 p-4'>
        <div>
          <div className='mb-1 flex items-center gap-2 text-sm text-muted-foreground'>
            <Users className='h-4 w-4' /> Seating
          </div>
          <div>{stats.seatingCapacity} seats</div>
        </div>
        <div>
          <div className='mb-1 flex items-center gap-2 text-sm text-muted-foreground'>
            <TrendingUp className='h-4 w-4' /> Monthly Orders
          </div>
          <div>{stats.avgMonthlyOrders}</div>
        </div>
        <div>
          <div className='mb-1 flex items-center gap-2 text-sm text-muted-foreground'>
            <Calendar className='h-4 w-4' /> Established
          </div>
          <div>{stats.established}</div>
        </div>
        <div>
          <div className='mb-1 flex items-center gap-2 text-sm text-muted-foreground'>
            <DollarSign className='h-4 w-4' /> Order Volume
          </div>
          <div>{stats.orderVolume}</div>
        </div>
      </div>
    </div>
  );
}
