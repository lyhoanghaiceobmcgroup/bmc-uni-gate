import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Warehouse, 
  Package, 
  Truck, 
  BarChart3, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  QrCode,
  Building2,
  Target,
  FileText,
  Calendar,
  DollarSign
} from "lucide-react";

interface WarehouseDetailViewProps {
  onBack: () => void;
}

export function WarehouseDetailView({ onBack }: WarehouseDetailViewProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data cho phòng Kho vận
  const warehouseData = {
    overview: {
      totalStock: "2.8B VNĐ",
      stockTurnover: "8.5 lần/năm",
      inboundRate: "96.2%",
      outboundRate: "94.8%",
      warehouses: 5,
      totalArea: "15,000 m²",
      utilizationRate: "87.3%",
      avgDeliveryTime: "2.4 ngày"
    },
    inventory: {
      totalItems: 12847,
      lowStockItems: 23,
      expiringSoon: 8,
      categories: [
        { name: "Nguyên liệu", quantity: 4521, value: "1.2B VNĐ" },
        { name: "Thành phẩm", quantity: 3256, value: "980M VNĐ" },
        { name: "Bán thành phẩm", quantity: 2847, value: "420M VNĐ" },
        { name: "Phụ kiện", quantity: 2223, value: "200M VNĐ" }
      ],
      warehouses: ["Kho A - Hà Nội", "Kho B - TP.HCM", "Kho C - Đà Nẵng", "Kho D - Hải Phòng", "Kho E - Cần Thơ"]
    },
    logistics: {
      activeShipments: 156,
      pendingOrders: 89,
      deliveredToday: 234,
      carriers: [
        { name: "Viettel Post", shipments: 45, onTime: "96%" },
        { name: "GHTK", shipments: 38, onTime: "94%" },
        { name: "J&T Express", shipments: 32, onTime: "92%" },
        { name: "GHN", shipments: 28, onTime: "95%" },
        { name: "Ninja Van", shipments: 13, onTime: "89%" }
      ],
      routes: [
        { from: "Hà Nội", to: "TP.HCM", frequency: "Hàng ngày", cost: "2.5M VNĐ" },
        { from: "TP.HCM", to: "Đà Nẵng", frequency: "3 lần/tuần", cost: "1.8M VNĐ" },
        { from: "Hà Nội", to: "Hải Phòng", frequency: "Hàng ngày", cost: "800K VNĐ" }
      ]
    },
    suppliers: {
      totalSuppliers: 127,
      activeContracts: 89,
      topSuppliers: [
        { name: "Công ty TNHH ABC", category: "Nguyên liệu", rating: 4.8, orders: 156 },
        { name: "Nhà máy XYZ", category: "Bao bì", rating: 4.6, orders: 134 },
        { name: "Doanh nghiệp DEF", category: "Phụ kiện", rating: 4.7, orders: 98 },
        { name: "Công ty GHI", category: "Thiết bị", rating: 4.5, orders: 76 }
      ],
      performance: {
        onTimeDelivery: "94.2%",
        qualityScore: "96.8%",
        costSavings: "12.5%",
        contractCompliance: "98.1%"
      }
    },
    reports: {
      monthlyTurnover: [
        { month: "T1", value: 8.2 },
        { month: "T2", value: 8.5 },
        { month: "T3", value: 8.1 },
        { month: "T4", value: 8.7 },
        { month: "T5", value: 8.9 },
        { month: "T6", value: 8.3 }
      ],
      costAnalysis: {
        storage: "45%",
        transportation: "35%",
        handling: "15%",
        other: "5%"
      }
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tổng giá trị kho</p>
                <p className="text-2xl font-bold text-primary">{warehouseData.overview.totalStock}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Vòng quay kho</p>
                <p className="text-2xl font-bold text-green-600">{warehouseData.overview.stockTurnover}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tỷ lệ nhập kho</p>
                <p className="text-2xl font-bold text-blue-600">{warehouseData.overview.inboundRate}</p>
              </div>
              <ArrowLeft className="h-8 w-8 text-blue-600 rotate-180" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tỷ lệ xuất kho</p>
                <p className="text-2xl font-bold text-orange-600">{warehouseData.overview.outboundRate}</p>
              </div>
              <ArrowLeft className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warehouse Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Warehouse className="h-5 w-5" />
              Tình trạng kho bãi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{warehouseData.overview.warehouses}</div>
                <p className="text-sm text-muted-foreground">Số kho</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{warehouseData.overview.totalArea}</div>
                <p className="text-sm text-muted-foreground">Tổng diện tích</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tỷ lệ sử dụng</span>
                <span className="font-medium">{warehouseData.overview.utilizationRate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Thời gian giao hàng TB</span>
                <span className="font-medium">{warehouseData.overview.avgDeliveryTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Cảnh báo & Thông báo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Hàng tồn kho thấp</p>
                <p className="text-xs text-muted-foreground">{warehouseData.inventory.lowStockItems} sản phẩm cần bổ sung</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <Clock className="h-4 w-4 text-red-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Hàng sắp hết hạn</p>
                <p className="text-xs text-muted-foreground">{warehouseData.inventory.expiringSoon} sản phẩm cần xử lý</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Hệ thống hoạt động tốt</p>
                <p className="text-xs text-muted-foreground">Tất cả kho đang vận hành bình thường</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderInventoryManagement = () => (
    <div className="space-y-6">
      {/* Inventory Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{warehouseData.inventory.totalItems.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Tổng số mặt hàng</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{warehouseData.inventory.lowStockItems}</div>
            <p className="text-sm text-muted-foreground">Hàng tồn kho thấp</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{warehouseData.inventory.expiringSoon}</div>
            <p className="text-sm text-muted-foreground">Sắp hết hạn</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{warehouseData.inventory.warehouses.length}</div>
            <p className="text-sm text-muted-foreground">Số kho</p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Tồn kho theo danh mục</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {warehouseData.inventory.categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-muted-foreground">{category.quantity.toLocaleString()} sản phẩm</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{category.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Thao tác nhanh
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="warehouseSelect">Chọn kho</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn kho" />
                </SelectTrigger>
                <SelectContent>
                  {warehouseData.inventory.warehouses.map((warehouse, i) => (
                    <SelectItem key={i} value={warehouse.toLowerCase().replace(/\s+/g, '-')}>{warehouse}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="itemCode">Mã sản phẩm</Label>
              <Input id="itemCode" placeholder="Quét QR hoặc nhập mã" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1">
              <Package className="w-4 h-4 mr-2" />
              Kiểm kê
            </Button>
            <Button variant="outline" className="flex-1">
              <TrendingUp className="w-4 h-4 mr-2" />
              Nhập kho
            </Button>
            <Button variant="outline" className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Xuất kho
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLogistics = () => (
    <div className="space-y-6">
      {/* Logistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{warehouseData.logistics.activeShipments}</div>
            <p className="text-sm text-muted-foreground">Đang vận chuyển</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{warehouseData.logistics.pendingOrders}</div>
            <p className="text-sm text-muted-foreground">Chờ xử lý</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{warehouseData.logistics.deliveredToday}</div>
            <p className="text-sm text-muted-foreground">Giao hôm nay</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{warehouseData.logistics.carriers.length}</div>
            <p className="text-sm text-muted-foreground">Đối tác vận chuyển</p>
          </CardContent>
        </Card>
      </div>

      {/* Carriers Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Hiệu suất đối tác vận chuyển
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {warehouseData.logistics.carriers.map((carrier, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{carrier.name}</p>
                    <p className="text-sm text-muted-foreground">{carrier.shipments} lô hàng</p>
                  </div>
                </div>
                <Badge variant={parseInt(carrier.onTime) >= 95 ? "default" : parseInt(carrier.onTime) >= 90 ? "secondary" : "destructive"}>
                  {carrier.onTime} đúng hạn
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shipping Routes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Tuyến đường vận chuyển
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {warehouseData.logistics.routes.map((route, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{route.from} → {route.to}</p>
                    <p className="text-sm text-muted-foreground">{route.frequency}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{route.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSuppliers = () => (
    <div className="space-y-6">
      {/* Supplier Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{warehouseData.suppliers.totalSuppliers}</div>
            <p className="text-sm text-muted-foreground">Tổng nhà cung cấp</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{warehouseData.suppliers.activeContracts}</div>
            <p className="text-sm text-muted-foreground">Hợp đồng hiệu lực</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{warehouseData.suppliers.performance.onTimeDelivery}</div>
            <p className="text-sm text-muted-foreground">Giao hàng đúng hạn</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{warehouseData.suppliers.performance.costSavings}</div>
            <p className="text-sm text-muted-foreground">Tiết kiệm chi phí</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Suppliers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Nhà cung cấp hàng đầu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {warehouseData.suppliers.topSuppliers.map((supplier, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{supplier.name}</p>
                    <p className="text-sm text-muted-foreground">{supplier.category} • {supplier.orders} đơn hàng</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{supplier.rating} ⭐</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Chỉ số hiệu suất
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Giao hàng đúng hạn</span>
                <span className="font-medium">{warehouseData.suppliers.performance.onTimeDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Điểm chất lượng</span>
                <span className="font-medium">{warehouseData.suppliers.performance.qualityScore}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Tuân thủ hợp đồng</span>
                <span className="font-medium">{warehouseData.suppliers.performance.contractCompliance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Tiết kiệm chi phí</span>
                <span className="font-medium text-green-600">+{warehouseData.suppliers.performance.costSavings}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      {/* Report Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Vòng quay kho theo tháng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {warehouseData.reports.monthlyTurnover.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{item.month}</span>
                  <span className="font-medium">{item.value} lần</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Phân tích chi phí
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Lưu trữ</span>
                <span className="font-medium">{warehouseData.reports.costAnalysis.storage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Vận chuyển</span>
                <span className="font-medium">{warehouseData.reports.costAnalysis.transportation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Xử lý</span>
                <span className="font-medium">{warehouseData.reports.costAnalysis.handling}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Khác</span>
                <span className="font-medium">{warehouseData.reports.costAnalysis.other}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Xuất báo cáo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reportType">Loại báo cáo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại báo cáo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inventory">Báo cáo tồn kho</SelectItem>
                  <SelectItem value="turnover">Báo cáo vòng quay</SelectItem>
                  <SelectItem value="logistics">Báo cáo logistics</SelectItem>
                  <SelectItem value="suppliers">Báo cáo nhà cung cấp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="period">Kỳ báo cáo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn kỳ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Tuần này</SelectItem>
                  <SelectItem value="month">Tháng này</SelectItem>
                  <SelectItem value="quarter">Quý này</SelectItem>
                  <SelectItem value="year">Năm này</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1">
              <FileText className="w-4 h-4 mr-2" />
              Xuất PDF
            </Button>
            <Button variant="outline" className="flex-1">
              <FileText className="w-4 h-4 mr-2" />
              Xuất Excel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Warehouse className="h-6 w-6 text-amber-600" />
              Kho vận
            </h1>
            <p className="text-muted-foreground">Quản lý kho hàng, logistics và chuỗi cung ứng</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-amber-50 text-amber-700">
          🤖 AI Warehouse Agent
        </Badge>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Tổng quan
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Tồn kho
          </TabsTrigger>
          <TabsTrigger value="logistics" className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Logistics
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Nhà cung cấp
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Báo cáo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="inventory">
          {renderInventoryManagement()}
        </TabsContent>

        <TabsContent value="logistics">
          {renderLogistics()}
        </TabsContent>

        <TabsContent value="suppliers">
          {renderSuppliers()}
        </TabsContent>

        <TabsContent value="reports">
          {renderReports()}
        </TabsContent>
      </Tabs>
    </div>
  );
}