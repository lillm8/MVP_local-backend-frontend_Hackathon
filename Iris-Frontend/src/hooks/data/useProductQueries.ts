// Product query hooks for specific use cases

import { useQuery } from '@tanstack/react-query';
import { productRepository } from '@/lib/data/repositories/products/product-repository';
import { QUERY_KEYS } from '@/constants';
import { ProductSearchParams } from '@/lib/data/types';

export function useFeaturedProducts(limit = 10) {
  return useQuery({
    queryKey: [...QUERY_KEYS.PRODUCTS, 'featured', limit],
    queryFn: () => productRepository.getFeatured(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useProductsBySupplier(
  supplierId: string,
  params?: Omit<ProductSearchParams, 'filters'>
) {
  return useQuery({
    queryKey: [...QUERY_KEYS.SUPPLIER_PRODUCTS(supplierId), params],
    queryFn: () => productRepository.getBySupplier(supplierId, params),
    enabled: !!supplierId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProductsByCategory(
  category: string,
  params?: Omit<ProductSearchParams, 'filters'>
) {
  return useQuery({
    queryKey: [...QUERY_KEYS.PRODUCTS, 'category', category, params],
    queryFn: () => productRepository.getByCategory(category, params),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProductsByPriceRange(
  minPrice: number,
  maxPrice: number,
  params?: Omit<ProductSearchParams, 'filters'>
) {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.PRODUCTS,
      'price-range',
      minPrice,
      maxPrice,
      params,
    ],
    queryFn: () =>
      productRepository.getByPriceRange(minPrice, maxPrice, params),
    staleTime: 2 * 60 * 1000,
  });
}

export function useProductsByTags(
  tags: string[],
  params?: Omit<ProductSearchParams, 'filters'>
) {
  return useQuery({
    queryKey: [...QUERY_KEYS.PRODUCTS, 'tags', tags, params],
    queryFn: () => productRepository.getByTags(tags, params),
    enabled: tags.length > 0,
    staleTime: 2 * 60 * 1000,
  });
}
