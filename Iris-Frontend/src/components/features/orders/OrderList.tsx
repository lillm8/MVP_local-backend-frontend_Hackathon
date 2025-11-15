// Order list component for orders page

import { OrderDetails } from './OrderDetails';
import { OrderListProps } from '@/types/orders/types';

export function OrderList(props: OrderListProps) {
  const {
    orders,
    expandedOrder,
    favoriteOrderIds,
    onToggleExpanded,
    onToggleFavorite,
    onViewSupplier,
  } = props;
  if (orders.length === 0) {
    return (
      <div className='py-12 text-center'>
        <div className='text-muted-foreground'>
          <p className='mb-2 text-lg font-medium'>No orders found</p>
          <p className='text-sm'>
            Try adjusting your filters or check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {orders.map(order => (
        <OrderDetails
          key={order.id}
          order={order}
          isExpanded={expandedOrder === order.id}
          isFavorite={favoriteOrderIds.has(order.id)}
          onToggleExpanded={() => onToggleExpanded(order.id)}
          onToggleFavorite={() => onToggleFavorite(order.id)}
          onViewSupplier={onViewSupplier}
        />
      ))}
    </div>
  );
}
