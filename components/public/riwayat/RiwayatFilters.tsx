'use client';

import React from 'react';

interface Filter {
  value: string;
  label: string;
}

interface RiwayatFiltersProps {
  filters: Filter[];
  currentFilter: string;
  onFilterChange: (value: string) => void;
}

export function RiwayatFilters({ filters, currentFilter, onFilterChange }: RiwayatFiltersProps) {
  return (
    <div className="mb-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`flex-shrink-0 px-6 py-4 font-medium text-sm transition-all duration-200 relative ${
                currentFilter === filter.value
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {filter.label}
              {currentFilter === filter.value && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
