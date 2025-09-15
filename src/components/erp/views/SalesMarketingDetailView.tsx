import { useState, useEffect, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  Calendar,
  Megaphone,
  UserPlus,
  BarChart3,
  PieChart,
  Filter,
  Search,
  Download,
  Upload,
  Plus,
  Edit,
  Bot,
  MessageSquare,
  FileText,
  Zap,
  Eye,
  CheckCircle,
  AlertTriangle,
  Clock,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Activity,
  Settings,
  PlayCircle,
  PauseCircle,
  Building2,
  Briefcase,
  Star,
  Lightbulb,
  TrendingDown,
  X
} from "lucide-react";
import { toast } from "sonner";

interface SalesMarketingDetailViewProps {
  onBack: () => void;
  organizations: any[];
}

// Enhanced Mock data with comprehensive business intelligence from BMC ecosystem
const mockSalesData = {
  monthlyRevenue: 15750000000, // Tổng doanh thu từ tất cả công ty trong hệ sinh thái BMC
  monthlyTarget: 18000000000,
  conversionRate: 24.8, // Tỷ lệ chuyển đổi trung bình từ BMC->F5
  newCustomers: 2847, // Khách hàng mới từ tất cả các cấp độ
  marketingROI: 485, // ROI marketing tổng hợp
  totalOrders: 8956, // Tổng đơn hàng từ toàn hệ thống
  averageOrderValue: 1758000, // Giá trị đơn hàng trung bình
  customerRetention: 92.7, // Tỷ lệ giữ chân khách hàng
  totalRevenueBMC: 15750000000,
  revenueGrowthRate: 28.5, // Tăng trưởng doanh thu YoY
  marketShare: 15.2, // Thị phần trong ngành
  customerLifetimeValue: 45600000, // Giá trị khách hàng trọn đời
  salesCycleLength: 45, // Chu kỳ bán hàng trung bình (ngày)
  leadToCustomerRate: 18.3, // Tỷ lệ chuyển đổi từ lead thành khách hàng
  crossSellRate: 34.7, // Tỷ lệ bán chéo
  upsellRate: 28.9 // Tỷ lệ bán tăng
};

const mockProjects = [
  // BMC Level - Holding Company Projects
  { id: 1, name: "BMC Digital Transformation 2025", company: "BMC Holdings", level: "BMC", revenue: 5200000000, employees: 1250, marketCap: 125000000000 },
  
  // F1 Level - Corporation Projects  
  { id: 2, name: "F1 Technology Ecosystem", company: "F1 Tech Corp", level: "F1", revenue: 3800000000, employees: 850, marketCap: 45000000000 },
  { id: 3, name: "F1 Retail Digital Platform", company: "F1 Retail Group", level: "F1", revenue: 2900000000, employees: 650, marketCap: 32000000000 },
  { id: 4, name: "F1 Financial Services Hub", company: "F1 Finance Corp", level: "F1", revenue: 4100000000, employees: 750, marketCap: 38000000000 },
  
  // F2 Level - Company Projects
  { id: 5, name: "F2 SaaS Solutions Suite", company: "F2 Software Solutions", level: "F2", revenue: 1850000000, employees: 420, marketCap: 18500000000 },
  { id: 6, name: "F2 E-commerce Marketplace", company: "F2 Digital Commerce", level: "F2", revenue: 1650000000, employees: 380, marketCap: 16200000000 },
  { id: 7, name: "F2 Fintech Innovation Lab", company: "F2 Fintech Solutions", level: "F2", revenue: 2100000000, employees: 480, marketCap: 21000000000 },
  
  // F3 Level - Startup Projects
  { id: 8, name: "F3 AI-Powered CRM", company: "F3 AI Solutions", level: "F3", revenue: 850000000, employees: 180, marketCap: 8500000000 },
  { id: 9, name: "F3 Blockchain Infrastructure", company: "F3 Blockchain Lab", level: "F3", revenue: 720000000, employees: 150, marketCap: 7200000000 },
  { id: 10, name: "F3 IoT Smart Systems", company: "F3 IoT Innovations", level: "F3", revenue: 650000000, employees: 140, marketCap: 6500000000 },
  
  // F4 Level - Project Divisions
  { id: 11, name: "F4 Machine Learning Platform", company: "F4 ML Division", level: "F4", revenue: 420000000, employees: 85, marketCap: 4200000000 },
  { id: 12, name: "F4 Quantum Computing Research", company: "F4 Quantum Lab", level: "F4", revenue: 380000000, employees: 75, marketCap: 3800000000 },
  { id: 13, name: "F4 Cybersecurity Solutions", company: "F4 Security Division", level: "F4", revenue: 520000000, employees: 95, marketCap: 5200000000 },
  
  // F5 Level - Branch Operations
  { id: 14, name: "F5 R&D Advanced Analytics", company: "F5 Research Branch", level: "F5", revenue: 180000000, employees: 35, marketCap: 1800000000 },
  { id: 15, name: "F5 Product Development Hub", company: "F5 Product Branch", level: "F5", revenue: 220000000, employees: 45, marketCap: 2200000000 },
  { id: 16, name: "F5 Innovation Incubator", company: "F5 Innovation Branch", level: "F5", revenue: 160000000, employees: 30, marketCap: 1600000000 }
];

