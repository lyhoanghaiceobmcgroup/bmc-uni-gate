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

// Enhanced Mock data with project/company associations
const mockSalesData = {
  monthlyRevenue: 2500000000,
  monthlyTarget: 3000000000,
  conversionRate: 18.5,
  newCustomers: 156,
  marketingROI: 320,
  totalOrders: 1248,
  averageOrderValue: 2000000,
  customerRetention: 85.3
};

const mockProjects = [
  { id: 1, name: "Dự án ERP Alpha", company: "BMC Group" },
  { id: 2, name: "Dự án Fintech Beta", company: "BMC Invest" },
  { id: 3, name: "Dự án AI Gamma", company: "BMC Tech" },
  { id: 4, name: "Dự án Blockchain Delta", company: "BMC Innovation" }
];

const mockCampaigns = [
  {
    id: 1,
    name: "Chiến dịch Summer 2025",
    channel: "Facebook Ads",
    budget: 50000000,
    spent: 32000000,
    leads: 234,
    conversions: 43,
    roi: 285,
    status: "Đang chạy",
    manager: "Nguyễn Văn A",
    projectId: 1,
    projectName: "Dự án ERP Alpha",
    companyName: "BMC Group",
    startDate: "2025-01-15",
    endDate: "2025-03-15",
    targetAudience: "Doanh nghiệp SME, 25-45 tuổi"
  },
  {
    id: 2,
    name: "Google Search Campaign",
    channel: "Google Ads",
    budget: 80000000,
    spent: 65000000,
    leads: 567,
    conversions: 89,
    roi: 340,
    status: "Đang chạy",
    manager: "Trần Thị B",
    projectId: 2,
    projectName: "Dự án Fintech Beta",
    companyName: "BMC Invest",
    startDate: "2025-01-10",
    endDate: "2025-04-10",
    targetAudience: "Nhà đầu tư cá nhân, 30-50 tuổi"
  },
  {
    id: 3,
    name: "TikTok Brand Awareness",
    channel: "TikTok",
    budget: 30000000,
    spent: 28000000,
    leads: 890,
    conversions: 124,
    roi: 420,
    status: "Hoàn thành",
    manager: "Lê Văn C",
    projectId: 3,
    projectName: "Dự án AI Gamma",
    companyName: "BMC Tech",
    startDate: "2024-12-01",
    endDate: "2025-01-31",
    targetAudience: "Gen Z, 18-30 tuổi, yêu thích công nghệ"
  }
];

const mockCustomers = [
  {
    id: 1,
    name: "Công ty ABC Tech",
    email: "contact@abctech.com",
    phone: "+84 901 234 567",
    type: "Enterprise",
    source: "Website",
    totalValue: 150000000,
    status: "Khách VIP",
    loyaltyPoints: 1250,
    lifecycle: "Customer",
    projectId: 1,
    projectName: "Dự án ERP Alpha",
    companyName: "BMC Group",
    industry: "Công nghệ thông tin",
    leadScore: 95,
    lastContact: "2025-01-28"
  },
  {
    id: 2,
    name: "Startup XYZ Solutions",
    email: "hello@xyzsolutions.com", 
    phone: "+84 902 345 678",
    type: "SMB",
    source: "Facebook",
    totalValue: 45000000,
    status: "Khách thường",
    loyaltyPoints: 450,
    lifecycle: "Opportunity",
    projectId: 2,
    projectName: "Dự án Fintech Beta",
    companyName: "BMC Invest",
    industry: "Tài chính - Ngân hàng",
    leadScore: 72,
    lastContact: "2025-01-25"
  },
  {
    id: 3,
    name: "Nhà đầu tư DEF Capital",
    email: "invest@defcapital.com",
    phone: "+84 903 456 789", 
    type: "Individual",
    source: "Referral",
    totalValue: 250000000,
    status: "Khách VIP",
    loyaltyPoints: 2500,
    lifecycle: "Customer",
    projectId: 3,
    projectName: "Dự án AI Gamma",
    companyName: "BMC Tech",
    industry: "Đầu tư - Tài chính",
    leadScore: 98,
    lastContact: "2025-01-30"
  }
];

const mockTasks = [
  {
    id: 1,
    title: "Tối ưu chiến dịch Facebook Q1",
    assignee: "Nguyễn Văn A",
    priority: "High",
    dueDate: "2025-02-15",
    status: "In Progress",
    progress: 65,
    description: "Phân tích và tối ưu CTR, CPC cho chiến dịch hiện tại",
    tags: ["Facebook", "Optimization"],
    estimatedHours: 12,
    actualHours: 8,
    projectId: 1,
    projectName: "Dự án ERP Alpha",
    companyName: "BMC Group",
    implementationLevel: "Development"
  },
  {
    id: 2,
    title: "Liên hệ leads warm từ tuần trước",
    assignee: "Trần Thị B",
    priority: "High",
    dueDate: "2025-02-05",
    status: "Pending",
    progress: 20,
    description: "Follow up 45 leads đã tương tác với website",
    tags: ["Leads", "Follow-up"],
    estimatedHours: 6,
    actualHours: 2,
    projectId: 2,
    projectName: "Dự án Fintech Beta",
    companyName: "BMC Invest",
    implementationLevel: "Planning"
  },
  {
    id: 3,
    title: "Chuẩn bị báo cáo doanh thu tháng 1",
    assignee: "Lê Văn C",
    priority: "Medium",
    dueDate: "2025-02-10",
    status: "Completed",
    progress: 100,
    description: "Tổng hợp báo cáo chi tiết theo kênh và sản phẩm",
    tags: ["Report", "Revenue"],
    estimatedHours: 8,
    actualHours: 7,
    projectId: 3,
    projectName: "Dự án AI Gamma",
    companyName: "BMC Tech",
    implementationLevel: "Deployed"
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
              Kinh doanh - Marketing
            </h1>
            <p className="text-muted-foreground mt-2">
              CRM, Pipeline bán hàng, Chiến dịch Marketing & Báo cáo Realtime
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Bot className="h-4 w-4 mr-2" />
            Sales AI Agent
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
              Marketing ROI
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
          <TabsTrigger value="campaigns">📢 Chiến dịch</TabsTrigger>
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
            <h3 className="text-lg font-semibold">Quản lý Chiến dịch Marketing</h3>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Bộ lọc
              </Button>
              <Button onClick={() => setIsCreateCampaignOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Tạo chiến dịch
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
                  {mockCampaigns.map((campaign) => (
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
                    const campaignCount = mockCampaigns.filter(c => c.projectId === project.id).length;
                    const totalROI = mockCampaigns
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