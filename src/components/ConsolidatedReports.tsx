import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, Users, Building2, DollarSign, BarChart3, PieChart, Activity, Briefcase, Shield, Zap, Globe, ArrowUpRight, FileText, Target, Clock, CheckCircle2, Download, Search, Settings, MapPin } from "lucide-react";

// Professional Mockup Data - BMC Holdings Ecosystem - RESET TO 0
const consolidatedData = {
  // BMC Holdings (Corporation Level)
  bmcHoldings: {
    totalRevenue: "0",
    // 0 VND
    totalProfit: "0",
    // 0 VND  
    totalAssets: "0",
    // 0 VND
    employees: 0,
    complianceScore: 0,
    riskScore: 0,
    // No risk data
    clusters: 0
  },
  // F1 Level - Cluster Performance - RESET TO 0
  f1Clusters: [{
    name: "F&B Cluster",
    code: "BMC-FB",
    revenue: "0",
    profit: "0",
    employees: 0,
    companies: 0,
    growth: 0,
    roi: 0
  }, {
    name: "Tech Cluster",
    code: "BMC-TECH",
    revenue: "0",
    profit: "0",
    employees: 0,
    companies: 0,
    growth: 0,
    roi: 0
  }, {
    name: "Education Cluster",
    code: "BMC-EDU",
    revenue: "0",
    profit: "0",
    employees: 0,
    companies: 0,
    growth: 0,
    roi: 0
  }, {
    name: "Jewelry Cluster (GAJ)",
    code: "BMC-GAJ",
    revenue: "0",
    profit: "0",
    employees: 0,
    companies: 0,
    growth: 0,
    roi: 0
  }],
  // F2 Level - Strategic Companies Sample - RESET TO 0
  f2Companies: [{
    name: "BMC F&B Holdings",
    cluster: "F&B",
    level: "F2",
    revenue: "0",
    profit: "0",
    employees: 0,
    subsidiaries: 0
  }, {
    name: "BMC Digital Solutions",
    cluster: "Tech",
    level: "F2",
    revenue: "0",
    profit: "0",
    employees: 0,
    subsidiaries: 0
  }],
  // Department Reports (9 Core Functions)
  departmentReports: [{
    name: "Thông tin Cổ đông",
    icon: Users,
    kpis: {
      totalShareholders: 156,
      institutionalOwnership: "67%",
      retailOwnership: "33%",
      avgDividendYield: "8.5%"
    }
  }, {
    name: "Kinh doanh & Marketing",
    icon: TrendingUp,
    kpis: {
      marketShare: "23.4%",
      customerSatisfaction: "94%",
      brandValue: "1.2T VND",
      conversionRate: "12.8%"
    }
  }, {
    name: "Tài chính & Kế toán",
    icon: DollarSign,
    kpis: {
      cashFlow: "+185B VND",
      debtToEquity: "0.35",
      currentRatio: "2.1",
      auditScore: "AA+"
    }
  }, {
    name: "Nhân sự & Đào tạo",
    icon: Users,
    kpis: {
      retention: "94.2%",
      satisfaction: "4.6/5",
      trainingHours: "48h/year",
      promotion: "15.3%"
    }
  }, {
    name: "Sản xuất & Kho vận",
    icon: Building2,
    kpis: {
      efficiency: "96.8%",
      onTimeDelivery: "98.2%",
      inventoryTurnover: "12.4x",
      wasteReduction: "23%"
    }
  }, {
    name: "Chiến lược & R&D",
    icon: Target,
    kpis: {
      rdInvestment: "4.2% revenue",
      patents: "127 active",
      innovations: "23 launched",
      marketPenetration: "31%"
    }
  }, {
    name: "Công nghệ & Hạ tầng số",
    icon: Zap,
    kpis: {
      uptime: "99.7%",
      digitalAdoption: "89%",
      cybersecurity: "95/100",
      aiImplementation: "76%"
    }
  }, {
    name: "Pháp chế & Tuân thủ",
    icon: Shield,
    kpis: {
      compliance: "97.3%",
      legalRisk: "Low",
      contracts: "1,247 active",
      disputes: "2 ongoing"
    }
  }, {
    name: "Đầu tư & Quỹ",
    icon: Briefcase,
    kpis: {
      totalFunds: "1.5T VND",
      portfolioROI: "19.8%",
      newInvestments: "12 deals",
      exitValue: "340B VND"
    }
  }],
  // AI Insights & Predictions
  aiInsights: [{
    type: "Revenue Forecast",
    message: "Dự báo doanh thu Q3 tăng 12.3% so với cùng kỳ năm trước",
    confidence: 94,
    impact: "High"
  }, {
    type: "Risk Alert",
    message: "Cluster Tech cần tăng cường bảo mật sau sự cố ngành công nghệ toàn cầu",
    confidence: 87,
    impact: "Medium"
  }, {
    type: "Opportunity",
    message: "Thị trường F&B Đông Nam Á mở rộng - khuyến nghị M&A trong Q4",
    confidence: 91,
    impact: "High"
  }]
};
export const ConsolidatedReports = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  
  const formatCurrency = (amount: string) => {
    const num = parseInt(amount);
    if (num >= 1000000000000) return `${(num / 1000000000000).toFixed(1)}T`;
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(0)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(0)}M`;
    return num.toLocaleString();
  };
  return null;
};