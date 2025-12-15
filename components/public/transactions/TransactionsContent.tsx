import React from 'react';
import { Transaction } from '@/types/booking.types';
import { TransactionCard } from '@/components/cards/TransactionCard';
import { Container } from '@/components/layout/Container';
import { getAuthToken } from '@/lib/auth/session';
import { getLocalApiUrl } from '@/lib/utils/api';
import { TransactionsFilters } from './TransactionsFilters';

async function fetchTransactions(paymentStatus?: string): Promise<Transaction[]> {
  try {
    const token = await getAuthToken();
    if (!token) {
      return [];
    }

    const url = getLocalApiUrl('/api/transactions', paymentStatus ? { paymentStatus } : undefined);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log('[TransactionsContent] Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[TransactionsContent] Response not ok:', response.status, errorText);
      return [];
    }
    
    const data = await response.json();
    console.log('[TransactionsContent] Response data:', data);
    return data.success ? data.data : [];
  } catch (error) {
    console.error('[TransactionsContent] Failed to fetch transactions:', error);
    return [];
  }
}

interface TransactionsContentProps {
  searchParams?: Promise<{
    paymentStatus?: string;
  }>;
}

export async function TransactionsContent({ searchParams }: TransactionsContentProps) {
  const params = await searchParams;
  const filter = params?.paymentStatus || '';
  
  const transactions = await fetchTransactions(filter);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Riwayat Transaksi</h1>
          <p className="text-gray-600">Pantau semua transaksi pembayaran Anda</p>
        </div>

        {/* Filters */}
        <TransactionsFilters currentFilter={filter} />

        {/* Empty State */}
        {transactions.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Transaksi</h3>
            <p className="text-gray-600 mb-6">Transaksi Anda akan muncul di sini</p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Cari Kos
            </a>
          </div>
        )}

        {/* Transaction List */}
        {transactions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
