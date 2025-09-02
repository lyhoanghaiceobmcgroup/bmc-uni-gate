import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { OrganizationSetupForm } from "@/components/erp/OrganizationSetupForm";
import DeleteCompanies from "@/components/erp/DeleteCompanies";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

import {
  Search,
  Filter,
  Download,
  FileText,
  Eye,
  BarChart3,
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Calculator,
  GraduationCap,
  Factory,
  Target,
  Laptop,
  Shield,
  PieChart,
  Save,
  X,
  Check
} from "lucide-react";

// Mock data cho danh sách công ty - Đã xóa tất cả thông tin công ty theo yêu cầu
const mockCompanies = [];

// 12 modules theo yêu cầu
const reportModules = [
  { id: "shareholders", name: "📌 Cổ đông", icon: Users, color: "bg-blue-500" },
  { id: "business", name: "📊 Kinh doanh", icon: TrendingUp, color: "bg-green-500" },
  { id: "marketing", name: "🎯 Marketing", icon: MessageSquare, color: "bg-purple-500" },
  { id: "finance", name: "💰 Tài chính", icon: DollarSign, color: "bg-yellow-500" },
  { id: "accounting", name: "📒 Kế toán", icon: Calculator, color: "bg-orange-500" },
  { id: "hr", name: "👥 Nhân sự", icon: Users, color: "bg-pink-500" },
  { id: "training", name: "🎓 Đào tạo", icon: GraduationCap, color: "bg-indigo-500" },
  { id: "production", name: "🏭 Sản xuất – Kho vận", icon: Factory, color: "bg-gray-500" },
  { id: "strategy", name: "🧭 Chiến lược – R&D", icon: Target, color: "bg-red-500" },
  { id: "technology", name: "💻 Công nghệ – Hạ tầng số", icon: Laptop, color: "bg-cyan-500" },
  { id: "legal", name: "⚖️ Pháp chế – Tuân thủ", icon: Shield, color: "bg-teal-500" },
  { id: "investment", name: "💵 Đầu tư – Vốn", icon: PieChart, color: "bg-emerald-500" }
];

// Mockup data chuyên nghiệp cho báo cáo theo phòng ban
const mockReportData = {
  // Dữ liệu báo cáo mẫu cho từng công ty
  companyReports: {
    1: { // BMC Tech Solutions
      shareholders: {
        totalShares: 1000000,
        majorShareholders: [
          { name: "BMC Holdings", shares: 750000, percentage: 75 },
          { name: "Founder Team", shares: 150000, percentage: 15 },
          { name: "Employee Stock", shares: 100000, percentage: 10 }
        ],
        lastUpdated: "2024-01-15",
        status: "approved"
      },
      business: {
        revenue: 125000000000, // 125 tỷ VND
        profit: 18750000000, // 18.75 tỷ VND
        growth: 15.2,
        marketShare: 8.5,
        keyMetrics: {
          customerSatisfaction: 94,
          projectSuccess: 98,
          clientRetention: 92
        },
        lastUpdated: "2024-01-20",
        status: "approved"
      },
      finance: {
        totalAssets: 450000000000, // 450 tỷ VND
        totalLiabilities: 180000000000, // 180 tỷ VND
        equity: 270000000000, // 270 tỷ VND
        cashFlow: 25000000000, // 25 tỷ VND
        debtRatio: 0.4,
        lastUpdated: "2024-01-18",
        status: "approved"
      },
      hr: {
        totalEmployees: 1250,
        newHires: 85,
        turnoverRate: 8.2,
        averageSalary: 25000000, // 25 triệu VND
        trainingHours: 2400,
        lastUpdated: "2024-01-22",
        status: "approved"
      }
    },
    2: { // BMC F&B Holding
      business: {
        revenue: 89000000000, // 89 tỷ VND
        profit: 12460000000, // 12.46 tỷ VND
        growth: 12.8,
        marketShare: 15.3,
        keyMetrics: {
          brandRecognition: 87,
          storeExpansion: 23,
          customerLoyalty: 89
        },
        lastUpdated: "2024-01-19",
        status: "approved"
      },
      production: {
        totalProduction: 45000, // tấn/tháng
        qualityScore: 96.5,
        wasteReduction: 15.2,
        efficiency: 92.8,
        supplierRating: 94,
        lastUpdated: "2024-01-21",
        status: "approved"
      }
    }
  },
  
  // Template dữ liệu cho các phòng ban
  departmentTemplates: {
    shareholders: {
      fields: ["Tổng số cổ phần", "Cổ đông lớn", "Tỷ lệ sở hữu", "Quyền biểu quyết"],
      metrics: ["Giá trị cổ phiếu", "Cổ tức", "ROE", "P/E Ratio"]
    },
    business: {
      fields: ["Doanh thu", "Lợi nhuận", "Tăng trưởng", "Thị phần"],
      metrics: ["ROI", "EBITDA", "Gross Margin", "Net Margin"]
    },
    marketing: {
      fields: ["Ngân sách Marketing", "Chiến dịch", "Conversion Rate", "Brand Awareness"],
      metrics: ["CAC", "LTV", "ROAS", "Engagement Rate"]
    },
    finance: {
      fields: ["Tổng tài sản", "Nợ phải trả", "Vốn chủ sở hữu", "Dòng tiền"],
      metrics: ["Current Ratio", "Debt-to-Equity", "Cash Ratio", "Working Capital"]
    },
    hr: {
      fields: ["Tổng nhân sự", "Tuyển dụng mới", "Tỷ lệ nghỉ việc", "Lương TB"],
      metrics: ["Employee Satisfaction", "Training ROI", "Productivity", "Retention Rate"]
    },
    production: {
      fields: ["Sản lượng", "Chất lượng", "Hiệu suất", "An toàn"],
      metrics: ["OEE", "Defect Rate", "Downtime", "Cost per Unit"]
    }
  }
};

