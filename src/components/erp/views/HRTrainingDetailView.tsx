import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Users, UserPlus, Clock, Calendar, DollarSign, TrendingUp, Award, BookOpen, Target, AlertTriangle, FileText, Upload, Download, Bot, Plus, MessageSquare, CheckCircle2, User, Briefcase, GraduationCap, Star, UserCheck, UserX, Building2 } from "lucide-react";

interface HRTrainingDetailViewProps {
  onBack: () => void;
}

export function HRTrainingDetailView({ onBack }: HRTrainingDetailViewProps) {
  const [activeView, setActiveView] = useState<"employees" | "attendance" | "recruitment" | "kpi" | "training" | "reports">("employees");

  // Comprehensive Professional Mockup Data for BMC → F1 → F2 → F3 → F4 → F5
  const organizationalLevels = {
    BMC: { code: "BMC", name: "Blue Mountain Capital", employees: 45, budget: 15000000000 },
    F1: { code: "F1", name: "Technology Cluster", employees: 0, budget: 0 },
    F2: { code: "F2", name: "FinTech Sector", employees: 220, budget: 6200000000 },
    F3: { code: "F3", name: "Payment Solutions Co.", employees: 280, budget: 4800000000 },
    F4: { code: "F4", name: "Mobile Payment Branch", employees: 195, budget: 2100000000 },
    F5: { code: "F5", name: "QR Pay Startup", employees: 327, budget: 850000000 }
  };

  const [selectedLevel, setSelectedLevel] = useState<keyof typeof organizationalLevels>("BMC");

  const hrDataByLevel = {
    BMC: {
      totalEmployees: 45, newHires: 2, departures: 0, attendanceRate: 98.7, kpiCompletion: 94.5,
      trainingInProgress: 8, payrollCost: 2250000000, avgSalary: 50000000, trainingBudget: 450000000, trainingSpent: 320000000,
      departments: ["Executive", "Strategy", "Legal", "Compliance", "Investment"],
      openPositions: 3, cvReceived: 25, offerAcceptance: 85.2,
      topPerformers: ["CEO Lý Hoàng Hải", "CTO Nguyễn Văn A", "CFO Trần Thị B"],
      kpiMetrics: { leadership: 95, strategy: 92, governance: 96 },
      trainingPrograms: ["Leadership Excellence", "Digital Transformation", "ESG Compliance"],
      riskAlerts: ["Succession planning needed", "Executive coaching required"]
    },
    F1: {
      totalEmployees: 0, newHires: 0, departures: 0, attendanceRate: 0, kpiCompletion: 0,
      trainingInProgress: 0, payrollCost: 0, avgSalary: 0, trainingBudget: 0, trainingSpent: 0,
      departments: ["R&D", "Product Management", "Architecture", "Innovation Lab", "Tech Operations"],
      openPositions: 0, cvReceived: 0, offerAcceptance: 0,
      topPerformers: ["Phạm Văn C", "Lê Thị D", "Hoàng Văn E"],
      kpiMetrics: { innovation: 0, delivery: 0, quality: 0 },
      trainingPrograms: ["Cloud Architecture", "AI/ML Advanced", "DevOps Mastery", "Product Strategy"],
      riskAlerts: ["Tech debt accumulation", "Skills gap in AI", "Burnout risk in R&D"]
    },
    F2: {
      totalEmployees: 220, newHires: 12, departures: 5, attendanceRate: 96.8, kpiCompletion: 89.2,
      trainingInProgress: 32, payrollCost: 6160000000, avgSalary: 28000000, trainingBudget: 550000000, trainingSpent: 398000000,
      departments: ["Backend Dev", "Frontend Dev", "Mobile Dev", "QA", "DevOps", "Security"],
      openPositions: 18, cvReceived: 156, offerAcceptance: 73.2,
      topPerformers: ["Nguyễn Văn F", "Trần Thị G", "Lê Văn H"],
      kpiMetrics: { development: 87, testing: 92, security: 85 },
      trainingPrograms: ["ReactJS Advanced", "Node.js Mastery", "Cybersecurity", "Agile Scrum"],
      riskAlerts: ["High turnover in Frontend", "Security skills shortage", "Overtime exceeding limits"]
    },
    F3: {
      totalEmployees: 280, newHires: 15, departures: 8, attendanceRate: 95.5, kpiCompletion: 86.7,
      trainingInProgress: 42, payrollCost: 5880000000, avgSalary: 21000000, trainingBudget: 420000000, trainingSpent: 315000000,
      departments: ["Product Dev", "Customer Success", "Sales", "Marketing", "Operations", "Support"],
      openPositions: 25, cvReceived: 203, offerAcceptance: 69.8,
      topPerformers: ["Phạm Thị I", "Hoàng Văn J", "Nguyễn Thị K"],
      kpiMetrics: { sales: 88, support: 91, marketing: 84 },
      trainingPrograms: ["Sales Excellence", "Customer Service", "Digital Marketing", "Product Management"],
      riskAlerts: ["Sales target pressure", "Support team overload", "Customer churn increasing"]
    },
    F4: {
      totalEmployees: 195, newHires: 11, departures: 7, attendanceRate: 94.2, kpiCompletion: 84.1,
      trainingInProgress: 28, payrollCost: 3315000000, avgSalary: 17000000, trainingBudget: 292500000, trainingSpent: 198000000,
      departments: ["Branch Operations", "Local Sales", "Customer Service", "Finance", "HR"],
      openPositions: 15, cvReceived: 142, offerAcceptance: 65.3,
      topPerformers: ["Lê Văn L", "Trần Thị M", "Nguyễn Văn N"],
      kpiMetrics: { operations: 82, sales: 85, service: 87 },
      trainingPrograms: ["Branch Management", "Local Market", "Service Quality", "Team Leadership"],
      riskAlerts: ["Competition pressure", "Staff retention issues", "Revenue targets at risk"]
    },
    F5: {
      totalEmployees: 327, newHires: 28, departures: 12, attendanceRate: 92.8, kpiCompletion: 81.5,
      trainingInProgress: 58, payrollCost: 3270000000, avgSalary: 10000000, trainingBudget: 163500000, trainingSpent: 125000000,
      departments: ["Engineering", "Growth", "Partnership", "Community", "Ops"],
      openPositions: 35, cvReceived: 287, offerAcceptance: 58.7,
      topPerformers: ["Phạm Văn O", "Hoàng Thị P", "Lê Văn Q"],
      kpiMetrics: { growth: 79, engineering: 83, community: 85 },
      trainingPrograms: ["Startup Fundamentals", "Growth Hacking", "Lean Startup", "Community Building"],
      riskAlerts: ["Funding runway", "Product-market fit", "Team scaling challenges", "Competitive threats"]
    }
  };

  const getCurrentLevelData = () => hrDataByLevel[selectedLevel];

  const consolidatedReports = {
    totalAcrossLevels: {
      employees: Object.values(hrDataByLevel).reduce((sum, level) => sum + level.totalEmployees, 0),
      payroll: Object.values(hrDataByLevel).reduce((sum, level) => sum + level.payrollCost, 0),
      training: Object.values(hrDataByLevel).reduce((sum, level) => sum + level.trainingSpent, 0),
      openPositions: Object.values(hrDataByLevel).reduce((sum, level) => sum + level.openPositions, 0)
    },
    monthlyTrends: [
      { month: "T1", employees: 1210, payroll: 25200000000, training: 580000000 },
      { month: "T2", employees: 1225, payroll: 25800000000, training: 720000000 },
      { month: "T3", employees: 1247, payroll: 26500000000, training: 890000000 }
    ],
    departmentPerformance: {
      "Technology": { kpi: 89.5, satisfaction: 4.2, retention: 94.2 },
      "Sales": { kpi: 85.8, satisfaction: 3.9, retention: 88.5 },
      "Operations": { kpi: 87.2, satisfaction: 4.0, retention: 91.8 },
      "Finance": { kpi: 92.1, satisfaction: 4.3, retention: 96.1 },
      "HR": { kpi: 88.7, satisfaction: 4.1, retention: 93.4 }
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const renderEmployeeManagement = () => {
    const employeeStructure = {
      management: Math.floor(getCurrentLevelData().totalEmployees * 0.12),
      senior: Math.floor(getCurrentLevelData().totalEmployees * 0.25),
      middle: Math.floor(getCurrentLevelData().totalEmployees * 0.38),
      junior: Math.floor(getCurrentLevelData().totalEmployees * 0.25)
    };

    const salaryBands = {
      executive: { min: 80000000, max: 200000000, count: Math.floor(getCurrentLevelData().totalEmployees * 0.03) },
      senior: { min: 40000000, max: 80000000, count: Math.floor(getCurrentLevelData().totalEmployees * 0.15) },
      middle: { min: 20000000, max: 40000000, count: Math.floor(getCurrentLevelData().totalEmployees * 0.45) },
      junior: { min: 8000000, max: 20000000, count: Math.floor(getCurrentLevelData().totalEmployees * 0.37) }
    };

    const employeeDetails = getCurrentLevelData().departments.map((dept, index) => {
      const deptSize = Math.floor(getCurrentLevelData().totalEmployees / getCurrentLevelData().departments.length * (0.8 + Math.random() * 0.4));
      return {
        department: dept,
        employees: deptSize,
        avgSalary: getCurrentLevelData().avgSalary * (0.85 + Math.random() * 0.3),
        vacancies: Math.floor(getCurrentLevelData().openPositions / getCurrentLevelData().departments.length * (0.7 + Math.random() * 0.6)),
        avgKPI: getCurrentLevelData().kpiCompletion + (Math.random() * 10 - 5),
        turnoverRate: (2 + Math.random() * 4).toFixed(1),
        avgAge: (28 + Math.random() * 8).toFixed(1),
        genderRatio: { male: (45 + Math.random() * 10).toFixed(1), female: (45 + Math.random() * 10).toFixed(1) }
      };
    });

    const upcomingReviews = [
      { name: getCurrentLevelData().topPerformers[0], department: employeeDetails[0]?.department, reviewDate: "2024-09-15", type: "Annual Review" },
      { name: getCurrentLevelData().topPerformers[1], department: employeeDetails[1]?.department, reviewDate: "2024-09-18", type: "Promotion Review" },
      { name: getCurrentLevelData().topPerformers[2], department: employeeDetails[2]?.department, reviewDate: "2024-09-22", type: "Performance Improvement" }
    ];

    const organizationChart = selectedLevel === 'BMC' ? [
      { level: 'C-Suite', positions: ['CEO', 'CTO', 'CFO', 'CHRO'], count: 5 },
      { level: 'VPs', positions: ['VP Engineering', 'VP Sales', 'VP Operations'], count: 8 },
      { level: 'Directors', positions: ['Product Director', 'Engineering Director'], count: 12 },
      { level: 'Managers', positions: ['Team Leads', 'Project Managers'], count: 20 }
    ] : [
      { level: 'Leadership', positions: ['General Manager', 'Operations Manager'], count: Math.floor(getCurrentLevelData().totalEmployees * 0.05) },
      { level: 'Department Heads', positions: getCurrentLevelData().departments.slice(0, 3), count: Math.floor(getCurrentLevelData().totalEmployees * 0.08) },
      { level: 'Team Leads', positions: ['Senior Leads', 'Project Leads'], count: Math.floor(getCurrentLevelData().totalEmployees * 0.15) },
      { level: 'Staff', positions: ['Senior', 'Mid-level', 'Junior'], count: Math.floor(getCurrentLevelData().totalEmployees * 0.72) }
    ];

    return (
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng nhân sự</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getCurrentLevelData().totalEmployees.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <UserPlus className="w-3 h-3 inline mr-1" />
                +{getCurrentLevelData().newHires} tháng này
              </p>
              <div className="mt-2 space-y-1">
                {employeeDetails.slice(0, 3).map((dept, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span>{dept.department}</span>
                    <span>{dept.employees}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cơ cấu nhân sự</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Management</span>
                  <span className="font-medium">{((employeeStructure.management / getCurrentLevelData().totalEmployees) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(employeeStructure.management / getCurrentLevelData().totalEmployees) * 100} className="h-1" />
                <div className="flex justify-between text-sm">
                  <span>Senior</span>
                  <span className="font-medium">{((employeeStructure.senior / getCurrentLevelData().totalEmployees) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(employeeStructure.senior / getCurrentLevelData().totalEmployees) * 100} className="h-1" />
                <div className="flex justify-between text-sm">
                  <span>Mid-level</span>
                  <span className="font-medium">{((employeeStructure.middle / getCurrentLevelData().totalEmployees) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(employeeStructure.middle / getCurrentLevelData().totalEmployees) * 100} className="h-1" />
                <div className="flex justify-between text-sm">
                  <span>Junior</span>
                  <span className="font-medium">{((employeeStructure.junior / getCurrentLevelData().totalEmployees) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(employeeStructure.junior / getCurrentLevelData().totalEmployees) * 100} className="h-1" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Biến động nhân sự</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tuyển mới</span>
                  <Badge variant="secondary" className="text-xs">+{getCurrentLevelData().newHires}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Nghỉ việc</span>
                  <Badge variant="outline" className="text-xs">-{getCurrentLevelData().departures}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Thăng chức</span>
                  <Badge variant="default" className="text-xs">+{Math.floor(getCurrentLevelData().totalEmployees * 0.03)}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Net Growth</span>
                  <Badge variant="default" className="text-xs">+{getCurrentLevelData().newHires - getCurrentLevelData().departures}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI HR Insights</CardTitle>
              <Bot className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold text-primary">Hoạt động tốt</div>
              <p className="text-xs text-muted-foreground">{getCurrentLevelData().riskAlerts.length} cảnh báo | {Math.floor(getCurrentLevelData().totalEmployees * 0.08)} khuyến nghị</p>
              <Badge variant={getCurrentLevelData().riskAlerts.length > 2 ? "destructive" : "secondary"} className="mt-2 text-xs">
                {getCurrentLevelData().riskAlerts[0]?.split(' ').slice(0, 3).join(' ') || 'Mọi thứ ổn'}
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Phân tích theo phòng ban - {selectedLevel}
              </CardTitle>
              <CardDescription>Chi tiết nhân sự từng phòng ban</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employeeDetails.map((dept, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{dept.department}</div>
                          <div className="text-sm text-muted-foreground">{dept.employees} nhân viên</div>
                        </div>
                      </div>
                      <Badge variant={dept.avgKPI >= 90 ? "default" : dept.avgKPI >= 80 ? "secondary" : "destructive"}>
                        {dept.avgKPI.toFixed(1)}% KPI
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Lương TB:</span>
                        <div className="font-medium">{formatCurrency(dept.avgSalary)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tuyển dụng:</span>
                        <div className="font-medium">{dept.vacancies} vị trí</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Turnover:</span>
                        <div className="font-medium">{dept.turnoverRate}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tuổi TB:</span>
                        <div className="font-medium">{dept.avgAge} tuổi</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Nam/Nữ ratio</span>
                        <span>{dept.genderRatio.male}% / {dept.genderRatio.female}%</span>
                      </div>
                      <Progress value={parseFloat(dept.genderRatio.male)} className="h-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Employee Actions & Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Quản lý nhân sự
              </CardTitle>
              <CardDescription>Công cụ và thao tác nhân sự</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-16 flex-col">
                  <UserPlus className="h-6 w-6 mb-2" />
                  <span className="text-sm">Thêm nhân sự</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <Upload className="h-6 w-6 mb-2" />
                  <span className="text-sm">Import Excel</span>
                </Button>
              </div>
              
              {/* New Employee Form */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <Input id="fullName" placeholder="Nguyễn Văn A" />
                  </div>
                  <div>
                    <Label htmlFor="position">Vị trí</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn vị trí" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCurrentLevelData().departments.map((dept, index) => (
                          <SelectItem key={index} value={dept.toLowerCase()}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="salary">Mức lương</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn band" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Junior: {formatCurrency(salaryBands.junior.min)} - {formatCurrency(salaryBands.junior.max)}</SelectItem>
                        <SelectItem value="middle">Middle: {formatCurrency(salaryBands.middle.min)} - {formatCurrency(salaryBands.middle.max)}</SelectItem>
                        <SelectItem value="senior">Senior: {formatCurrency(salaryBands.senior.min)} - {formatCurrency(salaryBands.senior.max)}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="startDate">Ngày bắt đầu</Label>
                    <Input id="startDate" type="date" />
                  </div>
                </div>
                
                <Button className="w-full">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Tạo hồ sơ nhân sự
                </Button>
              </div>

              {/* Upcoming Reviews */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Đánh giá sắp tới</Label>
                {upcomingReviews.map((review, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{review.name}</div>
                      <div className="text-xs text-muted-foreground">{review.department} • {review.type}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {new Date(review.reviewDate).toLocaleDateString('vi-VN')}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Organization Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Sơ đồ tổ chức - {organizationalLevels[selectedLevel].name}
            </CardTitle>
            <CardDescription>Cấu trúc tổ chức theo cấp bậc</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {organizationChart.map((level, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-2 rounded-lg">
                      <div className="font-medium">{level.level}</div>
                      <div className="text-sm text-muted-foreground">{level.count} người</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {level.positions.map((position, posIndex) => (
                      <Badge key={posIndex} variant="outline" className="text-xs">
                        {position}
                      </Badge>
                    ))}
                  </div>
                  {index < organizationChart.length - 1 && (
                    <div className="flex justify-center">
                      <div className="w-px h-8 bg-border"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI HR Agent */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              AI HR Assistant - {selectedLevel}
            </CardTitle>
            <CardDescription>Phân tích thông minh và đề xuất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Phân tích AI cho {organizationalLevels[selectedLevel].name}:</p>
                <p className="text-sm">
                  Cấp độ {selectedLevel}: {getCurrentLevelData().totalEmployees} nhân sự, KPI {getCurrentLevelData().kpiCompletion}%. 
                  Phòng {employeeDetails[0]?.department} có hiệu suất cao nhất ({employeeDetails[0]?.avgKPI.toFixed(1)}%).
                  Chi phí lương trung bình: {formatCurrency(getCurrentLevelData().avgSalary)}.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getCurrentLevelData().riskAlerts.slice(0, 2).map((alert, index) => (
                  <div key={index} className="bg-destructive/5 p-3 rounded-lg border border-destructive/20">
                    <p className="text-sm font-medium text-destructive mb-1">Cảnh báo:</p>
                    <p className="text-sm">{alert}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-primary mb-2">Top Performers {selectedLevel}:</p>
                <div className="grid grid-cols-1 gap-2">
                  {getCurrentLevelData().topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">• {performer}</span>
                      <Badge variant="secondary" className="text-xs">
                        {employeeDetails[index % employeeDetails.length]?.department}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Input placeholder="Hỏi AI về nhân sự, lương bổng, KPI..." className="flex-1" />
                <Button>
                  <Bot className="w-4 h-4 mr-2" />
                  Phân tích
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAttendanceManagement = () => {
    const attendanceDetails = {
      totalWorkingDays: 22,
      presentDays: Math.floor(getCurrentLevelData().attendanceRate * 22 / 100),
      lateDays: Math.floor((100 - getCurrentLevelData().attendanceRate) * 22 / 200),
      absentDays: Math.floor((100 - getCurrentLevelData().attendanceRate) * 22 / 100),
      overtimeHours: Math.floor(getCurrentLevelData().totalEmployees * 12.8),
      remoteDays: Math.floor(getCurrentLevelData().totalEmployees * 6.5),
      weeklyAverage: getCurrentLevelData().attendanceRate,
      monthlyTrend: [94.2, 95.8, 96.1, getCurrentLevelData().attendanceRate]
    };

    const payrollBreakdown = {
      baseSalary: Math.floor(getCurrentLevelData().payrollCost * 0.70),
      overtime: Math.floor(getCurrentLevelData().payrollCost * 0.15),
      bonuses: Math.floor(getCurrentLevelData().payrollCost * 0.10),
      benefits: Math.floor(getCurrentLevelData().payrollCost * 0.05)
    };

    const attendanceByDept = getCurrentLevelData().departments.map((dept, index) => ({
      department: dept,
      attendance: (getCurrentLevelData().attendanceRate + (Math.random() * 6 - 3)).toFixed(1),
      employees: Math.floor(getCurrentLevelData().totalEmployees / getCurrentLevelData().departments.length * (0.8 + Math.random() * 0.4)),
      overtime: Math.floor(attendanceDetails.overtimeHours / getCurrentLevelData().departments.length * (0.7 + Math.random() * 0.6))
    }));

    return (
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tỷ lệ chấm công</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getCurrentLevelData().attendanceRate}%</div>
              <p className="text-xs text-muted-foreground">
                {attendanceDetails.presentDays}/{attendanceDetails.totalWorkingDays} ngày làm việc
              </p>
              <Progress value={getCurrentLevelData().attendanceRate} className="mt-2" />
              <div className="flex justify-between text-xs mt-2 text-muted-foreground">
                <span>Đi muộn: {attendanceDetails.lateDays}</span>
                <span>Vắng: {attendanceDetails.absentDays}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chi phí lương</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{formatCurrency(getCurrentLevelData().payrollCost)}</div>
              <p className="text-xs text-muted-foreground">
                Lương TB: {formatCurrency(getCurrentLevelData().avgSalary)}
              </p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Lương cơ bản</span>
                  <span>{Math.floor(payrollBreakdown.baseSalary / getCurrentLevelData().payrollCost * 100)}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Thưởng OT</span>
                  <span>{Math.floor(payrollBreakdown.overtime / getCurrentLevelData().payrollCost * 100)}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Phúc lợi</span>
                  <span>{Math.floor((payrollBreakdown.bonuses + payrollBreakdown.benefits) / getCurrentLevelData().payrollCost * 100)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Làm thêm giờ</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceDetails.overtimeHours.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Tổng giờ OT tháng này</p>
              <div className="mt-2 space-y-1">
                {attendanceByDept.slice(0, 3).map((dept, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span>{dept.department}</span>
                    <span>{dept.overtime}h</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                TB/NV: {(attendanceDetails.overtimeHours / getCurrentLevelData().totalEmployees).toFixed(1)}h
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Làm từ xa</CardTitle>
              <Bot className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceDetails.remoteDays}</div>
              <p className="text-xs text-muted-foreground">Ngày WFH tháng này</p>
              <Badge variant="outline" className="mt-2 text-xs">
                {(attendanceDetails.remoteDays / (getCurrentLevelData().totalEmployees * attendanceDetails.totalWorkingDays) * 100).toFixed(1)}% tổng ngày
              </Badge>
              <div className="mt-2 text-xs text-primary">
                Tiết kiệm: {formatCurrency(attendanceDetails.remoteDays * 75000)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance by Department */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Chấm công theo phòng ban
              </CardTitle>
              <CardDescription>Chi tiết theo từng phòng ban tại {selectedLevel}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceByDept.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{dept.department}</span>
                        <Badge variant={parseFloat(dept.attendance) >= 95 ? "default" : parseFloat(dept.attendance) >= 90 ? "secondary" : "destructive"}>
                          {dept.attendance}%
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground flex justify-between">
                        <span>{dept.employees} nhân viên</span>
                        <span>OT: {dept.overtime}h</span>
                      </div>
                      <Progress value={parseFloat(dept.attendance)} className="mt-2 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Time Tracking Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Công cụ chấm công
              </CardTitle>
              <CardDescription>Quản lý thời gian làm việc</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Clock className="h-6 w-6 mb-2" />
                  <span className="text-sm">Chấm công vào</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Clock className="h-6 w-6 mb-2" />
                  <span className="text-sm">Chấm công ra</span>
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Ca làm việc</Label>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Ca 1" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shift1">8:00 - 17:00</SelectItem>
                      <SelectItem value="shift2">9:00 - 18:00</SelectItem>
                      <SelectItem value="shift3">10:00 - 19:00</SelectItem>
                      <SelectItem value="flexible">Linh hoạt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-between items-center">
                  <Label>Ngày nghỉ phép</Label>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Đăng ký nghỉ
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <Label>Đăng ký OT</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm OT
                  </Button>
                </div>
              </div>

              <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-primary mb-1">AI Insights:</p>
                <p className="text-sm">
                  Phòng {attendanceByDept[0]?.department} có tỷ lệ chấm công cao nhất ({attendanceByDept[0]?.attendance}%). 
                  Khuyến nghị tăng cường remote work để cải thiện work-life balance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payroll Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Quản lý lương bổng - {selectedLevel}
            </CardTitle>
            <CardDescription>Chi tiết chi phí lương theo cấp độ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">{formatCurrency(payrollBreakdown.baseSalary)}</div>
                <div className="text-sm text-muted-foreground">Lương cơ bản</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg">
                <div className="text-2xl font-bold text-secondary-foreground">{formatCurrency(payrollBreakdown.overtime)}</div>
                <div className="text-sm text-muted-foreground">Thưởng OT</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg">
                <div className="text-2xl font-bold">{formatCurrency(payrollBreakdown.bonuses)}</div>
                <div className="text-sm text-muted-foreground">Thưởng KPI</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-muted/10 to-muted/5 rounded-lg">
                <div className="text-2xl font-bold">{formatCurrency(payrollBreakdown.benefits)}</div>
                <div className="text-sm text-muted-foreground">Phúc lợi</div>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Xuất bảng lương
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import timesheet
              </Button>
              <Button>
                <Bot className="h-4 w-4 mr-2" />
                Tính lương tự động
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderRecruitment = () => {
    const recruitmentPipeline = {
      total: getCurrentLevelData().cvReceived,
      screening: Math.floor(getCurrentLevelData().cvReceived * 0.65),
      phoneInterview: Math.floor(getCurrentLevelData().cvReceived * 0.35),
      technicalTest: Math.floor(getCurrentLevelData().cvReceived * 0.25),
      finalInterview: Math.floor(getCurrentLevelData().cvReceived * 0.15),
      offerSent: Math.floor(getCurrentLevelData().cvReceived * 0.08),
      hired: Math.floor(getCurrentLevelData().cvReceived * 0.06)
    };

    const positionDetails = getCurrentLevelData().departments.map((dept, index) => ({
      department: dept,
      openPositions: Math.floor(getCurrentLevelData().openPositions / getCurrentLevelData().departments.length + Math.random() * 3),
      urgency: ['Cao', 'Trung bình', 'Thấp'][Math.floor(Math.random() * 3)],
      budget: Math.floor(getCurrentLevelData().avgSalary * (0.8 + Math.random() * 0.4)),
      experience: ['Junior', 'Middle', 'Senior'][Math.floor(Math.random() * 3)],
      applications: Math.floor(getCurrentLevelData().cvReceived / getCurrentLevelData().departments.length * (0.7 + Math.random() * 0.6))
    }));

    const interviewSchedule = [
      { candidate: "Nguyễn Văn A", position: "Backend Developer", time: "09:00", interviewer: "Tech Lead", type: "Technical" },
      { candidate: "Trần Thị B", position: "UI/UX Designer", time: "10:30", interviewer: "Design Manager", type: "Portfolio Review" },
      { candidate: "Lê Văn C", position: "Product Manager", time: "14:00", interviewer: "VP Product", type: "Case Study" },
      { candidate: "Phạm Thị D", position: "Data Analyst", time: "15:30", interviewer: "Data Lead", type: "Technical" }
    ];

    return (
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vị trí mở</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getCurrentLevelData().openPositions}</div>
              <p className="text-xs text-muted-foreground">Đang tuyển tại {selectedLevel}</p>
              <div className="mt-2 space-y-1">
                {positionDetails.slice(0, 3).map((pos, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span>{pos.department}</span>
                    <Badge variant={pos.urgency === 'Cao' ? 'destructive' : pos.urgency === 'Trung bình' ? 'secondary' : 'outline'} className="text-xs">
                      {pos.openPositions}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-primary">
                Ngân sách TB: {formatCurrency(getCurrentLevelData().avgSalary)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CV Pipeline</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getCurrentLevelData().cvReceived}</div>
              <p className="text-xs text-muted-foreground">CV mới tháng này</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Screening</span>
                  <span className="text-primary">{recruitmentPipeline.screening}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Interview</span>
                  <span className="text-secondary-foreground">{recruitmentPipeline.phoneInterview}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Offer sent</span>
                  <span className="text-accent-foreground">{recruitmentPipeline.offerSent}</span>
                </div>
              </div>
              <Progress value={(recruitmentPipeline.hired / recruitmentPipeline.total) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tỷ lệ chuyển đổi</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getCurrentLevelData().offerAcceptance}%</div>
              <p className="text-xs text-muted-foreground">Offer acceptance rate</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>CV → Interview</span>
                  <span>{((recruitmentPipeline.phoneInterview / recruitmentPipeline.total) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Interview → Offer</span>
                  <span>{((recruitmentPipeline.offerSent / recruitmentPipeline.phoneInterview) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Offer → Hired</span>
                  <span className="text-primary">{getCurrentLevelData().offerAcceptance}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time to Hire</CardTitle>
              <Bot className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.5</div>
              <p className="text-xs text-muted-foreground">Ngày trung bình</p>
              <Badge variant="secondary" className="mt-2 text-xs">
                Giảm 3.2 ngày
              </Badge>
              <div className="mt-2 text-xs text-primary">
                AI đã lọc {Math.floor(getCurrentLevelData().cvReceived * 0.4)} CV phù hợp
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recruitment Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recruitment Pipeline - {selectedLevel}
            </CardTitle>
            <CardDescription>Chi tiết quy trình tuyển dụng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
              {[
                { stage: 'CV Received', count: recruitmentPipeline.total, color: 'bg-muted' },
                { stage: 'Screening', count: recruitmentPipeline.screening, color: 'bg-blue-100 text-blue-800' },
                { stage: 'Phone Interview', count: recruitmentPipeline.phoneInterview, color: 'bg-yellow-100 text-yellow-800' },
                { stage: 'Technical Test', count: recruitmentPipeline.technicalTest, color: 'bg-orange-100 text-orange-800' },
                { stage: 'Final Interview', count: recruitmentPipeline.finalInterview, color: 'bg-purple-100 text-purple-800' },
                { stage: 'Hired', count: recruitmentPipeline.hired, color: 'bg-green-100 text-green-800' }
              ].map((stage, index) => (
                <div key={index} className={`text-center p-4 rounded-lg ${stage.color}`}>
                  <div className="text-2xl font-bold">{stage.count}</div>
                  <div className="text-sm font-medium">{stage.stage}</div>
                  <div className="text-xs opacity-75">
                    {stage.count > 0 ? ((stage.count / recruitmentPipeline.total) * 100).toFixed(1) : '0'}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Open Positions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Vị trí đang tuyển
              </CardTitle>
              <CardDescription>Chi tiết theo từng phòng ban</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {positionDetails.map((pos, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{pos.department}</span>
                        <Badge variant={pos.urgency === 'Cao' ? 'destructive' : pos.urgency === 'Trung bình' ? 'secondary' : 'outline'}>
                          {pos.urgency}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>Vị trí mở: <span className="font-medium text-foreground">{pos.openPositions}</span></div>
                        <div>Cấp độ: <span className="font-medium text-foreground">{pos.experience}</span></div>
                        <div>CV nhận: <span className="font-medium text-foreground">{pos.applications}</span></div>
                        <div>Ngân sách: <span className="font-medium text-foreground">{formatCurrency(pos.budget)}</span></div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Tạo vị trí mới
              </Button>
            </CardContent>
          </Card>

          {/* Interview Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Lịch phỏng vấn hôm nay
              </CardTitle>
              <CardDescription>Các cuộc phỏng vấn được lên lịch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interviewSchedule.map((interview, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">{interview.time}</Badge>
                        <span className="font-medium">{interview.candidate}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div>{interview.position}</div>
                        <div>Interviewer: {interview.interviewer} • {interview.type}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Xem lịch tuần
                </Button>
                <Button className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Lên lịch PV
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Recruitment Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              AI Recruitment Assistant
            </CardTitle>
            <CardDescription>Công cụ tuyển dụng thông minh</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                <Bot className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="font-medium">CV Screening</div>
                <div className="text-sm text-muted-foreground">Tự động lọc {Math.floor(recruitmentPipeline.total * 0.4)} CV phù hợp</div>
              </div>
              <div className="text-center p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-secondary-foreground" />
                <div className="font-medium">Interview Questions</div>
                <div className="text-sm text-muted-foreground">Gợi ý 150+ câu hỏi theo vị trí</div>
              </div>
              <div className="text-center p-4 bg-accent/5 rounded-lg border border-accent/20">
                <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                <div className="font-medium">Candidate Ranking</div>
                <div className="text-sm text-muted-foreground">Xếp hạng ứng viên theo AI score</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Bot className="h-6 w-6 text-primary" />
                <span className="font-medium">AI Insights cho {selectedLevel}:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  • Vị trí {positionDetails[0]?.department} có tỷ lệ ứng tuyển cao nhất<br />
                  • Thời gian tuyển dụng giảm 18% so với tháng trước<br />
                  • {Math.floor(recruitmentPipeline.total * 0.15)} ứng viên có kinh nghiệm phù hợp
                </div>
                <div>
                  • Khuyến nghị tăng ngân sách cho vị trí Senior<br />
                  • Cần cải thiện employer branding<br />
                  • Tỷ lệ đậu technical test: {((recruitmentPipeline.finalInterview / recruitmentPipeline.technicalTest) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderKPIManagement = () => {
    const kpiMetrics = getCurrentLevelData().kpiMetrics;
    const performanceDistribution = {
      excellent: Math.floor(getCurrentLevelData().totalEmployees * 0.15), // >95%
      good: Math.floor(getCurrentLevelData().totalEmployees * 0.35), // 80-95%
      average: Math.floor(getCurrentLevelData().totalEmployees * 0.35), // 60-80%
      needsImprovement: Math.floor(getCurrentLevelData().totalEmployees * 0.15) // <60%
    };

    const okrData = {
      quarterly: {
        objectives: [
          { title: `Tăng trưởng doanh thu ${selectedLevel}`, progress: 78, target: "25%", current: "19.5%" },
          { title: "Cải thiện customer satisfaction", progress: 85, target: "4.5/5", current: "4.3/5" },
          { title: "Giảm chi phí vận hành", progress: 62, target: "15%", current: "9.3%" },
          { title: "Tăng năng suất nhân viên", progress: 91, target: "20%", current: "18.2%" }
        ]
      },
      individual: getCurrentLevelData().topPerformers.map((performer, index) => ({
        name: performer,
        kpiScore: (85 + Math.random() * 15).toFixed(1),
        objectives: Math.floor(Math.random() * 3) + 3,
        completed: Math.floor(Math.random() * 2) + 2,
        department: getCurrentLevelData().departments[index % getCurrentLevelData().departments.length]
      }))
    };

    const kpiCategories = [
      { name: 'Hiệu suất', value: Object.values(kpiMetrics)[0] || 85, icon: TrendingUp, color: 'text-blue-600' },
      { name: 'Chất lượng', value: Object.values(kpiMetrics)[1] || 90, icon: Award, color: 'text-green-600' },
      { name: 'Đồng đội', value: Object.values(kpiMetrics)[2] || 87, icon: Users, color: 'text-purple-600' },
      { name: 'Đổi mới', value: 82, icon: Star, color: 'text-orange-600' }
    ];

    return (
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">KPI Trung bình</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getCurrentLevelData().kpiCompletion}%</div>
              <p className="text-xs text-muted-foreground">Toàn bộ {selectedLevel}</p>
              <Progress value={getCurrentLevelData().kpiCompletion} className="mt-2" />
              <div className="mt-2 text-xs text-muted-foreground">
                Mục tiêu: 90% | Tăng {(getCurrentLevelData().kpiCompletion - 82).toFixed(1)}% so với tháng trước
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Xuất sắc</CardTitle>
              <Star className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{performanceDistribution.excellent}</div>
              <p className="text-xs text-muted-foreground">Nhân viên &gt;95% KPI</p>
              <Badge variant="default" className="mt-2 text-xs">
                {((performanceDistribution.excellent / getCurrentLevelData().totalEmployees) * 100).toFixed(1)}%
              </Badge>
              <div className="mt-2 text-xs text-primary">
                +{Math.floor(performanceDistribution.excellent * 0.1)} từ tháng trước
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cần hỗ trợ</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{performanceDistribution.needsImprovement}</div>
              <p className="text-xs text-muted-foreground">Nhân viên &lt;60% KPI</p>
              <Badge variant="destructive" className="mt-2 text-xs">
                {((performanceDistribution.needsImprovement / getCurrentLevelData().totalEmployees) * 100).toFixed(1)}%
              </Badge>
              <div className="mt-2 text-xs text-destructive">
                Cần kế hoạch cải thiện
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Coach</CardTitle>
              <Bot className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{Math.floor(performanceDistribution.needsImprovement * 1.5)}</div>
              <p className="text-xs text-muted-foreground">Kế hoạch cải thiện</p>
              <Badge variant="outline" className="mt-2 text-xs">
                Tự động tạo
              </Badge>
              <div className="mt-2 text-xs text-primary">
                {Math.floor(performanceDistribution.excellent * 0.3)} đề xuất thăng chức
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KPI Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Phân tích KPI theo danh mục - {selectedLevel}
            </CardTitle>
            <CardDescription>Đánh giá chi tiết theo từng khía cạnh</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {kpiCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div key={index} className="text-center">
                    <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-3`}>
                      <Icon className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <div className="text-2xl font-bold mb-1">{category.value}%</div>
                    <div className="text-sm font-medium mb-2">{category.name}</div>
                    <Progress value={category.value} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      {category.value >= 90 ? 'Xuất sắc' : category.value >= 80 ? 'Tốt' : category.value >= 70 ? 'Khá' : 'Cần cải thiện'}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* OKR Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                OKR Quarterly Tracking
              </CardTitle>
              <CardDescription>Objectives & Key Results Q3 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {okrData.quarterly.objectives.map((objective, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{objective.title}</span>
                      <Badge variant={objective.progress >= 80 ? "default" : objective.progress >= 60 ? "secondary" : "destructive"}>
                        {objective.progress}%
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Current: {objective.current}</span>
                      <span>Target: {objective.target}</span>
                    </div>
                    <Progress value={objective.progress} className="h-2" />
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Thêm OKR mới
              </Button>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Top Performers
              </CardTitle>
              <CardDescription>Nhân viên xuất sắc trong tháng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {okrData.individual.slice(0, 5).map((employee, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">{employee.department}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{employee.kpiScore}%</div>
                      <div className="text-xs text-muted-foreground">
                        {employee.completed}/{employee.objectives} OKRs
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1">
                  <Award className="h-4 w-4 mr-2" />
                  Reward
                </Button>
                <Button variant="outline" className="flex-1">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Promote
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Phân bổ hiệu suất nhân viên
            </CardTitle>
            <CardDescription>Phân tích chi tiết theo từng nhóm hiệu suất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-3xl font-bold text-green-600">{performanceDistribution.excellent}</div>
                <div className="text-sm font-medium text-green-800">Xuất sắc (95-100%)</div>
                <div className="text-xs text-green-600 mt-1">Có thể thăng chức</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-3xl font-bold text-blue-600">{performanceDistribution.good}</div>
                <div className="text-sm font-medium text-blue-800">Tốt (80-95%)</div>
                <div className="text-xs text-blue-600 mt-1">Cần duy trì</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-3xl font-bold text-yellow-600">{performanceDistribution.average}</div>
                <div className="text-sm font-medium text-yellow-800">Trung bình (60-80%)</div>
                <div className="text-xs text-yellow-600 mt-1">Cần cải thiện</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-3xl font-bold text-red-600">{performanceDistribution.needsImprovement}</div>
                <div className="text-sm font-medium text-red-800">Cần hỗ trợ (&lt;60%)</div>
                <div className="text-xs text-red-600 mt-1">PIP cần thiết</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Bot className="h-6 w-6 text-primary" />
                <span className="font-medium">AI Performance Insights:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  • {Math.floor(performanceDistribution.excellent * 0.6)} nhân viên sẵn sàng thăng chức<br />
                  • Phòng {getCurrentLevelData().departments[0]} có KPI cao nhất<br />
                  • Tỷ lệ retention của top performers: 96.8%
                </div>
                <div>
                  • {performanceDistribution.needsImprovement} nhân viên cần PIP<br />
                  • Khuyến nghị tăng training cho middle performers<br />
                  • ROI từ performance management: +23%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Hành động cần thực hiện
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex-col">
                <Award className="h-6 w-6 mb-2" />
                <span>Review thưởng Q3</span>
                <span className="text-xs opacity-75">{performanceDistribution.excellent} nhân viên</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <AlertTriangle className="h-6 w-6 mb-2" />
                <span>Lập kế hoạch PIP</span>
                <span className="text-xs opacity-75">{performanceDistribution.needsImprovement} nhân viên</span>
              </Button>
              <Button variant="secondary" className="h-20 flex-col">
                <TrendingUp className="h-6 w-6 mb-2" />
                <span>Đánh giá 360°</span>
                <span className="text-xs opacity-75">Tất cả quản lý</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderTrainingManagement = () => {
    const trainingCategories = {
      technical: Math.floor(getCurrentLevelData().trainingInProgress * 0.45),
      softSkills: Math.floor(getCurrentLevelData().trainingInProgress * 0.25),
      management: Math.floor(getCurrentLevelData().trainingInProgress * 0.20),
      certification: Math.floor(getCurrentLevelData().trainingInProgress * 0.10)
    };

    const trainingPlatforms = [
      { name: 'BMC Learning Hub', courses: Math.floor(getCurrentLevelData().trainingInProgress * 0.4), budget: getCurrentLevelData().trainingSpent * 0.3 },
      { name: 'Coursera Business', courses: Math.floor(getCurrentLevelData().trainingInProgress * 0.25), budget: getCurrentLevelData().trainingSpent * 0.25 },
      { name: 'Udemy Business', courses: Math.floor(getCurrentLevelData().trainingInProgress * 0.20), budget: getCurrentLevelData().trainingSpent * 0.2 },
      { name: 'Internal Training', courses: Math.floor(getCurrentLevelData().trainingInProgress * 0.15), budget: getCurrentLevelData().trainingSpent * 0.25 }
    ];

    const certificationTracking = {
      AWS: { completed: 45, inProgress: 23, budget: getCurrentLevelData().trainingSpent * 0.15, avgScore: 87.5 },
      Google: { completed: 32, inProgress: 18, budget: getCurrentLevelData().trainingSpent * 0.12, avgScore: 89.2 },
      Microsoft: { completed: 28, inProgress: 15, budget: getCurrentLevelData().trainingSpent * 0.10, avgScore: 85.8 },
      Internal: { completed: 129, inProgress: 45, budget: getCurrentLevelData().trainingSpent * 0.08, avgScore: 91.3 }
    };

    const trainingCalendar = [
      { course: 'Advanced React Patterns', instructor: 'Senior Tech Lead', date: '2024-09-15', participants: 15, duration: '3 days' },
      { course: 'Leadership Excellence', instructor: 'HR Director', date: '2024-09-18', participants: 12, duration: '2 days' },
      { course: 'Cloud Architecture AWS', instructor: 'External Expert', date: '2024-09-22', participants: 20, duration: '5 days' },
      { course: 'Agile Scrum Master', instructor: 'Project Manager', date: '2024-09-25', participants: 18, duration: '2 days' }
    ];

    const learningPaths = getCurrentLevelData().departments.map((dept, index) => ({
      department: dept,
      totalCourses: Math.floor(getCurrentLevelData().trainingInProgress / getCurrentLevelData().departments.length * (0.8 + Math.random() * 0.4)),
      completionRate: (75 + Math.random() * 20).toFixed(1),
      avgRating: (4.0 + Math.random() * 1.0).toFixed(1),
      activeLearners: Math.floor(getCurrentLevelData().totalEmployees / getCurrentLevelData().departments.length * 0.6),
      topCourse: getCurrentLevelData().trainingPrograms[index % getCurrentLevelData().trainingPrograms.length],
      budget: getCurrentLevelData().trainingSpent / getCurrentLevelData().departments.length * (0.8 + Math.random() * 0.4)
    }));

    const skillGaps = [
      { skill: 'Cloud Computing', currentLevel: 65, targetLevel: 85, priority: 'High', employees: 45 },
      { skill: 'Data Analytics', currentLevel: 58, targetLevel: 80, priority: 'High', employees: 32 },
      { skill: 'Leadership', currentLevel: 72, targetLevel: 88, priority: 'Medium', employees: 28 },
      { skill: 'AI/ML', currentLevel: 45, targetLevel: 75, priority: 'High', employees: 38 },
      { skill: 'Digital Marketing', currentLevel: 68, targetLevel: 85, priority: 'Medium', employees: 25 }
    ];

    return (
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Khóa học đang diễn ra</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getCurrentLevelData().trainingInProgress}</div>
              <p className="text-xs text-muted-foreground">Khóa học active tại {selectedLevel}</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Technical</span>
                  <span className="text-blue-600">{trainingCategories.technical}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Soft Skills</span>
                  <span className="text-green-600">{trainingCategories.softSkills}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Management</span>
                  <span className="text-purple-600">{trainingCategories.management}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ngân sách đào tạo</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{formatCurrency(getCurrentLevelData().trainingBudget)}</div>
              <p className="text-xs text-muted-foreground">
                Đã dùng: {formatCurrency(getCurrentLevelData().trainingSpent)} ({Math.round((getCurrentLevelData().trainingSpent / getCurrentLevelData().trainingBudget) * 100)}%)
              </p>
              <Progress value={(getCurrentLevelData().trainingSpent / getCurrentLevelData().trainingBudget) * 100} className="mt-2" />
              <div className="mt-2 text-xs text-primary">
                ROI: +{(150 + Math.random() * 50).toFixed(1)}% | Tiết kiệm: {formatCurrency(getCurrentLevelData().trainingSpent * 0.23)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chứng chỉ & Certificates</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.values(certificationTracking).reduce((sum, cert) => sum + cert.completed, 0)}</div>
              <p className="text-xs text-muted-foreground">Chứng chỉ đạt được tháng này</p>
              <div className="mt-2 space-y-1">
                {Object.entries(certificationTracking).slice(0, 3).map(([provider, data], index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span>{provider}</span>
                    <span className="font-medium">{data.completed} <span className="text-muted-foreground">({data.avgScore}%)</span></span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Learning Coach</CardTitle>
              <Bot className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{Math.floor(getCurrentLevelData().totalEmployees * 0.15)}</div>
              <p className="text-xs text-muted-foreground">Lộ trình cá nhân hóa</p>
              <Badge variant="default" className="mt-2 text-xs">
                {skillGaps[0]?.skill} Priority
              </Badge>
              <div className="mt-2 text-xs text-primary">
                {skillGaps.filter(s => s.priority === 'High').length} skill gaps quan trọng
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Training Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Learning by Department */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Đào tạo theo phòng ban - {selectedLevel}
              </CardTitle>
              <CardDescription>Phân tích học tập từng bộ phận</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningPaths.map((dept, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{dept.department}</div>
                          <div className="text-sm text-muted-foreground">{dept.activeLearners} active learners</div>
                        </div>
                      </div>
                      <Badge variant={parseFloat(dept.completionRate) >= 80 ? "default" : parseFloat(dept.completionRate) >= 70 ? "secondary" : "destructive"}>
                        {dept.completionRate}% hoàn thành
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Khóa học:</span>
                        <div className="font-medium">{dept.totalCourses}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Đánh giá:</span>
                        <div className="font-medium flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          {dept.avgRating}/5.0
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Top course:</span>
                        <div className="font-medium text-xs">{dept.topCourse}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Budget:</span>
                        <div className="font-medium">{formatCurrency(dept.budget)}</div>
                      </div>
                    </div>
                    <Progress value={parseFloat(dept.completionRate)} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skill Gap Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Phân tích khoảng cách kỹ năng
              </CardTitle>
              <CardDescription>Kỹ năng cần phát triển ưu tiên</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillGaps.map((skill, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          skill.priority === 'High' ? 'bg-red-500' : 
                          skill.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <span className="font-medium">{skill.skill}</span>
                      </div>
                      <Badge variant={skill.priority === 'High' ? 'destructive' : skill.priority === 'Medium' ? 'secondary' : 'default'}>
                        {skill.priority}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Hiện tại:</span>
                        <div className="font-medium">{skill.currentLevel}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Mục tiêu:</span>
                        <div className="font-medium">{skill.targetLevel}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Nhân viên:</span>
                        <div className="font-medium">{skill.employees}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{skill.currentLevel}% / {skill.targetLevel}%</span>
                      </div>
                      <Progress value={(skill.currentLevel / skill.targetLevel) * 100} className="h-2" />
                      <div className="text-xs text-primary">
                        Gap: {skill.targetLevel - skill.currentLevel}% • Est. Time: {Math.ceil((skill.targetLevel - skill.currentLevel) / 10)} months
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Training Platforms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Nền tảng đào tạo & ROI
            </CardTitle>
            <CardDescription>Hiệu quả các platform học tập</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {trainingPlatforms.map((platform, index) => (
                <div key={index} className="text-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border">
                  <div className="text-2xl font-bold text-primary">{platform.courses}</div>
                  <div className="font-medium">{platform.name}</div>
                  <div className="text-sm text-muted-foreground">{formatCurrency(platform.budget)}</div>
                  <div className="text-xs text-primary mt-1">
                    ROI: +{(120 + Math.random() * 80).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-16 flex-col">
                <BookOpen className="h-6 w-6 mb-2" />
                <span className="text-sm">Tạo khóa học</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <Award className="h-6 w-6 mb-2" />
                <span className="text-sm">Quản lý chứng chỉ</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <Target className="h-6 w-6 mb-2" />
                <span className="text-sm">Phân tích skill gap</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Training Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Lịch đào tạo sắp tới
            </CardTitle>
            <CardDescription>Các khóa học được lên lịch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainingCalendar.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline">{new Date(session.date).toLocaleDateString('vi-VN')}</Badge>
                      <span className="font-medium">{session.course}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div>Instructor: {session.instructor} • Duration: {session.duration}</div>
                      <div>{session.participants} participants registered</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                    <Button size="sm">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Join
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Lên lịch khóa học mới
            </Button>
          </CardContent>
        </Card>

        {/* AI Training Coach */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              AI Learning Coach - {selectedLevel}
            </CardTitle>
            <CardDescription>Đề xuất và tối ưu hóa đào tạo thông minh</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Phân tích đào tạo {selectedLevel}:</p>
                <p className="text-sm">
                  {getCurrentLevelData().trainingInProgress} khóa học đang chạy với {learningPaths.reduce((sum, dept) => sum + dept.activeLearners, 0)} học viên active. 
                  Tỷ lệ hoàn thành trung bình: {(learningPaths.reduce((sum, dept) => sum + parseFloat(dept.completionRate), 0) / learningPaths.length).toFixed(1)}%.
                  Budget utilization: {Math.round((getCurrentLevelData().trainingSpent / getCurrentLevelData().trainingBudget) * 100)}%.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                  <p className="text-sm font-medium text-primary mb-2">Khuyến nghị ưu tiên:</p>
                  <div className="space-y-1">
                    {skillGaps.filter(s => s.priority === 'High').slice(0, 3).map((skill, index) => (
                      <p key={index} className="text-sm">• {skill.skill} - {skill.employees} nhân viên cần đào tạo</p>
                    ))}
                  </div>
                </div>
                
                <div className="bg-secondary/5 p-3 rounded-lg border border-secondary/20">
                  <p className="text-sm font-medium text-secondary-foreground mb-2">Top Performers cần nâng cao:</p>
                  <div className="space-y-1">
                    {getCurrentLevelData().topPerformers.slice(0, 3).map((performer, index) => (
                      <p key={index} className="text-sm">• {performer} - Leadership track</p>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Input placeholder="Tạo lộ trình đào tạo cho skill gap Cloud Computing..." className="flex-1" />
                <Button>
                  <Bot className="w-4 h-4 mr-2" />
                  Tạo lộ trình
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderHRReports = () => {
    const reportMetrics = {
      totalEmployees: consolidatedReports.totalAcrossLevels.employees,
      totalPayroll: consolidatedReports.totalAcrossLevels.payroll,
      totalTrainingSpent: consolidatedReports.totalAcrossLevels.training,
      avgKPI: Object.values(hrDataByLevel).reduce((sum, level) => sum + level.kpiCompletion, 0) / Object.values(hrDataByLevel).length,
      avgAttendance: Object.values(hrDataByLevel).reduce((sum, level) => sum + level.attendanceRate, 0) / Object.values(hrDataByLevel).length,
      turnoverRate: 3.2,
      retentionRate: 96.8,
      satisfactionScore: 4.2
    };

    const departmentReports = Object.entries(consolidatedReports.departmentPerformance).map(([dept, data]) => ({
      department: dept,
      kpi: data.kpi,
      satisfaction: data.satisfaction,
      retention: data.retention,
      employees: Math.floor(reportMetrics.totalEmployees / 5 * (0.8 + Math.random() * 0.4)),
      avgSalary: getCurrentLevelData().avgSalary * (0.9 + Math.random() * 0.2),
      trainingHours: Math.floor(100 + Math.random() * 200),
      certifications: Math.floor(20 + Math.random() * 50)
    }));

    const monthlyTrends = [
      { month: 'T1', employees: 1210, payroll: 25200000000, training: 580000000, kpi: 84.2, attendance: 94.8 },
      { month: 'T2', employees: 1225, payroll: 25800000000, training: 720000000, kpi: 85.8, attendance: 95.2 },
      { month: 'T3', employees: 1247, payroll: 26500000000, training: 890000000, kpi: 87.3, attendance: 95.8 },
      { month: 'T4', employees: reportMetrics.totalEmployees, payroll: reportMetrics.totalPayroll, training: reportMetrics.totalTrainingSpent, kpi: reportMetrics.avgKPI, attendance: reportMetrics.avgAttendance }
    ];

    const executiveSummary = {
      keyAchievements: [
        `Tăng trưởng nhân sự ${((reportMetrics.totalEmployees - 1210) / 1210 * 100).toFixed(1)}% so với đầu năm`,
        `KPI trung bình đạt ${reportMetrics.avgKPI.toFixed(1)}%, vượt mục tiêu 85%`,
        `Tỷ lệ retention ${reportMetrics.retentionRate}%, cao hơn industry average`,
        `ROI đào tạo đạt 185%, tiết kiệm ${formatCurrency(reportMetrics.totalTrainingSpent * 0.23)}`
      ],
      challenges: [
        'Thiếu nhân sự kỹ thuật cao cấp (Backend, AI/ML)',
        'Chi phí lương tăng 15% do cạnh tranh nhân tài',
        'Skill gap trong lĩnh vực Cloud Computing và Data Analytics',
        'Cần cải thiện work-life balance để giảm burnout risk'
      ],
      recommendations: [
        'Tăng ngân sách tuyển dụng cho tech positions (+30%)',
        'Đầu tư mạnh vào upskilling programs (Cloud, AI/ML)',
        'Triển khai flexible working model toàn công ty',
        'Xây dựng employer branding để attract top talents'
      ]
    };

    const complianceChecklist = [
      { item: 'Labor Law Compliance', status: 'compliant', lastCheck: '2024-08-15', nextDue: '2024-11-15' },
      { item: 'Social Insurance Coverage', status: 'compliant', lastCheck: '2024-08-01', nextDue: '2024-11-01' },
      { item: 'Occupational Safety Training', status: 'warning', lastCheck: '2024-07-20', nextDue: '2024-09-20' },
      { item: 'Data Protection (GDPR)', status: 'compliant', lastCheck: '2024-08-10', nextDue: '2024-11-10' },
      { item: 'Equal Opportunity Policy', status: 'compliant', lastCheck: '2024-08-05', nextDue: '2024-11-05' }
    ];

    const hrKPIs = [
      { metric: 'Time to Hire', current: '18.5 days', target: '≤20 days', trend: 'improving', change: '-3.2 days' },
      { metric: 'Cost per Hire', current: formatCurrency(12500000), target: formatCurrency(15000000), trend: 'improving', change: '-16.7%' },
      { metric: 'Employee NPS', current: '78', target: '≥75', trend: 'stable', change: '+2 points' },
      { metric: 'Training ROI', current: '185%', target: '≥150%', trend: 'improving', change: '+23%' },
      { metric: 'Internal Promotion Rate', current: '72%', target: '≥65%', trend: 'improving', change: '+7%' },
      { metric: 'Absenteeism Rate', current: '2.8%', target: '≤3%', trend: 'stable', change: '-0.2%' }
    ];

    return (
      <div className="space-y-6">
        {/* Executive Dashboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Executive HR Dashboard - Tổng hợp BMC → F1 → F2 → F3 → F4 → F5
            </CardTitle>
            <CardDescription>Báo cáo tổng quan toàn hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                <div className="text-3xl font-bold text-primary">{reportMetrics.totalEmployees.toLocaleString()}</div>
                <div className="font-medium">Total Workforce</div>
                <div className="text-sm text-muted-foreground">
                  +{Object.values(hrDataByLevel).reduce((sum, level) => sum + level.newHires, 0)} tháng này
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{formatCurrency(reportMetrics.totalPayroll)}</div>
                <div className="font-medium">Total Payroll</div>
                <div className="text-sm text-muted-foreground">
                  TB: {formatCurrency(reportMetrics.totalPayroll / reportMetrics.totalEmployees)}
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{reportMetrics.avgKPI.toFixed(1)}%</div>
                <div className="font-medium">Average KPI</div>
                <div className="text-sm text-muted-foreground">
                  Target: 85% • {reportMetrics.avgKPI >= 85 ? '✅' : '⚠️'}
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">{reportMetrics.retentionRate}%</div>
                <div className="font-medium">Retention Rate</div>
                <div className="text-sm text-muted-foreground">
                  Industry: 94% • ⬆️ {(reportMetrics.retentionRate - 94).toFixed(1)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department Performance Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Báo cáo hiệu suất theo phòng ban
            </CardTitle>
            <CardDescription>Phân tích chi tiết từng bộ phận</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentReports.map((dept, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{dept.department}</div>
                        <div className="text-sm text-muted-foreground">{dept.employees} nhân viên</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={dept.kpi >= 90 ? "default" : dept.kpi >= 80 ? "secondary" : "destructive"}>
                        KPI: {dept.kpi.toFixed(1)}%
                      </Badge>
                      <Badge variant={dept.retention >= 95 ? "default" : dept.retention >= 90 ? "secondary" : "destructive"}>
                        Retention: {dept.retention.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Lương TB:</span>
                      <div className="font-bold">{formatCurrency(dept.avgSalary)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Satisfaction:</span>
                      <div className="font-bold flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        {dept.satisfaction}/5.0
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Training Hours:</span>
                      <div className="font-bold">{dept.trainingHours}h</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Certificates:</span>
                      <div className="font-bold">{dept.certifications}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">KPI Progress</div>
                      <Progress value={dept.kpi} className="h-2" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Satisfaction</div>
                      <Progress value={(dept.satisfaction / 5) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Retention</div>
                      <Progress value={dept.retention} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Xu hướng theo tháng
              </CardTitle>
              <CardDescription>Biến động chỉ số quan trọng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyTrends.map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="font-medium">{month.month}/2024</div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold">{month.employees.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Nhân sự</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{month.kpi.toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground">KPI</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{month.attendance.toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground">Attendance</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{formatCurrency(month.training)}</div>
                        <div className="text-xs text-muted-foreground">Training</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* HR KPIs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                HR Key Performance Indicators
              </CardTitle>
              <CardDescription>Chỉ số hiệu suất quan trọng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hrKPIs.map((kpi, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{kpi.metric}</div>
                      <div className="text-sm text-muted-foreground">Target: {kpi.target}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{kpi.current}</div>
                      <div className={`text-sm flex items-center ${
                        kpi.trend === 'improving' ? 'text-green-600' : 
                        kpi.trend === 'declining' ? 'text-red-600' : 'text-muted-foreground'
                      }`}>
                        {kpi.trend === 'improving' ? '📈' : kpi.trend === 'declining' ? '📉' : '➡️'} {kpi.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Executive Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Executive Summary & Strategic Recommendations
            </CardTitle>
            <CardDescription>Tóm tắt chiến lược và khuyến nghị</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-green-600 mb-3">🎯 Key Achievements</h4>
                <div className="space-y-2">
                  {executiveSummary.keyAchievements.map((achievement, index) => (
                    <div key={index} className="text-sm p-2 bg-green-50 rounded border border-green-200">
                      • {achievement}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-orange-600 mb-3">⚠️ Current Challenges</h4>
                <div className="space-y-2">
                  {executiveSummary.challenges.map((challenge, index) => (
                    <div key={index} className="text-sm p-2 bg-orange-50 rounded border border-orange-200">
                      • {challenge}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-600 mb-3">💡 Strategic Recommendations</h4>
                <div className="space-y-2">
                  {executiveSummary.recommendations.map((recommendation, index) => (
                    <div key={index} className="text-sm p-2 bg-blue-50 rounded border border-blue-200">
                      • {recommendation}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Report */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Compliance & Legal Report
            </CardTitle>
            <CardDescription>Tuân thủ pháp luật và quy định</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceChecklist.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'compliant' ? 'bg-green-500' : 
                      item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <div className="font-medium">{item.item}</div>
                      <div className="text-sm text-muted-foreground">
                        Last check: {new Date(item.lastCheck).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={item.status === 'compliant' ? 'default' : item.status === 'warning' ? 'secondary' : 'destructive'}>
                      {item.status}
                    </Badge>
                    <div className="text-sm text-muted-foreground mt-1">
                      Due: {new Date(item.nextDue).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              AI Report Generator & Actions
            </CardTitle>
            <CardDescription>Tạo báo cáo tự động và thao tác</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Button variant="outline" className="h-20 flex-col">
                <FileText className="h-6 w-6 mb-2" />
                <span className="text-sm">Executive Report</span>
                <span className="text-xs text-muted-foreground">PDF Export</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <TrendingUp className="h-6 w-6 mb-2" />
                <span className="text-sm">Performance Dashboard</span>
                <span className="text-xs text-muted-foreground">Interactive</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm">Department Analysis</span>
                <span className="text-xs text-muted-foreground">Drill-down</span>
              </Button>
            </div>
            
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg mb-4">
              <div className="flex items-center gap-3 mb-3">
                <Bot className="h-6 w-6 text-primary" />
                <span className="font-medium">AI Insights & Predictions:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  • Dự báo tăng trưởng nhân sự Q4: +5.2%<br />
                  • Risk churn cao ở F4-F5 levels<br />
                  • Training ROI sẽ đạt 200% nếu tăng AI/ML courses<br />
                  • Khuyến nghị mở 25 vị trí tech trong Q4
                </div>
                <div>
                  • Gender diversity cần cải thiện: 68% male<br />
                  • Remote work satisfaction tăng 15%<br />
                  • Skill gap Cloud sẽ được lấp đầy trong 6 tháng<br />
                  • Cost per hire giảm 20% với AI recruitment
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Input placeholder="Tạo báo cáo tùy chỉnh: 'Phân tích chi phí nhân sự Q3 theo từng cấp độ tổ chức'" className="flex-1" />
              <Button>
                <Bot className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                👥 Nhân sự
              </h1>
              <p className="text-muted-foreground">Quản lý nhân sự xuyên suốt BMC → F1 → F2 → F3 → F4 → F5</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Select value={selectedLevel} onValueChange={(value) => setSelectedLevel(value as keyof typeof organizationalLevels)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Chọn cấp độ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BMC">BMC - Blue Mountain Capital</SelectItem>
                <SelectItem value="F1">F1 - Technology Cluster</SelectItem>
                <SelectItem value="F2">F2 - FinTech Sector</SelectItem>
                <SelectItem value="F3">F3 - Payment Solutions Co.</SelectItem>
                <SelectItem value="F4">F4 - Mobile Payment Branch</SelectItem>
                <SelectItem value="F5">F5 - QR Pay Startup</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import nhân sự
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Thêm nhân sự
            </Button>
          </div>
        </div>

        {/* Current Level Info */}
        <Card className="mb-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{organizationalLevels[selectedLevel].name}</h2>
                <p className="text-muted-foreground">Cấp độ: {organizationalLevels[selectedLevel].code}</p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="font-bold text-lg">{getCurrentLevelData().totalEmployees}</div>
                  <div className="text-muted-foreground">Nhân sự</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">{formatCurrency(organizationalLevels[selectedLevel].budget)}</div>
                  <div className="text-muted-foreground">Ngân sách</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">{getCurrentLevelData().departments.length}</div>
                  <div className="text-muted-foreground">Phòng ban</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng nhân sự</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{consolidatedReports.totalAcrossLevels.employees.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <UserPlus className="w-3 h-3 inline mr-1" />
                +{Object.values(hrDataByLevel).reduce((sum, level) => sum + level.newHires, 0)} tháng này
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chấm công</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(Object.values(hrDataByLevel).reduce((sum, level) => sum + level.attendanceRate, 0) / Object.values(hrDataByLevel).length).toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                Tỷ lệ trung bình
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">KPI</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{(Object.values(hrDataByLevel).reduce((sum, level) => sum + level.kpiCompletion, 0) / Object.values(hrDataByLevel).length).toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                Hoàn thành KPI
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chi phí lương</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{formatCurrency(consolidatedReports.totalAcrossLevels.payroll)}</div>
              <p className="text-xs text-muted-foreground">
                Tháng này
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đào tạo</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{Object.values(hrDataByLevel).reduce((sum, level) => sum + level.trainingInProgress, 0)}</div>
              <p className="text-xs text-muted-foreground">
                Khóa học active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI HR Agent</CardTitle>
              <Bot className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold text-primary">Trợ lý nhân sự</div>
              <p className="text-xs text-muted-foreground">
                5 cảnh báo | 8 khuyến nghị
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="employees" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Nhân sự
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Chấm công
            </TabsTrigger>
            <TabsTrigger value="recruitment" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Tuyển dụng
            </TabsTrigger>
            <TabsTrigger value="kpi" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              KPI/OKR
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Đào tạo
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Báo cáo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="employees" className="space-y-6">
            {renderEmployeeManagement()}
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            {renderAttendanceManagement()}
          </TabsContent>

          <TabsContent value="recruitment" className="space-y-6">
            {renderRecruitment()}
          </TabsContent>

          <TabsContent value="kpi" className="space-y-6">
            {renderKPIManagement()}
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            {renderTrainingManagement()}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {renderHRReports()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}