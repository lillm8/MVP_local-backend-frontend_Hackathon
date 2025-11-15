import { Card } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import { Edit, MoreVertical, Trash2 } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  status: string;
  category: string;
  price: string;
  unit: string;
  stock: number;
  sales: number;
  revenue: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const statusColor = (status: string) => {
  switch (status) {
    case 'In Stock':
      return 'bg-green-100 text-green-800';
    case 'Low Stock':
      return 'bg-yellow-100 text-yellow-800';
    case 'Out of Stock':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function ProductCard(props: ProductCardProps) {
  const {
    id,
    name,
    image,
    status,
    category,
    price,
    unit,
    stock,
    sales,
    revenue,
    onEdit,
    onDelete,
  } = props;
  return (
    <Card className='overflow-hidden'>
      <div className='relative aspect-square'>
        <ImageWithFallback
          src={image}
          alt={name}
          className='h-full w-full object-cover'
          fallbackSrc='https://via.placeholder.com/300x300?text=No+Image'
        />
        <div className='absolute right-2 top-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                <MoreVertical className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => onEdit(id)}>
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(id)}>
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='p-4'>
        <div className='mb-2 flex items-start justify-between'>
          <h3 className='text-lg font-semibold'>{name}</h3>
          <Badge className={statusColor(status)}>{status}</Badge>
        </div>
        <p className='mb-3 text-sm text-muted-foreground'>{category}</p>
        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span className='text-muted-foreground'>Price:</span>
            <span className='font-medium'>
              €{price}/{unit}
            </span>
          </div>
          <div className='flex justify-between text-sm'>
            <span className='text-muted-foreground'>Stock:</span>
            <span className='font-medium'>{stock} units</span>
          </div>
          <div className='flex justify-between text-sm'>
            <span className='text-muted-foreground'>Sales:</span>
            <span className='font-medium'>{sales} units</span>
          </div>
          <div className='flex justify-between text-sm'>
            <span className='text-muted-foreground'>Revenue:</span>
            <span className='font-medium text-green-600'>{revenue}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
