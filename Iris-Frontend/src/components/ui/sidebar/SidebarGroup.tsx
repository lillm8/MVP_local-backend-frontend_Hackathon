// Sidebar Group components

'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../utils';
import {
  SidebarGroupProps,
  SidebarGroupLabelProps,
  SidebarGroupActionProps,
  SidebarGroupContentProps,
} from './types';

export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return (
    <div
      data-sidebar='group'
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...props}
    />
  );
}

export function SidebarGroupLabel({
  asChild = false,
  className,
  ...props
}: SidebarGroupLabelProps) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-sidebar='group-label'
      className={cn(
        'text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-none transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        className
      )}
      {...props}
    />
  );
}

export function SidebarGroupAction({
  asChild = false,
  className,
  ...props
}: SidebarGroupActionProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-sidebar='group-action'
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-none transition-all focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        className
      )}
      {...props}
    />
  );
}

export function SidebarGroupContent({
  className,
  ...props
}: SidebarGroupContentProps) {
  return (
    <div
      data-sidebar='group-content'
      className={cn('w-full text-sm', className)}
      {...props}
    />
  );
}
