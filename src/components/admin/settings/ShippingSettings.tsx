import React from 'react';
import { Truck, Plus, MapPin } from 'lucide-react';

interface ShippingSettingsProps {
  shippingZones: string[];
  onUpdate: (key: string, value: any) => void;
}

export const ShippingSettings: React.FC<ShippingSettingsProps> = ({
  shippingZones,
  onUpdate
}) => {
  const [newZone, setNewZone] = React.useState('');

  const handleAddZone = () => {
    if (newZone && !shippingZones.includes(newZone)) {
      onUpdate('shippingZones', [...shippingZones, newZone]);
      setNewZone('');
    }
  };

  const handleRemoveZone = (zone: string) => {
    onUpdate('shippingZones', shippingZones.filter(z => z !== zone));
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <div className="flex">
          <Truck className="h-5 w-5 text-blue-400" />
          <p className="ml-3 text-sm text-blue-700">
            Configure shipping zones and delivery options for your store.
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Add Shipping Zone
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <div className="relative flex items-stretch flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={newZone}
              onChange={(e) => setNewZone(e.target.value)}
              className="focus:ring-red-500 focus:border-red-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
              placeholder="Enter country code (e.g., US, UK)"
            />
          </div>
          <button
            type="button"
            onClick={handleAddZone}
            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
          >
            <Plus className="h-5 w-5 text-gray-400" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Active Shipping Zones</h4>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {shippingZones.map((zone) => (
              <li key={zone}>
                <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{zone}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveZone(zone)}
                    className="ml-2 text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
            {shippingZones.length === 0 && (
              <li className="px-4 py-4 text-sm text-gray-500 text-center">
                No shipping zones configured
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};