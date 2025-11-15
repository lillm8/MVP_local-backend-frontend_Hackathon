// Types for Sidebar components

import { VariantProps } from 'class-variance-authority';
import type { TooltipContent } from '@components/ui/tooltip';

type SidebarContextProps = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

interface SidebarProviderProps extends React.ComponentProps<'div'> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface SidebarTriggerProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
}

interface SidebarRailProps extends React.ComponentProps<'button'> {}

interface SidebarInsetProps extends React.ComponentProps<'main'> {}

interface SidebarInputProps extends React.ComponentProps<'input'> {}

interface SidebarHeaderProps extends React.ComponentProps<'div'> {}

interface SidebarFooterProps extends React.ComponentProps<'div'> {}

interface SidebarSeparatorProps extends React.ComponentProps<'hr'> {}

interface SidebarContentProps extends React.ComponentProps<'div'> {}

interface SidebarGroupProps extends React.ComponentProps<'div'> {}

interface SidebarGroupLabelProps extends React.ComponentProps<'div'> {
  asChild?: boolean;
}

interface SidebarGroupActionProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
}

interface SidebarGroupContentProps extends React.ComponentProps<'div'> {}

interface SidebarMenuProps extends React.ComponentProps<'ul'> {}

interface SidebarMenuItemProps extends React.ComponentProps<'li'> {
  asChild?: boolean;
}

interface SidebarMenuButtonProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
}

interface SidebarMenuActionProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
  showOnHover?: boolean;
}

interface SidebarMenuBadgeProps extends React.ComponentProps<'div'> {
  asChild?: boolean;
}

interface SidebarMenuSkeletonProps extends React.ComponentProps<'div'> {
  showIcon?: boolean;
}

interface SidebarMenuSubProps extends React.ComponentProps<'ul'> {}

interface SidebarMenuSubItemProps extends React.ComponentProps<'li'> {
  asChild?: boolean;
}

interface SidebarMenuSubButtonProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
}

// Constants
const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

export type {
  SidebarContextProps,
  SidebarProviderProps,
  SidebarTriggerProps,
  SidebarRailProps,
  SidebarInsetProps,
  SidebarInputProps,
  SidebarHeaderProps,
  SidebarFooterProps,
  SidebarSeparatorProps,
  SidebarContentProps,
  SidebarGroupProps,
  SidebarGroupLabelProps,
  SidebarGroupActionProps,
  SidebarGroupContentProps,
  SidebarMenuProps,
  SidebarMenuItemProps,
  SidebarMenuButtonProps,
  SidebarMenuActionProps,
  SidebarMenuBadgeProps,
  SidebarMenuSkeletonProps,
  SidebarMenuSubProps,
  SidebarMenuSubItemProps,
  SidebarMenuSubButtonProps,
};

export {
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_MOBILE,
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_KEYBOARD_SHORTCUT,
};
