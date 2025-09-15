import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Building2, Mail, Phone, MapPin, User, FileText, Loader2, ArrowLeft, 
  Percent, Users, Target, Upload, CheckCircle, TrendingUp, Calculator,
  UserCheck, Factory, Lightbulb, Monitor, Scale, DollarSign, BarChart3,
  Save, X, Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface EnterpriseRegistrationData {
  // Thông tin cơ bản
  companyName: string;
  projectName: string;
  taxCode: string;
  businessType: string;
  industry: string;
  businessField: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  employeeCount: string;
  annualRevenue: string;
  establishmentYear: number;
  
  // Thông tin vốn và đầu tư
  totalCapital: string;
  bmcEquityPercentage: number;
  bmcInvestmentAmount: string;
  
  // Người đại diện pháp luật
  representativeName: string;
  representativePosition: string;
  representativePhone: string;
  representativeEmail: string;
  
  // Cổ đông
  shareholders: Array<{
    id: string;
    name: string;
    position: string;
    sharePercentage: number;
    shareType: string;
    investmentAmount: string;
    idNumber: string;
    phone: string;
    email: string;
  }>;
  shareholderStructure: string;
  
  // Thông tin kinh doanh
  mainProducts: string;
  businessObjectives: string;
  marketTarget: string;
  competitiveAdvantage: string;
  businessDescription: string;
  
  // Lý do đăng ký
  requestReason: string;
  
  // Phòng ban quan tâm
  interestedDepartments: string[];
  
  // Tài liệu
  businessLicense: boolean;
  financialStatements: boolean;
  businessPlan: boolean;
  legalDocuments: boolean;
  capitalReportFile: boolean;
}

const EnterpriseRegistrationForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<EnterpriseRegistrationData>({
    // Mockup data mẫu
    companyName: 'Công ty TNHH Công nghệ ABC',
    projectName: 'Dự án Chuyển đổi số XYZ',
    taxCode: '0123456789',
    businessType: 'Công ty TNHH',
    industry: 'Công nghệ thông tin',
    businessField: 'Phát triển phần mềm',
    address: 'Số 123, Đường Nguyễn Văn Cừ, Quận 5, TP.HCM',
    phone: '0901234567',
    email: 'info@abc-tech.com',
    website: 'https://abc-tech.com',
    employeeCount: '50-100 nhân viên',
    annualRevenue: '10-50 tỷ VNĐ',
    establishmentYear: 2020,
    totalCapital: '5 tỷ VNĐ',
    bmcEquityPercentage: 25,
    bmcInvestmentAmount: '1.25 tỷ VNĐ',
    representativeName: 'Nguyễn Văn An',
    representativePosition: 'Giám đốc điều hành',
    representativePhone: '0987654321',
    representativeEmail: 'ceo@abc-tech.com',
    shareholders: [
      {
        id: '1',
        name: 'Nguyễn Văn An',
        position: 'Chủ tịch HĐQT',
        sharePercentage: 40,
        shareType: 'Cổ phần phổ thông',
        investmentAmount: '2 tỷ VNĐ',
        idNumber: '001234567890',
        phone: '0901234567',
        email: 'chairman@abc-tech.com'
      },
      {
        id: '2',
        name: 'Trần Thị Bình',
        position: 'Tổng Giám đốc',
        sharePercentage: 35,
        shareType: 'Cổ phần phổ thông',
        investmentAmount: '1.75 tỷ VNĐ',
        idNumber: '001234567891',
        phone: '0901234568',
        email: 'ceo@abc-tech.com'
      },
      {
        id: '3',
        name: 'BMC Holdings JSC',
        position: 'Nhà đầu tư chiến lược',
        sharePercentage: 25,
        shareType: 'Cổ phần ưu đãi',
        investmentAmount: '1.25 tỷ VNĐ',
        idNumber: '0123456789',
        phone: '0281234567',
        email: 'investment@bmcholdings.vn'
      }
    ],
    shareholderStructure: 'Cổ đông sáng lập: 75% (Nguyễn Văn An + Trần Thị Bình), Nhà đầu tư chiến lược: 25% (BMC Holdings)',
    mainProducts: 'Phần mềm quản lý doanh nghiệp, Ứng dụng di động, Hệ thống AI',
    businessObjectives: 'Trở thành nhà cung cấp giải pháp công nghệ hàng đầu Việt Nam',
    marketTarget: 'Doanh nghiệp vừa và nhỏ, Tập đoàn lớn',
    competitiveAdvantage: 'Công nghệ AI tiên tiến, Đội ngũ chuyên gia giàu kinh nghiệm',
    businessDescription: 'Chuyên phát triển các giải pháp công nghệ thông tin, tập trung vào AI và chuyển đổi số cho doanh nghiệp',
    requestReason: 'Muốn tối ưu hóa quy trình quản lý và tăng hiệu quả kinh doanh',
    interestedDepartments: ['💻 Công nghệ – Hạ tầng số', '💰 Tài chính – Kế toán'],
    businessLicense: true,
    financialStatements: true,
    businessPlan: true,
    legalDocuments: false,
    capitalReportFile: false
  });

  const industries = [
    'Công nghệ thông tin',
    'Tài chính - Ngân hàng',
    'Bất động sản',
    'Sản xuất',
    'Thương mại - Dịch vụ',
    'Y tế - Dược phẩm',
    'Giáo dục - Đào tạo',
    'Nông nghiệp',
    'Du lịch - Khách sạn',
    'Vận tải - Logistics',
    'Năng lượng',
    'Khác'
  ];

  const businessTypes = [
    'Công ty TNHH',
    'Công ty Cổ phần',
    'Doanh nghiệp tư nhân',
    'Hợp tác xã',
    'Chi nhánh',
    'Văn phòng đại diện'
  ];



  const departments = [
    { id: 'shareholders', name: '📌 Thông tin Cổ đông', icon: Users },
    { id: 'business', name: '📊 Kinh doanh', icon: TrendingUp },
    { id: 'marketing', name: '📢 Marketing', icon: Target },
    { id: 'finance-accounting', name: '💰 Tài chính – Kế toán', icon: Calculator },
    { id: 'hr-training', name: '👥 Nhân sự – Đào tạo', icon: UserCheck },
    { id: 'production-warehouse', name: '🏭 Sản xuất – Kho vận', icon: Factory },
    { id: 'strategy-rd', name: '🎯 Chiến lược – R&D', icon: Lightbulb },
    { id: 'tech-infrastructure', name: '💻 Công nghệ – Hạ tầng số', icon: Monitor },
    { id: 'legal-compliance', name: '⚖️ Pháp chế – Tuân thủ', icon: Scale },
    { id: 'investment-fund', name: '💵 Đầu tư – Quỹ', icon: DollarSign },
    { id: 'consolidated-reports', name: '📑 Báo cáo tổng hợp (AI Dashboard)', icon: BarChart3 }
  ];

  const handleInputChange = (field: keyof EnterpriseRegistrationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };



  const handleDepartmentToggle = (department: string) => {
    setFormData(prev => ({
      ...prev,
      interestedDepartments: prev.interestedDepartments.includes(department)
        ? prev.interestedDepartments.filter(d => d !== department)
        : [...prev.interestedDepartments, department]
    }));
  };

  const addShareholder = () => {
    const newShareholder = {
      id: Date.now().toString(),
      name: '',
      position: '',
      sharePercentage: 0,
      shareType: 'Cổ phần phổ thông',
      investmentAmount: '',
      idNumber: '',
      phone: '',
      email: ''
    };
    setFormData(prev => ({
      ...prev,
      shareholders: [...prev.shareholders, newShareholder]
    }));
  };

  const removeShareholder = (id: string) => {
    setFormData(prev => ({
      ...prev,
      shareholders: prev.shareholders.filter(s => s.id !== id)
    }));
  };

  const updateShareholder = (id: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      shareholders: prev.shareholders.map(s => 
        s.id === id ? { ...s, [field]: value } : s
      )
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'companyName', 'taxCode', 'industry', 'representativeName', 
      'representativeEmail', 'businessDescription'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof EnterpriseRegistrationData]) {
        toast({
          title: "Thông tin chưa đầy đủ",
          description: "Vui lòng điền đầy đủ thông tin bắt buộc.",
          variant: "destructive"
        });
        return false;
      }
    }
    return true;
  };

  // Load draft from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem('enterprise_registration_draft');
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        setFormData(prev => ({ ...prev, ...draftData }));
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Save draft to localStorage
  const saveDraft = async () => {
    setSavingDraft(true);
    try {
      localStorage.setItem('enterprise_registration_draft', JSON.stringify(formData));
      
      toast({
        title: "Lưu nháp thành công!",
        description: "Dữ liệu đã được lưu tạm thời.",
      });
    } catch (error) {
      toast({
        title: "Lỗi lưu nháp",
        description: "Không thể lưu dữ liệu tạm thời.",
        variant: "destructive"
      });
    } finally {
      setSavingDraft(false);
    }
  };

  // Cancel and clear form
  const handleCancel = () => {
    localStorage.removeItem('enterprise_registration_draft');
    navigate(-1);
  };

  // Generate company report data - Enhanced with full KPIs and metrics
  const generateCompanyReport = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const revenue = parseFloat(formData.annualRevenue.replace(/[^0-9]/g, '')) || 0;
    const employeeCount = parseInt(formData.employeeCount.replace(/[^0-9]/g, '')) || 0;
    const totalCapital = parseFloat(formData.totalCapital.replace(/[^0-9]/g, '')) || 0;
    
    return {
      company_id: `NEW_${Date.now()}`,
      company_name: formData.companyName,
      report_date: currentDate,
      
      // Financial Metrics
      revenue: revenue,
      total_profit: Math.round(revenue * 0.1), // Conservative 10% profit margin for new company
      total_assets: totalCapital,
      total_expenses: Math.round(revenue * 0.9), // 90% expense ratio
      net_profit: Math.round(revenue * 0.1),
      total_liabilities: Math.round(totalCapital * 0.2), // Conservative 20% debt
      
      // Operational Metrics
      employee_count: employeeCount,
      kpi_score: 85, // Default KPI for new companies
      
      // Risk and Compliance
      risk_score: 25, // Low risk for new company (0-100 scale)
      compliance_status: 'compliant',
      compliance_score: 95, // High compliance for new company
      
      // Portfolio Metrics
      portfolio_value: totalCapital,
      roi_percentage: 0, // New company, no ROI yet
      
      // Business Information
      industry: formData.industry,
      business_type: formData.businessType,
      business_field: formData.businessField,
      establishment_year: formData.establishmentYear,
      
      // BMC Investment Details
      bmc_equity_percentage: formData.bmcEquityPercentage,
      bmc_investment_amount: parseFloat(formData.bmcInvestmentAmount.replace(/[^0-9]/g, '')) || 0,
      
      // Contact Information
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      website: formData.website,
      
      // Representative Information
      representative_name: formData.representativeName,
      representative_position: formData.representativePosition,
      representative_phone: formData.representativePhone,
      representative_email: formData.representativeEmail,
      
      // Business Strategy
      main_products: formData.mainProducts,
      business_objectives: formData.businessObjectives,
      market_target: formData.marketTarget,
      competitive_advantage: formData.competitiveAdvantage,
      business_description: formData.businessDescription,
      
      // Organizational Details
      status: 'active',
      organizational_level: 'F5', // New companies start at F5
      
      // AI Insights for New Company
      ai_insights: [
        {
          type: "Welcome Forecast",
          message: `Chào mừng ${formData.companyName} gia nhập hệ sinh thái BMC! Dự báo tăng trưởng 15-20% trong năm đầu.`,
          confidence: 85,
          impact: "High"
        },
        {
          type: "Market Opportunity",
          message: `Ngành ${formData.industry} đang có xu hướng tăng trưởng tích cực. Khuyến nghị tập trung vào ${formData.marketTarget}.`,
          confidence: 78,
          impact: "Medium"
        },
        {
          type: "BMC Support",
          message: `Với ${formData.bmcEquityPercentage}% vốn góp từ BMC, công ty sẽ được hỗ trợ đầy đủ về tài chính và chiến lược.`,
          confidence: 95,
          impact: "High"
        }
      ],
      
      // Metadata
      created_by: user?.id || 'system',
      updated_at: new Date().toISOString(),
      report_type: 'initial_registration'
    };
  };

  // Generate department reports for the new company - Standardized 9 Core Departments
  const generateDepartmentReports = (companyId: string) => {
    const departments = [
      { 
        name: 'Thông tin Cổ đông', 
        revenue: 0, 
        employee_count: 1, 
        kpi_score: 85,
        kpis: {
          totalShareholders: formData.shareholders.length,
          institutionalOwnership: `${formData.bmcEquityPercentage}%`,
          retailOwnership: `${100 - formData.bmcEquityPercentage}%`,
          avgDividendYield: "0%" // New company
        }
      },
      { 
        name: 'Kinh doanh & Marketing', 
        revenue: parseFloat(formData.annualRevenue.replace(/[^0-9]/g, '')) || 0, 
        employee_count: 2, 
        kpi_score: 75,
        kpis: {
          marketShare: "0%", // New company
          customerSatisfaction: "85%", // Default for new company
          brandValue: "0 VND",
          conversionRate: "5%" // Conservative estimate
        }
      },
      { 
        name: 'Tài chính & Kế toán', 
        revenue: 0, 
        employee_count: 2, 
        kpi_score: 80,
        kpis: {
          cashFlow: "+0 VND", // New company
          debtToEquity: "0.1", // Conservative for new company
          currentRatio: "1.5", // Healthy starting ratio
          auditScore: "B+" // New company rating
        }
      },
      { 
        name: 'Nhân sự & Đào tạo', 
        revenue: 0, 
        employee_count: parseInt(formData.employeeCount.replace(/[^0-9]/g, '')) || 1, 
        kpi_score: 85,
        kpis: {
          retention: "95%", // High for new company
          satisfaction: "4.2/5", // Good starting point
          trainingHours: "24h/year", // Standard training
          promotion: "0%" // New company
        }
      },
      { 
        name: 'Sản xuất & Kho vận', 
        revenue: 0, 
        employee_count: 2, 
        kpi_score: 80,
        kpis: {
          efficiency: "85%", // Starting efficiency
          onTimeDelivery: "90%", // Target for new company
          inventoryTurnover: "6x", // Conservative estimate
          wasteReduction: "5%" // Initial target
        }
      },
      { 
        name: 'Chiến lược & R&D', 
        revenue: 0, 
        employee_count: 1, 
        kpi_score: 85,
        kpis: {
          rdInvestment: "2% revenue", // Conservative for new company
          patents: "0 active", // New company
          innovations: "0 launched", // New company
          marketPenetration: "1%" // Starting point
        }
      },
      { 
        name: 'Công nghệ & Hạ tầng số', 
        revenue: 0, 
        employee_count: 2, 
        kpi_score: 90,
        kpis: {
          uptime: "99%", // Good target for new company
          digitalAdoption: "70%", // Modern new company
          cybersecurity: "80/100", // Basic security
          aiImplementation: "30%" // Starting AI adoption
        }
      },
      { 
        name: 'Pháp chế & Tuân thủ', 
        revenue: 0, 
        employee_count: 1, 
        kpi_score: 90,
        kpis: {
          compliance: "95%", // High compliance for new company
          legalRisk: "Low", // New company advantage
          contracts: "0 active", // New company
          disputes: "0 ongoing" // Clean start
        }
      },
      { 
        name: 'Đầu tư & Quỹ', 
        revenue: 0, 
        employee_count: 1, 
        kpi_score: 80,
        kpis: {
          totalFunds: formData.totalCapital,
          portfolioROI: "0%", // New company
          newInvestments: "0 deals", // New company
          exitValue: "0 VND" // New company
        }
      }
    ];

    return departments.map(dept => ({
      department_id: `${companyId}_${dept.name.replace(/\s+/g, '_').toLowerCase()}`,
      company_id: companyId,
      department_name: dept.name,
      report_date: new Date().toISOString().split('T')[0],
      revenue: dept.revenue,
      employee_count: dept.employee_count,
      kpi_score: dept.kpi_score,
      kpis: dept.kpis, // Add detailed KPIs
      status: 'active',
      created_by: user?.id || 'system',
      updated_at: new Date().toISOString()
    }));
  };

  // Submit and sync to database
  const handleSubmitAndSync = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    try {
      // Generate company report
      const companyReport = generateCompanyReport();
      
      // Save company report to Supabase
      const { data: companyData, error: companyError } = await supabase
        .from('company_reports')
        .insert([companyReport])
        .select()
        .single();

      if (companyError) throw companyError;

      // Generate and save department reports
      const departmentReports = generateDepartmentReports(companyReport.company_id);
      const { error: deptError } = await supabase
        .from('department_reports')
        .insert(departmentReports);

      if (deptError) throw deptError;

      // Save enterprise registration data
      const { error: enterpriseError } = await supabase
        .from('enterprise_registrations')
        .insert([{
          company_id: companyReport.company_id,
          registration_data: formData,
          status: 'approved',
          created_by: user?.id || 'system',
          created_at: new Date().toISOString()
        }]);

      if (enterpriseError) throw enterpriseError;

      // Clear draft
      localStorage.removeItem('enterprise_registration_draft');
      
      toast({
        title: "Đăng ký và đồng bộ thành công!",
        description: "Doanh nghiệp đã được tạo và dữ liệu đã được đồng bộ vào hệ thống.",
      });
      
      // Navigate to reports page
      navigate('/reports');
      
    } catch (error) {
      console.error('Error submitting enterprise registration:', error);
      toast({
        title: "Lỗi hệ thống",
        description: "Có lỗi xảy ra khi gửi đăng ký. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Đăng ký thành công!",
        description: "Hồ sơ doanh nghiệp đã được gửi. Chúng tôi sẽ liên hệ trong 24h.",
      });
      
      // Navigate to success page or dashboard
      navigate('/');
      
    } catch (error) {
      toast({
        title: "Lỗi hệ thống",
        description: "Có lỗi xảy ra khi gửi đăng ký. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 px-8 py-8 relative overflow-hidden border-b border-gray-700/50">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(-1)}
                  className="text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 border border-gray-600/50 hover:border-gray-500"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Đăng Ký Doanh Nghiệp Mới</h1>
                  <p className="text-gray-300 text-lg">Tham gia hệ sinh thái BMC UniGate</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-gray-700/50 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-600/50">
                  <span className="text-gray-300 text-sm font-medium">Bước 1/1</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Thông tin cơ bản */}
              <div className="space-y-6 p-6 border rounded-xl bg-gradient-to-r from-gray-800/50 to-slate-800/50 border-gray-600/50">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-6 w-6 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">Thông tin cơ bản doanh nghiệp</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-sm font-medium text-gray-300">Tên công ty *</Label>
                    <Input
                      id="companyName"
                      placeholder="Công ty TNHH ABC"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="h-11 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="projectName" className="text-sm font-medium text-gray-300">Tên dự án (nếu có)</Label>
                    <Input
                      id="projectName"
                      placeholder="Dự án XYZ"
                      value={formData.projectName}
                      onChange={(e) => handleInputChange('projectName', e.target.value)}
                      className="h-11 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="taxCode" className="text-sm font-medium text-gray-300">Mã số thuế *</Label>
                    <Input
                      id="taxCode"
                      placeholder="0123456789"
                      value={formData.taxCode}
                      onChange={(e) => handleInputChange('taxCode', e.target.value)}
                      className="h-11 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessType" className="text-sm font-medium text-gray-300">Loại hình doanh nghiệp</Label>
                    <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                      <SelectTrigger className="h-11 bg-gray-700/50 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/20">
                        <SelectValue placeholder="Chọn loại hình" className="text-gray-400" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {businessTypes.map(type => (
                          <SelectItem key={type} value={type} className="text-white hover:bg-gray-700">{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-sm font-medium text-gray-300">Ngành nghề *</Label>
                    <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                      <SelectTrigger className="h-11 bg-gray-700/50 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/20">
                        <SelectValue placeholder="Chọn ngành nghề" className="text-gray-400" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {industries.map(industry => (
                          <SelectItem key={industry} value={industry} className="text-white hover:bg-gray-700">{industry}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="establishmentYear" className="text-sm font-medium">Năm thành lập</Label>
                    <Input
                      id="establishmentYear"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={formData.establishmentYear}
                      onChange={(e) => handleInputChange('establishmentYear', parseInt(e.target.value))}
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address" className="text-sm font-medium">Địa chỉ</Label>
                    <Input
                      id="address"
                      placeholder="Số 123, Đường ABC, Quận XYZ, TP.HCM"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">Điện thoại</Label>
                    <Input
                      id="phone"
                      placeholder="0901234567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="info@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-sm font-medium">Website</Label>
                    <Input
                      id="website"
                      placeholder="https://company.com"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>
              </div>
              
              {/* Thông tin vốn và đầu tư */}
              <div className="space-y-6 p-6 border rounded-xl bg-gradient-to-r from-gray-800/50 to-slate-800/50 border-gray-600/50">
                <div className="flex items-center gap-3 mb-4">
                  <Percent className="h-6 w-6 text-orange-400" />
                  <h3 className="text-xl font-semibold text-white">Thông tin vốn và đầu tư</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="totalCapital" className="text-sm font-medium">Tổng vốn điều lệ</Label>
                    <Input
                      id="totalCapital"
                      placeholder="5 tỷ VNĐ"
                      value={formData.totalCapital}
                      onChange={(e) => handleInputChange('totalCapital', e.target.value)}
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bmcEquityPercentage" className="text-sm font-medium">Tỷ lệ góp vốn BMC (%)</Label>
                    <Input
                      id="bmcEquityPercentage"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.bmcEquityPercentage}
                      onChange={(e) => handleInputChange('bmcEquityPercentage', parseInt(e.target.value))}
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bmcInvestmentAmount" className="text-sm font-medium">Số tiền đầu tư BMC</Label>
                    <Input
                      id="bmcInvestmentAmount"
                      placeholder="1.25 tỷ VNĐ"
                      value={formData.bmcInvestmentAmount}
                      onChange={(e) => handleInputChange('bmcInvestmentAmount', e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>
              </div>
              
              {/* Người đại diện pháp luật */}
              <div className="space-y-6 p-6 border rounded-xl bg-gradient-to-r from-gray-800/50 to-slate-800/50 border-gray-600/50">
                <div className="flex items-center gap-3 mb-4">
                  <User className="h-6 w-6 text-green-400" />
                  <h3 className="text-xl font-semibold text-white">Người đại diện pháp luật</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="representativeName" className="text-sm font-medium">Họ và tên *</Label>
                    <Input
                      id="representativeName"
                      placeholder="Nguyễn Văn A"
                      value={formData.representativeName}
                      onChange={(e) => handleInputChange('representativeName', e.target.value)}
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="representativePosition" className="text-sm font-medium">Chức vụ</Label>
                    <Input
                      id="representativePosition"
                      placeholder="Giám đốc"
                      value={formData.representativePosition}
                      onChange={(e) => handleInputChange('representativePosition', e.target.value)}
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="representativePhone" className="text-sm font-medium">Số điện thoại</Label>
                    <Input
                      id="representativePhone"
                      placeholder="0901234567"
                      value={formData.representativePhone}
                      onChange={(e) => handleInputChange('representativePhone', e.target.value)}
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="representativeEmail" className="text-sm font-medium">Email *</Label>
                    <Input
                      id="representativeEmail"
                      type="email"
                      placeholder="email@company.com"
                      value={formData.representativeEmail}
                      onChange={(e) => handleInputChange('representativeEmail', e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>
              </div>
              
              {/* Thông tin cổ đông */}
              <div className="space-y-6 p-6 border rounded-xl bg-gradient-to-r from-gray-800/50 to-slate-800/50 border-gray-600/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-purple-400" />
                    <h3 className="text-xl font-semibold text-white">Thông tin cổ đông</h3>
                  </div>
                  <Button 
                    type="button" 
                    onClick={addShareholder}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm border border-purple-500 hover:border-purple-400 transition-all duration-300"
                  >
                    + Thêm cổ đông
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {formData.shareholders.map((shareholder, index) => (
                    <Card key={shareholder.id} className="p-4 bg-gray-700/30 border-gray-600/50">)
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-white">Cổ đông #{index + 1}</h4>
                        {formData.shareholders.length > 1 && (
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={() => removeShareholder(shareholder.id)}
                            className="text-red-400 border-red-600 hover:bg-red-600/20 hover:text-red-300"
                          >
                            Xóa
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-300">Họ và tên *</Label>
                          <Input
                            placeholder="Nguyễn Văn A"
                            value={shareholder.name}
                            onChange={(e) => updateShareholder(shareholder.id, 'name', e.target.value)}
                            className="h-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-300">Chức vụ</Label>
                          <Input
                            placeholder="Chủ tịch HĐQT"
                            value={shareholder.position}
                            onChange={(e) => updateShareholder(shareholder.id, 'position', e.target.value)}
                            className="h-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-300">Tỷ lệ sở hữu</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            placeholder="25"
                            value={shareholder.sharePercentage}
                            onChange={(e) => updateShareholder(shareholder.id, 'sharePercentage', parseFloat(e.target.value) || 0)}
                            className="h-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-300">Loại cổ phần</Label>
                          <Select 
                            value={shareholder.shareType} 
                            onValueChange={(value) => updateShareholder(shareholder.id, 'shareType', value)}
                          >
                            <SelectTrigger className="h-10 bg-gray-700/50 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/20">
                              <SelectValue placeholder="Chọn loại cổ phần" className="text-gray-400" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="Cổ phần phổ thông" className="text-white hover:bg-gray-700">Cổ phần phổ thông</SelectItem>
                              <SelectItem value="Cổ phần ưu đãi" className="text-white hover:bg-gray-700">Cổ phần ưu đãi</SelectItem>
                              <SelectItem value="Cổ phần quỹ" className="text-white hover:bg-gray-700">Cổ phần quỹ</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-300">Số tiền đầu tư</Label>
                          <Input
                            placeholder="1 tỷ VNĐ"
                            value={shareholder.investmentAmount}
                            onChange={(e) => updateShareholder(shareholder.id, 'investmentAmount', e.target.value)}
                            className="h-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-300">CMND/CCCD/MST</Label>
                          <Input
                            placeholder="001234567890"
                            value={shareholder.idNumber}
                            onChange={(e) => updateShareholder(shareholder.id, 'idNumber', e.target.value)}
                            className="h-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-300">Số điện thoại</Label>
                          <Input
                            placeholder="0901234567"
                            value={shareholder.phone}
                            onChange={(e) => updateShareholder(shareholder.id, 'phone', e.target.value)}
                            className="h-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-300">Email</Label>
                          <Input
                            type="email"
                            placeholder="email@company.com"
                            value={shareholder.email}
                            onChange={(e) => updateShareholder(shareholder.id, 'email', e.target.value)}
                            className="h-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-purple-300">Tổng % hiện tại</Label>
                          <div className="h-10 px-3 py-2 bg-purple-900/30 border border-purple-600/50 rounded-md flex items-center">
                            <span className="text-sm font-semibold text-purple-200">
                              {formData.shareholders.reduce((sum, s) => sum + (s.sharePercentage || 0), 0).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shareholderStructure" className="text-sm font-medium">Mô tả cơ cấu cổ đông tổng quan</Label>
                  <Textarea
                    id="shareholderStructure"
                    placeholder="Mô tả cơ cấu sở hữu và phân bổ cổ phần tổng quan..."
                    value={formData.shareholderStructure}
                    onChange={(e) => handleInputChange('shareholderStructure', e.target.value)}
                    rows={3}
                  />
                </div>
                
                {/* Tổng kết tỷ lệ cổ phần */}
                <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-600/50">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-purple-200">Tổng tỷ lệ cổ phần:</span>
                    <span className={`font-bold text-lg ${
                      Math.abs(formData.shareholders.reduce((sum, s) => sum + (s.sharePercentage || 0), 0) - 100) < 0.1 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}>
                      {formData.shareholders.reduce((sum, s) => sum + (s.sharePercentage || 0), 0).toFixed(1)}%
                    </span>
                  </div>
                  {Math.abs(formData.shareholders.reduce((sum, s) => sum + (s.sharePercentage || 0), 0) - 100) >= 0.1 && (
                    <p className="text-sm text-red-400 mt-1">
                      ⚠️ Tổng tỷ lệ cổ phần phải bằng 100%
                    </p>
                  )}
                </div>
              </div>
              
              {/* Thông tin kinh doanh */}
              <div className="space-y-6 p-6 border rounded-xl bg-gradient-to-r from-gray-800/50 to-slate-800/50 border-gray-600/50">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-6 w-6 text-teal-400" />
                  <h3 className="text-xl font-semibold text-white">Thông tin kinh doanh & sản phẩm</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="mainProducts" className="text-sm font-medium text-gray-300">Sản phẩm/Dịch vụ chính</Label>
                      <Textarea
                        id="mainProducts"
                        placeholder="Mô tả các sản phẩm, dịch vụ chính của công ty..."
                        value={formData.mainProducts}
                        onChange={(e) => handleInputChange('mainProducts', e.target.value)}
                        rows={3}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500/20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="marketTarget" className="text-sm font-medium text-gray-300">Thị trường mục tiêu</Label>
                      <Textarea
                        id="marketTarget"
                        placeholder="Đối tượng khách hàng và thị trường mục tiêu..."
                        value={formData.marketTarget}
                        onChange={(e) => handleInputChange('marketTarget', e.target.value)}
                        rows={3}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500/20"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessDescription" className="text-sm font-medium text-gray-300">Mô tả tổng quan hoạt động kinh doanh *</Label>
                    <Textarea
                      id="businessDescription"
                      placeholder="Mô tả tổng quan về hoạt động kinh doanh, định hướng phát triển..."
                      value={formData.businessDescription}
                      onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                      rows={4}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500/20"
                    />
                  </div>
                </div>
              </div>
              
              {/* Phòng ban quan tâm */}
              <div className="space-y-6 p-6 border rounded-xl bg-gradient-to-r from-gray-800/50 to-slate-800/50 border-gray-600/50">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-amber-400" />
                  <h3 className="text-xl font-semibold text-white">Phòng ban quan tâm (9 phòng ban + báo cáo tổng hợp)</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {departments.map(dept => {
                    const IconComponent = dept.icon;
                    const isSelected = formData.interestedDepartments.includes(dept.name);
                    return (
                      <Badge
                        key={dept.id}
                        variant={isSelected ? "default" : "outline"}
                        className={`cursor-pointer justify-start p-4 text-sm hover:scale-105 transition-all duration-300 h-auto ${
                          isSelected 
                            ? 'bg-gradient-to-r from-amber-500/30 to-yellow-500/30 border-amber-400/60 text-amber-100 shadow-lg shadow-amber-500/20' 
                            : 'bg-gray-700/30 border-gray-600/50 text-gray-300 hover:bg-gray-600/50 hover:text-white hover:border-gray-500/70'
                        }`}
                        onClick={() => handleDepartmentToggle(dept.name)}
                      >
                        <IconComponent className={`w-4 h-4 mr-2 flex-shrink-0 ${
                          isSelected ? 'text-amber-300' : 'text-gray-400'
                        }`} />
                        <span className="text-left">{dept.name}</span>
                      </Badge>
                    );
                  })}
                </div>
              </div>
              
              {/* Lý do đăng ký ERP-AI */}
              <div className="space-y-6 p-6 border rounded-xl bg-gradient-to-r from-gray-800/50 to-slate-800/50 border-gray-600/50">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-indigo-400" />
                  <h3 className="text-xl font-semibold text-white">Lý do đăng ký ERP-AI</h3>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="requestReason" className="text-sm font-medium text-gray-300">Lý do đăng ký ERP-AI</Label>
                  <Textarea
                    id="requestReason"
                    placeholder="Mô tả lý do muốn sử dụng hệ thống ERP-AI và kỳ vọng..."
                    value={formData.requestReason}
                    onChange={(e) => handleInputChange('requestReason', e.target.value)}
                    rows={3}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500/20"
                  />
                </div>
              </div>
              
              {/* Tài liệu đính kèm */}
              <div className="space-y-6 p-6 border rounded-xl bg-gradient-to-r from-gray-800/50 to-slate-800/50 border-gray-600/50">
                <div className="flex items-center gap-3 mb-4">
                  <Upload className="h-6 w-6 text-gray-400" />
                  <h3 className="text-xl font-semibold text-white">Tài liệu đính kèm</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="businessLicense"
                      checked={formData.businessLicense}
                      onCheckedChange={(checked) => handleInputChange('businessLicense', checked)}
                      className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="businessLicense" className="text-sm font-medium cursor-pointer text-gray-300 hover:text-white">
                      Giấy phép kinh doanh
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="financialStatements"
                      checked={formData.financialStatements}
                      onCheckedChange={(checked) => handleInputChange('financialStatements', checked)}
                      className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="financialStatements" className="text-sm font-medium cursor-pointer text-gray-300 hover:text-white">
                      Báo cáo tài chính
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="businessPlan"
                      checked={formData.businessPlan}
                      onCheckedChange={(checked) => handleInputChange('businessPlan', checked)}
                      className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="businessPlan" className="text-sm font-medium cursor-pointer text-gray-300 hover:text-white">
                      Kế hoạch kinh doanh
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="legalDocuments"
                      checked={formData.legalDocuments}
                      onCheckedChange={(checked) => handleInputChange('legalDocuments', checked)}
                      className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="legalDocuments" className="text-sm font-medium cursor-pointer text-gray-300 hover:text-white">
                      Hồ sơ pháp lý
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="capitalReportFile"
                      checked={formData.capitalReportFile}
                      onCheckedChange={(checked) => handleInputChange('capitalReportFile', checked)}
                      className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="capitalReportFile" className="text-sm font-medium cursor-pointer text-gray-300 hover:text-white">
                      Báo cáo vốn
                    </Label>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                {/* Cancel Button */}
                <Button 
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-8 h-12 text-base font-semibold border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
                  disabled={loading || savingDraft || submitting}
                >
                  <X className="mr-2 h-5 w-5" />
                  Hủy
                </Button>
                
                {/* Save Draft Button */}
                <Button 
                  type="button"
                  variant="outline"
                  onClick={saveDraft}
                  className="w-full sm:w-auto px-8 h-12 text-base font-semibold border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-white transition-all duration-300"
                  disabled={loading || savingDraft || submitting}
                >
                  {savingDraft && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  <Save className="mr-2 h-5 w-5" />
                  Lưu nháp
                </Button>
                
                {/* Submit and Sync Button */}
                <Button 
                  type="button"
                  onClick={handleSubmitAndSync}
                  className="w-full sm:w-auto px-8 h-12 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300" 
                  disabled={loading || savingDraft || submitting}
                >
                  {submitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  <Send className="mr-2 h-5 w-5" />
                  Đồng ý (Gửi & đồng bộ)
                </Button>
                
                {/* Traditional Submit Button (Hidden for now) */}
                <Button 
                  type="submit" 
                  className="hidden w-full md:w-auto px-12 h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300" 
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  <FileText className="mr-2 h-5 w-5" />
                  Gửi đăng ký doanh nghiệp mới
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseRegistrationForm;