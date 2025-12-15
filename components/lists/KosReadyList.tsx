'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
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

export function KosReadyList() {
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
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
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
      amenities: room.amenities?.slice(0, 2).join(' • ') || 'Fasilitas Lengkap',
      gender: getGenderLabel(room.gender),
      originalPrice: room.pricePerMonth || 0,
      discountedPrice: room.pricePerMonth || 0,
      discountPercent: 0,
      promoType: room.availabilityText,
      promoDetails: `${room.availableCount} Kamar`,
    }))
  , [rooms]);

  const displayRooms = loading ? skeletonData : transformedRooms.slice(0, 6);
  const showViewAllButton = !loading && transformedRooms.length >= 10;

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
          {displayRooms.map((room) => (
            <KosCard key={room.id} {...room} isLoading={loading} className="w-full" />
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
