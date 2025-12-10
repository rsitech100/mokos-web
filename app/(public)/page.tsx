import { Hero } from '@/components/public/Hero';
import { Recommendations } from '@/components/public/Recommendations';
import { PopularAreas } from '@/components/public/PopularAreas';
import { KosReady } from '@/components/public/KosReady';
import { Network } from '@/components/public/Network';
import { WhyChoose } from '@/components/public/WhyChoose';

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
