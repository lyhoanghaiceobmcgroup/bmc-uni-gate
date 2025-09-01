import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { 
  Shield, 
  Eye, 
  Lock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Activity, 
  Users, 
  Database, 
  Network, 
  FileText, 
  Settings, 
  RefreshCw,
  Search,
  Filter,
  Download,
  Bell,
  Zap,
  Globe,
  Server,
  Key,
  Fingerprint,
  Smartphone,
  Wifi,
  HardDrive
} from 'lucide-react';

// Define security layers
interface SecurityLayer {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'warning' | 'critical' | 'maintenance';
  level: number;
  components: SecurityComponent[];
  metrics: SecurityMetric[];
  lastUpdate: string;
}

interface SecurityComponent {
  id: string;
  name: string;
  type: 'firewall' | 'encryption' | 'authentication' | 'monitoring' | 'backup' | 'compliance';
  status: 'online' | 'offline' | 'warning';
  description: string;
  icon: React.ComponentType<any>;
}

interface SecurityMetric {
  id: string;
  name: string;
  value: string | number;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  unit?: string;
}

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  status: 'success' | 'failed' | 'blocked';
  aiAnalysis?: string;
}

interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
  source: string;
  status: 'new' | 'investigating' | 'resolved';
  aiRecommendation?: string;
}

// Mock security layers data
const SECURITY_LAYERS: SecurityLayer[] = [
  {
    id: 'layer_1',
    name: 'Tầng 1: Bảo mật Mạng & Hạ tầng',
    description: 'Firewall, DDoS Protection, Network Monitoring',
    status: 'active',
    level: 1,
    lastUpdate: '2025-01-15T15:45:00Z',
    components: [
      { id: 'fw1', name: 'Next-Gen Firewall', type: 'firewall', status: 'online', description: 'Bảo vệ biên mạng với AI threat detection', icon: Shield },
      { id: 'ddos1', name: 'DDoS Protection', type: 'monitoring', status: 'online', description: 'Chống tấn công từ chối dịch vụ', icon: Network },
      { id: 'ids1', name: 'Intrusion Detection', type: 'monitoring', status: 'online', description: 'Phát hiện xâm nhập realtime', icon: Eye }
    ],
    metrics: [
      { id: 'm1', name: 'Uptime', value: '99.98%', status: 'good', trend: 'stable' },
      { id: 'm2', name: 'Threats Blocked', value: 1247, status: 'good', trend: 'up', unit: 'today' },
      { id: 'm3', name: 'Network Latency', value: '12ms', status: 'good', trend: 'stable' }
    ]
  },
  {
    id: 'layer_2',
    name: 'Tầng 2: Xác thực & Phân quyền',
    description: 'Multi-Factor Authentication, RBAC, SSO',
    status: 'active',
    level: 2,
    lastUpdate: '2025-01-15T15:40:00Z',
    components: [
      { id: 'mfa1', name: 'Multi-Factor Auth', type: 'authentication', status: 'online', description: 'Xác thực đa yếu tố với biometric', icon: Fingerprint },
      { id: 'sso1', name: 'Single Sign-On', type: 'authentication', status: 'online', description: 'Đăng nhập một lần toàn hệ thống', icon: Key },
      { id: 'rbac1', name: 'Role-Based Access', type: 'authentication', status: 'online', description: 'Phân quyền dựa trên vai trò', icon: Users }
    ],
    metrics: [
      { id: 'm4', name: 'Login Success Rate', value: '99.2%', status: 'good', trend: 'stable' },
      { id: 'm5', name: 'Failed Attempts', value: 23, status: 'warning', trend: 'up', unit: 'today' },
      { id: 'm6', name: 'Active Sessions', value: 156, status: 'good', trend: 'stable' }
    ]
  },
  {
    id: 'layer_3',
    name: 'Tầng 3: Mã hóa Dữ liệu',
    description: 'End-to-End Encryption, Data Loss Prevention',
    status: 'active',
    level: 3,
    lastUpdate: '2025-01-15T15:35:00Z',
    components: [
      { id: 'enc1', name: 'AES-256 Encryption', type: 'encryption', status: 'online', description: 'Mã hóa dữ liệu nghỉ và truyền tải', icon: Lock },
      { id: 'dlp1', name: 'Data Loss Prevention', type: 'monitoring', status: 'online', description: 'Ngăn chặn rò rỉ dữ liệu nhạy cảm', icon: Database },
      { id: 'backup1', name: 'Encrypted Backup', type: 'backup', status: 'online', description: 'Sao lưu dữ liệu được mã hóa', icon: HardDrive }
    ],
    metrics: [
      { id: 'm7', name: 'Encryption Coverage', value: '100%', status: 'good', trend: 'stable' },
      { id: 'm8', name: 'Data Leaks Prevented', value: 8, status: 'good', trend: 'down', unit: 'this month' },
      { id: 'm9', name: 'Backup Success Rate', value: '99.9%', status: 'good', trend: 'stable' }
    ]
  },
  {
    id: 'layer_4',
    name: 'Tầng 4: AI Audit & Compliance',
    description: 'AI-powered Audit Trail, Compliance Monitoring',
    status: 'active',
    level: 4,
    lastUpdate: '2025-01-15T15:50:00Z',
    components: [
      { id: 'audit1', name: 'AI Audit Agent', type: 'monitoring', status: 'online', description: 'AI phân tích hành vi bất thường', icon: Zap },
      { id: 'comp1', name: 'Compliance Monitor', type: 'compliance', status: 'online', description: 'Giám sát tuân thủ quy định', icon: FileText },
      { id: 'forensic1', name: 'Digital Forensics', type: 'monitoring', status: 'online', description: 'Điều tra số và phân tích bằng chứng', icon: Search }
    ],
    metrics: [
      { id: 'm10', name: 'Compliance Score', value: '98%', status: 'good', trend: 'up' },
      { id: 'm11', name: 'Anomalies Detected', value: 12, status: 'warning', trend: 'up', unit: 'today' },
      { id: 'm12', name: 'Audit Coverage', value: '100%', status: 'good', trend: 'stable' }
    ]
  }
];

