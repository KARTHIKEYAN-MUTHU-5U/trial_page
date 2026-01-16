import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../constants';
import { api } from '../services/mockApi';
import { Customer } from '../types';
import { Link } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { Search } from 'lucide-react';

export const CustomerList = () => {
  const { business } = useContext(AuthContext);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (business) {
      api.getCustomers(business.id).then(setCustomers);
    }
  }, [business]);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
                type="text" 
                placeholder="Search customers..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                        {customer.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      <div className="text-xs text-gray-500">ID: {customer.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{customer.email}</div>
                  <div className="text-sm text-gray-500">{customer.phoneNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   {customer.optInStatus ? (
                       <Badge variant="success">Opted-in</Badge>
                   ) : (
                       <Badge variant="neutral">Opted-out</Badge>
                   )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <div className="flex gap-1 flex-wrap">
                     {customer.tags.map(tag => (
                         <span key={tag} className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600 border border-gray-200">
                             {tag}
                         </span>
                     ))}
                   </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/customers/${customer.id}`} className="text-indigo-600 hover:text-indigo-900">
                    Manage
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCustomers.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm">No customers found.</div>
        )}
      </div>
    </div>
  );
};