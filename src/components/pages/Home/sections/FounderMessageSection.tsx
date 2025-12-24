import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from '@/utils/OptimizedImage';

export const FounderMessageSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <motion.div
            className="lg:col-span-2 flex justify-center lg:justify-start"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="relative w-full max-w-[350px] md:w-[300px] md:max-w-none lg:w-[350px]">
              <OptimizedImage
                src="/dave-pic.png"
                alt="Dawit Seleshi, Founder and General Manager"
                className="w-full aspect-[3/4] object-cover rounded-b-[3rem] shadow-2xl shadow-primary/20"
              />
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="space-y-8 text-center lg:text-left px-4 lg:px-0">
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                "Welcome to Nano Computing ICT Solutions, where our passion for technology and
                commitment to excellence converge to create unparalleled value for our clients."
              </motion.p>

              <motion.p
                className="text-base text-gray-600 dark:text-gray-300 leading-relaxed md:block hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                "Since our inception, we have been driven by a singular vision: to be your most
                trusted partner in navigating the complexities of the digital world."
              </motion.p>

              <motion.p
                className="text-base text-gray-600 dark:text-gray-300 leading-relaxed md:block hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
              >
                "Our journey is one of relentless innovation, integrity, and a deep-seated belief in
                the power of technology to transform businesses. We are more than just a service
                provider; we are your strategic ally."
              </motion.p>

              {/* Mobile version with only 2 paragraphs */}
              <motion.p
                className="text-base text-gray-600 dark:text-gray-300 leading-relaxed md:hidden block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                "Since our inception, we have been driven by a singular vision: to be your most
                trusted partner in navigating the complexities of the digital world."
              </motion.p>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-foreground">Dawit Seleshi</p>
                <p className="text-base sm:text-lg text-primary font-medium">
                  Founder & General Manager
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
