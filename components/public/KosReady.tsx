'use client';

import React from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { KosCard } from '@/components/cards/KosCard';

export function KosReady() {
  const readyKos = [
    {
      id: 1,
      image: '/images/dummykost.png',
      rating: 4.5,
      title: 'Kost Gemara PVJ Jakarta Tipe A',
      location: 'Tebet Dalam, Jakarta Selatan',
      district: 'K. Mandi Dalam',
      amenities: 'Wifi • Full Furnished',
      originalPrice: 2750000,
      discountedPrice: 2500000,
      discountPercent: 10,
      promoType: 'Bulan Pertama',
      promoDetails: 'Sisa 2 Kamar',
    },
    {
      id: 2,
      image: '/images/dummykost.png',
      rating: 4.5,
      title: 'Kost Smart Cipete',
      location: 'Gandaria Selatan, Cilandak',
      district: 'K. Mandi Dalam',
      amenities: 'Wifi • Full Furnished',
      originalPrice: 2750000,
      discountedPrice: 2500000,
      discountPercent: 10,
      promoType: 'Bulan Pertama',
      promoDetails: 'Sisa 2 Kamar',
    },
    {
      id: 3,
      image: '/images/dummykost.png',
      rating: 4.5,
      title: 'Kost Sunset Road Coliving',
      location: 'Pasar Baru, Sawah Besar',
      district: 'K. Mandi Dalam',
      amenities: 'Wifi • Full Furnished',
      originalPrice: 2750000,
      discountedPrice: 2500000,
      discountPercent: 10,
      promoType: 'Bulan Pertama',
      promoDetails: 'Sisa 2 Kamar',
    },
    {
      id: 4,
      image: '/images/dummykost.png',
      rating: 4.5,
      title: 'Kost Gemara PVJ Jakarta Tipe A',
      location: 'Tebet Dalam, Jakarta Selatan',
      district: 'K. Mandi Dalam',
      amenities: 'Wifi • Full Furnished',
      originalPrice: 2750000,
      discountedPrice: 2500000,
      discountPercent: 10,
      promoType: 'Bulan Pertama',
      promoDetails: 'Sisa 2 Kamar',
    },
    {
      id: 5,
      image: '/images/dummykost.png',
      rating: 4.5,
      title: 'Kost Gemara PVJ Jakarta Tipe A',
      location: 'Tebet Dalam, Jakarta Selatan',
      district: 'K. Mandi Dalam',
      amenities: 'Wifi • Full Furnished',
      originalPrice: 2750000,
      discountedPrice: 2500000,
      discountPercent: 10,
      promoType: 'Bulan Pertama',
      promoDetails: 'Sisa 2 Kamar',
    },
    {
      id: 6,
      image: '/images/dummykost.png',
      rating: 4.5,
      title: 'Kost Gemara PVJ Jakarta Tipe A',
      location: 'Tebet Dalam, Jakarta Selatan',
      district: 'K. Mandi Dalam',
      amenities: 'Wifi • Full Furnished',
      originalPrice: 2750000,
      discountedPrice: 2500000,
      discountPercent: 10,
      promoType: 'Bulan Pertama',
      promoDetails: 'Sisa 2 Kamar',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <Container>
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Kos Ready, Mood Steady
          </h2>
          <p className="text-gray-600 text-base">
            Pilihan kos lengkap yang langsung ready. Cari yang pas, cek cepat, dan amankan sebelum keambil orang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {readyKos.map((kos) => (
            <KosCard key={kos.id} {...kos} className="w-full" />
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log('View all kos ready')}
            className="min-w-[120px]"
          >
            Lihat Semua
          </Button>
        </div>
      </Container>
    </section>
  );
}
