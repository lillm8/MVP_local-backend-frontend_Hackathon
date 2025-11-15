import { useMemo, useState } from 'react';
import type {
  Product,
  NewProductForm,
} from '@/types/suppliers/supplier-dashboard/types';

export function useSupplierProductsTab(initialProducts: Product[]) {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [newProduct, setNewProduct] = useState<NewProductForm>({
    name: '',
    category: 'Vegetables',
    price: '',
    unit: 'kg',
    stock: '',
    imageUrl: '',
  });

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === 'all' || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [initialProducts, searchTerm, categoryFilter]);

  const resetNewProduct = () =>
    setNewProduct({
      name: '',
      category: 'Vegetables',
      price: '',
      unit: 'kg',
      stock: '',
      imageUrl: '',
    });

  return {
    // dialog/editing
    isAddProductOpen,
    setIsAddProductOpen,
    editingProduct,
    setEditingProduct,
    // filters
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    // products
    filteredProducts,
    // new form
    newProduct,
    setNewProduct,
    resetNewProduct,
  };
}
