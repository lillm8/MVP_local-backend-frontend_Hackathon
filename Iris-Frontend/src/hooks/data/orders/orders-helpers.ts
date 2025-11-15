import type { Order, OrderFilters, OrderTab } from '@/types/orders/types';

export function getOrdersForTab(
  activeTab: OrderTab,
  sets: {
    activeOrders: Order[];
    completedOrders: Order[];
    reorderSuggestions: Order[];
    draftOrders: Order[];
  }
): Order[] {
  switch (activeTab) {
    case 'active':
      return sets.activeOrders;
    case 'completed':
      return sets.completedOrders;
    case 'reorder':
      return sets.reorderSuggestions;
    case 'drafts':
      return sets.draftOrders;
    default:
      return [];
  }
}

export function filterOrders(orders: Order[], filters: OrderFilters): Order[] {
  const status = filters.status.toLowerCase();
  const supplier = filters.supplier.toLowerCase();
  const search = filters.searchTerm.toLowerCase();

  return orders.filter(order => {
    const matchesStatus =
      status === 'all' || order.status.toLowerCase() === status;
    const matchesSupplier =
      supplier === 'all' || order.supplier.toLowerCase().includes(supplier);
    const matchesSearch =
      !search ||
      order.orderNumber.toLowerCase().includes(search) ||
      order.supplier.toLowerCase().includes(search);
    return matchesStatus && matchesSupplier && matchesSearch;
  });
}

export function collectSuppliers(orderSets: Array<Order[]>): string[] {
  const allOrders = orderSets.flat();
  const suppliers = new Set(allOrders.map(o => o.supplier));
  return Array.from(suppliers).sort();
}
