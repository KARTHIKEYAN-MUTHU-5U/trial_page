import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../constants';
import { api } from '../services/mockApi';
import { Customer, Message, Template, MessageInitiator, MessageStatus } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Send, Clock, AlertTriangle, Sparkles, FileText } from 'lucide-react';

export const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { business } = useContext(AuthContext);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (business && id) {
      api.getCustomerById(id).then(setCustomer);
      api.getMessages(business.id, id).then(setMessages);
      api.getTemplates(business.id).then(setTemplates);
    }
  }, [business, id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Logic: 24h Window
  const isWindowOpen = customer?.lastInboundMessageAt
    ? (new Date().getTime() - new Date(customer.lastInboundMessageAt).getTime()) < 24 * 60 * 60 * 1000
    : false;

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !business || !customer) return;

    setIsSending(true);
    const sentMsg = await api.sendMessage({
      businessId: business.id,
      customerId: customer.id,
      content: newMessage,
      isTemplate: false
    });
    setMessages([...messages, sentMsg]);
    setNewMessage('');
    setIsSending(false);
  };

  const handleSendTemplate = async (template: Template) => {
    if (!business || !customer) return;
    setIsSending(true);
    setShowTemplateModal(false);
    
    // Simulate filling params for demo
    const filledContent = template.content
        .replace('{{1}}', customer.name.split(' ')[0])
        .replace('{{2}}', '#ORD-999')
        .replace('{{3}}', 'SHIPPED');

    const sentMsg = await api.sendMessage({
        businessId: business.id,
        customerId: customer.id,
        content: filledContent,
        isTemplate: true,
        templateId: template.id
    });
    setMessages([...messages, sentMsg]);
    setIsSending(false);
  };

  const handleGenerateAI = async () => {
      setGeneratingAI(true);
      const draft = await api.draftMessage(
          `Last message from customer: ${messages[messages.length-1]?.content || 'None'}. Reply to confirm we are checking status.`,
          "Professional and helpful"
      );
      setNewMessage(draft);
      setGeneratingAI(false);
  };

  if (!customer) return <div>Loading customer...</div>;

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6">
      {/* Left: Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                    {customer.name.charAt(0)}
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">{customer.name}</h3>
                    <p className="text-xs text-gray-500">{customer.phoneNumber}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {isWindowOpen ? (
                    <Badge variant="success">24h Window Open</Badge>
                ) : (
                    <Badge variant="warning">Window Closed</Badge>
                )}
            </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50" ref={scrollRef}>
            {messages.map((msg) => {
                const isStaff = msg.initiatedBy === MessageInitiator.STAFF || msg.initiatedBy === MessageInitiator.SYSTEM;
                return (
                    <div key={msg.id} className={`flex ${isStaff ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] rounded-lg p-3 shadow-sm text-sm relative ${
                            isStaff 
                            ? 'bg-indigo-600 text-white rounded-br-none' 
                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                        }`}>
                            {msg.isTemplate && <div className="text-[10px] uppercase font-bold opacity-75 mb-1 flex items-center gap-1"><FileText size={10} /> Template</div>}
                            <p>{msg.content}</p>
                            <div className={`text-[10px] mt-1 text-right ${isStaff ? 'text-indigo-200' : 'text-gray-400'}`}>
                                {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                {isStaff && (
                                    <span className="ml-1 opacity-80">
                                        {msg.status === MessageStatus.READ ? '✓✓' : '✓'}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white">
            {!customer.optInStatus ? (
                 <div className="flex items-center justify-center p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100 gap-2">
                    <AlertTriangle size={16} />
                    Cannot message: Customer has not opted in.
                 </div>
            ) : (
                <>
                {/* Warning if window closed */}
                {!isWindowOpen && (
                     <div className="mb-3 flex items-center justify-between p-3 bg-yellow-50 text-yellow-800 rounded-md text-sm border border-yellow-200">
                        <div className="flex items-center gap-2">
                             <Clock size={16} />
                             <span>24h Session Expired. Only templates allowed.</span>
                        </div>
                        <Button size="sm" variant="secondary" onClick={() => setShowTemplateModal(true)}>Browse Templates</Button>
                     </div>
                )}

                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            disabled={!isWindowOpen}
                            className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-2.5 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                            placeholder={isWindowOpen ? "Type a message..." : "Select a template to start..."}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                         {isWindowOpen && (
                             <button 
                                onClick={handleGenerateAI}
                                disabled={generatingAI}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-500 hover:text-indigo-700 p-1"
                                title="Generate with AI"
                             >
                                 {generatingAI ? <div className="animate-spin h-4 w-4 border-2 border-indigo-500 rounded-full border-t-transparent"></div> : <Sparkles size={18} />}
                             </button>
                         )}
                    </div>
                    <Button 
                        onClick={handleSendMessage} 
                        disabled={!isWindowOpen || !newMessage.trim() || isSending}
                    >
                        <Send size={18} />
                    </Button>
                </div>
                </>
            )}
        </div>
      </div>

      {/* Right: Info Panel */}
      <div className="w-80 space-y-6">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Customer Details</h4>
            <div className="space-y-3 text-sm">
                <div>
                    <label className="text-gray-500 text-xs">Email</label>
                    <p className="font-medium">{customer.email}</p>
                </div>
                <div>
                    <label className="text-gray-500 text-xs">Tags</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {customer.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                    </div>
                </div>
                <div>
                    <label className="text-gray-500 text-xs">Opt-in Status</label>
                    <div className="mt-1">
                         {customer.optInStatus ? <Badge variant="success">Active</Badge> : <Badge variant="error">Inactive</Badge>}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Template Modal */}
      {showTemplateModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-bold text-lg">Select Message Template</h3>
                      <button onClick={() => setShowTemplateModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                  </div>
                  <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
                      {templates.map(t => (
                          <div 
                            key={t.id} 
                            onClick={() => handleSendTemplate(t)}
                            className="border border-gray-200 rounded-lg p-3 hover:border-indigo-500 hover:bg-indigo-50 cursor-pointer transition-all group"
                          >
                              <div className="flex justify-between mb-1">
                                  <span className="font-medium text-gray-900 group-hover:text-indigo-700">{t.name}</span>
                                  <span className="text-xs text-gray-400 uppercase">{t.category}</span>
                              </div>
                              <p className="text-sm text-gray-500 line-clamp-2">{t.content}</p>
                          </div>
                      ))}
                  </div>
                  <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 text-center">
                      Selecting a template will send it immediately.
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};