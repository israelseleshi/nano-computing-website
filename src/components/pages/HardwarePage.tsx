import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ParallaxSection } from '../ParallaxSection';
import { 
  Search,
  Filter,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Zap,
  Shield,
  Award,
  Truck,
  RefreshCw,
  CheckCircle,
  ArrowRight,
  SlidersHorizontal,
  Sparkles,
  Crown,
  Gem,
  TrendingUp,
  Users,
  Clock,
  Tag,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ShopPageProps {
  onPageChange: (page: string) => void;
}

export function HardwarePage({ onPageChange }: ShopPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);

  // Update products per page based on screen size
  useEffect(() => {
    const updateProductsPerPage = () => {
      setProductsPerPage(window.innerWidth >= 1024 ? 8 : 6);
    };
    
    updateProductsPerPage();
    window.addEventListener('resize', updateProductsPerPage);
    return () => window.removeEventListener('resize', updateProductsPerPage);
  }, []);

  const categories = [
    { id: 'all', label: 'All Products', count: 15 },
    { id: 'accessories', label: 'Accessories & Hubs', count: 8 },
    { id: 'networking', label: 'Networking Equipment', count: 2 },
    { id: 'storage', label: 'Storage Solutions', count: 2 },
    { id: 'security', label: 'Security Systems', count: 1 },
    { id: 'peripherals', label: 'Peripherals & Stands', count: 2 }
  ];

  const brands = ['Dell', 'Cisco', 'HPE', 'Fortinet', 'NetApp', 'Ubiquiti'];

  const products = [
    {
      id: 'NC001',
      name: 'TYPE-C to HDTV 8-in-1 Hub',
      category: 'accessories',
      price: 2800.00,
      originalPrice: null,
      rating: 4.5,
      reviews: 45,
      badge: 'New Arrival',
      badgeColor: 'new-arrival',
      image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['USB-C PD 87W', 'High-speed USB-C', '2x USB-A', 'HDTV Output', 'SD Card Reader'],
      inStock: true,
      shippingTime: '1-2 business days',
      warranty: '1 year',
      description: 'Features USB-C PD (87W), high-speed USB-C, 2x USB-A, HDTV, and SD card reader. Color: Space Gray.'
    },
    {
      id: 'NC002',
      name: 'Stylish Leather Laptop Bag',
      category: 'accessories',
      price: 4499.00,
      originalPrice: null,
      rating: 4.7,
      reviews: 89,
      badge: 'Popular',
      badgeColor: 'bg-green-500',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['Premium Leather', 'Laptop Protection', 'Multiple Colors', 'Professional Design'],
      inStock: true,
      shippingTime: '2-3 business days',
      warranty: '2 years',
      description: 'Premium leather laptop bag. Available in Black, Gray, and Space Blue.'
    },
    {
      id: 'NC003',
      name: 'Western Digital 8TB WD Purple Surveillance Hard Drive',
      category: 'storage',
      price: 18500.00,
      originalPrice: null,
      rating: 4.8,
      reviews: 156,
      badge: 'High-Performance',
      badgeColor: 'bg-primary',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['8TB Capacity', 'SATA 6Gb/s', 'AI Surveillance Optimized', 'Reliable Performance'],
      inStock: true,
      shippingTime: '1-2 business days',
      warranty: '3 years',
      description: '8TB SATA 6Gb/s internal hard drive. Specifically designed for AI surveillance systems.'
    },
    {
      id: 'NC004',
      name: 'Universal Type-C Laptop Charger',
      category: 'accessories',
      price: 1950.00,
      originalPrice: null,
      rating: 4.4,
      reviews: 78,
      badge: 'Essential',
      badgeColor: 'bg-blue-500',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['Universal Compatibility', 'Type-C Connector', 'Fast Charging', 'Compact Design'],
      inStock: true,
      shippingTime: '1 business day',
      warranty: '1 year',
      description: 'High-quality replacement or spare Type-C chargers for a wide variety of laptop models.'
    },
    {
      id: 'NC005',
      name: 'TYPE-C to HDTV 8-in-1 Hub with VGA/LAN',
      category: 'accessories',
      price: 3200.00,
      originalPrice: null,
      rating: 4.6,
      reviews: 67,
      badge: 'Popular',
      badgeColor: 'popular',
      image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['LAN Port', 'SD Card Support', 'USB 3.0', 'HDMI Output', 'VGA Support'],
      inStock: true,
      shippingTime: '1-2 business days',
      warranty: '1 year',
      description: 'Versatile 8-in-1 Hub with LAN, SD card, USB 3.0, HDMI, and legacy VGA support.'
    },
    {
      id: 'NC006',
      name: 'Microsoft Wireless Mouse',
      category: 'accessories',
      price: 1250.00,
      originalPrice: null,
      rating: 4.3,
      reviews: 234,
      badge: 'Popular',
      badgeColor: 'bg-green-500',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['Wireless Connectivity', 'Ergonomic Design', 'Ambidextrous', 'Long Battery Life'],
      inStock: true,
      shippingTime: '1 business day',
      warranty: '1 year',
      description: 'Ergonomic wireless mouse designed for comfort and portability. Ambidextrous design.'
    },
    {
      id: 'NC007',
      name: 'TP-Link AX1800 Dual-Band Wi-Fi 6 Router',
      category: 'networking',
      price: 5500.00,
      originalPrice: null,
      rating: 4.7,
      reviews: 189,
      badge: 'High-Performance',
      badgeColor: 'bg-primary',
      image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['Wi-Fi 6 Technology', 'Dual-Band', 'AX1800 Speed', 'Enhanced Performance'],
      inStock: true,
      shippingTime: '1-2 business days',
      warranty: '2 years',
      description: 'Experience next-gen speeds with this Wi-Fi 6 dual-band router for enhanced network performance.'
    },
    {
      id: 'NC008',
      name: 'Adjustable Ergonomic Laptop Stand',
      category: 'accessories',
      price: 1800.00,
      originalPrice: null,
      rating: 4.5,
      reviews: 123,
      badge: 'Popular',
      badgeColor: 'popular',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['Height Adjustable', 'Ventilated Design', 'Portable Aluminum', 'Ergonomic'],
      inStock: true,
      shippingTime: '1-2 business days',
      warranty: '2 years',
      description: 'Height-adjustable and ventilated portable aluminum stand to improve your desk ergonomics.'
    },
    {
      id: 'NC009',
      name: '5Gbps Super-Speed 8-in-1 USB-C Hub',
      category: 'accessories',
      price: 2999.50,
      originalPrice: null,
      rating: 4.6,
      reviews: 98,
      badge: 'High-Performance',
      badgeColor: 'bg-primary',
      image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['5Gbps USB 3.0', '4K Ultra HD', 'LAN Port', 'SD/TF Card Slots', 'PD Charging'],
      inStock: true,
      shippingTime: '1-2 business days',
      warranty: '1 year',
      description: '8-in-1 hub supporting 4K Ultra HD, 5Gbps USB 3.0, LAN, SD/TF card slots, HDMI, and PD Charging.'
    },
    {
      id: 'NC010',
      name: 'Assorted Brand Laptop Chargers',
      category: 'accessories',
      price: 1950.00,
      originalPrice: null,
      rating: 4.2,
      reviews: 167,
      badge: 'Essential',
      badgeColor: 'bg-blue-500',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['Multi-Brand Support', 'HP Compatible', 'Lenovo Compatible', 'Dell Compatible', 'Asus Compatible'],
      inStock: true,
      shippingTime: '1-2 business days',
      warranty: '1 year',
      description: 'Chargers available for major brands including HP, Toshiba, Lenovo, Asus, Dell, Acer, and many more.'
    },
    {
      id: 'NC011',
      name: 'Lenovo ThinkCentre Mini PC',
      category: 'servers',
      price: 25000.00,
      originalPrice: null,
      rating: 4.4,
      reviews: 89,
      badge: 'Compact',
      badgeColor: 'bg-orange-500',
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['Core i3 Processor', '8GB RAM', '500GB HDD', 'Compact Design'],
      inStock: true,
      shippingTime: '2-3 business days',
      warranty: '3 years',
      description: 'Compact and capable mini PC with a Core i3 processor, 8GB RAM, and a 500GB Hard Drive.'
    },
    {
      id: 'NC012',
      name: 'Hikvision 2MP Fixed Bullet Network Camera',
      category: 'security',
      price: 4700.00,
      originalPrice: null,
      rating: 4.6,
      reviews: 145,
      badge: 'Professional',
      badgeColor: 'bg-red-500',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['2MP Resolution', 'IP67 Weather Resistant', 'H.265+ Compression', 'IR Night Vision'],
      inStock: true,
      shippingTime: '1-2 business days',
      warranty: '2 years',
      description: 'IP67 weather-resistant security camera with H.265+ compression and long-range IR night vision.'
    },
    {
      id: 'NC013',
      name: 'TP-Link 300Mbps ADSL2+ Modem Router',
      category: 'networking',
      price: 2200.00,
      originalPrice: null,
      rating: 4.3,
      reviews: 178,
      badge: 'Editor\'s Choice',
      badgeColor: 'bg-primary',
      image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['ADSL2+ Modem', '300Mbps Wi-Fi', 'Easy Installation', 'Reliable Connection'],
      inStock: true,
      shippingTime: '1 business day',
      warranty: '2 years',
      description: 'All-in-one ADSL2+ modem and 300Mbps Wi-Fi router. Easy installation and strong, reliable Wi-Fi.'
    },
    {
      id: 'NC014',
      name: 'Apple MacBook USB-C Charger',
      category: 'accessories',
      price: 3800.00,
      originalPrice: null,
      rating: 4.8,
      reviews: 267,
      badge: 'Apple',
      badgeColor: 'bg-gray-500',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['Official Apple', 'Fast Charging', 'Type-C Port', 'MacBook Compatible', 'iPad Compatible'],
      inStock: true,
      shippingTime: '1-2 business days',
      warranty: '1 year',
      description: 'Official fast-charging power adapter with a Type-C port for compatible MacBooks, iPads, and other devices.'
    },
    {
      id: 'NC015',
      name: 'Maxday Rechargeable Battery Charger',
      category: 'accessories',
      price: 950.00,
      originalPrice: null,
      rating: 4.1,
      reviews: 89,
      badge: 'Travel',
      badgeColor: 'bg-teal-500',
      image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['AA/AAA Support', '9V Compatible', 'Ni-MH/Ni-Cd', 'Worldwide Voltage', '100-240V'],
      inStock: true,
      shippingTime: '1 business day',
      warranty: '1 year',
      description: 'Charges AA, AAA, and 9V Ni-MH/Ni-Cd rechargeable batteries. Supports worldwide voltage (100-240V).'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.some(brand => product.name.includes(brand));
    const matchesStock = !inStockOnly || product.inStock;
    return matchesSearch && matchesCategory && matchesPrice && matchesBrand && matchesStock;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy, selectedBrands, inStockOnly]);

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const clearAllFilters = () => {
    setPriceRange([0, 1000000]);
    setSelectedBrands([]);
    setInStockOnly(false);
  };

  return (
    <div className="min-h-screen pt-20">

      {/* Filters and Search */}
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
                {(selectedBrands.length > 0 || inStockOnly || priceRange[0] > 0 || priceRange[1] < 1000000) && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                    {(selectedBrands.length + (inStockOnly ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 1000000 ? 1 : 0))}
                  </Badge>
                )}
              </Button>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
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

      {/* Products Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
            <h2 className="text-h3 font-bold mb-4">Hardware Solutions</h2>
            <p className="text-body-lg text-muted-foreground max-w-1xl mx-auto">
              Enterprise-grade hardware solutions designed for performance, reliability, and scalability.
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
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {currentProducts.map((product, index) => (
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
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        
                        {/* Overlay for badges and info */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Elegant Badge with theme-aware colors */}
                        {product.badge && (
                          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                            <Badge className={`
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
                            `}>
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
                            onClick={() => toggleWishlist(product.id)}
                          >
                            <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'text-red-500 fill-red-500' : 'text-white'}`} />
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
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">In Stock</span>
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
                    variant={currentPage === page ? "default" : "outline"}
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

      {/* Filter Modal */}
      <AnimatePresence>
        {isFilterModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFilterModalOpen(false)}
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
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFilterModalOpen(false)}
                  className="h-8 w-8"
                >
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
                    onValueChange={setPriceRange}
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
                    {brands.map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => handleBrandChange(brand)}
                        />
                        <label htmlFor={`brand-${brand}`} className="text-body-sm cursor-pointer hover:text-primary transition-colors">
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
                    <label htmlFor="in-stock" className="text-body-sm cursor-pointer hover:text-primary transition-colors">
                      In Stock Only
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={clearAllFilters}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => setIsFilterModalOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
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
                  <Button variant="ghost" onClick={() => setSelectedProduct(null)}>
                    ×
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <ImageWithFallback
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
                      <Button 
                        className="flex-1 btn-theme-aware"
                        onClick={() => {
                          addToCart(selectedProduct.id);
                          setSelectedProduct(null);
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => toggleWishlist(selectedProduct.id)}
                      >
                        <Heart className={`w-4 h-4 ${
                          wishlist.includes(selectedProduct.id) 
                            ? 'text-red-500 fill-red-500' 
                            : ''
                        }`} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}