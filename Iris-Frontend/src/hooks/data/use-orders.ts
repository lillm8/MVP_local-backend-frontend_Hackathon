import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { Order, OrderStatus } from '@/types';
import { CreateOrderRequest } from '@/lib/data/types';

// Mock orders data - in real app this would come from API
const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    restaurantId: 'restaurant-1',
    supplierId: '1',
    items: [
      {
        id: '1',
        productId: '1',
        productName: 'Heirloom Tomatoes',
        quantity: 5,
        unitPrice: 4.5,
        totalPrice: 22.5,
        unit: 'kg',
      },
    ],
    subtotal: 22.5,
    tax: 2.25,
    deliveryFee: 5.0,
    total: 29.75,
    status: OrderStatus.PENDING,
    deliveryDate: '2024-01-17',
    deliveryTime: '14:00',
    deliveryAddress: {
      street: '123 Restaurant St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'USA',
      coordinates: { lat: 37.7749, lng: -122.4194 },
    },
    notes: 'Please deliver in the morning',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
];

export function useOrders() {
  return useQuery({
    queryKey: QUERY_KEYS.ORDERS,
    queryFn: () => MOCK_ORDERS,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.ORDER_DETAIL(id),
    queryFn: () => {
      const order = MOCK_ORDERS.find(o => o.id === id);
      if (!order) {
        throw new Error(`Order with id ${id} not found`);
      }
      return order;
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: CreateOrderRequest): Promise<Order> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Calculate totals (in real app, this would be done by the backend)
      const subtotal = orderData.items.reduce(
        (sum, item) => sum + item.quantity * 10,
        0
      ); // Mock price calculation
      const tax = subtotal * 0.1; // 10% tax
      const deliveryFee = 5.0;
      const total = subtotal + tax + deliveryFee;

      // Transform items to include required fields
      const orderItems = orderData.items.map((item, index) => ({
        id: (index + 1).toString(),
        productId: item.productId,
        productName: `Product ${item.productId}`, // Mock product name
        quantity: item.quantity,
        unitPrice: 10, // Mock unit price
        totalPrice: item.quantity * 10,
        unit: 'kg', // Mock unit
      }));

      const newOrder: Order = {
        id: (MOCK_ORDERS.length + 1).toString(),
        restaurantId: 'restaurant-1', // Mock restaurant ID
        supplierId: orderData.supplierId,
        status: OrderStatus.PENDING,
        items: orderItems,
        subtotal,
        tax,
        deliveryFee,
        total,
        deliveryAddress: {
          ...orderData.deliveryAddress,
          coordinates: { lat: 37.7749, lng: -122.4194 }, // Mock coordinates
        },
        deliveryDate: orderData.deliveryDate,
        deliveryTime: orderData.deliveryTime,
        notes: orderData.notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      MOCK_ORDERS.push(newOrder);
      return newOrder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: {
      orderId: string;
      status: Order['status'];
    }): Promise<Order> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const order = MOCK_ORDERS.find(o => o.id === orderId);
      if (!order) {
        throw new Error(`Order with id ${orderId} not found`);
      }

      order.status = status;
      order.updatedAt = new Date().toISOString();

      return order;
    },
    onSuccess: updatedOrder => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ORDER_DETAIL(updatedOrder.id),
      });
    },
  });
}
