// Profile API types (Infrastructure contracts)

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface UpdateRestaurantProfileRequest {
  name?: string;
  description?: string;
  address?: Address;
  phone?: string;
  cuisineType?: string;
  image?: string;
}

export interface UpdateSupplierProfileRequest {
  name?: string;
  description?: string;
  address?: Address;
  phone?: string;
  businessType?: string;
  image?: string;
  deliveryRadius?: number;
  minimumOrderValue?: number;
}

