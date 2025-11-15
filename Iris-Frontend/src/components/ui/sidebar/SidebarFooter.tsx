// Sidebar Footer component

'use client';

import * as React from 'react';
import { cn } from '../utils';
import { SidebarFooterProps } from './types';

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return (
    <div
      data-sidebar='footer'
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  );
}
