import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import { faker } from '@faker-js/faker';
import { KeyRound, Copy, Trash2, PlusCircle, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

interface ApiKey {
  id: string;
  key: string;
  label: string;
  createdAt: string;
}

const ApiKeyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showKey, setShowKey] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const generatedKeys: ApiKey[] = Array.from({ length: 2 }, () => ({
        id: faker.string.uuid(),
        key: `tm_sk_${faker.string.alphanumeric(32)}`,
        label: faker.commerce.productName() + ' App',
        createdAt: faker.date.recent({ days: 30 }).toLocaleDateString(),
      }));
      setApiKeys(generatedKeys);
    }
  }, [isOpen]);

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('API Key copied to clipboard!');
  };

  const handleGenerateKey = () => {
    const newKey: ApiKey = {
      id: faker.string.uuid(),
      key: `tm_sk_${faker.string.alphanumeric(32)}`,
      label: 'New API Key',
      createdAt: new Date().toLocaleDateString(),
    };
    setApiKeys(prev => [newKey, ...prev]);
    toast.success('New API Key generated!');
  };

  const handleRevoke = (id: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== id));
    toast.error('API Key revoked.');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="API Keys" size="lg">
      <div className="space-y-4">
        <p className="text-gray-400 text-sm">
          Use these keys to integrate TansanMediai services into your applications.
          Keep your secret keys safe and do not expose them in client-side code.
        </p>

        <div className="flex justify-end">
          <button onClick={handleGenerateKey} className="flex items-center space-x-2 px-4 py-2 bg-gradient-purple rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            <PlusCircle className="w-4 h-4" />
            <span>Generate New Key</span>
          </button>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {apiKeys.map(apiKey => (
            <div key={apiKey.id} className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center">
                <p className="text-white font-medium">{apiKey.label}</p>
                <span className="text-gray-400 text-xs">Created: {apiKey.createdAt}</span>
              </div>
              <div className="flex items-center space-x-2 mt-2 p-2 bg-black/20 rounded-md">
                <KeyRound className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type={showKey === apiKey.id ? 'text' : 'password'}
                  readOnly
                  value={apiKey.key}
                  className="bg-transparent text-sm text-gray-300 w-full outline-none font-mono"
                />
                <button onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)} className="p-1 text-gray-400 hover:text-white">
                  {showKey === apiKey.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button onClick={() => handleCopy(apiKey.key)} className="p-1 text-gray-400 hover:text-white">
                  <Copy className="w-4 h-4" />
                </button>
                <button onClick={() => handleRevoke(apiKey.id)} className="p-1 text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ApiKeyModal;
