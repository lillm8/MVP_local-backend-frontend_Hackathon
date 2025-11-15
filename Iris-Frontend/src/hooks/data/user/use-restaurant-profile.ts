// Custom hook for restaurant profile state management

import { useState } from 'react';
import {
  RestaurantProfile,
  MenuItem,
  MenuCategory,
  SupplyNeed,
} from '@/types/user/edit-restaurant/types';

export function useRestaurantProfile(initialProfile: RestaurantProfile) {
  const [profile, setProfile] = useState<RestaurantProfile>(initialProfile);
  const [newCuisine, setNewCuisine] = useState('');

  const updateProfile = (updates: Partial<RestaurantProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const addCuisine = () => {
    if (newCuisine.trim()) {
      setProfile(prev => ({
        ...prev,
        cuisine: [...prev.cuisine, newCuisine.trim()],
      }));
      setNewCuisine('');
    }
  };

  const removeCuisine = (index: number) => {
    setProfile(prev => ({
      ...prev,
      cuisine: prev.cuisine.filter((_, i) => i !== index),
    }));
  };

  const addMenuCategory = () => {
    setProfile(prev => ({
      ...prev,
      menu: [...prev.menu, { category: '', items: [] }],
    }));
  };

  const updateMenuCategory = (
    index: number,
    updates: Partial<MenuCategory>
  ) => {
    setProfile(prev => ({
      ...prev,
      menu: prev.menu.map((cat, i) =>
        i === index ? { ...cat, ...updates } : cat
      ),
    }));
  };

  const removeMenuCategory = (index: number) => {
    setProfile(prev => ({
      ...prev,
      menu: prev.menu.filter((_, i) => i !== index),
    }));
  };

  const addMenuItem = (categoryIndex: number) => {
    setProfile(prev => ({
      ...prev,
      menu: prev.menu.map((cat, i) =>
        i === categoryIndex
          ? {
              ...cat,
              items: [
                ...cat.items,
                { name: '', description: '', price: '', image: '' },
              ],
            }
          : cat
      ),
    }));
  };

  const updateMenuItem = (
    categoryIndex: number,
    itemIndex: number,
    updates: Partial<MenuItem>
  ) => {
    setProfile(prev => ({
      ...prev,
      menu: prev.menu.map((cat, i) =>
        i === categoryIndex
          ? {
              ...cat,
              items: cat.items.map((item, j) =>
                j === itemIndex ? { ...item, ...updates } : item
              ),
            }
          : cat
      ),
    }));
  };

  const removeMenuItem = (categoryIndex: number, itemIndex: number) => {
    setProfile(prev => ({
      ...prev,
      menu: prev.menu.map((cat, i) =>
        i === categoryIndex
          ? { ...cat, items: cat.items.filter((_, j) => j !== itemIndex) }
          : cat
      ),
    }));
  };

  const addSupplyNeed = () => {
    setProfile(prev => ({
      ...prev,
      supplierNeeds: [
        ...prev.supplierNeeds,
        { category: '', frequency: '', averageOrder: '', preferences: '' },
      ],
    }));
  };

  const updateSupplyNeed = (index: number, updates: Partial<SupplyNeed>) => {
    setProfile(prev => ({
      ...prev,
      supplierNeeds: prev.supplierNeeds.map((need, i) =>
        i === index ? { ...need, ...updates } : need
      ),
    }));
  };

  const removeSupplyNeed = (index: number) => {
    setProfile(prev => ({
      ...prev,
      supplierNeeds: prev.supplierNeeds.filter((_, i) => i !== index),
    }));
  };

  const resetProfile = () => {
    setProfile(initialProfile);
    setNewCuisine('');
  };

  return {
    profile,
    setProfile,
    newCuisine,
    setNewCuisine,
    updateProfile,
    addCuisine,
    removeCuisine,
    addMenuCategory,
    updateMenuCategory,
    removeMenuCategory,
    addMenuItem,
    updateMenuItem,
    removeMenuItem,
    addSupplyNeed,
    updateSupplyNeed,
    removeSupplyNeed,
    resetProfile,
  };
}
