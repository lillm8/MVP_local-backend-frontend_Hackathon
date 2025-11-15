import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import { Filter } from 'lucide-react';

interface ProductItem {
  id: number;
  name: string;
  producer: string;
  image: string;
  price: string;
}

interface FeaturedProductsProps {
  products: ProductItem[];
  onNavigate: () => void;
  onClearAll: () => void;
}

export function FeaturedProducts({
  products,
  onNavigate,
  onClearAll,
}: FeaturedProductsProps) {
  return (
    <section className='mb-16'>
      <div className='mb-6'>
        <h2>Featured Products</h2>
        <p className='mt-1 text-muted-foreground'>
          {products.length} product{products.length !== 1 ? 's' : ''} available
        </p>
      </div>
      {products.length === 0 ? (
        <div className='flex min-h-[300px] flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 p-12 text-center'>
          <Filter className='mb-4 h-12 w-12 text-muted-foreground/30' />
          <h3 className='mb-2 text-xl text-primary'>No products found</h3>
          <p className='mb-4 max-w-md text-muted-foreground'>
            Try adjusting your filters to see more results
          </p>
          <Button onClick={onClearAll} variant='outline' className='rounded-xl'>
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className='relative -mx-2 px-2'>
          <div className='scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4'>
            {products.map(product => (
              <div
                key={product.id}
                onClick={onNavigate}
                className='duration-250 group w-80 flex-shrink-0 cursor-pointer snap-start overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]'
              >
                <div className='relative aspect-square overflow-hidden'>
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    className='duration-250 h-full w-full object-cover transition-transform group-hover:scale-105'
                  />
                </div>
                <div className='p-5'>
                  <h3 className='mb-1 text-lg'>{product.name}</h3>
                  <p className='mb-3 text-sm text-muted-foreground'>
                    {product.producer}
                  </p>
                  <div className='flex items-center justify-between'>
                    <span className='text-primary'>{product.price}</span>
                    <Badge variant='secondary'>In Stock</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent' />
        </div>
      )}
    </section>
  );
}
