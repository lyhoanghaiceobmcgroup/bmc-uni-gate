import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Building2, Users, FileText, Percent, User, Briefcase, Target, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface ProjectRegistrationData {
  // Thông tin cơ bản dự án/công ty
  projectName: string;
  companyName: string;
  taxId: string;
  industry: string;
  businessField: string;
  
  // Thông tin vốn góp
  bmcEquityPercentage: number;
  totalCapital: string;
  bmcInvestmentAmount: string;
  
  // Người đại diện pháp luật
  legalRepName: string;
  legalRepPosition: string;
  legalRepPhone: string;
  legalRepEmail: string;
  
  // Cổ đông chính
  mainShareholders: string;
  shareholderStructure: string;
  
  // Thông tin khởi tạo
  mainProducts: string;
  businessObjectives: string;
  marketTarget: string;
  competitiveAdvantage: string;
  
  // Tài liệu đính kèm
  businessLicense: boolean;
  financialStatements: boolean;
  businessPlan: boolean;
  legalDocuments: boolean;
}

const ProjectRegistrationForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProjectRegistrationData>({
    projectName: '',
    companyName: '',
    taxId: '',
    industry: '',
    businessField: '',
    bmcEquityPercentage: 15,
    totalCapital: '',
    bmcInvestmentAmount: '',
    legalRepName: '',
    legalRepPosition: '',
    legalRepPhone: '',
    legalRepEmail: '',
    mainShareholders: '',
    shareholderStructure: '',
    mainProducts: '',
    businessObjectives: '',
    marketTarget: '',
    competitiveAdvantage: '',
    businessLicense: false,
    financialStatements: false,
    businessPlan: false,
    legalDocuments: false
  });

  const industries = [
    'Công nghệ thông tin',
    'Tài chính - Ngân hàng',
    'Bất động sản',
    'Sản xuất',
    'Thương mại - Dịch vụ',
    'Y tế - Dược phẩm',
    'Giáo dục - Đào tạo',
    'Nông nghiệp',
    'Du lịch - Khách sạn',
    'Vận tải - Logistics',
    'Năng lượng',
    'Khác'
  ];

  const handleInputChange = (field: keyof ProjectRegistrationData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Tự động tính toán số tiền đầu tư BMC
    if (field === 'totalCapital' || field === 'bmcEquityPercentage') {
      const capital = field === 'totalCapital' ? parseFloat(value.replace(/[^0-9]/g, '')) : parseFloat(formData.totalCapital.replace(/[^0-9]/g, ''));
      const percentage = field === 'bmcEquityPercentage' ? value : formData.bmcEquityPercentage;
      
      if (capital && percentage) {
        const investmentAmount = (capital * percentage / 100).toLocaleString('vi-VN');
        setFormData(prev => ({
          ...prev,
          bmcInvestmentAmount: investmentAmount + ' VNĐ'
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validation
      if (!formData.projectName || !formData.companyName || !formData.taxId) {
        toast({
          title: "Lỗi validation",
          description: "Vui lòng điền đầy đủ thông tin bắt buộc",
          variant: "destructive"
        });
        return;
      }
      
      // Simulate API call to submit application
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create application object
      const registrationId = `REG_${Date.now()}`;
      const applicationData = {
        ...formData,
        registrationId,
        status: 'pending_review',
        submittedAt: new Date().toISOString(),
        aiAnalysisStatus: 'pending',
        boardReviewStatus: 'pending'
      };
      
      // Save to localStorage for demo
      localStorage.setItem(`project_registration_${registrationId}`, JSON.stringify(applicationData));
      
      // Show success message with next steps
      toast({
        title: "Đăng ký thành công!",
        description: `Hồ sơ đã được gửi với mã số: ${registrationId}\n\nQuy trình tiếp theo:\n1. AI Legal Agent sẽ phân tích hồ sơ (2-5 phút)\n2. Ban quản trị BMC xem xét (1-2 ngày)\n3. Thông báo kết quả qua email\n\nBạn có thể theo dõi tiến độ tại trang Admin.`,
      });
      
      // Reset form
      setFormData({
        projectName: '',
        companyName: '',
        taxId: '',
        industry: '',
        businessField: '',
        bmcEquityPercentage: 15,
        totalCapital: '',
        bmcInvestmentAmount: '',
        legalRepName: '',
        legalRepPosition: '',
        legalRepPhone: '',
        legalRepEmail: '',
        mainShareholders: '',
        shareholderStructure: '',
        mainProducts: '',
        businessObjectives: '',
        marketTarget: '',
        competitiveAdvantage: '',
        businessLicense: false,
        financialStatements: false,
        businessPlan: false,
        legalDocuments: false
      });
      
    } catch (error) {
      toast({
        title: "Lỗi hệ thống",
        description: "Có lỗi xảy ra khi gửi đăng ký. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Quay trở lại
              </Button>
              <div></div>
            </div>
            <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center gap-3">
              <Building2 className="h-8 w-8" />
              Đăng Ký Dự Án/Công Ty BMC ERP-AI
            </CardTitle>
            <p className="text-muted-foreground mt-2 text-center">
              Đăng ký hồ sơ doanh nghiệp để tham gia hệ sinh thái BMC Holdings
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Thông tin cơ bản */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  <h3 className="text-xl font-semibold">Thông tin cơ bản</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectName" className="text-sm font-medium">Tên dự án *</Label>
                    <Input
                      id="projectName"
                      placeholder="Dự án phát triển công nghệ AI..."
                      value={formData.projectName}
                      onChange={(e) => handleInputChange('projectName', e.target.value)}
                      className="h-11"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-sm font-medium">Tên công ty *</Label>
                    <Input
                      id="companyName"
                      placeholder="Công ty TNHH ABC Technology"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="h-11"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="taxId" className="text-sm font-medium">Mã số thuế *</Label>
                    <Input
                      id="taxId"
                      placeholder="0123456789"
                      value={formData.taxId}
                      onChange={(e) => handleInputChange('taxId', e.target.value)}
                      className="h-11"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-sm font-medium">Ngành nghề *</Label>
                    <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Chọn ngành nghề" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="businessField" className="text-sm font-medium">Lĩnh vực kinh doanh cụ thể</Label>
                    <Textarea
                      id="businessField"
                      placeholder="Mô tả chi tiết lĩnh vực kinh doanh, sản phẩm/dịch vụ chính..."
                      value={formData.businessField}
                      onChange={(e) => handleInputChange('businessField', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              
              {/* Thông tin vốn góp */}
              <div className="space-y-6 p-6 border rounded-xl bg-gradient-to-r from-green-50/50 to-emerald-50/50 border-green-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <Percent className="h-6 w-6 text-green-600" />
                  <h3 className="text-xl font-semibold text-green-900">Thông tin vốn góp BMC</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="totalCapital" className="text-sm font-medium">Tổng vốn dự án (VNĐ)</Label>
                    <Input
                      id="totalCapital"
                      placeholder="1,000,000,000"
                      value={formData.totalCapital}
                      onChange={(e) => handleInputChange('totalCapital', e.target.value)}
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bmcEquityPercentage" className="text-sm font-medium">Tỷ lệ vốn góp BMC (%)</Label>
                    <Input
                      id="bmcEquityPercentage"
                      type="number"
                      min="10"
                      max="20"
                      value={formData.bmcEquityPercentage}
                      onChange={(e) => handleInputChange('bmcEquityPercentage', parseInt(e.target.value))}
                      className="h-11"
                    />
                    <p className="text-xs text-muted-foreground">Từ 10% - 20%</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bmcInvestmentAmount" className="text-sm font-medium">Số tiền BMC đầu tư</Label>
                    <Input
                      id="bmcInvestmentAmount"
                      value={formData.bmcInvestmentAmount}
                      className="h-11 bg-muted"
                      readOnly
                    />
                    <p className="text-xs text-muted-foreground">Tự động tính toán</p>
                  </div>
                </div>
              </div>
              
              {/* Người đại diện pháp luật */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <User className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-semibold">Người đại diện pháp luật</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="legalRepName" className="text-sm font-medium">Họ và tên *</Label>
                    <Input
                      id="legalRepName"
                      placeholder="Nguyễn Văn A"
                      value={formData.legalRepName}
                      onChange={(e) => handleInputChange('legalRepName', e.target.value)}
                      className="h-11"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="legalRepPosition" className="text-sm font-medium">Chức vụ</Label>
                    <Input
                      id="legalRepPosition"
                      placeholder="Tổng Giám đốc"
                      value={formData.legalRepPosition}
                      onChange={(e) => handleInputChange('legalRepPosition', e.target.value)}
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="legalRepPhone" className="text-sm font-medium">Số điện thoại</Label>
                    <Input
                      id="legalRepPhone"
                      placeholder="0901234567"
                      value={formData.legalRepPhone}
                      onChange={(e) => handleInputChange('legalRepPhone', e.target.value)}
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="legalRepEmail" className="text-sm font-medium">Email</Label>
                    <Input
                      id="legalRepEmail"
                      type="email"
                      placeholder="ceo@company.com"
                      value={formData.legalRepEmail}
                      onChange={(e) => handleInputChange('legalRepEmail', e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>
              </div>
              
              {/* Cổ đông chính */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                  <h3 className="text-xl font-semibold">Cổ đông chính</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="mainShareholders" className="text-sm font-medium">Danh sách cổ đông chính</Label>
                    <Textarea
                      id="mainShareholders"
                      placeholder="1. Nguyễn Văn A - 40%\n2. Trần Thị B - 30%\n3. BMC Holdings - 15%\n4. Khác - 15%"
                      value={formData.mainShareholders}
                      onChange={(e) => handleInputChange('mainShareholders', e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shareholderStructure" className="text-sm font-medium">Cơ cấu cổ đông chi tiết</Label>
                    <Textarea
                      id="shareholderStructure"
                      placeholder="Mô tả chi tiết về cơ cấu sở hữu, quyền biểu quyết, cam kết đầu tư..."
                      value={formData.shareholderStructure}
                      onChange={(e) => handleInputChange('shareholderStructure', e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </div>
              
              {/* Thông tin khởi tạo */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-6 w-6 text-orange-600" />
                  <h3 className="text-xl font-semibold">Thông tin khởi tạo dự án</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="mainProducts" className="text-sm font-medium">Sản phẩm/Dịch vụ chính</Label>
                    <Textarea
                      id="mainProducts"
                      placeholder="Mô tả các sản phẩm, dịch vụ chính của dự án..."
                      value={formData.mainProducts}
                      onChange={(e) => handleInputChange('mainProducts', e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessObjectives" className="text-sm font-medium">Mục tiêu kinh doanh</Label>
                    <Textarea
                      id="businessObjectives"
                      placeholder="Mục tiêu doanh thu, lợi nhuận, thị phần trong 3-5 năm tới..."
                      value={formData.businessObjectives}
                      onChange={(e) => handleInputChange('businessObjectives', e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="marketTarget" className="text-sm font-medium">Thị trường mục tiêu</Label>
                    <Textarea
                      id="marketTarget"
                      placeholder="Khách hàng mục tiêu, quy mô thị trường, kế hoạch mở rộng..."
                      value={formData.marketTarget}
                      onChange={(e) => handleInputChange('marketTarget', e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="competitiveAdvantage" className="text-sm font-medium">Lợi thế cạnh tranh</Label>
                    <Textarea
                      id="competitiveAdvantage"
                      placeholder="Điểm mạnh, lợi thế so với đối thủ, yếu tố khác biệt..."
                      value={formData.competitiveAdvantage}
                      onChange={(e) => handleInputChange('competitiveAdvantage', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              
              {/* Tài liệu đính kèm */}
              <div className="space-y-6 p-6 border rounded-xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-blue-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-blue-900">Tài liệu đính kèm</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="businessLicense"
                      checked={formData.businessLicense}
                      onCheckedChange={(checked) => handleInputChange('businessLicense', checked)}
                    />
                    <Label htmlFor="businessLicense" className="text-sm font-medium cursor-pointer">
                      Giấy phép kinh doanh
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="financialStatements"
                      checked={formData.financialStatements}
                      onCheckedChange={(checked) => handleInputChange('financialStatements', checked)}
                    />
                    <Label htmlFor="financialStatements" className="text-sm font-medium cursor-pointer">
                      Báo cáo tài chính 2 năm gần nhất
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="businessPlan"
                      checked={formData.businessPlan}
                      onCheckedChange={(checked) => handleInputChange('businessPlan', checked)}
                    />
                    <Label htmlFor="businessPlan" className="text-sm font-medium cursor-pointer">
                      Kế hoạch kinh doanh chi tiết
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="legalDocuments"
                      checked={formData.legalDocuments}
                      onCheckedChange={(checked) => handleInputChange('legalDocuments', checked)}
                    />
                    <Label htmlFor="legalDocuments" className="text-sm font-medium cursor-pointer">
                      Hồ sơ pháp lý khác
                    </Label>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  * Tài liệu sẽ được upload sau khi hồ sơ được duyệt sơ bộ
                </p>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button 
                  type="submit" 
                  className="w-full md:w-auto px-12 h-12 text-base font-semibold" 
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  Gửi đăng ký dự án
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectRegistrationForm;