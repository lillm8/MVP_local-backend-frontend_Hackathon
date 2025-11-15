import { Card } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { Switch } from '@components/ui/switch';
import { Label } from '@components/ui/label';
import { Save } from 'lucide-react';

interface OrderingPreferencesCardProps {
  values: {
    autoReorder: boolean;
    savedPaymentMethod: boolean;
    requireApproval: boolean;
    defaultDeliveryTime: 'morning' | 'afternoon' | 'evening';
  };
  onToggle: (
    key: keyof OrderingPreferencesCardProps['values'],
    value: boolean | 'morning' | 'afternoon' | 'evening'
  ) => void;
  onSave: () => void;
}

export function OrderingPreferencesCard({
  values,
  onToggle,
  onSave,
}: OrderingPreferencesCardProps) {
  return (
    <Card className='rounded-3xl border-0 p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='mb-6'>
        <h2 className='mb-2'>Ordering Preferences</h2>
        <p className='text-sm text-muted-foreground'>
          Customize your ordering experience
        </p>
      </div>

      <div className='space-y-6'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
            <div>
              <p className='font-medium'>Auto-Reorder Favorites</p>
              <p className='text-sm text-muted-foreground'>
                Automatically reorder frequently purchased items
              </p>
            </div>
            <Switch
              checked={values.autoReorder}
              onCheckedChange={checked => onToggle('autoReorder', checked)}
            />
          </div>

          <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
            <div>
              <p className='font-medium'>Save Payment Method</p>
              <p className='text-sm text-muted-foreground'>
                Save your payment information for faster checkout
              </p>
            </div>
            <Switch
              checked={values.savedPaymentMethod}
              onCheckedChange={checked =>
                onToggle('savedPaymentMethod', checked)
              }
            />
          </div>

          <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
            <div>
              <p className='font-medium'>Require Order Approval</p>
              <p className='text-sm text-muted-foreground'>
                Orders must be approved before being sent to suppliers
              </p>
            </div>
            <Switch
              checked={values.requireApproval}
              onCheckedChange={checked => onToggle('requireApproval', checked)}
            />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className='mb-4'>Default Delivery Preferences</h3>
          <div className='space-y-2'>
            <Label>Preferred Delivery Time</Label>
            <div className='grid gap-3 md:grid-cols-3'>
              <button
                onClick={() => onToggle('defaultDeliveryTime', 'morning')}
                className={`rounded-xl border-2 p-4 text-center transition-all ${values.defaultDeliveryTime === 'morning' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
              >
                <p className='font-medium'>Morning</p>
                <p className='text-sm text-muted-foreground'>6AM - 12PM</p>
              </button>
              <button
                onClick={() => onToggle('defaultDeliveryTime', 'afternoon')}
                className={`rounded-xl border-2 p-4 text-center transition-all ${values.defaultDeliveryTime === 'afternoon' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
              >
                <p className='font-medium'>Afternoon</p>
                <p className='text-sm text-muted-foreground'>12PM - 6PM</p>
              </button>
              <button
                onClick={() => onToggle('defaultDeliveryTime', 'evening')}
                className={`rounded-xl border-2 p-4 text-center transition-all ${values.defaultDeliveryTime === 'evening' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
              >
                <p className='font-medium'>Evening</p>
                <p className='text-sm text-muted-foreground'>6PM - 10PM</p>
              </button>
            </div>
          </div>
        </div>

        <div className='flex justify-end pt-4'>
          <Button
            onClick={onSave}
            className='rounded-xl bg-primary hover:bg-primary/90'
          >
            <Save className='mr-2 h-4 w-4' />
            Save Preferences
          </Button>
        </div>
      </div>
    </Card>
  );
}