const mockSalesCampaigns = [
  // BMC Level - Strategic Sales Campaigns
  {
    id: 1,
    name: "BMC Enterprise Sales Initiative 2025",
    channel: "Direct Sales + Strategic Partnerships",
    budget: 850000000,
    spent: 720000000,
    leads: 15847,
    conversions: 3892,
    roi: 485,
    status: "Đang chạy",
    manager: "Nguyễn Thị Minh - Sales Director BMC",
    projectId: 1,
    projectName: "BMC Digital Transformation 2025",
    companyName: "BMC Holdings",
    level: "BMC",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    targetAudience: "Enterprise C-Level, Investors, Strategic Partners",
    kpiMetrics: {
      salesConversion: 78.5,
      dealClosureRate: 24.8,
      customerAcquisitionCost: 1850000,
      lifetimeValue: 45600000
    }
  },
  
  // F1 Level - Corporation Sales
  {
    id: 2,
    name: "F1 Technology Enterprise Sales",
    channel: "Direct Sales + B2B Partnerships",
    budget: 420000000,
    spent: 385000000,
    leads: 8945,
    conversions: 1847,
    roi: 520,
    status: "Đang chạy",
    manager: "Trần Văn Hùng - Sales Director F1",
    projectId: 2,
    projectName: "F1 Technology Ecosystem",
    companyName: "F1 Tech Corp",
    level: "F1",
    startDate: "2025-01-15",
    endDate: "2025-06-30",
    targetAudience: "Tech Leaders, CTOs, IT Decision Makers",
    kpiMetrics: {
      salesConversion: 65.2,
      dealClosureRate: 18.7,
      customerAcquisitionCost: 2280000,
      lifetimeValue: 38500000
    }
  },
  
  {
    id: 3,
    name: "F1 Retail B2B Sales Program",
    channel: "B2B Sales + Retail Partnerships",
    budget: 320000000,
    spent: 298000000,
    leads: 12450,
    conversions: 2847,
    roi: 445,
    status: "Đang chạy",
    manager: "Lê Thị Hoa - Sales Manager F1 Retail",
    projectId: 3,
    projectName: "F1 Retail Digital Platform",
    companyName: "F1 Retail Group",
    level: "F1",
    startDate: "2025-01-10",
    endDate: "2025-08-31",
    targetAudience: "Retail Chains, E-commerce Platforms, Digital Retailers",
    kpiMetrics: {
      salesConversion: 72.8,
      dealClosureRate: 22.4,
      customerAcquisitionCost: 1650000,
      lifetimeValue: 28900000
    }
  },
  
  // F2 Level - Company Specific Sales
  {
    id: 4,
    name: "F2 SaaS Enterprise Sales",
    channel: "Direct Sales + Channel Partners",
    budget: 180000000,
    spent: 165000000,
    leads: 6785,
    conversions: 1245,
    roi: 380,
    status: "Đang chạy",
    manager: "Phạm Minh Tuấn - Sales Manager F2",
    projectId: 5,
    projectName: "F2 SaaS Solutions Suite",
    companyName: "F2 Software Solutions",
    level: "F2",
    startDate: "2025-01-20",
    endDate: "2025-07-20",
    targetAudience: "SME Business Owners, IT Managers",
    kpiMetrics: {
      salesConversion: 58.4,
      dealClosureRate: 15.8,
      customerAcquisitionCost: 1980000,
      lifetimeValue: 24800000
    }
  },
  
  // F3 Level - Startup Marketing
  {
    id: 5,
    name: "F3 AI Solutions Sales Drive",
    channel: "Tech Conferences + Direct Outreach",
    budget: 95000000,
    spent: 87000000,
    leads: 3450,
    conversions: 685,
    roi: 420,
    status: "Hoàn thành",
    manager: "Nguyễn Đức Anh - Sales Lead F3",
    projectId: 8,
    projectName: "F3 AI-Powered CRM",
    companyName: "F3 AI Solutions",
    level: "F3",
    startDate: "2024-11-01",
    endDate: "2025-01-31",
    targetAudience: "Tech Startups, AI Enthusiasts, Early Adopters",
    kpiMetrics: {
      salesConversion: 45.7,
      dealClosureRate: 12.3,
      customerAcquisitionCost: 2450000,
      lifetimeValue: 18500000
    }
  },
  
  // F4 Level - Project Division Marketing
  {
    id: 6,
    name: "F4 ML Platform Enterprise Sales",
    channel: "Developer Communities + Enterprise Sales",
    budget: 45000000,
    spent: 42000000,
    leads: 1850,
    conversions: 385,
    roi: 350,
    status: "Đang chạy",
    manager: "Vũ Thị Lan - Sales Manager F4",
    projectId: 11,
    projectName: "F4 Machine Learning Platform",
    companyName: "F4 ML Division",
    level: "F4",
    startDate: "2025-01-25",
    endDate: "2025-05-25",
    targetAudience: "Data Scientists, ML Engineers, Developers",
    kpiMetrics: {
      salesConversion: 32.8,
      dealClosureRate: 8.7,
      customerAcquisitionCost: 2850000,
      lifetimeValue: 15200000
    }
  },
  
  // F5 Level - Branch Operations Marketing
  {
    id: 7,
    name: "F5 Research Solutions Sales",
    channel: "Academic Networks + Direct Sales",
    budget: 25000000,
    spent: 23000000,
    leads: 950,
    conversions: 185,
    roi: 280,
    status: "Đang chạy",
    manager: "Hoàng Văn Đức - Sales Manager F5",
    projectId: 14,
    projectName: "F5 R&D Advanced Analytics",
    companyName: "F5 Research Branch",
    level: "F5",
    startDate: "2025-02-01",
    endDate: "2025-08-01",
    targetAudience: "Researchers, PhD Students, Academic Institutions",
    kpiMetrics: {
      salesConversion: 28.5,
      dealClosureRate: 6.4,
      customerAcquisitionCost: 3200000,
      lifetimeValue: 12800000
    }
  }
];

