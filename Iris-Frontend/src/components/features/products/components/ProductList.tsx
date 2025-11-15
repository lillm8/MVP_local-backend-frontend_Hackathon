'use client';

import { ProductListProps } from '@/components/types';
import { ProductCard } from './ProductCard';
import { Skeleton } from '@components/ui/skeleton';

export function ProductList(props: ProductListProps) {
  const {
    products,
    loading = false,
    onProductClick,
    onAddToCart,
    onToggleFavorite,
    favorites = [],
  } = props;
  if (loading) {
    return (
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-12 text-center'>
        <div className='rounded-full bg-muted p-4'>
          <svg
            className='h-8 w-8 text-muted-foreground'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
            />
          </svg>
        </div>
        <h3 className='mt-4 text-lg font-semibold'>No products found</h3>
        <p className='mt-2 text-sm text-muted-foreground'>
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onViewDetails={onProductClick}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.includes(product.id)}
        />
      ))}
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className='rounded-xl border bg-card'>
      {/* Image skeleton */}
      <div className='aspect-square rounded-t-xl bg-muted' />

      {/* Content skeleton */}
      <div className='space-y-3 p-4'>
        <Skeleton className='h-5 w-3/4' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-2/3' />

        <div className='flex items-center justify-between'>
          <Skeleton className='h-6 w-16' />
          <Skeleton className='h-4 w-20' />
        </div>

        <div className='flex gap-1'>
          <Skeleton className='h-5 w-12' />
          <Skeleton className='h-5 w-16' />
          <Skeleton className='h-5 w-14' />
        </div>
      </div>

      {/* Footer skeleton */}
      <div className='p-4 pt-0'>
        <div className='flex gap-2'>
          <Skeleton className='h-8 flex-1' />
          <Skeleton className='h-8 flex-1' />
        </div>
      </div>
    </div>
  );
}
