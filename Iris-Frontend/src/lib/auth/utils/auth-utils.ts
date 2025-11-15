// Authentication utility functions

export function getTokenFromStorage(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('iris_token');
}

export function getRefreshTokenFromStorage(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('iris_refresh_token');
}

export function setTokensInStorage(token: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('iris_token', token);
  localStorage.setItem('iris_refresh_token', refreshToken);
}

export function clearTokensFromStorage(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('iris_token');
  localStorage.removeItem('iris_refresh_token');
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch {
    return true;
  }
}

export function getTokenExpirationTime(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000; // Convert to milliseconds
  } catch {
    return null;
  }
}

export function formatAuthError(error: any): string {
  if (error?.response?.status === 401) {
    return 'Invalid credentials. Please check your email and password.';
  }

  if (error?.response?.status === 403) {
    return 'Access denied. Please contact support if you believe this is an error.';
  }

  if (error?.response?.status === 429) {
    return 'Too many login attempts. Please try again later.';
  }

  if (error?.response?.status >= 500) {
    return 'Server error. Please try again later.';
  }

  if (error?.message) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
}

export function getAuthHeaders(token: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
