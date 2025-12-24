import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ShopFiltersSection } from './sections/ShopFiltersSection';
import { ProductGridSection } from './sections/ProductGridSection';
import { FilterModal } from './sections/FilterModal';
import { ProductQuickViewModal } from './sections/ProductQuickViewModal';
import { Product, Category } from './types';

interface ShopPageProps {
  onPageChange: (page: string) => void;
}

export default function ShopPage({ onPageChange }: ShopPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);

  // Update products per page based on screen size
  useEffect(() => {
    const updateProductsPerPage = () => {
      if (window.innerWidth >= 1280)
        setProductsPerPage(12); // xl
      else if (window.innerWidth >= 1024)
        setProductsPerPage(9); // lg
      else if (window.innerWidth >= 768)
        setProductsPerPage(8); // md
      else setProductsPerPage(6); // sm
    };

    updateProductsPerPage();
    window.addEventListener('resize', updateProductsPerPage);
    return () => window.removeEventListener('resize', updateProductsPerPage);
  }, []);

  const categories: Category[] = [
    { id: 'all', label: 'All Products', count: 120 },
    { id: 'networking', label: 'Networking', count: 45 },
    { id: 'security', label: 'Security', count: 32 },
    { id: 'servers', label: 'Servers', count: 28 },
    { id: 'accessories', label: 'Accessories', count: 15 },
  ];

  const brands = ['Cisco', 'Dell', 'HP', 'Hikvision', 'Dahua', 'Fortinet', 'WD', 'Generic'];

  const products: Product[] = [
    {
      id: 1,
      name: 'Enterprise Security Camera System',
      category: 'security',
      price: 2499,
      originalPrice: 2999,
      rating: 4.9,
      reviews: 156,
      badge: 'Best Seller',
      badgeColor: 'popular',
      image: '/cctv-camera.png',
      features: ['4K Ultra HD', 'Night Vision', 'Motion Detection', 'Cloud Storage'],
      inStock: true,
      shippingTime: '2-3 Days',
      warranty: '2 Years',
      description: 'Professional grade security camera system suitable for large enterprises.',
    },
    {
      id: 2,
      name: 'Professional Network Infrastructure',
      category: 'networking',
      price: 4299,
      rating: 4.8,
      reviews: 89,
      badge: 'Enterprise',
      badgeColor: 'high-performance',
      image: '/computer-network.png',
      features: ['Gigabit Speed', 'Enterprise Grade', 'Scalable', '24/7 Support'],
      inStock: true,
      shippingTime: '5-7 Days',
      warranty: '3 Years',
      description: 'Complete network infrastructure setup including switches, routers and cabling.',
    },
    {
      id: 3,
      name: 'Advanced Server Solutions',
      category: 'servers',
      price: 8999,
      rating: 4.9,
      reviews: 234,
      badge: 'High Performance',
      badgeColor: 'high-performance',
      image: '/computer-repair.png',
      features: ['High Performance', 'Redundancy', 'Remote Management', 'Energy Efficient'],
      inStock: true,
      shippingTime: '7-10 Days',
      warranty: '5 Years',
      description: 'Rack-mounted server solutions for data centers and business applications.',
    },
    {
      id: 4,
      name: 'TYPE-C to HDTV 8-in-1 Hub',
      category: 'accessories',
      price: 2800,
      rating: 4.5,
      reviews: 45,
      badge: 'New Arrival',
      badgeColor: 'new-arrival',
      image:
        'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['USB-C PD 87W', 'High-speed USB-C', '2x USB-A'],
      inStock: true,
      shippingTime: '1 Day',
      warranty: '1 Year',
      description: 'Versatile USB-C hub for connecting multiple devices to your laptop.',
    },
    {
      id: 5,
      name: 'Stylish Leather Laptop Bag',
      category: 'accessories',
      price: 4499,
      rating: 4.7,
      reviews: 89,
      badge: 'Popular',
      badgeColor: 'popular',
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['Premium Leather', 'Laptop Protection', 'Multiple Colors'],
      inStock: true,
      shippingTime: '1 Day',
      warranty: '6 Months',
      description: 'Elegant leather bag to protect and carry your laptop in style.',
    },
    {
      id: 6,
      name: 'WD 8TB Purple Surveillance Drive',
      category: 'security',
      price: 18500,
      rating: 4.8,
      reviews: 156,
      badge: 'Reliable',
      badgeColor: 'essential',
      image:
        'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['8TB Capacity', 'SATA 6Gb/s', 'AI Surveillance Optimized'],
      inStock: true,
      shippingTime: '1-2 Days',
      warranty: '3 Years',
      description: 'High-capacity hard drive optimized for 24/7 surveillance recording.',
    },
    {
      id: 7,
      name: 'Cisco Catalyst 2960-X Switch',
      category: 'networking',
      price: 45000,
      rating: 4.6,
      reviews: 78,
      badge: 'Enterprise',
      badgeColor: 'high-performance',
      image:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['24-Port Gigabit', 'Layer 2 Switching', 'PoE+ Support'],
      inStock: true,
      shippingTime: '3-5 Days',
      warranty: 'Lifetime',
      description: 'Enterprise-class stackable access switch for campus and branch applications.',
    },
    {
      id: 8,
      name: 'Dell PowerEdge R740 Server',
      category: 'servers',
      price: 125000,
      rating: 4.9,
      reviews: 234,
      badge: 'Best Seller',
      badgeColor: 'popular',
      image:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['Dual Xeon Processors', '64GB RAM', 'Redundant PSU'],
      inStock: false,
      shippingTime: '14 Days',
      warranty: '3 Years Onsite',
      description: 'General-purpose rack server optimized for workload acceleration.',
    },
    {
      id: 9,
      name: 'Fortinet FortiGate 60F Firewall',
      category: 'security',
      price: 32000,
      rating: 4.4,
      reviews: 67,
      badge: 'Security',
      badgeColor: 'high-performance',
      image:
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['Next-Gen Firewall', 'VPN Support', 'Threat Protection'],
      inStock: true,
      shippingTime: '2-3 Days',
      warranty: '1 Year',
      description: 'Secure SD-WAN appliance for enterprise branch offices.',
    },
  ];

  // Filtering Logic
  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesBrand =
          selectedBrands.length === 0 ||
          selectedBrands.some((brand) => product.name.includes(brand));
        const matchesStock = !inStockOnly || product.inStock;

        return matchesSearch && matchesCategory && matchesPrice && matchesBrand && matchesStock;
      }),
    [products, searchTerm, selectedCategory, priceRange, selectedBrands, inStockOnly]
  );

  // Sorting Logic
  const sortedProducts = useMemo(
    () =>
      [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return Number(b.id) - Number(a.id);
          default:
            return 0; // Featured logic assumed default order
        }
      }),
    [filteredProducts, sortBy]
  );

  // Pagination Logic
  const totalPages = useMemo(
    () => Math.ceil(sortedProducts.length / productsPerPage),
    [sortedProducts.length, productsPerPage]
  );
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = useMemo(
    () => sortedProducts.slice(startIndex, startIndex + productsPerPage),
    [sortedProducts, startIndex, productsPerPage]
  );

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Cart & Wishlist Logic
  const toggleWishlist = useCallback((productId: number) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  }, []);

  const handleBrandChange = useCallback((brand: string) => {
    setSelectedBrands((prevBrands) => {
      if (prevBrands.includes(brand)) {
        return prevBrands.filter((b) => b !== brand);
      } else {
        return [...prevBrands, brand];
      }
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange([0, 1000000]);
    setSelectedBrands([]);
    setInStockOnly(false);
    setSortBy('featured');
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <ShopFiltersSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setIsFilterModalOpen={setIsFilterModalOpen}
        selectedBrands={selectedBrands}
        inStockOnly={inStockOnly}
        priceRange={priceRange}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <ProductGridSection
        currentProducts={currentProducts}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        onPageChange={onPageChange}
        totalPages={totalPages}
        currentPage={currentPage}
        goToPage={goToPage}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        brands={brands}
        selectedBrands={selectedBrands}
        handleBrandChange={handleBrandChange}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
        clearAllFilters={clearAllFilters}
      />

      <ProductQuickViewModal
        selectedProduct={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        toggleWishlist={toggleWishlist}
        wishlist={wishlist}
      />
    </div>
  );
}
