import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { User, Business } from './types';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { CustomerList } from './pages/CustomerList';
import { CustomerDetail } from './pages/CustomerDetail';
import { OrderList } from './pages/OrderList';
import { TemplateList } from './pages/TemplateList';
import { mockUsers, mockBusinesses, AuthContext } from './constants';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = React.useContext(AuthContext);
  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);

  useEffect(() => {
    // Check local storage for session
    const storedUserId = localStorage.getItem('bizops_user_id');
    if (storedUserId) {
      const foundUser = mockUsers.find(u => u.id === storedUserId);
      if (foundUser) {
        setUser(foundUser);
        const foundBusiness = mockBusinesses.find(b => b.id === foundUser.businessId);
        setBusiness(foundBusiness || null);
      }
    }
  }, []);

  const login = (email: string) => {
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('bizops_user_id', foundUser.id);
      const foundBusiness = mockBusinesses.find(b => b.id === foundUser.businessId);
      setBusiness(foundBusiness || null);
    } else {
      alert('User not found. Try admin@techflow.com or support@greenleaf.com');
    }
  };

  const logout = () => {
    setUser(null);
    setBusiness(null);
    localStorage.removeItem('bizops_user_id');
  };

  return (
    <AuthContext.Provider value={{ user, business, login, logout }}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <PrivateRoute>
                <Layout>
                  <CustomerList />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/customers/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <CustomerDetail />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Layout>
                  <OrderList />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/templates"
            element={
              <PrivateRoute>
                <Layout>
                  <TemplateList />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
}