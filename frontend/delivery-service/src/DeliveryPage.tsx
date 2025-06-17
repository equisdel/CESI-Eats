import React, { useState, useEffect } from 'react';
import { Header } from './components/header';
import OrdersPanel from './components/DeliveryDriverDashboard/OrdersPanel';
import Sidebar from './components/DeliveryDriverDashboard/Sidebar';
import DashboardPanel from './components/DeliveryDriverDashboard/DashboardPanel';
import QRCode from 'qrcode.react';
import axios from 'axios';
import { Order, OrderStatus } from './types';

function DeliveryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [qrCode, setQrCode] = useState('');
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    axios.get<Order[]>('/api/orders', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error('Error fetching orders:', err));
  }, []);

  const handleOrderSelect = (order: Order) => {
    setSelectedOrder(order);
    setQrCode(JSON.stringify({
      orderId: order.id,
      restaurant: order.restaurant.name,
      customer: order.customerName,
      status: order.status,
    }));
  };

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setOrders(prev =>
        prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
      );
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (e) {
      console.error('Error updating status:', e);
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-yellow-400 mb-8">Delivery Dashboard</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <OrdersPanel
                orders={orders}
                onAcceptOrder={(orderId) => {
                  const o = orders.find(o => o.id === orderId);
                  if (o) handleOrderSelect(o);
                }}
                className="bg-white text-gray-800 p-6 rounded-lg shadow-md"
              />
              <div>
                <DashboardPanel className="bg-orange-200 p-4 mb-4" orders={orders} />

                {selectedOrder ? (
                  <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md mt-4">
                    <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                    <div className="space-y-4 mb-6">
                      <div>
                        <h3 className="font-medium text-lg">Order #{selectedOrder.id}</h3>
                      </div>
                      <div>
                        <h4 className="font-medium">Restaurant</h4>
                        <p>{selectedOrder.restaurant.name}</p>
                        <p className="text-sm text-gray-500">{selectedOrder.restaurant.address}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Customer</h4>
                        <p>{selectedOrder.customerName}</p>
                        {selectedOrder.user?.address && <p className="text-sm">{selectedOrder.user.address}</p>}
                      </div>
                      {selectedOrder.address && (
                        <div>
                          <h4 className="font-medium">Delivery Address</h4>
                          <p>{selectedOrder.address}</p>
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium">Status</h4>
                        <p className="capitalize">{selectedOrder.status}</p>
                      </div>
                      {selectedOrder.items?.length ? (
                        <div>
                          <h4 className="font-medium">Items</h4>
                          <ul className="list-disc list-inside">
                            {selectedOrder.items.map((i, idx) => <li key={idx}>{i}</li>)}
                          </ul>
                        </div>
                      ) : null}
                      {selectedOrder.total != null && (
                        <div>
                          <h4 className="font-medium">Total</h4>
                          <p className="text-lg font-semibold">${selectedOrder.total.toFixed(2)}</p>
                        </div>
                      )}
                      {selectedOrder.createdAt && (
                        <div>
                          <h4 className="font-medium">Order Placed</h4>
                          <p>{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                        </div>
                      )}
                      {selectedOrder.estimatedDeliveryTime && (
                        <div>
                          <h4 className="font-medium">Estimated Delivery</h4>
                          <p>{new Date(selectedOrder.estimatedDeliveryTime).toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mb-6">
                      <button
                        onClick={() => updateOrderStatus(selectedOrder.id, 'accepted')}
                        className="bg-cyan-500 px-4 py-2 rounded hover:bg-cyan-600"
                        disabled={['completed', 'accepted'].includes(selectedOrder.status)}
                      >
                        Mark Accepted
                      </button>
                      <button
                        onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}
                        className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
                        disabled={selectedOrder.status === 'completed'}
                      >
                        Mark Completed
                      </button>
                    </div>
                    <div className="text-center">
                      <h4>Order QR Code</h4>
                      <QRCode value={qrCode} size={200} level="M" includeMargin />
                      <p className="text-sm text-gray-500 mt-2">Scan to verify delivery</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 mt-4">Select an order to view details.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryPage;

<div className="bg-blue-500 text-white p-4 rounded-xl shadow-lg">
  Tailwind is working! 🎉
</div>

