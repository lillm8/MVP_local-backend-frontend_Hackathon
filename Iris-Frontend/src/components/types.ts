// Presentation-layer UI prop types
import { Product } from '@/types/products';
import { Order } from '@/types/orders';
import type { CartItem as DomainCartItem } from '@/types/cart/cart';

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
  showSupplier?: boolean;
}

export interface ProductListProps {
  products: Product[];
  loading?: boolean;
  onProductClick: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleFavorite?: (productId: string) => void;
  favorites?: string[];
}

export interface ProducerCardProps {
  name: string;
  image: string;
  distance: string;
  rating: number;
  verified?: boolean;
  category?: string;
  onClick?: () => void;
}

export interface OrderCardProps {
  order: Order;
  onViewDetails: (orderId: string) => void;
  onUpdateStatus?: (orderId: string, status: string) => void;
  showActions?: boolean;
}

export interface OrderListProps {
  orders: Order[];
  loading?: boolean;
  onOrderClick: (orderId: string) => void;
  onUpdateStatus?: (orderId: string, status: string) => void;
  showActions?: boolean;
}

export interface CartItemProps {
  item: DomainCartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export interface CartSummaryProps {
  items: DomainCartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  onCheckout: () => void;
  onClearCart: () => void;
}

export interface DashboardStatsProps {
  stats: {
    totalOrders: number;
    totalRevenue: number;
    activeSuppliers: number;
    pendingOrders: number;
  };
  loading?: boolean;
}

export interface DashboardChartProps {
  data: any[];
  type: 'line' | 'bar' | 'pie' | 'area';
  title?: string;
  height?: number;
}
