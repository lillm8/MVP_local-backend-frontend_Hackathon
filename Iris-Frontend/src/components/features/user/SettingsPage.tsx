import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { User, Bell, CreditCard, Building2 } from 'lucide-react';
import { useSettingsPage } from '@hooks/user/use-settings-page';
import { AccountSettingsCard } from './components/settings/AccountSettingsCard';
import { RestaurantSettingsCard } from './components/settings/RestaurantSettingsCard';
import { NotificationPreferencesCard } from './components/settings/NotificationPreferencesCard';
import { OrderingPreferencesCard } from './components/settings/OrderingPreferencesCard';

export function SettingsPage() {
  const {
    // visibility
    showPassword,
    setShowPassword,
    showNewPassword,
    setShowNewPassword,
    // account
    accountData,
    setAccountData,
    handleSaveAccount,
    // restaurant
    restaurantData,
    setRestaurantData,
    handleSaveRestaurant,
    // notifications
    notifications,
    setNotifications,
    handleSaveNotifications,
    // ordering
    orderingPrefs,
    setOrderingPrefs,
    handleSaveOrdering,
  } = useSettingsPage();

  return (
    <div className='min-h-screen bg-background'>
      <div className='mx-auto max-w-[1200px] px-8 py-12'>
        <div className='mb-8'>
          <h1 className='mb-2'>Settings</h1>
          <p className='text-muted-foreground'>
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue='account' className='w-full'>
          <TabsList className='mb-8 inline-flex h-12 rounded-2xl bg-muted p-1'>
            <TabsTrigger value='account' className='rounded-xl'>
              <User className='mr-2 h-4 w-4' />
              Account
            </TabsTrigger>
            <TabsTrigger value='restaurant' className='rounded-xl'>
              <Building2 className='mr-2 h-4 w-4' />
              Restaurant
            </TabsTrigger>
            <TabsTrigger value='notifications' className='rounded-xl'>
              <Bell className='mr-2 h-4 w-4' />
              Notifications
            </TabsTrigger>
            <TabsTrigger value='ordering' className='rounded-xl'>
              <CreditCard className='mr-2 h-4 w-4' />
              Ordering
            </TabsTrigger>
          </TabsList>

          <TabsContent value='account' className='space-y-6'>
            <AccountSettingsCard
              fullName={accountData.fullName}
              email={accountData.email}
              phone={accountData.phone}
              currentPassword={accountData.currentPassword}
              newPassword={accountData.newPassword}
              confirmPassword={accountData.confirmPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showNewPassword={showNewPassword}
              setShowNewPassword={setShowNewPassword}
              onChange={fields => setAccountData({ ...accountData, ...fields })}
              onSave={handleSaveAccount}
            />
          </TabsContent>

          <TabsContent value='restaurant' className='space-y-6'>
            <RestaurantSettingsCard
              name={restaurantData.name}
              address={restaurantData.address}
              city={restaurantData.city}
              postalCode={restaurantData.postalCode}
              country={restaurantData.country}
              taxId={restaurantData.taxId}
              onChange={fields =>
                setRestaurantData({ ...restaurantData, ...fields })
              }
              onSave={handleSaveRestaurant}
            />
          </TabsContent>

          <TabsContent value='notifications' className='space-y-6'>
            <NotificationPreferencesCard
              values={notifications}
              onToggle={(key, value) =>
                setNotifications({ ...notifications, [key]: value as boolean })
              }
              onSave={handleSaveNotifications}
            />
          </TabsContent>

          <TabsContent value='ordering' className='space-y-6'>
            <OrderingPreferencesCard
              values={orderingPrefs}
              onToggle={(key, value) =>
                setOrderingPrefs({ ...orderingPrefs, [key]: value as any })
              }
              onSave={handleSaveOrdering}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