const mockCustomers = [
  // BMC Level - Strategic Enterprise Customers
  {
    id: 1,
    name: "Vietcombank - Ngân hàng TMCP Ngoại thương Việt Nam",
    email: "partnership@vietcombank.com.vn",
    phone: "+84 24 3825 1188",
    type: "Enterprise",
    source: "Strategic Partnership",
    totalValue: 2850000000,
    status: "Khách VIP Platinum",
    loyaltyPoints: 28500,
    lifecycle: "Strategic Partner",
    projectId: 1,
    projectName: "BMC Digital Transformation 2025",
    companyName: "BMC Holdings",
    level: "BMC",
    industry: "Ngân hàng & Tài chính",
    leadScore: 98,
    lastContact: "2025-01-30",
    contractValue: 2850000000,
    contractDuration: "36 months",
    renewalProbability: 95,
    satisfactionScore: 9.2
  },
  {
    id: 2,
    name: "Vingroup - Tập đoàn Vingroup",
    email: "corporate@vingroup.net",
    phone: "+84 24 3974 9999",
    type: "Enterprise",
    source: "Direct Sales",
    totalValue: 4200000000,
    status: "Khách VIP Platinum",
    loyaltyPoints: 42000,
    lifecycle: "Strategic Partner",
    projectId: 2,
    projectName: "F1 Technology Ecosystem",
    companyName: "F1 Tech Corp",
    level: "F1",
    industry: "Bất động sản & Retail",
    leadScore: 97,
    lastContact: "2025-01-29",
    contractValue: 4200000000,
    contractDuration: "48 months",
    renewalProbability: 92,
    satisfactionScore: 9.0
  },
  
  // F1 Level - Corporation Customers
  {
    id: 3,
    name: "FPT Corporation - Tập đoàn FPT",
    email: "business@fpt.com.vn",
    phone: "+84 24 3773 1010",
    type: "Enterprise",
    source: "LinkedIn Campaign",
    totalValue: 1850000000,
    status: "Khách VIP Gold",
    loyaltyPoints: 18500,
    lifecycle: "Customer",
    projectId: 3,
    projectName: "F1 Retail Digital Platform",
    companyName: "F1 Retail Group",
    level: "F1",
    industry: "Công nghệ thông tin",
    leadScore: 94,
    lastContact: "2025-01-28",
    contractValue: 1850000000,
    contractDuration: "24 months",
    renewalProbability: 88,
    satisfactionScore: 8.7
  },
  {
    id: 4,
    name: "Techcombank - Ngân hàng TMCP Kỹ thương Việt Nam",
    email: "corporate@techcombank.com.vn",
    phone: "+84 24 3928 8888",
    type: "Enterprise",
    source: "Event Marketing",
    totalValue: 3200000000,
    status: "Khách VIP Platinum",
    loyaltyPoints: 32000,
    lifecycle: "Strategic Partner",
    projectId: 4,
    projectName: "F1 Financial Services Hub",
    companyName: "F1 Finance Corp",
    level: "F1",
    industry: "Ngân hàng & Tài chính",
    leadScore: 96,
    lastContact: "2025-01-31",
    contractValue: 3200000000,
    contractDuration: "60 months",
    renewalProbability: 94,
    satisfactionScore: 9.1
  },
  
  // F2 Level - Company Customers
  {
    id: 5,
    name: "Saigon Co.op - Liên hiệp HTX Thương mại TP.HCM",
    email: "info@saigoncoop.com.vn",
    phone: "+84 28 3822 4567",
    type: "SMB",
    source: "Google Ads",
    totalValue: 850000000,
    status: "Khách VIP Silver",
    loyaltyPoints: 8500,
    lifecycle: "Customer",
    projectId: 5,
    projectName: "F2 SaaS Solutions Suite",
    companyName: "F2 Software Solutions",
    level: "F2",
    industry: "Bán lẻ & Thương mại",
    leadScore: 85,
    lastContact: "2025-01-27",
    contractValue: 850000000,
    contractDuration: "18 months",
    renewalProbability: 82,
    satisfactionScore: 8.3
  },
  {
    id: 6,
    name: "Tiki Corporation - Công ty TNHH Tiki",
    email: "partnership@tiki.vn",
    phone: "+84 28 7108 8888",
    type: "SMB",
    source: "Content Marketing",
    totalValue: 1200000000,
    status: "Khách VIP Gold",
    loyaltyPoints: 12000,
    lifecycle: "Customer",
    projectId: 6,
    projectName: "F2 E-commerce Marketplace",
    companyName: "F2 Digital Commerce",
    level: "F2",
    industry: "E-commerce & Digital",
    leadScore: 89,
    lastContact: "2025-01-26",
    contractValue: 1200000000,
    contractDuration: "24 months",
    renewalProbability: 86,
    satisfactionScore: 8.6
  },
  
  // F3 Level - Startup Customers
  {
    id: 7,
    name: "Base.vn - Startup Fintech",
    email: "hello@base.vn",
    phone: "+84 28 7300 8888",
    type: "Startup",
    source: "Tech Conference",
    totalValue: 420000000,
    status: "Khách thường",
    loyaltyPoints: 4200,
    lifecycle: "Opportunity",
    projectId: 8,
    projectName: "F3 AI-Powered CRM",
    companyName: "F3 AI Solutions",
    level: "F3",
    industry: "Fintech & AI",
    leadScore: 78,
    lastContact: "2025-01-25",
    contractValue: 420000000,
    contractDuration: "12 months",
    renewalProbability: 75,
    satisfactionScore: 8.1
  },
  {
    id: 8,
    name: "Kyber Network - Blockchain Startup",
    email: "business@kyber.network",
    phone: "+65 6950 2888",
    type: "Startup",
    source: "LinkedIn Campaign",
    totalValue: 650000000,
    status: "Khách VIP Bronze",
    loyaltyPoints: 6500,
    lifecycle: "Customer",
    projectId: 9,
    projectName: "F3 Blockchain Infrastructure",
    companyName: "F3 Blockchain Lab",
    level: "F3",
    industry: "Blockchain & Crypto",
    leadScore: 82,
    lastContact: "2025-01-24",
    contractValue: 650000000,
    contractDuration: "18 months",
    renewalProbability: 79,
    satisfactionScore: 8.4
  },
  
  // F4 Level - Project Division Customers
  {
    id: 9,
    name: "VNG Corporation - Tập đoàn VNG",
    email: "enterprise@vng.com.vn",
    phone: "+84 28 7300 7777",
    type: "SMB",
    source: "Developer Community",
    totalValue: 380000000,
    status: "Khách thường",
    loyaltyPoints: 3800,
    lifecycle: "Opportunity",
    projectId: 11,
    projectName: "F4 Machine Learning Platform",
    companyName: "F4 ML Division",
    level: "F4",
    industry: "Gaming & Entertainment",
    leadScore: 76,
    lastContact: "2025-01-23",
    contractValue: 380000000,
    contractDuration: "12 months",
    renewalProbability: 72,
    satisfactionScore: 7.9
  },
  
  // F5 Level - Branch Operations Customers
  {
    id: 10,
    name: "Đại học Bách khoa Hà Nội",
    email: "research@hust.edu.vn",
    phone: "+84 24 3868 3008",
    type: "Academic",
    source: "Academic Network",
    totalValue: 180000000,
    status: "Khách thường",
    loyaltyPoints: 1800,
    lifecycle: "Customer",
    projectId: 14,
    projectName: "F5 R&D Advanced Analytics",
    companyName: "F5 Research Branch",
    level: "F5",
    industry: "Giáo dục & Nghiên cứu",
    leadScore: 85,
    lastContact: "2025-01-22",
    contractValue: 180000000,
    contractDuration: "36 months",
    renewalProbability: 88,
    satisfactionScore: 8.8
  }
];

