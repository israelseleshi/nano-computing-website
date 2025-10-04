// ============================================================================
// EMPLOYEE SERVICE - PREMIUM BUSINESS LOGIC LAYER
// ============================================================================

import { 
  Employee, 
  WorkTicket, 
  EmployeeDashboardData, 
  ManagerDashboardData, 
  AdminDashboardData,
  CreateTicketForm,
  ApiResponse,
  WeeklyStats,
  TeamStats,
  DepartmentStats,
  ActivityLog
} from '../types/employee';

// ============================================================================
// MOCK DATA - In production, this would connect to a real database
// ============================================================================

const mockEmployees: Employee[] = [
  {
    id: 'emp_001',
    employeeId: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@nano.com',
    role: 'employee',
    department: 'IT',
    hourlyRate: 25.00,
    managerId: 'emp_002',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
    phone: '+251-911-123456',
    startDate: new Date('2024-01-15'),
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2025-01-04')
  },
  {
    id: 'emp_002',
    employeeId: 'EMP002',
    firstName: 'Sarah',
    lastName: 'Manager',
    email: 'sarah.manager@nano.com',
    role: 'manager',
    department: 'IT',
    hourlyRate: 45.00,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
    phone: '+251-911-234567',
    startDate: new Date('2023-06-01'),
    isActive: true,
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2025-01-04')
  },
  {
    id: 'emp_003',
    employeeId: 'EMP003',
    firstName: 'Admin',
    lastName: 'System',
    email: 'admin.system@nano.com',
    role: 'admin',
    department: 'Management',
    hourlyRate: 60.00,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
    phone: '+251-911-345678',
    startDate: new Date('2023-01-01'),
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2025-01-04')
  },
  {
    id: 'emp_004',
    employeeId: 'EMP004',
    firstName: 'Mike',
    lastName: 'Security',
    email: 'mike.security@nano.com',
    role: 'employee',
    department: 'Security',
    hourlyRate: 30.00,
    managerId: 'emp_002',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
    phone: '+251-911-456789',
    startDate: new Date('2024-03-01'),
    isActive: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2025-01-04')
  }
];

const mockWorkTickets: WorkTicket[] = [
  {
    id: 'ticket_001',
    ticketNumber: 'TKT-2025-001',
    employeeId: 'emp_001',
    projectName: 'Network Infrastructure Setup',
    description: 'Configured new switches and routers for client office',
    startTime: new Date('2025-01-03T09:00:00'),
    endTime: new Date('2025-01-03T17:00:00'),
    totalHours: 8,
    hourlyRate: 25.00,
    totalAmount: 200.00,
    status: 'approved',
    submittedAt: new Date('2025-01-03T17:30:00'),
    approvedAt: new Date('2025-01-04T08:00:00'),
    approvedBy: 'emp_002',
    createdAt: new Date('2025-01-03T17:30:00'),
    updatedAt: new Date('2025-01-04T08:00:00')
  },
  {
    id: 'ticket_002',
    ticketNumber: 'TKT-2025-002',
    employeeId: 'emp_001',
    projectName: 'CCTV System Maintenance',
    description: 'Performed routine maintenance on surveillance cameras',
    startTime: new Date('2025-01-04T08:00:00'),
    endTime: new Date('2025-01-04T12:00:00'),
    totalHours: 4,
    hourlyRate: 25.00,
    totalAmount: 100.00,
    status: 'pending',
    submittedAt: new Date('2025-01-04T12:30:00'),
    createdAt: new Date('2025-01-04T12:30:00'),
    updatedAt: new Date('2025-01-04T12:30:00')
  },
  {
    id: 'ticket_003',
    ticketNumber: 'TKT-2025-003',
    employeeId: 'emp_004',
    projectName: 'Security Audit',
    description: 'Conducted comprehensive security assessment',
    startTime: new Date('2025-01-02T10:00:00'),
    endTime: new Date('2025-01-02T18:00:00'),
    totalHours: 8,
    hourlyRate: 30.00,
    totalAmount: 240.00,
    status: 'approved',
    submittedAt: new Date('2025-01-02T18:30:00'),
    approvedAt: new Date('2025-01-03T09:00:00'),
    approvedBy: 'emp_002',
    createdAt: new Date('2025-01-02T18:30:00'),
    updatedAt: new Date('2025-01-03T09:00:00')
  }
];

// ============================================================================
// EMPLOYEE SERVICE CLASS
// ============================================================================

export class EmployeeService {
  
  // ============================================================================
  // AUTHENTICATION METHODS
  // ============================================================================
  
