// Authentication service - orchestrates auth operations
// This service delegates to specialized modules for better separation of concerns

import { User } from '@/types';
import { LoginCredentials, RegisterData, AuthResponse } from '@/lib/data/types';
import { AuthApi } from '../api/auth-api';
import { ProfileApi } from '../api/profile-api';
import { TokenManager } from './token-manager';

export type { LoginCredentials, RegisterData, AuthResponse };

export class AuthService {
  private authApi: AuthApi;
  private profileApi: ProfileApi;
  private tokenManager: TokenManager;

  constructor(
    baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  ) {
    this.authApi = new AuthApi(baseUrl);
    this.profileApi = new ProfileApi(baseUrl);
    this.tokenManager = new TokenManager();
  }

  // Authentication operations
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.authApi.login(credentials);
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    return this.authApi.register(userData);
  }

  async logout(): Promise<void> {
    return this.authApi.logout();
  }

  async refreshToken(): Promise<AuthResponse> {
    return this.authApi.refreshToken();
  }

  async getCurrentUser(): Promise<User | null> {
    return this.authApi.getCurrentUser();
  }

  // Profile operations
  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    return this.profileApi.updateProfile(userId, updates);
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    return this.profileApi.changePassword(userId, currentPassword, newPassword);
  }

  // Token management
  setTokens(token: string, refreshToken: string): void {
    this.tokenManager.setTokens(token, refreshToken);
  }

  getToken(): string | null {
    return this.tokenManager.getToken();
  }

  getRefreshToken(): string | null {
    return this.tokenManager.getRefreshToken();
  }

  clearTokens(): void {
    this.tokenManager.clearTokens();
  }

  isAuthenticated(): boolean {
    return this.tokenManager.isAuthenticated();
  }
}
