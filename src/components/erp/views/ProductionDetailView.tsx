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
  Factory, 
  Cog, 
  Users, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Settings,
  Wrench,
  Zap,
  Shield,
  FileText,
  Calendar,
  DollarSign,
  Activity
} from "lucide-react";

interface ProductionDetailViewProps {
  onBack: () => void;
}

export function ProductionDetailView({ onBack }: ProductionDetailViewProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data cho phòng Sản xuất
  const productionData = {
    overview: {
      dailyOutput: "2,450 sản phẩm",
      efficiency: "94.2%",
      qualityRate: "98.7%",
      downtime: "2.3%",
      activeLines: 8,
      totalLines: 10,
      workingShifts: 3,
      currentShift: "Ca 2 (14:00-22:00)"
    },
    production: {
      todayTarget: 2500,
      todayActual: 2450,
      weeklyTarget: 17500,
      weeklyActual: 16800,
      monthlyTarget: 75000,
      monthlyActual: 72300,
      lines: [
        { id: "Line-01", product: "Sản phẩm A", status: "Hoạt động", efficiency: "96%", output: 320 },
        { id: "Line-02", product: "Sản phẩm B", status: "Hoạt động", efficiency: "94%", output: 280 },
        { id: "Line-03", product: "Sản phẩm C", status: "Bảo trì", efficiency: "0%", output: 0 },
        { id: "Line-04", product: "Sản phẩm A", status: "Hoạt động", efficiency: "98%", output: 340 },
        { id: "Line-05", product: "Sản phẩm D", status: "Hoạt động", efficiency: "92%", output: 260 }
      ]
    },
    quality: {
      totalInspected: 2450,
      passed: 2418,
      failed: 32,
      passRate: "98.7%",
      defectTypes: [
        { type: "Lỗi kích thước", count: 15, percentage: "46.9%" },
        { type: "Lỗi bề mặt", count: 8, percentage: "25.0%" },
        { type: "Lỗi màu sắc", count: 6, percentage: "18.8%" },
        { type: "Lỗi khác", count: 3, percentage: "9.4%" }
      ],
      inspectors: [
        { name: "Nguyễn Văn A", shift: "Ca 1", inspected: 820, passed: 812 },
        { name: "Trần Thị B", shift: "Ca 2", inspected: 850, passed: 842 },
        { name: "Lê Văn C", shift: "Ca 3", inspected: 780, passed: 764 }
      ]
    },
    equipment: {
      totalMachines: 45,
      operational: 42,
      maintenance: 2,
      breakdown: 1,
      utilizationRate: "87.3%",
      machines: [
        { id: "M001", name: "Máy ép nhựa #1", status: "Hoạt động", efficiency: "96%", nextMaintenance: "15/02/2024" },
        { id: "M002", name: "Máy cắt laser #2", status: "Hoạt động", efficiency: "94%", nextMaintenance: "18/02/2024" },
        { id: "M003", name: "Máy hàn tự động #3", status: "Bảo trì", efficiency: "0%", nextMaintenance: "Đang bảo trì" },
        { id: "M004", name: "Máy đóng gói #4", status: "Hỏng hóc", efficiency: "0%", nextMaintenance: "Cần sửa chữa" },
        { id: "M005", name: "Máy kiểm tra chất lượng #5", status: "Hoạt động", efficiency: "98%", nextMaintenance: "22/02/2024" }
      ]
    },
    workforce: {
      totalWorkers: 156,
      presentToday: 148,
      absentToday: 8,
      attendanceRate: "94.9%",
      shifts: [
        { name: "Ca 1 (06:00-14:00)", workers: 52, present: 50, supervisor: "Nguyễn Văn Minh" },
        { name: "Ca 2 (14:00-22:00)", workers: 54, present: 52, supervisor: "Trần Thị Lan" },
        { name: "Ca 3 (22:00-06:00)", workers: 50, present: 46, supervisor: "Lê Văn Hùng" }
      ],
      skills: [
        { skill: "Vận hành máy", workers: 89, certified: 85 },
        { skill: "Kiểm tra chất lượng", workers: 34, certified: 32 },
        { skill: "Bảo trì cơ bản", workers: 45, certified: 41 },
        { skill: "An toàn lao động", workers: 156, certified: 156 }
      ]
    },
    reports: {
      dailyProduction: [
        { date: "10/02", target: 2500, actual: 2380, efficiency: "95.2%" },
        { date: "11/02", target: 2500, actual: 2420, efficiency: "96.8%" },
        { date: "12/02", target: 2500, actual: 2450, efficiency: "98.0%" },
        { date: "13/02", target: 2500, actual: 2380, efficiency: "95.2%" },
        { date: "14/02", target: 2500, actual: 2450, efficiency: "98.0%" }
      ],
      costs: {
        materials: "65%",
        labor: "20%",
        energy: "10%",
        maintenance: "5%"
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
                <p className="text-sm text-muted-foreground">Sản lượng hôm nay</p>
                <p className="text-2xl font-bold text-primary">{productionData.overview.dailyOutput}</p>
              </div>
              <Factory className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hiệu suất</p>
                <p className="text-2xl font-bold text-green-600">{productionData.overview.efficiency}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tỷ lệ chất lượng</p>
                <p className="text-2xl font-bold text-blue-600">{productionData.overview.qualityRate}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Thời gian chết</p>
                <p className="text-2xl font-bold text-red-600">{productionData.overview.downtime}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Production Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5" />
              Trạng thái sản xuất
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{productionData.overview.activeLines}</div>
                <p className="text-sm text-muted-foreground">Dây chuyền hoạt động</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{productionData.overview.workingShifts}</div>
                <p className="text-sm text-muted-foreground">Ca làm việc</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Ca hiện tại</span>
                <span className="font-medium">{productionData.overview.currentShift}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tổng dây chuyền</span>
                <span className="font-medium">{productionData.overview.totalLines}</span>
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
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Máy M004 hỏng hóc</p>
                <p className="text-xs text-muted-foreground">Cần sửa chữa ngay lập tức</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Bảo trì định kỳ</p>
                <p className="text-xs text-muted-foreground">3 máy cần bảo trì trong tuần</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Đạt mục tiêu sản xuất</p>
                <p className="text-xs text-muted-foreground">98% kế hoạch hôm nay</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProductionLines = () => (
    <div className="space-y-6">
      {/* Production Targets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Hôm nay</p>
              <p className="text-2xl font-bold text-primary">{productionData.production.todayActual}/{productionData.production.todayTarget}</p>
              <p className="text-sm text-green-600">98% mục tiêu</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Tuần này</p>
              <p className="text-2xl font-bold text-primary">{productionData.production.weeklyActual.toLocaleString()}/{productionData.production.weeklyTarget.toLocaleString()}</p>
              <p className="text-sm text-yellow-600">96% mục tiêu</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Tháng này</p>
              <p className="text-2xl font-bold text-primary">{productionData.production.monthlyActual.toLocaleString()}/{productionData.production.monthlyTarget.toLocaleString()}</p>
              <p className="text-sm text-orange-600">96.4% mục tiêu</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Production Lines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cog className="h-5 w-5" />
            Dây chuyền sản xuất
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {productionData.production.lines.map((line, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Cog className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{line.id}</p>
                    <p className="text-sm text-muted-foreground">{line.product}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{line.output} sản phẩm</p>
                    <p className="text-sm text-muted-foreground">Hiệu suất: {line.efficiency}</p>
                  </div>
                  <Badge variant={line.status === "Hoạt động" ? "default" : line.status === "Bảo trì" ? "secondary" : "destructive"}>
                    {line.status}
                  </Badge>
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
            <Settings className="h-5 w-5" />
            Thao tác nhanh
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lineSelect">Chọn dây chuyền</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn dây chuyền" />
                </SelectTrigger>
                <SelectContent>
                  {productionData.production.lines.map((line, i) => (
                    <SelectItem key={i} value={line.id.toLowerCase()}>{line.id} - {line.product}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="action">Hành động</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn hành động" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">Khởi động</SelectItem>
                  <SelectItem value="stop">Dừng</SelectItem>
                  <SelectItem value="maintenance">Bảo trì</SelectItem>
                  <SelectItem value="reset">Reset</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1">
              <Zap className="w-4 h-4 mr-2" />
              Thực hiện
            </Button>
            <Button variant="outline" className="flex-1">
              <Activity className="w-4 h-4 mr-2" />
              Giám sát
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderQualityControl = () => (
    <div className="space-y-6">
      {/* Quality Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{productionData.quality.totalInspected}</div>
            <p className="text-sm text-muted-foreground">Tổng kiểm tra</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{productionData.quality.passed}</div>
            <p className="text-sm text-muted-foreground">Đạt chất lượng</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{productionData.quality.failed}</div>
            <p className="text-sm text-muted-foreground">Không đạt</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{productionData.quality.passRate}</div>
            <p className="text-sm text-muted-foreground">Tỷ lệ đạt</p>
          </CardContent>
        </Card>
      </div>

      {/* Defect Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Phân tích lỗi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {productionData.quality.defectTypes.map((defect, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium">{defect.type}</p>
                    <p className="text-sm text-muted-foreground">{defect.count} lỗi</p>
                  </div>
                </div>
                <Badge variant="secondary">{defect.percentage}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quality Inspectors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Nhân viên kiểm tra
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {productionData.quality.inspectors.map((inspector, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{inspector.name}</p>
                    <p className="text-sm text-muted-foreground">{inspector.shift}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{inspector.passed}/{inspector.inspected}</p>
                  <p className="text-sm text-muted-foreground">{((inspector.passed/inspector.inspected)*100).toFixed(1)}% đạt</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEquipmentManagement = () => (
    <div className="space-y-6">
      {/* Equipment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{productionData.equipment.totalMachines}</div>
            <p className="text-sm text-muted-foreground">Tổng thiết bị</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{productionData.equipment.operational}</div>
            <p className="text-sm text-muted-foreground">Hoạt động</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{productionData.equipment.maintenance}</div>
            <p className="text-sm text-muted-foreground">Bảo trì</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{productionData.equipment.breakdown}</div>
            <p className="text-sm text-muted-foreground">Hỏng hóc</p>
          </CardContent>
        </Card>
      </div>

      {/* Machine List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Danh sách thiết bị
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {productionData.equipment.machines.map((machine, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Wrench className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{machine.name}</p>
                    <p className="text-sm text-muted-foreground">{machine.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">Hiệu suất: {machine.efficiency}</p>
                    <p className="text-sm text-muted-foreground">{machine.nextMaintenance}</p>
                  </div>
                  <Badge variant={machine.status === "Hoạt động" ? "default" : machine.status === "Bảo trì" ? "secondary" : "destructive"}>
                    {machine.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Utilization Rate */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Tỷ lệ sử dụng thiết bị
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">{productionData.equipment.utilizationRate}</div>
            <p className="text-muted-foreground">Tỷ lệ sử dụng trung bình</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderWorkforceManagement = () => (
    <div className="space-y-6">
      {/* Workforce Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{productionData.workforce.totalWorkers}</div>
            <p className="text-sm text-muted-foreground">Tổng nhân viên</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{productionData.workforce.presentToday}</div>
            <p className="text-sm text-muted-foreground">Có mặt hôm nay</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{productionData.workforce.absentToday}</div>
            <p className="text-sm text-muted-foreground">Vắng mặt</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{productionData.workforce.attendanceRate}</div>
            <p className="text-sm text-muted-foreground">Tỷ lệ có mặt</p>
          </CardContent>
        </Card>
      </div>

      {/* Shift Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Thông tin ca làm việc
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {productionData.workforce.shifts.map((shift, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{shift.name}</p>
                    <p className="text-sm text-muted-foreground">Giám sát: {shift.supervisor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{shift.present}/{shift.workers} người</p>
                  <p className="text-sm text-muted-foreground">{((shift.present/shift.workers)*100).toFixed(1)}% có mặt</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Ma trận kỹ năng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {productionData.workforce.skills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{skill.skill}</p>
                    <p className="text-sm text-muted-foreground">{skill.workers} nhân viên</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{skill.certified} được chứng nhận</p>
                  <p className="text-sm text-muted-foreground">{((skill.certified/skill.workers)*100).toFixed(1)}% tỷ lệ</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      {/* Daily Production Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Báo cáo sản xuất hàng ngày
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {productionData.reports.dailyProduction.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{day.date}</p>
                    <p className="text-sm text-muted-foreground">Mục tiêu: {day.target}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{day.actual} sản phẩm</p>
                  <p className="text-sm text-muted-foreground">{day.efficiency}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Phân tích chi phí sản xuất
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Nguyên vật liệu</span>
              <span className="font-medium">{productionData.reports.costs.materials}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Nhân công</span>
              <span className="font-medium">{productionData.reports.costs.labor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Năng lượng</span>
              <span className="font-medium">{productionData.reports.costs.energy}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Bảo trì</span>
              <span className="font-medium">{productionData.reports.costs.maintenance}</span>
            </div>
          </div>
        </CardContent>
      </Card>

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
                  <SelectItem value="production">Báo cáo sản xuất</SelectItem>
                  <SelectItem value="quality">Báo cáo chất lượng</SelectItem>
                  <SelectItem value="equipment">Báo cáo thiết bị</SelectItem>
                  <SelectItem value="workforce">Báo cáo nhân lực</SelectItem>
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
                  <SelectItem value="daily">Hàng ngày</SelectItem>
                  <SelectItem value="weekly">Hàng tuần</SelectItem>
                  <SelectItem value="monthly">Hàng tháng</SelectItem>
                  <SelectItem value="quarterly">Hàng quý</SelectItem>
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
              <Factory className="h-6 w-6 text-blue-600" />
              Sản xuất
            </h1>
            <p className="text-muted-foreground">Quản lý quy trình sản xuất, chất lượng và thiết bị</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
          🤖 AI Production Agent
        </Badge>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Tổng quan
          </TabsTrigger>
          <TabsTrigger value="production" className="flex items-center gap-2">
            <Factory className="w-4 h-4" />
            Dây chuyền
          </TabsTrigger>
          <TabsTrigger value="quality" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Chất lượng
          </TabsTrigger>
          <TabsTrigger value="equipment" className="flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Thiết bị
          </TabsTrigger>
          <TabsTrigger value="workforce" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Nhân lực
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="production">
          {renderProductionLines()}
        </TabsContent>

        <TabsContent value="quality">
          {renderQualityControl()}
        </TabsContent>

        <TabsContent value="equipment">
          {renderEquipmentManagement()}
        </TabsContent>

        <TabsContent value="workforce">
          {renderWorkforceManagement()}
        </TabsContent>
      </Tabs>
    </div>
  );
}