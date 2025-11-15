import { Star, MapPin, BadgeCheck } from 'lucide-react';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import { ProducerCardProps } from '@/components/types';

export function ProducerCard(props: ProducerCardProps) {
  const {
    name,
    image,
    distance,
    rating,
    verified = false,
    category,
    onClick,
  } = props;
  return (
    <div
      onClick={onClick}
      className='duration-250 group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]'
    >
      <div className='relative aspect-[4/3] overflow-hidden'>
        <ImageWithFallback
          src={image}
          alt={name}
          fill
          className='duration-250 object-cover transition-transform group-hover:scale-105'
        />
        <div className='duration-250 absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100' />
      </div>
      <div className='p-6'>
        <div className='mb-2 flex items-start justify-between'>
          <h3 className='flex-1'>{name}</h3>
          {verified && (
            <BadgeCheck className='ml-2 h-5 w-5 flex-shrink-0 text-primary' />
          )}
        </div>
        {category && (
          <p className='mb-3 text-sm text-muted-foreground'>{category}</p>
        )}
        <div className='flex items-center justify-between text-sm'>
          <div className='flex items-center gap-1 text-muted-foreground'>
            <MapPin className='h-4 w-4' />
            <span>{distance}</span>
          </div>
          <div className='flex items-center gap-1'>
            <Star className='h-4 w-4 fill-accent text-accent' />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
