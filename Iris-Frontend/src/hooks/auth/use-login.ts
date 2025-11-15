import { useState } from 'react';
import { UserRole } from '@/types';
import { getMockAuthCredentials } from '@/tests/mocks/mock-data';

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginState {
  formData: LoginFormData;
  error: string;
  loading: boolean;
}

export function useLogin() {
  const [loginState, setLoginState] = useState<LoginState>({
    formData: {
      username: '',
      password: '',
    },
    error: '',
    loading: false,
  });

  const updateField = (field: keyof LoginFormData, value: string) => {
    setLoginState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value,
      },
      error: '', // Clear error when user types
    }));
  };

  const validateCredentials = (
    username: string,
    password: string
  ): UserRole | null => {
    // Bypass mode: accept any non-empty username and password
    // Determine role based on username patterns or default to restaurant
    if (username && password) {
      // If username contains 'supplier' or 'vendor', assign supplier role
      if (
        username.toLowerCase().includes('supplier') ||
        username.toLowerCase().includes('vendor') ||
        username.toLowerCase().includes('seller')
      ) {
        return UserRole.SUPPLIER;
      }
      // Default to restaurant role for any other valid credentials
      return UserRole.RESTAURANT;
    }

    return null;
  };

  const login = async (): Promise<UserRole | null> => {
    setLoginState(prev => ({ ...prev, loading: true, error: '' }));

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const userRole = validateCredentials(
        loginState.formData.username,
        loginState.formData.password
      );

      if (userRole) {
        setLoginState(prev => ({ ...prev, loading: false }));
        return userRole;
      } else {
        setLoginState(prev => ({
          ...prev,
          loading: false,
          error: 'Invalid username or password',
        }));
        return null;
      }
    } catch (error) {
      setLoginState(prev => ({
        ...prev,
        loading: false,
        error: 'An error occurred during login',
      }));
      return null;
    }
  };

  const quickLogin = (userRole: UserRole) => {
    const credentials = getMockAuthCredentials();

    if (userRole === UserRole.SUPPLIER) {
      setLoginState(prev => ({
        ...prev,
        formData: {
          username: credentials.supplier.username,
          password: credentials.supplier.password,
        },
        error: '',
      }));
    } else if (userRole === UserRole.RESTAURANT) {
      setLoginState(prev => ({
        ...prev,
        formData: {
          username: credentials.restaurant.username,
          password: credentials.restaurant.password,
        },
        error: '',
      }));
    }
  };

  const clearError = () => {
    setLoginState(prev => ({ ...prev, error: '' }));
  };

  return {
    ...loginState,
    updateField,
    login,
    quickLogin,
    clearError,
  };
}
