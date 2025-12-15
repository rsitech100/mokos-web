'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';

const stats = [
  { label: 'Kos Terdaftar', value: '10.000+', icon: '🏠' },
  { label: 'Kota di Indonesia', value: '50+', icon: '🌆' },
  { label: 'Pengguna Aktif', value: '100.000+', icon: '👥' },
  { label: 'Transaksi Sukses', value: '50.000+', icon: '✅' },
];

const values = [
  {
    title: 'Transparansi',
    description: 'Kami berkomitmen untuk memberikan informasi yang jelas dan transparan tentang setiap properti kos yang terdaftar di platform kami.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
  },
  {
    title: 'Kepercayaan',
    description: 'Membangun kepercayaan antara pencari kos dan pemilik properti melalui verifikasi dan sistem review yang terpercaya.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Kemudahan',
    description: 'Platform yang user-friendly dengan fitur pencarian canggih untuk memudahkan Anda menemukan kos impian.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: 'Inovasi',
    description: 'Terus berinovasi dalam teknologi untuk memberikan pengalaman terbaik dalam mencari dan mengelola kos.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6m5.5-14.5l-4.2 4.2m0 6.6l4.2 4.2M1 12h6m6 0h6M5.5 5.5l4.2 4.2m0 6.6l-4.2 4.2" />
      </svg>
    ),
  },
];

const team = [
  {
    name: 'Lorem Ipsum1',
    role: 'CEO & Founder',
    image: '/images/team/ceo.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
  {
    name: 'Lorem Ipsum2',
    role: 'CTO',
    image: '/images/team/cto.jpg',
    bio: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
  },
  {
    name: 'Lorem Ipsum3',
    role: 'Head of Operations',
    image: '/images/team/operations.jpg',
    bio: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.',
  },
  {
    name: 'Lorem Ipsum4',
    role: 'Head of Customer Success',
    image: '/images/team/customer.jpg',
    bio: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro.',
  },
];

const milestones = [
  { year: '2020', event: 'MOKOS didirikan dengan visi membuat pencarian kos lebih mudah' },
  { year: '2021', event: 'Mencapai 1.000 properti kos terdaftar di 10 kota' },
  { year: '2022', event: 'Meluncurkan fitur booking online dan pembayaran digital' },
  { year: '2023', event: 'Ekspansi ke 30 kota dan 5.000+ properti kos' },
  { year: '2024', event: 'Mencapai 50.000 transaksi sukses dan 100.000+ pengguna' },
  { year: '2025', event: 'Hadir di 50+ kota dengan 10.000+ properti kos terdaftar' },
];

export function TentangKamiContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white -mt-24 md:-mt-24 pt-36 md:pt-36 pb-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tentang MOKOS
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Platform terpercaya untuk menemukan dan menyewakan kos di seluruh Indonesia.
              Kami menghubungkan pencari kos dengan properti terbaik dengan cara yang mudah dan aman.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-20">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">Misi Kami</h2>
                  </div>
                  <p className="text-lg text-blue-100 leading-relaxed">
                    Menjadi platform nomor satu di Indonesia yang memudahkan siapa saja dalam mencari dan menyewakan
                    kos dengan cara yang transparan, aman, dan efisien. Kami percaya bahwa setiap orang berhak
                    mendapatkan tempat tinggal yang nyaman dengan proses yang mudah.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
                      </svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">Visi Kami</h2>
                  </div>
                  <p className="text-lg text-blue-100 leading-relaxed">
                    Membangun ekosistem digital yang menghubungkan jutaan pencari kos dengan ribuan pemilik properti
                    di seluruh Indonesia, menciptakan pengalaman terbaik bagi kedua belah pihak.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Prinsip yang menjadi fondasi dalam setiap langkah kami
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl flex items-center justify-center">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Perjalanan Kami</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Dari startup hingga menjadi platform terpercaya di Indonesia
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
              <div className="space-y-12">
                {milestones.map((milestone, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-8 ${
                      idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div className={`flex-1 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 inline-block max-w-md">
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                          {milestone.year}
                        </div>
                        <p className="text-gray-700">{milestone.event}</p>
                      </div>
                    </div>
                    <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {idx + 1}
                    </div>
                    <div className="flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Tim Kami</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Orang-orang hebat di balik kesuksesan MOKOS
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bergabunglah dengan MOKOS
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Mulai pencarian kos Anda sekarang atau daftarkan properti Anda untuk menjangkau ribuan pencari kos
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
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
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
