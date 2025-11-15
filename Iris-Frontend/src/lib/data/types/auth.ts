// Authentication API types (Infrastructure contracts)

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  businessName?: string;
  businessType?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  token: string;
  refreshToken: string;
}

export type LoginCredentials = LoginRequest;
export type RegisterData = RegisterRequest;

