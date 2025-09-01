import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ArrowLeft, 
  Building2, 
  DollarSign, 
  Users, 
  TrendingUp, 
  BarChart3, 
  MessageSquare,
  Download,
  Plus,
  ArrowUp,
  PieChart,
  Shield,
  Cog,
  Target,
  Activity,
  Globe,
  X,
  Save,
  Check
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface F2HoldingViewProps {
  onBack: () => void;
  holdingData: any;
}

// Mock data cho F2 Holding với consolidated data từ nhiều F3
const mockF2Holding = {
  id: "F2_FNB_001",
  name: "BMC F&B Holding - Công ty Ngành F&B",
  level: "F2",
  type: "sector_company",
  sector: "Food & Beverage Industry",
  establishedDate: "2019-05-20",
  taxCode: "0101234567",
  legalRepresentative: "Lý Hoàng Hải",
  bmcOwnership: 65.8,
  partnerOwnership: 34.2,
  currentValuation: 850000000000,
  autoTieringStatus: "eligible", // đạt 65% > 55% để lên F1
  nextTierTarget: "F1",
  tieringProgress: 95,
  
  // Consolidated từ nhiều F3 companies - RESET TO 0
  quarterlyRevenue: 0,
  quarterlyExpense: 0,
  quarterlyProfit: 0,
  totalStaff: 0,
  avgKPI: 0,
  complianceScore: 0,
  
  // Quỹ ngành - RESET TO 0
  sectorFund: {
    total: 0,
    allocated: 0,
    available: 0,
    roi: 0
  },
  
  // F3 Companies trực thuộc
  f3Companies: [
    {
      id: "F3_RAN_001",
      name: "RAN Café Strategic Co.",
      bmcOwnership: 0,
      quarterlyRevenue: 0,
      profit: 0,
      staff: 0,
      kpi: 0,
      f4Branches: 0,
      status: "strong"
    },
    {
      id: "F3_FRESH_001", 
      name: "Fresh Food Strategic Co.",
      bmcOwnership: 0,
      quarterlyRevenue: 0,
      profit: 0,
      staff: 0,
      kpi: 0,
      f4Branches: 0,
      status: "strong"
    },
    {
      id: "F3_BEVERAGE_001",
      name: "Beverage Innovation Co.",
      bmcOwnership: 0,
      quarterlyRevenue: 0,
      profit: 0,
      staff: 0,
      kpi: 0,
      f4Branches: 0,
      status: "developing"
    }
  ],
  
  // F5 Startups trong hệ sinh thái
  f5Startups: [
    {
      id: "F5_COLD_001",
      name: "ColdBrew Vietnam Startup",
      bmcOwnership: 0,
      monthlyRevenue: 0,
      staff: 0,
      kpi: 0,
      stage: "growth"
    }
  ],
  
  // 9 phòng ban consolidated
  departments: {
    shareholders: {
      bmcShares: 65.8,
      partnerShares: 34.2,
      boardMembers: 7,
      lastMeeting: "2024-01-20",
      dividendYield: 8.5,
      sectorFundContribution: 15000000000
    },
    business: {
      totalRevenue: 0,
      brandPortfolio: 0,
      marketShare: 0, // % thị trường F&B VN
      customerBase: 0,
      marketingROI: 0,
      topChannels: ["Retail stores", "E-commerce", "B2B wholesale", "Export"]
    },
    finance: {
      cashPosition: 0,
      debt: 0,
      equity: 0,
      debtToEquity: 0,
      profitMargin: 0,
      workingCapital: 0
    },
    hr: {
      totalEmployees: 0,
      managementLevels: {
        "C-level": 0,
        "Director": 0,
        "Manager": 0,
        "Staff": 0
      },
      avgKPI: 0,
      leadershipProgram: 0,
      crossTraining: 0
    },
    warehouse: {
      totalFacilities: 0,
      storageCapacity: 0, // m3
      utilizationRate: 0,
      distributionCenters: 0,
      coldStorage: 0 // m3
    },
    strategy: {
      activeProjects: 0,
      rdBudget: 0,
      marketExpansion: ["Indonesia", "Thailand", "Philippines"],
      acquisitionPipeline: 0,
      innovationLabs: 0
    },
    technology: {
      systemUptime: 0,
      cloudInfrastructure: "Multi-cloud",
      digitalTransformation: 0, // % complete
      dataAnalytics: "Advanced",
      cybersecurity: 0
    },
    legal: {
      activeContracts: 0,
      internationalAgreements: 0,
      complianceScore: 0,
      riskManagement: "enterprise-level",
      litigationActive: 0
    },
    investment: {
      totalPortfolio: 0,
      f3Investments: 0,
      f5Ventures: 0,
      externalFunds: 0,
      roi: 0,
      irr: 0
    }
  }
};

