import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  TrendingUp,
  Users,
  Target,
  DollarSign,
  BarChart3,
  MessageSquare,
  Bot,
  Send,
  Eye,
  Heart,
  Share2,
  Calendar,
  Award,
  Zap
} from "lucide-react";

interface MarketingDetailViewProps {
  onBack: () => void;
  organizations?: any[];
}

// Marketing-specific mock data
const mockMarketingData = {
  totalBudget: 2500000000, // 2.5 tỷ VNĐ
  campaignROI: 320, // 320%
  brandAwareness: 78, // 78%
  leadGeneration: 1250,
  socialEngagement: 85, // 85%
  contentViews: 450000,
  emailOpenRate: 42, // 42%
  conversionRate: 8.5, // 8.5%
  customerAcquisitionCost: 850000, // 850k VNĐ
  lifetimeValue: 12500000, // 12.5M VNĐ
  marketShare: 15.8, // 15.8%
  digitalReach: 2800000
};

const mockMarketingCampaigns = [
  {
    id: 1,
    name: "Chiến dịch Brand Awareness Q1",
    type: "Brand Building",
    status: "Đang chạy",
    budget: 800000000,
    spent: 650000000,
    reach: 1200000,
    engagement: 95000,
    conversions: 2800,
    startDate: "2024-01-15",
    endDate: "2024-03-31",
    channels: ["Facebook", "Google Ads", "TikTok", "YouTube"],
    targetAudience: "18-35 tuổi, thành thị",
    kpiMetrics: {
      impressions: 8500000,
      clicks: 425000,
      ctr: 5.0,
      cpc: 1530
    }
  },
  {
    id: 2,
    name: "Content Marketing - Giáo dục khách hàng",
    type: "Content Marketing",
    status: "Hoàn thành",
    budget: 450000000,
    spent: 445000000,
    reach: 850000,
    engagement: 128000,
    conversions: 1950,
    startDate: "2024-02-01",
    endDate: "2024-02-29",
    channels: ["Blog", "LinkedIn", "Email", "Webinar"],
    targetAudience: "Doanh nghiệp B2B",
    kpiMetrics: {
      contentViews: 650000,
      timeOnPage: 4.2,
      shareRate: 12.5,
      leadQuality: 8.7
    }
  },
  {
    id: 3,
    name: "Influencer Partnership Program",
    type: "Influencer Marketing",
    status: "Lên kế hoạch",
    budget: 600000000,
    spent: 0,
    reach: 0,
    engagement: 0,
    conversions: 0,
    startDate: "2024-04-01",
    endDate: "2024-06-30",
    channels: ["Instagram", "TikTok", "YouTube"],
    targetAudience: "Gen Z, Millennials",
    kpiMetrics: {
      influencerReach: 2000000,
      expectedEngagement: 180000,
      estimatedConversions: 3500,
      brandMentions: 850
    }
  }
];

const mockMarketingProjects = [
  {
    id: 1,
    name: "Rebranding Corporate Identity",
    category: "Brand Strategy",
    status: "Đang thực hiện",
    progress: 65,
    budget: 1200000000,
    timeline: "6 tháng",
    team: ["Creative Director", "Brand Manager", "Graphic Designer"],
    deliverables: ["Logo mới", "Brand Guidelines", "Marketing Collaterals"],
    impact: "Tăng nhận diện thương hiệu 40%"
  },
  {
    id: 2,
    name: "Digital Transformation Marketing",
    category: "Digital Marketing",
    status: "Hoàn thành",
    progress: 100,
    budget: 950000000,
    timeline: "4 tháng",
    team: ["Digital Manager", "SEO Specialist", "Data Analyst"],
    deliverables: ["Marketing Automation", "CRM Integration", "Analytics Dashboard"],
    impact: "Tăng lead quality 55%"
  },
  {
    id: 3,
    name: "Customer Experience Optimization",
    category: "CX Strategy",
    status: "Lên kế hoạch",
    progress: 15,
    budget: 750000000,
    timeline: "8 tháng",
    team: ["CX Manager", "UX Designer", "Customer Success"],
    deliverables: ["Journey Mapping", "Touchpoint Optimization", "Feedback System"],
    impact: "Tăng customer satisfaction 30%"
  }
];

const mockMarketingTasks = [
  {
    id: 1,
    title: "Phân tích hiệu quả campaign Q1",
    description: "Đánh giá ROI và đề xuất tối ưu cho Q2",
    assignee: "Marketing Analyst",
    priority: "Cao",
    status: "Đang thực hiện",
    dueDate: "2024-04-05",
    category: "Analytics",
    estimatedHours: 16,
    businessImpact: "Tối ưu ngân sách marketing 25%",
    dependencies: ["Data collection", "Campaign reports"]
  },
  {
    id: 2,
    title: "Thiết kế creative cho campaign mùa hè",
    description: "Tạo bộ visual identity cho chiến dịch summer",
    assignee: "Creative Team",
    priority: "Trung bình",
    status: "Chờ duyệt",
    dueDate: "2024-04-15",
    category: "Creative",
    estimatedHours: 40,
    businessImpact: "Tăng brand engagement 20%",
    dependencies: ["Brand guidelines", "Market research"]
  },
  {
    id: 3,
    title: "Xây dựng content calendar Q2",
    description: "Lập kế hoạch nội dung 3 tháng tiếp theo",
    assignee: "Content Manager",
    priority: "Cao",
    status: "Hoàn thành",
    dueDate: "2024-03-30",
    category: "Content Strategy",
    estimatedHours: 24,
    businessImpact: "Tăng content consistency 100%",
    dependencies: ["Editorial guidelines", "SEO research"]
  }
];

