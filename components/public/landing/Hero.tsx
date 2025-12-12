'use client';

import React from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export function Hero() {
  const facilities = [
    { icon: '🚇', label: 'Dekat MRT', emoji: '🚇' },
    { icon: '🚆', label: 'Dekat KRL', emoji: '🚆' },
    { icon: '🐕', label: 'Pet Friendly', emoji: '🐕' },
    { icon: '👥', label: 'Pasuin', emoji: '👥' },
    { icon: '🏢', label: 'Bangunan Baru', emoji: '🏢' },
    { icon: '🏕️', label: 'Kos Campur', emoji: '🏕️' },
    { icon: '♿', label: 'Ramah Disabilitas', emoji: '♿' },
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

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              Pilihan Kos Terlengkap untuk Setiap Kebutuhan
            </h1>

            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              Jelajahi kos dan properti terbaik di banyak lokasi. Proses cepat,
              pilihan lengkap, dan pengalaman pencarian yang lebih praktis.
            </p>

            <div className="mt-6">
              <div className="flex items-center w-full max-w-2xl bg-white rounded-xl border border-gray-200 overflow-hidden">
                <label className="sr-only">Cari lokasi</label>
                <input
                  type="text"
                  placeholder="Masukkan nama lokasi / area / alamat"
                  className="flex-1 px-6 py-3.5 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent border-none focus:outline-none focus:ring-0"
                />
                <Button
                  variant="primary"
                  size="md"
                  className="rounded-xl m-1 px-10 shadow-none"
                >
                  Cari
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-md font-medium text-gray-700 mb-3">Fasilitas</p>
              <div className="flex flex-wrap gap-2">
                {facilities.map((facility, index) => (
                  <button
                    key={index}
                    className="inline-flex items-center gap-1.5 px-2 py-2 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:border-primary hover:bg-blue-50 transition-all shadow-sm"
                  >
                    <span>{facility.emoji}</span>
                    <span>{facility.label}</span>
                  </button>
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
