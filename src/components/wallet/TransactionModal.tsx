import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { TransactionType } from '../../types/wallet';

interface TransactionModalProps {
  type: TransactionType;
  onClose: () => void;
  onSubmit: (amount: number, recipient: string) => void;
}

const config: Record<TransactionType, { title: string; recipientLabel: string; recipientPlaceholder: string; buttonLabel: string }> = {
  deposit: {
    title: 'Deposit Funds',
    recipientLabel: 'From (Bank Account)',
    recipientPlaceholder: 'Bank Account ****4521',
    buttonLabel: 'Deposit',
  },
  withdraw: {
    title: 'Withdraw Funds',
    recipientLabel: 'To (Bank Account)',
    recipientPlaceholder: 'Bank Account ****4521',
    buttonLabel: 'Withdraw',
  },
  transfer: {
    title: 'Transfer Funds',
    recipientLabel: 'Recipient Name',
    recipientPlaceholder: 'e.g. Jennifer Lee',
    buttonLabel: 'Transfer',
  },
  funding: {
    title: 'Fund This Deal',
    recipientLabel: 'Entrepreneur / Startup',
    recipientPlaceholder: 'e.g. Sarah Johnson (TechWave AI)',
    buttonLabel: 'Send Funding',
  },
};

export const TransactionModal: React.FC<TransactionModalProps> = ({ type, onClose, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const cfg = config[type];

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0 || !recipient.trim()) return;
    onSubmit(numAmount, recipient.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-900">{cfg.title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-7 pr-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{cfg.recipientLabel}</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder={cfg.recipientPlaceholder}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <p className="text-xs text-gray-400">
            This is a simulated transaction for demonstration purposes. No real money is transferred.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-200 bg-gray-50">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSubmit}>
            {cfg.buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
