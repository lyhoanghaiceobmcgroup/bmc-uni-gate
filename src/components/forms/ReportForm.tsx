import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Building2, DollarSign, Users, TrendingUp, Calendar, Save, Send } from "lucide-react";

interface ReportFormProps {
  companyInfo?: {
    name: string;
    taxId: string;
    code: string;
  };
  onClose: () => void;
}

export function ReportForm({ companyInfo, onClose }: ReportFormProps) {
  const [activeTab, setActiveTab] = useState("financial");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Financial Report
    revenue: "",
    expenses: "",
    profit: "",
    quarter: "",
    year: new Date().getFullYear().toString(),
    
    // HR Report
    totalEmployees: "",
    newHires: "",
    resignations: "",
    avgSalary: "",
    
    // Operations Report
    productionVolume: "",
    salesVolume: "",
    customerSatisfaction: "",
    marketShare: "",
    
    // Compliance Report
    taxCompliance: "compliant",
    laborCompliance: "compliant",
    environmentalCompliance: "compliant",
    notes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (type: string) => {
    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      console.log(`${type} report submitted:`, formData);
      setIsSubmitting(false);
      // Show success message or redirect
    }, 2000);
  };

  const reportTypes = [
    { id: "financial", name: "Báo cáo Tài chính", icon: DollarSign, color: "text-green-600" },
    { id: "hr", name: "Báo cáo Nhân sự", icon: Users, color: "text-blue-600" },
    { id: "operations", name: "Báo cáo Vận hành", icon: TrendingUp, color: "text-purple-600" },
    { id: "compliance", name: "Báo cáo Tuân thủ", icon: FileText, color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle className="text-2xl">Form Báo cáo BMC ERP-AI</CardTitle>
                  {companyInfo && (
                    <p className="text-sm text-muted-foreground mt-1">
                      <Building2 className="inline h-4 w-4 mr-1" />
                      {companyInfo.name} ({companyInfo.taxId})
                    </p>
                  )}
                </div>
              </div>
              <Button variant="outline" onClick={onClose}>
                Đóng
              </Button>
            </div>
            <p className="text-muted-foreground">
              Điền thông tin báo cáo theo từng lĩnh vực. Dữ liệu sẽ được đồng bộ với hệ thống ERP-AI.
            </p>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                {reportTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <TabsTrigger key={type.id} value={type.id} className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${type.color}`} />
                      <span className="hidden sm:inline">{type.name}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {/* Financial Report */}
              <TabsContent value="financial" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      Báo cáo Tài chính
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quarter">Quý báo cáo</Label>
                        <Select value={formData.quarter} onValueChange={(value) => handleInputChange('quarter', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn quý" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Q1">Quý 1 (1-3)</SelectItem>
                            <SelectItem value="Q2">Quý 2 (4-6)</SelectItem>
                            <SelectItem value="Q3">Quý 3 (7-9)</SelectItem>
                            <SelectItem value="Q4">Quý 4 (10-12)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year">Năm</Label>
                        <Input
                          id="year"
                          type="number"
                          value={formData.year}
                          onChange={(e) => handleInputChange('year', e.target.value)}
                          placeholder="2024"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="revenue">Doanh thu (VNĐ)</Label>
                        <Input
                          id="revenue"
                          type="number"
                          value={formData.revenue}
                          onChange={(e) => handleInputChange('revenue', e.target.value)}
                          placeholder="1000000000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expenses">Chi phí (VNĐ)</Label>
                        <Input
                          id="expenses"
                          type="number"
                          value={formData.expenses}
                          onChange={(e) => handleInputChange('expenses', e.target.value)}
                          placeholder="800000000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profit">Lợi nhuận (VNĐ)</Label>
                        <Input
                          id="profit"
                          type="number"
                          value={formData.profit}
                          onChange={(e) => handleInputChange('profit', e.target.value)}
                          placeholder="200000000"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleSubmit('financial')} disabled={isSubmitting}>
                        <Save className="h-4 w-4 mr-2" />
                        Lưu nháp
                      </Button>
                      <Button onClick={() => handleSubmit('financial')} disabled={isSubmitting} variant="default">
                        <Send className="h-4 w-4 mr-2" />
                        Gửi báo cáo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* HR Report */}
              <TabsContent value="hr" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      Báo cáo Nhân sự
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="totalEmployees">Tổng số nhân viên</Label>
                        <Input
                          id="totalEmployees"
                          type="number"
                          value={formData.totalEmployees}
                          onChange={(e) => handleInputChange('totalEmployees', e.target.value)}
                          placeholder="150"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newHires">Tuyển mới</Label>
                        <Input
                          id="newHires"
                          type="number"
                          value={formData.newHires}
                          onChange={(e) => handleInputChange('newHires', e.target.value)}
                          placeholder="10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="resignations">Nghỉ việc</Label>
                        <Input
                          id="resignations"
                          type="number"
                          value={formData.resignations}
                          onChange={(e) => handleInputChange('resignations', e.target.value)}
                          placeholder="5"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="avgSalary">Lương TB (VNĐ)</Label>
                        <Input
                          id="avgSalary"
                          type="number"
                          value={formData.avgSalary}
                          onChange={(e) => handleInputChange('avgSalary', e.target.value)}
                          placeholder="15000000"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleSubmit('hr')} disabled={isSubmitting}>
                        <Save className="h-4 w-4 mr-2" />
                        Lưu nháp
                      </Button>
                      <Button onClick={() => handleSubmit('hr')} disabled={isSubmitting} variant="default">
                        <Send className="h-4 w-4 mr-2" />
                        Gửi báo cáo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Operations Report */}
              <TabsContent value="operations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      Báo cáo Vận hành
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="productionVolume">Sản lượng</Label>
                        <Input
                          id="productionVolume"
                          type="number"
                          value={formData.productionVolume}
                          onChange={(e) => handleInputChange('productionVolume', e.target.value)}
                          placeholder="1000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salesVolume">Doanh số bán</Label>
                        <Input
                          id="salesVolume"
                          type="number"
                          value={formData.salesVolume}
                          onChange={(e) => handleInputChange('salesVolume', e.target.value)}
                          placeholder="950"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customerSatisfaction">Hài lòng KH (%)</Label>
                        <Input
                          id="customerSatisfaction"
                          type="number"
                          value={formData.customerSatisfaction}
                          onChange={(e) => handleInputChange('customerSatisfaction', e.target.value)}
                          placeholder="95"
                          max="100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="marketShare">Thị phần (%)</Label>
                        <Input
                          id="marketShare"
                          type="number"
                          value={formData.marketShare}
                          onChange={(e) => handleInputChange('marketShare', e.target.value)}
                          placeholder="15"
                          max="100"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleSubmit('operations')} disabled={isSubmitting}>
                        <Save className="h-4 w-4 mr-2" />
                        Lưu nháp
                      </Button>
                      <Button onClick={() => handleSubmit('operations')} disabled={isSubmitting} variant="default">
                        <Send className="h-4 w-4 mr-2" />
                        Gửi báo cáo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Compliance Report */}
              <TabsContent value="compliance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-orange-600" />
                      Báo cáo Tuân thủ
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="taxCompliance">Tuân thủ thuế</Label>
                        <Select value={formData.taxCompliance} onValueChange={(value) => handleInputChange('taxCompliance', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="compliant">✅ Tuân thủ</SelectItem>
                            <SelectItem value="partial">⚠️ Một phần</SelectItem>
                            <SelectItem value="non-compliant">❌ Không tuân thủ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="laborCompliance">Tuân thủ lao động</Label>
                        <Select value={formData.laborCompliance} onValueChange={(value) => handleInputChange('laborCompliance', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="compliant">✅ Tuân thủ</SelectItem>
                            <SelectItem value="partial">⚠️ Một phần</SelectItem>
                            <SelectItem value="non-compliant">❌ Không tuân thủ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="environmentalCompliance">Tuân thủ môi trường</Label>
                        <Select value={formData.environmentalCompliance} onValueChange={(value) => handleInputChange('environmentalCompliance', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="compliant">✅ Tuân thủ</SelectItem>
                            <SelectItem value="partial">⚠️ Một phần</SelectItem>
                            <SelectItem value="non-compliant">❌ Không tuân thủ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Ghi chú bổ sung</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        placeholder="Thêm ghi chú về tình hình tuân thủ, vấn đề cần lưu ý..."
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleSubmit('compliance')} disabled={isSubmitting}>
                        <Save className="h-4 w-4 mr-2" />
                        Lưu nháp
                      </Button>
                      <Button onClick={() => handleSubmit('compliance')} disabled={isSubmitting} variant="default">
                        <Send className="h-4 w-4 mr-2" />
                        Gửi báo cáo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Status Footer */}
            <Card className="mt-6 border-l-4 border-l-primary">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge className="bg-green-100 text-green-800">✓ Tự động lưu</Badge>
                    <Badge className="bg-blue-100 text-blue-800">🔄 Đồng bộ ERP-AI</Badge>
                    <Badge className="bg-purple-100 text-purple-800">📊 Phân tích AI</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Dữ liệu được mã hóa và đồng bộ an toàn với hệ thống BMC ERP-AI
                  </p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}