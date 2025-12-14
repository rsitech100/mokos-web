import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Container } from '@/components';
import { KosDetailGallery } from '@/components/public/detail/KosDetailGallery';
import { KosDetailInfo } from '@/components/public/detail/KosDetailInfo';
import { RecommendationsList } from '@/components/lists/RecommendationsList';
import { Kost } from '@/types/kost.types';

interface KosDetailProps {
  slug: string;
}

async function fetchKost(slug: string): Promise<Kost | null> {
  try {
    const response = await fetch(`https://mokos.hla12.xyz/api/user/kosts/${slug}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.data || null;
  } catch (err) {
    console.error('Error fetching kost:', err);
    return null;
  }
}

export async function KosDetail({ slug }: KosDetailProps) {
  const kost = await fetchKost(slug);

  if (!kost) {
    notFound();
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
      { 
        id: '1', 
        name: '1-2', 
        beds: '1-2 bulan', 
        discount: null,
        price: kost.rooms?.[0]?.price || 2750000,
        originalPrice: kost.rooms?.[0]?.price || 2750000
      },
      { 
        id: '2', 
        name: '3-5', 
        beds: '3-5 bulan', 
        discount: 5,
        price: Math.round((kost.rooms?.[0]?.price || 2750000) * 0.95),
        originalPrice: kost.rooms?.[0]?.price || 2750000
      },
      { 
        id: '3', 
        name: '>6', 
        beds: '>6 bulan', 
        discount: 10,
        price: Math.round((kost.rooms?.[0]?.price || 2750000) * 0.90),
        originalPrice: kost.rooms?.[0]?.price || 2750000
      },
    ],
    pricing: {
      originalPrice: 2750000,
      currentPrice: 2500000,
      pricePerMonth: 'bulan',
      discount: 10,
    },
    features: kost.amenities.length > 0 ? kost.amenities : ['Termasuk internet/wifi dan cleaning'],
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

        <div className="mb-8">
          <KosDetailGallery 
            images={kosData.images}
            title={kosData.name}
            location={kosData.location}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Map on Left */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src="/images/map.png"
              alt="Location map"
              fill
              className="object-cover"
            />
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          {/* Info on Right */}
          <KosDetailInfo data={kosData} />
        </div>

        <div className="mb-12">
          <RecommendationsList />
        </div>
      </Container>
    </div>
  );
}
