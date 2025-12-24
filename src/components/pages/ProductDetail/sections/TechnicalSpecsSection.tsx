import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Product } from '@/components/pages/Shop/types';

interface TechnicalSpecsSectionProps {
  product: Product;
}

export const TechnicalSpecsSection = ({ product }: TechnicalSpecsSectionProps) => {
  if (!product.specifications) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-12 lg:mt-16"
    >
      <Card className="p-6 sm:p-8 lg:p-10 shadow-xl border-0 bg-gradient-to-br from-background via-background to-muted/10 dark:from-background dark:via-background dark:to-muted/5">
        <div className="flex items-center mb-8">
          <motion.div
            className="w-1.5 h-10 bg-gradient-to-b from-primary to-primary/60 rounded-full mr-5"
            initial={{ height: 0 }}
            animate={{ height: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <h2 className="text-h3 sm:text-h2 font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
            Technical Specifications
          </h2>
        </div>

        <div className="space-y-0">
          {Object.entries(product.specifications).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-5 px-6 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all duration-300 rounded-xl border-b border-border/10 last:border-b-0">
                <span className="text-body sm:text-body-lg font-semibold text-foreground mb-2 sm:mb-0 min-w-0 sm:min-w-[180px] group-hover:text-primary transition-colors duration-300">
                  {key}
                </span>
                <span className="text-body sm:text-body-lg text-muted-foreground font-medium bg-muted/30 dark:bg-muted/20 px-4 py-2 rounded-lg border border-border/20 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-300 sm:text-right">
                  {value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};
