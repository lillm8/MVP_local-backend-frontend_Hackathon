// Sidebar Trigger component

'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { PanelLeftIcon } from 'lucide-react';
import { Button } from '../button';
import { useSidebar } from './SidebarProvider';
import { SidebarTriggerProps } from './types';

export function SidebarTrigger({
  asChild = false,
  ...props
}: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar();

  const Comp = asChild ? Slot : Button;
  return (
    <Comp data-sidebar='trigger' onClick={toggleSidebar} {...props}>
      <PanelLeftIcon />
      <span className='sr-only'>Toggle Sidebar</span>
    </Comp>
  );
}
