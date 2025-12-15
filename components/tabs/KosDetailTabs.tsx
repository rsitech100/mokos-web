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
}

export function KosDetailTabs({ 
  roomTypes, 
  defaultSelected,
  onTabChange,
  loading = false,
  features = [],
  kosName
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
          <button className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat CS
          </button>
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
