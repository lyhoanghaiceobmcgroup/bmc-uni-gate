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
  Target,
  DollarSign,
  Eye,
  MousePointer,
  Users,
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
  Loader2,
  BarChart3,
  PieChart,
  Facebook,
  Chrome,
  Smartphone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useSupabase, AIInsight } from '@/hooks/useSupabase';
import { WordExportService } from '@/services/WordExportService';
import PermissionService, { User as UserType, MOCK_USERS } from '@/utils/permissions';

interface MarketingReportData {
  reportDate: string;
  project: string;
  department: string;
  reporter: string;
  role: string;
  campaignName: string;
  campaignStartDate: string;
  campaignEndDate: string;
  channels: string[];
  plannedBudget: string;
  spentBudget: string;
  impressions: string;
  clicks: string;
  ctr: string;
  leads: string;
  conversions: string;
  cpa: string;
  roi: string;
  strengths: string;
  issues: string;
  improvements: string;
  attachments: File[];
}

const MarketingReportForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { 
    isLoading, 
    realtimeStatus, 
    saveMarketingDraft, 
    submitMarketingReport, 
    generateMarketingAIInsights,
    subscribeToRealtimeUpdates 
  } = useSupabase();
  
  const [currentUser] = useState<UserType>(MOCK_USERS[2]); // Marketing user
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const availableChannels = [
    'Facebook Ads',
    'Google Ads', 
    'TikTok Ads',
    'LinkedIn Ads',
    'Email Marketing',
    'PR',
    'Offline Event'
  ];

  const availableProjects = [
    'F4-Startup E-commerce',
    'BMC Enterprise Solution',
    'AI Retail Platform',
    'Digital Transformation'
  ];
  
  const [reportData, setReportData] = useState<MarketingReportData>({
    reportDate: new Date().toISOString().split('T')[0],
    project: 'F4-Startup AI Retail',
    department: 'Marketing',
    reporter: 'Trần Thị B',
    role: 'Nhân viên Marketing',
    campaignName: '',
    campaignStartDate: '',
    campaignEndDate: '',
    channels: [],
    plannedBudget: '',
    spentBudget: '',
    impressions: '',
    clicks: '',
    ctr: '',
    leads: '',
    conversions: '',
    cpa: '',
    roi: '',
    strengths: '',
    issues: '',
    improvements: '',
    attachments: []
  });

  const channelOptions = [
    { value: 'facebook', label: 'Facebook Ads', icon: Facebook },
    { value: 'google', label: 'Google Ads', icon: Chrome },
    { value: 'tiktok', label: 'TikTok Ads', icon: Smartphone },
    { value: 'pr', label: 'PR & Truyền thông', icon: FileText },
    { value: 'email', label: 'Email Marketing', icon: FileText },
    { value: 'offline', label: 'Offline Event', icon: Users }
  ];

  const accessibleScopes = PermissionService.getAccessibleScopes(currentUser.role);

  useEffect(() => {
    // Simulate realtime connection
    setTimeout(() => setRealtimeStatus('connected'), 2000);
    
    // Subscribe to realtime updates
    subscribeToRealtimeUpdates('marketing_reports', (payload) => {
      console.log('📡 Realtime update received:', payload);
    });

    // Auto-calculate ROI when budget and revenue data changes
    if (reportData.spentBudget && reportData.conversions) {
      const spent = parseFloat(reportData.spentBudget.replace(/[^0-9]/g, '')) || 0;
      const revenue = parseFloat(reportData.conversions) * 500000; // Assume 500k per conversion
      const roi = spent > 0 ? ((revenue - spent) / spent * 100).toFixed(1) : '0';
      if (roi !== reportData.roi) {
        setReportData(prev => ({ ...prev, roi }));
      }
    }

    // Auto-calculate CPA
    if (reportData.spentBudget && reportData.conversions) {
      const spent = parseFloat(reportData.spentBudget.replace(/[^0-9]/g, '')) || 0;
      const conversions = parseFloat(reportData.conversions) || 0;
      const cpa = conversions > 0 ? (spent / conversions).toFixed(0) : '0';
      if (cpa !== reportData.cpa) {
        setReportData(prev => ({ ...prev, cpa }));
      }
    }

    // Auto-calculate CTR
    if (reportData.impressions && reportData.clicks) {
      const impressions = parseFloat(reportData.impressions.replace(/[^0-9]/g, '')) || 0;
      const clicks = parseFloat(reportData.clicks.replace(/[^0-9]/g, '')) || 0;
      const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : '0';
      if (ctr !== reportData.ctr) {
        setReportData(prev => ({ ...prev, ctr }));
      }
    }
  }, [reportData.spentBudget, reportData.conversions, reportData.impressions, reportData.clicks]);

  const handleInputChange = (field: keyof MarketingReportData, value: string | string[] | File[]) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  const handleChannelToggle = (channel: string) => {
    const updatedChannels = reportData.channels.includes(channel)
      ? reportData.channels.filter(c => c !== channel)
      : [...reportData.channels, channel];
    handleInputChange('channels', updatedChannels);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    handleInputChange('attachments', [...reportData.attachments, ...files]);
  };

  const handleSaveDraft = async () => {
    setIsDraft(true);
    try {
      await saveMarketingDraft({
        ...reportData,
        status: 'draft',
        user_id: currentUser.id
      });
      toast({
        title: "✅ Đã lưu nháp",
        description: "Báo cáo đã được lưu thành công."
      });
    } catch (error) {
      toast({
        title: "❌ Lỗi lưu nháp",
        description: "Không thể lưu báo cáo. Vui lòng thử lại.",
        variant: "destructive"
      });
    }
    setIsDraft(false);
  };

  const handleSubmitReport = async () => {
    setIsSubmitting(true);
    try {
      const savedReport = await submitMarketingReport({
        ...reportData,
        status: 'submitted',
        user_id: currentUser.id
      });

      // Generate AI insights
      const insights = await generateMarketingAIInsights(savedReport.id!, reportData);
      setAiInsights(insights);

      toast({
        title: "🚀 Báo cáo đã gửi",
        description: "Dữ liệu đã được đồng bộ realtime và AI đang phân tích."
      });
    } catch (error) {
      toast({
        title: "❌ Lỗi gửi báo cáo",
        description: "Không thể gửi báo cáo. Vui lòng thử lại.",
        variant: "destructive"
      });
    }
    setIsSubmitting(false);
  };

  const handleExportWord = async () => {
    try {
      const wordContent = {
        title: 'BÁO CÁO MARKETING – CÁ NHÂN',
        date: new Date(reportData.reportDate).toLocaleDateString('vi-VN'),
        reporter: `${reportData.reporter} – ${reportData.role}`,
        project: reportData.project,
        campaignInfo: {
          name: reportData.campaignName,
          period: `${new Date(reportData.campaignStartDate).toLocaleDateString('vi-VN')} – ${new Date(reportData.campaignEndDate).toLocaleDateString('vi-VN')}`,
          channels: reportData.channels.map(ch => channelOptions.find(opt => opt.value === ch)?.label).join(', '),
          plannedBudget: `${parseInt(reportData.plannedBudget || '0').toLocaleString('vi-VN')} VNĐ`,
          spentBudget: `${parseInt(reportData.spentBudget || '0').toLocaleString('vi-VN')} VNĐ`
        },
        results: {
          impressions: parseInt(reportData.impressions || '0').toLocaleString('vi-VN'),
          clicks: `${parseInt(reportData.clicks || '0').toLocaleString('vi-VN')} (CTR = ${reportData.ctr}%)`,
          leads: parseInt(reportData.leads || '0').toLocaleString('vi-VN'),
          conversions: `${reportData.conversions} khách hàng`,
          cpa: `${parseInt(reportData.cpa || '0').toLocaleString('vi-VN')} VNĐ`,
          roi: `${reportData.roi}%`
        },
        analysis: {
          strengths: reportData.strengths,
          issues: reportData.issues,
          improvements: reportData.improvements
        },
        attachments: reportData.attachments.map(file => file.name)
      };

      await WordExportService.exportMarketingReport(wordContent);
      
      toast({
        title: "📄 Xuất Word thành công",
        description: "File báo cáo đã được tải xuống."
      });
    } catch (error) {
      toast({
        title: "❌ Lỗi xuất Word",
        description: "Không thể xuất file Word. Vui lòng thử lại.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gray-800 bg-opacity-90 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/dashboard/personal')}
                  className="text-gray-300 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại
                </Button>
                <div>
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <Target className="w-6 h-6 mr-2 text-orange-500" />
                    Báo cáo Marketing – Cá nhân
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
              <Badge variant="secondary" className="bg-orange-600 text-white">
                <Target className="w-4 h-4 mr-1" />
                Marketing
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Thông tin chung */}
            <Card className="bg-gray-800 bg-opacity-90 border-gray-700">
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
                      value={reportData.reportDate}
                      onChange={(e) => handleInputChange('reportDate', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="project" className="text-gray-300">Dự án/Công ty</Label>
                    <Select value={reportData.project} onValueChange={(value) => handleInputChange('project', value)}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="F4-Startup AI Retail">F4-Startup AI Retail</SelectItem>
                        <SelectItem value="BMC Enterprise Solution">BMC Enterprise Solution</SelectItem>
                        <SelectItem value="Digital Transformation Hub">Digital Transformation Hub</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="department" className="text-gray-300">Phòng ban</Label>
                    <Input
                      id="department"
                      value={reportData.department}
                      disabled
                      className="bg-gray-700 border-gray-600 text-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-gray-300">Vai trò</Label>
                    <Select value={reportData.role} onValueChange={(value) => handleInputChange('role', value)}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nhân viên Marketing">Nhân viên Marketing</SelectItem>
                        <SelectItem value="Trưởng nhóm Marketing">Trưởng nhóm Marketing</SelectItem>
                        <SelectItem value="Trưởng phòng Marketing">Trưởng phòng Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Thông tin chiến dịch */}
            <Card className="bg-gray-800 bg-opacity-90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Thông tin chiến dịch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="campaignName" className="text-gray-300">Tên chiến dịch</Label>
                  <Input
                    id="campaignName"
                    value={reportData.campaignName}
                    onChange={(e) => handleInputChange('campaignName', e.target.value)}
                    placeholder="Ví dụ: Back-to-School 2025"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="campaignStartDate" className="text-gray-300">Ngày bắt đầu</Label>
                    <Input
                      id="campaignStartDate"
                      type="date"
                      value={reportData.campaignStartDate}
                      onChange={(e) => handleInputChange('campaignStartDate', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="campaignEndDate" className="text-gray-300">Ngày kết thúc</Label>
                    <Input
                      id="campaignEndDate"
                      type="date"
                      value={reportData.campaignEndDate}
                      onChange={(e) => handleInputChange('campaignEndDate', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300 mb-3 block">Kênh triển khai</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {channelOptions.map((channel) => {
                      const IconComponent = channel.icon;
                      return (
                        <div key={channel.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={channel.value}
                            checked={reportData.channels.includes(channel.value)}
                            onCheckedChange={() => handleChannelToggle(channel.value)}
                          />
                          <Label htmlFor={channel.value} className="text-gray-300 flex items-center cursor-pointer">
                            <IconComponent className="w-4 h-4 mr-1" />
                            {channel.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="plannedBudget" className="text-gray-300">Ngân sách dự kiến (VNĐ)</Label>
                    <Input
                      id="plannedBudget"
                      value={reportData.plannedBudget}
                      onChange={(e) => handleInputChange('plannedBudget', e.target.value)}
                      placeholder="200000000"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="spentBudget" className="text-gray-300">Ngân sách đã chi (VNĐ)</Label>
                    <Input
                      id="spentBudget"
                      value={reportData.spentBudget}
                      onChange={(e) => handleInputChange('spentBudget', e.target.value)}
                      placeholder="180000000"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Kết quả chiến dịch */}
            <Card className="bg-gray-800 bg-opacity-90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Kết quả chiến dịch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="impressions" className="text-gray-300">Số lượt hiển thị (Impressions)</Label>
                    <Input
                      id="impressions"
                      value={reportData.impressions}
                      onChange={(e) => handleInputChange('impressions', e.target.value)}
                      placeholder="2500000"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clicks" className="text-gray-300">Số lượt click</Label>
                    <Input
                      id="clicks"
                      value={reportData.clicks}
                      onChange={(e) => handleInputChange('clicks', e.target.value)}
                      placeholder="125000"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ctr" className="text-gray-300">CTR (%)</Label>
                    <Input
                      id="ctr"
                      value={reportData.ctr}
                      disabled
                      className="bg-gray-700 border-gray-600 text-gray-400"
                      placeholder="Tự động tính"
                    />
                  </div>
                  <div>
                    <Label htmlFor="leads" className="text-gray-300">Leads thu được</Label>
                    <Input
                      id="leads"
                      value={reportData.leads}
                      onChange={(e) => handleInputChange('leads', e.target.value)}
                      placeholder="2500"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="conversions" className="text-gray-300">Khách hàng chuyển đổi</Label>
                    <Input
                      id="conversions"
                      value={reportData.conversions}
                      onChange={(e) => handleInputChange('conversions', e.target.value)}
                      placeholder="500"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cpa" className="text-gray-300">Chi phí/khách hàng (CPA)</Label>
                    <Input
                      id="cpa"
                      value={reportData.cpa}
                      disabled
                      className="bg-gray-700 border-gray-600 text-gray-400"
                      placeholder="Tự động tính"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="roi" className="text-gray-300">ROI (%)</Label>
                  <Input
                    id="roi"
                    value={reportData.roi}
                    disabled
                    className="bg-gray-700 border-gray-600 text-gray-400"
                    placeholder="Tự động tính từ doanh thu/chi phí"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Phân tích & ghi chú */}
            <Card className="bg-gray-800 bg-opacity-90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Phân tích & ghi chú
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="strengths" className="text-gray-300">Điểm mạnh chiến dịch</Label>
                  <Textarea
                    id="strengths"
                    value={reportData.strengths}
                    onChange={(e) => handleInputChange('strengths', e.target.value)}
                    placeholder="Kênh TikTok Ads tạo nhiều khách hàng tiềm năng với CPA thấp..."
                    className="bg-gray-700 border-gray-600 text-white min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor="issues" className="text-gray-300">Vấn đề gặp phải</Label>
                  <Textarea
                    id="issues"
                    value={reportData.issues}
                    onChange={(e) => handleInputChange('issues', e.target.value)}
                    placeholder="Facebook Ads CTR thấp hơn kỳ vọng, cần tối ưu nội dung..."
                    className="bg-gray-700 border-gray-600 text-white min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor="improvements" className="text-gray-300">Đề xuất cải thiện</Label>
                  <Textarea
                    id="improvements"
                    value={reportData.improvements}
                    onChange={(e) => handleInputChange('improvements', e.target.value)}
                    placeholder="Giảm 20% ngân sách Facebook, tăng 20% cho TikTok..."
                    className="bg-gray-700 border-gray-600 text-white min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Đính kèm */}
            <Card className="bg-gray-800 bg-opacity-90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Đính kèm tài liệu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-300 mb-2">Kéo thả file hoặc click để chọn</p>
                  <p className="text-sm text-gray-500 mb-4">Hỗ trợ: PDF, Excel, Word, hình ảnh</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.xlsx,.xls,.docx,.doc,.jpg,.jpeg,.png"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Chọn file
                  </Button>
                </div>
                {reportData.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-gray-300 font-medium">File đã chọn:</p>
                    {reportData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded">
                        <span className="text-gray-300 text-sm">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newAttachments = reportData.attachments.filter((_, i) => i !== index);
                            handleInputChange('attachments', newAttachments);
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <Card className="bg-gray-800 bg-opacity-90 border-gray-700">
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleSaveDraft}
                    disabled={isDraft}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    {isDraft ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Lưu nháp
                  </Button>
                  <Button
                    onClick={handleSubmitReport}
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    Gửi báo cáo
                  </Button>
                  <Button
                    onClick={handleExportWord}
                    variant="outline"
                    className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Xuất Word
                  </Button>
                  <Button
                    onClick={() => navigate('/dashboard/personal/reports/history')}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <History className="w-4 h-4 mr-2" />
                    Lịch sử báo cáo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Realtime Status */}
            <Card className="bg-gray-800 bg-opacity-90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  {realtimeStatus === 'connected' ? (
                    <Wifi className="w-5 h-5 mr-2 text-green-500" />
                  ) : realtimeStatus === 'connecting' ? (
                    <Loader2 className="w-5 h-5 mr-2 text-yellow-500 animate-spin" />
                  ) : (
                    <WifiOff className="w-5 h-5 mr-2 text-red-500" />
                  )}
                  Realtime Sync
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">
                    Trạng thái đồng bộ: {realtimeStatus === 'connected' ? 'Đã kết nối' : realtimeStatus === 'connecting' ? 'Đang kết nối' : 'Mất kết nối'}
                  </span>
                  <Badge 
                    variant={realtimeStatus === 'connected' ? 'default' : 'destructive'}
                    className={realtimeStatus === 'connected' ? 'bg-green-600' : 'bg-red-600'}
                  >
                    {realtimeStatus === 'connected' ? 'Online' : 'Offline'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            {aiInsights.length > 0 && (
              <Card className="bg-gray-800 bg-opacity-90 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                    AI Marketing Insights
                  </CardTitle>
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
                          {insight.insight_type === 'revenue_trend' ? 'Doanh thu' :
                           insight.insight_type === 'conversion_rate' ? 'Chuyển đổi' : 'Cảnh báo'}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{insight.description}</p>
                      <p className="text-blue-400 text-sm font-medium">{insight.recommendation}</p>
                      <div className="flex items-center mt-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${insight.confidence_score * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 ml-2">
                          {Math.round(insight.confidence_score * 100)}% tin cậy
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="bg-gray-800 bg-opacity-90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Thống kê nhanh
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">CTR</span>
                  <span className="text-white font-semibold">{reportData.ctr || '0'}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">CPA</span>
                  <span className="text-white font-semibold">{parseInt(reportData.cpa || '0').toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">ROI</span>
                  <span className={`font-semibold ${
                    parseFloat(reportData.roi || '0') > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {reportData.roi || '0'}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Kênh triển khai</span>
                  <span className="text-white font-semibold">{reportData.channels.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingReportForm;