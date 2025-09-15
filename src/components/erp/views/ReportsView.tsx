import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { mockReportData, mockDepartmentReports } from "@/lib/mockData";
import { 
  BarChart3, 
  TrendingUp, 
  FileText, 
  Download, 
  Eye,
  Calendar,
  DollarSign,
  Users,
  Package,
  Brain,
  Briefcase,
  AlertTriangle,
  PieChart,
  Factory,
  Target,
  Bot,
  Filter,
  Zap,
  CheckCircle,
  Clock,
  RefreshCw,
  Network,
  Layers,
  GitBranch,
  MessageCircle,
  BarChart2,
  ArrowUpDown,
  Globe,
  Building,
  Home,
  ChevronRight,
  Search,
  Gauge,
  Shield,
  Scale,
  LineChart,
  Database,
  MonitorSpeaker
} from "lucide-react";

import { FinancialReportDetailView } from "./FinancialReportDetailView";
import { HRReportDetailView } from "./HRReportDetailView";
import { WarehouseReportDetailView } from "./WarehouseReportDetailView";
import { SalesMarketingDetailView } from "./SalesMarketingDetailView";
import { ProjectBranchDetailView } from "./ProjectBranchDetailView";
import { RiskComplianceDetailView } from "./RiskComplianceDetailView";

interface ReportsViewProps {
  organizations: any[];
}

// Mock data for organizational levels
const organizationLevels = {
  'BMC': { name: 'BMC Tập đoàn', level: 0, color: 'text-purple-600', icon: Building },
  'F1': { name: 'F1 - Cụm ngành', level: 1, color: 'text-blue-600', icon: Layers },
  'F2': { name: 'F2 - Ngành', level: 2, color: 'text-green-600', icon: Network },
  'F3': { name: 'F3 - Công ty', level: 3, color: 'text-orange-600', icon: Factory },
  'F4': { name: 'F4 - Chi nhánh', level: 4, color: 'text-red-600', icon: Home },
  'F5': { name: 'F5 - Startup', level: 5, color: 'text-pink-600', icon: Zap }
};

// Mock data flow visualization
const dataFlowStages = [
  { id: 1, name: 'Nhập liệu F5/F4', level: 'F5-F4', status: 'active', count: '2,543', icon: Database },
  { id: 2, name: 'Tổng hợp F3', level: 'F3', status: 'processing', count: '156', icon: BarChart2 },
  { id: 3, name: 'Hợp nhất F2', level: 'F2', status: 'processing', count: '24', icon: GitBranch },
  { id: 4, name: 'Cụm ngành F1', level: 'F1', status: 'completed', count: '8', icon: Network },
  { id: 5, name: 'BMC Tập đoàn', level: 'BMC', status: 'completed', count: '1', icon: Building },
  { id: 6, name: 'AI Analysis', level: 'AI', status: 'active', count: '∞', icon: Brain }
];

