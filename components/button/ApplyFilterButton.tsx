'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

interface ApplyFilterButtonProps {
  filters: {
    city: string;
    province: string;
    gender: string;
    minPrice: string;
    maxPrice: string;
    sortBy: string;
    order: string;
  };
  selectedFacilities: string[];
}

export function ApplyFilterButton({ filters, selectedFacilities }: ApplyFilterButtonProps) {
  const router = useRouter();

  const handleApply = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    if (selectedFacilities.length > 0) {
      params.set('facilities', selectedFacilities.join(','));
    }

    router.push(`/kos?${params.toString()}`);
  };

  return (
    <Button onClick={handleApply} variant="primary" className="w-full">
      Terapkan Filter
    </Button>
  );
}
