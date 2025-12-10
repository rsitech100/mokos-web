'use client';

import React from 'react';
import { Container } from '@/components/layout/Container';
import { Carousel } from '@/components/ui/Carousel';
import { KosCard } from '@/components/cards/KosCard';

export function Recommendations() {
  const recommendedKos = [
    {
      id: 1,
      image: '/images/dummykost.png',
      rating: 4.5,
      title: 'Kost Gemara PVJ Jakarta Tipe A',
      location: 'Grogol Petamburan, Jelambar',
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
      title: 'Kost Urban Living Center',
      location: 'Menteng, Jakarta Pusat',
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
      title: 'Kost Urban Living Center',
      location: 'Menteng, Jakarta Pusat',
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
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <Container>
        <Carousel
          variant="top-arrow"
          title="Rekomendasi Kos Terbaik"
          actionLabel="Lihat Semua"
          onActionClick={() => console.log('View all recommendations')}
        >
          {recommendedKos.map((kos) => (
            <KosCard key={kos.id} {...kos} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
