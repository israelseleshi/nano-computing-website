import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ToastProvider } from '../ui/toast';
import { 
  Home, 
  ShoppingCart, 
  Heart, 
  Package, 
  User, 
  Settings, 
  Bell, 
  HelpCircle,
  Users,
  Menu,
  X,
  Sun,
  Moon,
  ArrowLeft,
  Search,
  MessageSquare,
  Phone,
  CreditCard,
  Wrench,
  FileText
} from 'lucide-react';

// Import client components
import { OrderHistory } from './OrderHistory';
import { ShoppingCartWishlist } from './ShoppingCartWishlist';
import { ProductCatalog } from './ProductCatalog';
import { SupportTickets } from './SupportTickets';
import { ContactDirectory } from './ContactDirectory';
import { ProfileSettings } from './ProfileSettings';
import { BillingPayments } from './BillingPayments';
import { ServiceRequests } from './ServiceRequests';
import { DocumentCenter } from './DocumentCenter';
import { NotificationsHub } from './NotificationsHub';

interface ClientDashboardProps {
  onLogout: () => void;
}

export function ClientDashboard({ onLogout }: ClientDashboardProps) {
  const [activeSection, setActiveSection] = useState('orders');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navigationItems = [
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'cart', label: 'Cart & Wishlist', icon: ShoppingCart },
    { id: 'catalog', label: 'Product Catalog', icon: Search },
    { id: 'support', label: 'Support Tickets', icon: MessageSquare },
    { id: 'contact', label: 'Contact Directory', icon: Phone },
    { id: 'profile', label: 'Profile & Settings', icon: User },
    { id: 'billing', label: 'Billing & Payments', icon: CreditCard },
    { id: 'services', label: 'Service Requests', icon: Wrench },
    { id: 'documents', label: 'Document Center', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'orders':
        return <OrderHistory />;
      case 'cart':
        return <ShoppingCartWishlist />;
      case 'catalog':
        return <ProductCatalog />;
      case 'support':
        return <SupportTickets />;
      case 'contact':
        return <ContactDirectory />;
      case 'profile':
        return <ProfileSettings />;
      case 'billing':
        return <BillingPayments />;
      case 'services':
        return <ServiceRequests />;
      case 'documents':
        return <DocumentCenter />;
      case 'notifications':
        return <NotificationsHub />;
      default:
        return <OrderHistory />;
    }
  };

  return (
    <ToastProvider>
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
        {/* Desktop Sidebar */}
        <aside className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 transition-all duration-300 hidden md:flex flex-col ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              {!isSidebarCollapsed && (
                <div>
                  <h2 className="font-bold text-lg text-gray-900 dark:text-white">Client Portal</h2>
                  <p className="text-sm text-muted-foreground mt-1">Nano Computing Services</p>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2"
              >
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <nav className="p-4 flex-1 overflow-y-auto">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    className={`w-full ${isSidebarCollapsed ? 'justify-center px-2 h-10' : 'justify-start px-3 h-11'} text-sm font-medium`}
                    onClick={() => setActiveSection(item.id)}
                    title={isSidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 ${!isSidebarCollapsed ? 'mr-3 flex-shrink-0' : ''}`} />
                    {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </Button>
                );
              })}
            </div>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              className={`w-full ${isSidebarCollapsed ? 'justify-center px-2 h-10' : 'justify-start px-3 h-11'} text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium`}
              onClick={onLogout}
              title={isSidebarCollapsed ? 'Logout' : undefined}
            >
              <X className={`w-4 h-4 ${!isSidebarCollapsed ? 'mr-3 flex-shrink-0' : ''}`} />
              {!isSidebarCollapsed && <span className="truncate">Logout</span>}
            </Button>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-60 shadow-2xl flex flex-col md:hidden"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white">Client Portal</h2>
                    <p className="text-sm text-muted-foreground mt-1">Nano Computing Services</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <nav className="p-4 flex-1 overflow-y-auto">
                <div className="space-y-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.id}
                        variant={activeSection === item.id ? "default" : "ghost"}
                        className="w-full justify-start px-3 h-11 text-sm font-medium"
                        onClick={() => {
                          setActiveSection(item.id);
                          setIsSidebarOpen(false);
                        }}
                      >
                        <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </nav>

              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 h-11 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium"
                  onClick={onLogout}
                >
                  <X className="w-4 h-4 mr-3 flex-shrink-0" />
                  <span className="truncate">Logout</span>
                </Button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col ${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} transition-all duration-300`}>
          {/* Sticky Header */}
          <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarOpen(true)}
                  className="md:hidden"
                >
                  <Menu className="w-5 h-5" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.history.back()}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="hidden md:flex"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-4 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
