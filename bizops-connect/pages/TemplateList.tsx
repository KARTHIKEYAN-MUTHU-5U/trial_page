import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../constants';
import { api } from '../services/mockApi';
import { Template, TemplateStatus } from '../types';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';

export const TemplateList = () => {
  const { business } = useContext(AuthContext);
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    if (business) {
      api.getTemplates(business.id).then(setTemplates);
    }
  }, [business]);

  const getStatusVariant = (status: TemplateStatus) => {
      switch (status) {
          case TemplateStatus.APPROVED: return 'success';
          case TemplateStatus.REJECTED: return 'error';
          default: return 'warning';
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Message Templates</h2>
        <Button>
            <Plus size={16} className="mr-2" />
            New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {templates.map(template => (
            <div key={template.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{template.category} • {template.language}</p>
                    </div>
                    <Badge variant={getStatusVariant(template.status)}>{template.status}</Badge>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4 flex-1 text-sm text-gray-700 font-mono border border-gray-100">
                    {template.content}
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-100 pt-4 mt-auto">
                    <span>Version {template.version}</span>
                    <span className="font-medium">ID: {template.id}</span>
                </div>
            </div>
        ))}
      </div>
      
      {templates.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500">No templates found. Create one to start messaging customers.</p>
          </div>
      )}
    </div>
  );
};