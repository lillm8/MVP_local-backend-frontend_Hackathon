'use client';

import {
  ArrowRight,
  Clock,
  Eye,
  MapPin,
  MessageCircle,
  Package,
  Store,
} from 'lucide-react';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { useSupplierDashboardTab } from '@/hooks/suppliers/use-supplier-dashboard-tab';

export interface NewRestaurantMatchesCardProps {
  onContactRestaurant?: (restaurantName: string) => void;
  onViewRestaurantProfile?: (restaurantId: string) => void;
}

export function NewRestaurantMatchesCard({
  onContactRestaurant,
  onViewRestaurantProfile,
}: NewRestaurantMatchesCardProps) {
  const { handleContactRestaurant, handleViewRestaurantProfile } =
    useSupplierDashboardTab({
      onContactRestaurant,
      onViewRestaurantProfile,
    });

  return (
    <Card className='rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='border-b border-border p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <div className='mb-1 flex items-center gap-2'>
              <div className='rounded-xl bg-primary/10 p-2'>
                <Store className='h-5 w-5 text-primary' />
              </div>
              <h3 className='text-lg'>New Restaurant Matches</h3>
            </div>
            <p className='text-sm text-muted-foreground'>
              Restaurants looking for suppliers like you
            </p>
          </div>
          <Badge className='bg-primary'>4 New</Badge>
        </div>
      </div>
      <div className='p-6'>
        <div className='grid gap-4 md:grid-cols-2'>
          {[
            {
              id: '5',
              code: 'OT',
              name: 'Organic Table',
              match: '95%',
              away: '10 min',
              looking: 'Organic vegetables, seasonal produce',
              frequency: 'weekly',
            },
            {
              id: '6',
              code: 'VK',
              name: 'Verde Kitchen',
              match: '88%',
              away: '15 min',
              looking: 'Root vegetables, fresh herbs',
              frequency: 'bi-weekly',
            },
            {
              id: '7',
              code: 'RC',
              name: 'Roots Cafe',
              match: '82%',
              away: '22 min',
              looking: 'Mixed vegetables, greens',
              frequency: 'daily',
            },
            {
              id: '8',
              code: 'SE',
              name: "Season's Essence",
              match: '90%',
              away: '18 min',
              looking: 'Premium vegetables, rare varieties',
              frequency: '3x weekly',
            },
          ].map(r => (
            <div
              key={r.id}
              className='rounded-2xl border-2 border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-5'
            >
              <div className='mb-4 flex items-start justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                    {r.code}
                  </div>
                  <div>
                    <h4 className='mb-1 font-medium'>{r.name}</h4>
                    <p className='text-sm text-muted-foreground'>
                      Plant-Based Restaurant
                    </p>
                  </div>
                </div>
                <Badge
                  variant='secondary'
                  className='bg-primary/10 text-primary'
                >
                  {r.match} Match
                </Badge>
              </div>
              <div className='mb-4 space-y-2 text-sm'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <MapPin className='h-4 w-4' />
                  <span>{r.away} away</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Package className='h-4 w-4 text-primary' />
                  <span>Looking for: {r.looking}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='h-4 w-4 text-primary' />
                  <span>Needs {r.frequency} deliveries</span>
                </div>
              </div>
              <div className='flex gap-2'>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => handleViewRestaurantProfile(r.id)}
                  className='flex-1 rounded-xl'
                >
                  <Eye className='mr-2 h-4 w-4' />
                  View
                </Button>
                <Button
                  size='sm'
                  onClick={() => handleContactRestaurant(r.name)}
                  className='flex-1 rounded-xl bg-primary hover:bg-primary/90'
                >
                  <MessageCircle className='mr-2 h-4 w-4' />
                  Contact
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant='outline'
          className='mt-6 w-full rounded-xl'
          onClick={() => handleViewRestaurantProfile('all')}
        >
          View All Matches
          <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </Card>
  );
}
