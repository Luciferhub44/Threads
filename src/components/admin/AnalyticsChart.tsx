import React from 'react';
import { TrendingUp, Calendar, DollarSign } from 'lucide-react';

interface ChartData {
  month: string;
  value: number;
}

const generateMockData = (): ChartData[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    value: Math.floor(Math.random() * 1000)
  }));
};

export const AnalyticsChart: React.FC = () => {
  const [period, setPeriod] = React.useState<'12m' | '6m' | '30d'>('12m');
  const [data, setData] = React.useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      setData(generateMockData());
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [period]);

  const maxValue = Math.max(...data.map(d => d.value));
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const average = total / data.length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <TrendingUp className="h-5 w-5 text-red-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Donation Analytics</h3>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as '12m' | '6m' | '30d')}
          className="text-sm border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
        >
          <option value="12m">Last 12 months</option>
          <option value="6m">Last 6 months</option>
          <option value="30d">Last 30 days</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center text-red-600 mb-2">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Total Donations</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">${total.toLocaleString()}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center text-red-600 mb-2">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Monthly Average</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">${Math.round(average).toLocaleString()}</p>
        </div>
      </div>
      
      <div className="relative h-64">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading...</div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-end justify-between">
            {data.map(({ month, value }) => {
              const height = (value / maxValue) * 100;
              return (
                <div
                  key={month}
                  className="w-8 bg-red-100 rounded-t hover:bg-red-200 transition-all relative group cursor-pointer"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    {month}: ${value.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-4 text-xs text-gray-500">
        {data.map(({ month }) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  );
};