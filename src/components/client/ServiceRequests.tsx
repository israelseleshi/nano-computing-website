import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  Wrench, 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Plus,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Settings,
  Monitor,
  Wifi,
  HardDrive,
  Shield,
  Smartphone,
  Printer,
  Camera,
  Network
} from 'lucide-react';

interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: 'hardware' | 'software' | 'network' | 'security' | 'maintenance' | 'consultation';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  createdDate: Date;
  scheduledDate?: Date;
  completedDate?: Date;
  technician?: {
    name: string;
    phone: string;
    email: string;
  };
  location: string;
  estimatedDuration: number; // in hours
  cost?: number;
  notes?: string;
}

const serviceCategories = [
  { id: 'hardware', name: 'Hardware Repair', icon: Wrench, color: 'text-blue-600' },
  { id: 'software', name: 'Software Support', icon: Monitor, color: 'text-green-600' },
  { id: 'network', name: 'Network Setup', icon: Wifi, color: 'text-purple-600' },
  { id: 'security', name: 'Security Services', icon: Shield, color: 'text-red-600' },
  { id: 'maintenance', name: 'Maintenance', icon: Settings, color: 'text-orange-600' },
  { id: 'consultation', name: 'Consultation', icon: User, color: 'text-indigo-600' }
];

export function ServiceRequests() {
  const [activeTab, setActiveTab] = useState<'requests' | 'new' | 'history'>('requests');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);

  // Form state for new service request
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: 'hardware' as const,
    priority: 'medium' as const,
    location: '',
    preferredDate: '',
    preferredTime: ''
  });

  // Mock service requests data
  const [serviceRequests] = useState<ServiceRequest[]>([
    {
      id: '1',
      title: 'Desktop Computer Not Starting',
      description: 'Dell OptiPlex 7090 won\'t boot up after power outage. No display output.',
      category: 'hardware',
      priority: 'high',
      status: 'scheduled',
      createdDate: new Date('2024-02-15'),
      scheduledDate: new Date('2024-02-20T10:00:00'),
      technician: {
        name: 'John Smith',
        phone: '+251-911-123456',
        email: 'john.smith@naanocomputing.com'
      },
      location: 'Office Building A, Floor 3, Room 301',
      estimatedDuration: 2,
      cost: 500
    },
    {
      id: '2',
      title: 'Network Connectivity Issues',
      description: 'Intermittent internet connection drops affecting entire department.',
      category: 'network',
      priority: 'urgent',
      status: 'in_progress',
      createdDate: new Date('2024-02-18'),
      scheduledDate: new Date('2024-02-19T09:00:00'),
      technician: {
        name: 'Sarah Johnson',
        phone: '+251-911-654321',
        email: 'sarah.johnson@naanocomputing.com'
      },
      location: 'Office Building B, Floor 2',
      estimatedDuration: 4,
      cost: 800
    },
    {
      id: '3',
      title: 'Software Installation & Setup',
      description: 'Install and configure Adobe Creative Suite for design team.',
      category: 'software',
      priority: 'medium',
      status: 'pending',
      createdDate: new Date('2024-02-19'),
      location: 'Design Department, Building C',
      estimatedDuration: 3,
      cost: 300
    },
    {
      id: '4',
      title: 'Security System Audit',
      description: 'Comprehensive security assessment and firewall configuration.',
      category: 'security',
      priority: 'high',
      status: 'completed',
      createdDate: new Date('2024-02-10'),
      scheduledDate: new Date('2024-02-14T14:00:00'),
      completedDate: new Date('2024-02-14T18:00:00'),
      technician: {
        name: 'Mike Wilson',
        phone: '+251-911-789012',
        email: 'mike.wilson@naanocomputing.com'
      },
      location: 'Server Room, Building A',
      estimatedDuration: 4,
      cost: 1200,
      notes: 'Security audit completed successfully. All vulnerabilities patched.'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'scheduled': return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'in_progress': return <Settings className="w-4 h-4 text-orange-500 animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'in_progress': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
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

  const getCategoryIcon = (category: string) => {
    const categoryData = serviceCategories.find(cat => cat.id === category);
    if (!categoryData) return <Wrench className="w-4 h-4" />;
    const IconComponent = categoryData.icon;
    return <IconComponent className={`w-4 h-4 ${categoryData.color}`} />;
  };

  const filteredRequests = serviceRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || request.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSubmitRequest = () => {
    // Handle form submission
    console.log('New service request:', newRequest);
    setShowNewRequestForm(false);
    setNewRequest({
      title: '',
      description: '',
      category: 'hardware',
      priority: 'medium',
      location: '',
      preferredDate: '',
      preferredTime: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Service Requests</h1>
          <p className="text-muted-foreground">Request IT support and track service progress</p>
        </div>
        <Button 
          onClick={() => setShowNewRequestForm(true)}
          className="bg-gradient-to-r from-primary to-primary/80"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Service Request
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold">
                {serviceRequests.filter(r => r.status === 'pending').length}
              </p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">
                {serviceRequests.filter(r => r.status === 'scheduled').length}
              </p>
              <p className="text-sm text-muted-foreground">Scheduled</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-orange-500" />
            <div>
              <p className="text-2xl font-bold">
                {serviceRequests.filter(r => r.status === 'in_progress').length}
              </p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold">
                {serviceRequests.filter(r => r.status === 'completed').length}
              </p>
              <p className="text-sm text-muted-foreground">Completed</p>
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
              placeholder="Search service requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Categories</option>
            {serviceCategories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Service Requests List */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedRequest?.id === request.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedRequest(request)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3">
                    {getCategoryIcon(request.category)}
                    <div>
                      <h3 className="font-semibold">{request.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {request.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge className={getStatusColor(request.status)}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1 capitalize">{request.status.replace('_', ' ')}</span>
                    </Badge>
                    <Badge className={getPriorityColor(request.priority)}>
                      {request.priority}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="truncate">{request.location}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Created</p>
                    <p>{request.createdDate.toLocaleDateString()}</p>
                  </div>
                </div>

                {request.scheduledDate && (
                  <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                    <Calendar className="w-4 h-4" />
                    <span>Scheduled: {request.scheduledDate.toLocaleString()}</span>
                  </div>
                )}

                {request.technician && (
                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-2 rounded mt-2">
                    <User className="w-4 h-4" />
                    <span>Assigned to: {request.technician.name}</span>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Request Details */}
        {selectedRequest && (
          <Card className="p-6 h-fit sticky top-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{selectedRequest.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {getCategoryIcon(selectedRequest.category)}
                  <span className="text-sm text-muted-foreground capitalize">
                    {selectedRequest.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Badge className={getStatusColor(selectedRequest.status)}>
                  {selectedRequest.status.replace('_', ' ')}
                </Badge>
                <Badge className={getPriorityColor(selectedRequest.priority)}>
                  {selectedRequest.priority} priority
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedRequest.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Created Date</p>
                  <p>{selectedRequest.createdDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimated Duration</p>
                  <p>{selectedRequest.estimatedDuration} hours</p>
                </div>
                {selectedRequest.cost && (
                  <>
                    <div>
                      <p className="text-muted-foreground">Estimated Cost</p>
                      <p>ETB {selectedRequest.cost.toLocaleString()}</p>
                    </div>
                  </>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Location</span>
                </div>
                <p className="text-sm">{selectedRequest.location}</p>
              </div>

              {selectedRequest.scheduledDate && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Scheduled Date</span>
                  </div>
                  <p className="text-sm">{selectedRequest.scheduledDate.toLocaleString()}</p>
                </div>
              )}

              {selectedRequest.technician && (
                <div>
                  <h4 className="font-medium mb-2">Assigned Technician</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedRequest.technician.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedRequest.technician.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedRequest.technician.email}</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedRequest.notes && (
                <div>
                  <h4 className="font-medium mb-2">Notes</h4>
                  <p className="text-sm text-muted-foreground">{selectedRequest.notes}</p>
                </div>
              )}

              {selectedRequest.status === 'pending' && (
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">
                    Edit Request
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Cancel Request
                  </Button>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* New Service Request Modal */}
      {showNewRequestForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <Card className="border-0">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">New Service Request</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Request Title</label>
                    <Input
                      value={newRequest.title}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Brief description of the issue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={newRequest.category}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      {serviceCategories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <select
                      value={newRequest.priority}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, priority: e.target.value as any }))}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Detailed Description</label>
                    <Textarea
                      value={newRequest.description}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Provide detailed information about the issue..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Input
                      value={newRequest.location}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Building, floor, room number"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Date</label>
                      <Input
                        type="date"
                        value={newRequest.preferredDate}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, preferredDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Time</label>
                      <Input
                        type="time"
                        value={newRequest.preferredTime}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, preferredTime: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button onClick={handleSubmitRequest} className="flex-1">
                    Submit Request
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewRequestForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}
