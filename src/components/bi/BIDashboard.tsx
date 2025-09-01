import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users, 
  DollarSign, 
  Target, 
  Calendar, 
  Filter, 
  Download, 
  RefreshCw, 
  Eye, 
  Settings, 
  Zap, 
  Globe, 
  Building, 
  Factory, 
  Briefcase, 
  CreditCard, 
  ShoppingCart, 
  UserCheck, 
  FileText, 
  Database,
  Clock,
  MapPin,
  Layers
} from 'lucide-react';

// Define data interfaces
interface KPIMetric {
  id: string;
  name: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  target?: number;
  unit?: string;
  category: 'financial' | 'operational' | 'strategic' | 'hr';
}

interface ChartData {
  id: string;
  name: string;
  type: 'bar' | 'line' | 'pie' | 'area' | 'heatmap';
  data: any[];
  title: string;
  description: string;
  timeframe: string;
}

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'milestone' | 'alert' | 'achievement' | 'meeting';
  department: string;
  impact: 'high' | 'medium' | 'low';
  status: 'completed' | 'in_progress' | 'planned';
}

interface HeatmapData {
  department: string;
  metric: string;
  value: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

// Mock KPI data
const KPI_METRICS: KPIMetric[] = [
  {
    id: 'revenue',
    name: 'Doanh thu tháng',
    value: '0',
    change: 0,
    trend: 'stable',
    target: 0,
    unit: 'VNĐ',
    category: 'financial'
  },
  {
    id: 'profit',
    name: 'Lợi nhuận ròng',
    value: '0',
    change: 0,
    trend: 'stable',
    target: 0,
    unit: 'VNĐ',
    category: 'financial'
  },
  {
    id: 'employees',
    name: 'Tổng nhân sự',
    value: 0,
    change: 0,
    trend: 'stable',
    target: 0,
    unit: 'người',
    category: 'hr'
  },
  {
    id: 'projects',
    name: 'Dự án đang triển khai',
    value: 0,
    change: 0,
    trend: 'stable',
    target: 0,
    unit: 'dự án',
    category: 'operational'
  },
  {
    id: 'efficiency',
    name: 'Hiệu suất vận hành',
    value: '0%',
    change: 0,
    trend: 'stable',
    target: 0,
    category: 'operational'
  },
  {
    id: 'satisfaction',
    name: 'Hài lòng khách hàng',
    value: '0/5',
    change: 0,
    trend: 'stable',
    target: 0,
    category: 'strategic'
  },
  {
    id: 'market_share',
    name: 'Thị phần ngành',
    value: '0%',
    change: 0,
    trend: 'stable',
    target: 0,
    category: 'strategic'
  },
  {
    id: 'roi',
    name: 'ROI trung bình',
    value: '0%',
    change: 0,
    trend: 'stable',
    target: 0,
    category: 'financial'
  }
];

// Mock chart data
const CHART_DATA: ChartData[] = [
  {
    id: 'revenue_trend',
    name: 'Xu hướng Doanh thu',
    type: 'line',
    title: 'Doanh thu 12 tháng qua',
    description: 'Theo dõi xu hướng doanh thu theo tháng',
    timeframe: '12 months',
    data: [
      { month: 'T1', value: 0, target: 0 },
      { month: 'T2', value: 0, target: 0 },
      { month: 'T3', value: 0, target: 0 },
      { month: 'T4', value: 0, target: 0 },
      { month: 'T5', value: 0, target: 0 },
      { month: 'T6', value: 0, target: 0 },
      { month: 'T7', value: 0, target: 0 },
      { month: 'T8', value: 0, target: 0 },
      { month: 'T9', value: 0, target: 0 },
      { month: 'T10', value: 0, target: 0 },
      { month: 'T11', value: 0, target: 0 },
      { month: 'T12', value: 0, target: 0 }
    ]
  },
  {
    id: 'department_performance',
    name: 'Hiệu suất Phòng ban',
    type: 'bar',
    title: 'Hiệu suất các phòng ban',
    description: 'So sánh hiệu suất giữa các phòng ban',
    timeframe: 'current month',
    data: [
      { department: 'Cổ đông', performance: 0, budget: 0 },
      { department: 'Kinh doanh', performance: 0, budget: 0 },
      { department: 'Tài chính', performance: 0, budget: 0 },
      { department: 'Nhân sự', performance: 0, budget: 0 },
      { department: 'Sản xuất', performance: 0, budget: 0 },
      { department: 'R&D', performance: 0, budget: 0 },
      { department: 'Công nghệ', performance: 0, budget: 0 },
      { department: 'Pháp chế', performance: 0, budget: 0 },
      { department: 'Đầu tư', performance: 0, budget: 0 }
    ]
  },
  {
    id: 'project_distribution',
    name: 'Phân bố Dự án',
    type: 'pie',
    title: 'Phân bố dự án theo ngành',
    description: 'Tỷ lệ dự án trong các lĩnh vực kinh doanh',
    timeframe: 'current',
    data: [
      { sector: 'Bất động sản', count: 0, percentage: 0 },
      { sector: 'Công nghệ', count: 0, percentage: 0 },
      { sector: 'Sản xuất', count: 0, percentage: 0 },
      { sector: 'Dịch vụ', count: 0, percentage: 0 },
      { sector: 'Tài chính', count: 0, percentage: 0 }
    ]
  }
];

// Mock timeline data
const TIMELINE_EVENTS: TimelineEvent[] = [];

// Mock heatmap data
const HEATMAP_DATA: HeatmapData[] = [
  { department: 'Cổ đông', metric: 'ROI', value: 0, status: 'critical' },
  { department: 'Cổ đông', metric: 'Governance', value: 0, status: 'critical' },
  { department: 'Cổ đông', metric: 'Compliance', value: 0, status: 'critical' },
  { department: 'Kinh doanh', metric: 'Revenue', value: 0, status: 'critical' },
  { department: 'Kinh doanh', metric: 'Customer Sat', value: 0, status: 'critical' },
  { department: 'Kinh doanh', metric: 'Market Share', value: 0, status: 'critical' },
  { department: 'Tài chính', metric: 'Budget Control', value: 0, status: 'critical' },
  { department: 'Tài chính', metric: 'Cash Flow', value: 0, status: 'critical' },
  { department: 'Tài chính', metric: 'Cost Efficiency', value: 0, status: 'critical' },
  { department: 'Nhân sự', metric: 'Retention', value: 0, status: 'critical' },
  { department: 'Nhân sự', metric: 'Training', value: 0, status: 'critical' },
  { department: 'Nhân sự', metric: 'Productivity', value: 0, status: 'critical' },
  { department: 'Sản xuất', metric: 'Quality', value: 0, status: 'critical' },
  { department: 'Sản xuất', metric: 'Efficiency', value: 0, status: 'critical' },
  { department: 'Sản xuất', metric: 'Safety', value: 0, status: 'critical' },
  { department: 'R&D', metric: 'Innovation', value: 0, status: 'critical' },
  { department: 'R&D', metric: 'Time to Market', value: 0, status: 'critical' },
  { department: 'R&D', metric: 'Patent Filing', value: 0, status: 'critical' },
  { department: 'Công nghệ', metric: 'System Uptime', value: 0, status: 'critical' },
  { department: 'Công nghệ', metric: 'Security Score', value: 0, status: 'critical' },
  { department: 'Công nghệ', metric: 'User Adoption', value: 0, status: 'critical' },
  { department: 'Pháp chế', metric: 'Compliance', value: 0, status: 'critical' },
  { department: 'Pháp chế', metric: 'Risk Management', value: 0, status: 'critical' },
  { department: 'Pháp chế', metric: 'Contract Review', value: 0, status: 'critical' },
  { department: 'Đầu tư', metric: 'Portfolio ROI', value: 0, status: 'critical' },
  { department: 'Đầu tư', metric: 'Risk Assessment', value: 0, status: 'critical' },
  { department: 'Đầu tư', metric: 'Due Diligence', value: 0, status: 'critical' }
];

interface BIDashboardProps {
  userRole?: string;
  accessLevel?: 'viewer' | 'analyst' | 'manager' | 'executive';
  department?: string;
}

const BIDashboard: React.FC<BIDashboardProps> = ({ 
  userRole = 'executive',
  accessLevel = 'executive',
  department = 'all'
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up' && change > 0) {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else if (trend === 'down' && change < 0) {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
    return <Activity className="w-4 h-4 text-gray-600" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'milestone': return <Target className="w-4 h-4 text-blue-600" />;
      case 'alert': return <Activity className="w-4 h-4 text-red-600" />;
      case 'achievement': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'meeting': return <Users className="w-4 h-4 text-purple-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredKPIs = department === 'all' 
    ? KPI_METRICS 
    : KPI_METRICS.filter(kpi => kpi.category === department);

  const filteredHeatmapData = department === 'all'
    ? HEATMAP_DATA
    : HEATMAP_DATA.filter(item => item.department === department);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            BI Dashboard Tổng hợp
          </h1>
          <p className="text-muted-foreground">
            Business Intelligence • Phân tích đa chiều • Báo cáo thời gian thực • Cấp truy cập: {accessLevel}
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Ngày</SelectItem>
              <SelectItem value="week">Tuần</SelectItem>
              <SelectItem value="month">Tháng</SelectItem>
              <SelectItem value="quarter">Quý</SelectItem>
              <SelectItem value="year">Năm</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả phòng ban</SelectItem>
              <SelectItem value="financial">Tài chính</SelectItem>
              <SelectItem value="operational">Vận hành</SelectItem>
              <SelectItem value="strategic">Chiến lược</SelectItem>
              <SelectItem value="hr">Nhân sự</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="charts">Biểu đồ</TabsTrigger>
          <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredKPIs.map((kpi) => (
              <Card key={kpi.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {kpi.name}
                    </CardTitle>
                    {getTrendIcon(kpi.trend, kpi.change)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`flex items-center gap-1 ${
                        kpi.change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {kpi.change > 0 ? '+' : ''}{kpi.change}%
                      </span>
                      {kpi.target && (
                        <span className="text-muted-foreground">
                          Mục tiêu: {kpi.target}{kpi.unit}
                        </span>
                      )}
                    </div>
                    {kpi.target && (
                      <Progress 
                        value={typeof kpi.value === 'string' && kpi.value.includes('%') 
                          ? parseFloat(kpi.value) 
                          : (typeof kpi.value === 'number' ? (kpi.value / kpi.target) * 100 : 75)
                        } 
                        className="h-2" 
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Charts Overview */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5" />
                  Xu hướng Doanh thu
                </CardTitle>
                <CardDescription>12 tháng gần nhất</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="w-12 h-12 mx-auto mb-2" />
                    <p>Biểu đồ đường xu hướng doanh thu</p>
                    <p className="text-sm">Tích hợp với Chart.js/Recharts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Hiệu suất Phòng ban
                </CardTitle>
                <CardDescription>So sánh các phòng ban</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                    <p>Biểu đồ cột so sánh hiệu suất</p>
                    <p className="text-sm">Hiển thị performance vs budget</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="charts" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {CHART_DATA.map((chart) => (
              <Card key={chart.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {chart.type === 'line' && <LineChart className="w-5 h-5" />}
                    {chart.type === 'bar' && <BarChart3 className="w-5 h-5" />}
                    {chart.type === 'pie' && <PieChart className="w-5 h-5" />}
                    {chart.title}
                  </CardTitle>
                  <CardDescription>{chart.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                    <div className="text-center text-muted-foreground">
                      {chart.type === 'line' && <LineChart className="w-16 h-16 mx-auto mb-4" />}
                      {chart.type === 'bar' && <BarChart3 className="w-16 h-16 mx-auto mb-4" />}
                      {chart.type === 'pie' && <PieChart className="w-16 h-16 mx-auto mb-4" />}
                      <p className="font-medium">{chart.title}</p>
                      <p className="text-sm">{chart.description}</p>
                      <p className="text-xs mt-2">Timeframe: {chart.timeframe}</p>
                      <Badge variant="outline" className="mt-2">
                        {chart.data.length} data points
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Performance Heatmap
              </CardTitle>
              <CardDescription>
                Ma trận hiệu suất các phòng ban theo từng chỉ số
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Heatmap Legend */}
                <div className="flex items-center gap-4 text-sm">
                  <span>Hiệu suất:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Xuất sắc (90-100)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>Tốt (80-89)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span>Cảnh báo (70-79)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Nghiêm trọng (&lt;70)</span>
                  </div>
                </div>
                
                {/* Heatmap Grid */}
                <div className="grid grid-cols-4 gap-2 max-h-96 overflow-y-auto">
                  {filteredHeatmapData.map((item, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg text-white text-center transition-all hover:scale-105 cursor-pointer ${
                        getStatusColor(item.status)
                      }`}
                      title={`${item.department} - ${item.metric}: ${item.value}%`}
                    >
                      <div className="text-xs font-medium">{item.department}</div>
                      <div className="text-xs opacity-90">{item.metric}</div>
                      <div className="text-lg font-bold">{item.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Timeline Sự kiện
              </CardTitle>
              <CardDescription>
                Theo dõi các sự kiện, milestone và cảnh báo quan trọng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {TIMELINE_EVENTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((event) => (
                  <div key={event.id} className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center">
                      {getEventIcon(event.type)}
                      <div className="w-px h-8 bg-border mt-2"></div>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant={event.impact === 'high' ? 'destructive' : 
                                        event.impact === 'medium' ? 'default' : 'secondary'}>
                            {event.impact === 'high' ? 'Cao' : 
                             event.impact === 'medium' ? 'Trung bình' : 'Thấp'}
                          </Badge>
                          <Badge variant={event.status === 'completed' ? 'default' : 
                                        event.status === 'in_progress' ? 'secondary' : 'outline'}>
                            {event.status === 'completed' ? 'Hoàn thành' : 
                             event.status === 'in_progress' ? 'Đang xử lý' : 'Kế hoạch'}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(event.date).toLocaleString('vi-VN')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {event.department}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  AI Insights
                </CardTitle>
                <CardDescription>
                  Phân tích thông minh từ dữ liệu kinh doanh
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-medium text-blue-900">🔍 Phát hiện xu hướng</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      Doanh thu Q1 dự kiến tăng 15% so với cùng kỳ năm trước dựa trên xu hướng 3 tháng gần đây.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-medium text-yellow-900">⚠️ Cảnh báo rủi ro</h4>
                    <p className="text-sm text-yellow-800 mt-1">
                      Phòng Nhân sự có tỷ lệ nghỉ việc cao (24%) - cần xem xét chính sách retention.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-medium text-green-900">💡 Khuyến nghị</h4>
                    <p className="text-sm text-green-800 mt-1">
                      Tăng đầu tư vào R&D (hiện 12% doanh thu) để duy trì lợi thế c경쟁 tranh.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-medium text-purple-900">🎯 Cơ hội</h4>
                    <p className="text-sm text-purple-800 mt-1">
                      Thị trường Đông Nam Á có tiềm năng mở rộng với ROI dự kiến 25%.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Dự báo & Mục tiêu
                </CardTitle>
                <CardDescription>
                  Dự báo AI và theo dõi mục tiêu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Doanh thu năm 2025</span>
                      <span className="font-medium">540B VNĐ (Dự báo)</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="text-xs text-muted-foreground">Đạt 75% mục tiêu (405B/540B)</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mở rộng thị trường</span>
                      <span className="font-medium">3/5 quốc gia</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <div className="text-xs text-muted-foreground">Hoàn thành 60% kế hoạch mở rộng</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Chuyển đổi số</span>
                      <span className="font-medium">8/9 phòng ban</span>
                    </div>
                    <Progress value={89} className="h-2" />
                    <div className="text-xs text-muted-foreground">Gần hoàn thành chuyển đổi số</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sustainability Goals</span>
                      <span className="font-medium">67% Carbon Neutral</span>
                    </div>
                    <Progress value={67} className="h-2" />
                    <div className="text-xs text-muted-foreground">Đang tiến tới mục tiêu 2030</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Access Level Notice */}
      {accessLevel !== 'executive' && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-yellow-800">
              <Eye className="w-4 h-4" />
              <span className="text-sm">
                Bạn đang xem với quyền <strong>{accessLevel}</strong>. 
                Một số dữ liệu nhạy cảm có thể được ẩn hoặc tổng hợp. 
                Liên hệ quản lý để được cấp quyền cao hơn.
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BIDashboard;