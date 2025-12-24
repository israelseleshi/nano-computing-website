import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/utils/OptimizedImage';
import { Product } from '../types';

interface ProductQuickViewModalProps {
  selectedProduct: Product | null;
  onClose: () => void;
  toggleWishlist: (productId: number) => void;
  wishlist: number[];
}

export const ProductQuickViewModal = ({
  selectedProduct,
  onClose,
  toggleWishlist,
  wishlist,
}: ProductQuickViewModalProps) => {
  return (
    <AnimatePresence>
      {selectedProduct && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-card border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-h3 font-bold">{selectedProduct.name}</h2>
                <Button variant="ghost" onClick={onClose}>
                  ×
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <OptimizedImage
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full aspect-square object-cover"
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-medium ml-1">{selectedProduct.rating}</span>
                      </div>
                      <span className="text-muted-foreground">
                        ({selectedProduct.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {selectedProduct.originalPrice && (
                        <span className="text-xl text-muted-foreground line-through">
                          {selectedProduct.originalPrice}
                        </span>
                      )}
                      <span className="text-h2 font-bold text-primary">
                        {selectedProduct.price}
                      </span>
                    </div>
                  </div>

                  <p className="text-body text-muted-foreground">{selectedProduct.description}</p>

                  <div>
                    <h4 className="text-h4 font-semibold mb-3">Key Features:</h4>
                    <div className="space-y-2">
                      {selectedProduct.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-primary mr-2" />
                          <span className="text-body">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button className="flex-1 btn-theme-aware" onClick={() => onClose()}>
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => toggleWishlist(Number(selectedProduct.id))}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          wishlist.includes(Number(selectedProduct.id))
                            ? 'text-red-500 fill-red-500'
                            : ''
                        }`}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
