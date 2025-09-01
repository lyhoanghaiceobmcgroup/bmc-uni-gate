import React, { createContext, useContext, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Crown, 
  Users, 
  User, 
  Building2, 
  Eye, 
  Edit, 
  Trash2, 
  Settings,
  Lock,
  Unlock,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Define role hierarchy and permissions
export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: 'read' | 'write' | 'delete' | 'admin';
}

export interface Role {
  id: string;
  name: string;
  displayName: string;
  description: string;
  level: number; // 1=BMC Holdings, 2=CEO, 3=Manager, 4=Employee
  permissions: Permission[];
  color: string;
  icon: React.ComponentType<any>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  companyId: string;
  companyName: string;
  roles: Role[];
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

// Define all available permissions
const ALL_PERMISSIONS: Permission[] = [
  // Company Management
  { id: 'company.read', name: 'Xem thông tin công ty', description: 'Xem thông tin cơ bản của công ty', resource: 'company', action: 'read' },
  { id: 'company.write', name: 'Chỉnh sửa công ty', description: 'Chỉnh sửa thông tin công ty', resource: 'company', action: 'write' },
  { id: 'company.admin', name: 'Quản trị công ty', description: 'Toàn quyền quản lý công ty', resource: 'company', action: 'admin' },
  
  // Financial Data
  { id: 'finance.read', name: 'Xem tài chính', description: 'Xem báo cáo tài chính', resource: 'finance', action: 'read' },
  { id: 'finance.write', name: 'Nhập liệu tài chính', description: 'Nhập và chỉnh sửa dữ liệu tài chính', resource: 'finance', action: 'write' },
  { id: 'finance.admin', name: 'Quản trị tài chính', description: 'Toàn quyền quản lý tài chính', resource: 'finance', action: 'admin' },
  
  // HR Management
  { id: 'hr.read', name: 'Xem nhân sự', description: 'Xem thông tin nhân sự', resource: 'hr', action: 'read' },
  { id: 'hr.write', name: 'Quản lý nhân sự', description: 'Thêm, sửa thông tin nhân viên', resource: 'hr', action: 'write' },
  { id: 'hr.admin', name: 'Quản trị nhân sự', description: 'Toàn quyền quản lý nhân sự', resource: 'hr', action: 'admin' },
  
  // Production
  { id: 'production.read', name: 'Xem sản xuất', description: 'Xem dữ liệu sản xuất', resource: 'production', action: 'read' },
  { id: 'production.write', name: 'Nhập sản xuất', description: 'Nhập dữ liệu sản xuất', resource: 'production', action: 'write' },
  
  // Marketing
  { id: 'marketing.read', name: 'Xem marketing', description: 'Xem dữ liệu marketing', resource: 'marketing', action: 'read' },
  { id: 'marketing.write', name: 'Quản lý marketing', description: 'Quản lý chiến dịch marketing', resource: 'marketing', action: 'write' },
  
  // Strategy & R&D
  { id: 'strategy.read', name: 'Xem chiến lược', description: 'Xem kế hoạch chiến lược', resource: 'strategy', action: 'read' },
  { id: 'strategy.write', name: 'Lập chiến lược', description: 'Tham gia lập kế hoạch chiến lược', resource: 'strategy', action: 'write' },
  
  // Legal & Compliance
  { id: 'legal.read', name: 'Xem pháp chế', description: 'Xem thông tin pháp lý', resource: 'legal', action: 'read' },
  { id: 'legal.write', name: 'Quản lý pháp chế', description: 'Quản lý tuân thủ pháp luật', resource: 'legal', action: 'write' },
  
  // Investment
  { id: 'investment.read', name: 'Xem đầu tư', description: 'Xem thông tin đầu tư', resource: 'investment', action: 'read' },
  { id: 'investment.write', name: 'Quản lý đầu tư', description: 'Quản lý quỹ đầu tư', resource: 'investment', action: 'write' },
  
  // Technology
  { id: 'tech.read', name: 'Xem công nghệ', description: 'Xem hạ tầng công nghệ', resource: 'tech', action: 'read' },
  { id: 'tech.write', name: 'Quản lý IT', description: 'Quản lý hệ thống IT', resource: 'tech', action: 'write' },
  
  // Shareholders
  { id: 'shareholders.read', name: 'Xem cổ đông', description: 'Xem thông tin cổ đông', resource: 'shareholders', action: 'read' },
  { id: 'shareholders.admin', name: 'Quản trị cổ đông', description: 'Quản lý thông tin cổ đông', resource: 'shareholders', action: 'admin' },
  
  // System Admin
  { id: 'system.admin', name: 'Quản trị hệ thống', description: 'Toàn quyền hệ thống', resource: 'system', action: 'admin' },
  { id: 'reports.all', name: 'Xem tất cả báo cáo', description: 'Truy cập mọi báo cáo trong hệ thống', resource: 'reports', action: 'read' }
];

// Define roles with their permissions
export const SYSTEM_ROLES: Role[] = [
  {
    id: 'bmc_holdings',
    name: 'bmc_holdings',
    displayName: 'BMC Holdings',
    description: 'Tập đoàn BMC - Toàn quyền trên tất cả dự án/công ty',
    level: 1,
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: Crown,
    permissions: ALL_PERMISSIONS // Full access to everything
  },
  {
    id: 'ceo',
    name: 'ceo',
    displayName: 'CEO/Quản lý chính',
    description: 'Giám đốc điều hành - Toàn quyền trong công ty',
    level: 2,
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: Crown,
    permissions: ALL_PERMISSIONS.filter(p => p.resource !== 'system') // All except system admin
  },
  {
    id: 'department_manager',
    name: 'department_manager',
    displayName: 'Trưởng phòng ban',
    description: 'Quản lý cấp phòng ban - Quyền hạn theo chuyên môn',
    level: 3,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Users,
    permissions: [
      ...ALL_PERMISSIONS.filter(p => p.action === 'read'), // Read all
      ...ALL_PERMISSIONS.filter(p => p.resource === 'hr' && p.action === 'write'), // Manage HR in department
    ]
  },
  {
    id: 'finance_manager',
    name: 'finance_manager',
    displayName: 'Trưởng phòng Tài chính',
    description: 'Quản lý tài chính - Toàn quyền về tài chính',
    level: 3,
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: Users,
    permissions: [
      ...ALL_PERMISSIONS.filter(p => p.action === 'read'),
      ...ALL_PERMISSIONS.filter(p => p.resource === 'finance'),
    ]
  },
  {
    id: 'hr_manager',
    name: 'hr_manager',
    displayName: 'Trưởng phòng Nhân sự',
    description: 'Quản lý nhân sự - Toàn quyền về nhân sự',
    level: 3,
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: Users,
    permissions: [
      ...ALL_PERMISSIONS.filter(p => p.action === 'read'),
      ...ALL_PERMISSIONS.filter(p => p.resource === 'hr'),
    ]
  },
  {
    id: 'employee',
    name: 'employee',
    displayName: 'Nhân viên',
    description: 'Nhân viên - Quyền hạn cơ bản theo công việc được giao',
    level: 4,
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: User,
    permissions: [
      ALL_PERMISSIONS.find(p => p.id === 'company.read')!,
      ALL_PERMISSIONS.find(p => p.id === 'hr.read')!,
    ]
  },
  {
    id: 'accountant',
    name: 'accountant',
    displayName: 'Kế toán viên',
    description: 'Nhân viên kế toán - Quyền nhập liệu tài chính',
    level: 4,
    color: 'bg-teal-100 text-teal-800 border-teal-200',
    icon: User,
    permissions: [
      ALL_PERMISSIONS.find(p => p.id === 'company.read')!,
      ALL_PERMISSIONS.find(p => p.id === 'finance.read')!,
      ALL_PERMISSIONS.find(p => p.id === 'finance.write')!,
    ]
  }
];

// Context for role-based access control
interface RBACContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  hasPermission: (permissionId: string) => boolean;
  hasRole: (roleId: string) => boolean;
  canAccess: (resource: string, action: string) => boolean;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

export const useRBAC = () => {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within RBACProvider');
  }
  return context;
};

