'use client';

import React, { useState } from 'react';
import { Booking } from '@/types/booking.types';
import Image from 'next/image';

interface BookingCardProps {
  booking: Booking;
  onCancelSuccess?: () => void;
}

export function BookingCard({ booking, onCancelSuccess }: BookingCardProps) {
  const [isCancelling, setIsCancelling] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCancelBooking = async () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    setIsCancelling(true);
    try {
      const response = await fetch(`/api/bookings/${booking.id}/cancel`, {
        method: 'POST',
      });

      if (response.ok) {
        alert('Booking berhasil dibatalkan');
        if (onCancelSuccess) {
          onCancelSuccess();
        } else {
          window.location.reload();
        }
      } else {
        const data = await response.json();
        alert(data.message || 'Gagal membatalkan booking');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Terjadi kesalahan saat membatalkan booking');
    } finally {
      setIsCancelling(false);
      setShowConfirm(false);
    }
  };
  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
      completed: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: 'Menunggu Pembayaran',
      confirmed: 'Dikonfirmasi',
      cancelled: 'Dibatalkan',
      completed: 'Selesai',
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <Image
          src={booking.room.images[0] || '/images/kos-1.jpg'}
          alt={booking.room.kost.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md ${getStatusColor(booking.status)}`}>
            {getStatusLabel(booking.status)}
          </span>
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <h3 className="text-sm font-bold text-white mb-0.5 drop-shadow-lg line-clamp-1">
            {booking.room.kost.name}
          </h3>
          <p className="text-xs text-white/90 drop-shadow">{booking.room.type} - {booking.room.roomNumber}</p>
        </div>
      </div>

      <div className="p-3">

        <div className="space-y-2 mb-3">
          <div className="bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-lg p-2">
            <div className="flex items-center gap-1.5 mb-0.5">
              <svg className="w-3 h-3 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide">Booking ID</span>
            </div>
            <span className="text-xs font-bold text-gray-900">{booking.bookingNumber}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="flex items-center gap-1 mb-0.5">
                <svg className="w-3 h-3 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[10px] font-medium text-gray-600">Check-in</span>
              </div>
              <p className="text-xs font-semibold text-gray-900">{formatDate(booking.checkInDate)}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-2">
              <div className="flex items-center gap-1 mb-0.5">
                <svg className="w-3 h-3 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[10px] font-medium text-gray-600">Check-out</span>
              </div>
              <p className="text-xs font-semibold text-gray-900">{formatDate(booking.checkOutDate)}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-2.5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium text-blue-100 mb-0.5">Total Pembayaran</p>
                <p className="text-base font-bold">{formatCurrency(booking.totalPrice)}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {booking.status === 'pending' && booking.transaction?.paymentUrl && (
            <a
              href={booking.transaction.paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full px-3 py-2 text-xs bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md shadow-green-600/30 hover:shadow-lg hover:scale-105"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Bayar Sekarang
            </a>
          )}
          
          {(booking.status === 'pending' || booking.status === 'confirmed') && (
            <button
              onClick={handleCancelBooking}
              disabled={isCancelling}
              className={`flex items-center justify-center gap-1.5 w-full px-3 py-2 text-xs ${
                showConfirm
                  ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-red-600/30'
                  : 'bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 border border-gray-200 hover:border-red-200'
              } font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                showConfirm ? 'text-white shadow-lg hover:shadow-xl hover:scale-105' : ''
              }`}
            >
              {isCancelling ? (
                <>
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Membatalkan...
                </>
              ) : showConfirm ? (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Konfirmasi Pembatalan?
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Batalkan Booking
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
