import React from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import OptimizedImage from '@/utils/OptimizedImage';
import { Product } from '@/components/pages/Shop/types';

interface ProductGallerySectionProps {
  product: Product;
  selectedImageIndex: number;
  setSelectedImageIndex: React.Dispatch<React.SetStateAction<number>>;
  isZoomed: boolean;
  setIsZoomed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProductGallerySection = ({
  product,
  selectedImageIndex,
  setSelectedImageIndex,
  isZoomed,
  setIsZoomed,
}: ProductGallerySectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      {/* Main Image with Zoom */}
      <Card className="overflow-hidden group">
        <div
          className="relative aspect-square cursor-zoom-in"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        >
          <motion.div
            animate={{ scale: isZoomed ? 1.1 : 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <OptimizedImage
              src={product.images?.[selectedImageIndex] || product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300"
            />
          </motion.div>

          {/* Zoom Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isZoomed ? 1 : 0 }}
            className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2"
          >
            <ZoomIn className="w-4 h-4 text-white" />
          </motion.div>

          {product.badge && (
            <Badge
              className={`${product.badgeColor} text-white font-semibold absolute top-4 left-4 px-3 py-1 shadow-lg`}
            >
              {product.badge}
            </Badge>
          )}

          {/* Image Navigation Arrows */}
          {product.images && product.images.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev > 0 ? prev - 1 : (product.images?.length || 1) - 1
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev < (product.images?.length || 1) - 1 ? prev + 1 : 0
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </>
          )}
        </div>
      </Card>

      {/* Thumbnail Gallery */}
      {product.images && product.images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {product.images.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedImageIndex === index
                  ? 'border-primary shadow-lg shadow-primary/20'
                  : 'border-border/20 hover:border-primary/50'
              }`}
            >
              <OptimizedImage
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
};
