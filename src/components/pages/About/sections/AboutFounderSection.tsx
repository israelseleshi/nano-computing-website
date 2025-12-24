import React from 'react';
import { ArrowRight } from 'lucide-react';
import OptimizedImage from '@/utils/OptimizedImage';
import { Button } from '@/components/ui/button';

interface AboutFounderSectionProps {
  onPageChange: (page: string) => void;
}

export const AboutFounderSection = ({ onPageChange }: AboutFounderSectionProps) => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Mobile Layout */}
          <div className="lg:hidden text-center space-y-6">
            <div className="relative flex justify-center">
              <div className="relative w-[60%] max-w-[200px] aspect-[3/4]">
                <OptimizedImage
                  src="/dave-pic.png"
                  alt="Dawit Seleshi, Founder and General Manager"
                  className="w-full h-full object-cover rounded-b-[2rem] shadow-lg"
                />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">Dawit Seleshi</h3>
              <p className="text-base text-primary font-medium">Founder & General Manager</p>
            </div>
            <div className="px-4">
              <p className="text-sm text-muted-foreground leading-relaxed text-center">
                "We founded Nano Computing on a simple, yet powerful principle: to transform complex
                technological challenges into elegant, seamless solutions. Our mission is to be more
                than just a service provider; we are your strategic partner in navigating the
                digital frontier, ensuring that your technology infrastructure is not just a
                utility, but a catalyst for growth and innovation."
              </p>
            </div>
            <div className="pt-4">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => onPageChange('services')}
              >
                Explore Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block relative flex justify-center">
            <div className="relative w-[300px] h-[380px] lg:w-[350px] lg:h-[440px]">
              <OptimizedImage
                src="/dave-pic.png"
                alt="Dawit Seleshi, Founder and General Manager"
                className="w-full h-full object-cover rounded-b-[3rem]"
              />
            </div>
          </div>
          <div className="hidden lg:block space-y-8">
            <div className="space-y-4">
              <h2 className="text-h2 font-bold tracking-tight">A Message from the Founder</h2>
              <p className="text-body-lg text-muted-foreground leading-snug">
                "We founded Nano Computing on a simple, yet powerful principle: to transform complex
                technological challenges into elegant, seamless solutions. Our mission is to be more
                than just a service provider; we are your strategic partner in navigating the
                digital frontier, ensuring that your technology infrastructure is not just a
                utility, but a catalyst for growth and innovation."
              </p>
            </div>
            <div>
              <p className="text-h4 font-semibold text-foreground">Dawit Seleshi</p>
              <p className="text-body text-primary">Founder & General Manager</p>
            </div>
            <div className="mt-6">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => onPageChange('services')}
              >
                Explore Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
