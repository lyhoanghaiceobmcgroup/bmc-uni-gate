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

interface ProjectBranchViewProps {
  onBack: () => void;
  organizations: any[];
  selectedProject?: any;
}

// F4 Chi nhánh - Mockup data chuyên sâu theo hệ sinh thái BMC
const mockProjectData = {
  id: "F4_HN_001",
  name: "Chi nhánh Hà Nội - BMC Food & Beverage",
  level: "F4",
  type: "branch",
  establishedDate: "2022-03-15",
  sector: "F&B Retail",
  mainProducts: ["Cà phê premium", "Bánh ngọt", "Đồ uống organic"],
  totalCapital: 0,
  bmcOwnership: 0, // Gần đạt ngưỡng 35% để thăng F3
  localPartnerOwnership: 0,
  investorOwnership: 0,
  monthlyRevenue: 0,
  operatingCosts: 0,
  netProfit: 0,
  progressPercentage: 0,
  currentStaff: 0,
  averageKPI: 0,
  riskLevel: "medium",
  complianceScore: 0,
  autoTieringStatus: "eligible", // Sẵn sàng thăng cấp
  nextTierTarget: "F3",
  tieringProgress: 0,
  kpiQuartersTracked: 0,
  kpiAverage4Quarters: 0
};

// 9 Phòng ban - Dữ liệu mockup chuyên sâu F4 (30 ngày gần nhất)
const departmentData = {
  // Module 1: Cổ đông & Vốn góp
  shareholders: {
    bmcEquity: 0,
    localPartnerEquity: 0,
    investorEquity: 0,
    monthlyDividend: 0,
    equityValueGrowth: 0, // %
    shareholder_meetings: 0,
    governance_score: 0,
    voting_rights: "Có quyền veto các quyết định trọng yếu",
    recent_transactions: [
      { date: "2024-01-15", type: "Tăng vốn", amount: 2000000000, from: "BMC Holdings" }
    ]
  },
  
  // Module 2: Kinh doanh & Marketing  
  business: {
    totalRevenue30d: 0,
    newCustomers30d: 0,
    returningCustomers30d: 0,
    conversionRate: 0,
    orders_completed: 0,
    avg_order_value: 0,
    customer_satisfaction: 0,
    salesTeam: 0,
    monthlyTarget: 0,
    achievementRate: 0
  },

  // Module 2.5: Marketing
  marketing: {
    marketingSpend: 0,
    marketingROI: 0,
    topChannels: [
      { name: "Facebook Ads", spend: 0, revenue: 0, romi: 0 },
      { name: "Google Ads", spend: 0, revenue: 0, romi: 0 },
      { name: "Zalo OA", spend: 0, revenue: 0, romi: 0 },
      { name: "TikTok Shop", spend: 0, revenue: 0, romi: 0 }
    ],
    campaignROI: "Hiệu quả cao",
    brandAwareness: "Tăng 25%",
    leadGeneration: 0,
    socialEngagement: "Tốt"
  },

  // Module 3: Tài chính & Kế toán
  finance: {
    revenue30d: 0,
    expenses30d: 0,
    grossProfit: 0,
    cashBalance: 0,
    accountsReceivable: 0,
    arAging: { "0-15d": 0, "16-30d": 0, "31-60d": 0 },
    accountsPayable: 0,
    apAging: { "0-15d": 0, "16-30d": 0, "31-60d": 0 },
    monthlyExpenses: [
      { category: "COGS", amount: 0 },
      { category: "Nhân sự", amount: 0 },
      { category: "Marketing", amount: 0 },
      { category: "Thuê mặt bằng", amount: 0 },
      { category: "Utilities", amount: 0 }
    ],
    profitMargin: 0,
    roi_vs_budget: 0
  },

  // Module 4: Nhân sự
  hr: {
    totalStaff: 0,
    newHires30d: 0,
    resignations30d: 0,
    avgKPI: 0,
    avgSalary: 0,
    totalPayroll: 0,
    departments: [
      { name: "Bán hàng", headcount: 0, avgKpi: 0, avgSalary: 0 },
      { name: "F&B Production", headcount: 0, avgKpi: 0, avgSalary: 0 },
      { name: "Marketing", headcount: 0, avgKpi: 0, avgSalary: 0 },
      { name: "Quản lý", headcount: 0, avgKpi: 0, avgSalary: 0 },
      { name: "Support", headcount: 0, avgKpi: 0, avgSalary: 0 }
    ],
    attritionRate: 0,
    employeeSatisfaction: 0
  },

  // Module 4.1: Đào tạo
  training: {
    totalPrograms: 0,
    activePrograms: 0,
    completedPrograms: 0,
    trainingHours: 0,
    certifications: 0,
    completionRate: 0,
    trainingBudget: 0,
    trainingSpent: 0,
    skillGrowth: 0,
    programs: [
      { name: "Leadership Development", participants: 0, progress: 0, budget: 0 },
      { name: "Technical Skills", participants: 0, progress: 0, budget: 0 },
      { name: "Customer Service", participants: 0, progress: 0, budget: 0 },
      { name: "Safety Training", participants: 0, progress: 0, budget: 0 },
      { name: "Digital Literacy", participants: 0, progress: 0, budget: 0 }
    ],
    trainers: [
      { name: "Nguyễn Thị A", specialization: "Leadership", rating: 0, sessions: 0 },
      { name: "Trần Văn B", specialization: "Technical", rating: 0, sessions: 0 },
      { name: "Lê Thị C", specialization: "Soft Skills", rating: 0, sessions: 0 }
    ],
    employeeSatisfaction: 0,
    knowledgeRetention: 0
  },

  // Module 5: Kho vận & Chuỗi cung ứng
  warehouse: {
    totalSKUs: 0,
    stockValue: 0,
    daysOnHand: 0,
    turnoverRate: 0,
    stockouts30d: 0,
    excessStock: 0,
    topProducts: [
      { sku: "CF-PREMIUM-001", name: "Cà phê hạt Arabica", stock: 0, value: 0, doh: 0 },
      { sku: "BK-CROIS-002", name: "Bánh croissant", stock: 0, value: 0, doh: 0 },
      { sku: "DU-SMOOTHIE-003", name: "Smoothie trái cây", stock: 0, value: 0, doh: 0 }
    ],
    supplierPerformance: [
      { name: "Nông trại cà phê Đà Lạt", onTimeDelivery: 0, quality: 0, cost: 0 },
      { name: "Nhà máy bánh ABC", onTimeDelivery: 0, quality: 0, cost: 0 }
    ],
    orderFulfillment: 0,
    deliveryDelay: 0
  },

  // Module 6: Chiến lược & R&D
  strategy: {
    activeProjects: 0,
    rdBudget: 0,
    rdSpent: 0,
    innovations: [
      { name: "AI Menu Recommendation", progress: 0, impact: "High", timeline: "Q2 2024" },
      { name: "Sustainable Packaging", progress: 0, impact: "Medium", timeline: "Q3 2024" },
      { name: "Mobile Order System", progress: 0, impact: "High", timeline: "Q1 2024" }
    ],
    marketExpansion: [
      { location: "Quận 7 HCM", feasibility: 0, investment: 0, timeline: "Q2 2024" },
      { location: "Hạ Long", feasibility: 0, investment: 0, timeline: "Q4 2024" }
    ],
    competitorAnalysis: 0,
    partnerships: 0,
    intellectualProperty: 0
  },

  // Module 7: Công nghệ & IT
  technology: {
    systemUptime: 0,
    cloudCosts: 0,
    securityIncidents: 0,
    securityScore: 0,
    apiCalls30d: 0,
    systems: [
      { name: "POS System", uptime: 0, users: 0, cost: 0 },
      { name: "Inventory Management", uptime: 0, users: 0, cost: 0 },
      { name: "CRM", uptime: 0, users: 0, cost: 0 },
      { name: "Accounting Software", uptime: 0, users: 0, cost: 0 }
    ],
    integrations: [
      { name: "Banking API", status: "Active", latency: "0ms", errorRate: 0 },
      { name: "eInvoice System", status: "Active", latency: "0ms", errorRate: 0 },
      { name: "Zalo OA", status: "Token expiring", latency: "0ms", errorRate: 0 },
      { name: "Social Media APIs", status: "Active", latency: "0ms", errorRate: 0 }
    ],
    dataBackup: 0,
    disasterRecovery: "Tested monthly"
  },

  // Module 8: Pháp chế & Tuân thủ
  legal: {
    activeContracts: 0,
    contractValue: 0,
    expiringContracts60d: 0,
    complianceScore: 0,
    riskLevel: "Thấp",
    contracts: [
      { type: "Thuê mặt bằng", count: 0, totalValue: 0, avgTerm: 0, nextRenewal: "2024-06-15" },
      { type: "Cung cấp nguyên liệu", count: 0, totalValue: 0, avgTerm: 0, nextRenewal: "2024-04-20" },
      { type: "Dịch vụ", count: 0, totalValue: 0, avgTerm: 0, nextRenewal: "2024-08-10" }
    ],
    compliance: [
      { domain: "Thuế", score: 0, issues: 0, lastAudit: "2024-01-15", nextDue: "2024-07-15" },
      { domain: "Lao động", score: 0, issues: 0, lastAudit: "2023-11-20", nextDue: "2024-05-20" },
      { domain: "An toàn thực phẩm", score: 0, issues: 0, lastAudit: "2024-02-10", nextDue: "2024-08-10" },
      { domain: "Môi trường", score: 0, issues: 0, lastAudit: "2023-12-05", nextDue: "2024-06-05" }
    ],
    intellectualProperty: 0,
    litigation: 0
  },

  // Module 9: Đầu tư & Quỹ vốn
  investment: {
    totalInvested: 0,
    currentValuation: 0,
    roi: 0,
    irr: 0,
    paybackPeriod: 0, // months
    fundAllocated: {
      "FundDev": { allocated: 0, drawn: 0, purpose: "Mở rộng" },
      "FundOp": { allocated: 0, drawn: 0, purpose: "Vận hành" },
      "FundTech": { allocated: 0, drawn: 0, purpose: "Công nghệ" }
    },
    milestones: [
      { name: "Break-even", target: "Q4 2023", status: "Achieved", date: "2023-11-15" },
      { name: "Profit margin >25%", target: "Q2 2024", status: "On track", progress: 0 },
      { name: "Market expansion", target: "Q3 2024", status: "Planning", progress: 0 }
    ],
    nextFunding: {
      type: "Expansion fund",
      amount: 0,
      timeline: "Q3 2024",
      purpose: "Mở 3 chi nhánh mới"
    }
  }
};

