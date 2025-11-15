'use client';

import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { Progress } from '@components/ui/progress';
import { Star } from 'lucide-react';

export interface Review {
  id: number;
  restaurant: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface ReviewsTabProps {
  rating: number;
  totalReviews: number;
  reviews: Review[];
}

export function ReviewsTab({ rating, totalReviews, reviews }: ReviewsTabProps) {
  return (
    <Card className='rounded-2xl border-0 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
      <div className='mb-6'>
        <h3 className='mb-4'>Customer Reviews</h3>
        <div className='flex items-center gap-6 rounded-xl bg-muted/30 p-4'>
          <div className='text-center'>
            <div className='mb-1 text-4xl text-primary'>{rating}</div>
            <div className='flex items-center justify-center gap-1'>
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${star <= Math.round(rating) ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                />
              ))}
            </div>
            <div className='mt-1 text-sm text-muted-foreground'>
              {totalReviews} reviews
            </div>
          </div>
          <div className='flex-1 space-y-2'>
            {[5, 4, 3, 2, 1].map(stars => {
              const percentage =
                stars === 5 ? 85 : stars === 4 ? 12 : stars === 3 ? 3 : 0;
              return (
                <div key={stars} className='flex items-center gap-3'>
                  <div className='flex w-12 items-center gap-1 text-sm'>
                    <Star className='h-3 w-3 fill-primary text-primary' />
                    {stars}
                  </div>
                  <Progress value={percentage} className='h-2 flex-1' />
                  <div className='w-12 text-right text-sm text-muted-foreground'>
                    {percentage}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className='space-y-4'>
        {reviews.map(review => (
          <div key={review.id} className='rounded-xl border border-border p-4'>
            <div className='mb-2 flex items-start justify-between'>
              <div>
                <div className='mb-1 flex items-center gap-2'>
                  <span>{review.restaurant}</span>
                  {review.verified && (
                    <Badge variant='outline' className='text-xs'>
                      Verified Purchase
                    </Badge>
                  )}
                </div>
                <div className='flex items-center gap-1'>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`h-3 w-3 ${star <= review.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                    />
                  ))}
                </div>
              </div>
              <div className='text-sm text-muted-foreground'>{review.date}</div>
            </div>
            <p className='text-sm leading-relaxed'>{review.comment}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
