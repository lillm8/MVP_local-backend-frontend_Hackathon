// Main Sidebar component

'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';
import { useSidebar } from './SidebarProvider';
import {
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_MOBILE,
  SIDEBAR_WIDTH_ICON,
} from './types';

const sidebarVariants = cva(
  'group/sidebar-wrapper flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground',
  {
    variants: {
      variant: {
        sidebar: 'border-r border-sidebar-border',
        floating:
          'absolute inset-y-2 left-2 z-10 mr-2 rounded-lg border border-sidebar-border bg-sidebar shadow-lg',
        inset: 'inset-y-0 border-r border-sidebar-border',
      },
      side: {
        left: 'left-0',
        right: 'right-0',
      },
    },
    defaultVariants: {
      variant: 'sidebar',
      side: 'left',
    },
  }
);

export interface SidebarProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof sidebarVariants> {
  collapsible?: 'offcanvas' | 'icon' | 'none';
  asChild?: boolean;
}

export function Sidebar({
  variant = 'sidebar',
  side = 'left',
  collapsible = 'offcanvas',
  asChild = false,
  className,
  children,
  ...props
}: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-sidebar='sidebar'
      data-mobile={isMobile}
      data-state={state}
      data-collapsible={collapsible}
      data-variant={variant}
      data-side={side}
      className={cn(sidebarVariants({ variant, side }), className)}
      style={
        {
          '--sidebar-width': SIDEBAR_WIDTH,
          '--sidebar-width-mobile': SIDEBAR_WIDTH_MOBILE,
          '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
          ...props.style,
        } as React.CSSProperties as any
      }
      {...props}
    >
      {children}
    </Comp>
  );
}
