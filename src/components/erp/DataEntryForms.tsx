import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Plus, 
  Save, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp, 
  DollarSign,
  Users,
  Truck,
  Shield,
  Cog,
  Target
} from "lucide-react";

interface DataEntryFormsProps {
  entityLevel: "F4" | "F5";
  entityName: string;
}

export function DataEntryForms({ entityLevel, entityName }: DataEntryFormsProps) {
  const [activeForm, setActiveForm] = useState("sales");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation và auto-suggest sẽ được implement với AI
  const handleSubmit = async (formData: any, module: string) => {
    setIsSubmitting(true);
    // Simulate API call với realtime sync
    setTimeout(() => {
      console.log(`${module} data submitted:`, formData);
      setIsSubmitting(false);
      // Trigger realtime update to dashboard
    }, 1500);
  };

  const formSections = [
    { id: "sales", name: "💰 Sales Order", icon: DollarSign, required: ["channel", "customer", "product", "amount"] },
    { id: "marketing", name: "📈 Marketing Campaign", icon: TrendingUp, required: ["channel", "budget", "target"] },
    { id: "finance", name: "💳 Finance Transaction", icon: DollarSign, required: ["type", "amount", "category"] },
    { id: "hr", name: "👥 HR & Payroll", icon: Users, required: ["employee", "month", "amount"] },
    { id: "inventory", name: "📦 Inventory Movement", icon: Truck, required: ["sku", "quantity", "type"] },
    { id: "compliance", name: "🛡️ Compliance Check", icon: Shield, required: ["domain", "status", "evidence"] },
    { id: "technology", name: "⚙️ IT System Update", icon: Cog, required: ["system", "status", "metrics"] },
    { id: "strategic", name: "🎯 Strategic Project", icon: Target, required: ["title", "type", "budget"] }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            📝 Form nhập liệu nhanh - {entityName} ({entityLevel})
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Nhập liệu chuẩn hóa theo 9 phòng ban - Đồng bộ realtime với Trung tâm báo cáo
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeForm} onValueChange={setActiveForm}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="sales">💰 Sales & Marketing</TabsTrigger>
          <TabsTrigger value="finance">💳 Finance & HR</TabsTrigger>
          <TabsTrigger value="operations">📦 Operations</TabsTrigger>
          <TabsTrigger value="strategic">🎯 Strategic & IT</TabsTrigger>
        </TabsList>

        {/* Sales & Marketing Forms */}
        <TabsContent value="sales" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sales Order Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Sales Order Entry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleSubmit(Object.fromEntries(formData), 'sales');
                }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="so-channel">Channel *</Label>
                      <Select name="channel" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn kênh" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="offline">Offline</SelectItem>
                          <SelectItem value="wholesale">Wholesale</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="so-customer">Customer *</Label>
                      <Input name="customer" placeholder="Tên khách hàng" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="so-product">Product *</Label>
                      <Input name="product" placeholder="SKU hoặc tên sản phẩm" required />
                    </div>
                    <div>
                      <Label htmlFor="so-quantity">Quantity *</Label>
                      <Input name="quantity" type="number" placeholder="Số lượng" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="so-price">Unit Price *</Label>
                      <Input name="price" type="number" placeholder="Giá đơn vị (VNĐ)" required />
                    </div>
                    <div>
                      <Label htmlFor="so-tax">Tax Rate</Label>
                      <Select name="tax">
                        <SelectTrigger>
                          <SelectValue placeholder="VAT" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0%</SelectItem>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="8">8%</SelectItem>
                          <SelectItem value="10">10%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="so-notes">Notes</Label>
                    <Textarea name="notes" placeholder="Ghi chú đơn hàng..." rows={3} />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                      {isSubmitting ? "Đang lưu..." : "💾 Lưu Sales Order"}
                    </Button>
                    <Button type="button" variant="outline">
                      📄 Scan Invoice
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Marketing Campaign Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Marketing Campaign
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="campaign-name">Campaign Name *</Label>
                    <Input name="campaignName" placeholder="Tên chiến dịch" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="campaign-channel">Channel *</Label>
                      <Select name="channel" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Kênh marketing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="facebook">Facebook Ads</SelectItem>
                          <SelectItem value="google">Google Ads</SelectItem>
                          <SelectItem value="tiktok">TikTok Ads</SelectItem>
                          <SelectItem value="zalo">Zalo OA</SelectItem>
                          <SelectItem value="offline">Offline Events</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="campaign-budget">Budget *</Label>
                      <Input name="budget" type="number" placeholder="Ngân sách (VNĐ)" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="campaign-start">Start Date *</Label>
                      <Input name="startDate" type="date" required />
                    </div>
                    <div>
                      <Label htmlFor="campaign-end">End Date *</Label>
                      <Input name="endDate" type="date" required />
                    </div>
                    <div>
                      <Label htmlFor="campaign-target">Target Audience</Label>
                      <Input name="target" placeholder="Độ tuổi, địa điểm..." />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="campaign-objective">Objective & KPI</Label>
                    <Textarea name="objective" placeholder="Mục tiêu: leads, sales, awareness..." rows={2} />
                  </div>

                  <Button type="submit" className="w-full">
                    🚀 Launch Campaign
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Finance & HR Forms */}
        <TabsContent value="finance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Finance Transaction */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Finance Transaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="txn-type">Type *</Label>
                      <Select name="type" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Loại giao dịch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="revenue">Revenue (Thu)</SelectItem>
                          <SelectItem value="expense">Expense (Chi)</SelectItem>
                          <SelectItem value="investment">Investment</SelectItem>
                          <SelectItem value="loan">Loan/Debt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="txn-amount">Amount *</Label>
                      <Input name="amount" type="number" placeholder="Số tiền (VNĐ)" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="txn-category">GL Code *</Label>
                      <Select name="glCode" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Mã kế toán" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1111">1111 - Tiền mặt</SelectItem>
                          <SelectItem value="1121">1121 - Ngân hàng</SelectItem>
                          <SelectItem value="5111">5111 - Chi phí bán hàng</SelectItem>
                          <SelectItem value="6411">6411 - Chi phí quản lý</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="txn-center">Cost Center</Label>
                      <Input name="costCenter" placeholder="Phòng ban/Dự án" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="txn-description">Description *</Label>
                    <Input name="description" placeholder="Nội dung giao dịch" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="txn-date">Transaction Date *</Label>
                      <Input name="txnDate" type="date" required />
                    </div>
                    <div>
                      <Label htmlFor="txn-doc">Supporting Doc</Label>
                      <Button type="button" variant="outline" className="w-full">
                        📎 Upload Receipt
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    💾 Record Transaction
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* HR Payroll */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  HR & Payroll Entry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hr-employee">Employee *</Label>
                      <Select name="employee" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn nhân viên" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emp001">Nguyễn Văn A - Sales</SelectItem>
                          <SelectItem value="emp002">Trần Thị B - Marketing</SelectItem>
                          <SelectItem value="emp003">Lê Văn C - Operations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="hr-month">Month *</Label>
                      <Input name="month" type="month" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="hr-base">Base Salary</Label>
                      <Input name="baseSalary" type="number" placeholder="Lương cơ bản" />
                    </div>
                    <div>
                      <Label htmlFor="hr-bonus">Bonus</Label>
                      <Input name="bonus" type="number" placeholder="Thưởng" />
                    </div>
                    <div>
                      <Label htmlFor="hr-overtime">Overtime</Label>
                      <Input name="overtime" type="number" placeholder="Làm thêm giờ" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hr-deduction">Deductions</Label>
                      <Input name="deductions" type="number" placeholder="Các khoản trừ" />
                    </div>
                    <div>
                      <Label htmlFor="hr-kpi">KPI Score</Label>
                      <Input name="kpiScore" type="number" placeholder="Điểm KPI (%)" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="hr-notes">Performance Notes</Label>
                    <Textarea name="performanceNotes" placeholder="Đánh giá hiệu suất..." rows={3} />
                  </div>

                  <Button type="submit" className="w-full">
                    💼 Submit Payroll
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Operations Forms */}
        <TabsContent value="operations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inventory Movement */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Inventory Movement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="inv-sku">SKU/Product *</Label>
                      <Input name="sku" placeholder="Mã sản phẩm" required />
                    </div>
                    <div>
                      <Label htmlFor="inv-batch">Batch Number</Label>
                      <Input name="batch" placeholder="Số lô" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="inv-type">Movement Type *</Label>
                      <Select name="movementType" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Loại xuất nhập" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inbound">Nhập kho</SelectItem>
                          <SelectItem value="outbound">Xuất kho</SelectItem>
                          <SelectItem value="transfer">Chuyển kho</SelectItem>
                          <SelectItem value="adjustment">Kiểm kê</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="inv-quantity">Quantity *</Label>
                      <Input name="quantity" type="number" placeholder="Số lượng" required />
                    </div>
                    <div>
                      <Label htmlFor="inv-unit">Unit Cost</Label>
                      <Input name="unitCost" type="number" placeholder="Đơn giá" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="inv-warehouse">Warehouse *</Label>
                      <Select name="warehouse" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Kho" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main">Kho chính</SelectItem>
                          <SelectItem value="retail">Kho bán lẻ</SelectItem>
                          <SelectItem value="staging">Kho staging</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="inv-reference">Reference Doc</Label>
                      <Input name="refDoc" placeholder="Số chứng từ" />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    📦 Update Inventory
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Compliance Check */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Compliance Check
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="comp-domain">Compliance Domain *</Label>
                      <Select name="domain" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Lĩnh vực" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tax">Thuế</SelectItem>
                          <SelectItem value="labor">Lao động</SelectItem>
                          <SelectItem value="food_safety">An toàn thực phẩm</SelectItem>
                          <SelectItem value="environment">Môi trường</SelectItem>
                          <SelectItem value="data_privacy">Bảo mật dữ liệu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="comp-score">Compliance Score *</Label>
                      <Input name="score" type="number" min="0" max="100" placeholder="Điểm (0-100)" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="comp-issues">Issues Found</Label>
                    <Textarea name="issues" placeholder="Các vấn đề phát hiện (nếu có)..." rows={3} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="comp-nextDue">Next Due Date</Label>
                      <Input name="nextDue" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="comp-evidence">Evidence File</Label>
                      <Button type="button" variant="outline" className="w-full">
                        📎 Upload Evidence
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    🛡️ Submit Compliance
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Strategic & IT Forms */}
        <TabsContent value="strategic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strategic Project */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Strategic Project
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="proj-title">Project Title *</Label>
                    <Input name="title" placeholder="Tên dự án chiến lược" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="proj-type">Project Type *</Label>
                      <Select name="type" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Loại dự án" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rd">R&D</SelectItem>
                          <SelectItem value="expansion">Market Expansion</SelectItem>
                          <SelectItem value="ma">M&A</SelectItem>
                          <SelectItem value="optimization">Process Optimization</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="proj-owner">Project Owner *</Label>
                      <Input name="owner" placeholder="Người phụ trách" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="proj-budget">Budget *</Label>
                      <Input name="budget" type="number" placeholder="Ngân sách (VNĐ)" required />
                    </div>
                    <div>
                      <Label htmlFor="proj-timeline">Timeline</Label>
                      <Input name="timeline" placeholder="Q1 2024, 6 months..." />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="proj-milestones">Key Milestones</Label>
                    <Textarea name="milestones" placeholder="Các mốc quan trọng..." rows={3} />
                  </div>

                  <Button type="submit" className="w-full">
                    🎯 Create Project
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* IT System Update */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Cog className="h-5 w-5" />
                  IT System Update
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="it-system">System *</Label>
                      <Select name="system" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Hệ thống" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pos">POS System</SelectItem>
                          <SelectItem value="erp">ERP System</SelectItem>
                          <SelectItem value="crm">CRM</SelectItem>
                          <SelectItem value="accounting">Accounting Software</SelectItem>
                          <SelectItem value="website">Website</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="it-status">Status *</Label>
                      <Select name="status" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="offline">Offline</SelectItem>
                          <SelectItem value="error">Error</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="it-uptime">Uptime %</Label>
                      <Input name="uptime" type="number" step="0.1" min="0" max="100" placeholder="99.5" />
                    </div>
                    <div>
                      <Label htmlFor="it-version">Version</Label>
                      <Input name="version" placeholder="v2.1.0" />
                    </div>
                    <div>
                      <Label htmlFor="it-users">Active Users</Label>
                      <Input name="users" type="number" placeholder="25" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="it-incident">Incident Reference</Label>
                    <Input name="incident" placeholder="Incident ID (nếu có)" />
                  </div>

                  <div>
                    <Label htmlFor="it-notes">Technical Notes</Label>
                    <Textarea name="notes" placeholder="Ghi chú kỹ thuật..." rows={3} />
                  </div>

                  <Button type="submit" className="w-full">
                    ⚙️ Update System Status
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Auto-link & Validation Status */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            🔄 Auto-link & Realtime Sync Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">✓ Supabase Realtime</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">🔗 Auto-link Orders→Inventory</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-100 text-purple-800">🤖 AI Form Validation</Badge>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Mọi dữ liệu nhập sẽ tự động đồng bộ với 9 phòng ban và Trung tâm báo cáo BMC trong vòng 3 giây.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}