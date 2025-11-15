import { useState } from 'react';
import { useRestaurantProfile } from './use-restaurant-profile';
import { useSuppliersList } from './use-suppliers-list';
import { useSupplyAgreements } from './use-supply-agreements';

// Re-export types for backward compatibility
export type {
  RestaurantMenuItem,
  RestaurantMenuCategory,
  SupplierNeed,
  RestaurantProfile,
  TopSupplierSummary,
} from './use-restaurant-profile';

export type { SupplierListItem } from './use-suppliers-list';
export type { SupplyAgreementItem } from './use-supply-agreements';

export function useProfilePage() {
  const [activeTab, setActiveTab] = useState<
    'account' | 'suppliers' | 'invoices' | 'analytics'
  >('account');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const {
    restaurantProfile,
    setRestaurantProfile,
    restaurantInfo,
    metrics,
    topSuppliers,
    sustainabilityScore,
    handleSaveProfile,
  } = useRestaurantProfile();

  const { suppliersList, handleReorder, handleContactSupplier } =
    useSuppliersList();

  const { supplyAgreements } = useSupplyAgreements();

  return {
    // state
    activeTab,
    setActiveTab,
    isEditProfileOpen,
    setIsEditProfileOpen,
    // data
    restaurantProfile,
    setRestaurantProfile,
    restaurantInfo,
    metrics,
    topSuppliers,
    suppliersList,
    supplyAgreements,
    sustainabilityScore,
    // handlers
    handleSaveProfile,
    handleReorder,
    handleContactSupplier,
  };
}
