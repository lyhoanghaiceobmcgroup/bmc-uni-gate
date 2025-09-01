import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Store, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  Plus,
  Target,
  Building2
} from "lucide-react";
import { ProjectBranchView } from "./ProjectBranchView";
import { StartupView } from "./StartupView";
import { useState } from "react";

interface ProjectViewProps {
  organizations: any[];
}

export function ProjectView({ organizations }: ProjectViewProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  const projects = organizations.filter(org => 
    org.organizations?.level === 'F5' || org.organizations?.level === 'F4'
  );

  // Handle detailed views
  if (selectedProject?.type === "branch") {
    return (
      <ProjectBranchView 
        onBack={() => setSelectedProject(null)}
        organizations={organizations}
        selectedProject={selectedProject}
      />
    );
  }

  if (selectedProject?.type === "startup") {
    return (
      <StartupView 
        onBack={() => setSelectedProject(null)}
        organizations={organizations}
        selectedStartup={selectedProject}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">🏬 Dự án / Chi nhánh</h1>
          <p className="text-muted-foreground mt-2">
            Quản lý từng dự án riêng biệt hoặc chi nhánh kinh doanh
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Building2 className="h-4 w-4 mr-2" />
            Xem danh sách
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Thêm Dự Án
          </Button>
        </div>
      </div>

      {/* Projects Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tổng Dự Án</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              F5 (Startup) + F4 (Chi nhánh)
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Đang Hoạt Động</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {projects.filter(p => p.organizations?.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Dự án đang vận hành
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tổng Đầu Tư</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(projects.reduce((sum, p) => sum + (p.organizations?.total_investment_value || 0), 0) / 1000000).toFixed(0)}M
            </div>
            <p className="text-xs text-muted-foreground">
              VNĐ đầu tư tổng cộng
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">ROI Trung Bình</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">24.5%</div>
            <p className="text-xs text-muted-foreground">
              Tỷ suất lợi nhuận bình quân
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Project Timeline & Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>📋 Danh Sách Dự Án</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div 
                    key={index} 
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      if (project.organizations?.level === 'F4') {
                        setSelectedProject({ type: "branch", level: "F4", data: project });
                      } else if (project.organizations?.level === 'F5') {
                        setSelectedProject({ type: "startup", level: "F5", data: project });
                      }
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">
                          {project.organizations?.level === 'F4' ? '🏪 F4 Chi nhánh' : '🚀 F5 Startup'}
                        </Badge>
                        <h4 className="font-medium">{project.organizations?.name}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={project.organizations?.status === 'active' ? 'default' : 'secondary'}
                        >
                          {project.organizations?.status || 'planning'}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (project.organizations?.level === 'F4') {
                              setSelectedProject({ type: "branch", level: "F4", data: project });
                            } else if (project.organizations?.level === 'F5') {
                              setSelectedProject({ type: "startup", level: "F5", data: project });
                            }
                          }}
                        >
                          📊 Xem chi tiết
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Ngành:</span>
                        <div className="font-medium">{project.organizations?.industry}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">BMC:</span>
                        <div className="font-medium">{project.organizations?.bmc_equity_percentage}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Đầu tư:</span>
                        <div className="font-medium">
                          {(project.organizations?.total_investment_value / 1000000).toFixed(0)}M VNĐ
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Năm:</span>
                        <div className="font-medium">{project.organizations?.investment_year}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tiến độ dự án</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                ))}
                
                {projects.length === 0 && (
                  <div className="text-center py-12">
                    <Store className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Chưa có dự án nào</h3>
                    <p className="text-muted-foreground">
                      Hãy tạo dự án đầu tiên để bắt đầu
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Management Tools */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📆 Quản Lý Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setSelectedProject({ type: "branch", level: "F4" })}
              >
                <Building2 className="h-4 w-4 mr-2" />
                🏪 F4 - Chi nhánh View
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setSelectedProject({ type: "startup", level: "F5" })}
              >
                <Target className="h-4 w-4 mr-2" />
                🚀 F5 - Startup View
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                👥 Quản lý nhân sự
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                💰 Báo cáo tài chính
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🚨 Cảnh Báo AI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                    Dự án RAN Café chậm tiến độ 2 tuần
                  </p>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">
                    Chi phí GAJ Jewelry vượt ngân sách 15%
                  </p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    3 dự án F5 cần đánh giá định kỳ
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Project Performance Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Phân Tích Hiệu Quả Dự Án</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center border-2 border-dashed">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">
                Biểu đồ so sánh hiệu quả, ROI, và tiến độ các dự án
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}