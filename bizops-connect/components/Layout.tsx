import React, { useContext } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../constants';
import { LayoutDashboard, Users, ShoppingBag, MessageSquare, LogOut, Settings } from 'lucide-react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, business, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/customers', label: 'Customers', icon: <Users size={20} /> },
    { path: '/orders', label: 'Orders', icon: <ShoppingBag size={20} /> },
    { path: '/templates', label: 'Templates', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-slate-800 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-indigo-600 tracking-tight">BizOps Connect</h1>
          {business && (
            <div className="mt-2 px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md font-medium inline-block">
              {business.name}
            </div>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive || (item.path !== '/' && location.pathname.startsWith(item.path))
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
         {/* Top bar for mobile/context - simplified for this demo */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center h-16 shrink-0">
           <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Mode:</span>
              <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold border border-yellow-200">
                {business?.whatsappMode || 'MOCK'}
              </span>
           </div>
           <div className="flex gap-4">
              {/* Could put notification bells here */}
           </div>
        </header>

        <div className="flex-1 overflow-auto p-6 md:p-8">
            <div className="max-w-7xl mx-auto h-full flex flex-col">
                 {children}
            </div>
        </div>
      </main>
    </div>
  );
};