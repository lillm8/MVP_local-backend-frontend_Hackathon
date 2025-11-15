'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@lib/data/repositories/client';

// Generic data fetching hook
export function useData<T>(
  queryKey: string[],
  endpoint: string,
  options?: {
    enabled?: boolean;
    staleTime?: number;
  }
) {
  return useQuery({
    queryKey,
    queryFn: () => apiClient.get<T>(endpoint),
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime,
  });
}

// Generic mutation hook
export function useDataMutation<T, V>(
  mutationFn: (data: V) => Promise<T>,
  invalidateQueries?: string[][]
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      // Invalidate related queries
      invalidateQueries?.forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
  });
}

// Cache management hooks
export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () => queryClient.invalidateQueries(),
    invalidateByKey: (queryKey: string[]) =>
      queryClient.invalidateQueries({ queryKey }),
    removeQueries: (queryKey: string[]) =>
      queryClient.removeQueries({ queryKey }),
  };
}
