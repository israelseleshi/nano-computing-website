import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { useToast } from '../ui/toast';
import { 
  Package, 
  Search, 
  Eye, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  RefreshCw,
  Download,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Calendar
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }[];
  trackingNumber?: string;
  estimatedDelivery?: Date;
}

export function OrderHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [reorderingItem, setReorderingItem] = useState<string | null>(null);
  const [viewingOrder, setViewingOrder] = useState<string | null>(null);
  const [trackingOrder, setTrackingOrder] = useState<string | null>(null);
  const [exportingOrders, setExportingOrders] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { addToast } = useToast();

  // Mock order data
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: new Date('2024-01-15'),
      status: 'delivered',
      total: 2499.99,
      items: [
        { name: 'Dell OptiPlex 7090 Desktop', quantity: 1, price: 1299.99 },
        { name: 'HP 24" Monitor', quantity: 2, price: 599.99 }
      ],
      trackingNumber: 'TRK123456789',
      estimatedDelivery: new Date('2024-01-20')
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: new Date('2024-02-10'),
      status: 'shipped',
      total: 899.99,
      items: [
        { name: 'Cisco Router RV340W', quantity: 1, price: 899.99 }
      ],
      trackingNumber: 'TRK987654321',
      estimatedDelivery: new Date('2024-02-15')
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: new Date('2024-02-20'),
      status: 'processing',
      total: 1599.99,
      items: [
        { name: 'HP LaserJet Pro M404n', quantity: 1, price: 299.99 },
        { name: 'Lenovo ThinkPad E15', quantity: 1, price: 1299.99 }
      ]
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'processing': return <RefreshCw className="w-4 h-4 text-blue-500" />;
      case 'shipped': return <Truck className="w-4 h-4 text-purple-500" />;
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'shipped': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  // Button action handlers
  const handleViewDetails = (order: Order) => {
    setViewingOrder(order.id);
    setShowOrderModal(true);
    addToast({
      type: 'info',
      title: 'Order Details',
      description: `Viewing details for order ${order.orderNumber}`
    });
  };

  const handleReorder = async (order: Order) => {
    setReorderingItem(order.id);
    // Simulate API call
    setTimeout(() => {
      setReorderingItem(null);
      addToast({
        type: 'success',
        title: 'Items Added to Cart',
        description: `Items from order ${order.orderNumber} have been added to your cart!`
      });
    }, 1500);
  };

  const handleTrackPackage = (order: Order) => {
    setTrackingOrder(order.trackingNumber!);
    setShowTrackingModal(true);
    addToast({
      type: 'info',
      title: 'Package Tracking',
      description: `Tracking package ${order.trackingNumber}`
    });
  };

  const handleExportOrders = async () => {
    setExportingOrders(true);
    // Simulate export
    setTimeout(() => {
      setExportingOrders(false);
      addToast({
        type: 'success',
        title: 'Export Complete',
        description: 'Order history has been exported successfully!'
      });
    }, 2000);
    const csvContent = filteredOrders.map(order => 
      `${order.orderNumber},${order.date.toISOString()},${order.status},${order.total}`
    ).join('\n');
    const blob = new Blob([`Order Number,Date,Status,Total\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const recentOrders = orders.filter(order => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return order.date >= thirtyDaysAgo;
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Order History
          </h1>
          <p className="text-muted-foreground mt-2">Track and manage your orders with detailed insights</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="border-primary/20 hover:border-primary/40">
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button 
            onClick={handleExportOrders}
            className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Orders
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border-blue-200/50 dark:border-blue-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Orders</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalOrders}</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-full">
              <ShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 border-green-200/50 dark:border-green-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Spent</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">ETB {totalSpent.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 border-purple-200/50 dark:border-purple-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Recent Orders</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{recentOrders}</p>
              <p className="text-xs text-purple-600/70 dark:text-purple-400/70">Last 30 days</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-full">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search orders by number or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-600/50 focus:border-primary/50 focus:ring-primary/20"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200/50 dark:border-gray-600/50 rounded-lg bg-white/80 dark:bg-gray-800/80 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-sm font-medium min-w-[140px]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary/40">
              <Package className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Card className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
                <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                          {order.orderNumber}
                        </h3>
                        <Badge className={`${getStatusColor(order.status)} px-3 py-1 text-xs font-semibold`}>
                          <div className="flex items-center gap-1.5">
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </div>
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold text-primary">ETB {order.total.toLocaleString()}</p>
                    </div>
                    
                    {/* Order Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-3 bg-gray-50/80 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Order Date</p>
                        </div>
                        <p className="font-semibold text-gray-900 dark:text-white">{order.date.toLocaleDateString()}</p>
                      </div>
                      
                      <div className="p-3 bg-gray-50/80 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Package className="w-4 h-4 text-gray-500" />
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Items</p>
                        </div>
                        <p className="font-semibold text-gray-900 dark:text-white">{order.items.length} Product{order.items.length > 1 ? 's' : ''}</p>
                      </div>
                      
                      {order.trackingNumber && (
                        <div className="p-3 bg-gray-50/80 dark:bg-gray-800/50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Truck className="w-4 h-4 text-gray-500" />
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Tracking</p>
                          </div>
                          <p className="font-semibold text-primary text-sm">{order.trackingNumber}</p>
                        </div>
                      )}
                      
                      {order.estimatedDelivery && (
                        <div className="p-3 bg-gray-50/80 dark:bg-gray-800/50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Delivery</p>
                          </div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{order.estimatedDelivery.toLocaleDateString()}</p>
                        </div>
                      )}
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Order Items</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                          className="text-xs"
                        >
                          {selectedOrder?.id === order.id ? 'Hide Details' : 'Show Details'}
                        </Button>
                      </div>
                      
                      {(selectedOrder?.id === order.id || order.items.length <= 2) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2"
                        >
                          {order.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50/50 to-gray-100/30 dark:from-gray-800/30 dark:to-gray-700/20 rounded-lg border border-gray-200/30 dark:border-gray-600/30">
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-primary">ETB {item.price.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">per unit</p>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                      
                      {selectedOrder?.id !== order.id && order.items.length > 2 && (
                        <div className="p-3 bg-gradient-to-r from-gray-50/50 to-gray-100/30 dark:from-gray-800/30 dark:to-gray-700/20 rounded-lg border border-gray-200/30 dark:border-gray-600/30">
                          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                            {order.items.length} items • Click "Show Details" to view all
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-row xl:flex-col gap-3 xl:min-w-[160px]">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewDetails(order)}
                      disabled={viewingOrder === order.id}
                    >
                      {viewingOrder === order.id ? (
                        <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <Eye className="w-4 h-4 mr-2" />
                      )}
                      {viewingOrder === order.id ? 'Loading...' : 'View Details'}
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleReorder(order)}
                      disabled={reorderingItem === order.id}
                    >
                      {reorderingItem === order.id ? (
                        <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <RefreshCw className="w-4 h-4 mr-2" />
                      )}
                      {reorderingItem === order.id ? 'Adding...' : 'Reorder'}
                    </Button>
                    {order.status === 'shipped' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleTrackPackage(order)}
                        disabled={trackingOrder === order.trackingNumber}
                      >
                        {trackingOrder === order.trackingNumber ? (
                          <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                          <Truck className="w-4 h-4 mr-2" />
                        )}
                        {trackingOrder === order.trackingNumber ? 'Loading...' : 'Track'}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
            ))}
          </AnimatePresence>
      </div>

      {filteredOrders.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-12 text-center bg-gradient-to-br from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-800/30 border-gray-200/50 dark:border-gray-700/50">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-primary/60" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">No Orders Found</h3>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria to find the orders you\'re looking for'
                : 'You haven\'t placed any orders yet. Start shopping to see your order history here'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button className="mt-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Start Shopping
              </Button>
            )}
          </Card>
        </motion.div>
      )}
    </div>
  );
}
