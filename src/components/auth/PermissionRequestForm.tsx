import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Mail, User, Building2, Phone, FileText, Loader2, ArrowLeft, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PermissionRequestFormProps {
  onBack: () => void;
}

export function PermissionRequestForm({ onBack }: PermissionRequestFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    requestType: "",
    currentRole: "",
    requestedRole: "",
    organization: "",
    department: "",
    fullName: "",
    employeeId: "",
    email: "",
    phone: "",
    managerName: "",
    managerEmail: "",
    currentPermissions: "",
    requestedPermissions: [] as string[],
    businessJustification: "",
    projectDetails: "",
    duration: "",
    urgency: "",
    additionalInfo: ""
  });

  const requestTypes = [
    "Nâng cấp quyền truy cập",
    "Quyền module mới", 
    "Quyền dự án cụ thể",
    "Quyền báo cáo đặc biệt",
    "Quyền admin tạm thời",
    "Quyền cross-department"
  ];

  const urgencyLevels = [
    "Khẩn cấp (trong ngày)",
    "Cao (1-2 ngày)",
    "Bình thường (3-5 ngày)",
    "Thấp (1-2 tuần)"
  ];

  const durationOptions = [
    "Tạm thời (1-7 ngày)",
    "Ngắn hạn (1-3 tháng)",
    "Trung hạn (3-12 tháng)",
    "Dài hạn (trên 12 tháng)",
    "Vĩnh viễn"
  ];

  const availablePermissions = [
    "Xem báo cáo tài chính",
    "Xuất dữ liệu",
    "Phê duyệt đơn hàng",
    "Quản lý nhân sự",
    "Cấu hình hệ thống",
    "Truy cập AI Analytics",
    "Quản lý kho",
    "Báo cáo executive",
    "Admin module",
    "Cross-company view"
  ];

  const handlePermissionToggle = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      requestedPermissions: prev.requestedPermissions.includes(permission)
        ? prev.requestedPermissions.filter(p => p !== permission)
        : [...prev.requestedPermissions, permission]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.requestType || !formData.fullName || !formData.email || !formData.businessJustification) {
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
        title: "Yêu cầu đã được gửi!",
        description: "Yêu cầu nâng quyền đã được gửi đến bộ phận phê duyệt. Chúng tôi sẽ phản hồi trong thời gian sớm nhất."
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
              <ShieldCheck className="w-6 h-6" />
              Yêu Cầu Nâng Quyền BMC ERP-AI
            </CardTitle>
            <div></div>
          </div>
          <p className="text-muted-foreground">
            Gửi yêu cầu nâng cấp quyền truy cập hoặc truy cập module mới
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Request Type */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Loại yêu cầu
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="requestType">Loại yêu cầu *</Label>
                  <Select value={formData.requestType} onValueChange={(value) => setFormData(prev => ({ ...prev, requestType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại yêu cầu" />
                    </SelectTrigger>
                    <SelectContent>
                      {requestTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="urgency">Mức độ ưu tiên</Label>
                  <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn mức độ" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5" />
                Thông tin người yêu cầu
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ tên *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Mã nhân viên</Label>
                  <Input
                    id="employeeId"
                    value={formData.employeeId}
                    onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
                    placeholder="NV001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="employee@company.com"
                    required
                  />
                </div>
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
                  <Label htmlFor="organization">Tổ chức/Công ty</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                    placeholder="BMC Holdings / F1 Company"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Phòng ban</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                    placeholder="Phòng Tài chính"
                  />
                </div>
              </div>
            </div>

            {/* Current & Requested Role */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Vai trò hiện tại & mong muốn</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentRole">Vai trò hiện tại</Label>
                  <Input
                    id="currentRole"
                    value={formData.currentRole}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentRole: e.target.value }))}
                    placeholder="Nhân viên kế toán"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requestedRole">Vai trò yêu cầu</Label>
                  <Input
                    id="requestedRole"
                    value={formData.requestedRole}
                    onChange={(e) => setFormData(prev => ({ ...prev, requestedRole: e.target.value }))}
                    placeholder="Trưởng phòng kế toán"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Thời hạn cấp quyền</Label>
                <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn thời hạn" />
                  </SelectTrigger>
                  <SelectContent>
                    {durationOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Manager Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Thông tin người phê duyệt</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="managerName">Tên quản lý trực tiếp</Label>
                  <Input
                    id="managerName"
                    value={formData.managerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, managerName: e.target.value }))}
                    placeholder="Trần Thị B"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="managerEmail">Email quản lý</Label>
                  <Input
                    id="managerEmail"
                    type="email"
                    value={formData.managerEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, managerEmail: e.target.value }))}
                    placeholder="manager@company.com"
                  />
                </div>
              </div>
            </div>

            {/* Requested Permissions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quyền truy cập yêu cầu</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {availablePermissions.map(permission => (
                  <Badge
                    key={permission}
                    variant={formData.requestedPermissions.includes(permission) ? "default" : "outline"}
                    className="cursor-pointer justify-center p-2"
                    onClick={() => handlePermissionToggle(permission)}
                  >
                    {permission}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Business Justification */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Lý do kinh doanh & chi tiết</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessJustification">Lý do kinh doanh *</Label>
                  <Textarea
                    id="businessJustification"
                    value={formData.businessJustification}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessJustification: e.target.value }))}
                    placeholder="Mô tả lý do cần nâng quyền: tác động đến công việc, dự án, hiệu quả..."
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectDetails">Chi tiết dự án/công việc</Label>
                  <Textarea
                    id="projectDetails"
                    value={formData.projectDetails}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectDetails: e.target.value }))}
                    placeholder="Mô tả dự án hoặc công việc cụ thể cần quyền này..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Thông tin bổ sung</Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                    placeholder="Thông tin khác có thể hỗ trợ việc phê duyệt..."
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-accent mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Lưu ý quan trọng:</p>
                  <p className="text-muted-foreground">
                    Yêu cầu sẽ được gửi đến bộ phận phê duyệt và người quản lý trực tiếp. 
                    Thời gian xử lý phụ thuộc vào mức độ ưu tiên và độ phức tạp của yêu cầu.
                  </p>
                </div>
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
              Gửi yêu cầu nâng quyền
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}