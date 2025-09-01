import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Building2, DollarSign, Users, TrendingUp, BarChart3, Calendar, MessageSquare, Download, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectBranchDetailViewProps {
  onBack: () => void;
  organizations: any[];
}

// Mock data cho Project & Branch
const mockProjectData = {
  totalCapital: 0,
  bmcOwnership: 0,
  monthlyRevenue: 0,
  operatingCosts: 0,
  netProfit: 0,
  progressPercentage: 0,
  currentStaff: 0,
  averageKPI: 0,
};

const mockProjectList = [
  { 
    unit: "F4 Chi nhánh Hà Nội", 
    capital: 0, 
    revenue: 0, 
    costs: 0, 
    profit: 0, 
    progress: 0, 
    staff: 0, 
    kpi: 0,
    status: "active"
  },
  { 
    unit: "F5 Startup Cafe 40NQ", 
    capital: 0, 
    revenue: 0, 
    costs: 0, 
    profit: 0, 
    progress: 0, 
    staff: 0, 
    kpi: 0,
    status: "active"
  },
  { 
    unit: "F4 Chi nhánh HCM", 
    capital: 0, 
    revenue: 0, 
    costs: 0, 
    profit: 0, 
    progress: 0, 
    staff: 0, 
    kpi: 0,
    status: "active"
  },
  { 
    unit: "F5 Startup Tech Labs", 
    capital: 0, 
    revenue: 0, 
    costs: 0, 
    profit: 0, 
    progress: 0, 
    staff: 0, 
    kpi: 0,
    status: "risk"
  },
];

const mockMilestones = [
  { name: "Khởi tạo dự án", date: "2024-01", status: "completed" },
  { name: "Giai đoạn 1", date: "2024-03", status: "completed" },
  { name: "Giai đoạn 2", date: "2024-06", status: "in-progress" },
  { name: "Giai đoạn 3", date: "2024-09", status: "pending" },
  { name: "Hoàn thành", date: "2024-12", status: "pending" },
];

