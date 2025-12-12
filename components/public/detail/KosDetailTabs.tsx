'use client';

import React, { useState } from 'react';

interface Facility {
  icon: string;
  label: string;
}

interface KosDetailTabsProps {
  facilities: {
    room: Facility[];
    specifications: Facility[];
    shared: Facility[];
  };
}

const tabs = [
  { id: 'room', label: 'Fasilitas Kamar' },
  { id: 'specifications', label: 'Spesifikasi Kamar' },
  { id: 'shared', label: 'Fasilitas Bersama' },
];

const iconMap: Record<string, React.ReactElement> = {
  ac: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <path d="M7 12v5M12 12v5M17 12v5M7 17l-2 2M7 17l2 2M12 17l-2 2M12 17l2 2M17 17l-2 2M17 17l2 2" />
    </svg>
  ),
  table: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 10h18M7 14h.01M12 14h.01M17 14h.01" />
    </svg>
  ),
  storage: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 6h6M9 12h6M9 18h6" />
    </svg>
  ),
  window: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 12h18M12 3v18" />
    </svg>
  ),
  pillow: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="10" rx="3" />
    </svg>
  ),
  mattress: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="8" width="20" height="8" rx="2" />
      <path d="M6 8V6a2 2 0 012-2h8a2 2 0 012 2v2" />
    </svg>
  ),
  chair: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 10V8a4 4 0 018 0v2M5 10h14a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3a1 1 0 011-1zM6 14v6M18 14v6" />
    </svg>
  ),
  fan: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
    </svg>
  ),
  toilet: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 5v2m0 10v2M5 12h2m10 0h2" />
    </svg>
  ),
  laundry: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18M3 12h18M9 6v12a3 3 0 003 3 3 3 0 003-3V6" />
    </svg>
  ),
  size: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3h18v18H3z" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
  electricity: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>
  ),
  wifi: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12.55a11 11 0 0114.08 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
    </svg>
  ),
  'parking-car': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 17h14v-5l-1.5-4.5h-11L5 12v5zM5 17v2a1 1 0 001 1h1a1 1 0 001-1v-1M18 17v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1M7 12h10M9 9.5h6" />
    </svg>
  ),
  'parking-bike': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M15 6a1 1 0 100-2 1 1 0 000 2zM12 17.5l-3.5-5L12 8h3l3 4.5" />
    </svg>
  ),
  'living-room': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="8" width="20" height="10" rx="2" />
      <path d="M6 8V6a2 2 0 012-2h8a2 2 0 012 2v2M2 18h20" />
    </svg>
  ),
  cleaning: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L9 9l3 3 3-3-3-7zM12 12v10" />
      <circle cx="12" cy="19" r="3" />
    </svg>
  ),
};

export function KosDetailTabs({ facilities }: KosDetailTabsProps) {
  const [activeTab, setActiveTab] = useState('room');

  const renderFacilities = (facilityList: Facility[]) => {
    if (activeTab === 'specifications') {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Spesifikasi tipe kamar</h3>
          {facilityList.map((facility, index) => (
            <div key={index} className="flex items-center gap-3 text-gray-700">
              <div className="text-gray-500">{iconMap[facility.icon] || iconMap.window}</div>
              <span>{facility.label}</span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {activeTab === 'room' ? 'Fasilitas kamar' : 'Fasilitas bersama'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {facilityList.map((facility, index) => (
            <div key={index} className="flex items-center gap-3 text-gray-700">
              <div className="text-gray-500">{iconMap[facility.icon] || iconMap.window}</div>
              <span className="text-sm">{facility.label}</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  const getCurrentFacilities = () => {
    if (activeTab === 'room') return facilities.room;
    if (activeTab === 'specifications') return facilities.specifications;
    return facilities.shared;
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
      <div className="flex items-center bg-gray-50 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-gray-900 bg-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--primary))]" />
            )}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8">
        {renderFacilities(getCurrentFacilities())}
        
        {activeTab === 'specifications' && (
          <button className="mt-6 text-sm text-gray-700 hover:text-gray-900 font-medium border border-gray-200 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
            Lihat semua fasilitas kamar tipe ini
          </button>
        )}
      </div>
    </div>
  );
}
