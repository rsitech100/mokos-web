import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PopularAreaCardProps {
  image: string;
  name: string;
  className?: string;
  onClick?: () => void;
}

export function PopularAreaCard({
  image,
  name,
  className,
  onClick,
}: PopularAreaCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex-shrink-0 w-[350px] cursor-pointer group',
        className
      )}
    >
      <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
        <Image
          src={image}
          alt={name}
          fill
          sizes="250px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <p className="mt-3 text-base font-medium text-gray-900">
        {name}
      </p>
    </div>
  );
}
