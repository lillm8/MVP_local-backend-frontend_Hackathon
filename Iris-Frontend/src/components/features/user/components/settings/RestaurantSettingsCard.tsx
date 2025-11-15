import { Card } from '@components/ui/card';
import { Label } from '@components/ui/label';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { MapPin, Save } from 'lucide-react';

interface RestaurantSettingsCardProps {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  taxId: string;
  onChange: (
    fields: Partial<{
      name: string;
      address: string;
      city: string;
      postalCode: string;
      country: string;
      taxId: string;
    }>
  ) => void;
  onSave: () => void;
}

export function RestaurantSettingsCard(props: RestaurantSettingsCardProps) {
  const { name, address, city, postalCode, country, taxId, onChange, onSave } =
    props;
  return (
    <Card className='rounded-3xl border-0 p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='mb-6'>
        <h2 className='mb-2'>Restaurant Information</h2>
        <p className='text-sm text-muted-foreground'>
          Manage your restaurant's business details
        </p>
      </div>

      <div className='space-y-6'>
        <div className='space-y-2'>
          <Label htmlFor='restaurantName'>Restaurant Name</Label>
          <Input
            id='restaurantName'
            value={name}
            onChange={e => onChange({ name: e.target.value })}
            className='rounded-xl'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='address'>Street Address</Label>
          <div className='relative'>
            <MapPin className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              id='address'
              value={address}
              onChange={e => onChange({ address: e.target.value })}
              className='rounded-xl pl-10'
            />
          </div>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          <div className='space-y-2'>
            <Label htmlFor='city'>City</Label>
            <Input
              id='city'
              value={city}
              onChange={e => onChange({ city: e.target.value })}
              className='rounded-xl'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='postalCode'>Postal Code</Label>
            <Input
              id='postalCode'
              value={postalCode}
              onChange={e => onChange({ postalCode: e.target.value })}
              className='rounded-xl'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='country'>Country</Label>
            <Input
              id='country'
              value={country}
              onChange={e => onChange({ country: e.target.value })}
              className='rounded-xl'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='taxId'>Tax ID / Business Number</Label>
          <Input
            id='taxId'
            value={taxId}
            onChange={e => onChange({ taxId: e.target.value })}
            className='rounded-xl'
          />
          <p className='text-xs text-muted-foreground'>
            Required for invoicing and tax purposes
          </p>
        </div>

        <div className='flex justify-end pt-4'>
          <Button
            onClick={onSave}
            className='rounded-xl bg-primary hover:bg-primary/90'
          >
            <Save className='mr-2 h-4 w-4' />
            Save Changes
          </Button>
        </div>
      </div>
    </Card>
  );
}
