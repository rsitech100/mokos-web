'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Booking } from '@/types/booking.types';
import { BookingCard } from '@/components/cards/BookingCard';

interface BookingListProps {
  bookings: Booking[];
}

export function BookingList({ bookings }: BookingListProps) {
  const router = useRouter();

  const handleCancelSuccess = () => {
    router.refresh();
  };

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
          <svg className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Booking</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Mulai cari kos impian Anda dan lakukan booking pertama Anda
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:scale-105"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Cari Kos Sekarang
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {bookings.map((booking) => (
        <BookingCard 
          key={booking.id} 
          booking={booking}
          onCancelSuccess={handleCancelSuccess}
        />
      ))}
    </div>
  );
}
