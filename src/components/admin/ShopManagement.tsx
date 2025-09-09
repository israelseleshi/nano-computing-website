import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Search,
  Filter,
  Plus,
  Download,
  Eye,
  Edit,
  Trash2,
  Package
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: 'active' | 'low_stock' | 'out_of_stock';
  image: string;
}

interface ShopManagementProps {
  onBack: () => void;
}

export function ShopManagement({ onBack }: ShopManagementProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample products data
  const [products] = useState<Product[]>([
    {
      id: 'NC001',
      name: 'TYPE-C to HDTV 8-in-1 Hub',
      category: 'Accessories',
      price: 'ETB 2,800',
      stock: 45,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=100&h=100&fit=crop&auto=format&q=80'
    },
    {
      id: 'NC002',
      name: 'Professional CCTV Camera System',
      category: 'Security',
      price: 'ETB 15,500',
      stock: 12,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop&auto=format&q=80'
    },
    {
      id: 'NC003',
      name: 'Enterprise Network Switch',
      category: 'Networking',
      price: 'ETB 8,200',
      stock: 8,
      status: 'low_stock',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&auto=format&q=80'
    },
    {
      id: 'NC004',
      name: 'Complete Security System',
      category: 'Security',
      price: 'ETB 25,000',
      stock: 0,
      status: 'out_of_stock',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&h=100&fit=crop&auto=format&q=80'
    }
  ]);

  const handleProductAction = (action: string, productId?: string) => {
    switch (action) {
      case 'add':
        console.log('Adding new product');
        // Open add product modal
        break;
      case 'view':
        if (productId) {
          console.log('Viewing product:', productId);
          // Navigate to product detail view
        }
        break;
      case 'edit':
        if (productId) {
          console.log('Editing product:', productId);
          // Open edit modal
        }
        break;
      case 'delete':
        if (productId) {
          console.log('Deleting product:', productId);
          // Show confirmation dialog
        }
        break;
      case 'bulk-delete':
        console.log('Bulk deleting products:', selectedProducts);
        // Show bulk delete confirmation
        break;
      case 'export':
        console.log('Exporting products');
        // Export functionality
        break;
      default:
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'out_of_stock': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = filterCategory === 'all' || product.category.toLowerCase() === filterCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Shop Management
          </h1>
          <p className="text-muted-foreground mt-2">Manage your products, inventory, and pricing.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" onClick={onBack}>
            Back to Dashboard
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleProductAction('export')}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90" onClick={() => handleProductAction('add')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 sm:p-6 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 min-w-[140px]"
            >
              <option value="all">All Categories</option>
              <option value="accessories">Accessories</option>
              <option value="security">Security</option>
              <option value="networking">Networking</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        
        {selectedProducts.length > 0 && (
          <div className="flex items-center justify-between mt-4 p-3 bg-primary/10 rounded-lg">
            <span className="text-sm font-medium">{selectedProducts.length} product(s) selected</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => handleProductAction('bulk-delete')}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedProducts([])}>
                Clear Selection
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product, index) => {
          const isSelected = selectedProducts.includes(product.id);
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`relative ${isSelected ? 'ring-2 ring-primary' : ''}`}
            >
              <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 hover:shadow-xl transition-all duration-300">
                {/* Selection Checkbox */}
                <div className="absolute top-3 left-3 z-10">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProducts(prev => [...prev, product.id]);
                      } else {
                        setSelectedProducts(prev => prev.filter(id => id !== product.id));
                      }
                    }}
                    className="w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2"
                  />
                </div>
                
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className={getStatusColor(product.status)}>
                      {product.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base mb-1 truncate" title={product.name}>{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-lg font-bold text-primary">{product.price}</p>
                    <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => handleProductAction('view', product.id)}
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => handleProductAction('edit', product.id)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs text-red-600 hover:text-red-700"
                      onClick={() => handleProductAction('delete', product.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      {filteredProducts.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No products found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        </Card>
      )}
    </div>
  );
}