// Enhanced report categories with new modules
const reportCategories = [
  // Original 6 categories (existing)
  {
    id: 'financial',
    name: 'Báo cáo Tài chính & Doanh thu',
    description: 'Doanh thu, chi phí, lợi nhuận, công nợ, dòng tiền',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    aiAgent: 'AI Finance Agent',
    type: 'core',
    metrics: {
      totalReports: 24,
      realTimeUpdates: 12,
      accuracy: '99.8%',
      avgResponseTime: '2.3s'
    },
    reports: [
      { name: 'P&L Statement', description: 'Báo cáo lãi lỗ realtime', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'Dòng tiền (Cashflow)', description: 'Dự báo và theo dõi dòng tiền', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'Công nợ (AR/AP)', description: 'Phải thu - phải trả chi tiết', status: 'pending', date: '2024-01-14', priority: 'medium' },
      { name: 'Balance Sheet', description: 'Bảng cân đối kế toán', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'Thuế và tuân thủ', description: 'Báo cáo thuế tự động', status: 'updated', date: '2024-01-14', priority: 'medium' }
    ]
  },
  {
    id: 'hr',
    name: 'Báo cáo Nhân sự',
    description: 'Chấm công, KPI, lương thưởng, đánh giá hiệu suất',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    aiAgent: 'AI HR Agent',
    type: 'core',
    metrics: {
      totalReports: 18,
      realTimeUpdates: 8,
      accuracy: '98.5%',
      avgResponseTime: '1.8s'
    },
    reports: [
      { name: 'Chấm công realtime', description: 'Theo dõi ca làm, nghỉ phép', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'KPI/OKR cá nhân', description: 'Đánh giá hiệu suất theo KPI', status: 'updated', date: '2024-01-14', priority: 'high' },
      { name: 'Bảng lương chi tiết', description: 'Lương, thưởng, phúc lợi', status: 'pending', date: '2024-01-13', priority: 'medium' },
      { name: 'Tuyển dụng ATS', description: 'Hiệu quả tuyển dụng', status: 'updated', date: '2024-01-12', priority: 'low' },
      { name: 'Đào tạo & phát triển', description: 'Lộ trình thăng tiến', status: 'updated', date: '2024-01-11', priority: 'medium' }
    ]
  },
  {
    id: 'inventory',
    name: 'Báo cáo Kho & Vận hành',
    description: 'Tồn kho, xuất nhập, logistics, chuỗi cung ứng',
    icon: Package,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    aiAgent: 'AI Supply Chain Agent',
    type: 'core',
    metrics: {
      totalReports: 16,
      realTimeUpdates: 14,
      accuracy: '97.2%',
      avgResponseTime: '3.1s'
    },
    reports: [
      { name: 'Tồn kho realtime', description: 'Theo dõi tồn kho theo chi nhánh', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'Xuất nhập kho', description: 'Lịch sử xuất nhập chi tiết', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'Dự báo nhu cầu', description: 'AI dự báo nhu cầu tái đặt hàng', status: 'updated', date: '2024-01-14', priority: 'high' },
      { name: 'Nhà cung cấp', description: 'Đánh giá hiệu suất NCC', status: 'pending', date: '2024-01-14', priority: 'medium' },
      { name: 'Logistics', description: 'Vận chuyển và phân phối', status: 'updated', date: '2024-01-14', priority: 'medium' }
    ]
  },
  {
    id: 'marketing',
    name: 'Báo cáo Marketing & Kinh doanh',
    description: 'CRM, pipeline, chiến dịch, ROI marketing',
    icon: TrendingUp,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    aiAgent: 'AI CRM/Marketing Agent',
    type: 'core',
    metrics: {
      totalReports: 20,
      realTimeUpdates: 15,
      accuracy: '96.8%',
      avgResponseTime: '2.7s'
    },
    reports: [
      { name: 'Pipeline bán hàng', description: 'Theo dõi cơ hội kinh doanh', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'Hiệu quả marketing', description: 'ROI chiến dịch marketing', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'CRM Analytics', description: 'Phân tích hành vi khách hàng', status: 'updated', date: '2024-01-14', priority: 'high' },
      { name: 'Chuyển đổi khách hàng', description: 'Tỷ lệ conversion từng kênh', status: 'pending', date: '2024-01-14', priority: 'medium' },
      { name: 'Thị phần & đối thủ', description: 'Phân tích cạnh tranh', status: 'updated', date: '2024-01-13', priority: 'low' }
    ]
  },
  {
    id: 'projects',
    name: 'Báo cáo Dự án/Chi nhánh',
    description: 'Tiến độ dự án, ngân sách, KPI theo chi nhánh',
    icon: Briefcase,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
    aiAgent: 'AI Project Agent',
    type: 'core',
    metrics: {
      totalReports: 14,
      realTimeUpdates: 10,
      accuracy: '98.1%',
      avgResponseTime: '2.1s'
    },
    reports: [
      { name: 'Tiến độ dự án', description: 'Gantt chart và timeline', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'Ngân sách dự án', description: 'Chi phí thực tế vs kế hoạch', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'KPI chi nhánh', description: 'Hiệu suất từng chi nhánh', status: 'updated', date: '2024-01-14', priority: 'high' },
      { name: 'Quản lý rủi ro', description: 'Cảnh báo rủi ro dự án', status: 'pending', date: '2024-01-13', priority: 'medium' },
      { name: 'Tài nguyên phân bổ', description: 'Phân bổ nhân lực và tài sản', status: 'updated', date: '2024-01-12', priority: 'medium' }
    ]
  },
  {
    id: 'risk',
    name: 'Báo cáo Rủi ro & Tuân thủ',
    description: 'Rủi ro tài chính, vận hành, pháp lý, tuân thủ',
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950/20',
    aiAgent: 'AI Risk Agent',
    type: 'core',
    metrics: {
      totalReports: 12,
      realTimeUpdates: 12,
      accuracy: '99.2%',
      avgResponseTime: '1.5s'
    },
    reports: [
      { name: 'Rủi ro tài chính', description: 'Cảnh báo nợ xấu, dòng tiền âm', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'Rủi ro vận hành', description: 'Chậm tiến độ, lỗi sản xuất', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'Tuân thủ pháp lý', description: 'Compliance với quy định', status: 'updated', date: '2024-01-14', priority: 'high' },
      { name: 'Rủi ro nhân sự', description: 'Thiếu hụt, nghỉ việc cao', status: 'pending', date: '2024-01-14', priority: 'medium' },
      { name: 'Cảnh báo realtime', description: 'Alert tức thì khi có rủi ro', status: 'updated', date: '2024-01-15', priority: 'high' }
    ]
  },

  // NEW ENHANCED CATEGORIES
  {
    id: 'cross-module',
    name: 'Báo cáo Hợp nhất Cross-Module',
    description: 'Tích hợp dữ liệu từ nhiều module → báo cáo toàn cảnh',
    icon: Network,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/20',
    aiAgent: 'AI Integration Agent',
    type: 'advanced',
    metrics: {
      totalReports: 8,
      realTimeUpdates: 8,
      accuracy: '97.5%',
      avgResponseTime: '4.2s'
    },
    reports: [
      { name: 'Marketing → Doanh thu', description: 'Ảnh hưởng marketing đến doanh thu', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'Nhân sự → Tài chính', description: 'Chi phí nhân sự trong dự án đầu tư', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'Sản xuất → Logistics', description: 'Hiệu quả chuỗi cung ứng end-to-end', status: 'updated', date: '2024-01-14', priority: 'medium' },
      { name: 'Pháp chế → Đầu tư', description: 'Rủi ro pháp lý trong M&A', status: 'pending', date: '2024-01-14', priority: 'high' },
      { name: 'Công nghệ → Toàn bộ', description: 'Infrastructure impact trên tất cả module', status: 'updated', date: '2024-01-13', priority: 'medium' }
    ]
  },
  {
    id: 'kpi-org',
    name: 'Báo cáo KPI & Hiệu suất Tổ chức',
    description: 'KPI theo từng tầng F5→BMC và phòng ban',
    icon: Target,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
    aiAgent: 'AI KPI Agent',
    type: 'advanced',
    metrics: {
      totalReports: 15,
      realTimeUpdates: 12,
      accuracy: '98.9%',
      avgResponseTime: '2.8s'
    },
    reports: [
      { name: 'KPI BMC → F1', description: 'Hiệu suất cụm ngành vs mục tiêu', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'KPI F2 → F3', description: 'Hiệu suất công ty trong ngành', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'KPI F4 → F5', description: 'Hiệu suất chi nhánh và startup', status: 'updated', date: '2024-01-14', priority: 'high' },
      { name: 'KPI Phòng ban', description: 'So sánh hiệu suất các phòng ban', status: 'updated', date: '2024-01-14', priority: 'medium' },
      { name: 'OKR Tổ chức', description: 'Objectives & Key Results toàn tập đoàn', status: 'pending', date: '2024-01-13', priority: 'medium' }
    ]
  },
  {
    id: 'predictive',
    name: 'Báo cáo Dự báo (Predictive)',
    description: 'AI dự báo tài chính, nhân sự, thị trường 3-12 tháng',
    icon: Brain,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50 dark:bg-violet-950/20',
    aiAgent: 'AI Forecast Agent',
    type: 'advanced',
    metrics: {
      totalReports: 10,
      realTimeUpdates: 6,
      accuracy: '94.3%',
      avgResponseTime: '5.1s'
    },
    reports: [
      { name: 'Dự báo Doanh thu', description: 'Dự báo doanh thu 6-12 tháng tới', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'Dự báo Dòng tiền', description: 'Cashflow prediction với AI', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'Dự báo Nhân sự', description: 'Nhu cầu tuyển dụng tương lai', status: 'updated', date: '2024-01-14', priority: 'medium' },
      { name: 'Dự báo Thị trường', description: 'Xu hướng ngành và cơ hội', status: 'pending', date: '2024-01-14', priority: 'medium' },
      { name: 'Scenario Analysis', description: 'Phân tích tình huống best/worst case', status: 'updated', date: '2024-01-13', priority: 'low' }
    ]
  },
  {
    id: 'benchmark',
    name: 'Báo cáo So sánh & Benchmarking',
    description: 'So sánh nội bộ & benchmark với thị trường',
    icon: BarChart2,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50 dark:bg-teal-950/20',
    aiAgent: 'AI Benchmark Agent',
    type: 'advanced',
    metrics: {
      totalReports: 9,
      realTimeUpdates: 5,
      accuracy: '96.1%',
      avgResponseTime: '3.7s'
    },
    reports: [
      { name: 'F3 vs F4 Performance', description: 'So sánh công ty vs chi nhánh cùng ngành', status: 'updated', date: '2024-01-15', priority: 'high' },
      { name: 'Phòng ban vs Phòng ban', description: 'Hiệu quả các phòng ban trong công ty', status: 'updated', date: '2024-01-14', priority: 'medium' },
      { name: 'Industry Benchmark', description: 'So sánh với trung bình ngành', status: 'updated', date: '2024-01-14', priority: 'high' },
      { name: 'Market Intelligence', description: 'Vị thế BMC so với đối thủ', status: 'pending', date: '2024-01-13', priority: 'medium' },
      { name: 'ROI Comparison', description: 'So sánh ROI các khoản đầu tư', status: 'updated', date: '2024-01-12', priority: 'low' }
    ]
  },
  {
    id: 'conversational',
    name: 'Báo cáo Tương tác AI (Conversational)',
    description: 'Hỏi đáp trực tiếp với AI về bất kỳ dữ liệu nào',
    icon: MessageCircle,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50 dark:bg-rose-950/20',
    aiAgent: 'AI Report Bot',
    type: 'ai-powered',
    metrics: {
      totalReports: '∞',
      realTimeUpdates: '∞',
      accuracy: '95.8%',
      avgResponseTime: '1.2s'
    },
    reports: [
      { name: 'Real-time Query', description: 'Hỏi bất kỳ câu hỏi nào về dữ liệu', status: 'active', date: 'Realtime', priority: 'high' },
      { name: 'Visual Analytics', description: 'Trả lời bằng biểu đồ và số liệu', status: 'active', date: 'Realtime', priority: 'high' },
      { name: 'Natural Language', description: 'Hỏi đáp bằng ngôn ngữ tự nhiên', status: 'active', date: 'Realtime', priority: 'high' },
      { name: 'Context Aware', description: 'AI hiểu ngữ cảnh và lịch sử chat', status: 'active', date: 'Realtime', priority: 'medium' },
      { name: 'Multi-modal', description: 'Kết hợp text, chart, table trong phản hồi', status: 'active', date: 'Realtime', priority: 'medium' }
    ]
  }
];

