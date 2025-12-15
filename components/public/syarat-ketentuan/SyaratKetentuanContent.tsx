'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';

const sections = [
  {
    id: 'umum',
    title: '1. Ketentuan Umum',
    content: [
      'Dengan mengakses dan menggunakan platform MOKOS, Anda setuju untuk terikat dengan syarat dan ketentuan yang berlaku.',
      'MOKOS berhak untuk mengubah, memodifikasi, atau menghapus bagian mana pun dari syarat dan ketentuan ini tanpa pemberitahuan sebelumnya.',
      'Pengguna bertanggung jawab untuk memeriksa halaman ini secara berkala untuk mengetahui perubahan yang terjadi.',
      'Dengan melanjutkan penggunaan layanan setelah perubahan dibuat, Anda dianggap menerima perubahan tersebut.',
    ],
  },
  {
    id: 'layanan',
    title: '2. Layanan MOKOS',
    content: [
      'MOKOS menyediakan platform untuk memfasilitasi pencarian dan penyewaan kos antara pemilik properti dan pencari kos.',
      'Kami tidak bertindak sebagai pihak dalam perjanjian sewa antara pemilik dan penyewa.',
      'MOKOS tidak bertanggung jawab atas kualitas, keamanan, legalitas, atau ketersediaan properti yang terdaftar.',
      'Informasi yang ditampilkan di platform merupakan tanggung jawab pemilik properti masing-masing.',
    ],
  },
  {
    id: 'akun',
    title: '3. Akun Pengguna',
    content: [
      'Pengguna harus berusia minimal 17 tahun atau memiliki izin dari orang tua/wali untuk menggunakan layanan.',
      'Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun dan password Anda.',
      'Setiap aktivitas yang terjadi di bawah akun Anda menjadi tanggung jawab Anda sepenuhnya.',
      'Anda setuju untuk segera memberitahu MOKOS jika terjadi penggunaan tidak sah terhadap akun Anda.',
      'MOKOS berhak menangguhkan atau menghapus akun yang melanggar syarat dan ketentuan.',
    ],
  },
  {
    id: 'booking',
    title: '4. Proses Booking dan Pembayaran',
    content: [
      'Booking dianggap sah setelah pembayaran dikonfirmasi dan pengguna menerima email konfirmasi.',
      'Harga yang tertera adalah harga final termasuk pajak yang berlaku, kecuali disebutkan lain.',
      'Pembayaran dilakukan melalui metode yang tersedia di platform (transfer bank, e-wallet, kartu kredit).',
      'MOKOS tidak bertanggung jawab atas kesalahan pembayaran yang disebabkan oleh informasi yang salah dari pengguna.',
      'Konfirmasi booking akan dikirimkan melalui email dan dapat diakses di dashboard pengguna.',
    ],
  },
  {
    id: 'pembatalan',
    title: '5. Kebijakan Pembatalan dan Refund',
    content: [
      'Pembatalan booking dapat dilakukan melalui dashboard pengguna dengan mengikuti prosedur yang berlaku.',
      'Kebijakan refund bergantung pada waktu pembatalan dan kebijakan masing-masing pemilik properti.',
      'Pembatalan 7 hari atau lebih sebelum check-in: Refund 80% dari total pembayaran.',
      'Pembatalan 3-6 hari sebelum check-in: Refund 50% dari total pembayaran.',
      'Pembatalan kurang dari 3 hari atau no-show: Tidak ada refund.',
      'Proses refund akan diproses dalam 7-14 hari kerja setelah permohonan pembatalan disetujui.',
    ],
  },
  {
    id: 'tanggung-jawab',
    title: '6. Batasan Tanggung Jawab',
    content: [
      'MOKOS tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan platform.',
      'Kami tidak menjamin keakuratan, kelengkapan, atau keandalan informasi yang tersedia di platform.',
      'Pengguna menggunakan platform dengan risiko sendiri dan bertanggung jawab penuh atas keputusan yang diambil.',
      'MOKOS tidak bertanggung jawab atas sengketa antara pemilik properti dan penyewa.',
      'Kami tidak bertanggung jawab atas kehilangan, kerusakan, atau pencurian properti pribadi selama masa sewa.',
    ],
  },
  {
    id: 'privasi',
    title: '7. Privasi dan Data Pribadi',
    content: [
      'MOKOS berkomitmen untuk melindungi privasi pengguna sesuai dengan Kebijakan Privasi kami.',
      'Data pribadi yang dikumpulkan akan digunakan untuk keperluan operasional platform dan peningkatan layanan.',
      'Kami tidak akan menjual atau membagikan data pribadi Anda kepada pihak ketiga tanpa persetujuan Anda.',
      'Pengguna memiliki hak untuk mengakses, mengubah, atau menghapus data pribadi mereka.',
      'Untuk informasi lebih lanjut, silakan baca Kebijakan Privasi kami.',
    ],
  },
  {
    id: 'hak-cipta',
    title: '8. Hak Kekayaan Intelektual',
    content: [
      'Semua konten di platform MOKOS, termasuk teks, grafik, logo, gambar, dan software, dilindungi oleh hak cipta.',
      'Pengguna tidak diizinkan untuk menyalin, memodifikasi, atau mendistribusikan konten tanpa izin tertulis.',
      'Nama dan logo MOKOS adalah merek dagang terdaftar yang dilindungi oleh hukum.',
      'Pelanggaran terhadap hak kekayaan intelektual dapat mengakibatkan tindakan hukum.',
    ],
  },
  {
    id: 'konten',
    title: '9. Konten Pengguna',
    content: [
      'Pengguna bertanggung jawab penuh atas konten yang mereka unggah atau posting di platform.',
      'Dengan mengunggah konten, pengguna memberikan lisensi kepada MOKOS untuk menggunakan, menampilkan, dan mendistribusikan konten tersebut.',
      'Konten yang melanggar hukum, cabul, menyinggung, atau tidak pantas akan segera dihapus.',
      'MOKOS berhak untuk menghapus atau memodifikasi konten pengguna tanpa pemberitahuan.',
      'Pengguna tidak boleh mengunggah konten yang melanggar hak cipta atau hak kekayaan intelektual pihak lain.',
    ],
  },
  {
    id: 'hukum',
    title: '10. Hukum yang Berlaku',
    content: [
      'Syarat dan ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Negara Republik Indonesia.',
      'Setiap sengketa yang timbul akan diselesaikan melalui musyawarah terlebih dahulu.',
      'Jika musyawarah tidak mencapai kesepakatan, sengketa akan diselesaikan di Pengadilan Negeri Jakarta Selatan.',
      'Jika ada ketentuan yang tidak sah atau tidak dapat dilaksanakan, ketentuan lainnya tetap berlaku.',
    ],
  },
  {
    id: 'kontak',
    title: '11. Hubungi Kami',
    content: [
      'Jika Anda memiliki pertanyaan atau kekhawatiran terkait syarat dan ketentuan ini, silakan hubungi kami:',
      'Email: legal@mokos.com',
      'WhatsApp: +62 812-3456-7890',
      'Alamat: Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta 12190',
    ],
  },
];

