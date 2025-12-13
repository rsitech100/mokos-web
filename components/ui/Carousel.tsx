'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface CarouselProps {
  children: React.ReactNode;
  variant?: 'top-arrow' | 'slider';
  title?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  actionHref?: string;
  className?: string;
}

export function Carousel({
  children,
  variant = 'slider',
  title,
  actionLabel,
  onActionClick,
  actionHref,
  className,
}: CarouselProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 400;
    const newScrollPosition = 
      direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
    
    scrollContainerRef.current.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });
  };

  return (
    <div className={cn('w-full', className)}>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h2>
          
          <div className="flex items-center gap-3">
            {actionLabel && (actionHref || onActionClick) && (
              actionHref ? (
                <Link href={actionHref}>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    {actionLabel}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onActionClick}
                >
                  {actionLabel}
                </Button>
              )
            )}
            
            {variant === 'top-arrow' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scroll('left')}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                  aria-label="Previous"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 18l-6-6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                  aria-label="Next"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div
        ref={scrollContainerRef}
        className={cn(
          'flex gap-4 overflow-x-auto scrollbar-hide py-2',
          variant === 'slider' ? 'pb-4 cursor-grab active:cursor-grabbing' : ''
        )}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </div>
    </div>
  );
}
