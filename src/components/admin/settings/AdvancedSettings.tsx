import React from 'react';

interface AdvancedSettingsProps {
  analyticsEnabled: boolean;
  backupEnabled: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  onUpdate: (key: string, value: any) => void;
}

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  analyticsEnabled,
  backupEnabled,
  backupFrequency,
  onUpdate
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-900">Analytics Tracking</h4>
          <p className="text-sm text-gray-500">Enable detailed analytics tracking</p>
        </div>
        <button
          type="button"
          onClick={() => onUpdate('analyticsEnabled', !analyticsEnabled)}
          className={`${
            analyticsEnabled ? 'bg-red-500' : 'bg-gray-200'
          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
        >
          <span className={`${
            analyticsEnabled ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-900">Automated Backups</h4>
          <p className="text-sm text-gray-500">Enable automated data backups</p>
        </div>
        <button
          type="button"
          onClick={() => onUpdate('backupEnabled', !backupEnabled)}
          className={`${
            backupEnabled ? 'bg-red-500' : 'bg-gray-200'
          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
        >
          <span className={`${
            backupEnabled ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`} />
        </button>
      </div>

      {backupEnabled && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Backup Frequency
          </label>
          <select
            value={backupFrequency}
            onChange={e => onUpdate('backupFrequency', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      )}
    </div>
  );
};