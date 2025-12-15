import { Suspense } from 'react';
import { KosSearchResults } from '@/components/public/search/KosSearchResults';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    city?: string;
    province?: string;
    gender?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    order?: string;
    facilities?: string;
  }>;
}

export default async function KosListPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-gray-600">Memuat...</p>
          </div>
        </div>
      }
    >
      <KosSearchResults searchParams={params} />
    </Suspense>
  );
}

