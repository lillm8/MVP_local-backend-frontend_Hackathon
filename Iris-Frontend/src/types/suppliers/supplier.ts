// Supplier component props

import { Supplier } from './business';

export interface SupplierCardProps {
  supplier: Supplier;
  onViewProfile: (supplierId: string) => void;
  onViewProducts: (supplierId: string) => void;
  onContact: (supplierId: string) => void;
  showRating?: boolean;
}

export interface ProducerCardProps {
  name: string;
  image: string;
  distance: string;
  rating: number;
  verified?: boolean;
  category?: string;
  onClick?: () => void;
}

export interface SupplierListProps {
  suppliers: Supplier[];
  loading?: boolean;
  onSupplierClick: (supplierId: string) => void;
  onViewProducts: (supplierId: string) => void;
  onContact: (supplierId: string) => void;
}
