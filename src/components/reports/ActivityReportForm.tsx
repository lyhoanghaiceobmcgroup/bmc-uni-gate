import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useAIAgent } from '@/hooks/useAIAgent';
import { realtimeService } from '@/services/realtimeService';
import {
  Upload, FileText, DollarSign, TrendingUp, Clock,
  CheckCircle, AlertCircle, XCircle, ArrowLeft, Save
} from 'lucide-react';

interface ReportData {
  company: string;
  department: string;
  reportType: string;
  revenue: string;
  kpiValue: string;
  kpiUnit: string;
  workStatus: 'in_progress' | 'completed' | 'delayed';
  description: string;
  attachments: File[];
}

const ActivityReportForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, canAccessDepartment } = useAuth();
  const { isProcessing: aiProcessing, processReport, lastProcessedReport } = useAIAgent();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportData, setReportData] = useState<ReportData>({
    company: user?.company || '',
    department: user?.department || '',
    reportType: '',
    revenue: '',
    kpiValue: '',
    kpiUnit: '',
    workStatus: 'in_progress',
    description: '',
    attachments: []
  });

  useEffect(() => {
    // Set department from navigation state if available
    const selectedDepartment = location.state?.selectedDepartment;
    if (selectedDepartment) {
      setReportData(prev => ({ ...prev, department: selectedDepartment }));
    }
  }, [location.state]);

  const departments = [
    'Thông tin Cổ đông',
    'Kinh doanh - Marketing',
    'Tài chính',
    'Kế toán',
    'Nhân sự - Đào tạo',
    'Sản xuất - Kho vận',
    'Chiến lược - R&D',
    'Công nghệ - Hạ tầng số',
    'Pháp chế - Tuân thủ',
    'Đầu tư - Quỹ'
  ];

  const reportTypes = {
    'Kinh doanh - Marketing': ['Báo cáo doanh số', 'Báo cáo khách hàng mới', 'Báo cáo chiến dịch marketing'],
    'Tài chính': ['Báo cáo ngân sách', 'Báo cáo dòng tiền', 'Báo cáo đầu tư', 'Báo cáo phân tích tài chính'],
    'Kế toán': ['Báo cáo thu chi', 'Báo cáo công nợ', 'Báo cáo lợi nhuận', 'Báo cáo thuế'],
    'Nhân sự - Đào tạo': ['Báo cáo tuyển dụng', 'Báo cáo đào tạo', 'Báo cáo hiệu suất nhân viên'],
    'Sản xuất': ['Báo cáo sản lượng', 'Báo cáo chất lượng', 'Báo cáo hiệu suất máy móc'],
    'Kho vận': ['Báo cáo tồn kho', 'Báo cáo xuất nhập kho', 'Báo cáo logistics'],
    'Chiến lược - R&D': ['Báo cáo nghiên cứu', 'Báo cáo phát triển sản phẩm', 'Báo cáo thị trường'],
    'Công nghệ - Hạ tầng số': ['Báo cáo hệ thống', 'Báo cáo bảo mật', 'Báo cáo phát triển phần mềm'],
    'Pháp chế - Tuân thủ': ['Báo cáo pháp lý', 'Báo cáo tuân thủ', 'Báo cáo rủi ro'],
    'Đầu tư - Quỹ': ['Báo cáo đầu tư', 'Báo cáo quỹ', 'Báo cáo hiệu quả vốn'],
    'Thông tin Cổ đông': ['Báo cáo cổ đông', 'Báo cáo họp đại hội', 'Báo cáo cổ tức']
  };

  const kpiUnits = ['VNĐ', 'USD', 'Khách hàng', 'Hợp đồng', 'Sản phẩm', '%', 'Giờ', 'Ngày'];

  const handleInputChange = (field: keyof ReportData, value: string) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setReportData(prev => ({ ...prev, attachments: [...prev.attachments, ...files] }));
  };

  const removeFile = (index: number) => {
    setReportData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canAccessDepartment(reportData.department)) {
      toast({
        title: "Không có quyền truy cập",
        description: `Bạn không có quyền báo cáo cho ${reportData.department}`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for AI Agent processing
      const aiReportData = {
        userId: user?.id || 'unknown',
        userName: user?.name || 'Unknown User',
        userRole: user?.role || 'employee',
        company: reportData.company,
        department: reportData.department,
        reportType: reportData.reportType,
        revenue: parseFloat(reportData.revenue) || 0,
        kpiValue: parseFloat(reportData.kpiValue) || 0,
        kpiUnit: reportData.kpiUnit,
        workStatus: reportData.workStatus as 'in_progress' | 'completed' | 'delayed',
        description: reportData.description,
        attachments: reportData.attachments,
        submittedAt: new Date().toISOString()
      };
      
      // Process report with AI Agent
      const processedReport = await processReport(aiReportData);
      
      if (processedReport) {
        // Publish to realtime for department managers
        if (user?.department) {
          try {
            await realtimeService.publishEmployeeReport(
              aiReportData,
              user.id,
              user.department
            );
            
            // Send notification to department manager
            await realtimeService.publishNotification(
              {
                title: 'Báo cáo mới từ nhân viên',
                message: `${user.name} đã gửi báo cáo ${reportData.reportType}`,
                type: 'report_submitted',
                reportData: aiReportData
              },
              'manager_' + user.department, // Assuming manager ID format
              user.id
            );
          } catch (error) {
            console.error('Failed to publish realtime update:', error);
          }
        }
        
        // Show AI insights
        toast({
          title: "🤖 AI Agent đã phân tích báo cáo!",
          description: `Mức độ rủi ro: ${processedReport.riskLevel.toUpperCase()}. Impact: Phòng ban ${processedReport.departmentImpact}%, Công ty ${processedReport.companyImpact}%`,
        });
        
        // Reset form
        setReportData({
          company: user?.company || '',
          department: user?.department || '',
          reportType: '',
          revenue: '',
          kpiValue: '',
          kpiUnit: '',
          workStatus: 'in_progress',
          description: '',
          attachments: []
        });
        
        // Navigate back to dashboard after a delay to show AI results
        setTimeout(() => {
          navigate('/dashboard/personal');
        }, 3000);
      }
      
    } catch (error) {
      toast({
        title: "Lỗi gửi báo cáo",
        description: "Đã xảy ra lỗi khi gửi báo cáo. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'delayed': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/personal')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nhập Báo Cáo Hoạt Động</h1>
          <p className="text-gray-600">Nhập thông tin báo cáo công việc và KPI của bạn</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company & Department */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Thông tin cơ bản
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Công ty/Dự án</Label>
                      <Input
                        id="company"
                        value={reportData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">Phòng ban</Label>
                      <Select
                        value={reportData.department}
                        onValueChange={(value) => handleInputChange('department', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn phòng ban" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments
                            .filter(dept => canAccessDepartment(dept))
                            .map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="reportType">Loại báo cáo</Label>
                    <Select
                      value={reportData.reportType}
                      onValueChange={(value) => handleInputChange('reportType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại báo cáo" />
                      </SelectTrigger>
                      <SelectContent>
                        {reportData.department && reportTypes[reportData.department as keyof typeof reportTypes]?.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* KPI & Revenue */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Số liệu & KPI
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="revenue">Doanh số (VNĐ)</Label>
                    <Input
                      id="revenue"
                      type="number"
                      placeholder="Ví dụ: 50000000"
                      value={reportData.revenue}
                      onChange={(e) => handleInputChange('revenue', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="kpiValue">Giá trị KPI</Label>
                      <Input
                        id="kpiValue"
                        type="number"
                        placeholder="Ví dụ: 2"
                        value={reportData.kpiValue}
                        onChange={(e) => handleInputChange('kpiValue', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="kpiUnit">Đơn vị KPI</Label>
                      <Select
                        value={reportData.kpiUnit}
                        onValueChange={(value) => handleInputChange('kpiUnit', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn đơn vị" />
                        </SelectTrigger>
                        <SelectContent>
                          {kpiUnits.map((unit) => (
                            <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Work Status & Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Trạng thái & Mô tả
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="workStatus">Trạng thái công việc</Label>
                    <Select
                      value={reportData.workStatus}
                      onValueChange={(value: 'in_progress' | 'completed' | 'delayed') => 
                        handleInputChange('workStatus', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in_progress">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            Đang làm
                          </div>
                        </SelectItem>
                        <SelectItem value="completed">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Hoàn thành
                          </div>
                        </SelectItem>
                        <SelectItem value="delayed">
                          <div className="flex items-center">
                            <XCircle className="h-4 w-4 mr-2" />
                            Delay
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Mô tả chi tiết</Label>
                    <Textarea
                      id="description"
                      placeholder="Mô tả chi tiết về công việc, kết quả đạt được, khó khăn gặp phải..."
                      value={reportData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* File Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    Tài liệu đính kèm
                  </CardTitle>
                  <CardDescription>
                    Upload hợp đồng, báo cáo Excel, hình ảnh...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-sm text-gray-600">Nhấn để chọn file</span>
                        <Input
                          id="file-upload"
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </Label>
                    </div>
                    
                    {reportData.attachments.length > 0 && (
                      <div className="space-y-2">
                        {reportData.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2" />
                              <span className="text-sm truncate">{file.name}</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Tóm tắt báo cáo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Phòng ban:</span>
                    <span className="text-sm font-medium">{reportData.department || 'Chưa chọn'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Doanh số:</span>
                    <span className="text-sm font-medium">
                      {reportData.revenue ? `${parseInt(reportData.revenue).toLocaleString()} VNĐ` : '0 VNĐ'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">KPI:</span>
                    <span className="text-sm font-medium">
                      {reportData.kpiValue} {reportData.kpiUnit}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Trạng thái:</span>
                    <Badge className={getStatusColor(reportData.workStatus)}>
                      {getStatusIcon(reportData.workStatus)}
                      <span className="ml-1">
                        {reportData.workStatus === 'completed' && 'Hoàn thành'}
                        {reportData.workStatus === 'delayed' && 'Delay'}
                        {reportData.workStatus === 'in_progress' && 'Đang làm'}
                      </span>
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">File đính kèm:</span>
                    <span className="text-sm font-medium">{reportData.attachments.length} file</span>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || aiProcessing || !reportData.department || !reportData.reportType}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                {isSubmitting || aiProcessing ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    {aiProcessing ? 'AI đang xử lý...' : 'Đang gửi báo cáo...'}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Gửi báo cáo
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityReportForm;