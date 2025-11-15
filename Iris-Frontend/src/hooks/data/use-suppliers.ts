import { useQuery } from '@tanstack/react-query';
import { getMockSuppliers } from '@/tests/mocks/mock-data';
import { QUERY_KEYS } from '@/constants';

export function useSuppliers() {
  return useQuery({
    queryKey: QUERY_KEYS.SUPPLIERS,
    queryFn: () => getMockSuppliers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSupplier(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.SUPPLIER_DETAIL(id),
    queryFn: () => {
      const suppliers = getMockSuppliers();
      const supplier = suppliers.find(s => s.id === id);
      if (!supplier) {
        throw new Error(`Supplier with id ${id} not found`);
      }
      return supplier;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
