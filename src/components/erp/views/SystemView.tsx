import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Settings, 
  Users, 
  Shield, 
  Server, 
  FileCheck, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Key, 
  Lock,
  Database,
  Wifi,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Download,
  Search,
  Filter,
  Building2
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";


interface SystemViewProps {
  organizations?: any[];
}

// Mock data for system administration
const mockSystemData = {
  totalUsers: 1247,
  activeUsers: 1156,
  pendingUsers: 15,
  blockedUsers: 76,
  totalRoles: 28,
  systemUptime: 99.97,
  securityIncidents: 3,
  apiCalls: 2547892,
  complianceScore: 94
};

const mockUsers = [
  {
    id: "1",
    email: "ceo@bmc.vn",
    fullName: "Lý Hoàng Hải",
    role: "CEO",
    level: "BMC",
    status: "active",
    lastLogin: "2024-12-30 09:15",
    permissions: ["full_admin", "financial_view", "strategic_planning"]
  },
  {
    id: "2", 
    email: "manager.f1@bmc.vn",
    fullName: "Nguyễn Văn An",
    role: "Cluster Manager",
    level: "F1",
    status: "active",
    lastLogin: "2024-12-30 08:45",
    permissions: ["cluster_admin", "department_view", "reporting"]
  },
  {
    id: "3",
    email: "staff.f4@bmc.vn", 
    fullName: "Trần Thị Minh",
    role: "Branch Staff",
    level: "F4",
    status: "pending",
    lastLogin: "2024-12-29 17:30",
    permissions: ["data_entry", "local_view"]
  }
];

const mockSecurityEvents = [
  {
    id: "1",
    type: "login_failure",
    severity: "medium",
    message: "5 lần đăng nhập thất bại từ IP 192.168.1.100",
    timestamp: "2024-12-30 09:30",
    user: "unknown",
    action: "blocked_ip"
  },
  {
    id: "2",
    type: "permission_violation", 
    severity: "high",
    message: "User cố gắng truy cập dữ liệu tài chính ngoài quyền hạn",
    timestamp: "2024-12-30 08:15",
    user: "staff.f4@bmc.vn",
    action: "alert_admin"
  },
  {
    id: "3",
    type: "data_export",
    severity: "low", 
    message: "Xuất báo cáo F1 Cụm ngành thành công",
    timestamp: "2024-12-30 07:45",
    user: "manager.f1@bmc.vn",
    action: "logged"
  }
];

