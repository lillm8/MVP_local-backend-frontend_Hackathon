// Sidebar Rail component

'use client';

import * as React from 'react';
import { cn } from '../utils';
import { useSidebar } from './SidebarProvider';
import { SidebarRailProps } from './types';

export function SidebarRail({ className, ...props }: SidebarRailProps) {
  const { state } = useSidebar();

  return (
    <button
      data-sidebar='rail'
      className={cn(
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[state=expanded]:bg-sidebar-accent data-[state=expanded]:text-sidebar-accent-foreground absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all group-hover/sidebar:flex group-hover/sidebar:translate-x-0 data-[state=expanded]:translate-x-0',
        className
      )}
      {...props}
    >
      <div className='bg-sidebar-border group-hover/sidebar:bg-sidebar-accent absolute inset-y-0 w-1 -translate-x-1/2' />
    </button>
  );
}
