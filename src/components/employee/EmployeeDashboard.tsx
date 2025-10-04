import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Clock,
  DollarSign,
  FileText,
  Calendar,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  User,
  Briefcase,
  Phone,
  Mail,
  BarChart3,
  LogOut
} from 'lucide-react';
import { EmployeeDashboardData, CreateTicketForm } from '../../types/employee';
import { EmployeeService } from '../../services/employeeService';

interface EmployeeDashboardProps {
  employeeId: string;
  onLogout: () => void;
}

export function EmployeeDashboard({ employeeId, onLogout }: EmployeeDashboardProps) {
  const [dashboardData, setDashboardData] = useState<EmployeeDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'create' | 'reports'>('overview');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Create ticket form state
  const [createForm, setCreateForm] = useState<CreateTicketForm>({
    projectName: '',
    description: '',
    startTime: '',
    endTime: '',
    date: new Date().toISOString().split('T')[0] || new Date().toLocaleDateString('en-CA')
  });

  // Load dashboard data
  useEffect(() => {
    loadDashboardData();
  }, [employeeId]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await EmployeeService.getEmployeeDashboardData(employeeId);
      if (response.success && response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await EmployeeService.createWorkTicket(employeeId, createForm);
      if (response.success) {
        setCreateForm({
          projectName: '',
          description: '',
          startTime: '',
          endTime: '',
          date: new Date().toISOString().split('T')[0] || new Date().toLocaleDateString('en-CA')
        });
        await loadDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Failed to create ticket:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle;
      case 'pending': return AlertCircle;
      case 'rejected': return XCircle;
      default: return FileText;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-h3 font-bold mb-4">Unable to Load Dashboard</h2>
          <p className="text-muted-foreground mb-6">Please try refreshing the page.</p>
          <Button onClick={loadDashboardData}>Retry</Button>
        </Card>
      </div>
    );
  }

  const { employee } = dashboardData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                {employee.avatar ? (
                  <img src={employee.avatar} alt={employee.firstName} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h1 className="text-h4 font-bold">Welcome back, {employee.firstName}!</h1>
                <p className="text-muted-foreground">{employee.department} Department • {employee.employeeId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="capitalize">
                {employee.role}
              </Badge>
              <Button variant="ghost" onClick={onLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-8"
        >
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'tickets', label: 'My Tickets', icon: FileText },
            { id: 'create', label: 'Create Ticket', icon: Plus },
            { id: 'reports', label: 'Reports', icon: TrendingUp }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">This Week</p>
                      <p className="text-2xl font-bold">{dashboardData.currentWeekHours}h</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-200" />
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Week Earnings</p>
                      <p className="text-2xl font-bold">${dashboardData.currentWeekEarnings.toFixed(2)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-200" />
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">This Month</p>
                      <p className="text-2xl font-bold">{dashboardData.currentMonthHours}h</p>
                    </div>
                    <Calendar className="w-8 h-8 text-purple-200" />
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Month Earnings</p>
                      <p className="text-2xl font-bold">${dashboardData.currentMonthEarnings.toFixed(2)}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-orange-200" />
                  </div>
                </Card>
              </div>

              {/* Recent Tickets */}
              <Card className="p-6">
                <h3 className="text-h5 font-semibold mb-4">Recent Work Tickets</h3>
                <div className="space-y-3">
                  {dashboardData.recentTickets.slice(0, 5).map((ticket) => {
                    const StatusIcon = getStatusIcon(ticket.status);
                    return (
                      <motion.div
                        key={ticket.id}
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <StatusIcon className={`w-5 h-5 ${ticket.status === 'approved' ? 'text-green-500' : ticket.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`} />
                          <div>
                            <p className="font-medium">{ticket.projectName}</p>
                            <p className="text-sm text-muted-foreground">{ticket.ticketNumber}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${ticket.totalAmount.toFixed(2)}</p>
                          <Badge className={`${getStatusColor(ticket.status)} text-white text-xs`}>
                            {ticket.status}
                          </Badge>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>

              {/* Employee Profile */}
              <Card className="p-6">
                <h3 className="text-h5 font-semibold mb-4">Employee Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">{employee.firstName} {employee.lastName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{employee.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{employee.phone || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Department</p>
                        <p className="font-medium">{employee.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Hourly Rate</p>
                        <p className="font-medium">${employee.hourlyRate.toFixed(2)}/hour</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p className="font-medium">{employee.startDate.toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'tickets' && (
            <motion.div
              key="tickets"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-h5 font-semibold">My Work Tickets</h3>
                  <div className="flex gap-2">
                    <Badge variant="outline">
                      {dashboardData.pendingTickets.length} Pending
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {dashboardData.approvedTickets.length} Approved
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {dashboardData.recentTickets.map((ticket) => {
                    const StatusIcon = getStatusIcon(ticket.status);
                    return (
                      <motion.div
                        key={ticket.id}
                        whileHover={{ scale: 1.01 }}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <StatusIcon className={`w-5 h-5 ${ticket.status === 'approved' ? 'text-green-500' : ticket.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`} />
                              <h4 className="font-semibold">{ticket.projectName}</h4>
                              <Badge className={`${getStatusColor(ticket.status)} text-white text-xs`}>
                                {ticket.status}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-3">{ticket.description}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Ticket #</p>
                                <p className="font-medium">{ticket.ticketNumber}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Hours</p>
                                <p className="font-medium">{ticket.totalHours}h</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Amount</p>
                                <p className="font-medium">${ticket.totalAmount.toFixed(2)}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Date</p>
                                <p className="font-medium">{ticket.startTime.toLocaleDateString()}</p>
                              </div>
                            </div>
                            {ticket.rejectionReason && (
                              <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                <p className="text-sm text-red-700 dark:text-red-300">
                                  <strong>Rejection Reason:</strong> {ticket.rejectionReason}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'create' && (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-6 max-w-2xl mx-auto">
                <h3 className="text-h5 font-semibold mb-6">Create New Work Ticket</h3>
                
                <form onSubmit={handleCreateTicket} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Name *</label>
                    <Input
                      value={createForm.projectName}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, projectName: e.target.value }))}
                      placeholder="e.g., Network Infrastructure Setup"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <Textarea
                      value={createForm.description}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the work performed..."
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Date *</label>
                    <Input
                      type="date"
                      value={createForm.date}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, date: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Start Time *</label>
                      <Input
                        type="time"
                        value={createForm.startTime}
                        onChange={(e) => setCreateForm(prev => ({ ...prev, startTime: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">End Time *</label>
                      <Input
                        type="time"
                        value={createForm.endTime}
                        onChange={(e) => setCreateForm(prev => ({ ...prev, endTime: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  {createForm.startTime && createForm.endTime && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <strong>Estimated Hours:</strong> {
                          createForm.startTime && createForm.endTime 
                            ? ((new Date(`2000-01-01T${createForm.endTime}`).getTime() - new Date(`2000-01-01T${createForm.startTime}`).getTime()) / (1000 * 60 * 60)).toFixed(2)
                            : '0'
                        } hours
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <strong>Estimated Amount:</strong> ${
                          createForm.startTime && createForm.endTime 
                            ? (((new Date(`2000-01-01T${createForm.endTime}`).getTime() - new Date(`2000-01-01T${createForm.startTime}`).getTime()) / (1000 * 60 * 60)) * employee.hourlyRate).toFixed(2)
                            : '0.00'
                        }
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                      {isSubmitting ? 'Creating...' : 'Create Ticket'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setCreateForm({
                        projectName: '',
                        description: '',
                        startTime: '',
                        endTime: '',
                        date: new Date().toISOString().split('T')[0] || new Date().toLocaleDateString('en-CA')
                      })}
                    >
                      Clear
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}

          {activeTab === 'reports' && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <h3 className="text-h5 font-semibold mb-4">Weekly Performance</h3>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Chart visualization would be implemented here</p>
                    <p className="text-sm">Using Chart.js or similar library</p>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h4 className="font-semibold mb-4">Ticket Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Tickets:</span>
                      <span className="font-medium">{dashboardData.recentTickets.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Approved:</span>
                      <span className="font-medium text-green-600">{dashboardData.approvedTickets.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending:</span>
                      <span className="font-medium text-yellow-600">{dashboardData.pendingTickets.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rejected:</span>
                      <span className="font-medium text-red-600">{dashboardData.rejectedTickets.length}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="font-semibold mb-4">Earnings Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>This Week:</span>
                      <span className="font-medium">${dashboardData.currentWeekEarnings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>This Month:</span>
                      <span className="font-medium">${dashboardData.currentMonthEarnings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hourly Rate:</span>
                      <span className="font-medium">${employee.hourlyRate.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Hours (Month):</span>
                      <span className="font-medium">{dashboardData.currentMonthHours}h</span>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
