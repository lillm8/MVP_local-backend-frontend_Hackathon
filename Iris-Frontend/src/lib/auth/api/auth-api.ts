// Authentication API calls

import { LoginCredentials, RegisterData, AuthResponse } from '@/lib/data/types';
import type { User } from '@/types/user';
import { validateLoginCredentials } from '../validators/auth-validator';
import {
  getTokenFromStorage,
  getRefreshTokenFromStorage,
  setTokensInStorage,
  clearTokensFromStorage,
  formatAuthError,
} from '../utils/auth-utils';

// HTTP request configuration
interface RequestConfig {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

// Error handling utilities
class AuthErrorHandler {
  static handleError(error: unknown, context: string): Error {
    console.error(`${context} error:`, error);
    return error instanceof Error ? error : new Error(`${context} failed`);
  }

  static async handleApiError(
    response: Response,
    context: string
  ): Promise<never> {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `${context} failed`);
  }
}

// HTTP client for auth requests
class AuthHttpClient {
  constructor(private baseUrl: string) {}

  private async makeRequest<T>(
    endpoint: string,
    config: RequestConfig
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, config);

    if (!response.ok) {
      await AuthErrorHandler.handleApiError(response, 'Request');
    }

    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  async get<T>(
    endpoint: string,
    headers: Record<string, string> = {}
  ): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'GET',
      headers,
    });
  }
}

export class AuthApi {
  private httpClient: AuthHttpClient;

  constructor(
    baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  ) {
    this.httpClient = new AuthHttpClient(baseUrl);
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const validation = validateLoginCredentials(
      credentials.email,
      credentials.password
    );
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    try {
      return await this.httpClient.post<AuthResponse>(
        '/auth/login',
        credentials
      );
    } catch (error) {
      throw AuthErrorHandler.handleError(error, 'Login');
    }
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      return await this.httpClient.post<AuthResponse>(
        '/auth/register',
        userData
      );
    } catch (error) {
      throw AuthErrorHandler.handleError(error, 'Registration');
    }
  }

  async logout(): Promise<void> {
    try {
      const token = getTokenFromStorage();
      if (!token) return;

      await this.httpClient.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout error:', error);
      // Don't throw error for logout - user should be logged out locally regardless
    } finally {
      clearTokensFromStorage();
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = getRefreshTokenFromStorage();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const data = await this.httpClient.post<AuthResponse>('/auth/refresh', {
        refreshToken,
      });
      setTokensInStorage(data.token, data.refreshToken);
      return data;
    } catch (error) {
      clearTokensFromStorage();
      throw AuthErrorHandler.handleError(error, 'Token refresh');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const token = getTokenFromStorage();
    if (!token) return null;

    try {
      return await this.httpClient.get<User>('/auth/me', {
        Authorization: `Bearer ${token}`,
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        try {
          await this.refreshToken();
          return this.getCurrentUser();
        } catch {
          clearTokensFromStorage();
          return null;
        }
      }
      console.error('Get current user error:', error);
      return null;
    }
  }
}
