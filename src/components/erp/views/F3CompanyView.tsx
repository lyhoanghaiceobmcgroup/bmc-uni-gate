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
  Calendar,
  FileText,
  X,
  Save,
  Check
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface F3CompanyViewProps {
  onBack: () => void;
  companyData: any;
}

// Mock data cho F3 Company với data từ F4-F5
const mockF3Companies = {
  "EDU-001": {
    id: "F3_EDU_001",
    name: "EduHolding JSC - Công ty Giáo dục",
    level: "F3",
    type: "strategic_company",
    sector: "Education Technology",
    establishedDate: "2020-01-15",
    taxCode: "0108123456",
    legalRepresentative: "Nguyễn Thị Minh Hạnh",
    bmcOwnership: 40.2,
    partnerOwnership: 59.8,
    currentValuation: 180000000000,
    autoTieringStatus: "developing", // chưa đạt 55% để lên F2
    nextTierTarget: "F2",
    tieringProgress: 73,
    
    // Consolidated từ F4-F5 - RESET TO 0
    quarterlyRevenue: 0,
    quarterlyExpense: 0, 
    quarterlyProfit: 0,
    totalStaff: 0,
    avgKPI: 0,
    complianceScore: 0,
    
    // 9 phòng ban data
    departments: {
      shareholders: {
        bmcShares: 40.2,
        partnerShares: 59.8,
        boardMembers: 5,
        lastMeeting: "2024-01-15",
        dividendPolicy: "Quarterly distribution"
      },
      business: {
        totalRevenue: 0,
        newCustomers: 0,
        customerRetention: 0,
        marketingROI: 0,
        topProducts: ["Online courses", "Corporate training", "E-learning platform"]
      },
      finance: {
        cashPosition: 0,
        accountsReceivable: 0,
        accountsPayable: 0,
        profitMargin: 0,
        liquidityRatio: 0
      },
      hr: {
        totalEmployees: 0,
        departmentBreakdown: {
          "Teaching": 0,
          "Technology": 0,
          "Sales & Marketing": 0,
          "Operations": 0
        },
        avgKPI: 0,
        attritionRate: 0,
        trainingBudget: 0
      },
      warehouse: {
        digitalAssets: "Cloud-based learning materials",
        physicalInventory: 0,
        itEquipment: 0,
        utilizationRate: 0
      },
      strategy: {
        activeProjects: 0,
        rdBudget: 0,
        innovations: ["AI tutoring", "VR classroom", "Blockchain certificates"],
        marketExpansion: ["Southeast Asia", "Corporate B2B"]
      },
      technology: {
        systemUptime: 0,
        cloudCosts: 0,
        securityScore: 0,
        platforms: ["LMS", "CRM", "HRM", "Financial System"]
      },
      legal: {
        activeContracts: 0,
        internationalContracts: 0,
        complianceScore: 0,
        intellectualProperty: 0,
        riskAssessment: "low"
      },
      investment: {
        totalInvested: 0,
        subsidiaries: [
          { name: "Talky English Startup", level: "F5", ownership: 0, valuation: 0 },
          { name: "EduTech Lab", level: "F4", ownership: 0, valuation: 0 }
        ],
        roi: 0
      }
    },
    
    // Subsidiaries F4-F5
    subsidiaries: [
      {
        id: "F5_TALKY_001",
        name: "Talky English - Startup",
        level: "F5", 
        bmcOwnership: 0,
        monthlyRevenue: 0,
        staff: 0,
        kpi: 0
      },
      {
        id: "F4_EDU_LAB_001", 
        name: "EduTech Lab - Chi nhánh",
        level: "F4",
        bmcOwnership: 0,
        monthlyRevenue: 0,
        staff: 0,
        kpi: 0
      }
    ]
  }
};

