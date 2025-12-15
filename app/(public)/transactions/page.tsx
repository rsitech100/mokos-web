import { TransactionsContent } from '@/components/public/transactions/TransactionsContent';

interface PageProps {
  searchParams: Promise<{
    paymentStatus?: string;
  }>;
}

export default async function TransactionsPage({ searchParams }: PageProps) {
  return <TransactionsContent searchParams={searchParams} />;
}
