import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface AboutPageProps {
  onPageChange: (page: string) => void;
}

export function AboutPage({ onPageChange }: AboutPageProps) {
  const values = [
    {
      icon: Target,
      title: 'Reliability',
      description: 'Ensuring seamless operations and consistent performance for your critical ICT infrastructure.',
    },
    {
      icon: Shield,
      title: 'Security Excellence',
      description: 'Implementing robust cybersecurity measures to safeguard your data and digital assets.',
    },
    {
      icon: Zap,
      title: 'Technological Advancement',
      description: 'Leveraging the latest innovations to drive efficiency and competitive advantage.',
    },
    {
      icon: Users,
      title: 'Collaborative Partnership',
      description: 'Working closely with you to understand your unique challenges and deliver tailored ICT solutions.',
    },
  ];

  const team = [
    {
      name: 'Abebe Tadesse',
      role: 'Chief Technology Officer',
      expertise: 'Enterprise Architecture & Cloud Solutions',
      experience: '15+ years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    },
    {
      name: 'Meron Haile',
      role: 'Lead Security Architect',
      expertise: 'Cybersecurity & Risk Management',
      experience: '12+ years',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    },
    {
      name: 'Dawit Bekele',
      role: 'Infrastructure Director',
      expertise: 'Network Design & Data Center Operations',
      experience: '18+ years',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    },
    {
      name: 'Hanan Mohammed',
      role: 'Development Manager',
      expertise: 'Custom Software & Web Applications',
      experience: '10+ years',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    },
    {
      name: 'Samuel Kebede',
      role: 'Senior Network Engineer',
      expertise: 'Network Infrastructure & Cloud Integration',
      experience: '14+ years',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    },
    {
      name: 'Lensa Girma',
      role: 'Lead UX/UI Designer',
      expertise: 'User Experience & Interface Design',
      experience: '9+ years',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    },
  ];

  const achievements = [
    'ISO 27001 Certified Security Management',
    'Microsoft Gold Partner Status',
    'AWS Advanced Consulting Partner',
    'Cisco Premier Partner',
    '500+ Successful Project Deployments',
    '24/7 Global Support Coverage',
  ];

  const clientLogos = [
    '/partner-logos/apple-logo.png',
    '/partner-logos/cisco-logo.png',
    '/partner-logos/dahua-tech-logo.png',
    '/partner-logos/hik-vision-logo.png',
    '/partner-logos/hp-logo.png',
    '/partner-logos/intel-logo.png',
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden min-h-[80vh] flex items-center bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-black/95 dark:from-slate-900/98 dark:via-blue-950/95 dark:to-black/98">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20 light:from-white/60 light:via-white/20 light:to-white/40" />
        
        {/* Content with enhanced visibility */}
        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="space-y-6">
                <motion.h1 
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-white drop-shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                >
                  The Architects of{' '}
                  <span className="text-blue-400 drop-shadow-lg">
                    Digital Trust
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto px-4 drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.9 }}
                >
                  Founded on the principle that technology should empower, not complicate. We are the strategic partners who transform complex challenges into elegant solutions.
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-col gap-3 justify-center items-center max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
              >
                <Button 
                  size="lg"
                  className="w-full px-8 py-4 text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-2xl hover:shadow-blue-600/30 transition-all duration-300 group backdrop-blur-sm border border-blue-500/30"
                  onClick={() => onPageChange('contact')}
                >
                  Partner With Us
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg" 
                  className="w-full px-8 py-4 text-base font-semibold border-2 border-blue-400/60 text-white hover:bg-blue-600/20 backdrop-blur-sm transition-all duration-300"
                  onClick={() => onPageChange('services')}
                >
                  View Our Services
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder's Message Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Mobile Layout */}
            <div className="lg:hidden text-center space-y-6">
              <div className="relative flex justify-center">
                <div className="relative w-[60%] max-w-[200px] aspect-[3/4]">
                  <ImageWithFallback 
                    src="/dave-pic.png" 
                    alt="Dawit Seleshi, Founder and General Manager" 
                    className="w-full h-full object-cover rounded-b-[2rem] shadow-lg"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">Dawit Seleshi</h3>
                <p className="text-base text-primary font-medium">Founder & General Manager</p>
              </div>
              <div className="px-4">
                <p className="text-sm text-muted-foreground leading-relaxed text-center">
                  "We founded Nano Computing on a simple, yet powerful principle: to transform complex technological challenges into elegant, seamless solutions. Our mission is to be more than just a service provider; we are your strategic partner in navigating the digital frontier, ensuring that your technology infrastructure is not just a utility, but a catalyst for growth and innovation."
                </p>
              </div>
              <div className="pt-4">
                <Button 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                  onClick={() => onPageChange('services')}
                >
                  Explore Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Desktop Layout */}
            <div className="hidden lg:block relative flex justify-center">
              <div className="relative w-[300px] h-[380px] lg:w-[350px] lg:h-[440px]">
                <ImageWithFallback 
                  src="/dave-pic.png" 
                  alt="Dawit Seleshi, Founder and General Manager" 
                  className="w-full h-full object-cover rounded-b-[3rem]"
                />
              </div>
            </div>
            <div className="hidden lg:block space-y-8">
              <div className="space-y-4">
                <h2 className="text-h2 font-bold tracking-tight">A Message from the Founder</h2>
                <p className="text-body-lg text-muted-foreground leading-snug">
                  "We founded Nano Computing on a simple, yet powerful principle: to transform complex technological challenges into elegant, seamless solutions. Our mission is to be more than just a service provider; we are your strategic partner in navigating the digital frontier, ensuring that your technology infrastructure is not just a utility, but a catalyst for growth and innovation."
                </p>
              </div>
              <div>
                <p className="text-h4 font-semibold text-foreground">Dawit Seleshi</p>
                <p className="text-body text-primary">Founder & General Manager</p>
              </div>
              <div className="mt-6">
                <Button 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                  onClick={() => onPageChange('services')}
                >
                  Explore Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">Our Core Values</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              The principles that guide every decision, every solution, and every partnership we form.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="glass-effect p-6 text-center border-0 shadow-lg hover:shadow-xl transition-all duration-500 group">
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                      <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">Meet Our Experts</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              A diverse team of seasoned professionals united by a passion for technological excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="glass-effect p-6 text-center border-0 shadow-lg hover:shadow-xl transition-all duration-500 group">
                <div className="space-y-4">
                  <div className="w-20 h-20 mx-auto overflow-hidden rounded-full bg-primary/10 border-2 border-primary/20 shadow-md">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-primary font-medium">{member.role}</p>
                    <p className="text-xs text-muted-foreground opacity-80">{member.expertise}</p>
                    <p className="text-xs text-muted-foreground font-medium">{member.experience}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-12 overflow-hidden">
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
              {clientLogos.map((logo, index) => {
                const isAppleOrDahua = logo.includes('apple-logo') || logo.includes('dahua-tech-logo');
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 flex items-center justify-center p-4 group"
                    style={{ minWidth: '120px' }}
                  >
                    <ImageWithFallback
                      src={logo}
                      alt={`Client Logo ${index + 1}`}
                      className={`h-8 w-auto object-contain opacity-70 transition-all duration-300 drop-shadow-md dark:drop-shadow-[0_4px_8px_rgba(59,130,246,0.3)] ${
                        isAppleOrDahua ? 'dark:brightness-0 dark:invert' : ''
                      }`}
                    />
                  </div>
                );
              })}
              {/* Duplicate set for seamless loop */}
              {clientLogos.map((logo, index) => {
                const isAppleOrDahua = logo.includes('apple-logo') || logo.includes('dahua-tech-logo');
                return (
                  <div
                    key={`duplicate-${index}`}
                    className="flex-shrink-0 flex items-center justify-center p-4 group"
                    style={{ minWidth: '120px' }}
                  >
                    <ImageWithFallback
                      src={logo}
                      alt={`Client Logo ${index + 1}`}
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

    </div>
  );
}
