// ============================================================================
// EMPLOYEE MANAGEMENT SYSTEM TYPES
// ============================================================================

export type EmployeeRole = 'employee' | 'manager' | 'admin';
export type TicketStatus = 'pending' | 'approved' | 'rejected';
export type DepartmentType = 'IT' | 'Security' | 'Network' | 'Support' | 'Sales' | 'Management';

// ============================================================================
// CORE EMPLOYEE INTERFACES
// ============================================================================

export interface Employee {
  readonly id: string;
  readonly employeeId: string; // e.g., "EMP001"
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly role: EmployeeRole;
  readonly department: DepartmentType;
  readonly hourlyRate: number;
  readonly managerId?: string;
  readonly avatar?: string;
  readonly phone?: string;
  readonly startDate: Date;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface WorkTicket {
  readonly id: string;
  readonly ticketNumber: string; // e.g., "TKT-2025-001"
  readonly employeeId: string;
  readonly projectName: string;
  readonly description: string;
  readonly startTime: Date;
  readonly endTime: Date;
  readonly totalHours: number;
  readonly hourlyRate: number;
  readonly totalAmount: number;
  readonly status: TicketStatus;
  readonly submittedAt: Date;
  readonly approvedAt?: Date;
  readonly approvedBy?: string;
  readonly rejectedAt?: Date;
  readonly rejectionReason?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface Department {
  readonly id: string;
  readonly name: DepartmentType;
  readonly managerId: string;
  readonly budget: number;
  readonly employeeCount: number;
  readonly createdAt: Date;
}

// ============================================================================
// DASHBOARD DATA INTERFACES
// ============================================================================

export interface EmployeeDashboardData {
  readonly employee: Employee;
  readonly currentWeekHours: number;
  readonly currentMonthHours: number;
  readonly currentWeekEarnings: number;
  readonly currentMonthEarnings: number;
  readonly recentTickets: WorkTicket[];
  readonly pendingTickets: WorkTicket[];
  readonly approvedTickets: WorkTicket[];
  readonly rejectedTickets: WorkTicket[];
  readonly weeklyStats: WeeklyStats[];
}

export interface ManagerDashboardData {
  readonly manager: Employee;
  readonly teamMembers: Employee[];
  readonly pendingApprovals: WorkTicket[];
  readonly teamStats: TeamStats;
  readonly departmentBudget: DepartmentBudget;
  readonly recentActivity: ActivityLog[];
}

export interface AdminDashboardData {
  readonly totalEmployees: number;
  readonly totalDepartments: number;
  readonly totalPendingTickets: number;
  readonly totalMonthlyPayroll: number;
  readonly departmentStats: DepartmentStats[];
  readonly systemActivity: ActivityLog[];
  readonly payrollSummary: PayrollSummary[];
}

// ============================================================================
// STATISTICS INTERFACES
// ============================================================================

export interface WeeklyStats {
  readonly week: string; // "2025-W01"
  readonly hours: number;
  readonly earnings: number;
  readonly ticketCount: number;
}

export interface TeamStats {
  readonly totalHours: number;
  readonly totalCost: number;
  readonly averageHourlyRate: number;
  readonly productivityScore: number;
  readonly pendingApprovals: number;
}

export interface DepartmentStats {
  readonly department: DepartmentType;
  readonly employeeCount: number;
  readonly totalHours: number;
  readonly totalCost: number;
  readonly budgetUtilization: number;
}

export interface DepartmentBudget {
  readonly allocated: number;
  readonly spent: number;
  readonly remaining: number;
  readonly utilizationPercentage: number;
}

export interface PayrollSummary {
  readonly employeeId: string;
  readonly employeeName: string;
  readonly department: DepartmentType;
  readonly totalHours: number;
  readonly hourlyRate: number;
  readonly grossPay: number;
  readonly overtimeHours: number;
  readonly overtimePay: number;
}

export interface ActivityLog {
  readonly id: string;
  readonly type: 'ticket_created' | 'ticket_approved' | 'ticket_rejected' | 'employee_added' | 'employee_updated';
  readonly description: string;
  readonly performedBy: string;
  readonly performedAt: Date;
  readonly metadata?: Record<string, any>;
}

// ============================================================================
// FORM INTERFACES
// ============================================================================

export interface CreateTicketForm {
  projectName: string;
  description: string;
  startTime: string;
  endTime: string;
  date: string;
}

export interface TicketApprovalForm {
  ticketId: string;
  action: 'approve' | 'reject';
  rejectionReason?: string;
}

export interface CreateEmployeeForm {
  firstName: string;
  lastName: string;
  email: string;
  role: EmployeeRole;
  department: DepartmentType;
  hourlyRate: number;
  managerId?: string;
  phone?: string;
  startDate: string;
}

// ============================================================================
// API RESPONSE INTERFACES
// ============================================================================

export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly message?: string;
}

export interface PaginatedResponse<T> {
  readonly items: T[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ============================================================================
// DEMO CREDENTIALS
// ============================================================================

export interface DemoCredentials {
  readonly role: EmployeeRole;
  readonly email: string;
  readonly password: string;
  readonly description: string;
}

export const DEMO_CREDENTIALS: DemoCredentials[] = [
  {
    role: 'employee',
    email: 'john.doe@nano.com',
    password: 'employee123',
    description: 'Regular employee - can view own tickets and create new ones'
  },
  {
    role: 'manager',
    email: 'sarah.manager@nano.com',
    password: 'manager123',
    description: 'Department manager - can approve/reject team tickets and view reports'
  },
  {
    role: 'admin',
    email: 'admin.system@nano.com',
    password: 'admin123',
    description: 'System administrator - full access to all features and data'
  }
];
