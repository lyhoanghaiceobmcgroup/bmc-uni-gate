import { useState, useEffect, useMemo } from "react";
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
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
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
  const [loading, setLoading] = useState(true);
  const [dbOrganizations, setDbOrganizations] = useState<any[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const getButtonVariant = (mode: string) => {
    return viewMode === mode ? "default" : "outline";
  };

  // Load organizations from database
  useEffect(() => {
    loadOrganizations();
  }, [user]);

  const loadOrganizations = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_organization_roles')
        .select(`
          role,
          organizations (*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      setDbOrganizations(data || []);
    } catch (error) {
      console.error('Error loading organizations:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách công ty từ database",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter F2 and F3 companies from database
  const { f2Companies, f3Companies, allCompanies } = useMemo(() => {
    const f2 = dbOrganizations
      .filter(org => org.organizations?.level === 'F2')
      .map(org => ({
        id: org.organizations.id,
        name: org.organizations.name,
        level: 'F2',
        type: 'holding_company',
        sector: org.organizations.industry || 'Chưa xác định',
        bmcOwnership: org.organizations.bmc_equity_percentage || 0,
        revenue: 0, // Sẽ được cập nhật từ báo cáo
        profit: 0,
        employees: 0,
        avgKPI: 0,
        complianceScore: 0,
        establishedDate: org.organizations.created_at,
        code: org.organizations.code
      }));
    
    const f3 = dbOrganizations
      .filter(org => org.organizations?.level === 'F3')
      .map(org => ({
        id: org.organizations.id,
        name: org.organizations.name,
        level: 'F3',
        type: 'strategic_company',
        sector: org.organizations.industry || 'Chưa xác định',
        bmcOwnership: org.organizations.bmc_equity_percentage || 0,
        revenue: 0, // Sẽ được cập nhật từ báo cáo
        profit: 0,
        employees: 0,
        avgKPI: 0,
        complianceScore: 0,
        establishedDate: org.organizations.created_at,
        code: org.organizations.code
      }));
    
    return {
      f2Companies: f2,
      f3Companies: f3,
      allCompanies: [...f2, ...f3]
    };
  }, [dbOrganizations]);
  
  const totalMetrics = {
    totalRevenue: allCompanies.reduce((sum, c) => sum + c.revenue, 0),
    totalProfit: allCompanies.reduce((sum, c) => sum + c.profit, 0), 
    totalEmployees: allCompanies.reduce((sum, c) => sum + c.employees, 0),
    avgKPI: allCompanies.length > 0 ? Math.round(allCompanies.reduce((sum, c) => sum + c.avgKPI, 0) / allCompanies.length) : 0,
    avgCompliance: allCompanies.length > 0 ? Math.round(allCompanies.reduce((sum, c) => sum + c.complianceScore, 0) / allCompanies.length) : 0,
    avgBMCOwnership: allCompanies.length > 0 ? Math.round(allCompanies.reduce((sum, c) => sum + c.bmcOwnership, 0) / allCompanies.length) : 0
  };

  // Render specific views based on mode
  if (viewMode === "f2-holding") {
    return <F2HoldingView holdingData={f2Companies[0]} onBack={() => setViewMode("overview")} />;
  }
  
  if (viewMode === "f3-companies") {
    return <F3CompanyView companyData={f3Companies[0]} onBack={() => setViewMode("overview")} />;
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
              🏬 {f2Companies.length} F2 Holdings
            </Badge>
            <Badge variant="secondary" className="text-sm">
              🏢 {f3Companies.length} F3 Strategic
            </Badge>
            <Badge variant="outline" className="text-sm">
              💰 {totalMetrics.totalRevenue} tỷ VNĐ total revenue
            </Badge>
            {loading && (
              <Badge variant="outline" className="text-sm animate-pulse">
                🔄 Đang tải dữ liệu...
              </Badge>
            )}
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
              {allCompanies.length > 0 ? (
                allCompanies.map((company, index) => {
                  const tieringProgress = company.bmcOwnership || 0;
                  const isEligible = tieringProgress >= 50;
                  const statusColor = isEligible ? "text-green-600" : tieringProgress >= 30 ? "text-amber-600" : "text-blue-600";
                  const statusIcon = isEligible ? "✅" : tieringProgress >= 30 ? "⏳" : "📈";
                  
                  return (
                    <div key={company.id}>
                      <div className="flex justify-between text-sm">
                        <span>{company.level === "F2" ? "🏬" : "🏢"} {company.name} → {company.level === "F2" ? "F1" : "F2"}</span>
                        <span className={statusColor}>{Math.round(tieringProgress)}% {statusIcon}</span>
                      </div>
                      <Progress value={tieringProgress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {isEligible ? "Đạt ngưỡng thăng cấp" : `Cần thêm ${Math.round(50 - tieringProgress)}% để đạt ngưỡng`}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <div className="text-muted-foreground mb-2">📊</div>
                  <p className="text-sm text-muted-foreground">Chưa có dữ liệu công ty để hiển thị tiến độ Auto-Tiering</p>
                  <p className="text-xs text-muted-foreground mt-1">Thêm công ty để theo dõi tiến độ thăng cấp tự động</p>
                </div>
              )}
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
              {loading && <span className="ml-2 text-sm text-muted-foreground animate-pulse">🔄</span>}
            </div>
            <Button size="sm" disabled={loading}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm công ty
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Đang tải danh sách công ty từ database...</p>
              </div>
            ) : allCompanies.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-muted-foreground mb-4">
                  <Building2 className="w-16 h-16 mx-auto" />
                </div>
                <h4 className="text-lg font-medium mb-2">Chưa có công ty nào</h4>
                <p className="text-muted-foreground mb-4">Hiện tại chưa có công ty F2 hoặc F3 nào trong hệ thống.</p>
                <Button onClick={() => setViewMode("data-entry")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm Công Ty Mới
                </Button>
              </div>
            ) : (
              allCompanies.map((company, index) => (
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
              ))
            )}
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
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">📊 AI Tóm Tắt Hệ Sinh Thái F2-F3 (Realtime)</h4>
              <p className="text-blue-800 dark:text-blue-200 mt-2">
                {allCompanies.length > 0 ? (
                  `"Hệ thống đang quản lý ${allCompanies.length} công ty thành viên (${f2Companies.length} F2 Holdings, ${f3Companies.length} F3 Strategic). 
                  Tổng doanh thu ${totalMetrics.totalRevenue.toLocaleString()} tỷ VNĐ. 
                  Lợi nhuận hợp nhất ${totalMetrics.totalProfit.toLocaleString()} tỷ VNĐ. 
                  Tổng nhân lực ${totalMetrics.totalEmployees.toLocaleString()} người với KPI TB ${totalMetrics.avgKPI}%. 
                  BMC ownership trung bình ${totalMetrics.avgBMCOwnership}%."`
                ) : (
                  loading ? "🔄 Đang tải dữ liệu công ty từ database..." : "📊 Chưa có công ty F2-F3 nào trong hệ thống. Vui lòng thêm công ty để bắt đầu quản lý."
                )}
              </p>
            </div>
            
            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border-l-4 border-amber-500">
              <h4 className="font-semibold text-amber-900 dark:text-amber-100">⚠️ AI Cảnh Báo Auto-Tiering (Live Monitor)</h4>
              <p className="text-amber-800 dark:text-amber-200 mt-2">
                {allCompanies.length > 0 ? (
                  `🚨 Hệ thống đang theo dõi ${allCompanies.length} công ty thành viên. 
                  Compliance score trung bình: ${totalMetrics.avgCompliance}%. 
                  Sẵn sàng cho việc đánh giá Auto-Tiering khi có đủ dữ liệu cổ phần BMC.`
                ) : (
                  "📊 Chưa có dữ liệu công ty để thực hiện Auto-Tiering. Vui lòng thêm công ty để bắt đầu theo dõi."
                )}
              </p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-900 dark:text-green-100">💡 AI Gợi Ý Chiến Lược (Data-Driven)</h4>
              <p className="text-green-800 dark:text-green-200 mt-2">
                {allCompanies.length > 0 ? (
                  `🎯 Hệ thống AI đang phân tích ${allCompanies.length} công ty thành viên. 
                  💰 ROI trung bình: ${totalMetrics.avgROI}%, KPI trung bình: ${totalMetrics.avgKPI}%. 
                  📈 Sẵn sàng đưa ra gợi ý chiến lược khi có đủ dữ liệu phân tích.`
                ) : (
                  "🤖 AI chờ dữ liệu công ty để phân tích và đưa ra gợi ý chiến lược tối ưu. Vui lòng thêm công ty để bắt đầu."
                )}
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-900 dark:text-purple-100">🔄 Realtime Department Sync</h4>
              <p className="text-purple-800 dark:text-purple-200 mt-2">
                {allCompanies.length > 0 ? (
                  `📊 Sales: Tổng revenue ${totalMetrics.totalRevenue.toLocaleString()} tỷ VNĐ. Finance: ROI TB ${totalMetrics.avgROI}%. 
                  👥 HR: ${totalMetrics.totalEmployees.toLocaleString()} nhân sự từ ${allCompanies.length} công ty thành viên. 
                  🎯 Auto-sync từ các phòng ban BMC Holdings đang hoạt động.`
                ) : (
                  "🔄 Hệ thống sync sẵn sàng kết nối với các phòng ban khi có dữ liệu công ty. Vui lòng thêm công ty để bắt đầu đồng bộ."
                )}
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
