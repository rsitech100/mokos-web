'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface PaymentRedirectProps {
  redirectTo: string;
  delay: number;
}

export function PaymentRedirect({ redirectTo, delay }: PaymentRedirectProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(delay);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push(redirectTo);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, redirectTo]);

  return (
    <div className="text-center py-4">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
        <svg className="w-4 h-4 text-gray-600 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span className="text-sm text-gray-600">
          Mengalihkan ke halaman riwayat dalam <span className="font-bold text-blue-600">{countdown}</span> detik...
        </span>
      </div>
    </div>
  );
}
