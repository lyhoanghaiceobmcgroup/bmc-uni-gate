import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ArrowLeft, Server, Shield, Database, Cloud, Cpu, Monitor, Lock, Zap, BarChart3, 
  AlertTriangle, CheckCircle2, Clock, Settings, Wifi, HardDrive, Activity, FileCode, 
  Globe, Smartphone, Code, Layers, Network, Users, Wrench, Eye, Download, Upload, 
  RefreshCw, Bot, Plus, Edit, Building2, Briefcase, FlaskConical, Award, Target,
  TrendingUp, Brain, Lightbulb, Microscope, FileText, Star, Webhook, ChevronRight,
  Gauge, Router, CloudCog, ShieldCheck, UserCheck, Terminal, GitBranch, Bug, Key
} from "lucide-react";

interface TechnologyITDetailViewProps {
  onBack: () => void;
}

export function TechnologyITDetailView({ onBack }: TechnologyITDetailViewProps) {
  const [organizationLevel, setOrganizationLevel] = useState<"BMC" | "F1" | "F2" | "F3" | "F4" | "F5">("BMC");
  const [activeView, setActiveView] = useState<"systems" | "infrastructure" | "api" | "security" | "personnel" | "reports">("systems");

  // Comprehensive Professional Mockup Data
  const getOrganizationData = () => {
    const baseData = {
      BMC: { 
        name: "BMC Group Holdings", 
        itBudget: 0, 
        employeeCount: 0, 
        itStaff: 0,
        servers: 0,
        endpoints: 0,
        applications: 0
      },
      F1: { 
        name: "BMC Vietnam Coffee Corporation", 
        itBudget: 0, 
        employeeCount: 0, 
        itStaff: 0,
        servers: 0,
        endpoints: 0,
        applications: 0
      },
      F2: { 
        name: "Trung Nguyên Legend", 
        itBudget: 0, 
        employeeCount: 0, 
        itStaff: 0,
        servers: 0,
        endpoints: 0,
        applications: 0
      },
      F3: { 
        name: "Nhà máy Hà Nội", 
        itBudget: 0, 
        employeeCount: 0, 
        itStaff: 0,
        servers: 0,
        endpoints: 0,
        applications: 0
      },
      F4: { 
        name: "Chi nhánh Cầu Giấy", 
        itBudget: 0, 
        employeeCount: 0, 
        itStaff: 0,
        servers: 0,
        endpoints: 0,
        applications: 0
      },
      F5: { 
        name: "Phân xưởng A1", 
        itBudget: 0, 
        employeeCount: 0, 
        itStaff: 0,
        servers: 0,
        endpoints: 0,
        applications: 0
      }
    };
    return baseData[organizationLevel];
  };

  const getCurrentLevelData = () => {
    const multiplier = organizationLevel === "BMC" ? 1 : organizationLevel === "F1" ? 0.45 : organizationLevel === "F2" ? 0.28 : organizationLevel === "F3" ? 0.15 : organizationLevel === "F4" ? 0.08 : 0.03;
    const orgData = getOrganizationData();

    return {
      systems: {
        coreApps: { 
          erp: { version: "v3.2.1", uptime: 99.8, status: "Active", users: Math.round(orgData.employeeCount * 0.85) },
          crm: { version: "v2.8.4", uptime: 99.6, status: "Active", users: Math.round(orgData.employeeCount * 0.35) },
          hrm: { version: "v1.9.2", uptime: 99.9, status: "Active", users: Math.round(orgData.employeeCount * 0.45) },
          pos: { version: "v4.1.3", uptime: 99.5, status: "Active", terminals: Math.round(247 * multiplier) || 12 }
        },
        infrastructure: {
          physicalServers: Math.round(orgData.servers * 0.3),
          virtualServers: Math.round(orgData.servers * 0.7),
          networkDevices: Math.round(156 * multiplier) || 8,
          iotDevices: Math.round(2450 * multiplier) || 85,
          endpoints: orgData.endpoints
        },
        performance: {
          systemUptime: organizationLevel === "BMC" ? 99.94 : organizationLevel === "F1" ? 0 : 99.76,
          responseTime: organizationLevel === "BMC" ? 0.235 : organizationLevel === "F1" ? 0 : 0.356,
          throughput: Math.round(15000 * multiplier) || 450,
          errorRate: organizationLevel === "BMC" ? 0.06 : organizationLevel === "F1" ? 0 : 0.12
        },
        issues: {
          critical: Math.round(3 * multiplier) || 0,
          high: Math.round(7 * multiplier) || 1,
          medium: Math.round(15 * multiplier) || 2,
          low: Math.round(28 * multiplier) || 5
        }
      },
      infrastructure: {
        cloud: {
          providers: [
            { name: "AWS", instances: Math.round(24 * multiplier) || 2, cost: orgData.itBudget * 0.45, status: "Active" },
            { name: "Google Cloud", instances: Math.round(12 * multiplier) || 1, cost: orgData.itBudget * 0.25, status: "Active" },
            { name: "Azure", instances: Math.round(8 * multiplier) || 1, cost: orgData.itBudget * 0.15, status: "Backup" },
            { name: "VNPT Cloud", instances: Math.round(6 * multiplier) || 1, cost: orgData.itBudget * 0.10, status: "Active" }
          ],
          totalCost: orgData.itBudget * 0.6,
          uptime: 99.95,
          dataTransfer: Math.round(450 * multiplier) || 25
        },
        databases: {
          postgresql: { instances: 3, size: Math.round(2400 * multiplier) || 85, performance: 98 },
          mongodb: { instances: 2, size: Math.round(1800 * multiplier) || 65, performance: 96 },
          redis: { instances: 5, size: Math.round(240 * multiplier) || 12, performance: 99 },
          elasticsearch: { instances: 2, size: Math.round(560 * multiplier) || 28, performance: 94 }
        },
        network: {
          bandwidth: Math.round(10000 * multiplier) || 500,
          latency: organizationLevel === "BMC" ? 2.5 : 4.8,
          switches: Math.round(45 * multiplier) || 3,
          routers: Math.round(18 * multiplier) || 2,
          firewalls: Math.round(12 * multiplier) || 1
        }
      },
      apis: {
        banking: {
          vietcombank: { status: "Active", dailyTxn: Math.round(12800 * multiplier) || 485, successRate: 99.7 },
          bidv: { status: "Active", dailyTxn: Math.round(8500 * multiplier) || 325, successRate: 99.5 },
          vietinbank: { status: "Active", dailyTxn: Math.round(6200 * multiplier) || 285, successRate: 99.6 }
        },
        government: {
          einvoice: { status: "Connected", invoicesPerDay: Math.round(2400 * multiplier) || 85, compliance: 100 },
          tax: { status: "Synced", reportsPerMonth: Math.round(450 * multiplier) || 18, compliance: 100 },
          socialInsurance: { status: "Active", employees: orgData.employeeCount, compliance: 100 }
        },
        ecommerce: {
          shopee: { orders: Math.round(1850 * multiplier) || 65, revenue: Math.round(850000000 * multiplier) },
          lazada: { orders: Math.round(1240 * multiplier) || 45, revenue: Math.round(650000000 * multiplier) },
          tiki: { orders: Math.round(890 * multiplier) || 32, revenue: Math.round(480000000 * multiplier) }
        },
        internal: {
          microservices: Math.round(28 * multiplier) || 3,
          webhooks: Math.round(156 * multiplier) || 12,
          restApis: Math.round(85 * multiplier) || 8,
          graphqlApis: Math.round(15 * multiplier) || 2
        },
        performance: {
          avgResponseTime: organizationLevel === "BMC" ? 125 : organizationLevel === "F1" ? 0 : 185,
          requestsPerMinute: Math.round(8500 * multiplier) || 285,
          errorRate: 0.15,
          availability: 99.8
        }
      },
      security: {
        compliance: {
          iso27001: { status: "Certified", expiryDate: "2025-06-30", score: 96 },
          gdpr: { status: "Compliant", lastAudit: "2024-03-15", score: 94 },
          vietnam_data_protection: { status: "Compliant", lastUpdate: "2024-07-20", score: 98 },
          pci_dss: { status: "Certified", level: "Level 1", score: 92 }
        },
        threats: {
          blocked: Math.round(12500 * multiplier) || 485,
          malware: Math.round(85 * multiplier) || 5,
          phishing: Math.round(156 * multiplier) || 12,
          ddos: Math.round(8 * multiplier) || 1
        },
        vulnerabilities: {
          critical: Math.round(2 * multiplier) || 0,
          high: Math.round(5 * multiplier) || 1,
          medium: Math.round(18 * multiplier) || 3,
          low: Math.round(45 * multiplier) || 8,
          patched: 98.5
        },
        access: {
          mfa: { enabled: Math.round(orgData.employeeCount * 0.95), percentage: 95 },
          sso: { users: Math.round(orgData.employeeCount * 0.78), percentage: 78 },
          rbac: { roles: Math.round(85 * multiplier) || 8, policies: Math.round(156 * multiplier) || 15 },
          audit: { events: Math.round(15000 * multiplier) || 650, retention: 2 }
        }
      },
      personnel: {
        structure: {
          itManagers: Math.round(orgData.itStaff * 0.15) || 1,
          seniors: Math.round(orgData.itStaff * 0.25) || 1,
          midLevel: Math.round(orgData.itStaff * 0.35) || 2,
          juniors: Math.round(orgData.itStaff * 0.25) || 1
        },
        specializations: [
          { name: "DevOps Engineers", count: Math.round(orgData.itStaff * 0.20) || 1, avgSalary: organizationLevel === "BMC" ? 45000000 : organizationLevel === "F1" ? 0 : 35000000 },
          { name: "Full-stack Developers", count: Math.round(orgData.itStaff * 0.30) || 2, avgSalary: organizationLevel === "BMC" ? 38000000 : organizationLevel === "F1" ? 0 : 28000000 },
          { name: "Security Specialists", count: Math.round(orgData.itStaff * 0.15) || 1, avgSalary: organizationLevel === "BMC" ? 50000000 : organizationLevel === "F1" ? 0 : 40000000 },
          { name: "Data Engineers", count: Math.round(orgData.itStaff * 0.10) || 1, avgSalary: organizationLevel === "BMC" ? 42000000 : organizationLevel === "F1" ? 0 : 32000000 },
          { name: "Network Admins", count: Math.round(orgData.itStaff * 0.12) || 1, avgSalary: organizationLevel === "BMC" ? 35000000 : organizationLevel === "F1" ? 0 : 28000000 },
          { name: "Support Engineers", count: Math.round(orgData.itStaff * 0.13) || 1, avgSalary: organizationLevel === "BMC" ? 25000000 : organizationLevel === "F1" ? 0 : 20000000 }
        ],
        performance: {
          productivity: organizationLevel === "BMC" ? 94 : organizationLevel === "F1" ? 0 : 89,
          satisfaction: organizationLevel === "BMC" ? 91 : organizationLevel === "F1" ? 0 : 87,
          retention: organizationLevel === "BMC" ? 87 : organizationLevel === "F1" ? 0 : 82,
          training: Math.round(450 * multiplier) || 18
        },
        projects: {
          active: Math.round(15 * multiplier) || 2,
          completed: Math.round(35 * multiplier) || 4,
          onTime: organizationLevel === "BMC" ? 78 : organizationLevel === "F1" ? 0 : 72,
          budget: organizationLevel === "BMC" ? 95 : organizationLevel === "F1" ? 0 : 88
        }
      }
    };
  };

  const currentData = getCurrentLevelData();
  const orgInfo = getOrganizationData();

  const formatCurrency = (amount: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

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
                💻 Công nghệ – Hạ tầng số
              </h1>
              <p className="text-muted-foreground">Quản lý hạ tầng CNTT, phần mềm, bảo mật, dữ liệu và AI/ERP vận hành BMC → F1 → F2 → F3 → F4 → F5</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={organizationLevel} onValueChange={(value) => setOrganizationLevel(value as typeof organizationLevel)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BMC">🏢 BMC Group</SelectItem>
                <SelectItem value="F1">🏭 F1 - Vietnam Corp</SelectItem>
                <SelectItem value="F2">☕ F2 - Trung Nguyên</SelectItem>
                <SelectItem value="F3">🏢 F3 - Nhà máy HN</SelectItem>
                <SelectItem value="F4">🏪 F4 - CN Cầu Giấy</SelectItem>
                <SelectItem value="F5">⚙️ F5 - Phân xưởng A1</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button>
          </div>
        </div>

        {/* Organization Info */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{orgInfo.name}</h3>
                  <p className="text-sm text-muted-foreground">{orgInfo.itStaff} IT Staff • {orgInfo.servers} Servers • {orgInfo.applications} Apps</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{formatCurrency(orgInfo.itBudget)}</div>
                <p className="text-sm text-muted-foreground">Ngân sách IT năm nay</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{currentData.systems.performance.systemUptime}%</div>
              <p className="text-xs text-muted-foreground">ERP/CRM/HRM/POS</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cloud Infrastructure</CardTitle>
              <Cloud className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orgInfo.servers}</div>
              <p className="text-xs text-muted-foreground">Servers active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Integrations</CardTitle>
              <Webhook className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{currentData.apis.internal.restApis + currentData.apis.internal.graphqlApis}</div>
              <p className="text-xs text-muted-foreground">Active connections</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{currentData.security.compliance.iso27001.score}%</div>
              <p className="text-xs text-muted-foreground">ISO 27001 Certified</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">IT Personnel</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orgInfo.itStaff}</div>
              <p className="text-xs text-muted-foreground">Engineers active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{(orgInfo.itBudget / 12 / 1000000000).toFixed(1)}B</div>
              <p className="text-xs text-muted-foreground">VNĐ/tháng</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as typeof activeView)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="systems">🖥️ Hệ thống CNTT</TabsTrigger>
            <TabsTrigger value="infrastructure">☁️ Hạ tầng Cloud</TabsTrigger>
            <TabsTrigger value="api">🔌 API & Tích hợp</TabsTrigger>
            <TabsTrigger value="security">🔒 Bảo mật & Tuân thủ</TabsTrigger>
            <TabsTrigger value="personnel">👥 Nhân sự IT</TabsTrigger>
            <TabsTrigger value="reports">📊 Báo cáo Tech</TabsTrigger>
          </TabsList>

          <TabsContent value="systems">
            <div className="space-y-6">
              {/* Core Applications Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Hệ thống ứng dụng chính</CardTitle>
                  <CardDescription>Trạng thái và hiệu suất các ứng dụng cốt lõi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Layers className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">ERP Core System</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Version</span>
                          <Badge variant="outline">{currentData.systems.coreApps.erp.version}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Uptime</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.systems.coreApps.erp.uptime}%</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Active Users</span>
                          <span className="font-medium">{currentData.systems.coreApps.erp.users.toLocaleString()}</span>
                        </div>
                        <Progress value={currentData.systems.coreApps.erp.uptime} className="mt-2" />
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">CRM System</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Version</span>
                          <Badge variant="outline">{currentData.systems.coreApps.crm.version}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Uptime</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.systems.coreApps.crm.uptime}%</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Active Users</span>
                          <span className="font-medium">{currentData.systems.coreApps.crm.users.toLocaleString()}</span>
                        </div>
                        <Progress value={currentData.systems.coreApps.crm.uptime} className="mt-2" />
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <UserCheck className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">HRM System</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Version</span>
                          <Badge variant="outline">{currentData.systems.coreApps.hrm.version}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Uptime</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.systems.coreApps.hrm.uptime}%</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Active Users</span>
                          <span className="font-medium">{currentData.systems.coreApps.hrm.users.toLocaleString()}</span>
                        </div>
                        <Progress value={currentData.systems.coreApps.hrm.uptime} className="mt-2" />
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Monitor className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">POS Terminals</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Version</span>
                          <Badge variant="outline">{currentData.systems.coreApps.pos.version}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Uptime</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.systems.coreApps.pos.uptime}%</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Terminals</span>
                          <span className="font-medium">{currentData.systems.coreApps.pos.terminals}</span>
                        </div>
                        <Progress value={currentData.systems.coreApps.pos.uptime} className="mt-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Infrastructure Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Hạ tầng vật lý & ảo hóa</CardTitle>
                  <CardDescription>Tổng quan về server, thiết bị mạng và IoT</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Server className="h-4 w-4" />
                        Server Infrastructure
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Physical Servers</span>
                          <Badge>{currentData.systems.infrastructure.physicalServers}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Virtual Machines</span>
                          <Badge>{currentData.systems.infrastructure.virtualServers}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Total Endpoints</span>
                          <Badge className="bg-primary/10 text-primary">{orgInfo.endpoints.toLocaleString()}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Network className="h-4 w-4" />
                        Network Devices
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Network Switches</span>
                          <Badge>{currentData.systems.infrastructure.networkDevices}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Wireless APs</span>
                          <Badge>{Math.round(currentData.systems.infrastructure.networkDevices * 2.5)}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Firewalls</span>
                          <Badge className="bg-primary/10 text-primary">{Math.round(currentData.systems.infrastructure.networkDevices * 0.2) || 1}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        IoT & Smart Devices
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Smart Sensors</span>
                          <Badge>{currentData.systems.infrastructure.iotDevices}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Security Cameras</span>
                          <Badge>{Math.round(currentData.systems.infrastructure.iotDevices * 0.4)}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Access Control</span>
                          <Badge className="bg-primary/10 text-primary">{Math.round(currentData.systems.infrastructure.iotDevices * 0.15) || 3}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Hiệu suất hệ thống</CardTitle>
                    <CardDescription>Metrics realtime về performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">System Uptime</span>
                          <span className="text-sm font-bold text-primary">{currentData.systems.performance.systemUptime}%</span>
                        </div>
                        <Progress value={currentData.systems.performance.systemUptime} />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Avg Response Time</span>
                          <span className="text-sm font-bold">{currentData.systems.performance.responseTime}s</span>
                        </div>
                        <Progress value={100 - (currentData.systems.performance.responseTime * 100)} />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Throughput</span>
                          <span className="text-sm font-bold text-primary">{currentData.systems.performance.throughput.toLocaleString()} req/min</span>
                        </div>
                        <Progress value={85} />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Error Rate</span>
                          <span className="text-sm font-bold">{currentData.systems.performance.errorRate}%</span>
                        </div>
                        <Progress value={100 - (currentData.systems.performance.errorRate * 10)} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Issues & Alerts</CardTitle>
                    <CardDescription>Tình trạng và cảnh báo hệ thống</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-destructive rounded-full" />
                          <span className="text-sm font-medium">Critical Issues</span>
                        </div>
                        <Badge variant="destructive">{currentData.systems.issues.critical}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full" />
                          <span className="text-sm font-medium">High Priority</span>
                        </div>
                        <Badge className="bg-orange-100 text-orange-700">{currentData.systems.issues.high}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                          <span className="text-sm font-medium">Medium Priority</span>
                        </div>
                        <Badge variant="outline">{currentData.systems.issues.medium}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-sm font-medium">Low Priority</span>
                        </div>
                        <Badge className="bg-primary/10 text-primary">{currentData.systems.issues.low}</Badge>
                      </div>
                    </div>
                    <Button className="w-full mt-4">
                      <Wrench className="w-4 h-4 mr-2" />
                      Issue Management
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="infrastructure">
            <div className="space-y-6">
              {/* Multi-Cloud Infrastructure */}
              <Card>
                <CardHeader>
                  <CardTitle>Multi-Cloud Infrastructure</CardTitle>
                  <CardDescription>Quản lý hạ tầng đám mây đa nhà cung cấp</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {currentData.infrastructure.cloud.providers.map((provider, i) => (
                      <div key={i} className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <Cloud className="h-5 w-5 text-primary" />
                          <h4 className="font-medium">{provider.name}</h4>
                          <Badge variant={provider.status === "Active" ? "default" : "secondary"}>
                            {provider.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Instances</span>
                            <span className="font-medium">{provider.instances}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Monthly Cost</span>
                            <span className="font-medium text-primary">{formatCurrency(provider.cost)}</span>
                          </div>
                          <Progress value={provider.status === "Active" ? 85 : 25} className="mt-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg border">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Total Cloud Cost</h4>
                        <p className="text-sm text-muted-foreground">Monthly infrastructure expense</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{formatCurrency(currentData.infrastructure.cloud.totalCost)}</div>
                        <p className="text-sm text-muted-foreground">Uptime: {currentData.infrastructure.cloud.uptime}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Database Infrastructure */}
              <Card>
                <CardHeader>
                  <CardTitle>Database Infrastructure</CardTitle>
                  <CardDescription>Quản lý cơ sở dữ liệu và storage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Database className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">PostgreSQL</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Instances</span>
                          <Badge>{currentData.infrastructure.databases.postgresql.instances}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Data Size</span>
                          <span className="font-medium">{currentData.infrastructure.databases.postgresql.size}GB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Performance</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.infrastructure.databases.postgresql.performance}%</Badge>
                        </div>
                        <Progress value={currentData.infrastructure.databases.postgresql.performance} className="mt-2" />
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Database className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">MongoDB</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Instances</span>
                          <Badge>{currentData.infrastructure.databases.mongodb.instances}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Data Size</span>
                          <span className="font-medium">{currentData.infrastructure.databases.mongodb.size}GB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Performance</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.infrastructure.databases.mongodb.performance}%</Badge>
                        </div>
                        <Progress value={currentData.infrastructure.databases.mongodb.performance} className="mt-2" />
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Redis Cache</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Instances</span>
                          <Badge>{currentData.infrastructure.databases.redis.instances}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Cache Size</span>
                          <span className="font-medium">{currentData.infrastructure.databases.redis.size}GB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Hit Rate</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.infrastructure.databases.redis.performance}%</Badge>
                        </div>
                        <Progress value={currentData.infrastructure.databases.redis.performance} className="mt-2" />
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Elasticsearch</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Instances</span>
                          <Badge>{currentData.infrastructure.databases.elasticsearch.instances}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Index Size</span>
                          <span className="font-medium">{currentData.infrastructure.databases.elasticsearch.size}GB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Query Perf</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.infrastructure.databases.elasticsearch.performance}%</Badge>
                        </div>
                        <Progress value={currentData.infrastructure.databases.elasticsearch.performance} className="mt-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Network Infrastructure */}
              <Card>
                <CardHeader>
                  <CardTitle>Network Infrastructure</CardTitle>
                  <CardDescription>Mạng lưới và kết nối</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Gauge className="h-4 w-4" />
                        Network Performance
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Bandwidth Usage</span>
                            <span className="font-medium">{currentData.infrastructure.network.bandwidth}Mbps</span>
                          </div>
                          <Progress value={75} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Latency</span>
                            <span className="font-medium text-primary">{currentData.infrastructure.network.latency}ms</span>
                          </div>
                          <Progress value={85} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Router className="h-4 w-4" />
                        Network Equipment
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Core Switches</span>
                          <Badge>{currentData.infrastructure.network.switches}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Edge Routers</span>
                          <Badge>{currentData.infrastructure.network.routers}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Firewalls</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.infrastructure.network.firewalls}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <CloudCog className="h-4 w-4" />
                        Data Transfer
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Daily Transfer</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.infrastructure.cloud.dataTransfer}TB</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">CDN Cache Hit</span>
                          <Badge>94.8%</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Global Endpoints</span>
                          <Badge>{Math.round(currentData.infrastructure.network.switches * 1.5)}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="api">
            <div className="space-y-6">
              {/* Banking & Financial APIs */}
              <Card>
                <CardHeader>
                  <CardTitle>Banking & Financial Integrations</CardTitle>
                  <CardDescription>Kết nối với các ngân hàng và dịch vụ tài chính</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Vietcombank API</h4>
                        <Badge className="bg-primary/10 text-primary">{currentData.apis.banking.vietcombank.status}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Daily Transactions</span>
                          <span className="font-medium">{currentData.apis.banking.vietcombank.dailyTxn.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Success Rate</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.apis.banking.vietcombank.successRate}%</Badge>
                        </div>
                        <Progress value={currentData.apis.banking.vietcombank.successRate} className="mt-2" />
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">BIDV Corporate</h4>
                        <Badge className="bg-primary/10 text-primary">{currentData.apis.banking.bidv.status}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Daily Transactions</span>
                          <span className="font-medium">{currentData.apis.banking.bidv.dailyTxn.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Success Rate</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.apis.banking.bidv.successRate}%</Badge>
                        </div>
                        <Progress value={currentData.apis.banking.bidv.successRate} className="mt-2" />
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">VietinBank Business</h4>
                        <Badge className="bg-primary/10 text-primary">{currentData.apis.banking.vietinbank.status}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Daily Transactions</span>
                          <span className="font-medium">{currentData.apis.banking.vietinbank.dailyTxn.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Success Rate</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.apis.banking.vietinbank.successRate}%</Badge>
                        </div>
                        <Progress value={currentData.apis.banking.vietinbank.successRate} className="mt-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Government & Compliance APIs */}
              <Card>
                <CardHeader>
                  <CardTitle>Government & Compliance APIs</CardTitle>
                  <CardDescription>Kết nối với các cơ quan chính phủ và hệ thống tuân thủ</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <FileCode className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">eInvoice (HĐĐT)</h4>
                        <Badge className="bg-primary/10 text-primary">{currentData.apis.government.einvoice.status}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Invoices/Day</span>
                          <span className="font-medium">{currentData.apis.government.einvoice.invoicesPerDay.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Compliance</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.apis.government.einvoice.compliance}%</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Last Sync</span>
                          <span className="text-muted-foreground">2 mins ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Tax Authority</h4>
                        <Badge className="bg-primary/10 text-primary">{currentData.apis.government.tax.status}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Reports/Month</span>
                          <span className="font-medium">{currentData.apis.government.tax.reportsPerMonth}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Compliance</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.apis.government.tax.compliance}%</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Last Report</span>
                          <span className="text-muted-foreground">5 days ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <UserCheck className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Social Insurance</h4>
                        <Badge className="bg-primary/10 text-primary">{currentData.apis.government.socialInsurance.status}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Employees</span>
                          <span className="font-medium">{currentData.apis.government.socialInsurance.employees.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Compliance</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.apis.government.socialInsurance.compliance}%</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Last Update</span>
                          <span className="text-muted-foreground">1 hour ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* E-commerce & Third-party APIs */}
              <Card>
                <CardHeader>
                  <CardTitle>E-commerce & Third-party Integrations</CardTitle>
                  <CardDescription>Kết nối với các platform thương mại điện tử</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Globe className="h-5 w-5 text-orange-500" />
                        <h4 className="font-medium">Shopee API</h4>
                        <Badge className="bg-orange-100 text-orange-700">Connected</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Daily Orders</span>
                          <span className="font-medium">{currentData.apis.ecommerce.shopee.orders.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Revenue</span>
                          <span className="font-medium text-primary">{formatCurrency(currentData.apis.ecommerce.shopee.revenue)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Sync Status</span>
                          <Badge variant="outline">Real-time</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Globe className="h-5 w-5 text-blue-500" />
                        <h4 className="font-medium">Lazada API</h4>
                        <Badge className="bg-blue-100 text-blue-700">Connected</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Daily Orders</span>
                          <span className="font-medium">{currentData.apis.ecommerce.lazada.orders.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Revenue</span>
                          <span className="font-medium text-primary">{formatCurrency(currentData.apis.ecommerce.lazada.revenue)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Sync Status</span>
                          <Badge variant="outline">Real-time</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Globe className="h-5 w-5 text-purple-500" />
                        <h4 className="font-medium">Tiki API</h4>
                        <Badge className="bg-purple-100 text-purple-700">Connected</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Daily Orders</span>
                          <span className="font-medium">{currentData.apis.ecommerce.tiki.orders.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Revenue</span>
                          <span className="font-medium text-primary">{formatCurrency(currentData.apis.ecommerce.tiki.revenue)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Sync Status</span>
                          <Badge variant="outline">Real-time</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* API Performance Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-4">API Performance Overview</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Average Response Time</span>
                            <span className="font-medium">{currentData.apis.performance.avgResponseTime}ms</span>
                          </div>
                          <Progress value={75} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Requests per Minute</span>
                            <span className="font-medium text-primary">{currentData.apis.performance.requestsPerMinute.toLocaleString()}</span>
                          </div>
                          <Progress value={85} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>API Availability</span>
                            <span className="font-medium text-primary">{currentData.apis.performance.availability}%</span>
                          </div>
                          <Progress value={currentData.apis.performance.availability} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-4">Internal APIs & Microservices</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Microservices</span>
                          <Badge>{currentData.apis.internal.microservices}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">REST APIs</span>
                          <Badge>{currentData.apis.internal.restApis}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">GraphQL APIs</span>
                          <Badge>{currentData.apis.internal.graphqlApis}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Webhooks</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.apis.internal.webhooks}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Error Rate</span>
                          <Badge variant="outline">{currentData.apis.performance.errorRate}%</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              {/* Security Compliance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Security Compliance & Certifications</CardTitle>
                  <CardDescription>Trạng thái tuân thủ các tiêu chuẩn bảo mật</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">ISO 27001</h4>
                        <Badge className="bg-primary/10 text-primary">{currentData.security.compliance.iso27001.status}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Compliance Score</span>
                          <span className="font-medium text-primary">{currentData.security.compliance.iso27001.score}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Expires</span>
                          <span className="text-muted-foreground">{currentData.security.compliance.iso27001.expiryDate}</span>
                        </div>
                        <Progress value={currentData.security.compliance.iso27001.score} className="mt-2" />
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">GDPR</h4>
                        <Badge className="bg-primary/10 text-primary">{currentData.security.compliance.gdpr.status}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Compliance Score</span>
                          <span className="font-medium text-primary">{currentData.security.compliance.gdpr.score}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Last Audit</span>
                          <span className="text-muted-foreground">{currentData.security.compliance.gdpr.lastAudit}</span>
                        </div>
                        <Progress value={currentData.security.compliance.gdpr.score} className="mt-2" />
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Lock className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Vietnam Data Protection</h4>
                        <Badge className="bg-primary/10 text-primary">{currentData.security.compliance.vietnam_data_protection.status}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Compliance Score</span>
                          <span className="font-medium text-primary">{currentData.security.compliance.vietnam_data_protection.score}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Last Update</span>
                          <span className="text-muted-foreground">{currentData.security.compliance.vietnam_data_protection.lastUpdate}</span>
                        </div>
                        <Progress value={currentData.security.compliance.vietnam_data_protection.score} className="mt-2" />
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">PCI DSS</h4>
                        <Badge className="bg-primary/10 text-primary">{currentData.security.compliance.pci_dss.status}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Level</span>
                          <Badge variant="outline">{currentData.security.compliance.pci_dss.level}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Score</span>
                          <span className="font-medium text-primary">{currentData.security.compliance.pci_dss.score}%</span>
                        </div>
                        <Progress value={currentData.security.compliance.pci_dss.score} className="mt-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Threat Detection & Prevention */}
              <Card>
                <CardHeader>
                  <CardTitle>Threat Detection & Prevention</CardTitle>
                  <CardDescription>Phát hiện và ngăn chặn các mối đe dọa bảo mật</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-4">Threats Blocked (24h)</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                            <span className="text-sm font-medium">Malware Attempts</span>
                          </div>
                          <Badge variant="destructive">{currentData.security.threats.malware.toLocaleString()}</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-orange-500" />
                            <span className="text-sm font-medium">Phishing Attempts</span>
                          </div>
                          <Badge className="bg-orange-100 text-orange-700">{currentData.security.threats.phishing.toLocaleString()}</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">DDoS Attempts</span>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-700">{currentData.security.threats.ddos.toLocaleString()}</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Total Blocked</span>
                          </div>
                          <Badge className="bg-primary/10 text-primary">{currentData.security.threats.blocked.toLocaleString()}</Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-4">Vulnerability Management</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-destructive rounded-full" />
                            <span className="text-sm font-medium">Critical</span>
                          </div>
                          <Badge variant="destructive">{currentData.security.vulnerabilities.critical}</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full" />
                            <span className="text-sm font-medium">High</span>
                          </div>
                          <Badge className="bg-orange-100 text-orange-700">{currentData.security.vulnerabilities.high}</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                            <span className="text-sm font-medium">Medium</span>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-700">{currentData.security.vulnerabilities.medium}</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Patched Rate</span>
                          </div>
                          <Badge className="bg-primary/10 text-primary">{currentData.security.vulnerabilities.patched}%</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Access Control & Authentication */}
              <Card>
                <CardHeader>
                  <CardTitle>Access Control & Authentication</CardTitle>
                  <CardDescription>Quản lý truy cập và xác thực người dùng</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <UserCheck className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Multi-Factor Auth</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Enabled Users</span>
                          <span className="font-medium">{currentData.security.access.mfa.enabled.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Coverage</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.security.access.mfa.percentage}%</Badge>
                        </div>
                        <Progress value={currentData.security.access.mfa.percentage} className="mt-2" />
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Key className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Single Sign-On</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>SSO Users</span>
                          <span className="font-medium">{currentData.security.access.sso.users.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Adoption</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.security.access.sso.percentage}%</Badge>
                        </div>
                        <Progress value={currentData.security.access.sso.percentage} className="mt-2" />
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Settings className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Role-Based Access</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Active Roles</span>
                          <span className="font-medium">{currentData.security.access.rbac.roles}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Policies</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.security.access.rbac.policies}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Coverage</span>
                          <Badge variant="outline">100%</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Eye className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Audit & Logging</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Daily Events</span>
                          <span className="font-medium">{currentData.security.access.audit.events.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Retention</span>
                          <Badge className="bg-primary/10 text-primary">{currentData.security.access.audit.retention} years</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Compliance</span>
                          <Badge variant="outline">100%</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="personnel">
            <div className="space-y-6">
              {/* IT Team Structure */}
              <Card>
                <CardHeader>
                  <CardTitle>IT Team Structure & Organization</CardTitle>
                  <CardDescription>Cơ cấu tổ chức và phân bổ nhân sự IT</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-4">Team Hierarchy</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">IT Managers</span>
                          </div>
                          <Badge className="bg-primary/10 text-primary">{currentData.personnel.structure.itManagers}</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Senior Engineers</span>
                          </div>
                          <Badge>{currentData.personnel.structure.seniors}</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Mid-level Engineers</span>
                          </div>
                          <Badge>{currentData.personnel.structure.midLevel}</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Junior Engineers</span>
                          </div>
                          <Badge>{currentData.personnel.structure.juniors}</Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-4">Team Performance Metrics</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Team Productivity</span>
                            <span className="font-medium text-primary">{currentData.personnel.performance.productivity}%</span>
                          </div>
                          <Progress value={currentData.personnel.performance.productivity} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Employee Satisfaction</span>
                            <span className="font-medium text-primary">{currentData.personnel.performance.satisfaction}%</span>
                          </div>
                          <Progress value={currentData.personnel.performance.satisfaction} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Retention Rate</span>
                            <span className="font-medium">{currentData.personnel.performance.retention}%</span>
                          </div>
                          <Progress value={currentData.personnel.performance.retention} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Training Hours (yearly)</span>
                            <span className="font-medium text-primary">{currentData.personnel.performance.training}h</span>
                          </div>
                          <Progress value={Math.min(currentData.personnel.performance.training / 5, 100)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Specialization & Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>IT Specializations & Skills Matrix</CardTitle>
                  <CardDescription>Phân bổ chuyên môn và mức lương trung bình</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentData.personnel.specializations.map((spec, i) => (
                      <div key={i} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Code className="h-4 w-4 text-primary" />
                            <h4 className="font-medium">{spec.name}</h4>
                          </div>
                          <Badge className="bg-primary/10 text-primary">{spec.count} người</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Average Salary</span>
                            <span className="font-medium text-primary">{formatCurrency(spec.avgSalary)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Team Coverage</span>
                            <Badge variant="outline">{Math.round((spec.count / orgInfo.itStaff) * 100)}%</Badge>
                          </div>
                          <Progress value={(spec.count / orgInfo.itStaff) * 100} className="mt-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Project Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Performance & Delivery</CardTitle>
                  <CardDescription>Hiệu suất thực hiện dự án IT</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">{currentData.personnel.projects.active}</div>
                      <p className="text-sm text-muted-foreground">Active Projects</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">{currentData.personnel.projects.completed}</div>
                      <p className="text-sm text-muted-foreground">Completed Projects</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">{currentData.personnel.projects.onTime}%</div>
                      <p className="text-sm text-muted-foreground">On-Time Delivery</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">{currentData.personnel.projects.budget}%</div>
                      <p className="text-sm text-muted-foreground">Within Budget</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-4">Project Delivery Metrics</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>On-Time Delivery Rate</span>
                            <span className="font-medium text-primary">{currentData.personnel.projects.onTime}%</span>
                          </div>
                          <Progress value={currentData.personnel.projects.onTime} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Budget Adherence</span>
                            <span className="font-medium text-primary">{currentData.personnel.projects.budget}%</span>
                          </div>
                          <Progress value={currentData.personnel.projects.budget} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Quality Score</span>
                            <span className="font-medium">92%</span>
                          </div>
                          <Progress value={92} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-4">Team Workload Distribution</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">DevOps Team</span>
                          <Badge className="bg-orange-100 text-orange-700">High Load</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Development Team</span>
                          <Badge className="bg-primary/10 text-primary">Optimal</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Security Team</span>
                          <Badge className="bg-primary/10 text-primary">Optimal</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Support Team</span>
                          <Badge variant="outline">Normal</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Network Team</span>
                          <Badge variant="outline">Normal</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="space-y-6">
              {/* AI Analytics Overview */}
              <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    AI Tech Analytics Dashboard
                  </CardTitle>
                  <CardDescription>Phân tích thông minh hạ tầng công nghệ xuyên suốt BMC → F1 → F2 → F3 → F4 → F5</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">99.2%</div>
                      <p className="text-sm text-muted-foreground">System Health Score</p>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">+15%</div>
                      <p className="text-sm text-muted-foreground">Performance Improvement</p>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-sm text-muted-foreground">Security Incidents</p>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">8</div>
                      <p className="text-sm text-muted-foreground">Optimization Opportunities</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cross-Organizational IT Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>IT Performance Across Organization Levels</CardTitle>
                  <CardDescription>So sánh hiệu suất IT giữa các cấp độ BMC → F5</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["BMC", "F1", "F2", "F3", "F4", "F5"].map((level) => {
                      const levelData = {
                        BMC: { uptime: 99.94, security: 96, performance: 94, budget: 28000000000 },
                        F1: { uptime: 99.89, security: 94, performance: 92, budget: 12000000000 },
                        F2: { uptime: 99.76, security: 92, performance: 89, budget: 8500000000 },
                        F3: { uptime: 99.65, security: 90, performance: 87, budget: 4200000000 },
                        F4: { uptime: 99.45, security: 88, performance: 84, budget: 1800000000 },
                        F5: { uptime: 99.25, security: 86, performance: 82, budget: 650000000 }
                      }[level];
                      return (
                        <div key={level} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
                          <div className="font-medium">{level}</div>
                          <div>
                            <p className="text-xs text-muted-foreground">System Uptime</p>
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-bold text-primary">{levelData.uptime}%</div>
                              <Progress value={levelData.uptime} className="flex-1 h-2" />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Security Score</p>
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-bold">{levelData.security}%</div>
                              <Progress value={levelData.security} className="flex-1 h-2" />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Performance</p>
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-bold text-primary">{levelData.performance}%</div>
                              <Progress value={levelData.performance} className="flex-1 h-2" />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">IT Budget</p>
                            <div className="text-sm font-bold">{(levelData.budget / 1000000000).toFixed(1)}B VNĐ</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Tech Reports */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* System Performance Report */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      System Performance Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">System Uptime</span>
                        <div className="text-right">
                          <div className="font-medium text-primary">{currentData.systems.performance.systemUptime}%</div>
                          <Badge className="text-xs bg-primary/10 text-primary">+0.2% vs last month</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Response Time</span>
                        <div className="text-right">
                          <div className="font-medium">{currentData.systems.performance.responseTime}s</div>
                          <Badge className="text-xs" variant="secondary">-15ms improvement</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Throughput</span>
                        <div className="text-right">
                          <div className="font-medium text-primary">{currentData.systems.performance.throughput.toLocaleString()}</div>
                          <Badge className="text-xs bg-primary/10 text-primary">req/min</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Error Rate</span>
                        <div className="text-right">
                          <div className="font-medium">{currentData.systems.performance.errorRate}%</div>
                          <Badge className="text-xs" variant="secondary">-0.02% improvement</Badge>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-4">
                      <Download className="w-4 h-4 mr-2" />
                      Export System Report
                    </Button>
                  </CardContent>
                </Card>

                {/* Infrastructure Report */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cloud className="h-4 w-4" />
                      Infrastructure Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Cloud Uptime</span>
                        <div className="text-right">
                          <div className="font-medium text-primary">{currentData.infrastructure.cloud.uptime}%</div>
                          <Badge className="text-xs bg-primary/10 text-primary">Excellent</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Monthly Cost</span>
                        <div className="text-right">
                          <div className="font-medium">{formatCurrency(currentData.infrastructure.cloud.totalCost)}</div>
                          <Badge className="text-xs" variant="secondary">-5% vs budget</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Data Transfer</span>
                        <div className="text-right">
                          <div className="font-medium text-primary">{currentData.infrastructure.cloud.dataTransfer}TB</div>
                          <Badge className="text-xs bg-primary/10 text-primary">Daily</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Resource Utilization</span>
                        <div className="text-right">
                          <div className="font-medium">78%</div>
                          <Badge className="text-xs" variant="secondary">Optimal</Badge>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-4">
                      <Download className="w-4 h-4 mr-2" />
                      Export Infrastructure Report
                    </Button>
                  </CardContent>
                </Card>

                {/* Security Report */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Security & Compliance Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Security Score</span>
                        <div className="text-right">
                          <div className="font-medium text-primary">{currentData.security.compliance.iso27001.score}%</div>
                          <Badge className="text-xs bg-primary/10 text-primary">ISO 27001</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Threats Blocked</span>
                        <div className="text-right">
                          <div className="font-medium">{currentData.security.threats.blocked.toLocaleString()}</div>
                          <Badge className="text-xs" variant="secondary">Last 24h</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Vulnerabilities</span>
                        <div className="text-right">
                          <div className="font-medium text-primary">{currentData.security.vulnerabilities.patched}%</div>
                          <Badge className="text-xs bg-primary/10 text-primary">Patched</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Compliance</span>
                        <div className="text-right">
                          <div className="font-medium text-primary">100%</div>
                          <Badge className="text-xs bg-primary/10 text-primary">All Standards</Badge>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-4">
                      <Download className="w-4 h-4 mr-2" />
                      Export Security Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* AI-Powered Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    AI-Powered IT Insights & Recommendations
                  </CardTitle>
                  <CardDescription>Khuyến nghị tối ưu hóa từ AI dựa trên dữ liệu thực tế</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Performance Optimization</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3 p-3 border rounded-lg bg-primary/5">
                          <TrendingUp className="h-4 w-4 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Optimize Database Queries</p>
                            <p className="text-xs text-muted-foreground">Potential 25% performance improvement in response time</p>
                            <Badge className="text-xs mt-1 bg-primary/10 text-primary">High Impact</Badge>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 border rounded-lg bg-primary/5">
                          <CloudCog className="h-4 w-4 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Auto-scaling Configuration</p>
                            <p className="text-xs text-muted-foreground">Reduce cloud costs by 15% with intelligent scaling</p>
                            <Badge className="text-xs mt-1 bg-primary/10 text-primary">Cost Savings</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Security Enhancements</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3 p-3 border rounded-lg bg-yellow-50 border-yellow-200">
                          <ShieldCheck className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Update Legacy Systems</p>
                            <p className="text-xs text-muted-foreground">5 systems need security patches within 30 days</p>
                            <Badge variant="outline" className="text-xs mt-1 border-yellow-300 text-yellow-700">Medium Priority</Badge>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 border rounded-lg bg-primary/5">
                          <Lock className="h-4 w-4 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Enhance MFA Coverage</p>
                            <p className="text-xs text-muted-foreground">Increase multi-factor auth adoption to 99%</p>
                            <Badge className="text-xs mt-1 bg-primary/10 text-primary">Security Improvement</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Executive Summary Export */}
              <Card>
                <CardHeader>
                  <CardTitle>Executive Technology Summary & Export Options</CardTitle>
                  <CardDescription>Báo cáo tổng hợp và tùy chọn xuất dữ liệu</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      IT Health Report
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Security Audit
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Performance Dashboard
                    </Button>
                    <Button className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Send to CTO
                    </Button>
                  </div>
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Executive Summary:</strong> {orgInfo.name} IT infrastructure đang hoạt động với uptime {currentData.systems.performance.systemUptime}%
                      và security score {currentData.security.compliance.iso27001.score}%. 
                      AI khuyến nghị tối ưu hóa database và nâng cấp bảo mật để tăng hiệu suất 25% và giảm rủi ro.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}