// Sidebar Input component

'use client';

import * as React from 'react';
import { Input } from '../input';
import { cn } from '../utils';
import { SidebarInputProps } from './types';

export function SidebarInput({ className, ...props }: SidebarInputProps) {
  return (
    <Input
      data-sidebar='input'
      className={cn(
        'focus-visible:ring-sidebar-ring h-8 w-full bg-background shadow-none focus-visible:ring-2',
        className
      )}
      {...props}
    />
  );
}
