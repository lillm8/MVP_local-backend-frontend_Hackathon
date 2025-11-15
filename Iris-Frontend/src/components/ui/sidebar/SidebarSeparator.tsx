// Sidebar Separator component

'use client';

import * as React from 'react';
import { Separator } from '../separator';
import { cn } from '../utils';
import { SidebarSeparatorProps } from './types';

export function SidebarSeparator({
  className,
  ...props
}: SidebarSeparatorProps) {
  return (
    <Separator
      data-sidebar='separator'
      className={cn('bg-sidebar-border mx-2 w-auto', className)}
      {...props}
    />
  );
}
