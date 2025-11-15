// Delivery settings form component for edit store dialog

import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Card } from '@components/ui/card';
import { Truck } from 'lucide-react';
import { StoreFormData } from '@/types/suppliers/edit-store/types';

interface StoreDeliveryFormProps {
  formData: StoreFormData;
  onUpdate: (updates: Partial<StoreFormData>) => void;
}

export function StoreDeliveryForm({
  formData,
  onUpdate,
}: StoreDeliveryFormProps) {
  return (
    <div className='space-y-4'>
      <div className='mb-4 flex items-center space-x-2'>
        <Truck className='h-5 w-5 text-primary' />
        <h3 className='text-lg font-semibold'>Delivery Settings</h3>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Card className='p-4'>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='deliveryRadius'>Delivery Radius (km)</Label>
              <Input
                id='deliveryRadius'
                type='number'
                value={formData.deliveryRadius}
                onChange={e => onUpdate({ deliveryRadius: e.target.value })}
                placeholder='10'
                min='0'
                step='1'
              />
            </div>

            <div>
              <Label htmlFor='deliveryFee'>Delivery Fee (€)</Label>
              <Input
                id='deliveryFee'
                type='number'
                step='0.01'
                value={formData.deliveryFee}
                onChange={e => onUpdate({ deliveryFee: e.target.value })}
                placeholder='5.00'
                min='0'
              />
            </div>

            <div>
              <Label htmlFor='freeDeliveryThreshold'>
                Free Delivery Threshold (€)
              </Label>
              <Input
                id='freeDeliveryThreshold'
                type='number'
                step='0.01'
                value={formData.freeDeliveryThreshold}
                onChange={e =>
                  onUpdate({ freeDeliveryThreshold: e.target.value })
                }
                placeholder='50.00'
                min='0'
              />
            </div>
          </div>
        </Card>

        <Card className='p-4'>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='minOrderAmount'>Minimum Order Amount (€)</Label>
              <Input
                id='minOrderAmount'
                type='number'
                step='0.01'
                value={formData.minOrderAmount}
                onChange={e => onUpdate({ minOrderAmount: e.target.value })}
                placeholder='25.00'
                min='0'
              />
            </div>

            <div>
              <Label htmlFor='deliveryTime'>Delivery Time (minutes)</Label>
              <Input
                id='deliveryTime'
                value={formData.deliveryTime}
                onChange={e => onUpdate({ deliveryTime: e.target.value })}
                placeholder='30-45'
              />
            </div>
          </div>
        </Card>
      </div>

      <div className='text-sm text-muted-foreground'>
        <p>
          Configure your delivery settings to help customers understand your
          service area, fees, and delivery times.
        </p>
        <ul className='mt-2 list-inside list-disc space-y-1'>
          <li>
            <strong>Delivery Radius:</strong> Maximum distance you deliver to
          </li>
          <li>
            <strong>Delivery Fee:</strong> Standard fee for delivery
          </li>
          <li>
            <strong>Free Delivery Threshold:</strong> Order amount for free
            delivery
          </li>
          <li>
            <strong>Minimum Order:</strong> Minimum order amount required
          </li>
          <li>
            <strong>Delivery Time:</strong> Expected delivery time range
          </li>
        </ul>
      </div>
    </div>
  );
}
