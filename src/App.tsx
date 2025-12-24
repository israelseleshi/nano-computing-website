import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
// import { Sparkles } from 'lucide-react'; // Unused for now
import { Navigation } from './components/common/Navigation';
import { HomePage } from './components/pages/Home/HomePage';
import ServicesPage from './components/pages/Services/ServicesPage';
import { ContactPage } from './components/pages/Contact/ContactPage';
import { ThemeProvider, useTheme } from './providers/ThemeProvider';
import { AuthProvider } from './providers/AuthProvider';
import ShopPage from './components/pages/Shop/ShopPage';
import BlogPage from './components/pages/Blog/BlogPage';
import { AboutPage } from './components/pages/About/AboutPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
// import { PageType } from './types'; // Unused for now

// Page transition variants - more fluid and distinct
const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 30,
    },
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 30,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'anticipate',
    },
  },
};

// Footer animation variants
const footerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const footerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

// Route-aware Navigation Component
function NavigationWrapper() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Navigation
      currentPage={location.pathname}
      onPageChange={(page) => {
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
            navigate('/shop');
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
      }}
    />
  );
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

// Product Detail Page Wrapper to handle URL params
function ProductDetailPageWrapper() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <ProductDetailPage
      productId={id || ''}
      onPageChange={(page) => {
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
            navigate('/shop');
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
            }
        }
      }}
    />
  );
}

