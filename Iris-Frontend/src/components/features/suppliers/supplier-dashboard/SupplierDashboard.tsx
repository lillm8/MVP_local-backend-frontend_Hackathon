'use client';

import { useSupplierDashboard } from './hooks/use-supplier-dashboard';
import { SupplierDashboardHeader } from './SupplierDashboardHeader';
import { SupplierDashboardSidebar } from './SupplierDashboardSidebar';
import { SupplierOverviewTab } from './SupplierOverviewTab';
import { SupplierProductsTab } from './SupplierProductsTab';
import { SupplierOrdersTab } from './SupplierOrdersTab';
import { SupplierAnalyticsTab } from './SupplierAnalyticsTab';
import { SupplierMessagesTab } from './SupplierMessagesTab';
import { SupplierProfileTab } from './SupplierProfileTab';
import { DiscoverRestaurantsPage } from '@components/features/suppliers/DiscoverRestaurantsPage';
import { toast } from 'sonner';
import { SupplierCustomersTab } from './SupplierCustomersTab';
import type { SupplierDashboardProps } from '@/types/suppliers/supplier-dashboard/types';
import { Badge, Button, Card } from '@components/ui';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChartBig,
  MessageSquare,
  Compass,
  Settings,
  UserCircle,
} from 'lucide-react';

export function SupplierDashboard({ onLogout }: SupplierDashboardProps) {
  const {
    ui,
    products: productsState,
    supplier,
    data,
  } = useSupplierDashboard();

  const sidebarTabs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChartBig },
    { id: 'profile', label: 'Profile', icon: UserCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (ui.activeTab) {
      case 'customers':
        return (
          <SupplierCustomersTab
            customers={data.customers as any}
            onContact={name => toast.success(`Message ${name}`)}
            onViewProfile={id => toast.success(`Open restaurant ${id}`)}
          />
        );
      case 'discover':
        return (
          <div className='space-y-4'>
            <DiscoverRestaurantsPage
              onViewRestaurant={id => toast.success(`Open restaurant ${id}`)}
              onContactRestaurant={name => toast.success(`Message ${name}`)}
            />
          </div>
        );
      case 'messages':
        return <SupplierMessagesTab />;
      case 'settings':
        return (
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold'>Settings</h2>
            <Card className='p-6'>Account and store settings coming soon.</Card>
          </div>
        );
      case 'profile':
        return (
          <SupplierProfileTab
            supplierInfo={supplier.info}
            onEdit={() => ui.setActiveTab('settings')}
          />
        );
      case 'products':
        return (
          <SupplierProductsTab
            products={productsState.items}
            onAddProduct={productsState.handleAdd}
            onEditProduct={productsState.handleEdit}
            onDeleteProduct={productsState.handleDelete}
            onUpdateProduct={productsState.handleUpdate}
          />
        );
      case 'orders':
        return (
          <SupplierOrdersTab
            orders={data.orders}
            expandedOrderId={ui.expandedOrderId}
            onToggleExpanded={id =>
              ui.setExpandedOrderId(ui.expandedOrderId === id ? null : id)
            }
          />
        );
      case 'analytics':
        return <SupplierAnalyticsTab />;
      case 'dashboard':
      default:
        return (
          <div className='space-y-6'>
            <SupplierOverviewTab
              supplierInfo={supplier.info}
              stats={[
                {
                  label: 'Revenue',
                  value: '€12,450',
                  change: '+12.5%',
                  icon: BarChartBig,
                  trend: 'up',
                },
                {
                  label: 'Orders',
                  value: '24',
                  change: '+3',
                  icon: ShoppingCart,
                  trend: 'up',
                },
                {
                  label: 'Rating',
                  value: '4.8/5',
                  change: '+0.1',
                  icon: Users,
                  trend: 'up',
                },
              ]}
            />
          </div>
        );
    }
  };

  return (
    <div className='min-h-screen bg-muted/20'>
      <SupplierDashboardHeader
        supplierName={supplier.info.name}
        onOpenProfile={() => ui.setActiveTab('profile')}
        onOpenSettings={() => ui.setActiveTab('settings')}
        onLogout={onLogout}
      />
      <div className='flex'>
        <SupplierDashboardSidebar
          tabs={sidebarTabs}
          activeTab={ui.activeTab}
          onSelect={id => ui.setActiveTab(id as any)}
        />
        <div className='flex-1 p-6'>{renderContent()}</div>
      </div>
    </div>
  );
}
