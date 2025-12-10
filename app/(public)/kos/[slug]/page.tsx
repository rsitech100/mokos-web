import React from 'react';
import { Container } from '@/components';
import { KosDetailGallery } from '@/components/public/KosDetailGallery';
import { KosDetailInfo } from '@/components/public/KosDetailInfo';
import { KosDetailTabs } from '@/components/public/KosDetailTabs';
import { Recommendations } from '@/components/public/Recommendations';

interface KosDetailPageProps {
  params: {
    slug: string;
  };
}

const kosData = {
  id: '1',
  name: 'Kos Cemara PVJ Jakarta',
  location: 'Grogol Petamburan, Jalanstar',
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
  features: ['Termasuk internet/wifi dan cleaning'],
  facilities: {
    room: [
      { icon: 'ac', label: 'AC' },
      { icon: 'table', label: 'Meja' },
      { icon: 'storage', label: 'Lemari / Storage' },
      { icon: 'window', label: 'Jendela' },
      { icon: 'pillow', label: 'Bantal' },
      { icon: 'mattress', label: 'Kasur' },
      { icon: 'chair', label: 'Meja Rias' },
      { icon: 'fan', label: 'Ventilasi' },
      { icon: 'toilet', label: 'Cermin' },
      { icon: 'laundry', label: 'Wastafel' },
    ],
    specifications: [
      { icon: 'size', label: '3 x 2.5 meter' },
      { icon: 'electricity', label: 'Tidak termasuk listrik' },
    ],
    shared: [
      { icon: 'wifi', label: 'Wifi' },
      { icon: 'parking-car', label: 'Parkir Mobil' },
      { icon: 'parking-bike', label: 'Parkir Motor' },
      { icon: 'living-room', label: 'Ruang Tamu' },
      { icon: 'cleaning', label: 'Cleaning' },
      { icon: 'laundry', label: 'Laundry' },
    ],
  },
  mapUrl: 'https://maps.google.com',
};

export default function KosDetailPage({ params }: KosDetailPageProps) {
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
          <Recommendations />
        </div>
      </Container>
    </div>
  );
}