export function SyaratKetentuanContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Syarat dan Ketentuan
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              Harap baca syarat dan ketentuan ini dengan seksama sebelum menggunakan layanan MOKOS
            </p>
            <p className="text-sm text-blue-200 mt-4">
              Terakhir diperbarui: 15 Desember 2025
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="9" x2="20" y2="9" />
                <line x1="4" y1="15" x2="20" y2="15" />
                <line x1="10" y1="3" x2="8" y2="21" />
                <line x1="16" y1="3" x2="14" y2="21" />
              </svg>
              Navigasi Cepat
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden scroll-mt-8"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4">
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {section.content.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                          {itemIdx + 1}
                        </span>
                        <p className="text-gray-700 leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Penerimaan Syarat dan Ketentuan</h3>
                <p className="text-blue-100 leading-relaxed">
                  Dengan menggunakan platform MOKOS, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui
                  untuk terikat dengan syarat dan ketentuan yang tercantum di atas. Jika Anda tidak setuju dengan
                  ketentuan ini, mohon untuk tidak menggunakan layanan kami.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/kebijakan-privasi"
              className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    Kebijakan Privasi
                  </h3>
                  <p className="text-sm text-gray-600">Pelajari bagaimana kami melindungi data Anda</p>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link
              href="/bantuan"
              className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                    Pusat Bantuan
                  </h3>
                  <p className="text-sm text-gray-600">Butuh bantuan? Hubungi tim kami</p>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
