import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  brands: string[];
  selectedBrands: string[];
  handleBrandChange: (brand: string) => void;
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
  clearAllFilters: () => void;
}

export const FilterModal = ({
  isOpen,
  onClose,
  priceRange,
  setPriceRange,
  brands,
  selectedBrands,
  handleBrandChange,
  inStockOnly,
  setInStockOnly,
  clearAllFilters,
}: FilterModalProps) => {
  const handlePriceChange = (value: number[]) => {
    if (value.length === 2 && value[0] !== undefined && value[1] !== undefined) {
      setPriceRange([value[0], value[1]]);
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative bg-card border border-border rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-h4 font-bold flex items-center text-primary">
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filters
              </h3>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Filter Content */}
            <div className="p-6 space-y-6">
              {/* Price Range */}
              <div>
                <h4 className="text-body-sm font-semibold mb-3 text-foreground">Price Range</h4>
                <Slider
                  min={0}
                  max={1000000}
                  step={5000}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  className="mb-3"
                />
                <div className="flex justify-between text-caption text-muted-foreground">
                  <span> {priceRange[0]}</span>
                  <span> {priceRange[1]}</span>
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="text-body-sm font-semibold mb-3 text-foreground">Brands</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => handleBrandChange(brand)}
                      />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="text-body-sm cursor-pointer hover:text-primary transition-colors"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stock Status */}
              <div>
                <h4 className="text-body-sm font-semibold mb-3 text-foreground">Availability</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="in-stock"
                    checked={inStockOnly}
                    onCheckedChange={(checked) => setInStockOnly(!!checked)}
                  />
                  <label
                    htmlFor="in-stock"
                    className="text-body-sm cursor-pointer hover:text-primary transition-colors"
                  >
                    In Stock Only
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={clearAllFilters}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
                <Button className="flex-1" onClick={onClose}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
