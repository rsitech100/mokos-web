'use client';

import Link from 'next/link';
import Image from 'next/image';

interface FacilityButtonProps {
  label: string;
  icon?: string;
  emoji?: string;
}

export function FacilityButton({ label, icon, emoji }: FacilityButtonProps) {
  const getFilterUrl = () => {
    const genderMapping: Record<string, string> = {
      'Kos Campur': 'campur',
      'Kos Putri': 'putri', 
      'Kos Putra': 'putra',
      'Pasutri': 'campur', 
    };

    const facilityMapping: Record<string, string> = {
      'Dekat MRT': 'Dekat MRT',
      'Dekat KRL': 'Dekat KRL',
      'Pet Friendly': 'Pet Friendly',
      'Bangunan Baru': 'Bangunan Baru',
      'Ramah Disabilitas': 'Ramah Disabilitas',
    };

    const genderValue = genderMapping[label];
    if (genderValue) {
      return `/kos?gender=${genderValue}`;
    }

    const facilityName = facilityMapping[label] || label;
    return `/kos?facilities=${encodeURIComponent(facilityName)}`;
  };

  return (
    <Link
      href={getFilterUrl()}
      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:border-primary hover:bg-blue-50 transition-all shadow-sm whitespace-nowrap"
    >
      <span>{label}</span>
      {icon ? (
        <Image src={icon} alt={`${label} icon`} width={24} height={16} className="object-contain" />
      ) : (
        <span>{emoji}</span>
      )}
    </Link>
  );
}
