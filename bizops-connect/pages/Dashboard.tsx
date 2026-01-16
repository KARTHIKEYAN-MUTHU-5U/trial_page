import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../constants';
import { api } from '../services/mockApi';
import { Order, Customer, Message } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MessageSquare, ShoppingBag, Users, Clock } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: string | number; icon: any; color: string }) => (
  <div className="bg-white overflow-hidden rounded-xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
    <div className={`p-3 rounded-full ${color} text-white`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export const Dashboard = () => {
  const { business } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (business) {
      Promise.all([
        api.getOrders(business.id),
        api.getCustomers(business.id)
      ]).then(([orderData, customerData]) => {
        setOrders(orderData);
        setCustomers(customerData);
        setIsLoading(false);
      });
    }
  }, [business]);

  const chartData = [
    { name: 'Mon', orders: 4, messages: 24 },
    { name: 'Tue', orders: 3, messages: 18 },
    { name: 'Wed', orders: 7, messages: 45 },
    { name: 'Thu', orders: 2, messages: 12 },
    { name: 'Fri', orders: 6, messages: 38 },
    { name: 'Sat', orders: 8, messages: 50 },
    { name: 'Sun', orders: 5, messages: 30 },
  ];

  if (isLoading) return <div className="flex h-full items-center justify-center">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
         <span className="text-sm text-gray-500">Last updated: Just now</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Customers" value={customers.length} icon={Users} color="bg-blue-500" />
        <StatCard title="Total Orders" value={orders.length} icon={ShoppingBag} color="bg-indigo-500" />
        <StatCard title="Msg Sent (24h)" value="128" icon={MessageSquare} color="bg-green-500" />
        <StatCard title="Avg. Response" value="1.2h" icon={Clock} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-80">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Message Volume</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="messages" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-80">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Trends</h3>
           <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#f59e0b" strokeWidth={3} dot={{r: 4}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};