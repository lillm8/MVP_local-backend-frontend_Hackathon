// Product mutation hooks

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productRepository } from '@/lib/data/repositories/products/product-repository';
import { QUERY_KEYS } from '@/constants';
import { Product } from '@/types';

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) =>
      productRepository.create(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      product,
    }: {
      id: string;
      product: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>;
    }) => productRepository.update(id, product),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCT_DETAIL(id),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productRepository.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCT_DETAIL(id),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
    },
  });
}
