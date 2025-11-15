import { Card } from '@components/ui/card';
import { Label } from '@components/ui/label';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { Mail, Phone, Lock, Eye, EyeOff, Save } from 'lucide-react';

interface AccountSettingsCardProps {
  fullName: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  showNewPassword: boolean;
  setShowNewPassword: (v: boolean) => void;
  onChange: (
    fields: Partial<{
      fullName: string;
      email: string;
      phone: string;
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }>
  ) => void;
  onSave: () => void;
}

export function AccountSettingsCard(props: AccountSettingsCardProps) {
  const {
    fullName,
    email,
    phone,
    currentPassword,
    newPassword,
    confirmPassword,
    showPassword,
    setShowPassword,
    showNewPassword,
    setShowNewPassword,
    onChange,
    onSave,
  } = props;
  return (
    <Card className='rounded-3xl border-0 p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='mb-6'>
        <h2 className='mb-2'>Account Information</h2>
        <p className='text-sm text-muted-foreground'>
          Update your personal account details
        </p>
      </div>

      <div className='space-y-6'>
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='fullName'>Full Name</Label>
            <Input
              id='fullName'
              value={fullName}
              onChange={e => onChange({ fullName: e.target.value })}
              className='rounded-xl'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email Address</Label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              <Input
                id='email'
                type='email'
                value={email}
                onChange={e => onChange({ email: e.target.value })}
                className='rounded-xl pl-10'
              />
            </div>
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='phone'>Phone Number</Label>
          <div className='relative'>
            <Phone className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              id='phone'
              type='tel'
              value={phone}
              onChange={e => onChange({ phone: e.target.value })}
              className='rounded-xl pl-10'
            />
          </div>
        </div>

        <Separator className='my-6' />

        <div className='mb-4'>
          <h3 className='mb-2'>Change Password</h3>
          <p className='text-sm text-muted-foreground'>
            Leave blank to keep your current password
          </p>
        </div>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='currentPassword'>Current Password</Label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              <Input
                id='currentPassword'
                type={showPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={e => onChange({ currentPassword: e.target.value })}
                className='rounded-xl pl-10 pr-10'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
              </button>
            </div>
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='newPassword'>New Password</Label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  id='newPassword'
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={e => onChange({ newPassword: e.target.value })}
                  className='rounded-xl pl-10 pr-10'
                />
                <button
                  type='button'
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                >
                  {showNewPassword ? (
                    <EyeOff className='h-4 w-4' />
                  ) : (
                    <Eye className='h-4 w-4' />
                  )}
                </button>
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='confirmPassword'>Confirm New Password</Label>
              <Input
                id='confirmPassword'
                type='password'
                value={confirmPassword}
                onChange={e => onChange({ confirmPassword: e.target.value })}
                className='rounded-xl'
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
            Save Changes
          </Button>
        </div>
      </div>
    </Card>
  );
}
