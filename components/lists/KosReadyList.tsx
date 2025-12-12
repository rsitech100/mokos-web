'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { KosCard } from '@/components/cards/KosCard';
import { Kost } from '@/types/kost.types';

export function KosReadyList() {
  const [kosts, setKosts] = useState<Kost[]>([]);
  const [loading, setLoading] = useState(true);

  const skeletonData = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: `skeleton-${i}`,
      image: '/images/dummykost.png',
      rating: 4.5,
      title: 'Loading...',
      location: 'Loading...',
      district: 'Loading...',
      amenities: 'Loading...',
      originalPrice: 2750000,
      discountedPrice: 2500000,
      discountPercent: 10,
      promoType: 'Bulan Pertama',
      promoDetails: 'Tersedia',
    }))
  , []);

  useEffect(() => {
    async function fetchKosts() {
      try {
        const response = await fetch('/api/kosts?limit=10');
        if (response.ok) {
          const data = await response.json();
          setKosts(data.data || []);
        }
      } catch (error) {
        console.error('Error fetching kosts:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchKosts();
  }, []);

  const transformedKosts = useMemo(() => 
    kosts.map((kost) => ({
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
    }))
  , [kosts]);

  const displayKosts = loading ? skeletonData : transformedKosts.slice(0, 6);
  const showViewAllButton = !loading && transformedKosts.length >= 10;

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
            <KosCard key={kos.id} {...kos} isLoading={loading} className="w-full" />
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
