'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/ui/Modal';
import { DatePicker } from '@/components/ui/DatePicker';
import { useToast } from '@/components/ui/Toast';

interface Room {
  id: string;
  name: string;
  price: number;
  durationType: string;
  durationLabel: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room;
  kosName?: string;
}

export function BookingModal({ isOpen, onClose, room, kosName }: BookingModalProps) {
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleBooking = async () => {
    if (!checkInDate) {
      showToast('Mohon pilih tanggal check-in', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId: room.id,
          durationType: room.durationType,
          checkInDate: checkInDate,
          promoCode: '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal membuat booking');
      }

      showToast('Booking berhasil dibuat!', 'success');
      onClose();
      
      // Redirect to riwayat page after 1 second
      setTimeout(() => {
        router.push('/riwayat');
      }, 1000);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Gagal membuat booking',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Booking Kamar" size="sm">
      <div className="space-y-3">
        {/* Kos Info */}
        {kosName && (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-blue-600 font-medium">Booking di</p>
                <h3 className="text-xs font-bold text-gray-900">{kosName}</h3>
              </div>
            </div>
          </div>
        )}

        {/* Room Info */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-2.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-purple-600 font-medium">Durasi</p>
              <h4 className="text-sm font-bold text-gray-900">{room.durationLabel}</h4>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-purple-600 font-medium">Harga</p>
              <h4 className="text-sm font-bold text-gray-900">Rp {room.price.toLocaleString('id-ID')}</h4>
            </div>
          </div>
        </div>

        {/* Check In Date */}
        <DatePicker
          label="Tanggal Check-in"
          value={checkInDate}
          onChange={setCheckInDate}
          placeholder="Pilih tanggal"
          minDate={getTodayDate()}
        />

        {/* Summary */}
        {checkInDate && (
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 border border-blue-200 rounded-lg p-2.5">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-gray-900">Ringkasan Booking</h4>
              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Durasi Sewa</span>
                <span className="font-semibold text-gray-900">{room.durationLabel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Check-in</span>
                <span className="font-semibold text-gray-900">
                  {new Date(checkInDate).toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'short',
                    year: 'numeric' 
                  })}
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent my-1.5"></div>
              <div className="flex justify-between items-center pt-0.5">
                <span className="text-xs font-bold text-gray-900">Total Pembayaran</span>
                <div className="text-right">
                  <div className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Rp {room.price.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg transition-all duration-200"
          >
            Batal
          </button>
          <button
            onClick={handleBooking}
            disabled={!checkInDate || isLoading}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-md shadow-blue-600/30 hover:shadow-lg disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isLoading ? 'Memproses...' : 'Booking Sekarang'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
