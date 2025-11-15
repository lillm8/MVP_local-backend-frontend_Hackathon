// Contact info form component for edit store dialog

import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { StoreFormData } from '@/types/suppliers/edit-store/types';

interface StoreContactFormProps {
  formData: StoreFormData;
  onUpdate: (updates: Partial<StoreFormData>) => void;
}

export function StoreContactForm({
  formData,
  onUpdate,
}: StoreContactFormProps) {
  return (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='email'>Email Address</Label>
        <Input
          id='email'
          type='email'
          value={formData.email}
          onChange={e => onUpdate({ email: e.target.value })}
          placeholder='Enter email address'
        />
      </div>

      <div>
        <Label htmlFor='phone'>Phone Number</Label>
        <Input
          id='phone'
          type='tel'
          value={formData.phone}
          onChange={e => onUpdate({ phone: e.target.value })}
          placeholder='Enter phone number'
        />
      </div>

      <div>
        <Label htmlFor='website'>Website</Label>
        <Input
          id='website'
          type='url'
          value={formData.website}
          onChange={e => onUpdate({ website: e.target.value })}
          placeholder='Enter website URL'
        />
      </div>
    </div>
  );
}
