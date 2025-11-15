// Navigation component props

import { User } from '../user';

export interface NavigationProps {
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
  onProfile: () => void;
  cartItemCount?: number;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  currentPath?: string;
}