export function ProjectBranchDetailView({ onBack, organizations }: ProjectBranchDetailViewProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)} tỷ`;
    }
    return `${(amount / 1000000).toFixed(0)} triệu`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-100 text-green-800">Hoạt động</Badge>;
      case "risk":
        return <Badge variant="destructive">Rủi ro</Badge>;
      case "completed":
        return <Badge variant="secondary">Hoàn thành</Badge>;
      default:
        return <Badge variant="outline">Đang xử lý</Badge>;
    }
  };

  const getMilestoneStatus = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Báo cáo Dự án/Chi nhánh</h1>
            <p className="text-muted-foreground">Theo dõi tiến độ và hiệu quả các dự án & chi nhánh</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Nhập liệu
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-4 p-4 bg-card rounded-lg border">
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Chọn tổ chức" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="bmc">BMC (Tập đoàn)</SelectItem>
            <SelectItem value="f3">F3 (Công ty)</SelectItem>
            <SelectItem value="f4">F4 (Chi nhánh)</SelectItem>
            <SelectItem value="f5">F5 (Startup)</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="month">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Ngày</SelectItem>
            <SelectItem value="week">Tuần</SelectItem>
            <SelectItem value="month">Tháng</SelectItem>
            <SelectItem value="quarter">Quý</SelectItem>
            <SelectItem value="year">Năm</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="summary">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="summary">Tổng hợp</SelectItem>
            <SelectItem value="detailed">Chi tiết</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              Tổng vốn góp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(mockProjectData.totalCapital)} VNĐ</div>
            <p className="text-xs text-muted-foreground mt-1">
              BMC góp {mockProjectData.bmcOwnership}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              Doanh thu tháng này
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(mockProjectData.monthlyRevenue)} VNĐ</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tăng 8% so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Building2 className="h-4 w-4 text-orange-500" />
              Chi phí vận hành
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(mockProjectData.operatingCosts)} VNĐ</div>
            <p className="text-xs text-muted-foreground mt-1">
              Chi phí hoạt động
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Lợi nhuận ròng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(mockProjectData.netProfit)} VNĐ</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tỷ suất lợi nhuận 36%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              Tiến độ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockProjectData.progressPercentage}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tỷ lệ hoàn thành
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-pink-500" />
              Nhân sự
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockProjectData.currentStaff}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Nhân sự hiện tại
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-cyan-500" />
              KPI trung bình
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockProjectData.averageKPI}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Điểm KPI trung bình
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insight Box */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            AI Project Insight
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-medium text-sm text-foreground mb-1">📊 Tóm tắt:</h4>
            <p className="text-sm text-muted-foreground">
              Chi nhánh HCM đạt tiến độ cao nhất (90%), trong khi Startup Cafe mới đạt 70%. 
              Vốn góp BMC tại HN là {mockProjectData.bmcOwnership}%, mang lại lợi nhuận {formatCurrency(mockProjectData.netProfit)} VNĐ.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm text-amber-600 mb-1">⚠️ Cảnh báo:</h4>
            <p className="text-sm text-muted-foreground">
              Chi nhánh Hà Nội có tỷ lệ KPI thấp (75%), có nguy cơ ảnh hưởng đến lợi nhuận quý tới.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm text-green-600 mb-1">💡 Gợi ý hành động:</h4>
            <p className="text-sm text-muted-foreground">
              Tăng cường nhân sự cho Cafe 40NQ để đẩy nhanh tiến độ dự án. Xem xét đào tạo thêm cho team HN.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="performance">Hiệu suất</TabsTrigger>
          <TabsTrigger value="detailed">Chi tiết</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Phân bổ vốn góp</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">BMC (Tập đoàn)</span>
                    <span className="text-sm font-bold">20%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Cổ đông địa phương</span>
                    <span className="text-sm font-bold">50%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Nhà đầu tư khác</span>
                    <span className="text-sm font-bold">30%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hiệu suất theo đơn vị</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProjectList.map((project, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{project.unit}</p>
                        <p className="text-xs text-muted-foreground">KPI: {project.kpi}%</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="w-20" />
                        <span className="text-xs font-medium">{project.progress}%</span>
                        {getStatusBadge(project.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Timeline dự án</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMilestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full ${getMilestoneStatus(milestone.status)}`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{milestone.name}</p>
                      <p className="text-xs text-muted-foreground">{milestone.date}</p>
                    </div>
                    <Badge variant={milestone.status === 'completed' ? 'default' : milestone.status === 'in-progress' ? 'secondary' : 'outline'}>
                      {milestone.status === 'completed' ? 'Hoàn thành' : 
                       milestone.status === 'in-progress' ? 'Đang thực hiện' : 'Chưa bắt đầu'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Doanh thu theo đơn vị</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockProjectList.map((project, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{project.unit}</span>
                      <span className="text-sm font-bold">{formatCurrency(project.revenue)} VNĐ</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lợi nhuận theo đơn vị</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockProjectList.map((project, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{project.unit}</span>
                      <span className="text-sm font-bold">{formatCurrency(project.profit)} VNĐ</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết dự án/chi nhánh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Dự án/Chi nhánh</th>
                      <th className="text-right p-2">Vốn góp</th>
                      <th className="text-right p-2">Doanh thu</th>
                      <th className="text-right p-2">Chi phí</th>
                      <th className="text-right p-2">Lợi nhuận</th>
                      <th className="text-right p-2">Tiến độ</th>
                      <th className="text-right p-2">Nhân sự</th>
                      <th className="text-right p-2">KPI</th>
                      <th className="text-center p-2">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockProjectList.map((project, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{project.unit}</td>
                        <td className="p-2 text-right">{formatCurrency(project.capital)} VNĐ</td>
                        <td className="p-2 text-right">{formatCurrency(project.revenue)} VNĐ</td>
                        <td className="p-2 text-right">{formatCurrency(project.costs)} VNĐ</td>
                        <td className="p-2 text-right font-semibold">{formatCurrency(project.profit)} VNĐ</td>
                        <td className="p-2 text-right">{project.progress}%</td>
                        <td className="p-2 text-right">{project.staff}</td>
                        <td className="p-2 text-right">{project.kpi}%</td>
                        <td className="p-2 text-center">{getStatusBadge(project.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}