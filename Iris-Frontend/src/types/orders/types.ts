// Types for Orders Page components

export interface OrderItem {
  name: string;
  quantity: string;
  price: number;
}

interface OrderIdentity {
  id: number | string;
  orderNumber: string;
}

interface OrderSupplierInfo {
  supplier: string;
  supplierId: number;
  supplierPhone: string;
  supplierEmail: string;
}

interface OrderTimingAndTotals {
  date: string;
  total: number;
}

interface OrderStatusInfo {
  status: string;
  statusColor: string;
  progress: number;
}

interface OrderShipmentInfo {
  estimatedDelivery: string;
  trackingNumber: string;
  deliveryAddress: string;
}

interface OrderPaymentInfo {
  paymentStatus: string;
}

interface OrderNotes {
  notes: string;
}

export interface Order
  extends OrderIdentity,
    OrderSupplierInfo,
    OrderTimingAndTotals,
    OrderStatusInfo,
    OrderShipmentInfo,
    OrderPaymentInfo,
    OrderNotes {
  items: OrderItem[];
}

export interface OrdersPageProps {
  onViewSupplier?: (supplierId: string) => void;
}

export interface OrderFilters {
  status: string;
  supplier: string;
  dateRange: string;
  searchTerm: string;
}

export interface OrderListProps {
  orders: Order[];
  expandedOrder: number | string | null;
  favoriteOrderIds: Set<number | string>;
  onToggleExpanded: (orderId: number | string) => void;
  onToggleFavorite: (orderId: number | string) => void;
  onViewSupplier?: (supplierId: string) => void;
}

export interface OrderFiltersProps {
  filters: OrderFilters;
  onFiltersChange: (filters: OrderFilters) => void;
  suppliers: string[];
}

export interface OrderDetailsProps {
  order: Order;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onViewSupplier?: (supplierId: string) => void;
}

export type OrderTab = 'active' | 'completed' | 'reorder' | 'drafts';
