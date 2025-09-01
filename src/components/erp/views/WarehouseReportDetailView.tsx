import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  Package,
  PackageOpen,
  PackageX,
  Truck,
  Filter,
  Download,
  Search,
  Bot,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Calendar,
  Users,
  Eye,
  RefreshCw,
  Clock,
  TrendingUp,
  RotateCcw,
  MapPin
} from "lucide-react";

interface WarehouseReportDetailViewProps {
  onBack: () => void;
}

export function WarehouseReportDetailView({ onBack }: WarehouseReportDetailViewProps) {
  const [filterLevel, setFilterLevel] = useState<string>('BMC');
  const [timePeriod, setTimePeriod] = useState<string>('month');
  const [viewMode, setViewMode] = useState<'overview' | 'detail'>('overview');
  const [aiQuery, setAiQuery] = useState<string>('');

  // Mock warehouse data
  const warehouseOverview = {
    totalInventoryValue: 9500000000, // 95 tỷ VNĐ
    safetyStockLevel: 78, // 78%
    averageDOH: 42, // 42 ngày
    inventoryTurnover: 5.2, // 5.2 vòng/năm
    pendingOrders: 1250,
    overdueOrders: 45 // 3.6%
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

  const detailedWarehouseData = [
    {
      warehouse: 'Kho Hà Nội',
      product: 'Cà phê hạt',
      unit: 'kg',
      openingStock: 5000,
      received: 2000,
      issued: 3500,
      closingStock: 3500,
      status: 'safe',
      doh: 35
    },
    {
      warehouse: 'Kho HCM',
      product: 'Trà sữa mix',
      unit: 'lít',
      openingStock: 3200,
      received: 500,
      issued: 1800,
      closingStock: 1900,
      status: 'warning',
      doh: 52
    },
    {
      warehouse: 'Kho Đà Nẵng',
      product: 'Đèn LED',
      unit: 'sp',
      openingStock: 2500,
      received: 1000,
      issued: 2200,
      closingStock: 1300,
      status: 'critical',
      doh: 18
    },
    {
      warehouse: 'Kho Cần Thơ',
      product: 'Máy tính bảng',
      unit: 'chiếc',
      openingStock: 800,
      received: 200,
      issued: 450,
      closingStock: 550,
      status: 'safe',
      doh: 45
    },
    {
      warehouse: 'Kho Hải Phòng',
      product: 'Thực phẩm đông lạnh',
      unit: 'kg',
      openingStock: 15000,
      received: 5000,
      issued: 8000,
      closingStock: 12000,
      status: 'safe',
      doh: 28
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-600 bg-green-50 dark:bg-green-950/20';
      case 'warning': return 'text-orange-600 bg-orange-50 dark:bg-orange-950/20';
      case 'critical': return 'text-red-600 bg-red-50 dark:bg-red-950/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-950/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'safe': return 'An toàn';
      case 'warning': return '⚠️ Gần báo động';
      case 'critical': return '🔴 Thiếu hụt';
      default: return 'Bình thường';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'critical': return <PackageX className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
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
              <Package className="h-8 w-8 mr-3 text-orange-600" />
              Báo cáo Kho & Vận hành
            </h1>
            <p className="text-muted-foreground mt-2">
              Theo dõi tồn kho, xuất nhập và hiệu suất vận hành realtime
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Bot className="h-4 w-4 mr-2" />
            AI Supply Chain Agent
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
                  placeholder="Tìm kiếm sản phẩm..."
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
              <Package className="h-4 w-4 mr-2" />
              Giá trị tồn kho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(warehouseOverview.totalInventoryValue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Tổng giá trị hàng hóa trong kho
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Tồn kho an toàn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {warehouseOverview.safetyStockLevel}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {100 - warehouseOverview.safetyStockLevel}% sản phẩm sắp báo động thấp
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              DOH trung bình
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {warehouseOverview.averageDOH} ngày
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Số ngày hàng nằm trong kho trung bình
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <RotateCcw className="h-4 w-4 mr-2" />
              Luân chuyển kho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {warehouseOverview.inventoryTurnover} vòng/năm
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Tốc độ hàng ra vào kho trong năm
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <PackageOpen className="h-4 w-4 mr-2" />
              Đơn chờ xử lý
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-600">
              {warehouseOverview.pendingOrders.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Đơn hàng đang chờ xuất kho
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Đơn trễ hạn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {warehouseOverview.overdueOrders}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {((warehouseOverview.overdueOrders / warehouseOverview.pendingOrders) * 100).toFixed(1)}% đơn hàng bị trễ
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
                Biểu đồ Kho & Vận hành
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                <div className="text-center">
                  <PieChart className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Biểu đồ Nhập - Xuất - Tồn & Heatmap tồn kho theo kho</p>
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
              AI Phân tích Kho
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">AI Tóm tắt:</p>
                  <p className="text-muted-foreground">
                    Tổng giá trị hàng tồn kho là 95 tỷ, cao hơn 10% so với tháng trước. 
                    Chi nhánh HCM có sản phẩm 'Trà sữa mix' gần báo động.
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
                    45 đơn hàng bị trễ hạn, chủ yếu ở Kho Đà Nẵng do thiếu nguyên liệu LED.
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
                    Đề xuất chuyển 500 sp từ Kho Hà Nội sang Kho Đà Nẵng để bù thiếu hụt LED.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t">
              <Input
                placeholder="Hỏi AI về kho vận..."
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
              Chi tiết Tồn kho theo Kho
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
                  <th className="text-left p-2">Kho</th>
                  <th className="text-left p-2">Sản phẩm</th>
                  <th className="text-center p-2">Tồn đầu kỳ</th>
                  <th className="text-center p-2">Nhập</th>
                  <th className="text-center p-2">Xuất</th>
                  <th className="text-center p-2">Tồn cuối kỳ</th>
                  <th className="text-center p-2">DOH</th>
                  <th className="text-center p-2">Cảnh báo</th>
                  <th className="text-center p-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {detailedWarehouseData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      {item.warehouse}
                    </td>
                    <td className="p-2">{item.product}</td>
                    <td className="text-center p-2">{item.openingStock.toLocaleString()} {item.unit}</td>
                    <td className="text-center p-2 text-green-600">+{item.received.toLocaleString()}</td>
                    <td className="text-center p-2 text-red-600">-{item.issued.toLocaleString()}</td>
                    <td className="text-center p-2 font-medium">{item.closingStock.toLocaleString()}</td>
                    <td className="text-center p-2">{item.doh} ngày</td>
                    <td className="text-center p-2">
                      <Badge className={getStatusColor(item.status)}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1">{getStatusText(item.status)}</span>
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
          <Truck className="h-4 w-4 mr-2" />
          Điều phối kho
        </Button>
      </div>
    </div>
  );
}