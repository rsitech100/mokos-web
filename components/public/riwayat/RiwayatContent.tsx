import React from 'react';
import { Booking, Transaction } from '@/types/booking.types';
import { getAuthToken } from '@/lib/auth/session';
import { RiwayatTabs } from '../../tabs/RiwayatTabs';
import { Container } from '@/components/layout/Container';

async function fetchBookings(status?: string): Promise<Booking[]> {
  try {
    const token = await getAuthToken();
    if (!token) return [];

    const url = status ? `/api/bookings?status=${status}` : '/api/bookings';
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) return [];
    
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return [];
  }
}

async function fetchTransactions(paymentStatus?: string): Promise<Transaction[]> {
  try {
    const token = await getAuthToken();
    if (!token) return [];

    const url = paymentStatus ? `/api/transactions?paymentStatus=${paymentStatus}` : '/api/transactions';
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) return [];
    
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return [];
  }
}

interface RiwayatContentProps {
  searchParams?: Promise<{
    tab?: string;
    status?: string;
  }>;
}

export async function RiwayatContent({ searchParams }: RiwayatContentProps) {
  const params = await searchParams;
  const activeTab = params?.tab === 'transactions' ? 'transactions' : 'bookings';
  const filterStatus = params?.status;

  const [bookings, transactions] = await Promise.all([
    activeTab === 'bookings' ? fetchBookings(filterStatus) : [],
    activeTab === 'transactions' ? fetchTransactions(filterStatus) : [],
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 py-8">
      <Container>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Riwayat</h1>
              <p className="text-gray-600">Kelola booking dan transaksi Anda</p>
            </div>
          </div>
        </div>

        <RiwayatTabs 
          activeTab={activeTab}
          bookings={bookings}
          transactions={transactions}
          currentStatus={filterStatus}
        />
      </Container>
    </div>
  );
}
