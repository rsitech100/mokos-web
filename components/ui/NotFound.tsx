import Link from 'next/link';
import { Container } from '@/components/layout/Container';

interface NotFoundProps {
  title?: string;
  description?: string;
  showButton?: boolean;
  buttonText?: string;
  buttonHref?: string;
}

export function NotFound({
  title = 'Tidak Ditemukan',
  description = 'Maaf, halaman yang Anda cari tidak ditemukan.',
  showButton = true,
  buttonText = 'Kembali ke Beranda',
  buttonHref = '/',
}: NotFoundProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Container>
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {description}
          </p>
          {showButton && (
            <Link
              href={buttonHref}
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              {buttonText}
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
}
