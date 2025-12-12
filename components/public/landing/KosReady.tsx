import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { KosCard } from '@/components/cards/KosCard';
import { Kost } from '@/types/kost.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function KosReady() {
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

  const transformedKosts = kosts.map((kost) => ({
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

  const displayKosts = transformedKosts.slice(0, 6);
  const showViewAllButton = transformedKosts.length >= 10;

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
          {displayKosts.map((kos) => (
            <KosCard key={kos.id} {...kos} className="w-full" />
          ))}
        </div>

        {showViewAllButton && (
          <div className="flex justify-center">
            <Link href="/kos">
              <Button
                variant="outline"
                size="sm"
                className="min-w-[120px]"
              >
                Lihat Semua
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
