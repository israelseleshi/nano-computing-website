import { motion } from 'framer-motion';
import { Star, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeaturedProductsSectionProps {
  onPageChange: (page: string) => void;
}

export const FeaturedProductsSection = ({ onPageChange }: FeaturedProductsSectionProps) => {
  const products = [
    {
      id: 'NC001',
      name: 'TYPE-C to HDTV 8-in-1 Hub',
      price: '2,800',
      rating: 4.5,
      reviews: 45,
      badge: 'New Arrival',
      badgeColor: 'bg-primary',
      image:
        'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['USB-C PD 87W', 'High-speed USB-C', '2x USB-A'],
    },
    {
      id: 'NC002',
      name: 'Stylish Leather Laptop Bag',
      price: '4,499',
      rating: 4.7,
      reviews: 89,
      badge: 'Popular',
      badgeColor: 'bg-green-500',
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['Premium Leather', 'Laptop Protection', 'Multiple Colors'],
    },
    {
      id: 'NC003',
      name: 'WD 8TB Purple Surveillance Drive',
      price: '18,500',
      rating: 4.8,
      reviews: 156,
      badge: 'High-Performance',
      badgeColor: 'bg-primary',
      image:
        'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['8TB Capacity', 'SATA 6Gb/s', 'AI Surveillance Optimized'],
    },
    {
      id: 'NC004',
      name: 'Cisco Catalyst 2960-X Switch',
      price: '45,000',
      rating: 4.6,
      reviews: 78,
      badge: 'Enterprise',
      badgeColor: 'bg-blue-500',
      image:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['24-Port Gigabit', 'Layer 2 Switching', 'PoE+ Support'],
    },
    {
      id: 'NC005',
      name: 'Dell PowerEdge R740 Server',
      price: '125,000',
      rating: 4.9,
      reviews: 234,
      badge: 'Best Seller',
      badgeColor: 'bg-orange-500',
      image:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['Dual Xeon Processors', '64GB RAM', 'Redundant PSU'],
    },
    {
      id: 'NC006',
      name: 'Fortinet FortiGate 60F Firewall',
      price: '32,000',
      rating: 4.4,
      reviews: 67,
      badge: 'Security',
      badgeColor: 'bg-red-500',
      image:
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop&auto=format&q=80',
      features: ['Next-Gen Firewall', 'VPN Support', 'Threat Protection'],
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-left mb-16"
        >
          <h2 className="text-h2 font-bold mb-4">Our Hardware Solutions</h2>
          <p className="text-body-lg text-muted-foreground leading-snug max-w-2xl">
            Explore our carefully curated selection of high-quality hardware and accessories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product, index) => (
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
                    <div
                      className={`${product.badgeColor} text-white font-semibold px-3 py-1 text-xs backdrop-blur-sm bg-opacity-90 shadow-lg rounded-full`}
                    >
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

                  <div className="text-2xl font-bold text-primary mb-4">ETB {product.price}</div>

                  <div className="space-y-2 mb-4">
                    {product.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center text-sm text-muted-foreground"
                      >
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
  );
};
