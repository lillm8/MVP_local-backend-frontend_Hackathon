'use client';

import { Package } from 'lucide-react';
import { Button } from '@components/ui/button';
import { cn } from '../utils';

interface EmptyProductsStateProps {
  onAddProduct?: () => void;
  onBrowseProducts?: () => void;
  className?: string;
}

export function EmptyProductsState({
  onAddProduct,
  onBrowseProducts,
  className,
}: EmptyProductsStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center',
        className
      )}
    >
      <Package className='mb-4 h-12 w-12 text-muted-foreground' />
      <h3 className='mb-2 text-xl font-semibold text-foreground'>
        No products found
      </h3>
      <p className='mb-6 max-w-md text-muted-foreground'>
        There are no products available at the moment. Check back later or try
        different filters.
      </p>
      <div className='flex gap-3'>
        {onBrowseProducts && (
          <Button onClick={onBrowseProducts}>Browse Products</Button>
        )}
        {onAddProduct && (
          <Button variant='outline' onClick={onAddProduct}>
            Add Product
          </Button>
        )}
      </div>
    </div>
  );
}
