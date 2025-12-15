'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';

const cities = [
  {
    name: 'Jakarta',
    region: 'DKI Jakarta',
    count: 1250,
    image: '/images/cities/jakarta.jpg',
    popular: true,
  },
  {
    name: 'Bandung',
    region: 'Jawa Barat',
    count: 850,
    image: '/images/cities/bandung.jpg',
    popular: true,
  },
  {
    name: 'Surabaya',
    region: 'Jawa Timur',
    count: 720,
    image: '/images/cities/surabaya.jpg',
    popular: true,
  },
  {
    name: 'Yogyakarta',
    region: 'DI Yogyakarta',
    count: 680,
    image: '/images/cities/yogyakarta.jpg',
    popular: true,
  },
  {
    name: 'Semarang',
    region: 'Jawa Tengah',
    count: 420,
    image: '/images/cities/semarang.jpg',
    popular: true,
  },
  {
    name: 'Malang',
    region: 'Jawa Timur',
    count: 380,
    image: '/images/cities/malang.jpg',
    popular: true,
  },
  {
    name: 'Medan',
    region: 'Sumatera Utara',
    count: 350,
    image: '/images/cities/medan.jpg',
    popular: false,
  },
  {
    name: 'Denpasar',
    region: 'Bali',
    count: 320,
    image: '/images/cities/denpasar.jpg',
    popular: false,
  },
  {
    name: 'Makassar',
    region: 'Sulawesi Selatan',
    count: 280,
    image: '/images/cities/makassar.jpg',
    popular: false,
  },
  {
    name: 'Palembang',
    region: 'Sumatera Selatan',
    count: 240,
    image: '/images/cities/palembang.jpg',
    popular: false,
  },
  {
    name: 'Depok',
    region: 'Jawa Barat',
    count: 380,
    image: '/images/cities/depok.jpg',
    popular: false,
  },
  {
    name: 'Tangerang',
    region: 'Banten',
    count: 450,
    image: '/images/cities/tangerang.jpg',
    popular: false,
  },
  {
    name: 'Bekasi',
    region: 'Jawa Barat',
    count: 410,
    image: '/images/cities/bekasi.jpg',
    popular: false,
  },
  {
    name: 'Bogor',
    region: 'Jawa Barat',
    count: 290,
    image: '/images/cities/bogor.jpg',
    popular: false,
  },
  {
    name: 'Samarinda',
    region: 'Kalimantan Timur',
    count: 180,
    image: '/images/cities/samarinda.jpg',
    popular: false,
  },
  {
    name: 'Balikpapan',
    region: 'Kalimantan Timur',
    count: 170,
    image: '/images/cities/balikpapan.jpg',
    popular: false,
  },
];

export function KotaContent() {
  const popularCities = cities.filter(city => city.popular);
  const otherCities = cities.filter(city => !city.popular);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Lihat Semua Area Kos Paling Populer
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              Temukan kos terbaik di berbagai kota besar Indonesia dengan harga terjangkau dan fasilitas lengkap
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12">
          {/* Popular Cities */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-900">Kota Populer</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCities.map((city) => (
                <Link
                  key={city.name}
                  href={`/kos?city=${encodeURIComponent(city.name)}`}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-400 to-purple-500 relative">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-white">{city.name}</h3>
                        <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                          Popular
                        </span>
                      </div>
                      <p className="text-blue-100 text-sm mb-2">{city.region}</p>
                      <div className="flex items-center gap-2 text-white">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        <span className="font-semibold">{city.count.toLocaleString('id-ID')} Kos</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Other Cities */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <svg className="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-900">Kota Lainnya</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherCities.map((city) => (
                <Link
                  key={city.name}
                  href={`/kos?city=${encodeURIComponent(city.name)}`}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
                      {city.name.charAt(0)}
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{city.region}</p>
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    <span className="text-sm font-medium">{city.count.toLocaleString('id-ID')} Kos</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tidak Menemukan Kota yang Kamu Cari?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Gunakan pencarian untuk menemukan kos di kota lainnya atau hubungi kami untuk bantuan lebih lanjut
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kos"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                Cari Kos Sekarang
              </Link>
              <Link
                href="/bantuan"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
                </svg>
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
