// Custom hook for store form state management

import { useState, useEffect } from 'react';
import {
  StoreFormData,
  ProductFormData,
  Product,
  SupplierInfo,
} from '@/types/suppliers/edit-store/types';

export interface UseStoreFormOptions {
  initialSupplierInfo: SupplierInfo;
  initialProducts: Product[];
}

export function useStoreForm({
  initialSupplierInfo,
  initialProducts,
}: UseStoreFormOptions) {
  const getDefaultFormData = (): StoreFormData => ({
    // Basic Info
    storeName: initialSupplierInfo.name,
    storeCategory: initialSupplierInfo.category,
    location: initialSupplierInfo.location,
    description: initialSupplierInfo.description,

    // Contact Info
    email: initialSupplierInfo.email,
    phone: initialSupplierInfo.phone,
    website: initialSupplierInfo.website,

    // Certifications
    certifications: initialSupplierInfo.certifications,
    newCertification: '',

    // Business Hours (default values)
    mondayOpen: '09:00',
    mondayClose: '17:00',
    tuesdayOpen: '09:00',
    tuesdayClose: '17:00',
    wednesdayOpen: '09:00',
    wednesdayClose: '17:00',
    thursdayOpen: '09:00',
    thursdayClose: '17:00',
    fridayOpen: '09:00',
    fridayClose: '17:00',
    saturdayOpen: '10:00',
    saturdayClose: '16:00',
    sundayOpen: '10:00',
    sundayClose: '16:00',

    // Delivery Settings (default values)
    deliveryRadius: '10',
    deliveryFee: '5.00',
    minOrderAmount: '25.00',
    deliveryTime: '30-45',
    freeDeliveryThreshold: '50.00',
  });

  const [formData, setFormData] = useState<StoreFormData>(getDefaultFormData());

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<ProductFormData>({
    name: '',
    category: 'Vegetables',
    price: '',
    unit: 'kg',
    stock: '',
    description: '',
    imageUrl: '',
  });

  // Update form data when supplier info changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      storeName: initialSupplierInfo.name,
      storeCategory: initialSupplierInfo.category,
      location: initialSupplierInfo.location,
      description: initialSupplierInfo.description,
      email: initialSupplierInfo.email,
      phone: initialSupplierInfo.phone,
      website: initialSupplierInfo.website,
      certifications: initialSupplierInfo.certifications,
    }));
  }, [initialSupplierInfo]);

  const updateFormData = (updates: Partial<StoreFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const addCertification = () => {
    if (formData.newCertification.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, prev.newCertification.trim()],
        newCertification: '',
      }));
    }
  };

  const removeCertification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const createProductFromForm = (formData: ProductFormData): Product => ({
    id: products.length + 1,
    name: formData.name,
    category: formData.category,
    price: parseFloat(formData.price),
    unit: formData.unit,
    stock: parseInt(formData.stock),
    status: parseInt(formData.stock) > 0 ? 'In Stock' : 'Out of Stock',
    image: formData.imageUrl || 'https://via.placeholder.com/150',
    description: formData.description,
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

  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.stock) {
      const product = createProductFromForm(newProduct);
      setProducts(prev => [...prev, product]);
      resetProductForm();
      setIsAddProductOpen(false);
    }
  };

  const editProduct = (productId: number) => {
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

  const updateProduct = () => {
    if (
      editingProduct &&
      newProduct.name &&
      newProduct.price &&
      newProduct.stock
    ) {
      const updatedProduct = createProductFromForm(newProduct);
      setProducts(prev =>
        prev.map(p =>
          p.id === editingProduct
            ? { ...updatedProduct, id: editingProduct }
            : p
        )
      );
      setEditingProduct(null);
      resetProductForm();
      setIsAddProductOpen(false);
    }
  };

  const deleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const resetForm = () => {
    setFormData(getDefaultFormData());
    setProducts(initialProducts);
  };

  const getUpdatedSupplierInfo = (): SupplierInfo => ({
    ...initialSupplierInfo,
    name: formData.storeName,
    category: formData.storeCategory,
    location: formData.location,
    description: formData.description,
    email: formData.email,
    phone: formData.phone,
    website: formData.website,
    certifications: formData.certifications,
  });

  return {
    form: {
      data: formData,
      update: updateFormData,
      certifications: {
        add: addCertification,
        remove: removeCertification,
      },
      reset: resetForm,
      getUpdatedSupplierInfo,
    },
    products: {
      items: products,
      setItems: setProducts,
      editing: editingProduct,
      setEditing: setEditingProduct,
      newProduct,
      setNewProduct,
      isAddOpen: isAddProductOpen,
      setIsAddOpen: setIsAddProductOpen,
      add: addProduct,
      edit: editProduct,
      update: updateProduct,
      delete: deleteProduct,
    },
  };
}
