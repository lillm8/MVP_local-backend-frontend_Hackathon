// Profile API operations

import { User } from '@/types';
import { getTokenFromStorage } from '../utils/auth-utils';

export class ProfileApi {
  private baseUrl: string;

  constructor(
    baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  ) {
    this.baseUrl = baseUrl;
  }

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    try {
      const token = getTokenFromStorage();
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await fetch(`${this.baseUrl}/users/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Profile update failed');
      }

      const updatedUser = await response.json();
      return updatedUser;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error instanceof Error ? error : new Error('Profile update failed');
    }
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const token = getTokenFromStorage();
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await fetch(`${this.baseUrl}/users/${userId}/password`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password change failed');
      }
    } catch (error) {
      console.error('Change password error:', error);
      throw error instanceof Error
        ? error
        : new Error('Password change failed');
    }
  }
}
