'use client';

import Image from 'next/image';
import { ProductCardProps } from '@/components/types';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { cn } from '@/utils/utils';

export function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
  onToggleFavorite,
  isFavorite = false,
  showSupplier = true,
}: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(product.id);
  };

  const handleViewDetails = () => {
    onViewDetails(product.id);
  };

  return (
    <Card
      className='group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg'
      onClick={handleViewDetails}
    >
      <CardHeader className='p-0'>
        <div className='relative aspect-square overflow-hidden rounded-t-lg'>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className='object-cover transition-transform duration-200 group-hover:scale-105'
              priority={false}
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center bg-muted'>
              <span className='text-muted-foreground'>No Image</span>
            </div>
          )}

          {/* Favorite button */}
          {onToggleFavorite && (
            <Button
              variant='ghost'
              size='icon'
              className='absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100'
              onClick={handleToggleFavorite}
            >
              <Heart
                className={cn(
                  'h-4 w-4',
                  isFavorite
                    ? 'fill-red-500 text-red-500'
                    : 'text-muted-foreground'
                )}
              />
            </Button>
          )}

          {/* Availability badge */}
          {!product.isAvailable && (
            <Badge variant='destructive' className='absolute left-2 top-2'>
              Out of Stock
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className='p-4'>
        <div className='space-y-2'>
          {/* Product name */}
          <h3 className='line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-primary'>
            {product.name}
          </h3>

          {/* Description */}
          <p className='line-clamp-2 text-sm text-muted-foreground'>
            {product.description}
          </p>

          {/* Supplier info */}
          {showSupplier && (
            <p className='text-xs text-muted-foreground'>
              by {product.supplierName}
            </p>
          )}

          {/* Price and unit */}
          <div className='flex items-center justify-between'>
            <div className='space-y-1'>
              <p className='text-lg font-bold text-foreground'>
                {formatCurrency(product.price)}
              </p>
              <p className='text-xs text-muted-foreground'>
                per {product.unit}
              </p>
            </div>

            {/* Minimum order quantity */}
            <div className='text-right'>
              <p className='text-xs text-muted-foreground'>
                Min: {product.minimumOrderQuantity} {product.unit}
              </p>
            </div>
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className='flex flex-wrap gap-1'>
              {product.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant='secondary' className='text-xs'>
                  {tag}
                </Badge>
              ))}
              {product.tags.length > 3 && (
                <Badge variant='secondary' className='text-xs'>
                  +{product.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className='p-4 pt-0'>
        <div className='flex w-full gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='flex-1'
            onClick={handleViewDetails}
          >
            <Eye className='mr-2 h-4 w-4' />
            View Details
          </Button>

          <Button
            size='sm'
            className='flex-1'
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
          >
            <ShoppingCart className='mr-2 h-4 w-4' />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
