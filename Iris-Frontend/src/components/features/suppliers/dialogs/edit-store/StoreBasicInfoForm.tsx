// Basic info form component for edit store dialog

import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { StoreFormData } from '@/types/suppliers/edit-store/types';

interface StoreBasicInfoFormProps {
  formData: StoreFormData;
  onUpdate: (updates: Partial<StoreFormData>) => void;
}

export function StoreBasicInfoForm({
  formData,
  onUpdate,
}: StoreBasicInfoFormProps) {
  return (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='storeName'>Store Name</Label>
        <Input
          id='storeName'
          value={formData.storeName}
          onChange={e => onUpdate({ storeName: e.target.value })}
          placeholder='Enter store name'
        />
      </div>

      <div>
        <Label htmlFor='storeCategory'>Category</Label>
        <Select
          value={formData.storeCategory}
          onValueChange={value => onUpdate({ storeCategory: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select category' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Organic Vegetables'>
              Organic Vegetables
            </SelectItem>
            <SelectItem value='Fresh Produce'>Fresh Produce</SelectItem>
            <SelectItem value='Dairy Products'>Dairy Products</SelectItem>
            <SelectItem value='Meat & Poultry'>Meat & Poultry</SelectItem>
            <SelectItem value='Bakery Items'>Bakery Items</SelectItem>
            <SelectItem value='Beverages'>Beverages</SelectItem>
            <SelectItem value='Pantry Staples'>Pantry Staples</SelectItem>
            <SelectItem value='Frozen Foods'>Frozen Foods</SelectItem>
            <SelectItem value='Specialty Foods'>Specialty Foods</SelectItem>
            <SelectItem value='Other'>Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor='location'>Location</Label>
        <Input
          id='location'
          value={formData.location}
          onChange={e => onUpdate({ location: e.target.value })}
          placeholder='Enter store location'
        />
      </div>

      <div>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          id='description'
          value={formData.description}
          onChange={e => onUpdate({ description: e.target.value })}
          placeholder='Describe your store and what makes it unique'
          rows={4}
        />
      </div>
    </div>
  );
}
