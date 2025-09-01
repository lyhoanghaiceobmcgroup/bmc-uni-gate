import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bot, 
  Brain, 
  TrendingUp, 
  Building2, 
  Factory, 
  Globe, 
  Zap, 
  FileText, 
  BarChart3, 
  PieChart, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Send, 
  Download, 
  RefreshCw,
  Eye,
  MessageSquare,
  Layers,
  Network
} from 'lucide-react';

// Define AI Agent levels
interface AIAgent {
  id: string;
  name: string;
  level: 'department' | 'company' | 'industry' | 'holdings';
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  capabilities: string[];
  reports: AIReport[];
  status: 'active' | 'processing' | 'idle';
  lastUpdate: string;
}

interface AIReport {
  id: string;
  title: string;
  type: 'realtime' | 'daily' | 'weekly' | 'monthly' | 'quarterly';
  summary: string;
  insights: string[];
  recommendations: string[];
  confidence: number;
  dataPoints: number;
  generatedAt: string;
  priority: 'high' | 'medium' | 'low';
}

interface ReportQuery {
  id: string;
  query: string;
  response: string;
  timestamp: string;
  agentId: string;
  processingTime: number;
}

// Mock AI Agents data
const AI_AGENTS: AIAgent[] = [
  {
    id: 'dept_finance',
    name: 'AI Tài chính',
    level: 'department',
    description: 'Phân tích dữ liệu tài chính, dự báo dòng tiền, cảnh báo rủi ro',
    icon: TrendingUp,
    color: 'bg-green-100 text-green-800 border-green-200',
    capabilities: [
      'Phân tích báo cáo tài chính realtime',
      'Dự báo dòng tiền 3-6 tháng',
      'Cảnh báo rủi ro thanh khoản',
      'Tối ưu hóa cấu trúc vốn',
      'Phân tích hiệu quả đầu tư'
    ],
    status: 'active',
    lastUpdate: '2025-01-15T14:30:00Z',
    reports: [
      {
        id: 'fin_001',
        title: 'Báo cáo Dòng tiền Realtime',
        type: 'realtime',
        summary: 'Dòng tiền dương 8.5B VND, tăng 12% so với tháng trước. Thanh khoản ổn định.',
        insights: [
          'Thu từ hoạt động kinh doanh tăng mạnh 18.5%',
          'Chi phí vận hành được kiểm soát tốt, giảm 3.2%',
          'Tỷ lệ thu hồi công nợ cải thiện lên 94%'
        ],
        recommendations: [
          'Tăng đầu tư vào R&D để duy trì tăng trưởng',
          'Xem xét mở rộng thị trường xuất khẩu',
          'Tối ưu hóa chu kỳ thu tiền từ khách hàng'
        ],
        confidence: 92,
        dataPoints: 1247,
        generatedAt: '2025-01-15T14:25:00Z',
        priority: 'high'
      }
    ]
  },
  {
    id: 'dept_hr',
    name: 'AI Nhân sự',
    level: 'department',
    description: 'Phân tích hiệu suất nhân sự, tuyển dụng và quản lý lao động',
    icon: Brain,
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    capabilities: [
      'Phân tích hiệu suất nhân viên',
      'Dự báo nhu cầu tuyển dụng',
      'Tối ưu hóa quy trình HR',
      'Đánh giá mức độ hài lòng nhân viên',
      'Phân tích xu hướng nghỉ việc'
    ],
    status: 'active',
    lastUpdate: '2025-01-15T13:45:00Z',
    reports: [
      {
        id: 'hr_001',
        title: 'Phân tích Hiệu suất Nhân sự Q1',
        type: 'monthly',
        summary: 'Tỷ lệ chấm công đạt 96.5%, tỷ lệ giữ chân nhân viên 97.9%, chi phí tuyển dụng giảm 12%.',
        insights: [
          'Tỷ lệ turnover thấp kỷ lục chỉ 2.1%',
          'Hiệu quả tuyển dụng qua AI tăng 35%',
          'Mức độ hài lòng nhân viên đạt 4.7/5'
        ],
        recommendations: [
          'Mở rộng chương trình retention cho nhân viên key',
          'Tăng cường sử dụng AI trong screening CV',
          'Phát triển career path rõ ràng cho từng vị trí'
        ],
        confidence: 92,
        dataPoints: 1247,
        generatedAt: '2025-01-15T13:40:00Z',
        priority: 'high'
      }
    ]
  },
  {
    id: 'dept_training',
    name: 'AI Đào tạo',
    level: 'department',
    description: 'Phân tích hiệu quả đào tạo, phát triển năng lực nhân viên',
    icon: Brain,
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    capabilities: [
      'Đánh giá hiệu quả chương trình đào tạo',
      'Phân tích skill gap và training needs',
      'Tối ưu hóa learning path cá nhân hóa',
      'Dự báo ROI của các khóa đào tạo',
      'Theo dõi tiến độ phát triển kỹ năng'
    ],
    status: 'active',
    lastUpdate: '2025-01-15T14:15:00Z',
    reports: [
      {
        id: 'train_001',
        title: 'Báo cáo Hiệu quả Đào tạo Q1',
        type: 'monthly',
        summary: 'Tỷ lệ hoàn thành khóa học 89.3%, skill improvement +15.2%, ROI đào tạo đạt 285%.',
        insights: [
          '28 chương trình đào tạo đang triển khai',
          'Khóa học AI/ML có tỷ lệ hoàn thành cao nhất 94%',
          'Năng lực nhân viên tech tăng 22% sau đào tạo'
        ],
        recommendations: [
          'Mở rộng chương trình e-learning cho remote workers',
          'Phát triển microlearning cho busy executives',
          'Tăng cường mentoring program cho junior staff'
        ],
        confidence: 87,
        dataPoints: 892,
        generatedAt: '2025-01-15T14:10:00Z',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'company_ai',
    name: 'AI Công ty/Dự án',
    level: 'company',
    description: 'Tổng hợp báo cáo từ tất cả phòng ban, phân tích toàn diện',
    icon: Building2,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    capabilities: [
      'Tổng hợp báo cáo đa phòng ban',
      'Phân tích hiệu quả hoạt động tổng thể',
      'Dự báo tăng trưởng doanh nghiệp',
      'Đánh giá rủi ro toàn công ty',
      'Tối ưu hóa quy trình liên phòng ban'
    ],
    status: 'active',
    lastUpdate: '2025-01-15T15:00:00Z',
    reports: [
      {
        id: 'comp_001',
        title: 'Báo cáo Tổng hợp Công ty',
        type: 'weekly',
        summary: 'Doanh thu tuần tăng 15.2%, lợi nhuận ròng đạt 3.8B VND. Tất cả KPI chính đều đạt mục tiêu.',
        insights: [
          'Phòng Kinh doanh vượt mục tiêu 120%',
          'Hiệu suất sản xuất cải thiện 12% nhờ tự động hóa',
          'Chi phí vận hành giảm 8% so với cùng kỳ năm trước'
        ],
        recommendations: [
          'Tăng cường đầu tư vào công nghệ tự động hóa',
          'Mở rộng thị trường sang khu vực Đông Nam Á',
          'Phát triển sản phẩm mới dựa trên AI'
        ],
        confidence: 95,
        dataPoints: 3421,
        generatedAt: '2025-01-15T14:55:00Z',
        priority: 'high'
      }
    ]
  },
  {
    id: 'industry_f1',
    name: 'AI Cụm ngành (F1)',
    level: 'industry',
    description: 'Phân tích so sánh với các công ty cùng ngành, benchmark hiệu quả',
    icon: Factory,
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    capabilities: [
      'So sánh hiệu quả với đối thủ cạnh tranh',
      'Phân tích xu hướng ngành',
      'Đánh giá vị thế thị trường',
      'Dự báo biến động ngành',
      'Tối ưu hóa chiến lược cạnh tranh'
    ],
    status: 'active',
    lastUpdate: '2025-01-15T12:20:00Z',
    reports: [
      {
        id: 'ind_001',
        title: 'Benchmark Ngành Công nghệ',
        type: 'monthly',
        summary: 'Công ty đứng thứ 3/15 về hiệu quả hoạt động, thứ 2 về tăng trưởng doanh thu.',
        insights: [
          'ROI cao hơn trung bình ngành 25%',
          'Tốc độ tăng trưởng vượt trội so với đối thủ',
          'Thị phần tăng từ 12% lên 15.8% trong 6 tháng'
        ],
        recommendations: [
          'Tăng cường marketing để củng cố vị thế',
          'Đầu tư R&D để duy trì lợi thế công nghệ',
          'Mở rộng mạng lưới phân phối'
        ],
        confidence: 87,
        dataPoints: 2156,
        generatedAt: '2025-01-15T12:15:00Z',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'holdings_bmc',
    name: 'AI Tập đoàn (BMC Holdings)',
    level: 'holdings',
    description: 'Phân tích toàn bộ hệ sinh thái, tối ưu hóa danh mục đầu tư',
    icon: Globe,
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    capabilities: [
      'Tổng hợp báo cáo toàn tập đoàn',
      'Tối ưu hóa danh mục đầu tư',
      'Phân tích rủi ro hệ thống',
      'Dự báo xu hướng macro',
      'Q&A tự nhiên toàn hệ thống'
    ],
    status: 'active',
    lastUpdate: '2025-01-15T15:30:00Z',
    reports: [
      {
        id: 'hold_001',
        title: 'Báo cáo Tổng hợp Tập đoàn',
        type: 'quarterly',
        summary: 'Tổng doanh thu tập đoàn đạt 125B VND, tăng 22% so với cùng kỳ. ROI danh mục đầu tư 18.5%.',
        insights: [
          'Tất cả 12 công ty con đều có lợi nhuận dương',
          'Ngành công nghệ đóng góp 45% tổng lợi nhuận',
          'Danh mục đầu tư đa dạng hóa hiệu quả'
        ],
        recommendations: [
          'Tăng tỷ trọng đầu tư vào AI và blockchain',
          'Mở rộng sang thị trường quốc tế',
          'Phát triển hệ sinh thái fintech'
        ],
        confidence: 96,
        dataPoints: 15847,
        generatedAt: '2025-01-15T15:25:00Z',
        priority: 'high'
      }
    ]
  }
];

// Mock Q&A queries
const SAMPLE_QUERIES: ReportQuery[] = [
  {
    id: 'q1',
    query: 'AI ơi, cho tôi xem tổng lợi nhuận ròng toàn tập đoàn tháng 1/2025',
    response: 'Tổng lợi nhuận ròng của BMC Holdings trong tháng 1/2025 là 12.8B VND, tăng 18.5% so với tháng 12/2024. Trong đó: Ngành công nghệ đóng góp 5.8B (45%), Ngành sản xuất 3.2B (25%), Ngành dịch vụ tài chính 2.4B (19%), và các ngành khác 1.4B (11%).',
    timestamp: '2025-01-15T15:35:00Z',
    agentId: 'holdings_bmc',
    processingTime: 1.2
  },
  {
    id: 'q2',
    query: 'Phân tích hiệu quả hoạt động của phòng nhân sự trong Q4/2024',
    response: 'Phòng Nhân sự Q4/2024 đạt hiệu quả cao với các chỉ số: Tỷ lệ giữ chân nhân viên 94% (+2% so với Q3), Năng suất lao động tăng 8.5%, Chi phí tuyển dụng giảm 15% nhờ tự động hóa quy trình. Đặc biệt, chương trình đào tạo AI đã nâng cao kỹ năng cho 85% nhân viên.',
    timestamp: '2025-01-15T14:20:00Z',
    agentId: 'dept_hr',
    processingTime: 0.8
  }
];

interface AIReportingSystemProps {
  userRole?: string;
  accessLevel?: 'department' | 'company' | 'industry' | 'holdings';
}

const AIReportingSystem: React.FC<AIReportingSystemProps> = ({ 
  userRole = 'ceo',
  accessLevel = 'company'
}) => {
  const [selectedAgent, setSelectedAgent] = useState<AIAgent>(AI_AGENTS[0]);
  const [query, setQuery] = useState('');
  const [queries, setQueries] = useState<ReportQuery[]>(SAMPLE_QUERIES);
  const [isProcessing, setIsProcessing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Filter agents based on access level
  const getAccessibleAgents = () => {
    const levelHierarchy = {
      'department': ['department'],
      'company': ['department', 'company'],
      'industry': ['department', 'company', 'industry'],
      'holdings': ['department', 'company', 'industry', 'holdings']
    };
    
    const allowedLevels = levelHierarchy[accessLevel] || ['department'];
    return AI_AGENTS.filter(agent => allowedLevels.includes(agent.level));
  };

  const accessibleAgents = getAccessibleAgents();

  const handleQuery = async () => {
    if (!query.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newQuery: ReportQuery = {
      id: `q${Date.now()}`,
      query: query,
      response: `Đây là phản hồi mô phỏng từ ${selectedAgent.name} cho câu hỏi: "${query}". Hệ thống AI đang phân tích dữ liệu realtime và sẽ cung cấp thông tin chi tiết dựa trên ${Math.floor(Math.random() * 5000) + 1000} điểm dữ liệu từ cơ sở dữ liệu ERP.`,
      timestamp: new Date().toISOString(),
      agentId: selectedAgent.id,
      processingTime: Math.random() * 2 + 0.5
    };
    
    setQueries(prev => [newQuery, ...prev]);
    setQuery('');
    setIsProcessing(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const getAgentStatusIcon = (status: 'active' | 'processing' | 'idle') => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing': return <Clock className="w-4 h-4 text-yellow-600 animate-pulse" />;
      case 'idle': return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getLevelBadge = (level: string) => {
    const levelConfig = {
      'department': { label: 'Phòng ban', color: 'bg-green-100 text-green-800' },
      'company': { label: 'Công ty', color: 'bg-blue-100 text-blue-800' },
      'industry': { label: 'Cụm ngành', color: 'bg-purple-100 text-purple-800' },
      'holdings': { label: 'Tập đoàn', color: 'bg-indigo-100 text-indigo-800' }
    };
    
    const config = levelConfig[level as keyof typeof levelConfig] || levelConfig.department;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Bot className="w-8 h-8 text-primary" />
            Hệ thống AI Báo cáo Đa tầng
          </h1>
          <p className="text-muted-foreground">
            AI Agent thông minh • Phân tích realtime • Q&A tự nhiên • Cấp truy cập: {accessLevel}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
        </div>
      </div>

      {/* AI Agent Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {accessibleAgents.map((agent) => {
          const Icon = agent.icon;
          const isSelected = selectedAgent.id === agent.id;
          
          return (
            <Card 
              key={agent.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedAgent(agent)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Icon className="w-5 h-5 text-primary" />
                  {getAgentStatusIcon(agent.status)}
                </div>
                <CardTitle className="text-sm">{agent.name}</CardTitle>
                <div className="flex gap-1">
                  {getLevelBadge(agent.level)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{agent.description}</p>
                <div className="mt-2 text-xs text-muted-foreground">
                  Cập nhật: {new Date(agent.lastUpdate).toLocaleString('vi-VN')}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Selected Agent Details */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <selectedAgent.icon className="w-5 h-5" />
                {selectedAgent.name}
                {getLevelBadge(selectedAgent.level)}
              </CardTitle>
              <CardDescription>{selectedAgent.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Khả năng AI:</h4>
                  <div className="space-y-1">
                    {selectedAgent.capabilities.map((capability, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Zap className="w-3 h-3 text-yellow-500" />
                        {capability}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    {getAgentStatusIcon(selectedAgent.status)}
                    <span className="text-sm capitalize">{selectedAgent.status}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {selectedAgent.reports.length} báo cáo
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Latest Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Báo cáo Mới nhất
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedAgent.reports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{report.title}</h4>
                      <Badge variant={report.priority === 'high' ? 'destructive' : 
                                   report.priority === 'medium' ? 'default' : 'secondary'}>
                        {report.type}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{report.summary}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <strong>Insights:</strong>
                        <ul className="mt-1 space-y-1">
                          {report.insights.slice(0, 2).map((insight, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-blue-500">•</span>
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong>Khuyến nghị:</strong>
                        <ul className="mt-1 space-y-1">
                          {report.recommendations.slice(0, 2).map((rec, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-green-500">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Độ tin cậy: {report.confidence}%</span>
                        <span>{report.dataPoints.toLocaleString()} điểm dữ liệu</span>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          Xem
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          Tải
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Q&A Natural Language Interface */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Trung tâm Q&A Tự nhiên
              </CardTitle>
              <CardDescription>
                Hỏi đáp trực tiếp với AI Agent bằng ngôn ngữ tự nhiên
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Ví dụ: AI ơi, cho tôi xem tổng lợi nhuận ròng toàn tập đoàn tháng 1/2025..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                <Button 
                  onClick={handleQuery}
                  disabled={isProcessing || !query.trim()}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-pulse" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Gửi câu hỏi
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Query History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Lịch sử Truy vấn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {queries.map((q) => {
                  const agent = AI_AGENTS.find(a => a.id === q.agentId);
                  const AgentIcon = agent?.icon || Bot;
                  
                  return (
                    <div key={q.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <AgentIcon className="w-4 h-4 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          {agent?.name} • {q.processingTime.toFixed(1)}s
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {new Date(q.timestamp).toLocaleString('vi-VN')}
                        </span>
                      </div>
                      
                      <div className="bg-muted/50 rounded p-2">
                        <p className="text-sm font-medium">Q: {q.query}</p>
                      </div>
                      
                      <div className="bg-primary/5 rounded p-2">
                        <p className="text-sm">A: {q.response}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Architecture Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="w-5 h-5" />
            Kiến trúc Hệ thống AI Đa tầng
          </CardTitle>
          <CardDescription>
            Luồng dữ liệu và báo cáo từ Phòng ban → Công ty → Cụm ngành → Tập đoàn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { level: 'department', label: 'AI Phòng ban', icon: TrendingUp, desc: 'Phân tích dữ liệu module riêng' },
              { level: 'company', label: 'AI Công ty', icon: Building2, desc: 'Tổng hợp báo cáo phòng ban' },
              { level: 'industry', label: 'AI Cụm ngành (F1)', icon: Factory, desc: 'So sánh benchmark ngành' },
              { level: 'holdings', label: 'AI Tập đoàn (BMC)', icon: Globe, desc: 'Tổng hợp toàn hệ thống' }
            ].map((item, index) => {
              const Icon = item.icon;
              const isAccessible = accessibleAgents.some(a => a.level === item.level);
              
              return (
                <div key={item.level} className="relative">
                  <Card className={`${isAccessible ? '' : 'opacity-50'}`}>
                    <CardContent className="p-4 text-center">
                      <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-medium text-sm">{item.label}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                      {!isAccessible && (
                        <Badge variant="secondary" className="mt-2 text-xs">Không có quyền</Badge>
                      )}
                    </CardContent>
                  </Card>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Access Level Notice */}
      {accessLevel !== 'holdings' && (
        <Alert>
          <Layers className="h-4 w-4" />
          <AlertDescription>
            Bạn đang truy cập với cấp độ <strong>{accessLevel}</strong>. 
            Một số AI Agent cấp cao hơn có thể không khả dụng. 
            Liên hệ BMC Holdings để được nâng cấp quyền truy cập.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AIReportingSystem;