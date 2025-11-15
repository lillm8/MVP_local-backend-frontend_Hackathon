'use client';

import { Users } from 'lucide-react';
import { Button } from '@components/ui/button';
import { cn } from '../utils';

interface EmptySuppliersStateProps {
  onAddSupplier?: () => void;
  onBrowseSuppliers?: () => void;
  className?: string;
}

export function EmptySuppliersState({
  onAddSupplier,
  onBrowseSuppliers,
  className,
}: EmptySuppliersStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center',
        className
      )}
    >
      <Users className='mb-4 h-12 w-12 text-muted-foreground' />
      <h3 className='mb-2 text-xl font-semibold text-foreground'>
        No suppliers found
      </h3>
      <p className='mb-6 max-w-md text-muted-foreground'>
        There are no suppliers available at the moment. Check back later or try
        different filters.
      </p>
      <div className='flex gap-3'>
        {onBrowseSuppliers && (
          <Button onClick={onBrowseSuppliers}>Browse Suppliers</Button>
        )}
        {onAddSupplier && (
          <Button variant='outline' onClick={onAddSupplier}>
            Add Supplier
          </Button>
        )}
      </div>
    </div>
  );
}
