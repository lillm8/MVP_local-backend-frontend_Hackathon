import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Label } from '@components/ui/label';
import { Search, Plus } from 'lucide-react';

interface ProductsHeaderProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  categoryFilter: string;
  setCategoryFilter: (v: string) => void;
  onOpenAdd: () => void;
}

export function ProductsHeader({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  onOpenAdd,
}: ProductsHeaderProps) {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>Product Inventory</h2>
          <p className='text-muted-foreground'>
            Manage your product catalog and inventory
          </p>
        </div>
        <Button onClick={onOpenAdd}>
          <Plus className='mr-2 h-4 w-4' />
          Add Product
        </Button>
      </div>

      <div className='flex items-center space-x-4'>
        <div className='relative max-w-sm flex-1'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground' />
          <Input
            placeholder='Search products...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className='w-48'>
            <SelectValue placeholder='Filter by category' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Categories</SelectItem>
            <SelectItem value='Vegetables'>Vegetables</SelectItem>
            <SelectItem value='Fruits'>Fruits</SelectItem>
            <SelectItem value='Dairy'>Dairy</SelectItem>
            <SelectItem value='Meat'>Meat</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
