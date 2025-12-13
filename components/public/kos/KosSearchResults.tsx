import { Container } from '@/components/layout/Container';
import { FilterSidebar } from '@/components/ui/FilterSidebar';
import { KosCard } from '@/components/cards/KosCard';
import { SearchButton } from '@/components/button/SearchButton';

interface Kost {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  province: string;
  district: string;
  amenities: string[];
  gender: string[];
  images: string[];
  phoneNumber: string;
  rooms: Array<{
    id: string;
    price: number;
  }>;
}

interface KosSearchResultsProps {
  searchParams: {
    search?: string;
    city?: string;
    province?: string;
    gender?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    order?: string;
    facilities?: string;
  };
}

async function fetchKosts(searchParams: KosSearchResultsProps['searchParams']) {
  try {
    const params = new URLSearchParams();
    
    // Add all search params to the API call
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://mokos.hla12.xyz';
    const response = await fetch(`${apiUrl}/api/user/kosts?${params.toString()}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch kosts');
    }
    
    const data = await response.json();
    return {
      kosts: data.data || [],
      total: data.metadata?.pagination?.total || 0,
      pagination: data.metadata?.pagination || null,
    };
  } catch (error) {
    console.error('Error fetching kosts:', error);
    return {
      kosts: [],
      total: 0,
    };
  }
}

function getGenderLabel(genderArray: string[]): string {
  if (!genderArray || genderArray.length === 0) return 'Campur';
  if (genderArray.length === 2) return 'Campur';
  return genderArray[0] === 'male' ? 'Putra' : 'Putri';
}

export async function KosSearchResults({ searchParams }: KosSearchResultsProps) {
  const { kosts, total, pagination } = await fetchKosts(searchParams);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <Container>
          <div className="py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Temukan Kos Impianmu
            </h1>
            <SearchButton placeholder="Cari kos berdasarkan lokasi, nama, atau alamat..." />
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <aside className="lg:col-span-1">
              <FilterSidebar searchParams={searchParams} />
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">
                    Menampilkan{' '}
                    <span className="font-semibold text-gray-900">{total}</span>{' '}
                    kos
                  </p>
                </div>
              </div>

              {kosts.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <svg
                      className="w-24 h-24 mx-auto text-gray-300 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Tidak Ada Kos Ditemukan
                    </h3>
                    <p className="text-gray-600">
                      Coba ubah filter atau kata kunci pencarian Anda
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {kosts.map((kost: Kost) => {
                    const genderLabel = getGenderLabel(kost.gender);
                    const amenitiesText = kost.amenities.slice(0, 3).join(' • ');
                    const price = kost.rooms && kost.rooms.length > 0 
                      ? Math.min(...kost.rooms.map(room => room.price))
                      : 0;
                    
                    return (
                      <KosCard
                        key={kost.id}
                        id={kost.id}
                        title={kost.name}
                        location={kost.address}
                        district={kost.district}
                        image={kost.images[0] || '/images/placeholder.jpg'}
                        rating={4.5}
                        amenities={amenitiesText}
                        gender={genderLabel}
                        originalPrice={price}
                        discountedPrice={price}
                        discountPercent={0}
                        promoType=""
                        promoDetails="/bulan"
                      />
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              {pagination?.hasNext && (
                <div className="mt-8 text-center">
                  <a
                    href={`/kos?${new URLSearchParams({
                      ...searchParams,
                      page: String((pagination.page || 1) + 1),
                    }).toString()}`}
                    className="inline-block px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Lihat Lainnya
                  </a>
                </div>
              )}
            </main>
          </div>
        </div>
      </Container>
    </div>
  );
}
