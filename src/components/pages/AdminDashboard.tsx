import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useTheme } from '../ThemeProvider';
import { ShopManagement } from '../admin/ShopManagement';
import { BlogManagement } from '../admin/BlogManagement';
import { TeamManagement } from '../admin/TeamManagement';
import { ProductManagement } from '../admin/ProductManagement';
import { OrderManagement } from '../admin/OrderManagement';
import { CustomerManagement } from '../admin/CustomerManagement';
import { InventoryAnalytics } from '../admin/InventoryAnalytics';
import { AdminChatBot } from '../admin/AdminChatBot';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Menu,
  X,
  DollarSign,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Bell,
  LogOut,
  FileText,
  Truck,
  MessageSquare,
  BarChart3,
  Home,
  Sun,
  Moon
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  onBackToHome?: () => void;
}

type DashboardSection = 'overview' | 'shop' | 'blog' | 'team' | 'products' | 'orders' | 'customers' | 'analytics';

export function AdminDashboard({ onLogout, onBackToHome }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Debug logging
  console.log('AdminDashboard render - activeSection:', activeSection);

  // Sample data for the dashboard
  const overviewStats = [
    {
      title: 'Total Revenue',
      value: 'ETB 245,680',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-emerald-600'
    },
    {
      title: 'Total Orders',
      value: '1,247',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'text-blue-600'
    },
    {
      title: 'Products',
      value: '156',
      change: '+3.1%',
      trend: 'up',
      icon: Package,
      color: 'text-purple-600'
    },
    {
      title: 'Active Users',
      value: '2,847',
      change: '-2.4%',
      trend: 'down',
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  const recentOrders = [
    { id: '#NC001', customer: 'Abebe Kebede', product: 'TYPE-C Hub', amount: 'ETB 2,800', status: 'completed' },
    { id: '#NC002', customer: 'Hanan Ahmed', product: 'CCTV Camera', amount: 'ETB 15,500', status: 'processing' },
    { id: '#NC003', customer: 'Samuel Girma', product: 'Network Switch', amount: 'ETB 8,200', status: 'pending' },
    { id: '#NC004', customer: 'Meron Haile', product: 'Security System', amount: 'ETB 25,000', status: 'completed' },
  ];


  // Sidebar items ordered by decreasing priority
  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'orders', label: 'Order Management', icon: Truck },
    { id: 'customers', label: 'Customer Management', icon: MessageSquare },
    { id: 'products', label: 'Product Management', icon: Package },
    { id: 'shop', label: 'Shop Management', icon: ShoppingBag },
    { id: 'analytics', label: 'Inventory Analytics', icon: BarChart3 },
    { id: 'team', label: 'Team Management', icon: Users },
    { id: 'blog', label: 'Blog Management', icon: FileText },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'active': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'out_of_stock': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-2">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-600 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                    {order.id.slice(-2)}
                  </div>
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.product}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold">{order.amount}</p>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );




  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg flex flex-col h-screen fixed top-0 left-0 z-50 hidden md:flex transition-all duration-300`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className={`${isSidebarCollapsed ? 'text-center' : 'text-left'}`}>
            {!isSidebarCollapsed ? (
              <div>
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">Admin Dashboard</h2>
                <p className="text-sm text-muted-foreground mt-1">Management Panel</p>
              </div>
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-sm">AD</span>
              </div>
            )}
          </div>
        </div>

        <nav className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className={`w-full ${isSidebarCollapsed ? 'justify-center px-2 h-10' : 'justify-start px-3 h-11'} text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-primary text-white shadow-sm"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => {
                  console.log('Sidebar clicked:', item.id);
                  setActiveSection(item.id as DashboardSection);
                }}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <item.icon className={`w-4 h-4 ${!isSidebarCollapsed ? 'mr-3 flex-shrink-0' : ''}`} />
                {!isSidebarCollapsed && (
                  <span className="truncate text-left">{item.label}</span>
                )}
              </Button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            className={`w-full ${isSidebarCollapsed ? 'justify-center px-2 h-10' : 'justify-start px-3 h-11'} text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium`}
            onClick={onLogout}
            title={isSidebarCollapsed ? 'Logout' : undefined}
          >
            <LogOut className={`w-4 h-4 ${!isSidebarCollapsed ? 'mr-3 flex-shrink-0' : ''}`} />
            {!isSidebarCollapsed && <span className="truncate">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isSidebarOpen ? 0 : -280 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-60 shadow-2xl flex flex-col md:hidden"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg text-gray-900 dark:text-white">Admin Dashboard</h2>
              <p className="text-sm text-muted-foreground mt-1">Management Panel</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <nav className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className={`w-full justify-start px-3 h-11 text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-primary text-white shadow-sm"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => {
                  console.log('Sidebar clicked:', item.id);
                  setActiveSection(item.id as DashboardSection);
                  setIsSidebarOpen(false);
                }}
              >
                <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="truncate text-left">{item.label}</span>
              </Button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            className="w-full justify-start px-3 h-11 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-3 flex-shrink-0" />
            <span className="truncate">Logout</span>
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 z-40 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden md:flex p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              {onBackToHome && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBackToHome}
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Back to Home</span>
                </Button>
              )}
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
              {(() => {
                console.log('Rendering section:', activeSection);
                switch (activeSection) {
                  case 'overview':
                    return renderOverview();
                  case 'shop':
                    return <ShopManagement />;
                  case 'blog':
                    console.log('Rendering BlogManagement');
                    return <BlogManagement />;
                  case 'team':
                    console.log('Rendering TeamManagement');
                    return <TeamManagement />;
                  case 'products':
                    console.log('Rendering ProductManagement');
                    return <ProductManagement />;
                  case 'orders':
                    console.log('Rendering OrderManagement');
                    return <OrderManagement />;
                  case 'customers':
                    console.log('Rendering CustomerManagement');
                    return <CustomerManagement />;
                  case 'analytics':
                    console.log('Rendering InventoryAnalytics');
                    return <InventoryAnalytics />;
                  default:
                    console.log('Unknown section, rendering overview');
                    return renderOverview();
                }
              })()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      
      {/* Admin-specific ChatBot */}
      <AdminChatBot onPageChange={(page) => {
        // Handle navigation within admin dashboard
        if (page === 'blog') setActiveSection('blog');
        else if (page === 'products') setActiveSection('products');
        else if (page === 'customers') setActiveSection('customers');
        // Add more mappings as needed
      }} />
    </div>
  );
}
