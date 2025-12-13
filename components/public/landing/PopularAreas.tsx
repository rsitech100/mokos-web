import { Container } from '@/components/layout/Container';
import { Carousel } from '@/components/ui/Carousel';
import { PopularAreaCard } from '@/components/cards/PopularAreaCard';
import Link from 'next/link';

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
    <section id="popular" className="py-12 md:py-16 bg-gray-50 overflow-hidden scroll-mt-24">
      <Container>
        <Carousel
          variant="slider"
          title="Area Kos Paling Populer"
          actionLabel="Lihat Semua"
          actionHref="/kos"
        >
          {popularAreas.map((area) => (
            <Link 
              key={area.id} 
              href={`/kos?city=${encodeURIComponent(area.name)}`}
              className="block"
            >
              <PopularAreaCard
                name={area.name}
                image={area.image}
              />
            </Link>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