export function ProjectBranchView({ onBack, organizations, selectedProject }: ProjectBranchViewProps) {
  const [activeTab, setActiveTab] = useState("ecosystem");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
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

  // Load draft data on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(`f4_report_draft_${mockProjectData.id}`);
    if (savedDraft) {
      try {
        setReportData(JSON.parse(savedDraft));
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReportData(prev => ({ ...prev, [name]: value }));
  };

  // Save draft function
  const handleSaveDraft = async () => {
    setSavingDraft(true);
    try {
      localStorage.setItem(`f4_report_draft_${mockProjectData.id}`, JSON.stringify(reportData));
      toast({
        title: "Nháp đã được lưu",
        description: "Dữ liệu báo cáo đã được lưu vào bộ nhớ tạm."
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
          company_id: mockProjectData.id,
          company_name: mockProjectData.name,
          report_date: new Date().toISOString().split('T')[0],
          revenue: reportData.revenue || 0,
          employee_count: reportData.employees || 0,
          kpi_score: reportData.kpiScore || 0,
          status: 'active',
          organizational_level: 'F4',
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
      localStorage.removeItem(`f4_report_draft_${mockProjectData.id}`);
      setReportData({ revenue: "", employees: "", kpiScore: "", marketShare: "", notes: "" });
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

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)} tỷ`;
    }
    return `${(amount / 1000000).toFixed(0)} triệu`;
  };

  const getStatusBadge = (level: string) => {
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

  const departmentIcons = {
    shareholders: DollarSign,
    business: TrendingUp,
    marketing: MessageSquare,
    finance: BarChart3,
    hr: Users,
    warehouse: Truck,
    strategy: Target,
    technology: Cog,
    legal: Shield,
    investment: PieChart
  };

  return (
    <div className="space-y-6">
      {/* Header với breadcrumb ecosystem */}
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
              <span>🏢 F1 Cụm F&B</span>
              <span>→</span>
              <span>🏬 F3 BMC Food</span>
              <span>→</span>
              <Badge variant="secondary">🏪 F4 Chi nhánh HN</Badge>
            </div>
            <h1 className="text-2xl font-semibold text-foreground">{mockProjectData.name}</h1>
            <p className="text-muted-foreground">Tích hợp hệ sinh thái BMC - 9 phòng ban - Trung tâm báo cáo</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Đồng bộ dữ liệu
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsReportModalOpen(true)}>
            <FileText className="h-4 w-4 mr-2" />
            Báo cáo
          </Button>
          <Button className="bg-gradient-primary">
            🤖 AI Trợ lý
          </Button>
        </div>
      </div>

      {/* Filter Bar với department selector */}
      <div className="flex gap-4 p-4 bg-card rounded-lg border">
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Chọn phòng ban" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">🌐 Tất cả phòng ban</SelectItem>
            <SelectItem value="shareholders">💰 Cổ đông & Vốn góp</SelectItem>
            <SelectItem value="business">📈 Kinh doanh & Marketing</SelectItem>
            <SelectItem value="finance">💳 Tài chính & Kế toán</SelectItem>
            <SelectItem value="hr">👥 Nhân sự</SelectItem>
            <SelectItem value="training">🎓 Đào tạo</SelectItem>
            <SelectItem value="warehouse">📦 Kho vận & Logistics</SelectItem>
            <SelectItem value="strategy">🎯 Chiến lược & R&D</SelectItem>
            <SelectItem value="technology">⚙️ Công nghệ & IT</SelectItem>
            <SelectItem value="legal">🛡️ Pháp chế & Tuân thủ</SelectItem>
            <SelectItem value="investment">📊 Đầu tư & Quỹ</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="month">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="realtime">Realtime</SelectItem>
            <SelectItem value="day">Ngày</SelectItem>
            <SelectItem value="week">Tuần</SelectItem>
            <SelectItem value="month">Tháng</SelectItem>
            <SelectItem value="quarter">Quý</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="comprehensive">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="comprehensive">Toàn diện</SelectItem>
            <SelectItem value="financial">Tài chính</SelectItem>
            <SelectItem value="operational">Vận hành</SelectItem>
            <SelectItem value="strategic">Chiến lược</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards - Ecosystem Integration */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-3">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              Vốn góp BMC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{mockProjectData.bmcOwnership}%</div>
            <p className="text-xs text-muted-foreground">{formatCurrency(mockProjectData.totalCapital)} VNĐ</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              Doanh thu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatCurrency(mockProjectData.monthlyRevenue)}</div>
            <p className="text-xs text-green-600">+8% vs tháng trước</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Lợi nhuận
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatCurrency(mockProjectData.netProfit)}</div>
            <p className="text-xs text-muted-foreground">Tỷ suất 36%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Tiến độ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{mockProjectData.progressPercentage}%</div>
            <Progress value={mockProjectData.progressPercentage} className="h-1 mt-1" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-pink-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Users className="h-3 w-3" />
              Nhân sự
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{mockProjectData.currentStaff}</div>
            <p className="text-xs text-muted-foreground">KPI: {mockProjectData.averageKPI}%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Truck className="h-3 w-3" />
              Kho vận
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">85%</div>
            <p className="text-xs text-muted-foreground">{departmentData.warehouse.daysOnHand} ngày tồn</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-cyan-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Cog className="h-3 w-3" />
              Công nghệ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{departmentData.technology.systemUptime}%</div>
            <p className="text-xs text-green-600">Uptime hệ thống</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Tuân thủ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{departmentData.legal.complianceScore}%</div>
            <p className="text-xs text-muted-foreground">{getStatusBadge(mockProjectData.riskLevel)}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <PieChart className="h-3 w-3" />
              ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{departmentData.investment.roi}%</div>
            <p className="text-xs text-green-600">Hiệu suất đầu tư</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Ecosystem Insight */}
      <Card className="border-l-4 border-l-gradient-primary bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            🤖 AI Ecosystem Intelligence - Chi nhánh F4 Hà Nội
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-foreground">📊 Tóm tắt tích hợp:</h4>
              <p className="text-sm text-muted-foreground">
                Chi nhánh HN đạt {mockProjectData.progressPercentage}% tiến độ, đóng góp {mockProjectData.bmcOwnership}% vào danh mục BMC. 
                Dữ liệu đồng bộ realtime qua 9 phòng ban với Trung tâm báo cáo.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-amber-600">⚠️ Cảnh báo hệ sinh thái:</h4>
              <p className="text-sm text-muted-foreground">
                Kho vận có 8 đơn trễ. Cần đồng bộ với F3 (công ty mẹ) 
                để điều phối nguồn lực từ các chi nhánh khác.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-green-600">💡 Gợi ý chiến lược BMC:</h4>
              <p className="text-sm text-muted-foreground">
                Tăng vốn góp lên 25% để mở rộng thị phần. Kết nối API với F1 (cụm ngành) 
                để tối ưu chuỗi cung ứng cross-branch.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="ecosystem">🌐 Hệ sinh thái</TabsTrigger>
          <TabsTrigger value="departments">🗂 9 Phòng ban</TabsTrigger>
          <TabsTrigger value="operations">⚙️ Vận hành</TabsTrigger>
          <TabsTrigger value="analytics">📊 Phân tích AI</TabsTrigger>
          <TabsTrigger value="reporting">📋 Báo cáo</TabsTrigger>
        </TabsList>

        <TabsContent value="ecosystem" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🌐 Kết nối hệ sinh thái BMC</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">🌐 BMC Holdings</p>
                      <p className="text-xs text-muted-foreground">Tập đoàn mẹ - 100% quyền kiểm soát</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Cấp 0</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">🏢 F1 Cụm F&B</p>
                      <p className="text-xs text-muted-foreground">BMC sở hữu 80% cụm ngành</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Cấp 1</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">🏬 F3 BMC Food</p>
                      <p className="text-xs text-muted-foreground">Công ty chiến lược - BMC 55%</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Cấp 3</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border-2 border-primary">
                    <div>
                      <p className="font-medium">🏪 F4 Chi nhánh HN</p>
                      <p className="text-xs text-muted-foreground">Cấp hiện tại - BMC 20%</p>
                    </div>
                    <Badge>Đang xem</Badge>
                  </div>

                  <div className="text-center py-2">
                    <Button variant="outline" size="sm">
                      📊 Xem toàn cảnh hệ sinh thái
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📊 Đóng góp vào hệ sinh thái</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Đóng góp doanh thu F3</span>
                      <span className="text-sm font-bold">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Đóng góp lợi nhuận F1</span>
                      <span className="text-sm font-bold">8%</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Đóng góp tổng BMC</span>
                      <span className="text-sm font-bold">2%</span>
                    </div>
                    <Progress value={2} className="h-2" />
                  </div>

                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-800">💚 Hiệu suất xuất sắc</p>
                    <p className="text-xs text-green-600">
                      ROI cao hơn 5% so với trung bình ngành. Tiềm năng mở rộng tốt.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(departmentData).map(([dept, data]) => {
              const Icon = departmentIcons[dept as keyof typeof departmentIcons];
              return (
                <Card key={dept} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {dept === 'shareholders' && '💰 Cổ đông & Vốn góp'}
                      {dept === 'business' && '📈 Kinh doanh'}
                      {dept === 'marketing' && '📢 Marketing'}
                      {dept === 'finance' && '💳 Tài chính'}
                      {dept === 'hr' && '👥 Nhân sự - Đào tạo'}
                      {dept === 'warehouse' && '📦 Kho vận'}
                      {dept === 'strategy' && '🎯 Chiến lược & R&D'}
                      {dept === 'technology' && '⚙️ Công nghệ & IT'}
                      {dept === 'legal' && '🛡️ Pháp chế & Tuân thủ'}
                      {dept === 'investment' && '📊 Đầu tư & Quỹ'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {dept === 'shareholders' && (
                        <>
                          <div className="flex justify-between">
                            <span>BMC:</span>
                            <span className="font-medium">{(data as any).bmcShare}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Địa phương:</span>
                            <span className="font-medium">{(data as any).localShare}%</span>
                          </div>
                        </>
                      )}
                      {dept === 'business' && (
                        <>
                          <div className="flex justify-between">
                            <span>Doanh số:</span>
                            <span className="font-medium">{formatCurrency((data as any).totalSales)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>ROMI:</span>
                            <span className="font-medium">{(data as any).marketingROI}%</span>
                          </div>
                        </>
                      )}
                      {dept === 'finance' && (
                        <>
                          <div className="flex justify-between">
                            <span>Doanh thu:</span>
                            <span className="font-medium">{formatCurrency((data as any).revenue)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Dòng tiền:</span>
                            <span className="font-medium">{formatCurrency((data as any).cashflow)}</span>
                          </div>
                        </>
                      )}
                      {dept === 'hr' && (
                        <>
                          <div className="flex justify-between">
                            <span>Nhân sự:</span>
                            <span className="font-medium">{(data as any).totalStaff}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Hiệu suất:</span>
                            <span className="font-medium">{(data as any).avgPerformance}%</span>
                          </div>
                        </>
                      )}
                      {/* Additional department details... */}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>⚙️ Vận hành realtime F4 Chi nhánh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">🔄 Trạng thái hoạt động</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Hệ thống POS:</span>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Kết nối ERP:</span>
                      <Badge className="bg-green-100 text-green-800">Đồng bộ</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API BMC:</span>
                      <Badge className="bg-green-100 text-green-800">Hoạt động</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">📊 Chỉ số vận hành</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Đơn hàng/ngày:</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tiến độ:</span>
                      <span className="font-medium">Hoàn thành tốt</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Thời gian xử lý:</span>
                      <span className="font-medium">12 phút</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>📊 AI Analytics - F4 Branch Intelligence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">🤖 AI Insights</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">📈 Dự báo doanh thu</p>
                      <p className="text-xs text-blue-600">Tháng tới: +12% (5.6 tỷ VNĐ)</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-800">💡 Tối ưu hóa</p>
                      <p className="text-xs text-green-600">Giảm chi phí kho 8% bằng AI inventory</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <p className="text-sm font-medium text-amber-800">⚠️ Cảnh báo</p>
                      <p className="text-xs text-amber-600">Nhân sự peak hours cần bổ sung</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">📊 Performance Metrics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Hiệu suất vs F3</span>
                        <span>108%</span>
                      </div>
                      <Progress value={108} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Benchmark ngành</span>
                        <span>115%</span>
                      </div>
                      <Progress value={115} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mục tiêu BMC</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reporting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>📋 Trung tâm báo cáo - Đồng bộ hệ sinh thái</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">📊 Báo cáo tự động</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      📈 Báo cáo ngày (→ F3)
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      📊 Báo cáo tuần (→ F1)  
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      📋 Báo cáo tháng (→ BMC)
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">🔄 Đồng bộ dữ liệu</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tài chính:</span>
                      <Badge className="bg-green-100 text-green-800">Realtime</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Kho vận:</span>
                      <Badge className="bg-green-100 text-green-800">Realtime</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">HR:</span>
                      <Badge className="bg-yellow-100 text-yellow-800">15 phút</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">🎯 KPI Tracking</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Doanh thu:</span>
                      <span className="text-sm font-medium text-green-600">✓ 108%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Lợi nhuận:</span>
                      <span className="text-sm font-medium text-green-600">✓ 112%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Hiệu suất:</span>
                      <span className="text-sm font-medium text-amber-600">⚠ 92%</span>
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Báo cáo F4 - Chi nhánh</DialogTitle>
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