export function F2HoldingView({ onBack, holdingData }: F2HoldingViewProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTimeframe, setSelectedTimeframe] = useState("quarter");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportData, setReportData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const holding = mockF2Holding;

  // Load draft data on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(`f2_report_draft_${holding.id}`);
    if (savedDraft) {
      try {
        setReportData(JSON.parse(savedDraft));
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, [holding.id]);

  // Save draft function
  const handleSaveDraft = async () => {
    setSavingDraft(true);
    try {
      localStorage.setItem(`f2_report_draft_${holding.id}`, JSON.stringify(reportData));
      toast({
        title: "Đã lưu nháp",
        description: "Dữ liệu báo cáo đã được lưu tạm thời."
      });
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu nháp. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setSavingDraft(false);
    }
  };

  // Submit report function
  const handleReportSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Save to Supabase
      const { data: supabaseData, error } = await supabase
        .from('company_reports')
        .insert({
          company_id: holding.id,
          company_name: holding.name,
          report_date: new Date().toISOString().split('T')[0],
          revenue: reportData.revenue || 0,
          employee_count: reportData.employeeCount || 0,
          kpi_score: reportData.kpiScore || 0,
          status: 'active',
          organizational_level: 'F2',
          created_by: user?.id || 'system',
          updated_at: new Date().toISOString(),
          report_data: reportData
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Báo cáo đã được gửi",
        description: "Dữ liệu đã được đồng bộ thành công với hệ thống."
      });

      // Clear draft and close modal
      localStorage.removeItem(`f2_report_draft_${holding.id}`);
      setReportData({});
      setIsReportModalOpen(false);
      
    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Lỗi",
        description: "Không thể gửi báo cáo. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)} tỷ`;
    }
    return `${(amount / 1000000).toFixed(0)} triệu`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại tổng quan
          </Button>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>🌐 BMC Holdings</span>
              <span>→</span>
              <span>🏢 F1 Cụm F&B</span>
              <span>→</span>
              <Badge variant="secondary">🏭 F2 BMC F&B Holding</Badge>
            </div>
            <h1 className="text-2xl font-semibold text-foreground">{holding.name}</h1>
            <p className="text-muted-foreground">
              {holding.sector} • MST: {holding.taxCode} • Vốn góp BMC: {holding.bmcOwnership}%
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Thêm F3 Company
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsReportModalOpen(true)}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Báo cáo
          </Button>
          <Button className="bg-gradient-primary">
            <MessageSquare className="h-4 w-4 mr-2" />
            🤖 AI Sector CEO
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 p-4 bg-card rounded-lg border">
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
        <Select defaultValue="sector-consolidated">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sector-consolidated">🏭 Hợp nhất ngành</SelectItem>
            <SelectItem value="f3-breakdown">🏢 Breakdown F3</SelectItem>
            <SelectItem value="market-analysis">📊 Phân tích thị trường</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all-functions">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-functions">🌐 Tất cả chức năng</SelectItem>
            <SelectItem value="finance">💰 Tài chính ngành</SelectItem>
            <SelectItem value="operations">⚙️ Vận hành</SelectItem>
            <SelectItem value="strategy">🎯 Chiến lược</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* F2 Sector Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-10 gap-3">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              BMC Ownership
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{holding.bmcOwnership}%</div>
            <p className="text-xs text-muted-foreground">{formatCurrency(holding.currentValuation * holding.bmcOwnership / 100)}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              Sector Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatCurrency(holding.quarterlyRevenue)}</div>
            <p className="text-xs text-green-600">+18% vs quý trước</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Sector Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatCurrency(holding.quarterlyProfit)}</div>
            <p className="text-xs text-muted-foreground">Margin {holding.departments.finance.profitMargin}%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Users className="h-3 w-3" />
              Total Workforce
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{holding.totalStaff}</div>
            <p className="text-xs text-muted-foreground">KPI: {holding.avgKPI}%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              F3 Companies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{holding.f3Companies.length}</div>
            <p className="text-xs text-muted-foreground">Companies</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-cyan-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Globe className="h-3 w-3" />
              Market Share
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{holding.departments.business.marketShare}%</div>
            <p className="text-xs text-green-600">Vietnam F&B</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <PieChart className="h-3 w-3" />
              Sector Fund
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatCurrency(holding.sectorFund.total)}</div>
            <p className="text-xs text-green-600">ROI: {holding.sectorFund.roi}%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{holding.complianceScore}%</div>
            <p className="text-xs text-green-600">Enterprise level</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-pink-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Cog className="h-3 w-3" />
              Digital Trans.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{holding.departments.technology.digitalTransformation}%</div>
            <p className="text-xs text-blue-600">Multi-cloud</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <ArrowUp className="h-3 w-3" />
              Tier Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{holding.tieringProgress}%</div>
            <p className="text-xs text-green-600">Ready for F1</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Sector Intelligence */}
      <Card className="border-l-4 border-l-gradient-primary bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            🤖 AI F2 Sector Intelligence - BMC F&B Holding
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-foreground">🏭 Sector Performance:</h4>
              <p className="text-sm text-muted-foreground">
                Hợp nhất {holding.f3Companies.length} công ty F3 với doanh thu ngành {formatCurrency(holding.quarterlyRevenue)}/quý. 
                Market share {holding.departments.business.marketShare}% thị trường F&B Việt Nam.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-green-600">🚀 Strategic Advantage:</h4>
              <p className="text-sm text-muted-foreground">
                Sẵn sàng thăng F1 với BMC ownership {holding.bmcOwnership}% {'>'}  55%. 
                Quỹ ngành {formatCurrency(holding.sectorFund.total)} ROI {holding.sectorFund.roi}%.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-blue-600">🌏 Expansion Opportunities:</h4>
              <p className="text-sm text-muted-foreground">
                Mở rộng {holding.departments.strategy.marketExpansion.join(", ")} với {holding.departments.strategy.acquisitionPipeline} M&A deals. 
                R&D budget {formatCurrency(holding.departments.strategy.rdBudget)}.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview">🏭 Sector Overview</TabsTrigger>
          <TabsTrigger value="f3-companies">🏢 F3 Companies</TabsTrigger>
          <TabsTrigger value="finance">💰 Sector Finance</TabsTrigger>
          <TabsTrigger value="operations">⚙️ Operations</TabsTrigger>
          <TabsTrigger value="strategy">🎯 Strategy</TabsTrigger>
          <TabsTrigger value="analytics">📊 Market Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🏭 Sector Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Tên công ty:</span>
                    <p className="text-muted-foreground">{holding.name}</p>
                  </div>
                  <div>
                    <span className="font-medium">Lĩnh vực:</span>
                    <p className="text-muted-foreground">{holding.sector}</p>
                  </div>
                  <div>
                    <span className="font-medium">Định giá ngành:</span>
                    <p className="text-muted-foreground">{formatCurrency(holding.currentValuation)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Market Share:</span>
                    <p className="text-muted-foreground">{holding.departments.business.marketShare}% VN</p>
                  </div>
                  <div>
                    <span className="font-medium">Cơ sở sản xuất:</span>
                    <p className="text-muted-foreground">{holding.departments.warehouse.totalFacilities} facilities</p>
                  </div>
                  <div>
                    <span className="font-medium">Customer Base:</span>
                    <p className="text-muted-foreground">{(holding.departments.business.customerBase / 1000000).toFixed(1)}M customers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>💰 Quỹ Ngành F&B</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Tổng Quỹ Ngành</p>
                      <p className="text-xs text-muted-foreground">Available for deployment</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">{formatCurrency(holding.sectorFund.total)}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Đã phân bổ:</span>
                      <p className="font-medium">{formatCurrency(holding.sectorFund.allocated)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Còn lại:</span>
                      <p className="font-medium">{formatCurrency(holding.sectorFund.available)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Fund Utilization:</span>
                      <span>{((holding.sectorFund.allocated / holding.sectorFund.total) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(holding.sectorFund.allocated / holding.sectorFund.total) * 100} className="h-2" />
                  </div>
                  
                  <div className="pt-2 border-t">
                    <span className="text-sm text-muted-foreground">Sector Fund ROI:</span>
                    <p className="text-lg font-bold text-green-600">{holding.sectorFund.roi}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="f3-companies" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">🏢 F3 Strategic Companies Portfolio</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add F3 Company
            </Button>
          </div>
          
          <div className="grid gap-4">
            {holding.f3Companies.map((company) => (
              <Card key={company.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">F3</Badge>
                      <div>
                        <h4 className="font-semibold">{company.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          BMC ownership: {company.bmcOwnership}% • {company.f4Branches} F4 branches
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        company.status === "strong" ? "bg-green-100 text-green-800" : 
                        company.status === "developing" ? "bg-blue-100 text-blue-800" : 
                        "bg-amber-100 text-amber-800"
                      }>
                        {company.status === "strong" ? "Strong" : 
                         company.status === "developing" ? "Developing" : "Watch"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Drill Down
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Quarterly Revenue:</span>
                      <p className="font-medium">{formatCurrency(company.quarterlyRevenue)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Quarterly Profit:</span>
                      <p className="font-medium text-green-600">{formatCurrency(company.profit)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Staff:</span>
                      <p className="font-medium">{company.staff} employees</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Avg KPI:</span>
                      <p className="font-medium">{company.kpi}%</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Profit Margin:</span>
                      <p className="font-medium">{((company.profit / company.quarterlyRevenue) * 100).toFixed(1)}%</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {company.kpi > holding.avgKPI ? "Above" : "Below"} average
                      </span>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={(company.profit / (holding.quarterlyProfit / holding.f3Companies.length)) * 100} 
                          className="h-2 w-24" 
                        />
                        <span className="text-xs">Contribution</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* F5 Startups in ecosystem */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🚀 F5 Startups in Ecosystem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {holding.f5Startups.map((startup) => (
                  <div key={startup.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">F5</Badge>
                      <div>
                        <p className="font-medium">{startup.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {startup.staff} people • Stage: {startup.stage}
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-medium">{formatCurrency(startup.monthlyRevenue * 3)}/Q</p>
                      <p className="text-muted-foreground">BMC {startup.bmcOwnership}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">💰 Sector P&L</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Revenue:</span>
                    <span className="font-medium">{formatCurrency(holding.quarterlyRevenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Expenses:</span>
                    <span className="font-medium">{formatCurrency(holding.quarterlyExpense)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Net Profit:</span>
                    <span className="font-bold text-green-600">{formatCurrency(holding.quarterlyProfit)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Profit Margin: {holding.departments.finance.profitMargin}%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">📊 Balance Sheet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Cash Position:</span>
                    <span className="font-medium">{formatCurrency(holding.departments.finance.cashPosition)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Equity:</span>
                    <span className="font-medium">{formatCurrency(holding.departments.finance.equity)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Debt:</span>
                    <span className="font-medium">{formatCurrency(holding.departments.finance.debt)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Debt/Equity:</span>
                    <span className="font-bold">{holding.departments.finance.debtToEquity}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">💼 Investment Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Portfolio:</span>
                    <span className="font-medium">{formatCurrency(holding.departments.investment.totalPortfolio)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">F3 Investments:</span>
                    <span className="font-medium">{formatCurrency(holding.departments.investment.f3Investments)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">External Funds:</span>
                    <span className="font-medium">{formatCurrency(holding.departments.investment.externalFunds)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Portfolio ROI:</span>
                    <span className="font-bold text-green-600">{holding.departments.investment.roi}%</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    IRR: {holding.departments.investment.irr}%
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🏭 Operations Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Total Facilities:</span>
                      <p className="text-muted-foreground">{holding.departments.warehouse.totalFacilities}</p>
                    </div>
                    <div>
                      <span className="font-medium">Storage Capacity:</span>
                      <p className="text-muted-foreground">{holding.departments.warehouse.storageCapacity.toLocaleString()} m³</p>
                    </div>
                    <div>
                      <span className="font-medium">Utilization Rate:</span>
                      <p className="text-muted-foreground">{holding.departments.warehouse.utilizationRate}%</p>
                    </div>
                    <div>
                      <span className="font-medium">Cold Storage:</span>
                      <p className="text-muted-foreground">{holding.departments.warehouse.coldStorage.toLocaleString()} m³</p>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <h4 className="font-medium mb-2">Distribution Centers:</h4>
                    <p className="text-sm text-muted-foreground">
                      {holding.departments.warehouse.distributionCenters} major centers covering North, Central, South Vietnam
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>👥 Human Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Management Structure:</h4>
                    <div className="space-y-2">
                      {Object.entries(holding.departments.hr.managementLevels).map(([level, count]) => (
                        <div key={level} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{level}:</span>
                          <span className="font-medium">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Sector KPI Average:</span>
                      <span className="font-medium">{holding.avgKPI}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Leadership Programs:</span>
                      <span className="font-medium">{holding.departments.hr.leadershipProgram} active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🎯 Strategic Initiatives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Active Projects:</span>
                      <span className="text-lg font-bold">{holding.departments.strategy.activeProjects}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>R&D Budget:</span>
                      <span className="font-medium">{formatCurrency(holding.departments.strategy.rdBudget)}</span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <h4 className="font-medium mb-2">Market Expansion:</h4>
                    <div className="flex flex-wrap gap-1">
                      {holding.departments.strategy.marketExpansion.map((market) => (
                        <Badge key={market} variant="outline" className="text-xs">
                          {market}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="flex justify-between text-sm">
                      <span>M&A Pipeline:</span>
                      <span className="font-medium">{holding.departments.strategy.acquisitionPipeline} deals</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Innovation Labs:</span>
                      <span className="font-medium">{holding.departments.strategy.innovationLabs} centers</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⚙️ Technology & Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Digital Transformation:</span>
                      <span className="font-medium">{holding.departments.technology.digitalTransformation}%</span>
                    </div>
                    <Progress value={holding.departments.technology.digitalTransformation} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">System Uptime:</span>
                      <p className="text-green-600">{holding.departments.technology.systemUptime}%</p>
                    </div>
                    <div>
                      <span className="font-medium">Cybersecurity:</span>
                      <p className="text-blue-600">{holding.departments.technology.cybersecurity}%</p>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="text-sm">
                      <span className="font-medium">Infrastructure:</span>
                      <p className="text-muted-foreground">{holding.departments.technology.cloudInfrastructure}</p>
                    </div>
                    <div className="text-sm mt-2">
                      <span className="font-medium">Data Analytics:</span>
                      <p className="text-muted-foreground">{holding.departments.technology.dataAnalytics}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🤖 AI Sector Analytics & Market Intelligence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">📊 Market Position</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-800">🎯 Market Leadership</p>
                      <p className="text-xs text-green-600 mt-1">
                        #1 position với {holding.departments.business.marketShare}% market share F&B Vietnam. 
                        Brand portfolio {holding.departments.business.brandPortfolio} brands mạnh.
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">💰 Financial Strength</p>
                      <p className="text-xs text-blue-600 mt-1">
                        Debt/Equity ratio {holding.departments.finance.debtToEquity} rất tốt. 
                        Working capital {formatCurrency(holding.departments.finance.workingCapital)} mạnh mẽ.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-sm">🚀 Growth Opportunities</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-purple-800">🌏 Regional Expansion</p>
                      <p className="text-xs text-purple-600 mt-1">
                        {holding.departments.strategy.marketExpansion.join(", ")} markets ready. 
                        {holding.departments.strategy.acquisitionPipeline} M&A targets identified.
                      </p>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <p className="text-sm font-medium text-indigo-800">🔬 Innovation Pipeline</p>
                      <p className="text-xs text-indigo-600 mt-1">
                        R&D {formatCurrency(holding.departments.strategy.rdBudget)} driving innovation. 
                        {holding.departments.strategy.innovationLabs} labs developing next-gen products.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-sm">📈 Predictive Insights</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <p className="text-sm font-medium text-amber-800">🔮 12-Month Forecast</p>
                      <p className="text-xs text-amber-600 mt-1">
                        Projected revenue: {formatCurrency(holding.quarterlyRevenue * 4.8)}/năm. 
                        Sẵn sàng thăng F1 cluster với BMC {holding.bmcOwnership}%.
                      </p>
                    </div>
                    <div className="p-3 bg-pink-50 rounded-lg">
                      <p className="text-sm font-medium text-pink-800">⚠️ Risk Monitoring</p>
                      <p className="text-xs text-pink-600 mt-1">
                        Supply chain diversification needed. 
                        Monitor regulatory changes in target markets.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Modal */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>📊 Báo cáo F2 Holding - {holding.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="revenue">Doanh thu quý (VNĐ)</Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="Nhập doanh thu..."
                  value={reportData.revenue || ''}
                  onChange={(e) => handleInputChange('revenue', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="employeeCount">Tổng số nhân viên</Label>
                <Input
                  id="employeeCount"
                  type="number"
                  placeholder="Nhập số nhân viên..."
                  value={reportData.employeeCount || ''}
                  onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="kpiScore">KPI Score (%)</Label>
                <Input
                  id="kpiScore"
                  type="number"
                  placeholder="Nhập KPI score..."
                  value={reportData.kpiScore || ''}
                  onChange={(e) => handleInputChange('kpiScore', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="marketShare">Thị phần (%)</Label>
                <Input
                  id="marketShare"
                  type="number"
                  placeholder="Nhập thị phần..."
                  value={reportData.marketShare || ''}
                  onChange={(e) => handleInputChange('marketShare', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="sectorFund">Quỹ ngành (VNĐ)</Label>
              <Input
                id="sectorFund"
                type="number"
                placeholder="Nhập quỹ ngành..."
                value={reportData.sectorFund || ''}
                onChange={(e) => handleInputChange('sectorFund', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="notes">Ghi chú báo cáo</Label>
              <Textarea
                id="notes"
                placeholder="Nhập ghi chú về tình hình kinh doanh, chiến lược, thách thức..."
                value={reportData.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsReportModalOpen(false)}
                disabled={isSubmitting || savingDraft}
              >
                <X className="h-4 w-4 mr-2" />
                Hủy
              </Button>
              <Button 
                variant="secondary" 
                onClick={handleSaveDraft}
                disabled={isSubmitting || savingDraft}
              >
                <Save className="h-4 w-4 mr-2" />
                {savingDraft ? 'Đang lưu...' : 'Lưu nháp'}
              </Button>
              <Button 
                onClick={handleReportSubmit}
                disabled={isSubmitting || savingDraft}
              >
                <Check className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Đang gửi...' : 'Đồng ý (Gửi & Đồng bộ)'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}