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
import { ArrowLeft, Calculator, FileText, Upload, Download, Bot, Plus, Calendar, PieChart, BarChart3, Receipt, Target, Clock, Users, MessageSquare, Filter, RefreshCw, Search, Eye, Activity, Layers } from "lucide-react";

interface AccountingDetailViewProps {
  onBack: () => void;
}

export function AccountingDetailView({ onBack }: AccountingDetailViewProps) {
  const [activeView, setActiveView] = useState<"bookkeeping" | "reports" | "audit" | "tax" | "compliance">("bookkeeping");
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

  // Accounting Data by Organization
  const accountingDataByOrg = {
    "bmc": {
      bookkeeping: { entries: 0, pending: 0, accuracy: 0, automation: 0 },
      reports: { monthly: 0, quarterly: 0, annual: 0, compliance: 0 },
      audit: { findings: 0, resolved: 0, pending: 0, score: 0 },
      tax: { filings: 0, payments: 0, refunds: 0, compliance: 0 },
      compliance: { score: 0, violations: 0, certifications: 0, updates: 0 }
    },
    "f1-tech": {
      bookkeeping: { entries: 15420, pending: 45, accuracy: 98.5, automation: 85 },
      reports: { monthly: 12, quarterly: 4, annual: 1, compliance: 95 },
      audit: { findings: 3, resolved: 2, pending: 1, score: 92 },
      tax: { filings: 48, payments: 2400000000, refunds: 120000000, compliance: 98 },
      compliance: { score: 94, violations: 1, certifications: 8, updates: 24 }
    },
    "f1-retail": {
      bookkeeping: { entries: 12850, pending: 32, accuracy: 97.8, automation: 78 },
      reports: { monthly: 12, quarterly: 4, annual: 1, compliance: 93 },
      audit: { findings: 5, resolved: 4, pending: 1, score: 89 },
      tax: { filings: 48, payments: 1800000000, refunds: 85000000, compliance: 96 },
      compliance: { score: 91, violations: 2, certifications: 6, updates: 18 }
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toLocaleString();
  };

  const selectedOrgInfo = organizationHierarchy.find(org => org.id === selectedOrg) || organizationHierarchy[0];
  const orgData = accountingDataByOrg[selectedOrg as keyof typeof accountingDataByOrg] || accountingDataByOrg["bmc"];

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
                📊 Kế toán
              </h1>
              <p className="text-muted-foreground">Quản lý kế toán và báo cáo tài chính BMC → F1 → F2 → F3 → F4 → F5</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Nhập chứng từ
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Ghi sổ
            </Button>
          </div>
        </div>

        {/* Organization & Time Period Selector */}
        <div className="flex gap-4 mb-6">
          <Select value={selectedOrg} onValueChange={setSelectedOrg}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Chọn tổ chức" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả tổ chức</SelectItem>
              {organizationHierarchy.map(org => (
                <SelectItem key={org.id} value={org.id}>
                  {org.level}: {org.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Chọn kỳ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Tháng hiện tại</SelectItem>
              <SelectItem value="quarter">Quý hiện tại</SelectItem>
              <SelectItem value="year">Năm hiện tại</SelectItem>
              <SelectItem value="custom">Tùy chỉnh</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bút toán</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orgData.bookkeeping.entries.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {orgData.bookkeeping.pending} chờ xử lý
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Độ chính xác</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orgData.bookkeeping.accuracy}%</div>
              <p className="text-xs text-muted-foreground">
                {orgData.bookkeeping.automation}% tự động hóa
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Báo cáo</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orgData.reports.monthly + orgData.reports.quarterly + orgData.reports.annual}</div>
              <p className="text-xs text-muted-foreground">
                {orgData.reports.compliance}% tuân thủ
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kiểm toán</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orgData.audit.score}</div>
              <p className="text-xs text-muted-foreground">
                {orgData.audit.findings} phát hiện
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Thuế</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orgData.tax.compliance}%</div>
              <p className="text-xs text-muted-foreground">
                {orgData.tax.filings} tờ khai
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="bookkeeping" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Ghi sổ
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Báo cáo
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Kiểm toán
            </TabsTrigger>
            <TabsTrigger value="tax" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Thuế
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Tuân thủ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookkeeping" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Sổ kế toán tổng hợp - {selectedOrgInfo.name}</CardTitle>
                  <CardDescription>Quản lý bút toán và chứng từ kế toán</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <Input placeholder="Tìm kiếm bút toán..." className="flex-1" />
                      <Button variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ngày</TableHead>
                          <TableHead>Chứng từ</TableHead>
                          <TableHead>Diễn giải</TableHead>
                          <TableHead>Nợ</TableHead>
                          <TableHead>Có</TableHead>
                          <TableHead>Số tiền</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>15/01/2025</TableCell>
                          <TableCell>CT001</TableCell>
                          <TableCell>Thu tiền bán hàng</TableCell>
                          <TableCell>111</TableCell>
                          <TableCell>511</TableCell>
                          <TableCell className="font-medium">50,000,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>15/01/2025</TableCell>
                          <TableCell>CT002</TableCell>
                          <TableCell>Chi phí vận hành</TableCell>
                          <TableCell>642</TableCell>
                          <TableCell>111</TableCell>
                          <TableCell className="font-medium">15,000,000</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Thêm bút toán mới</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Ngày ghi sổ</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>Số chứng từ</Label>
                    <Input placeholder="CT001" />
                  </div>
                  <div>
                    <Label>Diễn giải</Label>
                    <Textarea placeholder="Mô tả giao dịch..." />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>TK Nợ</Label>
                      <Input placeholder="111" />
                    </div>
                    <div>
                      <Label>TK Có</Label>
                      <Input placeholder="511" />
                    </div>
                  </div>
                  <div>
                    <Label>Số tiền</Label>
                    <Input placeholder="0" type="number" />
                  </div>
                  <Button className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm bút toán
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Báo cáo tài chính</CardTitle>
                  <CardDescription>Các báo cáo kế toán chuẩn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col">
                      <BarChart3 className="h-6 w-6 mb-2" />
                      <span>Bảng cân đối kế toán</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col">
                      <PieChart className="h-6 w-6 mb-2" />
                      <span>Báo cáo KQKD</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col">
                      <Activity className="h-6 w-6 mb-2" />
                      <span>Lưu chuyển tiền tệ</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col">
                      <FileText className="h-6 w-6 mb-2" />
                      <span>Thuyết minh BCTC</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Báo cáo thông minh</CardTitle>
                  <CardDescription>Tự động tạo báo cáo với AI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-5 w-5 text-primary" />
                      <span className="font-medium">AI Assistant</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Tôi có thể giúp bạn tạo báo cáo tự động dựa trên dữ liệu kế toán hiện tại.
                    </p>
                    <Button size="sm" className="w-full">
                      Tạo báo cáo AI
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kiểm toán nội bộ</CardTitle>
                <CardDescription>Theo dõi và quản lý quy trình kiểm toán</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{orgData.audit.resolved}</div>
                          <p className="text-sm text-muted-foreground">Đã xử lý</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{orgData.audit.pending}</div>
                          <p className="text-sm text-muted-foreground">Đang xử lý</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{orgData.audit.score}</div>
                          <p className="text-sm text-muted-foreground">Điểm kiểm toán</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý thuế</CardTitle>
                <CardDescription>Kê khai và nộp thuế</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Calculator className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="text-lg font-bold">{orgData.tax.filings}</div>
                        <p className="text-sm text-muted-foreground">Tờ khai</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Receipt className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <div className="text-lg font-bold">{formatCurrency(orgData.tax.payments)}</div>
                        <p className="text-sm text-muted-foreground">Đã nộp</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Download className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <div className="text-lg font-bold">{formatCurrency(orgData.tax.refunds)}</div>
                        <p className="text-sm text-muted-foreground">Hoàn thuế</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Target className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                        <div className="text-lg font-bold">{orgData.tax.compliance}%</div>
                        <p className="text-sm text-muted-foreground">Tuân thủ</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tuân thủ kế toán</CardTitle>
                <CardDescription>Đảm bảo tuân thủ các quy định kế toán</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{orgData.compliance.score}%</div>
                          <p className="text-sm text-muted-foreground">Điểm tuân thủ</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">{orgData.compliance.violations}</div>
                          <p className="text-sm text-muted-foreground">Vi phạm</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{orgData.compliance.certifications}</div>
                          <p className="text-sm text-muted-foreground">Chứng chỉ</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{orgData.compliance.updates}</div>
                          <p className="text-sm text-muted-foreground">Cập nhật</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}