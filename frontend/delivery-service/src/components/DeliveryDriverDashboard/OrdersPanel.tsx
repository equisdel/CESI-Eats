// frontend/delivery-service/src/components/DeliveryDriverDashboard/OrdersPanel.tsx

import React from 'react';
import { MapPin, Package } from 'lucide-react';
import { Order, OrderStatus } from '../../types'; // Import Order and OrderStatus from the shared types file

// Mock getStatusColor function since it's not defined
const getStatusColor = (status: OrderStatus) => { // Use OrderStatus type
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'accepted': return 'bg-blue-100 text-blue-800'; // Added 'accepted' for completeness
    case 'completed': return 'bg-green-100 text-green-800'; // Matches your types.ts
    default: return 'bg-gray-100 text-gray-800';
  }
};

interface OrdersPanelProps {
  orders: Order[];
  onAcceptOrder: (orderId: string) => void;
  className?: string; // Add className prop if it's being passed from parent
}

const OrdersPanel: React.FC<OrdersPanelProps> = ({ orders, onAcceptOrder, className }) => {
  const availableOrders = orders.filter(order => order.status === 'pending'); // Filter by 'pending'

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Available Orders</h2>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {availableOrders.length} Available
        </div>
      </div>

      <div className="grid gap-6">
        {availableOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
                {/* Use order.customerName as per your types.ts */}
                <p className="text-gray-600">{order.customerName}</p>
                {/* Use order.restaurant.name as per your types.ts */}
                <p className="text-sm text-gray-500">{order.restaurant.name}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            
            {/* Use order.address as per your types.ts (top-level optional) */}
            {order.address && (
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  {order.address}
                </p>
              </div>
            )}

            {order.items && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Items:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              {order.total && (
                <p className="text-lg font-semibold text-gray-800">${order.total.toFixed(2)}</p>
              )}
              <button
                onClick={() => onAcceptOrder(order.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Accept Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {availableOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No orders available</h3>
          <p className="text-gray-500">Check back soon for new delivery opportunities!</p>
        </div>
      )}
    </div>
  );
};

export default OrdersPanel;