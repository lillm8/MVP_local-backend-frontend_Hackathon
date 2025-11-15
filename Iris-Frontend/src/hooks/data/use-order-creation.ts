import { useState } from 'react';
import { useCreateOrder } from '@/hooks/data/use-orders';
import { CreateOrderRequest } from '@/lib/data/types';

export interface OrderCreationState {
  isCreating: boolean;
  error: string | null;
}

export function useOrderCreation() {
  const [state, setState] = useState<OrderCreationState>({
    isCreating: false,
    error: null,
  });

  const createOrderMutation = useCreateOrder();

  const createOrder = async (orderData: CreateOrderRequest) => {
    setState({ isCreating: true, error: null });

    try {
      const result = await createOrderMutation.mutateAsync(orderData);
      setState({ isCreating: false, error: null });
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to create order';
      setState({ isCreating: false, error: errorMessage });
      throw error;
    }
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return {
    ...state,
    createOrder,
    clearError,
  };
}
