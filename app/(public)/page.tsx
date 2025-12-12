import { Hero } from '@/components/public/landing/Hero';
import { Recommendations } from '@/components/public/landing/Recommendations';
import { PopularAreas } from '@/components/public/landing/PopularAreas';
import { KosReady } from '@/components/public/landing/KosReady';
import { Network } from '@/components/public/landing/Network';
import { WhyChoose } from '@/components/public/landing/WhyChoose';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Recommendations />
      <PopularAreas />
      <KosReady />
      <Network />
      <WhyChoose />
    </>
  );
}
