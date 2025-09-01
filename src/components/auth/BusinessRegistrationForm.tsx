import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Building2, Mail, Phone, MapPin, User, FileText, Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BusinessRegistrationFormProps {
  onBack: () => void;
}

export function BusinessRegistrationForm({ onBack }: BusinessRegistrationFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    companyName: "",
    taxCode: "",
    businessType: "",
    industry: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    representativeName: "",
    representativePosition: "",
    representativePhone: "",
    representativeEmail: "",
    businessLicense: "",
    bankAccount: "",
    bankName: "",
    employeeCount: "",
    annualRevenue: "",
    businessDescription: "",
    expectedModules: [] as string[],
    requestReason: ""
  });

  const industries = [
    "Công nghệ thông tin",
    "Sản xuất",
    "Thương mại",
    "Dịch vụ",
    "Tài chính - Ngân hàng",
    "Bất động sản",
    "Y tế",
    "Giáo dục",
    "Logistics",
    "Khác"
  ];

  const businessTypes = [
    "Công ty TNHH",
    "Công ty Cổ phần",
    "Doanh nghiệp tư nhân",
    "Hợp tác xã",
    "Chi nhánh",
    "Văn phòng đại diện"
  ];

  const modules = [
    "Tài chính",
    "Kế toán",
    "Nhân sự - Lương",
    "Bán hàng - CRM",
    "Kho vận",
    "Sản xuất",
    "Dự án",
    "Báo cáo",
    "AI Assistant"
  ];

  const handleModuleToggle = (module: string) => {
    setFormData(prev => ({
      ...prev,
      expectedModules: prev.expectedModules.includes(module)
        ? prev.expectedModules.filter(m => m !== module)
        : [...prev.expectedModules, module]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email || !formData.representativeName) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Giả lập gửi email đến hệ thống
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Đăng ký thành công!",
        description: "Yêu cầu đăng ký doanh nghiệp đã được gửi. Chúng tôi sẽ liên hệ trong 24h."
      });
      
      onBack();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra, vui lòng thử lại",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Building2 className="w-6 h-6" />
              Đăng Ký Doanh Nghiệp BMC ERP-AI
            </CardTitle>
            <div></div>
          </div>
          <p className="text-muted-foreground">
            Điền thông tin để đăng ký tài khoản doanh nghiệp và truy cập hệ thống ERP-AI
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Thông tin doanh nghiệp
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Tên công ty *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Công ty TNHH ABC"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxCode">Mã số thuế</Label>
                  <Input
                    id="taxCode"
                    value={formData.taxCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, taxCode: e.target.value }))}
                    placeholder="0123456789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Loại hình doanh nghiệp</Label>
                  <Select value={formData.businessType} onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại hình" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Ngành nghề</Label>
                  <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn ngành nghề" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Số 123, Đường ABC, Quận XYZ, TP. Hồ Chí Minh"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Điện thoại</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="0901234567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="info@company.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://company.com"
                  />
                </div>
              </div>
            </div>

            {/* Representative Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5" />
                Thông tin người đại diện
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="representativeName">Họ tên *</Label>
                  <Input
                    id="representativeName"
                    value={formData.representativeName}
                    onChange={(e) => setFormData(prev => ({ ...prev, representativeName: e.target.value }))}
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="representativePosition">Chức vụ</Label>
                  <Input
                    id="representativePosition"
                    value={formData.representativePosition}
                    onChange={(e) => setFormData(prev => ({ ...prev, representativePosition: e.target.value }))}
                    placeholder="Giám đốc"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="representativePhone">Điện thoại</Label>
                  <Input
                    id="representativePhone"
                    value={formData.representativePhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, representativePhone: e.target.value }))}
                    placeholder="0901234567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="representativeEmail">Email</Label>
                  <Input
                    id="representativeEmail"
                    type="email"
                    value={formData.representativeEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, representativeEmail: e.target.value }))}
                    placeholder="director@company.com"
                  />
                </div>
              </div>
            </div>

            {/* Business Scale */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quy mô doanh nghiệp</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeCount">Số lượng nhân viên</Label>
                  <Select value={formData.employeeCount} onValueChange={(value) => setFormData(prev => ({ ...prev, employeeCount: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn quy mô" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 người</SelectItem>
                      <SelectItem value="11-50">11-50 người</SelectItem>
                      <SelectItem value="51-200">51-200 người</SelectItem>
                      <SelectItem value="201-500">201-500 người</SelectItem>
                      <SelectItem value="500+">Trên 500 người</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualRevenue">Doanh thu năm</Label>
                  <Select value={formData.annualRevenue} onValueChange={(value) => setFormData(prev => ({ ...prev, annualRevenue: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn mức doanh thu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-1b">Dưới 1 tỷ</SelectItem>
                      <SelectItem value="1b-10b">1-10 tỷ</SelectItem>
                      <SelectItem value="10b-50b">10-50 tỷ</SelectItem>
                      <SelectItem value="50b-200b">50-200 tỷ</SelectItem>
                      <SelectItem value="over-200b">Trên 200 tỷ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Expected Modules */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Module mong muốn sử dụng</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {modules.map(module => (
                  <Badge
                    key={module}
                    variant={formData.expectedModules.includes(module) ? "default" : "outline"}
                    className="cursor-pointer justify-center p-2"
                    onClick={() => handleModuleToggle(module)}
                  >
                    {module}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Business Description & Request Reason */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessDescription">Mô tả hoạt động kinh doanh</Label>
                <Textarea
                  id="businessDescription"
                  value={formData.businessDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessDescription: e.target.value }))}
                  placeholder="Mô tả ngắn gọn về hoạt động kinh doanh chính của công ty..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requestReason">Lý do đăng ký ERP-AI</Label>
                <Textarea
                  id="requestReason"
                  value={formData.requestReason}
                  onChange={(e) => setFormData(prev => ({ ...prev, requestReason: e.target.value }))}
                  placeholder="Mô tả lý do muốn sử dụng hệ thống ERP-AI của BMC và mong đợi..."
                  rows={3}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
              size="lg"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Mail className="mr-2 h-4 w-4" />
              Gửi đăng ký doanh nghiệp
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}