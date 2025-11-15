// Types for Edit Restaurant Profile Dialog components

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

interface SupplyNeed {
  category: string;
  frequency: string;
  averageOrder: string;
  preferences: string;
}

interface RestaurantProfile
  extends RestaurantBasicInfo,
    RestaurantContactInfo,
    RestaurantOrderingInfo {
  menu: MenuCategory[];
  supplierNeeds: SupplyNeed[];
}

interface EditRestaurantProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restaurantProfile: RestaurantProfile;
  onSave: (updatedProfile: RestaurantProfile) => void;
}

interface RestaurantBasicInfo {
  name: string;
  type: string;
  cuisine: string[];
  location: string;
  description: string;
  coverImage: string;
  seatingCapacity: string;
  established: string;
  orderVolume: string;
}

interface RestaurantContactInfo {
  email: string;
  phone: string;
  website: string;
}

interface RestaurantOrderingInfo {
  leadTime: string;
  deliveryWindow: string;
  paymentTerms: string;
  minimumOrder: string;
}

type RestaurantTab = 'basic' | 'contact' | 'menu' | 'supply-needs' | 'ordering';

export type {
  MenuItem,
  MenuCategory,
  SupplyNeed,
  RestaurantProfile,
  EditRestaurantProfileDialogProps,
  RestaurantBasicInfo,
  RestaurantContactInfo,
  RestaurantOrderingInfo,
  RestaurantTab,
};
