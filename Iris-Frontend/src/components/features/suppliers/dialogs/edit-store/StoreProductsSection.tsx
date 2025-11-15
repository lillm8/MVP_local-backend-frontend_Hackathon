'use client';

import { Button } from '@components/ui/button';
import { Plus } from 'lucide-react';
import { Product, ProductFormData } from '@/types/suppliers/edit-store/types';
import { ProductCard } from './components/ProductCard';
import { ProductFormDialog } from './components/ProductFormDialog';
import { EmptyProductsState } from './components/EmptyProductsState';
import { useStoreProducts } from './hooks/use-store-products';

export interface StoreProductsSectionProps {
  products: Product[];
  onAddProduct: (product: ProductFormData) => void;
  onEditProduct: (productId: number) => void;
  onDeleteProduct: (productId: number) => void;
  onUpdateProduct: (productId: number, product: ProductFormData) => void;
}

export function StoreProductsSection({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onUpdateProduct,
}: StoreProductsSectionProps) {
  const {
    isAddProductOpen,
    setIsAddProductOpen,
    editingProduct,
    newProduct,
    setNewProduct,
    handleAddProduct,
    handleEditProduct,
    handleUpdateProduct,
    handleCancel,
    isEditing,
  } = useStoreProducts({
    products,
    onAddProduct,
    onEditProduct,
    onDeleteProduct,
    onUpdateProduct,
  });

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Products</h3>
        <Button onClick={() => setIsAddProductOpen(true)}>
          <Plus className='mr-2 h-4 w-4' />
          Add Product
        </Button>
      </div>

      {products.length === 0 ? (
        <EmptyProductsState onAddProduct={() => setIsAddProductOpen(true)} />
      ) : (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEditProduct}
              onDelete={onDeleteProduct}
            />
          ))}
        </div>
      )}

      <ProductFormDialog
        open={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
        product={newProduct}
        onProductChange={setNewProduct}
        isEditing={isEditing}
        onSave={isEditing ? handleUpdateProduct : handleAddProduct}
        onCancel={handleCancel}
      />
    </div>
  );
}
