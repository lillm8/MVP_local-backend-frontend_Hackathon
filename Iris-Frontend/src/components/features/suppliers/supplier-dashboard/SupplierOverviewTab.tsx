// Overview tab component for supplier dashboard

import {
  SupplierInfo,
  StatCard,
} from '@/types/suppliers/supplier-dashboard/types';
import { SupplierDashboardTab } from '../dashboard/SupplierDashboardTab';
import { toast } from 'sonner';

interface SupplierOverviewTabProps {
  supplierInfo: SupplierInfo;
  stats: StatCard[];
}

export function SupplierOverviewTab({
  supplierInfo,
  stats,
}: SupplierOverviewTabProps) {
  return (
    <SupplierDashboardTab
      stats={stats}
      onContactRestaurant={name => toast.success(`Opening message to ${name}`)}
      onViewRestaurantProfile={id =>
        toast.success(`Open restaurant profile ${id}`)
      }
    />
  );
}
