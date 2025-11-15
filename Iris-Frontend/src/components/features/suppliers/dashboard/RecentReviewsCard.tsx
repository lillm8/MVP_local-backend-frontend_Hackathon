'use client';

import { Star } from 'lucide-react';
import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';

export function RecentReviewsCard() {
  return (
    <Card className='rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='border-b border-border p-6'>
        <div className='flex items-center gap-2'>
          <div className='rounded-xl bg-accent/10 p-2'>
            <Star className='h-5 w-5 text-accent' />
          </div>
          <h3 className='text-lg'>Recent Reviews</h3>
        </div>
      </div>
      <div className='p-6'>
        <div className='space-y-4'>
          <div className='rounded-2xl border-2 border-accent/10 bg-accent/5 p-4'>
            <div className='mb-2 flex items-start justify-between'>
              <div className='flex items-center gap-2'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
                  GT
                </div>
                <div>
                  <h4 className='text-sm font-medium'>Green Table</h4>
                  <div className='flex gap-0.5'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className='h-3 w-3 fill-accent text-accent'
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Badge variant='secondary' className='text-xs'>
                1d ago
              </Badge>
            </div>
            <p className='text-sm text-muted-foreground'>
              "Exceptional quality! The tomatoes were incredibly fresh."
            </p>
          </div>

          <div className='rounded-2xl border-2 border-accent/10 bg-accent/5 p-4'>
            <div className='mb-2 flex items-start justify-between'>
              <div className='flex items-center gap-2'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
                  FF
                </div>
                <div>
                  <h4 className='text-sm font-medium'>Farm to Fork</h4>
                  <div className='flex gap-0.5'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className='h-3 w-3 fill-accent text-accent'
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Badge variant='secondary' className='text-xs'>
                2d ago
              </Badge>
            </div>
            <p className='text-sm text-muted-foreground'>
              "Reliable deliveries and great communication!"
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
