'use client';

import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import { ShoppingCart } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string;
  inStock: boolean;
  description: string;
}

export interface ProductsTabProps {
  products: Product[];
  onAddToCart: (productId: number, productName: string) => void;
}

export function ProductsTab({ products, onAddToCart }: ProductsTabProps) {
  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {products.map(product => (
        <Card
          key={product.id}
          className='duration-250 overflow-hidden rounded-2xl border-0 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]'
        >
          <div className='relative aspect-square overflow-hidden'>
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className='duration-250 h-full w-full object-cover transition-transform hover:scale-105'
            />
            {!product.inStock && (
              <div className='absolute inset-0 flex items-center justify-center bg-black/50 text-white'>
                Out of Stock
              </div>
            )}
          </div>
          <div className='p-4'>
            <h3 className='mb-1'>{product.name}</h3>
            <p className='mb-3 text-sm text-muted-foreground'>
              {product.description}
            </p>
            <div className='flex items-center justify-between'>
              <div className='text-primary'>
                €{product.price.toFixed(2)}
                <span className='text-sm text-muted-foreground'>
                  /{product.unit}
                </span>
              </div>
              <Button
                size='sm'
                className='rounded-xl'
                disabled={!product.inStock}
                onClick={() => onAddToCart(product.id, product.name)}
              >
                <ShoppingCart className='mr-2 h-4 w-4' />
                Add to Cart
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
