// Custom hook for supplier dashboard state management

import { useState } from 'react';
import {
  Product,
  NewProductForm,
  SupplierInfo,
  SupplierInfoForm,
  Order,
  Customer,
  DashboardTab,
} from '@/types/suppliers/supplier-dashboard/types';
import { getMockProducts } from '@/tests/mocks/mock-products';
import { getMockSupplierOrders } from '@/tests/mocks/mock-orders';
import { getMockSupplierCustomers } from '@/tests/mocks/mock-customers';

export function useSupplierDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditStoreOpen, setIsEditStoreOpen] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [viewingRestaurantId, setViewingRestaurantId] = useState<string | null>(
    null
  );

  const [newProduct, setNewProduct] = useState<NewProductForm>({
    name: '',
    category: 'Vegetables',
    price: '',
    unit: 'kg',
    stock: '',
    imageUrl: '',
  });

  // Mock supplier data
  const [supplierInfo, setSupplierInfo] = useState<SupplierInfo>({
    name: 'Green Valley Farm',
    category: 'Organic Vegetables',
    location: 'Valley Ridge, 12 km from city center',
    verified: true,
    rating: 4.8,
    totalReviews: 127,
    memberSince: 'March 2022',
    description:
      'Family-run organic farm specializing in heritage vegetables and sustainable farming practices. We use traditional methods passed down through generations.',
    certifications: ['Organic Certified', 'Local Producer', 'Traceable'],
    email: 'contact@greenvalleyfarm.com',
    phone: '+1 (555) 123-4567',
    website: 'www.greenvalleyfarm.com',
  });

  const [editStoreForm, setEditStoreForm] = useState<SupplierInfoForm>({
    name: supplierInfo.name,
    category: supplierInfo.category,
    location: supplierInfo.location,
    description: supplierInfo.description,
    email: supplierInfo.email,
    phone: supplierInfo.phone,
    website: supplierInfo.website,
  });

  // Mock products data
  const [products, setProducts] = useState<Product[]>(
    getMockProducts()
      .slice(0, 6)
      .map((p, idx) => ({
        id: idx + 1,
        name: p.name,
        category: 'Vegetables',
        price: p.price,
        unit: p.unit,
        stock: (p as any).stockQuantity ?? 100,
        status:
          ((p as any).stockQuantity ?? 100) > 0 ? 'In Stock' : 'Out of Stock',
        image: p.image || '',
        sales: 0,
        revenue: '€0.00',
      }))
  );

  // Mock orders data
  const [orders] = useState<Order[]>(getMockSupplierOrders());

  // Mock customers data
  const [customers] = useState<Customer[]>(getMockSupplierCustomers());

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.stock) {
      const product: Product = {
        id: products.length + 1,
        name: newProduct.name,
        category: newProduct.category,
        price: parseFloat(newProduct.price),
        unit: newProduct.unit,
        stock: parseInt(newProduct.stock),
        status: parseInt(newProduct.stock) > 0 ? 'In Stock' : 'Out of Stock',
        image: newProduct.imageUrl || 'https://via.placeholder.com/150',
        sales: 0,
        revenue: '€0.00',
      };
      setProducts([...products, product]);
      setNewProduct({
        name: '',
        category: 'Vegetables',
        price: '',
        unit: 'kg',
        stock: '',
        imageUrl: '',
      });
      setIsAddProductOpen(false);
    }
  };

  const handleEditProduct = (productId: number) => {
    setEditingProduct(productId);
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleUpdateProduct = (
    productId: number,
    updatedProduct: Partial<Product>
  ) => {
    setProducts(
      products.map(p => (p.id === productId ? { ...p, ...updatedProduct } : p))
    );
    setEditingProduct(null);
  };

  const handleUpdateSupplierInfo = (updatedInfo: Partial<SupplierInfo>) => {
    setSupplierInfo({ ...supplierInfo, ...updatedInfo });
    setEditStoreForm({ ...editStoreForm, ...updatedInfo });
  };

  return {
    ui: {
      activeTab,
      setActiveTab,
      editingProduct,
      setEditingProduct,
      isAddProductOpen,
      setIsAddProductOpen,
      isEditStoreOpen,
      setIsEditStoreOpen,
      expandedOrderId,
      setExpandedOrderId,
      viewingRestaurantId,
      setViewingRestaurantId,
    },
    products: {
      items: products,
      setItems: setProducts,
      newProduct,
      setNewProduct,
      handleAdd: handleAddProduct,
      handleEdit: handleEditProduct,
      handleDelete: handleDeleteProduct,
      handleUpdate: handleUpdateProduct,
    },
    supplier: {
      info: supplierInfo,
      setInfo: setSupplierInfo,
      editForm: editStoreForm,
      setEditForm: setEditStoreForm,
      handleUpdate: handleUpdateSupplierInfo,
    },
    data: {
      orders,
      customers,
    },
  };
}
