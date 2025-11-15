'use client';

import { useState } from 'react';
import {
  FormLayout,
  FormSection,
  FormActions,
  FormField,
  FormInput,
  FormTextarea,
  FormSelect,
  FormSelectItem,
  FormButton,
  validateForm,
  commonRules,
} from '../index';

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price: string;
  quantity: string;
  supplier: string;
  isAvailable: boolean;
}

const initialData: ProductFormData = {
  name: '',
  description: '',
  category: '',
  price: '',
  quantity: '',
  supplier: '',
  isAvailable: true,
};

const validationRules = {
  name: commonRules.name,
  description: commonRules.description,
  category: commonRules.required,
  price: commonRules.price,
  quantity: commonRules.quantity,
  supplier: commonRules.required,
};

export function ProductForm() {
  const [formData, setFormData] = useState<ProductFormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange =
    (field: keyof ProductFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        e.target.type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : e.target.value;

      setFormData(prev => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm(formData, validationRules);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Product created:', formData);
      // Reset form
      setFormData(initialData);
      setErrors({});
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title='Add New Product'
      description='Create a new product for your catalog'
    >
      <form onSubmit={handleSubmit} className='space-y-6'>
        <FormSection title='Basic Information'>
          <FormField label='Product Name' error={errors.name} required>
            <FormInput
              value={formData.name}
              onChange={handleInputChange('name')}
              placeholder='Enter product name'
              error={!!errors.name}
            />
          </FormField>

          <FormField label='Description' error={errors.description}>
            <FormTextarea
              value={formData.description}
              onChange={handleInputChange('description')}
              placeholder='Enter product description'
              rows={3}
              error={!!errors.description}
            />
          </FormField>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField label='Category' error={errors.category} required>
              <FormSelect
                value={formData.category}
                onValueChange={value =>
                  setFormData(prev => ({ ...prev, category: value }))
                }
                placeholder='Select category'
                error={!!errors.category}
              >
                <FormSelectItem value='produce'>Produce</FormSelectItem>
                <FormSelectItem value='meat'>Meat</FormSelectItem>
                <FormSelectItem value='dairy'>Dairy</FormSelectItem>
                <FormSelectItem value='beverages'>Beverages</FormSelectItem>
                <FormSelectItem value='pantry'>Pantry</FormSelectItem>
              </FormSelect>
            </FormField>

            <FormField label='Supplier' error={errors.supplier} required>
              <FormSelect
                value={formData.supplier}
                onValueChange={value =>
                  setFormData(prev => ({ ...prev, supplier: value }))
                }
                placeholder='Select supplier'
                error={!!errors.supplier}
              >
                <FormSelectItem value='fresh-farms'>
                  Fresh Farms Co.
                </FormSelectItem>
                <FormSelectItem value='organic-valley'>
                  Organic Valley
                </FormSelectItem>
                <FormSelectItem value='local-harvest'>
                  Local Harvest
                </FormSelectItem>
                <FormSelectItem value='green-fields'>
                  Green Fields
                </FormSelectItem>
              </FormSelect>
            </FormField>
          </div>
        </FormSection>

        <FormSection title='Pricing & Inventory'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField label='Price ($)' error={errors.price} required>
              <FormInput
                type='number'
                step='0.01'
                min='0'
                value={formData.price}
                onChange={handleInputChange('price')}
                placeholder='0.00'
                error={!!errors.price}
              />
            </FormField>

            <FormField label='Quantity' error={errors.quantity} required>
              <FormInput
                type='number'
                min='1'
                value={formData.quantity}
                onChange={handleInputChange('quantity')}
                placeholder='0'
                error={!!errors.quantity}
              />
            </FormField>
          </div>

          <FormField label='Availability'>
            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                checked={formData.isAvailable}
                onChange={handleInputChange('isAvailable')}
                className='rounded border-gray-300'
              />
              <label className='text-sm font-medium'>
                Product is available for purchase
              </label>
            </div>
          </FormField>
        </FormSection>

        <FormActions>
          <FormButton type='button' variant='outline'>
            Cancel
          </FormButton>
          <FormButton type='submit' loading={isSubmitting}>
            Create Product
          </FormButton>
        </FormActions>
      </form>
    </FormLayout>
  );
}
