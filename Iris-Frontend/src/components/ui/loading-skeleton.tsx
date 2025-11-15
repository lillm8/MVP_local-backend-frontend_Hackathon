'use client';

import { cn } from './utils';

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

interface LoadingSkeletonProps {
  variant?: 'card' | 'list' | 'grid' | 'text' | 'image';
  count?: number;
  className?: string;
}

// Strategy pattern for skeleton rendering
interface SkeletonStrategy {
  render(count: number, className?: string): React.ReactNode;
}

class CardSkeletonStrategy implements SkeletonStrategy {
  render(count: number, className?: string): React.ReactNode {
    return (
      <div className={cn('rounded-2xl bg-white p-6 shadow-sm', className)}>
        <Skeleton className='mb-4 aspect-square w-full rounded-xl' />
        <Skeleton className='mb-2 h-4 w-3/4' />
        <Skeleton className='mb-3 h-3 w-1/2' />
        <div className='flex items-center justify-between'>
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-6 w-20 rounded-full' />
        </div>
      </div>
    );
  }
}

class ListSkeletonStrategy implements SkeletonStrategy {
  render(count: number, className?: string): React.ReactNode {
    return (
      <div className={cn('space-y-3', className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className='flex items-center space-x-4 p-4'>
            <Skeleton className='h-12 w-12 rounded-full' />
            <div className='flex-1 space-y-2'>
              <Skeleton className='h-4 w-3/4' />
              <Skeleton className='h-3 w-1/2' />
            </div>
            <Skeleton className='h-8 w-20' />
          </div>
        ))}
      </div>
    );
  }
}

class GridSkeletonStrategy implements SkeletonStrategy {
  render(count: number, className?: string): React.ReactNode {
    return (
      <div
        className={cn(
          'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3',
          className
        )}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className='rounded-2xl bg-white p-6 shadow-sm'>
            <Skeleton className='mb-4 aspect-square w-full rounded-xl' />
            <Skeleton className='mb-2 h-4 w-3/4' />
            <Skeleton className='mb-3 h-3 w-1/2' />
            <div className='flex items-center justify-between'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-6 w-20 rounded-full' />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

class TextSkeletonStrategy implements SkeletonStrategy {
  render(count: number, className?: string): React.ReactNode {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton key={i} className='h-4 w-full' />
        ))}
      </div>
    );
  }
}

class ImageSkeletonStrategy implements SkeletonStrategy {
  render(count: number, className?: string): React.ReactNode {
    return (
      <Skeleton className={cn('aspect-square w-full rounded-xl', className)} />
    );
  }
}

class DefaultSkeletonStrategy implements SkeletonStrategy {
  render(count: number, className?: string): React.ReactNode {
    return <Skeleton className={className} />;
  }
}

// Strategy factory for extensibility
class SkeletonStrategyFactory {
  private static strategies: Map<string, SkeletonStrategy> = new Map();
  private static defaultStrategy = new DefaultSkeletonStrategy();

  static {
    // Initialize strategies only once
    this.strategies.set('card', new CardSkeletonStrategy());
    this.strategies.set('list', new ListSkeletonStrategy());
    this.strategies.set('grid', new GridSkeletonStrategy());
    this.strategies.set('text', new TextSkeletonStrategy());
    this.strategies.set('image', new ImageSkeletonStrategy());
  }

  static getStrategy(variant: string): SkeletonStrategy {
    return this.strategies.get(variant) || this.defaultStrategy;
  }
}

export function LoadingSkeleton({
  variant = 'card',
  count = 1,
  className,
}: LoadingSkeletonProps) {
  const strategy = SkeletonStrategyFactory.getStrategy(variant);
  const renderSkeleton = () => strategy.render(count, className);

  return (
    <div className='space-y-4'>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  );
}

// Specific skeleton components for common use cases
export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('w-80 flex-shrink-0', className)}>
      <LoadingSkeleton variant='card' />
    </div>
  );
}

export function SupplierCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('w-80 flex-shrink-0', className)}>
      <LoadingSkeleton variant='card' />
    </div>
  );
}

export function OrderItemSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-xl bg-white p-4 shadow-sm', className)}>
      <div className='flex items-center space-x-4'>
        <Skeleton className='h-16 w-16 rounded-lg' />
        <div className='flex-1 space-y-2'>
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-3 w-1/2' />
          <Skeleton className='h-3 w-1/4' />
        </div>
        <div className='space-y-2 text-right'>
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-6 w-20 rounded-full' />
        </div>
      </div>
    </div>
  );
}