// Mock audit logs
const AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log_001',
    timestamp: '2025-01-15T15:45:23Z',
    user: 'admin@bmc.vn',
    action: 'LOGIN_SUCCESS',
    resource: 'ERP Dashboard',
    details: 'Successful login with MFA',
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome/120.0.0.0',
    riskLevel: 'low',
    status: 'success',
    aiAnalysis: 'Normal login pattern, trusted device'
  },
  {
    id: 'log_002',
    timestamp: '2025-01-15T15:42:15Z',
    user: 'finance.manager@bmc.vn',
    action: 'DATA_EXPORT',
    resource: 'Financial Reports',
    details: 'Exported Q4 financial data (2.3MB)',
    ipAddress: '192.168.1.105',
    userAgent: 'Chrome/120.0.0.0',
    riskLevel: 'medium',
    status: 'success',
    aiAnalysis: 'Authorized export during business hours'
  },
  {
    id: 'log_003',
    timestamp: '2025-01-15T15:38:47Z',
    user: 'unknown.user@external.com',
    action: 'LOGIN_FAILED',
    resource: 'Admin Panel',
    details: 'Multiple failed login attempts (5x)',
    ipAddress: '203.162.4.191',
    userAgent: 'Python-requests/2.28.1',
    riskLevel: 'critical',
    status: 'blocked',
    aiAnalysis: 'Suspicious activity: Brute force attack detected, IP blocked automatically'
  },
  {
    id: 'log_004',
    timestamp: '2025-01-15T15:35:12Z',
    user: 'hr.staff@bmc.vn',
    action: 'RECORD_UPDATE',
    resource: 'Employee Database',
    details: 'Updated salary information for EMP_001',
    ipAddress: '192.168.1.110',
    userAgent: 'Chrome/120.0.0.0',
    riskLevel: 'medium',
    status: 'success',
    aiAnalysis: 'Authorized HR operation, within normal working hours'
  },
  {
    id: 'log_005',
    timestamp: '2025-01-15T15:30:08Z',
    user: 'system.backup@bmc.vn',
    action: 'BACKUP_COMPLETED',
    resource: 'Database Cluster',
    details: 'Automated daily backup completed (15.2GB)',
    ipAddress: '192.168.1.200',
    userAgent: 'BackupAgent/3.1.0',
    riskLevel: 'low',
    status: 'success',
    aiAnalysis: 'Scheduled system operation completed successfully'
  }
];

