// Order filters component for orders page

import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Search, Filter } from 'lucide-react';
import { OrderFilters as OrderFiltersType } from '@/types/orders/types';

interface OrderFiltersProps {
  filters: OrderFiltersType;
  onFiltersChange: (filters: OrderFiltersType) => void;
  suppliers: string[];
}

export function OrderFilters({
  filters,
  onFiltersChange,
  suppliers,
}: OrderFiltersProps) {
  const handleFilterChange = (key: keyof OrderFiltersType, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className='space-y-4 rounded-lg border bg-white p-4'>
      <div className='flex items-center space-x-2'>
        <Filter className='h-5 w-5 text-primary' />
        <h3 className='text-lg font-semibold'>Filters</h3>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <div>
          <Label htmlFor='search'>Search Orders</Label>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground' />
            <Input
              id='search'
              placeholder='Search by order number or supplier...'
              value={filters.searchTerm}
              onChange={e => handleFilterChange('searchTerm', e.target.value)}
              className='pl-10'
            />
          </div>
        </div>

        <div>
          <Label htmlFor='status'>Status</Label>
          <Select
            value={filters.status}
            onValueChange={value => handleFilterChange('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='All Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Status</SelectItem>
              <SelectItem value='processing'>Processing</SelectItem>
              <SelectItem value='confirmed'>Confirmed</SelectItem>
              <SelectItem value='in transit'>In Transit</SelectItem>
              <SelectItem value='delivered'>Delivered</SelectItem>
              <SelectItem value='draft'>Draft</SelectItem>
              <SelectItem value='reorder'>Reorder</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor='supplier'>Supplier</Label>
          <Select
            value={filters.supplier}
            onValueChange={value => handleFilterChange('supplier', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='All Suppliers' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Suppliers</SelectItem>
              {suppliers.map(supplier => (
                <SelectItem key={supplier} value={supplier}>
                  {supplier}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor='dateRange'>Date Range</Label>
          <Select
            value={filters.dateRange}
            onValueChange={value => handleFilterChange('dateRange', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='All Time' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Time</SelectItem>
              <SelectItem value='today'>Today</SelectItem>
              <SelectItem value='week'>This Week</SelectItem>
              <SelectItem value='month'>This Month</SelectItem>
              <SelectItem value='quarter'>This Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {(filters.searchTerm ||
        filters.status !== 'all' ||
        filters.supplier !== 'all' ||
        filters.dateRange !== 'all') && (
        <div className='flex items-center justify-between border-t pt-2'>
          <span className='text-sm text-muted-foreground'>Filters applied</span>
          <button
            onClick={() =>
              onFiltersChange({
                status: 'all',
                supplier: 'all',
                dateRange: 'all',
                searchTerm: '',
              })
            }
            className='text-sm text-primary hover:underline'
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
