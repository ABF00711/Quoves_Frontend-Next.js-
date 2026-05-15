import HeroSection from '@/components/sections/HeroSection';
import FacialAnalysis from '@/components/sections/FacialAnalysis';
import FAQ from '@/components/sections/FAQ';
import Philosophy from '@/components/sections/Philosophy';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FacialAnalysis />
      <FAQ />
      <Philosophy />
    </main>
  );
}
