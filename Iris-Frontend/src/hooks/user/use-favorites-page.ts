import { useState } from 'react';

export interface FavoriteSupplierItem {
  id: number;
  name: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  category: string;
  totalOrders: number;
  lastOrder: string;
  specialties: string[];
  description: string;
}

export interface FavoriteProductItem {
  id: number;
  name: string;
  supplier: string;
  supplierId: number;
  image: string;
  price: number;
  unit: string;
  inStock: boolean;
  rating: number;
  organic: boolean;
  lastOrdered: string;
}

export interface FavoriteOrderItem {
  id: string;
  supplier: string;
  supplierId: number;
  date: string;
  total: number;
  itemCount: number;
  frequency: string;
  lastOrdered: string;
  items: Array<{ name: string; quantity: string; price: number }>;
}

export function useFavoritesPage() {
  const [favoriteSuppliers, setFavoriteSuppliers] = useState<
    FavoriteSupplierItem[]
  >([
    {
      id: 1,
      name: 'Green Valley Farm',
      image:
        'https://images.unsplash.com/photo-1573481078935-b9605167e06b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmYXJtZXJ8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: '12 km away',
      rating: 4.8,
      reviews: 127,
      verified: true,
      category: 'Organic Vegetables',
      totalOrders: 24,
      lastOrder: '2 weeks ago',
      specialties: ['Heirloom Tomatoes', 'Seasonal Greens', 'Root Vegetables'],
      description:
        'Family-run organic farm specializing in heritage vegetables and sustainable farming practices.',
    },
    {
      id: 2,
      name: 'Mountain Dairy Co.',
      image:
        'https://images.unsplash.com/photo-1722718461923-c69728f7640b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY2hlZXNlJTIwZGFpcnl8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: '8 km away',
      rating: 4.9,
      reviews: 203,
      verified: true,
      category: 'Artisan Dairy',
      totalOrders: 18,
      lastOrder: '1 week ago',
      specialties: ['Aged Cheese', 'Fresh Milk', 'Yogurt'],
      description:
        'Award-winning dairy producer using traditional methods with grass-fed cattle.',
    },
  ]);

  const [favoriteProducts, setFavoriteProducts] = useState<
    FavoriteProductItem[]
  >([
    {
      id: 1,
      name: 'Heirloom Tomatoes',
      supplier: 'Green Valley Farm',
      supplierId: 1,
      image:
        'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400',
      price: 4.5,
      unit: 'kg',
      inStock: true,
      rating: 4.9,
      organic: true,
      lastOrdered: '1 week ago',
    },
    {
      id: 2,
      name: 'Fresh Mozzarella',
      supplier: 'Mountain Dairy Co.',
      supplierId: 2,
      image:
        'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400',
      price: 12.0,
      unit: 'kg',
      inStock: true,
      rating: 4.8,
      organic: false,
      lastOrdered: '2 days ago',
    },
  ]);

  const [favoriteOrders, setFavoriteOrders] = useState<FavoriteOrderItem[]>([
    {
      id: 'ORD-998',
      supplier: 'Green Valley Farm',
      supplierId: 1,
      date: 'Oct 18, 2025',
      total: 156.8,
      itemCount: 8,
      frequency: 'Weekly',
      lastOrdered: '1 week ago',
      items: [{ name: 'Heirloom Tomatoes', quantity: '3 kg', price: 13.5 }],
    },
  ]);

  const removeFavoriteSupplier = (id: number) =>
    setFavoriteSuppliers(prev => prev.filter(s => s.id !== id));
  const removeFavoriteProduct = (id: number) =>
    setFavoriteProducts(prev => prev.filter(p => p.id !== id));
  const removeFavoriteOrder = (id: string) =>
    setFavoriteOrders(prev => prev.filter(o => o.id !== id));

  return {
    favoriteSuppliers,
    setFavoriteSuppliers,
    removeFavoriteSupplier,
    favoriteProducts,
    setFavoriteProducts,
    removeFavoriteProduct,
    favoriteOrders,
    setFavoriteOrders,
    removeFavoriteOrder,
  };
}
