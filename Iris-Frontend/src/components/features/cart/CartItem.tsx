// Cart item component
// Displays individual cart item

import React from 'react';
import { Card, CardContent } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  onRemove?: (itemId: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    onUpdateQuantity?.(item.id, newQuantity);
  };

  const handleRemove = () => {
    onRemove?.(item.id);
  };

  return (
    <Card className='w-full'>
      <CardContent className='p-4'>
        <div className='flex items-center space-x-4'>
          <ImageWithFallback
            src={item.productImage || ''}
            alt={item.productName}
            width={80}
            height={80}
            className='rounded-md object-cover'
          />

          <div className='min-w-0 flex-1'>
            <h3 className='truncate text-sm font-medium'>{item.productName}</h3>
            <p className='truncate text-sm text-muted-foreground'>
              {item.supplierName}
            </p>
            <p className='text-sm font-medium'>${item.unitPrice.toFixed(2)}</p>
          </div>

          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </Button>

            <Input
              type='number'
              min='1'
              value={item.quantity}
              onChange={e =>
                handleQuantityChange(parseInt(e.target.value) || 1)
              }
              className='w-16 text-center'
            />

            <Button
              variant='outline'
              size='sm'
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              +
            </Button>
          </div>

          <div className='text-right'>
            <p className='font-medium'>
              ${(item.unitPrice * item.quantity).toFixed(2)}
            </p>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleRemove}
              className='text-red-600 hover:text-red-700'
            >
              Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
