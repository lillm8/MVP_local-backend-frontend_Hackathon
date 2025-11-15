// Sidebar Menu components

'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../utils';
import {
  SidebarMenuProps,
  SidebarMenuItemProps,
  SidebarMenuButtonProps,
  SidebarMenuActionProps,
  SidebarMenuBadgeProps,
  SidebarMenuSkeletonProps,
  SidebarMenuSubProps,
  SidebarMenuSubItemProps,
  SidebarMenuSubButtonProps,
} from './types';

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return (
    <ul
      data-sidebar='menu'
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...props}
    />
  );
}

export function SidebarMenuItem({
  asChild = false,
  className,
  ...props
}: SidebarMenuItemProps) {
  const Comp = asChild ? Slot : 'li';

  return (
    <Comp
      data-sidebar='menu-item'
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  );
}

export function SidebarMenuButton({
  asChild = false,
  isActive = false,
  tooltip,
  className,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-sidebar='menu-button'
      data-active={isActive ? '' : undefined}
      className={cn(
        'peer/menu-button ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-all focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        className
      )}
      {...props}
    />
  );
}

export function SidebarMenuAction({
  asChild = false,
  showOnHover = false,
  className,
  ...props
}: SidebarMenuActionProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-sidebar='menu-action'
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-none transition-all focus-visible:ring-2 peer-hover/menu-button:flex [&>svg]:size-4 [&>svg]:shrink-0',
        showOnHover &&
          'group-focus-within/menu-item:flex group-hover/menu-item:flex',
        !showOnHover && 'flex',
        className
      )}
      {...props}
    />
  );
}

export function SidebarMenuBadge({
  asChild = false,
  className,
  ...props
}: SidebarMenuBadgeProps) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-sidebar='menu-badge'
      className={cn(
        'text-sidebar-foreground pointer-events-none absolute right-1 top-1.5 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums',
        className
      )}
      {...props}
    />
  );
}

export function SidebarMenuSkeleton({
  showIcon = false,
  className,
  ...props
}: SidebarMenuSkeletonProps) {
  // We'll import Skeleton from the parent component
  const Skeleton = React.lazy(() =>
    import('../skeleton').then(module => ({ default: module.Skeleton }))
  );

  return (
    <div
      data-sidebar='menu-skeleton'
      className={cn('flex gap-2 px-2 py-1.5', className)}
      {...props}
    >
      {showIcon && <Skeleton className='size-4' />}
      <Skeleton className='h-4 flex-1' />
    </div>
  );
}

export function SidebarMenuSub({ className, ...props }: SidebarMenuSubProps) {
  return (
    <ul
      data-sidebar='menu-sub'
      className={cn(
        'border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5',
        className
      )}
      {...props}
    />
  );
}

export function SidebarMenuSubItem({
  asChild = false,
  className,
  ...props
}: SidebarMenuSubItemProps) {
  const Comp = asChild ? Slot : 'li';

  return (
    <Comp
      data-sidebar='menu-sub-item'
      className={cn('group/menu-sub-item', className)}
      {...props}
    />
  );
}

export function SidebarMenuSubButton({
  asChild = false,
  size = 'md',
  isActive = false,
  className,
  ...props
}: SidebarMenuSubButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-sidebar='menu-sub-button'
      data-size={size}
      data-active={isActive ? '' : undefined}
      className={cn(
        'ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-all focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        size === 'sm' && 'text-xs',
        size === 'lg' && 'text-sm',
        className
      )}
      {...props}
    />
  );
}
