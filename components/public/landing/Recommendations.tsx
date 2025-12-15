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

export async function Recommendations() {
  let rooms: Room[] = [];

  try {
    const response = await fetch('/api/rooms?limit=10', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (response.ok) {
      const data = await response.json();
      rooms = data.data || [];
    }
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }

  const getGenderLabel = (gender?: string[]) => {
    if (!gender || gender.length === 0) return undefined;
    if (gender.includes('female') && gender.includes('male')) return 'Campur';
    if (gender.includes('female')) return 'Putri';
    if (gender.includes('male')) return 'Putra';
    return undefined;
  };

  const transformedRooms = rooms.map((room) => ({
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
  }));

  if (transformedRooms.length === 0) {
    return (
      <section id="recommendations" className="py-12 md:py-16 bg-white overflow-hidden scroll-mt-24">
        <Container>
          <div className="text-center py-12">
            <p className="text-gray-600">Tidak ada rekomendasi kos tersedia saat ini.</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="recommendations" className="py-12 md:py-16 bg-white overflow-hidden scroll-mt-24">
      <Container>
        <Carousel
          variant="top-arrow"
          title="Rekomendasi Kos Terbaik"
          actionLabel="Lihat Semua"
        >
          {transformedRooms.map((room) => (
            <KosCard key={room.id} {...room} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
