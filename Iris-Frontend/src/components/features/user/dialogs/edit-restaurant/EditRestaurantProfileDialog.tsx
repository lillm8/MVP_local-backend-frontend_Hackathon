// Main Edit Restaurant Profile Dialog component - refactored orchestrator

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { Button } from '@components/ui/button';
import {
  Utensils,
  Phone,
  Mail,
  Globe,
  UtensilsCrossed,
  Clock,
  Package,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner';
import { useRestaurantProfile } from '@/hooks/data/user/use-restaurant-profile';
import { RestaurantBasicInfoForm } from './RestaurantBasicInfoForm';
import { RestaurantContactForm } from './RestaurantContactForm';
import { RestaurantMenuForm } from './RestaurantMenuForm';
import { RestaurantSupplyNeedsForm } from './RestaurantSupplyNeedsForm';
import { RestaurantOrderingForm } from './RestaurantOrderingForm';
import {
  EditRestaurantProfileDialogProps,
  RestaurantTab,
} from '@/types/user/edit-restaurant/types';

export function EditRestaurantProfileDialog({
  open,
  onOpenChange,
  restaurantProfile,
  onSave,
}: EditRestaurantProfileDialogProps) {
  const [activeTab, setActiveTab] = useState<RestaurantTab>('basic');

  const {
    profile,
    newCuisine,
    setNewCuisine,
    updateProfile,
    addCuisine,
    removeCuisine,
    addMenuCategory,
    updateMenuCategory,
    removeMenuCategory,
    addMenuItem,
    updateMenuItem,
    removeMenuItem,
    addSupplyNeed,
    updateSupplyNeed,
    removeSupplyNeed,
    resetProfile,
  } = useRestaurantProfile(restaurantProfile);

  const handleSave = () => {
    onSave(profile);
    toast.success('Restaurant profile updated successfully!');
    onOpenChange(false);
  };

  const handleCancel = () => {
    resetProfile();
    onOpenChange(false);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Utensils },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'supply-needs', label: 'Supply Needs', icon: Package },
    { id: 'ordering', label: 'Ordering', icon: Clock },
  ] as const;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] max-w-4xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Edit Restaurant Profile</DialogTitle>
          <DialogDescription>
            Update your restaurant information, menu, and supplier preferences.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={value => setActiveTab(value as RestaurantTab)}
        >
          <TabsList className='grid w-full grid-cols-5'>
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className='flex items-center space-x-2'
                >
                  <Icon className='h-4 w-4' />
                  <span className='hidden sm:inline'>{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value='basic' className='m-0 space-y-4'>
            <RestaurantBasicInfoForm
              profile={profile}
              newCuisine={newCuisine}
              onUpdate={updateProfile}
              onAddCuisine={addCuisine}
              onRemoveCuisine={removeCuisine}
              onNewCuisineChange={setNewCuisine}
            />
          </TabsContent>

          <TabsContent value='contact' className='m-0 space-y-4'>
            <RestaurantContactForm profile={profile} onUpdate={updateProfile} />
          </TabsContent>

          <TabsContent value='menu' className='m-0 space-y-4'>
            <RestaurantMenuForm
              profile={profile}
              onAddMenuCategory={addMenuCategory}
              onUpdateMenuCategory={updateMenuCategory}
              onRemoveMenuCategory={removeMenuCategory}
              onAddMenuItem={addMenuItem}
              onUpdateMenuItem={updateMenuItem}
              onRemoveMenuItem={removeMenuItem}
            />
          </TabsContent>

          <TabsContent value='supply-needs' className='m-0 space-y-4'>
            <RestaurantSupplyNeedsForm
              profile={profile}
              onAddSupplyNeed={addSupplyNeed}
              onUpdateSupplyNeed={updateSupplyNeed}
              onRemoveSupplyNeed={removeSupplyNeed}
            />
          </TabsContent>

          <TabsContent value='ordering' className='m-0 space-y-4'>
            <RestaurantOrderingForm
              profile={profile}
              onUpdate={updateProfile}
            />
          </TabsContent>
        </Tabs>

        <div className='flex justify-end space-x-2 border-t pt-4'>
          <Button variant='outline' onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
