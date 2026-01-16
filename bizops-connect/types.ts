export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  BUSINESS_ADMIN = 'BUSINESS_ADMIN',
  STAFF = 'STAFF',
}

export enum WhatsAppMode {
  MOCK = 'MOCK',
  PRODUCTION = 'PRODUCTION',
}

export interface Business {
  id: string;
  name: string;
  whatsappMode: WhatsAppMode;
  dailyMessageLimit: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  businessId?: string; // Optional for Super Admin
}

export interface Customer {
  id: string;
  businessId: string;
  name: string;
  phoneNumber: string;
  email: string;
  optInStatus: boolean;
  optInTimestamp?: string;
  lastInboundMessageAt?: string; // Critical for 24h window
  tags: string[];
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface Order {
  id: string;
  businessId: string;
  customerId: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  items: { name: string; quantity: number; price: number }[];
}

export enum TemplateStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export interface Template {
  id: string;
  businessId: string;
  name: string;
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  language: string;
  content: string; // "Hello {{1}}, your order {{2}} is ready."
  status: TemplateStatus;
  version: number;
}

export enum MessageStatus {
  QUEUED = 'QUEUED',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED',
}

export enum MessageInitiator {
  SYSTEM = 'SYSTEM',
  STAFF = 'STAFF',
  CUSTOMER = 'CUSTOMER',
}

export interface Message {
  id: string;
  businessId: string;
  customerId: string;
  content: string;
  status: MessageStatus;
  timestamp: string;
  initiatedBy: MessageInitiator;
  templateId?: string;
  isTemplate: boolean;
}