// Theme-aware wrapper component
function ThemeAwareContent(): React.JSX.Element {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen bg-background text-foreground overflow-x-hidden no-scrollbar relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <NavigationWrapper />

      <Routes>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <HomePage
                onPageChange={(page) => {
                  switch (page) {
                    case 'about':
                      navigate('/about');
                      break;
                    case 'services':
                      navigate('/services');
                      break;
                    case 'hardware':
                      navigate('/shop');
                      break;
                    case 'blog':
                      navigate('/blog');
                      break;
                    case 'contact':
                      navigate('/contact');
                      break;
                    default:
                      if (page.startsWith('product-')) {
                        navigate(`/product/${page.replace('product-', '')}`);
                      }
                  }
                }}
              />
            </AnimatedPage>
          }
        />

        <Route
          path="/about"
          element={
            <AnimatedPage>
              <AboutPage
                onPageChange={(page) => {
                  switch (page) {
                    case 'home':
                      navigate('/');
                      break;
                    case 'services':
                      navigate('/services');
                      break;
                    case 'hardware':
                      navigate('/shop');
                      break;
                    case 'blog':
                      navigate('/blog');
                      break;
                    case 'contact':
                      navigate('/contact');
                      break;
                    default:
                      if (page.startsWith('product-')) {
                        navigate(`/product/${page.replace('product-', '')}`);
                      }
                  }
                }}
              />
            </AnimatedPage>
          }
        />

        <Route
          path="/services"
          element={
            <AnimatedPage>
              <ServicesPage />
            </AnimatedPage>
          }
        />

        <Route
          path="/shop"
          element={
            <AnimatedPage>
              <ShopPage
                onPageChange={(page: string) => {
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
                      }
                  }
                }}
              />
            </AnimatedPage>
          }
        />

        <Route
          path="/blog"
          element={
            <AnimatedPage>
              <BlogPage
                onPageChange={(page: string) => {
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
                      navigate('/shop');
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
                      }
                  }
                }}
              />
            </AnimatedPage>
          }
        />

        <Route
          path="/contact"
          element={
            <AnimatedPage>
              <ContactPage
                onPageChange={(page) => {
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
                      navigate('/shop');
                      break;
                    case 'blog':
                      navigate('/blog');
                      break;
                    case 'auth':
                      navigate('/auth');
                      break;
                    default:
                      if (page.startsWith('product-')) {
                        navigate(`/product/${page.replace('product-', '')}`);
                      }
                  }
                }}
              />
            </AnimatedPage>
          }
        />

        <Route
          path="/insights"
          element={
            <AnimatedPage>
              <BlogPage
                onPageChange={(page: string) => {
                  switch (page) {
                    case 'home':
                      navigate('/');
                      break;
                    case 'services':
                      navigate('/services');
                      break;
                    case 'hardware':
                      navigate('/shop');
                      break;
                    case 'about':
                      navigate('/about');
                      break;
                    case 'contact':
                      navigate('/contact');
                      break;
                    default:
                      if (page.startsWith('product-')) {
                        navigate(`/product/${page.replace('product-', '')}`);
                      }
                  }
                }}
              />
            </AnimatedPage>
          }
        />

        <Route
          path="/product/:id"
          element={
            <AnimatedPage>
              <ProductDetailPageWrapper />
            </AnimatedPage>
          }
        />

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Enhanced Footer with Premium Animations */}
      {
        <motion.footer
          className="bg-muted/30 border-t border-border/50 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={footerVariants}
          style={{ position: 'relative' }}
        >
          {/* Animated Background Elements */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              background: [
                'radial-gradient(600px circle at 0% 0%, var(--color-primary), transparent)',
                'radial-gradient(600px circle at 100% 100%, var(--color-primary), transparent)',
                'radial-gradient(600px circle at 0% 0%, var(--color-primary), transparent)',
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <motion.div
            className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative"
            variants={footerVariants}
          >
            <motion.div
              className="flex flex-col md:flex-row justify-start items-start gap-12 md:gap-24 lg:gap-40"
              variants={footerVariants}
            >
              {/* Company Section */}
              <motion.div className="space-y-3" variants={footerItemVariants}>
                <motion.div
                  className="flex items-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <div>
                    <img
                      src="/logo.jpg"
                      alt="Nano Computing"
                      className={`h-16 w-16 object-cover rounded-full transition-all duration-300 flex-shrink-0 ${
                        theme === 'dark' ? 'brightness-0 invert' : ''
                      }`}
                    />
                  </div>
                  <div className="font-bold tracking-tight leading-none">
                    <div className="text-xs sm:text-sm">Nano Computing</div>
                    <div className="text-xs sm:text-sm">ICT Solutions</div>
                  </div>
                </motion.div>
                <motion.p
                  className="text-xs text-muted-foreground leading-snug"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                ></motion.p>
              </motion.div>

              {/* Services Section */}
              <motion.div className="space-y-3" variants={footerItemVariants}>
                <h3 className="text-body font-semibold text-foreground">Services</h3>
                <motion.div
                  className="space-y-1.5 text-sm"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  {[
                    'Ecosystem Management',
                    'Network Architecture',
                    'Surveillance Systems',
                    'Data Recovery',
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
              <motion.div className="space-y-3" variants={footerItemVariants}>
                <h3 className="text-body font-semibold text-foreground">Company</h3>
                <motion.div
                  className="space-y-1.5 text-sm"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  {[
                    { label: 'About Us', page: '/about' },
                    { label: 'Blog', page: '/blog' },
                    { label: 'Shop', page: '/shop' },
                    { label: 'Contact', page: '/contact' },
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
              <motion.div className="space-y-3" variants={footerItemVariants}>
                <h3 className="text-body font-semibold text-foreground">Others</h3>
                <motion.div
                  className="space-y-1.5 text-sm"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
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
              <motion.p
                className="text-body text-muted-foreground text-center"
                whileHover={{
                  color: 'var(--color-primary)',
                  transition: { duration: 0.2 },
                }}
              >
                2025 Nano Computing ICT Solutions. All Rights Reserved. | Your Integrated Safety
                Partner
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.footer>
      }

      {/* Enhanced Interactive Elements */}
    </motion.div>
  );
}

// Simplified AppContent without theme dependency
function AppContent(): React.JSX.Element {
  return <ThemeAwareContent />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}
