'use client';

import React from 'react';
import { Container } from '@/components/layout/Container';
import { Carousel } from '@/components/ui/Carousel';
import { PopularAreaCard } from '@/components/cards/PopularAreaCard';

export function PopularAreas() {
  const popularAreas = [
    {
      id: 1,
      name: 'Jakarta',
      image: '/images/jakarta.png',
    },
    {
      id: 2,
      name: 'Yogyakarta',
      image: '/images/yogyakarta.png',
    },
    {
      id: 3,
      name: 'Bandung',
      image: '/images/bandung.png',
    },
    {
      id: 4,
      name: 'Malang',
      image: '/images/malang.png',
    },
    {
      id: 5,
      name: 'Malang',
      image: '/images/malang.png',
    },
    {
      id: 6,
      name: 'Malang',
      image: '/images/malang.png',
    },
    {
      id: 7,
      name: 'Malang',
      image: '/images/malang.png',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50 overflow-hidden">
      <Container>
        <Carousel
          variant="slider"
          title="Area Kos Paling Populer"
          actionLabel="Lihat Semua"
          onActionClick={() => console.log('View all areas')}
        >
          {popularAreas.map((area) => (
            <PopularAreaCard
              key={area.id}
              name={area.name}
              image={area.image}
              onClick={() => console.log(`Clicked ${area.name}`)}
            />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
