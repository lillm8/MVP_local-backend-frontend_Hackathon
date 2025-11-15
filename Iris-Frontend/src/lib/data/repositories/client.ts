// API client configuration and utilities

import { APP_CONFIG } from '@/constants';

export class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private retryAttempts: number;
  private retryDelay: number;
  private timeout: number;

  constructor() {
    this.baseURL = APP_CONFIG.apiUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.retryAttempts = 3;
    this.retryDelay = 1000; // 1 second
    this.timeout = 30000; // 30 seconds
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      // TODO: Integrate with Clerk authentication
      // const { getToken } = useAuth()
      // return await getToken()

      // For now, check localStorage for demo purposes
      if (typeof window !== 'undefined') {
        return localStorage.getItem('iris_token');
      }
      return null;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  private async getHeaders(): Promise<Record<string, string>> {
    const token = await this.getAuthToken();
    return {
      ...this.defaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private shouldRetry(status: number): boolean {
    // Retry on server errors and rate limiting
    return status >= 500 || status === 429;
  }

  private isNetworkError(error: any): boolean {
    return (
      error instanceof TypeError ||
      error.name === 'NetworkError' ||
      error.message?.includes('fetch')
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData.code,
        errorData
      );
    }

    return response.json();
  }

  private async requestWithRetry<T>(
    endpoint: string,
    options: RequestInit = {},
    attempt: number = 1
  ): Promise<T> {
    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: await this.getHeaders(),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Retry on certain status codes
        if (this.shouldRetry(response.status) && attempt < this.retryAttempts) {
          await this.delay(this.retryDelay * attempt);
          return this.requestWithRetry(endpoint, options, attempt + 1);
        }

        throw new ApiError(
          errorData.message || `HTTP error! status: ${response.status}`,
          response.status,
          errorData.code,
          errorData
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Retry on network errors
      if (this.isNetworkError(error) && attempt < this.retryAttempts) {
        await this.delay(this.retryDelay * attempt);
        return this.requestWithRetry(endpoint, options, attempt + 1);
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408, 'TIMEOUT_ERROR');
      }

      throw new ApiError('Network error occurred', 0, 'NETWORK_ERROR', {
        originalError: error,
      });
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return this.requestWithRetry<T>(url.pathname + url.search, {
      method: 'GET',
    });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.requestWithRetry<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.requestWithRetry<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.requestWithRetry<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.requestWithRetry<T>(endpoint, {
      method: 'DELETE',
    });
  }

  async uploadFile<T>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, any>
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    const headers = await this.getHeaders();
    delete headers['Content-Type']; // Let the browser set the content type for FormData

    return this.requestWithRetry<T>(endpoint, {
      method: 'POST',
      headers,
      body: formData,
    });
  }
}

export const apiClient = new ApiClient();

// Error handling utility
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Request interceptor for error handling
export const handleApiError = (error: any): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof Error) {
    return new ApiError(error.message, 0, 'NETWORK_ERROR');
  }

  return new ApiError('An unexpected error occurred', 0, 'UNKNOWN_ERROR');
};
