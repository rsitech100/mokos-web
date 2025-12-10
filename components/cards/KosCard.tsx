'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface KosCardProps {
  image: string;
  rating: number;
  title: string;
  location: string;
  district: string;
  amenities: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  promoType: string;
  promoDetails: string;
  className?: string;
}

export function KosCard({
  image,
  rating,
  title,
  location,
  district,
  amenities,
  originalPrice,
  discountedPrice,
  discountPercent,
  promoType,
  promoDetails,
  className,
}: KosCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className={cn(
        'flex-shrink-0 w-[300px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer',
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white px-2.5 py-1 rounded-full shadow-sm">
          <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-sm font-semibold text-gray-900">{rating}</span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-gray-900 text-base line-clamp-1">
          {title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-1">{location}</p>

        <p className="text-xs text-gray-500">
          {district} • {amenities}
        </p>

        <div className="pt-2">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-lg font-bold text-red-600">
              {formatPrice(discountedPrice)}
            </span>
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          </div>
          <p className="text-xs text-gray-600">
            Diskon {discountPercent}% ({promoType}) • {promoDetails}
          </p>
        </div>
      </div>
    </div>
  );
}
