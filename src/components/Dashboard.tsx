import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Bell, 
  User, 
  Settings,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  Bot,
  Clock,
  DollarSign,
  FileText,
  Target,
  Briefcase,
  Workflow,
  StickyNote,
  MessageCircle,
  FileImage,
  ShoppingBag,
  Building,
  Calculator,
  Receipt,
  FileSignature,
  Shield,
  ChevronRight,
  Plus,
  Download,
  Globe,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Brain,
  Mic,
  Send,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Moon,
  Sun,
  Languages,
  LogOut,
  Lock
} from "lucide-react";
import { useState } from "react";
import modulesImage from "@/assets/modules-3d.jpg";

const moduleData = [
  { id: 'crm', name: 'CRM DMS', icon: Users, color: 'bg-blue-500', access: 'full', notifications: 3 },
  { id: 'marketing', name: 'Marketing', icon: TrendingUp, color: 'bg-purple-500', access: 'view', notifications: 0 },
  { id: 'promotions', name: 'Khuyến mại', icon: ShoppingCart, color: 'bg-orange-500', access: 'full', notifications: 1 },
  { id: 'warehouse', name: 'Kho hàng', icon: Package, color: 'bg-green-500', access: 'edit', notifications: 5 },
  { id: 'ai', name: 'One AI', icon: Bot, color: 'bg-cyan-500', access: 'full', notifications: 2 },
  { id: 'attendance', name: 'Chấm công', icon: Clock, color: 'bg-indigo-500', access: 'view', notifications: 0 },
  { id: 'payroll', name: 'Tính lương', icon: DollarSign, color: 'bg-emerald-500', access: 'none', notifications: 0 },
  { id: 'hr', name: 'Hồ sơ nhân sự', icon: FileText, color: 'bg-pink-500', access: 'edit', notifications: 1 },
  { id: 'evaluation', name: 'Đánh giá', icon: Target, color: 'bg-yellow-500', access: 'view', notifications: 0 },
  { id: 'objectives', name: 'Mục tiêu', icon: Target, color: 'bg-red-500', access: 'full', notifications: 0 },
  { id: 'tasks', name: 'Công việc', icon: Briefcase, color: 'bg-teal-500', access: 'full', notifications: 8 },
  { id: 'workflow', name: 'Quy trình', icon: Workflow, color: 'bg-slate-500', access: 'view', notifications: 0 },
  { id: 'notes', name: 'Ghi chép', icon: StickyNote, color: 'bg-amber-500', access: 'full', notifications: 0 },
  { id: 'chat', name: 'Chat', icon: MessageCircle, color: 'bg-blue-600', access: 'full', notifications: 12 },
  { id: 'documents', name: 'Văn thư', icon: FileImage, color: 'bg-gray-500', access: 'view', notifications: 2 },
  { id: 'procurement', name: 'Mua hàng', icon: ShoppingBag, color: 'bg-violet-500', access: 'edit', notifications: 3 },
  { id: 'assets', name: 'Tài sản', icon: Building, color: 'bg-stone-500', access: 'view', notifications: 0 },
  { id: 'accounting', name: 'Kế toán', icon: Calculator, color: 'bg-green-600', access: 'full', notifications: 4 },
  { id: 'tax', name: 'Thuế', icon: Receipt, color: 'bg-red-600', access: 'view', notifications: 1 },
  { id: 'esign', name: 'Ký số', icon: FileSignature, color: 'bg-indigo-600', access: 'full', notifications: 0 }
];

const getAccessBadge = (access: string) => {
  switch (access) {
    case 'full':
      return <Badge variant="default" className="text-xs">Toàn quyền</Badge>;
    case 'edit':
      return <Badge variant="secondary" className="text-xs">Chỉnh sửa</Badge>;
    case 'view':
      return <Badge variant="outline" className="text-xs">Chỉ xem</Badge>;
    case 'none':
      return <Badge variant="destructive" className="text-xs">Chưa có quyền</Badge>;
    default:
      return null;
  }
};

