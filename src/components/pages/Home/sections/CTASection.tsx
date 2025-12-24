import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParallaxSection } from '@/components/utils/ParallaxSection';

interface CTASectionProps {
  onPageChange: (page: string) => void;
}

export const CTASection = ({ onPageChange }: CTASectionProps) => {
  return (
    <ParallaxSection className="py-16 bg-primary/10">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-h3 font-bold mb-4 tracking-tight">
            Ready to Elevate Your Technology?
          </h2>
          <p className="text-body text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join the ranks of industry leaders who've revolutionized their operations with our
            premium ICT solutions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="default"
                onClick={() => onPageChange('contact')}
                className="px-6 py-3 text-sm bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-900"
              >
                <Zap className="w-4 h-4 mr-2" />
                Start Your Journey
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="default"
                onClick={() => onPageChange('about')}
                className="px-6 py-3 text-sm"
              >
                <Users className="w-4 h-4 mr-2" />
                Learn About Us
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </ParallaxSection>
  );
};
