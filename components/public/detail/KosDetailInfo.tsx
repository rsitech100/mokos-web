import React from 'react';
import { KosDetailTabs } from '@/components/tabs/KosDetailTabs';

interface RoomType {
  id: string;
  name: string;
  beds: string;
  discount: number | null;
  price: number;
  originalPrice?: number;
}

interface KosDetailInfoProps {
  data: {
    name: string;
    location: string;
    roomTypes: RoomType[];
    pricing: {
      originalPrice: number;
      currentPrice: number;
      pricePerMonth: string;
      discount: number;
    };
    features: string[];
  };
  kostId?: string;
}

export function KosDetailInfo({ data, kostId }: KosDetailInfoProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{data.name}</h1>
          <p className="text-gray-600">{data.location}</p>
        </div>
      </div>

      <KosDetailTabs 
        roomTypes={data.roomTypes}
        features={data.features}
        kostId={kostId}
      />
    </div>
  );
}
