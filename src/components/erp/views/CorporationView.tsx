import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  AlertTriangle, 
  BarChart3,
  ArrowRight,
  Plus,
  Settings,
  FileText,
  List,
  Globe,
  Network,
  PieChart,
  Filter,
  Search,
  Download,
  Layers,
  Factory,
  Briefcase,
  MapPin,
  Calendar,
  Percent,
  Zap,
  Lightbulb,
  Award,
  Shield,
  Eye,
  CheckCircle,
  Activity,
  Rocket
} from "lucide-react";

interface CorporationViewProps {
  organizations: any[];
  onViewOrganizationList?: () => void;
}

export function CorporationView({ organizations, onViewOrganizationList }: CorporationViewProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("year");
  const [viewMode, setViewMode] = useState<"overview" | "detailed">("overview");
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null);
  const navigate = useNavigate();

  // Calculate aggregated metrics for BMC Holdings
  const totalOrganizations = organizations?.length || 0;
  const totalInvestment = organizations?.reduce((sum, org) => sum + (org.organizations?.total_investment_value || 0), 0) || 0;
  const averageEquity = organizations?.reduce((sum, org) => sum + (org.organizations?.bmc_equity_percentage || 0), 0) / Math.max(totalOrganizations, 1) || 0;
  
  // Enhanced BMC Holdings metrics - Professional Data
  const bmcHoldingsData = {
    totalRevenue: 0, // tỷ VNĐ - Doanh thu hợp nhất
    totalProfit: 0,   // tỷ VNĐ - Lợi nhuận sau thuế
    totalEmployees: 0, // Tổng nhân sự toàn tập đoàn
    totalAssets: 0, // Tổng tài sản tỷ VNĐ
    totalCosts: 0,   // Chi phí hợp nhất
    shareholders: 0,   // Số cổ đông
    internationalMarkets: 0, // Thị trường quốc tế
    clusters: 0,         // 4 cụm ngành chính
    companies: 0,
    avgROI: 0,        // ROI trung bình %
    complianceScore: 0  // Điểm tuân thủ %
  };

  // 4 Cụm ngành với dữ liệu chuyên nghiệp
  const clusterData = {
    fnb: { name: "F&B Cluster", revenue: 0, profit: 0, employees: 0, roi: 0 },
    tech: { name: "Tech Cluster", revenue: 0, profit: 0, employees: 0, roi: 0 },
    education: { name: "Education Cluster", revenue: 0, profit: 0, employees: 0, roi: 0 },
    jewelry: { name: "Jewelry Cluster (GAJ)", revenue: 0, profit: 0, employees: 0, roi: 0 }
  };

  // Quỹ tập đoàn - 4 loại quỹ với số liệu thực tế
  const corporateFunds = {
    operational: 0,    // Quỹ vận hành (tỷ VNĐ)
    development: 0,    // Quỹ phát triển (tỷ VNĐ)
    ma: 0,            // Quỹ M&A (tỷ VNĐ)
    riskReserve: 0    // Quỹ dự phòng rủi ro (tỷ VNĐ)
  };
  
  // Group organizations by level with enhanced data
  const organizationsByLevel = {
    F5: organizations?.filter(org => org.organizations?.level === 'F5') || [],
    F4: organizations?.filter(org => org.organizations?.level === 'F4') || [],
    F3: organizations?.filter(org => org.organizations?.level === 'F3') || [],
    F2: organizations?.filter(org => org.organizations?.level === 'F2') || [],
    F1: organizations?.filter(org => org.organizations?.level === 'F1') || [],
  };

  // Strategic initiatives và AI Agents - Dữ liệu chiến lược
  const strategicData = {
    activeMAs: 0,        // Thương vụ M&A đang thực hiện
    internationalExpansion: 0, // Dự án mở rộng quốc tế
    rdInvestment: 0,   // Đầu tư R&D (tỷ VNĐ)
    esgScore: 0,        // Điểm ESG
    digitalTransformation: 0, // % hoàn thành chuyển đổi số
    aiAgents: 0         // Số AI Agents hoạt động
  };

  // AI Agents tại tập đoàn
  const aiAgents = [
    { name: "AI Strategy Agent", status: "active", task: "Phân tích xu hướng toàn cầu" },
    { name: "AI CFO Agent", status: "active", task: "Phân tích tài chính hợp nhất" },
    { name: "AI HR Agent", status: "active", task: "Phân tích cơ cấu nhân sự" },
    { name: "AI Investment Agent", status: "active", task: "Quản lý M&A, quỹ tập đoàn" },
    { name: "AI Legal Agent", status: "active", task: "Giám sát rủi ro pháp lý toàn cầu" },
    { name: "AI Risk Agent", status: "monitoring", task: "Cảnh báo rủi ro vĩ mô" }
  ];

  // Comprehensive Investment Opportunities - Seamlessly integrated with departments & system
  const investmentOpportunities = [
    {
      id: 1,
      name: "BMC Digital Bank Holdings",
      category: "BMC - Strategic Acquisition",
      industry: "Financial Services",
      stage: "Acquisition",
      location: "Singapore & Vietnam",
      investmentRequired: 2850, // tỷ VNĐ
      equityOffered: 51, // %
      valuation: 5600, // tỷ VNĐ
      projectedROI: 28, // %
      timeline: "7-10 years",
      riskLevel: "Low-Medium",
      bmcLevel: "BMC Holdings",
      departments: {
        finance: { involvement: "Very High", tasks: ["M&A structuring", "Regulatory capital analysis", "Synergy valuation", "Integration planning"] },
        technology: { involvement: "High", tasks: ["Core banking integration", "Digital platform merger", "Cybersecurity assessment"] },
        legal: { involvement: "Very High", tasks: ["Banking license transfer", "Regulatory compliance", "Cross-border legal structure"] },
        hr: { involvement: "High", tasks: ["Executive integration", "Cultural alignment", "Talent retention strategy"] },
        strategy: { involvement: "Very High", tasks: ["Market consolidation strategy", "Digital transformation roadmap", "Regional expansion plan"] }
      },
      systemIntegration: {
        erpModules: ["Banking Operations", "Risk Management", "Regulatory Reporting", "Customer Relationship Management"],
        dataStreams: ["Transaction data", "Credit risk metrics", "Customer behavior", "Regulatory reports"],
        aiAnalytics: ["Credit scoring", "Fraud detection", "Customer segmentation", "Regulatory compliance monitoring"]
      },
      keyMetrics: {
        totalAssets: "45,600 tỷ VNĐ",
        customerBase: "8.5M customers",
        branchNetwork: "450+ branches",
        digitalAdoption: "78%",
        netInterestMargin: "3.2%",
        costToIncomeRatio: "42%"
      },
      highlights: [
        "🏦 Top 3 digital bank in Southeast Asia",
        "📱 Leading mobile banking platform",
        "🌟 Strong regulatory relationships",
        "💰 Stable dividend yield 6.5%"
      ],
      concerns: [
        "📋 Complex regulatory approval process",
        "💱 Currency exchange risks",
        "🏛️ Integration complexity"
      ]
    },
    {
      id: 2,
      name: "BMC Education Technology Group",
      category: "F1 - Group Company",
      industry: "Education Technology",
      stage: "Expansion",
      location: "Ho Chi Minh City, Vietnam",
      investmentRequired: 680, // tỷ VNĐ
      equityOffered: 35, // %
      valuation: 1940, // tỷ VNĐ
      projectedROI: 42, // %
      timeline: "5-7 years",
      riskLevel: "Medium",
      bmcLevel: "F1 - Tập đoàn",
      departments: {
        finance: { involvement: "High", tasks: ["Growth capital allocation", "Revenue model optimization", "International expansion funding"] },
        technology: { involvement: "Very High", tasks: ["AI learning platform development", "VR/AR integration", "Cloud infrastructure scaling"] },
        legal: { involvement: "Medium", tasks: ["Education licensing", "IP protection", "International compliance"] },
        hr: { involvement: "High", tasks: ["Academic talent acquisition", "Teacher training programs", "Performance management"] },
        strategy: { involvement: "High", tasks: ["Market penetration strategy", "Partnership development", "Curriculum innovation"] }
      },
      systemIntegration: {
        erpModules: ["Student Information System", "Learning Management System", "Financial Aid Management"],
        dataStreams: ["Student performance", "Learning analytics", "Engagement metrics"],
        aiAnalytics: ["Personalized learning", "Predictive student success", "Curriculum optimization"]
      },
      keyMetrics: {
        studentEnrollment: "125,000 students",
        courseCompletion: "87%",
        employmentRate: "94%",
        internationalPrograms: "15 countries",
        facultyRatio: "1:12",
        digitalLearning: "95%"
      },
      highlights: [
        "🎓 #1 Private Education Group in Vietnam",
        "🤖 AI-powered personalized learning",
        "🌍 International accreditation",
        "💼 95% graduate employment rate"
      ],
      concerns: [
        "📚 Regulatory changes in education",
        "💻 Technology infrastructure costs",
        "👥 Teacher shortage challenges"
      ]
    },
    {
      id: 3,
      name: "Smart Logistics Solutions",
      category: "F2 - Branch Company",
      industry: "Logistics & Supply Chain",
      stage: "Scale-up",
      location: "Da Nang, Vietnam",
      investmentRequired: 320, // tỷ VNĐ
      equityOffered: 40, // %
      valuation: 800, // tỷ VNĐ
      projectedROI: 38, // %
      timeline: "4-6 years",
      riskLevel: "Medium",
      bmcLevel: "F2 - Chi nhánh",
      departments: {
        finance: { involvement: "High", tasks: ["Fleet financing", "Operational cost optimization", "Revenue diversification"] },
        technology: { involvement: "Very High", tasks: ["IoT fleet management", "Route optimization AI", "Warehouse automation"] },
        legal: { involvement: "Medium", tasks: ["Transportation regulations", "Insurance compliance", "Cross-border logistics"] },
        hr: { involvement: "High", tasks: ["Driver recruitment", "Safety training", "Performance incentives"] },
        strategy: { involvement: "High", tasks: ["Market expansion", "Service diversification", "Partnership strategy"] }
      },
      systemIntegration: {
        erpModules: ["Fleet Management", "Warehouse Management", "Customer Portal"],
        dataStreams: ["Vehicle tracking", "Delivery metrics", "Customer satisfaction"],
        aiAnalytics: ["Route optimization", "Demand forecasting", "Predictive maintenance"]
      },
      keyMetrics: {
        fleetSize: "850 vehicles",
        warehouseSpace: "45,000 m²",
        dailyDeliveries: "12,500 packages",
        onTimeDelivery: "96.8%",
        customerSatisfaction: "4.7/5",
        fuelEfficiency: "+25%"
      },
      highlights: [
        "🚚 Largest logistics network in Central Vietnam",
        "📱 Real-time tracking technology",
        "🌱 Green logistics initiative",
        "⚡ Same-day delivery capability"
      ],
      concerns: [
        "⛽ Rising fuel costs",
        "🚧 Infrastructure limitations",
        "👷 Driver shortage issues"
      ]
    },
    {
      id: 4,
      name: "BMC Food & Beverage Department",
      category: "F3 - Department",
      industry: "Food & Beverage",
      stage: "Optimization",
      location: "Ho Chi Minh City, Vietnam",
      investmentRequired: 180, // tỷ VNĐ
      equityOffered: 30, // %
      valuation: 600, // tỷ VNĐ
      projectedROI: 35, // %
      timeline: "3-5 years",
      riskLevel: "Medium",
      bmcLevel: "F3 - Phòng ban",
      departments: {
        finance: { involvement: "High", tasks: ["Cost center optimization", "Revenue stream analysis", "Budget allocation"] },
        technology: { involvement: "High", tasks: ["Kitchen automation", "POS system upgrade", "Supply chain digitization"] },
        legal: { involvement: "Medium", tasks: ["Food safety compliance", "Franchise agreements", "Labor regulations"] },
        hr: { involvement: "Very High", tasks: ["Staff training programs", "Performance management", "Recruitment strategy"] },
        strategy: { involvement: "High", tasks: ["Market positioning", "Brand development", "Expansion planning"] }
      },
      systemIntegration: {
        erpModules: ["Inventory Management", "Point of Sale", "Staff Scheduling", "Quality Control"],
        dataStreams: ["Sales data", "Inventory levels", "Customer feedback", "Staff performance"],
        aiAnalytics: ["Demand forecasting", "Menu optimization", "Customer behavior analysis"]
      },
      keyMetrics: {
        restaurantChains: "85 locations",
        dailyCustomers: "25,000 customers",
        averageTicket: "185,000 VNĐ",
        foodCostRatio: "28%",
        customerSatisfaction: "4.6/5",
        staffTurnover: "15%"
      },
      highlights: [
        "🍽️ Leading Vietnamese cuisine chain",
        "📱 Digital ordering platform",
        "🌟 Premium dining experience",
        "🚀 Rapid expansion capability"
      ],
      concerns: [
        "🥘 Food cost inflation",
        "👨‍🍳 Skilled chef shortage",
        "🏪 High rental costs"
      ]
    },
    {
      id: 5,
      name: "BMC Digital Marketing Project",
      category: "F4 - Project",
      industry: "Digital Marketing",
      stage: "Implementation",
      location: "Ho Chi Minh City, Vietnam",
      investmentRequired: 85, // tỷ VNĐ
      equityOffered: 25, // %
      valuation: 340, // tỷ VNĐ
      projectedROI: 45, // %
      timeline: "2-3 years",
      riskLevel: "Medium",
      bmcLevel: "F4 - Dự án",
      departments: {
        finance: { involvement: "High", tasks: ["ROI tracking", "Budget optimization", "Performance metrics"] },
        technology: { involvement: "Very High", tasks: ["Marketing automation", "Data analytics platform", "CRM integration"] },
        legal: { involvement: "Medium", tasks: ["Data privacy compliance", "Advertising regulations", "Contract management"] },
        hr: { involvement: "High", tasks: ["Digital talent acquisition", "Skills development", "Team coordination"] },
        strategy: { involvement: "Very High", tasks: ["Campaign strategy", "Brand positioning", "Market analysis"] }
      },
      systemIntegration: {
        erpModules: ["Campaign Management", "Customer Analytics", "Lead Management"],
        dataStreams: ["Campaign performance", "Customer engagement", "Conversion metrics"],
        aiAnalytics: ["Customer segmentation", "Predictive targeting", "Content optimization"]
      },
      keyMetrics: {
        campaignsManaged: "150+ active campaigns",
        leadGeneration: "25,000 leads/month",
        conversionRate: "12.5%",
        customerAcquisitionCost: "125,000 VNĐ",
        brandAwareness: "+85%",
        digitalReach: "2.8M people"
      },
      highlights: [
        "📈 300% increase in digital engagement",
        "🎯 AI-powered targeting system",
        "🏆 Best Digital Campaign Award 2024",
        "📱 Omnichannel marketing platform"
      ],
      concerns: [
        "📊 Data privacy regulations",
        "💻 Technology platform costs",
        "🎯 Market saturation risks"
      ]
    },
    {
      id: 6,
      name: "TechStart AI Solutions",
      category: "F5 - Startup",
      industry: "Artificial Intelligence",
      stage: "Seed",
      location: "Ho Chi Minh City, Vietnam",
      investmentRequired: 25, // tỷ VNĐ
      equityOffered: 20, // %
      valuation: 125, // tỷ VNĐ
      projectedROI: 65, // %
      timeline: "2-4 years",
      riskLevel: "High",
      bmcLevel: "F5 - Startup",
      departments: {
        finance: { involvement: "High", tasks: ["Seed funding management", "Burn rate optimization", "Financial planning"] },
        technology: { involvement: "Very High", tasks: ["AI model development", "Platform architecture", "Technical scaling"] },
        legal: { involvement: "High", tasks: ["IP protection", "Startup compliance", "Investment agreements"] },
        hr: { involvement: "Very High", tasks: ["Founder support", "Team building", "Equity management"] },
        strategy: { involvement: "Very High", tasks: ["Product-market fit", "Go-to-market strategy", "Competitive positioning"] }
      },
      systemIntegration: {
        erpModules: ["Startup Management", "Product Development", "Investor Relations"],
        dataStreams: ["Product metrics", "User feedback", "Development progress"],
        aiAnalytics: ["User behavior analysis", "Product optimization", "Market validation"]
      },
      keyMetrics: {
        activeUsers: "15,000 users",
        monthlyGrowth: "35%",
        productIterations: "12 versions",
        customerRetention: "78%",
        teamSize: "8 members",
        fundingRaised: "15 tỷ VNĐ"
      },
      highlights: [
        "🚀 Fastest growing AI startup in Vietnam",
        "💡 Innovative machine learning platform",
        "🏆 Startup of the Year finalist",
        "🤝 Partnership with major tech companies"
      ],
      concerns: [
        "💰 Limited runway (12 months)",
        "🏃‍♂️ Intense competition",
        "👥 Key person dependency"
      ]
    },
    {
      id: 7,
      name: "Green Energy Solutions Ltd",
      category: "F3 - Strategic Company",
      industry: "Renewable Energy",
      stage: "Expansion",
      location: "Singapore",
      investmentRequired: 450, // tỷ VNĐ
      equityOffered: 35, // %
      valuation: 1285, // tỷ VNĐ
      projectedROI: 32, // %
      timeline: "5-7 years",
      riskLevel: "Low-Medium",
      bmcLevel: "F3 - Công ty chiến lược",
      departments: {
        finance: { involvement: "High", tasks: ["ESG financing", "Green bonds", "Carbon credit trading", "Sustainability reporting"] },
        technology: { involvement: "Very High", tasks: ["Solar panel innovation", "Energy storage systems", "Smart grid integration"] },
        legal: { involvement: "High", tasks: ["Environmental regulations", "International climate agreements", "Renewable energy certificates"] },
        hr: { involvement: "Medium", tasks: ["Green talent acquisition", "Sustainability training", "Safety protocols"] },
        strategy: { involvement: "Very High", tasks: ["Regional expansion", "Technology partnerships", "Market leadership in renewables"] }
      },
      systemIntegration: {
        erpModules: ["Energy Management", "ESG Reporting", "Project Management", "Regulatory Compliance"],
        dataStreams: ["Energy production", "Carbon footprint", "Weather data", "Grid performance"],
        aiAnalytics: ["Energy forecasting", "Predictive maintenance", "Grid optimization"]
      },
      keyMetrics: {
        installedCapacity: "500 MW",
        annualRevenue: "385 tỷ VNĐ",
        carbonOffset: "285,000 tons CO2/year",
        customerBase: "450+ corporate clients",
        marketShare: "18% in Southeast Asia",
        projectPipeline: "1,200 MW"
      },
      highlights: [
        "🌱 ESG Score 96/100 - Regional leader",
        "📈 Revenue tăng 65% trong 3 năm",
        "🏅 ASEAN Green Energy Award 2024",
        "🤝 Partnership với Tesla Energy & Siemens"
      ],
      concerns: [
        "🌦️ Weather dependency risks",
        "💰 High capital requirements",
        "📋 Complex regulatory landscape"
      ]
    }
  ];

  // Department integration mapping
  const departmentIcons = {
    finance: DollarSign,
    technology: Zap,
    legal: Shield,
    hr: Users,
    strategy: Target,
    warehouse: Factory,
    sales: TrendingUp,
    rd: Lightbulb
  };

  const handleInvestmentSelect = (investment: any) => {
    setSelectedInvestment(investment);
    // Navigate to Investment Capital Detail View with investment data
    navigate('/investment-capital-detail', { 
      state: { 
        investmentData: investment,
        source: 'ecosystem-portfolio'
      } 
    });
    console.log(`Navigating to investment details for: ${investment.name}`);
  };

  const handleInvestmentInitiate = (investment: any) => {
    setSelectedInvestment(investment);
    // Navigate to Investment Capital Detail View with initiation mode
    navigate('/investment-capital-detail', { 
      state: { 
        investmentData: investment,
        source: 'ecosystem-portfolio',
        mode: 'initiate'
      } 
    });
    console.log(`Initiating investment process for: ${investment.name}`);
  };

  // Get recent organizations (last 5)
  const recentOrganizations = organizations?.slice(-5) || [];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">🏢 Tập đoàn BMC Holdings</h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Trung tâm điều hành & giám sát toàn bộ hệ sinh thái - Quản trị đỉnh cao BMC → F1 → F5
          </p>
        </div>
        <div className="flex items-center space-x-2 md:space-x-3 flex-wrap gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-28 md:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quarter">Quý</SelectItem>
              <SelectItem value="year">Năm</SelectItem>
              <SelectItem value="5year">5 năm</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="text-xs md:text-sm">
            <Filter className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Bộ lọc</span>
            <span className="sm:hidden">Lọc</span>
          </Button>
          {onViewOrganizationList && (
            <Button variant="outline" onClick={onViewOrganizationList} size="sm" className="text-xs md:text-sm">
              <List className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Xem tất cả tổ chức</span>
              <span className="sm:hidden">Tất cả</span>
            </Button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-card p-3 md:p-4 rounded-lg border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Phạm vi:</label>
              <Select defaultValue="global">
                <SelectTrigger className="w-28 md:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Toàn cầu</SelectItem>
                  <SelectItem value="vietnam">Việt Nam</SelectItem>
                  <SelectItem value="international">Quốc tế</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Chế độ xem:</label>
              <Select value={viewMode} onValueChange={(value: "overview" | "detailed") => setViewMode(value)}>
                <SelectTrigger className="w-28 md:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Tổng hợp</SelectItem>
                  <SelectItem value="detailed">Chi tiết</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button variant="default" size="sm" className="text-xs md:text-sm w-full sm:w-auto">
            <Search className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            🤖 Hỏi AI
          </Button>
        </div>
      </div>

      {/* BMC Holdings Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Doanh Thu Hợp Nhất</CardTitle>
            <DollarSign className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{bmcHoldingsData.totalRevenue} tỷ VNĐ</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              Chi phí: {bmcHoldingsData.totalCosts} tỷ VNĐ
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              💡 {clusterData.fnb.name}: {clusterData.fnb.revenue} tỷ | {clusterData.tech.name}: {clusterData.tech.revenue} tỷ
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Lợi Nhuận Tập Đoàn</CardTitle>
            <Target className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{bmcHoldingsData.totalProfit} tỷ VNĐ</div>
            <p className="text-xs text-muted-foreground">
              ROI: {bmcHoldingsData.avgROI}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              💡 Tỷ suất lợi nhuận {((bmcHoldingsData.totalProfit / bmcHoldingsData.totalRevenue) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Tổng Tài Sản</CardTitle>
            <Building2 className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{bmcHoldingsData.totalAssets} tỷ VNĐ</div>
            <p className="text-xs text-muted-foreground">
              <Users className="inline h-3 w-3 mr-1" />
              {bmcHoldingsData.totalEmployees.toLocaleString()} nhân sự
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              💡 Compliance: {bmcHoldingsData.complianceScore}% | {strategicData.aiAgents} AI Agents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Mở Rộng Quốc Tế</CardTitle>
            <Globe className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{bmcHoldingsData.internationalMarkets}</div>
            <p className="text-xs text-muted-foreground">
              Thị trường quốc tế
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              💡 {strategicData.activeMAs} thương vụ M&A đang thực hiện
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Dashboard and Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-sm md:text-base">
              <Network className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Cấu Trúc Hệ Sinh Thái BMC Holdings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 md:space-y-4">
              {Object.entries(organizationsByLevel).map(([level, orgs]) => (
                <div key={level} className="space-y-2">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="font-medium flex items-center">
                      <Layers className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                      {level} - {level === 'F1' ? 'Cụm ngành' : level === 'F2' ? 'Công ty ngành' : level === 'F3' ? 'Công ty chiến lược' : level === 'F4' ? 'Chi nhánh/Dự án' : 'Startup'}
                    </span>
                    <span className="font-semibold">{orgs.length} đơn vị</span>
                  </div>
                  <Progress 
                    value={(orgs.length / Math.max(totalOrganizations, 1)) * 100} 
                    className="h-2 md:h-3" 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Tỷ lệ: {((orgs.length / Math.max(totalOrganizations, 1)) * 100).toFixed(1)}%</span>
                    <span>Vốn góp TB: {level === 'F1' ? '100%' : level === 'F2' ? '80%' : level === 'F3' ? '55%' : level === 'F4' ? '35%' : '15%'}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm md:text-base">
              <PieChart className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Chiến Lược Tập Đoàn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 md:space-y-4">
              <div className="p-3 md:p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs md:text-sm font-medium text-foreground">R&D Investment</span>
                  <span className="font-bold text-primary text-sm md:text-base">{strategicData.rdInvestment} tỷ VNĐ</span>
                </div>
                <Progress value={75} className="h-2 md:h-3" />
                <div className="text-xs text-muted-foreground mt-1">Mục tiêu: 150 tỷ</div>
              </div>
              
              <div className="p-3 md:p-4 bg-accent/5 border border-accent/20 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs md:text-sm font-medium text-foreground">ESG Score</span>
                  <span className="font-bold text-accent-foreground text-sm md:text-base">{strategicData.esgScore}%</span>
                </div>
                <Progress value={strategicData.esgScore} className="h-2 md:h-3" />
                <div className="text-xs text-muted-foreground mt-1">Mục tiêu: 95%</div>
              </div>
              
              <div className="p-3 md:p-4 bg-secondary/30 border border-secondary/40 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs md:text-sm font-medium text-foreground">Chuyển Đổi Số</span>
                  <span className="font-bold text-secondary-foreground text-sm md:text-base">{strategicData.digitalTransformation}%</span>
                </div>
                <Progress value={strategicData.digitalTransformation} className="h-2 md:h-3" />
                <div className="text-xs text-muted-foreground mt-1">Hoàn thành Q4/2025</div>
              </div>

              <div className="text-center pt-3 md:pt-4 p-3 md:p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                <Globe className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-2 text-primary" />
                <p className="text-xs md:text-sm font-bold text-foreground">Global Expansion</p>
                <p className="text-xs text-muted-foreground">{bmcHoldingsData.internationalMarkets} thị trường hoạt động</p>
                <div className="mt-2 text-xs text-primary font-medium">
                  🌍 Singapore • 🇰🇷 Hàn Quốc • 🇯🇵 Nhật Bản • 🇺🇸 Mỹ
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Executive Dashboard */}
      <Tabs defaultValue="portfolio" className="space-y-4 md:space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 min-w-[600px] md:min-w-0">
            <TabsTrigger value="portfolio" className="text-xs md:text-sm">Danh mục đầu tư</TabsTrigger>
            <TabsTrigger value="finance" className="text-xs md:text-sm">Tài chính hợp nhất</TabsTrigger>  
            <TabsTrigger value="ma" className="text-xs md:text-sm">M&A & Mở rộng</TabsTrigger>
            <TabsTrigger value="strategy" className="text-xs md:text-sm">Chiến lược</TabsTrigger>
            <TabsTrigger value="governance" className="text-xs md:text-sm">Quản trị</TabsTrigger>  
            <TabsTrigger value="sustainability" className="text-xs md:text-sm">Bền vững</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Danh Mục Đầu Tư Hệ Sinh Thái ({totalOrganizations} đơn vị)
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm đầu tư
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center">
                        <Rocket className="h-5 w-5 mr-2 text-primary" />
                        Cơ Hội Đầu Tư - Tích Hợp Hệ Sinh Thái BMC
                      </DialogTitle>
                      <DialogDescription>
                        Phân tích toàn diện các cơ hội đầu tư với tích hợp liền mạch phòng ban và hệ thống
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                      {/* Investment Opportunities Overview */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card className="p-4 bg-primary/5 border-primary/20">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{investmentOpportunities.length}</div>
                            <div className="text-sm text-muted-foreground">Cơ hội đầu tư</div>
                          </div>
                        </Card>
                        <Card className="p-4 bg-accent/5 border-accent/20">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-accent-foreground">
                              {investmentOpportunities.reduce((sum, inv) => sum + inv.investmentRequired, 0)} tỷ
                            </div>
                            <div className="text-sm text-muted-foreground">Tổng vốn cần thiết</div>
                          </div>
                        </Card>
                        <Card className="p-4 bg-secondary/20 border-secondary/30">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-secondary-foreground">
                              {(investmentOpportunities.reduce((sum, inv) => sum + inv.projectedROI, 0) / investmentOpportunities.length).toFixed(1)}%
                            </div>
                            <div className="text-sm text-muted-foreground">ROI trung bình</div>
                          </div>
                        </Card>
                        <Card className="p-4 bg-green-50 border-green-200">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {investmentOpportunities.reduce((sum, inv) => sum + inv.valuation, 0)} tỷ
                            </div>
                            <div className="text-sm text-muted-foreground">Tổng giá trị định giá</div>
                          </div>
                        </Card>
                      </div>

                      {/* Detailed Investment Opportunities */}
                      <div className="space-y-6">
                        {investmentOpportunities.map((investment) => (
                          <Card key={investment.id} className="border-2 hover:border-primary/30 transition-colors">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Building2 className="h-6 w-6 text-primary" />
                                  </div>
                                  <div>
                                    <CardTitle className="text-lg">{investment.name}</CardTitle>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <Badge variant="outline">{investment.category}</Badge>
                                      <Badge variant="secondary">{investment.stage}</Badge>
                                      <Badge 
                                        variant={investment.riskLevel === 'Low-Medium' ? 'default' : 
                                                investment.riskLevel === 'Medium' ? 'secondary' : 'destructive'}
                                      >
                                        {investment.riskLevel}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-primary">{investment.projectedROI}%</div>
                                  <div className="text-sm text-muted-foreground">ROI dự kiến</div>
                                </div>
                              </div>
                            </CardHeader>
                            
                            <CardContent className="space-y-6">
                              {/* Key Investment Metrics */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-3 bg-blue-50 rounded-lg">
                                  <div className="font-bold text-blue-600">{investment.investmentRequired} tỷ VNĐ</div>
                                  <div className="text-xs text-muted-foreground">Vốn cần thiết</div>
                                </div>
                                <div className="text-center p-3 bg-green-50 rounded-lg">
                                  <div className="font-bold text-green-600">Mở bán</div>
                                  <div className="text-xs text-muted-foreground">Trạng thái đầu tư</div>
                                </div>
                                <div className="text-center p-3 bg-purple-50 rounded-lg">
                                  <div className="font-bold text-purple-600">{investment.valuation} tỷ VNĐ</div>
                                  <div className="text-xs text-muted-foreground">Định giá</div>
                                </div>
                                <div className="text-center p-3 bg-orange-50 rounded-lg">
                                  <div className="font-bold text-orange-600">{investment.timeline}</div>
                                  <div className="text-xs text-muted-foreground">Thời gian đầu tư</div>
                                </div>
                              </div>

                              {/* Location & Industry */}
                              <div className="flex items-center space-x-6 text-sm">
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span>{investment.location}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Factory className="h-4 w-4 text-muted-foreground" />
                                  <span>{investment.industry}</span>
                                </div>
                              </div>

                              {/* Department Integration - Key Feature */}
                              <div className="space-y-3">
                                <h4 className="font-semibold flex items-center">
                                  <Network className="h-4 w-4 mr-2" />
                                  Tích Hợp Phòng Ban & Hệ Thống
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {Object.entries(investment.departments).map(([dept, info]) => {
                                    const IconComponent = departmentIcons[dept as keyof typeof departmentIcons] || Target;
                                    return (
                                      <div key={dept} className="p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                          <div className="flex items-center space-x-2">
                                            <IconComponent className="h-4 w-4 text-primary" />
                                            <span className="font-medium capitalize">{dept}</span>
                                          </div>
                                          <Badge 
                                            variant={info.involvement === 'Very High' || info.involvement === 'High' ? 'default' : 
                                                    info.involvement === 'Medium' ? 'secondary' : 'outline'}
                                            className="text-xs"
                                          >
                                            {info.involvement}
                                          </Badge>
                                        </div>
                                        <div className="space-y-1">
                                          {(info as any).tasks.slice(0, 2).map((task: string, index: number) => (
                                            <div key={index} className="text-xs text-muted-foreground flex items-start">
                                              <CheckCircle className="h-3 w-3 mr-1 mt-0.5 text-green-500" />
                                              {task}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* System Integration */}
                              <div className="space-y-3">
                                <h4 className="font-semibold flex items-center">
                                  <Activity className="h-4 w-4 mr-2" />
                                  Tích Hợp Hệ Thống ERP & AI
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="p-3 bg-blue-50 rounded-lg">
                                    <h5 className="font-medium text-blue-700 mb-2">ERP Modules</h5>
                                    {investment.systemIntegration.erpModules.map((module, index) => (
                                      <div key={index} className="text-xs text-blue-600 flex items-center">
                                        <Zap className="h-3 w-3 mr-1" />
                                        {module}
                                      </div>
                                    ))}
                                  </div>
                                  <div className="p-3 bg-green-50 rounded-lg">
                                    <h5 className="font-medium text-green-700 mb-2">Data Streams</h5>
                                    {investment.systemIntegration.dataStreams.map((stream, index) => (
                                      <div key={index} className="text-xs text-green-600 flex items-center">
                                        <BarChart3 className="h-3 w-3 mr-1" />
                                        {stream}
                                      </div>
                                    ))}
                                  </div>
                                  <div className="p-3 bg-purple-50 rounded-lg">
                                    <h5 className="font-medium text-purple-700 mb-2">AI Analytics</h5>
                                    {investment.systemIntegration.aiAnalytics.map((analytics, index) => (
                                      <div key={index} className="text-xs text-purple-600 flex items-center">
                                        <Lightbulb className="h-3 w-3 mr-1" />
                                        {analytics}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Key Performance Metrics */}
                              <div className="space-y-3">
                                <h4 className="font-semibold flex items-center">
                                  <BarChart3 className="h-4 w-4 mr-2" />
                                  Chỉ Số Hiệu Suất Chính
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                  {Object.entries(investment.keyMetrics).map(([metric, value]) => (
                                    <div key={metric} className="p-2 bg-muted/50 rounded text-center">
                                      <div className="font-semibold text-sm">{value}</div>
                                      <div className="text-xs text-muted-foreground capitalize">
                                        {metric.replace(/([A-Z])/g, ' $1').trim()}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Highlights & Concerns */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <h5 className="font-medium text-green-700 flex items-center">
                                    <Award className="h-4 w-4 mr-2" />
                                    Điểm Nổi Bật
                                  </h5>
                                  {investment.highlights.map((highlight, index) => (
                                    <div key={index} className="text-sm text-green-600 bg-green-50 p-2 rounded">
                                      {highlight}
                                    </div>
                                  ))}
                                </div>
                                <div className="space-y-2">
                                  <h5 className="font-medium text-orange-700 flex items-center">
                                    <AlertTriangle className="h-4 w-4 mr-2" />
                                    Rủi Ro & Thách Thức
                                  </h5>
                                  {investment.concerns.map((concern, index) => (
                                    <div key={index} className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
                                      {concern}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex justify-between items-center pt-4 border-t">
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleInvestmentSelect(investment)}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Xem Chi Tiết
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <FileText className="h-4 w-4 mr-2" />
                                    Due Diligence
                                  </Button>
                                </div>
                                <Button 
                                  variant="default"
                                  onClick={() => handleInvestmentInitiate(investment)}
                                >
                                  <Rocket className="h-4 w-4 mr-2" />
                                  Khởi Tạo Đầu Tư
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* AI Investment Recommendation */}
                      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <span className="mr-2">🤖</span>
                            AI Gợi Ý Đầu Tư Tối Ưu
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                              <h4 className="font-semibold text-primary">📊 Phân Tích AI</h4>
                              <p className="text-sm text-foreground mt-1">
                                "Dựa trên phân tích hệ sinh thái BMC, AI Healthcare Platform có ROI cao nhất (42%) và tích hợp tốt với 
                                phòng ban Technology. Green Energy Solutions phù hợp với chiến lược ESG và có rủi ro thấp."
                              </p>
                            </div>
                            <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                              <h4 className="font-semibold text-accent-foreground">💡 Đề Xuất Portfolio</h4>
                              <p className="text-sm text-foreground mt-1">
                                "Khuyến nghị đầu tư 40% vào Healthcare AI, 35% vào Green Energy, 25% vào các startup Fintech 
                                để tối ưu hóa ROI và đa dạng hóa rủi ro."
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrganizations.length > 0 ? recentOrganizations.map((org, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Factory className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{org.organizations?.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <Badge variant="outline">{org.organizations?.level}</Badge>
                          <span>{org.organizations?.industry}</span>
                          <span className="flex items-center">
                            <Target className="h-3 w-3 mr-1" />
                            {org.organizations?.bmc_equity_percentage}% BMC
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">
                          {(org.organizations?.total_investment_value / 1000000000).toFixed(1)} tỷ
                        </div>
                        <div className="text-muted-foreground">Giá trị đầu tư</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">28.5%</div>
                        <div className="text-muted-foreground">ROI</div>
                      </div>
                      <Badge 
                        variant={org.organizations?.status === 'active' ? 'default' : 'secondary'}
                      >
                        {org.organizations?.status === 'active' ? 'Hoạt động' : 
                         org.organizations?.status === 'planning' ? 'Lên kế hoạch' : 'Tạm dừng'}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Chưa có dữ liệu danh mục đầu tư</p>
                    <p className="text-sm">Sử dụng nút "Thêm đầu tư" để bắt đầu</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          {/* Quỹ tập đoàn - 4 loại quỹ */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Quỹ Vận Hành
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{corporateFunds.operational} tỷ VNĐ</div>
                <p className="text-xs text-muted-foreground">Thanh khoản cao</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Quỹ Phát Triển
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{corporateFunds.development} tỷ VNĐ</div>
                <p className="text-xs text-muted-foreground">R&D + Mở rộng</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <Building2 className="h-4 w-4 mr-2" />
                  Quỹ M&A
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{corporateFunds.ma} tỷ VNĐ</div>
                <p className="text-xs text-muted-foreground">{strategicData.activeMAs} thương vụ đang thực hiện</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Quỹ Dự Phòng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{corporateFunds.riskReserve} tỷ VNĐ</div>
                <p className="text-xs text-muted-foreground">Bảo hiểm rủi ro</p>
              </CardContent>
            </Card>
          </div>

          {/* Cụm ngành chi tiết */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Factory className="h-5 w-5 mr-2" />
                Chi Tiết 4 Cụm Ngành (Q2/2025)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.values(clusterData).map((cluster, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-sm mb-2">{cluster.name}</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Doanh thu:</span>
                        <span className="font-semibold">{cluster.revenue} tỷ</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lợi nhuận:</span>
                        <span className="font-semibold">{cluster.profit} tỷ</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nhân sự:</span>
                        <span className="font-semibold">{cluster.employees.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ROI:</span>
                        <span className="font-semibold text-green-600">{cluster.roi}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ma" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hoạt Động M&A & Mở Rộng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">Thương vụ M&A đang thực hiện</h4>
                      <p className="text-sm text-muted-foreground">{strategicData.activeMAs} thương vụ</p>
                    </div>
                    <Badge variant="secondary">Đang thương thảo</Badge>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">Mở rộng quốc tế</h4>
                      <p className="text-sm text-muted-foreground">{strategicData.internationalExpansion} thị trường mới</p>
                    </div>
                    <Badge variant="default">Triển khai</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chiến Lược Phát Triển 5 Năm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-primary/10 border border-primary/20 rounded-lg">
                  <h4 className="font-semibold text-primary">🎯 Mục Tiêu Chiến Lược 2025-2030</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="text-foreground">Doanh thu: <strong>5,000 tỷ VNĐ</strong></span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Globe className="h-4 w-4 text-primary" />
                      <span className="text-foreground">Thị trường: <strong>15 quốc gia</strong></span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-foreground">Nhân sự: <strong>20,000 người</strong></span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="text-foreground">ESG Score: <strong>95%</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Cơ Cấu Quản Trị BMC Holdings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Hội đồng quản trị</span>
                    <span className="font-semibold">5 thành viên</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ban điều hành</span>
                    <span className="font-semibold">8 thành viên</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cổ đông</span>
                    <span className="font-semibold">{bmcHoldingsData.shareholders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Agents hoạt động</span>
                    <span className="font-semibold">{strategicData.aiAgents} agents</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Network className="h-5 w-5 mr-2" />
                  AI Agents Tập Đoàn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiAgents.map((agent, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{agent.name}</div>
                        <div className="text-xs text-muted-foreground">{agent.task}</div>
                      </div>
                      <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                        {agent.status === 'active' ? 'Hoạt động' : 'Giám sát'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sustainability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Phát Triển Bền Vững (ESG)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Environmental Score</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Social Score</span>
                    <span>90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Governance Score</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Global Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="mr-2">🤖</span>
            AI Phân Tích Tập Đoàn & Gợi Ý Chiến Lược
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg border-l-4 border-l-primary">
              <h4 className="font-semibold text-primary">📊 AI Tóm Tắt Tập Đoàn</h4>
              <p className="text-foreground mt-2 text-sm leading-relaxed">
                "BMC Holdings đạt doanh thu hợp nhất {bmcHoldingsData.totalRevenue} tỷ VNĐ, 
                tăng 18% so với năm trước. Tổng tài sản {bmcHoldingsData.totalAssets} tỷ VNĐ, 
                ROI trung bình {bmcHoldingsData.avgROI}% với {bmcHoldingsData.totalEmployees.toLocaleString()} nhân sự toàn cầu."
              </p>
            </div>
            
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg border-l-4 border-l-destructive">
              <h4 className="font-semibold text-destructive">⚠️ AI Cảnh Báo Chiến Lược</h4>
              <p className="text-foreground mt-2 text-sm leading-relaxed">
                "Cụm Giáo dục cần tăng cường đầu tư công nghệ. 
                Thị trường quốc tế có dấu hiệu biến động, cần xem xét rủi ro tỷ giá."
              </p>
            </div>

            <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg border-l-4 border-l-accent">
              <h4 className="font-semibold text-accent-foreground">💡 AI Gợi Ý Mở Rộng</h4>
              <p className="text-foreground mt-2 text-sm leading-relaxed">
                "Tăng đầu tư Cụm Công nghệ (+40% ngân sách) do ROI cao. 
                Xem xét M&A công ty AI và Blockchain tại Singapore và Hàn Quốc. 
                Khởi động quỹ ESG để dẫn đầu xu hướng bền vững."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons - Enhanced with Professional Navigation */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        <Button 
          variant="default" 
          onClick={() => navigate('/consolidated-report')}
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          <FileText className="h-4 w-4 mr-2" />
          📊 Báo cáo hợp nhất
        </Button>
        <Button 
          variant="outline" 
          onClick={() => navigate('/strategic-dashboard')}
          className="border-accent/50 hover:bg-accent/10"
        >
          <Plus className="h-4 w-4 mr-2" />
          📌 Giao nhiệm vụ chiến lược
        </Button>
        <Button 
          variant="outline"
          onClick={() => {
            // Export functionality - could integrate with actual export logic
            console.log('Exporting consolidated report...');
            // For now, navigate to consolidated report with export parameter
            navigate('/consolidated-report?export=true');
          }}
          className="border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-950"
        >
          <Download className="h-4 w-4 mr-2" />
          ⬇️ Xuất báo cáo tập đoàn
        </Button>
        <Button 
          variant="outline"
          onClick={() => navigate('/drill-down-analytics')}
          className="border-purple-500/50 hover:bg-purple-50 dark:hover:bg-purple-950"
        >
          <Settings className="h-4 w-4 mr-2" />
          🔍 Drill-down
        </Button>
        <Button 
          variant="outline"
          onClick={() => navigate('/global-expansion')}
          className="border-green-500/50 hover:bg-green-50 dark:hover:bg-green-950"
        >
          <Globe className="h-4 w-4 mr-2" />
          🌍 Mở rộng toàn cầu
        </Button>
      </div>
    </div>
  );
}