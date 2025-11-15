import { Clock, CheckCircle, Truck, Package } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useSupplierOrdersTab } from '@/hooks/suppliers/use-supplier-orders-tab';
import { OrderCard } from './orders/OrderCard';
import { OrdersStatsGrid } from './orders/OrdersStatsGrid';
import type { Order } from '@/types/suppliers/supplier-dashboard/types';

interface SupplierOrdersTabProps {
  orders: Order[];
  expandedOrderId: string | null;
  onToggleExpanded: (orderId: string) => void;
}

export function SupplierOrdersTab({
  orders,
  expandedOrderId,
  onToggleExpanded,
}: SupplierOrdersTabProps) {
  const {
    filteredOrders,
    activeOrders,
    completedOrders,
    reorderOrders,
    draftOrders,
  } = useSupplierOrdersTab({ orders, expandedOrderId, onToggleExpanded });

  return (
    <div className='space-y-6'>
      <div className='mb-8'>
        <h1 className='mb-2 text-4xl text-primary'>Orders</h1>
        <p className='text-muted-foreground'>
          Manage and track all your orders in one place
        </p>
      </div>

      <Tabs defaultValue='active' className='flex w-full flex-col gap-2'>
        <TabsList className='mb-8 grid h-9 w-full max-w-2xl grid-cols-4 rounded-xl bg-white p-1 text-muted-foreground shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
          <TabsTrigger value='active' className='rounded-lg'>
            <Clock className='mr-2 h-4 w-4' />
            Active ({activeOrders.length})
          </TabsTrigger>
          <TabsTrigger value='completed' className='rounded-lg'>
            <CheckCircle className='mr-2 h-4 w-4' />
            Completed ({completedOrders.length})
          </TabsTrigger>
          <TabsTrigger value='reorder' className='rounded-lg'>
            <Truck className='mr-2 h-4 w-4' />
            Reorder ({reorderOrders.length})
          </TabsTrigger>
          <TabsTrigger value='drafts' className='rounded-lg'>
            <Package className='mr-2 h-4 w-4' />
            Drafts ({draftOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value='active' className='space-y-4'>
          {activeOrders.map((o, idx) => (
            <OrderCard
              key={o.id}
              order={o}
              progressPct={[75, 25, 10][idx % 3]}
              estimate={
                [
                  'Thursday, Oct 24 - 8 AM',
                  'Friday, Oct 25 - 10 AM',
                  'Saturday, Oct 26 - 7 AM',
                ][idx % 3]
              }
            />
          ))}
        </TabsContent>
        <TabsContent value='completed' className='space-y-4'>
          {completedOrders.map(o => (
            <OrderCard
              key={o.id}
              order={o}
              progressPct={100}
              estimate='Delivered'
            />
          ))}
        </TabsContent>
        <TabsContent value='reorder' className='space-y-4'>
          {reorderOrders.map(o => (
            <OrderCard key={o.id} order={o} progressPct={0} estimate='' />
          ))}
        </TabsContent>
        <TabsContent value='drafts' className='space-y-4'>
          {draftOrders.map(o => (
            <OrderCard key={o.id} order={o} progressPct={0} estimate='' />
          ))}
        </TabsContent>
      </Tabs>

      <OrdersStatsGrid totalOrders={filteredOrders.length} />
    </div>
  );
}
