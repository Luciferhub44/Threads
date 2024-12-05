import React from 'react';
import { Activity, ArrowRight } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'donation' | 'product' | 'system';
  message: string;
  timestamp: string;
}

const recentActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'donation',
    message: 'New donation received for Classic Comfort Hoodie',
    timestamp: '5 minutes ago'
  },
  {
    id: '2',
    type: 'product',
    message: 'Winter Warrior Hoodie stock updated',
    timestamp: '2 hours ago'
  },
  {
    id: '3',
    type: 'system',
    message: 'System backup completed successfully',
    timestamp: '1 day ago'
  }
];

export const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <button className="text-sm text-red-500 hover:text-red-600 flex items-center">
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};