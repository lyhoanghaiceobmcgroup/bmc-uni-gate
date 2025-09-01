import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { F2HoldingView } from "./F2HoldingView";
import { F3CompanyView } from "./F3CompanyView";
import { AutoTieringSystem } from "../AutoTieringSystem";
import { DataEntryForms } from "../DataEntryForms";
import { 
  Building2, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Package, 
  AlertTriangle, 
  FileText,
  Settings,
  Plus,
  Download,
  Search,
  Filter,
  BarChart3,
  PieChart,
  ArrowRight,
  Briefcase,
  MapPin,
  Calendar,
  Percent,
  Zap,
  Database
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CompanyManagementViewProps {
  organizations: any[];
}

export function CompanyManagementView({ organizations }: CompanyManagementViewProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [viewMode, setViewMode] = useState("overview");
  const navigate = useNavigate();

  const getButtonVariant = (mode: string) => {
    return viewMode === mode ? "default" : "outline";
  };

  // Mockup F2-F3 Companies với dữ liệu chi tiết theo yêu cầu
  const mockF2Companies = [
    {
      id: "f2-01", level: "F2", name: "BMC F&B Holding", type: "Công ty ngành",
      bmcOwnership: 0, revenue: 0, profit: 0, employees: 0, avgKPI: 0,
      sector: "F&B", subsidiaries: ["RAN Café", "ColdBrew Vietnam"], complianceScore: 0,
      sectorFund: { total: 0, drawn: 0, roi: 0 }
    }
  ];

  const mockF3Companies = [
    {
      id: "f3-01", level: "F3", name: "EduHolding JSC", type: "Công ty chiến lược",
      bmcOwnership: 0, revenue: 0, profit: 0, employees: 0, avgKPI: 0,
      sector: "Education", subsidiaries: ["Talky English (F5)"], complianceScore: 0,
      contracts: 0, intlContracts: 0
    },
    {
      id: "f3-02", level: "F3", name: "GAJ Jewelry Co.", type: "Công ty chiến lược", 
      bmcOwnership: 0, revenue: 0, profit: 0, employees: 0, avgKPI: 0,
      sector: "Jewelry", subsidiaries: ["GAJ HN (F4)", "GAJ HCM (F4)"], complianceScore: 0,
      contracts: 0, importContracts: 0
    },
    {
      id: "f3-03", level: "F3", name: "BMC Tech Solutions", type: "Công ty chiến lược",
      bmcOwnership: 0, revenue: 0, profit: 0, employees: 0, avgKPI: 0,
      sector: "Technology", subsidiaries: ["AI Lab (F5)", "Blockchain Hub (F4)"], complianceScore: 0,
      contracts: 0, techPartnerships: 0
    }
  ];

  const allCompanies = [...mockF2Companies, ...mockF3Companies];
  
  const totalMetrics = {
    totalRevenue: allCompanies.reduce((sum, c) => sum + c.revenue, 0),
    totalProfit: allCompanies.reduce((sum, c) => sum + c.profit, 0), 
    totalEmployees: allCompanies.reduce((sum, c) => sum + c.employees, 0),
    avgKPI: Math.round(allCompanies.reduce((sum, c) => sum + c.avgKPI, 0) / allCompanies.length),
    avgCompliance: Math.round(allCompanies.reduce((sum, c) => sum + c.complianceScore, 0) / allCompanies.length),
    avgBMCOwnership: Math.round(allCompanies.reduce((sum, c) => sum + c.bmcOwnership, 0) / allCompanies.length)
  };

  // Render specific views based on mode
  if (viewMode === "f2-holding") {
    return <F2HoldingView holdingData={mockF2Companies[0]} onBack={() => setViewMode("overview")} />;
  }
  
  if (viewMode === "f3-companies") {
    return <F3CompanyView companyData={mockF3Companies[0]} onBack={() => setViewMode("overview")} />;
  }
  
  if (viewMode === "auto-tiering") {
    const tieringData = {
      id: "f2-f3-consolidated",
      name: "F2-F3 Company Management",
      level: "F2-F3",
      bmcOwnership: totalMetrics.avgBMCOwnership,
      kpiAverage4Quarters: totalMetrics.avgKPI,
      autoTieringStatus: "Active monitoring",
      nextTierTarget: "F1",
      tieringProgress: totalMetrics.avgBMCOwnership
    };
    return <AutoTieringSystem entityData={tieringData} />;
  }
  
  if (viewMode === "data-entry") {
    return <DataEntryForms entityLevel="F4" entityName="Company Management" />;
  }

  if (selectedCompany) {
    return <CompanyDetailDashboard company={selectedCompany} onBack={() => setSelectedCompany(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">🏢 Quản Trị Công Ty F2-F3</h1>
          <p className="text-muted-foreground mt-2">
            Trung tâm quản trị & theo dõi realtime toàn bộ công ty thành viên - Auto-Tiering theo mốc cổ phần
          </p>
          <div className="flex items-center space-x-4 mt-3">
            <Badge variant="secondary" className="text-sm">
              🏬 {mockF2Companies.length} F2 Holdings
            </Badge>
            <Badge variant="secondary" className="text-sm">
              🏢 {mockF3Companies.length} F3 Strategic
            </Badge>
            <Badge variant="outline" className="text-sm">
              💰 {totalMetrics.totalRevenue} tỷ VNĐ total revenue
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-3">
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
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Bộ lọc
          </Button>
        </div>
      </div>

      {/* Navigation Bar cho F2-F3 */}
      <div className="bg-card p-4 rounded-lg border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button 
              variant={viewMode === "overview" ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode("overview")}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              📊 Tổng quan
            </Button>
            <Button 
              variant={getButtonVariant("f2-holding") as "default" | "outline"} 
              size="sm"
              onClick={() => setViewMode("f2-holding")}
            >
              <Building2 className="h-4 w-4 mr-2" />
              🏬 F2 Holdings
            </Button>
            <Button 
              variant={getButtonVariant("f3-companies") as "default" | "outline"} 
              size="sm"
              onClick={() => setViewMode("f3-companies")}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              🏢 F3 Strategic
            </Button>
            <Button 
              variant={getButtonVariant("auto-tiering") as "default" | "outline"} 
              size="sm"
              onClick={() => setViewMode("auto-tiering")}
            >
              <Zap className="h-4 w-4 mr-2" />
              🎯 Auto-Tiering
            </Button>
            <Button 
              variant={getButtonVariant("data-entry") as "default" | "outline"} 
              size="sm"
              onClick={() => setViewMode("data-entry")}
            >
              <Database className="h-4 w-4 mr-2" />
              📝 Nhập liệu
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Tháng</SelectItem>
                <SelectItem value="quarter">Quý</SelectItem>
                <SelectItem value="year">Năm</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="default" size="sm">
              <Search className="h-4 w-4 mr-2" />
              🤖 AI Query
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Cards - Dữ liệu thực từ mockup */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Doanh Thu F2-F3</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMetrics.totalRevenue} tỷ VNĐ</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              F2: 210 tỷ | F3: {totalMetrics.totalRevenue - 210} tỷ
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              💡 F&B Holding dẫn đầu với 210 tỷ
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lợi Nhuận Hợp Nhất</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMetrics.totalProfit} tỷ VNĐ</div>
            <p className="text-xs text-muted-foreground">
              Tỷ suất: {((totalMetrics.totalProfit / totalMetrics.totalRevenue) * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              💡 F3 GAJ Jewelry margin cao nhất 25.6%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Nhân Lực</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMetrics.totalEmployees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              KPI TB: {totalMetrics.avgKPI} | Compliance: {totalMetrics.avgCompliance}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              💡 F3 Tech Solutions KPI cao nhất
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BMC Ownership</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Kiểm soát</div>
            <p className="text-xs text-muted-foreground">
              F2: Mạnh | F3 TB: Ổn định
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              💡 F2 F&B sẵn sàng thăng F1
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Biểu Đồ Tài Chính Hợp Nhất
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Biểu đồ Doanh thu - Chi phí - Lợi nhuận theo tháng</p>
                <p className="text-xs text-muted-foreground mt-2">Dữ liệu từ {allCompanies.length} công ty thành viên</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Auto-Tiering Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>🏬 F2 → F1 Ready</span>
                  <span className="text-green-600 font-semibold">65% ✅</span>
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">F&B Holding đạt ngưỡng 55%</p>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>🏢 F3 GAJ → F2</span>
                  <span className="text-amber-600">35% ⏳</span>
                </div>
                <Progress value={35} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Cần thêm 20% để đạt ngưỡng F2</p>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>🏢 F3 EduHolding → F2</span>
                  <span className="text-blue-600">40% 📈</span>
                </div>
                <Progress value={40} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Tiến độ tốt, dự kiến Q4 đạt F2</p>
              </div>
              <div className="pt-2 border-t">
                <Button size="sm" className="w-full" onClick={() => setViewMode("auto-tiering")}>
                  🎯 Xem chi tiết Auto-Tiering
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Companies List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Danh Sách Công Ty Thành Viên ({allCompanies.length})
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Thêm công ty
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {allCompanies.map((company, index) => (
              <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    company.level === 'F2' ? 'bg-blue-50 dark:bg-blue-950/20' : 'bg-green-50 dark:bg-green-950/20'
                  }`}>
                    {company.level === 'F2' ? (
                      <Building2 className="h-6 w-6 text-blue-600" />
                    ) : (
                      <Briefcase className="h-6 w-6 text-green-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{company.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Badge variant={company.level === 'F2' ? 'default' : 'secondary'} className="mr-2">
                          {company.level}
                        </Badge>
                        {company.type}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {company.sector}
                      </span>
                      <span className="text-xs">
                        BMC: {company.bmcOwnership}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">{company.revenue} tỷ</div>
                    <div className="text-muted-foreground">Doanh thu</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{company.profit} tỷ</div>
                    <div className="text-muted-foreground">Lợi nhuận</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{company.avgKPI}%</div>
                    <div className="text-muted-foreground">KPI</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{company.employees}</div>
                    <div className="text-muted-foreground">Nhân sự</div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => company.level === 'F2' ? setViewMode('f2-holding') : setViewMode('f3-companies')}
                  >
                    Xem chi tiết
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="mr-2">🤖</span>
            AI Phân Tích & Gợi Ý
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">📊 AI Tóm Tắt Hệ Sinh Thái F2-F3</h4>
              <p className="text-blue-800 dark:text-blue-200 mt-2">
                "Tổng doanh thu {allCompanies.length} công ty thành viên đạt {totalMetrics.totalRevenue} tỷ VNĐ. 
                F2 F&B Holding dẫn đầu với 210 tỷ. Lợi nhuận hợp nhất {totalMetrics.totalProfit} tỷ, 
                tỷ suất lợi nhuận tốt. 
                Tổng nhân lực {totalMetrics.totalEmployees.toLocaleString()} người với KPI TB cao."
              </p>
            </div>
            
            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border-l-4 border-amber-500">
              <h4 className="font-semibold text-amber-900 dark:text-amber-100">⚠️ AI Cảnh Báo Auto-Tiering</h4>
              <p className="text-amber-800 dark:text-amber-200 mt-2">
                "F2 F&B Holding đạt mức sở hữu BMC cao, sẵn sàng thăng cấp F1. 
                Cần chuẩn bị workflow phê duyệt và hồ sơ pháp lý. 
                F3 EduHolding và GAJ cần tăng cường hợp tác để đạt ngưỡng F2."
              </p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-900 dark:text-green-100">💡 AI Gợi Ý Chiến Lược</h4>
              <p className="text-green-800 dark:text-green-200 mt-2">
                "🎯 Tăng vốn góp BMC vào F3 GAJ từ 35% lên 55% để thăng F2. 
                🚀 Mở rộng F2 F&B Holding với 5 chi nhánh mới Q4. 
                💰 Phân bổ quỹ ngành 60 tỷ để hỗ trợ startup F5 tiềm năng."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons F2-F3 */}
      <div className="flex justify-center space-x-4">
        <Button variant="default" onClick={() => setViewMode("f2-holding")}>
          <Building2 className="h-4 w-4 mr-2" />
          🏬 F2 Holdings
        </Button>
        <Button variant="outline" onClick={() => setViewMode("f3-companies")}>
          <Briefcase className="h-4 w-4 mr-2" />
          🏢 F3 Strategic
        </Button>
        <Button variant="outline" onClick={() => setViewMode("auto-tiering")}>
          <Zap className="h-4 w-4 mr-2" />
          🎯 Auto-Tiering
        </Button>
        <Button variant="outline" onClick={() => setViewMode("data-entry")}>
          <Database className="h-4 w-4 mr-2" />
          📝 Nhập liệu 9 PB
        </Button>
        <Button variant="outline" onClick={() => navigate('/consolidated-report')}>
          <Download className="h-4 w-4 mr-2" />
          📊 Báo cáo hợp nhất
        </Button>
      </div>
    </div>
  );
}

// Detailed Company Dashboard Component
function CompanyDetailDashboard({ company, onBack }: { company: any; onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← Quay lại danh sách
          </Button>
          <h1 className="text-3xl font-bold">{company.organizations?.name}</h1>
          <p className="text-muted-foreground">Chi tiết quản trị công ty thành viên</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="finance">Tài chính</TabsTrigger>
          <TabsTrigger value="hr">Nhân sự</TabsTrigger>
          <TabsTrigger value="sales">Kinh doanh</TabsTrigger>
          <TabsTrigger value="warehouse">Kho vận</TabsTrigger>
          <TabsTrigger value="legal">Pháp chế</TabsTrigger>
          <TabsTrigger value="tech">Công nghệ</TabsTrigger>
          <TabsTrigger value="rd">R&D</TabsTrigger>
          <TabsTrigger value="investment">Đầu tư</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Company Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Vốn Góp BMC</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25 tỷ VNĐ</div>
                <p className="text-xs text-muted-foreground">Tỷ lệ: 65%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Doanh Thu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45 tỷ VNĐ</div>
                <p className="text-xs text-muted-foreground">+8% tháng trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Lợi Nhuận</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 tỷ VNĐ</div>
                <p className="text-xs text-muted-foreground">Tỷ suất: 26%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">KPI Công Ty</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">Nhân sự: 120 người</p>
              </CardContent>
            </Card>
          </div>

          {/* Departments Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Tình Hình Phòng Ban</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Tài chính", kpi: 94, staff: 5, status: "Tốt" },
                  { name: "Kế toán", kpi: 96, staff: 4, status: "Xuất sắc" },
                  { name: "Nhân sự", kpi: 96, staff: 4, status: "Xuất sắc" },
                  { name: "Đào tạo", kpi: 92, staff: 3, status: "Tốt" },
                  { name: "Kinh doanh", kpi: 95, staff: 25, status: "Xuất sắc" },
                  { name: "Marketing", kpi: 78, staff: 12, status: "Cần cải thiện" },
                  { name: "Sản xuất", kpi: 88, staff: 12, status: "Tốt" },
                  { name: "Kho vận", kpi: 91, staff: 8, status: "Tốt" },
                  { name: "Pháp chế", kpi: 90, staff: 4, status: "Tốt" }
                ].map((dept, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">{dept.name}</h4>
                      <Badge variant={dept.status === "Xuất sắc" ? "default" : dept.status === "Tốt" ? "secondary" : "destructive"}>
                        {dept.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>KPI:</span>
                        <span className="font-medium">{dept.kpi}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Nhân sự:</span>
                        <span>{dept.staff} người</span>
                      </div>
                      <Progress value={dept.kpi} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs would have similar detailed content for each department */}
        <TabsContent value="finance">
          <Card>
            <CardHeader>
              <CardTitle>Chi Tiết Tài Chính</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Nội dung chi tiết về tài chính công ty...</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add other TabsContent for hr, sales, warehouse, legal, tech, rd, investment */}
      </Tabs>
    </div>
  );
}
