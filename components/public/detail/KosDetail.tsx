'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components';
import { KosDetailGallery } from '@/components/public/detail/KosDetailGallery';
import { KosDetailInfo } from '@/components/public/detail/KosDetailInfo';
import { KosDetailTabs } from '@/components/public/detail/KosDetailTabs';
import { RecommendationsList } from '@/components/lists/RecommendationsList';
import { Kost } from '@/types/kost.types';
import { cn } from '@/lib/utils';

interface KosDetailProps {
  slug: string;
}

export function KosDetail({ slug }: KosDetailProps) {
  const router = useRouter();
  const [kost, setKost] = useState<Kost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchKost() {
      try {
        const response = await fetch(`/api/kosts/${slug}`);
        
        if (!response.ok) {
          setError(true);
          setLoading(false);
          return;
        }

        const result = await response.json();
        if (result.data) {
          setKost(result.data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchKost();
  }, [slug]);

  if (loading || !kost) {
    const skeletonData = {
      id: '1',
      name: 'Loading...',
      location: 'Loading...',
      images: [
        '/images/kos-1.jpg',
        '/images/kos-2.jpg',
        '/images/kos-3.jpg',
        '/images/kos-4.jpg',
        '/images/kos-5.jpg',
      ],
      roomTypes: [
        { id: '1', name: '1-2', beds: '1-2 bulan', discount: null },
        { id: '2', name: '3-5', beds: '3-5 bulan', discount: 5 },
        { id: '3', name: '>6', beds: '>6 bulan', discount: 10 },
      ],
      pricing: {
        originalPrice: 2750000,
        currentPrice: 2500000,
        pricePerMonth: 'bulan',
        discount: 10,
      },
      features: ['Loading...'],
      facilities: {
        room: [
          { icon: 'ac', label: 'Loading...' },
          { icon: 'table', label: 'Loading...' },
          { icon: 'storage', label: 'Loading...' },
        ],
        specifications: [
          { icon: 'size', label: 'Loading...' },
          { icon: 'electricity', label: 'Loading...' },
        ],
        shared: [
          { icon: 'wifi', label: 'Loading...' },
          { icon: 'parking-car', label: 'Loading...' },
        ],
      },
      mapUrl: 'https://maps.google.com',
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <Container>
          <div className="py-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <a href="/" className="hover:text-gray-900">Beranda</a>
              <span>&gt;</span>
              <span className={cn(
                'text-gray-900 transition-all duration-300',
                loading && 'blur-sm animate-pulse'
              )}>
                {skeletonData.name}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <KosDetailGallery images={skeletonData.images} />
            <div className={cn(
              'transition-all duration-300',
              loading && 'blur-sm'
            )}>
              <KosDetailInfo data={skeletonData} />
            </div>
          </div>

          <div className={cn(
            'mb-12 transition-all duration-300',
            loading && 'blur-sm'
          )}>
            <KosDetailTabs facilities={skeletonData.facilities} />
          </div>

          <div className="mb-12">
            <RecommendationsList />
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Container>
          <div className="py-20 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Kos Tidak Ditemukan
            </h1>
            <p className="text-gray-600 mb-6">
              Maaf, kos yang Anda cari tidak tersedia.
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
        </Container>
      </div>
    );
  }

  const kosData = {
    id: kost.id,
    name: kost.name,
    location: `${kost.address}, ${kost.city}`,
    images: kost.images.length > 0 ? kost.images : [
      '/images/kos-1.jpg',
      '/images/kos-2.jpg',
      '/images/kos-3.jpg',
      '/images/kos-4.jpg',
      '/images/kos-5.jpg',
    ],
    roomTypes: [
      { id: '1', name: '1-2', beds: '1-2 bulan', discount: null },
      { id: '2', name: '3-5', beds: '3-5 bulan', discount: 5 },
      { id: '3', name: '>6', beds: '>6 bulan', discount: 10 },
    ],
    pricing: {
      originalPrice: 2750000,
      currentPrice: 2500000,
      pricePerMonth: 'bulan',
      discount: 10,
    },
    features: kost.amenities.length > 0 ? kost.amenities : ['Termasuk internet/wifi dan cleaning'],
    facilities: {
      room: kost.amenities.slice(0, 10).map((amenity) => ({
        icon: 'ac',
        label: amenity,
      })),
      specifications: [
        { icon: 'size', label: '3 x 2.5 meter' },
        { icon: 'electricity', label: 'Tidak termasuk listrik' },
      ],
      shared: kost.amenities.slice(10, 16).map((amenity) => ({
        icon: 'wifi',
        label: amenity,
      })),
    },
    mapUrl: `https://www.google.com/maps?q=${kost.latitude},${kost.longitude}`,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="py-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-gray-900">Beranda</a>
            <span>&gt;</span>
            <span className="text-gray-900">{kosData.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <KosDetailGallery images={kosData.images} />
          <KosDetailInfo data={kosData} />
        </div>

        <div className="mb-12">
          <KosDetailTabs facilities={kosData.facilities} />
        </div>

        <div className="mb-12">
          <RecommendationsList />
        </div>
      </Container>
    </div>
  );
}
