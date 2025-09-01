import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
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
  Users,
  Eye,
  RefreshCw
} from "lucide-react";

interface FinancialReportDetailViewProps {
  onBack: () => void;
}

export function FinancialReportDetailView({ onBack }: FinancialReportDetailViewProps) {
  const [filterLevel, setFilterLevel] = useState<string>('BMC');
  const [timePeriod, setTimePeriod] = useState<string>('month');
  const [viewMode, setViewMode] = useState<'overview' | 'detail'>('overview');
  const [aiQuery, setAiQuery] = useState<string>('');

  // Mock financial data
  const financialOverview = {
    totalRevenue: 20000000000, // 200 tỷ VNĐ
    totalExpenses: 12000000000, // 120 tỷ VNĐ  
    netProfit: 8000000000, // 80 tỷ VNĐ
    profitMargin: 40, // 40%
    accountsReceivable: 3000000000, // 30 tỷ VNĐ
    availableFunds: 5000000000 // 50 tỷ VNĐ
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

  const detailedFinancialData = [
    {
      department: 'F&B - Chuỗi cà phê',
      revenue: 5000000000,
      expenses: 3000000000,
      profit: 2000000000,
      receivables: 500000000,
      funds: 1500000000,
      trend: 'up'
    },
    {
      department: 'Công nghệ - Phần mềm',
      revenue: 8000000000,
      expenses: 4500000000,
      profit: 3500000000,
      receivables: 1200000000,
      funds: 2000000000,
      trend: 'up'
    },
    {
      department: 'Bất động sản',
      revenue: 6000000000,
      expenses: 4000000000,
      profit: 2000000000,
      receivables: 1000000000,
      funds: 1200000000,
      trend: 'down'
    },
    {
      department: 'Logistics',
      revenue: 1000000000,
      expenses: 500000000,
      profit: 500000000,
      receivables: 300000000,
      funds: 300000000,
      trend: 'stable'
    }
  ];

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
              <DollarSign className="h-8 w-8 mr-3 text-green-600" />
              Báo cáo Tài chính & Doanh thu
            </h1>
            <p className="text-muted-foreground mt-2">
              Theo dõi doanh thu, chi phí, lợi nhuận và dòng tiền realtime
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Bot className="h-4 w-4 mr-2" />
            AI Finance Agent
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
                  placeholder="Tìm kiếm..."
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
              <TrendingUp className="h-4 w-4 mr-2" />
              Tổng Doanh thu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(financialOverview.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Cứ 100 đồng doanh thu là tổng tiền công ty kiếm được
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <TrendingDown className="h-4 w-4 mr-2" />
              Tổng Chi phí
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(financialOverview.totalExpenses)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Tiền công ty đã chi ra để hoạt động
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Lợi nhuận ròng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(financialOverview.netProfit)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Tiền lời sau khi trừ hết chi phí
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Tỷ suất lợi nhuận
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {financialOverview.profitMargin}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Cứ 100 đồng doanh thu thì giữ lại {financialOverview.profitMargin} đồng lợi nhuận
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Công nợ phải thu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(financialOverview.accountsReceivable)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Tiền khách hàng còn nợ chưa trả
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Quỹ hiện có
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-600">
              {formatCurrency(financialOverview.availableFunds)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Tiền mặt và tiền gửi ngân hàng
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
                Biểu đồ Tài chính Tổng quan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                <div className="text-center">
                  <PieChart className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Biểu đồ doanh thu - chi phí - lợi nhuận theo tháng</p>
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
              AI Phân tích
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">AI Tóm tắt:</p>
                  <p className="text-muted-foreground">
                    Tháng 7, doanh thu toàn tập đoàn đạt 200 tỷ, cao hơn 15% so với tháng 6. 
                    Ngành F&B tăng mạnh nhất (+25%).
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
                    Công nợ phải thu ở F3 Công ty A đang cao hơn 20% so với trung bình 3 tháng.
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
                    Tập trung thu hồi công nợ Công ty A trong quý tới để cải thiện dòng tiền.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t">
              <Input
                placeholder="Hỏi AI về tài chính..."
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
              Chi tiết Tài chính theo {filterLevel}
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
                  <th className="text-left p-2">Đơn vị</th>
                  <th className="text-right p-2">Doanh thu</th>
                  <th className="text-right p-2">Chi phí</th>
                  <th className="text-right p-2">Lợi nhuận</th>
                  <th className="text-right p-2">Công nợ</th>
                  <th className="text-right p-2">Quỹ</th>
                  <th className="text-center p-2">Xu hướng</th>
                  <th className="text-center p-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {detailedFinancialData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{item.department}</td>
                    <td className="text-right p-2 text-green-600">{formatCurrency(item.revenue)}</td>
                    <td className="text-right p-2 text-red-600">{formatCurrency(item.expenses)}</td>
                    <td className="text-right p-2 text-blue-600">{formatCurrency(item.profit)}</td>
                    <td className="text-right p-2 text-orange-600">{formatCurrency(item.receivables)}</td>
                    <td className="text-right p-2 text-cyan-600">{formatCurrency(item.funds)}</td>
                    <td className="text-center p-2">
                      {item.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600 inline" />}
                      {item.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600 inline" />}
                      {item.trend === 'stable' && <div className="h-4 w-4 bg-gray-400 rounded-full inline-block" />}
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