// User preferences component
// Displays user preferences settings

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Switch } from '@components/ui/switch';
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

type Preferences = {
  notifications: boolean;
  emailUpdates: boolean;
  smsUpdates: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
};

interface UserPreferencesProps {
  preferences: Preferences;
  onUpdate?: (preferences: Partial<Preferences>) => void;
}

export function UserPreferences({
  preferences,
  onUpdate,
}: UserPreferencesProps) {
  const [localPreferences, setLocalPreferences] = React.useState(preferences);

  const handleToggle = (key: keyof Preferences) => {
    const newValue = !localPreferences[key];
    setLocalPreferences(prev => ({ ...prev, [key]: newValue }));
    onUpdate?.({ [key]: newValue });
  };

  const handleSelect = (key: keyof Preferences, value: string) => {
    setLocalPreferences(prev => ({ ...prev, [key]: value }));
    onUpdate?.({ [key]: value });
  };

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Notifications */}
        <div className='space-y-4'>
          <h4 className='text-sm font-medium'>Notifications</h4>

          <div className='flex items-center justify-between'>
            <Label htmlFor='notifications'>Push Notifications</Label>
            <Switch
              id='notifications'
              checked={localPreferences.notifications}
              onCheckedChange={() => handleToggle('notifications')}
            />
          </div>

          <div className='flex items-center justify-between'>
            <Label htmlFor='email-updates'>Email Updates</Label>
            <Switch
              id='email-updates'
              checked={localPreferences.emailUpdates}
              onCheckedChange={() => handleToggle('emailUpdates')}
            />
          </div>

          <div className='flex items-center justify-between'>
            <Label htmlFor='sms-updates'>SMS Updates</Label>
            <Switch
              id='sms-updates'
              checked={localPreferences.smsUpdates}
              onCheckedChange={() => handleToggle('smsUpdates')}
            />
          </div>
        </div>

        {/* Appearance */}
        <div className='space-y-4'>
          <h4 className='text-sm font-medium'>Appearance</h4>

          <div className='space-y-2'>
            <Label htmlFor='theme'>Theme</Label>
            <Select
              value={localPreferences.theme}
              onValueChange={value => handleSelect('theme', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='light'>Light</SelectItem>
                <SelectItem value='dark'>Dark</SelectItem>
                <SelectItem value='system'>System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='language'>Language</Label>
            <Select
              value={localPreferences.language}
              onValueChange={value => handleSelect('language', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='en'>English</SelectItem>
                <SelectItem value='es'>Spanish</SelectItem>
                <SelectItem value='fr'>French</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
