import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  GraduationCap, 
  Factory, 
  Target, 
  Laptop, 
  Scale, 
  PiggyBank,
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Settings,
  RefreshCw
} from 'lucide-react';

// Define department structure
interface Department {
  id: string;
  name: string;
  displayName: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  metrics: DepartmentMetric[];
  recentActivities: Activity[];
  kpis: KPI[];
}

interface DepartmentMetric {
  id: string;
  name: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  unit?: string;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success' | 'error';
  user?: string;
}

interface KPI {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
}

// Mock data for 9 departments
const DEPARTMENTS: Department[] = [
  {
    id: 'shareholders',
    name: 'shareholders',
    displayName: '📌 Thông tin Cổ đông',
    description: 'Quản lý thông tin cổ đông và quyền lợi',
    icon: Users,
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    metrics: [
      { id: 'total_shareholders', name: 'Tổng cổ đông', value: 45, change: 2.5, trend: 'up' },
      { id: 'ownership_bmc', name: 'Sở hữu BMC', value: '15%', change: 0, trend: 'stable' },
      { id: 'dividend_paid', name: 'Cổ tức đã trả', value: '2.4B', change: 12.3, trend: 'up', unit: 'VND' },
      { id: 'voting_participation', name: 'Tham gia bỏ phiếu', value: '89%', change: 5.2, trend: 'up' }
    ],
    recentActivities: [
      { id: '1', title: 'Đại hội cổ đông thường niên', description: 'Thông qua nghị quyết phân phối lợi nhuận', timestamp: '2025-01-15T10:00:00Z', type: 'success' },
      { id: '2', title: 'Cập nhật danh sách cổ đông', description: '3 cổ đông mới được thêm vào hệ thống', timestamp: '2025-01-14T14:30:00Z', type: 'info' }
    ],
    kpis: [
      { id: 'dividend_yield', name: 'Tỷ suất cổ tức', current: 8.5, target: 10, unit: '%', status: 'warning' },
      { id: 'shareholder_satisfaction', name: 'Hài lòng cổ đông', current: 92, target: 95, unit: '%', status: 'good' }
    ]
  },
  {
    id: 'business_marketing',
    name: 'business_marketing',
    displayName: '📊 Kinh doanh – Marketing',
    description: 'Quản lý hoạt động kinh doanh và marketing',
    icon: TrendingUp,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    metrics: [
      { id: 'revenue', name: 'Doanh thu tháng', value: '15.2B', change: 18.5, trend: 'up', unit: 'VND' },
      { id: 'customers', name: 'Khách hàng mới', value: 234, change: 12.3, trend: 'up' },
      { id: 'conversion_rate', name: 'Tỷ lệ chuyển đổi', value: '3.8%', change: 0.5, trend: 'up' },
      { id: 'marketing_roi', name: 'ROI Marketing', value: '285%', change: 15.2, trend: 'up' }
    ],
    recentActivities: [
      { id: '1', title: 'Chiến dịch Digital Marketing Q1', description: 'Đạt 120% mục tiêu reach', timestamp: '2025-01-15T09:00:00Z', type: 'success' },
      { id: '2', title: 'Hợp đồng khách hàng lớn', description: 'Ký hợp đồng 5 tỷ với ABC Corp', timestamp: '2025-01-14T16:20:00Z', type: 'success' }
    ],
    kpis: [
      { id: 'monthly_revenue', name: 'Doanh thu tháng', current: 15.2, target: 18, unit: 'B VND', status: 'warning' },
      { id: 'customer_acquisition', name: 'Thu hút KH mới', current: 234, target: 200, unit: 'khách hàng', status: 'good' }
    ]
  },
  {
    id: 'finance_accounting',
    name: 'finance_accounting',
    displayName: '💰 Tài chính – Kế toán',
    description: 'Quản lý tài chính và kế toán doanh nghiệp',
    icon: DollarSign,
    color: 'bg-green-100 text-green-800 border-green-200',
    metrics: [
      { id: 'profit', name: 'Lợi nhuận ròng', value: '3.8B', change: 22.1, trend: 'up', unit: 'VND' },
      { id: 'cash_flow', name: 'Dòng tiền', value: '8.5B', change: 5.3, trend: 'up', unit: 'VND' },
      { id: 'debt_ratio', name: 'Tỷ lệ nợ', value: '35%', change: -2.1, trend: 'down' },
      { id: 'roa', name: 'ROA', value: '12.5%', change: 1.8, trend: 'up' }
    ],
    recentActivities: [
      { id: '1', title: 'Báo cáo tài chính Q4', description: 'Hoàn thành báo cáo tài chính quý 4', timestamp: '2025-01-15T11:30:00Z', type: 'success' },
      { id: '2', title: 'Thanh toán khoản vay', description: 'Trả trước 2B VND khoản vay ngân hàng', timestamp: '2025-01-13T10:15:00Z', type: 'info' }
    ],
    kpis: [
      { id: 'profit_margin', name: 'Biên lợi nhuận', current: 25, target: 30, unit: '%', status: 'warning' },
      { id: 'liquidity_ratio', name: 'Tỷ lệ thanh khoản', current: 2.1, target: 2.0, unit: '', status: 'good' }
    ]
  },
  {
    id: 'hr_training',
    name: 'hr_training',
    displayName: '👥 Nhân sự – Đào tạo',
    description: 'Quản lý nhân sự và phát triển đào tạo',
    icon: GraduationCap,
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    metrics: [
      { id: 'employees', name: 'Tổng nhân viên', value: 156, change: 8.3, trend: 'up' },
      { id: 'retention_rate', name: 'Tỷ lệ giữ chân', value: '94%', change: 2.1, trend: 'up' },
      { id: 'training_hours', name: 'Giờ đào tạo', value: 1240, change: 15.6, trend: 'up' },
      { id: 'satisfaction', name: 'Hài lòng NV', value: '4.6/5', change: 0.2, trend: 'up' }
    ],
    recentActivities: [
      { id: '1', title: 'Chương trình đào tạo AI', description: '45 nhân viên hoàn thành khóa học AI cơ bản', timestamp: '2025-01-15T14:00:00Z', type: 'success' },
      { id: '2', title: 'Tuyển dụng vị trí mới', description: 'Tuyển thêm 5 developer cho dự án mới', timestamp: '2025-01-12T09:30:00Z', type: 'info' }
    ],
    kpis: [
      { id: 'productivity', name: 'Năng suất lao động', current: 85, target: 90, unit: '%', status: 'warning' },
      { id: 'skill_development', name: 'Phát triển kỹ năng', current: 78, target: 80, unit: '%', status: 'warning' }
    ]
  },
  {
    id: 'production_logistics',
    name: 'production_logistics',
    displayName: '🏭 Sản xuất – Kho vận',
    description: 'Quản lý sản xuất và logistics',
    icon: Factory,
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    metrics: [
      { id: 'production_volume', name: 'Sản lượng', value: '12.5K', change: 7.8, trend: 'up', unit: 'units' },
      { id: 'efficiency', name: 'Hiệu suất', value: '87%', change: 3.2, trend: 'up' },
      { id: 'inventory_turnover', name: 'Vòng quay kho', value: '6.2', change: 0.8, trend: 'up' },
      { id: 'defect_rate', name: 'Tỷ lệ lỗi', value: '0.8%', change: -0.3, trend: 'down' }
    ],
    recentActivities: [
      { id: '1', title: 'Nâng cấp dây chuyền sản xuất', description: 'Lắp đặt thiết bị tự động hóa mới', timestamp: '2025-01-14T08:00:00Z', type: 'info' },
      { id: '2', title: 'Kiểm tra chất lượng', description: 'Đạt 99.2% sản phẩm đạt chuẩn', timestamp: '2025-01-13T16:45:00Z', type: 'success' }
    ],
    kpis: [
      { id: 'oee', name: 'OEE (Hiệu suất tổng thể)', current: 82, target: 85, unit: '%', status: 'warning' },
      { id: 'on_time_delivery', name: 'Giao hàng đúng hạn', current: 96, target: 98, unit: '%', status: 'warning' }
    ]
  },
  {
    id: 'strategy_rd',
    name: 'strategy_rd',
    displayName: '🎯 Chiến lược – R&D',
    description: 'Phát triển chiến lược và nghiên cứu',
    icon: Target,
    color: 'bg-red-100 text-red-800 border-red-200',
    metrics: [
      { id: 'rd_investment', name: 'Đầu tư R&D', value: '2.1B', change: 25.3, trend: 'up', unit: 'VND' },
      { id: 'projects', name: 'Dự án R&D', value: 8, change: 2, trend: 'up' },
      { id: 'patents', name: 'Bằng sáng chế', value: 3, change: 1, trend: 'up' },
      { id: 'innovation_score', name: 'Chỉ số đổi mới', value: '7.8/10', change: 0.5, trend: 'up' }
    ],
    recentActivities: [
      { id: '1', title: 'Dự án AI chatbot', description: 'Hoàn thành 70% dự án chatbot thông minh', timestamp: '2025-01-15T13:20:00Z', type: 'info' },
      { id: '2', title: 'Hợp tác nghiên cứu', description: 'Ký MOU với Đại học Bách Khoa', timestamp: '2025-01-11T10:00:00Z', type: 'success' }
    ],
    kpis: [
      { id: 'rd_revenue_ratio', name: 'R&D/Doanh thu', current: 8.5, target: 10, unit: '%', status: 'warning' },
      { id: 'project_success_rate', name: 'Tỷ lệ dự án thành công', current: 75, target: 80, unit: '%', status: 'warning' }
    ]
  },
  {
    id: 'tech_infrastructure',
    name: 'tech_infrastructure',
    displayName: '💻 Công nghệ – Hạ tầng số',
    description: 'Quản lý công nghệ và hạ tầng số',
    icon: Laptop,
    color: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    metrics: [
      { id: 'system_uptime', name: 'Uptime hệ thống', value: '99.8%', change: 0.1, trend: 'up' },
      { id: 'security_score', name: 'Điểm bảo mật', value: '95/100', change: 3, trend: 'up' },
      { id: 'automation_rate', name: 'Tỷ lệ tự động hóa', value: '78%', change: 12.5, trend: 'up' },
      { id: 'cloud_adoption', name: 'Áp dụng Cloud', value: '85%', change: 8.2, trend: 'up' }
    ],
    recentActivities: [
      { id: '1', title: 'Nâng cấp hệ thống ERP', description: 'Triển khai ERP-AI phiên bản 2.0', timestamp: '2025-01-15T12:00:00Z', type: 'info' },
      { id: '2', title: 'Bảo mật nâng cao', description: 'Cài đặt hệ thống phát hiện xâm nhập', timestamp: '2025-01-13T15:30:00Z', type: 'success' }
    ],
    kpis: [
      { id: 'digital_transformation', name: 'Chuyển đổi số', current: 72, target: 80, unit: '%', status: 'warning' },
      { id: 'user_satisfaction', name: 'Hài lòng người dùng', current: 88, target: 90, unit: '%', status: 'warning' }
    ]
  },
  {
    id: 'legal_compliance',
    name: 'legal_compliance',
    displayName: '⚖️ Pháp chế – Tuân thủ',
    description: 'Quản lý pháp lý và tuân thủ quy định',
    icon: Scale,
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    metrics: [
      { id: 'compliance_score', name: 'Điểm tuân thủ', value: '98/100', change: 2, trend: 'up' },
      { id: 'legal_cases', name: 'Vụ việc pháp lý', value: 0, change: -2, trend: 'down' },
      { id: 'contracts', name: 'Hợp đồng xử lý', value: 45, change: 8, trend: 'up' },
      { id: 'audit_score', name: 'Điểm kiểm toán', value: '96/100', change: 1, trend: 'up' }
    ],
    recentActivities: [
      { id: '1', title: 'Kiểm toán nội bộ Q4', description: 'Hoàn thành kiểm toán với điểm số cao', timestamp: '2025-01-14T11:00:00Z', type: 'success' },
      { id: '2', title: 'Cập nhật quy định mới', description: 'Áp dụng Luật Doanh nghiệp sửa đổi', timestamp: '2025-01-12T14:20:00Z', type: 'info' }
    ],
    kpis: [
      { id: 'regulatory_compliance', name: 'Tuân thủ quy định', current: 98, target: 100, unit: '%', status: 'good' },
      { id: 'risk_management', name: 'Quản lý rủi ro', current: 92, target: 95, unit: '%', status: 'warning' }
    ]
  },
  {
    id: 'investment_fund',
    name: 'investment_fund',
    displayName: '💵 Đầu tư – Quỹ',
    description: 'Quản lý đầu tư và quỹ tài chính',
    icon: PiggyBank,
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    metrics: [
      { id: 'portfolio_value', name: 'Giá trị danh mục', value: '125B', change: 8.7, trend: 'up', unit: 'VND' },
      { id: 'roi', name: 'ROI trung bình', value: '15.2%', change: 2.3, trend: 'up' },
      { id: 'active_investments', name: 'Khoản đầu tư', value: 12, change: 1, trend: 'up' },
      { id: 'fund_performance', name: 'Hiệu suất quỹ', value: '18.5%', change: 3.1, trend: 'up' }
    ],
    recentActivities: [
      { id: '1', title: 'Đầu tư startup công nghệ', description: 'Rót 10B vào startup AI healthcare', timestamp: '2025-01-15T15:30:00Z', type: 'success' },
      { id: '2', title: 'Thoái vốn thành công', description: 'Bán cổ phần với lợi nhuận 200%', timestamp: '2025-01-10T09:45:00Z', type: 'success' }
    ],
    kpis: [
      { id: 'diversification', name: 'Đa dạng hóa', current: 85, target: 90, unit: '%', status: 'warning' },
      { id: 'risk_adjusted_return', name: 'Lợi nhuận hiệu chỉnh rủi ro', current: 12.8, target: 15, unit: '%', status: 'warning' }
    ]
  }
];

