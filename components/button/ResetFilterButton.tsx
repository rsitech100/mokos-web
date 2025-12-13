'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export function ResetFilterButton() {
  const router = useRouter();

  const handleReset = () => {
    router.push('/kos');
  };

  return (
    <button
      onClick={handleReset}
      className="text-sm text-primary hover:underline"
    >
      Reset
    </button>
  );
}
