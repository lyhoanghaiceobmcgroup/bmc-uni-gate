import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  Users,
  UserPlus,
  UserMinus,
  Target,
  Filter,
  Download,
  Search,
  Bot,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Calendar,
  Building,
  Eye,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Award
} from "lucide-react";

interface HRReportDetailViewProps {
  onBack: () => void;
}

export function HRReportDetailView({ onBack }: HRReportDetailViewProps) {
  const [filterLevel, setFilterLevel] = useState<string>('BMC');
  const [timePeriod, setTimePeriod] = useState<string>('month');
  const [viewMode, setViewMode] = useState<'overview' | 'detail'>('overview');
  const [aiQuery, setAiQuery] = useState<string>('');

  // Mock HR data
  const hrOverview = {
    totalEmployees: 1250,
    newHires: 45,
    departures: 12,
    turnoverRate: 1.2, // 1.2%
    hrCosts: 18000000000, // 18 tỷ VNĐ
    kpiCompletion: 78 // 78%
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      notation: 'compact'
    }).format(amount);
  };

  const organizationLevels = [
    { value: 'BMC', label: 'BMC - Tập đoàn' },
    { value: 'F1', label: 'F1 - Cụm ngành' },
    { value: 'F2', label: 'F2 - Ngành' },
    { value: 'F3', label: 'F3 - Công ty' },
    { value: 'F4', label: 'F4 - Chi nhánh' },
    { value: 'F5', label: 'F5 - Startup' }
  ];

  const detailedHRData = [
    {
      department: 'Công nghệ',
      employees: 320,
      newHires: 15,
      departures: 3,
      avgSalary: 15000000,
      kpiScore: 92,
      status: 'excellent'
    },
    {
      department: 'Kinh doanh',
      employees: 280,
      newHires: 12,
      departures: 5,
      avgSalary: 13000000,
      kpiScore: 78,
      status: 'good'
    },
    {
      department: 'Marketing',
      employees: 150,
      newHires: 8,
      departures: 2,
      avgSalary: 12000000,
      kpiScore: 65,
      status: 'needs_improvement'
    },
    {
      department: 'Vận hành',
      employees: 200,
      newHires: 10,
      departures: 2,
      avgSalary: 10000000,
      kpiScore: 85,
      status: 'good'
    },
    {
      department: 'Tài chính',
      employees: 80,
      newHires: 0,
      departures: 0,
      avgSalary: 16000000,
      kpiScore: 88,
      status: 'excellent'
    },
    {
      department: 'HR',
      employees: 45,
      newHires: 0,
      departures: 0,
      avgSalary: 14000000,
      kpiScore: 90,
      status: 'excellent'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 dark:bg-green-950/20';
      case 'good': return 'text-blue-600 bg-blue-50 dark:bg-blue-950/20';
      case 'needs_improvement': return 'text-orange-600 bg-orange-50 dark:bg-orange-950/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-950/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excellent': return 'Xuất sắc';
      case 'good': return 'Tốt';
      case 'needs_improvement': return 'Cần cải thiện';
      default: return 'Trung bình';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            ← Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Users className="h-8 w-8 mr-3 text-purple-600" />
              Báo cáo Nhân sự & KPI
            </h1>
            <p className="text-muted-foreground mt-2">
              Theo dõi nhân sự, KPI và hiệu suất làm việc realtime
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Bot className="h-4 w-4 mr-2" />
            AI HR Agent
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Lọc:</span>
            </div>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Chọn cấp tổ chức" />
              </SelectTrigger>
              <SelectContent>
                {organizationLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Ngày</SelectItem>
                <SelectItem value="week">Tuần</SelectItem>
                <SelectItem value="month">Tháng</SelectItem>
                <SelectItem value="quarter">Quý</SelectItem>
                <SelectItem value="year">Năm</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm nhân viên..."
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Làm mới
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Tổng Nhân sự
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {hrOverview.totalEmployees.toLocaleString()} người
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Tổng số nhân viên đang làm việc
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <UserPlus className="h-4 w-4 mr-2" />
              Nhân sự mới
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +{hrOverview.newHires}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Số người được tuyển dụng tháng này
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <UserMinus className="h-4 w-4 mr-2" />
              Nghỉ việc
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              -{hrOverview.departures}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Số người nghỉ việc tháng này
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Tỷ lệ nghỉ việc
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {hrOverview.turnoverRate}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Trong 100 nhân viên có {hrOverview.turnoverRate} người nghỉ
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Chi phí Nhân sự
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(hrOverview.hrCosts)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Lương, thưởng, bảo hiểm tháng này
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Target className="h-4 w-4 mr-2" />
              KPI hoàn thành
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-600">
              {hrOverview.kpiCompletion}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Trong 100 nhân viên có {hrOverview.kpiCompletion} người đạt KPI
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Biểu đồ Nhân sự & KPI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                <div className="text-center">
                  <PieChart className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Biểu đồ tăng giảm nhân sự & KPI heatmap theo phòng ban</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              AI Phân tích HR
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">AI Tóm tắt:</p>
                  <p className="text-muted-foreground">
                    Tháng này, số nhân sự mới tăng 45 người, chủ yếu ở ngành Công nghệ. 
                    KPI toàn hệ thống đạt 78%, thấp hơn mục tiêu 85%.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">AI Cảnh báo:</p>
                  <p className="text-muted-foreground">
                    Phòng Marketing của F3 Công ty X chỉ đạt KPI 60%, thấp hơn trung bình 20%.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <Bot className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">AI Gợi ý:</p>
                  <p className="text-muted-foreground">
                    Cần bổ sung đào tạo cho nhóm Marketing và xem xét lại mục tiêu KPI cho phù hợp.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t">
              <Input
                placeholder="Hỏi AI về nhân sự..."
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="mb-2"
              />
              <Button size="sm" className="w-full">
                <Bot className="h-4 w-4 mr-2" />
                Hỏi AI
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Data Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Chi tiết Nhân sự & KPI theo Phòng ban
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === 'overview' ? 'detail' : 'overview')}>
                {viewMode === 'overview' ? 'Xem chi tiết' : 'Tổng quan'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Phòng ban</th>
                  <th className="text-center p-2">Nhân sự</th>
                  <th className="text-center p-2">Tuyển mới</th>
                  <th className="text-center p-2">Nghỉ việc</th>
                  <th className="text-right p-2">Lương TB</th>
                  <th className="text-center p-2">KPI (%)</th>
                  <th className="text-center p-2">Tình trạng</th>
                  <th className="text-center p-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {detailedHRData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{item.department}</td>
                    <td className="text-center p-2">{item.employees}</td>
                    <td className="text-center p-2">
                      <span className="text-green-600">+{item.newHires}</span>
                    </td>
                    <td className="text-center p-2">
                      <span className="text-red-600">-{item.departures}</span>
                    </td>
                    <td className="text-right p-2">{formatCurrency(item.avgSalary)}</td>
                    <td className="text-center p-2">
                      <div className="flex items-center justify-center space-x-1">
                        <span className={item.kpiScore >= 80 ? 'text-green-600' : item.kpiScore >= 70 ? 'text-orange-600' : 'text-red-600'}>
                          {item.kpiScore}%
                        </span>
                        {item.kpiScore >= 90 && <Award className="h-4 w-4 text-yellow-500" />}
                      </div>
                    </td>
                    <td className="text-center p-2">
                      <Badge className={getStatusColor(item.status)}>
                        {getStatusText(item.status)}
                      </Badge>
                    </td>
                    <td className="text-center p-2">
                      <Button variant="outline" size="sm">
                        Xem thêm
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 pt-4">
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Xuất PDF
        </Button>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Lên lịch báo cáo
        </Button>
        <Button variant="outline">
          <Users className="h-4 w-4 mr-2" />
          Chia sẻ
        </Button>
      </div>
    </div>
  );
}