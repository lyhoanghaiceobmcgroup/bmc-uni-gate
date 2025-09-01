import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ClusterView } from "./ClusterView";
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
  Network,
  Globe,
  Layers,
  Factory,
  Zap,
  Database,
  Coffee,
  Laptop,
  GraduationCap,
  TrendingDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ClusterManagementViewProps {
  organizations: any[];
}

export function ClusterManagementView({ organizations }: ClusterManagementViewProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("quarter");
  const [selectedCluster, setSelectedCluster] = useState<any>(null);
  const [viewMode, setViewMode] = useState("overview");
  const navigate = useNavigate();

  // Mockup Data F1 - Cụm Ngành theo yêu cầu chi tiết
  const clusterData = [
    {
      id: "f1-fnb",
      name: "🍔 F1 - Cụm F&B",
      industry: "Food & Beverage",
      icon: Coffee,
      bmcOwnership: 80,
      // Dữ liệu tài chính Q2
      revenue: 0, // tỷ VNĐ
      expenses: 0,
      profit: 0,
      employees: 0,
      avgKPI: 0,
      complianceScore: 0,
      sectorFund: 0, // tỷ VNĐ
      growth: 0,
      // Công ty thành viên
      memberCompanies: [
        { name: "BMC F&B Holding (F2)", level: "F2", ownership: "65%", branches: 18 },
        { name: "RAN Café (F3)", level: "F3", ownership: "100%", branches: 18 },
        { name: "ColdBrew Vietnam (F5)", level: "F5", ownership: "20%", branches: 3 }
      ],
      // AI Insights
      aiInsights: {
        strengths: "Doanh thu dẫn đầu 420 tỷ, mạng lưới rộng với 18 chi nhánh",
        warnings: "DOH tăng 5 ngày, cần tối ưu supply chain",
        recommendations: "Mở rộng 5 chi nhánh mới Q3, đầu tư cold chain logistics"
      }
    },
    {
      id: "f1-tech",
      name: "💻 F1 - Cụm Công nghệ",
      industry: "Technology",
      icon: Laptop,
      bmcOwnership: 85,
      // Dữ liệu tài chính Q2
      revenue: 0, 
      expenses: 0,
      profit: 0,
      employees: 0,
      avgKPI: 0,
      complianceScore: 0,
      sectorFund: 0,
      growth: 0, // Tăng trưởng cao nhất
      // Công ty thành viên
      memberCompanies: [
        { name: "OneBMC Technology (F2)", level: "F2", ownership: "80%", branches: 8 },
        { name: "Solubiz (F3)", level: "F3", ownership: "70%", branches: 12 },
        { name: "MineGPT Startup (F5)", level: "F5", ownership: "25%", branches: 2 }
      ],
      // AI Insights
      aiInsights: {
        strengths: "Tăng trưởng mạnh 25%, ROI cao, đội ngũ tech talent chất lượng",
        warnings: "Cạnh tranh gay gắt từ BigTech, cần đầu tư R&D nhiều hơn",
        recommendations: "Tăng đầu tư AI/ML 30%, M&A startup blockchain, mở văn phòng Singapore"
      }
    },
    {
      id: "f1-edu",
      name: "🎓 F1 - Cụm Giáo dục",
      industry: "Education",
      icon: GraduationCap,
      bmcOwnership: 80,
      // Dữ liệu tài chính Q2
      revenue: 0,
      expenses: 0,
      profit: 0,
      employees: 0,
      avgKPI: 0,
      complianceScore: 0,
      sectorFund: 0,
      growth: 0, // Chậm nhất
      // Công ty thành viên
      memberCompanies: [
        { name: "EduHolding JSC (F3)", level: "F3", ownership: "40%", branches: 15 },
        { name: "Talky English (F5)", level: "F5", ownership: "15%", branches: 8 },
        { name: "EraHouse Education (F4)", level: "F4", ownership: "60%", branches: 22 }
      ],
      // AI Insights
      aiInsights: {
        strengths: "Thương hiệu mạnh trong giáo dục, đội ngũ giáo viên chất lượng",
        warnings: "Tăng trưởng chậm 8%, cạnh tranh từ EdTech platforms",
        recommendations: "Chuyển đổi số mạnh mẽ, đầu tư AI personalizing, online learning"
      }
    }
  ];

  const totalMetrics = {
    revenue: clusterData.reduce((sum, c) => sum + c.revenue, 0),
    profit: clusterData.reduce((sum, c) => sum + c.profit, 0),
    employees: clusterData.reduce((sum, c) => sum + c.employees, 0),
    avgKPI: Math.round(clusterData.reduce((sum, c) => sum + c.avgKPI, 0) / clusterData.length),
    avgCompliance: Math.round(clusterData.reduce((sum, c) => sum + c.complianceScore, 0) / clusterData.length),
    totalFund: clusterData.reduce((sum, c) => sum + c.sectorFund, 0),
    totalCompanies: clusterData.reduce((sum, c) => sum + c.memberCompanies.length, 0)
  };

  if (selectedCluster) {
    return <ClusterView organizations={organizations} />;
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">🏢 F1 - Quản Trí Cụm Ngành</h1>
          <p className="text-muted-foreground mt-2">
            Mini Holding - Điều phối toàn bộ các cụm ngành chiến lược BMC (≥80% ownership)
          </p>
          <div className="flex items-center space-x-4 mt-3">
            <Badge variant="secondary" className="text-sm">
              📊 {clusterData.length} Cụm ngành hoạt động
            </Badge>
            <Badge variant="secondary" className="text-sm">
              💰 {totalMetrics.totalFund} tỷ VNĐ quỹ phát triển
            </Badge>
            <Badge variant="outline" className="text-sm">
              🏢 {totalMetrics.totalCompanies} công ty thành viên
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
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

      {/* Filter Bar */}
      <div className="bg-card p-4 rounded-lg border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Cụm ngành:</label>
              <Select defaultValue="all">
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả cụm</SelectItem>
                  <SelectItem value="fb">F&B</SelectItem>
                  <SelectItem value="tech">Công nghệ</SelectItem>
                  <SelectItem value="education">Giáo dục</SelectItem>
                  <SelectItem value="investment">Đầu tư</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Chế độ xem:</label>
              <Select value={viewMode} onValueChange={(value: "overview" | "detailed") => setViewMode(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Tổng hợp</SelectItem>
                  <SelectItem value="detailed">Chi tiết</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button variant="default" size="sm">
            <Search className="h-4 w-4 mr-2" />
            🤖 Hỏi AI
          </Button>
        </div>
      </div>

      {/* Overview Cards với dữ liệu thực từ mockup */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh Thu Cụm Ngành</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMetrics.revenue} tỷ VNĐ</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              F&B: 420 tỷ | Tech: 310 tỷ | Edu: 160 tỷ
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              💡 F&B Cluster dẫn đầu với 47% tổng doanh thu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lợi Nhuận Hợp Nhất</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMetrics.profit} tỷ VNĐ</div>
            <p className="text-xs text-muted-foreground">
              Margin: {((totalMetrics.profit / totalMetrics.revenue) * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              💡 Tech cluster margin cao nhất 21%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Nhân Lực</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMetrics.employees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              KPI TB: {totalMetrics.avgKPI}% | Compliance: {totalMetrics.avgCompliance}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              💡 Tech cluster KPI cao nhất 81%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quỹ Phát Triển</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMetrics.totalFund} tỷ VNĐ</div>
            <p className="text-xs text-muted-foreground">
              Tech: 200 tỷ | F&B: 120 tỷ | Edu: 80 tỷ
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              💡 Tech fund lớn nhất để R&D AI/ML
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
              Hiệu Suất Các Cụm Ngành
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clusterData.map((cluster, index) => (
                <div key={cluster.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium flex items-center">
                      <cluster.icon className="h-4 w-4 mr-2" />
                      {cluster.name}
                    </span>
                    <span>{cluster.revenue} tỷ VNĐ</span>
                  </div>
                  <Progress value={(cluster.revenue / totalMetrics.revenue) * 100} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{cluster.memberCompanies.length} công ty</span>
                    <span className={cluster.growth > 15 ? "text-green-600" : cluster.growth < 10 ? "text-red-500" : ""}>
                      {cluster.growth > 15 ? "📈" : cluster.growth < 10 ? "📉" : "📊"} +{cluster.growth}% growth
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Network className="h-5 w-5 mr-2" />
              Cấu Trúc Cụm Ngành
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <Globe className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="font-semibold">BMC Holdings</div>
                <div className="text-sm text-muted-foreground">100% sở hữu</div>
              </div>
              <div className="space-y-2">
                {clusterData.map((cluster, index) => (
                  <div key={cluster.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div className="flex items-center space-x-2">
                      <cluster.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{cluster.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {cluster.memberCompanies.length} công ty
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        BMC {cluster.bmcOwnership}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* F1 Clusters Grid với Mockup Data Chi Tiết */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {clusterData.map((cluster) => (
          <Card key={cluster.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <cluster.icon className="h-5 w-5 mr-2" />
                    {cluster.name}
                  </CardTitle>
                  <CardDescription>{cluster.industry}</CardDescription>
                </div>
                <div className="text-right">
                  <Badge variant="default" className="mb-1">
                    BMC {cluster.bmcOwnership}%
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {cluster.memberCompanies.length} công ty
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mini Holding Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Doanh thu Q2</div>
                    <div className="font-semibold text-lg">{cluster.revenue} tỷ</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Lợi nhuận</div>
                    <div className="font-semibold text-lg">{cluster.profit} tỷ</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Nhân sự</div>
                    <div className="font-semibold">{cluster.employees.toLocaleString()}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">KPI TB</div>
                    <div className="font-semibold">{cluster.avgKPI}%</div>
                  </div>
                </div>

                {/* Growth & Fund Info */}
                <div className="grid grid-cols-2 gap-2">
                  <div className={`flex items-center justify-between p-2 rounded-lg ${
                    cluster.growth > 15 ? 'bg-green-50 dark:bg-green-950/20' : 
                    cluster.growth < 10 ? 'bg-red-50 dark:bg-red-950/20' :
                    'bg-blue-50 dark:bg-blue-950/20'
                  }`}>
                    <span className="text-sm font-medium">Growth</span>
                    <span className={`font-bold ${
                      cluster.growth > 15 ? 'text-green-600' : 
                      cluster.growth < 10 ? 'text-red-600' :
                      'text-blue-600'
                    }`}>
                      +{cluster.growth}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <span className="text-sm font-medium">Fund</span>
                    <span className="font-bold text-purple-600">{cluster.sectorFund}B</span>
                  </div>
                </div>

                {/* Thành viên cụm ngành */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Công ty thành viên:</div>
                  {cluster.memberCompanies.map((company, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm p-2 bg-muted/30 rounded">
                      <span className="font-medium">{company.name}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {company.level}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {company.ownership}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Insights Preview */}
                <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border-l-4 border-blue-500">
                  <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">🤖 AI Insight</h4>
                  <p className="text-xs text-blue-800 dark:text-blue-200 line-clamp-2">
                    {cluster.aiInsights.strengths}
                  </p>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setSelectedCluster(cluster)}
                >
                  Chi tiết Mini Holding
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* F1 AI Insights với dữ liệu thực */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="mr-2">🤖</span>
            AI Phân Tích Cụm Ngành F1 - Mini Holding
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">📊 AI Tóm Tắt Hệ Sinh Thái F1</h4>
              <p className="text-blue-800 dark:text-blue-200 mt-2">
                "Tổng doanh thu 3 cụm ngành chính đạt {totalMetrics.revenue} tỷ VNĐ. 
                🍔 F&B cluster chiếm 47% doanh thu (420 tỷ) với 2,450 nhân sự. 
                💻 Tech cluster tăng trưởng nhanh nhất 25%, margin 21%. 
                🎓 Edu cluster cần tăng tốc chuyển đổi số để cạnh tranh."
              </p>
            </div>
            
            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border-l-4 border-amber-500">
              <h4 className="font-semibold text-amber-900 dark:text-amber-100">⚠️ AI Cảnh Báo Chiến Lược</h4>
              <p className="text-amber-800 dark:text-amber-200 mt-2">
                "🎓 Edu cluster tăng trưởng chậm nhất (8%) do cạnh tranh EdTech. 
                🍔 F&B cluster cần tối ưu supply chain (DOH tăng 5 ngày). 
                💻 Tech cluster rủi ro brain-drain do cạnh tranh BigTech."
              </p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-900 dark:text-green-100">💡 AI Strategy Recommendations</h4>
              <p className="text-green-800 dark:text-green-200 mt-2">
                "🚀 Tăng đầu tư Tech cluster 30% (ROI 35% dự kiến). 
                🏗️ M&A 2-3 Fintech startups Q3. 
                📚 Digital transformation cho Edu cluster với AI tutoring. 
                🥤 Mở rộng F&B với 5 chi nhánh premium Q4."
              </p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-900 dark:text-purple-100">🎯 KPI Targets Q3-Q4</h4>
              <p className="text-purple-800 dark:text-purple-200 mt-2">
                "F&B: 450 tỷ doanh thu (+7%) | Tech: 380 tỷ (+23%) | Edu: 180 tỷ (+13%). 
                Tổng quỹ phát triển: 500 tỷ. Target BMC ownership tăng lên 85% cho tất cả clusters."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* F1 Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button variant="default">
          <Building2 className="h-4 w-4 mr-2" />
          🏢 Quản lý cụm ngành
        </Button>
        <Button variant="outline" onClick={() => navigate('/consolidated-report')}>
          <Zap className="h-4 w-4 mr-2" />
          📊 Báo cáo hợp nhất
        </Button>
        <Button variant="outline">
          <Database className="h-4 w-4 mr-2" />
          💰 Điều phối quỹ
        </Button>
        <Button variant="outline">
          <Users className="h-4 w-4 mr-2" />
          👥 Cross-cluster HR
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          📈 Xuất báo cáo BMC
        </Button>
      </div>
    </div>
  );
}

// Detailed Cluster Dashboard Component
function ClusterDetailDashboard({ cluster, onBack }: { cluster: any; onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← Quay lại cụm ngành
          </Button>
          <h1 className="text-3xl font-bold">{cluster.name}</h1>
          <p className="text-muted-foreground">Chi tiết quản trị cụm ngành - {cluster.industry}</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="finance">Tài chính</TabsTrigger>
          <TabsTrigger value="hr">Nhân sự</TabsTrigger>
          <TabsTrigger value="sales">Kinh doanh</TabsTrigger>
          <TabsTrigger value="operations">Vận hành</TabsTrigger>
          <TabsTrigger value="legal">Pháp chế</TabsTrigger>
          <TabsTrigger value="tech">Công nghệ</TabsTrigger>
          <TabsTrigger value="rd">R&D</TabsTrigger>
          <TabsTrigger value="investment">Đầu tư</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Cluster Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Doanh Thu Cụm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cluster.revenue} tỷ VNĐ</div>
                <p className="text-xs text-muted-foreground">+{cluster.growth}% tăng trưởng</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Lợi Nhuận</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cluster.profit} tỷ VNĐ</div>
                <p className="text-xs text-muted-foreground">Tỷ suất: {((cluster.profit / cluster.revenue) * 100).toFixed(1)}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Công Ty Thành Viên</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cluster.companies.length}</div>
                <p className="text-xs text-muted-foreground">Nhân sự: {cluster.employees} người</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">KPI Cụm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cluster.kpi}%</div>
                <p className="text-xs text-muted-foreground">Mục tiêu: 85%</p>
              </CardContent>
            </Card>
          </div>

          {/* Companies in Cluster */}
          <Card>
            <CardHeader>
              <CardTitle>Công Ty Trong Cụm ({cluster.companies.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {cluster.companies.length > 0 ? (
                <div className="space-y-4">
                  {cluster.companies.map((company, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{company.organizations?.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            <Badge variant="outline" className="mr-2">{company.organizations?.level}</Badge>
                            {company.organizations?.industry}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="text-center">
                          <div className="font-semibold">25 tỷ</div>
                          <div className="text-muted-foreground">Doanh thu</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">88%</div>
                          <div className="text-muted-foreground">KPI</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Chi tiết
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Chưa có công ty nào trong cụm này</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs would have detailed content for each department */}
        <TabsContent value="finance">
          <Card>
            <CardHeader>
              <CardTitle>Tài Chính Hợp Nhất Cụm</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Nội dung chi tiết về tài chính cụm ngành...</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add other TabsContent for hr, sales, operations, legal, tech, rd, investment */}
      </Tabs>
    </div>
  );
}
