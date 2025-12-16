import React from 'react';
import { Booking } from '@/types/booking.types';
import { BookingCard } from '@/components/cards/BookingCard';
import { Container } from '@/components/layout/Container';
import { getAuthToken } from '@/lib/auth/session';
import { BookingsFilters } from './BookingsFilters';

async function fetchBookings(status?: string): Promise<Booking[]> {
  try {
    const token = await getAuthToken();
    if (!token) {
      return [];
    }

    const url = status ? `/api/bookings?status=${status}` : '/api/bookings';
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    
    if (!response.ok) {
      const errorText = await response.text();
      return [];
    }
    
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    return [];
  }
}

interface BookingsContentProps {
  searchParams?: Promise<{
    status?: string;
  }>;
}

export async function BookingsContent({ searchParams }: BookingsContentProps) {
  const params = await searchParams;
  const filter = params?.status || '';
  
  const bookings = await fetchBookings(filter);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Riwayat Booking</h1>
          <p className="text-gray-600">Kelola dan pantau semua booking Anda</p>
        </div>

        <BookingsFilters currentFilter={filter} />

        {bookings.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Booking</h3>
            <p className="text-gray-600 mb-6">Mulai cari kos impian Anda dan lakukan booking</p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Cari Kos
            </a>
          </div>
        )}

        {bookings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
