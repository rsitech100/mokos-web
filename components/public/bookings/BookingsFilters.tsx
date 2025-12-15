'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface BookingsFiltersProps {
  currentFilter: string;
}

export function BookingsFilters({ currentFilter }: BookingsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    router.push(`/bookings?${params.toString()}`);
  };

  const filters = [
    { value: '', label: 'Semua' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Selesai' },
    { value: 'cancelled', label: 'Dibatalkan' },
  ];

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => handleFilterChange(f.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentFilter === f.value
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-600 hover:text-blue-600'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
