import { RiwayatContent } from '@/components/public/riwayat/RiwayatContent';

interface RiwayatPageProps {
  searchParams?: Promise<{
    tab?: string;
    status?: string;
  }>;
}

export default function RiwayatPage({ searchParams }: RiwayatPageProps) {
  return <RiwayatContent searchParams={searchParams} />;
}
