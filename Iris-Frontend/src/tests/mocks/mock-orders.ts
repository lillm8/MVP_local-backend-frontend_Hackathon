interface Order {
  id: string;
  restaurant: string;
  items: number;
  total: string;
  status: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
}

export const MOCK_SUPPLIER_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    restaurant: 'Bella Vista Restaurant',
    items: 8,
    total: '€156.80',
    status: 'Processing',
    date: '2024-01-15',
    priority: 'high',
  },
  {
    id: 'ORD-002',
    restaurant: 'Café Moderno',
    items: 5,
    total: '€89.50',
    status: 'Shipped',
    date: '2024-01-14',
    priority: 'medium',
  },
  {
    id: 'ORD-003',
    restaurant: 'The Garden Bistro',
    items: 12,
    total: '€234.60',
    status: 'Delivered',
    date: '2024-01-13',
    priority: 'low',
  },
];

export function getMockSupplierOrders(): Order[] {
  return MOCK_SUPPLIER_ORDERS;
}
