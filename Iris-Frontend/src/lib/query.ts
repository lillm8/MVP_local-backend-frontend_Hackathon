import { QueryClient, DefaultOptions } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';

// Default query options
const queryConfig: DefaultOptions = {
  queries: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors (client errors)
      if (error?.status >= 400 && error?.status < 500) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  },
  mutations: {
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors (client errors)
      if (error?.status >= 400 && error?.status < 500) {
        return false;
      }
      // Retry up to 2 times for mutations
      return failureCount < 2;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),
  },
};

// Create query client with configuration
export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

// Re-export query keys from constants
export { QUERY_KEYS };

// Query invalidation helpers
export const invalidateQueries = {
  // Invalidate all product queries
  products: () =>
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS }),

  // Invalidate specific product
  product: (id: string) =>
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCT_DETAIL(id) }),

  // Invalidate all supplier queries
  suppliers: () =>
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SUPPLIERS }),

  // Invalidate specific supplier
  supplier: (id: string) =>
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SUPPLIER_DETAIL(id) }),

  // Invalidate all order queries
  orders: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS }),

  // Invalidate specific order
  order: (id: string) =>
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDER_DETAIL(id) }),

  // Invalidate user queries
  user: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER }),

  // Invalidate all queries
  all: () => queryClient.invalidateQueries(),
};

// Prefetch helpers
export const prefetchQueries = {
  // Prefetch products
  products: async () => {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.PRODUCTS,
      queryFn: () => {
        // This would be replaced with actual API call
        return Promise.resolve([]);
      },
      staleTime: 5 * 60 * 1000,
    });
  },

  // Prefetch suppliers
  suppliers: async () => {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.SUPPLIERS,
      queryFn: () => {
        // This would be replaced with actual API call
        return Promise.resolve([]);
      },
      staleTime: 5 * 60 * 1000,
    });
  },
};

// Error handling
export const handleQueryError = (error: any) => {
  console.error('Query error:', error);

  // You can add global error handling here
  // For example, show toast notifications, log to Sentry, etc.

  if (error?.status === 401) {
    // Handle unauthorized - redirect to login
    console.log('Unauthorized access - redirecting to login');
  } else if (error?.status === 403) {
    // Handle forbidden
    console.log('Access forbidden');
  } else if (error?.status >= 500) {
    // Handle server errors
    console.log('Server error occurred');
  }
};

// Optimistic updates helpers
export const optimisticUpdates = {
  // Add product to cart
  addToCart: (productId: string, quantity: number) => {
    queryClient.setQueryData(['cart'], (oldData: any) => {
      if (!oldData) return oldData;

      const existingItem = oldData.items.find(
        (item: any) => item.productId === productId
      );

      if (existingItem) {
        return {
          ...oldData,
          items: oldData.items.map((item: any) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        return {
          ...oldData,
          items: [...oldData.items, { productId, quantity }],
        };
      }
    });
  },

  // Remove product from cart
  removeFromCart: (productId: string) => {
    queryClient.setQueryData(['cart'], (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        items: oldData.items.filter(
          (item: any) => item.productId !== productId
        ),
      };
    });
  },

  // Update order status
  updateOrderStatus: (orderId: string, status: string) => {
    queryClient.setQueryData(
      QUERY_KEYS.ORDER_DETAIL(orderId),
      (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          status,
          updatedAt: new Date().toISOString(),
        };
      }
    );
  },
};
