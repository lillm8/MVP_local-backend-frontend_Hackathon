import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Progress } from '@components/ui/progress';
import {
  Package,
  Calendar,
  DollarSign,
  RefreshCw,
  Truck,
  Clock,
  CheckCircle,
  Store,
  Heart,
} from 'lucide-react';

interface OrdersPageProps {
  onViewSupplier?: (supplierId: string) => void;
}

export function OrdersPage({ onViewSupplier }: OrdersPageProps) {
  const activeOrders = [
    {
      id: 'ORD-1001',
      supplier: 'Green Valley Farm',
      supplierId: 1,
      date: 'Oct 22, 2025',
      total: 127.5,
      status: 'In Transit',
      statusClass: 'bg-accent text-accent-foreground',
      progress: 75,
      eta: 'Thursday, Oct 24 - 8 AM',
    },
    {
      id: 'ORD-1002',
      supplier: 'Mountain Dairy Co.',
      supplierId: 2,
      date: 'Oct 23, 2025',
      total: 89.2,
      status: 'Processing',
      statusClass: 'bg-primary/20 text-primary',
      progress: 25,
      eta: 'Friday, Oct 25 - 10 AM',
    },
    {
      id: 'ORD-1003',
      supplier: 'Heritage Bakery',
      supplierId: 3,
      date: 'Oct 24, 2025',
      total: 68.0,
      status: 'Confirmed',
      statusClass: 'bg-primary/10 text-primary',
      progress: 10,
      eta: 'Saturday, Oct 26 - 7 AM',
    },
  ];
  const completedOrders: any[] = [];
  const reorderOrders: any[] = [];
  const draftOrders: any[] = [{ id: 'DRAFT-001' }];

  const renderOrderCard = (o: any) => (
    <Card
      key={o.id}
      className='duration-250 overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]'
    >
      <div className='cursor-pointer p-6'>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <div className='mb-2 flex items-center gap-3'>
              <h3 className='text-lg'>{o.id}</h3>
              <Badge className={o.statusClass}>{o.status}</Badge>
            </div>
            <div className='mb-2 flex items-center gap-2'>
              <span className='text-muted-foreground'>{o.supplier}</span>
              {o.supplierId && (
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-6 rounded-lg px-2 text-xs'
                  onClick={() => onViewSupplier?.(String(o.supplierId))}
                >
                  <Store className='mr-1 h-3 w-3' />
                  View Store
                </Button>
              )}
            </div>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <div className='flex items-center gap-1'>
                <Calendar className='h-4 w-4' />
                <span>{o.date}</span>
              </div>
              <div className='flex items-center gap-1'>
                <DollarSign className='h-4 w-4' />
                <span>€{o.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <Clock className='h-5 w-5 text-muted-foreground' />
        </div>
        <div className='mt-4'>
          <div className='mb-2 flex items-center justify-between text-sm'>
            <span className='text-muted-foreground'>Order Progress</span>
            <span className='text-primary'>{o.progress}%</span>
          </div>
          <Progress value={o.progress} className='h-2' />
        </div>
        <div className='mt-4 rounded-xl bg-accent/10 p-3'>
          <div className='flex items-center gap-2 text-sm'>
            <Truck className='h-4 w-4 text-accent' />
            <span className='text-muted-foreground'>Estimated delivery: </span>
            <span className='text-accent'>{o.eta}</span>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className='min-h-screen py-12'>
      <div className='mx-auto max-w-[1440px] px-8'>
        <div className='mb-8'>
          <h1 className='mb-2 text-4xl text-primary'>Orders</h1>
          <p className='text-muted-foreground'>
            Manage and track all your orders in one place
          </p>
        </div>

        <Tabs defaultValue='active' className='w-full'>
          <TabsList className='mb-8 grid w-full max-w-2xl grid-cols-4 rounded-xl bg-white p-1 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
            <TabsTrigger value='active' className='rounded-lg'>
              <Clock className='mr-2 h-4 w-4' /> Active ({activeOrders.length})
            </TabsTrigger>
            <TabsTrigger value='completed' className='rounded-lg'>
              <CheckCircle className='mr-2 h-4 w-4' /> Completed (
              {completedOrders.length})
            </TabsTrigger>
            <TabsTrigger value='reorder' className='rounded-lg'>
              <RefreshCw className='mr-2 h-4 w-4' /> Reorder (
              {reorderOrders.length})
            </TabsTrigger>
            <TabsTrigger value='drafts' className='rounded-lg'>
              <Package className='mr-2 h-4 w-4' /> Drafts ({draftOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value='active' className='space-y-4'>
            {activeOrders.map(renderOrderCard)}
          </TabsContent>
          <TabsContent value='completed' className='space-y-4' />
          <TabsContent value='reorder' className='space-y-4' />
          <TabsContent value='drafts' className='space-y-4' />
        </Tabs>

        {/* Summary Stats */}
        <div className='mt-12 grid gap-6 md:grid-cols-4'>
          <div className='rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-6'>
            <div className='mb-2 flex items-center gap-2'>
              <Package className='h-5 w-5 text-primary' />
              <div className='text-sm text-muted-foreground'>Total Orders</div>
            </div>
            <div className='text-3xl text-primary'>
              {activeOrders.length + completedOrders.length}
            </div>
          </div>
          <div className='rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 p-6'>
            <div className='mb-2 flex items-center gap-2'>
              <DollarSign className='h-5 w-5 text-accent' />
              <div className='text-sm text-muted-foreground'>This Month</div>
            </div>
            <div className='text-3xl text-accent'>€599</div>
          </div>
          <div className='rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-6'>
            <div className='mb-2 flex items-center gap-2'>
              <Store className='h-5 w-5 text-primary' />
              <div className='text-sm text-muted-foreground'>
                Active Suppliers
              </div>
            </div>
            <div className='text-3xl text-primary'>6</div>
          </div>
          <div className='rounded-2xl bg-gradient-to-br from-accent/5 to-primary/5 p-6'>
            <div className='mb-2 flex items-center gap-2'>
              <Heart className='h-5 w-5 text-accent' />
              <div className='text-sm text-muted-foreground'>
                Favorite Orders
              </div>
            </div>
            <div className='text-3xl text-accent'>2</div>
          </div>
        </div>
      </div>
    </div>
  );
}
