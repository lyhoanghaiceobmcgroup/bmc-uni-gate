// RBAC/ABAC Permission System for Sales Reports

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  company: string;
  permissions: Permission[];
}

export type UserRole = 
  | 'employee'        // Nhân viên
  | 'team_leader'     // Trưởng nhóm
  | 'department_head' // Trưởng phòng
  | 'ceo'            // CEO
  | 'bmc_admin';     // BMC Admin

export type Permission = 
  | 'view_personal_reports'     // Xem báo cáo cá nhân
  | 'create_personal_reports'   // Tạo báo cáo cá nhân
  | 'edit_personal_reports'     // Sửa báo cáo cá nhân
  | 'delete_personal_reports'   // Xóa báo cáo cá nhân
  | 'view_team_reports'         // Xem báo cáo nhóm
  | 'view_department_reports'   // Xem báo cáo phòng ban
  | 'view_company_reports'      // Xem báo cáo công ty
  | 'view_all_reports'          // Xem tất cả báo cáo
  | 'export_reports'            // Xuất báo cáo
  | 'manage_users'              // Quản lý người dùng
  | 'system_admin';             // Quản trị hệ thống

// Role-based permissions mapping
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  employee: [
    'view_personal_reports',
    'create_personal_reports',
    'edit_personal_reports',
    'export_reports'
  ],
  team_leader: [
    'view_personal_reports',
    'create_personal_reports',
    'edit_personal_reports',
    'view_team_reports',
    'export_reports'
  ],
  department_head: [
    'view_personal_reports',
    'create_personal_reports',
    'edit_personal_reports',
    'view_team_reports',
    'view_department_reports',
    'export_reports'
  ],
  ceo: [
    'view_personal_reports',
    'create_personal_reports',
    'edit_personal_reports',
    'view_team_reports',
    'view_department_reports',
    'view_company_reports',
    'export_reports'
  ],
  bmc_admin: [
    'view_personal_reports',
    'create_personal_reports',
    'edit_personal_reports',
    'view_team_reports',
    'view_department_reports',
    'view_company_reports',
    'view_all_reports',
    'export_reports',
    'manage_users',
    'system_admin'
  ]
};

// Attribute-based access control context
export interface ABACContext {
  user: User;
  resource: {
    type: 'report' | 'user' | 'system';
    ownerId?: string;
    department?: string;
    company?: string;
    sensitivity?: 'public' | 'internal' | 'confidential';
  };
  environment: {
    time: Date;
    location?: string;
    ipAddress?: string;
  };
  action: Permission;
}

export class PermissionService {
  // Get permissions for a user role
  static getRolePermissions(role: UserRole): Permission[] {
    return ROLE_PERMISSIONS[role] || [];
  }

  // Check if user has a specific permission (RBAC)
  static hasPermission(user: User, permission: Permission): boolean {
    const rolePermissions = this.getRolePermissions(user.role);
    return rolePermissions.includes(permission) || user.permissions.includes(permission);
  }

  // Advanced permission check with context (ABAC)
  static hasContextualPermission(context: ABACContext): boolean {
    const { user, resource, environment, action } = context;

    // First check RBAC
    if (!this.hasPermission(user, action)) {
      return false;
    }

    // Apply ABAC rules
    switch (action) {
      case 'view_personal_reports':
      case 'edit_personal_reports':
      case 'delete_personal_reports':
        // Users can only access their own reports unless they have higher privileges
        if (resource.ownerId && resource.ownerId !== user.id) {
          return this.hasPermission(user, 'view_team_reports') ||
                 this.hasPermission(user, 'view_department_reports') ||
                 this.hasPermission(user, 'view_company_reports');
        }
        return true;

      case 'view_team_reports':
        // Team leaders can view reports from their department
        return user.role === 'team_leader' && resource.department === user.department;

      case 'view_department_reports':
        // Department heads can view reports from their department
        return user.role === 'department_head' && resource.department === user.department;

      case 'view_company_reports':
        // CEOs can view reports from their company
        return user.role === 'ceo' && resource.company === user.company;

      case 'view_all_reports':
        // Only BMC admins can view all reports
        return user.role === 'bmc_admin';

      case 'export_reports':
        // Additional security for confidential reports
        if (resource.sensitivity === 'confidential') {
          return user.role === 'ceo' || user.role === 'bmc_admin';
        }
        return true;

      default:
        return true;
    }
  }

  // Get accessible reports for a user
  static getAccessibleReportScopes(user: User): string[] {
    const scopes: string[] = [];

    if (this.hasPermission(user, 'view_personal_reports')) {
      scopes.push('personal');
    }
    if (this.hasPermission(user, 'view_team_reports')) {
      scopes.push('team');
    }
    if (this.hasPermission(user, 'view_department_reports')) {
      scopes.push('department');
    }
    if (this.hasPermission(user, 'view_company_reports')) {
      scopes.push('company');
    }
    if (this.hasPermission(user, 'view_all_reports')) {
      scopes.push('all');
    }

    return scopes;
  }

  // Validate report access
  static canAccessReport(user: User, reportOwnerId: string, reportDepartment: string, reportCompany: string): boolean {
    const context: ABACContext = {
      user,
      resource: {
        type: 'report',
        ownerId: reportOwnerId,
        department: reportDepartment,
        company: reportCompany
      },
      environment: {
        time: new Date()
      },
      action: 'view_personal_reports'
    };

    return this.hasContextualPermission(context);
  }

  // Get user role display name
  static getRoleDisplayName(role: UserRole): string {
    const roleNames: Record<UserRole, string> = {
      employee: 'Nhân viên',
      team_leader: 'Trưởng nhóm',
      department_head: 'Trưởng phòng',
      ceo: 'CEO',
      bmc_admin: 'Quản trị viên BMC'
    };
    return roleNames[role] || role;
  }

  // Log access attempt for audit
  static logAccess(user: User, action: Permission, resource: any, success: boolean): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action,
      resource: {
        type: resource.type,
        id: resource.id || resource.ownerId
      },
      success,
      ipAddress: 'unknown', // Would be populated from request context
      userAgent: navigator.userAgent
    };

    // In production, this would send to audit service
    console.log('🔐 Access Log:', logEntry);
    
    // Store in localStorage for demo purposes
    const existingLogs = JSON.parse(localStorage.getItem('access_logs') || '[]');
    existingLogs.push(logEntry);
    localStorage.setItem('access_logs', JSON.stringify(existingLogs.slice(-100))); // Keep last 100 logs
  }
}

// Mock user data for testing
export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@company.com',
    role: 'employee',
    department: 'Kinh doanh',
    company: 'F4-Startup AI Retail',
    permissions: []
  },
  {
    id: '2',
    name: 'Trần Thị B',
    email: 'tranthib@company.com',
    role: 'team_leader',
    department: 'Kinh doanh',
    company: 'F4-Startup AI Retail',
    permissions: []
  },
  {
    id: '3',
    name: 'Lê Văn C',
    email: 'levanc@company.com',
    role: 'department_head',
    department: 'Kinh doanh',
    company: 'F4-Startup AI Retail',
    permissions: []
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    email: 'phamthid@company.com',
    role: 'ceo',
    department: 'Điều hành',
    company: 'F4-Startup AI Retail',
    permissions: []
  },
  {
    id: '5',
    name: 'Admin BMC',
    email: 'admin@bmc.com',
    role: 'bmc_admin',
    department: 'IT',
    company: 'BMC Corporation',
    permissions: []
  }
];

export default PermissionService;