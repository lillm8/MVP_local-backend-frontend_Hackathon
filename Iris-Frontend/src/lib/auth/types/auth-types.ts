export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'restaurant' | 'supplier' | 'admin';
  imageUrl?: string;
}

export interface AuthState {
  isSignedIn: boolean;
  userId: string | null;
  user: AuthUser | null;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  signOut: () => void;
  hasPermission: (role: string) => boolean;
}
