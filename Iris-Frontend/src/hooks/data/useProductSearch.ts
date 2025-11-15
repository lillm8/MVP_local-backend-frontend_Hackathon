// Product search hooks

import { useQuery } from '@tanstack/react-query';
import { productRepository } from '@/lib/data/repositories/products/product-repository';
import { QUERY_KEYS } from '@/constants';
import { ProductFilters, ProductSearchParams } from '@/lib/data/types';

export function useProductSearch(
  filters: ProductFilters,
  params?: Omit<ProductSearchParams, 'filters'>
) {
  return useQuery({
    queryKey: [...QUERY_KEYS.PRODUCTS, 'search', filters, params],
    queryFn: () => productRepository.search(filters, params),
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
}

export function useProductCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCT_CATEGORIES,
    queryFn: () => productRepository.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}
