import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Server, ShoppingCart, BookOpen, Info, Mail, Sun, Moon, Shield } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useAuth } from './AuthProvider';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'services', label: 'Services', icon: Server },
  { id: 'hardware', label: 'Shop', icon: ShoppingCart },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'about', label: 'About', icon: Info },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  currentPage,
  onPageChange,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();

  // Dynamic auth item based on user state
  const authItem = isAuthenticated && user?.role === 'admin' 
    ? { id: 'admin-dashboard', label: 'Admin', icon: Shield }
    : { id: 'auth', label: 'Login', icon: Shield };

  // Lock body scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden bg-background/95 backdrop-blur-md border-b border-border/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Full-Screen Overlay with Slide Animation */}
          <motion.div
            className="absolute inset-0 bg-background/95 backdrop-blur-md"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8
            }}
          >
            {/* Header with Theme Toggle and Close Button - Clean Icons */}
            <div className="flex items-center justify-between p-6 border-b border-border/30">
              {/* Theme Toggle - Clean Icon */}
              <motion.button
                onClick={toggleTheme}
                className="p-3 rounded-lg hover:bg-transparent flex items-center justify-center transition-all duration-200"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9, backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)' }}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  {theme === 'light' ? (
                    <motion.div
                      key="moon"
                      initial={{ opacity: 0, rotate: 180, scale: 0 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -180, scale: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <Moon className="w-6 h-6 text-slate-700 dark:text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ opacity: 0, rotate: -180, scale: 0 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 180, scale: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <Sun className="w-6 h-6 text-slate-700 dark:text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Close Button - Clean Icon */}
              <motion.button
                onClick={onClose}
                className="p-3 rounded-lg hover:bg-transparent flex items-center justify-center transition-all duration-200"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9, backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)' }}
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <X className="w-6 h-6 text-slate-700 dark:text-white" />
              </motion.button>
            </div>

            {/* Navigation Links with Stacked Style and Enhanced Spacing */}
            <div className="flex-1 px-6 py-10 flex flex-col">
              <motion.div 
                className="space-y-6 flex-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {navItems.map((item, index) => {
                  const isActive = currentPage === item.id;
                  const Icon = item.icon;
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center space-x-5 px-6 py-5 rounded-xl text-left transition-all duration-300 relative group ${
                        isActive
                          ? 'text-primary'
                          : 'hover:bg-primary/5 text-foreground hover:text-primary'
                      }`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 * index + 0.5, duration: 0.4, ease: "easeOut" }}
                      whileHover={{ scale: 1.02, x: 8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Stacked Style - Primary Color Line */}
                      <motion.div
                        className={`absolute left-0 top-0 bottom-0 bg-primary rounded-r-full transition-all duration-300 ${
                          isActive ? 'w-1.5' : 'w-0 group-hover:w-1'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? 6 : 0 }}
                        whileHover={{ width: isActive ? 8 : 4 }}
                      />
                      
                      {/* Icon without box */}
                      <Icon className={`w-6 h-6 transition-all duration-300 ${
                        isActive 
                          ? 'text-primary' 
                          : 'text-muted-foreground group-hover:text-primary'
                      }`} />
                      
                      {/* Enhanced Typography */}
                      <div className="flex-1">
                        <div className={`text-lg font-bold transition-all duration-300 ${
                          isActive 
                            ? 'text-primary' 
                            : 'text-foreground group-hover:text-primary'
                        }`}>
                          {item.label}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Login Button at Bottom */}
              <motion.div
                className="mt-8 pt-6 border-t border-border/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <motion.button
                  onClick={() => handleNavClick(authItem.id)}
                  className={`w-full flex items-center space-x-5 px-6 py-5 rounded-xl text-left transition-all duration-300 relative group ${
                    currentPage === authItem.id
                      ? 'text-primary'
                      : 'hover:bg-primary/5 text-foreground hover:text-primary'
                  }`}
                  whileHover={{ scale: 1.02, x: 8 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Stacked Style - Primary Color Line */}
                  <motion.div
                    className={`absolute left-0 top-0 bottom-0 bg-primary rounded-r-full transition-all duration-300 ${
                      currentPage === authItem.id ? 'w-1.5' : 'w-0 group-hover:w-1'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: currentPage === authItem.id ? 6 : 0 }}
                    whileHover={{ width: currentPage === authItem.id ? 8 : 4 }}
                  />
                  
                  {/* Icon without box */}
                  <authItem.icon className={`w-6 h-6 transition-all duration-300 ${
                    currentPage === authItem.id 
                      ? 'text-primary' 
                      : 'text-muted-foreground group-hover:text-primary'
                  }`} />
                  
                  {/* Enhanced Typography */}
                  <div className="flex-1">
                    <div className={`text-lg font-bold transition-all duration-300 ${
                      currentPage === authItem.id 
                        ? 'text-primary' 
                        : 'text-foreground group-hover:text-primary'
                    }`}>
                      {authItem.label}
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};