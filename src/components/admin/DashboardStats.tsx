import React from 'react';
import { DollarSign, Package, ShoppingBag, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-red-200 transition-all duration-200 hover:shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
        {trend && (
          <div className={`flex items-center mt-2 ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.isPositive ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            )}
            <span className="text-sm font-medium">
              {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-gray-500 ml-2">vs last month</span>
          </div>
        )}
      </div>
      <div className="p-3 bg-red-50 rounded-full ring-4 ring-red-50 transform transition-transform group-hover:scale-110">
        {icon}
      </div>
    </div>
  </div>
);

export const DashboardStats: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [stats, setStats] = React.useState({
    donations: { value: 0, trend: 0 },
    products: { value: 0 },
    orders: { value: 0, trend: 0 },
    donors: { value: 0, trend: 0 }
  });

  React.useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setStats({
        donations: { value: 12426, trend: 12.5 },
        products: { value: 24 },
        orders: { value: 845, trend: 8 },
        donors: { value: 426, trend: 4.6 }
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Donations"
        value={isLoading ? '...' : `$${stats.donations.value.toLocaleString()}`}
        icon={<DollarSign className="h-6 w-6 text-red-500" />}
        trend={isLoading ? undefined : { value: stats.donations.trend, isPositive: true }}
      />
      <StatCard
        title="Active Products"
        value={isLoading ? '...' : stats.products.value.toString()}
        icon={<Package className="h-6 w-6 text-red-500" />}
      />
      <StatCard
        title="Total Orders"
        value={isLoading ? '...' : stats.orders.value.toString()}
        icon={<ShoppingBag className="h-6 w-6 text-red-500" />}
        trend={isLoading ? undefined : { value: stats.orders.trend, isPositive: true }}
      />
      <StatCard
        title="Total Donors"
        value={isLoading ? '...' : stats.donors.value.toString()}
        icon={<Users className="h-6 w-6 text-red-500" />}
        trend={isLoading ? undefined : { value: stats.donors.trend, isPositive: true }}
      />
    </div>
  );
};