import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BarChart3, PieChart, TrendingUp, TrendingDown, Building2, Globe, Users, DollarSign, Target, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Enhanced Drill-Down Analytics Data
const drillDownData = {
  revenueAnalysis: {
    byCluster: [
      { name: "F&B Cluster", revenue: 420000000000, growth: 15.2, marketShare: 34.7, employees: 2450 },
      { name: "Tech Cluster", revenue: 310000000000, growth: 28.7, marketShare: 25.6, employees: 1320 },
      { name: "Jewelry Cluster", revenue: 320000000000, growth: 18.5, marketShare: 26.4, employees: 600 },
      { name: "Education Cluster", revenue: 160000000000, growth: 12.1, marketShare: 13.3, employees: 830 }
    ],
    byGeography: [
      { region: "Vietnam", revenue: 890000000000, growth: 12.3, share: 73.6, risk: "Low" },
      { region: "Thailand", revenue: 180000000000, growth: 25.7, share: 14.9, risk: "Medium" },
      { region: "Singapore", revenue: 85000000000, growth: 18.2, share: 7.0, risk: "Low" },
      { region: "Malaysia", revenue: 55000000000, growth: 22.1, share: 4.5, risk: "Medium" }
    ]
  },
  profitabilityAnalysis: {
    byProduct: [
      { category: "Premium F&B", margin: 35.2, volume: "2.4M units", trend: "up" },
      { category: "Tech Solutions", margin: 42.8, volume: "890K licenses", trend: "up" },
      { category: "Luxury Jewelry", margin: 55.6, volume: "45K pieces", trend: "stable" },
      { category: "Education Services", margin: 28.4, volume: "12K students", trend: "up" }
    ],
    costs: [
      { type: "Raw Materials", amount: 340000000000, percentage: 28.1, trend: "up" },
      { type: "Labor", amount: 280000000000, percentage: 23.1, trend: "stable" },
      { type: "Technology", amount: 150000000000, percentage: 12.4, trend: "up" },
      { type: "Marketing", amount: 95000000000, percentage: 7.9, trend: "down" }
    ]
  },
  operationalMetrics: {
    efficiency: [
      { metric: "Production Efficiency", value: 94.2, target: 95.0, status: "approaching" },
      { metric: "Supply Chain Reliability", value: 97.8, target: 96.0, status: "exceeded" },
      { metric: "Customer Satisfaction", value: 92.6, target: 90.0, status: "exceeded" },
      { metric: "Employee Productivity", value: 89.3, target: 88.0, status: "exceeded" }
    ],
    risks: [
      { category: "Market Risk", level: "Medium", impact: "15%", mitigation: "Diversification" },
      { category: "Operational Risk", level: "Low", impact: "8%", mitigation: "Automation" },
      { category: "Financial Risk", level: "Low", impact: "12%", mitigation: "Hedging" },
      { category: "Regulatory Risk", level: "Medium", impact: "18%", mitigation: "Compliance" }
    ]
  }
};

