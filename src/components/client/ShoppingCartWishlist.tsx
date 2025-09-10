import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { useToast } from '../ui/toast';
import { 
  ShoppingCart, 
  Heart, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  Star,
  AlertCircle,
  TrendingDown,
  Package,
  DollarSign,
  ShoppingBag,
  Gift,
  Zap
} from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
  inStock: boolean;
  category: string;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  inStock: boolean;
  category: string;
  priceDropAlert: boolean;
}

export function ShoppingCartWishlist() {
  const [activeTab, setActiveTab] = useState<'cart' | 'wishlist'>('cart');
  const [removingItem, setRemovingItem] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [savingForLater, setSavingForLater] = useState<string | null>(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const { addToast } = useToast();

  // Mock cart data
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Dell OptiPlex 7090 Desktop',
      price: 1299.99,
      quantity: 1,
      inStock: true,
      category: 'Computers'
    },
    {
      id: '2',
      name: 'HP 24" Monitor',
      price: 299.99,
      originalPrice: 349.99,
      quantity: 2,
      inStock: true,
      category: 'Monitors'
    },
    {
      id: '3',
      name: 'Cisco Router RV340W',
      price: 899.99,
      quantity: 1,
      inStock: false,
      category: 'Networking'
    }
  ]);

  // Mock wishlist data
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: '4',
      name: 'MacBook Pro 16"',
      price: 2499.99,
      originalPrice: 2699.99,
      inStock: true,
      category: 'Laptops',
      priceDropAlert: true
    },
    {
      id: '5',
      name: 'iPad Pro 12.9"',
      price: 1099.99,
      inStock: true,
      category: 'Tablets',
      priceDropAlert: false
    },
    {
      id: '6',
      name: 'Surface Studio 2+',
      price: 4299.99,
      inStock: false,
      category: 'Computers',
      priceDropAlert: false
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = async (id: string) => {
    setRemovingItem(id);
    // Simulate API call
    setTimeout(() => {
      setCartItems(prev => prev.filter(item => item.id !== id));
      setRemovingItem(null);
    }, 500);
  };

  const moveToWishlist = async (cartItem: CartItem) => {
    setSavingForLater(cartItem.id);
    // Simulate API call
    setTimeout(() => {
      const wishlistItem: WishlistItem = {
        ...cartItem,
        priceDropAlert: false
      };
      setWishlistItems(prev => [...prev, wishlistItem]);
      setCartItems(prev => prev.filter(item => item.id !== cartItem.id));
      setSavingForLater(null);
    }, 800);
  };

  const addToCart = async (wishlistItem: WishlistItem) => {
    setAddingToCart(wishlistItem.id);
    // Simulate API call
    setTimeout(() => {
      const cartItem: CartItem = {
        ...wishlistItem,
        quantity: 1
      };
      setCartItems(prev => [...prev, cartItem]);
      removeFromWishlist(wishlistItem.id);
      setAddingToCart(null);
    }, 800);
  };

  const removeFromWishlist = async (id: string) => {
    setRemovingItem(id);
    // Simulate API call
    setTimeout(() => {
      setWishlistItems(prev => prev.filter(item => item.id !== id));
      setRemovingItem(null);
    }, 500);
  };

  const handleProceedToCheckout = () => {
    setShowCheckoutModal(true);
    // Simulate checkout process
    setTimeout(() => {
      setSavingForLater(null);
      addToast({
        type: 'success',
        title: 'Item Saved',
        description: `${cartItems[0].name} saved for later!`
      });
    }, 1000);
  };

  const handleShareWishlist = () => {
    // Simulate sharing functionality
    const shareUrl = `${window.location.origin}/wishlist/shared/${Date.now()}`;
    navigator.clipboard.writeText(shareUrl);
    addToast({
      type: 'success',
      title: 'Link Copied',
      description: 'Wishlist link copied to clipboard!'
    });
  };

  const handleQuickOrder = () => {
    // Simulate quick order functionality
    addToast({
      type: 'info',
      title: 'Coming Soon',
      description: 'Quick order feature coming soon!'
    });
  };

  const togglePriceAlert = (id: string) => {
    setWishlistItems(prev => prev.map(item =>
      item.id === id ? { ...item, priceDropAlert: !item.priceDropAlert } : item
    ));
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartSavings = cartItems.reduce((savings, item) => 
    savings + ((item.originalPrice || item.price) - item.price) * item.quantity, 0
  );

  const cartItemsCount = cartItems.length;
  const wishlistItemsCount = wishlistItems.length;
  const totalCartValue = cartTotal;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Shopping Cart & Wishlist
          </h1>
          <p className="text-muted-foreground mt-2">Manage your items and save for later purchases</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            onClick={handleShareWishlist}
            className="border-primary/20 hover:border-primary/40"
          >
            <Gift className="w-4 h-4 mr-2" />
            Share Wishlist
          </Button>
          <Button 
            onClick={handleQuickOrder}
            className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg"
          >
            <Zap className="w-4 h-4 mr-2" />
            Quick Order
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border-blue-200/50 dark:border-blue-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Cart Items</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{cartItemsCount}</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-full">
              <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 border-green-200/50 dark:border-green-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Cart Value</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">ETB {totalCartValue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 border-purple-200/50 dark:border-purple-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Wishlist Items</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{wishlistItemsCount}</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-full">
              <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-1 rounded-xl w-fit shadow-lg">
        <Button
          variant={activeTab === 'cart' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('cart')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
            activeTab === 'cart' 
              ? 'bg-primary text-white shadow-md' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          Cart ({cartItems.length})
        </Button>
        <Button
          variant={activeTab === 'wishlist' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('wishlist')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
            activeTab === 'wishlist' 
              ? 'bg-primary text-white shadow-md' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          <Heart className="w-4 h-4" />
          Wishlist ({wishlistItems.length})
        </Button>
      </div>

      {/* Shopping Cart */}
      {activeTab === 'cart' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <Card className="p-12 text-center">
                <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground">Add some items to get started</p>
              </Card>
            ) : (
              cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-xs text-center text-muted-foreground">
                          Product<br />Image
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                            {!item.inStock && (
                              <Badge variant="destructive" className="mt-1">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Out of Stock
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <p className="text-lg font-bold">ETB {item.price.toLocaleString()}</p>
                            {item.originalPrice && (
                              <p className="text-sm text-muted-foreground line-through">
                                ETB {item.originalPrice.toLocaleString()}
                              </p>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => moveToWishlist(item)}
                            disabled={savingForLater === item.id}
                            className="text-xs"
                          >
                            {savingForLater === item.id ? (
                              <div className="w-3 h-3 mr-1 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            ) : (
                              <Heart className="w-3 h-3 mr-1" />
                            )}
                            {savingForLater === item.id ? 'Saving...' : 'Save for Later'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            disabled={removingItem === item.id}
                            className="text-xs text-red-600 hover:text-red-700 hover:border-red-300"
                          >
                            {removingItem === item.id ? (
                              <div className="w-3 h-3 mr-1 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            ) : (
                              <Trash2 className="w-3 h-3 mr-1" />
                            )}
                            {removingItem === item.id ? 'Removing...' : 'Remove'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>ETB {cartTotal.toLocaleString()}</span>
                  </div>
                  {cartSavings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Savings</span>
                      <span>-ETB {cartSavings.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between text-lg font-semibold mb-4">
                      <span>Total: ETB {cartTotal.toFixed(2)}</span>
                      {cartSavings > 0 && (
                        <span className="text-green-600 text-sm">
                          You saved ETB {cartSavings.toFixed(2)}!
                        </span>
                      )}
                    </div>
                    <Button 
                      onClick={handleProceedToCheckout}
                      disabled={showCheckoutModal || cartItems.length === 0}
                      className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg"
                    >
                      {showCheckoutModal ? (
                        <>
                          <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Proceed to Checkout
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          {wishlistItems.length === 0 ? (
            <Card className="p-12 text-center">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground">Save items you love for later</p>
            </Card>
          ) : (
            wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-xs text-center text-muted-foreground">
                        Product<br />Image
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {!item.inStock && (
                              <Badge variant="destructive">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Out of Stock
                              </Badge>
                            )}
                            {item.priceDropAlert && (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                <TrendingDown className="w-3 h-3 mr-1" />
                                Price Drop Alert
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromWishlist(item.id)}
                          disabled={removingItem === item.id}
                        >
                          {removingItem === item.id ? (
                            <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className="text-lg font-bold">ETB {item.price.toLocaleString()}</p>
                          {item.originalPrice && (
                            <p className="text-sm text-muted-foreground line-through">
                              ETB {item.originalPrice.toLocaleString()}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => togglePriceAlert(item.id)}
                          >
                            <Star className={`w-4 h-4 mr-2 ${item.priceDropAlert ? 'fill-current' : ''}`} />
                            Price Alert
                          </Button>
                          {item.inStock && (
                            <Button
                              size="sm"
                              onClick={() => addToCart(item)}
                              disabled={addingToCart === item.id}
                            >
                              {addingToCart === item.id ? (
                                <>
                                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                  Adding...
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="w-4 h-4 mr-2" />
                                  Add to Cart
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
