import { FilterForm } from '../form/FilterForm';

interface FilterSidebarProps {
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

export function FilterSidebar({ searchParams }: FilterSidebarProps) {
  const initialFilters = {
    city: searchParams.city || '',
    province: searchParams.province || '',
    gender: searchParams.gender || '',
    minPrice: searchParams.minPrice || '',
    maxPrice: searchParams.maxPrice || '',
    sortBy: searchParams.sortBy || 'createdAt',
    order: searchParams.order || 'desc',
  };

  const initialFacilities = searchParams.facilities?.split(',').filter(Boolean) || [];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
      <FilterForm initialFilters={initialFilters} initialFacilities={initialFacilities} />
    </div>
  );
}
