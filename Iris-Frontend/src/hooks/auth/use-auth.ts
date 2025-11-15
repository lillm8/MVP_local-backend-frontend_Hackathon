import { useState, useEffect } from 'react';
import { UserRole } from '@/types';

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
  } | null;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    // TODO: Integrate with Clerk authentication
    // For now, check localStorage for demo purposes
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('iris_user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setAuthState({
            isAuthenticated: true,
            user,
            isLoading: false,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
      }
    };

    checkAuth();
  }, []);

  const login = (user: AuthState['user']) => {
    if (user) {
      localStorage.setItem('iris_user', JSON.stringify(user));
      setAuthState({
        isAuthenticated: true,
        user,
        isLoading: false,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('iris_user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
  };

  return {
    ...authState,
    login,
    logout,
  };
}
