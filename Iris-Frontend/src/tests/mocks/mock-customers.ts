interface Customer {
  id: string;
  name: string;
  location: string;
  orders: number;
  totalSpent: string;
  lastOrder: string;
  status: 'active' | 'inactive';
}

export const MOCK_SUPPLIER_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Bella Vista Restaurant',
    location: 'Downtown',
    orders: 24,
    totalSpent: '€2,340.50',
    lastOrder: '2024-01-15',
    status: 'active',
  },
  {
    id: 'CUST-002',
    name: 'Café Moderno',
    location: 'Midtown',
    orders: 18,
    totalSpent: '€1,890.20',
    lastOrder: '2024-01-14',
    status: 'active',
  },
  {
    id: 'CUST-003',
    name: 'The Garden Bistro',
    location: 'Uptown',
    orders: 31,
    totalSpent: '€3,120.80',
    lastOrder: '2024-01-13',
    status: 'active',
  },
];

export function getMockSupplierCustomers(): Customer[] {
  return MOCK_SUPPLIER_CUSTOMERS;
}
