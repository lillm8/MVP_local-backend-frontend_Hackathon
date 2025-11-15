// Contact info form component for edit restaurant profile dialog

import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { RestaurantProfile } from '@/types/user/edit-restaurant/types';

interface RestaurantContactFormProps {
  profile: RestaurantProfile;
  onUpdate: (updates: Partial<RestaurantProfile>) => void;
}

export function RestaurantContactForm({
  profile,
  onUpdate,
}: RestaurantContactFormProps) {
  return (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='email'>Email Address</Label>
        <Input
          id='email'
          type='email'
          value={profile.email}
          onChange={e => onUpdate({ email: e.target.value })}
          placeholder='Enter email address'
        />
      </div>

      <div>
        <Label htmlFor='phone'>Phone Number</Label>
        <Input
          id='phone'
          type='tel'
          value={profile.phone}
          onChange={e => onUpdate({ phone: e.target.value })}
          placeholder='Enter phone number'
        />
      </div>

      <div>
        <Label htmlFor='website'>Website</Label>
        <Input
          id='website'
          type='url'
          value={profile.website}
          onChange={e => onUpdate({ website: e.target.value })}
          placeholder='Enter website URL'
        />
      </div>
    </div>
  );
}
