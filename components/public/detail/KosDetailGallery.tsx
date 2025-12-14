'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface KosDetailGalleryProps {
  images: string[];
  title?: string;
  location?: string;
}

export function KosDetailGallery({ images, title, location }: KosDetailGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const displayImages = images.slice(0, 5);

  return (
    <div className="space-y-4">
      {displayImages.length === 1 ? (
        <button
          onClick={() => setSelectedImage(0)}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden w-full"
        >
          <Image
            src={displayImages[0]}
            alt="Gallery image 1"
            fill
            className="object-cover"
            priority
          />
        </button>
      ) : (
        <div className="grid grid-cols-[2fr_1fr] gap-4">
          <button
            onClick={() => setSelectedImage(0)}
            className={`relative aspect-[4/3] rounded-2xl overflow-hidden transition-all ${
              selectedImage === 0
                ? 'ring-4 ring-primary'
                : 'hover:opacity-90'
            }`}
          >
            <Image
              src={displayImages[0]}
              alt="Gallery image 1"
              fill
              className="object-cover"
              priority
            />
          </button>

          <div className="grid grid-cols-1 grid-rows-4 gap-4">
            {displayImages.slice(1).map((image, index) => (
              <button
                key={index + 1}
                onClick={() => setSelectedImage(index + 1)}
                className={`relative rounded-2xl overflow-hidden transition-all ${
                  selectedImage === index + 1
                    ? 'ring-4 ring-primary'
                    : 'hover:opacity-90'
                }`}
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {title && (
        <div className="pt-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h1>
          {location && (
            <p className="text-gray-600">{location}</p>
          )}
        </div>
      )}
    </div>
  );
}