const Dashboard = () => {
  const [aiMessage, setAiMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'payment', message: 'Nhắc hạn thanh toán HĐ #2024001', urgent: true },
    { id: 2, type: 'deadline', message: 'Dự án BMC-AI còn 3 ngày', urgent: false },
    { id: 3, type: 'kpi', message: 'Báo cáo KPI tháng 12 chưa hoàn thành', urgent: true },
    { id: 4, type: 'inventory', message: 'Tồn kho sản phẩm A001 thấp', urgent: false }
  ]);

  const quickActions = [
    { icon: FileText, label: "📑 Tạo báo cáo", action: () => {} },
    { icon: Calendar, label: "⏰ Nhắc việc", action: () => {} },
    { icon: BarChart3, label: "📊 Dự báo dòng tiền", action: () => {} },
    { icon: Users, label: "👥 Phân công công việc", action: () => {} }
  ];

  const realtimeData = {
    revenue: "2.4B VND",
    expense: "1.8B VND",
    profit: "600M VND",
    employees: 245,
    attendance: "92%",
    inventory: "1,234 items",
    kpi: "87%"
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 3D Meta Tech Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Global Navigation */}
      <header className="relative z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Globe className="w-6 h-6 text-primary" />
                <span className="font-semibold text-lg">🌐 Tập đoàn BMC</span>
              </div>
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <Button variant="ghost" size="sm">🏢 Công ty</Button>
                <Button variant="ghost" size="sm">🏬 Dự án / Chi nhánh</Button>
                <Button variant="ghost" size="sm">🗂 Phòng ban</Button>
                <Button variant="ghost" size="sm">📊 Báo cáo</Button>
                <Button variant="ghost" size="sm">⚙️ Hệ thống</Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notification Center */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs">
                  {notifications.filter(n => n.urgent).length}
                </Badge>
              </Button>
              
              {/* AI Avatar */}
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-6">
        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          
          {/* Left Panel - Forms & Data Entry */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <Card className="p-4 glow-card">
              <h3 className="font-semibold mb-4 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Biểu mẫu & Nhập liệu
              </h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  💰 Tài chính
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  👥 Nhân sự
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Package className="w-4 h-4 mr-2" />
                  📦 Kho vận
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  🎯 Công việc
                </Button>
                <Button variant="default" size="sm" className="w-full">
                  ➕ Tạo biểu mẫu mới
                </Button>
              </div>
            </Card>

            {/* Quick Forms */}
            <Card className="p-4">
              <h4 className="font-medium mb-3">Biểu mẫu nhanh</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span>Phiếu chi</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span>Đề nghị thanh toán</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span>Báo cáo công việc</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Card>
          </div>

          {/* Center Panel - Real-time Overview */}
          <div className="col-span-12 lg:col-span-6 space-y-4">
            <Card className="p-6 glow-card bg-gradient-card">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-primary" />
                Tổng quan Realtime
              </h2>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-card/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-500">{realtimeData.revenue}</div>
                  <div className="text-xs text-muted-foreground">Doanh thu</div>
                </div>
                <div className="text-center p-3 bg-card/50 rounded-lg">
                  <div className="text-2xl font-bold text-red-500">{realtimeData.expense}</div>
                  <div className="text-xs text-muted-foreground">Chi phí</div>
                </div>
                <div className="text-center p-3 bg-card/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{realtimeData.profit}</div>
                  <div className="text-xs text-muted-foreground">Lợi nhuận</div>
                </div>
                <div className="text-center p-3 bg-card/50 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-500">{realtimeData.kpi}</div>
                  <div className="text-xs text-muted-foreground">KPI</div>
                </div>
              </div>

              {/* AI Insights */}
              <Card className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-700">AI Cảnh báo</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Dòng tiền tháng này âm 12%, cần chú ý chi phí marketing. Đề xuất: Giảm 20% budget quảng cáo online.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Biểu đồ doanh thu
                  </h4>
                  <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded flex items-center justify-center text-muted-foreground">
                    📈 Realtime Chart
                  </div>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2 flex items-center">
                    <PieChart className="w-4 h-4 mr-2" />
                    Phân bổ chi phí
                  </h4>
                  <div className="h-32 bg-gradient-to-r from-accent/20 to-primary/20 rounded flex items-center justify-center text-muted-foreground">
                    🥧 Pie Chart
                  </div>
                </Card>
              </div>
            </Card>
          </div>

          {/* Right Panel - AI Agent */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <Card className="p-4 glow-card bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center">
                  <Bot className="w-4 h-4 mr-2 text-cyan-500" />
                  AI Agent
                </h3>
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
                  <Brain className="w-4 h-4 text-white" />
                </div>
              </div>
              
              {/* AI Chat */}
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm">Bạn có 5 công việc cần xử lý hôm nay. Muốn tôi sắp xếp theo mức ưu tiên không?</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Input 
                  placeholder="Nhập câu hỏi..."
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  className="text-sm"
                />
                <Button size="sm" variant="default">
                  <Send className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-4">
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-sm"
                    onClick={action.action}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Notifications */}
            <Card className="p-4">
              <h4 className="font-medium mb-3 flex items-center">
                <Bell className="w-4 h-4 mr-2" />
                Thông báo
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {notifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className={`p-2 rounded text-xs ${notification.urgent ? 'bg-red-500/10 text-red-700' : 'bg-muted/50'}`}>
                    {notification.message}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Panel - ERP Modules (5 sections) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
          <Card className="p-4 hover:scale-105 transition-transform glow-card cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <h4 className="font-medium text-sm">Kinh doanh & Khách hàng</h4>
              <p className="text-xs text-muted-foreground mt-1">CRM, Marketing, Hợp đồng</p>
            </div>
          </Card>

          <Card className="p-4 hover:scale-105 transition-transform glow-card cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calculator className="w-6 h-6 text-green-500" />
              </div>
              <h4 className="font-medium text-sm">Tài chính & Pháp lý</h4>
              <p className="text-xs text-muted-foreground mt-1">Kế toán, Thuế, Tài sản</p>
            </div>
          </Card>

          <Card className="p-4 hover:scale-105 transition-transform glow-card cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-purple-500" />
              </div>
              <h4 className="font-medium text-sm">Nhân sự & Mục tiêu</h4>
              <p className="text-xs text-muted-foreground mt-1">HR, Lương, KPI, OKR</p>
            </div>
          </Card>

          <Card className="p-4 hover:scale-105 transition-transform glow-card cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Workflow className="w-6 h-6 text-orange-500" />
              </div>
              <h4 className="font-medium text-sm">Công việc & Quy trình</h4>
              <p className="text-xs text-muted-foreground mt-1">Task, Dự án, Workflow</p>
            </div>
          </Card>

          <Card className="p-4 hover:scale-105 transition-transform glow-card cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-cyan-500" />
              </div>
              <h4 className="font-medium text-sm">Dữ liệu & Báo cáo AI</h4>
              <p className="text-xs text-muted-foreground mt-1">BI 3D, Forecast, Rủi ro</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer Toolbar */}
      <footer className="relative z-50 bg-card/80 backdrop-blur-lg border-t border-border/50 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">BMC AI Dashboard v2.0</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              
              <Button variant="ghost" size="sm">
                <Languages className="w-4 h-4 mr-2" />
                🌐 VN
              </Button>
              
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-green-500" />
                <span className="text-xs text-muted-foreground">Bảo mật</span>
              </div>
              
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;