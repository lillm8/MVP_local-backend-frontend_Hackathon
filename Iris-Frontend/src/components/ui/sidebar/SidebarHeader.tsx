// Sidebar Header component

'use client';

import * as React from 'react';
import { cn } from '../utils';
import { SidebarHeaderProps } from './types';

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return (
    <div
      data-sidebar='header'
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  );
}
