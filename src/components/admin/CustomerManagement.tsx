import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Search,
  Edit,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  ShoppingCart,
  Star,
  MessageSquare,
  TrendingUp,
  UserPlus,
  Crown,
  Clock,
  Target,
  BarChart3,
  Users
} from 'lucide-react';
import { Customer, CustomerInteraction, CustomerSegment } from '../../types/admin';


export function CustomerManagement() {
  const [activeTab, setActiveTab] = useState('customers');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Mock data
  const [customers] = useState<Customer[]>([
    {
      id: 'customer-1' as any,
      firstName: 'Abebe',
      lastName: 'Kebede',
      email: 'abebe@example.com' as any,
      phone: '+251911123456',
      company: 'TechCorp Ethiopia',
      addresses: [
        {
          street: '123 Bole Road',
          city: 'Addis Ababa',
          state: 'Addis Ababa',
          postalCode: '1000',
          country: 'Ethiopia'
        }
      ],
      tags: ['enterprise', 'high-value', 'tech'],
      totalSpent: 45000 as any,
      orderCount: 8,
      averageOrderValue: 5625 as any,
      lifetimeValue: 67500 as any,
      acquisitionSource: 'website',
      lastOrderAt: new Date('2025-01-10'),
      lastContactAt: new Date('2025-01-12'),
      notes: 'Prefers email communication. Interested in enterprise solutions.',
      isVip: true,
      createdAt: new Date('2024-06-15'),
      updatedAt: new Date()
    }
  ]);

  const [interactions] = useState<CustomerInteraction[]>([
    {
      id: 'interaction-1',
      customerId: 'customer-1' as any,
      type: 'email',
      subject: 'Follow-up on CCTV Installation',
      description: 'Discussed requirements for office security system upgrade',
      outcome: 'Customer interested in premium package',
      followUpRequired: true,
      followUpDate: new Date('2025-01-20'),
      assignedTo: 'admin-1' as any,
      createdAt: new Date('2025-01-12')
    }
  ]);

  const [segments] = useState<CustomerSegment[]>([
    {
      id: 'segment-1',
      name: 'VIP Customers',
      description: 'High-value customers with lifetime value > ETB 50,000',
      criteria: { lifetimeValue: { gte: 50000 } },
      customerCount: 12,
      averageValue: 75000 as any,
      isActive: true,
      createdAt: new Date()
    },
    {
      id: 'segment-2',
      name: 'Enterprise Clients',
      description: 'Business customers with company information',
      criteria: { company: { exists: true } },
      customerCount: 28,
      averageValue: 35000 as any,
      isActive: true,
      createdAt: new Date()
    }
  ]);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesSegment = true;
    if (selectedSegment !== 'all') {
      const segment = segments.find(s => s.id === selectedSegment);
      if (segment) {
        // Simple segment matching logic
        if (segment.name === 'VIP Customers') {
          matchesSegment = customer.isVip;
        } else if (segment.name === 'Enterprise Clients') {
          matchesSegment = !!customer.company;
        }
      }
    }
    
    return matchesSearch && matchesSegment;
  });

  const getInteractionTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'phone': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'meeting': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'support': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'sales': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Customer Management
          </h1>
          <p className="text-muted-foreground mt-2">Manage customer relationships and interactions</p>
        </div>
        <div className="flex items-center gap-4">
          <Button className="bg-gradient-to-r from-primary to-blue-600">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Customers</p>
              <p className="text-2xl font-bold">{customers.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Lifetime Value</p>
              <p className="text-2xl font-bold">
                ETB {Math.round(customers.reduce((sum, c) => sum + c.lifetimeValue, 0) / customers.length).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Crown className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">VIP Customers</p>
              <p className="text-2xl font-bold">{customers.filter(c => c.isVip).length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Order Value</p>
              <p className="text-2xl font-bold">
                ETB {Math.round(customers.reduce((sum, c) => sum + c.averageOrderValue, 0) / customers.length).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="interactions" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Interactions
          </TabsTrigger>
          <TabsTrigger value="segments" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Segments
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-6">
          {/* Filters */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">All Customers</option>
                {segments.map(segment => (
                  <option key={segment.id} value={segment.id}>
                    {segment.name} ({segment.customerCount})
                  </option>
                ))}
              </select>
            </div>
          </Card>

          {/* Customers List */}
          <div className="space-y-4">
            {filteredCustomers.map((customer, index) => (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          {customer.firstName} {customer.lastName}
                        </h3>
                        {customer.isVip && (
                          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                            <Crown className="w-3 h-3 mr-1" />
                            VIP
                          </Badge>
                        )}
                        {customer.company && (
                          <Badge variant="outline">{customer.company}</Badge>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {customer.email}
                          </div>
                          {customer.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              {customer.phone}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Customer since {customer.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            ETB {customer.totalSpent.toLocaleString()} spent
                          </div>
                          <div className="flex items-center gap-2">
                            <ShoppingCart className="w-4 h-4" />
                            {customer.orderCount} orders
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            ETB {customer.lifetimeValue.toLocaleString()} LTV
                          </div>
                        </div>
                      </div>

                      {customer.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {customer.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {customer.notes && (
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-sm">{customer.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedCustomer(customer)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Recent Interactions</h3>
              <Button size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Log Interaction
              </Button>
            </div>

            <div className="space-y-4">
              {interactions.map((interaction, index) => (
                <motion.div
                  key={interaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold">{interaction.subject}</h4>
                        <Badge className={getInteractionTypeColor(interaction.type)}>
                          {interaction.type}
                        </Badge>
                        {interaction.followUpRequired && (
                          <Badge variant="outline" className="text-orange-600 border-orange-600">
                            Follow-up Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Customer: {customers.find(c => c.id === interaction.customerId)?.firstName} {customers.find(c => c.id === interaction.customerId)?.lastName}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {interaction.createdAt.toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm mb-3">{interaction.description}</p>
                  
                  {interaction.outcome && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded-lg mb-3">
                      <p className="text-sm text-green-800 dark:text-green-400">
                        <strong>Outcome:</strong> {interaction.outcome}
                      </p>
                    </div>
                  )}

                  {interaction.followUpRequired && interaction.followUpDate && (
                    <div className="flex items-center gap-2 text-sm text-orange-600">
                      <Clock className="w-4 h-4" />
                      Follow-up scheduled for {interaction.followUpDate.toLocaleDateString()}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Customer Segments</h3>
              <Button size="sm">
                <Target className="w-4 h-4 mr-2" />
                Create Segment
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {segments.map((segment, index) => (
                <motion.div
                  key={segment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">{segment.name}</h4>
                        <Badge variant={segment.isActive ? "default" : "secondary"}>
                          {segment.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground">{segment.description}</p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <p className="text-2xl font-bold text-primary">{segment.customerCount}</p>
                          <p className="text-xs text-muted-foreground">Customers</p>
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <p className="text-2xl font-bold text-primary">
                            ETB {segment.averageValue.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">Avg. Value</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          View Customers
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <UserPlus className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">New Customers</p>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-green-600">+15% this month</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Retention Rate</p>
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-xs text-blue-600">+3% this month</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                  <p className="text-2xl font-bold">4.8</p>
                  <p className="text-xs text-purple-600">Excellent</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Customer Acquisition Chart Placeholder */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Customer Acquisition Trends</h3>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Customer analytics chart would be displayed here</p>
                <p className="text-sm">Integration with charting library needed</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background border rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">
                    {selectedCustomer.firstName} {selectedCustomer.lastName}
                  </h2>
                  {selectedCustomer.isVip && (
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                      <Crown className="w-3 h-3 mr-1" />
                      VIP
                    </Badge>
                  )}
                </div>
                <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
                  ×
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Overview */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">ETB {selectedCustomer.totalSpent.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{selectedCustomer.orderCount}</p>
                    <p className="text-sm text-muted-foreground">Orders Placed</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">ETB {selectedCustomer.lifetimeValue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Lifetime Value</p>
                  </div>
                </Card>
              </div>

              {/* Contact Information */}
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {selectedCustomer.email}
                    </div>
                    {selectedCustomer.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {selectedCustomer.phone}
                      </div>
                    )}
                    {selectedCustomer.company && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        {selectedCustomer.company}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        {selectedCustomer.addresses.map((address, i) => (
                          <div key={i} className="text-muted-foreground">
                            <p>{address.street}</p>
                            <p>{address.city}, {address.state}</p>
                            <p>{address.country}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recent Interactions */}
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Recent Interactions</h3>
                <div className="space-y-3">
                  {interactions
                    .filter(i => i.customerId === selectedCustomer.id)
                    .map(interaction => (
                      <div key={interaction.id} className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge className={getInteractionTypeColor(interaction.type)}>
                              {interaction.type}
                            </Badge>
                            <span className="font-medium">{interaction.subject}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{interaction.description}</p>
                          {interaction.outcome && (
                            <p className="text-sm text-green-600">{interaction.outcome}</p>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {interaction.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}