'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  image: string;
  label: string;
  title: string;
  description: string;
  variant?: 'default' | 'primary';
  className?: string;
}

export function FeatureCard({
  image,
  label,
  title,
  description,
  variant = 'default',
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]',
        variant === 'primary' ? 'bg-[rgb(var(--primary))]' : 'bg-gray-100',
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        <div className="absolute top-4 left-4">
          <span
            className={cn(
              'inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
              variant === 'primary'
                ? 'bg-white text-[rgb(var(--primary))]'
                : 'bg-white/90 text-gray-900'
            )}
          >
            {label}
          </span>
        </div>
      </div>

      <div
        className={cn(
          'p-6',
          variant === 'primary' ? 'text-white' : 'text-gray-900'
        )}
      >
        <h3 className="text-xl font-bold mb-2">
          {title}
        </h3>
        <p
          className={cn(
            'text-sm leading-relaxed',
            variant === 'primary' ? 'text-white/90' : 'text-gray-600'
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
