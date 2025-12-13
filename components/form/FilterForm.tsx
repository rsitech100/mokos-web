'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';
import { ApplyFilterButton } from '@/components/button/ApplyFilterButton';
import { ResetFilterButton } from '@/components/button/ResetFilterButton';

interface FilterFormProps {
  initialFilters: {
    search: string;
    city: string;
    province: string;
    gender: string;
    minPrice: string;
    maxPrice: string;
    sortBy: string;
    order: string;
  };
  initialFacilities: string[];
}

export function FilterForm({ initialFilters, initialFacilities }: FilterFormProps) {
  const [filters, setFilters] = useState(initialFilters);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>(initialFacilities);

  const facilityOptions = [
    'WiFi',
    'AC',
    'Kasur',
    'Lemari',
    'Meja',
    'Kursi',
    'Kamar Mandi Dalam',
    'Dapur',
    'Laundry',
    'Parkir Motor',
    'Parkir Mobil',
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleFacility = (facility: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Filter</h2>
        <ResetFilterButton />
      </div>

      <div className="space-y-6">
        {/* Search */}
        <Input
          label="Pencarian"
          type="text"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          placeholder="Nama, deskripsi, alamat..."
        />

        {/* City */}
        <Input
          label="Kota"
          type="text"
          value={filters.city}
          onChange={(e) => handleFilterChange('city', e.target.value)}
          placeholder="Contoh: Jakarta"
        />

        {/* Province */}
        <Input
          label="Provinsi"
          type="text"
          value={filters.province}
          onChange={(e) => handleFilterChange('province', e.target.value)}
          placeholder="Contoh: DKI Jakarta"
        />

        {/* Gender */}
        <Dropdown
          label="Jenis Kelamin"
          value={filters.gender}
          onChange={(value) => handleFilterChange('gender', value)}
          options={[
            { value: '', label: 'Semua' },
            { value: 'male', label: 'Putra' },
            { value: 'female', label: 'Putri' },
          ]}
          placeholder="Pilih jenis kelamin"
        />

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Harga Per Bulan
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              placeholder="Min"
            />
            <Input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              placeholder="Max"
            />
          </div>
        </div>

        {/* Facilities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Fasilitas
          </label>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {facilityOptions.map((facility) => (
              <label
                key={facility}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedFacilities.includes(facility)}
                  onChange={() => toggleFacility(facility)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{facility}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <Dropdown
          label="Urutkan Berdasarkan"
          value={filters.sortBy}
          onChange={(value) => handleFilterChange('sortBy', value)}
          options={[
            { value: 'createdAt', label: 'Terbaru' },
            { value: 'price', label: 'Harga' },
            { value: 'name', label: 'Nama' },
          ]}
        />

        {/* Order */}
        <Dropdown
          label="Urutan"
          value={filters.order}
          onChange={(value) => handleFilterChange('order', value)}
          options={[
            { value: 'desc', label: 'Menurun' },
            { value: 'asc', label: 'Menaik' },
          ]}
        />

        {/* Apply Button */}
        <ApplyFilterButton filters={filters} selectedFacilities={selectedFacilities} />
      </div>
    </>
  );
}
