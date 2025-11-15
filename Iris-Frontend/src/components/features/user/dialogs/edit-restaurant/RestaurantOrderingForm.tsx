// Ordering preferences form component for edit restaurant profile dialog

import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { RestaurantProfile } from '@/types/user/edit-restaurant/types';

interface RestaurantOrderingFormProps {
  profile: RestaurantProfile;
  onUpdate: (updates: Partial<RestaurantProfile>) => void;
}

export function RestaurantOrderingForm({
  profile,
  onUpdate,
}: RestaurantOrderingFormProps) {
  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div>
          <Label htmlFor='leadTime'>Lead Time</Label>
          <Input
            id='leadTime'
            value={profile.leadTime}
            onChange={e => onUpdate({ leadTime: e.target.value })}
            placeholder='e.g., 24-48 hours'
          />
        </div>
        <div>
          <Label htmlFor='deliveryWindow'>Delivery Window</Label>
          <Input
            id='deliveryWindow'
            value={profile.deliveryWindow}
            onChange={e => onUpdate({ deliveryWindow: e.target.value })}
            placeholder='e.g., 8 AM - 12 PM'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div>
          <Label htmlFor='paymentTerms'>Payment Terms</Label>
          <Input
            id='paymentTerms'
            value={profile.paymentTerms}
            onChange={e => onUpdate({ paymentTerms: e.target.value })}
            placeholder='e.g., Net 30, COD, Prepaid'
          />
        </div>
        <div>
          <Label htmlFor='minimumOrder'>Minimum Order Amount</Label>
          <Input
            id='minimumOrder'
            value={profile.minimumOrder}
            onChange={e => onUpdate({ minimumOrder: e.target.value })}
            placeholder='e.g., €100'
          />
        </div>
      </div>

      <div className='text-sm text-muted-foreground'>
        <p>
          These preferences help suppliers understand your ordering requirements
          and expectations.
        </p>
        <ul className='mt-2 list-inside list-disc space-y-1'>
          <li>
            <strong>Lead Time:</strong> How much notice you need for orders
          </li>
          <li>
            <strong>Delivery Window:</strong> Preferred delivery times
          </li>
          <li>
            <strong>Payment Terms:</strong> Your payment preferences
          </li>
          <li>
            <strong>Minimum Order:</strong> Minimum order value you require
          </li>
        </ul>
      </div>
    </div>
  );
}
