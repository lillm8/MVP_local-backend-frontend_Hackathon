import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import { Heart, Star } from 'lucide-react';

interface FavoriteProductCardProps {
  id: number;
  name: string;
  supplier: string;
  supplierId: number;
  image: string;
  price: number;
  unit: string;
  inStock: boolean;
  rating: number;
  organic: boolean;
  lastOrdered: string;
  onAdd: () => void;
  onViewSupplier: (supplierId: number) => void;
  onRemove: (id: number) => void;
}

export function FavoriteProductCard(props: FavoriteProductCardProps) {
  const {
    id,
    name,
    supplier,
    supplierId,
    image,
    price,
    unit,
    inStock,
    rating,
    organic,
    lastOrdered,
    onAdd,
    onViewSupplier,
    onRemove,
  } = props;
  return (
    <div className='duration-250 group overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]'>
      <div className='relative aspect-square overflow-hidden'>
        <ImageWithFallback
          src={image}
          alt={name}
          width={200}
          height={200}
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
        <button
          onClick={() => onRemove(id)}
          className='duration-250 absolute right-3 top-3 rounded-full bg-white/95 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-accent/10'
          aria-label='Remove from favorites'
        >
          <Heart className='h-4 w-4 fill-accent text-accent' />
        </button>
        {organic && (
          <div className='absolute left-3 top-3'>
            <Badge className='bg-primary text-primary-foreground'>
              Organic
            </Badge>
          </div>
        )}
        {!inStock && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
            <Badge variant='destructive'>Out of Stock</Badge>
          </div>
        )}
      </div>
      <div className='p-4'>
        <h4 className='mb-1 line-clamp-1'>{name}</h4>
        <p className='mb-2 text-sm text-muted-foreground'>{supplier}</p>
        <div className='mb-3 flex items-center gap-2'>
          <div className='flex items-center gap-1 text-sm'>
            <Star className='h-3 w-3 fill-accent text-accent' />
            <span>{rating}</span>
          </div>
          <span className='text-xs text-muted-foreground'>
            Last ordered {lastOrdered}
          </span>
        </div>
        <div className='mb-3 flex items-baseline gap-1'>
          <span className='text-xl text-primary'>€{price.toFixed(2)}</span>
          <span className='text-sm text-muted-foreground'>/ {unit}</span>
        </div>
        <div className='space-y-2'>
          <Button
            onClick={onAdd}
            disabled={!inStock}
            className='w-full rounded-xl'
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => onViewSupplier(supplierId)}
            className='w-full rounded-xl'
          >
            View Supplier
          </Button>
        </div>
      </div>
    </div>
  );
}