const mockTasks = [
  // BMC Level - Strategic Tasks
  {
    id: 1,
    title: "Strategic Partnership Review - Vietcombank Digital Transformation",
    assignee: "Nguyễn Minh Đức - CEO",
    priority: "Critical",
    dueDate: "2025-02-15",
    status: "In Progress",
    progress: 75,
    description: "Quarterly business review với Vietcombank về tiến độ chuyển đổi số toàn diện và roadmap 2025-2027",
    tags: ["Strategic", "Partnership", "Digital Transformation"],
    estimatedHours: 120,
    actualHours: 90,
    projectId: 1,
    projectName: "BMC Digital Transformation 2025",
    companyName: "BMC Holdings",
    level: "BMC",
    implementationLevel: "Strategic",
    customerId: 1,
    customerName: "Vietcombank - Ngân hàng TMCP Ngoại thương Việt Nam",
    estimatedRevenue: 950000000,
    taskType: "Strategic Review",
    createdDate: "2025-01-01",
    stakeholders: ["C-Level Executives", "Board Members"],
    businessImpact: "Critical - affects entire ecosystem",
    riskLevel: "Low"
  },
  {
    id: 2,
    title: "Vingroup Ecosystem Integration Planning",
    assignee: "Trần Thị Lan Anh - CTO",
    priority: "Critical",
    dueDate: "2025-02-28",
    status: "Pending",
    progress: 45,
    description: "Thiết kế kiến trúc tích hợp hệ sinh thái Vingroup với nền tảng BMC, bao gồm VinFast, VinHomes, VinMart",
    tags: ["Architecture", "Integration", "Ecosystem"],
    estimatedHours: 200,
    actualHours: 90,
    projectId: 2,
    projectName: "F1 Technology Ecosystem",
    companyName: "F1 Tech Corp",
    level: "BMC",
    implementationLevel: "Strategic",
    customerId: 2,
    customerName: "Vingroup - Tập đoàn Vingroup",
    estimatedRevenue: 1400000000,
    taskType: "Architecture Design",
    createdDate: "2025-01-05",
    stakeholders: ["Technical Leadership", "Business Units"],
    businessImpact: "Strategic - multi-industry impact",
    riskLevel: "Medium"
  },
  
  // F1 Level - Corporation Tasks
  {
    id: 3,
    title: "FPT Digital Platform Deployment",
    assignee: "Phạm Văn Hùng - F1 Director",
    priority: "High",
    dueDate: "2025-03-15",
    status: "In Progress",
    progress: 68,
    description: "Triển khai nền tảng số F1 Retail cho FPT, tích hợp với hệ thống ERP và CRM hiện tại",
    tags: ["Deployment", "ERP", "CRM"],
    estimatedHours: 80,
    actualHours: 54,
    projectId: 3,
    projectName: "F1 Retail Digital Platform",
    companyName: "F1 Retail Group",
    level: "F1",
    implementationLevel: "Development",
    customerId: 3,
    customerName: "FPT Corporation - Tập đoàn FPT",
    estimatedRevenue: 620000000,
    taskType: "System Deployment",
    createdDate: "2025-01-10",
    stakeholders: ["IT Department", "Business Operations"],
    businessImpact: "High - affects retail operations",
    riskLevel: "Medium"
  },
  {
    id: 4,
    title: "Techcombank Financial Services Hub Integration",
    assignee: "Lê Thị Mai - F1 Finance Lead",
    priority: "High",
    dueDate: "2025-04-30",
    status: "In Progress",
    progress: 52,
    description: "Tích hợp hub dịch vụ tài chính F1 với core banking system của Techcombank",
    tags: ["Banking", "Integration", "Financial Services"],
    estimatedHours: 150,
    actualHours: 78,
    projectId: 4,
    projectName: "F1 Financial Services Hub",
    companyName: "F1 Finance Corp",
    level: "F1",
    implementationLevel: "Development",
    customerId: 4,
    customerName: "Techcombank - Ngân hàng TMCP Kỹ thương Việt Nam",
    estimatedRevenue: 1080000000,
    taskType: "System Integration",
    createdDate: "2025-01-12",
    stakeholders: ["Banking Operations", "Compliance Team"],
    businessImpact: "High - financial services expansion",
    riskLevel: "High"
  },
  
  // F2 Level - Company Tasks
  {
    id: 5,
    title: "Saigon Co.op SaaS Suite Implementation",
    assignee: "Hoàng Văn Thành - F2 Manager",
    priority: "Medium",
    dueDate: "2025-03-30",
    status: "In Progress",
    progress: 35,
    description: "Triển khai bộ giải pháp SaaS F2 cho Saigon Co.op, bao gồm inventory management và customer analytics",
    tags: ["SaaS", "Inventory", "Analytics"],
    estimatedHours: 60,
    actualHours: 21,
    projectId: 5,
    projectName: "F2 SaaS Solutions Suite",
    companyName: "F2 Software Solutions",
    level: "F2",
    implementationLevel: "Development",
    customerId: 5,
    customerName: "Saigon Co.op - Liên hiệp HTX Thương mại TP.HCM",
    estimatedRevenue: 285000000,
    taskType: "SaaS Implementation",
    createdDate: "2025-01-15",
    stakeholders: ["Operations Team", "Store Managers"],
    businessImpact: "Medium - retail efficiency improvement",
    riskLevel: "Low"
  },
  {
    id: 6,
    title: "Tiki E-commerce Marketplace Enhancement",
    assignee: "Nguyễn Thị Hương - F2 Product Lead",
    priority: "High",
    dueDate: "2025-04-15",
    status: "Pending",
    progress: 20,
    description: "Nâng cấp marketplace F2 cho Tiki với AI recommendation engine và advanced analytics",
    tags: ["E-commerce", "AI", "Recommendation"],
    estimatedHours: 90,
    actualHours: 18,
    projectId: 6,
    projectName: "F2 E-commerce Marketplace",
    companyName: "F2 Digital Commerce",
    level: "F2",
    implementationLevel: "Planning",
    customerId: 6,
    customerName: "Tiki Corporation - Công ty TNHH Tiki",
    estimatedRevenue: 400000000,
    taskType: "Platform Enhancement",
    createdDate: "2025-01-18",
    stakeholders: ["Product Team", "Data Science Team"],
    businessImpact: "Medium - customer experience improvement",
    riskLevel: "Medium"
  },
  
  // F3 Level - Startup Tasks
  {
    id: 7,
    title: "Base.vn AI-Powered CRM Customization",
    assignee: "Đặng Minh Tuấn - F3 Developer",
    priority: "Medium",
    dueDate: "2025-03-10",
    status: "In Progress",
    progress: 60,
    description: "Tùy chỉnh CRM F3 với AI cho Base.vn, tích hợp machine learning cho lead scoring",
    tags: ["CRM", "AI", "Machine Learning"],
    estimatedHours: 45,
    actualHours: 27,
    projectId: 8,
    projectName: "F3 AI-Powered CRM",
    companyName: "F3 AI Solutions",
    level: "F3",
    implementationLevel: "Development",
    customerId: 7,
    customerName: "Base.vn - Startup Fintech",
    estimatedRevenue: 140000000,
    taskType: "AI Customization",
    createdDate: "2025-01-20",
    stakeholders: ["Development Team", "Sales Team"],
    businessImpact: "Low-Medium - startup growth support",
    riskLevel: "Medium"
  },
  {
    id: 8,
    title: "Kyber Network Blockchain Infrastructure Setup",
    assignee: "Vũ Đình Nam - F3 Blockchain Expert",
    priority: "High",
    dueDate: "2025-02-28",
    status: "Completed",
    progress: 100,
    description: "Thiết lập hạ tầng blockchain F3 cho Kyber Network, bao gồm smart contracts và DeFi protocols",
    tags: ["Blockchain", "Smart Contracts", "DeFi"],
    estimatedHours: 70,
    actualHours: 68,
    projectId: 9,
    projectName: "F3 Blockchain Infrastructure",
    companyName: "F3 Blockchain Lab",
    level: "F3",
    implementationLevel: "Deployed",
    customerId: 8,
    customerName: "Kyber Network - Blockchain Startup",
    estimatedRevenue: 220000000,
    taskType: "Blockchain Development",
    createdDate: "2025-01-08",
    stakeholders: ["Blockchain Team", "Security Team"],
    businessImpact: "Medium - DeFi ecosystem expansion",
    riskLevel: "High"
  },
  
  // F4 Level - Project Division Tasks
  {
    id: 9,
    title: "VNG Machine Learning Platform Optimization",
    assignee: "Bùi Thị Nga - F4 ML Engineer",
    priority: "Medium",
    dueDate: "2025-04-20",
    status: "Pending",
    progress: 15,
    description: "Tối ưu hóa nền tảng ML F4 cho VNG, cải thiện performance và scalability cho gaming analytics",
    tags: ["Machine Learning", "Gaming", "Performance"],
    estimatedHours: 35,
    actualHours: 5,
    projectId: 11,
    projectName: "F4 Machine Learning Platform",
    companyName: "F4 ML Division",
    level: "F4",
    implementationLevel: "Planning",
    customerId: 9,
    customerName: "VNG Corporation - Tập đoàn VNG",
    estimatedRevenue: 125000000,
    taskType: "Platform Optimization",
    createdDate: "2025-01-25",
    stakeholders: ["ML Team", "Gaming Division"],
    businessImpact: "Low - specialized gaming analytics",
    riskLevel: "Low"
  },
  
  // F5 Level - Branch Operations Tasks
  {
    id: 10,
    title: "HUST R&D Advanced Analytics Implementation",
    assignee: "Cao Văn Đức - F5 Research Analyst",
    priority: "Low",
    dueDate: "2025-05-30",
    status: "In Progress",
    progress: 40,
    description: "Triển khai hệ thống phân tích nâng cao F5 cho nghiên cứu khoa học tại Đại học Bách khoa Hà Nội",
    tags: ["Research", "Analytics", "Academic"],
    estimatedHours: 25,
    actualHours: 10,
    projectId: 14,
    projectName: "F5 R&D Advanced Analytics",
    companyName: "F5 Research Branch",
    level: "F5",
    implementationLevel: "Development",
    customerId: 10,
    customerName: "Đại học Bách khoa Hà Nội",
    estimatedRevenue: 60000000,
    taskType: "Research Analytics",
    createdDate: "2025-01-30",
    stakeholders: ["Research Faculty", "Graduate Students"],
    businessImpact: "Low - academic research support",
    riskLevel: "Low"
  }
];