export default function DrillDownAnalytics() {
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000000) return `${(amount / 1000000000000).toFixed(1)}T`;
    if (amount >= 1000000000) return `${(amount / 1000000000).toFixed(0)}B`;
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(0)}M`;
    return amount.toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "exceeded": return "text-primary";
      case "approaching": return "text-accent";
      default: return "text-muted-foreground";
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "High": return "text-destructive";
      case "Medium": return "text-accent";
      case "Low": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
            <div>
              <h1 className="font-semibold">Drill-Down Analytics</h1>
              <p className="text-sm text-muted-foreground">Phân tích sâu BMC Holdings Ecosystem</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">BMC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto py-6 space-y-8">
        <div className="text-center space-y-4">
          <Badge variant="outline" className="border-primary/30 text-primary">
            <BarChart3 className="w-3 h-3 mr-1" />
            Advanced Analytics Dashboard
          </Badge>
          
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            PHÂN TÍCH DRILL-DOWN BMC HOLDINGS
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Phân tích chi tiết hiệu suất, lợi nhuận và rủi ro từng cấp độ tổ chức
          </p>
        </div>

        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="revenue">Phân tích Doanh thu</TabsTrigger>
            <TabsTrigger value="profitability">Phân tích Lợi nhuận</TabsTrigger>
            <TabsTrigger value="operations">Vận hành & Rủi ro</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Doanh thu theo Cụm ngành
                  </CardTitle>
                  <CardDescription>Phân tích chi tiết hiệu suất từng cụm ngành</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {drillDownData.revenueAnalysis.byCluster.map((cluster) => (
                    <div key={cluster.name} className="space-y-3 p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">{cluster.name}</h4>
                        <Badge variant="secondary">{cluster.marketShare}% thị phần</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Doanh thu</p>
                          <p className="font-semibold text-primary">{formatCurrency(cluster.revenue)} VNĐ</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Tăng trưởng</p>
                          <p className="font-semibold text-accent">+{cluster.growth}%</p>
                        </div>
                      </div>
                      
                      <Progress value={cluster.growth} className="h-2" />
                      
                      <div className="text-xs text-muted-foreground">
                        {cluster.employees.toLocaleString()} nhân viên
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Doanh thu theo Địa lý
                  </CardTitle>
                  <CardDescription>Phân tích thị trường theo khu vực</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {drillDownData.revenueAnalysis.byGeography.map((geo) => (
                    <div key={geo.region} className="space-y-3 p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">{geo.region}</h4>
                        <Badge className={getRiskColor(geo.risk)}>
                          Rủi ro {geo.risk}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Doanh thu</p>
                          <p className="font-semibold text-primary">{formatCurrency(geo.revenue)} VNĐ</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Tăng trưởng</p>
                          <p className="font-semibold text-accent">+{geo.growth}%</p>
                        </div>
                      </div>
                      
                      <Progress value={geo.share} className="h-2" />
                      
                      <div className="text-xs text-muted-foreground">
                        {geo.share}% tổng doanh thu tập đoàn
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profitability" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Lợi nhuận theo Sản phẩm
                  </CardTitle>
                  <CardDescription>Biên lợi nhuận chi tiết từng danh mục</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {drillDownData.profitabilityAnalysis.byProduct.map((product) => (
                    <div key={product.category} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-semibold">{product.category}</h4>
                        <p className="text-sm text-muted-foreground">{product.volume}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">{product.margin}%</span>
                        {product.trend === "up" ? (
                          <ArrowUpRight className="w-4 h-4 text-primary" />
                        ) : product.trend === "down" ? (
                          <ArrowDownRight className="w-4 h-4 text-destructive" />
                        ) : (
                          <Activity className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Cơ cấu Chi phí
                  </CardTitle>
                  <CardDescription>Phân tích chi phí vận hành chi tiết</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {drillDownData.profitabilityAnalysis.costs.map((cost) => (
                    <div key={cost.type} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{cost.type}</span>
                        <div className="text-right">
                          <div className="font-semibold">{formatCurrency(cost.amount)} VNĐ</div>
                          <div className="text-xs text-muted-foreground">{cost.percentage}%</div>
                        </div>
                      </div>
                      <Progress value={cost.percentage} className="h-2" />
                      <div className="flex items-center gap-1 text-xs">
                        {cost.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 text-destructive" />
                        ) : cost.trend === "down" ? (
                          <TrendingDown className="w-3 h-3 text-primary" />
                        ) : (
                          <Activity className="w-3 h-3 text-muted-foreground" />
                        )}
                        <span className="text-muted-foreground">Xu hướng: {cost.trend}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Hiệu suất Vận hành
                  </CardTitle>
                  <CardDescription>KPIs chính và mục tiêu đạt được</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {drillDownData.operationalMetrics.efficiency.map((metric) => (
                    <div key={metric.metric} className="space-y-2 p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">{metric.metric}</h4>
                        <Badge className={getStatusColor(metric.status)}>
                          {metric.status}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Hiện tại: <span className="font-semibold">{metric.value}%</span></span>
                        <span>Mục tiêu: <span className="font-semibold">{metric.target}%</span></span>
                      </div>
                      
                      <Progress value={metric.value} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Ma trận Rủi ro
                  </CardTitle>
                  <CardDescription>Đánh giá và quản lý rủi ro tổ chức</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {drillDownData.operationalMetrics.risks.map((risk) => (
                    <div key={risk.category} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-semibold">{risk.category}</h4>
                        <p className="text-sm text-muted-foreground">Tác động: {risk.impact}</p>
                        <p className="text-xs text-muted-foreground">Giảm thiểu: {risk.mitigation}</p>
                      </div>
                      <Badge className={getRiskColor(risk.level)}>
                        {risk.level}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Summary Actions */}
            <Card className="glow-card">
              <CardHeader>
                <CardTitle>Hành động Khuyến nghị</CardTitle>
                <CardDescription>Dựa trên phân tích drill-down data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                    <Target className="w-5 h-5" />
                    <span className="text-sm font-medium">Tối ưu hóa Chi phí</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm font-medium">Tăng Hiệu suất</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                    <Globe className="w-5 h-5" />
                    <span className="text-sm font-medium">Mở rộng Thị trường</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}