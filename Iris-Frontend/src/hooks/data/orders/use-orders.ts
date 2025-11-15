// Custom hook for orders state management

import { useState } from 'react';
import { Order, OrderFilters, OrderTab } from '@/types/orders/types';
import {
  getOrdersForTab,
  filterOrders,
  collectSuppliers,
} from './orders-helpers';
// Using local mock data to avoid test imports in production build

export function useOrders() {
  const [activeTab, setActiveTab] = useState<OrderTab>('active');
  const [expandedOrder, setExpandedOrder] = useState<number | string | null>(
    null
  );
  const [favoriteOrderIds, setFavoriteOrderIds] = useState<
    Set<number | string>
  >(new Set(['ORD-998', 'ORD-985']));
  const [filters, setFilters] = useState<OrderFilters>({
    status: 'all',
    supplier: 'all',
    dateRange: 'all',
    searchTerm: '',
  });

  const activeOrders: Order[] = [];
  const completedOrders: Order[] = [];
  const reorderSuggestions: Order[] = [];
  const draftOrders: Order[] = [];

  const getCurrentOrders = (): Order[] =>
    getOrdersForTab(activeTab, {
      activeOrders,
      completedOrders,
      reorderSuggestions,
      draftOrders,
    });

  const getFilteredOrders = (): Order[] =>
    filterOrders(getCurrentOrders(), filters);

  const toggleExpanded = (orderId: number | string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const toggleFavorite = (orderId: number | string) => {
    setFavoriteOrderIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const updateFilters = (newFilters: Partial<OrderFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getSuppliers = (): string[] =>
    collectSuppliers([
      activeOrders,
      completedOrders,
      reorderSuggestions,
      draftOrders,
    ]);

  return {
    // State
    activeTab,
    setActiveTab,
    expandedOrder,
    favoriteOrderIds,
    filters,

    // Data
    activeOrders,
    completedOrders,
    reorderSuggestions,
    draftOrders,

    // Computed
    getCurrentOrders,
    getFilteredOrders,
    getSuppliers,

    // Actions
    toggleExpanded,
    toggleFavorite,
    updateFilters,
  };
}
