import { useState, useMemo } from 'react';
import { getMockSuppliers } from '@/tests/mocks/mock-data';

export interface SupplierFilters {
  searchQuery: string;
  businessType: string;
  isVerified: boolean | null;
  minRating: number;
  maxDistance: number;
}

export function useSupplierFilters() {
  const [filters, setFilters] = useState<SupplierFilters>({
    searchQuery: '',
    businessType: 'all',
    isVerified: null,
    minRating: 0,
    maxDistance: 50,
  });

  const suppliers = getMockSuppliers();

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(supplier => {
      // Search query filter
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        const matchesSearch =
          supplier.name.toLowerCase().includes(searchLower) ||
          (supplier.description?.toLowerCase().includes(searchLower) ??
            false) ||
          supplier.businessType.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      // Business type filter
      if (filters.businessType !== 'all') {
        if (
          supplier.businessType.toLowerCase() !==
          filters.businessType.toLowerCase()
        ) {
          return false;
        }
      }

      // Verification filter
      if (filters.isVerified !== null) {
        if (supplier.isVerified !== filters.isVerified) {
          return false;
        }
      }

      // Rating filter
      if (supplier.rating < filters.minRating) {
        return false;
      }

      // Distance filter (mock implementation)
      const mockDistance = Math.random() * 50; // Mock distance calculation
      if (mockDistance > filters.maxDistance) {
        return false;
      }

      return true;
    });
  }, [filters, suppliers]);

  const updateFilter = <K extends keyof SupplierFilters>(
    key: K,
    value: SupplierFilters[K]
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      businessType: 'all',
      isVerified: null,
      minRating: 0,
      maxDistance: 50,
    });
  };

  return {
    filters,
    filteredSuppliers,
    updateFilter,
    clearFilters,
  };
}
