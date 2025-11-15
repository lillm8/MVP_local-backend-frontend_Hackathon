import { Store, Calendar, DollarSign, ChevronDown, Truck } from 'lucide-react';
import { Card } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Progress } from '@components/ui/progress';
import type { Order } from '@/types/suppliers/supplier-dashboard/types';
import { getStatusIcon, getStatusColor } from './OrderStatusHelpers';

interface OrderCardProps {
  order: Order;
  progressPct: number;
  estimate: string;
}

export function OrderCard({ order, progressPct, estimate }: OrderCardProps) {
  return (
    <Card className='duration-250 overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]'>
      <div className='cursor-pointer p-6'>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <div className='mb-2 flex items-center gap-3'>
              <h3 className='text-lg'>{order.id}</h3>
              <Badge
                className={
                  order.status.toLowerCase() === 'processing'
                    ? 'bg-primary/20 text-primary'
                    : order.status.toLowerCase() === 'confirmed'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-accent text-accent-foreground'
                }
              >
                {order.status}
              </Badge>
            </div>
            <div className='mb-2 flex items-center gap-2'>
              <span className='text-muted-foreground'>{order.restaurant}</span>
              <Button
                variant='ghost'
                size='sm'
                className='h-6 rounded-lg px-2 text-xs'
              >
                <Store className='mr-1 h-3 w-3' />
                View Store
              </Button>
            </div>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <div className='flex items-center gap-1'>
                <Calendar className='h-4 w-4' />
                <span>{order.date}</span>
              </div>
              <div className='flex items-center gap-1'>
                <DollarSign className='h-4 w-4' />
                <span>{order.total}</span>
              </div>
            </div>
          </div>
          <div className='flex items-start gap-2'>
            <ChevronDown className='duration-250 h-5 w-5 text-muted-foreground transition-transform' />
          </div>
        </div>

        <div className='mt-4'>
          <div className='mb-2 flex items-center justify-between text-sm'>
            <span className='text-muted-foreground'>Order Progress</span>
            <span className='text-primary'>{progressPct}%</span>
          </div>
          <Progress value={progressPct} className='h-2' />
        </div>

        <div className='mt-4 rounded-xl bg-accent/10 p-3'>
          <div className='flex items-center gap-2 text-sm'>
            <Truck className='h-4 w-4 text-accent' />
            <span className='text-muted-foreground'>Estimated delivery: </span>
            <span className='text-accent'>{estimate}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
