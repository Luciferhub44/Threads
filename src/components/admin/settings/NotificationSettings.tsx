import React from 'react';

interface NotificationSettingsProps {
  emailNotifications: boolean;
  emailFrequency: 'instant' | 'daily' | 'weekly';
  notificationEmail: string;
  timezone: string;
  onUpdate: (key: string, value: any) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  emailNotifications,
  emailFrequency,
  notificationEmail,
  timezone,
  onUpdate
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
          <p className="text-sm text-gray-500">Receive notifications about new donations</p>
        </div>
        <button
          type="button"
          onClick={() => onUpdate('emailNotifications', !emailNotifications)}
          className={`${
            emailNotifications ? 'bg-red-500' : 'bg-gray-200'
          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
        >
          <span
            className={`${
              emailNotifications ? 'translate-x-5' : 'translate-x-0'
            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
          />
        </button>
      </div>
      
      {emailNotifications && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notification Email
            </label>
            <input
              type="email"
              value={notificationEmail}
              onChange={e => onUpdate('notificationEmail', e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Frequency
            </label>
            <select
              value={emailFrequency}
              onChange={e => onUpdate('emailFrequency', e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
            >
              <option value="instant">Instant</option>
              <option value="daily">Daily Digest</option>
              <option value="weekly">Weekly Summary</option>
            </select>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Timezone
        </label>
        <select
          value={timezone}
          onChange={e => onUpdate('timezone', e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
        >
          <option value="UTC">UTC</option>
          <option value="America/New_York">Eastern Time</option>
          <option value="America/Chicago">Central Time</option>
          <option value="America/Denver">Mountain Time</option>
          <option value="America/Los_Angeles">Pacific Time</option>
        </select>
      </div>
    </div>
  );
};