const mockMarketingMetrics = [
  {
    id: 1,
    name: "Website Traffic",
    value: "125,000",
    unit: "visits/month",
    change: "+18%",
    trend: "up",
    icon: Eye
  },
  {
    id: 2,
    name: "Social Media Followers",
    value: "89,500",
    unit: "followers",
    change: "+12%",
    trend: "up",
    icon: Users
  },
  {
    id: 3,
    name: "Email Subscribers",
    value: "34,200",
    unit: "subscribers",
    change: "+8%",
    trend: "up",
    icon: MessageSquare
  },
  {
    id: 4,
    name: "Brand Mentions",
    value: "2,850",
    unit: "mentions/month",
    change: "+25%",
    trend: "up",
    icon: Share2
  }
];

export function MarketingDetailView({ onBack, organizations }: MarketingDetailViewProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "ai",
      message: "Xin chào! Tôi là Marketing AI Assistant. Tôi có thể giúp bạn phân tích hiệu quả campaign, tối ưu ngân sách marketing và đề xuất chiến lược brand building. Bạn cần hỗ trợ gì?"
    }
  ]);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatHistory([...chatHistory, 
        { type: "user", message: chatMessage },
        { type: "ai", message: "Cảm ơn bạn đã liên hệ! Tôi đang phân tích dữ liệu marketing để đưa ra phản hồi phù hợp. Vui lòng chờ trong giây lát..." }
      ]);
      setChatMessage("");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Phòng Marketing</h1>
            <p className="text-gray-600 dark:text-gray-400">Marketing, truyền thông và xây dựng thương hiệu</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
          Marketing Agent
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Ngân sách Marketing</p>
                <p className="text-2xl font-bold">{formatCurrency(mockMarketingData.totalBudget)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Campaign ROI</p>
                <p className="text-2xl font-bold">{mockMarketingData.campaignROI}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Brand Awareness</p>
                <p className="text-2xl font-bold">{mockMarketingData.brandAwareness}%</p>
              </div>
              <Award className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Lead Generation</p>
                <p className="text-2xl font-bold">{formatNumber(mockMarketingData.leadGeneration)}</p>
              </div>
              <Target className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Marketing Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockMarketingMetrics.map((metric) => {
          const IconComponent = metric.icon;
          return (
            <Card key={metric.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium">{metric.name}</span>
                  </div>
                  <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'}>
                    {metric.change}
                  </Badge>
                </div>
                <div className="mt-2">
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-gray-500">{metric.unit}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Tabs */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="projects">Dự án</TabsTrigger>
              <TabsTrigger value="tasks">Nhiệm vụ</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Hiệu quả Marketing Tổng quan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Social Engagement</p>
                      <p className="text-xl font-bold">{mockMarketingData.socialEngagement}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Content Views</p>
                      <p className="text-xl font-bold">{formatNumber(mockMarketingData.contentViews)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email Open Rate</p>
                      <p className="text-xl font-bold">{mockMarketingData.emailOpenRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Conversion Rate</p>
                      <p className="text-xl font-bold">{mockMarketingData.conversionRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">CAC</p>
                      <p className="text-xl font-bold">{formatCurrency(mockMarketingData.customerAcquisitionCost)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">LTV</p>
                      <p className="text-xl font-bold">{formatCurrency(mockMarketingData.lifetimeValue)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-4">
              {mockMarketingCampaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <Badge variant={campaign.status === 'Đang chạy' ? 'default' : campaign.status === 'Hoàn thành' ? 'secondary' : 'outline'}>
                        {campaign.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Ngân sách</p>
                        <p className="font-semibold">{formatCurrency(campaign.budget)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Đã chi</p>
                        <p className="font-semibold">{formatCurrency(campaign.spent)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Reach</p>
                        <p className="font-semibold">{formatNumber(campaign.reach)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Conversions</p>
                        <p className="font-semibold">{formatNumber(campaign.conversions)}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Kênh truyền thông:</p>
                      <div className="flex flex-wrap gap-2">
                        {campaign.channels.map((channel, index) => (
                          <Badge key={index} variant="outline">{channel}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              {mockMarketingProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge variant={project.status === 'Đang thực hiện' ? 'default' : project.status === 'Hoàn thành' ? 'secondary' : 'outline'}>
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Tiến độ</span>
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Ngân sách</p>
                          <p className="font-semibold">{formatCurrency(project.budget)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Thời gian</p>
                          <p className="font-semibold">{project.timeline}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Tác động kinh doanh</p>
                        <p className="text-sm font-medium text-green-600">{project.impact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4">
              {mockMarketingTasks.map((task) => (
                <Card key={task.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant={task.priority === 'Cao' ? 'destructive' : 'secondary'}>
                          {task.priority}
                        </Badge>
                        <Badge variant={task.status === 'Hoàn thành' ? 'default' : 'outline'}>
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">{task.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Người thực hiện</p>
                        <p className="font-semibold">{task.assignee}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Hạn hoàn thành</p>
                        <p className="font-semibold">{task.dueDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Thời gian ước tính</p>
                        <p className="font-semibold">{task.estimatedHours}h</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Danh mục</p>
                        <p className="font-semibold">{task.category}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-1">Tác động kinh doanh</p>
                      <p className="text-sm font-medium text-blue-600">{task.businessImpact}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - AI Assistant */}
        <div>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>Marketing AI Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-64 overflow-y-auto space-y-2 p-2 bg-gray-50 dark:bg-gray-900 rounded">
                  {chatHistory.map((chat, index) => (
                    <div key={index} className={`p-2 rounded text-sm ${
                      chat.type === 'user' 
                        ? 'bg-blue-500 text-white ml-4' 
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mr-4'
                    }`}>
                      {chat.message}
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Hỏi về chiến lược marketing..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}