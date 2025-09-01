import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Bot, 
  Users, 
  Eye,
  MessageSquare,
  Calendar,
  Building2
} from 'lucide-react';

interface ProjectApplication {
  id: string;
  companyName: string;
  taxId: string;
  industry: string;
  bmcContribution: number;
  legalRepresentative: string;
  status: 'pending' | 'ai_review' | 'admin_review' | 'approved' | 'rejected';
  submittedAt: string;
  aiAnalysis?: {
    score: number;
    risks: string[];
    recommendations: string[];
    legalCompliance: boolean;
  };
  adminComments?: string;
  approvedBy?: string;
  approvedAt?: string;
}

const ApprovalSystem = () => {
  const [applications, setApplications] = useState<ProjectApplication[]>([
    {
      id: 'APP-001',
      companyName: 'Công ty TNHH Công nghệ ABC',
      taxId: '0123456789',
      industry: 'Công nghệ thông tin',
      bmcContribution: 15,
      legalRepresentative: 'Nguyễn Văn A',
      status: 'ai_review',
      submittedAt: '2025-01-15T10:30:00Z',
      aiAnalysis: {
        score: 85,
        risks: ['Thiếu kinh nghiệm trong lĩnh vực', 'Vốn điều lệ thấp'],
        recommendations: ['Yêu cầu bổ sung hồ sơ tài chính', 'Cần đánh giá kỹ năng đội ngũ'],
        legalCompliance: true
      }
    },
    {
      id: 'APP-002',
      companyName: 'Công ty CP Sản xuất XYZ',
      taxId: '0987654321',
      industry: 'Sản xuất',
      bmcContribution: 20,
      legalRepresentative: 'Trần Thị B',
      status: 'pending',
      submittedAt: '2025-01-15T14:20:00Z'
    },
    {
      id: 'APP-003',
      companyName: 'Công ty TNHH Thương mại DEF',
      taxId: '1122334455',
      industry: 'Thương mại',
      bmcContribution: 12,
      legalRepresentative: 'Lê Văn C',
      status: 'approved',
      submittedAt: '2025-01-14T09:15:00Z',
      aiAnalysis: {
        score: 92,
        risks: [],
        recommendations: ['Dự án có tiềm năng tốt'],
        legalCompliance: true
      },
      approvedBy: 'Admin BMC',
      approvedAt: '2025-01-15T08:30:00Z'
    }
  ]);

  const [selectedApp, setSelectedApp] = useState<ProjectApplication | null>(null);
  const [adminComment, setAdminComment] = useState('');

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'Chờ xử lý' },
      ai_review: { color: 'bg-blue-100 text-blue-800', icon: Bot, text: 'AI đang phân tích' },
      admin_review: { color: 'bg-purple-100 text-purple-800', icon: Users, text: 'Ban quản trị xem xét' },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Đã duyệt' },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, text: 'Từ chối' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} border-0`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  const handleApprove = (appId: string) => {
    setApplications(prev => prev.map(app => 
      app.id === appId 
        ? { 
            ...app, 
            status: 'approved', 
            adminComments: adminComment,
            approvedBy: 'Admin BMC',
            approvedAt: new Date().toISOString()
          }
        : app
    ));
    setAdminComment('');
    setSelectedApp(null);
  };

  const handleReject = (appId: string) => {
    setApplications(prev => prev.map(app => 
      app.id === appId 
        ? { 
            ...app, 
            status: 'rejected', 
            adminComments: adminComment
          }
        : app
    ));
    setAdminComment('');
    setSelectedApp(null);
  };

  const simulateAIAnalysis = (appId: string) => {
    // Simulate AI analysis process
    setApplications(prev => prev.map(app => 
      app.id === appId 
        ? { 
            ...app, 
            status: 'ai_review'
          }
        : app
    ));

    // Simulate AI analysis completion after 3 seconds
    setTimeout(() => {
      setApplications(prev => prev.map(app => 
        app.id === appId 
          ? { 
              ...app, 
              status: 'admin_review',
              aiAnalysis: {
                score: Math.floor(Math.random() * 30) + 70, // 70-100
                risks: [
                  'Cần xác minh thêm về năng lực tài chính',
                  'Kinh nghiệm trong ngành còn hạn chế'
                ],
                recommendations: [
                  'Yêu cầu bổ sung báo cáo tài chính 2 năm gần nhất',
                  'Cần có kế hoạch kinh doanh chi tiết'
                ],
                legalCompliance: true
              }
            }
          : app
      ));
    }, 3000);
  };

  const pendingCount = applications.filter(app => app.status === 'pending').length;
  const aiReviewCount = applications.filter(app => app.status === 'ai_review').length;
  const adminReviewCount = applications.filter(app => app.status === 'admin_review').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hệ thống Duyệt Hồ sơ ERP-AI</h1>
          <p className="text-muted-foreground">AI Legal Agent + Ban quản trị BMC</p>
        </div>
        <div className="flex gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium">{pendingCount} chờ xử lý</span>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">{aiReviewCount} AI phân tích</span>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">{adminReviewCount} chờ duyệt</span>
            </div>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">Danh sách Hồ sơ</TabsTrigger>
          <TabsTrigger value="ai-agent">AI Legal Agent</TabsTrigger>
          <TabsTrigger value="analytics">Thống kê</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          <div className="grid gap-4">
            {applications.map((app) => (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{app.companyName}</CardTitle>
                        <CardDescription>
                          MST: {app.taxId} • {app.industry} • BMC: {app.bmcContribution}%
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(app.status)}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedApp(app)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Chi tiết
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(app.submittedAt).toLocaleDateString('vi-VN')}
                      </span>
                      <span>Người đại diện: {app.legalRepresentative}</span>
                    </div>
                    
                    {app.status === 'pending' && (
                      <Button 
                        size="sm" 
                        onClick={() => simulateAIAnalysis(app.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Bot className="w-4 h-4 mr-1" />
                        Khởi động AI
                      </Button>
                    )}
                    
                    {app.aiAnalysis && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs">AI Score:</span>
                        <Badge variant={app.aiAnalysis.score >= 80 ? 'default' : 'secondary'}>
                          {app.aiAnalysis.score}/100
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-agent">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                AI Legal Agent Dashboard
              </CardTitle>
              <CardDescription>
                Hệ thống AI tự động phân tích và đánh giá hồ sơ pháp lý
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  AI Agent đang hoạt động 24/7 để phân tích hồ sơ theo các tiêu chí: 
                  Tuân thủ pháp luật, Năng lực tài chính, Kinh nghiệm ngành, Rủi ro đầu tư
                </AlertDescription>
              </Alert>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Tiêu chí Đánh giá</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>✅ Giấy phép kinh doanh hợp lệ</li>
                      <li>✅ Báo cáo tài chính minh bạch</li>
                      <li>✅ Kinh nghiệm lãnh đạo</li>
                      <li>✅ Kế hoạch kinh doanh khả thi</li>
                      <li>✅ Tuân thủ quy định BMC</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Thống kê AI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Độ chính xác</span>
                          <span>94%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Thời gian xử lý</span>
                          <span>2.3s</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tổng hồ sơ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{applications.length}</div>
                <p className="text-xs text-muted-foreground">Trong tháng này</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tỷ lệ duyệt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">78%</div>
                <p className="text-xs text-muted-foreground">Tăng 12% so với tháng trước</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Thời gian xử lý TB</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2 ngày</div>
                <p className="text-xs text-muted-foreground">Giảm 0.8 ngày nhờ AI</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedApp.companyName}</CardTitle>
                  <CardDescription>Mã hồ sơ: {selectedApp.id}</CardDescription>
                </div>
                <Button variant="ghost" onClick={() => setSelectedApp(null)}>×</Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Thông tin Công ty</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>MST:</strong> {selectedApp.taxId}</p>
                    <p><strong>Ngành:</strong> {selectedApp.industry}</p>
                    <p><strong>Vốn BMC:</strong> {selectedApp.bmcContribution}%</p>
                    <p><strong>Đại diện:</strong> {selectedApp.legalRepresentative}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Trạng thái</h4>
                  <div className="space-y-2">
                    {getStatusBadge(selectedApp.status)}
                    <p className="text-sm text-muted-foreground">
                      Nộp: {new Date(selectedApp.submittedAt).toLocaleString('vi-VN')}
                    </p>
                  </div>
                </div>
              </div>
              
              {selectedApp.aiAnalysis && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    Phân tích AI
                  </h4>
                  <div className="bg-muted p-3 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Điểm đánh giá:</span>
                      <Badge variant={selectedApp.aiAnalysis.score >= 80 ? 'default' : 'secondary'}>
                        {selectedApp.aiAnalysis.score}/100
                      </Badge>
                    </div>
                    
                    {selectedApp.aiAnalysis.risks.length > 0 && (
                      <div>
                        <p className="font-medium text-sm text-red-600">Rủi ro:</p>
                        <ul className="text-xs space-y-1">
                          {selectedApp.aiAnalysis.risks.map((risk, idx) => (
                            <li key={idx}>• {risk}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div>
                      <p className="font-medium text-sm text-blue-600">Khuyến nghị:</p>
                      <ul className="text-xs space-y-1">
                        {selectedApp.aiAnalysis.recommendations.map((rec, idx) => (
                          <li key={idx}>• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedApp.status === 'admin_review' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nhận xét của Ban quản trị</label>
                    <Textarea 
                      value={adminComment}
                      onChange={(e) => setAdminComment(e.target.value)}
                      placeholder="Nhập nhận xét về hồ sơ..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleApprove(selectedApp.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Duyệt hồ sơ
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleReject(selectedApp.id)}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Từ chối
                    </Button>
                  </div>
                </div>
              )}
              
              {selectedApp.status === 'approved' && selectedApp.approvedBy && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Đã duyệt bởi {selectedApp.approvedBy} vào {new Date(selectedApp.approvedAt!).toLocaleString('vi-VN')}
                    {selectedApp.adminComments && (
                      <div className="mt-2 p-2 bg-background rounded border">
                        <strong>Nhận xét:</strong> {selectedApp.adminComments}
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ApprovalSystem;