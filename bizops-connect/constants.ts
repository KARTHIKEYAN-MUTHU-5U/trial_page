import React from 'react';
import { Business, Customer, Order, Template, User, UserRole, WhatsAppMode, OrderStatus, TemplateStatus, Message, MessageStatus, MessageInitiator } from './types';

export const AuthContext = React.createContext<{
  user: User | null;
  business: Business | null;
  login: (email: string) => void;
  logout: () => void;
}>({
  user: null,
  business: null,
  login: () => {},
  logout: () => {},
});

export const mockBusinesses: Business[] = [
  {
    id: 'biz_1',
    name: 'TechFlow Solutions',
    whatsappMode: WhatsAppMode.MOCK,
    dailyMessageLimit: 1000,
  },
  {
    id: 'biz_2',
    name: 'GreenLeaf Organics',
    whatsappMode: WhatsAppMode.MOCK,
    dailyMessageLimit: 500,
  },
];

export const mockUsers: User[] = [
  {
    id: 'u_1',
    email: 'admin@techflow.com',
    name: 'Alice Admin',
    role: UserRole.BUSINESS_ADMIN,
    businessId: 'biz_1',
  },
  {
    id: 'u_2',
    email: 'support@greenleaf.com',
    name: 'Bob Support',
    role: UserRole.STAFF,
    businessId: 'biz_2',
  },
];

export const mockCustomers: Customer[] = [
  {
    id: 'c_1',
    businessId: 'biz_1',
    name: 'John Doe',
    phoneNumber: '+15550101',
    email: 'john@example.com',
    optInStatus: true,
    optInTimestamp: '2023-01-15T10:00:00Z',
    lastInboundMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago (Window OPEN)
    tags: ['VIP', 'Tech Enthusiast'],
  },
  {
    id: 'c_2',
    businessId: 'biz_1',
    name: 'Jane Smith',
    phoneNumber: '+15550102',
    email: 'jane@example.com',
    optInStatus: false,
    tags: ['Lead'],
  },
  {
    id: 'c_3',
    businessId: 'biz_1',
    name: 'Mike Johnson',
    phoneNumber: '+15550103',
    email: 'mike@example.com',
    optInStatus: true,
    lastInboundMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), // 25 hours ago (Window CLOSED)
    tags: ['Inactive'],
  },
];

export const mockOrders: Order[] = [
  {
    id: 'o_101',
    businessId: 'biz_1',
    customerId: 'c_1',
    totalAmount: 299.99,
    status: OrderStatus.DELIVERED,
    createdAt: '2023-10-01T10:00:00Z',
    items: [{ name: 'Wireless Headphones', quantity: 1, price: 299.99 }],
  },
  {
    id: 'o_102',
    businessId: 'biz_1',
    customerId: 'c_1',
    totalAmount: 49.99,
    status: OrderStatus.PROCESSING,
    createdAt: '2023-10-25T14:30:00Z',
    items: [{ name: 'USB-C Cable', quantity: 2, price: 24.99 }],
  },
];

export const mockTemplates: Template[] = [
  {
    id: 't_1',
    businessId: 'biz_1',
    name: 'order_update',
    category: 'UTILITY',
    language: 'en_US',
    content: 'Hello {{1}}, your order {{2}} has been updated to status: {{3}}.',
    status: TemplateStatus.APPROVED,
    version: 1,
  },
  {
    id: 't_2',
    businessId: 'biz_1',
    name: 'seasonal_promo',
    category: 'MARKETING',
    language: 'en_US',
    content: 'Hi {{1}}! Check out our new summer collection with up to 50% off.',
    status: TemplateStatus.APPROVED,
    version: 2,
  },
  {
    id: 't_3',
    businessId: 'biz_1',
    name: 'welcome_message',
    category: 'UTILITY',
    language: 'en_US',
    content: 'Welcome to TechFlow, {{1}}! Thanks for opting in.',
    status: TemplateStatus.PENDING,
    version: 1,
  },
];

export const mockMessages: Message[] = [
  {
    id: 'm_1',
    businessId: 'biz_1',
    customerId: 'c_1',
    content: 'Where is my order?',
    status: MessageStatus.READ,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    initiatedBy: MessageInitiator.CUSTOMER,
    isTemplate: false,
  },
  {
    id: 'm_2',
    businessId: 'biz_1',
    customerId: 'c_1',
    content: 'Hello John, your order #101 has been delivered.',
    status: MessageStatus.DELIVERED,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25.5).toISOString(),
    initiatedBy: MessageInitiator.SYSTEM,
    templateId: 't_1',
    isTemplate: true,
  },
  {
    id: 'm_3',
    businessId: 'biz_1',
    customerId: 'c_1',
    content: 'Thanks!',
    status: MessageStatus.DELIVERED,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    initiatedBy: MessageInitiator.CUSTOMER,
    isTemplate: false,
  },
];