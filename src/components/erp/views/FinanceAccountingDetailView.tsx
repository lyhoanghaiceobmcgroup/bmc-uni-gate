import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, AlertTriangle, FileText, Upload, Download, Bot, Plus, Calendar, PieChart, BarChart3, Calculator, CreditCard, Wallet, Building2, Receipt, Target, Clock, Users, MessageSquare, Filter, RefreshCw, Search, Eye, Activity, Layers } from "lucide-react";

interface FinanceAccountingDetailViewProps {
  onBack: () => void;
}

export function FinanceAccountingDetailView({ onBack }: FinanceAccountingDetailViewProps) {
  const [activeView, setActiveView] = useState<"revenue" | "expense" | "debt" | "budget" | "assets" | "reports">("revenue");
  const [selectedOrg, setSelectedOrg] = useState<string>("all");
  const [timePeriod, setTimePeriod] = useState<string>("current");

  // Hierarchical Organization Structure
  const organizationHierarchy = [
    { id: "bmc", name: "BMC Holdings", level: "BMC", type: "holding", code: "BMC001" },
    { id: "f1-tech", name: "F1 Technology Corp", level: "F1", type: "corporation", parent: "bmc", code: "F1T001" },
    { id: "f1-retail", name: "F1 Retail Group", level: "F1", type: "corporation", parent: "bmc", code: "F1R001" },
    { id: "f2-software", name: "F2 Software Solutions", level: "F2", type: "company", parent: "f1-tech", code: "F2S001" },
    { id: "f2-hardware", name: "F2 Hardware Dist", level: "F2", type: "company", parent: "f1-tech", code: "F2H001" },
    { id: "f2-fashion", name: "F2 Fashion Chain", level: "F2", type: "company", parent: "f1-retail", code: "F2F001" },
    { id: "f3-saas", name: "F3 SaaS Platform", level: "F3", type: "startup", parent: "f2-software", code: "F3S001" },
    { id: "f3-mobile", name: "F3 Mobile Dev", level: "F3", type: "startup", parent: "f2-software", code: "F3M001" },
    { id: "f4-ai", name: "F4 AI Solutions", level: "F4", type: "project", parent: "f3-saas", code: "F4A001" },
    { id: "f4-blockchain", name: "F4 Blockchain Lab", level: "F4", type: "project", parent: "f3-saas", code: "F4B001" },
    { id: "f5-research", name: "F5 R&D Division", level: "F5", type: "branch", parent: "f4-ai", code: "F5R001" },
    { id: "f5-product", name: "F5 Product Dev", level: "F5", type: "branch", parent: "f4-ai", code: "F5P001" }
  ];

  // Comprehensive Financial Data across hierarchy - RESET TO 0
  const financialDataByOrg = {
    "bmc": {
      revenue: { current: 0, target: 0, qoq: 0, yoy: 0 },
      expense: { current: 0, budget: 0, variance: 0, fixed: 0, variable: 0 },
      debt: { receivables: 0, payables: 0, overdue: 0, cashflow: 0 },
      budget: { allocated: 0, used: 0, available: 0, forecast: 0 },
      assets: { total: 0, fixed: 0, current: 0, depreciation: 0 }
    },
    "f1-tech": {
      revenue: { current: 0, target: 0, qoq: 0, yoy: 0 },
      expense: { current: 0, budget: 0, variance: 0, fixed: 0, variable: 0 },
      debt: { receivables: 0, payables: 0, overdue: 0, cashflow: 0 },
      budget: { allocated: 0, used: 0, available: 0, forecast: 0 },
      assets: { total: 0, fixed: 0, current: 0, depreciation: 0 }
    },
    "f1-retail": {
      revenue: { current: 0, target: 0, qoq: 0, yoy: 0 },
      expense: { current: 0, budget: 0, variance: 0, fixed: 0, variable: 0 },
      debt: { receivables: 0, payables: 0, overdue: 0, cashflow: 0 },
      budget: { allocated: 0, used: 0, available: 0, forecast: 0 },
      assets: { total: 0, fixed: 0, current: 0, depreciation: 0 }
    },
    "f2-software": {
      revenue: { current: 4200000000, target: 4900000000, qoq: 25.3, yoy: 48.6 },
      expense: { current: 2800000000, budget: 3200000000, variance: -12.5, fixed: 1800000000, variable: 1000000000 },
      debt: { receivables: 780000000, payables: 520000000, overdue: 85000000, cashflow: 1400000000 },
      budget: { allocated: 6500000000, used: 4600000000, available: 1900000000, forecast: 94.8 },
      assets: { total: 32000000000, fixed: 24000000000, current: 8000000000, depreciation: 320000000 }
    },
    "f3-saas": {
      revenue: { current: 1800000000, target: 2200000000, qoq: 35.7, yoy: 125.4 },
      expense: { current: 1200000000, budget: 1400000000, variance: -14.3, fixed: 800000000, variable: 400000000 },
      debt: { receivables: 320000000, payables: 180000000, overdue: 25000000, cashflow: 600000000 },
      budget: { allocated: 2800000000, used: 1980000000, available: 820000000, forecast: 96.2 },
      assets: { total: 8500000000, fixed: 5200000000, current: 3300000000, depreciation: 85000000 }
    },
    "f4-ai": {
      revenue: { current: 650000000, target: 850000000, qoq: 87.2, yoy: 285.6 },
      expense: { current: 480000000, budget: 580000000, variance: -17.2, fixed: 320000000, variable: 160000000 },
      debt: { receivables: 125000000, payables: 68000000, overdue: 8000000, cashflow: 170000000 },
      budget: { allocated: 1200000000, used: 750000000, available: 450000000, forecast: 98.5 },
      assets: { total: 2800000000, fixed: 1600000000, current: 1200000000, depreciation: 28000000 }
    },
    "f5-research": {
      revenue: { current: 285000000, target: 380000000, qoq: 125.8, yoy: 445.2 },
      expense: { current: 220000000, budget: 280000000, variance: -21.4, fixed: 150000000, variable: 70000000 },
      debt: { receivables: 48000000, payables: 32000000, overdue: 3200000, cashflow: 65000000 },
      budget: { allocated: 450000000, used: 312000000, available: 138000000, forecast: 99.1 },
      assets: { total: 850000000, fixed: 480000000, current: 370000000, depreciation: 8500000 }
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getOrganizationData = () => {
    if (selectedOrg === "all") {
      return financialDataByOrg["bmc"];
    }
    return financialDataByOrg[selectedOrg] || financialDataByOrg["bmc"];
  };

  const renderRevenueManagement = () => {
    const orgData = getOrganizationData();
    const selectedOrgInfo = organizationHierarchy.find(org => org.id === selectedOrg) || organizationHierarchy[0];
    
    return (
      <div className="space-y-6">
        {/* Organization Selector */}
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Quản lý Doanh thu - {selectedOrgInfo.name}
              </CardTitle>
              <div className="flex gap-2">
                <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tổng hợp BMC</SelectItem>
                    {organizationHierarchy.map(org => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.level}: {org.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={timePeriod} onValueChange={setTimePeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Tháng này</SelectItem>
                    <SelectItem value="quarter">Quý này</SelectItem>
                    <SelectItem value="year">Năm này</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Doanh thu hiện tại</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(orgData.revenue.current)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">+{orgData.revenue.qoq}%</span> so với quý trước
              </p>
              <Progress value={(orgData.revenue.current / orgData.revenue.target) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Mục tiêu: {formatCurrency(orgData.revenue.target)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tăng trưởng YoY</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">+{orgData.revenue.yoy}%</div>
              <p className="text-xs text-muted-foreground">So với cùng kỳ năm trước</p>
              <Badge variant="secondary" className="mt-2 text-xs">
                {orgData.revenue.yoy > 30 ? "Tăng trưởng mạnh" : orgData.revenue.yoy > 15 ? "Tăng trưởng tốt" : "Tăng trưởng ổn định"}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Doanh thu theo cấp</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sản phẩm chính</span>
                  <span className="font-medium">65%</span>
                </div>
                <Progress value={65} />
                <div className="flex justify-between text-sm">
                  <span>Dịch vụ</span>
                  <span className="font-medium">25%</span>
                </div>
                <Progress value={25} />
                <div className="flex justify-between text-sm">
                  <span>Khác</span>
                  <span className="font-medium">10%</span>
                </div>
                <Progress value={10} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Revenue Insights</CardTitle>
              <Bot className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-primary">
                {orgData.revenue.yoy > 50 ? "Xuất sắc" : orgData.revenue.yoy > 20 ? "Tích cực" : "Ổn định"}
              </div>
              <p className="text-xs text-muted-foreground">
                Dự báo Q4: +{Math.round(orgData.revenue.yoy * 0.8)}%
              </p>
              <Badge variant="outline" className="mt-2 text-xs">
                {selectedOrgInfo.level} Level
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Cập nhật Doanh thu - {selectedOrgInfo.code}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="org-select">Thuộc công ty/dự án</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn công ty/dự án" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizationHierarchy.map(org => (
                        <SelectItem key={org.id} value={org.id}>
                          {org.level}: {org.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="amount">Số tiền (VNĐ)</Label>
                  <Input id="amount" placeholder="Nhập số tiền" type="number" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="source">Nguồn thu</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nguồn thu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">Bán sản phẩm</SelectItem>
                      <SelectItem value="service">Dịch vụ</SelectItem>
                      <SelectItem value="license">Phí bản quyền</SelectItem>
                      <SelectItem value="investment">Thu từ đầu tư</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Ngày ghi nhận</Label>
                  <Input id="date" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Mô tả chi tiết</Label>
                <Textarea id="description" placeholder="Mô tả nguồn doanh thu và thông tin liên quan" />
              </div>
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Cập nhật doanh thu
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                AI Revenue Agent - {selectedOrgInfo.level}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Phân tích AI cho {selectedOrgInfo.name}:</p>
                  <p className="text-sm">
                    Doanh thu {selectedOrgInfo.level} tăng {orgData.revenue.yoy}% so với cùng kỳ. 
                    {orgData.revenue.yoy > 50 ? " Tăng trưởng vượt bậc, cần mở rộng quy mô sản xuất." : 
                     orgData.revenue.yoy > 20 ? " Tăng trưởng tốt, duy trì chiến lược hiện tại." : 
                     " Tăng trưởng ổn định, cần đẩy mạnh marketing."}
                  </p>
                </div>
                <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                  <p className="text-sm font-medium text-primary mb-1">Khuyến nghị cấp {selectedOrgInfo.level}:</p>
                  <p className="text-sm">
                    {selectedOrgInfo.level === "BMC" ? "Tối ưu hóa portfolio công ty con, tập trung vào các F1 có ROI cao." :
                     selectedOrgInfo.level === "F1" ? "Đẩy mạnh synergy giữa các F2, chia sẻ tài nguyên và khách hàng." :
                     selectedOrgInfo.level === "F2" ? "Phát triển sản phẩm mới, mở rộng thị trường trong nước." :
                     selectedOrgInfo.level === "F3" ? "Tăng cường R&D, chuẩn bị scale-up cho giai đoạn tiếp theo." :
                     selectedOrgInfo.level === "F4" ? "Pivot sản phẩm nếu cần, tìm product-market fit." :
                     "Tập trung phát triển MVP, validation ý tưởng sản phẩm."}
                  </p>
                </div>
                <Input placeholder="Hỏi AI về doanh thu cấp này..." />
                <Button size="sm" variant="outline" className="w-full">
                  <Bot className="w-4 h-4 mr-2" />
                  Gửi câu hỏi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hierarchical Revenue Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Phân tích Doanh thu Xuyên suốt Cấp độ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cấp độ</TableHead>
                  <TableHead>Tổ chức</TableHead>
                  <TableHead>Doanh thu</TableHead>
                  <TableHead>Tăng trưởng YoY</TableHead>
                  <TableHead>% Đóng góp</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(financialDataByOrg).slice(0, 6).map(([orgId, data]) => {
                  const orgInfo = organizationHierarchy.find(org => org.id === orgId);
                  if (!orgInfo) return null;
                  return (
                    <TableRow key={orgId}>
                      <TableCell>
                        <Badge variant="outline">{orgInfo.level}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{orgInfo.name}</TableCell>
                      <TableCell>{formatCurrency(data.revenue.current)}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${data.revenue.yoy > 30 ? 'text-primary' : data.revenue.yoy > 15 ? 'text-blue-600' : 'text-muted-foreground'}`}>
                          +{data.revenue.yoy}%
                        </span>
                      </TableCell>
                      <TableCell>
                        {((data.revenue.current / financialDataByOrg["bmc"].revenue.current) * 100).toFixed(1)}%
                      </TableCell>
                      <TableCell>
                        <Badge variant={data.revenue.yoy > 50 ? "default" : data.revenue.yoy > 20 ? "secondary" : "outline"}>
                          {data.revenue.yoy > 50 ? "Xuất sắc" : data.revenue.yoy > 20 ? "Tốt" : "Ổn định"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderExpenseManagement = () => {
    const orgData = getOrganizationData();
    const selectedOrgInfo = organizationHierarchy.find(org => org.id === selectedOrg) || organizationHierarchy[0];
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chi phí tháng</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(orgData.expense.current)}</div>
              <p className="text-xs text-muted-foreground">
                <span className={orgData.expense.variance < 0 ? "text-primary" : "text-destructive"}>
                  {orgData.expense.variance}%
                </span> so với ngân sách
              </p>
              <Progress value={(orgData.expense.current / orgData.expense.budget) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chi phí cố định</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{formatCurrency(orgData.expense.fixed)}</div>
              <p className="text-xs text-muted-foreground">
                {((orgData.expense.fixed / orgData.expense.current) * 100).toFixed(0)}% tổng chi phí
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chi phí biến đổi</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{formatCurrency(orgData.expense.variable)}</div>
              <p className="text-xs text-muted-foreground">
                {((orgData.expense.variable / orgData.expense.current) * 100).toFixed(0)}% tổng chi phí
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Cost Control</CardTitle>
              <Bot className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium text-primary">
                {Math.abs(orgData.expense.variance) < 10 ? "Kiểm soát tốt" : Math.abs(orgData.expense.variance) < 20 ? "Cần chú ý" : "Cần hành động"}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.abs(orgData.expense.variance) < 10 ? "Chi phí trong tầm kiểm soát" : "Chi phí vượt ngân sách"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Expense Management Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Cập nhật Chi phí - {selectedOrgInfo.code}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="org-expense">Thuộc công ty/dự án</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn công ty/dự án" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizationHierarchy.map(org => (
                        <SelectItem key={org.id} value={org.id}>
                          {org.level}: {org.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="expense-amount">Số tiền (VNĐ)</Label>
                  <Input id="expense-amount" placeholder="Nhập số tiền" type="number" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expense-type">Loại chi phí</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại chi phí" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Lương và phụ cấp</SelectItem>
                      <SelectItem value="rent">Thuê văn phòng</SelectItem>
                      <SelectItem value="marketing">Marketing & Quảng cáo</SelectItem>
                      <SelectItem value="rd">Nghiên cứu & Phát triển</SelectItem>
                      <SelectItem value="operation">Vận hành</SelectItem>
                      <SelectItem value="legal">Pháp lý & Tuân thủ</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="expense-category">Phân loại</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Cố định/Biến đổi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Chi phí cố định</SelectItem>
                      <SelectItem value="variable">Chi phí biến đổi</SelectItem>
                      <SelectItem value="semi">Bán biến đổi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Cập nhật chi phí
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                AI Cost Analytics - {selectedOrgInfo.level}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Phân tích chi phí {selectedOrgInfo.name}:</p>
                  <p className="text-sm">
                    Chi phí hiện tại {Math.abs(orgData.expense.variance) < 10 ? "được kiểm soát tốt" : "vượt ngân sách"}. 
                    Tỷ lệ chi phí cố định/biến đổi: {((orgData.expense.fixed / orgData.expense.current) * 100).toFixed(0)}%/{((orgData.expense.variable / orgData.expense.current) * 100).toFixed(0)}%.
                  </p>
                </div>
                <div className={`p-3 rounded-lg border ${Math.abs(orgData.expense.variance) < 10 ? 'bg-primary/5 border-primary/20' : 'bg-destructive/5 border-destructive/20'}`}>
                  <p className={`text-sm font-medium mb-1 ${Math.abs(orgData.expense.variance) < 10 ? 'text-primary' : 'text-destructive'}`}>
                    {Math.abs(orgData.expense.variance) < 10 ? "Tối ưu hóa" : "Khuyến nghị"}:
                  </p>
                  <p className="text-sm">
                    {selectedOrgInfo.level === "BMC" ? "Tối ưu shared services, giảm trùng lặp chi phí giữa các F1." :
                     selectedOrgInfo.level === "F1" ? "Consolidate các dịch vụ chung, optimize chi phí IT và HR." :
                     selectedOrgInfo.level === "F2" ? "Renegotiate hợp đồng thuê, tối ưu chi phí marketing." :
                     selectedOrgInfo.level === "F3" ? "Focus ngân sách vào core activities, outsource non-core." :
                     selectedOrgInfo.level === "F4" ? "Lean operations, minimize fixed costs trong giai đoạn đầu." :
                     "Bootstrap approach, tối thiểu hóa chi phí đến khi đạt PMF."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderDebtManagement = () => {
    const orgData = getOrganizationData();
    const selectedOrgInfo = organizationHierarchy.find(org => org.id === selectedOrg) || organizationHierarchy[0];
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Công nợ phải thu</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(orgData.debt.receivables)}</div>
              <p className="text-xs text-destructive">
                Quá hạn: {formatCurrency(orgData.debt.overdue)} 
                ({((orgData.debt.overdue / orgData.debt.receivables) * 100).toFixed(1)}%)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Công nợ phải trả</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(orgData.debt.payables)}</div>
              <p className="text-xs text-muted-foreground">
                Cần thanh toán trong 30 ngày
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dòng tiền ròng</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{formatCurrency(orgData.debt.cashflow)}</div>
              <p className="text-xs text-muted-foreground">
                Net: Thu - Trả = {formatCurrency(orgData.debt.receivables - orgData.debt.payables)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Debt Monitor</CardTitle>
              <Bot className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium text-primary">
                {(orgData.debt.overdue / orgData.debt.receivables) < 0.1 ? "Tốt" : (orgData.debt.overdue / orgData.debt.receivables) < 0.2 ? "Cần chú ý" : "Rủi ro cao"}
              </div>
              <p className="text-xs text-muted-foreground">
                {(orgData.debt.overdue / orgData.debt.receivables) < 0.1 ? "Quản lý công nợ hiệu quả" : "Cần tăng cường thu hồi"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Debt Management Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Cập nhật Công nợ - {selectedOrgInfo.code}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="debt-org">Thuộc công ty/dự án</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn công ty/dự án" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizationHierarchy.map(org => (
                        <SelectItem key={org.id} value={org.id}>
                          {org.level}: {org.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="debt-type">Loại công nợ</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Phải thu/Phải trả" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="receivable">Công nợ phải thu</SelectItem>
                      <SelectItem value="payable">Công nợ phải trả</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="debt-amount">Số tiền (VNĐ)</Label>
                  <Input id="debt-amount" placeholder="Nhập số tiền" type="number" />
                </div>
                <div>
                  <Label htmlFor="due-date">Ngày đến hạn</Label>
                  <Input id="due-date" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="counterparty">Đối tác/Khách hàng</Label>
                <Input id="counterparty" placeholder="Tên công ty/khách hàng" />
              </div>
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Cập nhật công nợ
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Phân tích Công nợ Xuyên cấp
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cấp độ</TableHead>
                    <TableHead>Phải thu</TableHead>
                    <TableHead>Phải trả</TableHead>
                    <TableHead>Ròng</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(financialDataByOrg).slice(0, 4).map(([orgId, data]) => {
                    const orgInfo = organizationHierarchy.find(org => org.id === orgId);
                    if (!orgInfo) return null;
                    const netDebt = data.debt.receivables - data.debt.payables;
                    return (
                      <TableRow key={orgId}>
                        <TableCell>
                          <Badge variant="outline">{orgInfo.level}</Badge>
                        </TableCell>
                        <TableCell>{formatCurrency(data.debt.receivables)}</TableCell>
                        <TableCell>{formatCurrency(data.debt.payables)}</TableCell>
                        <TableCell>
                          <span className={`font-medium ${netDebt > 0 ? 'text-primary' : 'text-destructive'}`}>
                            {formatCurrency(netDebt)}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderBudgetManagement = () => {
    const orgData = getOrganizationData();
    const selectedOrgInfo = organizationHierarchy.find(org => org.id === selectedOrg) || organizationHierarchy[0];
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ngân sách được cấp</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(orgData.budget.allocated)}</div>
              <p className="text-xs text-muted-foreground">
                Đã sử dụng: {formatCurrency(orgData.budget.used)} ({((orgData.budget.used / orgData.budget.allocated) * 100).toFixed(0)}%)
              </p>
              <Progress value={(orgData.budget.used / orgData.budget.allocated) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ngân sách khả dụng</CardTitle>
              <Building2 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-primary">{formatCurrency(orgData.budget.available)}</div>
              <p className="text-xs text-muted-foreground">
                {((orgData.budget.available / orgData.budget.allocated) * 100).toFixed(0)}% tổng ngân sách
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dự báo sử dụng</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{orgData.budget.forecast}%</div>
              <p className="text-xs text-muted-foreground">
                {orgData.budget.forecast > 95 ? "Sẽ vượt ngân sách" : orgData.budget.forecast > 85 ? "Sẽ gần hết ngân sách" : "Trong tầm kiểm soát"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Budget Control</CardTitle>
              <Bot className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium text-primary">
                {orgData.budget.forecast < 90 ? "Quản lý tốt" : orgData.budget.forecast < 100 ? "Cần chú ý" : "Rủi ro cao"}
              </div>
              <p className="text-xs text-muted-foreground">
                {orgData.budget.forecast < 90 ? "Ngân sách được kiểm soát" : "Cần điều chỉnh chi tiêu"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Budget Management Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Cập nhật Ngân sách - {selectedOrgInfo.code}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget-org">Thuộc công ty/dự án</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn công ty/dự án" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizationHierarchy.map(org => (
                        <SelectItem key={org.id} value={org.id}>
                          {org.level}: {org.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="budget-type">Loại ngân sách</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operational">Vận hành</SelectItem>
                      <SelectItem value="development">Phát triển</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="research">Nghiên cứu</SelectItem>
                      <SelectItem value="expansion">Mở rộng</SelectItem>
                      <SelectItem value="contingency">Dự phòng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget-amount">Số tiền cấp (VNĐ)</Label>
                  <Input id="budget-amount" placeholder="Nhập số tiền" type="number" />
                </div>
                <div>
                  <Label htmlFor="budget-period">Chu kỳ ngân sách</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn chu kỳ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Tháng</SelectItem>
                      <SelectItem value="quarterly">Quý</SelectItem>
                      <SelectItem value="yearly">Năm</SelectItem>
                      <SelectItem value="project">Theo dự án</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Cập nhật ngân sách
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Phân bổ Ngân sách Xuyên cấp
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cấp độ</TableHead>
                    <TableHead>Được cấp</TableHead>
                    <TableHead>Đã dùng</TableHead>
                    <TableHead>Còn lại</TableHead>
                    <TableHead>%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(financialDataByOrg).slice(0, 5).map(([orgId, data]) => {
                    const orgInfo = organizationHierarchy.find(org => org.id === orgId);
                    if (!orgInfo) return null;
                    const usagePercent = (data.budget.used / data.budget.allocated) * 100;
                    return (
                      <TableRow key={orgId}>
                        <TableCell>
                          <Badge variant="outline">{orgInfo.level}</Badge>
                        </TableCell>
                        <TableCell>{formatCurrency(data.budget.allocated)}</TableCell>
                        <TableCell>{formatCurrency(data.budget.used)}</TableCell>
                        <TableCell>{formatCurrency(data.budget.available)}</TableCell>
                        <TableCell>
                          <span className={`font-medium ${usagePercent > 90 ? 'text-destructive' : usagePercent > 75 ? 'text-orange-600' : 'text-primary'}`}>
                            {usagePercent.toFixed(0)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderAssetManagement = () => {
    const orgData = getOrganizationData();
    const selectedOrgInfo = organizationHierarchy.find(org => org.id === selectedOrg) || organizationHierarchy[0];
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng tài sản</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(orgData.assets.total)}</div>
              <p className="text-xs text-muted-foreground">
                Tài sản ròng sau khấu hao
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tài sản cố định</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{formatCurrency(orgData.assets.fixed)}</div>
              <p className="text-xs text-muted-foreground">
                {((orgData.assets.fixed / orgData.assets.total) * 100).toFixed(0)}% tổng tài sản
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tài sản lưu động</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-primary">{formatCurrency(orgData.assets.current)}</div>
              <p className="text-xs text-muted-foreground">
                {((orgData.assets.current / orgData.assets.total) * 100).toFixed(0)}% tổng tài sản
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Khấu hao tháng</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{formatCurrency(orgData.assets.depreciation)}</div>
              <p className="text-xs text-muted-foreground">
                Tự động tính toán theo quy định
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Asset Management Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Cập nhật Tài sản - {selectedOrgInfo.code}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="asset-org">Thuộc công ty/dự án</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn công ty/dự án" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizationHierarchy.map(org => (
                        <SelectItem key={org.id} value={org.id}>
                          {org.level}: {org.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="asset-type">Loại tài sản</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="building">Nhà xưởng, văn phòng</SelectItem>
                      <SelectItem value="equipment">Máy móc, thiết bị</SelectItem>
                      <SelectItem value="vehicle">Phương tiện vận chuyển</SelectItem>
                      <SelectItem value="it">Thiết bị IT</SelectItem>
                      <SelectItem value="furniture">Nội thất văn phòng</SelectItem>
                      <SelectItem value="intangible">Tài sản vô hình</SelectItem>
                      <SelectItem value="investment">Đầu tư tài chính</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="asset-value">Giá trị (VNĐ)</Label>
                  <Input id="asset-value" placeholder="Nhập giá trị" type="number" />
                </div>
                <div>
                  <Label htmlFor="depreciation-years">Thời gian khấu hao (năm)</Label>
                  <Input id="depreciation-years" placeholder="5" type="number" />
                </div>
              </div>
              <div>
                <Label htmlFor="asset-description">Mô tả tài sản</Label>
                <Textarea id="asset-description" placeholder="Mô tả chi tiết về tài sản" />
              </div>
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Cập nhật tài sản
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Cơ cấu Tài sản theo Cấp độ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cấp độ</TableHead>
                    <TableHead>Tổng TS</TableHead>
                    <TableHead>TS Cố định</TableHead>
                    <TableHead>TS Lưu động</TableHead>
                    <TableHead>ROA</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(financialDataByOrg).slice(0, 5).map(([orgId, data]) => {
                    const orgInfo = organizationHierarchy.find(org => org.id === orgId);
                    if (!orgInfo) return null;
                    const roa = ((data.revenue.current / data.assets.total) * 100);
                    return (
                      <TableRow key={orgId}>
                        <TableCell>
                          <Badge variant="outline">{orgInfo.level}</Badge>
                        </TableCell>
                        <TableCell>{formatCurrency(data.assets.total)}</TableCell>
                        <TableCell>{formatCurrency(data.assets.fixed)}</TableCell>
                        <TableCell>{formatCurrency(data.assets.current)}</TableCell>
                        <TableCell>
                          <span className={`font-medium ${roa > 20 ? 'text-primary' : roa > 10 ? 'text-blue-600' : 'text-muted-foreground'}`}>
                            {roa.toFixed(1)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderFinancialReports = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Báo cáo P&L
            </CardTitle>
            <CardDescription>Lãi lỗ tháng này</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Doanh thu</span>
                <span className="font-medium">2.85B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Chi phí</span>
                <span className="font-medium">1.75B</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Lợi nhuận</span>
                <span className="font-bold text-primary">1.10B</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              <Download className="w-4 h-4 mr-2" />
              Xuất PDF
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Balance Sheet
            </CardTitle>
            <CardDescription>Cân đối kế toán</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Tài sản</span>
                <span className="font-medium">15.2B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Nợ phải trả</span>
                <span className="font-medium">3.8B</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Vốn chủ</span>
                <span className="font-bold text-primary">11.4B</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              <Download className="w-4 h-4 mr-2" />
              Xuất PDF
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Cashflow
            </CardTitle>
            <CardDescription>Lưu chuyển tiền tệ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Hoạt động KD</span>
                <span className="font-medium text-primary">+850M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Đầu tư</span>
                <span className="font-medium text-destructive">-320M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Tài chính</span>
                <span className="font-medium">+50M</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Ròng</span>
                <span className="font-bold text-primary">+580M</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              <Download className="w-4 h-4 mr-2" />
              Xuất PDF
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Finance Report Agent
          </CardTitle>
          <CardDescription>Tạo báo cáo tự động theo yêu cầu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Báo cáo chi phí Q3
              </Button>
              <Button variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Phân tích lợi nhuận
              </Button>
              <Button variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                Dự báo dòng tiền
              </Button>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Tạo báo cáo: 'Báo cáo chi phí marketing Q3 2024'" className="flex-1" />
              <Button>
                <Bot className="w-4 h-4 mr-2" />
                Tạo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                💰 Tài chính
              </h1>
              <p className="text-muted-foreground">Quản lý tài chính xuyên suốt BMC → F1 → F2 → F3 → F4 → F5</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Nhập liệu
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Cập nhật
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(getOrganizationData().revenue.current)}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +{getOrganizationData().revenue.qoq}% quý trước
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chi phí</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(getOrganizationData().expense.current)}</div>
              <p className="text-xs text-muted-foreground">
                {getOrganizationData().expense.variance}% ngân sách
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lợi nhuận</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{formatCurrency(getOrganizationData().revenue.current - getOrganizationData().expense.current)}</div>
              <p className="text-xs text-muted-foreground">
                Margin: {(((getOrganizationData().revenue.current - getOrganizationData().expense.current) / getOrganizationData().revenue.current) * 100).toFixed(1)}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Công nợ</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{formatCurrency(getOrganizationData().debt.receivables)}</div>
              <p className="text-xs text-destructive">
                Quá hạn: {((getOrganizationData().debt.overdue / getOrganizationData().debt.receivables) * 100).toFixed(1)}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dòng tiền</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-primary">{formatCurrency(getOrganizationData().debt.cashflow)}</div>
              <p className="text-xs text-muted-foreground">
                Ròng tháng này
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Finance</CardTitle>
              <Bot className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold text-primary">Trợ lý tài chính</div>
              <p className="text-xs text-muted-foreground">
                12 cảnh báo | 5 khuyến nghị
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Doanh thu
            </TabsTrigger>
            <TabsTrigger value="expense" className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4" />
              Chi phí
            </TabsTrigger>
            <TabsTrigger value="debt" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Công nợ
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Ngân sách
            </TabsTrigger>
            <TabsTrigger value="assets" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Tài sản
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Báo cáo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-6">
            {renderRevenueManagement()}
          </TabsContent>

          <TabsContent value="expense" className="space-y-6">
            {renderExpenseManagement()}
          </TabsContent>

          <TabsContent value="debt" className="space-y-6">
            {renderDebtManagement()}
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            {renderBudgetManagement()}
          </TabsContent>

          <TabsContent value="assets" className="space-y-6">
            {renderAssetManagement()}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {renderFinancialReports()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}