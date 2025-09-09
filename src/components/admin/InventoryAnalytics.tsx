import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  Package,
  DollarSign,
  Clock,
  Truck,
  Star,
  Calendar,
  RefreshCw,
  Download,
  Eye,
  Target,
  Activity,
  UserPlus
} from 'lucide-react';
import { 
  SalesAnalytics, 
  InventoryAnalytics as InventoryAnalyticsType,
  Supplier
} from '../../types/admin';
import { ProductId, Price, Rating } from '../../types';


export function InventoryAnalytics() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  // Mock analytics data
  const [inventoryAnalytics] = useState<InventoryAnalyticsType[]>([
    {
      productId: 'NC001' as any,
      currentStock: 45,
      stockValue: 67500 as any,
      turnoverRate: 2.3,
      daysOfSupply: 30,
      demandForecast: [
        { date: new Date(), predictedDemand: 15, confidence: 0.85 }
      ] as any,
      seasonalTrends: [
        { month: 1, averageDemand: 12, trend: 'stable' as any }
      ] as any,
      supplierPerformance: {
        supplierId: 'sup-1',
        onTimeDelivery: 0.92,
        qualityScore: 4.5 as any,
        costEfficiency: 0.88
      }
    }
  ]);

  const [salesAnalytics] = useState<SalesAnalytics[]>([
    {
      period: 'monthly' as any,
      date: new Date(),
      revenue: 125000 as any,
      orderCount: 89,
      averageOrderValue: 1404 as any,
      topProducts: [
        { productId: 'NC001' as ProductId, name: 'Cisco Router', quantity: 45, revenue: 67500 as Price },
        { productId: 'NC002' as ProductId, name: 'HP Laptop', quantity: 23, revenue: 34500 as Price }
      ] as any,
      customerMetrics: {
        newCustomers: 23,
        returningCustomers: 89,
        customerRetentionRate: 0.79
      }
    }
  ]);

  const [suppliers] = useState<Supplier[]>([
    {
      id: 'sup-1',
      name: 'TechSupply Co.',
      contactPerson: 'John Smith',
      email: 'john@techsupply.com' as any,
      phone: '+1234567890',
      address: '123 Tech Street',
      paymentTerms: 'Net 30',
      leadTime: 14,
      rating: 4.5 as Rating,
      isActive: true,
      createdAt: new Date()
    }
  ]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'text-green-600';
      case 'decreasing': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Inventory Analytics
          </h1>
          <p className="text-muted-foreground mt-2">Advanced analytics and forecasting for inventory management</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <Button className="bg-gradient-to-r from-primary to-blue-600">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inventory Value</p>
              <p className="text-2xl font-bold">ETB 2.4M</p>
              <p className="text-xs text-green-600">+12% vs last month</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <RefreshCw className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Turnover Rate</p>
              <p className="text-2xl font-bold">4.2x</p>
              <p className="text-xs text-blue-600">Excellent</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Stock Alerts</p>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-yellow-600">Needs attention</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Lead Time</p>
              <p className="text-2xl font-bold">14 days</p>
              <p className="text-xs text-purple-600">On target</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="forecasting" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Forecasting
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Suppliers
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Top Performing Products */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Top Performing Products</h3>
            <div className="space-y-4">
              {salesAnalytics[0]?.topProducts?.map((product, index) => (
                <motion.div
                  key={product.productId}
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
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {product.quantity} units sold
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      ETB {product.revenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Stock Alerts */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Stock Alerts</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10">
                <div className="flex items-center gap-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <div>
                    <h4 className="font-semibold">TYPE-C Hub - Low Stock</h4>
                    <p className="text-sm text-muted-foreground">Current: 8 units | Reorder point: 10 units</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reorder
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Demand Forecasting</h3>
            
            {inventoryAnalytics.map((forecast: any, i: number) => (
              <motion.div
                key={forecast.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{forecast.currentStock}</p>
                      <p className="text-sm text-muted-foreground">Current Stock</p>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{forecast.turnoverRate}x</p>
                      <p className="text-sm text-muted-foreground">Turnover Rate</p>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{forecast.daysOfSupply}</p>
                      <p className="text-sm text-muted-foreground">Days of Supply</p>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">
                        ETB {forecast.stockValue.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Stock Value</p>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Sales Trends */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Sales Performance</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                <p className="text-3xl font-bold text-green-600">
                  ETB {salesAnalytics[0]?.revenue?.toLocaleString() || '0'}
                </p>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-xs text-green-600 mt-1">+18% vs last month</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{salesAnalytics[0]?.orderCount || 0}</p>
                <p className="text-sm text-muted-foreground">Orders</p>
                <p className="text-xs text-blue-600 mt-1">+12% vs last month</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                <p className="text-3xl font-bold text-purple-600">
                  ETB {salesAnalytics[0]?.averageOrderValue?.toLocaleString() || '0'}
                </p>
                <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                <p className="text-xs text-purple-600 mt-1">+5% vs last month</p>
              </div>
            </div>

            {/* Customer Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <UserPlus className="w-5 h-5 text-green-500" />
                  <h4 className="font-semibold">New Customers</h4>
                </div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-green-600">+15% growth</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <RefreshCw className="w-5 h-5 text-blue-500" />
                  <h4 className="font-semibold">Returning Customers</h4>
                </div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-blue-600">Strong loyalty</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-5 h-5 text-purple-500" />
                  <h4 className="font-semibold">Retention Rate</h4>
                </div>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-sm text-purple-600">Excellent</p>
              </Card>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}