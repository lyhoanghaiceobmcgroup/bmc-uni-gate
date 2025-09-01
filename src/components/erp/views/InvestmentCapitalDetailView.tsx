import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  TrendingUp, 
  PieChart, 
  DollarSign, 
  Building2, 
  Target,
  BarChart3,
  Briefcase,
  Users2,
  Calculator,
  ArrowUpRight,
  ArrowDownRight,
  Timer,
  Banknote,
  Activity,
  LineChart,
  Percent,
  Globe,
  CreditCard,
  Coins,
  Zap,
  AlertCircle,
  TrendingDown,
  Eye,
  FileText,
  Settings,
  Plus,
  Clock,
  Wallet
} from "lucide-react";

interface InvestmentCapitalDetailViewProps {
  onBack: () => void;
  investmentData?: any;
  mode?: string;
}

export function InvestmentCapitalDetailView({ onBack, investmentData, mode }: InvestmentCapitalDetailViewProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}T VNĐ`;
    }
    return `${amount}B VNĐ`;
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'Hoạt động': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Đầu tư': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Thoái vốn': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Đóng': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Kế hoạch': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    };
    return statusMap[status as keyof typeof statusMap] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold">💼 Đầu tư – Vốn</h1>
            <p className="text-muted-foreground">
              Quản lý danh mục đầu tư, quỹ vốn, M&A và cổ phần chiến lược BMC → F1 → F2 → F3 → F4 → F5
            </p>
          </div>
        </div>
        <Badge variant="default" className="text-sm">
          🤖 AI Đầu tư Thông minh
        </Badge>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center space-x-4 bg-card p-4 rounded-lg border">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Bộ lọc:</span>
        </div>
        <select className="px-3 py-2 border rounded-md bg-background">
          <option>Tất cả Tổ chức</option>
          <option>BMC Holding</option>
          <option>F1 - Tập đoàn</option>
          <option>F2 - Chi nhánh</option>
          <option>F3 - Phòng ban</option>
          <option>F4 - Dự án</option>
          <option>F5 - Startup</option>
        </select>
        <select className="px-3 py-2 border rounded-md bg-background">
          <option>Kỳ báo cáo: Q4 2024</option>
          <option>Q3 2024</option>
          <option>Q2 2024</option>
          <option>Q1 2024</option>
          <option>Năm 2023</option>
        </select>
        <select className="px-3 py-2 border rounded-md bg-background">
          <option>Loại đầu tư: Tất cả</option>
          <option>Cổ phần chiến lược</option>
          <option>Quỹ phát triển</option>
          <option>M&A</option>
          <option>Startup investment</option>
        </select>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Cài đặt nâng cao
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tổng AUM</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">0B</div>
            <p className="text-xs text-muted-foreground">VNĐ quản lý</p>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+0% QoQ</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">ROI Danh mục</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+0%</div>
            <p className="text-xs text-muted-foreground">Hiệu suất YTD</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">Vượt mục tiêu 0%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Đầu tư Hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Công ty & Dự án</p>
            <div className="flex items-center mt-1">
              <Plus className="h-3 w-3 text-blue-600 mr-1" />
              <span className="text-xs text-blue-600">+0 tháng này</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Pipeline M&A</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">0</div>
            <p className="text-xs text-muted-foreground">Giao dịch đang xử lý</p>
            <div className="flex items-center mt-1">
              <Clock className="h-3 w-3 text-orange-600 mr-1" />
              <span className="text-xs text-orange-600">0 sắp đóng</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Vốn Khả dụng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">0B</div>
            <p className="text-xs text-muted-foreground">VNĐ sẵn sàng</p>
            <div className="flex items-center mt-1">
              <Wallet className="h-3 w-3 text-blue-600 mr-1" />
              <span className="text-xs text-blue-600">0% tổng AUM</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Dòng tiền Tháng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">+0B</div>
            <p className="text-xs text-muted-foreground">Đầu tư ròng</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-purple-600 mr-1" />
              <span className="text-xs text-purple-600">+0% vs tháng trước</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Investment Insight */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
            <Zap className="h-5 w-5" />
            🤖 AI Phân tích Đầu tư Thông minh
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-blue-800 dark:text-blue-200 font-medium">
              📊 Tổng quan: Danh mục đầu tư BMC đang thể hiện hiệu suất vượt trội với ROI 28.4%, vượt chỉ tiêu 8.4%
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>🎯 Khuyến nghị:</strong> Tăng phân bổ vào Fintech (đang 32%) và giảm Real Estate xuống 18%
                </p>
              </div>
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>⚠️ Cảnh báo:</strong> 5 startup F5 cần tái cấu trúc, khuyến nghị review trong 30 ngày
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="portfolio" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="portfolio">Quản lý Danh mục</TabsTrigger>
          <TabsTrigger value="funds">Quản lý Quỹ</TabsTrigger>
          <TabsTrigger value="deals">M&A & Giao dịch</TabsTrigger>
          <TabsTrigger value="cashflow">Dòng tiền Đầu tư</TabsTrigger>
          <TabsTrigger value="performance">Phân tích Hiệu suất</TabsTrigger>
          <TabsTrigger value="reports">Báo cáo Đầu tư</TabsTrigger>
        </TabsList>

        {/* Portfolio Management Tab */}
        <TabsContent value="portfolio" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* BMC Holdings */}
            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-purple-600" />
                  BMC Holdings (Mẹ)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Vốn điều lệ</span>
                  <span className="text-purple-600 font-bold">0B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Giá trị sổ sách</span>
                  <span className="text-green-600">0B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>P/B Ratio</span>
                  <Badge variant="outline" className="text-green-600">0x</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Cổ đông chính</span>
                  <span className="text-sm">CEO: 0%, Fund: 0%</span>
                </div>
                <Button size="sm" className="w-full">
                  <Building2 className="h-4 w-4 mr-2" />
                  Chi tiết BMC Holdings
                </Button>
              </CardContent>
            </Card>

            {/* F1 - Corporations */}
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users2 className="h-5 w-5 text-blue-600" />
                  F1 - Tập đoàn (7 công ty)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Tổng đầu tư</span>
                  <span className="text-blue-600 font-bold">0B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Giá trị hiện tại</span>
                  <span className="text-green-600">0B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>ROI</span>
                  <Badge variant="outline" className="text-green-600">+0%</Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-xs">
                    <span>• BMC Fintech: 0B (ROI: +0%)</span>
                  </div>
                  <div className="text-xs">
                    <span>• BMC F&B: 0B (ROI: +0%)</span>
                  </div>
                  <div className="text-xs">
                    <span>• BMC Real Estate: 0B (ROI: +0%)</span>
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  <Users2 className="h-4 w-4 mr-2" />
                  Danh mục F1 Corporation
                </Button>
              </CardContent>
            </Card>

            {/* F2 - Branches */}
            <Card className="border-2 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  F2 - Chi nhánh (24 đơn vị)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Vốn đầu tư</span>
                  <span className="text-green-600 font-bold">0B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Doanh thu năm</span>
                  <span className="text-green-600">0B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>EBITDA</span>
                  <Badge variant="outline" className="text-green-600">0%</Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-xs">
                    <span>• Miền Bắc: 0 chi nhánh (0B)</span>
                  </div>
                  <div className="text-xs">
                    <span>• Miền Trung: 0 chi nhánh (0B)</span>
                  </div>
                  <div className="text-xs">
                    <span>• Miền Nam: 0 chi nhánh (0B)</span>
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  <Globe className="h-4 w-4 mr-2" />
                  Chi tiết Chi nhánh F2
                </Button>
              </CardContent>
            </Card>

            {/* F3 - Departments */}
            <Card className="border-2 border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-orange-600" />
                  F3 - Phòng ban (156 bộ phận)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Ngân sách hoạt động</span>
                  <span className="text-orange-600 font-bold">245B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Hiệu quả chi tiêu</span>
                  <Badge variant="outline" className="text-green-600">94.7%</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Productivity Index</span>
                  <Badge variant="outline" className="text-green-600">1.23</Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-xs">
                    <span>• Kinh doanh: 45 phòng ban</span>
                  </div>
                  <div className="text-xs">
                    <span>• Vận hành: 38 phòng ban</span>
                  </div>
                  <div className="text-xs">
                    <span>• Hỗ trợ: 73 phòng ban</span>
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Quản lý Phòng ban F3
                </Button>
              </CardContent>
            </Card>

            {/* F4 - Projects */}
            <Card className="border-2 border-cyan-200 dark:border-cyan-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-cyan-600" />
                  F4 - Dự án (89 dự án)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Vốn triển khai</span>
                  <span className="text-cyan-600 font-bold">420B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Giá trị hiện tại</span>
                  <span className="text-green-600">587B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>IRR</span>
                  <Badge variant="outline" className="text-green-600">23.8%</Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-xs">
                    <span>• Đang triển khai: 34 dự án</span>
                  </div>
                  <div className="text-xs">
                    <span>• Hoàn thành: 45 dự án</span>
                  </div>
                  <div className="text-xs">
                    <span>• Tạm dừng: 10 dự án</span>
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  <Target className="h-4 w-4 mr-2" />
                  Portfolio Dự án F4
                </Button>
              </CardContent>
            </Card>

            {/* F5 - Startups */}
            <Card className="border-2 border-pink-200 dark:border-pink-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-pink-600" />
                  F5 - Startup (127 công ty)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Tổng đầu tư</span>
                  <span className="text-pink-600 font-bold">245B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Định giá hiện tại</span>
                  <span className="text-green-600">387B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Multiple</span>
                  <Badge variant="outline" className="text-green-600">1.58x</Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-xs">
                    <span>• Seed/Pre-A: 67 startup</span>
                  </div>
                  <div className="text-xs">
                    <span>• Series A/B: 38 startup</span>
                  </div>
                  <div className="text-xs">
                    <span>• Growth stage: 22 startup</span>
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Ecosystem Startup F5
                </Button>
              </CardContent>
            </Card>

            {/* Sector Allocation */}
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Phân bổ Danh mục theo Ngành & Cấp độ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">32%</div>
                    <p className="text-sm text-muted-foreground">Fintech & Banking</p>
                    <p className="text-xs">1,520B VNĐ</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      F1: 45% | F4: 25% | F5: 30%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">28%</div>
                    <p className="text-sm text-muted-foreground">F&B & Retail</p>
                    <p className="text-xs">1,330B VNĐ</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      F1: 38% | F2: 42% | F5: 20%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">22%</div>
                    <p className="text-sm text-muted-foreground">Real Estate</p>
                    <p className="text-xs">1,045B VNĐ</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      F1: 67% | F4: 33%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">12%</div>
                    <p className="text-sm text-muted-foreground">Technology</p>
                    <p className="text-xs">570B VNĐ</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      F4: 45% | F5: 55%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">6%</div>
                    <p className="text-sm text-muted-foreground">Khác</p>
                    <p className="text-xs">285B VNĐ</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      Đa ngành
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Fund Management Tab */}
        <TabsContent value="funds" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Operating Fund */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Banknote className="h-5 w-5 text-blue-600" />
                  Quỹ Vận hành BMC
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Quy mô quỹ</span>
                  <span className="font-bold">450B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Đã triển khai</span>
                  <span className="text-orange-600">287B VNĐ (64%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Cam kết chờ</span>
                  <span className="text-purple-600">89B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Khả dụng</span>
                  <span className="text-green-600">163B VNĐ</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '64%'}}></div>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>• F1 Corporations: 125B (28%)</div>
                  <div>• F2 Branches: 98B (22%)</div>
                  <div>• F3 Operations: 64B (14%)</div>
                </div>
                <Button size="sm" className="w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  Quản lý Quỹ Vận hành
                </Button>
              </CardContent>
            </Card>

            {/* Development Fund */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Quỹ Phát triển
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Quy mô quỹ</span>
                  <span className="font-bold">800B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Đã đầu tư</span>
                  <span className="text-blue-600">542B VNĐ (68%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Pipeline</span>
                  <span className="text-orange-600">158B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Dự trữ</span>
                  <span className="text-green-600">100B VNĐ</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '68%'}}></div>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>• F4 Projects: 287B (53%)</div>
                  <div>• F5 Startups: 165B (30%)</div>
                  <div>• M&A Deals: 90B (17%)</div>
                </div>
                <Button size="sm" className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Quỹ Phát triển
                </Button>
              </CardContent>
            </Card>

            {/* Risk Fund */}
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Quỹ Dự phòng Rủi ro
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Quy mô quỹ</span>
                  <span className="font-bold">200B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Đã sử dụng</span>
                  <span className="text-red-600">45B VNĐ (23%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Dự phòng tích cực</span>
                  <span className="text-orange-600">78B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Khả dụng</span>
                  <span className="text-green-600">77B VNĐ</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{width: '23%'}}></div>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>• Credit risk: 18B (40%)</div>
                  <div>• Market risk: 12B (27%)</div>
                  <div>• Operational: 15B (33%)</div>
                </div>
                <Button size="sm" className="w-full">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Quản lý Rủi ro
                </Button>
              </CardContent>
            </Card>

            {/* Strategic Investment Fund */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Quỹ Đầu tư Chiến lược
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Quy mô quỹ</span>
                  <span className="font-bold">1,200B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Đầu tư dài hạn</span>
                  <span className="text-purple-600">756B VNĐ (63%)</span>
                </div>
                <div className="flex justify-between">
                  <span>M&A Reserve</span>
                  <span className="text-blue-600">284B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Cơ hội đột phá</span>
                  <span className="text-green-600">160B VNĐ</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: '63%'}}></div>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>• Majority stakes: 445B (59%)</div>
                  <div>• Strategic minority: 311B (41%)</div>
                </div>
                <Button size="sm" className="w-full">
                  <Target className="h-4 w-4 mr-2" />
                  Đầu tư Chiến lược
                </Button>
              </CardContent>
            </Card>

            {/* International Fund */}
            <Card className="border-l-4 border-l-cyan-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-cyan-600" />
                  Quỹ Đầu tư Quốc tế
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Quy mô quỹ</span>
                  <span className="font-bold">350B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Đã triển khai</span>
                  <span className="text-cyan-600">198B VNĐ (57%)</span>
                </div>
                <div className="flex justify-between">
                  <span>FX Hedging</span>
                  <span className="text-orange-600">67B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Dry powder</span>
                  <span className="text-green-600">85B VNĐ</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-cyan-600 h-2 rounded-full" style={{width: '57%'}}></div>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>• ASEAN: 87B (44%)</div>
                  <div>• US/EU: 76B (38%)</div>
                  <div>• Emerging: 35B (18%)</div>
                </div>
                <Button size="sm" className="w-full">
                  <Globe className="h-4 w-4 mr-2" />
                  Đầu tư Quốc tế
                </Button>
              </CardContent>
            </Card>

            {/* Innovation Fund */}
            <Card className="border-l-4 border-l-pink-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-pink-600" />
                  Quỹ Đổi mới Sáng tạo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Quy mô quỹ</span>
                  <span className="font-bold">150B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Early stage</span>
                  <span className="text-pink-600">89B VNĐ (59%)</span>
                </div>
                <div className="flex justify-between">
                  <span>R&D Investment</span>
                  <span className="text-blue-600">34B VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Incubation</span>
                  <span className="text-green-600">27B VNĐ</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-pink-600 h-2 rounded-full" style={{width: '59%'}}></div>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>• AI/ML: 32B (36%)</div>
                  <div>• Blockchain: 28B (31%)</div>
                  <div>• IoT/Hardware: 29B (33%)</div>
                </div>
                <Button size="sm" className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Quỹ Đổi mới
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* M&A & Deals Tab */}
        <TabsContent value="deals" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* M&A Pipeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Pipeline M&A theo Giai đoạn
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Sourcing & Screening</span>
                      <Badge variant="outline" className="text-blue-600">24 deals</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Ước tính giá trị: 450B VNĐ</p>
                    <div className="text-xs text-blue-600 mt-1">
                      • F1 Targets: 8 | F4 Assets: 12 | F5 Acquisitions: 4
                    </div>
                  </div>
                  
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border-l-4 border-orange-500">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Due Diligence</span>
                      <Badge variant="outline" className="text-orange-600">15 deals</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Giá trị đang review: 287B VNĐ</p>
                    <div className="text-xs text-orange-600 mt-1">
                      • Legal DD: 8 | Financial DD: 12 | Tech DD: 6
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border-l-4 border-green-500">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Negotiation</span>
                      <Badge variant="outline" className="text-green-600">8 deals</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Deal value: 156B VNĐ</p>
                    <div className="text-xs text-green-600 mt-1">
                      • Term sheets: 8 | LOI signed: 5 | Final terms: 3
                    </div>
                  </div>
                  
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border-l-4 border-purple-500">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Closing & Integration</span>
                      <Badge variant="outline" className="text-purple-600">5 deals</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Committed capital: 89B VNĐ</p>
                    <div className="text-xs text-purple-600 mt-1">
                      • Documentation: 5 | Funding ready: 3 | Post-close: 2
                    </div>
                  </div>
                </div>
                
                <Button size="sm" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Chi tiết M&A Pipeline
                </Button>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5" />
                  Giao dịch Gần đây & Sắp tới
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-3">
                  
                  {/* Completed Deals */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-green-600">✅ Đã hoàn thành (Q4 2024)</h4>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <div>
                        <span className="font-medium">BMC F&B Chain Expansion</span>
                        <p className="text-sm text-muted-foreground">Mua lại 12 cửa hàng F2</p>
                        <div className="text-xs text-green-600">ROI dự kiến: +34% | Payback: 18 tháng</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">15B VNĐ</div>
                        <ArrowUpRight className="h-4 w-4 text-green-600 mx-auto" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <div>
                        <span className="font-medium">Fintech Startup Series B</span>
                        <p className="text-sm text-muted-foreground">AI Payment Platform F5</p>
                        <div className="text-xs text-green-600">Lead investor | 35% stake</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">25B VNĐ</div>
                        <ArrowUpRight className="h-4 w-4 text-green-600 mx-auto" />
                      </div>
                    </div>
                  </div>

                  {/* Pipeline Deals */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-blue-600">🔄 Đang xử lý (Q1 2025)</h4>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div>
                        <span className="font-medium">Regional Bank Acquisition</span>
                        <p className="text-sm text-muted-foreground">Mua 51% cổ phần ngân hàng F1</p>
                        <div className="text-xs text-blue-600">Due diligence phase | Strategic fit: 9.2/10</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">340B VNĐ</div>
                        <Clock className="h-4 w-4 text-blue-600 mx-auto" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <div>
                        <span className="font-medium">PropTech Platform</span>
                        <p className="text-sm text-muted-foreground">Startup bất động sản F5</p>
                        <div className="text-xs text-orange-600">Term negotiation | Series A lead</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-orange-600">18B VNĐ</div>
                        <Timer className="h-4 w-4 text-orange-600 mx-auto" />
                      </div>
                    </div>
                  </div>

                  {/* Watch List */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-purple-600">👁️ Theo dõi sát</h4>
                    
                    <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                      <div>
                        <span className="font-medium">Healthcare Chain</span>
                        <p className="text-sm text-muted-foreground">Network phòng khám F2</p>
                        <div className="text-xs text-purple-600">Scouting phase | Market research</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-purple-600">TBD</div>
                        <Eye className="h-4 w-4 text-purple-600 mx-auto" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button size="sm" className="w-full">
                  <Timer className="h-4 w-4 mr-2" />
                  Deal Management System
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Deal Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Hiệu suất Giao dịch & Exit Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">23</div>
                  <p className="text-sm text-muted-foreground">Deals hoàn thành 2024</p>
                  <p className="text-xs text-green-600">+15% vs 2023</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">67B</div>
                  <p className="text-sm text-muted-foreground">Avg deal size VNĐ</p>
                  <p className="text-xs text-blue-600">+23% vs 2023</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">18.7%</div>
                  <p className="text-sm text-muted-foreground">Avg IRR realized</p>
                  <p className="text-xs text-purple-600">Target: 15%</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">2.3x</div>
                  <p className="text-sm text-muted-foreground">Avg multiple on exit</p>
                  <p className="text-xs text-orange-600">Top quartile</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <h4 className="font-medium">🎯 Exit Pipeline 2025</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-medium">IPO Candidates</span>
                      <Badge variant="outline" className="text-green-600">3 companies</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Est. value: 450B VNĐ | Timeline: H2 2025</p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-medium">Strategic Sale</span>
                      <Badge variant="outline" className="text-blue-600">7 assets</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Est. value: 287B VNĐ | Timeline: Q2-Q4 2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Investment Cashflow Tab */}
        <TabsContent value="cashflow" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Monthly Cashflow */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Dòng tiền Đầu tư Hàng tháng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div>
                      <span className="font-medium">Inflow - Vốn huy động</span>
                      <p className="text-sm text-muted-foreground">Từ investors & revenue</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">+567B</div>
                      <ArrowUpRight className="h-4 w-4 text-green-600 mx-auto" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <div>
                      <span className="font-medium">Outflow - Đầu tư mới</span>
                      <p className="text-sm text-muted-foreground">New investments & follow-ons</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-600">-298B</div>
                      <ArrowDownRight className="h-4 w-4 text-red-600 mx-auto" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <div>
                      <span className="font-medium">Operating Expenses</span>
                      <p className="text-sm text-muted-foreground">Management fees & ops</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-600">-78B</div>
                      <ArrowDownRight className="h-4 w-4 text-orange-600 mx-auto" />
                    </div>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div>
                        <span className="font-bold">Net Cashflow</span>
                        <p className="text-sm text-muted-foreground">Tháng 12/2024</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">+191B</div>
                        <Badge variant="outline" className="text-blue-600">+23% MoM</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button size="sm" className="w-full">
                  <Activity className="h-4 w-4 mr-2" />
                  Chi tiết Dòng tiền
                </Button>
              </CardContent>
            </Card>

            {/* Cashflow by Category */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Phân bổ Dòng tiền theo Cấp độ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  
                  {/* BMC Level */}
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border-l-4 border-purple-500">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">BMC Holdings</span>
                      <Badge variant="outline" className="text-purple-600">35%</Badge>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-muted-foreground">Capital allocation</span>
                      <span className="text-purple-600 font-bold">+198B VNĐ</span>
                    </div>
                  </div>
                  
                  {/* F1 Level */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">F1 - Corporations</span>
                      <Badge variant="outline" className="text-blue-600">28%</Badge>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-muted-foreground">Strategic investments</span>
                      <span className="text-blue-600 font-bold">+156B VNĐ</span>
                    </div>
                  </div>
                  
                  {/* F2-F3 Level */}
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border-l-4 border-green-500">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">F2-F3 Operations</span>
                      <Badge variant="outline" className="text-green-600">22%</Badge>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-muted-foreground">Working capital & expansion</span>
                      <span className="text-green-600 font-bold">+123B VNĐ</span>
                    </div>
                  </div>
                  
                  {/* F4 Level */}
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border-l-4 border-orange-500">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">F4 - Projects</span>
                      <Badge variant="outline" className="text-orange-600">10%</Badge>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-muted-foreground">Project development</span>
                      <span className="text-orange-600 font-bold">+56B VNĐ</span>
                    </div>
                  </div>
                  
                  {/* F5 Level */}
                  <div className="p-3 bg-pink-50 dark:bg-pink-950/20 rounded-lg border-l-4 border-pink-500">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">F5 - Startups</span>
                      <Badge variant="outline" className="text-pink-600">5%</Badge>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-muted-foreground">Early stage funding</span>
                      <span className="text-pink-600 font-bold">+28B VNĐ</span>
                    </div>
                  </div>
                </div>
                
                <Button size="sm" className="w-full">
                  <PieChart className="h-4 w-4 mr-2" />
                  Phân tích Phân bổ
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quarterly Cashflow Forecast */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Dự báo Dòng tiền Quarterly 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">Q1 2025</div>
                  <div className="text-2xl font-bold text-green-600 mt-2">+425B</div>
                  <p className="text-sm text-muted-foreground">Net positive</p>
                  <div className="text-xs text-blue-600 mt-1">
                    Inflow: 678B | Outflow: 253B
                  </div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="text-lg font-bold text-green-600">Q2 2025</div>
                  <div className="text-2xl font-bold text-green-600 mt-2">+312B</div>
                  <p className="text-sm text-muted-foreground">Strong growth</p>
                  <div className="text-xs text-green-600 mt-1">
                    Inflow: 567B | Outflow: 255B
                  </div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <div className="text-lg font-bold text-orange-600">Q3 2025</div>
                  <div className="text-2xl font-bold text-orange-600 mt-2">+156B</div>
                  <p className="text-sm text-muted-foreground">Peak investment</p>
                  <div className="text-xs text-orange-600 mt-1">
                    Inflow: 498B | Outflow: 342B
                  </div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">Q4 2025</div>
                  <div className="text-2xl font-bold text-green-600 mt-2">+387B</div>
                  <p className="text-sm text-muted-foreground">Exit season</p>
                  <div className="text-xs text-purple-600 mt-1">
                    Inflow: 734B | Outflow: 347B
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-3">💰 Major Inflows dự kiến</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>• IPO exits (3 companies)</span>
                      <span className="text-green-600">+450B</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Dividend từ F1 corps</span>
                      <span className="text-green-600">+287B</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Strategic asset sales</span>
                      <span className="text-green-600">+234B</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• New fund raising</span>
                      <span className="text-green-600">+180B</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">💸 Major Outflows kế hoạch</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>• M&A transactions</span>
                      <span className="text-red-600">-567B</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Follow-on investments</span>
                      <span className="text-red-600">-234B</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• New F5 startups</span>
                      <span className="text-red-600">-156B</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Operating expenses</span>
                      <span className="text-red-600">-89B</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Analytics Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Portfolio Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Hiệu suất Danh mục
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>1 tháng</span>
                    <Badge variant="outline" className="text-green-600">+4.2%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>3 tháng</span>
                    <Badge variant="outline" className="text-green-600">+12.7%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>6 tháng</span>
                    <Badge variant="outline" className="text-green-600">+18.9%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>YTD</span>
                    <Badge variant="outline" className="text-green-600">+28.4%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>1 năm</span>
                    <Badge variant="outline" className="text-green-600">+31.6%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>3 năm (Annualized)</span>
                    <Badge variant="outline" className="text-green-600">+24.3%</Badge>
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">+28.4%</div>
                    <p className="text-sm text-muted-foreground">YTD Performance</p>
                    <p className="text-xs text-green-600">Vượt VN-Index +15.7%</p>
                  </div>
                </div>
                
                <Button size="sm" className="w-full">
                  <LineChart className="h-4 w-4 mr-2" />
                  Performance Details
                </Button>
              </CardContent>
            </Card>

            {/* Risk Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Chỉ số Rủi ro
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Volatility (1Y)</span>
                    <Badge variant="outline" className="text-blue-600">12.4%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sharpe Ratio</span>
                    <Badge variant="outline" className="text-green-600">2.17</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Maximum Drawdown</span>
                    <Badge variant="outline" className="text-orange-600">-8.2%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Beta vs VN-Index</span>
                    <Badge variant="outline" className="text-purple-600">0.87</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Value at Risk (95%)</span>
                    <Badge variant="outline" className="text-red-600">-156B VNĐ</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Correlation to Market</span>
                    <Badge variant="outline" className="text-cyan-600">0.73</Badge>
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">A+</div>
                    <p className="text-sm text-muted-foreground">Risk Rating</p>
                    <p className="text-xs text-green-600">Low-medium risk profile</p>
                  </div>
                </div>
                
                <Button size="sm" className="w-full">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Risk Analysis
                </Button>
              </CardContent>
            </Card>

            {/* AI Performance Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  🤖 AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">Outperforming</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Fintech portfolio đang vượt trội +45% vs industry avg
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">Optimization</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Khuyến nghị tăng allocation F5 tech startups lên 18%
                    </p>
                  </div>
                  
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-600">Watch List</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      5 F4 projects cần review performance trong Q1 2025
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-600">Opportunity</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      ESG investments có potential +35% growth năm 2025
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">97.8%</div>
                    <p className="text-sm text-muted-foreground">AI Accuracy</p>
                    <p className="text-xs text-blue-600">Prediction reliability</p>
                  </div>
                </div>
                
                <Button size="sm" className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  AI Investment Advisory
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Performance by Level */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Hiệu suất theo Cấp độ Tổ chức
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border-2 border-purple-200 dark:border-purple-800">
                  <div className="text-lg font-bold text-purple-600">BMC</div>
                  <div className="text-2xl font-bold text-green-600 mt-2">+32.1%</div>
                  <p className="text-sm text-muted-foreground">Overall ROI</p>
                  <div className="space-y-1 mt-2 text-xs">
                    <div className="flex justify-between">
                      <span>Book value:</span>
                      <span>4,750B</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Market value:</span>
                      <span>6,275B</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                  <div className="text-lg font-bold text-blue-600">F1</div>
                  <div className="text-2xl font-bold text-green-600 mt-2">+56.3%</div>
                  <p className="text-sm text-muted-foreground">Corp ROI</p>
                  <div className="space-y-1 mt-2 text-xs">
                    <div className="flex justify-between">
                      <span>Revenue growth:</span>
                      <span>+23.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>EBITDA margin:</span>
                      <span>24.7%</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border-2 border-green-200 dark:border-green-800">
                  <div className="text-lg font-bold text-green-600">F2</div>
                  <div className="text-2xl font-bold text-green-600 mt-2">+18.4%</div>
                  <p className="text-sm text-muted-foreground">Branch ROI</p>
                  <div className="space-y-1 mt-2 text-xs">
                    <div className="flex justify-between">
                      <span>Efficiency:</span>
                      <span>94.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expansion:</span>
                      <span>+7 new</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border-2 border-orange-200 dark:border-orange-800">
                  <div className="text-lg font-bold text-orange-600">F4</div>
                  <div className="text-2xl font-bold text-green-600 mt-2">+39.8%</div>
                  <p className="text-sm text-muted-foreground">Project IRR</p>
                  <div className="space-y-1 mt-2 text-xs">
                    <div className="flex justify-between">
                      <span>On-time:</span>
                      <span>87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>On-budget:</span>
                      <span>92%</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center p-4 bg-pink-50 dark:bg-pink-950/20 rounded-lg border-2 border-pink-200 dark:border-pink-800">
                  <div className="text-lg font-bold text-pink-600">F5</div>
                  <div className="text-2xl font-bold text-green-600 mt-2">+58.0%</div>
                  <p className="text-sm text-muted-foreground">Startup ROI</p>
                  <div className="space-y-1 mt-2 text-xs">
                    <div className="flex justify-between">
                      <span>Success rate:</span>
                      <span>68%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Unicorn potential:</span>
                      <span>3 cos</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-3">🏆 Top Performers YTD</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-950/20 rounded">
                      <span>BMC Fintech (F1)</span>
                      <Badge variant="outline" className="text-green-600">+67%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-950/20 rounded">
                      <span>AI Startup Portfolio (F5)</span>
                      <Badge variant="outline" className="text-green-600">+89%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-950/20 rounded">
                      <span>Digital Transform Projects (F4)</span>
                      <Badge variant="outline" className="text-green-600">+45%</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">⚠️ Needs Attention</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-orange-50 dark:bg-orange-950/20 rounded">
                      <span>Traditional Retail (F2)</span>
                      <Badge variant="outline" className="text-orange-600">+2.1%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-50 dark:bg-orange-950/20 rounded">
                      <span>Legacy Tech Projects (F4)</span>
                      <Badge variant="outline" className="text-orange-600">-1.2%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-50 dark:bg-orange-950/20 rounded">
                      <span>Hardware Startups (F5)</span>
                      <Badge variant="outline" className="text-orange-600">+3.4%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Investment Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Executive Summary */}
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  📊 Báo cáo Tổng quan Đầu tư Q4 2024
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">4,750B</div>
                    <p className="text-sm text-muted-foreground">Tổng AUM VNĐ</p>
                    <p className="text-xs text-green-600">+15.2% QoQ</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">+28.4%</div>
                    <p className="text-sm text-muted-foreground">Portfolio ROI YTD</p>
                    <p className="text-xs text-blue-600">Target: 20%</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">247</div>
                    <p className="text-sm text-muted-foreground">Active Investments</p>
                    <p className="text-xs text-purple-600">+12 new</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">23</div>
                    <p className="text-sm text-muted-foreground">Deals Closed</p>
                    <p className="text-xs text-orange-600">1,540B VNĐ</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">🎯 Key Highlights Q4 2024</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-green-600 mb-2">✅ Strong Performance</h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Fintech portfolio vượt trội +67% ROI</li>
                        <li>• 3 startup F5 đạt unicorn potential</li>
                        <li>• M&A pipeline tăng 45% deal value</li>
                        <li>• ESG investments tăng trưởng 34%</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-blue-600 mb-2">🚀 Strategic Initiatives</h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Ra mắt Quỹ AI Innovation 150B VNĐ</li>
                        <li>• Partnership với 3 fund quốc tế</li>
                        <li>• Expansion sang thị trường ASEAN</li>
                        <li>• Digital transformation hoàn thành 87%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Performance Report */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Báo cáo Hiệu suất
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">📈 Performance Metrics</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Net IRR (Inception)</span>
                      <Badge variant="outline" className="text-green-600">24.7%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Multiple on Invested Capital</span>
                      <Badge variant="outline" className="text-blue-600">2.38x</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Distributed to Paid-in</span>
                      <Badge variant="outline" className="text-purple-600">1.67x</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Sharpe Ratio</span>
                      <Badge variant="outline" className="text-green-600">2.17</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">🎯 vs Benchmarks</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>vs VN-Index</span>
                      <Badge variant="outline" className="text-green-600">+15.7%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>vs PE Industry Avg</span>
                      <Badge variant="outline" className="text-green-600">+8.3%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>vs Target (20%)</span>
                      <Badge variant="outline" className="text-green-600">+8.4%</Badge>
                    </div>
                  </div>
                </div>
                
                <Button size="sm" className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Full Performance Report
                </Button>
              </CardContent>
            </Card>

            {/* Risk Report */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Báo cáo Rủi ro
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">⚠️ Risk Assessment</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Overall Risk Score</span>
                      <Badge variant="outline" className="text-green-600">Low (2.3/10)</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Concentration Risk</span>
                      <Badge variant="outline" className="text-orange-600">Medium</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Liquidity Risk</span>
                      <Badge variant="outline" className="text-green-600">Low</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Currency Risk</span>
                      <Badge variant="outline" className="text-yellow-600">Medium</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">🛡️ Mitigation Measures</h5>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>• Diversification across 5 levels</div>
                    <div>• Hedging 67% FX exposure</div>
                    <div>• Active portfolio monitoring</div>
                    <div>• Reserve funds 200B VNĐ</div>
                  </div>
                </div>
                
                <Button size="sm" className="w-full">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Detailed Risk Analysis
                </Button>
              </CardContent>
            </Card>

            {/* ESG Report */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Báo cáo ESG
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">🌱 ESG Score</h5>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">8.7/10</div>
                    <p className="text-sm text-muted-foreground">Overall ESG Rating</p>
                    <Badge variant="outline" className="text-green-600 mt-1">Industry Leading</Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Environmental</span>
                      <Badge variant="outline" className="text-green-600">9.1/10</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Social</span>
                      <Badge variant="outline" className="text-blue-600">8.4/10</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Governance</span>
                      <Badge variant="outline" className="text-purple-600">8.6/10</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">📋 ESG Initiatives</h5>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>• Carbon neutral portfolio by 2025</div>
                    <div>• Đa dạng hội đồng quản trị</div>
                    <div>• 100% transparent reporting</div>
                    <div>• Impact measurement framework</div>
                  </div>
                </div>
                
                <Button size="sm" className="w-full">
                  <Globe className="h-4 w-4 mr-2" />
                  ESG Impact Report
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Thư viện Báo cáo Chi tiết
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Monthly Investment Report</h4>
                        <p className="text-sm text-muted-foreground">December 2024</p>
                      </div>
                      <Badge variant="outline" className="text-blue-600">Latest</Badge>
                    </div>
                    <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                      <div>• Portfolio performance analysis</div>
                      <div>• New investments & exits</div>
                      <div>• Market outlook & strategy</div>
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      <FileText className="h-4 w-4 mr-2" />
                      View Report
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Quarterly Fund Report</h4>
                        <p className="text-sm text-muted-foreground">Q4 2024</p>
                      </div>
                      <Badge variant="outline" className="text-green-600">Published</Badge>
                    </div>
                    <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                      <div>• Fund performance by category</div>
                      <div>• Asset allocation changes</div>
                      <div>• Risk metrics & compliance</div>
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      <FileText className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Annual Investment Review</h4>
                        <p className="text-sm text-muted-foreground">2024</p>
                      </div>
                      <Badge variant="outline" className="text-purple-600">Preparing</Badge>
                    </div>
                    <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                      <div>• Year-end comprehensive review</div>
                      <div>• Strategy & outlook 2025</div>
                      <div>• Stakeholder presentation</div>
                    </div>
                    <Button size="sm" className="w-full mt-3" disabled>
                      <FileText className="h-4 w-4 mr-2" />
                      Available Jan 2025
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">📋 Report Schedule & Distribution</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-blue-600">Regular Reports</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Weekly Dashboard</span>
                          <Badge variant="outline" className="text-green-600">Automated</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly Performance</span>
                          <Badge variant="outline" className="text-blue-600">5th of month</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Quarterly Fund Report</span>
                          <Badge variant="outline" className="text-purple-600">45 days post-quarter</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Annual Review</span>
                          <Badge variant="outline" className="text-orange-600">End of January</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-green-600">Ad-hoc Reports</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Deal Analysis</span>
                          <Badge variant="outline" className="text-blue-600">As needed</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Risk Assessment</span>
                          <Badge variant="outline" className="text-orange-600">Monthly+</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Market Updates</span>
                          <Badge variant="outline" className="text-green-600">Real-time</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>ESG Compliance</span>
                          <Badge variant="outline" className="text-purple-600">Quarterly</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">🤖 AI-Powered Analytics</h4>
                      <p className="text-sm text-muted-foreground">Real-time insights & predictions</p>
                    </div>
                    <Button>
                      <Zap className="h-4 w-4 mr-2" />
                      Access AI Dashboard
                    </Button>
                  </div>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                    <div className="text-center p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                      <div className="font-bold text-blue-600">97.8%</div>
                      <div className="text-muted-foreground">Prediction Accuracy</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 dark:bg-green-950/20 rounded">
                      <div className="font-bold text-green-600">24/7</div>
                      <div className="text-muted-foreground">Market Monitoring</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 dark:bg-purple-950/20 rounded">
                      <div className="font-bold text-purple-600">Real-time</div>
                      <div className="text-muted-foreground">Risk Alerts</div>
                    </div>
                    <div className="text-center p-2 bg-orange-50 dark:bg-orange-950/20 rounded">
                      <div className="font-bold text-orange-600">Auto</div>
                      <div className="text-muted-foreground">Report Generation</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}