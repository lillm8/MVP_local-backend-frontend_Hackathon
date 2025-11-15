// Business-related entities (Restaurant, Supplier, Address)

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Business identification
interface BusinessIdentity {
  id: string;
  name: string;
  description?: string;
}

// Business contact information
interface BusinessContact {
  phone: string;
  email: string;
  address: Address;
}

// Business media
interface BusinessMedia {
  image?: string;
}

// Business ratings and verification
interface BusinessReputation {
  rating: number;
  reviewCount: number;
  isVerified: boolean;
}

// Business timestamps
interface BusinessTimestamps {
  createdAt: string;
  updatedAt: string;
}

// Base business interface combining focused interfaces
interface BaseBusiness
  extends BusinessIdentity,
    BusinessContact,
    BusinessMedia,
    BusinessReputation,
    BusinessTimestamps {}

export interface Restaurant extends BaseBusiness {
  cuisineType: string;
}

export interface Supplier extends BaseBusiness {
  businessType: string;
  deliveryRadius: number;
  minimumOrderValue: number;
}
