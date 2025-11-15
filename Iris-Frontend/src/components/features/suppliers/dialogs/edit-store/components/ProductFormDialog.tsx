'use client';

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { ProductFormData } from '@/types/suppliers/edit-store/types';

export interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductFormData;
  onProductChange: (product: ProductFormData) => void;
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
  onProductChange,
  isEditing,
  onSave,
  onCancel,
}: ProductFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update the product information below.'
              : 'Add a new product to your store catalog.'}
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <Label htmlFor='name'>Product Name</Label>
            <Input
              id='name'
              value={product.name}
              onChange={e =>
                onProductChange({ ...product, name: e.target.value })
              }
              placeholder='Enter product name'
            />
          </div>
          <div>
            <Label htmlFor='category'>Category</Label>
            <Select
              value={product.category}
              onValueChange={value =>
                onProductChange({ ...product, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Vegetables'>Vegetables</SelectItem>
                <SelectItem value='Fruits'>Fruits</SelectItem>
                <SelectItem value='Dairy'>Dairy</SelectItem>
                <SelectItem value='Meat'>Meat</SelectItem>
                <SelectItem value='Bakery'>Bakery</SelectItem>
                <SelectItem value='Beverages'>Beverages</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='price'>Price</Label>
              <Input
                id='price'
                type='number'
                step='0.01'
                value={product.price}
                onChange={e =>
                  onProductChange({ ...product, price: e.target.value })
                }
                placeholder='0.00'
              />
            </div>
            <div>
              <Label htmlFor='unit'>Unit</Label>
              <Select
                value={product.unit}
                onValueChange={value =>
                  onProductChange({ ...product, unit: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='kg'>kg</SelectItem>
                  <SelectItem value='lb'>lb</SelectItem>
                  <SelectItem value='piece'>piece</SelectItem>
                  <SelectItem value='bunch'>bunch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor='stock'>Stock Quantity</Label>
            <Input
              id='stock'
              type='number'
              value={product.stock}
              onChange={e =>
                onProductChange({ ...product, stock: e.target.value })
              }
              placeholder='0'
            />
          </div>
          <div>
            <Label htmlFor='description'>Description (optional)</Label>
            <Input
              id='description'
              value={product.description}
              onChange={e =>
                onProductChange({ ...product, description: e.target.value })
              }
              placeholder='Enter product description'
            />
          </div>
          <div>
            <Label htmlFor='imageUrl'>Image URL (optional)</Label>
            <Input
              id='imageUrl'
              value={product.imageUrl}
              onChange={e =>
                onProductChange({ ...product, imageUrl: e.target.value })
              }
              placeholder='https://example.com/image.jpg'
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            {isEditing ? 'Update Product' : 'Add Product'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
