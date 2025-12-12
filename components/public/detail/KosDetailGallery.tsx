'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface KosDetailGalleryProps {
  images: string[];
}

export function KosDetailGallery({ images }: KosDetailGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
        <Image
          src={images[selectedImage]}
          alt={`Gallery image ${selectedImage + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-3">
        {images.slice(0, 5).map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-[4/3] rounded-xl overflow-hidden transition-all ${
              selectedImage === index
                ? 'ring-2 ring-[rgb(var(--primary))] scale-105'
                : 'hover:scale-105 opacity-70 hover:opacity-100'
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div className="relative aspect-[2/1] rounded-2xl overflow-hidden bg-gray-100">
        <Image
          src="/images/map.png"
          alt="Location map"
          fill
          className="object-cover"
        />
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}
