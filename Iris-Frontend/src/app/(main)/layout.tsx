'use client';

import { ReactNode } from 'react';
import { Navigation } from '@components/layout/components/Navigation';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navigation
        currentPage='home'
        onNavigate={() => {}}
        cartCount={0}
        unreadMessages={0}
      />
      <main className='container mx-auto px-4 py-8'>{children}</main>
    </div>
  );
}
