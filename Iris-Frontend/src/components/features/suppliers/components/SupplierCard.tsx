import { Card } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Avatar, AvatarFallback } from '@components/ui/avatar';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import { Star, MapPin, Award, TrendingUp } from 'lucide-react';

type SupplierCardProps = {
  id: string;
  name: string;
  category: string;
  image: string;
  avatar: string;
  verified: boolean;
  rating: number;
  totalReviews: number;
  distance: number;
  certifications: string[];
  totalProducts: number;
  responseTime: string;
  description: string;
  onClick: (id: string) => void;
};

export function SupplierCard(props: SupplierCardProps) {
  const {
    id,
    name,
    category,
    image,
    avatar,
    verified,
    rating,
    totalReviews,
    distance,
    certifications,
    totalProducts,
    responseTime,
    description,
    onClick,
  } = props;
  return (
    <Card
      className='duration-250 group cursor-pointer overflow-hidden rounded-2xl border-0 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]'
      onClick={() => onClick(id)}
    >
      <div className='relative aspect-video overflow-hidden'>
        <ImageWithFallback
          src={image}
          alt={name}
          width={400}
          height={200}
          className='duration-250 h-full w-full object-cover transition-transform group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
        <div className='items.end absolute bottom-3 left-3 right-3 flex justify-between'>
          <Avatar className='h-12 w-12 border-2 border-white'>
            <AvatarFallback className='bg-primary text-primary-foreground'>
              {avatar}
            </AvatarFallback>
          </Avatar>
          {verified && (
            <Badge className='bg-primary'>
              <Award className='mr-1 h-3 w-3' />
              Verified
            </Badge>
          )}
        </div>
      </div>

      <div className='p-4'>
        <div className='mb-2 flex items-start justify-between'>
          <div>
            <h3 className='mb-1 line-clamp-1'>{name}</h3>
            <p className='text-sm text-muted-foreground'>{category}</p>
          </div>
        </div>

        <p className='mb-3 line-clamp-2 text-sm text-muted-foreground'>
          {description}
        </p>

        <div className='mb-3 flex items-center gap-3 text-sm'>
          <div className='flex items-center gap-1'>
            <Star className='h-4 w-4 fill-primary text-primary' />
            <span>{rating}</span>
            <span className='text-muted-foreground'>({totalReviews})</span>
          </div>
          <div className='h-4 w-px bg-border' />
          <div className='flex items-center gap-1 text-muted-foreground'>
            <MapPin className='h-4 w-4' />
            <span>{distance} km</span>
          </div>
        </div>

        <div className='mb-3 flex items-center gap-1'>
          {certifications.slice(0, 2).map((cert, idx) => (
            <Badge key={idx} variant='outline' className='text-xs'>
              {cert}
            </Badge>
          ))}
          {certifications.length > 2 && (
            <Badge variant='outline' className='text-xs'>
              +{certifications.length - 2}
            </Badge>
          )}
        </div>

        <div className='flex items-center justify-between border-t border-border pt-3 text-sm text-muted-foreground'>
          <div>{totalProducts} products</div>
          <div className='flex items-center gap-1'>
            <TrendingUp className='h-3 w-3' />
            {responseTime}
          </div>
        </div>
      </div>
    </Card>
  );
}
