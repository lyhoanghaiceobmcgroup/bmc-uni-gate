import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  Target, 
  Phone, 
  Mail, 
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3,
  PieChart,
  Calendar,
  Building2,
  User,
  Briefcase
} from 'lucide-react';

// Mock data structure theo chuẩn ERP-AI
const mockSalesDetailData = {
  // 1. Meta Info
  metaInfo: {
    companyName: "GAJ Jewelry Co.",
    companyCode: "GAJ001",
    taxCode: "0109123456",
    reportPeriod: "Tháng 08/2025",
    reportType: "monthly", // daily, weekly, monthly, quarterly, yearly
    reporter: {
      name: "Lê Thị A",
      position: "Trưởng phòng Kinh doanh",
      role: "department_head" // employee, department_head, ceo
    },
    attachments: [
      { name: "Hợp đồng Q3.pdf", type: "contract", size: "2.5MB" },
      { name: "Báo cáo số liệu.xlsx", type: "excel", size: "1.2MB" }
    ]
  },

  // 2. Key Metrics
  keyMetrics: {
    currentRevenue: 85000000000, // VNĐ
    ytdRevenue: 560000000000,
    previousPeriodRevenue: 75892857143, // để tính % tăng/giảm
    grossMargin: 35, // %
    revenueGrowth: 12 // % so với kỳ trước
  },

  // 3. Contracts & Clients
  contractsClients: {
    newContracts: {
      count: 26,
      totalValue: 42000000000
    },
    activeContracts: {
      count: 156,
      totalValue: 280000000000
    },
    expiringContracts: {
      count: 5,
      totalValue: 8500000000,
      warningPercentage: 15
    },
    newClients: {
      count: 120,
      names: ["Công ty TNHH ABC", "Doanh nghiệp XYZ", "Cửa hàng DEF"]
    },
    clientRetention: 68 // %
  },

  // 4. Pipeline
  pipeline: {
    dealsInPipeline: {
      count: 38,
      totalValue: 30000000000
    },
    conversionRate: 24, // %
    averageDealTime: 45, // ngày
    customerSources: {
      marketing: 60,
      referral: 25,
      direct: 15
    }
  },

  // 5. Hoạt động kinh doanh
  salesActivities: {
    salesCalls: 220,
    quotationsSent: 150,
    ordersProcessed: {
      count: 140,
      totalValue: 36000000000
    },
    topProducts: [
      { name: "Vòng cổ kim cương", revenue: 18000000000 },
      { name: "Nhẫn cưới vàng", revenue: 12000000000 },
      { name: "Bông tai ngọc trai", revenue: 8500000000 },
      { name: "Lắc tay bạc", revenue: 6200000000 },
      { name: "Dây chuyền titan", revenue: 4800000000 }
    ]
  },

  // 6. AI Analysis & Alerts
  aiAnalysis: {
    anomalies: [
      {
        type: "revenue",
        description: "Doanh thu tăng đột biến 25% trong tuần cuối tháng",
        severity: "info"
      },
      {
        type: "pipeline",
        description: "12 deal quá hạn >30 ngày cần xử lý gấp",
        severity: "warning"
      }
    ],
    recommendations: [
      "Tập trung vào sản phẩm nhẫn cưới (tăng trưởng 25% Q2→Q3)",
      "Cần tăng cường chăm sóc khách hàng để cải thiện retention rate",
      "Đề xuất mở rộng kênh marketing online để tăng nguồn khách hàng"
    ],
    pipelineAlerts: {
      overdueDeals: 12,
      stalledDeals: 8,
      hotLeads: 15
    }
  },

  // 7. Notes & Suggestions
  notesAndSuggestions: {
    employeeNotes: "Tháng 8 có nhiều đơn hàng lớn từ khách hàng doanh nghiệp. Cần chuẩn bị kho hàng cho Q4.",
    departmentSuggestions: "Đề xuất tuyển thêm 2 nhân viên kinh doanh để xử lý pipeline tăng cao.",
    nextPeriodPlan: "Tập trung phát triển sản phẩm cao cấp và mở rộng thị trường miền Bắc."
  }
};

const SalesDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chi tiết Phòng Kinh doanh</h1>
          <p className="text-gray-600 mt-2">Báo cáo chi tiết và phân tích dữ liệu kinh doanh realtime</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
          <Button>
            <BarChart3 className="w-4 h-4 mr-2" />
            AI Analysis
          </Button>
        </div>
      </div>

      {/* Meta Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Thông tin tổng quan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-600">Công ty/Dự án</Label>
              <p className="text-lg font-semibold">{mockSalesDetailData.metaInfo.companyName}</p>
              <p className="text-sm text-gray-500">Mã: {mockSalesDetailData.metaInfo.companyCode} | MST: {mockSalesDetailData.metaInfo.taxCode}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Kỳ báo cáo</Label>
              <p className="text-lg font-semibold">{mockSalesDetailData.metaInfo.reportPeriod}</p>
              <Badge variant="outline">{mockSalesDetailData.metaInfo.reportType}</Badge>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Người báo cáo</Label>
              <p className="text-lg font-semibold">{mockSalesDetailData.metaInfo.reporter.name}</p>
              <p className="text-sm text-gray-500">{mockSalesDetailData.metaInfo.reporter.position}</p>
            </div>
          </div>
          
          {/* File attachments */}
          <div className="mt-6">
            <Label className="text-sm font-medium text-gray-600">File đính kèm</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {mockSalesDetailData.metaInfo.attachments.map((file, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {file.name} ({file.size})
                </Badge>
              ))}
            </div>
            <div className="mt-3">
              <Input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="w-full"
                accept=".pdf,.xlsx,.xls,.doc,.docx,.jpg,.png"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu kỳ này</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(mockSalesDetailData.keyMetrics.currentRevenue)}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{mockSalesDetailData.keyMetrics.revenueGrowth}% so với kỳ trước
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu YTD</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(mockSalesDetailData.keyMetrics.ytdRevenue)}</div>
            <p className="text-xs text-muted-foreground">Lũy kế từ đầu năm</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Biên lợi nhuận gộp</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSalesDetailData.keyMetrics.grossMargin}%</div>
            <Progress value={mockSalesDetailData.keyMetrics.grossMargin} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ chuyển đổi</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSalesDetailData.pipeline.conversionRate}%</div>
            <Progress value={mockSalesDetailData.pipeline.conversionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="contracts">Hợp đồng & KH</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="activities">Hoạt động KD</TabsTrigger>
          <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
          <TabsTrigger value="notes">Ghi chú</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Biểu đồ Doanh thu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Biểu đồ doanh thu theo thời gian</p>
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Sản phẩm bán chạy nhất</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockSalesDetailData.salesActivities.topProducts.map((product, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-green-600 font-semibold">{formatCurrency(product.revenue)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Hợp đồng ký mới</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSalesDetailData.contractsClients.newContracts.count}</div>
                <p className="text-sm text-gray-600">{formatCurrency(mockSalesDetailData.contractsClients.newContracts.totalValue)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Hợp đồng hiệu lực</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSalesDetailData.contractsClients.activeContracts.count}</div>
                <p className="text-sm text-gray-600">{formatCurrency(mockSalesDetailData.contractsClients.activeContracts.totalValue)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  Sắp hết hạn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{mockSalesDetailData.contractsClients.expiringContracts.count}</div>
                <p className="text-sm text-gray-600">{formatCurrency(mockSalesDetailData.contractsClients.expiringContracts.totalValue)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Khách hàng mới</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{mockSalesDetailData.contractsClients.newClients.count}</div>
                <p className="text-sm text-gray-600">Retention: {mockSalesDetailData.contractsClients.clientRetention}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Client List */}
          <Card>
            <CardHeader>
              <CardTitle>Danh sách khách hàng mới</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockSalesDetailData.contractsClients.newClients.names.map((client, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>{client}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Deals trong Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSalesDetailData.pipeline.dealsInPipeline.count}</div>
                <p className="text-sm text-gray-600">{formatCurrency(mockSalesDetailData.pipeline.dealsInPipeline.totalValue)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Thời gian chốt deal TB</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSalesDetailData.pipeline.averageDealTime}</div>
                <p className="text-sm text-gray-600">ngày</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Tỷ lệ chuyển đổi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSalesDetailData.pipeline.conversionRate}%</div>
                <Progress value={mockSalesDetailData.pipeline.conversionRate} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Customer Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Nguồn khách hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Marketing Online</span>
                  <div className="flex items-center gap-2">
                    <Progress value={mockSalesDetailData.pipeline.customerSources.marketing} className="w-24" />
                    <span className="font-semibold">{mockSalesDetailData.pipeline.customerSources.marketing}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Giới thiệu</span>
                  <div className="flex items-center gap-2">
                    <Progress value={mockSalesDetailData.pipeline.customerSources.referral} className="w-24" />
                    <span className="font-semibold">{mockSalesDetailData.pipeline.customerSources.referral}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Bán lẻ trực tiếp</span>
                  <div className="flex items-center gap-2">
                    <Progress value={mockSalesDetailData.pipeline.customerSources.direct} className="w-24" />
                    <span className="font-semibold">{mockSalesDetailData.pipeline.customerSources.direct}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  Cuộc gọi/gặp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(mockSalesDetailData.salesActivities.salesCalls)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  Báo giá gửi đi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(mockSalesDetailData.salesActivities.quotationsSent)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Đơn hàng xử lý
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(mockSalesDetailData.salesActivities.ordersProcessed.count)}</div>
                <p className="text-sm text-gray-600">{formatCurrency(mockSalesDetailData.salesActivities.ordersProcessed.totalValue)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Hiệu suất TB</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((mockSalesDetailData.salesActivities.ordersProcessed.count / mockSalesDetailData.salesActivities.quotationsSent) * 100)}%
                </div>
                <p className="text-sm text-gray-600">Tỷ lệ báo giá/đơn hàng</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-analysis" className="space-y-4">
          {/* AI Alerts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Cảnh báo & Phân tích AI</h3>
            
            {mockSalesDetailData.aiAnalysis.anomalies.map((anomaly, index) => (
              <Alert key={index} className={anomaly.severity === 'warning' ? 'border-orange-200 bg-orange-50' : 'border-blue-200 bg-blue-50'}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="capitalize">{anomaly.type}</AlertTitle>
                <AlertDescription>{anomaly.description}</AlertDescription>
              </Alert>
            ))}
          </div>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Đề xuất từ AI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockSalesDetailData.aiAnalysis.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pipeline Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-red-600">Deals quá hạn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{mockSalesDetailData.aiAnalysis.pipelineAlerts.overdueDeals}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-orange-600">Deals bị trì hoãn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{mockSalesDetailData.aiAnalysis.pipelineAlerts.stalledDeals}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-green-600">Hot Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{mockSalesDetailData.aiAnalysis.pipelineAlerts.hotLeads}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ghi chú nhân viên/Trưởng phòng</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Nhập ghi chú..."
                  value={mockSalesDetailData.notesAndSuggestions.employeeNotes}
                  className="min-h-32"
                />
                <Button className="mt-3" size="sm">
                  Lưu ghi chú
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Đề xuất từ đội ngũ KD</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Nhập đề xuất..."
                  value={mockSalesDetailData.notesAndSuggestions.departmentSuggestions}
                  className="min-h-32"
                />
                <Button className="mt-3" size="sm">
                  Gửi đề xuất
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Kế hoạch điều chỉnh cho kỳ sau</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Nhập kế hoạch..."
                value={mockSalesDetailData.notesAndSuggestions.nextPeriodPlan}
                className="min-h-32"
              />
              <div className="flex gap-2 mt-3">
                <Button size="sm">
                  Lưu kế hoạch
                </Button>
                <Button variant="outline" size="sm">
                  Gửi phê duyệt
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { SalesDetailPage };
export default SalesDetailPage;