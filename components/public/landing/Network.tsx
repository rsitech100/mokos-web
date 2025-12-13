import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export function Network() {
  const stats = [
    {
      value: '500+',
      label: 'Kos dan Apartemen',
    },
    {
      value: '50',
      label: 'Wilayah di Kota Besar',
    },
    {
      value: '20',
      label: 'Projects under Management',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <Container>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Jaringan Kos Mokos
            </h2>
            <p className="text-gray-600 text-base">
              Pilihan kos yang dikelola langsung oleh Mokos dan tersebar di banyak wilayah Indonesia.
            </p>
          </div>

          <div className="flex flex-wrap gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </span>
                <span className="text-sm text-gray-600">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-8">
          <div className="relative w-full h-[300px] md:h-[400px]">
            <Image
              src="/images/map.png"
              alt="Mokos Global Network Map"
              fill
              className="object-contain"
            />
            
            <div className="absolute inset-0">
              {/* Marker 1 - South America */}
              <div className="absolute" style={{ left: '18%', top: '58%' }}>
                <div className="relative">
                  <svg className="w-8 h-8 text-blue-600 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
              </div>

              {/* Marker 2 - Europe */}
              <div className="absolute" style={{ left: '48%', top: '28%' }}>
                <div className="relative">
                  <svg className="w-8 h-8 text-blue-600 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
              </div>

              {/* Marker 3 - Middle East */}
              <div className="absolute" style={{ left: '54%', top: '35%' }}>
                <div className="relative">
                  <svg className="w-8 h-8 text-blue-600 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
              </div>

              {/* Marker 4 - Asia */}
              <div className="absolute" style={{ left: '70%', top: '32%' }}>
                <div className="relative">
                  <svg className="w-8 h-8 text-blue-600 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
              </div>

              {/* Marker 5 - Southeast Asia */}
              <div className="absolute" style={{ left: '76%', top: '48%' }}>
                <div className="relative">
                  <svg className="w-8 h-8 text-blue-600 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
              </div>

              {/* Marker 6 - North America */}
              <div className="absolute" style={{ left: '15%', top: '25%' }}>
                <div className="relative">
                  <svg className="w-8 h-8 text-blue-600 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              size="md"
              className="group"
            >
              Jelajahi Kos Dari Maps
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12h14m-7-7l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
