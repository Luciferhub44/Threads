export interface StoreSettings {
  storeName: string;
  logo: string | null;
  emailNotifications: boolean;
  emailFrequency: 'instant' | 'daily' | 'weekly';
  currency: string;
  language?: string;
  autoPublish?: boolean;
  lowStockAlert?: number;
  timezone?: string;
  orderPrefix?: string;
  taxRate?: number;
  shippingZones?: string[];
  analyticsEnabled?: boolean;
  backupEnabled?: boolean;
  backupFrequency?: 'daily' | 'weekly' | 'monthly';
}