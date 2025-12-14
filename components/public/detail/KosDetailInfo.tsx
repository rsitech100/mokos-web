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
}

export function KosDetailInfo({ data }: KosDetailInfoProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{data.name}</h1>
          <p className="text-gray-600">{data.location}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition-colors">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition-colors">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      <KosDetailTabs 
        roomTypes={data.roomTypes}
        features={data.features}
      />
    </div>
  );
}
