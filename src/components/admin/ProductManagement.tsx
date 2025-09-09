import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save,
  Search,
  Star,
  ShoppingCart,
  Truck,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { ProductForm, Supplier, InventoryAlert } from '../../types/admin';


export function ProductManagement() {
  const [activeTab, setActiveTab] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data
  const [products] = useState([
    {
      id: 'NC001',
      name: 'TYPE-C to HDTV 8-in-1 Hub',
      description: 'Features USB-C PD (87W), high-speed USB-C, 2x USB-A, HDTV, and SD card reader.',
      price: 2800,
      compareAtPrice: 3200,
      category: 'accessories',
      tags: ['usb-c', 'hub', 'hdmi', 'charging'],
      features: ['USB-C PD 87W', 'High-speed USB-C', '2x USB-A', 'HDTV Output', 'SD Card Reader'],
      specifications: {
        'Connectivity': 'USB-C, USB-A x2, HDMI, SD Card',
        'Power Delivery': '87W USB-C PD',
        'Video Output': '4K@30Hz HDMI',
        'Material': 'Aluminum alloy'
      },
      images: ['https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=600&fit=crop'],
      inventory: {
        sku: 'NC001-HUB',
        quantity: 45,
        reservedQuantity: 5,
        availableQuantity: 40,
        reorderPoint: 10,
        reorderQuantity: 50,
        supplier: 'TechSupply Co.',
        cost: 1800,
        lastRestocked: new Date('2024-12-15'),
        location: 'Warehouse A-1'
      },
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date()
    }
  ]);

  const [suppliers] = useState<Supplier[]>([
    {
      id: 'sup-1',
      name: 'TechSupply Co.',
      contactPerson: 'John Smith',
      email: 'john@techsupply.com' as any,
      phone: '+1234567890',
      address: '123 Tech Street, Tech City',
      paymentTerms: 'Net 30',
      leadTime: 14,
      rating: 4.5 as any,
      isActive: true,
      createdAt: new Date()
    }
  ]);

  const [inventoryAlerts] = useState<InventoryAlert[]>([
    {
      id: 'alert-1',
      productId: 'NC001' as any,
      type: 'low_stock',
      message: 'TYPE-C Hub stock is running low',
      severity: 'medium',
      threshold: 10,
      currentValue: 8,
      isResolved: false,
      createdAt: new Date()
    }
  ]);

  const [productForm, setProductForm] = useState<ProductForm>({
    name: '',
    description: '',
    price: 0,
    category: '',
    tags: [],
    features: [],
    specifications: {},
    images: [],
    inventory: {
      sku: '',
      quantity: 0,
      reorderPoint: 0,
      reorderQuantity: 0,
      supplier: '',
      cost: 0
    },
    seoTitle: '',
    seoDescription: '',
    isActive: true
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      compareAtPrice: product.compareAtPrice || 0,
      category: product.category,
      tags: product.tags,
      features: product.features,
      specifications: product.specifications,
      images: product.images,
      inventory: product.inventory,
      seoTitle: product.name,
      seoDescription: product.description,
      isActive: product.isActive
    });
    setIsEditing(true);
  };

  const getStockStatus = (inventory: any) => {
    if (inventory.quantity === 0) return { status: 'out_of_stock', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' };
    if (inventory.quantity <= inventory.reorderPoint) return { status: 'low_stock', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' };
    return { status: 'in_stock', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' };
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {selectedProduct ? 'Edit Product' : 'Create New Product'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {selectedProduct ? 'Update product information' : 'Add a new product to your catalog'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-primary to-blue-600">
              <Save className="w-4 h-4 mr-2" />
              Save Product
            </Button>
          </div>
        </div>

        {/* Product Form */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Product Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Product Name</label>
                  <Input
                    value={productForm.name}
                    onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter product name..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Product description..."
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price (ETB)</label>
                    <Input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Compare at Price (ETB)</label>
                    <Input
                      type="number"
                      value={productForm.compareAtPrice?.toString() || ''}
                      onChange={(e) => setProductForm(prev => ({ ...prev, compareAtPrice: e.target.value ? Number(e.target.value) : 0 }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Features (one per line)</label>
                  <Textarea
                    value={productForm.features.join('\n')}
                    onChange={(e) => setProductForm(prev => ({ 
                      ...prev, 
                      features: e.target.value.split('\n').filter(f => f.trim())
                    }))}
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    rows={6}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Inventory Management</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">SKU</label>
                    <Input
                      value={productForm.inventory.sku}
                      onChange={(e) => setProductForm(prev => ({ 
                        ...prev, 
                        inventory: { ...prev.inventory, sku: e.target.value }
                      }))}
                      placeholder="Product SKU..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Current Stock</label>
                    <Input
                      type="number"
                      value={productForm.inventory.quantity}
                      onChange={(e) => setProductForm(prev => ({ 
                        ...prev, 
                        inventory: { ...prev.inventory, quantity: Number(e.target.value) }
                      }))}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Reorder Point</label>
                    <Input
                      type="number"
                      value={productForm.inventory.reorderPoint}
                      onChange={(e) => setProductForm(prev => ({ 
                        ...prev, 
                        inventory: { ...prev.inventory, reorderPoint: Number(e.target.value) }
                      }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Reorder Quantity</label>
                    <Input
                      type="number"
                      value={productForm.inventory.reorderQuantity}
                      onChange={(e) => setProductForm(prev => ({ 
                        ...prev, 
                        inventory: { ...prev.inventory, reorderQuantity: Number(e.target.value) }
                      }))}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Supplier</label>
                    <Select 
                      value={productForm.inventory.supplier} 
                      onValueChange={(value) => setProductForm(prev => ({ 
                        ...prev, 
                        inventory: { ...prev.inventory, supplier: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map(supplier => (
                          <SelectItem key={supplier.id} value={supplier.name}>
                            {supplier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Cost (ETB)</label>
                    <Input
                      type="number"
                      value={productForm.inventory.cost}
                      onChange={(e) => setProductForm(prev => ({ 
                        ...prev, 
                        inventory: { ...prev.inventory, cost: Number(e.target.value) }
                      }))}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Product Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={productForm.category} onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="networking">Networking</SelectItem>
                      <SelectItem value="storage">Storage</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="servers">Servers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Tags (comma separated)</label>
                  <Input
                    value={productForm.tags.join(', ')}
                    onChange={(e) => setProductForm(prev => ({ 
                      ...prev, 
                      tags: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                    }))}
                    placeholder="tag1, tag2, tag3"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Product Images (one URL per line)</label>
                  <Textarea
                    value={productForm.images.join('\n')}
                    onChange={(e) => setProductForm(prev => ({ 
                      ...prev, 
                      images: e.target.value.split('\n').filter(url => url.trim())
                    }))}
                    placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                    rows={4}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Active Product</span>
                  <Button
                    variant={productForm.isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => setProductForm(prev => ({ ...prev, isActive: !prev.isActive }))}
                  >
                    {productForm.isActive ? 'Active' : 'Inactive'}
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">SEO Title</label>
                  <Input
                    value={productForm.seoTitle}
                    onChange={(e) => setProductForm(prev => ({ ...prev, seoTitle: e.target.value }))}
                    placeholder="SEO optimized title..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">SEO Description</label>
                  <Textarea
                    value={productForm.seoDescription}
                    onChange={(e) => setProductForm(prev => ({ ...prev, seoDescription: e.target.value }))}
                    placeholder="Meta description..."
                    rows={3}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Product Management
          </h1>
          <p className="text-muted-foreground mt-2">Manage inventory, suppliers, and product analytics</p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => setIsEditing(true)} className="bg-gradient-to-r from-primary to-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            New Product
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Suppliers
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          {/* Filters */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="networking">Networking</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="servers">Servers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Products List */}
          <div className="grid gap-6">
            {filteredProducts.map((product, index) => {
              const stockStatus = getStockStatus(product.inventory);
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="text-xl font-semibold">{product.name}</h3>
                              <Badge className={stockStatus.color}>
                                {stockStatus.status.replace('_', ' ')}
                              </Badge>
                              <Badge variant={product.isActive ? "default" : "secondary"}>
                                {product.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground line-clamp-2">{product.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <div>
                              <p className="text-lg font-bold text-primary">ETB {product.price.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">Price</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-blue-500" />
                            <div>
                              <p className="text-lg font-bold">{product.inventory.quantity}</p>
                              <p className="text-xs text-muted-foreground">In Stock</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <ShoppingCart className="w-4 h-4 text-purple-500" />
                            <div>
                              <p className="text-lg font-bold">0</p>
                              <p className="text-xs text-muted-foreground">Orders</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-orange-500" />
                            <div>
                              <p className="text-lg font-bold">ETB {(product.price - product.inventory.cost).toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">Margin</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Category:</span>
                          <Badge variant="outline">{product.category}</Badge>
                          <span className="text-sm text-muted-foreground">SKU:</span>
                          <code className="text-sm bg-muted px-2 py-1 rounded">{product.inventory.sku}</code>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Stock</p>
                  <p className="text-2xl font-bold">
                    {products.filter(p => p.inventory.quantity > p.inventory.reorderPoint).length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                  <p className="text-2xl font-bold">
                    {products.filter(p => p.inventory.quantity <= p.inventory.reorderPoint && p.inventory.quantity > 0).length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Out of Stock</p>
                  <p className="text-2xl font-bold">
                    {products.filter(p => p.inventory.quantity === 0).length}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Inventory Table */}
          <Card className="overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold">Inventory Status</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4">Product</th>
                    <th className="text-left p-4">SKU</th>
                    <th className="text-left p-4">Stock</th>
                    <th className="text-left p-4">Reorder Point</th>
                    <th className="text-left p-4">Supplier</th>
                    <th className="text-left p-4">Last Restocked</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => {
                    const stockStatus = getStockStatus(product.inventory);
                    
                    return (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <Badge className={stockStatus.color}>
                                {stockStatus.status.replace('_', ' ')}
                              </Badge>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            {product.inventory.sku}
                          </code>
                        </td>
                        <td className="p-4">
                          <span className="text-lg font-bold">{product.inventory.quantity}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">{product.inventory.reorderPoint}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">{product.inventory.supplier}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">
                            {product.inventory.lastRestocked?.toLocaleDateString() || 'Never'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Suppliers</h3>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Supplier
              </Button>
            </div>

            <div className="space-y-4">
              {suppliers.map((supplier, index) => (
                <motion.div
                  key={supplier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h4 className="text-lg font-semibold">{supplier.name}</h4>
                        <Badge variant={supplier.isActive ? "default" : "secondary"}>
                          {supplier.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{supplier.rating}</span>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Contact:</strong> {supplier.contactPerson}</p>
                          <p><strong>Email:</strong> {supplier.email}</p>
                          <p><strong>Phone:</strong> {supplier.phone}</p>
                        </div>
                        <div>
                          <p><strong>Payment Terms:</strong> {supplier.paymentTerms}</p>
                          <p><strong>Lead Time:</strong> {supplier.leadTime} days</p>
                          <p><strong>Address:</strong> {supplier.address}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <div className="space-y-4">
            {inventoryAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        alert.severity === 'critical' ? 'bg-red-100 dark:bg-red-900/20' :
                        alert.severity === 'high' ? 'bg-orange-100 dark:bg-orange-900/20' :
                        alert.severity === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                        'bg-blue-100 dark:bg-blue-900/20'
                      }`}>
                        <AlertTriangle className={`w-5 h-5 ${
                          alert.severity === 'critical' ? 'text-red-600' :
                          alert.severity === 'high' ? 'text-orange-600' :
                          alert.severity === 'medium' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{alert.message}</h4>
                          <Badge className={getAlertColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Current: {alert.currentValue} | Threshold: {alert.threshold}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Created: {alert.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Resolve
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Inventory Value</p>
                  <p className="text-2xl font-bold">
                    ETB {products.reduce((sum, p) => sum + (p.inventory.quantity * p.inventory.cost), 0).toLocaleString()}
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
                  <p className="text-sm text-muted-foreground">Avg. Turnover</p>
                  <p className="text-2xl font-bold">4.2x</p>
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
                  <p className="text-2xl font-bold">
                    {Math.round(suppliers.reduce((sum, s) => sum + s.leadTime, 0) / suppliers.length)} days
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-bold">{inventoryAlerts.filter(a => !a.isResolved).length}</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}