// Mock security alerts
const SECURITY_ALERTS: SecurityAlert[] = [
  {
    id: 'alert_001',
    title: 'Phát hiện tấn công Brute Force',
    description: 'IP 203.162.4.191 thực hiện 15 lần đăng nhập thất bại trong 5 phút',
    severity: 'critical',
    timestamp: '2025-01-15T15:38:47Z',
    source: 'AI Audit Agent',
    status: 'resolved',
    aiRecommendation: 'IP đã được tự động chặn. Khuyến nghị: Cập nhật blacklist và tăng cường monitoring.'
  },
  {
    id: 'alert_002',
    title: 'Truy cập dữ liệu bất thường',
    description: 'Nhân viên IT truy cập dữ liệu tài chính ngoài giờ làm việc',
    severity: 'warning',
    timestamp: '2025-01-15T02:15:30Z',
    source: 'Behavioral Analytics',
    status: 'investigating',
    aiRecommendation: 'Xác minh với quản lý IT về lý do truy cập. Có thể là maintenance được ủy quyền.'
  },
  {
    id: 'alert_003',
    title: 'Cập nhật bảo mật khẩn cấp',
    description: 'Phát hiện lỗ hổng CVE-2025-0001 trong hệ thống ERP',
    severity: 'critical',
    timestamp: '2025-01-15T14:20:15Z',
    source: 'Vulnerability Scanner',
    status: 'new',
    aiRecommendation: 'Áp dụng patch ngay lập tức. Tạm thời hạn chế quyền truy cập module bị ảnh hưởng.'
  }
];

interface SecuritySystemProps {
  userRole?: string;
  accessLevel?: 'viewer' | 'analyst' | 'admin' | 'security_officer';
}

const SecuritySystem: React.FC<SecuritySystemProps> = ({ 
  userRole = 'security_officer',
  accessLevel = 'admin'
}) => {
  const [selectedLayer, setSelectedLayer] = useState<SecurityLayer>(SECURITY_LAYERS[0]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(AUDIT_LOGS);
  const [alerts, setAlerts] = useState<SecurityAlert[]>(SECURITY_ALERTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'online':
      case 'good':
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'critical':
      case 'offline':
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRiskLevelBadge = (level: string) => {
    const config = {
      'low': { color: 'bg-green-100 text-green-800', label: 'Thấp' },
      'medium': { color: 'bg-yellow-100 text-yellow-800', label: 'Trung bình' },
      'high': { color: 'bg-orange-100 text-orange-800', label: 'Cao' },
      'critical': { color: 'bg-red-100 text-red-800', label: 'Nghiêm trọng' }
    };
    const cfg = config[level as keyof typeof config] || config.low;
    return <Badge className={cfg.color}>{cfg.label}</Badge>;
  };

  const getSeverityBadge = (severity: string) => {
    const config = {
      'info': { color: 'bg-blue-100 text-blue-800', label: 'Thông tin' },
      'warning': { color: 'bg-yellow-100 text-yellow-800', label: 'Cảnh báo' },
      'critical': { color: 'bg-red-100 text-red-800', label: 'Nghiêm trọng' }
    };
    const cfg = config[severity as keyof typeof config] || config.info;
    return <Badge className={cfg.color}>{cfg.label}</Badge>;
  };

  const filteredLogs = auditLogs.filter(log => 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical' && alert.status === 'new');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            Hệ thống Bảo mật Đa tầng
          </h1>
          <p className="text-muted-foreground">
            AI Audit Agent • Giám sát realtime • Tuân thủ quy định • Cấp truy cập: {accessLevel}
          </p>
        </div>
        <div className="flex gap-2">
          {criticalAlerts.length > 0 && (
            <Button variant="destructive" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              {criticalAlerts.length} Cảnh báo
            </Button>
          )}
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="audit">AI Audit</TabsTrigger>
          <TabsTrigger value="alerts">Cảnh báo</TabsTrigger>
          <TabsTrigger value="compliance">Tuân thủ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Security Layers Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SECURITY_LAYERS.map((layer) => {
              const isSelected = selectedLayer.id === layer.id;
              
              return (
                <Card 
                  key={layer.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedLayer(layer)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Tầng {layer.level}</Badge>
                      {getStatusIcon(layer.status)}
                    </div>
                    <CardTitle className="text-sm">{layer.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-2">{layer.description}</p>
                    <div className="text-xs text-muted-foreground">
                      {layer.components.length} thành phần
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Selected Layer Details */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  {selectedLayer.name}
                </CardTitle>
                <CardDescription>{selectedLayer.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Thành phần Bảo mật:</h4>
                    <div className="space-y-2">
                      {selectedLayer.components.map((component) => {
                        const Icon = component.icon;
                        return (
                          <div key={component.id} className="flex items-center justify-between p-2 border rounded">
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4 text-primary" />
                              <div>
                                <div className="text-sm font-medium">{component.name}</div>
                                <div className="text-xs text-muted-foreground">{component.description}</div>
                              </div>
                            </div>
                            {getStatusIcon(component.status)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Chỉ số Hiệu suất
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedLayer.metrics.map((metric) => (
                    <div key={metric.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{metric.name}</span>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(metric.status)}
                          <span className="text-sm">
                            {metric.value}{metric.unit && ` ${metric.unit}`}
                          </span>
                        </div>
                      </div>
                      <Progress 
                        value={typeof metric.value === 'string' && metric.value.includes('%') 
                          ? parseFloat(metric.value) 
                          : 85
                        } 
                        className="h-2" 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          {/* AI Audit Agent Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                AI Audit Agent
              </CardTitle>
              <CardDescription>
                Phân tích hành vi bất thường và theo dõi mọi thay đổi dữ liệu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">99.8%</div>
                  <div className="text-sm text-muted-foreground">Độ chính xác AI</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                  <div className="text-sm text-muted-foreground">Sự kiện phân tích/ngày</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">12</div>
                  <div className="text-sm text-muted-foreground">Bất thường phát hiện</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audit Logs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Nhật ký Audit
              </CardTitle>
              <CardDescription>
                Theo dõi tất cả hoạt động trong hệ thống với phân tích AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Tìm kiếm theo user, action, resource..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Lọc
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Xuất
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredLogs.map((log) => (
                    <div key={log.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          <span className="font-medium text-sm">{log.action}</span>
                          {getRiskLevelBadge(log.riskLevel)}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleString('vi-VN')}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <strong>User:</strong> {log.user}<br/>
                          <strong>Resource:</strong> {log.resource}<br/>
                          <strong>IP:</strong> {log.ipAddress}
                        </div>
                        <div>
                          <strong>Details:</strong> {log.details}<br/>
                          <strong>User Agent:</strong> {log.userAgent.substring(0, 30)}...
                        </div>
                      </div>
                      
                      {log.aiAnalysis && (
                        <div className="bg-blue-50 rounded p-2 text-xs">
                          <strong>🤖 AI Analysis:</strong> {log.aiAnalysis}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Cảnh báo Bảo mật
              </CardTitle>
              <CardDescription>
                Cảnh báo realtime từ AI và các hệ thống giám sát
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getSeverityBadge(alert.severity)}
                        <Badge variant={alert.status === 'new' ? 'destructive' : 
                                     alert.status === 'investigating' ? 'default' : 'secondary'}>
                          {alert.status === 'new' ? 'Mới' : 
                           alert.status === 'investigating' ? 'Đang xử lý' : 'Đã giải quyết'}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleString('vi-VN')}
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">Nguồn: {alert.source}</p>
                    </div>
                    
                    {alert.aiRecommendation && (
                      <div className="bg-green-50 rounded p-2 text-sm">
                        <strong>🤖 AI Khuyến nghị:</strong> {alert.aiRecommendation}
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        Chi tiết
                      </Button>
                      {alert.status === 'new' && (
                        <Button variant="outline" size="sm">
                          <Settings className="w-3 h-3 mr-1" />
                          Xử lý
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">GDPR Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">98%</div>
                <Progress value={98} className="mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">SOX Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">96%</div>
                <Progress value={96} className="mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">ISO 27001</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">89%</div>
                <Progress value={89} className="mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">PCI DSS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">100%</div>
                <Progress value={100} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Báo cáo Tuân thủ</CardTitle>
              <CardDescription>
                Tự động tạo báo cáo tuân thủ các quy định bảo mật
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <FileText className="w-5 h-5 mb-2" />
                  <div className="text-left">
                    <div className="font-medium">Báo cáo GDPR</div>
                    <div className="text-xs text-muted-foreground">Tuân thủ bảo vệ dữ liệu cá nhân</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <Shield className="w-5 h-5 mb-2" />
                  <div className="text-left">
                    <div className="font-medium">Báo cáo ISO 27001</div>
                    <div className="text-xs text-muted-foreground">Quản lý bảo mật thông tin</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <Lock className="w-5 h-5 mb-2" />
                  <div className="text-left">
                    <div className="font-medium">Báo cáo SOX</div>
                    <div className="text-xs text-muted-foreground">Kiểm soát nội bộ tài chính</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <Database className="w-5 h-5 mb-2" />
                  <div className="text-left">
                    <div className="font-medium">Báo cáo PCI DSS</div>
                    <div className="text-xs text-muted-foreground">Bảo mật dữ liệu thẻ thanh toán</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Access Level Notice */}
      {accessLevel !== 'security_officer' && (
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Bạn đang truy cập với quyền <strong>{accessLevel}</strong>. 
            Một số tính năng bảo mật nâng cao có thể không khả dụng. 
            Liên hệ Security Officer để được cấp quyền cao hơn.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SecuritySystem;