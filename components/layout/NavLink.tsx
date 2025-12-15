'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  label: string;
}

export function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage && href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <Link
      href={href}
      onClick={handleNavClick}
      className="text-sm font-normal text-gray-700 hover:text-primary transition-colors"
    >
      {label}
    </Link>
  );
}
