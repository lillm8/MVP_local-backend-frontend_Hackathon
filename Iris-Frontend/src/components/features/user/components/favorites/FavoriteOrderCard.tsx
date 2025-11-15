import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Heart, Package, Store } from 'lucide-react';

interface FavoriteOrderCardProps {
  id: string;
  supplier: string;
  supplierId: number;
  total: number;
  itemCount: number;
  frequency: string;
  lastOrdered: string;
  items: Array<{ name: string; quantity: string; price: number }>;
  onRemove: (id: string) => void;
  onViewSupplier: (supplierId: number) => void;
}

export function FavoriteOrderCard({
  id,
  supplier,
  supplierId,
  total,
  itemCount,
  frequency,
  lastOrdered,
  items,
  onRemove,
  onViewSupplier,
}: FavoriteOrderCardProps) {
  return (
    <div className='duration-250 overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]'>
      <div className='p-6'>
        <div className='mb-4 flex items-start justify-between'>
          <div className='flex-1'>
            <div className='mb-2 flex items-center gap-3'>
              <h3 className='text-lg'>Order #{id}</h3>
              <Badge className='bg-accent/10 text-accent'>
                <Heart className='mr-1 h-3 w-3 fill-accent' />
                Favorite
              </Badge>
              <Badge variant='outline'>{frequency}</Badge>
            </div>
            <p className='text-muted-foreground'>{supplier}</p>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <span>{itemCount} items</span>
              <span>Last ordered: {lastOrdered}</span>
            </div>
          </div>
          <button
            onClick={() => onRemove(id)}
            className='duration-250 rounded-full p-2 transition-all hover:bg-destructive/5'
            aria-label='Remove from favorites'
          >
            <Heart className='h-5 w-5 fill-accent text-accent' />
          </button>
        </div>

        <div className='mb-4 space-y-2 rounded-xl bg-muted/20 p-4'>
          <div className='mb-2 text-sm text-muted-foreground'>
            Order includes:
          </div>
          {items.map((item, index) => (
            <div
              key={index}
              className='flex items-center justify-between text-sm'
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span className='text-primary'>€{item.price.toFixed(2)}</span>
            </div>
          ))}
          <div className='mt-3 flex items-center justify-between border-t border-border pt-3'>
            <span className='text-muted-foreground'>Total</span>
            <span className='text-lg text-primary'>€{total.toFixed(2)}</span>
          </div>
        </div>

        <div className='flex gap-2'>
          <Button className='flex-1 rounded-xl bg-primary text-primary-foreground'>
            <Package className='mr-2 h-4 w-4' />
            Reorder Now
          </Button>
          <Button
            variant='outline'
            onClick={() => onViewSupplier(supplierId)}
            className='rounded-xl'
          >
            <Store className='mr-2 h-4 w-4' />
            View Supplier
          </Button>
        </div>
      </div>
    </div>
  );
}
