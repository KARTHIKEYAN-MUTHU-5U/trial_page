import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../constants';
import { api } from '../services/mockApi';
import { Order, OrderStatus } from '../types';
import { Badge } from '../components/ui/Badge';
import { ShoppingBag } from 'lucide-react';

export const OrderList = () => {
  const { business } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (business) {
      api.getOrders(business.id).then(setOrders);
    }
  }, [business]);

  const getStatusVariant = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED: return 'success';
      case OrderStatus.SHIPPED: return 'info';
      case OrderStatus.PROCESSING: return 'warning';
      case OrderStatus.CANCELLED: return 'error';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">#{order.id.split('_')[1]}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.totalAmount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                </td>
              </tr>
            ))}
             {orders.length === 0 && (
                <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        <ShoppingBag className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                        <p>No orders found for this business.</p>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};