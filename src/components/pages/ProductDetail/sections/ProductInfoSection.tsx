import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, Truck, Shield, Package, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/components/pages/Shop/types';

interface ProductInfoSectionProps {
  product: Product;
  hoveredStar: number;
  setHoveredStar: (rating: number) => void;
  selectedRating: number;
  setSelectedRating: (rating: number) => void;
  isWishlisted: boolean;
  setIsWishlisted: (value: boolean) => void;
}

export const ProductInfoSection = ({
  product,
  hoveredStar,
  setHoveredStar,
  selectedRating,
  setSelectedRating,
  isWishlisted,
  setIsWishlisted,
}: ProductInfoSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-h2 font-bold mb-4">{product.name}</h1>

        {/* Animated Rating and Reviews */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setHoveredStar(i + 1)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setSelectedRating(i + 1)}
                className="transition-all duration-200"
              >
                <Star
                  className={`w-5 h-5 transition-all duration-200 ${
                    i < Math.floor(product.rating) || i < hoveredStar || i < selectedRating
                      ? 'text-yellow-400 fill-current drop-shadow-sm'
                      : 'text-gray-300 hover:text-yellow-200'
                  }`}
                />
              </motion.button>
            ))}
          </div>
          <button
            onClick={() => {
              // Scroll to reviews section
              const reviewsSection = document.getElementById('reviews-section');
              reviewsSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="ml-2 text-body text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline"
          >
            {product.rating} ({product.reviews} reviews)
          </button>
        </div>

        {/* Quick Specs Section */}
        {product.quickSpecs && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl border border-primary/20"
          >
            <h3 className="text-h5 font-semibold mb-3 text-primary">Quick Specs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(product.quickSpecs).map(([key, spec]) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={key}
                    className="flex items-center gap-2 p-2 bg-background/50 rounded-lg"
                  >
                    <div className="p-1.5 bg-primary/10 rounded-full">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted-foreground">{key}</p>
                      <p className="text-sm font-semibold truncate">{spec.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Price */}
        <div className="mb-6">
          {product.originalPrice && (
            <span className="text-body text-muted-foreground line-through mr-3">
              {product.originalPrice}
            </span>
          )}
          <span className="text-h3 font-bold text-primary">{product.price}</span>
        </div>

        {/* Description */}
        <p className="text-body text-muted-foreground mb-6">
          {product.detailedDescription || product.description}
        </p>

        {/* Key Features */}
        <div className="mb-6">
          <h3 className="text-h4 font-semibold mb-3">Key Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-body-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info with Enhanced Availability */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 mb-6 py-4 border-t border-b border-border/20">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-body-sm font-medium">Shipping</p>
              <p className="text-caption text-muted-foreground">{product.shippingTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-body-sm font-medium">Warranty</p>
              <p className="text-caption text-muted-foreground">{product.warranty}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-body-sm font-medium">Availability</p>
              <div className="flex items-center gap-1.5">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className={`w-2 h-2 rounded-full ${
                    product.inStock
                      ? 'bg-green-500 shadow-lg shadow-green-500/50'
                      : 'bg-red-500 shadow-lg shadow-red-500/50'
                  }`}
                />
                <p
                  className={`text-caption font-medium ${
                    product.inStock ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.div className="flex-1" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 border-0"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`border-2 transition-all duration-300 ${
                isWishlisted
                  ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100 dark:bg-red-950/20 dark:border-red-800 dark:text-red-400'
                  : 'border-muted-foreground/20 hover:border-red-200 hover:text-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/10'
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isWishlisted ? 'filled' : 'empty'}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center"
                >
                  <Heart
                    className={`w-5 h-5 mr-2 transition-all duration-200 ${
                      isWishlisted ? 'fill-current' : ''
                    }`}
                  />
                  {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
                </motion.div>
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
