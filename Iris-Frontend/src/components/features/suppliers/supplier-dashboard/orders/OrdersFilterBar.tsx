import { Search } from 'lucide-react';
import { Input } from '@components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

interface OrdersFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export function OrdersFilterBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: OrdersFilterBarProps) {
  return (
    <div className='mb-6 flex gap-4'>
      <div className='flex-1'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            placeholder='Search orders...'
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className='pl-10'
          />
        </div>
      </div>
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Filter by status' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Statuses</SelectItem>
          <SelectItem value='processing'>Processing</SelectItem>
          <SelectItem value='shipped'>Shipped</SelectItem>
          <SelectItem value='delivered'>Delivered</SelectItem>
          <SelectItem value='cancelled'>Cancelled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
