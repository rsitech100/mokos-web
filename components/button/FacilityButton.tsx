'use client';

import Link from 'next/link';
import Image from 'next/image';

interface FacilityButtonProps {
  label: string;
  icon?: string;
  emoji?: string;
}

export function FacilityButton({ label, icon, emoji }: FacilityButtonProps) {
  return (
    <Link
      href={`/kos?facilities=${encodeURIComponent(label)}`}
      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:border-primary hover:bg-blue-50 transition-all shadow-sm whitespace-nowrap"
    >
      <span>{label}</span>
      {icon ? (
        <Image src={icon} alt="" width={24} height={16} className="object-contain" />
      ) : (
        <span>{emoji}</span>
      )}
    </Link>
  );
}
