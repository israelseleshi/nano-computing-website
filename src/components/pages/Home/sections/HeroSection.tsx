import React from 'react';
import { motion } from 'framer-motion';
import { TypewriterText } from '@/components/utils/TypewriterText';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col pt-16">
      <div className="absolute top-16 left-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/nano-tech-office-display.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 z-10"></div>
      </div>

      <div className="relative z-20 flex-grow flex items-center">
        <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="w-full md:w-2/3 lg:w-1/2 flex justify-start">
            <motion.div
              className="md:hidden mx-4 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <TypewriterText
                texts={['Your Integrated Safety Partner']}
                className="text-h2 font-bold tracking-tight text-white sm:whitespace-nowrap"
              />
              <motion.p
                className="text-body text-white max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                We deliver elite technology consulting to propel your enterprise forward with
                intelligent solutions, uncompromising security, and seamless innovation.
              </motion.p>
            </motion.div>

            <motion.div
              className="hidden md:block space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <TypewriterText
                texts={['Your Integrated Safety Partner']}
                className="text-h2 font-bold tracking-tight text-white whitespace-nowrap"
              />
              <motion.p
                className="text-body text-white max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                We deliver elite technology consulting to propel your enterprise forward with
                intelligent solutions, uncompromising security, and seamless innovation.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
