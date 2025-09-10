import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  Bell, 
  BellOff, 
  Search, 
  Check, 
  X, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  Package, 
  CreditCard, 
  Wrench, 
  Shield, 
  Settings, 
  Trash2,
  Eye,
  EyeOff,
  Star
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'order' | 'payment' | 'service' | 'security' | 'system';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isRead: boolean;
  isStarred: boolean;
  timestamp: Date;
  actionUrl?: string;
  actionText?: string;
  relatedId?: string;
}

const notificationTypes = [
  { id: 'info', name: 'Information', icon: Info, color: 'text-blue-600' },
  { id: 'success', name: 'Success', icon: CheckCircle, color: 'text-green-600' },
  { id: 'warning', name: 'Warning', icon: AlertCircle, color: 'text-yellow-600' },
  { id: 'error', name: 'Error', icon: X, color: 'text-red-600' },
  { id: 'order', name: 'Orders', icon: Package, color: 'text-purple-600' },
  { id: 'payment', name: 'Payments', icon: CreditCard, color: 'text-indigo-600' },
  { id: 'service', name: 'Service', icon: Wrench, color: 'text-orange-600' },
  { id: 'security', name: 'Security', icon: Shield, color: 'text-red-600' },
  { id: 'system', name: 'System', icon: Settings, color: 'text-gray-600' }
];

