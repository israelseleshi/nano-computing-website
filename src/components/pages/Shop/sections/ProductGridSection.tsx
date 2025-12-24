import { motion } from 'framer-motion';
import { Heart, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import OptimizedImage from '@/components/utils/OptimizedImage';

import { Product } from '../types';

interface ProductGridSectionProps {
  currentProducts: Product[];
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  onPageChange: (page: string) => void;
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
}

export const ProductGridSection = ({
  currentProducts,
  wishlist,
  toggleWishlist,
  onPageChange,
  totalPages,
  currentPage,
  goToPage,
}: ProductGridSectionProps) => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-left mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-h3 font-bold mb-4">Hardware Solutions</h2>
          <p className="text-body-lg text-muted-foreground max-w-1xl">
            Enterprise-grade hardware solutions designed for performance, reliability, and
            scalability.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {currentProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group"
            >
              <Card className="premium-card group relative flex flex-col h-full overflow-hidden bg-card/50 dark:bg-card/30 border border-border/20 dark:border-white/5 shadow-sm hover:shadow-xl dark:hover:shadow-2xl hover:shadow-primary/5 dark:hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 ease-out">
                {/* Product Image */}
                <div className="relative overflow-hidden aspect-square w-full bg-gradient-to-br from-muted/10 to-muted/30 dark:from-muted/5 dark:to-muted/20">
                  <OptimizedImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Overlay for badges and info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Elegant Badge with theme-aware colors */}
                  {product.badge && (
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                      <Badge
                        className={`
                          text-white font-medium px-2 py-1 text-xs sm:text-xs backdrop-blur-sm shadow-lg transform group-hover:scale-105 transition-all duration-300 rounded-md
                          ${
                            product.badgeColor === 'new-arrival'
                              ? 'bg-blue-600/90 dark:bg-blue-500/80 border border-blue-400/30'
                              : product.badgeColor === 'popular'
                                ? 'bg-green-600/90 dark:bg-green-500/80 border border-green-400/30'
                                : product.badgeColor === 'high-performance'
                                  ? 'bg-purple-600/90 dark:bg-purple-500/80 border border-purple-400/30'
                                  : product.badgeColor === 'essential'
                                    ? 'bg-orange-600/90 dark:bg-orange-500/80 border border-orange-400/30'
                                    : 'bg-gray-600/90 dark:bg-gray-500/80 border border-gray-400/30'
                          }
                        `}
                      >
                        {product.badge}
                      </Badge>
                    </div>
                  )}

                  {/* Wishlist button with overlay */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 shadow-lg"
                      onClick={() => toggleWishlist(Number(product.id))}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          wishlist.includes(Number(product.id))
                            ? 'text-red-500 fill-red-500'
                            : 'text-white'
                        }`}
                      />
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 lg:p-6 flex flex-col flex-grow space-y-3">
                  <h3 className="text-body font-semibold mb-1 line-clamp-2 text-left group-hover:text-primary transition-colors duration-300 leading-tight">
                    {product.name}
                  </h3>

                  {/* Rating and Reviews */}
                  <div className="flex items-center">
                    <div className="flex items-center text-caption text-muted-foreground">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-current mr-1.5" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="mx-2 text-muted-foreground/60">•</span>
                      <span className="text-muted-foreground/80">{product.reviews} reviews</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline space-x-2">
                    {product.originalPrice && (
                      <span className="text-caption text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                    <span className="text-lg font-bold text-primary">
                      {product.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Features */}
                  <p className="text-caption text-muted-foreground/90 line-clamp-2 text-left leading-relaxed flex-grow">
                    {product.features[0]} • {product.features[1]}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2 mt-auto">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                        In Stock
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="px-3 py-2 hover:bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                      onClick={() => onPageChange(`product-${product.id}`)}
                    >
                      <span className="text-xs font-medium mr-1">View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="flex justify-center items-center mt-12 space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => goToPage(page)}
                className={`px-3 ${
                  currentPage === page
                    ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white border-blue-600 dark:border-blue-700'
                    : ''
                }`}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
