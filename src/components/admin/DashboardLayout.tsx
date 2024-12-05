import React from 'react';
import { LayoutDashboard, Package, Settings, HelpCircle, LogOut, ChevronLeft, Layout } from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isActive, isCollapsed, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      isActive 
        ? 'bg-red-500 text-white' 
        : 'text-gray-600 hover:bg-red-50 hover:text-red-500'
    }`}
  >
    {icon}
    {!isCollapsed && <span className="font-medium">{label}</span>}
  </button>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab,
  onTabChange,
  onLogout
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: 'products', label: 'Products', icon: <Package className="h-5 w-5" /> },
    { id: 'content', label: 'Content', icon: <Layout className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
    { id: 'help', label: 'Help', icon: <HelpCircle className="h-5 w-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      } bg-white border-r border-gray-200 p-4 flex flex-col h-screen fixed transition-all duration-300`}>
        <div className={`flex items-center mb-8 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
          <img 
            src="/threads-logo.png" 
            alt="Threads Admin" 
            className={`h-8 w-auto ${isSidebarCollapsed ? 'mx-auto' : ''}`}
          />
          {!isSidebarCollapsed && <span className="ml-2 text-lg font-semibold text-gray-900">Admin</span>}
        </div>
        
        <nav className="flex-1 space-y-2">
          {menuItems.map(item => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isCollapsed={isSidebarCollapsed}
              isActive={activeTab === item.id}
              onClick={() => onTabChange(item.id)}
            />
          ))}
        </nav>

        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1.5 hover:bg-gray-50"
        >
          <ChevronLeft className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
            isSidebarCollapsed ? 'rotate-180' : ''
          }`} />
        </button>

        <div className="mt-auto pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className={`w-full flex items-center text-red-600 hover:text-red-700 ${
              isSidebarCollapsed ? 'justify-center' : 'justify-start'
            } space-x-3 px-4 py-3 hover:bg-red-50 rounded-lg transition-colors`}
          >
            <LogOut className="h-5 w-5" />
            {!isSidebarCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>
      
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Logout</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout();
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};