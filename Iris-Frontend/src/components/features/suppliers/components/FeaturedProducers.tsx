import { Card } from '@components/ui/card';
import { Avatar, AvatarFallback } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import { Award, Star, MapPin } from 'lucide-react';

interface FeaturedProducerItem {
  id: string;
  name: string;
  image: string;
  avatar: string;
  verified: boolean;
  category: string;
  description: string;
  rating: number;
  totalReviews: number;
  distance: number;
}

interface FeaturedProducersProps {
  items: FeaturedProducerItem[];
  onClick: (id: string) => void;
}

export function FeaturedProducers({ items, onClick }: FeaturedProducersProps) {
  return (
    <section className='mb-12'>
      <div className='mb-6'>
        <h2 className='text-3xl text-primary'>Featured Producers</h2>
        <p className='mt-1 text-muted-foreground'>
          Top-rated local suppliers recommended for you
        </p>
      </div>
      <div className='relative -mx-2 px-2'>
        <div className='scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4'>
          {items.map(supplier => (
            <Card
              key={supplier.id}
              className='duration-250 group w-80 flex-shrink-0 cursor-pointer snap-start overflow-hidden rounded-2xl border-0 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]'
              onClick={() => onClick(supplier.id)}
            >
              <div className='relative aspect-video overflow-hidden'>
                <ImageWithFallback
                  src={supplier.image}
                  alt={supplier.name}
                  width={400}
                  height={200}
                  className='duration-250 h-full w-full object-cover transition-transform group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                <div className='absolute bottom-3 left-3 right-3 flex items-end justify-between'>
                  <Avatar className='h-12 w-12 border-2 border-white'>
                    <AvatarFallback className='bg-primary text-primary-foreground'>
                      {supplier.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {supplier.verified && (
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
                    <h3 className='mb-1 line-clamp-1'>{supplier.name}</h3>
                    <p className='text-sm text-muted-foreground'>
                      {supplier.category}
                    </p>
                  </div>
                </div>

                <p className='mb-3 line-clamp-2 text-sm text-muted-foreground'>
                  {supplier.description}
                </p>

                <div className='mb-3 flex items-center gap-3 text-sm'>
                  <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4 fill-primary text-primary' />
                    <span>{supplier.rating}</span>
                    <span className='text-muted-foreground'>
                      ({supplier.totalReviews})
                    </span>
                  </div>
                  <div className='h-4 w-px bg-border' />
                  <div className='flex items-center gap-1 text-muted-foreground'>
                    <MapPin className='h-4 w-4' />
                    <span>{supplier.distance} km</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className='pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent' />
      </div>
    </section>
  );
}
