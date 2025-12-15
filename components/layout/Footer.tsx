import Link from 'next/link';
import { Container } from '@/components/layout/Container';

export function Footer() {
  const footerSections = [
    {
      title: 'MOKOS',
      links: [
        { label: 'Tentang Kami', href: '/tentang-kami' },
        // { label: 'Promosikan Kos Kamu', href: '/promosi-kos' },
        { label: 'Pusat Bantuan', href: '/bantuan' },
      ],
    },
    {
      title: 'PRODUK',
      links: [
        { label: 'Kos', href: '/kos' },
        // { label: 'Apartemen', href: '/apartemen' },
      ],
    },
    {
      title: 'KEBIJAKAN',
      links: [
        // { label: 'Kebijakan Privasi', href: '/kebijakan-privasi' },
        { label: 'Syarat dan Ketentuan Umum', href: '/syarat-ketentuan' },
      ],
    },
    {
      title: 'HUBUNGI KAMI',
      links: [
        { label: 'cs@mokos.com', href: 'mailto:cs@mokos.com', icon: 'email' as const },
        { label: 'Mokos Property', href: 'https://mokosproperty.com', icon: 'linkedin' as const },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <Container>
        <div className="py-12 md:py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-auto lg:shrink-0">
              <div className="flex items-center gap-2 mb-4">
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
              <p className="text-gray-600 text-sm mb-6 leading-relaxed whitespace-nowrap">
                Mulai dari survei, sampai pindah, semua lebih simpel.
              </p>

              <div className="flex flex-row gap-3">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-gray-900 hover:text-primary transition-colors w-fit"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span className="text-sm font-normal">App store</span>
                </Link>

                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-gray-900 hover:text-primary transition-colors w-fit"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <span className="text-sm font-normal">Google play</span>
                </Link>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerSections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wide">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors text-sm"
                        >
                          {'icon' in link && link.icon === 'email' && (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                          )}
                          {'icon' in link && link.icon === 'linkedin' && (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                            </svg>
                          )}
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-6">
                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </div>
              <p className="text-sm text-gray-500">
                Copyright ©2026. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
