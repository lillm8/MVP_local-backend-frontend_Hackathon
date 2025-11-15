'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export interface UseRestaurantProfileViewOptions {
  restaurantId: string;
}

export function useRestaurantProfileView({
  restaurantId,
}: UseRestaurantProfileViewOptions) {
  const [notes, setNotes] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleContact = useCallback(() => {
    toast.success('Opening message');
  }, []);

  const handleProposal = useCallback(() => {
    toast.success('Creating supply proposal');
  }, []);

  const handleFavorite = useCallback(() => {
    setIsFavorite(prev => !prev);
    toast.success(
      !isFavorite ? 'Added to favorites' : 'Removed from favorites'
    );
  }, [isFavorite]);

  const handleSaveNotes = useCallback(() => {
    toast.success('Notes saved successfully');
  }, []);

  return {
    restaurantId,
    notes,
    setNotes,
    isFavorite,
    handleContact,
    handleProposal,
    handleFavorite,
    handleSaveNotes,
  };
}

export type UseRestaurantProfileViewReturn = ReturnType<
  typeof useRestaurantProfileView
>;
