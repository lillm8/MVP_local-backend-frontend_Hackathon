// User settings component
// Displays user settings form

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { User } from '@/types';

interface UserSettingsProps {
  user: User;
  onSave?: (updatedUser: Partial<User>) => void;
  onCancel?: () => void;
}

export function UserSettings({ user, onSave, onCancel }: UserSettingsProps) {
  const [formData, setFormData] = React.useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              value={formData.name}
              onChange={e => handleChange('name', e.target.value)}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              value={formData.email}
              onChange={e => handleChange('email', e.target.value)}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='phone'>Phone</Label>
            <Input
              id='phone'
              type='tel'
              value={formData.phone}
              onChange={e => handleChange('phone', e.target.value)}
            />
          </div>

          <div className='flex gap-2 pt-4'>
            <Button type='submit' size='sm' className='flex-1'>
              Save Changes
            </Button>
            {onCancel && (
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={onCancel}
                className='flex-1'
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