export function ReportsView({ organizations }: ReportsViewProps) {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'detail' | 'drill-down' | 'data-flow'>('overview');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [selectedOrgLevel, setSelectedOrgLevel] = useState<string>('BMC');
  const [aiQuery, setAiQuery] = useState<string>('');
  const [showDataFlow, setShowDataFlow] = useState(false);
  const [realTimeReports, setRealTimeReports] = useState<any[]>([]);
  const [consolidatedReports, setConsolidatedReports] = useState<any[]>([]);
  const [departmentReports, setDepartmentReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dashboardMetrics, setDashboardMetrics] = useState({
    totalReports: 0,
    realTimeUpdates: 0,
    riskAlerts: 0,
    aiAccuracy: '98.2%'
  });

  // Load aggregated reports from Supabase
  const loadAggregatedReports = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Load consolidated reports from BMC to F1-F5
      const { data: consolidatedData, error: consolidatedError } = await supabase
        .from('consolidated_reports')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });

      if (consolidatedError) throw consolidatedError;

      // Load department reports from new database table
      const { data: departmentData, error: departmentError } = await supabase
        .from('department_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (departmentError) {
        console.warn('Department reports table not found, using mock data:', departmentError);
      }

      // Load company reports from new database table
      const { data: companyData, error: companyError } = await supabase
        .from('company_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (companyError) {
        console.warn('Company reports table not found, using mock data:', companyError);
      }

      // Use real data if available, fallback to mock data
      const finalConsolidatedData = consolidatedData?.length ? consolidatedData : [];
      const finalDepartmentData = departmentData?.length ? departmentData : Object.values(mockDepartmentReports);
      const finalCompanyData = companyData?.length ? companyData : (Array.isArray(mockReportData) ? mockReportData : Object.values(mockReportData));

      setConsolidatedReports(finalConsolidatedData);
      setDepartmentReports(finalDepartmentData);
      setRealTimeReports([...finalCompanyData, ...finalDepartmentData]);

      console.log('Loaded reports:', {
        consolidated: finalConsolidatedData.length,
        departments: finalDepartmentData.length,
        companies: finalCompanyData.length
      });

      // Update dashboard metrics based on real data
      const totalReports = finalConsolidatedData.length + finalDepartmentData.length + finalCompanyData.length;
      const recentReports = [...finalConsolidatedData, ...finalDepartmentData, ...finalCompanyData]
        .filter(report => {
          const reportDate = new Date(report.created_at);
          const today = new Date();
          const diffTime = Math.abs(today.getTime() - reportDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 1;
        }).length;

      setDashboardMetrics({
        totalReports,
        realTimeUpdates: recentReports,
        riskAlerts: Math.floor(Math.random() * 5) + 1, // Simulated risk alerts
        aiAccuracy: '98.2%'
      });

    } catch (error) {
      console.error('Error loading aggregated reports:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate AI insights from aggregated data
  const generateAggregatedInsights = async () => {
    if (!user || realTimeReports.length === 0) return;

    try {
      // Aggregate data across all organizational levels
      const aggregatedData = {
        totalRevenue: realTimeReports.reduce((sum, report) => sum + (report.revenue || 0), 0),
        totalExpenses: realTimeReports.reduce((sum, report) => sum + (report.expenses || 0), 0),
        totalEmployees: realTimeReports.reduce((sum, report) => sum + (report.employee_count || 0), 0),
        avgKpiScore: realTimeReports.reduce((sum, report) => sum + (report.kpi_score || 0), 0) / realTimeReports.length,
        organizationLevels: {
          BMC: realTimeReports.filter(r => r.organization_level === 'BMC').length,
          F1: realTimeReports.filter(r => r.organization_level === 'F1').length,
          F2: realTimeReports.filter(r => r.organization_level === 'F2').length,
          F3: realTimeReports.filter(r => r.organization_level === 'F3').length,
          F4: realTimeReports.filter(r => r.organization_level === 'F4').length,
          F5: realTimeReports.filter(r => r.organization_level === 'F5').length
        }
      };

      // Create AI insights based on aggregated data
      const aiInsights = {
        performance: `Tổng doanh thu: ${aggregatedData.totalRevenue.toLocaleString('vi-VN')} VND, Lợi nhuận: ${(aggregatedData.totalRevenue - aggregatedData.totalExpenses).toLocaleString('vi-VN')} VND`,
        efficiency: `KPI trung bình: ${aggregatedData.avgKpiScore.toFixed(1)}/10, Tổng nhân sự: ${aggregatedData.totalEmployees} người`,
        strategic: `Phân bố tổ chức: BMC(${aggregatedData.organizationLevels.BMC}) → F1(${aggregatedData.organizationLevels.F1}) → F2(${aggregatedData.organizationLevels.F2}) → F3(${aggregatedData.organizationLevels.F3}) → F4(${aggregatedData.organizationLevels.F4}) → F5(${aggregatedData.organizationLevels.F5})`
      };

      // Store insights in Supabase
      try {
        await supabase
          .from('ai_insights')
          .upsert({
            user_id: user.id,
            entity_type: 'aggregated_reports',
            entity_id: 'bmc_ecosystem',
            insights: aiInsights,
            created_at: new Date().toISOString()
          });
      } catch (error) {
        console.warn('AI insights table not found, skipping database insert:', error);
      }

    } catch (error) {
      console.error('Error generating aggregated insights:', error);
    }
  };

  useEffect(() => {
    if (user) {
      loadAggregatedReports();
    }
  }, [user]);

  useEffect(() => {
    if (realTimeReports.length > 0) {
      generateAggregatedInsights();
    }
  }, [realTimeReports]);

  // Show specific detail views for core report categories
  if (viewMode === 'detail' && selectedCategory) {
    if (selectedCategory.id === 'financial') {
      return <FinancialReportDetailView onBack={() => setViewMode('overview')} />;
    }
    if (selectedCategory.id === 'hr') {
      return <HRReportDetailView onBack={() => setViewMode('overview')} />;
    }
    if (selectedCategory.id === 'inventory') {
      return <WarehouseReportDetailView onBack={() => setViewMode('overview')} />;
    }
  }
  
  if (viewMode === 'detail' && selectedCategory) {
    return (
      <div className="space-y-6">
        {/* Detail Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setViewMode('overview')}>
              ← Quay lại
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <selectedCategory.icon className="h-8 w-8 mr-3" />
                {selectedCategory.name}
              </h1>
              <p className="text-muted-foreground mt-2">
                {selectedCategory.description} - {selectedCategory.aiAgent}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Bot className="h-4 w-4 mr-2" />
              {selectedCategory.aiAgent}
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Xuất tất cả
            </Button>
          </div>
        </div>

        {/* Category Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(selectedCategory.metrics).map(([key, value]) => (
            <Card key={key}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{value as string}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Realtime Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>📊 Realtime BI Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`h-80 ${selectedCategory.bgColor} rounded-lg flex items-center justify-center border-2 border-dashed`}>
                  <div className="text-center">
                    <selectedCategory.icon className="h-20 w-20 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-lg mb-2">
                      Dashboard realtime cho {selectedCategory.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Biểu đồ 3D, heatmap, timeline - cập nhật liên tục
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="h-5 w-5 mr-2" />
                  {selectedCategory.aiAgent}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">
                        Cập nhật {selectedCategory.metrics.realTimeUpdates}/{selectedCategory.metrics.totalReports} báo cáo realtime
                      </p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Độ chính xác: {selectedCategory.metrics.accuracy}
                      </p>
                    </div>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Zap className="h-4 w-4 text-orange-600 mt-0.5" />
                      <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                        Phản hồi trung bình: {selectedCategory.metrics.avgResponseTime}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Reports List */}
        <Card>
          <CardHeader>
            <CardTitle>📋 Danh sách báo cáo chi tiết</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedCategory.reports.map((report: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${selectedCategory.bgColor}`}>
                      <FileText className={`h-5 w-5 ${selectedCategory.color}`} />
                    </div>
                    <div>
                      <h4 className="font-medium">{report.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {report.description} • Cập nhật: {report.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={
                        report.priority === 'high' ? 'default' : 
                        report.priority === 'medium' ? 'secondary' : 'outline'
                      }
                    >
                      {report.priority === 'high' ? 'Ưu tiên cao' : 
                       report.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                    </Badge>
                    <Badge 
                      variant={report.status === 'updated' ? 'default' : 'secondary'}
                    >
                      {report.status === 'updated' ? 'Mới nhất' : 'Chờ cập nhật'}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">📊 AI Reporting Center - Trung Tâm Báo Cáo</h1>
          <p className="text-muted-foreground mt-2">
            Hệ thần kinh dữ liệu BMC - Realtime • Cross-Module • AI-Driven • F5→F1→BMC
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={showDataFlow ? "default" : "outline"}
            onClick={() => setShowDataFlow(!showDataFlow)}
          >
            <GitBranch className="h-4 w-4 mr-2" />
            Data Flow
          </Button>
          <Button variant="outline">
            <Layers className="h-4 w-4 mr-2" />
            Drill-Down
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button>
            <Bot className="h-4 w-4 mr-2" />
            AI Report Bot
          </Button>
        </div>
      </div>

      {/* Data Flow Visualization */}
      {showDataFlow && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              📊 Sơ đồ Luồng Dữ liệu (Data Flow BMC Ecosystem)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="flex items-center justify-between">
                {dataFlowStages.map((stage, index) => (
                  <div key={stage.id} className="flex items-center">
                    <div className="text-center">
                      <div className={`
                        p-4 rounded-full border-2 
                        ${stage.status === 'active' ? 'bg-green-50 border-green-500 text-green-600' : 
                          stage.status === 'processing' ? 'bg-blue-50 border-blue-500 text-blue-600' :
                          'bg-gray-50 border-gray-300 text-gray-600'}
                      `}>
                        <stage.icon className="h-6 w-6" />
                      </div>
                      <div className="mt-2 text-xs font-medium">{stage.name}</div>
                      <div className="text-xs text-muted-foreground">{stage.level}</div>
                      <div className="text-sm font-bold text-primary">{stage.count}</div>
                    </div>
                    {index < dataFlowStages.length - 1 && (
                      <ChevronRight className="h-6 w-6 mx-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-center text-muted-foreground">
                  <strong>Luồng dữ liệu liền mạch:</strong> F5/F4 nhập liệu → F3 tổng hợp → F2 hợp nhất → F1 cụm ngành → BMC tập đoàn → AI phân tích realtime
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Organizational Level Navigator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Layers className="h-5 w-5 mr-2" />
            🏢 Điều hướng theo Tầng Tổ chức (Drill-Down Navigation)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            {Object.entries(organizationLevels).map(([key, level]) => (
              <Button
                key={key}
                variant={selectedOrgLevel === key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedOrgLevel(key)}
                className="flex items-center space-x-2"
              >
                <level.icon className="h-4 w-4" />
                <span className={level.color}>{level.name}</span>
              </Button>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            <strong>Hiện tại:</strong> Xem báo cáo từ góc độ <span className="font-medium">{organizationLevels[selectedOrgLevel as keyof typeof organizationLevels].name}</span>
          </div>
        </CardContent>
      </Card>

      {/* Report Dashboard - Real Data from Supabase */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Báo cáo Tổng hợp</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : dashboardMetrics.totalReports}</div>
            <p className="text-xs text-muted-foreground">
              Báo cáo từ BMC → F1-F5
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Cập nhật Realtime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 flex items-center">
              {loading ? '...' : dashboardMetrics.realTimeUpdates}
              <RefreshCw className="h-4 w-4 ml-2 animate-spin" />
            </div>
            <p className="text-xs text-muted-foreground">
              Báo cáo hôm nay
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Cảnh Báo Rủi Ro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{loading ? '...' : dashboardMetrics.riskAlerts}</div>
            <p className="text-xs text-muted-foreground">
              Rủi ro cần xử lý ngay
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">AI Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{dashboardMetrics.aiAccuracy}</div>
            <p className="text-xs text-muted-foreground">
              Độ chính xác dự báo AI
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Aggregated Reports by Organization Level */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Layers className="h-5 w-5 mr-2" />
            📊 Báo cáo Tổng hợp theo Tầng Tổ chức (BMC → F1-F5)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Đang tải báo cáo tổng hợp...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(organizationLevels).map(([key, level]) => {
                const levelReports = realTimeReports.filter(report => report.organization_level === key);
                const levelRevenue = levelReports.reduce((sum, report) => sum + (report.revenue || 0), 0);
                const levelEmployees = levelReports.reduce((sum, report) => sum + (report.employee_count || 0), 0);
                const avgKpi = levelReports.length > 0 ? levelReports.reduce((sum, report) => sum + (report.kpi_score || 0), 0) / levelReports.length : 0;
                
                return (
                  <div key={key} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <level.icon className={`h-6 w-6 ${level.color}`} />
                        <div>
                          <h4 className="font-semibold">{level.name}</h4>
                          <p className="text-sm text-muted-foreground">{levelReports.length} báo cáo</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">Doanh thu:</span> {levelRevenue.toLocaleString('vi-VN')} VND
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Nhân sự:</span> {levelEmployees} người
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">KPI TB:</span> {avgKpi.toFixed(1)}/10
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {realTimeReports.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Chưa có báo cáo nào được tạo</p>
                  <p className="text-sm">Hãy tạo báo cáo từ trang Công ty hoặc Phòng ban</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Company-Level Detailed Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2" />
            🏢 Báo cáo Chi tiết theo Công ty (F1-F5)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {consolidatedReports.map((company) => {
              const companyDepartments = departmentReports.filter(dept => dept.company_id === company.id);
              const totalRevenue = companyDepartments.reduce((sum, dept) => sum + (dept.revenue || 0), 0);
              const totalEmployees = companyDepartments.reduce((sum, dept) => sum + (dept.employee_count || 0), 0);
              const avgPerformance = companyDepartments.length > 0 ? 
                companyDepartments.reduce((sum, dept) => sum + (dept.performance_score || 0), 0) / companyDepartments.length : 0;
              
              return (
                <div key={company.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        company.organization_level === 'f1' ? 'bg-blue-500' :
                        company.organization_level === 'f2' ? 'bg-green-500' :
                        company.organization_level === 'f3' ? 'bg-yellow-500' :
                        company.organization_level === 'f4' ? 'bg-orange-500' :
                        'bg-red-500'
                      }`} />
                      <h4 className="font-semibold text-lg">{company.company_name}</h4>
                      <Badge variant="outline">{company.organization_level.toUpperCase()}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        Cập nhật: {new Date(company.updated_at).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Doanh thu</span>
                      </div>
                      <p className="text-lg font-bold text-blue-600">
                        {(company.revenue || totalRevenue).toLocaleString('vi-VN')} VND
                      </p>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Nhân sự</span>
                      </div>
                      <p className="text-lg font-bold text-green-600">
                        {company.employee_count || totalEmployees} người
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">Hiệu suất</span>
                      </div>
                      <p className="text-lg font-bold text-purple-600">
                        {(company.kpi_score || avgPerformance).toFixed(1)}/10
                      </p>
                    </div>
                  </div>
                  
                  {companyDepartments.length > 0 && (
                    <div>
                      <h5 className="font-medium mb-2 flex items-center">
                        <ChevronRight className="h-4 w-4 mr-1" />
                        Phòng ban ({companyDepartments.length})
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {companyDepartments.map((dept) => (
                          <div key={dept.id} className="bg-muted/50 p-2 rounded text-sm">
                            <div className="font-medium">{dept.department_name}</div>
                            <div className="text-muted-foreground">
                              {dept.revenue?.toLocaleString('vi-VN')} VND • {dept.employee_count} người
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            
            {consolidatedReports.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Chưa có báo cáo công ty nào</p>
                <p className="text-sm">Báo cáo sẽ được tạo tự động khi có dữ liệu từ các phòng ban</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* BI Dashboard 3D */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 BI Dashboard 3D - Realtime</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 rounded-lg flex items-center justify-center border-2 border-dashed">
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-muted-foreground text-lg mb-2">
                Biểu đồ realtime dạng 3D, heatmap, timeline
              </p>
              <p className="text-sm text-muted-foreground">
                Hiển thị dữ liệu xuyên suốt: BMC → F1 → F2 → F3 → F4 → F5
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Conversational Reporting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            🤖 AI Conversational Reporting - Hỏi đáp trực tiếp
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Ví dụ: 'Doanh thu Q2 của ngành F&B là bao nhiêu?' hoặc 'So sánh hiệu suất công ty A vs B'"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              className="flex-1"
            />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Hỏi AI
            </Button>
          </div>
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Gợi ý câu hỏi:</strong> "Tổng doanh thu tháng này?", "Phòng ban nào có chi phí cao nhất?", "Dự báo lợi nhuận 6 tháng tới", "So sánh F3 vs benchmark ngành"
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Report Categories - Enhanced with Types */}
      <Tabs defaultValue="core" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="core">📊 Core Reports (6 Module chính)</TabsTrigger>
          <TabsTrigger value="advanced">🚀 Advanced Reports (Cross-Module + KPI)</TabsTrigger>
          <TabsTrigger value="ai-powered">🤖 AI-Powered (Predictive + Conversational)</TabsTrigger>
        </TabsList>

        <TabsContent value="core" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportCategories.filter(cat => cat.type === 'core').map((category) => (
              <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${category.bgColor}`}>
                      <category.icon className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.metrics.realTimeUpdates}/{category.metrics.totalReports}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Độ chính xác:</span>
                      <span className="font-medium text-green-600">{category.metrics.accuracy}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Phản hồi:</span>
                      <span className="font-medium">{category.metrics.avgResponseTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>AI Agent:</span>
                      <span className="font-medium text-blue-600">{category.aiAgent}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory(category);
                      setViewMode('detail');
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Xem chi tiết
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportCategories.filter(cat => cat.type === 'advanced').map((category) => (
              <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${category.bgColor}`}>
                      <category.icon className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <Badge variant="default" className="text-xs bg-gradient-to-r from-blue-500 to-purple-600">
                      Advanced
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Độ chính xác:</span>
                      <span className="font-medium text-green-600">{category.metrics.accuracy}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Phản hồi:</span>
                      <span className="font-medium">{category.metrics.avgResponseTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>AI Agent:</span>
                      <span className="font-medium text-purple-600">{category.aiAgent}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory(category);
                      setViewMode('detail');
                    }}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Phân tích AI
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-powered" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportCategories.filter(cat => cat.type === 'ai-powered').map((category) => (
              <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${category.bgColor}`}>
                      <category.icon className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <Badge variant="default" className="text-xs bg-gradient-to-r from-purple-500 to-pink-600">
                      AI-Powered
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Độ chính xác:</span>
                      <span className="font-medium text-green-600">{category.metrics.accuracy}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Phản hồi:</span>
                      <span className="font-medium">{category.metrics.avgResponseTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>AI Agent:</span>
                      <span className="font-medium text-rose-600">{category.aiAgent}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant="default"
                    onClick={() => {
                      setSelectedCategory(category);
                      setViewMode('detail');
                    }}
                  >
                    <Bot className="h-4 w-4 mr-2" />
                    Khởi động AI
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Forecast Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              🤖 AI Dự Báo & Phân Tích
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200">Dự báo doanh thu Q2</h4>
                <p className="text-2xl font-bold text-green-600">+18.5%</p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Tăng trưởng dự kiến nhờ chiến lược mở rộng thị trường
                </p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">Hiệu quả vận hành</h4>
                <p className="text-2xl font-bold text-blue-600">92.8%</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Tối ưu hóa quy trình nhờ AI automation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              ⚠️ Cảnh Báo Rủi Ro Realtime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <h4 className="font-semibold text-orange-800 dark:text-orange-200">Cảnh báo dòng tiền</h4>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Dự báo dòng tiền âm trong 2 tuần nếu không thu hồi 450M công nợ
                </p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <h4 className="font-semibold text-red-800 dark:text-red-200">Rủi ro ngân sách</h4>
                <p className="text-sm text-red-700 dark:text-red-300">
                  3 dự án F3 vượt ngân sách 20% - cần can thiệp ngay
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Reports */}
      <Card>
        <CardHeader>
          <CardTitle>⚡ Báo Cáo Nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col">
              <DollarSign className="h-6 w-6 mb-2" />
              Doanh thu hôm nay
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <Users className="h-6 w-6 mb-2" />
              Chấm công tuần này
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <Package className="h-6 w-6 mb-2" />
              Tồn kho hiện tại
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              KPI tháng này
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}