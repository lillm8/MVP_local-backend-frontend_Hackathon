// Token management utilities

import {
  getTokenFromStorage,
  getRefreshTokenFromStorage,
  setTokensInStorage,
  clearTokensFromStorage,
} from '../utils/auth-utils';

export class TokenManager {
  setTokens(token: string, refreshToken: string): void {
    setTokensInStorage(token, refreshToken);
  }

  getToken(): string | null {
    return getTokenFromStorage();
  }

  getRefreshToken(): string | null {
    return getRefreshTokenFromStorage();
  }

  clearTokens(): void {
    clearTokensFromStorage();
  }

  isAuthenticated(): boolean {
    return !!getTokenFromStorage();
  }
}
