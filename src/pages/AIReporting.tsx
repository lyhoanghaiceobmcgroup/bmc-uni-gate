import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIInsights } from '@/components/ai/AIInsights';
import { useAIAgent } from '@/hooks/useAIAgent';
import { useAuth } from '@/contexts/AuthContext';
import { useEmployeeReports, useDepartmentReports, useCompanyReports } from '@/hooks/useRealtime';
import { realtimeService } from '@/services/realtimeService';
import { ProcessedReport } from '@/services/aiAgent';
import {
  Brain,
  Zap,
  BarChart3,
  TrendingUp,
  Users,
  Building2,
  Play,
  Loader2,
  Sparkles,
  Database,
  Bell,
  Target,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

const AIReportingPage: React.FC = () => {
  const { user } = useAuth();
  const { isProcessing, simulateProcessing, lastProcessedReport } = useAIAgent();
  const [demoReport, setDemoReport] = useState<ProcessedReport | null>(null);
  const [activeDemo, setActiveDemo] = useState<string>('');
  
  // Realtime data hooks
  const { reports: employeeReports } = useEmployeeReports(user?.role === 'manager' ? user?.department : undefined);
  const { reports: departmentReports } = useDepartmentReports(user?.role === 'ceo' ? user?.company : undefined);
  const { reports: companyReports } = useCompanyReports(user?.role === 'bmc_holdings' ? 'all' : undefined);

  const demoScenarios = [
    {
      id: 'high-performance',
      title: 'Hiệu suất cao',
      description: 'Mô phỏng báo cáo với doanh thu xuất sắc',
      data: {
        company: 'Startup A - AI Logistics',
        department: 'Kinh doanh - Marketing',
        reportType: 'Báo cáo doanh số',
        revenue: 85000000,
        kpiValue: 15,
        kpiUnit: 'Khách hàng',
        workStatus: 'completed' as const,
        description: 'Hoàn thành xuất sắc mục tiêu bán hàng với 15 khách hàng mới'
      }
    },
    {
      id: 'risk-scenario',
      title: 'Cảnh báo rủi ro',
      description: 'Mô phỏng báo cáo có vấn đề cần can thiệp',
      data: {
        company: 'Startup B - FinTech',
        department: 'Tài chính',
        reportType: 'Báo cáo tài chính',
        revenue: 25000000,
        kpiValue: 2,
        kpiUnit: 'Hợp đồng',
        workStatus: 'delayed' as const,
        description: 'Gặp khó khăn trong việc thu hồi công nợ, cần hỗ trợ'
      }
    },
    {
      id: 'stable-growth',
      title: 'Tăng trưởng ổn định',
      description: 'Mô phỏng báo cáo với xu hướng tích cực',
      data: {
        company: 'Startup C - EdTech',
        department: 'Sản xuất',
        reportType: 'Báo cáo sản xuất',
        revenue: 55000000,
        kpiValue: 8,
        kpiUnit: 'Sản phẩm',
        workStatus: 'in_progress' as const,
        description: 'Đang triển khai sản xuất 8 sản phẩm mới theo kế hoạch'
      }
    }
  ];

  const handleDemoRun = async (scenario: typeof demoScenarios[0]) => {
    setActiveDemo(scenario.id);
    
    const processedReport = await simulateProcessing({
      userName: user?.name || 'Demo User',
      userRole: user?.role || 'employee',
      ...scenario.data
    });
    
    if (processedReport) {
      setDemoReport(processedReport);
      
      // Publish demo result to realtime for demonstration
      if (user?.id) {
        try {
          await realtimeService.publishNotification(
            {
              title: 'AI Demo Completed',
              message: `Demo scenario "${scenario.title}" has been processed successfully`,
              type: 'info',
              data: { reportId: processedReport.id, scenario: scenario.title }
            },
            user.id
          );
        } catch (error) {
          console.error('Failed to publish demo notification:', error);
        }
      }
    }
    
    setActiveDemo('');
  };

  const aiFeatures = [
    {
      icon: <Brain className="w-6 h-6 text-blue-600" />,
      title: 'Chuẩn hóa Dữ liệu',
      description: 'Tự động chuẩn hóa đơn vị tiền tệ, KPI và format dữ liệu'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: 'Phân tích Xu hướng',
      description: 'So sánh với dữ liệu lịch sử và dự đoán xu hướng tương lai'
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      title: 'Cảnh báo Thông minh',
      description: 'Phát hiện anomaly và tạo cảnh báo realtime cho quản lý'
    },
    {
      icon: <Database className="w-6 h-6 text-purple-600" />,
      title: 'Cập nhật ERP-AI',
      description: 'Tự động cập nhật dữ liệu vào hệ thống ERP và tạo báo cáo'
    },
    {
      icon: <Bell className="w-6 h-6 text-red-600" />,
      title: 'Thông báo Realtime',
      description: 'Gửi thông báo tức thì cho các bên liên quan qua Supabase'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
      title: 'AI Insights',
      description: 'Tạo insights và khuyến nghị dựa trên machine learning'
    }
  ];

  const mockData = {
    totalReports: 1247,
    processedToday: 89,
    aiAccuracy: 94.7,
    avgProcessingTime: 2.3
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Reporting System</h1>
            <p className="text-muted-foreground">
              Hệ thống báo cáo thông minh với AI Agent tự động
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              AI Agent Active
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng báo cáo</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.totalReports.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% từ tháng trước</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Xử lý hôm nay</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.processedToday}</div>
              <p className="text-xs text-muted-foreground">+5% so với hôm qua</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Độ chính xác AI</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.aiAccuracy}%</div>
              <Progress value={mockData.aiAccuracy} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Thời gian xử lý</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.avgProcessingTime}s</div>
              <p className="text-xs text-muted-foreground">Trung bình mỗi báo cáo</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="features" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Tính năng AI</TabsTrigger>
            <TabsTrigger value="demo">Demo AI Agent</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          {/* AI Features */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Khả năng của AI Agent
                </CardTitle>
                <CardDescription>
                  AI Agent được trang bị các tính năng tiên tiến để xử lý báo cáo tự động
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {feature.icon}
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Process Flow */}
            <Card>
              <CardHeader>
                <CardTitle>Quy trình xử lý AI</CardTitle>
                <CardDescription>
                  Luồng xử lý tự động từ khi nhận báo cáo đến khi cập nhật ERP-AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4 justify-center">
                  {[
                    { step: 1, title: 'Nhận báo cáo', icon: <Database className="w-4 h-4" /> },
                    { step: 2, title: 'Chuẩn hóa dữ liệu', icon: <Brain className="w-4 h-4" /> },
                    { step: 3, title: 'Phân tích xu hướng', icon: <TrendingUp className="w-4 h-4" /> },
                    { step: 4, title: 'Tạo insights', icon: <Sparkles className="w-4 h-4" /> },
                    { step: 5, title: 'Cập nhật ERP', icon: <BarChart3 className="w-4 h-4" /> },
                    { step: 6, title: 'Gửi thông báo', icon: <Bell className="w-4 h-4" /> }
                  ].map((item, index) => (
                    <React.Fragment key={item.step}>
                      <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border shadow-sm">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-600">
                          {item.icon}
                        </div>
                        <span className="text-xs font-medium text-center">{item.title}</span>
                      </div>
                      {index < 5 && (
                        <div className="hidden md:block w-8 h-0.5 bg-gray-300" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Demo */}
          <TabsContent value="demo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Demo AI Agent
                </CardTitle>
                <CardDescription>
                  Chạy thử các kịch bản khác nhau để xem AI Agent hoạt động
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {demoScenarios.map((scenario) => (
                <Card key={scenario.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle className="text-lg">{scenario.title}</CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Công ty:</span>
                        <span className="font-medium">{scenario.data.company}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phòng ban:</span>
                        <span className="font-medium">{scenario.data.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Doanh thu:</span>
                        <span className="font-medium">{scenario.data.revenue.toLocaleString()} VNĐ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Trạng thái:</span>
                        <Badge variant={scenario.data.workStatus === 'completed' ? 'default' : 
                                      scenario.data.workStatus === 'delayed' ? 'destructive' : 'secondary'}>
                          {scenario.data.workStatus === 'completed' ? 'Hoàn thành' :
                           scenario.data.workStatus === 'delayed' ? 'Delay' : 'Đang thực hiện'}
                        </Badge>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleDemoRun(scenario)}
                      disabled={isProcessing}
                      className="w-full"
                      variant={scenario.id === 'risk-scenario' ? 'destructive' : 
                              scenario.id === 'high-performance' ? 'default' : 'secondary'}
                    >
                      {activeDemo === scenario.id ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Đang xử lý...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Chạy Demo
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Demo Results */}
            {(demoReport || lastProcessedReport) && (
              <Card>
                <CardHeader>
                  <CardTitle>Kết quả Demo</CardTitle>
                  <CardDescription>
                    Kết quả xử lý từ AI Agent cho kịch bản vừa chạy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AIInsights processedReport={demoReport || lastProcessedReport!} />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* AI Insights */}
          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI Insights Dashboard
                </CardTitle>
                <CardDescription>
                  Phân tích thông minh và khuyến nghị từ AI Agent
                </CardDescription>
              </CardHeader>
              <CardContent>
                {lastProcessedReport ? (
                   <AIInsights processedReport={lastProcessedReport} />
                 ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Chưa có dữ liệu để phân tích</p>
                    <p className="text-sm">Hãy chạy demo để xem AI Insights hoạt động</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIReportingPage;