import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  LogOut,
  BarChart3
} from 'lucide-react';
import { ManagerDashboardData } from '../../types/employee';
import { EmployeeService } from '../../services/employeeService';

interface ManagerDashboardProps {
  managerId: string;
  onLogout: () => void;
}

export function ManagerDashboard({ managerId, onLogout }: ManagerDashboardProps) {
  const [dashboardData, setDashboardData] = useState<ManagerDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'approvals' | 'team' | 'reports'>('overview');
  const [processingTicket, setProcessingTicket] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, [managerId]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await EmployeeService.getManagerDashboardData(managerId);
      if (response.success && response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveTicket = async (ticketId: string) => {
    setProcessingTicket(ticketId);
    try {
      const response = await EmployeeService.approveTicket(ticketId, managerId);
      if (response.success) {
        await loadDashboardData();
      }
    } catch (error) {
      console.error('Failed to approve ticket:', error);
    } finally {
      setProcessingTicket(null);
    }
  };

  const handleRejectTicket = async (ticketId: string) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;

    setProcessingTicket(ticketId);
    try {
      const response = await EmployeeService.rejectTicket(ticketId, managerId, reason);
      if (response.success) {
        await loadDashboardData();
      }
    } catch (error) {
      console.error('Failed to reject ticket:', error);
    } finally {
      setProcessingTicket(null);
    }
  };

  if (isLoading || !dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const { manager, teamMembers, pendingApprovals, teamStats } = dashboardData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                {manager.avatar ? (
                  <img src={manager.avatar} alt={manager.firstName} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h1 className="text-h4 font-bold">Manager Dashboard</h1>
                <p className="text-muted-foreground">{manager.firstName} {manager.lastName} • {manager.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                Manager
              </Badge>
              <Button variant="ghost" onClick={onLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-8"
        >
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'approvals', label: 'Pending Approvals', icon: AlertCircle, count: pendingApprovals.length },
            { id: 'team', label: 'Team Management', icon: Users },
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
                {tab.count && tab.count > 0 && (
                  <Badge className="bg-red-500 text-white ml-1">{tab.count}</Badge>
                )}
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
                      <p className="text-blue-100">Team Members</p>
                      <p className="text-2xl font-bold">{teamMembers.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-200" />
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Total Hours</p>
                      <p className="text-2xl font-bold">{teamStats.totalHours}h</p>
                    </div>
                    <Clock className="w-8 h-8 text-green-200" />
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Total Cost</p>
                      <p className="text-2xl font-bold">${teamStats.totalCost.toFixed(0)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-200" />
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Pending</p>
                      <p className="text-2xl font-bold">{teamStats.pendingApprovals}</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-orange-200" />
                  </div>
                </Card>
              </div>

              {/* Team Overview */}
              <Card className="p-6">
                <h3 className="text-h5 font-semibold mb-4">Team Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          {member.avatar ? (
                            <img src={member.avatar} alt={member.firstName} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{member.firstName} {member.lastName}</p>
                          <p className="text-sm text-muted-foreground">{member.employeeId}</p>
                        </div>
                      </div>
                      <div className="text-sm space-y-1">
                        <p><span className="text-muted-foreground">Department:</span> {member.department}</p>
                        <p><span className="text-muted-foreground">Rate:</span> ${member.hourlyRate}/hr</p>
                        <p><span className="text-muted-foreground">Status:</span> 
                          <Badge className={member.isActive ? 'bg-green-500 ml-2' : 'bg-red-500 ml-2'} variant="secondary">
                            {member.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'approvals' && (
            <motion.div
              key="approvals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-6">
                <h3 className="text-h5 font-semibold mb-6">Pending Ticket Approvals</h3>
                
                {pendingApprovals.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-h5 font-semibold mb-2">All Caught Up!</h4>
                    <p className="text-muted-foreground">No pending tickets require your approval.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingApprovals.map((ticket) => {
                      const employee = teamMembers.find(m => m.id === ticket.employeeId);
                      return (
                        <motion.div
                          key={ticket.id}
                          whileHover={{ scale: 1.01 }}
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                  {employee?.avatar ? (
                                    <img src={employee.avatar} alt={employee.firstName} className="w-full h-full object-cover" />
                                  ) : (
                                    <User className="w-4 h-4 text-white" />
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-semibold">{ticket.projectName}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {employee?.firstName} {employee?.lastName} • {ticket.ticketNumber}
                                  </p>
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-3">{ticket.description}</p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Date</p>
                                  <p className="font-medium">{ticket.startTime.toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Hours</p>
                                  <p className="font-medium">{ticket.totalHours}h</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Rate</p>
                                  <p className="font-medium">${ticket.hourlyRate}/hr</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Amount</p>
                                  <p className="font-medium">${ticket.totalAmount.toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                size="sm"
                                onClick={() => handleApproveTicket(ticket.id)}
                                disabled={processingTicket === ticket.id}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRejectTicket(ticket.id)}
                                disabled={processingTicket === ticket.id}
                                className="border-red-300 text-red-600 hover:bg-red-50"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </Card>
            </motion.div>
          )}

          {activeTab === 'team' && (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-6">
                <h3 className="text-h5 font-semibold mb-6">Team Management</h3>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            {member.avatar ? (
                              <img src={member.avatar} alt={member.firstName} className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold">{member.firstName} {member.lastName}</h4>
                            <p className="text-muted-foreground">{member.email}</p>
                            <p className="text-sm text-muted-foreground">{member.employeeId} • {member.department}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${member.hourlyRate}/hour</p>
                          <Badge className={member.isActive ? 'bg-green-500' : 'bg-red-500'}>
                            {member.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                <h3 className="text-h5 font-semibold mb-4">Team Performance</h3>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Team performance charts would be implemented here</p>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h4 className="font-semibold mb-4">Department Budget</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Allocated:</span>
                      <span className="font-medium">${dashboardData.departmentBudget.allocated.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Spent:</span>
                      <span className="font-medium">${dashboardData.departmentBudget.spent.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining:</span>
                      <span className="font-medium">${dashboardData.departmentBudget.remaining.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${dashboardData.departmentBudget.utilizationPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {dashboardData.departmentBudget.utilizationPercentage.toFixed(1)}% utilized
                    </p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="font-semibold mb-4">Team Statistics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Hours:</span>
                      <span className="font-medium">{teamStats.totalHours}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Cost:</span>
                      <span className="font-medium">${teamStats.totalCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg. Rate:</span>
                      <span className="font-medium">${teamStats.averageHourlyRate.toFixed(2)}/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Productivity:</span>
                      <span className="font-medium">{teamStats.productivityScore.toFixed(1)}%</span>
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
