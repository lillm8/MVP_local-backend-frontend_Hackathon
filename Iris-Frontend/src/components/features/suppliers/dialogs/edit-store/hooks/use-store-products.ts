'use client';

import { useState } from 'react';
import { Product, ProductFormData } from '@/types/suppliers/edit-store/types';

export interface UseStoreProductsOptions {
  products: Product[];
  onAddProduct: (product: ProductFormData) => void;
  onEditProduct: (productId: number) => void;
  onDeleteProduct: (productId: number) => void;
  onUpdateProduct: (productId: number, product: ProductFormData) => void;
}

export function useStoreProducts({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onUpdateProduct,
}: UseStoreProductsOptions) {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [newProduct, setNewProduct] = useState<ProductFormData>({
    name: '',
    category: 'Vegetables',
    price: '',
    unit: 'kg',
    stock: '',
    description: '',
    imageUrl: '',
  });

  const resetProductForm = () => {
    setNewProduct({
      name: '',
      category: 'Vegetables',
      price: '',
      unit: 'kg',
      stock: '',
      description: '',
      imageUrl: '',
    });
  };

  const handleAddProduct = () => {
    onAddProduct(newProduct);
    resetProductForm();
    setIsAddProductOpen(false);
  };

  const handleEditProduct = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setNewProduct({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        unit: product.unit,
        stock: product.stock.toString(),
        description: product.description || '',
        imageUrl: product.image,
      });
      setEditingProduct(productId);
      setIsAddProductOpen(true);
    }
  };

  const handleUpdateProduct = () => {
    if (editingProduct) {
      onUpdateProduct(editingProduct, newProduct);
      setEditingProduct(null);
      resetProductForm();
      setIsAddProductOpen(false);
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    resetProductForm();
    setIsAddProductOpen(false);
  };

  return {
    isAddProductOpen,
    setIsAddProductOpen,
    editingProduct,
    newProduct,
    setNewProduct,
    handleAddProduct,
    handleEditProduct,
    handleUpdateProduct,
    handleCancel,
    isEditing: editingProduct !== null,
  };
}
