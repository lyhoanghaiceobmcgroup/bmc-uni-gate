import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  Target, 
  Globe, 
  TrendingUp, 
  Users, 
  Building2, 
  DollarSign, 
  MapPin, 
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  FileText
} from "lucide-react";

// Strategic Mission & Global Expansion Mockup Data
const strategicData = {
  missions: [
    {
      id: "SM-2024-001",
      title: "Mở rộng thị trường F&B Đông Nam Á",
      cluster: "F&B Cluster",
      priority: "High",
      status: "In Progress",
      progress: 75,
      deadline: "Q4 2024",
      budget: "450B VNĐ",
      roi: "25.3%",
      assignee: "CEO F&B Cluster",
      countries: ["Thailand", "Singapore", "Malaysia"],
      kpis: {
        marketPenetration: "15%",
        newStores: "24/30",
        revenue: "+180B VNĐ"
      }
    },
    {
      id: "SM-2024-002", 
      title: "Chuyển đổi số toàn tập đoàn",
      cluster: "Tech Cluster",
      priority: "Critical",
      status: "Active",
      progress: 60,
      deadline: "Q2 2025",
      budget: "680B VNĐ",
      roi: "31.7%",
      assignee: "CTO BMC Holdings",
      countries: ["Vietnam", "Regional Offices"],
      kpis: {
        digitalAdoption: "78%",
        aiIntegration: "12/18 modules",
        efficiency: "+23%"
      }
    },
    {
      id: "SM-2024-003",
      title: "Phát triển chuỗi giáo dục quốc tế",
      cluster: "Education Cluster", 
      priority: "Medium",
      status: "Planning",
      progress: 35,
      deadline: "Q1 2025",
      budget: "320B VNĐ",
      roi: "19.8%",
      assignee: "Director Education",
      countries: ["Cambodia", "Laos", "Myanmar"],
      kpis: {
        newCampuses: "3/8",
        students: "2,400 enrolled",
        partnerships: "5 universities"
      }
    },
    {
      id: "SM-2024-004",
      title: "Mở rộng chuỗi trang sức cao cấp",
      cluster: "Jewelry Cluster (GAJ)",
      priority: "High",
      status: "In Progress", 
      progress: 80,
      deadline: "Q3 2024",
      budget: "280B VNĐ",
      roi: "28.9%",
      assignee: "CEO GAJ Holdings",
      countries: ["Japan", "South Korea", "Taiwan"],
      kpis: {
        boutiques: "18/22",
        luxuryIndex: "Top 10",
        revenue: "+220B VNĐ"
      }
    }
  ],
  globalExpansion: {
    currentMarkets: ["Vietnam", "Thailand", "Singapore", "Malaysia"],
    targetMarkets: ["Japan", "South Korea", "Indonesia", "Philippines", "Myanmar", "Cambodia", "Laos"],
    investmentBudget: "1.8T VNĐ",
    timeline: "2024-2026",
    expectedROI: "24.5%",
    riskLevel: "Medium"
  },
  drillDownAnalytics: {
    revenueByMarket: [
      { market: "Vietnam", revenue: "890B", growth: 12.3, share: 73.6 },
      { market: "Thailand", revenue: "180B", growth: 25.7, share: 14.9 },
      { market: "Singapore", revenue: "85B", growth: 18.2, share: 7.0 },
      { market: "Malaysia", revenue: "55B", growth: 22.1, share: 4.5 }
    ],
    profitabilityByCluster: [
      { cluster: "F&B", margin: 21.4, trend: "up" },
      { cluster: "Tech", margin: 20.9, trend: "up" },
      { cluster: "Education", margin: 21.8, trend: "stable" },
      { cluster: "Jewelry", margin: 18.7, trend: "up" }
    ]
  }
};

