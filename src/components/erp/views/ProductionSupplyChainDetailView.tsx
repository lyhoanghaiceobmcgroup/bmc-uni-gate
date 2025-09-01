import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Factory, Package, Truck, BarChart3, AlertTriangle, TrendingUp, DollarSign, Target, Clock, FileText, Upload, Download, Bot, Plus, MessageSquare, Cog, Zap, Wrench, CheckCircle2, XCircle, MapPin, QrCode, Building2, Users, Calendar, Settings, Eye, Edit, Trash2, Filter, Search, RefreshCcw, Bell, Database, PieChart, LineChart, BarChart, Activity, Thermometer, Gauge, Shield, Globe, Star, Award, Camera, ScanLine, Building, Warehouse, Boxes, ShoppingCart, CreditCard, Phone, Mail, User, ChevronDown, ChevronUp, TrendingDown } from "lucide-react";

interface ProductionSupplyChainDetailViewProps {
  onBack: () => void;
}

export function ProductionSupplyChainDetailView({ onBack }: ProductionSupplyChainDetailViewProps) {
  const [activeView, setActiveView] = useState<"production" | "inventory" | "supply" | "logistics" | "reports">("production");
  const [organizationLevel, setOrganizationLevel] = useState<"BMC" | "F1" | "F2" | "F3" | "F4" | "F5">("BMC");
  const [timeFilter, setTimeFilter] = useState<"today" | "week" | "month" | "quarter" | "year">("month");
  const [aiQuery, setAiQuery] = useState("");

  // Comprehensive Professional Mockup Data - BMC → F1 → F2 → F3 → F4 → F5
  const getOrganizationData = () => {
    const baseData = {
      BMC: {
        name: "BMC Group Holdings",
        totalProduction: 0,
        totalRevenue: 0,
        facilitiesCount: 0,
        employeeCount: 0,
        regions: ["Việt Nam", "Thái Lan", "Malaysia", "Indonesia"],
        subsidiaries: 0
      },
      F1: {
        name: "BMC Vietnam Coffee Corporation", 
        totalProduction: 0,
        totalRevenue: 0,
        facilitiesCount: 0,
        employeeCount: 0,
        regions: ["Miền Bắc", "Miền Trung", "Miền Nam"],
        subsidiaries: 0
      },
      F2: {
        name: "Trung Nguyên Legend",
        totalProduction: 0,
        totalRevenue: 0,
        facilitiesCount: 0,
        employeeCount: 0,
        regions: ["Hà Nội", "TP.HCM", "Đà Nẵng"],
        subsidiaries: 0
      },
      F3: {
        name: "Nhà máy Hà Nội",
        totalProduction: 0,
        totalRevenue: 0,
        facilitiesCount: 0,
        employeeCount: 0,
        regions: ["Hà Nội", "Hải Phòng"],
        subsidiaries: 0
      },
      F4: {
        name: "Chi nhánh Cầu Giấy",
        totalProduction: 0,
        totalRevenue: 0,
        facilitiesCount: 0,
        employeeCount: 0,
        regions: ["Cầu Giấy", "Nam Từ Liêm"],
        subsidiaries: 0
      },
      F5: {
        name: "Phân xưởng A1",
        totalProduction: 0,
        totalRevenue: 0,
        facilitiesCount: 0,
        employeeCount: 0,
        regions: ["Xuân Thủy"],
        subsidiaries: 0
      }
    };
    return baseData[organizationLevel];
  };

  const getCurrentLevelData = () => {
    const orgData = getOrganizationData();
    const multiplier = organizationLevel === "BMC" ? 1 : 
                     organizationLevel === "F1" ? 0.4 : 
                     organizationLevel === "F2" ? 0.25 :
                     organizationLevel === "F3" ? 0.12 :
                     organizationLevel === "F4" ? 0.05 : 0.025;

    return {
      // Production Data
      production: {
        dailyOutput: Math.round(18500 * multiplier),
        targetOutput: Math.round(22000 * multiplier),
        efficiency: organizationLevel === "BMC" ? 91.2 : 
                   organizationLevel === "F1" ? 0 :
                   organizationLevel === "F2" ? 92.1 :
                   organizationLevel === "F3" ? 87.8 :
                   organizationLevel === "F4" ? 89.3 : 85.6,
        qualityRate: organizationLevel === "BMC" ? 97.8 :
                    organizationLevel === "F1" ? 0 :
                    organizationLevel === "F2" ? 98.1 :
                    organizationLevel === "F3" ? 95.9 :
                    organizationLevel === "F4" ? 96.8 : 94.2,
        downtime: organizationLevel === "F5" ? 4.2 : organizationLevel === "F4" ? 3.1 : 2.5,
        productionLines: organizationLevel === "BMC" ? 45 :
                        organizationLevel === "F1" ? 0 :
                        organizationLevel === "F2" ? 12 :
                        organizationLevel === "F3" ? 6 :
                        organizationLevel === "F4" ? 3 : 1,
        activeLines: organizationLevel === "BMC" ? 42 :
                    organizationLevel === "F1" ? 0 :
                    organizationLevel === "F2" ? 11 :
                    organizationLevel === "F3" ? 5 :
                    organizationLevel === "F4" ? 3 : 1,
        maintenanceAlerts: organizationLevel === "BMC" ? 8 :
                          organizationLevel === "F1" ? 0 :
                          organizationLevel === "F2" ? 2 :
                          organizationLevel === "F3" ? 1 :
                          organizationLevel === "F4" ? 1 : 1,
        products: organizationLevel === "BMC" ? 
          ["Cà phê rang xay", "Cà phê hòa tan", "RTD Coffee", "Coffee Capsules", "Specialty Blends"] :
          organizationLevel === "F1" ?
          ["Cà phê rang xay", "Cà phê hòa tan", "RTD Coffee"] :
          organizationLevel === "F2" ?
          ["Trung Nguyên Legend", "Creative Coffee"] :
          organizationLevel === "F3" ?
          ["Cà phê rang xay", "Cà phê hòa tan"] :
          organizationLevel === "F4" ?
          ["Cà phê rang xay"] : 
          ["Cà phê rang xay Premium"]
      },

      // Inventory & Warehouse Data  
      inventory: {
        totalValue: Math.round(8500000000 * multiplier),
        rawMaterials: {
          total: Math.round(2800 * multiplier),
          coffee_beans: Math.round(1200 * multiplier),
          sugar: Math.round(850 * multiplier),
          packaging: Math.round(750 * multiplier),
          lowStockItems: Math.round(8 * multiplier)
        },
        wip: {
          total: Math.round(580 * multiplier),
          roasting: Math.round(320 * multiplier),
          packaging: Math.round(180 * multiplier),
          quality_control: Math.round(80 * multiplier)
        },
        finished: {
          total: Math.round(2400 * multiplier),
          ready_to_ship: Math.round(1800 * multiplier),
          in_quality_hold: Math.round(450 * multiplier),
          damaged: Math.round(150 * multiplier)
        },
        warehouses: organizationLevel === "BMC" ? 
          ["Kho Trung tâm HN", "Kho HCM", "Kho Đà Nẵng", "Kho Cần Thơ", "Kho Hải Phòng"] :
          organizationLevel === "F1" ?
          ["Kho Trung tâm HN", "Kho HCM", "Kho Đà Nẵng"] :
          organizationLevel === "F2" ?
          ["Kho Hà Nội", "Kho TP.HCM"] :
          organizationLevel === "F3" ?
          ["Kho chính", "Kho phụ"] :
          organizationLevel === "F4" ?
          ["Kho A", "Kho B"] :
          ["Kho chính"],
        turnoverRate: organizationLevel === "BMC" ? 15.2 : 
                     organizationLevel === "F1" ? 0 :
                     organizationLevel === "F2" ? 14.5 :
                     organizationLevel === "F3" ? 12.1 :
                     organizationLevel === "F4" ? 11.8 : 10.5
      },

      // Supply Chain Data
      supply: {
        suppliers: {
          total: organizationLevel === "BMC" ? 145 :
                organizationLevel === "F1" ? 0 :
                organizationLevel === "F2" ? 42 :
                organizationLevel === "F3" ? 28 :
                organizationLevel === "F4" ? 15 : 8,
          active: organizationLevel === "BMC" ? 132 :
                 organizationLevel === "F1" ? 0 :
                 organizationLevel === "F2" ? 38 :
                 organizationLevel === "F3" ? 25 :
                 organizationLevel === "F4" ? 13 : 7,
          certified: organizationLevel === "BMC" ? 108 :
                    organizationLevel === "F1" ? 0 :
                    organizationLevel === "F2" ? 32 :
                    organizationLevel === "F3" ? 21 :
                    organizationLevel === "F4" ? 11 : 6,
          avgRating: organizationLevel === "BMC" ? 4.6 :
                    organizationLevel === "F1" ? 0 :
                    organizationLevel === "F2" ? 4.5 :
                    organizationLevel === "F3" ? 4.2 :
                    organizationLevel === "F4" ? 4.1 : 3.9
        },
        purchaseOrders: {
          thisMonth: organizationLevel === "BMC" ? 285 :
                    organizationLevel === "F1" ? 0 :
                    organizationLevel === "F2" ? 95 :
                    organizationLevel === "F3" ? 48 :
                    organizationLevel === "F4" ? 25 : 12,
          pending: organizationLevel === "BMC" ? 32 :
                  organizationLevel === "F1" ? 0 :
                  organizationLevel === "F2" ? 12 :
                  organizationLevel === "F3" ? 6 :
                  organizationLevel === "F4" ? 3 : 2,
          approved: organizationLevel === "BMC" ? 238 :
                   organizationLevel === "F1" ? 0 :
                   organizationLevel === "F2" ? 78 :
                   organizationLevel === "F3" ? 39 :
                   organizationLevel === "F4" ? 20 : 9,
          completed: organizationLevel === "BMC" ? 15 :
                    organizationLevel === "F1" ? 0 :
                    organizationLevel === "F2" ? 5 :
                    organizationLevel === "F3" ? 3 :
                    organizationLevel === "F4" ? 2 : 1
        },
        procurement: {
          totalValue: Math.round(18500000000 * multiplier),
          costSavings: organizationLevel === "BMC" ? 12.8 :
                      organizationLevel === "F1" ? 0 :
                      organizationLevel === "F2" ? 9.2 :
                      organizationLevel === "F3" ? 6.8 :
                      organizationLevel === "F4" ? 5.1 : 3.2,
          leadTime: organizationLevel === "F5" ? 18 : organizationLevel === "F4" ? 14 : 12
        }
      },

      // Logistics Data
      logistics: {
        shipments: {
          inTransit: organizationLevel === "BMC" ? 485 :
                    organizationLevel === "F1" ? 0 :
                    organizationLevel === "F2" ? 142 :
                    organizationLevel === "F3" ? 89 :
                    organizationLevel === "F4" ? 45 : 18,
          delivered: organizationLevel === "BMC" ? 1850 :
                    organizationLevel === "F1" ? 0 :
                    organizationLevel === "F2" ? 542 :
                    organizationLevel === "F3" ? 342 :
                    organizationLevel === "F4" ? 185 : 89,
          delayed: organizationLevel === "BMC" ? 28 :
                  organizationLevel === "F1" ? 0 :
                  organizationLevel === "F2" ? 9 :
                  organizationLevel === "F3" ? 7 :
                  organizationLevel === "F4" ? 4 : 2,
          onTimeRate: organizationLevel === "BMC" ? 96.8 :
                     organizationLevel === "F1" ? 0 :
                     organizationLevel === "F2" ? 97.1 :
                     organizationLevel === "F3" ? 94.6 :
                     organizationLevel === "F4" ? 93.8 : 92.4
        },
        routes: organizationLevel === "BMC" ? 
          ["Domestic", "International", "Regional", "Local"] :
          organizationLevel === "F1" ?
          ["Miền Bắc", "Miền Trung", "Miền Nam"] :
          organizationLevel === "F2" ?
          ["Hà Nội-HCM", "Hà Nội-Đà Nẵng"] :
          organizationLevel === "F3" ?
          ["Nội thành", "Ngoại thành"] :
          organizationLevel === "F4" ?
          ["Khu vực A", "Khu vực B"] :
          ["Local delivery"],
        avgDeliveryTime: organizationLevel === "F5" ? 4.8 : 
                        organizationLevel === "F4" ? 3.2 : 2.8,
        transportCost: Math.round(850000000 * multiplier),
        vehicles: {
          total: organizationLevel === "BMC" ? 285 :
                organizationLevel === "F1" ? 0 :
                organizationLevel === "F2" ? 85 :
                organizationLevel === "F3" ? 48 :
                organizationLevel === "F4" ? 24 : 8,
          active: organizationLevel === "BMC" ? 268 :
                 organizationLevel === "F1" ? 0 :
                 organizationLevel === "F2" ? 79 :
                 organizationLevel === "F3" ? 44 :
                 organizationLevel === "F4" ? 22 : 7,
          maintenance: organizationLevel === "BMC" ? 17 :
                      organizationLevel === "F1" ? 0 :
                      organizationLevel === "F2" ? 6 :
                      organizationLevel === "F3" ? 4 :
                      organizationLevel === "F4" ? 2 : 1
        }
      }
    };
  };

  const currentData = getCurrentLevelData();
  const orgInfo = getOrganizationData();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': case 'delivered': case 'active': case 'high': return 'bg-primary text-primary-foreground';
      case 'pending': case 'processing': case 'medium': return 'bg-secondary text-secondary-foreground'; 
      case 'delayed': case 'cancelled': case 'low': return 'bg-destructive text-destructive-foreground';
      case 'maintenance': case 'inactive': return 'bg-muted text-muted-foreground';
      default: return 'bg-accent text-accent-foreground';
    }
  };

  const renderProductionManagement = () => (
    <div className="space-y-6">
      {/* Production Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sản lượng hôm nay</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(currentData.production.dailyOutput)}</div>
            <p className="text-xs text-muted-foreground">
              Mục tiêu: {formatNumber(currentData.production.targetOutput)} ({Math.round((currentData.production.dailyOutput / currentData.production.targetOutput) * 100)}%)
            </p>
            <Progress value={(currentData.production.dailyOutput / currentData.production.targetOutput) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hiệu suất dây chuyền</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.production.efficiency}%</div>
            <p className="text-xs text-muted-foreground">
              Downtime: {currentData.production.downtime}h
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Hoạt động: {currentData.production.activeLines}/{currentData.production.productionLines}</span>
                <Badge variant="default" className="text-xs">
                  {Math.round((currentData.production.activeLines / currentData.production.productionLines) * 100)}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chất lượng sản phẩm</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.production.qualityRate}%</div>
            <p className="text-xs text-muted-foreground">Tỷ lệ đạt chuẩn</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Đạt chuẩn</span>
                <span className="text-primary">{currentData.production.qualityRate}%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Cần cải thiện</span>
                <span className="text-destructive">{(100 - currentData.production.qualityRate).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cảnh báo bảo trì</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{currentData.production.maintenanceAlerts}</div>
            <p className="text-xs text-muted-foreground">Cần xử lý</p>
            <Badge variant="destructive" className="mt-2 text-xs">
              Ưu tiên cao
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Production Lines Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Factory className="h-5 w-5" />
            Trạng thái dây chuyền sản xuất - {orgInfo.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: currentData.production.productionLines }, (_, i) => {
              const lineNum = i + 1;
              const isActive = i < currentData.production.activeLines;
              const efficiency = isActive ? Math.round(Math.random() * 20 + 80) : 0;
              const status = isActive ? 
                efficiency > 90 ? 'Tốt' : 
                efficiency > 80 ? 'Bình thường' : 'Cần bảo trì' : 'Bảo trì';
              const statusVariant = efficiency > 90 ? 'default' : efficiency > 80 ? 'secondary' : 'destructive';
              
              return (
                <div key={lineNum} className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                  isActive 
                    ? 'bg-card border-border hover:border-primary/20' 
                    : 'bg-muted/50 border-border/50'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">Dây chuyền {lineNum}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isActive ? 'Đang hoạt động' : 'Tạm dừng'}
                      </p>
                    </div>
                    <Badge variant={isActive ? statusVariant as any : "secondary"}>
                      {status}
                    </Badge>
                  </div>
                  {isActive && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Hiệu suất:</span>
                        <span className="font-medium text-foreground">{efficiency}%</span>
                      </div>
                      <Progress value={efficiency} className="h-2" />
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Sản phẩm:</span>
                          <span className="text-foreground font-medium">
                            {currentData.production.products[i % currentData.production.products.length]}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Tốc độ:</span>
                          <span className="text-foreground">{Math.round(efficiency * 10)} đơn vị/h</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Uptime:</span>
                          <span className="text-foreground">{Math.round(efficiency * 0.24)}h hôm nay</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {!isActive && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Wrench className="w-3 h-3" />
                        <span>Đang bảo trì định kỳ</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Dự kiến hoạt động lại: 2h nữa
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Production Update Form & AI Agent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Cập nhật sản lượng
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productLine">Dây chuyền</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn dây chuyền" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: currentData.production.productionLines }, (_, i) => (
                      <SelectItem key={i} value={`line-${i + 1}`}>Dây chuyền {i + 1}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="product">Sản phẩm</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn sản phẩm" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentData.production.products.map((product, i) => (
                      <SelectItem key={i} value={product.toLowerCase().replace(/\s+/g, '-')}>{product}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity">Số lượng sản xuất</Label>
                <Input id="quantity" placeholder="Nhập số lượng" type="number" />
              </div>
              <div>
                <Label htmlFor="quality">Tỷ lệ đạt chuẩn (%)</Label>
                <Input id="quality" placeholder="96.5" type="number" />
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Ghi chú</Label>
              <Textarea id="notes" placeholder="Ghi chú về quá trình sản xuất" />
            </div>
            <Button className="w-full">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Cập nhật sản lượng
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              AI Production Agent - {organizationLevel}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Phân tích AI:</p>
                <p className="text-sm">Hiệu suất trung bình đạt {currentData.production.efficiency}%. Chất lượng sản phẩm ổn định ở mức {currentData.production.qualityRate}%. Có {currentData.production.maintenanceAlerts} thiết bị cần bảo trì.</p>
              </div>
              {currentData.production.maintenanceAlerts > 0 && (
                <div className="bg-destructive/5 p-3 rounded-lg border border-destructive/20">
                  <p className="text-sm font-medium text-destructive mb-1">Cảnh báo:</p>
                  <p className="text-sm">{currentData.production.maintenanceAlerts} dây chuyền có dấu hiệu cần bảo trì. Nên kiểm tra trong 24h tới.</p>
                </div>
              )}
              <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-primary mb-1">Khuyến nghị:</p>
                <p className="text-sm">Tối ưu hóa lịch sản xuất để đạt hiệu suất 95%. Ưu tiên sản xuất {currentData.production.products[0]} trong tuần này.</p>
              </div>
              <Input 
                placeholder="Hỏi AI về sản xuất..." 
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
              />
              <Button size="sm" variant="outline" className="w-full">
                <Bot className="w-4 h-4 mr-2" />
                Dự báo & Tối ưu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderInventoryManagement = () => (
    <div className="space-y-6">
      {/* Inventory Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nguyên liệu</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(currentData.inventory.rawMaterials.total)}</div>
            <p className="text-xs text-muted-foreground">Mặt hàng trong kho</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Cà phê: {formatNumber(currentData.inventory.rawMaterials.coffee_beans)}</span>
                <Badge variant={currentData.inventory.rawMaterials.lowStockItems > 5 ? "destructive" : "default"} className="text-xs">
                  {currentData.inventory.rawMaterials.lowStockItems > 5 ? "Thấp" : "Đủ"}
                </Badge>
              </div>
              <div className="flex justify-between text-xs">
                <span>Đường: {formatNumber(currentData.inventory.rawMaterials.sugar)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Bao bì: {formatNumber(currentData.inventory.rawMaterials.packaging)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bán thành phẩm</CardTitle>
            <Cog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(currentData.inventory.wip.total)}</div>
            <p className="text-xs text-muted-foreground">Đang sản xuất</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Rang xay: {formatNumber(currentData.inventory.wip.roasting)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Đóng gói: {formatNumber(currentData.inventory.wip.packaging)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Kiểm định: {formatNumber(currentData.inventory.wip.quality_control)}</span>
              </div>
            </div>
            <Progress value={75} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">75% hoàn thành</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thành phẩm</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(currentData.inventory.finished.total)}</div>
            <p className="text-xs text-muted-foreground">Sẵn sàng xuất kho</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Sẵn sàng: {formatNumber(currentData.inventory.finished.ready_to_ship)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Chờ QC: {formatNumber(currentData.inventory.finished.in_quality_hold)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Lỗi: {formatNumber(currentData.inventory.finished.damaged)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng giá trị kho</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatCurrency(currentData.inventory.totalValue)}</div>
            <p className="text-xs text-muted-foreground">Vòng quay: {currentData.inventory.turnoverRate} lần/năm</p>
            <Badge variant="outline" className="mt-2 text-xs">
              {currentData.inventory.rawMaterials.lowStockItems} cảnh báo tồn kho
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Warehouse Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Warehouse className="h-5 w-5" />
            Quản lý kho - {orgInfo.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentData.inventory.warehouses.map((warehouse, i) => {
              const utilization = Math.random() * 30 + 60;
              const status = utilization > 85 ? 'Gần đầy' : utilization > 60 ? 'Bình thường' : 'Còn trống';
              const statusColor = utilization > 85 ? 'destructive' : utilization > 60 ? 'default' : 'secondary';
              
              return (
                <div key={i} className="p-4 rounded-lg border bg-card">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{warehouse}</h4>
                    <Badge variant={statusColor as any}>
                      {status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sử dụng:</span>
                      <span className="font-medium">{utilization.toFixed(1)}%</span>
                    </div>
                    <Progress value={utilization} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Dung lượng: {Math.round(utilization * 50)} tấn</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Inventory Actions & AI Agent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Kiểm kê & Cập nhật kho
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="warehouseLocation">Vị trí kho</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn kho" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentData.inventory.warehouses.map((warehouse, i) => (
                      <SelectItem key={i} value={warehouse.toLowerCase().replace(/\s+/g, '-')}>{warehouse}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="itemCode">Mã sản phẩm</Label>
                  <Input id="itemCode" placeholder="Quét QR hoặc nhập mã" />
                </div>
                <div>
                  <Label htmlFor="currentStock">Tồn kho hiện tại</Label>
                  <Input id="currentStock" placeholder="Số lượng" type="number" />
                </div>
              </div>
              <div>
                <Label htmlFor="stockNote">Ghi chú kiểm kê</Label>
                <Textarea id="stockNote" placeholder="Ghi chú tình trạng hàng hóa" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <QrCode className="w-4 h-4 mr-2" />
                Quét QR
              </Button>
              <Button className="flex-1">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Cập nhật
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              AI Inventory Agent - {organizationLevel}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Phân tích tồn kho:</p>
                <p className="text-sm">Tổng giá trị kho: {formatCurrency(currentData.inventory.totalValue)}. Vòng quay hàng hóa: {currentData.inventory.turnoverRate} lần/năm. {currentData.inventory.rawMaterials.lowStockItems} mặt hàng dưới mức an toàn.</p>
              </div>
              {currentData.inventory.rawMaterials.lowStockItems > 5 && (
                <div className="bg-destructive/5 p-3 rounded-lg border border-destructive/20">
                  <p className="text-sm font-medium text-destructive mb-1">Cần nhập hàng gấp:</p>
                  <p className="text-sm">• Cà phê Arabica: còn 3 ngày • Đường mía: còn 5 ngày • Hộp nhôm: còn 7 ngày</p>
                </div>
              )}
              <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-primary mb-1">Gợi ý tối ưu:</p>
                <p className="text-sm">Đặt mua 50 tấn cà phê Arabica, 20 tấn đường mía để tận dụng giá ưu đãi tháng 11.</p>
              </div>
              <Input placeholder="Hỏi AI về tồn kho..." />
              <Button size="sm" variant="outline" className="w-full">
                <Bot className="w-4 h-4 mr-2" />
                Tạo đơn mua hàng tự động
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSupplyChainManagement = () => (
    <div className="space-y-6">
      {/* Supply Chain Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nhà cung cấp</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.supply.suppliers.total}</div>
            <p className="text-xs text-muted-foreground">
              Hoạt động: {currentData.supply.suppliers.active} | Chứng nhận: {currentData.supply.suppliers.certified}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm">Đánh giá TB:</span>
              <Badge variant="default" className="ml-2">{currentData.supply.suppliers.avgRating}/5</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đơn mua hàng</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.supply.purchaseOrders.thisMonth}</div>
            <p className="text-xs text-muted-foreground">Đơn hàng tháng này</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Chờ duyệt</span>
                <span>{currentData.supply.purchaseOrders.pending}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Đã duyệt</span>
                <span>{currentData.supply.purchaseOrders.approved}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Hoàn tất</span>
                <span>{currentData.supply.purchaseOrders.completed}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chi phí mua hàng</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatCurrency(currentData.supply.procurement.totalValue)}</div>
            <p className="text-xs text-muted-foreground">Tháng này</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-3 h-3 text-primary mr-1" />
              <span className="text-xs text-primary">Tiết kiệm {currentData.supply.procurement.costSavings}% so với dự kiến</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lead Time TB</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.supply.procurement.leadTime} ngày</div>
            <p className="text-xs text-muted-foreground">Từ đặt hàng đến nhận</p>
            <Badge variant="outline" className="mt-2 text-xs">
              Tối ưu hóa chuỗi cung ứng
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Supplier Management Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Danh sách nhà cung cấp - {orgInfo.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nhà cung cấp</TableHead>
                <TableHead>Sản phẩm chính</TableHead>
                <TableHead>Đánh giá</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Lead Time</TableHead>
                <TableHead>Giá trị đơn hàng</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: "Công ty Cà phê Buôn Ma Thuột", product: "Cà phê Robusta", rating: 4.8, status: "active", leadTime: "7-10 ngày", value: "2.5B VNĐ" },
                { name: "Nhà máy đường Biên Hòa", product: "Đường tinh luyện", rating: 4.5, status: "active", leadTime: "5-7 ngày", value: "1.8B VNĐ" },
                { name: "Công ty bao bì Tân Hiệp Phát", product: "Hộp nhôm, bao bì", rating: 4.3, status: "active", leadTime: "10-14 ngày", value: "3.2B VNĐ" },
                { name: "Cung cấp hương liệu Firmenich", product: "Hương liệu tự nhiên", rating: 4.9, status: "certified", leadTime: "21-28 ngày", value: "850M VNĐ" },
                { name: "Vận tải logistics Gemadept", product: "Dịch vụ vận chuyển", rating: 4.2, status: "active", leadTime: "1-3 ngày", value: "450M VNĐ" }
              ].slice(0, organizationLevel === "BMC" ? 5 : organizationLevel === "F1" ? 4 : 3).map((supplier, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.product}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-accent fill-current" />
                      <span className="text-sm">{supplier.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={supplier.status === "certified" ? "default" : "secondary"}>
                      {supplier.status === "certified" ? "Chứng nhận" : "Hoạt động"}
                    </Badge>
                  </TableCell>
                  <TableCell>{supplier.leadTime}</TableCell>
                  <TableCell>{supplier.value}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Procurement & AI Agent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Đặt mua hàng mới
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="supplier">Nhà cung cấp</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn nhà cung cấp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coffee-supplier">Công ty Cà phê Buôn Ma Thuột</SelectItem>
                    <SelectItem value="sugar-supplier">Nhà máy đường Biên Hòa</SelectItem>
                    <SelectItem value="packaging-supplier">Công ty bao bì Tân Hiệp Phát</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="product">Sản phẩm</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn sản phẩm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="robusta">Cà phê Robusta</SelectItem>
                    <SelectItem value="arabica">Cà phê Arabica</SelectItem>
                    <SelectItem value="sugar">Đường tinh luyện</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity">Số lượng (tấn)</Label>
                <Input id="quantity" placeholder="50" type="number" />
              </div>
              <div>
                <Label htmlFor="urgency">Độ ưu tiên</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn độ ưu tiên" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Khẩn cấp</SelectItem>
                    <SelectItem value="normal">Bình thường</SelectItem>
                    <SelectItem value="low">Thấp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Yêu cầu đặc biệt</Label>
              <Textarea id="notes" placeholder="Ghi chú yêu cầu chất lượng, thời gian giao hàng..." />
            </div>
            <Button className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Tạo đơn mua hàng
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              AI Supply Chain Agent - {organizationLevel}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Phân tích chuỗi cung ứng:</p>
                <p className="text-sm">{currentData.supply.suppliers.total} nhà cung cấp, {currentData.supply.suppliers.active} đang hoạt động. Lead time trung bình {currentData.supply.procurement.leadTime} ngày. Tiết kiệm chi phí {currentData.supply.procurement.costSavings}% so với dự kiến.</p>
              </div>
              <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-primary mb-1">Gợi ý tối ưu chuỗi cung ứng:</p>
                <p className="text-sm">Diversify suppliers để giảm rủi ro. Tăng tỷ lệ nhà cung cấp có chứng nhận chất lượng lên 85%. Đàm phán hợp đồng dài hạn để giảm 8-12% chi phí.</p>
              </div>
              <div className="bg-destructive/5 p-3 rounded-lg border border-destructive/20">
                <p className="text-sm font-medium text-destructive mb-1">Cảnh báo rủi ro:</p>
                <p className="text-sm text-muted-foreground">Phụ thuộc quá nhiều vào 1 nhà cung cấp cà phê. Nên tìm thêm 2-3 nguồn cung backup.</p>
              </div>
              <Input placeholder="Hỏi AI về chuỗi cung ứng..." />
              <Button size="sm" variant="outline" className="w-full">
                <Bot className="w-4 h-4 mr-2" />
                Phân tích & Tối ưu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderLogisticsManagement = () => (
    <div className="space-y-6">
      {/* Logistics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang vận chuyển</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.logistics.shipments.inTransit}</div>
            <p className="text-xs text-muted-foreground">Đơn hàng trên đường</p>
            <div className="mt-2 space-y-1">
              {currentData.logistics.routes.slice(0, 2).map((route, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span>{route}</span>
                  <span>{Math.round(currentData.logistics.shipments.inTransit * (0.4 + i * 0.3))}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã giao hàng</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{currentData.logistics.shipments.delivered}</div>
            <p className="text-xs text-muted-foreground">Hoàn tất tháng này</p>
            <Progress value={currentData.logistics.shipments.onTimeRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{currentData.logistics.shipments.onTimeRate}% đúng hạn</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chậm trễ</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{currentData.logistics.shipments.delayed}</div>
            <p className="text-xs text-muted-foreground">Đơn hàng chậm</p>
            <Badge variant="destructive" className="mt-2 text-xs">
              Cần xử lý
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chi phí vận chuyển</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatCurrency(currentData.logistics.transportCost)}</div>
            <p className="text-xs text-muted-foreground">TB: {Math.round(currentData.logistics.transportCost / currentData.logistics.shipments.delivered).toLocaleString()} VNĐ/đơn</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-3 h-3 text-primary mr-1" />
              <span className="text-xs text-primary">Tiết kiệm 15% chi phí</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicle Fleet Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Quản lý đội xe - {orgInfo.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border bg-primary/5 border-primary/20">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Xe hoạt động</h4>
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">{currentData.logistics.vehicles.active}</div>
              <p className="text-xs text-muted-foreground">/{currentData.logistics.vehicles.total} tổng số xe</p>
            </div>

            <div className="p-4 rounded-lg border bg-destructive/5 border-destructive/20">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Đang bảo trì</h4>
                <Wrench className="h-4 w-4 text-destructive" />
              </div>
              <div className="text-2xl font-bold text-destructive">{currentData.logistics.vehicles.maintenance}</div>
              <p className="text-xs text-muted-foreground">Xe cần sửa chữa</p>
            </div>

            <div className="p-4 rounded-lg border bg-blue-50 border-blue-200">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Hiệu suất TB</h4>
                <Gauge className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600">87.5%</div>
              <p className="text-xs text-muted-foreground">Sử dụng xe hiệu quả</p>
            </div>

            <div className="p-4 rounded-lg border bg-purple-50 border-purple-200">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Thời gian giao TB</h4>
                <Clock className="h-4 w-4 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600">{currentData.logistics.avgDeliveryTime}h</div>
              <p className="text-xs text-muted-foreground">Từ xuất kho đến khách</p>
            </div>
          </div>

          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Biển số xe</TableHead>
                  <TableHead>Loại xe</TableHead>
                  <TableHead>Tài xế</TableHead>
                  <TableHead>Tuyến đường</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>GPS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { plate: "29A-12345", type: "Xe tải 5 tấn", driver: "Nguyễn Văn A", route: "HN → HCM", status: "Đang giao", location: "Km 450 QL1A" },
                  { plate: "30G-67890", type: "Xe tải 10 tấn", driver: "Trần Thị B", route: "HN → Đà Nẵng", status: "Hoàn tất", location: "Kho Đà Nẵng" },
                  { plate: "51B-11111", type: "Xe van", driver: "Lê Văn C", route: "Nội thành HN", status: "Bảo trì", location: "Garage" },
                  { plate: "77A-22222", type: "Xe tải 3 tấn", driver: "Phạm Văn D", route: "HCM → Cần Thơ", status: "Đang giao", location: "Km 120 QL91" }
                ].slice(0, organizationLevel === "F5" ? 2 : organizationLevel === "F4" ? 3 : 4).map((vehicle, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{vehicle.plate}</TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>{vehicle.driver}</TableCell>
                    <TableCell>{vehicle.route}</TableCell>
                    <TableCell>
                      <Badge variant={
                        vehicle.status === "Đang giao" ? "default" : 
                        vehicle.status === "Hoàn tất" ? "secondary" : "destructive"
                      }>
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost">
                        <MapPin className="w-3 h-3 mr-1" />
                        {vehicle.location}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Route Optimization & AI Agent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Theo dõi & Điều phối đơn hàng
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { id: "DH001245", route: "Hà Nội → TP.HCM", status: "Đang giao", eta: "2h", progress: 75 },
                { id: "DH001246", route: "Hà Nội → Đà Nẵng", status: "Hoàn tất", eta: "Đã giao", progress: 100 },
                { id: "DH001247", route: "TP.HCM → Cần Thơ", status: "Chậm 2h", eta: "4h", progress: 45 }
              ].slice(0, organizationLevel === "F5" ? 2 : 3).map((shipment, i) => (
                <div key={i} className={`p-3 rounded-lg border ${
                  shipment.status === "Chậm 2h" ? 'bg-destructive/5 border-destructive/20' : 'bg-muted'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">#{shipment.id}</div>
                      <div className="text-sm text-muted-foreground">{shipment.route}</div>
                    </div>
                    <Badge variant={
                      shipment.status === "Hoàn tất" ? "secondary" :
                      shipment.status.includes("Chậm") ? "destructive" : "default"
                    }>
                      {shipment.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Tiến độ</span>
                      <span>ETA: {shipment.eta}</span>
                    </div>
                    <Progress value={shipment.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full">
              <MapPin className="w-4 h-4 mr-2" />
              Xem tất cả đơn hàng
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              AI Logistics Agent - {organizationLevel}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Phân tích logistics:</p>
                <p className="text-sm">Tỷ lệ giao đúng hạn: {currentData.logistics.shipments.onTimeRate}%. Chi phí vận chuyển trung bình: {Math.round(currentData.logistics.transportCost / currentData.logistics.shipments.delivered).toLocaleString()} VNĐ/đơn. {currentData.logistics.shipments.delayed} đơn hàng chậm trễ cần xử lý.</p>
              </div>
              <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-primary mb-1">Tối ưu tuyến đường:</p>
                <p className="text-sm">Ghép 3 đơn HN→HCM thành 1 chuyến tiết kiệm 35% chi phí. Sử dụng tuyến cao tốc mới giảm {Math.round(currentData.logistics.avgDeliveryTime * 0.3)}h di chuyển. AI gợi ý 5 tuyến tối ưu mới.</p>
              </div>
              {currentData.logistics.shipments.delayed > 5 && (
                <div className="bg-destructive/5 p-3 rounded-lg border border-destructive/20">
                  <p className="text-sm font-medium text-destructive mb-1">Cảnh báo chậm trễ:</p>
                  <p className="text-sm">{currentData.logistics.shipments.delayed} đơn hàng bị chậm. Cần liên hệ khách hàng và điều chỉnh lộ trình gấp.</p>
                </div>
              )}
              <Input placeholder="Hỏi AI về logistics..." />
              <Button size="sm" variant="outline" className="w-full">
                <Bot className="w-4 h-4 mr-2" />
                Tối ưu tuyến & Dự báo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProductionReports = () => (
    <div className="space-y-6">
      {/* Reports Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5" />
              Báo cáo sản xuất
            </CardTitle>
            <CardDescription>Hiệu suất & sản lượng {timeFilter}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Sản lượng hôm nay</span>
                <span className="font-medium">{formatNumber(currentData.production.dailyOutput)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Hiệu suất trung bình</span>
                <span className="font-medium">{currentData.production.efficiency}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Chất lượng sản phẩm</span>
                <span className="font-medium">{currentData.production.qualityRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Dây chuyền hoạt động</span>
                <span className="font-medium">{currentData.production.activeLines}/{currentData.production.productionLines}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Tổng doanh thu dự kiến</span>
                <span className="font-bold text-primary">{formatCurrency(orgInfo.totalRevenue)}</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo sản xuất
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Báo cáo kho vận
            </CardTitle>
            <CardDescription>Tồn kho & vòng quay {timeFilter}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Tổng giá trị kho</span>
                <span className="font-medium">{formatCurrency(currentData.inventory.totalValue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Nguyên liệu</span>
                <span className="font-medium">{formatNumber(currentData.inventory.rawMaterials.total)} tấn</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Thành phẩm sẵn sàng</span>
                <span className="font-medium">{formatNumber(currentData.inventory.finished.ready_to_ship)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Số kho quản lý</span>
                <span className="font-medium">{currentData.inventory.warehouses.length} kho</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Vòng quay kho</span>
                <span className="font-bold text-primary">{currentData.inventory.turnoverRate} lần/năm</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo kho vận
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Báo cáo logistics
            </CardTitle>
            <CardDescription>Vận chuyển & giao hàng {timeFilter}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Đơn hàng đã giao</span>
                <span className="font-medium">{formatNumber(currentData.logistics.shipments.delivered)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Tỷ lệ đúng hạn</span>
                <span className="font-medium">{currentData.logistics.shipments.onTimeRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Đơn hàng chậm trễ</span>
                <span className="font-medium text-destructive">{currentData.logistics.shipments.delayed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Đội xe hoạt động</span>
                <span className="font-medium">{currentData.logistics.vehicles.active}/{currentData.logistics.vehicles.total}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Chi phí vận chuyển</span>
                <span className="font-bold text-primary">{formatCurrency(currentData.logistics.transportCost)}</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo logistics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Comprehensive Performance Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Dashboard tổng quan - {orgInfo.name}
          </CardTitle>
          <CardDescription>Phân tích tổng hợp toàn bộ hoạt động sản xuất & chuỗi cung ứng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Production KPIs */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground">SẢN XUẤT</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Sản lượng tháng</span>
                  <span className="font-medium">{formatNumber(currentData.production.dailyOutput * 30)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Mục tiêu năm</span>
                  <span className="font-medium">{formatNumber(orgInfo.totalProduction)} tấn</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Hiệu suất TB</span>
                  <span className="font-medium">{currentData.production.efficiency}%</span>
                </div>
                <Progress value={currentData.production.efficiency} className="h-2" />
              </div>
            </div>

            {/* Supply Chain KPIs */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground">CHUỖI CUNG ỨNG</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Nhà cung cấp</span>
                  <span className="font-medium">{currentData.supply.suppliers.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Chi phí mua hàng</span>
                  <span className="font-medium">{formatCurrency(currentData.supply.procurement.totalValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Lead time TB</span>
                  <span className="font-medium">{currentData.supply.procurement.leadTime} ngày</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3 h-3 text-primary mr-1" />
                  <span className="text-xs text-primary">Tiết kiệm {currentData.supply.procurement.costSavings}%</span>
                </div>
              </div>
            </div>

            {/* Logistics KPIs */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground">VẬN CHUYỂN</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Đơn giao thành công</span>
                  <span className="font-medium">{formatNumber(currentData.logistics.shipments.delivered)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Tỷ lệ đúng hạn</span>
                  <span className="font-medium">{currentData.logistics.shipments.onTimeRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Chi phí vận chuyển</span>
                  <span className="font-medium">{formatCurrency(currentData.logistics.transportCost)}</span>
                </div>
                <Progress value={currentData.logistics.shipments.onTimeRate} className="h-2" />
              </div>
            </div>

            {/* Financial Overview */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground">TÀI CHÍNH</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Doanh thu dự kiến</span>
                  <span className="font-medium">{formatCurrency(orgInfo.totalRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Giá trị tồn kho</span>
                  <span className="font-medium">{formatCurrency(currentData.inventory.totalValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">ROI dự kiến</span>
                  <span className="font-medium">18.5%</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-600">+12.3% so với cùng kỳ</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI-Powered Comprehensive Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Production & Supply Chain Analytics - {organizationLevel}
          </CardTitle>
          <CardDescription>Phân tích tổng hợp và dự báo thông minh toàn chuỗi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* AI Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="font-medium text-primary">Điểm mạnh</span>
                </div>
                <ul className="text-sm text-primary space-y-1">
                  <li>• Chất lượng sản phẩm {currentData.production.qualityRate}% vượt mục tiêu</li>
                  <li>• Tỷ lệ giao hàng đúng hạn {currentData.logistics.shipments.onTimeRate}%</li>
                  <li>• Tiết kiệm chi phí chuỗi cung ứng {currentData.supply.procurement.costSavings}%</li>
                </ul>
              </div>

              <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <span className="font-medium text-destructive">Cần cải thiện</span>
                </div>
                <ul className="text-sm text-destructive space-y-1">
                  <li>• Hiệu suất sản xuất {currentData.production.efficiency}% dưới mục tiêu 95%</li>
                  <li>• {currentData.production.maintenanceAlerts} thiết bị cần bảo trì</li>
                  <li>• {currentData.inventory.rawMaterials.lowStockItems} nguyên liệu dưới mức an toàn</li>
                </ul>
              </div>

              <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <span className="font-medium text-accent">Cơ hội tăng trưởng</span>
                </div>
                <ul className="text-sm text-accent space-y-1">
                  <li>• Mở rộng thị trường {currentData.production.products[0]}</li>
                  <li>• Tối ưu tuyến logistics tiết kiệm 15%</li>
                  <li>• Tăng cường automation dây chuyền</li>
                </ul>
              </div>
            </div>

            {/* AI Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4">
                <div className="text-center">
                  <Factory className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-medium">Dự báo sản lượng</div>
                  <div className="text-xs text-muted-foreground">Prediction AI</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4">
                <div className="text-center">
                  <Package className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-medium">Tối ưu tồn kho</div>
                  <div className="text-xs text-muted-foreground">Inventory AI</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-medium">Phân tích logistics</div>
                  <div className="text-xs text-muted-foreground">Route AI</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4">
                <div className="text-center">
                  <Building2 className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-medium">Đánh giá NCC</div>
                  <div className="text-xs text-muted-foreground">Supplier AI</div>
                </div>
              </Button>
            </div>

            {/* AI Report Generator */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg border border-primary/20">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" />
                Tạo báo cáo thông minh với AI
              </h4>
              <div className="flex gap-2">
                <Input 
                  placeholder='VD: "Báo cáo hiệu suất sản xuất tháng 11/2024" hoặc "Phân tích tối ưu chuỗi cung ứng Q4"' 
                  className="flex-1 bg-background"
                />
                <Button>
                  <Bot className="w-4 h-4 mr-2" />
                  Tạo báo cáo AI
                </Button>
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline">📊 Dashboard tương tác</Button>
                <Button size="sm" variant="outline">📈 Biểu đồ xu hướng</Button>
                <Button size="sm" variant="outline">🎯 KPI tracking</Button>
                <Button size="sm" variant="outline">⚡ Real-time alerts</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                ⚙️ Sản xuất - Kho vận
              </h1>
              <p className="text-muted-foreground">Quản lý sản xuất & chuỗi cung ứng BMC → F1 → F2 → F3 → F4 → F5</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={organizationLevel} onValueChange={(value) => setOrganizationLevel(value as typeof organizationLevel)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BMC">🏢 BMC Group</SelectItem>
                <SelectItem value="F1">🏭 F1 - Vietnam Corp</SelectItem>
                <SelectItem value="F2">☕ F2 - Trung Nguyên</SelectItem>
                <SelectItem value="F3">🏢 F3 - Nhà máy HN</SelectItem>
                <SelectItem value="F4">🏪 F4 - CN Cầu Giấy</SelectItem>
                <SelectItem value="F5">⚙️ F5 - Phân xưởng A1</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeFilter} onValueChange={(value) => setTimeFilter(value as typeof timeFilter)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hôm nay</SelectItem>
                <SelectItem value="week">Tuần này</SelectItem>
                <SelectItem value="month">Tháng này</SelectItem>
                <SelectItem value="quarter">Quý này</SelectItem>
                <SelectItem value="year">Năm này</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Nhập liệu
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button>
          </div>
        </div>

        {/* Organization Info Card */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{orgInfo.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatNumber(orgInfo.employeeCount)} nhân viên • {orgInfo.facilitiesCount} cơ sở • 
                    Sản xuất {formatNumber(orgInfo.totalProduction)} tấn/năm
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{formatCurrency(orgInfo.totalRevenue)}</div>
                <p className="text-sm text-muted-foreground">Doanh thu dự kiến</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sản lượng</CardTitle>
              <Factory className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(currentData.production.dailyOutput)}</div>
              <p className="text-xs text-muted-foreground">
                <Target className="w-3 h-3 inline mr-1" />
                {Math.round((currentData.production.dailyOutput / currentData.production.targetOutput) * 100)}% mục tiêu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hiệu suất</CardTitle>
              <Gauge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.production.efficiency}%</div>
              <p className="text-xs text-muted-foreground">
                Downtime: {currentData.production.downtime}h
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tồn kho</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{formatCurrency(currentData.inventory.totalValue)}</div>
              <p className="text-xs text-muted-foreground">
                {currentData.inventory.warehouses.length} kho
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nhà cung cấp</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.supply.suppliers.active}</div>
              <p className="text-xs text-muted-foreground">
                /{currentData.supply.suppliers.total} tổng số
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Logistics</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{currentData.logistics.shipments.onTimeRate}%</div>
              <p className="text-xs text-muted-foreground">
                Giao đúng hạn
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Insights</CardTitle>
              <Bot className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold text-primary">
                {currentData.production.maintenanceAlerts + currentData.inventory.rawMaterials.lowStockItems} cảnh báo
              </div>
              <p className="text-xs text-muted-foreground">
                Cần xử lý
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as typeof activeView)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="production" className="flex items-center gap-2">
              <Factory className="w-4 h-4" />
              Sản xuất
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Kho vận
            </TabsTrigger>
            <TabsTrigger value="supply" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Cung ứng
            </TabsTrigger>
            <TabsTrigger value="logistics" className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Logistics
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Báo cáo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="production">
            {renderProductionManagement()}
          </TabsContent>

          <TabsContent value="inventory">
            {renderInventoryManagement()}
          </TabsContent>

          <TabsContent value="supply">
            {renderSupplyChainManagement()}
          </TabsContent>

          <TabsContent value="logistics">
            {renderLogisticsManagement()}
          </TabsContent>

          <TabsContent value="reports">
            {renderProductionReports()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}