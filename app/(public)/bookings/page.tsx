import { BookingsContent } from '@/components/public/bookings/BookingsContent';

interface PageProps {
  searchParams: Promise<{
    status?: string;
  }>;
}

export default async function BookingsPage({ searchParams }: PageProps) {
  return <BookingsContent searchParams={searchParams} />;
}
