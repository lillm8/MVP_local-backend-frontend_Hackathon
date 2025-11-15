import { Package, DollarSign, Store, Heart } from 'lucide-react';

interface OrdersStatsGridProps {
  totalOrders: number;
}

export function OrdersStatsGrid({ totalOrders }: OrdersStatsGridProps) {
  return (
    <div className='mt-12 grid gap-6 md:grid-cols-4'>
      <div className='rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-6'>
        <div className='mb-2 flex items-center gap-2'>
          <Package className='h-5 w-5 text-primary' />
          <div className='text-sm text-muted-foreground'>Total Orders</div>
        </div>
        <div className='text-3xl text-primary'>{totalOrders}</div>
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
          <div className='text-sm text-muted-foreground'>Active Suppliers</div>
        </div>
        <div className='text-3xl text-primary'>6</div>
      </div>
      <div className='rounded-2xl bg-gradient-to-br from-accent/5 to-primary/5 p-6'>
        <div className='mb-2 flex items-center gap-2'>
          <Heart className='h-5 w-5 text-accent' />
          <div className='text-sm text-muted-foreground'>Favorite Orders</div>
        </div>
        <div className='text-3xl text-accent'>2</div>
      </div>
    </div>
  );
}
