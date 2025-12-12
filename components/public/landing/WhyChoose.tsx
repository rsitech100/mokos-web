'use client';

import React from 'react';
import { Container } from '@/components/layout/Container';
import { FeatureCard } from '@/components/cards/FeatureCard';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export function WhyChoose() {
  const features = [
    {
      id: 1,
      image: '/images/feature-2.png',
      label: 'SEWA',
      title: 'Sewa Langsung via Mokos',
      description: 'Bisa langsung menghubungi sewa kos di aplikasi atau website Mokos. Kamu bisa sewa dari 3 bulan sebelum masuk kosan tanpa takut kedudulan.',
      variant: 'default' as const,
    },
    {
      id: 2,
      image: '/images/feature-2.png',
      label: 'PROPERTY',
      title: '500+',
      subtitle: 'Tersedia 500 lebih kos dan apartemen di berbagai wilayah',
      description: '',
      variant: 'primary' as const,
    },
    {
      id: 3,
      image: '/images/feature-2.png',
      label: 'TRUSTED PAYMENT',
      title: 'Pembayaran via Mokos Antri Ribet dan Banyak Promo Menarik.',
      description: '',
      variant: 'default' as const,
    },
    {
      id: 4,
      image: '/images/feature-2.png',
      label: 'FEATURES',
      title: 'Terhubung langsung dengan pemilik melalui feature Chat. Cari kos bersadarkan fasilitas sesuai preferensi kamu.',
      description: 'Cari dan Chat',
      variant: 'default' as const,
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <Container>
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Kenapa Pilih Mokos?
          </h2>
          <p className="text-gray-600 text-base">
            Semua kos terverifikasi, proses cepat, harga transparan, dan layanan yang bikin kamu nyaman dari awal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:row-span-2">
            <div className="relative rounded-3xl overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02] h-full">
              <div className="relative h-full min-h-[500px] md:min-h-[600px]">
                <Image
                  src="/images/feature-2.png"
                  alt="Sewa Langsung via Mokos"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                <div className="absolute top-6 left-6">
                  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-white text-gray-900">
                    SEWA
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    Sewa Langsung via Mokos
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-white/90">
                    Bisa langsung menghubungi sewa kos di aplikasi atau website Mokos. Kamu bisa sewa dari 3 bulan sebelum masuk kosan tanpa takut kedudulan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[rgb(var(--primary))] rounded-3xl overflow-hidden p-8 md:p-10 flex flex-col justify-center text-white hover:scale-[1.02] transition-transform cursor-pointer min-h-[280px]">
              <span className="text-xs font-bold uppercase tracking-wider mb-4 opacity-90">
                PROPERTY
              </span>
              <h3 className="text-6xl md:text-7xl font-bold mb-4 leading-none">
                500<span className="text-5xl">+</span>
              </h3>
              <p className="text-base leading-relaxed">
                Tersedia 500 lebih kos dan apartemen di berbagai wilayah
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative rounded-3xl overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02] bg-gray-900 min-h-[280px]">
                <div className="relative h-[160px]">
                  <Image
                    src="/images/feature-2.png"
                    alt="Pembayaran via Mokos"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6 text-white">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-white/20 mb-3">
                    TRUSTED PAYMENT
                  </span>
                  <h3 className="text-base font-bold leading-tight">
                    Pembayaran via Mokos Antri Ribet dan Banyak Promo Menarik.
                  </h3>
                </div>
              </div>

              <div className="relative rounded-3xl overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02] bg-gray-50 min-h-[280px] flex flex-col">
                <div className="p-6 flex-1">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-white text-gray-900 mb-3">
                    FEATURES
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight mb-auto">
                    Terhubung langsung dengan pemilik melalui feature Chat. Cari kos bersadarkan fasilitas sesuai preferensi kamu.
                  </h3>
                </div>

                <div className="px-6 pb-6">
                  <Button variant="outline" size="sm" className="w-full">
                    Cari dan Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
                
      </Container>
    </section>
  );
}
