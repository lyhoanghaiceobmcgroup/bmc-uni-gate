import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  GraduationCap, 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp,
  Calendar,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Bot,
  Lightbulb,
  Star,
  PlayCircle,
  FileText,
  User
} from "lucide-react";

interface TrainingDetailViewProps {
  onBack: () => void;
}

export function TrainingDetailView({ onBack }: TrainingDetailViewProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data cho phòng Đào tạo
  const trainingData = {
    overview: {
      totalPrograms: 28,
      activePrograms: 18,
      completionRate: 89.3,
      budget: "120M VNĐ",
      participants: 847,
      skillGrowth: 15.2,
      certifications: 156,
      trainers: 12
    },
    programs: [
      {
        id: 1,
        name: "Leadership Excellence Program",
        category: "Lãnh đạo",
        duration: "3 tháng",
        participants: 45,
        completion: 92,
        status: "Đang diễn ra",
        budget: "15M VNĐ",
        trainer: "Nguyễn Văn A",
        startDate: "01/03/2024"
      },
      {
        id: 2,
        name: "Digital Transformation Skills",
        category: "Công nghệ",
        duration: "2 tháng",
        participants: 78,
        completion: 87,
        status: "Đang diễn ra",
        budget: "12M VNĐ",
        trainer: "Trần Thị B",
        startDate: "15/02/2024"
      },
      {
        id: 3,
        name: "Customer Service Excellence",
        category: "Dịch vụ khách hàng",
        duration: "1 tháng",
        participants: 124,
        completion: 95,
        status: "Hoàn thành",
        budget: "8M VNĐ",
        trainer: "Lê Văn C",
        startDate: "01/01/2024"
      },
      {
        id: 4,
        name: "Financial Analysis & Planning",
        category: "Tài chính",
        duration: "6 tuần",
        participants: 32,
        completion: 78,
        status: "Đang diễn ra",
        budget: "10M VNĐ",
        trainer: "Phạm Thị D",
        startDate: "20/02/2024"
      }
    ],
    skills: [
      { name: "Lãnh đạo", growth: 18.5, participants: 156 },
      { name: "Công nghệ số", growth: 22.3, participants: 234 },
      { name: "Giao tiếp", growth: 15.7, participants: 189 },
      { name: "Quản lý dự án", growth: 19.2, participants: 98 },
      { name: "Phân tích dữ liệu", growth: 25.1, participants: 67 }
    ],
    aiInsights: [
      {
        type: "recommendation",
        title: "Tăng cường đào tạo kỹ năng số",
        description: "Nên mở thêm 2-3 khóa học về AI và Machine Learning để đáp ứng nhu cầu chuyển đổi số.",
        priority: "Cao",
        impact: "Tích cực"
      },
      {
        type: "alert",
        title: "Tỷ lệ hoàn thành thấp",
        description: "Khóa Financial Analysis có tỷ lệ hoàn thành 78%, cần can thiệp để cải thiện.",
        priority: "Trung bình",
        impact: "Cần theo dõi"
      },
      {
        type: "success",
        title: "Hiệu quả đào tạo cao",
        description: "Khóa Customer Service đạt 95% hoàn thành, có thể nhân rộng mô hình này.",
        priority: "Thấp",
        impact: "Tích cực"
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              🎓 Phòng Đào tạo
              <Badge variant="secondary">AI Training Assistant</Badge>
            </h1>
            <p className="text-muted-foreground">Phát triển năng lực và đào tạo nhân viên</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
            <Bot className="w-3 h-3 mr-1" />
            AI Training Agent
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="programs">Chương trình</TabsTrigger>
          <TabsTrigger value="skills">Kỹ năng</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tổng chương trình</p>
                    <p className="text-2xl font-bold">{trainingData.overview.totalPrograms}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-indigo-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Đang diễn ra</p>
                    <p className="text-2xl font-bold">{trainingData.overview.activePrograms}</p>
                  </div>
                  <PlayCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tỷ lệ hoàn thành</p>
                    <p className="text-2xl font-bold">{trainingData.overview.completionRate}%</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Ngân sách</p>
                    <p className="text-2xl font-bold">{trainingData.overview.budget}</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Thống kê đào tạo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Học viên tham gia</span>
                  <span className="text-lg font-bold">{trainingData.overview.participants}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Tăng trưởng kỹ năng</span>
                  <span className="text-lg font-bold text-green-600">+{trainingData.overview.skillGrowth}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Chứng chỉ cấp</span>
                  <span className="text-lg font-bold">{trainingData.overview.certifications}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Giảng viên</span>
                  <span className="text-lg font-bold">{trainingData.overview.trainers}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  AI Training Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Phân tích hiệu quả đào tạo</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Đề xuất chương trình phù hợp</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Theo dõi tiến độ học tập</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Dự báo nhu cầu đào tạo</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Programs Tab */}
        <TabsContent value="programs" className="space-y-6">
          <div className="grid gap-4">
            {trainingData.programs.map((program) => (
              <Card key={program.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{program.name}</h3>
                        <Badge variant={program.status === "Hoàn thành" ? "default" : "secondary"}>
                          {program.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Danh mục:</span>
                          <p className="font-medium">{program.category}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Thời gian:</span>
                          <p className="font-medium">{program.duration}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Học viên:</span>
                          <p className="font-medium">{program.participants} người</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Ngân sách:</span>
                          <p className="font-medium">{program.budget}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Tiến độ hoàn thành</span>
                          <span className="text-sm font-medium">{program.completion}%</span>
                        </div>
                        <Progress value={program.completion} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Phát triển kỹ năng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {trainingData.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{skill.name}</span>
                        <Badge variant="outline">{skill.participants} người</Badge>
                      </div>
                      <span className="text-sm font-medium text-green-600">+{skill.growth}%</span>
                    </div>
                    <Progress value={skill.growth * 3} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="ai-insights" className="space-y-6">
          <div className="grid gap-4">
            {trainingData.aiInsights.map((insight, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {insight.type === "recommendation" && <Lightbulb className="w-6 h-6 text-yellow-600" />}
                      {insight.type === "alert" && <AlertCircle className="w-6 h-6 text-red-600" />}
                      {insight.type === "success" && <CheckCircle className="w-6 h-6 text-green-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{insight.title}</h3>
                        <Badge variant={insight.priority === "Cao" ? "destructive" : insight.priority === "Trung bình" ? "default" : "secondary"}>
                          {insight.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Tác động:</span>
                        <Badge variant="outline" className="text-xs">{insight.impact}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}