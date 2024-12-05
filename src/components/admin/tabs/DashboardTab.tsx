import React from 'react';
import { DashboardStats } from '../DashboardStats';
import { QuickActions } from '../QuickActions';
import { RecentActivity } from '../RecentActivity';
import { AnalyticsChart } from '../AnalyticsChart';

interface DashboardTabProps {
  onNewProduct: () => void;
  onViewReports: () => void;
  onOpenSettings: () => void;
  onExportData: () => void;
  onHelp: () => void;
  showAnalytics: boolean;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  onNewProduct,
  onViewReports,
  onOpenSettings,
  onExportData,
  onHelp,
  showAnalytics
}) => {
  return (
    <>
      <DashboardStats />
      <QuickActions 
        onNewProduct={onNewProduct}
        onViewReports={onViewReports}
        onOpenSettings={onOpenSettings}
        onExportData={onExportData}
        onHelp={onHelp}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {showAnalytics && <AnalyticsChart />}
        <RecentActivity />
      </div>
    </>
  );
};