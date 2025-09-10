import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Calendar,
  Paperclip,
  Send,
  Filter
} from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  messages: {
    id: string;
    sender: string;
    message: string;
    timestamp: Date;
    isStaff: boolean;
  }[];
}

export function SupportTickets() {
  const [activeTab, setActiveTab] = useState<'tickets' | 'create'>('tickets');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // New ticket form
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: 'technical',
    priority: 'medium' as const
  });

  // Mock ticket data
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '1',
      title: 'Network connectivity issues',
      description: 'Unable to connect to company VPN from home office',
      status: 'in-progress',
      priority: 'high',
      category: 'Network',
      createdAt: new Date('2024-02-15'),
      updatedAt: new Date('2024-02-16'),
      assignedTo: 'John Smith',
      messages: [
        {
          id: '1',
          sender: 'You',
          message: 'Unable to connect to company VPN from home office. Getting error code 800.',
          timestamp: new Date('2024-02-15T10:00:00'),
          isStaff: false
        },
        {
          id: '2',
          sender: 'John Smith',
          message: 'Thanks for reporting this. Can you please try restarting your router and let me know if the issue persists?',
          timestamp: new Date('2024-02-15T14:30:00'),
          isStaff: true
        },
        {
          id: '3',
          sender: 'You',
          message: 'I restarted the router but still getting the same error.',
          timestamp: new Date('2024-02-16T09:15:00'),
          isStaff: false
        }
      ]
    },
    {
      id: '2',
      title: 'Software installation request',
      description: 'Need Adobe Creative Suite installed on workstation',
      status: 'resolved',
      priority: 'medium',
      category: 'Software',
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-12'),
      assignedTo: 'Sarah Johnson',
      messages: [
        {
          id: '4',
          sender: 'You',
          message: 'Please install Adobe Creative Suite on my workstation for design work.',
          timestamp: new Date('2024-02-10T11:00:00'),
          isStaff: false
        },
        {
          id: '5',
          sender: 'Sarah Johnson',
          message: 'Installation completed. Please test and confirm everything is working properly.',
          timestamp: new Date('2024-02-12T16:00:00'),
          isStaff: true
        }
      ]
    },
    {
      id: '3',
      title: 'Email configuration help',
      description: 'Need help setting up email on mobile device',
      status: 'open',
      priority: 'low',
      category: 'Email',
      createdAt: new Date('2024-02-18'),
      updatedAt: new Date('2024-02-18'),
      messages: [
        {
          id: '6',
          sender: 'You',
          message: 'Can someone help me set up my work email on my iPhone?',
          timestamp: new Date('2024-02-18T13:00:00'),
          isStaff: false
        }
      ]
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'closed': return <CheckCircle className="w-4 h-4 text-gray-500" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleCreateTicket = () => {
    const ticket: Ticket = {
      id: Date.now().toString(),
      ...newTicket,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [
        {
          id: '1',
          sender: 'You',
          message: newTicket.description,
          timestamp: new Date(),
          isStaff: false
        }
      ]
    };
    
    setTickets(prev => [ticket, ...prev]);
    setNewTicket({ title: '', description: '', category: 'technical', priority: 'medium' });
    setActiveTab('tickets');
  };

  const handleSendMessage = () => {
    if (!selectedTicket || !newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      sender: 'You',
      message: newMessage,
      timestamp: new Date(),
      isStaff: false
    };

    setTickets(prev => prev.map(ticket =>
      ticket.id === selectedTicket.id
        ? { ...ticket, messages: [...ticket.messages, message], updatedAt: new Date() }
        : ticket
    ));

    setSelectedTicket(prev => prev ? { ...prev, messages: [...prev.messages, message] } : null);
    setNewMessage('');
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Support Tickets</h1>
          <p className="text-muted-foreground">Get help from our support team</p>
        </div>
        <Button 
          onClick={() => setActiveTab('create')}
          className="bg-gradient-to-r from-primary to-primary/80"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Ticket
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'tickets' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('tickets')}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          My Tickets ({tickets.length})
        </Button>
        <Button
          variant={activeTab === 'create' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('create')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      {/* Tickets List */}
      {activeTab === 'tickets' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search tickets..."
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
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </Card>

          {/* Tickets Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Tickets List */}
            <div className="space-y-4">
              {filteredTickets.length === 0 ? (
                <Card className="p-12 text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No tickets found</h3>
                  <p className="text-muted-foreground">Create a new ticket to get started</p>
                </Card>
              ) : (
                filteredTickets.map((ticket, index) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedTicket?.id === ticket.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold line-clamp-1">{ticket.title}</h3>
                        <div className="flex gap-1">
                          <Badge className={getStatusColor(ticket.status)}>
                            {getStatusIcon(ticket.status)}
                            <span className="ml-1 capitalize">{ticket.status.replace('-', ' ')}</span>
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {ticket.description}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority.toUpperCase()}
                          </Badge>
                          <span className="text-muted-foreground">{ticket.category}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {ticket.updatedAt.toLocaleDateString()}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>

            {/* Ticket Details */}
            {selectedTicket && (
              <Card className="p-6 h-fit sticky top-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{selectedTicket.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Ticket #{selectedTicket.id} • {selectedTicket.category}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(selectedTicket.status)}>
                      {selectedTicket.status.replace('-', ' ')}
                    </Badge>
                    <Badge className={getPriorityColor(selectedTicket.priority)}>
                      {selectedTicket.priority}
                    </Badge>
                  </div>
                </div>

                {selectedTicket.assignedTo && (
                  <div className="flex items-center gap-2 mb-4 p-2 bg-muted/50 rounded">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Assigned to: {selectedTicket.assignedTo}</span>
                  </div>
                )}

                {/* Messages */}
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {selectedTicket.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg ${
                        message.isStaff
                          ? 'bg-blue-50 dark:bg-blue-900/20 ml-4'
                          : 'bg-muted mr-4'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{message.sender}</span>
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  ))}
                </div>

                {/* Reply */}
                {selectedTicket.status !== 'closed' && (
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      rows={3}
                    />
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Paperclip className="w-4 h-4 mr-2" />
                        Attach File
                      </Button>
                      <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="w-4 h-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Create Ticket */}
      {activeTab === 'create' && (
        <Card className="p-6 max-w-2xl">
          <h2 className="text-xl font-semibold mb-6">Create New Support Ticket</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Title</label>
              <Input
                placeholder="Brief description of your issue"
                value={newTicket.title}
                onChange={(e) => setNewTicket(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <select
                  value={newTicket.category}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                >
                  <option value="technical">Technical Support</option>
                  <option value="software">Software</option>
                  <option value="hardware">Hardware</option>
                  <option value="network">Network</option>
                  <option value="email">Email</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Priority</label>
                <select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                placeholder="Please provide detailed information about your issue..."
                value={newTicket.description}
                onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                rows={6}
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleCreateTicket}
                disabled={!newTicket.title || !newTicket.description}
                className="bg-gradient-to-r from-primary to-primary/80"
              >
                Create Ticket
              </Button>
              <Button variant="outline" onClick={() => setActiveTab('tickets')}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
