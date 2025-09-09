import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  ShoppingCart, 
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Package,
  Truck,
  Clock,
  DollarSign,
  User,
  Calendar,
  CheckCircle,
  BarChart3,
  AlertCircle,
  TrendingUp,
  FileText,
  Download,
  Send,
  Mail,
  Phone
} from 'lucide-react';
import { Order, OrderStatus, PaymentStatus, FulfillmentStatus } from '../../types/admin';

interface OrderManagementProps {
  onBack: () => void;
}

export function OrderManagement({ onBack }: OrderManagementProps) {
  const [activeTab, setActiveTab] = useState('orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock data
  const [orders] = useState<Order[]>([
    {
      id: 'order-1',
      orderNumber: 'NC-2025-001',
      customerId: 'customer-1' as any,
      customerInfo: {
        name: 'Abebe Kebede',
        email: 'abebe@example.com' as any,
        phone: '+251911123456',
        shippingAddress: {
          street: '123 Bole Road',
          city: 'Addis Ababa',
          state: 'Addis Ababa',
          postalCode: '1000',
          country: 'Ethiopia'
        }
      },
      items: [
        {
          id: 'item-1',
          productId: 'NC001' as any,
          name: 'TYPE-C to HDTV 8-in-1 Hub',
          sku: 'NC001-HUB',
          quantity: 2,
          price: 2800 as any,
          total: 5600 as any
        }
      ],
      subtotal: 5600 as any,
      tax: 840 as any,
      shipping: 200 as any,
      total: 6640 as any,
      status: OrderStatus.PROCESSING,
      paymentStatus: PaymentStatus.PAID,
      fulfillmentStatus: FulfillmentStatus.PARTIAL,
      notes: 'Customer requested expedited shipping',
      trackingNumber: 'ETH123456789',
      estimatedDelivery: new Date('2025-01-20'),
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date()
    }
  ]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'processing': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'shipped': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400';
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'refunded': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'refunded': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Order Management
          </h1>
          <p className="text-muted-foreground mt-2">Track and manage customer orders and fulfillment</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            Back to Dashboard
          </Button>
          <Button className="bg-gradient-to-r from-primary to-blue-600">
            <Download className="w-4 h-4 mr-2" />
            Export Orders
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">
                ETB {orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Orders</p>
              <p className="text-2xl font-bold">
                {orders.filter(order => order.status === 'pending' || order.status === 'confirmed').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Order Value</p>
              <p className="text-2xl font-bold">
                ETB {Math.round(orders.reduce((sum, order) => sum + order.total, 0) / orders.length).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="fulfillment" className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Fulfillment
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          {/* Filters */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{order.orderNumber}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                          {order.paymentStatus}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {order.customerInfo.name}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {order.createdAt.toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          ETB {order.total.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Invoice
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Items ({order.items.length})</h4>
                      <div className="space-y-2">
                        {order.items.map(item => (
                          <div key={item.id} className="flex items-center justify-between text-sm">
                            <span>{item.name} × {item.quantity}</span>
                            <span className="font-medium">ETB {item.total.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <div className="text-sm text-muted-foreground">
                        <p>{order.customerInfo.shippingAddress.street}</p>
                        <p>{order.customerInfo.shippingAddress.city}, {order.customerInfo.shippingAddress.state}</p>
                        <p>{order.customerInfo.shippingAddress.country}</p>
                      </div>
                      {order.trackingNumber && (
                        <div className="mt-2">
                          <span className="text-sm font-medium">Tracking: </span>
                          <code className="text-sm bg-muted px-2 py-1 rounded">{order.trackingNumber}</code>
                        </div>
                      )}
                    </div>
                  </div>

                  {order.notes && (
                    <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm"><strong>Notes:</strong> {order.notes}</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fulfillment" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Fulfillment Queue</h3>
            
            <div className="space-y-4">
              {orders.filter(order => order.fulfillmentStatus !== 'fulfilled').map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{order.orderNumber}</h4>
                      <p className="text-sm text-muted-foreground">
                        {order.customerInfo.name} • {order.items.length} items
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(order.fulfillmentStatus)}>
                          {order.fulfillmentStatus}
                        </Badge>
                        {order.estimatedDelivery && (
                          <span className="text-xs text-muted-foreground">
                            Est. delivery: {order.estimatedDelivery.toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Truck className="w-4 h-4 mr-2" />
                      Ship
                    </Button>
                    <Button variant="outline" size="sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Fulfilled
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold">
                    ETB {orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                  <p className="text-2xl font-bold">
                    ETB {Math.round(orders.reduce((sum, order) => sum + order.total, 0) / orders.length).toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fulfillment Rate</p>
                  <p className="text-2xl font-bold">
                    {Math.round((orders.filter(o => o.fulfillmentStatus === 'fulfilled').length / orders.length) * 100)}%
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Processing</p>
                  <p className="text-2xl font-bold">2.5 days</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Orders Chart Placeholder */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Order Trends</h3>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Order analytics chart would be displayed here</p>
                <p className="text-sm">Integration with charting library needed</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background border rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Order {selectedOrder.orderNumber}</h2>
                <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                  ×
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Customer Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      {selectedOrder.customerInfo.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {selectedOrder.customerInfo.email}
                    </div>
                    {selectedOrder.customerInfo.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {selectedOrder.customerInfo.phone}
                      </div>
                    )}
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Shipping Address</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>{selectedOrder.customerInfo.shippingAddress.street}</p>
                    <p>{selectedOrder.customerInfo.shippingAddress.city}, {selectedOrder.customerInfo.shippingAddress.state}</p>
                    <p>{selectedOrder.customerInfo.shippingAddress.postalCode}</p>
                    <p>{selectedOrder.customerInfo.shippingAddress.country}</p>
                  </div>
                </Card>
              </div>

              {/* Order Items */}
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">ETB {item.total.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>ETB {selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax:</span>
                    <span>ETB {selectedOrder.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>ETB {selectedOrder.shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>ETB {selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <div className="flex justify-end gap-4">
                <Button variant="outline">
                  <Send className="w-4 h-4 mr-2" />
                  Send Update
                </Button>
                <Button variant="outline">
                  <Truck className="w-4 h-4 mr-2" />
                  Update Shipping
                </Button>
                <Button>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Fulfilled
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}