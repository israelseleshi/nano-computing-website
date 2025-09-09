import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { AnimatedCounter } from '../AnimatedCounter';
import { ParallaxSection } from '../ParallaxSection';
import { ScrollReveal, StaggeredList, StaggeredListItem } from '../ui/scroll-reveal';
import { TypewriterText } from '../TypewriterText';
import { 
  Monitor, 
  Shield, 
  Camera, 
  Database, 
  Globe2, 
  ChevronRight,
  ChevronLeft,
  Quote,
  Star,
  Zap,
  Users,
  Award,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  Sparkles,
  MousePointer,
  Eye,
  Layers,
  Code,
  Server,
  Lock,
  Network,
  Brain,
  Rocket,
  Wrench,
  Cloud,
  Key,
  Video
} from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

interface Product {
  id: string;
  name: string;
  price: string;
  rating: number;
  reviews: number;
  badge: string;
  badgeColor: string;
  image: string;
  features: string[];
}

export const HomePage = memo(({ onPageChange }: HomePageProps): React.JSX.Element => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);

  // Memoized expensive calculations
  const hardwareProducts = useMemo(() => [
    {
      id: 'hp-1',
      name: 'Enterprise Security Camera System',
      price: '$2,499',
      rating: 4.9,
      reviewCount: 156,
      category: 'Security',
      badgeColor: 'bg-red-500',
      image: '/cctv-camera.png',
      features: ['4K Ultra HD', 'Night Vision', 'Motion Detection', 'Cloud Storage'],
      inStock: true
    },
    {
      id: 'hp-2', 
      name: 'Professional Network Infrastructure',
      price: '$4,299',
      rating: 4.8,
      reviewCount: 89,
      category: 'Networking',
      badgeColor: 'bg-blue-500',
      image: '/computer-network.png',
      features: ['Gigabit Speed', 'Enterprise Grade', 'Scalable', '24/7 Support'],
      inStock: true
    },
    {
      id: 'hp-3',
      name: 'Advanced Server Solutions',
      price: '$8,999',
      rating: 4.9,
      reviewCount: 234,
      category: 'Servers',
      badgeColor: 'bg-green-500',
      image: '/computer-repair.png',
      features: ['High Performance', 'Redundancy', 'Remote Management', 'Energy Efficient'],
      inStock: true
    }
  ], []);

  // Memoized popular services
  const popularServices = useMemo(() => [
    {
      icon: Shield,
      title: 'Cybersecurity Solutions',
      description: 'Comprehensive protection against digital threats with advanced monitoring and response capabilities.',
      features: ['24/7 Monitoring', 'Threat Detection', 'Incident Response']
    },
    {
      icon: Network,
      title: 'Network Infrastructure',
      description: 'Design and implement robust network solutions that scale with your business growth.',
      features: ['Network Design', 'Implementation', 'Optimization']
    },
    {
      icon: Cloud,
      title: 'Cloud Migration',
      description: 'Seamless transition to cloud platforms with minimal downtime and maximum efficiency.',
      features: ['Cloud Strategy', 'Migration Planning', 'Optimization']
    }
  ], []);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  // Optimized event handlers with useCallback
  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? hardwareProducts.length - 1 : prevSlide - 1
    );
  }, [hardwareProducts.length]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => 
      prevSlide === hardwareProducts.length - 1 ? 0 : prevSlide + 1
    );
  }, [hardwareProducts.length]);

  const handlePageChange = useCallback((page: string) => {
    onPageChange(page);
  }, [onPageChange]);

  // Track mouse movement for hero interactions
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    {
      icon: Monitor,
      title: 'Network Management & IT Infrastructure',
      description: 'Comprehensive ecosystem oversight ensuring seamless operational continuity.',
    },
    {
      icon: Shield,
      title: 'Cyber Security & Data Protection',
      description: 'Advanced threat detection and multi-layered security protocols.',
    },
    {
      icon: Camera,
      title: 'Surveillance & Monitoring Systems',
      description: 'Intelligent monitoring solutions with real-time analytics.',
    },
    {
      icon: Database,
      title: 'Data Recovery & Business Continuity',
      description: 'Critical data restoration and comprehensive backup strategies.',
    },
    {
      icon: Globe2,
      title: 'Bespoke Web & Application Development',
      description: 'Crafting custom digital platforms that drive efficiency and growth.',
    },
  ];

  const expertiseAreas = [
    {
      icon: Brain,
      title: 'AI-Powered Solutions',
      description: 'Leveraging machine learning and artificial intelligence to automate processes and drive intelligent decision-making.',
      features: ['Predictive Analytics', 'Process Automation', 'Smart Insights'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Comprehensive security frameworks protecting your digital assets with military-grade encryption and monitoring.',
      features: ['Zero Trust Architecture', 'Threat Intelligence', 'Compliance Management'],
      gradient: 'from-red-500 to-orange-500'
    },
    {
      icon: Network,
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud solutions that grow with your business, ensuring optimal performance and cost-efficiency.',
      features: ['Multi-Cloud Strategy', 'Auto-Scaling', 'Cost Optimization'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Code,
      title: 'Custom Development',
      description: 'Bespoke software solutions tailored to your unique business requirements and operational workflows.',
      features: ['Full-Stack Development', 'API Integration', 'Legacy Modernization'],
      gradient: 'from-green-500 to-teal-500'
    }
  ];

  const testimonials = [
    {
      quote: "Nano Computing transformed our entire IT infrastructure. Their expertise is unmatched.",
      author: "Sarah Chen",
      position: "CTO, TechFlow Industries",
      rating: 5,
    },
    {
      quote: "The level of professionalism and technical depth is exactly what we needed for our enterprise.",
      author: "Michael Rodriguez",
      position: "IT Director, Global Dynamics",
      rating: 5,
    },
    {
      quote: "Outstanding service delivery and innovative solutions that exceeded our expectations.",
      author: "Emily Watson",
      position: "CEO, InnovateCorp",
      rating: 5,
    },
  ];

  const stats = [
    { value: 250, label: 'Projects Completed', suffix: '+' },
    { value: 99.9, label: 'Uptime Guarantee', suffix: '%' },
    { value: 50, label: 'Enterprise Clients', suffix: '+' },
    { value: 24, label: 'Support Coverage', suffix: '/7' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex flex-col pt-16">
        <div className="absolute top-16 left-0 w-full h-full overflow-hidden z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/nano-tech-office-display.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60 z-10"></div>
        </div>

        <div className="relative z-20 flex-grow flex items-center">
          <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12">
            <div className="w-full md:w-2/3 lg:w-1/2 flex justify-start">
              <motion.div 
                className="md:hidden mx-4 space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <TypewriterText 
                  texts={["Your Integrated Safety Partner"]} 
                  className="text-h2 font-bold tracking-tight text-white sm:whitespace-nowrap" 
                />
                <motion.p 
                  className="text-body text-white max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  We deliver elite technology consulting to propel your enterprise forward with intelligent solutions, uncompromising security, and seamless innovation.
                </motion.p>
                
                {/* Mobile CTA button - single button */}
                <motion.div 
                  className="flex justify-center pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg" 
                      onClick={() => onPageChange('contact')} 
                      className="px-8 py-4 text-base relative overflow-hidden group bg-blue-700 hover:bg-blue-800 text-white dark:bg-blue-800 dark:hover:bg-blue-900"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Start Your Transformation
                        <motion.div
                          className="ml-2"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div 
                className="hidden md:block space-y-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <TypewriterText 
                  texts={["Your Integrated Safety Partner"]} 
                  className="text-h2 font-bold tracking-tight text-white whitespace-nowrap" 
                />
                <motion.p 
                  className="text-body text-white max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  We deliver elite technology consulting to propel your enterprise forward with intelligent solutions, uncompromising security, and seamless innovation.
                </motion.p>
                <motion.div 
                  className="flex items-start justify-start pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg" 
                      onClick={() => onPageChange('contact')} 
                      className="px-8 py-4 text-base relative overflow-hidden group bg-blue-700 hover:bg-blue-800 text-white dark:bg-blue-800 dark:hover:bg-blue-900"
                    >
                      <span className="relative z-10 flex items-center">
                        Start Your Transformation
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-900 flex items-center justify-center min-h-[400px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-center">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <AnimatedCounter 
                target={250} 
                suffix="+" 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400" 
              />
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-medium">Projects Completed</p>
            </div>
            <div className="space-y-4">
              <AnimatedCounter 
                target={100} 
                suffix="%" 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400" 
              />
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-medium">Uptime Guarantee</p>
            </div>
            <div className="space-y-4">
              <AnimatedCounter 
                target={50} 
                suffix="+" 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400" 
              />
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-medium">Enterprise Clients</p>
            </div>
            <div className="space-y-4">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-medium">Support Coverage</p>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Our Expertise Areas Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-h2 font-bold mb-4">Our Expertise Areas</h2>
            <p className="text-body-lg text-muted-foreground leading-snug max-w-2xl mx-auto">
              Discover our specialized domains where innovation meets excellence
            </p>
          </motion.div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* CCTV Security System */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -4,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group cursor-pointer"
              >
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Popular Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                  
                  {/* Service Image */}
                  <div className="flex justify-center mb-6 mt-8">
                    <img 
                      src="/cctv-camera.png" 
                      alt="CCTV Security System" 
                      className="w-24 h-24 object-contain"
                    />
                  </div>

                  {/* Service Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      CCTV Security System
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      Comprehensive security camera systems to protect your business and...
                    </p>
                    
                    {/* Features List */}
                    <ul className="text-left text-xs text-gray-500 dark:text-gray-400 mb-6 space-y-1">
                      <li>• Complete facility security coverage</li>
                      <li>• Professional installation and setup</li>
                    </ul>

                    {/* Learn More Button */}
                    <motion.button
                      onClick={() => onPageChange('services')}
                      className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-semibold transition-all duration-300 group-hover:gap-3 mx-auto"
                      whileHover={{ x: 5 }}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Computer Repair Service */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -4,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group cursor-pointer"
              >
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Essential Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Essential
                    </span>
                  </div>
                  
                  {/* Service Image */}
                  <div className="flex justify-center mb-6 mt-8">
                    <img 
                      src="/computer-repair.png" 
                      alt="Computer Repair Service" 
                      className="w-24 h-24 object-contain"
                    />
                  </div>

                  {/* Service Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Computer Repair Service
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      Professional computer and networking services for residential and business...
                    </p>
                    
                    {/* Features List */}
                    <ul className="text-left text-xs text-gray-500 dark:text-gray-400 mb-6 space-y-1">
                      <li>• Comprehensive setup and troubleshooting</li>
                      <li>• Hardware repair services</li>
                    </ul>

                    {/* Learn More Button */}
                    <motion.button
                      onClick={() => onPageChange('services')}
                      className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-semibold transition-all duration-300 group-hover:gap-3 mx-auto"
                      whileHover={{ x: 5 }}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Network Design & Installation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -4,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group cursor-pointer"
              >
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* High-Performance Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      High-Performance
                    </span>
                  </div>
                  
                  {/* Service Image */}
                  <div className="flex justify-center mb-6 mt-8">
                    <img 
                      src="/computer-network.png" 
                      alt="Network Design & Installation" 
                      className="w-24 h-24 object-contain"
                    />
                  </div>

                  {/* Service Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Network Design & Installation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      Professional network infrastructure design to enhance your workforce... productivity.
                    </p>
                    
                    {/* Features List */}
                    <ul className="text-left text-xs text-gray-500 dark:text-gray-400 mb-6 space-y-1">
                      <li>• Business network optimization</li>
                      <li>• Secure network access</li>
                    </ul>

                    {/* Learn More Button */}
                    <motion.button
                      onClick={() => onPageChange('services')}
                      className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-semibold transition-all duration-300 group-hover:gap-3 mx-auto"
                      whileHover={{ x: 5 }}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Left Side - Title and Description */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1 text-center md:text-left"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 dark:from-purple-400 dark:via-blue-400 dark:to-purple-300 bg-clip-text text-transparent">
                  Our Popular Services
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Discover our most trusted solutions that have helped businesses transform their operations
                </p>
              </motion.div>

              {/* Right Side - Stacked Cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 relative"
              >
                <div className="relative space-y-4">
                  {/* CCTV Card - Top */}
                  <motion.div
                    whileHover={{ scale: 1.02, z: 10 }}
                    className="relative bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform rotate-2"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <span className="absolute -top-2 -left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                          Popular
                        </span>
                        <img 
                          src="/cctv-camera.png" 
                          alt="CCTV Security System" 
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          CCTV Security System
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Comprehensive security camera systems...
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Computer Repair Card - Middle */}
                  <motion.div
                    whileHover={{ scale: 1.02, z: 10 }}
                    className="relative bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform -rotate-1 ml-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <span className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                          Essential
                        </span>
                        <img 
                          src="/computer-repair.png" 
                          alt="Computer Repair Service" 
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          Computer Repair Service
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Professional computer and networking...
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Network Design Card - Bottom */}
                  <motion.div
                    whileHover={{ scale: 1.02, z: 10 }}
                    className="relative bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform rotate-1 mr-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <span className="absolute -top-2 -left-2 bg-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                          High-Performance
                        </span>
                        <img 
                          src="/computer-network.png" 
                          alt="Network Design & Installation" 
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          Network Design & Installation
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Professional network infrastructure...
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* View All Services Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Button
              onClick={() => onPageChange('services')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Services
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-h2 font-bold mb-4">Our Hardware Solutions</h2>
            <p className="text-body-lg text-muted-foreground leading-snug max-w-2xl mx-auto">
              Explore our carefully curated selection of high-quality hardware and accessories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 'NC001',
                name: 'TYPE-C to HDTV 8-in-1 Hub',
                price: '2,800',
                rating: 4.5,
                reviews: 45,
                badge: 'New Arrival',
                badgeColor: 'bg-primary',
                image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=600&fit=crop&auto=format&q=80',
                features: ['USB-C PD 87W', 'High-speed USB-C', '2x USB-A']
              },
              {
                id: 'NC002',
                name: 'Stylish Leather Laptop Bag',
                price: '4,499',
                rating: 4.7,
                reviews: 89,
                badge: 'Popular',
                badgeColor: 'bg-green-500',
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop&auto=format&q=80',
                features: ['Premium Leather', 'Laptop Protection', 'Multiple Colors']
              },
              {
                id: 'NC003',
                name: 'WD 8TB Purple Surveillance Drive',
                price: '18,500',
                rating: 4.8,
                reviews: 156,
                badge: 'High-Performance',
                badgeColor: 'bg-primary',
                image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&h=600&fit=crop&auto=format&q=80',
                features: ['8TB Capacity', 'SATA 6Gb/s', 'AI Surveillance Optimized']
              },
              {
                id: 'NC004',
                name: 'Cisco Catalyst 2960-X Switch',
                price: '45,000',
                rating: 4.6,
                reviews: 78,
                badge: 'Enterprise',
                badgeColor: 'bg-blue-500',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format&q=80',
                features: ['24-Port Gigabit', 'Layer 2 Switching', 'PoE+ Support']
              },
              {
                id: 'NC005',
                name: 'Dell PowerEdge R740 Server',
                price: '125,000',
                rating: 4.9,
                reviews: 234,
                badge: 'Best Seller',
                badgeColor: 'bg-orange-500',
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&auto=format&q=80',
                features: ['Dual Xeon Processors', '64GB RAM', 'Redundant PSU']
              },
              {
                id: 'NC006',
                name: 'Fortinet FortiGate 60F Firewall',
                price: '32,000',
                rating: 4.4,
                reviews: 67,
                badge: 'Security',
                badgeColor: 'bg-red-500',
                image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop&auto=format&q=80',
                features: ['Next-Gen Firewall', 'VPN Support', 'Threat Protection']
              }
            ].map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => onPageChange('hardware')}
              >
                <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <div className={`${product.badgeColor} text-white font-semibold px-3 py-1 text-xs backdrop-blur-sm bg-opacity-90 shadow-lg rounded-full`}>
                        {product.badge}
                      </div>
                    </div>
                    
                    {/* Stock Indicator */}
                    <div className="absolute top-3 right-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className="text-2xl font-bold text-primary mb-4">
                      ETB {product.price}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {product.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full group-hover:bg-primary group-hover:text-white transition-all"
                      variant="outline"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => onPageChange('hardware')}
              size="lg"
              className="px-8 py-6 text-body font-semibold bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-900"
            >
              Shop All Products
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Founder's Message Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div 
              className="lg:col-span-2 flex justify-center lg:justify-start"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <div className="relative w-full max-w-[350px] md:w-[300px] md:max-w-none lg:w-[350px]">
                <ImageWithFallback 
                  src="/dave-pic.png" 
                  alt="Dawit Seleshi, Founder and General Manager" 
                  className="w-full aspect-[3/4] object-cover rounded-b-[3rem] shadow-2xl shadow-primary/20"
                />
              </div>
            </motion.div>

            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <div className="space-y-8 text-center lg:text-left px-4 lg:px-0">
                <motion.p 
                  className="text-lg text-600 dark:text-400 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  "Welcome to Nano Computing ICT Solutions, where our passion for technology and commitment to excellence converge to create unparalleled value for our clients."
                </motion.p>
                
                <motion.p 
                  className="text-base text-gray-600 dark:text-gray-300 leading-relaxed md:block hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  "Since our inception, we have been driven by a singular vision: to be your most trusted partner in navigating the complexities of the digital world."
                </motion.p>
                
                <motion.p 
                  className="text-base text-gray-600 dark:text-gray-300 leading-relaxed md:block hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  "Our journey is one of relentless innovation, integrity, and a deep-seated belief in the power of technology to transform businesses. We are more than just a service provider; we are your strategic ally."
                </motion.p>
                
                {/* Mobile version with only 2 paragraphs */}
                <motion.p 
                  className="text-base text-gray-600 dark:text-gray-300 leading-relaxed md:hidden block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  "Since our inception, we have been driven by a singular vision: to be your most trusted partner in navigating the complexities of the digital world."
                </motion.p>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">Dawit Seleshi</p>
                  <p className="text-base sm:text-lg text-primary font-medium">Founder & General Manager</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted by Leading Companies Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative">
            <motion.div 
              className="flex space-x-12 items-center"
              animate={{ x: [0, -100 * 6] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              whileHover={{ animationPlayState: "paused" }}
              style={{ animationPlayState: "running" }}
            >
              {/* First set of logos */}
              {[
                { src: '/partner-logos/apple-logo.png', name: 'Apple' },
                { src: '/partner-logos/cisco-logo.png', name: 'Cisco' },
                { src: '/partner-logos/dahua-tech-logo.png', name: 'Dahua Technology' },
                { src: '/partner-logos/hik-vision-logo.png', name: 'Hikvision' },
                { src: '/partner-logos/hp-logo.png', name: 'HP' },
                { src: '/partner-logos/intel-logo.png', name: 'Intel' },
              ].map((partner, index) => {
                const isAppleOrDahua = partner.src.includes('apple-logo') || partner.src.includes('dahua-tech-logo');
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 flex items-center justify-center p-4 group"
                    style={{ minWidth: '120px' }}
                  >
                    <img
                      src={partner.src}
                      alt={`${partner.name} Logo`}
                      className={`h-8 w-auto object-contain opacity-70 transition-all duration-300 drop-shadow-md dark:drop-shadow-[0_4px_8px_rgba(59,130,246,0.3)] ${
                        isAppleOrDahua ? 'dark:brightness-0 dark:invert' : ''
                      }`}
                    />
                  </div>
                );
              })}
              {/* Duplicate set for seamless loop */}
              {[
                { src: '/partner-logos/apple-logo.png', name: 'Apple' },
                { src: '/partner-logos/cisco-logo.png', name: 'Cisco' },
                { src: '/partner-logos/dahua-tech-logo.png', name: 'Dahua Technology' },
                { src: '/partner-logos/hik-vision-logo.png', name: 'Hikvision' },
                { src: '/partner-logos/hp-logo.png', name: 'HP' },
                { src: '/partner-logos/intel-logo.png', name: 'Intel' },
              ].map((partner, index) => {
                const isAppleOrDahua = partner.src.includes('apple-logo') || partner.src.includes('dahua-tech-logo');
                return (
                  <div
                    key={`duplicate-${index}`}
                    className="flex-shrink-0 flex items-center justify-center p-4 group"
                    style={{ minWidth: '120px' }}
                  >
                    <img
                      src={partner.src}
                      alt={`${partner.name} Logo`}
                      className={`h-8 w-auto object-contain opacity-70 transition-all duration-300 drop-shadow-md dark:drop-shadow-[0_4px_8px_rgba(59,130,246,0.3)] ${
                        isAppleOrDahua ? 'dark:brightness-0 dark:invert' : ''
                      }`}
                    />
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ParallaxSection className="py-16 bg-primary/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h3 font-bold mb-4 tracking-tight">
              Ready to Elevate Your Technology?
            </h2>
            <p className="text-body text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join the ranks of industry leaders who've revolutionized their operations with our premium ICT solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="default" 
                  onClick={() => onPageChange('contact')}
                  className="px-6 py-3 text-sm bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-900"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Start Your Journey
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="default"
                  onClick={() => onPageChange('about')}
                  className="px-6 py-3 text-sm"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Learn About Us
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </ParallaxSection>
    </div>
  );
});

HomePage.displayName = 'HomePage';