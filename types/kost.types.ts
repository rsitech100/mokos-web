export interface Kost {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  amenities: string[];
  rules: string;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface KostListResponse {
  success: boolean;
  message: string;
  data: Kost[];
}

export interface KostDetailResponse {
  success: boolean;
  message: string;
  data: Kost;
}

export interface KostQueryParams {
  city?: string;
  province?: string;
  search?: string;
  gender?: string;
  facilities?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
