// Types for Supplier Dashboard components

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  status: string;
  image: string;
  sales: number;
  revenue: string;
}

interface NewProductForm {
  name: string;
  category: string;
  price: string;
  unit: string;
  stock: string;
  imageUrl: string;
}

interface SupplierInfoForm {
  name: string;
  category: string;
  location: string;
  description: string;
  email: string;
  phone: string;
  website: string;
}

interface SupplierInfo {
  name: string;
  category: string;
  location: string;
  verified: boolean;
  rating: number;
  totalReviews: number;
  memberSince: string;
  description: string;
  certifications: string[];
  email: string;
  phone: string;
  website: string;
}

interface StatCard {
  label: string;
  value: string;
  change: string;
  icon: any;
  trend: 'up' | 'down';
}

interface Order {
  id: string;
  restaurant: string;
  items: number;
  total: string;
  status: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

interface Customer {
  id: string;
  name: string;
  location: string;
  orders: number;
  totalSpent: string;
  lastOrder: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

interface SupplierDashboardProps {
  onLogout: () => void;
}

type DashboardTab =
  | 'dashboard'
  | 'products'
  | 'orders'
  | 'customers'
  | 'discover'
  | 'messages'
  | 'analytics'
  | 'profile'
  | 'settings';

export type {
  Product,
  NewProductForm,
  SupplierInfoForm,
  SupplierInfo,
  StatCard,
  Order,
  Customer,
  SupplierDashboardProps,
  DashboardTab,
};
