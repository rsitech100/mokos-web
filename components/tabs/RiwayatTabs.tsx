'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Booking, Transaction } from '@/types/booking.types';
import { RiwayatSidebar } from '../public/riwayat/RiwayatSidebar';
import { RiwayatFilters } from '../public/riwayat/RiwayatFilters';
import { BookingList } from '../lists/BookingList';
import { TransactionList } from '../lists/TransactionList';

type TabType = 'bookings' | 'transactions';

interface RiwayatTabsProps {
  activeTab: TabType;
  bookings: Booking[];
  transactions: Transaction[];
  currentStatus?: string;
}

export function RiwayatTabs({ activeTab, bookings, transactions, currentStatus }: RiwayatTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = (tab: TabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    params.delete('status');
    router.push(`/riwayat?${params.toString()}`);
  };

  const handleFilterChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    router.push(`/riwayat?${params.toString()}`);
  };

  const bookingFilters = [
    { value: '', label: 'Semua' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Selesai' },
    { value: 'cancelled', label: 'Dibatalkan' },
  ];

  const transactionFilters = [
    { value: '', label: 'Semua' },
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'failed', label: 'Gagal' },
    { value: 'refunded', label: 'Refunded' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <RiwayatSidebar
        activeTab={activeTab}
      />

      <div className="flex-1">
        <RiwayatFilters
          filters={activeTab === 'bookings' ? bookingFilters : transactionFilters}
          currentFilter={currentStatus || ''}
          onFilterChange={handleFilterChange}
        />

        {activeTab === 'bookings' ? (
          <BookingList bookings={bookings} />
        ) : (
          <TransactionList transactions={transactions} />
        )}
      </div>
    </div>
  );
}
