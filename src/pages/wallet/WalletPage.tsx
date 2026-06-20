import React, { useState } from 'react';
import {
  Wallet, ArrowDownToLine, ArrowUpFromLine, Send, HandCoins,
  CheckCircle2, Clock, XCircle,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { mockTransactions, mockWalletBalance } from '../../data/walletData';
import { Transaction, TransactionType, TransactionStatus } from '../../types/wallet';
import { TransactionModal } from '../../components/wallet/TransactionModal';

const statusConfig: Record<TransactionStatus, { label: string; classes: string; icon: React.ReactNode }> = {
  completed: { label: 'Completed', classes: 'bg-success-50 text-success-700', icon: <CheckCircle2 size={13} /> },
  pending: { label: 'Pending', classes: 'bg-accent-50 text-accent-700', icon: <Clock size={13} /> },
  failed: { label: 'Failed', classes: 'bg-error-50 text-error-700', icon: <XCircle size={13} /> },
};

const typeLabels: Record<TransactionType, string> = {
  deposit: 'Deposit',
  withdraw: 'Withdrawal',
  transfer: 'Transfer',
  funding: 'Funding',
};

export const WalletPage: React.FC = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(mockWalletBalance);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [activeModal, setActiveModal] = useState<TransactionType | null>(null);

  const isInvestor = user?.role === 'investor';

  const handleSubmit = (amount: number, recipient: string) => {
    if (!activeModal) return;

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: activeModal,
      amount,
      sender: activeModal === 'deposit' ? recipient : 'Wallet',
      receiver: activeModal === 'deposit' ? 'Wallet' : recipient,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };

    setTransactions([newTx, ...transactions]);

    // Update balance based on type
    if (activeModal === 'deposit') {
      setBalance((b) => b + amount);
    } else {
      setBalance((b) => b - amount);
    }

    setActiveModal(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Wallet className="text-primary-600" size={26} />
          Wallet &amp; Payments
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your funds, transfers, and transaction history.
        </p>
      </div>

      {/* Wallet Balance Card */}
      <Card className="bg-gradient-to-r from-primary-700 to-primary-900 border-none">
        <CardBody>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-primary-100 text-sm">Available Balance</p>
              <p className="text-white text-3xl font-bold mt-1">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                className="bg-white/15 hover:bg-white/25 text-white border-none"
                leftIcon={<ArrowDownToLine size={16} />}
                onClick={() => setActiveModal('deposit')}
              >
                Deposit
              </Button>
              <Button
                size="sm"
                className="bg-white/15 hover:bg-white/25 text-white border-none"
                leftIcon={<ArrowUpFromLine size={16} />}
                onClick={() => setActiveModal('withdraw')}
              >
                Withdraw
              </Button>
              <Button
                size="sm"
                className="bg-white/15 hover:bg-white/25 text-white border-none"
                leftIcon={<Send size={16} />}
                onClick={() => setActiveModal('transfer')}
              >
                Transfer
              </Button>
              {isInvestor && (
                <Button
                  size="sm"
                  className="bg-accent-500 hover:bg-accent-600 text-white border-none"
                  leftIcon={<HandCoins size={16} />}
                  onClick={() => setActiveModal('funding')}
                >
                  Fund a Deal
                </Button>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900">Transaction History</h2>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receiver</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {typeLabels[tx.type]}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      ${tx.amount.toLocaleString('en-US')}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{tx.sender}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{tx.receiver}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig[tx.status].classes}`}>
                        {statusConfig[tx.status].icon}
                        {statusConfig[tx.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {activeModal && (
        <TransactionModal
          type={activeModal}
          onClose={() => setActiveModal(null)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default WalletPage;
