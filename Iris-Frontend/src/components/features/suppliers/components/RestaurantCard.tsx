import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import {
  MapPin,
  Star,
  Sparkles,
  Eye,
  MessageCircle,
  Heart,
} from 'lucide-react';
import type { RestaurantItem } from '@hooks/suppliers/use-discover-restaurants';

interface RestaurantCardProps extends RestaurantItem {
  onAddFavorite: (name: string) => void;
  onView: (id: string) => void;
  onContact: (name: string) => void;
}

export function RestaurantCard(props: RestaurantCardProps) {
  const {
    id,
    name,
    type,
    location,
    distance,
    rating,
    reviews,
    seatingCapacity,
    avatar,
    isCustomer,
    totalSpent,
    avgOrderValue,
    orderFrequency,
    lookingForSuppliers,
    status,
    onAddFavorite,
    onView,
    onContact,
  } = props;
  const statusBadge = () => {
    if (isCustomer) return <Badge variant='default'>Customer</Badge>;
    if (lookingForSuppliers)
      return (
        <Badge className='bg-accent text-accent-foreground'>
          Seeking Suppliers
        </Badge>
      );
    if (status === 'new') return <Badge variant='secondary'>New</Badge>;
    return <Badge variant='outline'>Potential</Badge>;
  };
  return (
    <div className='duration-250 rounded-2xl border-2 border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-5 transition-all hover:border-primary/30'>
      <div className='mb-4 flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl text-primary-foreground'>
            {avatar}
          </div>
          <div>
            <h4 className='mb-1'>{name}</h4>
            <p className='text-sm text-muted-foreground'>{type}</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          {statusBadge()}
          <Button
            variant='ghost'
            size='sm'
            className='h-8 w-8 p-0'
            onClick={() => onAddFavorite(name)}
          >
            <Heart className='h-4 w-4' />
          </Button>
        </div>
      </div>

      <div className='mb-4 grid grid-cols-3 gap-3 text-sm'>
        <div>
          <p className='mb-1 text-xs text-muted-foreground'>Rating</p>
          <div className='flex items-center gap-1'>
            <Star className='h-3 w-3 fill-primary text-primary' />
            <p className='font-medium'>{rating}</p>
          </div>
        </div>
        <div>
          <p className='mb-1 text-xs text-muted-foreground'>Reviews</p>
          <p className='font-medium'>{reviews}</p>
        </div>
        <div>
          <p className='mb-1 text-xs text-muted-foreground'>Capacity</p>
          <p className='font-medium'>{seatingCapacity}</p>
        </div>
      </div>

      <div className='mb-4 flex items-center justify-between text-sm'>
        <div className='flex items-center gap-2 text-muted-foreground'>
          <MapPin className='h-4 w-4' />
          {location}
        </div>
        <span className='text-muted-foreground'>{distance}</span>
      </div>

      {isCustomer && (
        <div className='mb-4 rounded-xl bg-primary/10 p-3'>
          <div className='grid grid-cols-3 gap-3 text-sm'>
            <div>
              <p className='mb-1 text-xs text-muted-foreground'>Total Spent</p>
              <p className='font-medium text-primary'>{totalSpent}</p>
            </div>
            <div>
              <p className='mb-1 text-xs text-muted-foreground'>Avg Order</p>
              <p className='font-medium'>{avgOrderValue}</p>
            </div>
            <div>
              <p className='mb-1 text-xs text-muted-foreground'>Frequency</p>
              <p className='font-medium'>{orderFrequency}</p>
            </div>
          </div>
        </div>
      )}

      {lookingForSuppliers && (
        <div className='mb-4 flex items-center gap-2 rounded-xl bg-accent/10 px-3 py-2 text-sm'>
          <Sparkles className='h-4 w-4 text-accent' />
          <p className='text-accent-foreground'>
            Actively seeking new suppliers
          </p>
        </div>
      )}

      <div className='flex gap-2'>
        <Button
          size='sm'
          variant='outline'
          onClick={() => onContact(name)}
          className='flex-1 rounded-xl'
        >
          <MessageCircle className='mr-2 h-4 w-4' />
          Message
        </Button>
        <Button
          size='sm'
          onClick={() => onView(id)}
          className='flex-1 rounded-xl bg-primary hover:bg-primary/90'
        >
          <Eye className='mr-2 h-4 w-4' />
          View Profile
        </Button>
      </div>
    </div>
  );
}
