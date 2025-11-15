import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import {
  BadgeCheck,
  Heart,
  MapPin,
  Star,
  Package,
  Store,
  Trash2,
} from 'lucide-react';

interface FavoriteSupplierCardProps {
  id: number;
  name: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  category: string;
  totalOrders: number;
  lastOrder: string;
  specialties: string[];
  description: string;
  onVisit: (id: number) => void;
  onRemove: (id: number) => void;
}

export function FavoriteSupplierCard(props: FavoriteSupplierCardProps) {
  const {
    id,
    name,
    image,
    location,
    rating,
    reviews,
    verified,
    category,
    totalOrders,
    lastOrder,
    specialties,
    description,
    onVisit,
    onRemove,
  } = props;
  return (
    <div className='duration-250 group overflow-hidden rounded-3xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]'>
      <div className='relative aspect-[4/3] overflow-hidden'>
        <ImageWithFallback
          src={image}
          alt={name}
          width={300}
          height={200}
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
        {verified && (
          <div className='absolute right-4 top-4 rounded-full bg-white/95 p-2 shadow-lg backdrop-blur-sm'>
            <BadgeCheck className='h-5 w-5 text-primary' />
          </div>
        )}
        <button
          onClick={() => onRemove(id)}
          className='duration-250 absolute left-4 top-4 rounded-full bg-white/95 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-accent/10'
          aria-label='Remove from favorites'
        >
          <Heart className='h-5 w-5 fill-accent text-accent' />
        </button>
      </div>
      <div className='p-6'>
        <div className='mb-4'>
          <h3 className='mb-1 text-xl'>{name}</h3>
          <p className='mb-2 text-sm text-muted-foreground'>{category}</p>
          <div className='flex items-center gap-4 text-sm'>
            <div className='flex items-center gap-1'>
              <Star className='h-4 w-4 fill-accent text-accent' />
              <span>{rating}</span>
              <span className='text-muted-foreground'>({reviews})</span>
            </div>
            <div className='flex items-center gap-1 text-muted-foreground'>
              <MapPin className='h-4 w-4' />
              <span>{location}</span>
            </div>
          </div>
        </div>
        <p className='mb-4 line-clamp-2 text-sm leading-relaxed text-foreground'>
          {description}
        </p>
        <div className='mb-4'>
          <div className='mb-2 text-xs text-muted-foreground'>Specialties</div>
          <div className='flex flex-wrap gap-1.5'>
            {specialties.slice(0, 3).map((s, i) => (
              <Badge key={i} variant='secondary' className='text-xs'>
                {s}
              </Badge>
            ))}
          </div>
        </div>
        <div className='mb-4 rounded-xl bg-primary/5 p-3'>
          <div className='flex items-center justify-between text-sm'>
            <div className='flex items-center gap-1.5 text-muted-foreground'>
              <Package className='h-4 w-4' />
              <span>{totalOrders} orders</span>
            </div>
            <span className='text-xs text-muted-foreground'>
              Last: {lastOrder}
            </span>
          </div>
        </div>
        <div className='space-y-2'>
          <Button
            onClick={() => onVisit(id)}
            className='duration-250 w-full rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_4px_12px_rgba(45,77,49,0.3)]'
          >
            <Store className='mr-2 h-4 w-4' />
            Visit Store
          </Button>
          <Button
            variant='outline'
            onClick={() => onRemove(id)}
            className='duration-250 w-full rounded-xl transition-all hover:border-destructive/20 hover:bg-destructive/5 hover:text-destructive'
          >
            <Trash2 className='mr-2 h-4 w-4' />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
