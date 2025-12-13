'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Carousel } from '@/components/ui/Carousel';
import { KosCard } from '@/components/cards/KosCard';
import { Kost } from '@/types/kost.types';

export function RecommendationsList() {
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
        } else {
          console.error('Failed to fetch kosts:', response.statusText);
          setKosts([]);
        }
      } catch (error) {
        console.error('Error fetching kosts:', error);
        setKosts([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchKosts();
  }, []);

  const getGenderLabel = (gender?: string[]) => {
    if (!gender || gender.length === 0) return undefined;
    if (gender.includes('female') && gender.includes('male')) return 'Campur';
    if (gender.includes('female')) return 'Putri';
    if (gender.includes('male')) return 'Putra';
    return undefined;
  };

  const transformedKosts = useMemo(() => 
    kosts.map((kost) => ({
      id: kost.id,
      image: kost.images?.[0] || '/images/dummykost.png',
      rating: 4.5,
      title: kost.name,
      location: `${kost.city}, ${kost.province}`,
      district: `${kost.district || kost.address}`,
      amenities: kost.amenities?.slice(0, 3).join(' • ') || 'Fasilitas Lengkap',
      gender: getGenderLabel(kost.gender),
      originalPrice: 2750000,
      discountedPrice: 2500000,
      discountPercent: 10,
      promoType: 'Bulan Pertama',
      promoDetails: 'Sisa 2 Kamar',
    }))
  , [kosts]);

  const displayKosts = loading ? skeletonData : transformedKosts;

  if (!loading && transformedKosts.length === 0) {
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
          onActionClick={() => window.location.href = '/kos'}
        >
          {displayKosts.map((kos) => (
            <KosCard key={kos.id} {...kos} isLoading={loading} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
