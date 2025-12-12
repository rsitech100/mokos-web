import { KosDetail } from '@/components/public/detail/KosDetail';

interface KosDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function KosDetailPage({ params }: KosDetailPageProps) {
  const { slug } = await params;
  return <KosDetail slug={slug} />;
}
