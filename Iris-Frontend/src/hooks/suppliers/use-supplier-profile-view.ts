'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export interface UseSupplierProfileViewOptions {
  supplierId: string;
}

export function useSupplierProfileView({
  supplierId,
}: UseSupplierProfileViewOptions) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = useCallback(
    (productId: number, productName: string) => {
      toast.success(`${productName} added to cart`);
    },
    []
  );

  const handleToggleFavorite = useCallback(() => {
    setIsFavorite(prev => !prev);
    toast.success(
      !isFavorite ? 'Added to favorites' : 'Removed from favorites'
    );
  }, [isFavorite]);

  const handleContact = useCallback(() => {
    toast.success('Opening message');
  }, []);

  return {
    supplierId,
    isFavorite,
    handleAddToCart,
    handleToggleFavorite,
    handleContact,
  };
}

export type UseSupplierProfileViewReturn = ReturnType<
  typeof useSupplierProfileView
>;
