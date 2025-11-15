// Sidebar Inset component

'use client';

import * as React from 'react';
import { cn } from '../utils';
import { SidebarInsetProps } from './types';

export function SidebarInset({ className, ...props }: SidebarInsetProps) {
  return (
    <main
      data-sidebar='inset'
      className={cn(
        'relative flex min-h-screen flex-1 flex-col bg-background',
        className
      )}
      {...props}
    />
  );
}
