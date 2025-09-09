import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Easing } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
// import { Button } from './ui/button'; // Unused for now
import { useTheme } from './ThemeProvider';
import { useAuth } from './AuthProvider';
import { MobileNavigation } from './MobileNavigation';
import { 
  Menu,
  X,
  Sun, 
  Moon
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps): React.JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'hardware', label: 'Shop', path: '/hardware' },
    { id: 'blog', label: 'Blog', path: '/blog' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'contact', label: 'Contact', path: '/contact' },
  ];

  // Dynamic auth item based on user state
  const authItem = isAuthenticated && user?.role === 'admin' 
    ? { id: 'admin', label: 'Admin', path: '/admin' }
    : { id: 'auth', label: 'Login', path: '/auth' };

  // Navigation animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94] as Easing,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" as Easing }
    }
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background border-b border-border/50 shadow-lg' 
          : 'bg-background border-b border-border/40 shadow-sm'
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="w-full px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          {/* Enhanced Logo */}
          <motion.button 
            className="flex items-center space-x-3 cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPageChange('home')}
          >
            <img 
              src="/logo.jpg" 
              alt="Nano Computing Logo" 
              className="h-12 w-12 rounded-full object-cover dark:brightness-0 dark:invert"
            />
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="block"
            >
              <div className="text-body font-bold tracking-tight leading-tight overflow-hidden text-ellipsis max-w-[160px] sm:max-w-[180px] md:max-w-none">
                <div className="text-xs sm:text-sm leading-tight whitespace-nowrap">Nano Computing ICT Solutions</div>
              </div>
            </motion.div>
          </motion.button>

          {/* Desktop Navigation - Main Items Centered */}
          <motion.div 
            className="hidden lg:flex items-center space-x-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.4
                }
              }
            }}
          >
            {navItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
                    location.pathname === item.path
                      ? 'text-primary'
                      : 'text-foreground/80 hover:text-primary'
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop Theme Toggle & Login Button */}
          <motion.div 
            className="flex items-center space-x-4"
            variants={itemVariants}
          >
            {/* Desktop Theme Toggle - Clean Icon */}
            <motion.button
              className="hidden lg:block p-3 rounded-lg hover:bg-transparent transition-all duration-200"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)' }}
            >
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, rotate: 180, scale: 0 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -180, scale: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <Moon className="w-6 h-6 text-slate-700 dark:text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, rotate: -180, scale: 0 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 180, scale: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <Sun className="w-6 h-6 text-slate-700 dark:text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Desktop Login Button */}
            <motion.div 
              className="hidden lg:block"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={authItem.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                    location.pathname === authItem.path
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {authItem.label}
                  {location.pathname === authItem.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </motion.div>
            </motion.div>

            {/* Mobile Menu Button - Clean Icon */}
            <motion.button
              className="lg:hidden p-3 rounded-lg hover:bg-transparent transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)' }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: 180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -180 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-slate-700 dark:text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 180 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-slate-700 dark:text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </motion.nav>
  );
}