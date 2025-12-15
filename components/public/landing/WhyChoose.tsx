import { Container } from '@/components/layout/Container';
import Image from 'next/image';

export function WhyChoose() {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative rounded-3xl overflow-hidden h-[320px] md:h-[340px] md:col-span-2">
            <Image
              src="/images/feature-2.png"
              alt="Sewa Langsung via Mokos"
              fill
              className="object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
            
            <div className="absolute top-5 left-5 md:top-6 md:left-6">
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wide text-white/80">
                BENEFIT
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Sewa Langsung via Mokos
              </h3>
              <p className="text-xs md:text-sm leading-relaxed text-white/90">
                Bisa langsung mengajukan sewa kos di aplikasi atau website Mokos. Kamu bisa sewa dari 3 bulan sebelum masuk kosan tanpa takut keduluan.
              </p>
            </div>
          </div>

          <div className="relative bg-[#4285F4] rounded-3xl overflow-hidden text-white h-[320px] md:h-[340px]">
            <div className="absolute top-5 left-5 md:top-6 md:left-6">
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wide text-white/80">
                PROPERTY
              </span>
            </div>
            
            <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
              <h3 className="text-6xl md:text-7xl font-bold mb-2 md:mb-3 leading-none mt-4 md:mt-6">
                500<span className="text-4xl md:text-5xl align-bottom">+</span>
              </h3>
              <p className="text-sm md:text-base leading-relaxed">
                Tersedia 500 lebih kos dan apartemen di berbagai wilayah
              </p>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden bg-[#1a1a1a] flex flex-col h-[320px] md:h-[340px]">
            <div className="p-5 md:p-6 pb-3 md:pb-4">
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3 md:mb-4 block">
                TRUSTED PAYMENT
              </span>
              <h3 className="text-lg md:text-xl font-bold leading-tight text-white">
                Pembayaran via Mokos Antri Ribet dan Banyak Promo Menarik.
              </h3>
            </div>
            <div className="mx-6 relative h-[190px] md:h-[190px]">
              <Image
                src="/images/feature-2.png"
                alt="Pembayaran via Mokos"
                fill
                className="object-cover object-center rounded-xl"
              />
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden bg-[#f5f5f5] flex flex-col p-5 md:p-6 justify-between h-[320px] md:h-[340px] md:col-span-2">
            <div>
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wide text-gray-500 mb-4 md:mb-5 block">
                FEATURES
              </span>
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
                Terhubung langsung dengan pemilik melalui feature Chat. Cari kos bersadarkan fasilitas sesuai preferensi kamu.
              </h3>
            </div>

            <div>
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Cari dan Chat
              </span>
            </div>
          </div>
        </div>
                
      </Container>
    </section>
  );
}
