import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar,
  Building2,
  User as UserIcon,
  TrendingUp,
  Phone,
  Users,
  Presentation,
  FileText,
  Upload,
  Save,
  Send,
  Download,
  History,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowLeft,
  Lightbulb,
  Wifi,
  WifiOff,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useSupabase, SalesReportData as SupabaseSalesReportData, AIInsight } from '@/hooks/useSupabase';
import WordExportService from '@/utils/wordExport';
import PermissionService, { User as UserType, MOCK_USERS } from '@/utils/permissions';

interface LocalSalesReportData {
  reportDate: string;
  project: string;
  department: string;
  reporter: string;
  role: string;
  dailyRevenue: string;
  contractsSigned: string;
  newCustomers: string;
  followUpCustomers: string;
  avgCustomerValue: string;
  phoneCalls: boolean;
  directMeetings: boolean;
  productDemos: boolean;
  detailedNotes: string;
  workStatus: 'completed' | 'in-progress' | 'delayed';
  delayReason?: string;
  attachments: File[];
}

const SalesReportForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<LocalSalesReportData>({
    reportDate: new Date().toISOString().split('T')[0],
    project: 'F4-Startup AI Retail',
    department: 'Kinh doanh – Marketing',
    reporter: user?.name || 'Nguyễn Văn A',
    role: user?.role || 'Nhân viên KD',
    dailyRevenue: '125,000,000',
    contractsSigned: '2',
    newCustomers: '8',
    followUpCustomers: '15',
    avgCustomerValue: '15,625,000',
    phoneCalls: true,
    directMeetings: true,
    productDemos: true,
    detailedNotes: 'Khách hàng quan tâm đến giải pháp AI cho retail. Cần demo chi tiết về tính năng phân tích dữ liệu.',
    workStatus: 'completed',
    delayReason: '',
    attachments: []
  });

  const [isDraft, setIsDraft] = useState(false);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [showInsights, setShowInsights] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType>(MOCK_USERS[0]); // Default to employee
  
  const { 
    isLoading, 
    realtimeStatus, 
    saveDraft, 
    submitReport, 
    getAIInsights,
    subscribeToRealtimeUpdates 
  } = useSupabase();

  // Permission checks
  const canCreateReports = PermissionService.hasPermission(currentUser, 'create_personal_reports');
  const canExportReports = PermissionService.hasPermission(currentUser, 'export_reports');
  const canViewHistory = PermissionService.hasPermission(currentUser, 'view_personal_reports');
  const accessibleScopes = PermissionService.getAccessibleReportScopes(currentUser);

  // Mock projects data with more realistic options
  const projects = [
    'F1-BMC Holdings',
    'F2-ERP Enterprise',
    'F3-AI Retail Solution',
    'F4-Startup AI Retail',
    'F5-Digital Transformation',
    'F6-Customer Intelligence System',
    'F7-Automated Reporting Platform',
    'F8-Business Intelligence Dashboard'
  ];

  // Demo scenarios for testing
  const demoScenarios = [
    {
      name: '🎯 Ngày thành công',
      data: {
        dailyRevenue: '180,000,000',
        contractsSigned: '4',
        newCustomers: '12',
        followUpCustomers: '28',
        phoneCalls: true,
        directMeetings: true,
        productDemos: true,
        avgCustomerValue: '15,000,000',
        detailedNotes: 'Ngày làm việc xuất sắc! Ký được 4 hợp đồng lớn, khách hàng rất hài lòng với demo.',
        workStatus: 'completed'
      }
    },
    {
      name: '⚠️ Ngày trung bình',
      data: {
        dailyRevenue: '95,000,000',
        contractsSigned: '1',
        newCustomers: '5',
        followUpCustomers: '12',
        phoneCalls: true,
        directMeetings: false,
        productDemos: true,
        avgCustomerValue: '19,000,000',
        detailedNotes: 'Một số khách hàng còn đang cân nhắc. Cần follow-up thêm.',
        workStatus: 'in-progress'
      }
    },
    {
      name: '❌ Ngày khó khăn',
      data: {
        dailyRevenue: '45,000,000',
        contractsSigned: '0',
        newCustomers: '2',
        followUpCustomers: '8',
        phoneCalls: false,
        directMeetings: false,
        productDemos: false,
        avgCustomerValue: '22,500,000',
        detailedNotes: 'Khách hàng chưa sẵn sàng quyết định. Cần điều chỉnh chiến lược tiếp cận.',
        workStatus: 'delayed',
        delayReason: 'Khách hàng yêu cầu thêm thời gian đánh giá'
      }
    }
  ];

  const handleInputChange = (field: keyof LocalSalesReportData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSaveDraft = async () => {
    setIsDraft(true);
    
    const draftData: Partial<SupabaseSalesReportData> = {
      user_id: user?.id || 'user-1',
      report_date: formData.reportDate,
      project: formData.project,
      department: formData.department,
      reporter: formData.reporter,
      role: formData.role,
      daily_revenue: parseFloat(formData.dailyRevenue.replace(/,/g, '') || '0'),
      contracts_signed: parseInt(formData.contractsSigned || '0'),
      new_customers: parseInt(formData.newCustomers || '0'),
      follow_up_customers: parseInt(formData.followUpCustomers || '0'),
      avg_customer_value: parseFloat(formData.avgCustomerValue.replace(/,/g, '') || '0'),
      phone_calls: formData.phoneCalls,
      direct_meetings: formData.directMeetings,
      product_demos: formData.productDemos,
      detailed_notes: formData.detailedNotes,
      work_status: formData.workStatus,
      delay_reason: formData.delayReason,
      attachments: formData.attachments.map(file => file.name)
    };
    
    await saveDraft(draftData);
    setIsDraft(false);
  };

  const handleSubmitReport = async () => {
    const reportData: SupabaseSalesReportData = {
      user_id: user?.id || 'user-1',
      report_date: formData.reportDate,
      project: formData.project,
      department: formData.department,
      reporter: formData.reporter,
      role: formData.role,
      daily_revenue: parseFloat(formData.dailyRevenue.replace(/,/g, '') || '0'),
      contracts_signed: parseInt(formData.contractsSigned || '0'),
      new_customers: parseInt(formData.newCustomers || '0'),
      follow_up_customers: parseInt(formData.followUpCustomers || '0'),
      avg_customer_value: parseFloat(formData.avgCustomerValue.replace(/,/g, '') || '0'),
      phone_calls: formData.phoneCalls,
      direct_meetings: formData.directMeetings,
      product_demos: formData.productDemos,
      detailed_notes: formData.detailedNotes,
      work_status: formData.workStatus,
      delay_reason: formData.delayReason,
      attachments: formData.attachments.map(file => file.name),
      status: 'submitted'
    };
    
    const result = await submitReport(reportData);
    
    if (result.success) {
      // Load AI insights after successful submission
      setTimeout(async () => {
        const insights = await getAIInsights(result.data.id);
        setAiInsights(insights);
        setShowInsights(true);
      }, 2000);
      
      // Reset form after successful submission
      setFormData({
        ...formData,
        dailyRevenue: '',
        contractsSigned: '',
        newCustomers: '',
        followUpCustomers: '',
        avgCustomerValue: '',
        phoneCalls: false,
        directMeetings: false,
        productDemos: false,
        detailedNotes: '',
        workStatus: 'completed',
        delayReason: '',
        attachments: []
      });
    }
  };

  const handleExportWord = async () => {
    try {
      // Validate required fields
      if (!formData.project || !formData.dailyRevenue) {
        toast({
          title: "Lỗi",
          description: "Vui lòng điền đầy đủ thông tin dự án và doanh thu!",
          variant: "destructive"
        });
        return;
      }

      // Export to Word using WordExportService
      await WordExportService.exportToWord(formData, {
        template: 'standard',
        includeAttachments: true
      });
      
      // Generate email content for reference
      const emailContent = WordExportService.generateEmailContent(formData);
      console.log('📧 Email content generated:', emailContent);
      
      toast({
        title: "Xuất báo cáo thành công",
        description: "File Word đã được tạo và tải về thành công!",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi xuất báo cáo: " + (error as Error).message,
        variant: "destructive"
      });
    }
  };

  // Subscribe to realtime updates
  useEffect(() => {
    const unsubscribe = subscribeToRealtimeUpdates((payload) => {
      console.log('Realtime update received:', payload);
      // Handle realtime updates here
    });

    return unsubscribe;
  }, [subscribeToRealtimeUpdates]);

  const formatCurrency = (value: string) => {
    const number = value.replace(/[^0-9]/g, '');
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard/personal')}
            className="mb-4 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại Dashboard
          </Button>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-gray-700 text-white">
                      {user?.name?.charAt(0) || 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl text-white">
                      Báo cáo Kinh doanh – Cá nhân
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Ngày: {new Date().toLocaleDateString('vi-VN')} | 
                      Người dùng: {currentUser.name} ({PermissionService.getRoleDisplayName(currentUser.role)})
                    </CardDescription>
                    <div className="flex space-x-1 mt-1">
                      {accessibleScopes.map(scope => (
                        <Badge key={scope} variant="outline" className="text-xs">
                          {scope === 'personal' ? 'Cá nhân' : 
                           scope === 'team' ? 'Nhóm' :
                           scope === 'department' ? 'Phòng ban' :
                           scope === 'company' ? 'Công ty' : 'Tất cả'}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-blue-600 text-white">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Kinh doanh
                </Badge>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          {/* Thông tin chung */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                Thông tin chung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reportDate" className="text-gray-300">Ngày báo cáo</Label>
                  <Input
                    id="reportDate"
                    type="date"
                    value={formData.reportDate}
                    onChange={(e) => handleInputChange('reportDate', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="project" className="text-gray-300">Dự án/Công ty *</Label>
                  <Select value={formData.project} onValueChange={(value) => handleInputChange('project', value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Chọn dự án" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {projects.map((project) => (
                        <SelectItem key={project} value={project} className="text-white hover:bg-gray-600">
                          {project}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="department" className="text-gray-300">Phòng ban</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    disabled
                    className="bg-gray-700 border-gray-600 text-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="reporter" className="text-gray-300">Người báo cáo</Label>
                  <Input
                    id="reporter"
                    value={currentUser.name}
                    disabled
                    className="bg-gray-700 border-gray-600 text-gray-400"
                  />
                </div>
                
                {/* User Role Switcher for Demo */}
                <div className="md:col-span-2 mt-4 p-4 bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded-lg">
                  <Label className="text-yellow-300 mb-2 block">
                    🔄 Demo: Chuyển đổi vai trò người dùng
                  </Label>
                  <Select 
                    value={currentUser.id} 
                    onValueChange={(userId) => {
                      const user = MOCK_USERS.find(u => u.id === userId);
                      if (user) {
                        setCurrentUser(user);
                        setFormData({...formData, reporter: user.name, role: PermissionService.getRoleDisplayName(user.role)});
                      }
                    }}
                  >
                    <SelectTrigger className="bg-yellow-800 border-yellow-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {MOCK_USERS.map(user => (
                        <SelectItem key={user.id} value={user.id} className="text-white hover:bg-gray-600">
                          {user.name} - {PermissionService.getRoleDisplayName(user.role)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chỉ số Kinh doanh */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Chỉ số Kinh doanh
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dailyRevenue" className="text-gray-300">Doanh thu hôm nay (VNĐ) *</Label>
                  <Input
                    id="dailyRevenue"
                    value={formData.dailyRevenue}
                    onChange={(e) => handleInputChange('dailyRevenue', formatCurrency(e.target.value))}
                    placeholder="0"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="contractsSigned" className="text-gray-300">Số hợp đồng ký</Label>
                  <Input
                    id="contractsSigned"
                    type="number"
                    value={formData.contractsSigned}
                    onChange={(e) => handleInputChange('contractsSigned', e.target.value)}
                    placeholder="0"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="newCustomers" className="text-gray-300">Số khách hàng mới</Label>
                  <Input
                    id="newCustomers"
                    type="number"
                    value={formData.newCustomers}
                    onChange={(e) => handleInputChange('newCustomers', e.target.value)}
                    placeholder="0"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="followUpCustomers" className="text-gray-300">Số khách hàng tiềm năng follow-up</Label>
                  <Input
                    id="followUpCustomers"
                    type="number"
                    value={formData.followUpCustomers}
                    onChange={(e) => handleInputChange('followUpCustomers', e.target.value)}
                    placeholder="0"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="avgCustomerValue" className="text-gray-300">Giá trị trung bình/khách hàng (VNĐ)</Label>
                  <Input
                    id="avgCustomerValue"
                    value={formData.avgCustomerValue}
                    onChange={(e) => handleInputChange('avgCustomerValue', formatCurrency(e.target.value))}
                    placeholder="0"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hoạt động trong ngày */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Hoạt động trong ngày
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="phoneCalls"
                    checked={formData.phoneCalls}
                    onCheckedChange={(checked) => handleInputChange('phoneCalls', checked)}
                    className="border-gray-600"
                  />
                  <Label htmlFor="phoneCalls" className="text-gray-300 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Gọi điện: 20 KH
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="directMeetings"
                    checked={formData.directMeetings}
                    onCheckedChange={(checked) => handleInputChange('directMeetings', checked)}
                    className="border-gray-600"
                  />
                  <Label htmlFor="directMeetings" className="text-gray-300 flex items-center">
                    <UserIcon className="w-4 h-4 mr-2" />
                    Gặp trực tiếp: 5 KH
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="productDemos"
                    checked={formData.productDemos}
                    onCheckedChange={(checked) => handleInputChange('productDemos', checked)}
                    className="border-gray-600"
                  />
                  <Label htmlFor="productDemos" className="text-gray-300 flex items-center">
                    <Presentation className="w-4 h-4 mr-2" />
                    Demo sản phẩm: 3 lần
                  </Label>
                </div>
              </div>
              
              <div>
                <Label htmlFor="detailedNotes" className="text-gray-300">Ghi chú chi tiết</Label>
                <Textarea
                  id="detailedNotes"
                  value={formData.detailedNotes}
                  onChange={(e) => handleInputChange('detailedNotes', e.target.value)}
                  placeholder="Nhập ghi chú chi tiết về hoạt động trong ngày..."
                  className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Tình trạng công việc */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Tình trạng công việc
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="completed"
                    name="workStatus"
                    value="completed"
                    checked={formData.workStatus === 'completed'}
                    onChange={(e) => handleInputChange('workStatus', e.target.value)}
                    className="text-green-500"
                  />
                  <Label htmlFor="completed" className="text-gray-300 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Hoàn thành
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="in-progress"
                    name="workStatus"
                    value="in-progress"
                    checked={formData.workStatus === 'in-progress'}
                    onChange={(e) => handleInputChange('workStatus', e.target.value)}
                  />
                  <Label htmlFor="in-progress" className="text-gray-300 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
                    Đang xử lý
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="delayed"
                    name="workStatus"
                    value="delayed"
                    checked={formData.workStatus === 'delayed'}
                    onChange={(e) => handleInputChange('workStatus', e.target.value)}
                  />
                  <Label htmlFor="delayed" className="text-gray-300 flex items-center">
                    <XCircle className="w-4 h-4 mr-2 text-red-500" />
                    Trì hoãn
                  </Label>
                </div>
              </div>
              
              {formData.workStatus === 'delayed' && (
                <div>
                  <Label htmlFor="delayReason" className="text-gray-300">Lý do trì hoãn</Label>
                  <Textarea
                    id="delayReason"
                    value={formData.delayReason}
                    onChange={(e) => handleInputChange('delayReason', e.target.value)}
                    placeholder="Nhập lý do trì hoãn..."
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Đính kèm */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Đính kèm
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="attachments" className="text-gray-300">
                  Upload hợp đồng/ảnh hóa đơn/tài liệu (PDF, JPG, DOCX)
                </Label>
                <Input
                  id="attachments"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.docx,.doc"
                  onChange={handleFileUpload}
                  className="bg-gray-700 border-gray-600 text-white file:bg-gray-600 file:text-white file:border-0"
                />
              </div>
              
              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-gray-300">Files đã chọn:</Label>
                  {formData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded">
                      <span className="text-sm text-gray-300">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Xóa
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Realtime Status */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {realtimeStatus === 'connected' ? (
                    <Wifi className="w-4 h-4 text-green-500" />
                  ) : realtimeStatus === 'connecting' ? (
                    <Loader2 className="w-4 h-4 text-yellow-500 animate-spin" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-sm text-gray-300">
                    Trạng thái đồng bộ: {realtimeStatus === 'connected' ? 'Đã kết nối' : realtimeStatus === 'connecting' ? 'Đang kết nối' : 'Mất kết nối'}
                  </span>
                </div>
                <Badge 
                  variant={realtimeStatus === 'connected' ? 'default' : 'destructive'}
                  className={realtimeStatus === 'connected' ? 'bg-green-600' : 'bg-red-600'}
                >
                  {realtimeStatus === 'connected' ? 'Online' : 'Offline'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Demo Scenarios */}
          <Card className="bg-gradient-to-r from-purple-900 to-pink-900 border-purple-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                🎭 Demo Scenarios - Tình huống mẫu
              </CardTitle>
              <CardDescription className="text-gray-300">
                Chọn tình huống để test các trường hợp khác nhau
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {demoScenarios.map((scenario, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        ...scenario.data
                      }));
                    }}
                    variant="outline"
                    className="h-auto p-4 text-left bg-gray-800 border-gray-600 hover:bg-gray-700"
                  >
                    <div>
                      <div className="font-semibold text-white mb-1">{scenario.name}</div>
                      <div className="text-xs text-gray-400">
                        DT: {scenario.data.dailyRevenue} VNĐ • 
                        HĐ: {scenario.data.contractsSigned} • 
                        KH: {scenario.data.newCustomers}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          {showInsights && aiInsights.length > 0 && (
            <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-blue-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                  AI Insights - Phân tích thông minh
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Phân tích tự động dựa trên dữ liệu báo cáo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-600">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white">{insight.title}</h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          insight.insight_type === 'revenue_trend' ? 'border-green-500 text-green-400' :
                          insight.insight_type === 'conversion_rate' ? 'border-blue-500 text-blue-400' :
                          'border-red-500 text-red-400'
                        }`}
                      >
                        {(insight.confidence_score * 100).toFixed(0)}% tin cậy
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{insight.description}</p>
                    <p className="text-gray-400 text-xs italic">
                      💡 Gợi ý: {insight.recommendation}
                    </p>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2">
                  <Button
                    onClick={() => getAIInsights('demo-report-id')}
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    🔄 Làm mới insights
                  </Button>
                  <Button
                    onClick={() => setShowInsights(false)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    Ẩn insights
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  onClick={handleSaveDraft}
                  disabled={isLoading || !canCreateReports}
                  variant="outline"
                  className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 disabled:opacity-50"
                  title={!canCreateReports ? 'Bạn không có quyền tạo báo cáo' : ''}
                >
                  {isLoading && isDraft ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {isLoading && isDraft ? 'Đang lưu...' : 'Lưu nháp'}
                </Button>
                
                <Button
                  onClick={handleSubmitReport}
                  disabled={isLoading || !formData.project || !formData.dailyRevenue || !canCreateReports}
                  className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                  title={!canCreateReports ? 'Bạn không có quyền gửi báo cáo' : ''}
                >
                  {isLoading && !isDraft ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {isLoading && !isDraft ? 'Đang gửi...' : 'Gửi báo cáo'}
                </Button>
                
                <Button
                  onClick={handleExportWord}
                  disabled={isLoading || !canExportReports}
                  variant="outline"
                  className="bg-green-700 border-green-600 text-white hover:bg-green-600 disabled:opacity-50"
                  title={!canExportReports ? 'Bạn không có quyền xuất báo cáo' : ''}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Xuất Word
                </Button>
                
                <Button
                  onClick={() => navigate('/reports/history')}
                  disabled={!canViewHistory}
                  variant="outline"
                  className="bg-purple-700 border-purple-600 text-white hover:bg-purple-600 disabled:opacity-50"
                  title={!canViewHistory ? 'Bạn không có quyền xem lịch sử' : ''}
                >
                  <History className="w-4 h-4 mr-2" />
                  Lịch sử
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SalesReportForm;