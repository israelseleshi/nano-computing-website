import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
// import { Sparkles } from 'lucide-react'; // Unused for now
import { Navigation } from './components/Navigation';
import { HomePage } from './components/pages/HomePage';
import ServicesPage from './components/pages/ServicesPage';
import { ContactPage } from './components/pages/ContactPage';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { HardwarePage } from './components/pages/HardwarePage';
import { InsightsPage } from './components/pages/InsightsPage';
import { AboutPage } from './components/pages/AboutPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { AuthPage } from './components/pages/AuthPage';
import { AdminDashboard } from './components/pages/AdminDashboard';
// import { PageType } from './types'; // Unused for now

// Page transition variants - more fluid and distinct
const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98,
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 30
    }
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 30,
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "anticipate"
    }
  }
};

// Footer animation variants
const footerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const footerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const linkVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

// Route-aware Navigation Component
function NavigationWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Don't show navigation on admin dashboard
  if (location.pathname === '/admin') {
    return null;
  }
  
  return <Navigation currentPage={location.pathname} onPageChange={(page) => {
    switch (page) {
      case 'home':
        navigate('/');
        break;
      case 'about':
        navigate('/about');
        break;
      case 'services':
        navigate('/services');
        break;
      case 'hardware':
        navigate('/hardware');
        break;
      case 'blog':
        navigate('/blog');
        break;
      case 'contact':
        navigate('/contact');
        break;
      case 'auth':
        navigate('/auth');
        break;
      default:
        if (page.startsWith('product-')) {
          navigate(`/product/${page.replace('product-', '')}`);
        } else {
          navigate('/');
        }
    }
  }} />;
}

// Page wrapper with animations
function AnimatedPage({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="relative min-h-screen"
        style={{ position: 'relative' }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}

function AppContent(): React.JSX.Element {
  const { theme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect admin users to dashboard after login
  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin' && location.pathname === '/auth') {
      navigate('/admin');
    }
  }, [isAuthenticated, user, location.pathname, navigate]);

  return (
      <motion.div 
        className="min-h-screen bg-background text-foreground overflow-x-hidden no-scrollbar relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <NavigationWrapper />
        
        <Routes>
          <Route path="/" element={
            <AnimatedPage>
              <HomePage onPageChange={(page) => {
                switch (page) {
                  case 'about': navigate('/about'); break;
                  case 'services': navigate('/services'); break;
                  case 'hardware': navigate('/hardware'); break;
                  case 'blog': navigate('/blog'); break;
                  case 'contact': navigate('/contact'); break;
                  case 'auth': navigate('/auth'); break;
                  default: 
                    if (page.startsWith('product-')) {
                      navigate(`/product/${page.replace('product-', '')}`);
                    }
                }
              }} />
            </AnimatedPage>
          } />
          
          <Route path="/about" element={
            <AnimatedPage>
              <AboutPage onPageChange={(page) => {
                switch (page) {
                  case 'home': navigate('/'); break;
                  case 'services': navigate('/services'); break;
                  case 'hardware': navigate('/hardware'); break;
                  case 'blog': navigate('/blog'); break;
                  case 'contact': navigate('/contact'); break;
                  case 'auth': navigate('/auth'); break;
                  default: 
                    if (page.startsWith('product-')) {
                      navigate(`/product/${page.replace('product-', '')}`);
                    }
                }
              }} />
            </AnimatedPage>
          } />
          
          <Route path="/services" element={
            <AnimatedPage>
              <ServicesPage />
            </AnimatedPage>
          } />
          
          <Route path="/hardware" element={
            <AnimatedPage>
              <HardwarePage onPageChange={(page) => {
                switch (page) {
                  case 'home': navigate('/'); break;
                  case 'about': navigate('/about'); break;
                  case 'services': navigate('/services'); break;
                  case 'blog': navigate('/blog'); break;
                  case 'contact': navigate('/contact'); break;
                  case 'auth': navigate('/auth'); break;
                  default: 
                    if (page.startsWith('product-')) {
                      navigate(`/product/${page.replace('product-', '')}`);
                    }
                }
              }} />
            </AnimatedPage>
          } />
          
          <Route path="/blog" element={
            <AnimatedPage>
              <InsightsPage onPageChange={(page) => {
                switch (page) {
                  case 'home': navigate('/'); break;
                  case 'about': navigate('/about'); break;
                  case 'services': navigate('/services'); break;
                  case 'hardware': navigate('/hardware'); break;
                  case 'contact': navigate('/contact'); break;
                  case 'auth': navigate('/auth'); break;
                  default: 
                    if (page.startsWith('product-')) {
                      navigate(`/product/${page.replace('product-', '')}`);
                    }
                }
              }} />
            </AnimatedPage>
          } />
          
          <Route path="/contact" element={
            <AnimatedPage>
              <ContactPage onPageChange={(page) => {
                switch (page) {
                  case 'home': navigate('/'); break;
                  case 'about': navigate('/about'); break;
                  case 'services': navigate('/services'); break;
                  case 'hardware': navigate('/hardware'); break;
                  case 'blog': navigate('/blog'); break;
                  case 'auth': navigate('/auth'); break;
                  default: 
                    if (page.startsWith('product-')) {
                      navigate(`/product/${page.replace('product-', '')}`);
                    }
                }
              }} />
            </AnimatedPage>
          } />
          
          <Route path="/auth" element={
            <AnimatedPage>
              <AuthPage />
            </AnimatedPage>
          } />
          
          <Route path="/product/:id" element={
            <AnimatedPage>
              <ProductDetailPage 
                productId={location.pathname} 
                onPageChange={(page) => {
                  switch (page) {
                    case 'home': navigate('/'); break;
                    case 'about': navigate('/about'); break;
                    case 'services': navigate('/services'); break;
                    case 'hardware': navigate('/hardware'); break;
                    case 'blog': navigate('/blog'); break;
                    case 'contact': navigate('/contact'); break;
                    case 'auth': navigate('/auth'); break;
                    default: 
                      if (page.startsWith('product-')) {
                        navigate(`/product/${page.replace('product-', '')}`);
                      }
                  }
                }} 
              />
            </AnimatedPage>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard 
                onLogout={() => {
                  logout();
                  navigate('/');
                }}
                onBackToHome={() => navigate('/')}
              />
            </ProtectedRoute>
          } />
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* Enhanced Footer with Premium Animations - Hide for admin dashboard */}
        {location.pathname !== '/admin' && (
          <motion.footer 
          className="bg-muted/30 border-t border-border/50 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={footerVariants}
          style={{ position: 'relative' }}
        >
          {/* Animated Background Elements */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              background: [
                "radial-gradient(600px circle at 0% 0%, var(--color-primary), transparent)",
                "radial-gradient(600px circle at 100% 100%, var(--color-primary), transparent)",
                "radial-gradient(600px circle at 0% 0%, var(--color-primary), transparent)",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative"
            variants={footerVariants}
          >
            <motion.div className="flex flex-col md:flex-row justify-start items-start gap-12 md:gap-24 lg:gap-40"
              variants={footerVariants}
            >
              {/* Company Section */}
              <motion.div 
                className="space-y-3"
                variants={footerItemVariants}
              >
                <motion.div 
                  className="flex flex-col items-start space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div>
                    <img src="/logo.jpg" alt="Nano Computing" className={`w-12 h-12 object-cover rounded-lg transition-all duration-300 ${
                      theme === 'dark' ? 'brightness-0 invert' : ''
                    }`} />
                  </div>
                  <div>
                    <div className="text-sm font-bold whitespace-nowrap">Nano Computing ICT Solutions</div>
                    <div className="text-xs text-muted-foreground">Your Integrated Safety Partner</div>
                  </div>
                </motion.div>
                <motion.p 
                  className="text-xs text-muted-foreground leading-snug"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                </motion.p>
              </motion.div>
              
              {/* Services Section */}
              <motion.div 
                className="space-y-3"
                variants={footerItemVariants}
              >
                <h3 className="text-body font-semibold text-foreground">Services</h3>
                <motion.div 
                  className="space-y-1.5 text-sm"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05
                      }
                    }
                  }}
                >
                  {[
                    'Ecosystem Management',
                    'Network Architecture', 
                    'Surveillance Systems',
                    'Data Recovery'
                  ].map((service, index) => (
                    <motion.button 
                      key={index}
                      onClick={() => navigate('/services')}
                      className="block text-body text-muted-foreground hover:text-primary transition-colors duration-200"
                      variants={linkVariants}
                      whileHover={{ 
                        x: 6, 
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {service}
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
              
              {/* Company Section */}
              <motion.div 
                className="space-y-3"
                variants={footerItemVariants}
              >
                <h3 className="text-body font-semibold text-foreground">Company</h3>
                <motion.div 
                  className="space-y-1.5 text-sm"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05
                      }
                    }
                  }}
                >
                  {[
                    { label: 'About Us', page: '/about' },
                    { label: 'Blog', page: '/blog' },
                    { label: 'Shop', page: '/hardware' },
                    { label: 'Contact', page: '/contact' }
                  ].map((item, index) => (
                    <motion.button 
                      key={index}
                      onClick={() => navigate(item.page)}
                      className="block text-body text-muted-foreground hover:text-primary transition-colors duration-200"
                      variants={linkVariants}
                      whileHover={{ 
                        x: 6, 
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>

              {/* Others Section */}
              <motion.div 
                className="space-y-3"
                variants={footerItemVariants}
              >
                <h3 className="text-body font-semibold text-foreground">Others</h3>
                <motion.div 
                  className="space-y-1.5 text-sm"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05
                      }
                    }
                  }}
                >
                  {['Privacy Policy', 'Terms of Service', 'Security'].map((item, index) => (
                    <motion.button 
                      key={index}
                      className="block text-body text-muted-foreground hover:text-primary transition-colors duration-200"
                      variants={linkVariants}
                      whileHover={{ 
                        x: 6, 
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item}
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
              
            </motion.div>
            
            {/* Footer Bottom */}
            <motion.div 
              className="border-t border-border/50 mt-8 pt-6 flex flex-col md:flex-row justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.p className="text-body text-muted-foreground text-center"
                whileHover={{ 
                  color: "var(--color-primary)",
                  transition: { duration: 0.2 }
                }}
              >
                2025 Nano Computing ICT Solutions. All Rights Reserved. | Your Integrated Safety Partner
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.footer>
        )}
        
        {/* Enhanced Interactive Elements */}
      </motion.div>
  );
}

export default function App(): React.JSX.Element {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}