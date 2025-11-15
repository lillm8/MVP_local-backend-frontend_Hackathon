// Cart summary component
// Displays cart totals and summary

import React from 'react';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Separator } from '@components/ui/separator';
import { Cart } from '@/types';

interface CartSummaryProps {
  cart: Cart;
  onCheckout?: () => void;
  onClearCart?: () => void;
}

export function CartSummary({
  cart,
  onCheckout,
  onClearCart,
}: CartSummaryProps) {
  const subtotal = cart.items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span>Subtotal ({cart.items.length} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className='flex justify-between text-sm'>
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className='flex justify-between text-sm'>
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>

          {shipping > 0 && (
            <p className='text-xs text-muted-foreground'>
              Add ${(100 - subtotal).toFixed(2)} more for free shipping
            </p>
          )}
        </div>

        <Separator />

        <div className='flex justify-between font-medium'>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className='space-y-2 pt-4'>
          {onCheckout && (
            <Button
              onClick={onCheckout}
              className='w-full'
              disabled={cart.items.length === 0}
            >
              Proceed to Checkout
            </Button>
          )}

          {onClearCart && cart.items.length > 0 && (
            <Button variant='outline' onClick={onClearCart} className='w-full'>
              Clear Cart
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
