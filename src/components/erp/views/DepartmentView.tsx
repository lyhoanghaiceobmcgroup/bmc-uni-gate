import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Cog, 
  BarChart3,
  MessageSquare,
  FileText,
  Target,
  Factory,
  Lightbulb,
  PieChart,
  Briefcase,
  GraduationCap,
  Warehouse,
  ChevronRight,
  Bot,
  AlertTriangle,
  CheckCircle,
  Clock,
  Monitor,
  Scale,
  X,
  Save,
  Send
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { ShareholderView as ShareholderDetailView } from "./ShareholderView";
import { SalesMarketingDetailView } from "./SalesMarketingDetailView";
import { SalesDetailPage } from "./SalesDetailPage";
import { MarketingDetailView } from "./MarketingDetailView";
import { FinanceAccountingDetailView } from "./FinanceAccountingDetailView";
import { HRTrainingDetailView } from "./HRTrainingDetailView";
import { ProductionSupplyChainDetailView } from "./ProductionSupplyChainDetailView";
import { StrategyRDDetailView } from "./StrategyRDDetailView";
import { TechnologyITDetailView } from "./TechnologyITDetailView";
import { LegalComplianceDetailView } from "./LegalComplianceDetailView";
import { InvestmentCapitalDetailView } from "./InvestmentCapitalDetailView";
import { AccountingDetailView } from "./AccountingDetailView";
import { TrainingDetailView } from "./TrainingDetailView";
import { ProductionDetailView } from "./ProductionDetailView";
import { WarehouseDetailView } from "./WarehouseDetailView";

interface DepartmentViewProps {
  organizations: any[];
  onViewShareholders?: () => void;
}

const departments = [
  {
    id: 1,
    name: "Cổ đông",
    description: "Quản lý cổ phần và quan hệ nhà đầu tư",
    icon: PieChart,
    manager: "Lý Hoàng Hải",
    members: 0,
    kpi: 0,
    tasks: 0,
    color: "text-gray-100",
    bgColor: "bg-gray-900 dark:bg-gray-950/20",
    metrics: {
      totalShareholders: 0,
      totalCapital: "0 VNĐ",
      bmcEquity: "Chưa có dữ liệu",
      dividendPaid: "Chưa có dữ liệu"
    },
    aiAgent: "Shareholder Agent",
    features: ["Tỷ lệ cổ phần", "Quyền biểu quyết", "Lịch sử tăng/giảm vốn", "Cổ tức"]
  },
  {
    id: 2,
    name: "Kinh doanh",
    description: "Bán hàng, CRM và quan hệ khách hàng",
    icon: TrendingUp,
    manager: "Nguyễn Văn A",
    members: 0,
    kpi: 0,
    tasks: 0,
    color: "text-gray-100",
    bgColor: "bg-gray-900 dark:bg-gray-950/20",
    metrics: {
      monthlyRevenue: "0 VNĐ",
      conversionRate: "Chưa có dữ liệu",
      newCustomers: 0,
      salesPipeline: "Chưa có dữ liệu"
    },
    aiAgent: "Sales Agent",
    features: ["CRM", "Pipeline bán hàng", "Quản lý khách hàng", "Dự báo doanh thu"]
  },
  {
    id: 10,
    name: "Marketing",
    description: "Marketing, truyền thông và xây dựng thương hiệu",
    icon: Briefcase,
    manager: "Trần Thị M",
    members: 0,
    kpi: 0,
    tasks: 0,
    color: "text-gray-100",
    bgColor: "bg-gray-900 dark:bg-gray-950/20",
    metrics: {
      campaignROI: "Chưa có dữ liệu",
      brandAwareness: "0%",
      leadGeneration: 0,
      socialEngagement: "Chưa có dữ liệu"
    },
    aiAgent: "Marketing Agent",
    features: ["Chiến dịch Marketing", "Quản lý thương hiệu", "Social Media", "Content Marketing"]
  },
  {
    id: 3,
    name: "Tài chính",
    description: "Quản lý tài chính, ngân sách và dòng tiền doanh nghiệp",
    icon: DollarSign,
    manager: "Trần Thị B",
    members: 0,
    kpi: 0,
    tasks: 0,
    color: "text-gray-100",
    bgColor: "bg-gray-900 dark:bg-gray-950/20",
    metrics: {
      totalBudget: "0 VNĐ",
      cashFlow: "0 VNĐ",
      investmentROI: "0%",
      liquidityRatio: "0"
    },
    aiAgent: "Finance Agent",
    features: ["Quản lý ngân sách", "Dự báo dòng tiền", "Phân tích tài chính", "Báo cáo P&L"]
  },
  {
    id: 11,
    name: "Kế toán",
    description: "Kế toán tổng hợp, thuế và báo cáo tài chính",
    icon: FileText,
    manager: "Nguyễn Văn K",
    members: 0,
    kpi: 0,
    tasks: 0,
    color: "text-gray-100",
    bgColor: "bg-gray-900 dark:bg-gray-950/20",
    metrics: {
      monthlyClosing: "Chưa có dữ liệu",
      taxCompliance: "0%",
      receivables: "0 VNĐ",
      payables: "0 VNĐ"
    },
    aiAgent: "Accounting Agent",
    features: ["Kế toán đa sổ", "Quản lý hóa đơn", "Báo cáo thuế", "Kiểm toán nội bộ"]
  },
  {
    id: 4,
    name: "Nhân sự",
    description: "Quản lý nhân lực, tuyển dụng và quan hệ lao động",
    icon: Users,
    manager: "Lê Văn C",
    members: 0,
    kpi: 0,
    tasks: 0,
    color: "text-gray-100",
    bgColor: "bg-gray-900 dark:bg-gray-950/20",
    metrics: {
      totalEmployees: 0,
      attendanceRate: "0%",
      monthlySalary: "0 VNĐ",
      turnoverRate: "0%"
    },
    aiAgent: "HR Agent",
    features: ["Hồ sơ nhân sự", "Chấm công", "Tuyển dụng ATS", "Quản lý lương"]
  },
  {
    id: 12,
    name: "Đào tạo",
    description: "Phát triển năng lực và đào tạo nhân viên",
    icon: GraduationCap,
    manager: "Phạm Thị L",
    members: 0,
    kpi: 0,
    tasks: 0,
    color: "text-gray-100",
    bgColor: "bg-gray-900 dark:bg-gray-950/20",
    metrics: {
      activePrograms: 0,
      completionRate: "0%",
      trainingBudget: "0 VNĐ",
      skillGrowth: "0%"
    },
    aiAgent: "Training Agent",
    features: ["Chương trình đào tạo", "Đánh giá năng lực", "E-learning", "Chứng chỉ"]
  },
  {
    id: 5,
    name: "Sản xuất",
    description: "Quản lý sản xuất, dây chuyền và chất lượng sản phẩm",
    icon: Factory,
    manager: "Phạm Thị D",
    members: 0,
    kpi: 0,
    tasks: 0,
    color: "text-gray-100",
    bgColor: "bg-gray-900 dark:bg-gray-950/20",
    metrics: {
      dailyOutput: "0 sản phẩm",
      efficiency: "0%",
      qualityRate: "0%",
      downtime: "0%"
    },
    aiAgent: "Production Agent",
    features: ["Quản lý dây chuyền", "Kiểm soát chất lượng", "Lập kế hoạch sản xuất", "Bảo trì thiết bị"]
  },
  {
    id: 13,
    name: "Kho vận",
    description: "Quản lý kho hàng, logistics và chuỗi cung ứng",
    icon: Warehouse,
    manager: "Lê Văn K",
    members: 0,
    kpi: 0,
    tasks: 0,
    color: "text-gray-100",
    bgColor: "bg-gray-900 dark:bg-gray-950/20",
    metrics: {
      currentStock: "0 VNĐ",
      stockTurnover: "0 lần/năm",
      inboundRate: "0%",
      outboundRate: "0%"
    },
    aiAgent: "Warehouse Agent",
    features: ["Kho QR/Barcode", "Logistics", "Dự báo nhu cầu", "Quản lý nhà cung cấp"]
  },
  {
    id: 6,
    name: "Chiến lược - R&D",
    description: "Nghiên cứu phát triển và chiến lược doanh nghiệp",
    icon: Lightbulb,
    manager: "Hoàng Văn E",
    members: 0,
    kpi: 0,
    tasks: 0,
    color: "text-gray-100",
    bgColor: "bg-gray-900 dark:bg-gray-950/20",
    metrics: {
      activeProjects: 0,
      rdBudget: "0 VNĐ",
      innovationScore: "Chưa có dữ liệu",
      strategicInitiatives: 0
    },
    aiAgent: "Strategy Agent",
    features: ["Sáng kiến đổi mới", "Kế hoạch 3-5 năm", "Phân tích SWOT", "Xu hướng ngành"]
  },
  {
    id: 7,
    name: "Công nghệ - Hạ tầng số",
    description: "Quản lý hạ tầng CNTT, phần mềm, bảo mật và dữ liệu",
    icon: Monitor,
    manager: "Nguyễn Văn F",
    members: 0,
    kpi: 0,
    tasks: 0,
    color: "text-gray-100",
    bgColor: "bg-gray-900 dark:bg-gray-950/20",
    metrics: {
      uptime: "Chưa có dữ liệu",
      servers: "0/0",
      securityAlerts: 0,
      storage: "0GB/0TB"
    },
    aiAgent: "Tech Agent",
    features: ["Cloud Infrastructure", "Security RBAC", "API Management", "AI/ERP Systems"]
  },
  {
    id: 8,
    name: "Pháp chế - Tuân thủ",
    description: "Đảm bảo pháp lý & tuân thủ, quản lý hợp đồng và rủi ro",
    icon: Scale,
    manager: "Luật sư Trần G",
    members: 0,
    kpi: 0,
    tasks: 0,
    color: "text-gray-100",
    bgColor: "bg-gray-900 dark:bg-gray-950/20",
    metrics: {
      activeContracts: 0,
      expiringSoon: 0,
      disputes: 0,
      complianceScore: "Chưa có dữ liệu"
    },
    aiAgent: "Legal Agent",
    features: ["Contract Management", "Compliance Tracking", "Legal Risk Management", "Document Archive"]
  },
  {
    id: 9,
    name: "Đầu tư - Vốn",
    description: "Quản lý danh mục đầu tư, quỹ vốn, M&A và cổ phần",
    icon: TrendingUp,
    manager: "Đào Thị H",
    members: 0,
    kpi: 0,
    tasks: 0,
    color: "text-gray-100",
    bgColor: "bg-gray-900 dark:bg-gray-950/20",
    metrics: {
      totalAUM: "0 VNĐ",
      portfolioROI: "Chưa có dữ liệu",
      activeDeals: 0,
      dryPowder: "0 VNĐ"
    },
    aiAgent: "Investment Agent",
    features: ["Portfolio Management", "Fund Management", "M&A Pipeline", "Performance Analytics"]
  }
];

