'use client';

import { KpiStatsGrid } from './KpiStatsGrid';
import { UrgentActionsCard } from './UrgentActionsCard';
import { UnreadMessagesCard } from './UnreadMessagesCard';
import { NewRestaurantMatchesCard } from './NewRestaurantMatchesCard';
import { RecentReviewsCard } from './RecentReviewsCard';
import { PendingInvoicesCard } from './PendingInvoicesCard';
import {
  SupplierKpiStat,
  useSupplierDashboardTab,
} from '@/hooks/suppliers/use-supplier-dashboard-tab';

export interface SupplierDashboardTabProps {
  onContactRestaurant?: (restaurantName: string) => void;
  onViewRestaurantProfile?: (restaurantId: string) => void;
  stats: SupplierKpiStat[];
}

export function SupplierDashboardTab({
  onContactRestaurant,
  onViewRestaurantProfile,
  stats,
}: SupplierDashboardTabProps) {
  const { handleContactRestaurant, handleViewRestaurantProfile } =
    useSupplierDashboardTab({
      onContactRestaurant,
      onViewRestaurantProfile,
    });

  return (
    <div className='space-y-6'>
      <KpiStatsGrid stats={stats} />

      <div className='grid gap-6 lg:grid-cols-2'>
        <UrgentActionsCard />
        <UnreadMessagesCard onContactRestaurant={handleContactRestaurant} />
      </div>

      <NewRestaurantMatchesCard
        onContactRestaurant={handleContactRestaurant}
        onViewRestaurantProfile={handleViewRestaurantProfile}
      />

      <div className='grid gap-6 lg:grid-cols-2'>
        <RecentReviewsCard />
        <PendingInvoicesCard />
      </div>
    </div>
  );
}

export default SupplierDashboardTab;