// RBAC Provider Component
export const RBACProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const hasPermission = (permissionId: string): boolean => {
    if (!currentUser) return false;
    return currentUser.roles.some(role => 
      role.permissions.some(permission => permission.id === permissionId)
    );
  };

  const hasRole = (roleId: string): boolean => {
    if (!currentUser) return false;
    return currentUser.roles.some(role => role.id === roleId);
  };

  const canAccess = (resource: string, action: string): boolean => {
    if (!currentUser) return false;
    return currentUser.roles.some(role => 
      role.permissions.some(permission => 
        permission.resource === resource && permission.action === action
      )
    );
  };

  return (
    <RBACContext.Provider value={{
      currentUser,
      setCurrentUser,
      hasPermission,
      hasRole,
      canAccess
    }}>
      {children}
    </RBACContext.Provider>
  );
};

// Role Management Component
const RoleManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'ceo@abc-tech.com',
      companyId: 'comp-001',
      companyName: 'Công ty TNHH Công nghệ ABC',
      roles: [SYSTEM_ROLES.find(r => r.id === 'ceo')!],
      isActive: true,
      createdAt: '2025-01-15T10:00:00Z',
      lastLogin: '2025-01-15T14:30:00Z'
    },
    {
      id: '2',
      name: 'Trần Thị B',
      email: 'finance@abc-tech.com',
      companyId: 'comp-001',
      companyName: 'Công ty TNHH Công nghệ ABC',
      roles: [SYSTEM_ROLES.find(r => r.id === 'finance_manager')!],
      isActive: true,
      createdAt: '2025-01-15T10:00:00Z',
      lastLogin: '2025-01-15T13:20:00Z'
    },
    {
      id: '3',
      name: 'Lê Văn C',
      email: 'hr@abc-tech.com',
      companyId: 'comp-001',
      companyName: 'Công ty TNHH Công nghệ ABC',
      roles: [SYSTEM_ROLES.find(r => r.id === 'hr_manager')!],
      isActive: true,
      createdAt: '2025-01-15T10:00:00Z'
    },
    {
      id: '4',
      name: 'Phạm Thị D',
      email: 'employee@abc-tech.com',
      companyId: 'comp-001',
      companyName: 'Công ty TNHH Công nghệ ABC',
      roles: [SYSTEM_ROLES.find(r => r.id === 'employee')!],
      isActive: true,
      createdAt: '2025-01-15T10:00:00Z',
      lastLogin: '2025-01-15T12:45:00Z'
    },
    {
      id: '5',
      name: 'Admin BMC',
      email: 'admin@bmc-holdings.com',
      companyId: 'bmc-holdings',
      companyName: 'BMC Holdings',
      roles: [SYSTEM_ROLES.find(r => r.id === 'bmc_holdings')!],
      isActive: true,
      createdAt: '2025-01-01T00:00:00Z',
      lastLogin: '2025-01-15T15:00:00Z'
    }
  ]);

  const getRoleBadge = (role: Role) => {
    const Icon = role.icon;
    return (
      <Badge className={`${role.color} border-0`}>
        <Icon className="w-3 h-3 mr-1" />
        {role.displayName}
      </Badge>
    );
  };

  const getPermissionCount = (roles: Role[]) => {
    const uniquePermissions = new Set();
    roles.forEach(role => {
      role.permissions.forEach(permission => {
        uniquePermissions.add(permission.id);
      });
    });
    return uniquePermissions.size;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hệ thống Phân quyền RBAC/ABAC</h1>
          <p className="text-muted-foreground">Quản lý vai trò và quyền hạn người dùng</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Cấu hình Role
          </Button>
          <Button>
            <Users className="w-4 h-4 mr-2" />
            Thêm người dùng
          </Button>
        </div>
      </div>

      {/* Role Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        {SYSTEM_ROLES.map((role) => {
          const Icon = role.icon;
          const userCount = users.filter(u => u.roles.some(r => r.id === role.id)).length;
          
          return (
            <Card key={role.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Icon className="w-5 h-5 text-primary" />
                  <Badge variant="secondary">{userCount} người</Badge>
                </div>
                <CardTitle className="text-base">{role.displayName}</CardTitle>
                <CardDescription className="text-xs">
                  {role.permissions.length} quyền hạn
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Người dùng</CardTitle>
          <CardDescription>Quản lý quyền truy cập của từng người dùng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{user.name}</h4>
                      {user.isActive ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.companyName}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex gap-1 mb-1">
                      {user.roles.map((role) => getRoleBadge(role))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {getPermissionCount(user.roles)} quyền hạn
                    </p>
                    {user.lastLogin && (
                      <p className="text-xs text-muted-foreground">
                        Đăng nhập: {new Date(user.lastLogin).toLocaleString('vi-VN')}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    {user.isActive ? (
                      <Button variant="outline" size="sm">
                        <Lock className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <Unlock className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Ma trận Phân quyền</CardTitle>
          <CardDescription>Tổng quan quyền hạn theo vai trò</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Hệ thống áp dụng nguyên tắc "Least Privilege" - chỉ cấp quyền tối thiểu cần thiết cho công việc.
              Mọi thay đổi quyền hạn đều được ghi log và cần phê duyệt từ cấp trên.
            </AlertDescription>
          </Alert>
          
          <div className="text-sm">
            <div className="grid grid-cols-5 gap-2 font-medium mb-2">
              <div>Quyền hạn</div>
              <div>BMC Holdings</div>
              <div>CEO</div>
              <div>Trưởng phòng</div>
              <div>Nhân viên</div>
            </div>
            
            {['company', 'finance', 'hr', 'production', 'marketing'].map((resource) => (
              <div key={resource} className="grid grid-cols-5 gap-2 py-2 border-t">
                <div className="font-medium capitalize">{resource}</div>
                <div className="text-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />
                </div>
                <div className="text-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />
                </div>
                <div className="text-center">
                  {resource === 'finance' || resource === 'hr' ? (
                    <CheckCircle className="w-4 h-4 text-blue-600 mx-auto" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400 mx-auto" />
                  )}
                </div>
                <div className="text-center">
                  <Eye className="w-4 h-4 text-gray-400 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleManagement;