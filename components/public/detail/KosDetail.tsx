import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Container } from '@/components';
import { KosDetailGallery } from '@/components/public/detail/KosDetailGallery';
import { KosDetailInfo } from '@/components/public/detail/KosDetailInfo';
import { RecommendationsList } from '@/components/lists/RecommendationsList';

interface Price {
  id: string;
  roomId: string;
  price: string;
  durationType: string;
  strikePrice: string | null;
  downPaymentAmount: string | null;
  downPaymentPercentage: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface RoomDetail {
  id: string;
  kostId: string;
  roomNumber: string;
  type: string;
  capacity: number;
  inventory: number;
  size: string;
  floor: number;
  description: string;
  facilities: string[];
  images: string[];
  status: string;
  isActive: boolean;
  prices: Price[];
  kost: {
    id: string;
    name: string;
    address: string;
    city: string;
  };
}

interface KosDetailProps {
  slug: string;
}

async function fetchRoom(slug: string): Promise<RoomDetail | null> {
  try {
    // Use external API directly for server component
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://mokos.hla12.xyz';
    const response = await fetch(`${apiUrl}/api/user/rooms/${slug}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.data || null;
  } catch (err) {
    console.error('Error fetching room:', err);
    return null;
  }
}

function getDurationLabel(durationType: string): string {
  const labels: Record<string, string> = {
    '1day': '1 hari',
    '7days': '7 hari',
    '1month': '1 bulan',
    '6months': '6 bulan',
    '12months': '12 bulan',
  };
  return labels[durationType] || durationType;
}

function getDurationName(durationType: string): string {
  const names: Record<string, string> = {
    '1day': '1D',
    '7days': '7D',
    '1month': '1M',
    '6months': '6M',
    '12months': '12M',
  };
  return names[durationType] || durationType;
}

export async function KosDetail({ slug }: KosDetailProps) {
  const room = await fetchRoom(slug);

  if (!room) {
    notFound();
  }

  const hasPrices = room.prices && room.prices.length > 0;

  let roomTypes: any[] = [];
  let defaultPrice: any = null;

  if (hasPrices) {
    roomTypes = room.prices
      .filter(price => price.isActive)
      .map((price, index) => ({
        id: String(index + 1),
        name: getDurationLabel(price.durationType),
        beds: getDurationLabel(price.durationType),
        discount: price.strikePrice ? 
          Math.round(((parseFloat(price.strikePrice) - parseFloat(price.price)) / parseFloat(price.strikePrice)) * 100) : null,
        price: parseFloat(price.price),
        originalPrice: price.strikePrice ? parseFloat(price.strikePrice) : parseFloat(price.price),
        durationType: price.durationType,
        durationLabel: getDurationLabel(price.durationType),
      }));

    if (roomTypes.length === 0) {
      roomTypes.push(...room.prices.map((price, index) => ({
        id: String(index + 1),
        name: getDurationLabel(price.durationType),
        beds: getDurationLabel(price.durationType),
        discount: price.strikePrice ? 
          Math.round(((parseFloat(price.strikePrice) - parseFloat(price.price)) / parseFloat(price.strikePrice)) * 100) : null,
        price: parseFloat(price.price),
        originalPrice: price.strikePrice ? parseFloat(price.strikePrice) : parseFloat(price.price),
        durationType: price.durationType,
        durationLabel: getDurationLabel(price.durationType),
      })));
    }

    defaultPrice = room.prices.find(p => p.isActive) || room.prices[0];
  }

  const kosData = {
    id: room.id,
    name: `${room.kost.name} - ${room.type}`,
    location: `${room.kost.address}, ${room.kost.city}`,
    images: room.images.length > 0 ? room.images : [
      '/images/kos-1.jpg',
      '/images/kos-2.jpg',
      '/images/kos-3.jpg',
      '/images/kos-4.jpg',
      '/images/kos-5.jpg',
    ],
    roomTypes: roomTypes,
    pricing: hasPrices ? {
      originalPrice: defaultPrice?.strikePrice ? parseFloat(defaultPrice.strikePrice) : parseFloat(defaultPrice?.price || '0'),
      currentPrice: parseFloat(defaultPrice?.price || '0'),
      pricePerMonth: getDurationLabel(defaultPrice?.durationType || '1month'),
      discount: defaultPrice?.strikePrice ? 
        Math.round(((parseFloat(defaultPrice.strikePrice) - parseFloat(defaultPrice.price)) / parseFloat(defaultPrice.strikePrice)) * 100) : 0,
    } : {
      originalPrice: 0,
      currentPrice: 0,
      pricePerMonth: 'bulan',
      discount: 0,
    },
    features: room.facilities.length > 0 ? room.facilities : ['Termasuk internet/wifi dan cleaning'],
    mapUrl: `https://www.google.com/maps`,
    hasPrices: hasPrices,
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
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src="/images/map.png"
              alt="Location map"
              fill
              className="object-cover"
            />
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <KosDetailInfo data={kosData} />
        </div>

        <div className="mb-12">
          <RecommendationsList />
        </div>
      </Container>
    </div>
  );
}
