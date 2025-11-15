'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Switch } from '@components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Separator } from '@components/ui/separator';
import {
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  AlertTriangle,
  CheckCircle,
  Moon,
  Sun,
  Volume2,
  Mail,
  Smartphone,
} from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    orderUpdates: true,
    supplierUpdates: true,
    marketingEmails: false,

    // Privacy & Security
    twoFactorAuth: false,
    dataSharing: true,
    analyticsTracking: true,

    // Appearance
    theme: 'light',
    language: 'en',
    timezone: 'America/Los_Angeles',

    // Preferences
    currency: 'USD',
    units: 'imperial',
    autoSave: true,
    compactView: false,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Simulate saving settings
    console.log('Saving settings:', settings);
    setHasChanges(false);
    // Show success message
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Settings</h1>
          <p className='text-muted-foreground'>
            Manage your account preferences and configuration
          </p>
        </div>
        {hasChanges && (
          <Button onClick={handleSave}>
            <Save className='mr-2 h-4 w-4' />
            Save Changes
          </Button>
        )}
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Bell className='h-5 w-5' />
              Notifications
            </CardTitle>
            <CardDescription>
              Choose how you want to be notified about updates
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>Email Notifications</Label>
                  <p className='text-sm text-muted-foreground'>
                    Receive updates via email
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={checked =>
                    handleSettingChange('emailNotifications', checked)
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>Push Notifications</Label>
                  <p className='text-sm text-muted-foreground'>
                    Receive push notifications in your browser
                  </p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={checked =>
                    handleSettingChange('pushNotifications', checked)
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>SMS Notifications</Label>
                  <p className='text-sm text-muted-foreground'>
                    Receive updates via text message
                  </p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={checked =>
                    handleSettingChange('smsNotifications', checked)
                  }
                />
              </div>
            </div>

            <Separator />

            <div className='space-y-4'>
              <h4 className='text-sm font-medium'>Notification Types</h4>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Mail className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm'>Order Updates</span>
                  </div>
                  <Switch
                    checked={settings.orderUpdates}
                    onCheckedChange={checked =>
                      handleSettingChange('orderUpdates', checked)
                    }
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Smartphone className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm'>Supplier Updates</span>
                  </div>
                  <Switch
                    checked={settings.supplierUpdates}
                    onCheckedChange={checked =>
                      handleSettingChange('supplierUpdates', checked)
                    }
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Volume2 className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm'>Marketing Emails</span>
                  </div>
                  <Switch
                    checked={settings.marketingEmails}
                    onCheckedChange={checked =>
                      handleSettingChange('marketingEmails', checked)
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Shield className='h-5 w-5' />
              Privacy & Security
            </CardTitle>
            <CardDescription>
              Manage your privacy and security preferences
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>Two-Factor Authentication</Label>
                  <p className='text-sm text-muted-foreground'>
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={checked =>
                    handleSettingChange('twoFactorAuth', checked)
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>Data Sharing</Label>
                  <p className='text-sm text-muted-foreground'>
                    Allow sharing of anonymized data for improvements
                  </p>
                </div>
                <Switch
                  checked={settings.dataSharing}
                  onCheckedChange={checked =>
                    handleSettingChange('dataSharing', checked)
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>Analytics Tracking</Label>
                  <p className='text-sm text-muted-foreground'>
                    Help us improve by sharing usage analytics
                  </p>
                </div>
                <Switch
                  checked={settings.analyticsTracking}
                  onCheckedChange={checked =>
                    handleSettingChange('analyticsTracking', checked)
                  }
                />
              </div>
            </div>

            <Separator />

            <div className='space-y-4'>
              <h4 className='text-sm font-medium'>Security Status</h4>
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm'>
                  <CheckCircle className='h-4 w-4 text-green-500' />
                  <span>Strong password enabled</span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  {settings.twoFactorAuth ? (
                    <CheckCircle className='h-4 w-4 text-green-500' />
                  ) : (
                    <AlertTriangle className='h-4 w-4 text-yellow-500' />
                  )}
                  <span>
                    Two-factor authentication{' '}
                    {settings.twoFactorAuth ? 'enabled' : 'disabled'}
                  </span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <CheckCircle className='h-4 w-4 text-green-500' />
                  <span>Account verified</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Palette className='h-5 w-5' />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize the look and feel of your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label>Theme</Label>
                <Select
                  value={settings.theme}
                  onValueChange={value => handleSettingChange('theme', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='light'>
                      <div className='flex items-center gap-2'>
                        <Sun className='h-4 w-4' />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value='dark'>
                      <div className='flex items-center gap-2'>
                        <Moon className='h-4 w-4' />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value='system'>System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label>Language</Label>
                <Select
                  value={settings.language}
                  onValueChange={value =>
                    handleSettingChange('language', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='en'>English</SelectItem>
                    <SelectItem value='es'>Español</SelectItem>
                    <SelectItem value='fr'>Français</SelectItem>
                    <SelectItem value='de'>Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label>Timezone</Label>
                <Select
                  value={settings.timezone}
                  onValueChange={value =>
                    handleSettingChange('timezone', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='America/Los_Angeles'>
                      Pacific Time
                    </SelectItem>
                    <SelectItem value='America/Denver'>
                      Mountain Time
                    </SelectItem>
                    <SelectItem value='America/Chicago'>
                      Central Time
                    </SelectItem>
                    <SelectItem value='America/New_York'>
                      Eastern Time
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Globe className='h-5 w-5' />
              Preferences
            </CardTitle>
            <CardDescription>
              Set your default preferences and behavior
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label>Currency</Label>
                <Select
                  value={settings.currency}
                  onValueChange={value =>
                    handleSettingChange('currency', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='USD'>USD ($)</SelectItem>
                    <SelectItem value='EUR'>EUR (€)</SelectItem>
                    <SelectItem value='GBP'>GBP (£)</SelectItem>
                    <SelectItem value='CAD'>CAD (C$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label>Units</Label>
                <Select
                  value={settings.units}
                  onValueChange={value => handleSettingChange('units', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='imperial'>Imperial (lbs, oz)</SelectItem>
                    <SelectItem value='metric'>Metric (kg, g)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>Auto-save</Label>
                  <p className='text-sm text-muted-foreground'>
                    Automatically save changes as you type
                  </p>
                </div>
                <Switch
                  checked={settings.autoSave}
                  onCheckedChange={checked =>
                    handleSettingChange('autoSave', checked)
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>Compact View</Label>
                  <p className='text-sm text-muted-foreground'>
                    Use a more compact layout for better space usage
                  </p>
                </div>
                <Switch
                  checked={settings.compactView}
                  onCheckedChange={checked =>
                    handleSettingChange('compactView', checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
