import { Card } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { Switch } from '@components/ui/switch';
import { Save } from 'lucide-react';

interface NotificationPreferencesCardProps {
  values: {
    orderUpdates: boolean;
    newProducts: boolean;
    promotions: boolean;
    weeklyDigest: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
  };
  onToggle: (
    key: keyof NotificationPreferencesCardProps['values'],
    value: boolean
  ) => void;
  onSave: () => void;
}

export function NotificationPreferencesCard({
  values,
  onToggle,
  onSave,
}: NotificationPreferencesCardProps) {
  return (
    <Card className='rounded-3xl border-0 p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='mb-6'>
        <h2 className='mb-2'>Notification Preferences</h2>
        <p className='text-sm text-muted-foreground'>
          Choose how you want to be notified about updates
        </p>
      </div>

      <div className='space-y-6'>
        <div>
          <h3 className='mb-4'>Email Notifications</h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
              <div>
                <p className='font-medium'>Order Updates</p>
                <p className='text-sm text-muted-foreground'>
                  Get notified when your order status changes
                </p>
              </div>
              <Switch
                checked={values.orderUpdates}
                onCheckedChange={checked => onToggle('orderUpdates', checked)}
              />
            </div>

            <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
              <div>
                <p className='font-medium'>New Products</p>
                <p className='text-sm text-muted-foreground'>
                  Be the first to know about new products from your suppliers
                </p>
              </div>
              <Switch
                checked={values.newProducts}
                onCheckedChange={checked => onToggle('newProducts', checked)}
              />
            </div>

            <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
              <div>
                <p className='font-medium'>Promotions & Deals</p>
                <p className='text-sm text-muted-foreground'>
                  Receive exclusive offers and special promotions
                </p>
              </div>
              <Switch
                checked={values.promotions}
                onCheckedChange={checked => onToggle('promotions', checked)}
              />
            </div>

            <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
              <div>
                <p className='font-medium'>Weekly Digest</p>
                <p className='text-sm text-muted-foreground'>
                  Summary of your activity and recommendations
                </p>
              </div>
              <Switch
                checked={values.weeklyDigest}
                onCheckedChange={checked => onToggle('weeklyDigest', checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className='mb-4'>Delivery Channels</h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
              <div>
                <p className='font-medium'>Email Notifications</p>
                <p className='text-sm text-muted-foreground'>
                  Receive notifications via email
                </p>
              </div>
              <Switch
                checked={values.emailNotifications}
                onCheckedChange={checked =>
                  onToggle('emailNotifications', checked)
                }
              />
            </div>

            <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
              <div>
                <p className='font-medium'>SMS Notifications</p>
                <p className='text-sm text-muted-foreground'>
                  Get important updates via text message
                </p>
              </div>
              <Switch
                checked={values.smsNotifications}
                onCheckedChange={checked =>
                  onToggle('smsNotifications', checked)
                }
              />
            </div>

            <div className='flex items-center justify-between rounded-xl bg-muted/30 p-4'>
              <div>
                <p className='font-medium'>Push Notifications</p>
                <p className='text-sm text-muted-foreground'>
                  Browser notifications for instant updates
                </p>
              </div>
              <Switch
                checked={values.pushNotifications}
                onCheckedChange={checked =>
                  onToggle('pushNotifications', checked)
                }
              />
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
