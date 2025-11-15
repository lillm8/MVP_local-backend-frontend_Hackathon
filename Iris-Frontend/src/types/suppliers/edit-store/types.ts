// Types for Edit Store Dialog components

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  status: string;
  image: string;
  description?: string;
}

interface SupplierInfo {
  name: string;
  category: string;
  location: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  certifications: string[];
  rating: number;
  totalReviews: number;
  memberSince: string;
  verified: boolean;
}

interface EditStoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplierInfo: SupplierInfo;
  products: Product[];
  onSave: (updatedInfo: SupplierInfo, updatedProducts: Product[]) => void;
}

interface StoreBasicInfo {
  storeName: string;
  storeCategory: string;
  location: string;
  description: string;
}

interface StoreContactInfo {
  email: string;
  phone: string;
  website: string;
}

interface StoreCertifications {
  certifications: string[];
  newCertification: string;
}

interface MondayHours {
  mondayOpen: string;
  mondayClose: string;
}

interface TuesdayHours {
  tuesdayOpen: string;
  tuesdayClose: string;
}

interface WednesdayHours {
  wednesdayOpen: string;
  wednesdayClose: string;
}

interface ThursdayHours {
  thursdayOpen: string;
  thursdayClose: string;
}

interface FridayHours {
  fridayOpen: string;
  fridayClose: string;
}

interface SaturdayHours {
  saturdayOpen: string;
  saturdayClose: string;
}

interface SundayHours {
  sundayOpen: string;
  sundayClose: string;
}

export interface StoreBusinessHours
  extends MondayHours,
    TuesdayHours,
    WednesdayHours,
    ThursdayHours,
    FridayHours,
    SaturdayHours,
    SundayHours {}

interface StoreDeliverySettings {
  deliveryRadius: string;
  deliveryFee: string;
  minOrderAmount: string;
  deliveryTime: string;
  freeDeliveryThreshold: string;
}

interface StoreFormData
  extends StoreBasicInfo,
    StoreContactInfo,
    StoreCertifications,
    StoreBusinessHours,
    StoreDeliverySettings {}

interface ProductFormData {
  name: string;
  category: string;
  price: string;
  unit: string;
  stock: string;
  description: string;
  imageUrl: string;
}

type StoreTab =
  | 'basic'
  | 'contact'
  | 'products'
  | 'certifications'
  | 'hours'
  | 'delivery';

export type {
  Product,
  SupplierInfo,
  EditStoreDialogProps,
  StoreBasicInfo,
  StoreContactInfo,
  StoreCertifications,
  StoreDeliverySettings,
  StoreFormData,
  ProductFormData,
  StoreTab,
};