// Map department names to folder names
const getDepartmentFolderName = (department: string) => {
  const folderMap = {
    "shareholder": "Phòng cổ đông",
    "sales": "Phòng kinh doanh",
    "kinh doanh": "Phòng kinh doanh",
    "marketing": "Phòng marketing",
    "finance-accounting": "Phòng Tài chính",
    "accounting": "Phòng Kế toán",
    "hr": "Phòng Nhân sự",
    "training": "Phòng Đào tạo",
    "hr-training": "Phòng Nhân sự",
    "production": "Phòng sản xuất",
    "warehouse": "Phòng kho vận",
    "production-supply": "Phòng sản xuất",
    "strategy-rd": "Phòng chiến lược",
    "technology-it": "Phòng công nghệ",
    "legal-compliance": "Phòng pháp chế",
    "investment-capital": "Phòng Đầu tư vốn"
  };
  return folderMap[department] || department;
};

export function DepartmentView({ organizations, onViewShareholders }: DepartmentViewProps) {
  const [detailView, setDetailView] = useState<"overview" | "shareholder" | "sales-marketing" | "sales-detail" | "finance-accounting" | "accounting" | "hr" | "training" | "hr-training" | "production" | "warehouse" | "production-supply" | "strategy-rd" | "technology-it" | "legal-compliance" | "investment-capital">("overview");
  const [realDepartments, setRealDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [reportData, setReportData] = useState({
    title: '',
    description: '',
    kpi_score: '',
    revenue: '',
    expenses: '',
    employee_count: '',
    performance_notes: '',
    challenges: '',
    achievements: '',
    next_quarter_goals: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [departmentData, setDepartmentData] = useState(departments);
  const [allCompanyReports, setAllCompanyReports] = useState([]);
  const [aggregatedData, setAggregatedData] = useState(null);
  const [realtimeSubscription, setRealtimeSubscription] = useState(null);
  const [departmentFolderData, setDepartmentFolderData] = useState({});
  const { user } = useAuth();

  // Generate aggregated data for departments from all company reports
  const generateDepartmentAggregatedData = useCallback((reports) => {
    if (!reports || reports.length === 0) {
      setAggregatedData(null);
      return;
    }

    // Calculate aggregated metrics
    const totalRevenue = reports.reduce((sum, report) => {
      const revenue = parseFloat(report.revenue) || 0;
      return sum + revenue;
    }, 0);

    const totalEmployees = reports.reduce((sum, report) => {
      const employees = parseInt(report.employee_count) || 0;
      return sum + employees;
    }, 0);

    const averageKPI = reports.length > 0 ? 
      reports.reduce((sum, report) => {
        const kpi = parseFloat(report.kpi_score) || 0;
        return sum + kpi;
      }, 0) / reports.length : 0;

    // Group by department for breakdown
    const departmentBreakdown = {};
    reports.forEach(report => {
      const dept = report.department || 'Chưa phân loại';
      if (!departmentBreakdown[dept]) {
        departmentBreakdown[dept] = {
          count: 0,
          revenue: 0,
          employees: 0,
          avgKPI: 0
        };
      }
      departmentBreakdown[dept].count += 1;
      departmentBreakdown[dept].revenue += parseFloat(report.revenue) || 0;
      departmentBreakdown[dept].employees += parseInt(report.employee_count) || 0;
      departmentBreakdown[dept].avgKPI += parseFloat(report.kpi_score) || 0;
    });

    // Calculate averages for each department
    Object.keys(departmentBreakdown).forEach(dept => {
      const data = departmentBreakdown[dept];
      data.avgKPI = data.count > 0 ? data.avgKPI / data.count : 0;
    });

    const aggregated = {
      totalRevenue,
      totalEmployees,
      averageKPI,
      totalReports: reports.length,
      departmentBreakdown,
      lastUpdated: new Date().toISOString()
    };

    setAggregatedData(aggregated);
    console.log('📊 Generated department aggregated data:', aggregated);
  }, []);



  // Read data from department folder
  const readDepartmentFolderData = useCallback(async (departmentName: string) => {
    try {
      const folderName = getDepartmentFolderName(departmentName);
      console.log(`📂 Reading data from folder: ${folderName}`);
      
      // In a real implementation, this would read from the file system
      // For now, we'll simulate reading from the data folder structure
      const mockData = {
        folderPath: `data/${folderName}`,
        companies: [],
        totalReports: 0,
        lastUpdated: new Date().toISOString(),
        aggregatedMetrics: {
          totalRevenue: 0,
          totalEmployees: 0,
          averageKPI: 0,
          activeCompanies: 0
        }
      };

      // Simulate reading company folders and data files
      // This would be replaced with actual file system operations
      const companyFolders = ['Công ty ABC', 'Công ty XYZ', 'Công ty DEF'];
      
      for (const companyFolder of companyFolders) {
        const companyData = {
          name: companyFolder,
          folderPath: `data/${folderName}/${companyFolder}`,
          reports: [],
          lastReport: null,
          metrics: {
            revenue: Math.floor(Math.random() * 1000000000),
            employees: Math.floor(Math.random() * 500),
            kpi: Math.floor(Math.random() * 100)
          }
        };
        
        // Simulate reading JSON files from company folder
        const reportFiles = ['daily_financial_report.json', 'hr_daily_report.json', 'sales_daily_report.json'];
        companyData.reports = reportFiles.map(file => ({
          fileName: file,
          filePath: `data/${folderName}/${companyFolder}/${file}`,
          lastModified: new Date().toISOString(),
          size: Math.floor(Math.random() * 10000)
        }));
        
        mockData.companies.push(companyData);
        mockData.totalReports += companyData.reports.length;
        mockData.aggregatedMetrics.totalRevenue += companyData.metrics.revenue;
        mockData.aggregatedMetrics.totalEmployees += companyData.metrics.employees;
        mockData.aggregatedMetrics.averageKPI += companyData.metrics.kpi;
      }
      
      mockData.aggregatedMetrics.activeCompanies = mockData.companies.length;
      mockData.aggregatedMetrics.averageKPI = mockData.aggregatedMetrics.averageKPI / mockData.companies.length;
      
      // Store the data for the specific department
      setDepartmentFolderData(prev => ({
        ...prev,
        [departmentName]: mockData
      }));
      
      toast.success(`Đã tải dữ liệu từ ${folderName}: ${mockData.companies.length} công ty, ${mockData.totalReports} báo cáo`);
      
      return mockData;
    } catch (error) {
      console.error('Error reading department folder data:', error);
      toast.error('Lỗi khi đọc dữ liệu từ thư mục phòng ban');
      return null;
    }
  }, []);

  // Load departments from database
  useEffect(() => {
    loadDepartments();
  }, [user]);

  // Load all company reports function
  const loadAllCompanyReports = useCallback(async () => {
    try {
      const { data: companyReports, error } = await supabase
        .from('company_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Company reports table not found, using mock data:', error);
        setAllCompanyReports([]);
        return;
      }

      setAllCompanyReports(companyReports || []);
      
      // Generate aggregated insights for departments
      generateDepartmentAggregatedData(companyReports || []);
      
    } catch (error) {
      console.error('Error loading company reports:', error);
      setAllCompanyReports([]);
    }
  }, [generateDepartmentAggregatedData]);

  // Load company reports after component mounts
  useEffect(() => {
    loadAllCompanyReports();
  }, [loadAllCompanyReports]);

  // Setup enhanced realtime subscription for department folder synchronization
  useEffect(() => {
    if (!user) return;

    const setupDepartmentRealtimeSync = async () => {
      try {
        console.log("🔄 Setting up enhanced realtime sync for department folders...");
        
        // Subscribe to company_reports table changes with department folder updates
        const subscription = supabase
          .channel('department_folder_sync')
          .on(
            'postgres_changes',
            {
              event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
              schema: 'public',
              table: 'company_reports'
            },
            async (payload) => {
              console.log('📊 Company report change detected for department sync:', payload);
              
              // Determine which department folder to update
              let departmentToUpdate = null;
              
              if (payload.new?.report_data) {
                // Find the department type from report data
                const newReportData = payload.new.report_data;
                if (typeof newReportData === 'object') {
                  const departmentKeys = Object.keys(newReportData);
                  if (departmentKeys.length > 0) {
                    departmentToUpdate = departmentKeys[0]; // Use first department found
                  }
                }
              }
              
              // If we can't determine from report_data, try to infer from company name or other fields
              if (!departmentToUpdate && payload.new?.company_name) {
                // Simple heuristic to map company to department
                const companyName = payload.new.company_name.toLowerCase();
                if (companyName.includes('tài chính') || companyName.includes('finance')) {
                  departmentToUpdate = 'finance-accounting';
                } else if (companyName.includes('nhân sự') || companyName.includes('hr')) {
                  departmentToUpdate = 'hr';
                } else if (companyName.includes('kinh doanh') || companyName.includes('sales')) {
                  departmentToUpdate = 'sales';
                } else {
                  // Default to sales if can't determine
                  departmentToUpdate = 'sales';
                }
              }
              
              // Update the specific department folder data
              if (departmentToUpdate) {
                await readDepartmentFolderData(departmentToUpdate);
                console.log(`📂 Updated department folder data for: ${departmentToUpdate}`);
              }
              
              // Also refresh general company reports
              loadAllCompanyReports();
              
              // Show notification based on event type
              if (payload.eventType === 'INSERT') {
                toast.success(`📂 Dữ liệu mới từ ${payload.new?.company_name || 'công ty'} đã được đồng bộ vào thư mục phòng ban`);
              } else if (payload.eventType === 'UPDATE') {
                toast.info(`📂 Cập nhật dữ liệu từ ${payload.new?.company_name || 'công ty'} trong thư mục phòng ban`);
              } else if (payload.eventType === 'DELETE') {
                toast.warning(`📂 Xóa dữ liệu từ ${payload.old?.company_name || 'công ty'} khỏi thư mục phòng ban`);
              }
            }
          )
          .subscribe();

        setRealtimeSubscription(subscription);
        console.log("✅ Enhanced department folder realtime sync established");
        
      } catch (error) {
        console.error('❌ Error setting up department folder realtime sync:', error);
        toast.error('Lỗi khi thiết lập đồng bộ realtime cho thư mục phòng ban');
      }
    };

    setupDepartmentRealtimeSync();

    // Cleanup subscription on unmount
    return () => {
      if (realtimeSubscription) {
        console.log("🧹 Cleaning up department folder realtime subscription");
        supabase.removeChannel(realtimeSubscription);
      }
    };
  }, [user, readDepartmentFolderData, loadAllCompanyReports]);



  const resetAllDepartmentData = () => {
    const resetDepartmentsList = departmentData.map(dept => ({
      ...dept,
      members: 0,
      kpi: 0,
      tasks: 0,
      metrics: Object.keys(dept.metrics).reduce((acc, key) => {
        const value = dept.metrics[key];
        if (typeof value === 'string' && value.includes('VNĐ')) {
          acc[key] = '0 VNĐ';
        } else if (typeof value === 'string' && value.includes('%')) {
          acc[key] = '0%';
        } else if (typeof value === 'number') {
          acc[key] = 0;
        } else if (typeof value === 'string' && !isNaN(parseFloat(value))) {
          acc[key] = '0';
        } else {
          acc[key] = value; // Keep non-numeric values as is
        }
        return acc;
      }, {} as any)
    }));
    
    setDepartmentData(resetDepartmentsList);
    setAllCompanyReports([]);
    setAggregatedData(null);
  };

  const loadDepartments = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // First get user's organizations
      const { data: userOrgs, error: userOrgsError } = await supabase
        .from('user_organization_roles')
        .select('organization_id')
        .eq('user_id', user.id);

      if (userOrgsError) throw userOrgsError;

      const orgIds = userOrgs?.map(org => org.organization_id) || [];

      if (orgIds.length === 0) {
        setRealDepartments([]);
        return;
      }

      // Get departments without join to avoid relationship issues
      const { data: departmentsData, error: departmentsError } = await supabase
        .from('departments')
        .select('*')
        .in('organization_id', orgIds);

      if (departmentsError) throw departmentsError;

      // Get organizations separately
      const { data: organizationsData, error: organizationsError } = await supabase
        .from('organizations')
        .select('id, name, level')
        .in('id', orgIds);

      if (organizationsError) throw organizationsError;

      // Combine data manually
      const combinedData = departmentsData?.map(dept => {
        const org = organizationsData?.find(o => o.id === dept.organization_id);
        return {
          ...dept,
          organizations: org || null
        };
      }) || [];

      setRealDepartments(combinedData);
    } catch (error) {
      console.error('Error loading departments:', error);
      toast.error("Lỗi tải danh sách phòng ban");
    } finally {
      setLoading(false);
    }
  };

  const handleDeptCardClick = async (department: string) => {
    console.log("🏢 Department card clicked:", department);
    
    // Read data from corresponding department folder
    await readDepartmentFolderData(department);
    
    if (department === "shareholder") {
      setDetailView("shareholder");
    } else if (department === "sales") {
      console.log("🎯 Setting detailView to sales-detail");
      setDetailView("sales-detail");
    } else if (department === "kinh doanh") {
      console.log("🎯 Setting detailView to sales-detail for Kinh doanh");
      setDetailView("sales-detail");
    } else if (department === "marketing") {
      console.log("📢 Setting detailView to marketing");
      setDetailView("marketing");
    } else if (department === "finance-accounting") {
      setDetailView("finance-accounting");
    } else if (department === "accounting") {
      setDetailView("accounting");
    } else if (department === "hr") {
      setDetailView("hr");
    } else if (department === "training") {
      setDetailView("training");
    } else if (department === "hr-training") {
      setDetailView("hr-training");
    } else if (department === "production") {
      setDetailView("production");
    } else if (department === "warehouse") {
      setDetailView("warehouse");
    } else if (department === "production-supply") {
      setDetailView("production-supply");
    } else if (department === "strategy-rd") {
      setDetailView("strategy-rd");
    } else if (department === "technology-it") {
      setDetailView("technology-it");
    } else if (department === "legal-compliance") {
      setDetailView("legal-compliance");
    } else if (department === "investment-capital") {
      setDetailView("investment-capital");
    }
  };

  // Handle save draft function
  const handleSaveDraft = async () => {
    if (!selectedDepartment || !reportData.title) {
      toast.error('Vui lòng chọn phòng ban và nhập tiêu đề báo cáo');
      return;
    }

    setIsSubmitting(true);
    setIsDraft(true);

    try {
      // Save to local storage as backup
      const draftKey = `department_report_draft_${selectedDepartment.id}_${user?.id}`;
      localStorage.setItem(draftKey, JSON.stringify({
        ...reportData,
        department_id: selectedDepartment.id,
        department_name: selectedDepartment.name,
        saved_at: new Date().toISOString()
      }));

      // Try to save to Supabase
      const reportPayload = {
        title: reportData.title,
        description: reportData.description,
        department_id: selectedDepartment.id,
        department_name: selectedDepartment.name,
        user_id: user?.id,
        kpi_score: reportData.kpi_score ? parseFloat(reportData.kpi_score) : null,
        revenue: reportData.revenue ? parseFloat(reportData.revenue) : null,
        expenses: reportData.expenses ? parseFloat(reportData.expenses) : null,
        employee_count: reportData.employee_count ? parseInt(reportData.employee_count) : null,
        performance_notes: reportData.performance_notes,
        challenges: reportData.challenges,
        achievements: reportData.achievements,
        next_quarter_goals: reportData.next_quarter_goals,
        status: 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('department_reports')
        .upsert(reportPayload, {
          onConflict: 'department_id,user_id,status'
        });

      if (error) {
        console.error('Supabase save error:', error);
        toast.success('Báo cáo đã được lưu nháp cục bộ (sẽ đồng bộ khi có kết nối)');
      } else {
        toast.success('Báo cáo đã được lưu nháp thành công!');
        // Remove local storage backup after successful save
        localStorage.removeItem(draftKey);
      }

    } catch (error) {
      console.error('Error saving draft:', error);
      toast.success('Báo cáo đã được lưu nháp cục bộ');
    } finally {
      setIsSubmitting(false);
      setIsDraft(false);
    }
  };

  // Handle report submit function
  const handleReportSubmit = async () => {
    if (!selectedDepartment || !reportData.title) {
      toast.error('Vui lòng chọn phòng ban và nhập tiêu đề báo cáo');
      return;
    }

    setIsSubmitting(true);
    setIsDraft(false);

    try {
      // Prepare report data for submission
      const reportPayload = {
        title: reportData.title,
        description: reportData.description,
        department_id: selectedDepartment.id,
        department_name: selectedDepartment.name,
        user_id: user?.id,
        kpi_score: reportData.kpi_score ? parseFloat(reportData.kpi_score) : null,
        revenue: reportData.revenue ? parseFloat(reportData.revenue) : null,
        expenses: reportData.expenses ? parseFloat(reportData.expenses) : null,
        employee_count: reportData.employee_count ? parseInt(reportData.employee_count) : null,
        performance_notes: reportData.performance_notes,
        challenges: reportData.challenges,
        achievements: reportData.achievements,
        next_quarter_goals: reportData.next_quarter_goals,
        status: 'submitted',
        submitted_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Submit to Supabase
      const { data: reportResult, error: reportError } = await supabase
        .from('department_reports')
        .insert(reportPayload)
        .select()
        .single();

      if (reportError) {
        throw reportError;
      }

      // Sync department data
      await syncDepartmentData(selectedDepartment, reportPayload);

      // Generate AI insights for the department report
      await generateDepartmentAIInsights(reportResult.id, reportPayload);

      toast.success('Báo cáo đã được gửi và đồng bộ thành công!');
      
      // Reset form and close modal
      setIsReportModalOpen(false);
      setSelectedDepartment(null);
      setReportData({
        title: '',
        description: '',
        kpi_score: '',
        revenue: '',
        expenses: '',
        employee_count: '',
        performance_notes: '',
        challenges: '',
        achievements: '',
        next_quarter_goals: ''
      });

      // Remove any draft from local storage
      const draftKey = `department_report_draft_${selectedDepartment.id}_${user?.id}`;
      localStorage.removeItem(draftKey);

    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('Có lỗi xảy ra khi gửi báo cáo. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sync department data with the report
  const syncDepartmentData = async (department: any, reportData: any) => {
    try {
      const departmentUpdateData = {
        name: department.name,
        user_id: user?.id,
        company_id: department.company_id || null,
        department_type: department.type || 'general',
        employee_count: reportData.employee_count,
        kpi_score: reportData.kpi_score,
        revenue: reportData.revenue,
        expenses: reportData.expenses,
        last_report_date: new Date().toISOString(),
        performance_notes: reportData.performance_notes,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('departments')
        .upsert(departmentUpdateData, {
          onConflict: 'name,user_id'
        });

      if (error) {
        console.error('Error syncing department data:', error);
      }
    } catch (error) {
      console.error('Error in syncDepartmentData:', error);
    }
  };

  // Generate AI insights for department report
  const generateDepartmentAIInsights = async (reportId: string, reportData: any) => {
    try {
      const insights = [];

      // Performance insight
      if (reportData.kpi_score) {
        const kpiScore = parseFloat(reportData.kpi_score);
        let performanceInsight = {
          report_id: reportId,
          insight_type: 'performance',
          title: '',
          description: '',
          recommendation: '',
          priority: 'medium' as const,
          created_at: new Date().toISOString()
        };

        if (kpiScore >= 90) {
          performanceInsight.title = '🎯 Hiệu suất xuất sắc';
          performanceInsight.description = `Phòng ban đạt điểm KPI ${kpiScore}%, vượt trội so với mục tiêu.`;
          performanceInsight.recommendation = 'Duy trì phương pháp làm việc hiện tại và chia sẻ kinh nghiệm với các phòng ban khác.';
          performanceInsight.priority = 'low';
        } else if (kpiScore >= 75) {
          performanceInsight.title = '✅ Hiệu suất tốt';
          performanceInsight.description = `Phòng ban đạt điểm KPI ${kpiScore}%, đạt mục tiêu đề ra.`;
          performanceInsight.recommendation = 'Tìm kiếm cơ hội cải thiện để đạt mức xuất sắc trong quý tới.';
        } else {
          performanceInsight.title = '⚠️ Cần cải thiện hiệu suất';
          performanceInsight.description = `Phòng ban đạt điểm KPI ${kpiScore}%, thấp hơn mục tiêu.`;
          performanceInsight.recommendation = 'Cần xem xét lại quy trình làm việc và đưa ra kế hoạch cải thiện cụ thể.';
          performanceInsight.priority = 'high';
        }
        insights.push(performanceInsight);
      }

      // Financial insight
      if (reportData.revenue && reportData.expenses) {
        const revenue = parseFloat(reportData.revenue);
        const expenses = parseFloat(reportData.expenses);
        const profit = revenue - expenses;
        const profitMargin = (profit / revenue) * 100;

        const financialInsight = {
          report_id: reportId,
          insight_type: 'financial',
          title: profit > 0 ? '💰 Tình hình tài chính tích cực' : '📉 Cần kiểm soát chi phí',
          description: `Doanh thu: ${revenue.toLocaleString('vi-VN')} VNĐ, Chi phí: ${expenses.toLocaleString('vi-VN')} VNĐ. Lợi nhuận: ${profit.toLocaleString('vi-VN')} VNĐ (${profitMargin.toFixed(1)}%).`,
          recommendation: profit > 0 
            ? 'Duy trì hiệu quả tài chính và tìm kiếm cơ hội mở rộng.'
            : 'Cần xem xét và tối ưu hóa cấu trúc chi phí để cải thiện lợi nhuận.',
          priority: profit > 0 ? 'low' as const : 'high' as const,
          created_at: new Date().toISOString()
        };
        insights.push(financialInsight);
      }

      // Strategic insight based on challenges and goals
      if (reportData.challenges || reportData.next_quarter_goals) {
        const strategicInsight = {
          report_id: reportId,
          insight_type: 'strategic',
          title: '🎯 Phân tích chiến lược',
          description: `Phòng ban đã xác định được ${reportData.challenges ? 'các thách thức' : ''} ${reportData.challenges && reportData.next_quarter_goals ? 'và' : ''} ${reportData.next_quarter_goals ? 'mục tiêu rõ ràng' : ''} cho giai đoạn tới.`,
          recommendation: 'Xây dựng kế hoạch hành động chi tiết để giải quyết thách thức và đạt được mục tiêu đề ra.',
          priority: 'medium' as const,
          created_at: new Date().toISOString()
        };
        insights.push(strategicInsight);
      }

      // Insert insights into database
      if (insights.length > 0) {
        try {
          const { error } = await supabase
            .from('ai_insights')
            .insert(insights);

          if (error) {
            console.warn('AI insights table not found, skipping database insert:', error);
          }
        } catch (error) {
          console.warn('Error inserting AI insights, table may not exist:', error);
        }
      }
    } catch (error) {
      console.error('Error generating department AI insights:', error);
    }
  };

  if (detailView === "shareholder") {
    return <ShareholderDetailView 
      onBack={() => setDetailView("overview")} 
      departmentData={departmentFolderData['shareholder']}
    />;
  }

  if (detailView === "sales") {
    return <SalesMarketingDetailView onBack={() => setDetailView("overview")} organizations={organizations} />;
  }

  if (detailView === "sales-detail") {
    return <SalesDetailPage 
      onBack={() => setDetailView("overview")} 
      departmentData={departmentFolderData['sales'] || departmentFolderData['kinh doanh']}
    />;
  }

  if (detailView === "marketing") {
    return <MarketingDetailView 
      onBack={() => setDetailView("overview")} 
      organizations={organizations}
      departmentData={departmentFolderData['marketing']}
    />;
  }

  if (detailView === "finance-accounting") {
    return <FinanceAccountingDetailView 
      onBack={() => setDetailView("overview")} 
      departmentData={departmentFolderData['finance-accounting']}
    />;
  }

  if (detailView === "accounting") {
    return <AccountingDetailView 
      onBack={() => setDetailView("overview")} 
      departmentData={departmentFolderData['accounting']}
    />;
  }

  if (detailView === "hr") {
    return <HRTrainingDetailView 
      onBack={() => setDetailView("overview")} 
      departmentData={departmentFolderData['hr']}
    />;
  }

  if (detailView === "training") {
    return <TrainingDetailView 
      onBack={() => setDetailView("overview")} 
      departmentData={departmentFolderData['training']}
    />;
  }

  if (detailView === "hr-training") {
    return <HRTrainingDetailView 
      onBack={() => setDetailView("overview")} 
      departmentData={departmentFolderData['hr-training']}
    />;
  }

  if (detailView === "production") {
    return <ProductionDetailView 
      onBack={() => setDetailView("overview")} 
      departmentData={departmentFolderData['production']}
    />;
  }

  if (detailView === "warehouse") {
    return <WarehouseDetailView 
      onBack={() => setDetailView("overview")} 
      departmentData={departmentFolderData['warehouse']}
    />;
  }

  if (detailView === "production-supply") {
    return <ProductionSupplyChainDetailView 
      onBack={() => setDetailView("overview")} 
      departmentData={departmentFolderData['production-supply']}
    />;
  }

  if (detailView === "strategy-rd") {
    return <StrategyRDDetailView 
      onBack={() => setDetailView("overview")} 
      departmentData={departmentFolderData['strategy-rd']}
    />;
  }

  if (detailView === "technology-it") {
    return <TechnologyITDetailView 
      onBack={() => setDetailView("overview")} 
      departmentData={departmentFolderData['technology-it']}
    />;
  }

  if (detailView === "legal-compliance") {
    return <LegalComplianceDetailView 
      onBack={() => setDetailView("overview")} 
      departmentData={departmentFolderData['legal-compliance']}
    />;
  }

  if (detailView === "investment-capital") {
    return <InvestmentCapitalDetailView 
      onBack={() => setDetailView("overview")} 
      departmentData={departmentFolderData['investment-capital']}
    />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">🗂 Quản Lý Phòng Ban</h1>
          <p className="text-muted-foreground mt-2">
            Quản lý vận hành theo khối chức năng - KPI/OKR và quy trình chuẩn xuyên suốt F5 → BMC
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="destructive" 
            onClick={() => setIsResetModalOpen(true)}
            className="bg-red-600 hover:bg-red-700"
          >
            🔄 Reset Dữ Liệu
          </Button>
          <Button variant="outline">
            <Target className="h-4 w-4 mr-2" />
            Thiết lập KPI
          </Button>
          <Button>
            <Bot className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
        </div>
      </div>

      {/* Department Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tổng Phòng Ban</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length + realDepartments.length}</div>
            <p className="text-xs text-muted-foreground">
              {realDepartments.length} phòng ban từ database + {departments.length} mặc định
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tổng Nhân Sự</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {departments.reduce((sum, dept) => sum + dept.members, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Nhân viên toàn bộ phòng ban
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">KPI Trung Bình</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(departments.reduce((sum, dept) => sum + dept.kpi, 0) / departments.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Hiệu suất làm việc
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Công Việc Đang Xử Lý</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {departments.reduce((sum, dept) => sum + dept.tasks, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Tasks đang thực hiện
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Department Folder Data */}
      {Object.keys(departmentFolderData).length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              📂 Dữ liệu từ thư mục phòng ban
              <Badge variant="secondary">{Object.keys(departmentFolderData).length} phòng ban đã tải</Badge>
            </h2>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Xuất báo cáo
            </Button>
          </div>
          
          {/* Department Folder Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(departmentFolderData).map(([deptName, data]) => (
              <Card key={deptName} className="border-indigo-200 bg-indigo-50 dark:bg-indigo-950/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-indigo-700 dark:text-indigo-300">
                    {getDepartmentFolderName(deptName)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-indigo-600">
                      {data.companies.length} công ty
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {data.totalReports} báo cáo
                    </div>
                    <div className="text-xs text-green-600">
                      Doanh thu: {data.aggregatedMetrics.totalRevenue.toLocaleString('vi-VN')} VNĐ
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Company Reports Aggregation */}
      {allCompanyReports.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              📊 Dữ liệu tổng hợp từ tất cả công ty (Supabase)
              <Badge variant="secondary">{allCompanyReports.length} báo cáo</Badge>
            </h2>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Xuất báo cáo
            </Button>
          </div>
          
          {/* Aggregated Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-blue-700 dark:text-blue-300">Tổng Doanh Thu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {aggregatedData.totalRevenue.toLocaleString('vi-VN')} VNĐ
                </div>
                <p className="text-xs text-muted-foreground">
                  Từ {aggregatedData.totalCompanies} công ty
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-green-700 dark:text-green-300">Tổng Nhân Viên</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {aggregatedData.totalEmployees.toLocaleString('vi-VN')}
                </div>
                <p className="text-xs text-muted-foreground">
                  Trên tất cả công ty
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-purple-700 dark:text-purple-300">KPI Trung Bình</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {aggregatedData.averageKPI}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Hiệu suất chung
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-orange-700 dark:text-orange-300">Báo Cáo Gần Nhất</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {aggregatedData.latestReportDays}
                </div>
                <p className="text-xs text-muted-foreground">
                  ngày trước
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Company Reports */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Báo cáo gần đây</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allCompanyReports.slice(0, 6).map((report, index) => (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{report.company_name || `Công ty ${index + 1}`}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {new Date(report.created_at).toLocaleDateString('vi-VN')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Doanh thu:</span>
                        <span className="font-medium text-green-600">
                          {(report.revenue || 0).toLocaleString('vi-VN')} VNĐ
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Nhân viên:</span>
                        <span className="font-medium">{report.employee_count || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>KPI:</span>
                        <span className="font-medium text-blue-600">{report.kpi_score || 0}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Real Departments from Database */}
      {realDepartments.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Phòng ban từ doanh nghiệp mới tạo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {realDepartments.map((dept, index) => {
              // Tạo mảng màu sắc đồng bộ với departmentData (hỗ trợ dark mode)
              const colorSchemes = [
                { color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-950/20", borderColor: "border-blue-200 dark:border-blue-800" },
                { color: "text-green-600", bgColor: "bg-green-50 dark:bg-green-950/20", borderColor: "border-green-200 dark:border-green-800" },
                { color: "text-purple-600", bgColor: "bg-purple-50 dark:bg-purple-950/20", borderColor: "border-purple-200 dark:border-purple-800" },
                { color: "text-orange-600", bgColor: "bg-orange-50 dark:bg-orange-950/20", borderColor: "border-orange-200 dark:border-orange-800" },
                { color: "text-pink-600", bgColor: "bg-pink-50 dark:bg-pink-950/20", borderColor: "border-pink-200 dark:border-pink-800" },
                { color: "text-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-950/20", borderColor: "border-indigo-200 dark:border-indigo-800" },
                { color: "text-cyan-600", bgColor: "bg-cyan-50 dark:bg-cyan-950/20", borderColor: "border-cyan-200 dark:border-cyan-800" },
                { color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-950/20", borderColor: "border-amber-200 dark:border-amber-800" },
                { color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-950/20", borderColor: "border-emerald-200 dark:border-emerald-800" }
              ];
              const colorScheme = colorSchemes[index % colorSchemes.length];
              
              return (
                <Card key={dept.id} className={`border-2 ${colorScheme.borderColor} ${colorScheme.bgColor} hover:shadow-lg transition-all duration-300`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className={`text-lg flex items-center gap-2 ${colorScheme.color}`}>
                        🏢 {dept.name}
                      </CardTitle>
                      <Badge variant="secondary">{dept.organizations?.level || 'N/A'}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Tổ chức:</span>
                        <span className="text-primary">{dept.organizations?.name || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Mô tả:</span>
                        <span className="text-muted-foreground text-xs">{dept.description || 'Chưa có mô tả'}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full mt-4"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Quản lý phòng ban
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 6 Department Cards */}
        {departmentData.map((dept) => {
          const IconComponent = dept.icon;
          // Tạo border color tương ứng với màu sắc của từng phòng ban (hỗ trợ dark mode)
          const getBorderColor = (color: string) => {
            if (color.includes('yellow')) return 'border-yellow-200 dark:border-yellow-800';
            if (color.includes('blue')) return 'border-blue-200 dark:border-blue-800';
            if (color.includes('pink')) return 'border-pink-200 dark:border-pink-800';
            if (color.includes('green')) return 'border-green-200 dark:border-green-800';
            if (color.includes('emerald')) return 'border-emerald-200 dark:border-emerald-800';
            if (color.includes('purple')) return 'border-purple-200 dark:border-purple-800';
            if (color.includes('indigo')) return 'border-indigo-200 dark:border-indigo-800';
            if (color.includes('orange')) return 'border-orange-200 dark:border-orange-800';
            if (color.includes('amber')) return 'border-amber-200 dark:border-amber-800';
            if (color.includes('cyan')) return 'border-cyan-200 dark:border-cyan-800';
            return 'border-gray-200 dark:border-gray-800';
          };
          const borderColor = getBorderColor(dept.color);
          
          return (
            <Card 
              key={dept.id}
              className={`cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${borderColor} hover:border-primary/20 ${dept.bgColor}`}
              onClick={() => handleDeptCardClick(dept.id === 1 ? "shareholder" : dept.name.toLowerCase())}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className={`text-lg flex items-center gap-2 ${dept.color}`}>
                    <IconComponent className="w-5 h-5" />
                    {dept.name}
                  </CardTitle>
                  <Badge variant="default">{dept.aiAgent}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{dept.members}</div>
                    <p className="text-xs text-muted-foreground">Thành viên</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{dept.kpi}%</div>
                    <p className="text-xs text-muted-foreground">KPI</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Quản lý:</span>
                    <span className="text-primary">{dept.manager}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tasks:</span>
                    <span className="text-primary">{dept.tasks}</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full mt-4"
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Department Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🛠 Công Cụ Quản Lý</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Target className="h-4 w-4 mr-2" />
              Thiết lập KPI/OKR
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Quy trình chuẩn
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat nội bộ
            </Button>
            <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    setSelectedDepartment(null);
                    setReportData({
                      title: '',
                      description: '',
                      kpi_score: '',
                      revenue: '',
                      expenses: '',
                      employee_count: '',
                      performance_notes: '',
                      challenges: '',
                      achievements: '',
                      next_quarter_goals: ''
                    });
                  }}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Báo cáo phòng ban
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>📊 Báo Cáo Phòng Ban</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Department Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="department">Chọn Phòng Ban</Label>
                    <Select 
                      value={selectedDepartment?.id?.toString() || ''} 
                      onValueChange={(value) => {
                        const dept = departmentData.find(d => d.id.toString() === value) || 
                                   realDepartments.find(d => d.id.toString() === value);
                        setSelectedDepartment(dept);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn phòng ban để báo cáo" />
                      </SelectTrigger>
                      <SelectContent>
                        {departmentData.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id.toString()}>
                            {dept.name}
                          </SelectItem>
                        ))}
                        {realDepartments.map((dept) => (
                          <SelectItem key={`real-${dept.id}`} value={dept.id.toString()}>
                            {dept.name} ({dept.organizations?.name})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedDepartment && (
                    <>
                      {/* Report Form */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Tiêu Đề Báo Cáo</Label>
                          <Input
                            id="title"
                            value={reportData.title}
                            onChange={(e) => setReportData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Báo cáo tháng/quý..."
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="kpi_score">Điểm KPI (%)</Label>
                          <Input
                            id="kpi_score"
                            type="number"
                            value={reportData.kpi_score}
                            onChange={(e) => setReportData(prev => ({ ...prev, kpi_score: e.target.value }))}
                            placeholder="85"
                            min="0"
                            max="100"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="revenue">Doanh Thu (VNĐ)</Label>
                          <Input
                            id="revenue"
                            type="number"
                            value={reportData.revenue}
                            onChange={(e) => setReportData(prev => ({ ...prev, revenue: e.target.value }))}
                            placeholder="1000000000"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="expenses">Chi Phí (VNĐ)</Label>
                          <Input
                            id="expenses"
                            type="number"
                            value={reportData.expenses}
                            onChange={(e) => setReportData(prev => ({ ...prev, expenses: e.target.value }))}
                            placeholder="800000000"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="employee_count">Số Nhân Viên</Label>
                          <Input
                            id="employee_count"
                            type="number"
                            value={reportData.employee_count}
                            onChange={(e) => setReportData(prev => ({ ...prev, employee_count: e.target.value }))}
                            placeholder="25"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Mô Tả Báo Cáo</Label>
                        <Textarea
                          id="description"
                          value={reportData.description}
                          onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Tóm tắt tình hình hoạt động của phòng ban..."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="achievements">Thành Tựu Đạt Được</Label>
                        <Textarea
                          id="achievements"
                          value={reportData.achievements}
                          onChange={(e) => setReportData(prev => ({ ...prev, achievements: e.target.value }))}
                          placeholder="Các mục tiêu đã hoàn thành, dự án thành công..."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="challenges">Thách Thức & Khó Khăn</Label>
                        <Textarea
                          id="challenges"
                          value={reportData.challenges}
                          onChange={(e) => setReportData(prev => ({ ...prev, challenges: e.target.value }))}
                          placeholder="Những vấn đề gặp phải, cần hỗ trợ..."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="next_quarter_goals">Mục Tiêu Quý Tới</Label>
                        <Textarea
                          id="next_quarter_goals"
                          value={reportData.next_quarter_goals}
                          onChange={(e) => setReportData(prev => ({ ...prev, next_quarter_goals: e.target.value }))}
                          placeholder="Kế hoạch và mục tiêu cho quý/tháng tiếp theo..."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="performance_notes">Ghi Chú Hiệu Suất</Label>
                        <Textarea
                          id="performance_notes"
                          value={reportData.performance_notes}
                          onChange={(e) => setReportData(prev => ({ ...prev, performance_notes: e.target.value }))}
                          placeholder="Đánh giá chi tiết về hiệu suất làm việc..."
                          rows={2}
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end space-x-3 pt-4 border-t">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsReportModalOpen(false);
                            setSelectedDepartment(null);
                            setReportData({
                              title: '',
                              description: '',
                              kpi_score: '',
                              revenue: '',
                              expenses: '',
                              employee_count: '',
                              performance_notes: '',
                              challenges: '',
                              achievements: '',
                              next_quarter_goals: ''
                            });
                          }}
                          disabled={isSubmitting}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Hủy
                        </Button>
                        
                        <Button 
                          variant="secondary" 
                          onClick={() => handleSaveDraft()}
                          disabled={isSubmitting || !reportData.title || !selectedDepartment}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {isSubmitting && isDraft ? 'Đang lưu...' : 'Lưu nháp'}
                        </Button>
                        
                        <Button 
                          onClick={() => handleReportSubmit()}
                          disabled={isSubmitting || !reportData.title || !selectedDepartment}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          {isSubmitting && !isDraft ? 'Đang gửi...' : 'Đồng ý (Gửi & Đồng bộ)'}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🤖 AI Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  💡 Phòng Marketing cần tăng cường nhân sự cho Q2
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  ✅ Phòng Tài chính hoàn thành báo cáo đúng hạn
                </p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                  ⏰ 5 nhiệm vụ cần hoàn thành trong tuần này
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reset Data Confirmation Modal */}
      <Dialog open={isResetModalOpen} onOpenChange={setIsResetModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">⚠️ Xác nhận Reset Dữ Liệu</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Bạn có chắc chắn muốn reset toàn bộ số liệu của tất cả phòng ban về 0?
            </p>
            <p className="text-sm text-red-600 font-medium">
              ⚠️ Hành động này không thể hoàn tác!
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setIsResetModalOpen(false)}
            >
              Hủy
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                resetAllDepartmentData();
                setIsResetModalOpen(false);
                toast.success("Đã reset toàn bộ số liệu phòng ban về 0");
              }}
            >
              Xác nhận Reset
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}