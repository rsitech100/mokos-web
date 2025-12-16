'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';

const helpCategories = [
  {
    id: 'pencari',
    title: 'Untuk Pencari Kos',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    questions: [
      {
        q: 'Bagaimana cara mencari kos di MOKOS?',
        a: 'Anda dapat menggunakan fitur pencarian di halaman utama dengan memasukkan nama kota, lokasi, atau kriteria kos yang Anda inginkan. Gunakan filter untuk menyesuaikan hasil pencarian dengan budget dan fasilitas yang Anda butuhkan.',
      },
      {
        q: 'Apakah saya bisa booking kos secara online?',
        a: 'Ya! Anda dapat melakukan booking kos langsung melalui platform MOKOS. Setelah memilih kamar, klik tombol "Ajukan Sewa", pilih durasi sewa, dan lakukan pembayaran. Konfirmasi booking akan dikirim ke email Anda.',
      },
      {
        q: 'Bagaimana cara membatalkan booking?',
        a: 'Anda dapat membatalkan booking melalui halaman "Riwayat Booking". Pilih booking yang ingin dibatalkan dan klik tombol "Batalkan Booking". Kebijakan pembatalan dan refund akan mengikuti syarat dan ketentuan yang berlaku.',
      },
      {
        q: 'Apakah ada biaya tambahan selain harga sewa?',
        a: 'Harga yang tertera sudah termasuk biaya sewa bulanan. Beberapa kos mungkin memerlukan biaya deposit yang akan dikembalikan saat masa sewa berakhir. Detail biaya akan dijelaskan pada saat proses booking.',
      },
    ],
  },
  {
    id: 'pemilik',
    title: 'Untuk Pemilik Kos',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    questions: [
      {
        q: 'Bagaimana cara mendaftarkan kos saya?',
        a: 'Untuk mendaftarkan kos, silakan hubungi tim kami melalui email di info@mokos.com atau WhatsApp di +62 812-3456-7890. Tim kami akan membantu proses pendaftaran dan verifikasi properti Anda.',
      },
      {
        q: 'Berapa biaya untuk memasarkan kos di MOKOS?',
        a: 'Kami menawarkan berbagai paket promosi yang dapat disesuaikan dengan kebutuhan Anda. Hubungi tim sales kami untuk informasi detail mengenai biaya dan benefit yang didapatkan.',
      },
      {
        q: 'Bagaimana sistem pembayaran untuk pemilik kos?',
        a: 'Pembayaran dari penyewa akan ditransfer ke rekening Anda sesuai jadwal yang telah disepakati. Kami menyediakan dashboard untuk memantau semua transaksi dan booking yang masuk.',
      },
    ],
  },
  {
    id: 'pembayaran',
    title: 'Pembayaran',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    questions: [
      {
        q: 'Metode pembayaran apa saja yang tersedia?',
        a: 'Kami menerima pembayaran melalui transfer bank, e-wallet (GoPay, OVO, Dana, ShopeePay), virtual account, dan kartu kredit/debit. Pilih metode yang paling nyaman untuk Anda.',
      },
      {
        q: 'Apakah pembayaran di MOKOS aman?',
        a: 'Ya, sangat aman! Kami menggunakan sistem pembayaran yang terenkripsi dan bekerja sama dengan payment gateway terpercaya. Data pembayaran Anda dilindungi dengan standar keamanan internasional.',
      },
      {
        q: 'Bagaimana jika pembayaran saya gagal?',
        a: 'Jika pembayaran gagal, Anda akan menerima notifikasi dan dapat mencoba kembali. Pastikan saldo atau limit kartu Anda mencukupi. Jika masalah berlanjut, hubungi customer service kami untuk bantuan.',
      },
    ],
  },
  {
    id: 'akun',
    title: 'Akun & Profil',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    questions: [
      {
        q: 'Bagaimana cara membuat akun di MOKOS?',
        a: 'Klik tombol "Daftar" di pojok kanan atas, isi data diri Anda (nama, email, nomor telepon), dan buat password. Verifikasi email Anda dan akun siap digunakan!',
      },
      {
        q: 'Saya lupa password, bagaimana cara mengatasinya?',
        a: 'Klik "Lupa Password" di halaman login, masukkan email Anda, dan kami akan mengirimkan link untuk reset password. Ikuti instruksi di email untuk membuat password baru.',
      },
      {
        q: 'Bagaimana cara mengubah data profil?',
        a: 'Login ke akun Anda, klik icon profil di pojok kanan atas, pilih "Edit Profil". Anda dapat mengubah nama, foto profil, nomor telepon, dan informasi lainnya di halaman tersebut.',
      },
    ],
  },
];

const contactMethods = [
  {
    title: 'Email',
    value: 'info@mokos.com',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    link: 'mailto:info@mokos.com',
  },
  {
    title: 'WhatsApp',
    value: '+62 812-3456-7890',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
    link: 'https://wa.me/6281234567890',
  },
  {
    title: 'Telepon',
    value: '(021) 1234-5678',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    link: 'tel:+622112345678',
  },
];

export function BantuanContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white -mt-24 md:-mt-24 pt-36 md:pt-36 pb-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Pusat Bantuan MOKOS
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              Temukan jawaban untuk pertanyaan Anda atau hubungi tim kami untuk bantuan lebih lanjut
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12">
          {/* FAQ Categories */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Pertanyaan yang Sering Diajukan
            </h2>

            <div className="space-y-8">
              {helpCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                        {category.icon}
                      </div>
                      <h3 className="text-2xl font-bold">{category.title}</h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {category.questions.map((item, qIdx) => (
                      <div
                        key={qIdx}
                        className="border-l-4 border-blue-500 bg-blue-50 rounded-r-xl p-5"
                      >
                        <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            Q
                          </span>
                          {item.q}
                        </h4>
                        <p className="text-gray-700 leading-relaxed pl-9">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Masih Butuh Bantuan?
                </h2>
                <p className="text-lg text-blue-100">
                  Tim customer service kami siap membantu Anda 24/7
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactMethods.map((method) => (
                  <a
                    key={method.title}
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : undefined}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        {method.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{method.title}</h3>
                        <p className="text-blue-100 text-sm">{method.value}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-10 text-center">
                <p className="text-blue-100 mb-4">Jam operasional: Senin - Minggu, 24 Jam</p>
                <Link
                  href="/tentang-kami"
                  className="inline-flex items-center gap-2 text-white hover:text-blue-100 transition-colors"
                >
                  <span>Pelajari lebih lanjut tentang MOKOS</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
