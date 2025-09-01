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
import { ArrowLeft, Building2, DollarSign, Users, TrendingUp, BarChart3, Calendar, MessageSquare, Download, Upload, Target, Truck, Shield, Cog, PieChart, FileText, X, Save, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StartupViewProps {
  onBack: () => void;
  organizations: any[];
  selectedStartup?: any;
}

// F5 Startup - Mockup data chuyên sâu theo hệ sinh thái BMC
const mockStartupData = {
  id: "F5_CAFE_001", 
  name: "Startup Cà phê 40NQ - BMC Ecosystem",
  level: "F5",
  type: "startup",
  stage: "growth", // đã vượt MVP
  sector: "F&B Specialty",
  mainProducts: ["Cà phê hạt premium", "Cold brew artisan", "Coffee workshop"],
  establishedDate: "2023-08-15",
  totalCapital: 0,
  bmcOwnership: 0, // Gần đạt ngưỡng 20% để thăng F4
  founderOwnership: 0,
  angelOwnership: 0,
  otherOwnership: 0, // Angel investors
  monthlyRevenue: 0, // tăng từ MVP
  operatingCosts: 0,
  netProfit: 0,
  burnRate: 0, // giảm từ khi có revenue
  runway: 0, // months - cải thiện 
  progressPercentage: 0, // tiến bộ từ MVP
  currentStaff: 0,
  averageKPI: 0,
  riskLevel: "medium", // giảm từ high
  innovationScore: 0,
  autoTieringStatus: "approaching", // sắp đạt ngưỡng
  nextTierTarget: "F4",
  tieringProgress: 0,
  kpiQuartersTracked: 0,
  kpiTrend: "improving"
};

// 9 Phòng ban - Dữ liệu mockup startup F5 (30 ngày gần nhất) 
const startupDepartmentData = {
  // Module 1: Cổ đông & Vốn góp
  shareholders: {
    bmcEquity: 0,
    founderEquity: 0, 
    angelEquity: 0,
    equityValuation: 0, // post-money
    vestingSchedule: "4 năm với 1 năm cliff",
    employeeOptions: 0, // % reserved
    shareholder_meetings: 0, // monthly
    governance_rights: "Quyền thông tin và quan sát",
    equity_transactions: [
      { date: "2024-01-20", type: "BMC bổ sung vốn", amount: 500000000, newShare: 18.2 }
    ]
  },

  // Module 2: Kinh doanh & Marketing  
  business: {
    totalRevenue30d: 0,
    newCustomers30d: 0,
    returningCustomers30d: 0,
    mvpCustomers: 0, // Total customers since launch
    conversionRate: 0,
    marketingSpend: 0,
    marketingROI: 0,
    channels: [
      { name: "Instagram", spend: 0, revenue: 0, romi: 0, followers: 0 },
      { name: "Facebook", spend: 0, revenue: 0, romi: 0, followers: 0 },
      { name: "TikTok", spend: 0, revenue: 0, romi: 0, followers: 0 },
      { name: "Word of mouth", spend: 0, revenue: 0, romi: 0, organic: true }
    ],
    orders_completed: 0,
    avg_order_value: 0,
    customer_satisfaction: 0,
    productMarketFit: 0, // cải thiện từ 35%
    nps_score: 0,
    churn_rate: 0
  },

  // Module 3: Tài chính & Kế toán
  finance: {
    revenue30d: 0,
    expenses30d: 0,
    grossProfit: 0,
    cashBalance: 0,
    burnRate: 0, // giảm
    runway: 0, // months
    accountsReceivable: 0,
    arAging: { "0-15d": 0, "16-30d": 0, "31-60d": 0 },
    monthlyExpenses: [
      { category: "COGS", amount: 0 },
      { category: "Nhân sự", amount: 0 },
      { category: "Marketing", amount: 0 },
      { category: "Thuê mặt bằng", amount: 0 },
      { category: "Công nghệ", amount: 0 }
    ],
    profitMargin: 0,
    unit_economics: {
      cac: 0, // customer acquisition cost  
      ltv: 0, // lifetime value
      ltv_cac_ratio: 0,
      payback_period: 0 // months
    }
  },

  // Module 4: Nhân sự
  hr: {
    totalStaff: 0,
    techTeam: 0, // Tech & Digital + some operations
    bizTeam: 0, // Marketing, Sales, Admin, Support + Founders
    newHires30d: 0,
    resignations30d: 0,
    avgKPI: 0,
    avgPerformance: 0, // Same as avgKPI
    avgSalary: 0, // startup level
    totalPayroll: 0,
    departments: [
      { name: "Founder & C-level", headcount: 0, avgKpi: 0, avgSalary: 0, equity: 0 },
      { name: "F&B Operations", headcount: 0, avgKpi: 0, avgSalary: 0, equity: 0 },
      { name: "Marketing & Sales", headcount: 0, avgKpi: 0, avgSalary: 0, equity: 0 },
      { name: "Tech & Digital", headcount: 0, avgKpi: 0, avgSalary: 0, equity: 0 },
      { name: "Admin & Support", headcount: 0, avgKpi: 0, avgSalary: 0, equity: 0 }
    ],
    equityPool: 0,
    culture_score: 0,
    retention_rate: 0 // chưa có ai nghỉ
  },

  // Module 4.1: Đào tạo
  training: {
    totalPrograms: 0,
    activePrograms: 0,
    completedPrograms: 0,
    trainingHours: 0,
    certifications: 0,
    completionRate: 0,
    learning_budget: 0, // monthly
    trainingSpent: 0,
    skillGrowth: 0,
    programs: [
      { name: "Barista Mastery", participants: 0, progress: 0, budget: 0 },
      { name: "Customer Service Excellence", participants: 0, progress: 0, budget: 0 },
      { name: "Digital Marketing Basics", participants: 0, progress: 0, budget: 0 },
      { name: "Food Safety & Hygiene", participants: 0, progress: 0, budget: 0 },
      { name: "Leadership for Startups", participants: 0, progress: 0, budget: 0 }
    ],
    trainers: [
      { name: "Nguyễn Văn D", specialization: "Barista Skills", rating: 0, sessions: 0 },
      { name: "Trần Thị E", specialization: "Customer Service", rating: 0, sessions: 0 },
      { name: "Lê Văn F", specialization: "Digital Skills", rating: 0, sessions: 0 }
    ],
    employeeSatisfaction: 0,
    knowledgeRetention: 0,
    startupFocus: "Practical skills for rapid growth"
  },

  // Module 5: Kho vận & Chuỗi cung ứng  
  warehouse: {
    totalSKUs: 0,
    stockValue: 0,
    daysOnHand: 0,
    turnoverRate: 0,
    stockouts30d: 0,
    topProducts: [
      { sku: "CF-ARTISAN-001", name: "Cà phê Arabica rang thủ công", stock: 0, value: 0, doh: 0 },
      { sku: "CB-COLD-002", name: "Cold Brew 24h", stock: 0, value: 0, doh: 0 },
      { sku: "WS-BEAN-003", name: "Gói workshop cà phê", stock: 0, value: 0, doh: 0 }
    ],
    suppliers: [
      { name: "Nông trại cà phê Cầu Đất", onTimeDelivery: 0, quality: 0, relationship: "Exclusive" },
      { name: "Rang xay artisan HN", onTimeDelivery: 0, quality: 0, relationship: "Preferred" }
    ],
    orderFulfillment: 0,
    deliveryMethod: "Grab/Shopee + Tự giao",
    packaging_sustainable: 0
  },

  // Module 6: Chiến lược & R&D
  strategy: {
    activeProjects: 0,
    rdBudget: 0, // 20% revenue
    rdSpent: 0,
    innovations: [
      { name: "App đặt hàng riêng", progress: 0, impact: "High", timeline: "Q2 2024" },
      { name: "Subscription model", progress: 0, impact: "High", timeline: "Q3 2024" },
      { name: "Franchise package", progress: 0, impact: "Medium", timeline: "Q4 2024" }
    ],
    expansion_plans: [
      { location: "Cầu Giấy HN", feasibility: 0, investment: 0, timeline: "Q3 2024" },
      { location: "Quận 1 HCM", feasibility: 0, investment: 0, timeline: "Q4 2024" }
    ],
    competitive_advantage: "Trải nghiệm cà phê artisan + Workshop",
    moat_strength: 0,
    partnerships: 0,
    brand_recognition: 0
  },

  // Module 7: Công nghệ & IT
  technology: {
    systemUptime: 0,
    cloudCosts: 0,
    securityIncidents: 0,
    securityScore: 0,
    tech_stack: ["React", "Node.js", "Supabase", "Stripe"],
    systems: [
      { name: "POS System (custom)", uptime: 0, users: 0, cost: 0 },
      { name: "Inventory App", uptime: 0, users: 0, cost: 0 },
      { name: "Customer App (MVP)", uptime: 0, users: 0, cost: 0 },
      { name: "Social Media Automation", uptime: 0, users: 0, cost: 0 }
    ],
    integrations: [
      { name: "Momo Payment", status: "Active", latency: "80ms", errorRate: 0 },
      { name: "Grab Merchant", status: "Active", latency: "120ms", errorRate: 0 },
      { name: "Shopee API", status: "Active", latency: "200ms", errorRate: 0 },
      { name: "Zalo OA", status: "Token expires 12d", latency: "150ms", errorRate: 0 }
    ],
    development_velocity: "2 sprints/month",
    tech_debt_level: "Thấp"
  },

  // Module 8: Pháp chế & Tuân thủ
  legal: {
    business_license: "Đã có",
    food_safety_cert: "Còn hiệu lực đến 2024-09-15",
    activeContracts: 0,
    contractValue: 0,
    complianceScore: 0,
    riskLevel: "Trung bình", 
    contracts: [
      { type: "Thuê mặt bằng", count: 0, value: 0, term: 0, nextRenewal: "2025-08-15" },
      { type: "Cung cấp nguyên liệu", count: 0, value: 0, term: 0, nextRenewal: "2024-06-15" },
      { type: "Dịch vụ", count: 0, value: 0, term: 0, nextRenewal: "2024-05-20" }
    ],
    compliance: [
      { domain: "Thuế", score: 0, issues: 0, status: "Đầy đủ" },
      { domain: "An toàn thực phẩm", score: 0, issues: 0, status: "Xuất sắc" },
      { domain: "Lao động", score: 0, issues: 0, status: "Cần cải thiện hợp đồng" },
      { domain: "Sở hữu trí tuệ", score: 0, issues: 0, status: "Đang đăng ký thương hiệu" }
    ],
    trademark_status: "Đang xử lý",
    litigation_risk: "Thấp"
  },

  // Module 9: Đầu tư & Quỹ vốn  
  investment: {
    totalRaised: 0,
    currentValuation: 0, // post-money
    preMoney: 0,
    nextRound: "Series A",
    targetRaise: 0,
    fundingSources: [
      { name: "BMC Holdings", amount: 0, type: "Strategic", date: "2023-08-15" },
      { name: "Angel round", amount: 0, type: "Angel", date: "2024-01-20" }
    ],
    useOfFunds: {
      "Expansion (3 cửa hàng)": 0,
      "Marketing & Brand": 0, 
      "Tech development": 0,
      "Working capital": 0
    },
    milestones: [
      { name: "Break-even store level", target: "Q1 2024", status: "Achieved", date: "2024-02-28" },
      { name: "3 cửa hàng profitable", target: "Q4 2024", status: "On track", progress: 0 },
      { name: "Brand recognition >80%", target: "Q2 2025", status: "Planning", progress: 0 }
    ],
    exit_strategy: "IPO hoặc strategic acquisition sau 5-7 năm",
    board_composition: "2 founders + 1 BMC + 1 independent"
  }
};

export function StartupView({ onBack, organizations, selectedStartup }: StartupViewProps) {
  const [activeTab, setActiveTab] = useState("startup");
  const [selectedMetric, setSelectedMetric] = useState("all");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportData, setReportData] = useState({
    revenue: "",
    employees: "",
    kpiScore: "",
    marketShare: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const savedDraft = localStorage.getItem('startup_report_draft');
    if (savedDraft) {
      setReportData(JSON.parse(savedDraft));
    }
  }, []);

  const handleSaveDraft = async () => {
    setSavingDraft(true);
    try {
      localStorage.setItem('startup_report_draft', JSON.stringify(reportData));
      toast({
        title: "Đã lưu nháp",
        description: "Báo cáo đã được lưu vào bộ nhớ tạm."
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể lưu nháp báo cáo.",
        variant: "destructive"
      });
    } finally {
      setSavingDraft(false);
    }
  };

  const handleReportSubmit = async () => {
    if (!user) {
      toast({
        title: "Lỗi",
        description: "Bạn cần đăng nhập để gửi báo cáo.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('company_reports')
        .insert({
          company_id: mockStartupData.id,
          company_name: mockStartupData.name,
          company_level: 'F5',
          revenue: parseFloat(reportData.revenue) || 0,
          employee_count: parseInt(reportData.employees) || 0,
          kpi_score: parseFloat(reportData.kpiScore) || 0,
          market_share: parseFloat(reportData.marketShare) || 0,
          notes: reportData.notes,
          submitted_by: user.id,
          status: 'submitted'
        });

      if (error) throw error;

      localStorage.removeItem('startup_report_draft');
      setReportData({ revenue: "", employees: "", kpiScore: "", marketShare: "", notes: "" });
      setIsReportModalOpen(false);
      
      toast({
        title: "Báo cáo đã được gửi",
        description: "Báo cáo F5 startup đã được gửi và đồng bộ thành công."
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể gửi báo cáo. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReportData(prev => ({ ...prev, [name]: value }));
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)} tỷ`;
    }
    return `${(amount / 1000000).toFixed(0)} triệu`;
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "idea":
        return "bg-gray-100 text-gray-800";
      case "mvp":
        return "bg-blue-100 text-blue-800";
      case "growth":
        return "bg-green-100 text-green-800";
      case "scale":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskLevel = (level: string) => {
    switch (level) {
      case "low":
        return <Badge className="bg-green-100 text-green-800">Thấp</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Trung bình</Badge>;
      case "high":
        return <Badge variant="destructive">Cao</Badge>;
      default:
        return <Badge variant="outline">Không xác định</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with startup context */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại hệ sinh thái
          </Button>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>🌐 BMC Holdings</span>
              <span>→</span>
              <span>🏢 F1 Cụm Tech</span>
              <span>→</span>
              <span>🏬 F2 BMC Innovation</span>
              <span>→</span>
              <Badge variant="secondary" className={getStageColor(mockStartupData.stage)}>
                🚀 F5 Startup - Growth Stage
              </Badge>
            </div>
            <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
              <Rocket className="h-6 w-6 text-primary" />
              {mockStartupData.name}
            </h1>
            <p className="text-muted-foreground">Startup tại hệ sinh thái BMC - Giai đoạn Growth - Vốn góp BMC {mockStartupData.bmcOwnership}%</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Cập nhật metrics
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsReportModalOpen(true)}>
            <FileText className="h-4 w-4 mr-2" />
            Báo cáo
          </Button>
          <Button className="bg-gradient-primary">
            🤖 Startup AI
          </Button>
        </div>
      </div>

      {/* Startup-specific filter bar */}
      <div className="flex gap-4 p-4 bg-card rounded-lg border">
        <Select value={selectedMetric} onValueChange={setSelectedMetric}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Chọn metrics" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">🚀 Tất cả metrics</SelectItem>
            <SelectItem value="growth">📈 Growth metrics</SelectItem>
            <SelectItem value="financial">💰 Tài chính</SelectItem>
            <SelectItem value="product">🛠 Sản phẩm</SelectItem>
            <SelectItem value="hr">👥 Nhân sự</SelectItem>
            <SelectItem value="training">🎓 Đào tạo</SelectItem>
            <SelectItem value="investment">📊 Đầu tư</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="week">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Hàng ngày</SelectItem>
            <SelectItem value="week">Tuần</SelectItem>
            <SelectItem value="month">Tháng</SelectItem>
            <SelectItem value="quarter">Quý</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="startup">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="startup">Startup view</SelectItem>
            <SelectItem value="investor">Investor view</SelectItem>
            <SelectItem value="founder">Founder view</SelectItem>
            <SelectItem value="bmc">BMC view</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Startup Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-10 gap-3">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              BMC Equity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{mockStartupData.bmcOwnership}%</div>
            <p className="text-xs text-muted-foreground">{formatCurrency(mockStartupData.totalCapital * mockStartupData.bmcOwnership / 100)}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatCurrency(mockStartupData.monthlyRevenue)}</div>
            <p className="text-xs text-green-600">+25% MoM</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              Burn Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatCurrency(mockStartupData.burnRate)}</div>
            <p className="text-xs text-red-600">Tháng này</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Runway
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{mockStartupData.runway}</div>
            <p className="text-xs text-muted-foreground">tháng</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Users className="h-3 w-3" />
              Team Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{mockStartupData.currentStaff}</div>
            <p className="text-xs text-muted-foreground">8 tech + 4 biz</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Target className="h-3 w-3" />
              MVP Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{mockStartupData.progressPercentage}%</div>
            <Progress value={mockStartupData.progressPercentage} className="h-1 mt-1" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-cyan-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Zap className="h-3 w-3" />
              PMF Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{startupDepartmentData.business.productMarketFit}%</div>
            <p className="text-xs text-amber-600">Early stage</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <PieChart className="h-3 w-3" />
              Valuation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatCurrency(startupDepartmentData.shareholders.equityValuation)}</div>
            <p className="text-xs text-green-600">Pre-money</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-pink-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Rocket className="h-3 w-3" />
              Innovation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{mockStartupData.innovationScore}%</div>
            <p className="text-xs text-green-600">High tech</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-gray-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Risk Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">{getRiskLevel(mockStartupData.riskLevel)}</div>
            <p className="text-xs text-muted-foreground">Early stage</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Startup Intelligence */}
      <Card className="border-l-4 border-l-gradient-primary bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            🚀 AI Startup Intelligence - BMC AI Labs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-foreground">📊 Startup Status:</h4>
              <p className="text-sm text-muted-foreground">
                Growth stage đạt {mockStartupData.progressPercentage}% progress với {startupDepartmentData.business.mvpCustomers} customers. 
                Burn rate {formatCurrency(mockStartupData.burnRate)}/tháng, còn {mockStartupData.runway} tháng runway.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-amber-600">⚠️ Startup Risks:</h4>
              <p className="text-sm text-muted-foreground">
                Product-Market Fit chỉ 35%. Cần focus customer validation và iteration nhanh. 
                Xem xét fundraising trong 6 tháng tới.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-green-600">🚀 Growth Opportunities:</h4>
              <p className="text-sm text-muted-foreground">
                Innovation score 92% - tiềm năng mạnh. Kết nối F1 Cụm Tech để scale. 
                BMC có thể tăng equity lên 20% ở Series A.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="startup">🚀 Startup Metrics</TabsTrigger>
          <TabsTrigger value="growth">📈 Growth & PMF</TabsTrigger>
          <TabsTrigger value="team">👥 Team & Equity</TabsTrigger>
          <TabsTrigger value="investment">💰 Investment</TabsTrigger>
          <TabsTrigger value="ecosystem">🌐 BMC Ecosystem</TabsTrigger>
        </TabsList>

        <TabsContent value="startup" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🚀 Startup Fundamentals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Stage</p>
                      <p className="text-xs text-muted-foreground">Current development stage</p>
                    </div>
                    <Badge className={getStageColor(mockStartupData.stage)}>Growth Stage</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Business Model</p>
                      <p className="text-xs text-muted-foreground">Revenue generation</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">F&B Artisan</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Market Size</p>
                      <p className="text-xs text-muted-foreground">Addressable market</p>
                    </div>
                    <span className="font-medium">$850M Vietnam F&B</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Competition</p>
                      <p className="text-xs text-muted-foreground">Market position</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">6 tháng lead</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📊 Key Metrics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Revenue Growth (MoM)</span>
                      <span className="text-sm font-bold text-green-600">+25%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Customer Acquisition</span>
                      <span className="text-sm font-bold text-blue-600">{startupDepartmentData.business.mvpCustomers}</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Product Development</span>
                      <span className="text-sm font-bold text-purple-600">{mockStartupData.progressPercentage}%</span>
                    </div>
                    <Progress value={mockStartupData.progressPercentage} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Market Validation</span>
                      <span className="text-sm font-bold text-amber-600">{startupDepartmentData.business.productMarketFit}%</span>
                    </div>
                    <Progress value={startupDepartmentData.business.productMarketFit} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="growth" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>📈 Growth Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monthly Revenue:</span>
                    <span className="font-medium">{formatCurrency(mockStartupData.monthlyRevenue)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Growth Rate (MoM):</span>
                    <span className="font-medium text-green-600">+25%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Customer Acquisition:</span>
                    <span className="font-medium">{startupDepartmentData.business.mvpCustomers} users</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Conversion Rate:</span>
                    <span className="font-medium">{startupDepartmentData.business.conversionRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎯 Product-Market Fit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Customer Satisfaction</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Product Usage</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Market Demand</span>
                      <span>42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <p className="text-sm font-medium text-amber-800">🎯 PMF Status</p>
                    <p className="text-xs text-amber-600">
                      Early validation stage. Focus on user feedback và product iteration.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>👥 Team Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Tech Team</p>
                      <p className="text-xs text-muted-foreground">Development & Engineering</p>
                    </div>
                    <span className="font-bold">{startupDepartmentData.hr.techTeam} người</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Business Team</p>
                      <p className="text-xs text-muted-foreground">Sales, Marketing, Ops</p>
                    </div>
                    <span className="font-bold">{startupDepartmentData.hr.bizTeam} người</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium">Avg Performance</p>
                      <p className="text-xs text-muted-foreground">Team KPI score</p>
                    </div>
                    <span className="font-bold">{startupDepartmentData.hr.avgPerformance}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>💼 Equity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Founders</span>
                      <span className="text-sm font-bold">{mockStartupData.founderOwnership}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${mockStartupData.founderOwnership}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Employee Pool</span>
                      <span className="text-sm font-bold">{startupDepartmentData.hr.equityPool}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${startupDepartmentData.hr.equityPool}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">BMC Holdings</span>
                      <span className="text-sm font-bold">{mockStartupData.bmcOwnership}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${mockStartupData.bmcOwnership}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Other Investors</span>
                      <span className="text-sm font-bold">{mockStartupData.otherOwnership}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${mockStartupData.otherOwnership}%` }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="investment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>💰 Funding Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Raised:</span>
                    <span className="font-medium">{formatCurrency(startupDepartmentData.investment.totalRaised)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Valuation:</span>
                    <span className="font-medium">{formatCurrency(startupDepartmentData.investment.currentValuation)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Burn Rate:</span>
                    <span className="font-medium text-red-600">{formatCurrency(mockStartupData.burnRate)}/tháng</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Runway:</span>
                    <span className="font-medium text-amber-600">{mockStartupData.runway} tháng</span>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">💡 Next Round</p>
                    <p className="text-xs text-blue-600">
                      {startupDepartmentData.investment.nextRound}: Target {formatCurrency(startupDepartmentData.investment.targetRaise)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📊 Financial Projections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Revenue Target (12M)</span>
                      <span>{formatCurrency(mockStartupData.monthlyRevenue * 12 * 2.5)}</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Break-even Timeline</span>
                      <span>18 tháng</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Series A Readiness</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-800">🎯 Funding Strategy</p>
                    <p className="text-xs text-green-600">
                      Ready cho Series A trong 6-9 tháng với strong metrics validation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ecosystem" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🌐 BMC Ecosystem Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">🌐 BMC Holdings</p>
                      <p className="text-xs text-muted-foreground">Tập đoàn mẹ - Strategic advisor</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Level 0</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">🏢 F1 Cụm Tech</p>
                      <p className="text-xs text-muted-foreground">Tech cluster resources</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Level 1</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">🏬 F2 BMC Innovation</p>
                      <p className="text-xs text-muted-foreground">Innovation incubator</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Level 2</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border-2 border-primary">
                    <div>
                      <p className="font-medium">🚀 F5 AI Labs</p>
                      <p className="text-xs text-muted-foreground">Current startup - BMC 15%</p>
                    </div>
                    <Badge>Current</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🤝 BMC Synergies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">🔗 Available Resources:</h4>
                    <div className="text-xs space-y-1">
                      <p>• Cụm Tech: Shared R&D facilities</p>
                      <p>• F1 Network: 15+ tech companies</p>
                      <p>• BMC Capital: Follow-on funding</p>
                      <p>• Market Access: BMC customer base</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">📈 Growth Opportunities:</h4>
                    <div className="text-xs space-y-1">
                      <p>• Cross-sell to F3/F4 companies</p>
                      <p>• White-label to BMC portfolio</p>
                      <p>• Series A co-investment</p>
                      <p>• International expansion via BMC</p>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium text-purple-800">🚀 Ecosystem Value</p>
                    <p className="text-xs text-purple-600">
                      BMC ecosystem provides 3x faster growth potential vs standalone startup.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Report Modal */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Báo cáo F5 - Startup</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="revenue">Doanh thu (VNĐ)</Label>
                <Input
                  id="revenue"
                  name="revenue"
                  type="number"
                  value={reportData.revenue}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="employees">Số nhân viên</Label>
                <Input
                  id="employees"
                  name="employees"
                  type="number"
                  value={reportData.employees}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="kpiScore">Điểm KPI</Label>
                <Input
                  id="kpiScore"
                  name="kpiScore"
                  type="number"
                  step="0.1"
                  max="10"
                  value={reportData.kpiScore}
                  onChange={handleInputChange}
                  placeholder="0.0"
                />
              </div>
              <div>
                <Label htmlFor="marketShare">Thị phần (%)</Label>
                <Input
                  id="marketShare"
                  name="marketShare"
                  type="number"
                  step="0.1"
                  max="100"
                  value={reportData.marketShare}
                  onChange={handleInputChange}
                  placeholder="0.0"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Ghi chú</Label>
              <Textarea
                id="notes"
                name="notes"
                value={reportData.notes}
                onChange={handleInputChange}
                placeholder="Nhập ghi chú..."
                rows={3}
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsReportModalOpen(false)}
                className="flex-1"
              >
                <X className="h-4 w-4 mr-2" />
                Hủy
              </Button>
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={savingDraft}
                className="flex-1"
              >
                <Save className="h-4 w-4 mr-2" />
                {savingDraft ? "Đang lưu..." : "Lưu nháp"}
              </Button>
              <Button
                onClick={handleReportSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Check className="h-4 w-4 mr-2" />
                {isSubmitting ? "Đang gửi..." : "Đồng ý (Gửi & đồng bộ)"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}