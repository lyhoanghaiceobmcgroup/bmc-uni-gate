import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Building2, DollarSign, Users, TrendingUp, BarChart3, Calendar, Plus, Rocket, Target, ArrowUp, Edit3, Settings } from "lucide-react";
import { ProjectBranchView } from "./ProjectBranchView";
import { StartupView } from "./StartupView";
import { AutoTieringSystem } from "../AutoTieringSystem";
import { DataEntryForms } from "../DataEntryForms";

interface ProjectManagementViewProps {
  organizations: any[];
}

export function ProjectManagementView({ organizations }: ProjectManagementViewProps) {
  const [activeView, setActiveView] = useState<"overview" | "f4-branch" | "f5-startup" | "auto-tiering" | "data-entry">("overview");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Filter F4 and F5 companies from database
  const f4f5Projects = organizations
    .filter(org => org.organizations?.level === 'F4' || org.organizations?.level === 'F5')
    .map(org => ({
      id: org.organizations.id,
      name: org.organizations.name,
      level: org.organizations.level,
      type: org.organizations.level === 'F4' ? 'branch' : 'startup',
      sector: org.organizations.industry || 'Chưa xác định',
      bmcOwnership: org.organizations.bmc_equity_percentage || 0,
      monthlyRevenue: 0, // Sẽ được cập nhật từ báo cáo
      currentStaff: 0, // Sẽ được cập nhật từ HR
      kpiAverage4Quarters: 0, // Sẽ được cập nhật từ KPI
      progressPercentage: 0, // Sẽ được tính toán
      tieringProgress: 0, // Sẽ được tính toán
      autoTieringStatus: 'developing', // Sẽ được tính toán dựa trên KPI và equity
      nextTierTarget: org.organizations.level === 'F4' ? 'F3' : 'F4',
      establishedDate: new Date(org.organizations.created_at).toLocaleDateString('vi-VN'),
      code: org.organizations.code
    }));

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)} tỷ`;
    }
    return `${(amount / 1000000).toFixed(0)} triệu`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "eligible": return "bg-green-100 text-green-800";
      case "approaching": return "bg-amber-100 text-amber-800"; 
      case "developing": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleProjectSelect = (project: any) => {
    setSelectedProject(project);
    if (project.level === "F4") {
      setActiveView("f4-branch");
    } else if (project.level === "F5") {
      setActiveView("f5-startup");
    }
  };

  const handleBackToOverview = () => {
    setActiveView("overview");
    setSelectedProject(null);
  };

  // Render specific views
  if (activeView === "f4-branch") {
    return (
      <ProjectBranchView 
        onBack={handleBackToOverview}
        organizations={organizations}
        selectedProject={selectedProject}
      />
    );
  }

  if (activeView === "f5-startup") {
    return (
      <StartupView 
        onBack={handleBackToOverview}
        organizations={organizations}
        selectedStartup={selectedProject}
      />
    );
  }

  if (activeView === "auto-tiering") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={handleBackToOverview}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại tổng quan
          </Button>
          <h1 className="text-2xl font-bold">🎯 Hệ thống Auto-Tiering BMC</h1>
          <div></div>
        </div>
        <div className="space-y-8">
          {f4f5Projects.map((project) => (
            <AutoTieringSystem key={project.id} entityData={project} />
          ))}
        </div>
      </div>
    );
  }

  if (activeView === "data-entry") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={handleBackToOverview}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại tổng quan
          </Button>
          <h1 className="text-2xl font-bold">📝 Form nhập liệu F4-F5</h1>
          <div></div>
        </div>
        <Tabs defaultValue="f4" className="space-y-4">
          <TabsList className="grid grid-cols-2 w-64">
            <TabsTrigger value="f4">🏪 F4 Chi nhánh</TabsTrigger>
            <TabsTrigger value="f5">🚀 F5 Startup</TabsTrigger>
          </TabsList>
          <TabsContent value="f4">
            <DataEntryForms entityLevel="F4" entityName="Chi nhánh Hà Nội" />
          </TabsContent>
          <TabsContent value="f5">
            <DataEntryForms entityLevel="F5" entityName="Startup Cà phê 40NQ" />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Main overview with enhanced F4-F5 management
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">🎯 Quản lý Tầng F4-F5</h1>
          <p className="text-muted-foreground">
            Hệ sinh thái BMC - Auto-Tiering - Nhập liệu realtime - AI Analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setActiveView("data-entry")}>
            <Edit3 className="h-4 w-4 mr-2" />
            📝 Nhập liệu nhanh
          </Button>
          <Button variant="outline" size="sm" onClick={() => setActiveView("auto-tiering")}>
            <ArrowUp className="h-4 w-4 mr-2" />
            🎯 Auto-Tiering
          </Button>
          <Button className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            🚀 Thêm dự án
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Building2 className="h-4 w-4 text-blue-500" />
              Tổng F4-F5
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{f4f5Projects.length}</div>
            <p className="text-xs text-muted-foreground">Dự án hoạt động</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Doanh thu tháng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(f4f5Projects.reduce((sum, p) => sum + p.monthlyRevenue, 0))}
            </div>
            <p className="text-xs text-green-600">+15% vs tháng trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              Nhân sự
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {f4f5Projects.reduce((sum, p) => sum + p.currentStaff, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Tổng nhân sự</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-orange-500" />
              Tiến độ TB
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {f4f5Projects.length > 0 ? Math.round(f4f5Projects.reduce((sum, p) => sum + p.progressPercentage, 0) / f4f5Projects.length) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Trung bình</p>
          </CardContent>
        </Card>
      </div>

      {/* Auto-Tiering Overview */}
      <Card className="border-l-4 border-l-gradient-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUp className="h-5 w-5 text-primary" />
            🎯 Tổng quan Auto-Tiering BMC
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Theo dõi tiến độ thăng cấp tự động theo ngưỡng cổ phần và KPI
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">✅ Đủ điều kiện thăng cấp</h4>
              <div className="text-2xl font-bold text-green-600">
                {f4f5Projects.filter(p => p.autoTieringStatus === "eligible").length}
              </div>
              <p className="text-xs text-muted-foreground">Có thể thăng cấp ngay</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">⏳ Sắp đạt ngưỡng</h4>
              <div className="text-2xl font-bold text-amber-600">
                {f4f5Projects.filter(p => p.autoTieringStatus === "approaching").length}
              </div>
              <p className="text-xs text-muted-foreground">Trong 2-3 tháng tới</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">📊 Tiến độ trung bình</h4>
              <div className="text-2xl font-bold text-blue-600">
                {f4f5Projects.length > 0 ? Math.round(f4f5Projects.reduce((sum, p) => sum + p.tieringProgress, 0) / f4f5Projects.length) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">Tất cả dự án</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <Card>
        <CardHeader>
          <CardTitle>📋 Danh sách F4-F5 Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {f4f5Projects.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-muted-foreground mb-4">
                  <Building2 className="w-16 h-16 mx-auto" />
                </div>
                <h4 className="text-lg font-medium mb-2">Chưa có công ty F4-F5 nào</h4>
                <p className="text-muted-foreground mb-4">Hiện tại chưa có công ty F4 hoặc F5 nào trong hệ thống.</p>
                <Button onClick={() => setActiveView("data-entry")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm Công Ty F4-F5
                </Button>
              </div>
            ) : (
              f4f5Projects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleProjectSelect(project)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {project.type === "startup" ? (
                          <Rocket className="h-5 w-5 text-purple-500" />
                        ) : (
                          <Building2 className="h-5 w-5 text-blue-500" />
                        )}
                        <div>
                          <h3 className="font-semibold">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">{project.sector} • {project.establishedDate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{project.level}</Badge>
                      <Badge className={getStatusColor(project.autoTieringStatus)}>
                        {project.autoTieringStatus === "eligible" ? "Đủ điều kiện" : 
                         project.autoTieringStatus === "approaching" ? "Sắp đạt" : "Đang phát triển"}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">BMC Equity:</span>
                      <p className="font-medium">{project.bmcOwnership}%</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Doanh thu:</span>
                      <p className="font-medium">{formatCurrency(project.monthlyRevenue)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">KPI TB:</span>
                      <p className="font-medium">{project.kpiAverage4Quarters}%</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Nhân sự:</span>
                      <p className="font-medium">{project.currentStaff} người</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Tiến độ thăng cấp:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={project.tieringProgress} className="h-2 flex-1" />
                        <span className="text-xs">{project.tieringProgress}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Mục tiêu: Thăng cấp lên {project.nextTierTarget}
                      </span>
                      <Button variant="outline" size="sm">
                        Xem chi tiết →
                      </Button>
                    </div>
                  </div>
                </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveView("data-entry")}>
          <CardContent className="p-6 text-center">
            <Edit3 className="h-8 w-8 mx-auto mb-3 text-blue-500" />
            <h3 className="font-semibold mb-2">📝 Nhập liệu nhanh</h3>
            <p className="text-sm text-muted-foreground">
              Form chuẩn hóa 9 phòng ban với validation AI và đồng bộ realtime
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveView("auto-tiering")}>
          <CardContent className="p-6 text-center">
            <ArrowUp className="h-8 w-8 mx-auto mb-3 text-green-500" />
            <h3 className="font-semibold mb-2">🎯 Auto-Tiering</h3>
            <p className="text-sm text-muted-foreground">
              Theo dõi tiến độ thăng cấp tự động và workflow phê duyệt BMC
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-3 text-purple-500" />
            <h3 className="font-semibold mb-2">📊 AI Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Phân tích cross-module và dự báo hiệu suất với AI insights
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}