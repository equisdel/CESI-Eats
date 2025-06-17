import React from 'react';
import { Clock, Truck, CheckCircle } from 'lucide-react';
import { Order } from '../../types';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'in-progress': return 'bg-blue-100 text-blue-800';
    case 'delivered': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

interface DashboardPanelProps {
  orders: Order[];
  className?: string;
}

const DashboardPanel: React.FC<DashboardPanelProps> = ({ orders, className }) => {
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const activeDeliveries = orders.filter(o => o.status === 'in-progress').length;
  const completedToday = orders.filter(o => o.status === 'delivered').length;

  const stats = [
    { title: 'Pending Orders', value: pendingOrders, icon: Clock, color: 'bg-yellow-500', bgColor: 'bg-yellow-50' },
    { title: 'Active Deliveries', value: activeDeliveries, icon: Truck, color: 'bg-blue-500', bgColor: 'bg-blue-50' },
    { title: 'Completed Today', value: completedToday, icon: CheckCircle, color: 'bg-green-500', bgColor: 'bg-green-50' },
  ];

  const recentOrders = orders.slice(0, 5).map(o => ({
    ...o,
    customerName: o.customerName || o.user?.name || 'Unknown',
    restaurantName: o.restaurant.name
  }));

  return (
    <div className={`space-y-6 ${className || ''}`}>
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome, Delivery Partner!</h2>
        <p className="text-blue-100">Ready to deliver some delicious meals today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className={`${s.bgColor} rounded-lg p-6 border border-gray-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{s.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{s.value}</p>
              </div>
              <div className={`${s.color} rounded-full p-3`}>
                <s.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentOrders.map(o => (
            <div key={o.id} className="p-6 flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">Order #{o.id}</h4>
                <p className="text-sm text-gray-600">{o.customerName} • {o.restaurantName}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(o.status)}`}>
                {o.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPanel;
