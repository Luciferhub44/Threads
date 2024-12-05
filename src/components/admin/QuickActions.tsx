import React from 'react';
import { Plus, FileText, Settings, HelpCircle, Download } from 'lucide-react';

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description, icon, onClick, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-left w-full border border-gray-200 hover:border-red-200 transform hover:-translate-y-1"
  >
    <div className="flex items-start">
      <div className="p-3 bg-red-50 rounded-full ring-4 ring-red-50">
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </button>
);

interface QuickActionsProps {
  onNewProduct: () => void;
  onViewReports: () => void;
  onOpenSettings: () => void;
  onExportData: () => void;
  onHelp: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ 
  onNewProduct,
  onViewReports,
  onOpenSettings,
  onExportData,
  onHelp
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <ActionCard
        title="Add New Product"
        description="Create a new product listing"
        icon={<Plus className="h-6 w-6 text-red-500" />}
        onClick={onNewProduct}
      />
      <ActionCard
        title="View Reports"
        description="Access donation analytics"
        icon={<FileText className="h-6 w-6 text-red-500" />}
        onClick={onViewReports}
      />
      <ActionCard
        title="Export Data"
        description="Download analytics report"
        icon={<Download className="h-6 w-6 text-red-500" />}
        onClick={onExportData}
      />
      <ActionCard
        title="Settings"
        description="Configure your store"
        icon={<Settings className="h-6 w-6 text-red-500" />}
        onClick={onOpenSettings}
      />
      <ActionCard
        title="Help & Support"
        description="Get assistance"
        icon={<HelpCircle className="h-6 w-6 text-red-500" />}
        onClick={onHelp}
      />
    </div>
  );
};