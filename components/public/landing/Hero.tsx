import { Container } from '@/components/layout/Container';
import { SearchButton } from '@/components/button/SearchButton';
import { FacilityButton } from '@/components/button/FacilityButton';
import Image from 'next/image';

export function Hero() {
  const facilities = [
    { label: 'Dekat MRT', icon: '/images/mrt-logo.png' },
    { label: 'Dekat KRL', icon: '/images/kai-logo.png' },
    { label: 'Pet Friendly', emoji: '🐕' },
    { label: 'Pasutri', emoji: '👫' },
    { label: 'Bangunan Baru', emoji: '🏠' },
    { label: 'Kos Campur', emoji: '👥' },
    { label: 'Ramah Disabilitas', emoji: '♿' },
  ];

  return (
    <section className="py-12 lg:py-14 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center bg-red-600 text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase">
                New
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-700">
                Promo pelanggan baru 🎉
                <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-5xl font-bold text-gray-900 leading-tight">
              Pilihan Kos Terlengkap untuk Setiap Kebutuhan
            </h1>

            <p className="text-base font-light lg:text-xl text-gray-600 leading-relaxed">
              Jelajahi kos dan properti terbaik di banyak lokasi. Proses<br/>
              cepat, pilihan lengkap, dan pengalaman pencarian yang<br/>lebih praktis.
            </p>

            <SearchButton className="mt-6" />

            <div className="mt-8">
              <p className="text-md font-medium text-gray-700 mb-3">Fasilitas</p>
              <div className="grid grid-cols-3 gap-2 w-fit">
                {facilities.map((facility, index) => (
                  <FacilityButton
                    key={index}
                    label={facility.label}
                    icon={facility.icon}
                    emoji={facility.emoji}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/hero.png"
                  alt="Kos Impian - Temukan kos terbaik"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
