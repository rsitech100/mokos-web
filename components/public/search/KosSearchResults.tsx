import { Container } from '@/components/layout/Container';
import { FilterSidebar } from '@/components/ui/FilterSidebar';
import { SearchButton } from '@/components/button/SearchButton';
import { KosSearchList } from '@/components/lists/KosSearchList';

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

export function KosSearchResults({ searchParams }: KosSearchResultsProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <Container>
          <div className="py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Temukan Kos Impianmu
            </h1>
            <SearchButton 
              placeholder="Cari kos berdasarkan lokasi, nama, atau alamat..." 
              initialValue={searchParams.search || ''}
            />
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <FilterSidebar searchParams={searchParams} />
            </aside>

            <main className="lg:col-span-3">
              <KosSearchList searchParams={searchParams} />
            </main>
          </div>
        </div>
      </Container>
    </div>
  );
}
