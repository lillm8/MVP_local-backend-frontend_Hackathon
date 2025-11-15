// User-related entities

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string; // Computed from firstName + lastName
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  RESTAURANT = 'restaurant',
  SUPPLIER = 'supplier',
  ADMIN = 'admin',
}
