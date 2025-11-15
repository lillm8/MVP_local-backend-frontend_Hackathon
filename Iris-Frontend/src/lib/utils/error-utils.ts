// Error handling utilities
// Centralized error handling and user-friendly error messages

import { ApiError } from '@/lib/data/repositories/client';

export interface ErrorState {
  hasError: boolean;
  error: Error | null;
  errorId: string;
}

export interface UserFriendlyError {
  title: string;
  message: string;
  action?: string;
  retryable: boolean;
}

export class ErrorHandler {
  /**
   * Convert technical errors to user-friendly messages
   */
  static toUserFriendlyError(error: Error): UserFriendlyError {
    if (error instanceof ApiError) {
      return this.handleApiError(error);
    }

    if (error.name === 'NetworkError' || error.message.includes('fetch')) {
      return {
        title: 'Connection Error',
        message:
          'Unable to connect to the server. Please check your internet connection.',
        action: 'Try Again',
        retryable: true,
      };
    }

    if (error.name === 'ValidationError') {
      return {
        title: 'Invalid Input',
        message: 'Please check your input and try again.',
        retryable: false,
      };
    }

    return {
      title: 'Something went wrong',
      message: 'An unexpected error occurred. Please try again later.',
      action: 'Try Again',
      retryable: true,
    };
  }

  /**
   * Handle API-specific errors
   */
  private static handleApiError(error: ApiError): UserFriendlyError {
    const map: Record<number, UserFriendlyError> = {
      400: {
        title: 'Invalid Request',
        message: 'Please check your input and try again.',
        retryable: false,
      },
      401: {
        title: 'Authentication Required',
        message: 'Please log in to continue.',
        action: 'Log In',
        retryable: false,
      },
      403: {
        title: 'Access Denied',
        message: 'You do not have permission to perform this action.',
        retryable: false,
      },
      404: {
        title: 'Not Found',
        message: 'The requested resource was not found.',
        retryable: false,
      },
      409: {
        title: 'Conflict',
        message: 'This action conflicts with existing data.',
        retryable: false,
      },
      422: {
        title: 'Validation Error',
        message: error.message || 'Please check your input and try again.',
        retryable: false,
      },
      429: {
        title: 'Too Many Requests',
        message: 'Please wait a moment before trying again.',
        action: 'Try Again',
        retryable: true,
      },
      500: {
        title: 'Server Error',
        message: 'Something went wrong on our end. Please try again later.',
        action: 'Try Again',
        retryable: true,
      },
      503: {
        title: 'Service Unavailable',
        message:
          'The service is temporarily unavailable. Please try again later.',
        action: 'Try Again',
        retryable: true,
      },
    };
    return (
      map[error.status] || {
        title: 'Error',
        message: error.message || 'An unexpected error occurred.',
        action: 'Try Again',
        retryable: true,
      }
    );
  }

  /**
   * Generate a unique error ID for tracking
   */
  static generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Log error for debugging
   */
  static logError(error: Error, context?: Record<string, any>): void {
    console.error('Error occurred:', {
      error: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Error boundary component props
 */
export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
  onError?: (error: Error, errorInfo: any) => void;
}

/**
 * Error boundary state
 */
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
