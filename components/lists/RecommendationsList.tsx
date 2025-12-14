'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Carousel } from '@/components/ui/Carousel';
import { KosCard } from '@/components/cards/KosCard';

interface Room {
  id: string;
  image: string;
  title: string;
  amenities: string[];
  gender?: string[];
  pricePerMonth: number;
  availableCount: number;
  availabilityText: string;
}

export function RecommendationsList() {
  const [rooms, setRooms] = useState<Room[]>([]);
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
      originalPrice: 0,
      discountedPrice: 0,
      discountPercent: 0,
      promoType: 'Loading...',
      promoDetails: 'Tersedia',
    }))
  , []);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await fetch('/api/rooms?limit=10');
        if (response.ok) {
          const data = await response.json();
          setRooms(data.data || []);
        } else {
          console.error('Failed to fetch rooms:', response.statusText);
          setRooms([]);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRooms();
  }, []);

  const getGenderLabel = (gender?: string[]) => {
    if (!gender || gender.length === 0) return undefined;
    if (gender.includes('female') && gender.includes('male')) return 'Campur';
    if (gender.includes('female')) return 'Putri';
    if (gender.includes('male')) return 'Putra';
    return undefined;
  };

  const transformedRooms = useMemo(() => 
    rooms.map((room) => ({
      id: room.id,
      image: room.image || '/images/dummykost.png',
      rating: 4.5,
      title: room.title,
      location: '',
      district: room.title.split(' - ')[2] || '',
      amenities: room.amenities?.slice(0, 3).join(' • ') || 'Fasilitas Lengkap',
      gender: getGenderLabel(room.gender),
      originalPrice: room.pricePerMonth || 0,
      discountedPrice: room.pricePerMonth || 0,
      discountPercent: 0,
      promoType: room.availabilityText,
      promoDetails: `${room.availableCount} Kamar`,
    }))
  , [rooms]);

  const displayRooms = loading ? skeletonData : transformedRooms;

  if (!loading && transformedRooms.length === 0) {
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
          {displayRooms.map((room) => (
            <KosCard key={room.id} {...room} isLoading={loading} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