export function SystemView({ organizations }: SystemViewProps) {
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [users, setUsers] = useState(mockUsers);
  const [systemStats, setSystemStats] = useState(mockSystemData);

  const { user } = useAuth();

  // Load real users from Supabase
  useEffect(() => {
    loadSystemUsers();
    loadSystemStats();
  }, []);

  const loadSystemUsers = async () => {
    try {
      // First get all user organization roles with related data
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_organization_roles')
        .select(`
          *,
          profiles!user_organization_roles_user_id_fkey (*),
          organizations (*)
        `);
      
      if (rolesError) {
        console.error('Error loading user roles:', rolesError);
        // Fallback to mock data if database query fails
        setUsers(mockUsers);
        return;
      }

      // Transform data to match our mock structure
      const transformedUsers = userRoles?.map(userRole => ({
        id: userRole.profiles?.id || userRole.user_id,
        email: userRole.profiles?.email || 'N/A',
        fullName: userRole.profiles?.full_name || 'N/A',
        role: userRole.role || 'user',
        level: userRole.organizations?.level || 'N/A',
        status: 'active',
        lastLogin: new Date().toLocaleString('vi-VN'),
        permissions: ['view_basic']
      })) || [];

      setUsers(transformedUsers);
    } catch (error) {
      console.error('Failed to load users:', error);
      // Fallback to mock data if database query fails
      setUsers(mockUsers);
    }
  };

  const loadSystemStats = async () => {
    // In real implementation, this would fetch from monitoring APIs
    // For now using mock data
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === "all" || user.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Hoạt động</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>;
      case "blocked":
        return <Badge variant="destructive">Bị khóa</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">Cao</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Trung bình</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800">Thấp</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8 text-primary" />
            ⚙️ Quản Trị Hệ Thống
          </h1>
          <p className="text-muted-foreground mt-2">
            Trung tâm quản trị ERP-AI: Tài khoản, Phân quyền, Bảo mật & Hạ tầng
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Xuất audit log
          </Button>

          <Button className="bg-gradient-primary">
            🤖 AI Security
          </Button>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Tổng người dùng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Toàn hệ sinh thái</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Đang hoạt động
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemStats.activeUsers}</div>
            <p className="text-xs text-green-600">Online users</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Chờ duyệt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{systemStats.pendingUsers}</div>
            <p className="text-xs text-muted-foreground">Pending approval</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Bị khóa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{systemStats.blockedUsers}</div>
            <p className="text-xs text-red-600">Blocked users</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Key className="h-4 w-4" />
              Vai trò
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalRoles}</div>
            <p className="text-xs text-muted-foreground">Role định nghĩa</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-cyan-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Server className="h-4 w-4" />
              Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemStats.systemUptime}%</div>
            <p className="text-xs text-green-600">Hệ thống ổn định</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Bảo mật
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{systemStats.securityIncidents}</div>
            <p className="text-xs text-muted-foreground">Sự cố tuần này</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              API Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(systemStats.apiCalls / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Hôm nay</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-pink-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              Tuân thủ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemStats.complianceScore}%</div>
            <p className="text-xs text-green-600">Compliance score</p>
          </CardContent>
        </Card>
      </div>

      {/* AI System Intelligence */}
      <Card className="border-l-4 border-l-gradient-primary bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            🤖 AI System Intelligence - Security & Infrastructure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-foreground">🛡️ AI Security Agent:</h4>
              <p className="text-sm text-muted-foreground">
                Phát hiện 3 sự cố bảo mật tuần này. Hệ thống uptime 99.97%. 
                Gợi ý kích hoạt 2FA bắt buộc cho tài khoản F1/F2.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-amber-600">⚠️ AI Compliance Agent:</h4>
              <p className="text-sm text-muted-foreground">
                Tuân thủ GDPR: 94%. Cần audit logs cho 15 tài khoản pending. 
                Nhắc nhở: chứng nhận ISO 27001 hết hạn trong 3 tháng.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-green-600">⚡ AI Infra Agent:</h4>
              <p className="text-sm text-muted-foreground">
                Server CPU: 68%, RAM: 74%. API response time: 120ms avg. 
                Gợi ý scale database cho 2.5M API calls/ngày.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="users">👤 Tài khoản</TabsTrigger>
          <TabsTrigger value="permissions">🔑 Phân quyền</TabsTrigger>
          <TabsTrigger value="security">🔒 Bảo mật</TabsTrigger>
          <TabsTrigger value="infrastructure">⚙️ Hạ tầng</TabsTrigger>
          <TabsTrigger value="compliance">📑 Tuân thủ</TabsTrigger>
          <TabsTrigger value="reports">📊 Báo cáo</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          {/* User Management Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">👤 Quản lý Tài khoản</h3>
            <div className="flex gap-2">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Thêm người dùng
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4 p-4 bg-card rounded-lg border">
            <div className="flex-1">
              <Input
                placeholder="🔍 Tìm kiếm theo tên hoặc email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Chọn cấp độ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả cấp độ</SelectItem>
                <SelectItem value="BMC">🌐 BMC Holdings</SelectItem>
                <SelectItem value="F1">🏢 F1 - Cụm ngành</SelectItem>
                <SelectItem value="F2">🏬 F2 - Công ty ngành</SelectItem>
                <SelectItem value="F3">🏪 F3 - Công ty chiến lược</SelectItem>
                <SelectItem value="F4">🏪 F4 - Chi nhánh</SelectItem>
                <SelectItem value="F5">🚀 F5 - Startup</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users List */}
          <div className="grid gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {user.fullName?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">{user.fullName}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{user.level}</Badge>
                          <Badge variant="secondary">{user.role}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Lần cuối:</p>
                        <p className="text-xs">{user.lastLogin}</p>
                      </div>
                      {getStatusBadge(user.status)}
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Key className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Lock className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🔑 RBAC - Role Based Access Control</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">CEO</p>
                      <p className="text-xs text-muted-foreground">Toàn quyền hệ thống</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Full Admin</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Cluster Manager</p>
                      <p className="text-xs text-muted-foreground">Quản lý cụm ngành F1</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Cluster Admin</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Branch Manager</p>
                      <p className="text-xs text-muted-foreground">Quản lý chi nhánh F4</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Branch Admin</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Staff</p>
                      <p className="text-xs text-muted-foreground">Nhân viên vận hành</p>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">View Only</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎯 ABAC - Attribute Based Access Control</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Phân quyền theo thuộc tính:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>📍 Vị trí địa lý:</span>
                        <span className="font-medium">Hà Nội, HCM, Đà Nẵng</span>
                      </div>
                      <div className="flex justify-between">
                        <span>🏢 Tổ chức:</span>
                        <span className="font-medium">BMC → F1 → F2 → F3 → F4 → F5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>📂 Phòng ban:</span>
                        <span className="font-medium">9 phòng ban chức năng</span>
                      </div>
                      <div className="flex justify-between">
                        <span>⏰ Thời gian:</span>
                        <span className="font-medium">7:00 - 18:00 (giờ hành chính)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">💡 Ví dụ ABAC:</p>
                    <p className="text-xs text-blue-600">
                      Nhân viên kế toán Chi nhánh HN chỉ được xem dữ liệu tài chính HN 
                      trong giờ hành chính, không được xuất file.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🔒 Tình hình Bảo mật</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Mã hóa dữ liệu (AES-256)</span>
                      <span className="text-green-600">✓ Hoạt động</span>
                    </div>
                    <Progress value={100} className="h-2 bg-green-100" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>TLS/SSL truyền tải</span>
                      <span className="text-green-600">✓ Hoạt động</span>
                    </div>
                    <Progress value={100} className="h-2 bg-green-100" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>2FA Coverage</span>
                      <span className="text-yellow-600">68% users</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Security Audit</span>
                      <span className="text-green-600">94% passed</span>
                    </div>
                    <Progress value={94} className="h-2 bg-green-100" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🚨 Security Events (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockSecurityEvents.map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getSeverityBadge(event.severity)}
                          <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                        </div>
                        <Badge variant="outline">{event.type}</Badge>
                      </div>
                      <p className="text-sm">{event.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        User: {event.user} | Action: {event.action}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>⚙️ Server & Database Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CPU Usage:</span>
                    <div className="flex items-center gap-2">
                      <Progress value={68} className="w-20 h-2" />
                      <span className="text-sm font-medium">68%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">RAM Usage:</span>
                    <div className="flex items-center gap-2">
                      <Progress value={74} className="w-20 h-2" />
                      <span className="text-sm font-medium">74%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database:</span>
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">Online</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Response:</span>
                    <span className="text-sm font-medium">120ms avg</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🌐 API Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Supabase (Database):</span>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Banking API:</span>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">eInvoice API:</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Throttled</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Zalo OA API:</span>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Services:</span>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>📑 Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>GDPR Compliance</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>ISO 27001</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Luật An toàn Thông tin VN</span>
                      <span>88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Data Residency VN</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} className="h-2 bg-green-100" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⏰ Compliance Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg border-l-4 border-l-red-500">
                    <p className="text-sm font-medium text-red-800">🚨 Critical</p>
                    <p className="text-xs text-red-600">
                      ISO 27001 certificate expires in 3 months - Schedule renewal
                    </p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-l-yellow-500">
                    <p className="text-sm font-medium text-yellow-800">⚠️ Warning</p>
                    <p className="text-xs text-yellow-600">
                      15 users need audit logs review - Compliance requirement
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                    <p className="text-sm font-medium text-blue-800">ℹ️ Info</p>
                    <p className="text-xs text-blue-600">
                      Monthly compliance report due in 5 days
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                    <p className="text-sm font-medium text-green-800">✅ Complete</p>
                    <p className="text-xs text-green-600">
                      Data backup compliance check passed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>📊 System Administration Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">👤 User Management</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      📋 User Activity Report
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      📊 Permission Audit
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      📈 Access Analytics
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">🔒 Security Reports</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      🚨 Security Incidents
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      🔍 Vulnerability Scan
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      🛡️ Compliance Report
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">⚙️ Infrastructure</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      📈 Performance Report
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      🌐 API Analytics
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      💾 System Health
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}