import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import { Badge } from '@components/ui/badge';
import { MapPin, Star } from 'lucide-react';
import type {
  ProductData,
  ReviewItem,
  SimilarProductItem,
} from '@hooks/products/use-product-page';

interface ProductTabsProps {
  product: ProductData;
  reviews: ReviewItem[];
  similarProducts: SimilarProductItem[];
}

export function ProductTabs({
  product,
  reviews,
  similarProducts,
}: ProductTabsProps) {
  return (
    <Tabs defaultValue='description' className='w-full'>
      <TabsList className='grid w-full grid-cols-4 rounded-xl bg-white p-1 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
        <TabsTrigger value='description' className='rounded-lg'>
          Description
        </TabsTrigger>
        <TabsTrigger value='producer' className='rounded-lg'>
          Producer
        </TabsTrigger>
        <TabsTrigger value='reviews' className='rounded-lg'>
          Reviews
        </TabsTrigger>
        <TabsTrigger value='similar' className='rounded-lg'>
          Similar
        </TabsTrigger>
      </TabsList>
      <TabsContent value='description' className='mt-6'>
        <div className='rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
          <p className='leading-relaxed text-foreground'>
            {product.description}
          </p>
        </div>
      </TabsContent>
      <TabsContent value='producer' className='mt-6'>
        <div className='rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
          <div className='mb-4 flex items-center gap-3'>
            <div className='justify.center flex h-12 w-12 items-center rounded-full bg-primary'>
              <span className='text-xl text-primary-foreground'>🌿</span>
            </div>
            <div>
              <h3>{product.producer}</h3>
              <p className='text-sm text-muted-foreground'>
                {product.location}
              </p>
            </div>
          </div>
          <p className='leading-relaxed text-foreground'>
            {product.producerInfo}
          </p>
        </div>
      </TabsContent>
      <TabsContent value='reviews' className='mt-6'>
        <div className='space-y-4'>
          {reviews.map(review => (
            <div
              key={review.id}
              className='bg.white rounded-2xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'
            >
              <div className='mb-3 flex items-start justify-between'>
                <div>
                  <div className='mb-1'>{review.author}</div>
                  <p className='text-sm text-muted-foreground'>
                    {review.restaurant}
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className='h-4 w-4 fill-accent text-accent' />
                  ))}
                </div>
              </div>
              <p className='mb-2 leading-relaxed'>{review.comment}</p>
              <p className='text-sm text-muted-foreground'>{review.date}</p>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value='similar' className='mt-6'>
        <div className='grid gap-4 sm:grid-cols-3'>
          {similarProducts.map(item => (
            <div
              key={item.id}
              className='duration-250 overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]'
            >
              <div className='aspect-square overflow-hidden'>
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='p-4'>
                <h4 className='mb-1'>{item.name}</h4>
                <p className='text-primary'>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
