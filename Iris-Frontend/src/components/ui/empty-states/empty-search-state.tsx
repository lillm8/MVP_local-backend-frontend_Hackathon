'use client';

import { Search } from 'lucide-react';
import { Button } from '@components/ui/button';
import { cn } from '../utils';

interface EmptySearchStateProps {
  searchQuery?: string;
  onClearSearch?: () => void;
  className?: string;
}

export function EmptySearchState({
  searchQuery,
  onClearSearch,
  className,
}: EmptySearchStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center',
        className
      )}
    >
      <Search className='mb-4 h-12 w-12 text-muted-foreground' />
      <h3 className='mb-2 text-xl font-semibold text-foreground'>
        No results found
      </h3>
      <p className='mb-6 max-w-md text-muted-foreground'>
        {searchQuery
          ? `No results found for "${searchQuery}". Try adjusting your search terms.`
          : 'No results found. Try adjusting your search terms.'}
      </p>
      {onClearSearch && <Button onClick={onClearSearch}>Clear Search</Button>}
    </div>
  );
}
