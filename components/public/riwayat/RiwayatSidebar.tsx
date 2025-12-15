import React from 'react';
import Link from 'next/link';

type TabType = 'bookings' | 'transactions';

interface RiwayatSidebarProps {
  activeTab: TabType;
}

export function RiwayatSidebar({ activeTab }: RiwayatSidebarProps) {
  const tabs = [
    { 
      id: 'bookings' as TabType, 
      label: 'Booking Saya', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    { 
      id: 'transactions' as TabType, 
      label: 'Transaksi', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
  ];

  return (
    <div className="lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-6">
        <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700">
          <h2 className="text-white font-semibold">Kategori</h2>
        </div>
        <div className="p-2">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/riwayat?tab=${tab.id}`}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 mb-1 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/30'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className={`${activeTab === tab.id ? 'text-white' : 'text-blue-600'}`}>
                {tab.icon}
              </div>
              <span className="font-medium flex-1 text-left">{tab.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
