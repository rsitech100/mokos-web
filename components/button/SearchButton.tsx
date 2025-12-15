'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';

interface SearchButtonProps {
  placeholder?: string;
  className?: string;
  initialValue?: string;
}

export function SearchButton({ 
  placeholder = 'Masukkan nama lokasi / area / alamat',
  className,
  initialValue = ''
}: SearchButtonProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/kos?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/kos');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex items-center w-full max-w-2xl bg-white rounded-xl border border-gray-200 overflow-hidden">
        <label className="sr-only">Cari lokasi</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-6 py-3.5 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent border-none focus:outline-none focus:ring-0"
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="rounded-xl m-1 px-10 shadow-none"
        >
          Cari
        </Button>
      </div>
    </form>
  );
}
