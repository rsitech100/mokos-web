'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { BookingModal } from '@/components/ui/BookingModal';

interface RoomType {
  id: string;
  roomId?: string;
  name: string;
  beds: string;
  discount: number | null;
  price: number;
  originalPrice?: number;
  durationLabel?: string;
  durationType?: string;
}

interface KosDetailTabsProps {
  roomTypes: RoomType[];
  defaultSelected?: string;
  onTabChange?: (tabId: string) => void;
  loading?: boolean;
  features?: string[];
  kosName?: string;
  kostId?: string;
}

export function KosDetailTabs({ 
  roomTypes, 
  defaultSelected,
  onTabChange,
  loading = false,
  features = [],
  kosName,
  kostId
}: KosDetailTabsProps) {
  const [selectedTab, setSelectedTab] = useState(defaultSelected || roomTypes[0]?.id);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleTabClick = (tabId: string) => {
    setSelectedTab(tabId);
    onTabChange?.(tabId);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const selectedRoom = roomTypes.find(r => r.id === selectedTab) || roomTypes[0];

  if (!roomTypes || roomTypes.length === 0) {
    return (
      <div className="bg-white p-8 border border-gray-200 rounded-xl text-center">
        <p className="text-gray-600 text-lg">Maaf kos ini belum tersedia</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      <div className="flex items-center gap-0 rounded-t-xl border border-gray-200 bg-gray-50">
        {roomTypes.map((type) => (
          <div key={type.id} className="relative flex-1">
            <button
              type="button"
              onClick={() => handleTabClick(type.id)}
              disabled={loading}
              className={cn(
                'w-full py-3 px-4 text-sm font-medium text-center transition-all',
                'border-r last:border-r-0 border-gray-200',
                'first:rounded-tl-xl last:rounded-tr-xl',
                selectedTab === type.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'bg-transparent text-gray-600 hover:bg-white/50',
                loading && 'opacity-50 cursor-not-allowed'
              )}
              role="tab"
              aria-selected={selectedTab === type.id}
            >
              <div className="flex flex-col items-center gap-0.5">
                <span className={cn(
                  'text-sm',
                  selectedTab === type.id && 'text-gray-900 font-medium'
                )}>{type.beds}</span>
              </div>
            </button>
            {type.discount && (
              <span className="absolute -top-2 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full z-10 shadow-md">
                -{type.discount}%
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white p-6 border-x border-b border-gray-200 rounded-b-xl">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm text-gray-500">Mulai dari</span>
          {selectedRoom.originalPrice && selectedRoom.originalPrice !== selectedRoom.price && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(selectedRoom.originalPrice)}
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold text-red-600">
            {formatPrice(selectedRoom.price)}
          </span>
          <span className="text-gray-600">/{selectedRoom.durationLabel || 'bulan'}</span>
        </div>

        {features.length > 0 && (
          <div className="flex items-start gap-2 text-sm text-primary mb-6">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>
              Termasuk {features.slice(0, 3).map((feature, index) => {
                if (index === 0) return feature;
                if (index === features.slice(0, 3).length - 1) return ` dan ${feature}`;
                return `, ${feature}`;
              }).join('')}
            </span>
          </div>
        )}

        <div className="space-y-3">
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full"
            onClick={() => setIsBookingModalOpen(true)}
          >
            Lihat Tipe Kamar
          </Button>
          <Button 
            variant="primary" 
            size="md" 
            className="w-full bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 hover:text-blue-700 flex items-center justify-center gap-2"
            onClick={() => {
              if (typeof window !== 'undefined' && kostId) {
                (window as any).openChatWidget?.(kostId);
              }
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span> Hubungi Pemilik Kos</span>
          </Button>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        room={{
          id: selectedRoom.roomId || selectedRoom.id,
          name: selectedRoom.name,
          price: selectedRoom.price,
          durationType: selectedRoom.durationType || '1month',
          durationLabel: selectedRoom.durationLabel || 'Bulanan',
        }}
        kosName={kosName}
      />
    </div>
  );
}
