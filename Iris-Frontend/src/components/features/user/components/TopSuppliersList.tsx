import { Button } from '@components/ui/button';

interface TopSupplierSummary {
  name: string;
  orders: number;
  spend: string;
}

interface TopSuppliersListProps {
  suppliers: TopSupplierSummary[];
  onViewSupplier?: (supplierId: string) => void;
}

export function TopSuppliersList({
  suppliers,
  onViewSupplier,
}: TopSuppliersListProps) {
  return (
    <div className='rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
      <h3 className='mb-4'>Top Suppliers This Month</h3>
      <div className='space-y-4'>
        {suppliers.map((supplier, index) => (
          <div
            key={index}
            className='duration-250 flex items-center justify-between rounded-xl bg-muted/30 p-4 transition-all hover:bg-muted/50'
          >
            <div className='flex items-center gap-4'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary'>
                #{index + 1}
              </div>
              <div>
                <div className='mb-1'>{supplier.name}</div>
                <div className='text-sm text-muted-foreground'>
                  {supplier.orders} orders
                </div>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='text-right'>
                <div className='text-lg text-primary'>{supplier.spend}</div>
              </div>
              <Button
                size='sm'
                variant='outline'
                className='rounded-xl'
                onClick={() => onViewSupplier?.((index + 1).toString())}
              >
                View Profile
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
