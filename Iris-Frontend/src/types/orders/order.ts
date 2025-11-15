// Order-related entities

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: { lat: number; lng: number };
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  RETURNED = 'returned',
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  unit: string;
}

// Order pricing information
export interface OrderPricing {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
}

// Order delivery information
export interface OrderDelivery {
  deliveryAddress: Address;
  deliveryDate: string;
  deliveryTime: string;
  notes?: string;
}

// Base order interface
interface BaseOrder {
  id: string;
  restaurantId: string;
  supplierId: string;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

// Complete order interface combining all aspects
export interface Order extends BaseOrder, OrderPricing, OrderDelivery {}