export const StrategicDashboard = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("missions");

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'expansion') {
      setActiveTab('expansion');
    }
  }, [searchParams]);

  const formatCurrency = (amount: string) => {
    const num = parseInt(amount.replace(/[^0-9]/g, ''));
    if (num >= 1000000000000) return `${(num / 1000000000000).toFixed(1)}T`;
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(0)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(0)}M`;
    return num.toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-primary text-primary-foreground";
      case "In Progress": return "bg-accent text-accent-foreground";
      case "Planning": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "text-destructive border-destructive/30";
      case "High": return "text-accent border-accent/30";
      case "Medium": return "text-primary border-primary/30";
      default: return "text-muted-foreground border-muted/30";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="outline" className="border-primary/30 text-primary">
          <Target className="w-3 h-3 mr-1" />
          Strategic Management Dashboard
        </Badge>
        
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
          QUẢN LÝ CHIẾN LƯỢC & MỞ RỘNG TOÀN CẦU
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Giao nhiệm vụ chiến lược, theo dõi tiến độ và phân tích hiệu suất mở rộng thị trường quốc tế
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="missions">Nhiệm vụ Chiến lược</TabsTrigger>
          <TabsTrigger value="expansion">Mở rộng Toàn cầu</TabsTrigger>
          <TabsTrigger value="analytics">Drill-Down Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="missions" className="space-y-6">
          {/* Mission Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glow-card border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tổng Nhiệm vụ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{strategicData.missions.length}</div>
                <p className="text-xs text-muted-foreground">Đang thực hiện</p>
              </CardContent>
            </Card>

            <Card className="glow-card border-accent/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tiến độ Trung bình</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">
                  {Math.round(strategicData.missions.reduce((acc, m) => acc + m.progress, 0) / strategicData.missions.length)}%
                </div>
                <p className="text-xs text-muted-foreground">Hoàn thành</p>
              </CardContent>
            </Card>

            <Card className="glow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tổng Ngân sách</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.73T VNĐ</div>
                <p className="text-xs text-muted-foreground">Đã phân bổ</p>
              </CardContent>
            </Card>

            <Card className="glow-card border-destructive/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">ROI Dự kiến</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">26.4%</div>
                <p className="text-xs text-muted-foreground">Trung bình</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Mission Cards */}
          <div className="space-y-6">
            {strategicData.missions.map((mission) => (
              <Card key={mission.id} className="glow-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getPriorityColor(mission.priority)}>
                          {mission.priority}
                        </Badge>
                        <Badge className={getStatusColor(mission.status)}>
                          {mission.status}
                        </Badge>
                      </div>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        {mission.title}
                      </CardTitle>
                      <CardDescription>
                        {mission.cluster} • Mã: {mission.id} • Phụ trách: {mission.assignee}
                      </CardDescription>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-sm text-muted-foreground">Deadline</div>
                      <div className="font-semibold">{mission.deadline}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tiến độ thực hiện</span>
                      <span className="font-semibold">{mission.progress}%</span>
                    </div>
                    <Progress value={mission.progress} className="h-3" />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Tài chính</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Ngân sách</p>
                          <p className="font-semibold text-primary">{mission.budget}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">ROI dự kiến</p>
                          <p className="font-semibold text-accent">{mission.roi}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Thị trường mục tiêu</h4>
                      <div className="flex flex-wrap gap-2">
                        {mission.countries.map((country) => (
                          <Badge key={country} variant="secondary" className="text-xs">
                            <MapPin className="w-3 h-3 mr-1" />
                            {country}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">KPIs chính</h4>
                      <div className="space-y-2 text-sm">
                        {Object.entries(mission.kpis).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Activity className="w-4 h-4 mr-2" />
                        Cập nhật tiến độ
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Xem chi tiết
                      </Button>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-primary to-primary-glow">
                      Quản lý nhiệm vụ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="expansion" className="space-y-6">
          {/* Global Expansion Overview */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Kế hoạch Mở rộng Toàn cầu
                </CardTitle>
                <CardDescription>Chiến lược phát triển thị trường 2024-2026</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Ngân sách đầu tư</p>
                    <p className="text-xl font-bold text-primary">{strategicData.globalExpansion.investmentBudget}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ROI dự kiến</p>
                    <p className="text-xl font-bold text-accent">{strategicData.globalExpansion.expectedROI}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold mb-2">Thị trường hiện tại</h4>
                  <div className="flex flex-wrap gap-2">
                    {strategicData.globalExpansion.currentMarkets.map((market) => (
                      <Badge key={market} className="bg-primary/10 text-primary border-primary/20">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {market}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Thị trường mục tiêu</h4>
                  <div className="flex flex-wrap gap-2">
                    {strategicData.globalExpansion.targetMarkets.map((market) => (
                      <Badge key={market} variant="outline" className="border-accent/30 text-accent">
                        <Clock className="w-3 h-3 mr-1" />
                        {market}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-card">
              <CardHeader>
                <CardTitle>Timeline & Rủi ro</CardTitle>
                <CardDescription>Phân tích thời gian và đánh giá rủi ro</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Phase 1: ASEAN Expansion</span>
                    <Badge variant="secondary">Q3-Q4 2024</Badge>
                  </div>
                  <Progress value={65} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Phase 2: East Asia Entry</span>
                    <Badge variant="outline">Q1-Q2 2025</Badge>
                  </div>
                  <Progress value={25} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Phase 3: Market Consolidation</span>
                    <Badge variant="outline">Q3-Q4 2025</Badge>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Đánh giá rủi ro</h4>
                  <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-accent" />
                      <span>Rủi ro tổng thể</span>
                    </div>
                    <Badge className="bg-accent/10 text-accent">{strategicData.globalExpansion.riskLevel}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Drill-Down Analytics */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Doanh thu theo Thị trường
                </CardTitle>
                <CardDescription>Phân tích chi tiết hiệu suất từng thị trường</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {strategicData.drillDownAnalytics.revenueByMarket.map((market) => (
                  <div key={market.market} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{market.market}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{market.revenue} VNĐ</div>
                        <div className="text-xs text-accent">+{market.growth}%</div>
                      </div>
                    </div>
                    <Progress value={market.share} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Thị phần: {market.share}%
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Lợi nhuận theo Cụm ngành
                </CardTitle>
                <CardDescription>Biên lợi nhuận và xu hướng phát triển</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {strategicData.drillDownAnalytics.profitabilityByCluster.map((cluster) => (
                  <div key={cluster.cluster} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{cluster.cluster} Cluster</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{cluster.margin}%</span>
                      {cluster.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4 text-primary" />
                      ) : cluster.trend === "down" ? (
                        <ArrowDownRight className="w-4 h-4 text-destructive" />
                      ) : (
                        <Activity className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Export & Actions */}
          <Card className="glow-card">
            <CardHeader>
              <CardTitle>Xuất Báo cáo & Hành động</CardTitle>
              <CardDescription>Tạo báo cáo chi tiết và thực hiện các hành động quản lý</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <FileText className="w-5 h-5" />
                  <span className="text-sm font-medium">Xuất báo cáo Excel</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-sm font-medium">Dashboard tương tác</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Target className="w-5 h-5" />
                  <span className="text-sm font-medium">Giao nhiệm vụ mới</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};