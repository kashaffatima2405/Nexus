import { Transaction } from '../types/wallet';

export const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    type: 'funding',
    amount: 250000,
    sender: 'Michael Rodriguez',
    receiver: 'Sarah Johnson (TechWave AI)',
    status: 'completed',
    date: '2026-06-18',
    note: 'Seed round funding',
  },
  {
    id: 'tx2',
    type: 'deposit',
    amount: 50000,
    sender: 'Bank Account ****4521',
    receiver: 'Wallet',
    status: 'completed',
    date: '2026-06-15',
  },
  {
    id: 'tx3',
    type: 'transfer',
    amount: 10000,
    sender: 'Wallet',
    receiver: 'Jennifer Lee',
    status: 'pending',
    date: '2026-06-19',
  },
  {
    id: 'tx4',
    type: 'withdraw',
    amount: 5000,
    sender: 'Wallet',
    receiver: 'Bank Account ****4521',
    status: 'completed',
    date: '2026-06-10',
  },
];

export const mockWalletBalance = 184500;
