import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  ShoppingCart, 
  Shield, 
  Truck, 
  CheckCircle,
  Package,
  Zap,
  Radio,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  User,
  Mail,
  Send
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
  onPageChange: (page: string) => void;
}

export function ProductDetailPage({ productId, onPageChange }: ProductDetailPageProps) {
  // Use the product ID directly (it's already extracted from the URL params)
  const actualProductId = productId;
  
  // State for premium interactions
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  // Review form state
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 0,
    title: '',
    comment: ''
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  
  // Product data - in a real app, this would come from a database or API
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
      badgeColor: 'bg-primary',
      images: [
        'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=600&fit=crop&auto=format&q=80',
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&auto=format&q=80',
        'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=600&fit=crop&auto=format&q=80'
      ],
      image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['USB-C PD 87W', 'High-speed USB-C', '2x USB-A', 'HDTV Output', 'SD Card Reader'],
      inStock: true,
      shippingTime: '1-2 business days',
      warranty: '1 year',
      description: 'Features USB-C PD (87W), high-speed USB-C, 2x USB-A, HDTV, and SD card reader. Color: Space Gray.',
      detailedDescription: 'This premium 8-in-1 USB-C hub transforms your laptop into a powerful workstation. With support for 87W Power Delivery, you can charge your laptop while using all other ports simultaneously. The hub features high-speed data transfer, 4K HDMI output, and multiple connectivity options making it perfect for professionals and content creators.',
      quickSpecs: {
        'Connectivity': { icon: Zap, value: 'USB-C, USB-A x2, HDMI' },
        'Power': { icon: Shield, value: '87W USB-C PD' },
        'Video': { icon: Radio, value: '4K@30Hz HDMI' }
      },
      specifications: {
        'Connectivity': 'USB-C, USB-A x2, HDMI, SD Card',
        'Power Delivery': '87W USB-C PD',
        'Video Output': '4K@30Hz HDMI',
        'Data Transfer': 'USB 3.0 (5Gbps)',
        'Compatibility': 'MacBook, Windows laptops, tablets',
        'Material': 'Aluminum alloy',
        'Dimensions': '110 x 45 x 12mm',
        'Weight': '85g'
      }
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
      description: 'Premium leather laptop bag. Available in Black, Gray, and Space Blue.',
      detailedDescription: 'Crafted from genuine premium leather, this laptop bag combines style with functionality. The padded interior provides excellent protection for laptops up to 15.6 inches, while multiple compartments keep your accessories organized. Perfect for business professionals who value both aesthetics and practicality.',
      specifications: {
        'Material': 'Genuine leather exterior, soft fabric lining',
        'Laptop Size': 'Up to 15.6 inches',
        'Compartments': 'Main laptop compartment, 2 front pockets, side pocket',
        'Colors': 'Black, Gray, Space Blue',
        'Dimensions': '40 x 30 x 8 cm',
        'Weight': '800g',
        'Closure': 'Magnetic snap closure',
        'Strap': 'Adjustable shoulder strap (70-130cm)'
      }
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
      description: '8TB SATA 6Gb/s internal hard drive. Specifically designed for AI surveillance systems.',
      detailedDescription: 'The WD Purple surveillance hard drive is engineered specifically for 24/7 surveillance systems. With AllFrame AI technology, it reduces frame loss and improves overall video playback. Built to handle the unique demands of surveillance workloads with enhanced reliability and performance.',
      specifications: {
        'Capacity': '8TB',
        'Interface': 'SATA 6Gb/s',
        'Form Factor': '3.5-inch',
        'RPM': '5400 RPM',
        'Cache': '256MB',
        'Workload Rate': '180TB/year',
        'MTBF': '1.5 million hours',
        'Operating Temperature': '0°C to 65°C'
      }
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
      description: 'High-quality replacement or spare Type-C chargers for a wide variety of laptop models.',
      detailedDescription: 'This universal Type-C laptop charger is compatible with a wide range of laptop models from major manufacturers. Featuring fast charging technology and multiple safety protections, it\'s the perfect replacement or backup charger for your mobile workstation.',
      specifications: {
        'Input': '100-240V AC, 50/60Hz',
        'Output': '20V/3.25A, 65W',
        'Connector': 'USB Type-C',
        'Cable Length': '1.8m',
        'Safety Features': 'Over-voltage, over-current, short-circuit protection',
        'Compatibility': 'Most USB-C laptops',
        'Certification': 'CE, FCC, RoHS',
        'Weight': '320g'
      }
    },
    {
      id: 'NC005',
      name: 'TYPE-C to HDTV 8-in-1 Hub with VGA/LAN',
      category: 'accessories',
      price: 3200.00,
      originalPrice: null,
      rating: 4.6,
      reviews: 67,
      badge: 'Versatile',
      badgeColor: 'bg-purple-500',
      image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['LAN Port', 'SD Card Support', 'USB 3.0', 'HDMI Output', 'VGA Support'],
      inStock: true,
      shippingTime: '1-2 business days',
      warranty: '1 year',
      description: 'Versatile 8-in-1 Hub with LAN, SD card, USB 3.0, HDMI, and legacy VGA support.',
      detailedDescription: 'The ultimate connectivity solution featuring 8 ports in one compact hub. Perfect for professionals who need comprehensive connectivity options including legacy VGA support for older displays and presentations.',
      specifications: {
        'Ports': 'HDMI, VGA, USB 3.0 x2, USB 2.0, RJ45 LAN, SD/TF Card',
        'HDMI Output': '4K@30Hz',
        'VGA Output': '1080P@60Hz',
        'USB Data Transfer': '5Gbps (USB 3.0)',
        'Ethernet': '10/100/1000 Mbps',
        'Power Delivery': 'Up to 100W',
        'Material': 'Aluminum alloy',
        'Dimensions': '120 x 50 x 15mm'
      }
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
      description: 'Ergonomic wireless mouse designed for comfort and portability. Ambidextrous design.',
      detailedDescription: 'This wireless mouse combines comfort, precision, and portability in a sleek design. Perfect for both office work and travel, with reliable wireless connectivity and extended battery life.',
      specifications: {
        'Connectivity': '2.4GHz wireless',
        'Range': 'Up to 10 meters',
        'DPI': '1000 DPI',
        'Buttons': '3 buttons + scroll wheel',
        'Battery': '1 AA battery (included)',
        'Battery Life': 'Up to 12 months',
        'Compatibility': 'Windows, macOS, Linux',
        'Dimensions': '100 x 60 x 35mm'
      }
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
      description: 'Experience next-gen speeds with this Wi-Fi 6 dual-band router for enhanced network performance.',
      detailedDescription: 'Upgrade to Wi-Fi 6 with this high-performance dual-band router. Featuring the latest wireless technology, it delivers faster speeds, increased capacity, and reduced latency for all your connected devices.',
      specifications: {
        'Wi-Fi Standard': '802.11ax (Wi-Fi 6)',
        'Speed': 'AX1800 (1200 Mbps + 574 Mbps)',
        'Antennas': '4 × external antennas',
        'Ethernet Ports': '4 × Gigabit LAN, 1 × Gigabit WAN',
        'Processor': 'Dual-core 1.5 GHz',
        'Memory': '256 MB RAM, 128 MB Flash',
        'Coverage': 'Up to 1,500 sq ft',
        'Concurrent Users': '50+ devices'
      }
    },
    {
      id: 'NC008',
      name: 'Adjustable Ergonomic Laptop Stand',
      category: 'accessories',
      price: 1800.00,
      originalPrice: null,
      rating: 4.5,
      reviews: 123,
      badge: 'Bestseller',
      badgeColor: 'bg-green-500',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['Height Adjustable', 'Ventilated Design', 'Portable Aluminum', 'Ergonomic'],
      inStock: true,
      shippingTime: '1-2 business days',
      warranty: '2 years',
      description: 'Height-adjustable and ventilated portable aluminum stand to improve your desk ergonomics.',
      detailedDescription: 'Transform your workspace with this premium aluminum laptop stand. The adjustable height and angle settings help reduce neck strain and improve posture, while the ventilated design keeps your laptop cool during extended use.',
      specifications: {
        'Material': 'Premium aluminum alloy',
        'Adjustability': '6 height levels, 0-45° tilt',
        'Compatibility': 'Laptops 10-17 inches',
        'Weight Capacity': 'Up to 8kg',
        'Folded Size': '260 x 230 x 25mm',
        'Weight': '1.2kg',
        'Ventilation': 'Open design for airflow',
        'Non-slip': 'Silicone pads included'
      }
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
      description: '8-in-1 hub supporting 4K Ultra HD, 5Gbps USB 3.0, LAN, SD/TF card slots, HDMI, and PD Charging.',
      detailedDescription: 'Experience lightning-fast data transfer with this super-speed USB-C hub. Featuring 5Gbps USB 3.0 ports and 4K Ultra HD output, it\'s perfect for content creators and professionals who demand the highest performance.',
      specifications: {
        'USB Ports': '2 × USB 3.0 (5Gbps), 1 × USB 2.0',
        'Video Output': 'HDMI 4K@30Hz',
        'Card Readers': 'SD/TF card slots',
        'Ethernet': 'Gigabit RJ45 LAN',
        'Power Delivery': 'Up to 100W PD',
        'Data Transfer': '5Gbps super-speed',
        'Material': 'Aluminum alloy',
        'Cable Length': '15cm'
      }
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
      description: 'Chargers available for major brands including HP, Toshiba, Lenovo, Asus, Dell, Acer, and many more.',
      detailedDescription: 'Comprehensive collection of laptop chargers compatible with major brands. Whether you need a replacement or spare charger, we have options for HP, Toshiba, Lenovo, Asus, Dell, Acer, and many other popular laptop brands.',
      specifications: {
        'Compatibility': 'HP, Dell, Lenovo, Asus, Acer, Toshiba',
        'Power Range': '45W - 90W',
        'Input Voltage': '100-240V AC',
        'Cable Length': '1.5-2m',
        'Connector Types': 'Various (brand specific)',
        'Safety Features': 'Over-voltage, over-current protection',
        'Certification': 'CE, FCC, RoHS',
        'Warranty': '12 months'
      }
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
      description: 'Compact and capable mini PC with a Core i3 processor, 8GB RAM, and a 500GB Hard Drive.',
      detailedDescription: 'This compact mini PC delivers reliable performance in a space-saving design. Perfect for office environments, digital signage, or as a secondary computer. Despite its small size, it provides full desktop functionality.',
      specifications: {
        'Processor': 'Intel Core i3 (varies by model)',
        'Memory': '8GB DDR4 RAM',
        'Storage': '500GB HDD',
        'Graphics': 'Intel UHD Graphics',
        'Ports': 'USB 3.0, USB 2.0, HDMI, VGA, Ethernet',
        'Wireless': 'Wi-Fi 802.11ac, Bluetooth',
        'Dimensions': '182 x 179 x 34.5mm',
        'Operating System': 'Windows 10/11 Pro'
      }
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
      description: 'IP67 weather-resistant security camera with H.265+ compression and long-range IR night vision.',
      detailedDescription: 'Professional-grade network security camera designed for 24/7 surveillance. Features advanced H.265+ compression for efficient storage and bandwidth usage, with excellent night vision capabilities for round-the-clock monitoring.',
      specifications: {
        'Resolution': '2MP (1920 × 1080)',
        'Lens': '2.8mm fixed lens',
        'IR Range': 'Up to 30m',
        'Video Compression': 'H.265+, H.265, H.264+, H.264',
        'Weather Rating': 'IP67',
        'Power': '12V DC ± 25%, PoE',
        'Operating Temperature': '-30°C to +60°C',
        'Network': '10/100 Mbps Ethernet'
      }
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
      description: 'All-in-one ADSL2+ modem and 300Mbps Wi-Fi router. Easy installation and strong, reliable Wi-Fi.',
      detailedDescription: 'Combine your modem and router in one device with this all-in-one ADSL2+ solution. Provides reliable internet connectivity with 300Mbps Wi-Fi speeds, perfect for home and small office environments.',
      specifications: {
        'ADSL Standard': 'ADSL2/2+, ADSL, READSL',
        'Wi-Fi Speed': '300Mbps (2.4GHz)',
        'Antennas': '2 × 5dBi fixed antennas',
        'Ethernet Ports': '4 × 10/100Mbps LAN',
        'Security': 'WPA/WPA2, WPS',
        'Firewall': 'DoS attack protection',
        'Dimensions': '243 × 160 × 33mm',
        'Setup': 'Web-based configuration'
      }
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
      description: 'Official fast-charging power adapter with a Type-C port for compatible MacBooks, iPads, and other devices.',
      detailedDescription: 'Official Apple USB-C power adapter designed for MacBooks and iPads. Features fast charging technology and the reliability you expect from genuine Apple accessories.',
      specifications: {
        'Power Output': '61W, 67W, or 96W (model dependent)',
        'Connector': 'USB-C',
        'Input': '100-240V AC, 50/60Hz',
        'Cable Length': '2m (included)',
        'Compatibility': 'MacBook Air, MacBook Pro, iPad Pro',
        'Fast Charging': 'Yes (compatible devices)',
        'Safety': 'Over-voltage, over-current protection',
        'Certification': 'Apple MFi certified'
      }
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
      description: 'Charges AA, AAA, and 9V Ni-MH/Ni-Cd rechargeable batteries. Supports worldwide voltage (100-240V).',
      detailedDescription: 'Universal battery charger supporting multiple battery types and sizes. Perfect for travelers with worldwide voltage compatibility and intelligent charging technology that prevents overcharging.',
      specifications: {
        'Battery Types': 'Ni-MH, Ni-Cd',
        'Battery Sizes': 'AA, AAA, 9V',
        'Charging Slots': '4 × AA/AAA, 1 × 9V',
        'Input Voltage': '100-240V AC, 50/60Hz',
        'Charging Current': 'AA/AAA: 200mA, 9V: 25mA',
        'Safety Features': 'Overcharge protection, reverse polarity',
        'LED Indicators': 'Charging status display',
        'Dimensions': '140 × 105 × 35mm'
      }
    }
  ];

  const product = products.find(p => p.id === actualProductId);

  // Handle review form submission
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset form and hide
    setReviewForm({
      name: '',
      email: '',
      rating: 0,
      title: '',
      comment: ''
    });
    setShowReviewForm(false);
    setIsSubmittingReview(false);
    
    // Show success message (in a real app, you'd handle this properly)
    alert('Thank you for your review! It will be published after moderation.');
  };

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-h2 font-bold mb-4">Product Not Found</h1>
          <p className="text-body text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Button onClick={() => onPageChange('shop')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Enhanced Back Button */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="ghost" 
              onClick={() => onPageChange('hardware')}
              className="mb-6 group hover:bg-primary/10 hover:border-primary/20 border border-transparent transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:text-primary transition-colors duration-300" />
              <span className="group-hover:text-primary transition-colors duration-300">Back to Shop</span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Premium Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Main Image with Zoom */}
              <Card className="overflow-hidden group">
                <div className="relative aspect-square cursor-zoom-in" 
                     onMouseEnter={() => setIsZoomed(true)}
                     onMouseLeave={() => setIsZoomed(false)}>
                  <motion.div
                    animate={{ scale: isZoomed ? 1.1 : 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
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
                    <Badge className={`${product.badgeColor} text-white font-semibold absolute top-4 left-4 px-3 py-1 shadow-lg`}>
                      {product.badge}
                    </Badge>
                  )}
                  
                  {/* Image Navigation Arrows */}
                  {product.images && product.images.length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : product.images.length - 1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedImageIndex(prev => prev < product.images.length - 1 ? prev + 1 : 0)}
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
                      <ImageWithFallback
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
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
                          <div key={key} className="flex items-center gap-2 p-2 bg-background/50 rounded-lg">
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
                  <span className="text-h3 font-bold text-primary">
                    {product.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-body text-muted-foreground mb-6">
                  {product.detailedDescription}
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
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className={`w-2 h-2 rounded-full ${
                            product.inStock 
                              ? 'bg-green-500 shadow-lg shadow-green-500/50' 
                              : 'bg-red-500 shadow-lg shadow-red-500/50'
                          }`}
                        />
                        <p className={`text-caption font-medium ${
                          product.inStock ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div 
                    className="flex-1"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 border-0"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
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
          </div>

          {/* Premium Technical Specifications */}
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
          
          {/* Reviews Section Placeholder */}
          <motion.div
            id="reviews-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 lg:mt-16"
          >
            <Card className="p-6 sm:p-8 shadow-lg border-0 bg-gradient-to-br from-background to-muted/10">
              <div className="flex items-center mb-6">
                <motion.div 
                  className="w-1.5 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full mr-4"
                  initial={{ height: 0 }}
                  animate={{ height: 32 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
                <h2 className="text-h4 sm:text-h3 font-bold">Customer Reviews</h2>
              </div>
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-8 h-8 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-h4 font-bold mb-2">{product.rating} out of 5</p>
                <p className="text-body text-muted-foreground mb-8">Based on {product.reviews} customer reviews</p>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                >
                  {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                </Button>
              </div>
              
              {/* Review Form */}
              <AnimatePresence>
                {showReviewForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8 border-t border-border/20 pt-8"
                  >
                    <h3 className="text-h4 font-semibold mb-6">Write Your Review</h3>
                    <form onSubmit={handleReviewSubmit} className="space-y-6">
                      {/* Rating Selection */}
                      <div className="space-y-3">
                        <label className="text-body font-medium block">Your Rating *</label>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              key={star}
                              type="button"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                              className="transition-all duration-200"
                            >
                              <Star
                                className={`w-8 h-8 transition-all duration-200 ${
                                  star <= reviewForm.rating
                                    ? 'text-yellow-400 fill-current drop-shadow-sm'
                                    : 'text-gray-300 hover:text-yellow-200'
                                }`}
                              />
                            </motion.button>
                          ))}
                          <span className="ml-2 text-body text-muted-foreground">
                            {reviewForm.rating > 0 && `${reviewForm.rating} star${reviewForm.rating > 1 ? 's' : ''}`}
                          </span>
                        </div>
                      </div>

                      {/* Name and Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <label className="text-body font-medium block">Name *</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              type="text"
                              placeholder="Your name"
                              value={reviewForm.name}
                              onChange={(e) => setReviewForm(prev => ({ ...prev, name: e.target.value }))}
                              className="pl-10 h-12"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-body font-medium block">Email *</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              value={reviewForm.email}
                              onChange={(e) => setReviewForm(prev => ({ ...prev, email: e.target.value }))}
                              className="pl-10 h-12"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Review Title */}
                      <div className="space-y-3">
                        <label className="text-body font-medium block">Review Title *</label>
                        <Input
                          type="text"
                          placeholder="Summarize your experience"
                          value={reviewForm.title}
                          onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                          className="h-12"
                          required
                        />
                      </div>

                      {/* Review Comment */}
                      <div className="space-y-3">
                        <label className="text-body font-medium block">Your Review *</label>
                        <Textarea
                          placeholder="Share your thoughts about this product..."
                          value={reviewForm.comment}
                          onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                          className="min-h-[120px] resize-none"
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          disabled={isSubmittingReview || reviewForm.rating === 0}
                          className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold"
                        >
                          {isSubmittingReview ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Submitting...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Send className="w-4 h-4" />
                              Submit Review
                            </div>
                          )}
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
