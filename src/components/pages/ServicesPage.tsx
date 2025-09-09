import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Wrench, Network, Lock, Clock } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  technologies?: string[];
  icon: any;
}

export default function ServicesPage() {

  const services: Service[] = [
    {
      id: 'cctv',
      title: 'CCTV Security System',
      description: 'Comprehensive security camera systems to protect your business and residential properties.',
      features: [
        'Complete facility security coverage',
        'Protection from burglary and damages',
        'Professional installation and setup',
        'Residential and commercial solutions',
        '24/7 monitoring and surveillance'
      ],
      image: '/cctv-camera.png',
      icon: Shield
    },
    {
      id: 'computer-repair',
      title: 'Computer Repair Service',
      description: 'Professional computer and networking services for residential and business customers with expert technicians.',
      features: [
        'Comprehensive setup and troubleshooting support',
        'Maintenance and training across all systems',
        'Onsite repair services at your location',
        'Expert technicians with industry experience',
        'Support for wide variety of computer systems'
      ],
      image: '/computer-repair.png',
      icon: Wrench
    },
    {
      id: 'network-design',
      title: 'Computer Network Design and Installation',
      description: 'Professional network infrastructure design and installation to enhance your workforce productivity.',
      features: [
        'Business-critical application optimization',
        'Secure internet access solutions',
        'Mobile workforce connectivity',
        'Guest Wi-Fi network setup',
        'Secure and accessible network design'
      ],
      image: '/computer-network.png',
      icon: Network
    },
    {
      id: 'time-attendance',
      title: 'Time & Attendance System',
      description: 'Modern time tracking and attendance management systems for accurate workforce monitoring.',
      features: [
        'Accurate employee work hour tracking',
        'Sick leave and time-off monitoring',
        'Employee performance analytics',
        'Modern digital attendance solutions',
        'Comprehensive reporting systems'
      ],
      image: '/time-attendance.png',
      icon: Clock
    },
    {
      id: 'door-access',
      title: 'Door Access Control',
      description: 'Advanced access control systems for secure entry management and monitoring.',
      features: [
        'Biometric authentication systems',
        'Remote access management and control',
        'Real-time monitoring and alerts',
        'Integration with existing security systems',
        'Scalable solutions for any facility size'
      ],
      image: '/door-access-control-systems.png',
      icon: Lock
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-h2 font-bold mb-6">
            Our Services
          </h2>
          <p className="max-w-3xl mx-auto text-body-lg text-muted-foreground">
            We offer a comprehensive suite of ICT solutions designed to secure and streamline your operations. Explore our professional services below.
          </p>
        </motion.div>

        <div className="space-y-16 lg:space-y-24">
          {services.map((service, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {/* Desktop View */}
                <div className="hidden lg:block">
                  <div className={`flex items-center gap-16 ${isReversed ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Image Section */}
                    <div className="flex-1">
                      <motion.div 
                        className="relative"
                        animate={{ 
                          y: [0, -15, 0] 
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2
                        }}
                      >
                        {service.image.endsWith('.mp4') ? (
                          <video
                            src={service.image}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-[450px] object-cover transition-transform duration-500 hover:scale-105"
                          />
                        ) : (
                          <img 
                            src={service.image} 
                            alt={service.title} 
                            className={`w-full h-[450px] transition-transform duration-500 hover:scale-105 ${
                              service.id === 'door-access' ? 'object-contain' : 'object-cover'
                            }`}
                          />
                        )}
                      </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <service.icon className="w-8 h-8 text-primary flex-shrink-0" />
                          <h3 className="text-h3 font-bold leading-tight text-foreground">
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-body-lg text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      <div className="space-y-4 pt-4">
                        <div className="grid grid-cols-1 gap-3">
                          {service.features.map((feature, featureIndex) => (
                            <motion.div 
                              key={featureIndex} 
                              className="flex items-start gap-3"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-body text-muted-foreground leading-snug">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile & Tablet View */}
                <div className="lg:hidden">
                  <motion.div 
                    className="md:glass-effect md:p-6 space-y-4 md:border-0 md:shadow-2xl border-b border-border/10 pb-6 mb-6 last:border-b-0 last:mb-0"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image Section */}
                    <div className="relative overflow-hidden h-64 md:h-80">
                      {service.image.endsWith('.mp4') ? (
                        <video
                          src={service.image}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className={`w-full h-full transition-transform duration-500 ${
                            service.id === 'door-access' ? 'object-contain' : 'object-cover'
                          }`}
                        />
                      ) : (
                        <motion.div 
                          className="relative"
                          animate={{ 
                            y: [0, -8, 0] 
                          }}
                          transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <img
                            src={service.image}
                            alt={service.title}
                            className={`w-full h-full transition-transform duration-500 ${
                              service.id === 'door-access' ? 'object-contain' : 'object-cover'
                            }`}
                          />
                        </motion.div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <service.icon className="w-5 h-5 text-primary flex-shrink-0" />
                          <h3 className="text-lg md:text-xl font-bold leading-tight text-foreground">
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-sm md:text-base text-muted-foreground leading-snug">
                          {service.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="space-y-1.5 pt-2">
                        <div className="grid grid-cols-1 gap-1.5">
                          {service.features.slice(0, 3).map((feature, featureIndex) => (
                            <motion.div 
                              key={featureIndex} 
                              className="flex items-start gap-2"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-xs md:text-sm text-muted-foreground leading-tight">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}