export function SalesMarketingDetailView({ onBack, organizations }: SalesMarketingDetailViewProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isUpdateProgressOpen, setIsUpdateProgressOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    channel: "",
    objective: "",
    budget: "",
    targetAudience: "",
    startDate: "",
    endDate: "",
    manager: "",
    projectId: "",
    companyName: ""
  });
  
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    priority: "Medium",
    dueDate: "",
    category: "Marketing",
    estimatedHours: "",
    projectId: "",
    implementationLevel: "Planning"
  });
  
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    type: "SMB",
    source: "Website",
    industry: "",
    leadScore: 50,
    lifecycle: "Lead",
    projectId: "",
    companyName: ""
  });

  const revenueProgress = useMemo(() => 
    (mockSalesData.monthlyRevenue / mockSalesData.monthlyTarget) * 100,
    []
  );

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)}B VNĐ`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M VNĐ`;
    } else {
      return `${amount.toLocaleString()} VNĐ`;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đang chạy":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Đang chạy</Badge>;
      case "Hoàn thành":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Hoàn thành</Badge>;
      case "Tạm dừng":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Tạm dừng</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/50";
      case "Medium":
        return "text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950/50";
      case "Low":
        return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/50";
      default:
        return "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950/50";
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "update-sales":
        toast.success("Doanh số đã được cập nhật!");
        break;
      case "add-customer":
        setIsAddCustomerOpen(true);
        break;
      case "export-report":
        toast.success("Báo cáo đang được xuất...");
        break;
      case "import-data":
        toast.success("Đang nhập dữ liệu...");
        break;
      default:
        toast.info(`Thực hiện: ${action}`);
    }
  };

  const handleCreateCampaign = () => {
    toast.success(`Chiến dịch "${newCampaign.name}" đã được tạo thành công!`);
    setIsCreateCampaignOpen(false);
    setNewCampaign({
      name: "",
      channel: "",
      objective: "",
      budget: "",
      targetAudience: "",
      startDate: "",
      endDate: "",
      manager: "",
      projectId: "",
      companyName: ""
    });
  };

  const handleCreateTask = () => {
    toast.success(`Task "${newTask.title}" đã được tạo và phân công cho ${newTask.assignee}!`);
    setIsCreateTaskOpen(false);
    setNewTask({
      title: "",
      description: "",
      assignee: "",
      priority: "Medium",
      dueDate: "",
      category: "Marketing",
      estimatedHours: "",
      projectId: "",
      implementationLevel: "Planning"
    });
  };

  const handleAddCustomer = () => {
    toast.success(`Khách hàng "${newCustomer.name}" đã được thêm thành công!`);
    setIsAddCustomerOpen(false);
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      type: "SMB",
      source: "Website",
      industry: "",
      leadScore: 50,
      lifecycle: "Lead",
      projectId: "",
      companyName: ""
    });
  };

  const handleEditTask = (task: any) => {
    setSelectedTask(task);
    setIsEditTaskOpen(true);
    toast.info(`Chỉnh sửa task: ${task.title}`);
  };

  const handleUpdateProgress = (task: any) => {
    setSelectedTask(task);
    setIsUpdateProgressOpen(true);
    toast.info(`Cập nhật tiến độ: ${task.title}`);
  };

  const handleCompleteTask = (task: any) => {
    toast.success(`Task "${task.title}" đã được đánh dấu hoàn thành!`);
  };

  const handleImplementationLevel = (task: any, level: string) => {
    toast.success(`Đã cập nhật mức độ triển khai "${level}" cho task: ${task.title}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            ← Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <TrendingUp className="h-8 w-8 mr-3 text-blue-600" />
              Phòng Kinh doanh
            </h1>
            <p className="text-muted-foreground mt-2">
              CRM, Pipeline bán hàng, Quản lý khách hàng & Báo cáo Realtime
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Bot className="h-4 w-4 mr-2" />
            Sales Agent
          </Button>
          <Button onClick={() => setIsCreateCampaignOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Tạo chiến dịch
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-green-600" />
              Doanh thu tháng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(mockSalesData.monthlyRevenue)}
            </div>
            <div className="flex items-center mt-2">
              <Progress value={revenueProgress} className="flex-1" />
              <span className="ml-2 text-sm text-muted-foreground">
                {revenueProgress.toFixed(0)}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Mục tiêu: {formatCurrency(mockSalesData.monthlyTarget)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <Target className="h-4 w-4 mr-2 text-blue-600" />
              Tỷ lệ chuyển đổi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mockSalesData.conversionRate}%
            </div>
            <div className="flex items-center mt-2">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">+2.3%</span>
              <span className="text-sm text-muted-foreground ml-1">vs tháng trước</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <UserPlus className="h-4 w-4 mr-2 text-purple-600" />
              Khách hàng mới
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {mockSalesData.newCustomers}
            </div>
            <div className="flex items-center mt-2">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">+12.5%</span>
              <span className="text-sm text-muted-foreground ml-1">tháng này</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <BarChart3 className="h-4 w-4 mr-2 text-orange-600" />
              Sales ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {mockSalesData.marketingROI}%
            </div>
            <div className="flex items-center mt-2">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">+45%</span>
              <span className="text-sm text-muted-foreground ml-1">cải thiện</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">📊 Tổng quan</TabsTrigger>
          <TabsTrigger value="campaigns">💼 Chiến dịch Sales</TabsTrigger>
          <TabsTrigger value="customers">👥 Khách hàng</TabsTrigger>
          <TabsTrigger value="tasks">📋 Công việc</TabsTrigger>
          <TabsTrigger value="reports">📈 Báo cáo</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>📈 Doanh thu theo thời gian</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg flex items-center justify-center border-2 border-dashed">
                    <div className="text-center">
                      <TrendingUp className="h-16 w-16 mx-auto text-blue-600 mb-4" />
                      <p className="text-muted-foreground text-lg mb-2">
                        Biểu đồ doanh thu realtime
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Theo ngày, tuần, tháng, quý - phân tích xu hướng
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Assistant & Quick Actions */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="h-5 w-5 mr-2 text-blue-600" />
                    Sales & Marketing AI
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">
                        Dự báo đạt 105% mục tiêu tháng 2
                      </p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Zap className="h-4 w-4 text-blue-600 mt-0.5" />
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Đề xuất: Tăng ngân sách Facebook Ads 20%
                      </p>
                    </div>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                      <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                        45 leads chưa được liên hệ trong 3 ngày
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <Textarea placeholder="Hỏi AI: 'Dự báo doanh thu Q2', 'Phân tích hiệu quả chiến dịch X'..." className="min-h-20" />
                    <Button className="w-full mt-2" size="sm">
                      <Bot className="h-4 w-4 mr-2" />
                      Gửi câu hỏi
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>🚀 Hành động nhanh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction("update-sales")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Cập nhật doanh số
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setIsCreateCampaignOpen(true)}>
                    <Megaphone className="h-4 w-4 mr-2" />
                    Tạo chiến dịch mới
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction("add-customer")}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Thêm khách hàng
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction("export-report")}>
                    <Download className="h-4 w-4 mr-2" />
                    Xuất báo cáo
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction("import-data")}>
                    <Upload className="h-4 w-4 mr-2" />
                    Nhập dữ liệu
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Quản lý Chiến dịch Sales</h3>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Bộ lọc
              </Button>
              <Button onClick={() => setIsCreateCampaignOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Tạo chiến dịch sales
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Chiến dịch</TableHead>
                    <TableHead>Dự án/Công ty</TableHead>
                    <TableHead>Kênh</TableHead>
                    <TableHead>Ngân sách</TableHead>
                    <TableHead>Leads</TableHead>
                    <TableHead>ROI</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSalesCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Quản lý: {campaign.manager}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="flex items-center space-x-1">
                            <Building2 className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-600">{campaign.projectName}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">{campaign.companyName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{campaign.channel}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{formatCurrency(campaign.budget)}</div>
                          <div className="text-sm text-muted-foreground">
                            Đã chi: {formatCurrency(campaign.spent)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{campaign.leads}</div>
                          <div className="text-sm text-green-600">
                            {campaign.conversions} chuyển đổi
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-green-600">{campaign.roi}%</div>
                      </TableCell>
                      <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Quản lý Khách hàng (CRM)</h3>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Tìm kiếm khách hàng..." className="pl-10 w-64" />
              </div>
              <Button onClick={() => setIsAddCustomerOpen(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Thêm khách hàng
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Dự án/Công ty</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Nguồn</TableHead>
                    <TableHead>Lead Score</TableHead>
                    <TableHead>Giá trị</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {customer.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="flex items-center space-x-1">
                            <Briefcase className="h-4 w-4 text-purple-600" />
                            <span className="font-medium text-purple-600">{customer.projectName}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">{customer.companyName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={customer.type === "Enterprise" ? "default" : "secondary"}>
                          {customer.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{customer.source}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${customer.leadScore >= 80 ? 'bg-green-500' : customer.leadScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${customer.leadScore}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{customer.leadScore}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{formatCurrency(customer.totalValue)}</div>
                          <div className="text-sm text-muted-foreground">
                            {customer.loyaltyPoints} điểm
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={customer.status === "Khách VIP" ? "default" : "secondary"}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Phân công & Quản lý Công việc</h3>
            <div className="flex space-x-2">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Realtime Timeline
              </Button>
              <Button onClick={() => setIsCreateTaskOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Tạo task mới
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockTasks.map((task) => (
              <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <Badge variant={task.status === "Completed" ? "default" : 
                                  task.status === "In Progress" ? "secondary" : "outline"}>
                      {task.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{task.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Building2 className="h-4 w-4 text-blue-600" />
                    <div>
                      <span className="font-medium text-blue-600">{task.projectName}</span>
                      <div className="text-xs text-muted-foreground">{task.companyName}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tiến độ:</span>
                      <span className="font-medium">{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Mức độ triển khai:</span>
                      <Select defaultValue={task.implementationLevel} onValueChange={(value) => handleImplementationLevel(task, value)}>
                        <SelectTrigger className="h-6 text-xs w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Planning">📋 Planning</SelectItem>
                          <SelectItem value="Development">⚙️ Development</SelectItem>
                          <SelectItem value="Testing">🧪 Testing</SelectItem>
                          <SelectItem value="Deployed">🚀 Deployed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{task.dueDate}</span>
                    </div>
                    <span className="text-muted-foreground">{task.assignee}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditTask(task)}
                            className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200">
                      <Edit className="h-4 w-4 mr-1" />
                      Sửa
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleUpdateProgress(task)}
                            className="bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Cập nhật
                    </Button>
                    {task.status !== "Completed" && (
                      <Button variant="default" size="sm" className="col-span-2" onClick={() => handleCompleteTask(task)}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Đánh dấu hoàn thành
                      </Button>
                    )}
                    {task.status === "Completed" && (
                      <div className="col-span-2 text-center py-2">
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          ✅ Đã hoàn thành
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Báo cáo Realtime & BI</h3>
            <div className="flex space-x-2">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Realtime Update
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Xuất PDF
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Xuất Excel
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Visitors</p>
                    <p className="text-2xl font-bold text-blue-600">1,247</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">🔴 Live - cập nhật realtime</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Today Leads</p>
                    <p className="text-2xl font-bold text-green-600">23</p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">+3 trong 1h qua</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Today Revenue</p>
                    <p className="text-2xl font-bold text-orange-600">156M VNĐ</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Avg session: 3m 42s</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                    <p className="text-2xl font-bold text-purple-600">2.8%</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Bounce rate: 34.5%</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2 text-green-600" />
                    📊 Phân tích Kênh Marketing
                  </div>
                  <Badge variant="outline" className="text-xs">Theo Dự án</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4">
                  {mockProjects.map((project, index) => {
                    const campaignCount = mockSalesCampaigns.filter(c => c.projectId === project.id).length;
                const totalROI = mockSalesCampaigns
                      .filter(c => c.projectId === project.id)
                      .reduce((sum, c) => sum + c.roi, 0) / campaignCount || 0;
                    
                    return (
                      <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-blue-600" />
                          <div>
                            <div className="font-medium text-sm">{project.name}</div>
                            <div className="text-xs text-muted-foreground">{project.company}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">{totalROI.toFixed(0)}% ROI</div>
                          <div className="text-xs text-muted-foreground">{campaignCount} chiến dịch</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="h-40 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg flex items-center justify-center border-2 border-dashed">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 mx-auto text-green-600 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Biểu đồ ROI theo dự án
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-purple-600" />
                    📈 Funnel Chuyển đổi
                  </div>
                  <Badge variant="outline" className="text-xs">Theo Khách hàng</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4">
                  {mockProjects.map((project) => {
                    const projectCustomers = mockCustomers.filter(c => c.projectId === project.id);
                    const avgLeadScore = projectCustomers.length > 0 
                      ? projectCustomers.reduce((sum, c) => sum + c.leadScore, 0) / projectCustomers.length 
                      : 0;
                    
                    return (
                      <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Briefcase className="h-4 w-4 text-purple-600" />
                          <div>
                            <div className="font-medium text-sm">{project.name}</div>
                            <div className="text-xs text-muted-foreground">{project.company}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-purple-600">{avgLeadScore.toFixed(0)} điểm</div>
                          <div className="text-xs text-muted-foreground">{projectCustomers.length} khách hàng</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="h-40 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg flex items-center justify-center border-2 border-dashed">
                  <div className="text-center">
                    <Target className="h-12 w-12 mx-auto text-purple-600 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Funnel chuyển đổi theo dự án
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      
      {/* Create Campaign Dialog - Simplified */}
      <Dialog open={isCreateCampaignOpen} onOpenChange={setIsCreateCampaignOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Megaphone className="h-5 w-5 mr-2 text-purple-600" />
              🚀 Tạo Chiến dịch Marketing Mới
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Tên chiến dịch *</Label>
              <Input 
                id="campaign-name"
                placeholder="VD: Chiến dịch Tết 2025"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-channel">Kênh Marketing *</Label>
              <Select value={newCampaign.channel} onValueChange={(value) => setNewCampaign({...newCampaign, channel: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn kênh" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook">📘 Facebook Ads</SelectItem>
                  <SelectItem value="google">🔍 Google Ads</SelectItem>
                  <SelectItem value="tiktok">🎵 TikTok Ads</SelectItem>
                  <SelectItem value="linkedin">💼 LinkedIn Ads</SelectItem>
                  <SelectItem value="youtube">📺 YouTube Ads</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-objective">Mục tiêu *</Label>
              <Select value={newCampaign.objective} onValueChange={(value) => setNewCampaign({...newCampaign, objective: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn mục tiêu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="awareness">🎯 Brand Awareness</SelectItem>
                  <SelectItem value="traffic">🌐 Website Traffic</SelectItem>
                  <SelectItem value="leads">📈 Lead Generation</SelectItem>
                  <SelectItem value="conversions">💰 Conversions</SelectItem>
                  <SelectItem value="sales">🛒 Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-budget">Ngân sách (VNĐ) *</Label>
              <Input 
                id="campaign-budget"
                placeholder="VD: 50000000"
                value={newCampaign.budget}
                onChange={(e) => setNewCampaign({...newCampaign, budget: e.target.value})}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="campaign-audience">Target Audience *</Label>
              <Input 
                id="campaign-audience"
                placeholder="VD: Nam/Nữ 25-45 tuổi, thu nhập trung bình khá, quan tâm công nghệ"
                value={newCampaign.targetAudience}
                onChange={(e) => setNewCampaign({...newCampaign, targetAudience: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-manager">Người quản lý *</Label>
              <Select value={newCampaign.manager} onValueChange={(value) => setNewCampaign({...newCampaign, manager: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn người quản lý" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nguyễn Văn A">👨‍💼 Nguyễn Văn A</SelectItem>
                  <SelectItem value="Trần Thị B">👩‍💼 Trần Thị B</SelectItem>
                  <SelectItem value="Lê Văn C">👨‍💻 Lê Văn C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-project">Thuộc dự án/công ty *</Label>
              <Select value={newCampaign.projectId} onValueChange={(value) => {
                const project = mockProjects.find(p => p.id.toString() === value);
                setNewCampaign({...newCampaign, projectId: value, companyName: project?.company || ""});
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn dự án" />
                </SelectTrigger>
                <SelectContent>
                  {mockProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4" />
                        <span>{project.name} - {project.company}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setIsCreateCampaignOpen(false)}>Hủy</Button>
            <Button onClick={handleCreateCampaign} disabled={!newCampaign.name || !newCampaign.channel}>
              <Megaphone className="h-4 w-4 mr-2" />
              Tạo Chiến dịch
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Customer Dialog - Simplified */}
      <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <UserPlus className="h-5 w-5 mr-2 text-green-600" />
              👤 Thêm Khách hàng Mới
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer-name">Tên khách hàng *</Label>
              <Input 
                id="customer-name"
                placeholder="VD: Công ty ABC Technology"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-email">Email *</Label>
              <Input 
                id="customer-email"
                type="email"
                placeholder="contact@abc.com"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-phone">Số điện thoại</Label>
              <Input 
                id="customer-phone"
                placeholder="+84 901 234 567"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-type">Loại khách hàng</Label>
              <Select value={newCustomer.type} onValueChange={(value) => setNewCustomer({...newCustomer, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individual">🙋‍♂️ Cá nhân</SelectItem>
                  <SelectItem value="SMB">🏢 SMB</SelectItem>
                  <SelectItem value="Enterprise">🏭 Enterprise</SelectItem>
                  <SelectItem value="Startup">🚀 Startup</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-source">Nguồn tiếp cận</Label>
              <Select value={newCustomer.source} onValueChange={(value) => setNewCustomer({...newCustomer, source: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Website">🌐 Website</SelectItem>
                  <SelectItem value="Facebook">📘 Facebook</SelectItem>
                  <SelectItem value="Google">🔍 Google</SelectItem>
                  <SelectItem value="Referral">👥 Giới thiệu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-score">Lead Score (0-100)</Label>
              <Input 
                id="customer-score"
                type="number"
                min="0"
                max="100"
                value={newCustomer.leadScore}
                onChange={(e) => setNewCustomer({...newCustomer, leadScore: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-project">Thuộc dự án/công ty *</Label>
              <Select value={newCustomer.projectId} onValueChange={(value) => {
                const project = mockProjects.find(p => p.id.toString() === value);
                setNewCustomer({...newCustomer, projectId: value, companyName: project?.company || ""});
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn dự án" />
                </SelectTrigger>
                <SelectContent>
                  {mockProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4" />
                        <span>{project.name} - {project.company}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setIsAddCustomerOpen(false)}>Hủy</Button>
            <Button onClick={handleAddCustomer} disabled={!newCustomer.name || !newCustomer.email}>
              <UserPlus className="h-4 w-4 mr-2" />
              Thêm Khách hàng
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Task Dialog - Simplified */}
      <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2 text-blue-600" />
              📋 Tạo Task Mới
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">Tiêu đề task *</Label>
              <Input 
                id="task-title"
                placeholder="VD: Tối ưu conversion rate cho landing page ABC"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-description">Mô tả chi tiết</Label>
              <Textarea 
                id="task-description"
                placeholder="Mô tả chi tiết về task, yêu cầu cụ thể, deliverables..."
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="task-assignee">Người phụ trách *</Label>
                <Select value={newTask.assignee} onValueChange={(value) => setNewTask({...newTask, assignee: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn người phụ trách" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nguyễn Văn A">👨‍💼 Nguyễn Văn A</SelectItem>
                    <SelectItem value="Trần Thị B">👩‍💼 Trần Thị B</SelectItem>
                    <SelectItem value="Lê Văn C">👨‍💻 Lê Văn C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-priority">Độ ưu tiên *</Label>
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({...newTask, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">🔴 High - Khẩn cấp</SelectItem>
                    <SelectItem value="Medium">🟡 Medium - Bình thường</SelectItem>
                    <SelectItem value="Low">🟢 Low - Có thể hoãn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-project">Thuộc dự án/công ty *</Label>
              <Select value={newTask.projectId} onValueChange={(value) => setNewTask({...newTask, projectId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn dự án" />
                </SelectTrigger>
                <SelectContent>
                  {mockProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4" />
                        <span>{project.name} - {project.company}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="task-due">Deadline *</Label>
                <Input 
                  id="task-due"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-hours">Ước tính thời gian (giờ)</Label>
                <Input 
                  id="task-hours"
                  placeholder="VD: 8"
                  value={newTask.estimatedHours}
                  onChange={(e) => setNewTask({...newTask, estimatedHours: e.target.value})}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setIsCreateTaskOpen(false)}>Hủy</Button>
            <Button onClick={handleCreateTask} disabled={!newTask.title || !newTask.assignee}>
              <Plus className="h-4 w-4 mr-2" />
              Tạo Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}