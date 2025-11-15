import { useMemo, useState } from 'react';
import { toast } from 'sonner';

export type RestaurantIdentity = {
  id: string;
  name: string;
  type: string;
  cuisine: string;
};

export type RestaurantLocation = {
  location: string;
  distance: string;
};

export type RestaurantMetrics = {
  rating: number;
  reviews: number;
  seatingCapacity: number;
};

export type RestaurantRelations = {
  avatar: string;
  isCustomer?: boolean;
  lookingForSuppliers?: boolean;
  status?: 'active' | 'new' | 'potential';
};

export type RestaurantCommerce = {
  totalSpent?: string;
  lastOrder?: string;
  orderFrequency?: string;
  avgOrderValue?: string;
  memberSince: string;
};

export type RestaurantItem = RestaurantIdentity &
  RestaurantLocation &
  RestaurantMetrics &
  RestaurantRelations &
  RestaurantCommerce;

export type SortBy = 'rating' | 'name' | 'newest';

export function useDiscoverRestaurants() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState<SortBy>('rating');

  const allRestaurants: RestaurantItem[] = useMemo(
    () => [
      {
        id: '1',
        name: 'La Bella Cucina',
        type: 'Italian Fine Dining',
        cuisine: 'Italian',
        location: 'Downtown',
        distance: '2.5 km away',
        rating: 4.7,
        reviews: 342,
        avatar: '🍝',
        isCustomer: true,
        totalSpent: '€12,500',
        lastOrder: '2 days ago',
        orderFrequency: 'Weekly',
        avgOrderValue: '€265',
        status: 'active',
        memberSince: 'Jan 2024',
        seatingCapacity: 85,
      },
      {
        id: '2',
        name: 'The Garden Bistro',
        type: 'Farm-to-Table',
        cuisine: 'Contemporary',
        location: 'Midtown',
        distance: '4.2 km away',
        rating: 4.9,
        reviews: 567,
        avatar: '🌿',
        isCustomer: false,
        status: 'new',
        memberSince: 'Sep 2024',
        seatingCapacity: 60,
        lookingForSuppliers: true,
      },
      {
        id: '3',
        name: 'Sakura Sushi House',
        type: 'Japanese Restaurant',
        cuisine: 'Japanese',
        location: 'East Side',
        distance: '3.8 km away',
        rating: 4.8,
        reviews: 421,
        avatar: '🍱',
        isCustomer: true,
        totalSpent: '€8,750',
        lastOrder: '1 week ago',
        orderFrequency: 'Bi-weekly',
        avgOrderValue: '€175',
        status: 'active',
        memberSince: 'Mar 2024',
        seatingCapacity: 50,
      },
    ],
    []
  );

  const filteredRestaurants = useMemo(() => {
    return allRestaurants
      .filter(restaurant => {
        const matchesSearch =
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.type.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCuisine =
          cuisineFilter === 'all' || restaurant.cuisine === cuisineFilter;
        const matchesLocation =
          locationFilter === 'all' || restaurant.location === locationFilter;
        return matchesSearch && matchesCuisine && matchesLocation;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'rating':
            return b.rating - a.rating;
          case 'name':
            return a.name.localeCompare(b.name);
          case 'newest':
            return (
              new Date(b.memberSince).getTime() -
              new Date(a.memberSince).getTime()
            );
          default:
            return 0;
        }
      });
  }, [allRestaurants, searchQuery, cuisineFilter, locationFilter, sortBy]);

  const handleAddToFavorites = (restaurantName: string) => {
    toast.success('Added to favorites', {
      description: `${restaurantName} has been added to your favorites`,
    });
  };

  return {
    // state
    searchQuery,
    setSearchQuery,
    cuisineFilter,
    setCuisineFilter,
    locationFilter,
    setLocationFilter,
    sortBy,
    setSortBy,
    // data
    allRestaurants,
    filteredRestaurants,
    // actions
    handleAddToFavorites,
  };
}
