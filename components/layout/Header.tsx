'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from './Container';
import { Button } from '@/components/ui/Button';

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '';

  const navItems = [
    { label: 'Area Kos Populer', href: '#popular' },
    { label: 'Rekomendasi Kos', href: '#recommendations' },
    { label: 'Pusat Bantuan', href: '#help' },
    { label: 'Syarat dan Ketentuan', href: '#terms' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHomePage && href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="sticky top-4 z-50 w-full pointer-events-none">
      <Container>
        <div className="pointer-events-auto mx-auto bg-white/95 border border-gray-200 rounded-2xl shadow-md px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/80">
          <nav className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="flex items-center gap-2">
              <svg
                className="h-8 w-8 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" />
                <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" />
                <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" />
                <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" />
              </svg>
              <span className="text-xl font-bold text-gray-900">Mokos</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={isHomePage ? item.href : `/${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-normal text-gray-700 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Button variant="primary" size="md">
            Masuk
          </Button>
        </nav>
        </div>
      </Container>
    </header>
  );
}
