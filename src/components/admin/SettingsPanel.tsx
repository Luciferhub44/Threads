import React from 'react';
import { Save, RefreshCw, Settings, Bell, Shield, Globe, DollarSign, Truck, Lock } from 'lucide-react';
import { GeneralSettings } from './settings/GeneralSettings';
import { NotificationSettings } from './settings/NotificationSettings';
import { AdvancedSettings } from './settings/AdvancedSettings';
import { SecuritySettings } from './settings/SecuritySettings';
import { ShippingSettings } from './settings/ShippingSettings';

interface SettingsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  description,
  children
}) => (
  <div className="border-b border-gray-200 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0">
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 mb-4">{description}</p>
    {children}
  </div>
);

interface StoreSettings {
  storeName: string;
  emailNotifications: boolean;
  emailFrequency: 'instant' | 'daily' | 'weekly';
  currency: string;
  language: string;
  autoPublish: boolean;
  lowStockAlert: number;
  notificationEmail: string;
  timezone: string;
  orderPrefix: string;
  taxRate: number;
  shippingZones: string[];
  analyticsEnabled: boolean;
  backupEnabled: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
}

interface SettingsPanelProps {
  onSave: (settings: StoreSettings) => Promise<boolean>;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onSave }) => {
  const [activeTab, setActiveTab] = React.useState<string>('general');
  const [settings, setSettings] = React.useState<StoreSettings>({
    storeName: 'Threads Charity',
    logo: localStorage.getItem('store_logo') || null,
    emailNotifications: true,
    emailFrequency: 'instant',
    currency: 'USD',
    language: 'en',
    autoPublish: false,
    lowStockAlert: 5,
    notificationEmail: '',
    timezone: 'UTC',
    orderPrefix: 'THR',
    taxRate: 0,
    shippingZones: ['US'],
    analyticsEnabled: true,
    backupEnabled: false,
    backupFrequency: 'daily'
  });

  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const validateSettings = (): string | null => {
    if (!settings.storeName.trim()) {
      return 'Store name is required';
    }
    if (settings.emailNotifications && !settings.notificationEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return 'Notification email is required when email notifications are enabled';
    }
    if (settings.lowStockAlert < 0) {
      return 'Low stock alert threshold must be a positive number';
    }
    if (settings.taxRate < 0 || settings.taxRate > 100) {
      return 'Tax rate must be between 0 and 100';
    }
    if (settings.orderPrefix.length < 2) {
      return 'Order prefix must be at least 2 characters';
    }
    return null;
  };

  const handleSave = async () => {
    const validationError = validateSettings();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const success = await onSave(settings);
      if (success) {
        setSuccessMessage('Settings saved successfully');
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (error) {
      setError('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    // Save all settings to localStorage
    localStorage.setItem('store_settings', JSON.stringify({
      ...settings,
      [key]: value
    }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings, color: 'text-blue-500' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-yellow-500' },
    { id: 'shipping', label: 'Shipping', icon: Truck, color: 'text-green-500' },
    { id: 'security', label: 'Security', icon: Lock, color: 'text-purple-500' },
    { id: 'advanced', label: 'Advanced', icon: Shield, color: 'text-red-500' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Store Settings</h2>
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
            {successMessage && (
              <p className="mt-1 text-sm text-green-600">{successMessage}</p>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map(({ id, label, icon: Icon, color }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className={`${
                activeTab === id
                  ? `border-red-500 ${color}`
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center transition-colors duration-200`}
            >
              <Icon className={`w-5 h-5 mr-2 ${activeTab === id ? color : ''}`} />
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'general' && (
          <GeneralSettings
            storeName={settings.storeName}
            currency={settings.currency}
            orderPrefix={settings.orderPrefix}
            onUpdate={handleUpdateSetting}
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationSettings
            emailNotifications={settings.emailNotifications}
            emailFrequency={settings.emailFrequency}
            notificationEmail={settings.notificationEmail}
            timezone={settings.timezone}
            onUpdate={handleUpdateSetting}
          />
        )}

        {activeTab === 'shipping' && (
          <ShippingSettings
            shippingZones={settings.shippingZones}
            onUpdate={handleUpdateSetting}
          />
        )}

        {activeTab === 'security' && (
          <SecuritySettings
            onUpdate={handleUpdateSetting}
          />
        )}

        {activeTab === 'advanced' && (
          <AdvancedSettings
            analyticsEnabled={settings.analyticsEnabled}
            backupEnabled={settings.backupEnabled}
            backupFrequency={settings.backupFrequency}
            onUpdate={handleUpdateSetting}
          />
        )}
      </div>
    </div>
  );
};