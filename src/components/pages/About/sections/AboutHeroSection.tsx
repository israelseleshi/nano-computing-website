import { motion } from 'framer-motion';

export const AboutHeroSection = () => {
  return (
    <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden min-h-[40vh] flex items-center">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20 light:from-white/60 light:via-white/20 light:to-white/40" />

      {/* Content with enhanced visibility */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="space-y-6">
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-black drop-shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                About Us
              </motion.h1>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
