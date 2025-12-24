import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from '@/utils/OptimizedImage';

export const ClientLogosSection = () => {
  const clientLogos = [
    '/partner-logos/apple-logo.png',
    '/partner-logos/cisco-logo.png',
    '/partner-logos/dahua-tech-logo.png',
    '/partner-logos/hik-vision-logo.png',
    '/partner-logos/hp-logo.png',
    '/partner-logos/intel-logo.png',
  ];

  return (
    <section className="py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative">
          <motion.div
            className="flex space-x-12 items-center"
            animate={{ x: [0, -100 * 6] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            whileHover={{ animationPlayState: 'paused' }}
            style={{ animationPlayState: 'running' }}
          >
            {/* First set of logos */}
            {clientLogos.map((logo, index) => {
              const isAppleOrDahua =
                logo.includes('apple-logo') || logo.includes('dahua-tech-logo');
              return (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center p-4 group"
                  style={{ minWidth: '120px' }}
                >
                  <OptimizedImage
                    src={logo}
                    alt={`Client Logo ${index + 1}`}
                    className={`h-8 w-auto object-contain opacity-70 transition-all duration-300 drop-shadow-md dark:drop-shadow-[0_4px_8px_rgba(59,130,246,0.3)] ${
                      isAppleOrDahua ? 'dark:brightness-0 dark:invert' : ''
                    }`}
                  />
                </div>
              );
            })}
            {/* Duplicate set for seamless loop */}
            {clientLogos.map((logo, index) => {
              const isAppleOrDahua =
                logo.includes('apple-logo') || logo.includes('dahua-tech-logo');
              return (
                <div
                  key={`duplicate-${index}`}
                  className="flex-shrink-0 flex items-center justify-center p-4 group"
                  style={{ minWidth: '120px' }}
                >
                  <OptimizedImage
                    src={logo}
                    alt={`Client Logo ${index + 1}`}
                    className={`h-8 w-auto object-contain opacity-70 transition-all duration-300 drop-shadow-md dark:drop-shadow-[0_4px_8px_rgba(59,130,246,0.3)] ${
                      isAppleOrDahua ? 'dark:brightness-0 dark:invert' : ''
                    }`}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