export function NotificationsHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Order Shipped',
      message: 'Your order #ORD-2024-001 has been shipped and is on its way. Expected delivery: February 22, 2024.',
      type: 'order',
      priority: 'medium',
      isRead: false,
      isStarred: true,
      timestamp: new Date('2024-02-20T10:30:00'),
      actionUrl: '/orders/ORD-2024-001',
      actionText: 'Track Order',
      relatedId: 'ORD-2024-001'
    },
    {
      id: '2',
      title: 'Payment Successful',
      message: 'Your payment of ETB 2,499.99 for invoice INV-2024-001 has been processed successfully.',
      type: 'payment',
      priority: 'low',
      isRead: false,
      isStarred: false,
      timestamp: new Date('2024-02-20T09:15:00'),
      actionUrl: '/billing/INV-2024-001',
      actionText: 'View Invoice',
      relatedId: 'INV-2024-001'
    },
    {
      id: '3',
      title: 'Service Request Scheduled',
      message: 'Your service request for "Desktop Computer Not Starting" has been scheduled for February 20, 2024 at 10:00 AM.',
      type: 'service',
      priority: 'high',
      isRead: true,
      isStarred: false,
      timestamp: new Date('2024-02-19T16:45:00'),
      actionUrl: '/service-requests/SR-001',
      actionText: 'View Details',
      relatedId: 'SR-001'
    },
    {
      id: '4',
      title: 'Security Alert',
      message: 'Unusual login activity detected from a new device. If this wasn\'t you, please secure your account immediately.',
      type: 'security',
      priority: 'urgent',
      isRead: false,
      isStarred: true,
      timestamp: new Date('2024-02-19T14:22:00'),
      actionUrl: '/profile/security',
      actionText: 'Review Security',
      relatedId: 'SEC-001'
    },
    {
      id: '5',
      title: 'System Maintenance Scheduled',
      message: 'Scheduled system maintenance will occur on February 25, 2024 from 2:00 AM to 4:00 AM. Services may be temporarily unavailable.',
      type: 'system',
      priority: 'medium',
      isRead: true,
      isStarred: false,
      timestamp: new Date('2024-02-18T11:00:00'),
      actionUrl: '/system/maintenance',
      actionText: 'Learn More'
    },
    {
      id: '6',
      title: 'New Product Available',
      message: 'The latest Dell OptiPlex 9090 is now available in our catalog with special launch pricing.',
      type: 'info',
      priority: 'low',
      isRead: true,
      isStarred: false,
      timestamp: new Date('2024-02-17T13:30:00'),
      actionUrl: '/products/dell-optiplex-9090',
      actionText: 'View Product'
    },
    {
      id: '7',
      title: 'Warranty Expiring Soon',
      message: 'Your Dell OptiPlex 7090 warranty will expire on March 15, 2024. Consider extending your coverage.',
      type: 'warning',
      priority: 'medium',
      isRead: false,
      isStarred: false,
      timestamp: new Date('2024-02-16T08:00:00'),
      actionUrl: '/warranties/extend',
      actionText: 'Extend Warranty'
    },
    {
      id: '8',
      title: 'Support Ticket Resolved',
      message: 'Your support ticket #TKT-2024-005 regarding network connectivity has been resolved.',
      type: 'success',
      priority: 'low',
      isRead: true,
      isStarred: false,
      timestamp: new Date('2024-02-15T17:20:00'),
      actionUrl: '/support/TKT-2024-005',
      actionText: 'View Ticket'
    }
  ]);

  const getTypeIcon = (type: string) => {
    const typeData = notificationTypes.find(t => t.id === type);
    if (!typeData) return <Bell className="w-5 h-5" />;
    const IconComponent = typeData.icon;
    return <IconComponent className={`w-5 h-5 ${typeData.color}`} />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    ));
  };

  const markAsUnread = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, isRead: false } : notif
    ));
  };

  const toggleStar = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, isStarred: !notif.isStarred } : notif
    ));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const toggleSelectNotification = (notificationId: string) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId) 
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const bulkMarkAsRead = () => {
    setNotifications(prev => prev.map(notif => 
      selectedNotifications.includes(notif.id) ? { ...notif, isRead: true } : notif
    ));
    setSelectedNotifications([]);
  };

  const bulkDelete = () => {
    setNotifications(prev => prev.filter(notif => !selectedNotifications.includes(notif.id)));
    setSelectedNotifications([]);
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || notif.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'unread' && !notif.isRead) ||
                         (statusFilter === 'read' && notif.isRead) ||
                         (statusFilter === 'starred' && notif.isStarred);
    const matchesPriority = priorityFilter === 'all' || notif.priority === priorityFilter;
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const starredCount = notifications.filter(n => n.isStarred).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent' && !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
            <Bell className="w-8 h-8" />
            Notifications Hub
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white">
                {unreadCount}
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">Stay updated with system alerts and important messages</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
          <Button className="bg-gradient-to-r from-primary to-primary/80">
            <Settings className="w-4 h-4 mr-2" />
            Notification Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{notifications.length}</p>
              <p className="text-sm text-muted-foreground">Total Notifications</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <BellOff className="w-8 h-8 text-orange-500" />
            <div>
              <p className="text-2xl font-bold">{unreadCount}</p>
              <p className="text-sm text-muted-foreground">Unread</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold">{starredCount}</p>
              <p className="text-sm text-muted-foreground">Starred</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <div>
              <p className="text-2xl font-bold">{urgentCount}</p>
              <p className="text-sm text-muted-foreground">Urgent</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Types</option>
            {notificationTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="starred">Starred</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedNotifications.length > 0 && (
          <div className="flex items-center gap-2 mt-4 p-3 bg-muted rounded-lg">
            <span className="text-sm font-medium">
              {selectedNotifications.length} selected
            </span>
            <Button size="sm" variant="outline" onClick={bulkMarkAsRead}>
              <Check className="w-4 h-4 mr-1" />
              Mark Read
            </Button>
            <Button size="sm" variant="outline" onClick={bulkDelete}>
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setSelectedNotifications([])}
            >
              Cancel
            </Button>
          </div>
        )}
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`p-4 transition-all hover:shadow-md ${
              !notification.isRead ? 'border-l-4 border-l-primary bg-primary/5' : ''
            }`}>
              <div className="flex items-start gap-4">
                {/* Selection Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedNotifications.includes(notification.id)}
                  onChange={() => toggleSelectNotification(notification.id)}
                  className="mt-1"
                />

                {/* Notification Icon */}
                <div className="flex-shrink-0 mt-1">
                  {getTypeIcon(notification.type)}
                </div>

                {/* Notification Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${!notification.isRead ? 'text-primary' : ''}`}>
                          {notification.title}
                        </h3>
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                        {notification.isStarred && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{formatTimeAgo(notification.timestamp)}</span>
                        {notification.relatedId && (
                          <span>ID: {notification.relatedId}</span>
                        )}
                      </div>
                    </div>

                    {/* Timestamp and Actions */}
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp.toLocaleTimeString()}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleStar(notification.id)}
                        >
                          {notification.isStarred ? (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          ) : (
                            <Star className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => notification.isRead ? markAsUnread(notification.id) : markAsRead(notification.id)}
                        >
                          {notification.isRead ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  {notification.actionText && notification.actionUrl && (
                    <div className="mt-3">
                      <Button size="sm" variant="outline">
                        {notification.actionText}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <Card className="p-12 text-center">
          <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No notifications found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || typeFilter !== 'all' || statusFilter !== 'all' || priorityFilter !== 'all'
              ? 'Try adjusting your search criteria or filters.'
              : 'You\'re all caught up! No new notifications at the moment.'
            }
          </p>
          {(searchTerm || typeFilter !== 'all' || statusFilter !== 'all' || priorityFilter !== 'all') && (
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
                setStatusFilter('all');
                setPriorityFilter('all');
              }}
            >
              Clear Filters
            </Button>
          )}
        </Card>
      )}
    </div>
  );
}
