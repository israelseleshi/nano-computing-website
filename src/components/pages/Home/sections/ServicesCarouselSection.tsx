import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    id: 1,
    title: 'CCTV Security Systems',
    description: 'Advanced surveillance solutions with 24/7 monitoring, HD video quality, and smart motion detection to keep your premises secure.',
    image: '/cctv-camera.png',
  },
  {
    id: 2,
    title: 'Computer Repair Services',
    description: 'Professional hardware and software diagnostics, repairs, and maintenance for all computer systems and peripherals.',
    image: '/computer-repair.png',
  },
  {
    id: 3,
    title: 'Network Design & Installation',
    description: 'Comprehensive network infrastructure planning, installation, and optimization for seamless connectivity.',
    image: '/computer-network.png',
  },
  {
    id: 4,
    title: 'Door Access Control',
    description: 'Modern access control systems with biometric authentication, keyless entry, and centralized management.',
    image: '/door-access-control-systems.png',
  },
  {
    id: 5,
    title: 'Time & Attendance Systems',
    description: 'Automated time tracking solutions with biometric verification and comprehensive reporting capabilities.',
    image: '/time-attendance.png',
  },
];

export const ServicesCarouselSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    skipSnaps: false,
    dragFree: false,
    loop: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className="py-12 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
      
      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Section Header */}
        <motion.div
          className="mb-12"
          variants={itemVariants}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-left">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl text-left">
            Comprehensive technology solutions designed to meet your business needs with excellence and innovation.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          className="relative"
          variants={itemVariants}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex-[0_0_100%] min-w-0 px-4"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[300px]">
                    {/* Image Section */}
                    <div className="order-2 lg:order-1">
                      <div className="relative w-full h-48 sm:h-64 lg:h-72 rounded-2xl overflow-hidden group">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const placeholder = target.nextElementSibling as HTMLElement;
                            if (placeholder) placeholder.style.display = 'flex';
                          }}
                        />
                        {/* Placeholder fallback */}
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10"
                          style={{ display: 'none' }}
                        >
                          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-primary font-bold text-2xl">IMG</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description Section */}
                    <div className="order-1 lg:order-2 space-y-4">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left">{service.title}</h3>
                      
                      <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed text-left">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Moved to right bottom */}
          <div className="absolute right-0 bottom-0 flex items-center space-x-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg p-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10"
              onClick={scrollPrev}
              aria-label="Previous services"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10"
              onClick={scrollNext}
              aria-label="Next services"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Dot Navigation */}
        <motion.div
          className="flex justify-center items-center space-x-2 mt-6"
          variants={itemVariants}
        >
          {scrollSnaps.map((_, dotIndex) => (
            <button
              key={dotIndex}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                selectedIndex === dotIndex
                  ? 'w-8 bg-primary'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
              onClick={() => scrollTo(dotIndex)}
              aria-label={`Go to service ${dotIndex + 1}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
