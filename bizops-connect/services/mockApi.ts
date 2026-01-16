import { mockCustomers, mockOrders, mockTemplates, mockMessages } from '../constants';
import { Customer, Message, MessageInitiator, MessageStatus, Order, Template } from '../types';
import { GoogleGenAI } from "@google/genai";

// In a real app, these would be API calls.
// Here we simulate the backend logic described in the prompt.

export const api = {
  getCustomers: async (businessId: string): Promise<Customer[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCustomers.filter(c => c.businessId === businessId));
      }, 500);
    });
  },

  getCustomerById: async (customerId: string): Promise<Customer | undefined> => {
     return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCustomers.find(c => c.id === customerId));
      }, 300);
    });
  },

  getOrders: async (businessId: string): Promise<Order[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockOrders.filter(o => o.businessId === businessId));
      }, 500);
    });
  },

  getTemplates: async (businessId: string): Promise<Template[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTemplates.filter(t => t.businessId === businessId));
      }, 500);
    });
  },

  getMessages: async (businessId: string, customerId: string): Promise<Message[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          mockMessages
            .filter(m => m.businessId === businessId && m.customerId === customerId)
            .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        );
      }, 400);
    });
  },

  sendMessage: async (message: Partial<Message>): Promise<Message> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMessage: Message = {
          id: `m_${Date.now()}`,
          businessId: message.businessId!,
          customerId: message.customerId!,
          content: message.content!,
          status: MessageStatus.SENT, // Immediately sent in mock
          timestamp: new Date().toISOString(),
          initiatedBy: MessageInitiator.STAFF,
          isTemplate: message.isTemplate || false,
          templateId: message.templateId,
        };
        // In a real app with "Mock Provider", we'd push this to the DB
        mockMessages.push(newMessage);
        resolve(newMessage);
      }, 600);
    });
  },

  // Gemini Integration for Drafting
  draftMessage: async (context: string, tone: string): Promise<string> => {
    if (!process.env.API_KEY) {
        console.warn("API_KEY not set for Gemini. Returning mock.");
        return `[Mock AI Draft]: Here is a polite response about ${context}`;
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `You are a helpful customer support agent for a business. 
            Draft a short, professional WhatsApp message (under 300 chars) for a customer.
            Context: ${context}. 
            Tone: ${tone}.
            Do not include placeholders.`,
        });
        return response.text || "Could not generate draft.";
    } catch (e) {
        console.error("Gemini Error", e);
        return "Error generating draft.";
    }
  }
};