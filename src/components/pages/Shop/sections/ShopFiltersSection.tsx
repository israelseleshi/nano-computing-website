import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category } from '../types';

interface ShopFiltersSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setIsFilterModalOpen: (isOpen: boolean) => void;
  selectedBrands: string[];
  inStockOnly: boolean;
  priceRange: [number, number];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: Category[];
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

export const ShopFiltersSection = ({
  searchTerm,
  setSearchTerm,
  setIsFilterModalOpen,
  selectedBrands,
  inStockOnly,
  priceRange,
  selectedCategory,
  setSelectedCategory,
  categories,
  sortBy,
  setSortBy,
}: ShopFiltersSectionProps) => {
  const [minPrice = 0, maxPrice = 1000000] = priceRange;
  return (
    <section className="py-6 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="flex flex-col gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Search and Filters in one row */}
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search hardware..."
                className="pl-10 border w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters and Sort */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:flex-shrink-0">
              {/* Filter Button */}
              <Button
                variant="outline"
                onClick={() => setIsFilterModalOpen(true)}
                className="flex items-center justify-center space-x-2 px-4 py-2 w-full sm:w-auto"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
                {(selectedBrands.length > 0 ||
                  inStockOnly ||
                  minPrice > 0 ||
                  maxPrice < 1000000) && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                    {selectedBrands.length +
                      (inStockOnly ? 1 : 0) +
                      (minPrice > 0 || maxPrice < 1000000 ? 1 : 0)}
                  </Badge>
                )}
              </Button>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.label} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
