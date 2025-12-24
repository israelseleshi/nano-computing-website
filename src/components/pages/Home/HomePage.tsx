import React, { memo } from 'react';
import { HeroSection } from './sections/HeroSection';
import { ServicesCarouselSection } from './sections/ServicesCarouselSection';
import { FeaturedProductsSection } from './sections/FeaturedProductsSection';
import { FounderMessageSection } from './sections/FounderMessageSection';
import { PartnersSection } from './sections/PartnersSection';
import { CTASection } from './sections/CTASection';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export const HomePage = memo(({ onPageChange }: HomePageProps): React.JSX.Element => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesCarouselSection />
      <FeaturedProductsSection onPageChange={onPageChange} />
      <FounderMessageSection />
      <PartnersSection />
      <CTASection onPageChange={onPageChange} />
    </div>
  );
});