interface DepartmentDashboardProps {
  userRole?: string;
  userDepartments?: string[];
}

const DepartmentDashboard: React.FC<DepartmentDashboardProps> = ({ 
  userRole = 'ceo', 
  userDepartments = [] 
}) => {
  const [selectedDepartment, setSelectedDepartment] = useState<Department>(DEPARTMENTS[0]);
  const [refreshing, setRefreshing] = useState(false);

  // Filter departments based on user permissions
  const getAccessibleDepartments = () => {
    if (userRole === 'bmc_holdings' || userRole === 'ceo') {
      return DEPARTMENTS; // Full access
    }
    
    if (userRole === 'department_manager' && userDepartments.length > 0) {
      return DEPARTMENTS.filter(dept => userDepartments.includes(dept.id));
    }
    
    if (userRole === 'finance_manager') {
      return DEPARTMENTS.filter(dept => 
        dept.id === 'finance_accounting' || dept.id === 'investment_fund'
      );
    }
    
    if (userRole === 'hr_manager') {
      return DEPARTMENTS.filter(dept => dept.id === 'hr_training');
    }
    
    // Employee - limited access
    return DEPARTMENTS.filter(dept => 
      dept.id === 'hr_training' || dept.id === 'business_marketing'
    );
  };

  const accessibleDepartments = getAccessibleDepartments();

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getKPIStatus = (status: 'good' | 'warning' | 'critical') => {
    switch (status) {
      case 'good': return { color: 'text-green-600', icon: CheckCircle };
      case 'warning': return { color: 'text-yellow-600', icon: AlertTriangle };
      case 'critical': return { color: 'text-red-600', icon: AlertTriangle };
    }
  };

  const getActivityIcon = (type: 'info' | 'warning' | 'success' | 'error') => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Phòng ban ERP-AI</h1>
          <p className="text-muted-foreground">
            Theo dõi hoạt động 9 phòng ban • Quyền truy cập: {userRole}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Cài đặt
          </Button>
        </div>
      </div>

      {/* Department Navigation */}
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
        {accessibleDepartments.map((dept) => {
          const Icon = dept.icon;
          const isSelected = selectedDepartment.id === dept.id;
          
          return (
            <Button
              key={dept.id}
              variant={isSelected ? "default" : "outline"}
              className={`h-auto p-3 flex flex-col items-center gap-2 text-xs ${
                isSelected ? '' : 'hover:bg-muted'
              }`}
              onClick={() => setSelectedDepartment(dept)}
            >
              <Icon className="w-5 h-5" />
              <span className="text-center leading-tight">
                {dept.displayName.replace(/^[📌📊💰👥🏭🎯💻⚖️💵]\s/, '')}
              </span>
            </Button>
          );
        })}
      </div>

      {/* Selected Department Dashboard */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <selectedDepartment.icon className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">{selectedDepartment.displayName}</h2>
            <p className="text-muted-foreground">{selectedDepartment.description}</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {selectedDepartment.metrics.map((metric) => (
            <Card key={metric.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-xs">{metric.name}</CardDescription>
                  {getTrendIcon(metric.trend)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metric.value}{metric.unit && ` ${metric.unit}`}
                </div>
                <div className={`text-xs flex items-center gap-1 ${
                  metric.change > 0 ? 'text-green-600' : 
                  metric.change < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                  <span className="text-muted-foreground">so với tháng trước</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* KPIs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Chỉ số KPI
              </CardTitle>
              <CardDescription>Theo dõi hiệu suất theo mục tiêu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedDepartment.kpis.map((kpi) => {
                const statusConfig = getKPIStatus(kpi.status);
                const StatusIcon = statusConfig.icon;
                const progress = (kpi.current / kpi.target) * 100;
                
                return (
                  <div key={kpi.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                        <span className="text-sm font-medium">{kpi.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {kpi.current}{kpi.unit} / {kpi.target}{kpi.unit}
                      </span>
                    </div>
                    <Progress value={Math.min(progress, 100)} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Hoạt động Gần đây
              </CardTitle>
              <CardDescription>Cập nhật mới nhất từ phòng ban</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedDepartment.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{activity.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Thao tác Nhanh</CardTitle>
            <CardDescription>Các chức năng thường dùng cho {selectedDepartment.displayName}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Tạo báo cáo
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Xem chi tiết
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Phân tích dữ liệu
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Cấu hình
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Access Control Notice */}
      {userRole !== 'bmc_holdings' && userRole !== 'ceo' && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Bạn chỉ có quyền truy cập {accessibleDepartments.length}/{DEPARTMENTS.length} phòng ban. 
            Liên hệ quản trị viên để được cấp thêm quyền truy cập.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DepartmentDashboard;