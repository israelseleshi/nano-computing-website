import React from 'react';
import { motion } from 'framer-motion';

export const PartnersSection = () => {
  const partners = [
    { src: '/partner-logos/apple-logo.png', name: 'Apple' },
    { src: '/partner-logos/cisco-logo.png', name: 'Cisco' },
    { src: '/partner-logos/dahua-tech-logo.png', name: 'Dahua Technology' },
    { src: '/partner-logos/hik-vision-logo.png', name: 'Hikvision' },
    { src: '/partner-logos/hp-logo.png', name: 'HP' },
    { src: '/partner-logos/intel-logo.png', name: 'Intel' },
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
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
            {partners.map((partner, index) => {
              const isAppleOrDahua =
                partner.src.includes('apple-logo') || partner.src.includes('dahua-tech-logo');
              return (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center p-4 group"
                  style={{ minWidth: '120px' }}
                >
                  <img
                    src={partner.src}
                    alt={`${partner.name} Logo`}
                    className={`h-8 w-auto object-contain opacity-70 transition-all duration-300 drop-shadow-md dark:drop-shadow-[0_4px_8px_rgba(59,130,246,0.3)] ${
                      isAppleOrDahua ? 'dark:brightness-0 dark:invert' : ''
                    }`}
                  />
                </div>
              );
            })}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => {
              const isAppleOrDahua =
                partner.src.includes('apple-logo') || partner.src.includes('dahua-tech-logo');
              return (
                <div
                  key={`duplicate-${index}`}
                  className="flex-shrink-0 flex items-center justify-center p-4 group"
                  style={{ minWidth: '120px' }}
                >
                  <img
                    src={partner.src}
                    alt={`${partner.name} Logo`}
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
