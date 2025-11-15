// Basic product hooks

import { useQuery } from '@tanstack/react-query';
import { productRepository } from '@/lib/data/repositories/products/product-repository';
import { QUERY_KEYS } from '@/constants';
import { ProductSearchParams } from '@/lib/data/types';

export function useProducts(params?: ProductSearchParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.PRODUCTS, params],
    queryFn: () => productRepository.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCT_DETAIL(id),
    queryFn: () => productRepository.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
