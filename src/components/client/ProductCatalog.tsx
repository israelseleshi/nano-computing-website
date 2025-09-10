import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { useToast } from '../ui/toast';
import { 
  Search, 
  Grid, 
  List, 
  Star, 
  ShoppingCart, 
  Heart, 
  Eye,
  SlidersHorizontal,
  Package,
  TrendingUp,
  Award,
  Zap,
  Filter
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  image?: string;
  description: string;
  features: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [addingToWishlist, setAddingToWishlist] = useState<string | null>(null);
  const { addToast } = useToast();
  const [viewingProduct, setViewingProduct] = useState<string | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCart = async (product: Product) => {
    setAddingToCart(product.id);
    // Simulate API call
    setTimeout(() => {
      setAddingToCart(null);
      addToast({
        type: 'success',
        title: 'Added to Cart',
        description: `${product.name} has been added to your cart`
      });
    }, 800);
  };

  const handleAddToWishlist = async (product: Product) => {
    setAddingToWishlist(product.id);
    // Simulate API call
    setTimeout(() => {
      setAddingToWishlist(null);
      addToast({
        type: 'success',
        title: 'Added to Wishlist',
        description: `${product.name} has been added to your wishlist`
      });
    }, 800);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setViewingProduct(product.id);
    setShowProductModal(true);
    // Simulate loading product details
    setTimeout(() => {
      setViewingProduct(null);
    }, 500);
  };

  const handleQuickOrder = (product: Product) => {
    addToast({
      type: 'info',
      title: 'Quick Order',
      description: `Quick order for ${product.name} - Feature coming soon!`
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange({ min: 0, max: 10000 });
    setSortBy('name');
  };

  // Mock product data
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Dell OptiPlex 7090 Desktop',
      price: 1299.99,
      originalPrice: 1499.99,
      category: 'Computers',
      brand: 'Dell',
      rating: 4.5,
      reviews: 128,
      inStock: true,
      description: 'Powerful desktop computer for business use',
      features: ['Intel Core i7', '16GB RAM', '512GB SSD', 'Windows 11 Pro'],
      isFeatured: true
    },
    {
      id: '2',
      name: 'HP 24" Monitor',
      price: 299.99,
      category: 'Monitors',
      brand: 'HP',
      rating: 4.2,
      reviews: 89,
      inStock: true,
      description: 'Full HD monitor with excellent color accuracy',
      features: ['24-inch Display', '1920x1080', 'IPS Panel', 'HDMI/VGA'],
      isNew: true
    },
    {
      id: '3',
      name: 'Cisco Router RV340W',
      price: 899.99,
      category: 'Networking',
      brand: 'Cisco',
      rating: 4.7,
      reviews: 45,
      inStock: false,
      description: 'Enterprise-grade wireless router',
      features: ['Dual WAN', 'VPN Support', 'Wireless AC', 'Gigabit Ports']
    },
    {
      id: '4',
      name: 'MacBook Pro 16"',
      price: 2499.99,
      category: 'Laptops',
      brand: 'Apple',
      rating: 4.8,
      reviews: 234,
      inStock: true,
      description: 'Professional laptop for creative work',
      features: ['M2 Pro Chip', '16GB RAM', '512GB SSD', 'Retina Display'],
      isFeatured: true
    },
    {
      id: '5',
      name: 'HP LaserJet Pro M404n',
      price: 299.99,
      originalPrice: 349.99,
      category: 'Printers',
      brand: 'HP',
      rating: 4.3,
      reviews: 67,
      inStock: true,
      description: 'Fast and reliable laser printer',
      features: ['38 ppm', 'Duplex Printing', 'Network Ready', 'Mobile Printing']
    }
  ]);

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  const brands = ['all', ...Array.from(new Set(products.map(p => p.brand)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const ProductCard = ({ product, index }: { product: Product; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="relative">
          <div className="aspect-square bg-muted flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="text-sm">Product Image</div>
              <div className="text-xs">{product.category}</div>
            </div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
            )}
            {product.isFeatured && (
              <Badge className="bg-blue-500 hover:bg-blue-600">Featured</Badge>
            )}
            {!product.inStock && (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex flex-col gap-1">
              <Button 
                size="sm" 
                variant="secondary" 
                className="h-8 w-8 p-0"
                onClick={() => handleAddToWishlist(product)}
                disabled={addingToWishlist === product.id}
              >
                {addingToWishlist === product.id ? (
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <Heart className="w-4 h-4" />
                )}
              </Button>
              <Button 
                size="sm" 
                variant="secondary" 
                className="h-8 w-8 p-0"
                onClick={() => handleViewDetails(product)}
                disabled={viewingProduct === product.id}
              >
                {viewingProduct === product.id ? (
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <h3 className="font-semibold line-clamp-2 mb-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold">ETB {product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ETB {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Features */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {product.features.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{product.features.length - 2} more
                </Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              className="flex-1" 
              disabled={!product.inStock || addingToCart === product.id}
              onClick={() => handleAddToCart(product)}
            >
              {addingToCart === product.id ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  // Calculate statistics
  const totalProducts = products.length;
  const inStockProducts = products.filter(p => p.inStock).length;
  const featuredProducts = products.filter(p => p.isFeatured).length;
  const averageRating = products.reduce((sum, p) => sum + p.rating, 0) / products.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Product Catalog
          </h1>
          <p className="text-muted-foreground mt-2">Browse our complete IT equipment selection with advanced filtering</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="border-primary/20 hover:border-primary/40"
          >
            {viewMode === 'grid' ? <List className="w-4 h-4 mr-2" /> : <Grid className="w-4 h-4 mr-2" />}
            {viewMode === 'grid' ? 'List View' : 'Grid View'}
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-primary/20 hover:border-primary/40"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg">
            <Zap className="w-4 h-4 mr-2" />
            Quick Order
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border-blue-200/50 dark:border-blue-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Products</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalProducts}</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-full">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 border-green-200/50 dark:border-green-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">In Stock</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">{inStockProducts}</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 border-purple-200/50 dark:border-purple-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Featured</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{featuredProducts}</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-full">
              <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/10 border-orange-200/50 dark:border-orange-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Avg Rating</p>
              <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{averageRating.toFixed(1)}</p>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-full">
              <Star className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search products by name, brand, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-600/50 focus:border-primary/50 focus:ring-primary/20"
            />
          </div>
          <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary/40">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Search
          </Button>
        </div>
      </Card>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200/50 dark:border-gray-600/50 rounded-lg bg-white/80 dark:bg-gray-800/80 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200/50 dark:border-gray-600/50 rounded-lg bg-white/80 dark:bg-gray-800/80 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                  >
                    {brands.map(brand => (
                      <option key={brand} value={brand}>
                        {brand === 'all' ? 'All Brands' : brand}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200/50 dark:border-gray-600/50 rounded-lg bg-white/80 dark:bg-gray-800/80 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                  >
                    <option value="name">Name A-Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Price Range</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className="bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-600/50 focus:border-primary/50 focus:ring-primary/20"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-600/50 focus:border-primary/50 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-600/50">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredProducts.length} products match your criteria
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearFilters}
                  className="border-primary/20 hover:border-primary/40"
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground font-medium">
          Showing <span className="text-primary font-bold">{filteredProducts.length}</span> of <span className="text-primary font-bold">{products.length}</span> products
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>View:</span>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="h-8 px-3"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="h-8 px-3"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Card className="p-12 text-center">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </Card>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
