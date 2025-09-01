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
import { ArrowLeft, Target, TrendingUp, Lightbulb, Microscope, BarChart3, Users, FileText, Upload, Download, Bot, Plus, Eye, Edit, CheckCircle2, AlertTriangle, Building2, Briefcase, FlaskConical, Award, Globe, Rocket, Brain } from "lucide-react";

interface StrategyRDDetailViewProps {
  onBack: () => void;
}

export function StrategyRDDetailView({ onBack }: StrategyRDDetailViewProps) {
  const [activeView, setActiveView] = useState<"strategy" | "research" | "rnd" | "innovation" | "reports">("strategy");
  const [organizationLevel, setOrganizationLevel] = useState<"BMC" | "F1" | "F2" | "F3" | "F4" | "F5">("BMC");
  const [timeFilter, setTimeFilter] = useState<"quarter" | "year" | "3years">("year");

  // Comprehensive Professional Mockup Data
  const getOrganizationData = () => {
    const baseData = {
      BMC: { name: "BMC Group Holdings", strategicBudget: 45000000000, rdBudget: 28000000000, employeeCount: 12500, rdTeam: 185 },
      F1: { name: "BMC Vietnam Coffee Corporation", strategicBudget: 0, rdBudget: 0, employeeCount: 0, rdTeam: 0 },
      F2: { name: "Trung Nguyên Legend", strategicBudget: 12000000000, rdBudget: 8500000000, employeeCount: 3200, rdTeam: 45 },
      F3: { name: "Nhà máy Hà Nội", strategicBudget: 6000000000, rdBudget: 4200000000, employeeCount: 1800, rdTeam: 22 },
      F4: { name: "Chi nhánh Cầu Giấy", strategicBudget: 2400000000, rdBudget: 1800000000, employeeCount: 850, rdTeam: 9 },
      F5: { name: "Phân xưởng A1", strategicBudget: 850000000, rdBudget: 650000000, employeeCount: 320, rdTeam: 5 }
    };
    return baseData[organizationLevel];
  };

  const getCurrentLevelData = () => {
    const multiplier = organizationLevel === "BMC" ? 1 : organizationLevel === "F1" ? 0.4 : organizationLevel === "F2" ? 0.25 : organizationLevel === "F3" ? 0.12 : organizationLevel === "F4" ? 0.05 : 0.025;
    const orgData = getOrganizationData();

    return {
      strategy: {
        initiatives: { 
          total: Math.round(42 * multiplier) || 3, 
          active: Math.round(35 * multiplier) || 2, 
          completed: Math.round(7 * multiplier) || 1,
          pending: Math.round(5 * multiplier) || 1
        },
        kpis: { 
          revenueGrowth: organizationLevel === "BMC" ? 18.5 : organizationLevel === "F1" ? 0 : organizationLevel === "F2" ? 12.8 : 8.5,
          marketShare: organizationLevel === "BMC" ? 35.8 : organizationLevel === "F1" ? 0 : organizationLevel === "F2" ? 22.3 : 15.2,
          customerSat: organizationLevel === "BMC" ? 92.5 : organizationLevel === "F1" ? 0 : 89.2,
          profitMargin: organizationLevel === "BMC" ? 24.8 : organizationLevel === "F1" ? 0 : 18.5,
          employeeEng: organizationLevel === "BMC" ? 87.3 : organizationLevel === "F1" ? 0 : 84.6
        },
        projects: [
          { id: 1, name: "Chuyển đổi số toàn diện", status: "Đang thực hiện", progress: 85, budget: orgData.strategicBudget * 0.3, timeline: "Q4 2024", priority: "Cao" },
          { id: 2, name: "Mở rộng thị trường Đông Nam Á", status: "Đang thực hiện", progress: 60, budget: orgData.strategicBudget * 0.25, timeline: "Q2 2025", priority: "Cao" },
          { id: 3, name: "Phát triển bền vững", status: "Lập kế hoạch", progress: 25, budget: orgData.strategicBudget * 0.2, timeline: "Q3 2025", priority: "Trung bình" },
          { id: 4, name: "AI & Automation", status: "Đang thực hiện", progress: 45, budget: orgData.strategicBudget * 0.15, timeline: "Q1 2025", priority: "Cao" }
        ]
      },
      research: {
        projects: { 
          total: Math.round(28 * multiplier) || 2, 
          ongoing: Math.round(18 * multiplier) || 1,
          completed: Math.round(10 * multiplier) || 1
        },
        team: orgData.rdTeam,
        budget: orgData.strategicBudget * 0.15,
        insights: [
          { category: "Thị trường", insight: "Premium coffee segment tăng trưởng 25% năm qua", impact: "Cao", confidence: 92 },
          { category: "Khách hàng", insight: "Gen Z ưa tiên sản phẩm bền vững (+40%)", impact: "Cao", confidence: 88 },
          { category: "Công nghệ", insight: "AI trong F&B tăng hiệu quả 35%", impact: "Trung bình", confidence: 85 },
          { category: "Cạnh tranh", insight: "Đối thủ đầu tư mạnh vào digital", impact: "Cao", confidence: 90 }
        ],
        trends: [
          { name: "Sustainable Coffee", growth: "+32%", timeframe: "12 tháng", market: "Premium" },
          { name: "Mobile Ordering", growth: "+58%", timeframe: "6 tháng", market: "Urban" },
          { name: "Cold Brew", growth: "+28%", timeframe: "12 tháng", market: "Young Adults" }
        ]
      },
      rnd: {
        projects: { 
          total: Math.round(35 * multiplier) || 2, 
          active: Math.round(22 * multiplier) || 1,
          completed: Math.round(8 * multiplier) || 1,
          testing: Math.round(5 * multiplier) || 0
        },
        budget: orgData.rdBudget,
        team: orgData.rdTeam,
        patents: { 
          filed: Math.round(28 * multiplier) || 1, 
          granted: Math.round(15 * multiplier) || 0,
          pending: Math.round(13 * multiplier) || 1
        },
        activeProjects: [
          { 
            id: 1, 
            name: "AI Coffee Brewing System", 
            status: "Đang phát triển", 
            progress: 75, 
            budget: orgData.rdBudget * 0.3,
            team: Math.round(orgData.rdTeam * 0.4),
            timeline: "Q1 2025",
            category: "Công nghệ",
            roi_expected: 285
          },
          { 
            id: 2, 
            name: "Bio-degradable Packaging", 
            status: "Testing", 
            progress: 90, 
            budget: orgData.rdBudget * 0.25,
            team: Math.round(orgData.rdTeam * 0.3),
            timeline: "Q4 2024",
            category: "Bao bì",
            roi_expected: 156
          },
          { 
            id: 3, 
            name: "Smart Supply Chain IoT", 
            status: "Đang phát triển", 
            progress: 45, 
            budget: orgData.rdBudget * 0.35,
            team: Math.round(orgData.rdTeam * 0.25),
            timeline: "Q3 2025",
            category: "Logistics",
            roi_expected: 340
          }
        ]
      },
      innovation: {
        ideas: { 
          submitted: Math.round(245 * multiplier) || 15, 
          implemented: Math.round(42 * multiplier) || 3,
          inReview: Math.round(73 * multiplier) || 5,
          inDevelopment: Math.round(48 * multiplier) || 3,
          rejected: Math.round(82 * multiplier) || 4
        },
        roi: organizationLevel === "BMC" ? 340 : organizationLevel === "F1" ? 0 : 195,
        successRate: organizationLevel === "F1" ? 0 : Math.round((Math.round(42 * multiplier) || 3) / (Math.round(245 * multiplier) || 15) * 100),
        categories: [
          { name: "Sản phẩm", count: Math.round(98 * multiplier) || 6, implemented: Math.round(18 * multiplier) || 1 },
          { name: "Quy trình", count: Math.round(67 * multiplier) || 4, implemented: Math.round(12 * multiplier) || 1 },
          { name: "Công nghệ", count: Math.round(45 * multiplier) || 3, implemented: Math.round(8 * multiplier) || 1 },
          { name: "Dịch vụ", count: Math.round(35 * multiplier) || 2, implemented: Math.round(4 * multiplier) || 0 }
        ],
        topIdeas: [
          { id: 1, title: "Hệ thống đặt hàng bằng giọng nói", submitter: "Nguyễn Văn A", status: "Đang phát triển", votes: 156, potential: "Cao" },
          { id: 2, title: "App loyalty với AR rewards", submitter: "Trần Thị B", status: "Đã triển khai", votes: 134, potential: "Trung bình" },
          { id: 3, title: "Robot pha cà phê tự động", submitter: "Lê Minh C", status: "Đang đánh giá", votes: 98, potential: "Cao" }
        ]
      }
    };
  };

  const currentData = getCurrentLevelData();
  const orgInfo = getOrganizationData();

  const formatCurrency = (amount: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

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
                🎯 Chiến lược - R&D
              </h1>
              <p className="text-muted-foreground">Hoạch định chiến lược & đổi mới sáng tạo BMC → F1 → F2 → F3 → F4 → F5</p>
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
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button>
          </div>
        </div>

        {/* Organization Info */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{orgInfo.name}</h3>
                  <p className="text-sm text-muted-foreground">{orgInfo.employeeCount} nhân viên • Strategic Planning & R&D</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{formatCurrency(orgInfo.strategicBudget)}</div>
                <p className="text-sm text-muted-foreground">Ngân sách chiến lược</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sáng kiến</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.strategy.initiatives.active}</div>
              <p className="text-xs text-muted-foreground">/{currentData.strategy.initiatives.total} đang thực hiện</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tăng trưởng</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{currentData.strategy.kpis.revenueGrowth}%</div>
              <p className="text-xs text-muted-foreground">Doanh thu năm nay</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">R&D</CardTitle>
              <FlaskConical className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.rnd.projects.active}</div>
              <p className="text-xs text-muted-foreground">Dự án đang phát triển</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Innovation</CardTitle>
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.innovation.ideas.implemented}</div>
              <p className="text-xs text-muted-foreground">Ý tưởng đã triển khai</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nghiên cứu TT</CardTitle>
              <Microscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.research.projects.ongoing}</div>
              <p className="text-xs text-muted-foreground">Dự án nghiên cứu</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as typeof activeView)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="strategy">🎯 Chiến lược</TabsTrigger>
            <TabsTrigger value="research">🔬 Nghiên cứu TT</TabsTrigger>
            <TabsTrigger value="rnd">🧪 Dự án R&D</TabsTrigger>
            <TabsTrigger value="innovation">💡 Đổi mới</TabsTrigger>
            <TabsTrigger value="reports">📊 Báo cáo</TabsTrigger>
          </TabsList>

          <TabsContent value="strategy">
            <div className="space-y-6">
              {/* Strategic Initiatives Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{currentData.strategy.initiatives.active}</div>
                    <p className="text-sm text-muted-foreground">Đang thực hiện</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">{currentData.strategy.initiatives.pending}</div>
                    <p className="text-sm text-muted-foreground">Chờ phê duyệt</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{currentData.strategy.initiatives.completed}</div>
                    <p className="text-sm text-muted-foreground">Hoàn thành</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">{currentData.strategy.initiatives.total}</div>
                    <p className="text-sm text-muted-foreground">Tổng sáng kiến</p>
                  </CardContent>
                </Card>
              </div>

              {/* Strategic Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Dự án chiến lược chính</CardTitle>
                  <CardDescription>Các dự án chiến lược đang triển khai</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentData.strategy.projects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium">{project.name}</h4>
                            <p className="text-sm text-muted-foreground">Timeline: {project.timeline}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={project.priority === "Cao" ? "default" : "secondary"}>
                              {project.priority}
                            </Badge>
                            <p className="text-sm font-medium mt-1">{formatCurrency(project.budget)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={project.status === "Đang thực hiện" ? "default" : "secondary"}>
                            {project.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{project.progress}% hoàn thành</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Key Performance Indicators */}
              <Card>
                <CardHeader>
                  <CardTitle>Chỉ số hiệu suất chính (KPIs)</CardTitle>
                  <CardDescription>Theo dõi các chỉ số chiến lược quan trọng</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 border rounded-lg">
                      <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary">{currentData.strategy.kpis.revenueGrowth}%</div>
                      <p className="text-sm text-muted-foreground">Tăng trưởng doanh thu</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary">{currentData.strategy.kpis.marketShare}%</div>
                      <p className="text-sm text-muted-foreground">Thị phần</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary">{currentData.strategy.kpis.customerSat}%</div>
                      <p className="text-sm text-muted-foreground">Hài lòng khách hàng</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="research">
            <div className="space-y-6">
              {/* Market Research Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Nghiên cứu thị trường</CardTitle>
                  <CardDescription>Insights và xu hướng thị trường</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentData.research.insights.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 border rounded-lg">
                        <Brain className="h-5 w-5 text-primary mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">{item.category}</Badge>
                            <Badge variant={item.impact === "Cao" ? "default" : "secondary"} className="text-xs">
                              {item.impact} Impact
                            </Badge>
                          </div>
                          <p className="text-sm font-medium mb-1">{item.insight}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Độ tin cậy:</span>
                            <Progress value={item.confidence} className="w-16 h-2" />
                            <span className="text-xs font-medium">{item.confidence}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Market Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Xu hướng thị trường</CardTitle>
                  <CardDescription>Các xu hướng được theo dõi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentData.research.trends.map((trend, i) => (
                      <div key={i} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{trend.name}</h4>
                          <Badge className="text-xs bg-primary/10 text-primary">{trend.growth}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{trend.market} segment</p>
                        <p className="text-xs text-muted-foreground">{trend.timeframe}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Research Team & Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Đội ngũ nghiên cứu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Tổng nhân sự</span>
                        <span className="font-bold text-primary">{currentData.research.team} người</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Dự án đang thực hiện</span>
                        <span className="font-bold">{currentData.research.projects.ongoing}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Dự án hoàn thành</span>
                        <span className="font-bold text-primary">{currentData.research.projects.completed}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ngân sách nghiên cứu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{formatCurrency(currentData.research.budget)}</div>
                        <p className="text-sm text-muted-foreground">Ngân sách năm nay</p>
                      </div>
                      <Progress value={75} className="mb-2" />
                      <p className="text-xs text-muted-foreground">75% đã sử dụng</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rnd">
            <div className="space-y-6">
              {/* R&D Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <FlaskConical className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">{currentData.rnd.projects.active}</div>
                    <p className="text-sm text-muted-foreground">Đang phát triển</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Award className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{currentData.rnd.patents.granted}</div>
                    <p className="text-sm text-muted-foreground">Bằng sáng chế</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{currentData.rnd.team}</div>
                    <p className="text-sm text-muted-foreground">Nhân sự R&D</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <BarChart3 className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-lg font-bold text-primary">{formatCurrency(currentData.rnd.budget)}</div>
                    <p className="text-sm text-muted-foreground">Ngân sách R&D</p>
                  </CardContent>
                </Card>
              </div>

              {/* Active R&D Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Dự án R&D đang triển khai</CardTitle>
                  <CardDescription>Chi tiết các dự án nghiên cứu và phát triển</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentData.rnd.activeProjects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-lg">{project.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{project.category}</Badge>
                              <Badge variant={project.status === "Đang phát triển" ? "default" : "secondary"}>
                                {project.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{formatCurrency(project.budget)}</p>
                            <p className="text-xs text-muted-foreground">{project.timeline}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Tiến độ</p>
                            <div className="flex items-center gap-2">
                              <Progress value={project.progress} className="flex-1" />
                              <span className="text-sm font-medium">{project.progress}%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Đội ngũ</p>
                            <p className="text-sm font-medium">{project.team} người</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">ROI dự kiến</p>
                            <p className="text-sm font-medium text-primary">{project.roi_expected}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Patents & IP */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sở hữu trí tuệ</CardTitle>
                    <CardDescription>Quản lý bằng sáng chế và IP</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span className="text-sm">Đã nộp hồ sơ</span>
                        <Badge className="bg-primary/10 text-primary">{currentData.rnd.patents.filed}</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span className="text-sm">Đã cấp bằng</span>
                        <Badge className="bg-primary text-primary-foreground">{currentData.rnd.patents.granted}</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span className="text-sm">Đang chờ</span>
                        <Badge variant="outline">{currentData.rnd.patents.pending}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hiệu suất R&D</CardTitle>
                    <CardDescription>Đánh giá và metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Tỷ lệ thành công dự án</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <Progress value={78} />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Thời gian TB hoàn thành</span>
                          <span className="text-sm font-medium">18 tháng</span>
                        </div>
                        <Progress value={65} />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">ROI trung bình</span>
                          <span className="text-sm font-medium text-primary">285%</span>
                        </div>
                        <Progress value={85} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="innovation">
            <div className="space-y-6">
              {/* Innovation Pipeline Overview */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Lightbulb className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">{currentData.innovation.ideas.submitted}</div>
                    <p className="text-sm text-muted-foreground">Ý tưởng gửi</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Eye className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{currentData.innovation.ideas.inReview}</div>
                    <p className="text-sm text-muted-foreground">Đang đánh giá</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Rocket className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{currentData.innovation.ideas.inDevelopment}</div>
                    <p className="text-sm text-muted-foreground">Đang phát triển</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <CheckCircle2 className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">{currentData.innovation.ideas.implemented}</div>
                    <p className="text-sm text-muted-foreground">Đã triển khai</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <BarChart3 className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">{currentData.innovation.roi}%</div>
                    <p className="text-sm text-muted-foreground">ROI trung bình</p>
                  </CardContent>
                </Card>
              </div>

              {/* Innovation Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Phân loại đổi mới theo lĩnh vực</CardTitle>
                  <CardDescription>Phân bổ ý tưởng theo từng lĩnh vực</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentData.innovation.categories.map((category, i) => (
                      <div key={i} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium">{category.name}</h4>
                          <Badge className="bg-primary/10 text-primary">{category.count} ý tưởng</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Đã triển khai</span>
                            <span className="font-medium text-primary">{category.implemented}</span>
                          </div>
                          <Progress value={(category.implemented / category.count) * 100} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            Tỷ lệ thành công: {Math.round((category.implemented / category.count) * 100)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Ideas */}
              <Card>
                <CardHeader>
                  <CardTitle>Ý tưởng nổi bật</CardTitle>
                  <CardDescription>Những ý tưởng được đánh giá cao nhất</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentData.innovation.topIdeas.map((idea) => (
                      <div key={idea.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-lg">{idea.title}</h4>
                            <p className="text-sm text-muted-foreground">Đề xuất bởi: {idea.submitter}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={idea.potential === "Cao" ? "default" : "secondary"}>
                              {idea.potential} Tiềm năng
                            </Badge>
                            <p className="text-sm font-medium mt-1">{idea.votes} votes</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={idea.status === "Đã triển khai" ? "default" : "outline"}>
                            {idea.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Innovation Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Hiệu suất đổi mới</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Tỷ lệ thành công</span>
                          <span className="text-sm font-medium text-primary">{currentData.innovation.successRate}%</span>
                        </div>
                        <Progress value={currentData.innovation.successRate} />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Thời gian TB triển khai</span>
                          <span className="text-sm font-medium">6 tháng</span>
                        </div>
                        <Progress value={70} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tác động kinh doanh</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{currentData.innovation.roi}%</div>
                        <p className="text-sm text-muted-foreground">ROI trung bình</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">85%</div>
                        <p className="text-sm text-muted-foreground">Hài lòng NV tham gia</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Xu hướng đổi mới</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Digital Innovation</span>
                        <span className="font-medium text-primary">+45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Sustainability</span>
                        <span className="font-medium text-primary">+32%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Process Improvement</span>
                        <span className="font-medium">+18%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="space-y-6">
              {/* AI Analytics Overview */}
              <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    AI Analytics & Insights Dashboard
                  </CardTitle>
                  <CardDescription>Phân tích thông minh với AI xuyên suốt BMC → F1 → F2 → F3 → F4 → F5</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">96.5%</div>
                      <p className="text-sm text-muted-foreground">AI Accuracy Score</p>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">+28%</div>
                      <p className="text-sm text-muted-foreground">Dự báo tăng trưởng</p>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold">24</div>
                      <p className="text-sm text-muted-foreground">Risk Alerts</p>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">15</div>
                      <p className="text-sm text-muted-foreground">Cơ hội được phát hiện</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cross-Organizational Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Hiệu suất xuyên tổ chức BMC → F5</CardTitle>
                  <CardDescription>So sánh hiệu suất chiến lược & R&D giữa các cấp độ</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["BMC", "F1", "F2", "F3", "F4", "F5"].map((level) => {
                      const levelData = {
                        BMC: { growth: 18.5, rnd: 28, innovation: 340, budget: 45000000000 },
                        F1: { growth: 15.2, rnd: 22, innovation: 285, budget: 18000000000 },
                        F2: { growth: 12.8, rnd: 18, innovation: 195, budget: 12000000000 },
                        F3: { growth: 8.5, rnd: 12, innovation: 145, budget: 6000000000 },
                        F4: { growth: 6.2, rnd: 8, innovation: 95, budget: 2400000000 },
                        F5: { growth: 4.8, rnd: 5, innovation: 65, budget: 850000000 }
                      }[level];
                      return (
                        <div key={level} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
                          <div className="font-medium">{level}</div>
                          <div>
                            <p className="text-xs text-muted-foreground">Tăng trưởng</p>
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-bold text-primary">{levelData.growth}%</div>
                              <Progress value={levelData.growth * 5} className="flex-1 h-2" />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">R&D Projects</p>
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-bold">{levelData.rnd}</div>
                              <Progress value={levelData.rnd * 3.5} className="flex-1 h-2" />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Innovation ROI</p>
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-bold text-primary">{levelData.innovation}%</div>
                              <Progress value={levelData.innovation / 4} className="flex-1 h-2" />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Budget</p>
                            <div className="text-sm font-bold">{(levelData.budget / 1000000000).toFixed(0)}B VNĐ</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Reports Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Strategic Performance Report */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Báo cáo hiệu suất chiến lược
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Tăng trưởng doanh thu</span>
                        <div className="text-right">
                          <div className="font-medium text-primary">{currentData.strategy.kpis.revenueGrowth}%</div>
                          <Badge className="text-xs bg-primary/10 text-primary">+2.5% vs Q-1</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Thị phần</span>
                        <div className="text-right">
                          <div className="font-medium">{currentData.strategy.kpis.marketShare}%</div>
                          <Badge className="text-xs" variant="secondary">+1.2% vs năm trước</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Hài lòng khách hàng</span>
                        <div className="text-right">
                          <div className="font-medium text-primary">{currentData.strategy.kpis.customerSat}%</div>
                          <Badge className="text-xs bg-primary/10 text-primary">Excellent</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Lợi nhuận ròng</span>
                        <div className="text-right">
                          <div className="font-medium">{currentData.strategy.kpis.profitMargin}%</div>
                          <Badge className="text-xs" variant="secondary">+0.8% vs Q-1</Badge>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-4">
                      <Download className="w-4 h-4 mr-2" />
                      Xuất báo cáo chi tiết
                    </Button>
                  </CardContent>
                </Card>

                {/* R&D Performance Report */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FlaskConical className="h-4 w-4" />
                      Báo cáo R&D Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Dự án hoạt động</span>
                        <div className="text-right">
                          <div className="font-medium text-primary">{currentData.rnd.projects.active}</div>
                          <Badge className="text-xs bg-primary/10 text-primary">+{Math.round(currentData.rnd.projects.active * 0.2)} dự án mới</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Bằng sáng chế</span>
                        <div className="text-right">
                          <div className="font-medium">{currentData.rnd.patents.granted}</div>
                          <Badge className="text-xs" variant="secondary">{currentData.rnd.patents.filed} đang chờ</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">ROI trung bình</span>
                        <div className="text-right">
                          <div className="font-medium text-primary">285%</div>
                          <Badge className="text-xs bg-primary/10 text-primary">High Performance</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Ngân sách sử dụng</span>
                        <div className="text-right">
                          <div className="font-medium">78%</div>
                          <Progress value={78} className="w-16 h-2 mt-1" />
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-4">
                      <Download className="w-4 h-4 mr-2" />
                      Xuất báo cáo R&D
                    </Button>
                  </CardContent>
                </Card>

                {/* Innovation & Market Research Report */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Báo cáo đổi mới & nghiên cứu
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Ý tưởng triển khai</span>
                        <div className="text-right">
                          <div className="font-medium text-primary">{currentData.innovation.ideas.implemented}</div>
                          <Badge className="text-xs bg-primary/10 text-primary">{currentData.innovation.successRate}% thành công</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Innovation ROI</span>
                        <div className="text-right">
                          <div className="font-medium">{currentData.innovation.roi}%</div>
                          <Badge className="text-xs" variant="secondary">+45% vs năm trước</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Market Insights</span>
                        <div className="text-right">
                          <div className="font-medium text-primary">{currentData.research.insights.length}</div>
                          <Badge className="text-xs bg-primary/10 text-primary">High Confidence</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Trend Analysis</span>
                        <div className="text-right">
                          <div className="font-medium">{currentData.research.trends.length}</div>
                          <Badge className="text-xs" variant="secondary">Active Monitoring</Badge>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-4">
                      <Download className="w-4 h-4 mr-2" />
                      Xuất báo cáo đổi mới
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* AI-Powered Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    AI Strategic Recommendations
                  </CardTitle>
                  <CardDescription>Khuyến nghị chiến lược được hỗ trợ bởi AI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Cơ hội tăng trưởng</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3 p-3 border rounded-lg bg-primary/5">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Mở rộng thị trường Đông Nam Á</p>
                            <p className="text-xs text-muted-foreground">Tiềm năng tăng 35% doanh thu trong 18 tháng</p>
                            <Badge className="text-xs mt-1 bg-primary/10 text-primary">95% Confidence</Badge>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 border rounded-lg bg-primary/5">
                          <Rocket className="h-4 w-4 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Đầu tư AI & Automation</p>
                            <p className="text-xs text-muted-foreground">Giảm chi phí vận hành 25%, tăng hiệu suất 40%</p>
                            <Badge className="text-xs mt-1 bg-primary/10 text-primary">92% Confidence</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Cảnh báo rủi ro</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3 p-3 border rounded-lg bg-destructive/5">
                          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Cạnh tranh từ startup công nghệ</p>
                            <p className="text-xs text-muted-foreground">Nguy cơ mất 12% thị phần trong 24 tháng</p>
                            <Badge variant="destructive" className="text-xs mt-1">High Risk</Badge>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 border rounded-lg bg-yellow-50 border-yellow-200">
                          <Globe className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Thay đổi xu hướng tiêu dùng</p>
                            <p className="text-xs text-muted-foreground">Gen Z ưa tiên sản phẩm bền vững (+40%)</p>
                            <Badge variant="outline" className="text-xs mt-1 border-yellow-300 text-yellow-700">Medium Risk</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Executive Summary Export */}
              <Card>
                <CardHeader>
                  <CardTitle>Executive Summary & Export Options</CardTitle>
                  <CardDescription>Báo cáo tổng hợp và tùy chọn xuất dữ liệu</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Báo cáo PDF
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Dashboard Excel
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      AI Analysis Report
                    </Button>
                    <Button className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Gửi BOD
                    </Button>
                  </div>
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Tổng kết:</strong> {orgInfo.name} đang có hiệu suất tốt với tăng trưởng {currentData.strategy.kpis.revenueGrowth}% 
                      và {currentData.rnd.projects.active} dự án R&D đang triển khai. 
                      AI khuyến nghị tập trung vào mở rộng thị trường và đầu tư công nghệ để duy trì lợi thế cạnh tranh.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}