interface CompanyHubViewProps {
  organizations?: any[];
}

export function CompanyHubView({ organizations = [] }: CompanyHubViewProps) {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCluster, setSelectedCluster] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("shareholders");
  const [reportData, setReportData] = useState(mockReportData);
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [showDashboard, setShowDashboard] = useState<number | null>(null);
  const [showOrganizationDialog, setShowOrganizationDialog] = useState(false);
  const [realOrganizations, setRealOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load organizations from database
  useEffect(() => {
    loadOrganizations();
  }, [user]);

  // Hàm đồng bộ dữ liệu với departments table
  const syncDepartmentData = async (companyId: string, department: string, data: any) => {
    try {
      const departmentData = {
        company_id: companyId,
        department_name: department,
        data: data,
        last_updated: new Date().toISOString(),
        status: 'active'
      };

      const { error } = await supabase
        .from('departments')
        .upsert(departmentData, { onConflict: 'company_id,department_name' });

      if (error) {
        console.error('Error syncing department data:', error);
      } else {
        console.log('✅ Department data synced successfully');
      }
    } catch (error) {
      console.error('Error in syncDepartmentData:', error);
    }
  };

  // Hàm tạo AI insights cho báo cáo công ty
  const generateCompanyAIInsights = async (reportId: string, reportData: any) => {
    try {
      const insights = [];

      // Phân tích theo level công ty
      if (reportData.company_level === 'F1') {
        insights.push({
          report_id: reportId,
          insight_type: 'strategic_analysis',
          title: 'Phân tích chiến lược F1',
          description: 'Công ty F1 cần tập trung vào mở rộng thị trường và đầu tư công nghệ.',
          recommendation: 'Tăng cường đầu tư R&D và phát triển sản phẩm mới.',
          confidence_score: 0.9
        });
      } else if (reportData.company_level === 'F5') {
        insights.push({
          report_id: reportId,
          insight_type: 'startup_guidance',
          title: 'Hướng dẫn phát triển F5',
          description: 'Startup cần tập trung vào product-market fit và tăng trưởng người dùng.',
          recommendation: 'Ưu tiên phát triển MVP và thu thập feedback từ khách hàng.',
          confidence_score: 0.85
        });
      }

      // Lưu insights vào database
      for (const insight of insights) {
        await supabase.from('ai_insights').insert(insight);
      }

      console.log('🤖 AI insights generated successfully');
    } catch (error) {
      console.error('Error generating AI insights:', error);
    }
  };

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

      setRealOrganizations(data || []);
    } catch (error) {
      console.error('Error loading organizations:', error);
      toast.error("Lỗi tải danh sách tổ chức");
    } finally {
      setLoading(false);
    }
  };


  // Filter companies based on search and filters
  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.taxCode.includes(searchTerm) ||
                         company.cluster.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCluster = selectedCluster === "all" || company.cluster === selectedCluster;
    const matchesLevel = selectedLevel === "all" || company.level === selectedLevel;
    
    return matchesSearch && matchesCluster && matchesLevel;
  });

  const getComplianceColor = (score: number) => {
    if (score >= 95) return "bg-green-500";
    if (score >= 90) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleReportSubmit = async () => {
    if (!selectedCompany || !formData) return;
    
    setIsSubmitting(true);
    
    try {
      // Tạo dữ liệu báo cáo theo format Supabase
      const reportData = {
        user_id: user?.id || 'system',
        company_id: selectedCompany.id,
        company_name: selectedCompany.name,
        company_level: selectedCompany.level,
        company_cluster: selectedCompany.cluster,
        department: activeTab,
        report_date: new Date().toISOString().split('T')[0],
        reporter: user?.email || 'system',
        role: user?.role || 'Manager',
        data: formData,
        status: 'submitted' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Đồng bộ với Supabase database
      const { data: supabaseData, error } = await supabase
        .from('company_reports')
        .insert(reportData);

      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }

      // Cập nhật reportData state với dữ liệu mới
      const updatedReportData = {
        ...reportData,
        companyReports: {
          ...reportData.companyReports,
          [selectedCompany.id]: {
            ...reportData.companyReports[selectedCompany.id],
            [activeTab]: {
              ...formData,
              lastUpdated: new Date().toISOString().split('T')[0],
              status: 'approved'
            }
          }
        }
      };
      
      setReportData(updatedReportData);

      // Đồng bộ với departments table
      await syncDepartmentData(selectedCompany.id, activeTab, formData);

      // Tạo AI insights cho báo cáo
      await generateCompanyAIInsights(supabaseData?.id, reportData);
      
      console.log('✅ Dữ liệu đã được lưu trữ và đồng bộ thành công với Supabase');
      console.log('📊 Dashboard và phòng ban sẽ được cập nhật real-time');
      
      // Reset form và đóng modal
      setFormData({});
      setIsReportModalOpen(false);
      setSelectedCompany(null);
      setActiveTab("shareholders");
      
    } catch (error) {
      console.error('❌ Lỗi khi lưu trữ báo cáo:', error);
      toast({
        title: "Lỗi",
        description: "Không thể gửi báo cáo. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!selectedCompany || !formData) return;
    
    setIsDraft(true);
    
    try {
      // Tạo dữ liệu draft theo format Supabase
      const draftData = {
        user_id: user?.id || 'system',
        company_id: selectedCompany.id,
        company_name: selectedCompany.name,
        company_level: selectedCompany.level,
        company_cluster: selectedCompany.cluster,
        department: activeTab,
        report_date: new Date().toISOString().split('T')[0],
        reporter: user?.email || 'system',
        role: user?.role || 'Manager',
        data: formData,
        status: 'draft' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Lưu draft vào Supabase
      const { error } = await supabase
        .from('company_reports')
        .insert(draftData);

      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }

      console.log('💾 Draft đã được lưu vào Supabase:', draftData);
      
      toast({
        title: "Lưu nháp thành công",
        description: "Báo cáo đã được lưu tạm thời.",
      });
      
    } catch (error) {
      console.error('❌ Lỗi khi lưu draft:', error);
      
      // Fallback to localStorage if Supabase fails
      const draftKey = `draft_${selectedCompany?.id}_${activeTab}`;
      localStorage.setItem(draftKey, JSON.stringify({
        data: formData,
        savedAt: new Date().toISOString()
      }));
      
      toast({
        title: "Lưu nháp cục bộ",
        description: "Báo cáo đã được lưu tạm thời trên thiết bị.",
      });
    } finally {
      setIsDraft(false);
    }
  };
  
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const getCurrentReportData = () => {
    if (!selectedCompany) return null;
    return reportData.companyReports[selectedCompany.id]?.[activeTab] || null;
  };
  
  const getDepartmentTemplate = () => {
    return reportData.departmentTemplates[activeTab] || { fields: [], metrics: [] };
  };

  const renderModuleForm = (moduleId: string) => {
    const module = reportModules.find(m => m.id === moduleId);
    const template = getDepartmentTemplate();
    const currentData = getCurrentReportData();
    
    if (!module) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${module.color} text-white`}>
              <module.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{module.name}</h3>
              {currentData && (
                <p className="text-sm text-muted-foreground">
                  Cập nhật lần cuối: {currentData.lastUpdated} • 
                  <Badge variant={currentData.status === 'approved' ? 'default' : 'secondary'} className="ml-1">
                    {currentData.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                  </Badge>
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Hiển thị dữ liệu hiện có nếu có */}
        {currentData && (
          <div className="bg-muted/50 p-4 rounded-lg mb-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dữ liệu hiện tại
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {Object.entries(currentData).map(([key, value]) => {
                if (key === 'lastUpdated' || key === 'status') return null;
                return (
                  <div key={key} className="space-y-1">
                    <p className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="font-medium">
                      {typeof value === 'number' ? value.toLocaleString() : String(value)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Form nhập liệu động theo template */}
        <div className="space-y-4">
          <h4 className="font-medium">Nhập dữ liệu mới</h4>
          
          {/* Các trường chính */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {template.fields?.map((field, index) => (
              <div key={index}>
                <Label htmlFor={`field-${index}`}>{field}</Label>
                <Input 
                  id={`field-${index}`}
                  placeholder={`Nhập ${field.toLowerCase()}`}
                  value={formData[`field_${index}`] || ''}
                  onChange={(e) => handleInputChange(`field_${index}`, e.target.value)}
                />
              </div>
            ))}
          </div>
          
          {/* Các chỉ số */}
          {template.metrics && template.metrics.length > 0 && (
            <div>
              <h5 className="font-medium mb-2">Chỉ số đánh giá</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {template.metrics.map((metric, index) => (
                  <div key={index}>
                    <Label htmlFor={`metric-${index}`}>{metric}</Label>
                    <Input 
                      id={`metric-${index}`}
                      type="number"
                      placeholder={`Nhập ${metric.toLowerCase()}`}
                      value={formData[`metric_${index}`] || ''}
                      onChange={(e) => handleInputChange(`metric_${index}`, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Ghi chú */}
          <div>
            <Label htmlFor="notes">Ghi chú và nhận xét</Label>
            <Textarea 
              id="notes"
              placeholder="Nhập ghi chú, nhận xét về báo cáo này..."
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">🏢 Công ty</h1>
          <p className="text-muted-foreground">Quản lý và nhập báo cáo cho các công ty trong hệ sinh thái BMC</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {user?.email}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            BMC Holdings
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm theo tên, MST, ngành..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedCluster} onValueChange={setSelectedCluster}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Cụm ngành" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả cụm</SelectItem>
                  <SelectItem value="F&B">F&B</SelectItem>
                  <SelectItem value="Giáo dục">Giáo dục</SelectItem>
                  <SelectItem value="Bán lẻ trang sức">Bán lẻ trang sức</SelectItem>
                  <SelectItem value="Công nghệ">Công nghệ</SelectItem>
                  <SelectItem value="Năng lượng">Năng lượng</SelectItem>
                  <SelectItem value="Y tế">Y tế</SelectItem>
                  <SelectItem value="Logistics">Logistics</SelectItem>
                  <SelectItem value="Tài chính">Tài chính</SelectItem>
                  <SelectItem value="Nông nghiệp">Nông nghiệp</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tầng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả tầng</SelectItem>
                  <SelectItem value="F2">F2</SelectItem>
                  <SelectItem value="F3">F3</SelectItem>
                  <SelectItem value="F4">F4</SelectItem>
                  <SelectItem value="F5">F5</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Lọc
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Xuất
              </Button>
              <Dialog open={showOrganizationDialog} onOpenChange={setShowOrganizationDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Building2 className="h-4 w-4 mr-2" />
                    Khởi tạo doanh nghiệp
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Khởi tạo doanh nghiệp mới</DialogTitle>
                  </DialogHeader>
                  <OrganizationSetupForm onComplete={() => {
                    setShowOrganizationDialog(false);
                    toast.success("Tạo doanh nghiệp thành công!");
                    // Refresh page or update state as needed
                    window.location.reload();
                  }} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Real Organizations from Database */}
      {realOrganizations.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <h3 className="text-lg font-semibold text-green-600">Doanh nghiệp mới tạo</h3>
            <Badge variant="secondary" className="text-xs">Từ database</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {realOrganizations.map((orgRole) => {
              const org = orgRole.organizations;
              if (!org) return null;
              
              return (
                <Card key={org.id} className="hover:shadow-md transition-shadow border-l-4 border-l-green-600">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{org.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          MST: {org.tax_code || 'Chưa có'}
                        </p>
                      </div>
                      <Badge variant={org.level === 'F5' ? 'secondary' : 'default'} className="text-xs">
                        {org.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Ngành:</span>
                        <p className="font-medium">{org.industry || 'Chưa xác định'}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Vốn BMC:</span>
                        <p className="font-medium text-green-600">{org.bmc_equity_percentage || 0}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tổng đầu tư:</span>
                        <p className="font-medium">{org.total_investment_value ? `${(org.total_investment_value / 1000000000).toFixed(1)}B VNĐ` : 'Chưa có'}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Vai trò:</span>
                        <p className="font-medium capitalize">{orgRole.role}</p>
                      </div>
                    </div>
                    
                    {org.products && org.products.length > 0 && (
                      <div>
                        <span className="text-muted-foreground text-sm">Sản phẩm chính:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {org.products.slice(0, 2).map((product: any, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {product.name}
                            </Badge>
                          ))}
                          {org.products.length > 2 && (
                            <Badge variant="outline" className="text-xs">+{org.products.length - 2}</Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        Chi tiết
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <FileText className="h-3 w-3 mr-1" />
                        Báo cáo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Company List - Grouped by Level */}
      <div className="space-y-8">
        {/* F2 - Core Holdings */}
        {filteredCompanies.filter(c => c.level === 'F2').length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <h3 className="text-lg font-semibold text-blue-600">F2 - Core Holdings</h3>
              <Badge variant="secondary" className="text-xs">Tỷ lệ vốn cao</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCompanies.filter(c => c.level === 'F2').map((company) => (
                <Card key={company.id} className="hover:shadow-md transition-shadow border-l-4 border-l-blue-600">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{company.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          MST: {company.taxCode}
                        </p>
                      </div>
                      <Badge variant={company.level === 'F2' ? 'default' : 'secondary'} className="text-xs">
                        {company.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Ngành:</span>
                        <p className="font-medium">{company.cluster}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Vốn BMC:</span>
                        <p className="font-medium text-blue-600">{company.bmcOwnership}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tuân thủ:</span>
                        <p className="font-medium">{company.complianceScore}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Trạng thái:</span>
                        <p className="font-medium capitalize">
                          {company.status === 'active' ? 'Hoạt động' : 
                           company.status === 'pending' ? 'Chờ duyệt' : 
                           company.status === 'review' ? 'Đang xem xét' : 'Tạm dừng'}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground text-sm">Mô tả:</span>
                      <div className="text-xs text-muted-foreground mt-1">
                        {company.description}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        Chi tiết
                      </Button>
                      <Dialog open={isReportModalOpen && selectedCompany?.id === company.id} onOpenChange={(open) => {
                        setIsReportModalOpen(open);
                        if (!open) {
                          setSelectedCompany(null);
                          setReportData(mockReportData);
                          setActiveTab("shareholders");
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => setSelectedCompany(company)}
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            Báo cáo
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Building2 className="h-5 w-5" />
                              Nhập báo cáo - {selectedCompany?.name}
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground">
                              {selectedCompany?.taxCode} • {selectedCompany?.cluster} • {selectedCompany?.level}
                            </p>
                          </DialogHeader>
                          
                          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid grid-cols-4 lg:grid-cols-6 w-full h-auto p-1">
                              {reportModules.map((module) => (
                                <TabsTrigger 
                                  key={module.id} 
                                  value={module.id}
                                  className="text-xs p-2 h-auto flex flex-col items-center gap-1"
                                >
                                  <module.icon className="h-4 w-4" />
                                  <span className="hidden lg:inline">{module.name.split(' ')[1] || module.name}</span>
                                </TabsTrigger>
                              ))}
                            </TabsList>
                            
                            {reportModules.map((module) => (
                              <TabsContent key={module.id} value={module.id} className="mt-4">
                                {renderModuleForm(module.id)}
                              </TabsContent>
                            ))}
                          </Tabs>
                          
                          {/* Footer Actions */}
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center gap-2">
                              {isDraft && (
                                <Badge variant="secondary" className="text-xs">
                                  <Save className="h-3 w-3 mr-1" />
                                  Đã lưu nháp
                                </Badge>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                onClick={() => setIsReportModalOpen(false)}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Hủy
                              </Button>
                              <Button 
                                variant="secondary" 
                                onClick={handleSaveDraft}
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Lưu nháp
                              </Button>
                              <Button onClick={handleReportSubmit}>
                                <Check className="h-4 w-4 mr-2" />
                                Đồng ý (Gửi & Đồng bộ)
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* F3 - Strategic Partners */}
        {filteredCompanies.filter(c => c.level === 'F3').length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <h3 className="text-lg font-semibold text-green-600">F3 - Strategic Partners</h3>
              <Badge variant="secondary" className="text-xs">Tỷ lệ vốn trung bình-cao</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCompanies.filter(c => c.level === 'F3').map((company) => (
                <Card key={company.id} className="hover:shadow-md transition-shadow border-l-4 border-l-green-600">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{company.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{company.taxCode}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {company.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Cụm ngành:</span>
                        <p className="font-medium">{company.cluster}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">% vốn BMC:</span>
                        <p className="font-semibold text-green-600">{company.bmcOwnership}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tuân thủ:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{company.complianceScore}%</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Trạng thái:</span>
                        <p className={`font-medium ${
                          company.status === 'active' ? 'text-green-600' : 
                          company.status === 'pending' ? 'text-yellow-600' : 
                          company.status === 'review' ? 'text-blue-600' : 'text-red-600'
                        }`}>
                          {company.status === 'active' ? 'Hoạt động' : 
                           company.status === 'pending' ? 'Chờ duyệt' : 
                           company.status === 'review' ? 'Đang xem xét' : 'Tạm dừng'}
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1"
                        onClick={() => setShowDashboard(showDashboard === company.id ? null : company.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Chi tiết
                      </Button>
                      <Dialog open={isReportModalOpen && selectedCompany?.id === company.id} onOpenChange={(open) => {
                        setIsReportModalOpen(open);
                        if (!open) {
                          setSelectedCompany(null);
                          setReportData(mockReportData);
                          setActiveTab("shareholders");
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => setSelectedCompany(company)}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Báo cáo
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Building2 className="h-5 w-5" />
                              Nhập báo cáo - {selectedCompany?.name}
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground">
                              {selectedCompany?.taxCode} • {selectedCompany?.cluster} • {selectedCompany?.level}
                            </p>
                          </DialogHeader>
                          
                          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid grid-cols-4 lg:grid-cols-6 w-full h-auto p-1">
                              {reportModules.map((module) => (
                                <TabsTrigger 
                                  key={module.id} 
                                  value={module.id}
                                  className="text-xs p-2 h-auto flex flex-col items-center gap-1"
                                >
                                  <module.icon className="h-4 w-4" />
                                  <span className="hidden lg:inline">{module.name.split(' ')[1] || module.name}</span>
                                </TabsTrigger>
                              ))}
                            </TabsList>
                            
                            {reportModules.map((module) => (
                              <TabsContent key={module.id} value={module.id} className="mt-4">
                                {renderModuleForm(module.id)}
                              </TabsContent>
                            ))}
                          </Tabs>
                          
                          {/* Footer Actions */}
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center gap-2">
                              {isDraft && (
                                <Badge variant="secondary" className="text-xs">
                                  <Save className="h-3 w-3 mr-1" />
                                  Đã lưu nháp
                                </Badge>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                onClick={() => setIsReportModalOpen(false)}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Hủy
                              </Button>
                              <Button 
                                variant="secondary" 
                                onClick={handleSaveDraft}
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Lưu nháp
                              </Button>
                              <Button onClick={handleReportSubmit}>
                                <Check className="h-4 w-4 mr-2" />
                                Đồng ý (Gửi & Đồng bộ)
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* F4 - Portfolio Companies */}
        {filteredCompanies.filter(c => c.level === 'F4').length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              <h3 className="text-lg font-semibold text-orange-600">F4 - Portfolio Companies</h3>
              <Badge variant="secondary" className="text-xs">Tỷ lệ vốn trung bình</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCompanies.filter(c => c.level === 'F4').map((company) => (
                <Card key={company.id} className="hover:shadow-md transition-shadow border-l-4 border-l-orange-600">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{company.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{company.taxCode}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {company.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Cụm ngành:</span>
                        <p className="font-medium">{company.cluster}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">% vốn BMC:</span>
                        <p className="font-semibold text-orange-600">{company.bmcOwnership}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tuân thủ:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{company.complianceScore}%</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Trạng thái:</span>
                        <p className={`font-medium ${
                          company.status === 'active' ? 'text-green-600' : 
                          company.status === 'pending' ? 'text-yellow-600' : 
                          company.status === 'review' ? 'text-blue-600' : 'text-red-600'
                        }`}>
                          {company.status === 'active' ? 'Hoạt động' : 
                           company.status === 'pending' ? 'Chờ duyệt' : 
                           company.status === 'review' ? 'Đang xem xét' : 'Tạm dừng'}
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1"
                        onClick={() => setShowDashboard(showDashboard === company.id ? null : company.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Chi tiết
                      </Button>
                      <Dialog open={isReportModalOpen && selectedCompany?.id === company.id} onOpenChange={(open) => {
                        setIsReportModalOpen(open);
                        if (!open) {
                          setSelectedCompany(null);
                          setReportData(mockReportData);
                          setActiveTab("shareholders");
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => setSelectedCompany(company)}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Báo cáo
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Building2 className="h-5 w-5" />
                              Nhập báo cáo - {selectedCompany?.name}
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground">
                              {selectedCompany?.taxCode} • {selectedCompany?.cluster} • {selectedCompany?.level}
                            </p>
                          </DialogHeader>
                          
                          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid grid-cols-4 lg:grid-cols-6 w-full h-auto p-1">
                              {reportModules.map((module) => (
                                <TabsTrigger 
                                  key={module.id} 
                                  value={module.id}
                                  className="text-xs p-2 h-auto flex flex-col items-center gap-1"
                                >
                                  <module.icon className="h-4 w-4" />
                                  <span className="hidden lg:inline">{module.name.split(' ')[1] || module.name}</span>
                                </TabsTrigger>
                              ))}
                            </TabsList>
                            
                            {reportModules.map((module) => (
                              <TabsContent key={module.id} value={module.id} className="mt-4">
                                {renderModuleForm(module.id)}
                              </TabsContent>
                            ))}
                          </Tabs>
                          
                          {/* Footer Actions */}
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center gap-2">
                              {isDraft && (
                                <Badge variant="secondary" className="text-xs">
                                  <Save className="h-3 w-3 mr-1" />
                                  Đã lưu nháp
                                </Badge>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                onClick={() => setIsReportModalOpen(false)}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Hủy
                              </Button>
                              <Button 
                                variant="secondary" 
                                onClick={handleSaveDraft}
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Lưu nháp
                              </Button>
                              <Button onClick={handleReportSubmit}>
                                <Check className="h-4 w-4 mr-2" />
                                Đồng ý (Gửi & Đồng bộ)
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* F5 - Startups & New Ventures */}
        {filteredCompanies.filter(c => c.level === 'F5').length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <h3 className="text-lg font-semibold text-purple-600">F5 - Startups & New Ventures</h3>
              <Badge variant="secondary" className="text-xs">Tỷ lệ vốn thấp</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCompanies.filter(c => c.level === 'F5').map((company) => (
                <Card key={company.id} className="hover:shadow-md transition-shadow border-l-4 border-l-purple-600">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{company.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{company.taxCode}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge variant="secondary" className="text-xs">
                          {company.level}
                        </Badge>
                        <Badge 
                          variant={company.status === 'active' ? 'default' : 
                                  company.status === 'pending' ? 'secondary' : 
                                  company.status === 'review' ? 'outline' : 'destructive'}
                        >
                          {company.status === 'active' ? 'Hoạt động' : 
                           company.status === 'pending' ? 'Chờ duyệt' : 
                           company.status === 'review' ? 'Đang xem xét' : 'Tạm dừng'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground block">Cụm ngành</span>
                        <span className="font-medium">{company.cluster}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">% vốn BMC</span>
                        <span className="font-semibold text-purple-600">{company.bmcOwnership}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Tuân thủ</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{company.complianceScore}%</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Trạng thái</span>
                        <span className="font-medium">
                          {company.status === 'active' ? 'Hoạt động' : 
                           company.status === 'pending' ? 'Chờ duyệt' : 
                           company.status === 'review' ? 'Đang xem xét' : 'Tạm dừng'}
                        </span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Chi tiết
                      </Button>
                      <Dialog open={isReportModalOpen && selectedCompany?.id === company.id} onOpenChange={(open) => {
                        setIsReportModalOpen(open);
                        if (!open) {
                          setSelectedCompany(null);
                          setReportData(mockReportData);
                          setActiveTab("shareholders");
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => setSelectedCompany(company)}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Báo cáo
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Building2 className="h-5 w-5" />
                              Nhập báo cáo - {selectedCompany?.name}
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground">
                              {selectedCompany?.taxCode} • {selectedCompany?.cluster} • {selectedCompany?.level}
                            </p>
                          </DialogHeader>
                          
                          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid grid-cols-4 lg:grid-cols-6 w-full h-auto p-1">
                              {reportModules.map((module) => (
                                <TabsTrigger 
                                  key={module.id} 
                                  value={module.id}
                                  className="text-xs p-2 h-auto flex flex-col items-center gap-1"
                                >
                                  <module.icon className="h-4 w-4" />
                                  <span className="hidden lg:inline">{module.name.split(' ')[1] || module.name}</span>
                                </TabsTrigger>
                              ))}
                            </TabsList>
                            
                            {reportModules.map((module) => (
                              <TabsContent key={module.id} value={module.id} className="mt-4">
                                {renderModuleForm(module.id)}
                              </TabsContent>
                            ))}
                          </Tabs>
                          
                          {/* Footer Actions */}
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center gap-2">
                              {isDraft && (
                                <Badge variant="secondary" className="text-xs">
                                  <Save className="h-3 w-3 mr-1" />
                                  Đã lưu nháp
                                </Badge>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                onClick={() => setIsReportModalOpen(false)}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Hủy
                              </Button>
                              <Button 
                                variant="secondary" 
                                onClick={handleSaveDraft}
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Lưu nháp
                              </Button>
                              <Button onClick={handleReportSubmit}>
                                <Check className="h-4 w-4 mr-2" />
                                Đồng ý (Gửi & Đồng bộ)
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {filteredCompanies.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không tìm thấy công ty</h3>
            <p className="text-muted-foreground">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          </CardContent>
        </Card>
      )}
      
      {/* Dashboard Stats Modal */}
      {showDashboard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 text-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                  <BarChart3 className="h-6 w-6" />
                  Dashboard Thống kê - {filteredCompanies.find(c => c.id === showDashboard)?.name}
                </h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowDashboard(null)}
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <DashboardStats companyId={showDashboard} />
            </div>
          </div>
        </div>
      )}

      {/* Delete Companies Component */}
      <div className="mt-8">
        <DeleteCompanies />
      </div>

    </div>
  );
}