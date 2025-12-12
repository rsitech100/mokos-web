import React from 'react';
import { Container } from '@/components/layout/Container';
import { Carousel } from '@/components/ui/Carousel';
import { KosCard } from '@/components/cards/KosCard';
import { Kost } from '@/types/kost.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function Recommendations() {
  let kosts: Kost[] = [];

  try {
    const url = `${API_BASE_URL}/api/user/kosts?limit=10`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (response.ok) {
      const data = await response.json();
      kosts = data.data || [];
    }
  } catch (error) {
  }

  const transformedKosts = kosts.map((kost: Kost) => ({
    id: kost.id,
    image: kost.images?.[0] || '/images/dummykost.png',
    rating: 4.5,
    title: kost.name,
    location: `${kost.city}, ${kost.province}`,
    district: kost.address,
    amenities: kost.amenities?.slice(0, 2).join(' • ') || 'Fasilitas Lengkap',
    originalPrice: 2750000,
    discountedPrice: 2500000,
    discountPercent: 10,
    promoType: 'Bulan Pertama',
    promoDetails: 'Tersedia',
  }));

  if (transformedKosts.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-white overflow-hidden">
        <Container>
          <div className="text-center py-12">
            <p className="text-gray-600">Tidak ada rekomendasi kos tersedia saat ini.</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <Container>
        <Carousel
          variant="top-arrow"
          title="Rekomendasi Kos Terbaik"
          actionLabel="Lihat Semua"
        >
          {transformedKosts.map((kos) => (
            <KosCard key={kos.id} {...kos} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