export function F3CompanyView({ onBack, companyData }: F3CompanyViewProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTimeframe, setSelectedTimeframe] = useState("quarter");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportData, setReportData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const company = mockF3Companies["EDU-001"];

  // Load draft data on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(`f3_report_draft_${company.id}`);
    if (savedDraft) {
      try {
        setReportData(JSON.parse(savedDraft));
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, [company.id]);

  // Save draft function
  const handleSaveDraft = async () => {
    setSavingDraft(true);
    try {
      localStorage.setItem(`f3_report_draft_${company.id}`, JSON.stringify(reportData));
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
          company_id: company.id,
          company_name: company.name,
          report_date: new Date().toISOString().split('T')[0],
          revenue: reportData.revenue || 0,
          employee_count: reportData.employeeCount || 0,
          kpi_score: reportData.kpiScore || 0,
          status: 'active',
          organizational_level: 'F3',
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
      localStorage.removeItem(`f3_report_draft_${company.id}`);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "eligible": return "bg-green-100 text-green-800";
      case "approaching": return "bg-amber-100 text-amber-800";
      case "developing": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
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
              <span>🏢 F1 Cụm Giáo dục</span>
              <span>→</span>
              <Badge variant="secondary">🏬 F3 EduHolding JSC</Badge>
            </div>
            <h1 className="text-2xl font-semibold text-foreground">{company.name}</h1>
            <p className="text-muted-foreground">
              {company.sector} • MST: {company.taxCode} • Vốn góp BMC: Kiểm soát
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Thêm F4/F5
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsReportModalOpen(true)}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Báo cáo
          </Button>
          <Button className="bg-gradient-primary">
            <MessageSquare className="h-4 w-4 mr-2" />
            🤖 AI CFO
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
        <Select defaultValue="consolidated">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="consolidated">Hợp nhất</SelectItem>
            <SelectItem value="individual">Riêng lẻ</SelectItem>
            <SelectItem value="comparative">So sánh</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all-departments">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-departments">🌐 Tất cả phòng ban</SelectItem>
            <SelectItem value="finance">💳 Tài chính</SelectItem>
            <SelectItem value="business">📈 Kinh doanh</SelectItem>
            <SelectItem value="hr">👥 Nhân sự</SelectItem>
            <SelectItem value="legal">🛡️ Pháp chế</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-3">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              Vốn góp BMC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Kiểm soát</div>
            <p className="text-xs text-muted-foreground">Quyền quản lý</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              Doanh thu quý
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatCurrency(company.quarterlyRevenue)}</div>
            <p className="text-xs text-green-600">+12% vs quý trước</p>
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
            <div className="text-lg font-bold">{formatCurrency(company.quarterlyProfit)}</div>
            <p className="text-xs text-muted-foreground">Tỷ suất {company.departments.finance.profitMargin}%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Users className="h-3 w-3" />
              Nhân sự
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{company.totalStaff}</div>
            <p className="text-xs text-muted-foreground">KPI: {company.avgKPI}%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              F4/F5 trực thuộc
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{company.subsidiaries.length}</div>
            <p className="text-xs text-muted-foreground">Chi nhánh & startup</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-cyan-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <PieChart className="h-3 w-3" />
              ROI đầu tư
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{company.departments.investment.roi}%</div>
            <p className="text-xs text-green-600">Hiệu suất tốt</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{company.complianceScore}%</div>
            <p className="text-xs text-green-600">Đạt chuẩn</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Cog className="h-3 w-3" />
              Tech Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{company.departments.technology.systemUptime}%</div>
            <p className="text-xs text-green-600">Ổn định</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-pink-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-1">
              <Target className="h-3 w-3" />
              Auto-Tier
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{company.tieringProgress}%</div>
            <p className="text-xs text-muted-foreground">Đến F2</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Company Intelligence */}
      <Card className="border-l-4 border-l-gradient-primary bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            🤖 AI F3 Company Intelligence - EduHolding JSC
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-foreground">📊 Consolidation Status:</h4>
              <p className="text-sm text-muted-foreground">
                Hợp nhất {company.subsidiaries.length} đơn vị F4-F5 với doanh thu quý {formatCurrency(company.quarterlyRevenue)}. 
                Tỷ suất lợi nhuận {company.departments.finance.profitMargin}% vượt target ngành.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-amber-600">⚠️ Management Alert:</h4>
              <p className="text-sm text-muted-foreground">
                Cần tăng vốn góp BMC từ {company.bmcOwnership}% lên 55% để đủ điều kiện thăng F2. 
                Startup Talky cần focus tăng KPI lên 80%+.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-green-600">💡 Strategic Recommendations:</h4>
              <p className="text-sm text-muted-foreground">
                Mở rộng sang thị trường Đông Nam Á với budget R&D {formatCurrency(company.departments.strategy.rdBudget)}. 
                Tích hợp AI tutoring để tăng competitive advantage.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview">🏢 Tổng quan</TabsTrigger>
          <TabsTrigger value="subsidiaries">🏪 F4-F5</TabsTrigger>
          <TabsTrigger value="finance">💳 Tài chính</TabsTrigger>
          <TabsTrigger value="operations">⚙️ Vận hành</TabsTrigger>
          <TabsTrigger value="governance">🏛️ Quản trị</TabsTrigger>
          <TabsTrigger value="analytics">📊 AI Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🏢 Thông tin Công ty</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Tên công ty:</span>
                    <p className="text-muted-foreground">{company.name}</p>
                  </div>
                  <div>
                    <span className="font-medium">Mã số thuế:</span>
                    <p className="text-muted-foreground">{company.taxCode}</p>
                  </div>
                  <div>
                    <span className="font-medium">Lĩnh vực:</span>
                    <p className="text-muted-foreground">{company.sector}</p>
                  </div>
                  <div>
                    <span className="font-medium">Người đại diện:</span>
                    <p className="text-muted-foreground">{company.legalRepresentative}</p>
                  </div>
                  <div>
                    <span className="font-medium">Ngày thành lập:</span>
                    <p className="text-muted-foreground">{company.establishedDate}</p>
                  </div>
                  <div>
                    <span className="font-medium">Định giá hiện tại:</span>
                    <p className="text-muted-foreground">{formatCurrency(company.currentValuation)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>💰 Cổ đông & Vốn góp</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                    <div>
                      <p className="font-medium">BMC Holdings</p>
                      <p className="text-xs text-muted-foreground">Cổ đông chiến lược</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">Kiểm soát</span>
                      <p className="text-xs text-muted-foreground">Quyền quản lý</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Đối tác Giáo dục</p>
                      <p className="text-xs text-muted-foreground">Cổ đông sáng lập</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">Đối tác</span>
                      <p className="text-xs text-muted-foreground">Cổ đông sáng lập</p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="font-medium mb-2">🎯 Auto-Tiering Progress</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Tiến độ lên F2:</span>
                        <span>Đang phát triển</span>
                      </div>
                      <Progress value={company.tieringProgress} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Đang mở rộng quyền kiểm soát
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subsidiaries" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">🏪 Danh sách F4-F5 trực thuộc</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Thêm đơn vị
            </Button>
          </div>
          
          <div className="grid gap-4">
            {company.subsidiaries.map((sub) => (
              <Card key={sub.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge variant={sub.level === "F5" ? "secondary" : "outline"}>{sub.level}</Badge>
                      <div>
                        <h4 className="font-medium">{sub.name}</h4>
                        <p className="text-sm text-muted-foreground">BMC ownership: {sub.bmcOwnership}%</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Xem chi tiết
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Doanh thu tháng:</span>
                      <p className="font-medium">{formatCurrency(sub.monthlyRevenue)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Nhân sự:</span>
                      <p className="font-medium">{sub.staff} người</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">KPI trung bình:</span>
                      <p className="font-medium">{sub.kpi}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">💰 Tài chính quý</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Doanh thu:</span>
                    <span className="font-medium">{formatCurrency(company.quarterlyRevenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Chi phí:</span>
                    <span className="font-medium">{formatCurrency(company.quarterlyExpense)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Lợi nhuận:</span>
                    <span className="font-bold text-green-600">{formatCurrency(company.quarterlyProfit)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Tỷ suất: {company.departments.finance.profitMargin}%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">💳 Tình hình nợ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Nợ phải thu:</span>
                    <span className="font-medium">{formatCurrency(company.departments.finance.accountsReceivable)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Nợ phải trả:</span>
                    <span className="font-medium">{formatCurrency(company.departments.finance.accountsPayable)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Tiền mặt:</span>
                    <span className="font-bold text-blue-600">{formatCurrency(company.departments.finance.cashPosition)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Tỷ số thanh khoản: {company.departments.finance.liquidityRatio}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">📊 Hiệu suất đầu tư</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Tổng đầu tư:</span>
                    <span className="font-medium">{formatCurrency(company.departments.investment.totalInvested)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">ROI hiện tại:</span>
                    <span className="font-bold text-green-600">{company.departments.investment.roi}%</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {company.departments.investment.subsidiaries.length} khoản đầu tư F4-F5
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
                <CardTitle>👥 Nhân sự theo phòng ban</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(company.departments.hr.departmentBreakdown).map(([dept, count]) => (
                    <div key={dept} className="flex items-center justify-between">
                      <span className="text-sm">{dept}:</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(count as number / company.totalStaff) * 100} className="h-2 w-16" />
                        <span className="text-sm font-medium">{count} người</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>KPI trung bình:</span>
                    <span className="font-medium">{company.avgKPI}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tỷ lệ nghỉ việc:</span>
                    <span className="font-medium">{company.departments.hr.attritionRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⚙️ Hệ thống & Công nghệ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">System Uptime:</span>
                    <span className="font-bold text-green-600">{company.departments.technology.systemUptime}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Security Score:</span>
                    <span className="font-medium">{company.departments.technology.securityScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cloud Costs:</span>
                    <span className="font-medium">{formatCurrency(company.departments.technology.cloudCosts)}/tháng</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Platforms đang sử dụng:</h4>
                  <div className="flex flex-wrap gap-1">
                    {company.departments.technology.platforms.map((platform) => (
                      <Badge key={platform} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="governance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🏛️ Quản trị Công ty</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <span className="font-medium">Người đại diện pháp luật:</span>
                    <p className="text-muted-foreground">{company.legalRepresentative}</p>
                  </div>
                  <div>
                    <span className="font-medium">Số thành viên HĐQT:</span>
                    <p className="text-muted-foreground">{company.departments.shareholders.boardMembers} thành viên</p>
                  </div>
                  <div>
                    <span className="font-medium">Cuộc họp gần nhất:</span>
                    <p className="text-muted-foreground">{company.departments.shareholders.lastMeeting}</p>
                  </div>
                  <div>
                    <span className="font-medium">Chính sách cổ tức:</span>
                    <p className="text-muted-foreground">{company.departments.shareholders.dividendPolicy}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🛡️ Pháp chế & Tuân thủ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Compliance Score:</span>
                      <span className="text-lg font-bold">{company.complianceScore}%</span>
                    </div>
                    <Progress value={company.complianceScore} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Hợp đồng hiện tại:</span>
                      <p className="text-muted-foreground">{company.departments.legal.activeContracts}</p>
                    </div>
                    <div>
                      <span className="font-medium">HĐ quốc tế:</span>
                      <p className="text-muted-foreground">{company.departments.legal.internationalContracts}</p>
                    </div>
                    <div>
                      <span className="font-medium">Sở hữu trí tuệ:</span>
                      <p className="text-muted-foreground">{company.departments.legal.intellectualProperty}</p>
                    </div>
                    <div>
                      <span className="font-medium">Đánh giá rủi ro:</span>
                      <Badge variant="outline" className="text-xs">
                        {company.departments.legal.riskAssessment}
                      </Badge>
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
              <CardTitle>🤖 AI Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">📊 Performance Insights</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-800">✅ Strong Points</p>
                      <p className="text-xs text-green-600 mt-1">
                        ROI {company.departments.investment.roi}% vượt trung bình ngành. 
                        Compliance score {company.complianceScore}% xuất sắc.
                      </p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <p className="text-sm font-medium text-amber-800">⚠️ Areas for Improvement</p>
                      <p className="text-xs text-amber-600 mt-1">
                        KPI nhân sự {company.avgKPI}% cần tăng lên 85%+. 
                        Attrition rate {company.departments.hr.attritionRate}% hơi cao.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-sm">🎯 Strategic Recommendations</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">💡 Growth Opportunities</p>
                      <p className="text-xs text-blue-600 mt-1">
                        Mở rộng sang {company.departments.strategy.marketExpansion.join(", ")} 
                        với budget R&D {formatCurrency(company.departments.strategy.rdBudget)}.
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-purple-800">🚀 Innovation Focus</p>
                      <p className="text-xs text-purple-600 mt-1">
                        Đầu tư vào {company.departments.strategy.innovations.join(", ")} 
                        để duy trì competitive advantage.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-sm">📈 Predictive Analytics</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <p className="text-sm font-medium text-indigo-800">🔮 6-Month Forecast</p>
                      <p className="text-xs text-indigo-600 mt-1">
                        Dự báo doanh thu Q3: {formatCurrency(company.quarterlyRevenue * 1.15)}.
                        Khả năng đạt F2 tier trong 18 tháng.
                      </p>
                    </div>
                    <div className="p-3 bg-pink-50 rounded-lg">
                      <p className="text-sm font-medium text-pink-800">⚡ Risk Alerts</p>
                      <p className="text-xs text-pink-600 mt-1">
                        Theo dõi cash flow khi mở rộng quốc tế. 
                        Chuẩn bị compliance framework cho thị trường mới.
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Báo cáo F3 Company
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="revenue">Doanh thu (VND)</Label>
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
                <Label htmlFor="kpiScore">KPI Score (%)</Label>
                <Input
                  id="kpiScore"
                  name="kpiScore"
                  type="number"
                  value={reportData.kpiScore}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <Label htmlFor="marketShare">Thị phần (%)</Label>
                <Input
                  id="marketShare"
                  name="marketShare"
                  type="number"
                  value={reportData.marketShare}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  max="100"
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
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsReportModalOpen(false)}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Hủy
              </Button>
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={savingDraft}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {savingDraft ? "Đang lưu..." : "Lưu nháp"}
              </Button>
              <Button
                onClick={handleReportSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <Check className="h-4 w-4" />
                {isSubmitting ? "Đang gửi..." : "Đồng ý (Gửi & đồng bộ)"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}