  static async authenticateEmployee(email: string, password: string): Promise<ApiResponse<Employee>> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials validation
      const demoCredentials = [
        { email: 'john.doe@nano.com', password: 'employee123' },
        { email: 'sarah.manager@nano.com', password: 'manager123' },
        { email: 'admin.system@nano.com', password: 'admin123' }
      ];
      
      const validCredential = demoCredentials.find(
        cred => cred.email === email && cred.password === password
      );
      
      if (!validCredential) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }
      
      const employee = mockEmployees.find(emp => emp.email === email);
      
      if (!employee) {
        return {
          success: false,
          error: 'Employee not found'
        };
      }
      
      return {
        success: true,
        data: employee,
        message: 'Authentication successful'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Authentication failed'
      };
    }
  }
  
  // ============================================================================
  // EMPLOYEE DASHBOARD METHODS
  // ============================================================================
  
  static async getEmployeeDashboardData(employeeId: string): Promise<ApiResponse<EmployeeDashboardData>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const employee = mockEmployees.find(emp => emp.id === employeeId);
      if (!employee) {
        return { success: false, error: 'Employee not found' };
      }
      
      const employeeTickets = mockWorkTickets.filter(ticket => ticket.employeeId === employeeId);
      
      // Calculate current week and month stats
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      const currentWeekTickets = employeeTickets.filter(
        ticket => ticket.startTime >= startOfWeek && ticket.status === 'approved'
      );
      const currentMonthTickets = employeeTickets.filter(
        ticket => ticket.startTime >= startOfMonth && ticket.status === 'approved'
      );
      
      const currentWeekHours = currentWeekTickets.reduce((sum, ticket) => sum + ticket.totalHours, 0);
      const currentMonthHours = currentMonthTickets.reduce((sum, ticket) => sum + ticket.totalHours, 0);
      const currentWeekEarnings = currentWeekTickets.reduce((sum, ticket) => sum + ticket.totalAmount, 0);
      const currentMonthEarnings = currentMonthTickets.reduce((sum, ticket) => sum + ticket.totalAmount, 0);
      
      // Generate weekly stats for the last 8 weeks
      const weeklyStats: WeeklyStats[] = [];
      for (let i = 7; i >= 0; i--) {
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - (i * 7) - weekStart.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        
        const weekTickets = employeeTickets.filter(
          ticket => ticket.startTime >= weekStart && ticket.startTime <= weekEnd && ticket.status === 'approved'
        );
        
        const weekNumber = `2025-W${String(Math.ceil((weekStart.getTime() - new Date(weekStart.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000))).padStart(2, '0')}`;
        
        weeklyStats.push({
          week: weekNumber,
          hours: weekTickets.reduce((sum, ticket) => sum + ticket.totalHours, 0),
          earnings: weekTickets.reduce((sum, ticket) => sum + ticket.totalAmount, 0),
          ticketCount: weekTickets.length
        });
      }
      
      const dashboardData: EmployeeDashboardData = {
        employee,
        currentWeekHours,
        currentMonthHours,
        currentWeekEarnings,
        currentMonthEarnings,
        recentTickets: employeeTickets.slice(0, 5),
        pendingTickets: employeeTickets.filter(ticket => ticket.status === 'pending'),
        approvedTickets: employeeTickets.filter(ticket => ticket.status === 'approved'),
        rejectedTickets: employeeTickets.filter(ticket => ticket.status === 'rejected'),
        weeklyStats
      };
      
      return {
        success: true,
        data: dashboardData
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to load dashboard data'
      };
    }
  }
  
  // ============================================================================
  // WORK TICKET METHODS
  // ============================================================================
  
  static async createWorkTicket(employeeId: string, ticketData: CreateTicketForm): Promise<ApiResponse<WorkTicket>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const employee = mockEmployees.find(emp => emp.id === employeeId);
      if (!employee) {
        return { success: false, error: 'Employee not found' };
      }
      
      const startTime = new Date(`${ticketData.date}T${ticketData.startTime}`);
      const endTime = new Date(`${ticketData.date}T${ticketData.endTime}`);
      const totalHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
      
      if (totalHours <= 0) {
        return { success: false, error: 'End time must be after start time' };
      }
      
      const newTicket: WorkTicket = {
        id: `ticket_${Date.now()}`,
        ticketNumber: `TKT-2025-${String(mockWorkTickets.length + 1).padStart(3, '0')}`,
        employeeId,
        projectName: ticketData.projectName,
        description: ticketData.description,
        startTime,
        endTime,
        totalHours: Math.round(totalHours * 100) / 100,
        hourlyRate: employee.hourlyRate,
        totalAmount: Math.round(totalHours * employee.hourlyRate * 100) / 100,
        status: 'pending',
        submittedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      mockWorkTickets.push(newTicket);
      
      return {
        success: true,
        data: newTicket,
        message: 'Work ticket created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create work ticket'
      };
    }
  }
  
  static async getWorkTickets(employeeId: string): Promise<ApiResponse<WorkTicket[]>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const tickets = mockWorkTickets.filter(ticket => ticket.employeeId === employeeId);
      
      return {
        success: true,
        data: tickets.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to load work tickets'
      };
    }
  }
  
  // ============================================================================
  // MANAGER DASHBOARD METHODS
  // ============================================================================
  
  static async getManagerDashboardData(managerId: string): Promise<ApiResponse<ManagerDashboardData>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const manager = mockEmployees.find(emp => emp.id === managerId);
      if (!manager || manager.role !== 'manager') {
        return { success: false, error: 'Manager not found' };
      }
      
      const teamMembers = mockEmployees.filter(emp => emp.managerId === managerId);
      const teamIds = teamMembers.map(member => member.id);
      const pendingApprovals = mockWorkTickets.filter(
        ticket => teamIds.includes(ticket.employeeId) && ticket.status === 'pending'
      );
      
      // Calculate team stats
      const teamTickets = mockWorkTickets.filter(ticket => teamIds.includes(ticket.employeeId));
      const approvedTeamTickets = teamTickets.filter(ticket => ticket.status === 'approved');
      
      const teamStats: TeamStats = {
        totalHours: approvedTeamTickets.reduce((sum, ticket) => sum + ticket.totalHours, 0),
        totalCost: approvedTeamTickets.reduce((sum, ticket) => sum + ticket.totalAmount, 0),
        averageHourlyRate: teamMembers.reduce((sum, member) => sum + member.hourlyRate, 0) / teamMembers.length,
        productivityScore: Math.min(100, (approvedTeamTickets.length / Math.max(teamTickets.length, 1)) * 100),
        pendingApprovals: pendingApprovals.length
      };
      
      const recentActivity: ActivityLog[] = [
        {
          id: 'activity_1',
          type: 'ticket_created',
          description: 'John Doe submitted a new work ticket',
          performedBy: 'emp_001',
          performedAt: new Date('2025-01-04T12:30:00')
        },
        {
          id: 'activity_2',
          type: 'ticket_approved',
          description: 'Network Infrastructure Setup ticket approved',
          performedBy: managerId,
          performedAt: new Date('2025-01-04T08:00:00')
        }
      ];
      
      const dashboardData: ManagerDashboardData = {
        manager,
        teamMembers,
        pendingApprovals,
        teamStats,
        departmentBudget: {
          allocated: 50000,
          spent: teamStats.totalCost,
          remaining: 50000 - teamStats.totalCost,
          utilizationPercentage: (teamStats.totalCost / 50000) * 100
        },
        recentActivity
      };
      
      return {
        success: true,
        data: dashboardData
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to load manager dashboard data'
      };
    }
  }
  
  // ============================================================================
  // TICKET APPROVAL METHODS
  // ============================================================================
  
  static async approveTicket(ticketId: string, managerId: string): Promise<ApiResponse<WorkTicket>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const ticketIndex = mockWorkTickets.findIndex(ticket => ticket.id === ticketId);
      if (ticketIndex === -1) {
        return { success: false, error: 'Ticket not found' };
      }
      
      const ticket = mockWorkTickets[ticketIndex];
      if (!ticket || ticket.status !== 'pending') {
        return { success: false, error: 'Ticket is not pending approval' };
      }
      
      const updatedTicket: WorkTicket = {
        ...ticket,
        status: 'approved',
        approvedAt: new Date(),
        approvedBy: managerId,
        updatedAt: new Date()
      };
      
      mockWorkTickets[ticketIndex] = updatedTicket;
      
      return {
        success: true,
        data: updatedTicket,
        message: 'Ticket approved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to approve ticket'
      };
    }
  }
  
  static async rejectTicket(ticketId: string, _managerId: string, reason: string): Promise<ApiResponse<WorkTicket>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const ticketIndex = mockWorkTickets.findIndex(ticket => ticket.id === ticketId);
      if (ticketIndex === -1) {
        return { success: false, error: 'Ticket not found' };
      }
      
      const ticket = mockWorkTickets[ticketIndex];
      if (!ticket || ticket.status !== 'pending') {
        return { success: false, error: 'Ticket is not pending approval' };
      }
      
      const updatedTicket: WorkTicket = {
        ...ticket,
        status: 'rejected',
        rejectedAt: new Date(),
        rejectionReason: reason,
        updatedAt: new Date()
      };
      
      mockWorkTickets[ticketIndex] = updatedTicket;
      
      return {
        success: true,
        data: updatedTicket,
        message: 'Ticket rejected successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to reject ticket'
      };
    }
  }
  
  // ============================================================================
  // ADMIN METHODS
  // ============================================================================
  
  static async getAdminDashboardData(): Promise<ApiResponse<AdminDashboardData>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 700));
      
      const totalPendingTickets = mockWorkTickets.filter(ticket => ticket.status === 'pending').length;
      const approvedTickets = mockWorkTickets.filter(ticket => ticket.status === 'approved');
      const totalMonthlyPayroll = approvedTickets.reduce((sum, ticket) => sum + ticket.totalAmount, 0);
      
      const departmentStats: DepartmentStats[] = [
        {
          department: 'IT',
          employeeCount: mockEmployees.filter(emp => emp.department === 'IT').length,
          totalHours: approvedTickets.filter(ticket => {
            const employee = mockEmployees.find(emp => emp.id === ticket.employeeId);
            return employee?.department === 'IT';
          }).reduce((sum, ticket) => sum + ticket.totalHours, 0),
          totalCost: approvedTickets.filter(ticket => {
            const employee = mockEmployees.find(emp => emp.id === ticket.employeeId);
            return employee?.department === 'IT';
          }).reduce((sum, ticket) => sum + ticket.totalAmount, 0),
          budgetUtilization: 65
        },
        {
          department: 'Security',
          employeeCount: mockEmployees.filter(emp => emp.department === 'Security').length,
          totalHours: approvedTickets.filter(ticket => {
            const employee = mockEmployees.find(emp => emp.id === ticket.employeeId);
            return employee?.department === 'Security';
          }).reduce((sum, ticket) => sum + ticket.totalHours, 0),
          totalCost: approvedTickets.filter(ticket => {
            const employee = mockEmployees.find(emp => emp.id === ticket.employeeId);
            return employee?.department === 'Security';
          }).reduce((sum, ticket) => sum + ticket.totalAmount, 0),
          budgetUtilization: 45
        }
      ];
      
      const dashboardData: AdminDashboardData = {
        totalEmployees: mockEmployees.length,
        totalDepartments: 6,
        totalPendingTickets,
        totalMonthlyPayroll,
        departmentStats,
        systemActivity: [
          {
            id: 'sys_activity_1',
            type: 'employee_added',
            description: 'New employee Mike Security added to Security department',
            performedBy: 'emp_003',
            performedAt: new Date('2024-03-01T10:00:00')
          }
        ],
        payrollSummary: mockEmployees.map(emp => {
          const empTickets = approvedTickets.filter(ticket => ticket.employeeId === emp.id);
          const totalHours = empTickets.reduce((sum, ticket) => sum + ticket.totalHours, 0);
          const overtimeHours = Math.max(0, totalHours - 40);
          
          return {
            employeeId: emp.employeeId,
            employeeName: `${emp.firstName} ${emp.lastName}`,
            department: emp.department,
            totalHours,
            hourlyRate: emp.hourlyRate,
            grossPay: empTickets.reduce((sum, ticket) => sum + ticket.totalAmount, 0),
            overtimeHours,
            overtimePay: overtimeHours * emp.hourlyRate * 1.5
          };
        })
      };
      
      return {
        success: true,
        data: dashboardData
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to load admin dashboard data'
      };
    }
  }
  
  // ============================================================================
  // UTILITY METHODS
  // ============================================================================
  
  static async exportPayrollData(startDate: Date, endDate: Date): Promise<ApiResponse<string>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const ticketsInRange = mockWorkTickets.filter(
        ticket => ticket.startTime >= startDate && ticket.startTime <= endDate && ticket.status === 'approved'
      );
      
      // Generate CSV content
      const csvHeader = 'Employee ID,Employee Name,Department,Hours,Hourly Rate,Total Amount,Date\n';
      const csvRows = ticketsInRange.map(ticket => {
        const employee = mockEmployees.find(emp => emp.id === ticket.employeeId);
        return `${employee?.employeeId},${employee?.firstName} ${employee?.lastName},${employee?.department},${ticket.totalHours},${ticket.hourlyRate},${ticket.totalAmount},${ticket.startTime.toISOString().split('T')[0]}`;
      }).join('\n');
      
      const csvContent = csvHeader + csvRows;
      
      return {
        success: true,
        data: csvContent,
        message: 'Payroll data exported successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to export payroll data'
      };
    }
  }
}
