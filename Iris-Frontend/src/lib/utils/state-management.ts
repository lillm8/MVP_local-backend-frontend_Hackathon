// State management utilities
// Centralized state management patterns and utilities

import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Generic state management hook with loading and error states
 */
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  hasError: boolean;
}

interface AsyncStateActions<T> {
  setData: (data: T | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
  execute: (asyncFn: () => Promise<T>) => Promise<T | null>;
}

/**
 * Hook for managing async state
 */
function useAsyncState<T>(
  initialData: T | null = null
): AsyncState<T> & AsyncStateActions<T> {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const reset = useCallback(() => {
    setData(initialData);
    setLoading(false);
    setError(null);
  }, [initialData]);

  const execute = useCallback(
    async (asyncFn: () => Promise<T>): Promise<T | null> => {
      if (!isMountedRef.current) return null;

      setLoading(true);
      setError(null);

      try {
        const result = await asyncFn();
        if (isMountedRef.current) {
          setData(result);
          setLoading(false);
        }
        return result;
      } catch (err) {
        if (isMountedRef.current) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
          setLoading(false);
        }
        return null;
      }
    },
    []
  );

  return {
    data,
    loading,
    error,
    hasError: error !== null,
    setData,
    setLoading,
    setError,
    reset,
    execute,
  };
}

/**
 * Pagination state management
 */
interface PaginationState {
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface PaginationActions {
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setTotal: (total: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  reset: () => void;
}

function usePagination(initialLimit = 10): PaginationState & PaginationActions {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);

  const hasNextPage = page * limit < total;
  const hasPreviousPage = page > 1;

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setPage(prev => prev + 1);
    }
  }, [hasNextPage]);

  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      setPage(prev => prev - 1);
    }
  }, [hasPreviousPage]);

  const reset = useCallback(() => {
    setPage(1);
    setTotal(0);
  }, []);

  return {
    page,
    limit,
    total,
    hasNextPage,
    hasPreviousPage,
    setPage,
    setLimit,
    setTotal,
    nextPage,
    previousPage,
    reset,
  };
}

/**
 * Filter state management
 */
interface FilterState<T> {
  filters: T;
  setFilters: (filters: Partial<T>) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

function useFilters<T extends Record<string, any>>(
  initialFilters: T
): FilterState<T> {
  const [filters, setFilters] = useState<T>(initialFilters);

  const updateFilters = useCallback((newFilters: Partial<T>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    const initialValue = initialFilters[key];
    return (
      value !== initialValue &&
      value !== null &&
      value !== undefined &&
      value !== ''
    );
  });

  return {
    filters,
    setFilters: updateFilters,
    clearFilters,
    hasActiveFilters,
  };
}

/**
 * Cache management
 */
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class CacheManager<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private defaultTtl = 5 * 60 * 1000; // 5 minutes

  set(key: string, data: T, ttl = this.defaultTtl): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

const cacheManager = new CacheManager();

export { useAsyncState, usePagination, useFilters, CacheManager };
export type {
  AsyncState,
  AsyncStateActions,
  PaginationState,
  PaginationActions,
  FilterState,
  CacheEntry,
};
