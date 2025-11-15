// Main Edit Store Dialog component - refactored orchestrator

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
  Store,
  MapPin,
  Phone,
  Mail,
  Package,
  Award,
  Clock,
  Truck,
} from 'lucide-react';
import { useStoreForm } from '@/hooks/data/suppliers/use-store-form';
import { StoreBasicInfoForm } from './StoreBasicInfoForm';
import { StoreContactForm } from './StoreContactForm';
import { StoreProductsSection } from './StoreProductsSection';
import { StoreCertificationsForm } from './StoreCertificationsForm';
import { StoreBusinessHoursForm } from './StoreBusinessHoursForm';
import { StoreDeliveryForm } from './StoreDeliveryForm';
import {
  EditStoreDialogProps,
  StoreTab,
} from '@/types/suppliers/edit-store/types';

export function EditStoreDialog({
  open,
  onOpenChange,
  supplierInfo,
  products,
  onSave,
}: EditStoreDialogProps) {
  const [activeTab, setActiveTab] = useState<StoreTab>('basic');

  const { form, products: productsState } = useStoreForm({
    initialSupplierInfo: supplierInfo,
    initialProducts: products,
  });

  const handleSave = () => {
    const updatedSupplierInfo = form.getUpdatedSupplierInfo();
    onSave(updatedSupplierInfo, productsState.items);
    onOpenChange(false);
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Store },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'hours', label: 'Business Hours', icon: Clock },
    { id: 'delivery', label: 'Delivery', icon: Truck },
  ] as const;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] max-w-4xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Edit Store Information</DialogTitle>
          <DialogDescription>
            Update your store details, products, and business settings.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={value => setActiveTab(value as StoreTab)}
        >
          <TabsList className='grid w-full grid-cols-6'>
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
            <StoreBasicInfoForm formData={form.data} onUpdate={form.update} />
          </TabsContent>

          <TabsContent value='contact' className='m-0 space-y-4'>
            <StoreContactForm formData={form.data} onUpdate={form.update} />
          </TabsContent>

          <TabsContent value='products' className='m-0 space-y-4'>
            <StoreProductsSection
              products={productsState.items}
              onAddProduct={productsState.add}
              onEditProduct={productsState.edit}
              onDeleteProduct={productsState.delete}
              onUpdateProduct={productsState.update}
            />
          </TabsContent>

          <TabsContent value='certifications' className='m-0 space-y-4'>
            <StoreCertificationsForm
              formData={form.data}
              onUpdate={form.update}
              onAddCertification={form.certifications.add}
              onRemoveCertification={form.certifications.remove}
            />
          </TabsContent>

          <TabsContent value='hours' className='m-0 space-y-4'>
            <StoreBusinessHoursForm
              formData={form.data}
              onUpdate={form.update}
            />
          </TabsContent>

          <TabsContent value='delivery' className='m-0 space-y-4'>
            <StoreDeliveryForm formData={form.data} onUpdate={form.update} />
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
