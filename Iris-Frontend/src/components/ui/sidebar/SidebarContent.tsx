// Sidebar Content component

'use client';

import * as React from 'react';
import { cn } from '../utils';
import { SidebarContentProps } from './types';

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return (
    <div
      data-sidebar='content'
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className
      )}
      {...props}
    />
  );
}
