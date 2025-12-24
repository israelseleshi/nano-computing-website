import React from 'react';
import { AboutHeroSection } from './sections/AboutHeroSection';
import { AboutFounderSection } from './sections/AboutFounderSection';
import { ValuesSection } from './sections/ValuesSection';
import { TeamSection } from './sections/TeamSection';
import { ClientLogosSection } from './sections/ClientLogosSection';

interface AboutPageProps {
  onPageChange: (page: string) => void;
}

export function AboutPage({ onPageChange }: AboutPageProps) {
  return (
    <div className="min-h-screen pt-20">
      <AboutHeroSection onPageChange={onPageChange} />
      <AboutFounderSection onPageChange={onPageChange} />
      <ValuesSection />
      <TeamSection />
      <ClientLogosSection />
    </div>
  );
}
