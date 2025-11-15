'use client';

import { AlertCircle, Clock, TrendingDown } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { toast } from 'sonner';

export function UrgentActionsCard() {
  return (
    <Card className='rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='border-b border-border p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='rounded-xl bg-destructive/10 p-2'>
              <AlertCircle className='h-5 w-5 text-destructive' />
            </div>
            <h3 className='text-lg'>Urgent Actions</h3>
          </div>
          <Badge variant='destructive'>3</Badge>
        </div>
      </div>
      <div className='p-6'>
        <div className='space-y-3'>
          <div className='rounded-2xl border-2 border-destructive/20 bg-destructive/5 p-4'>
            <div className='mb-2 flex items-start justify-between'>
              <div className='flex items-start gap-3'>
                <TrendingDown className='h-5 w-5 text-destructive' />
                <div>
                  <h4 className='mb-1 font-medium'>Low Stock Alert</h4>
                  <p className='text-sm text-muted-foreground'>
                    Seasonal Greens Mix: Only 12 kg remaining
                  </p>
                </div>
              </div>
            </div>
            <Button
              size='sm'
              variant='outline'
              className='mt-3 w-full rounded-xl border-destructive/30 hover:bg-destructive/10'
              onClick={() => toast.success('Opening stock management')}
            >
              Update Stock
            </Button>
          </div>

          <div className='rounded-2xl border-2 border-destructive/20 bg-destructive/5 p-4'>
            <div className='mb-2 flex items-start justify-between'>
              <div className='flex items-start gap-3'>
                <AlertCircle className='h-5 w-5 text-destructive' />
                <div>
                  <h4 className='mb-1 font-medium'>Out of Stock</h4>
                  <p className='text-sm text-muted-foreground'>
                    Baby Potatoes: Unavailable
                  </p>
                </div>
              </div>
            </div>
            <Button
              size='sm'
              variant='outline'
              className='mt-3 w-full rounded-xl border-destructive/30 hover:bg-destructive/10'
              onClick={() => toast.success('Opening restock form')}
            >
              Restock Now
            </Button>
          </div>

          <div className='rounded-2xl border-2 border-accent/20 bg-accent/5 p-4'>
            <div className='mb-2 flex items-start justify-between'>
              <div className='flex items-start gap-3'>
                <Clock className='h-5 w-5 text-accent' />
                <div>
                  <h4 className='mb-1 font-medium'>Pending Order</h4>
                  <p className='text-sm text-muted-foreground'>
                    Order #ORD-1234 from La Cucina awaiting confirmation
                  </p>
                </div>
              </div>
            </div>
            <Button
              size='sm'
              variant='outline'
              className='mt-3 w-full rounded-xl border-accent/30 hover:bg-accent/10'
              onClick={() => toast.success('Opening order details')}
            >
              Review Order
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
