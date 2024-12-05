import React from 'react';
import { Shield, Key, Lock } from 'lucide-react';

interface SecuritySettingsProps {
  onUpdate: (key: string, value: any) => void;
}

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  onUpdate
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <Shield className="h-5 w-5 text-yellow-400" />
          <p className="ml-3 text-sm text-yellow-700">
            These settings affect the security of your store. Please review carefully.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Admin Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="password"
              className="block w-full pr-10 border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="••••••••"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Key className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Two-Factor Authentication
          </label>
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center">
              <Lock className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-500">Not enabled</span>
            </div>
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Enable 2FA
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-2">API Access</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="h-2 w-2 bg-green-400 rounded-full mr-2"></span>
                <span className="text-sm text-gray-500">Production API Key</span>
              </div>
              <button className="text-sm text-red-600 hover:text-red-500">Regenerate</button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="h-2 w-2 bg-yellow-400 rounded-full mr-2"></span>
                <span className="text-sm text-gray-500">Test API Key</span>
              </div>
              <button className="text-sm text-red-600 hover:text-red-500">Regenerate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};