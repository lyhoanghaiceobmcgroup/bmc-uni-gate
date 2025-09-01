import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  PieChart, 
  TrendingUp, 
  FileText,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Share,
  ArrowRight,
  Calendar,
  DollarSign,
  Building,
  User,
  Bot,
  AlertTriangle,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Plus,
  Shuffle,
  UserCheck,
  History
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ShareholderDetailViewProps {
  onBack: () => void;
  organizations: any[];
}

// Mock data for demonstration
const mockShareholders = [];

export function ShareholderDetailView({ onBack, organizations }: ShareholderDetailViewProps) {
  const [shareholders, setShareholders] = useState(mockShareholders);
  const [selectedShareholder, setSelectedShareholder] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  // Calculate summary metrics
  const totalShareholders = shareholders.length;
  const totalCapital = shareholders.reduce((sum, sh) => sum + parseFloat(sh.shareValue.replace(/[^\d.]/g, '')), 0);
  const bmcEquity = shareholders
    .filter(sh => sh.level !== "External")
    .reduce((sum, sh) => sum + sh.equityPercent, 0);
  const recentChanges = 3; // Mock data

  // Filter shareholders
  const filteredShareholders = shareholders.filter(sh => {
    const matchesSearch = sh.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sh.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sh.phone.includes(searchTerm);
    const matchesLevel = filterLevel === "all" || sh.level === filterLevel;
    const matchesStatus = filterStatus === "all" || sh.status === filterStatus;
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đang nắm":
        return <Badge variant="default" className="bg-green-100 text-green-800">Đang nắm</Badge>;
      case "Đang chuyển":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Đang chuyển</Badge>;
      case "Đã thoái":
        return <Badge variant="destructive">Đã thoái</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getLevelColor = (level: string) => {
    const colors = {
      "F1": "text-red-600 bg-red-50",
      "F2": "text-orange-600 bg-orange-50", 
      "F3": "text-yellow-600 bg-yellow-50",
      "F4": "text-green-600 bg-green-50",
      "F5": "text-blue-600 bg-blue-50",
      "External": "text-purple-600 bg-purple-50"
    };
    return colors[level as keyof typeof colors] || "text-gray-600 bg-gray-50";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            ← Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <PieChart className="h-8 w-8 mr-3 text-yellow-600" />
              Quản lý Cổ đông
            </h1>
            <p className="text-muted-foreground mt-2">
              Quản trị cổ phần và quan hệ nhà đầu tư đa tầng BMC → F1 → F2 → F3 → F4 → F5
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Bot className="h-4 w-4 mr-2" />
            AI Copilot
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Thêm cổ đông
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm theo tên, email, SĐT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn tầng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả tầng</SelectItem>
                <SelectItem value="F1">F1 - Cụm ngành</SelectItem>
                <SelectItem value="F2">F2 - Ngành</SelectItem>
                <SelectItem value="F3">F3 - Công ty</SelectItem>
                <SelectItem value="F4">F4 - Dự án</SelectItem>
                <SelectItem value="F5">F5 - Startup</SelectItem>
                <SelectItem value="External">Nhà đầu tư ngoài</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="Đang nắm">Đang nắm</SelectItem>
                <SelectItem value="Đang chuyển">Đang chuyển</SelectItem>
                <SelectItem value="Đã thoái">Đã thoái</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Bộ lọc
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Xuất dữ liệu
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Nhập dữ liệu
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tổng Cổ đông</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalShareholders}</div>
            <p className="text-xs text-muted-foreground">Đang hoạt động</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tổng Vốn điều lệ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalCapital.toFixed(1)}B VNĐ</div>
            <p className="text-xs text-muted-foreground">Giá trị vốn góp</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Vốn BMC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{bmcEquity.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">Số cổ đông nội bộ</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">% Sở hữu BMC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">Kiểm soát</div>
            <p className="text-xs text-muted-foreground">Quyền quản lý</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Thay đổi 30 ngày</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{recentChanges}</div>
            <p className="text-xs text-muted-foreground">Giao dịch gần đây</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shareholders Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách Cổ đông ({filteredShareholders.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cổ đông</TableHead>
                    <TableHead>Công ty/Tầng</TableHead>
                    <TableHead>Cổ phần</TableHead>
                    <TableHead>Loại CP</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShareholders.map((shareholder) => (
                    <TableRow key={shareholder.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {shareholder.avatar}
                          </div>
                          <div>
                            <div className="font-medium">{shareholder.name}</div>
                            <div className="text-sm text-muted-foreground">{shareholder.role}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{shareholder.company}</div>
                          <Badge variant="outline" className={`text-xs ${getLevelColor(shareholder.level)}`}>
                            {shareholder.level}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-green-600">Sở hữu</div>
                        <div className="text-sm text-muted-foreground">{shareholder.totalShares.toLocaleString()} CP</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={shareholder.shareType === "Phổ thông" ? "default" : "secondary"}>
                          {shareholder.shareType}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(shareholder.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedShareholder(shareholder)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="w-full max-w-2xl">
                              <ShareholderDetailPanel shareholder={selectedShareholder} />
                            </SheetContent>
                          </Sheet>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* AI Assistant & Quick Actions */}
        <div className="space-y-4">
          {/* AI Copilot */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2 text-blue-600" />
                Shareholder AI Agent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Cơ cấu sở hữu cân bằng, không có rủi ro pha loãng
                  </p>
                </div>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                    2 ESOP sắp đến hạn vesting trong Q2/2025
                  </p>
                </div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    Đề xuất: Tăng tỷ lệ ESOP cho F4/F5 lên 15%
                  </p>
                </div>
              </div>
              
              <div className="pt-3 border-t">
                <Textarea placeholder="Hỏi AI: 'Tóm tắt quyền và nghĩa vụ cổ đông Lý Hoàng Hải'..." className="min-h-20" />
                <Button className="w-full mt-2" size="sm">
                  <Bot className="h-4 w-4 mr-2" />
                  Gửi câu hỏi
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>🚀 Hành động nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Thêm cổ đông mới
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shuffle className="h-4 w-4 mr-2" />
                Tạo chuyển nhượng
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <UserCheck className="h-4 w-4 mr-2" />
                Phân quyền
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Xuất chứng nhận
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <History className="h-4 w-4 mr-2" />
                Lịch sử giao dịch
              </Button>
            </CardContent>
          </Card>

          {/* Equity Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Cơ cấu sở hữu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {shareholders.slice(0,3).map((sh, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded ${idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                      <span className="text-sm">{sh.name}</span>
                    </div>
                    <span className="text-sm font-medium">{sh.equityPercent}%</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-medium">Khác</span>
                  <span className="text-sm font-medium">8.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Shareholder Detail Panel Component
function ShareholderDetailPanel({ shareholder }: { shareholder: any }) {
  if (!shareholder) return null;

  return (
    <div className="space-y-6">
      <SheetHeader>
        <SheetTitle className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
            {shareholder.avatar}
          </div>
          <div>
            <div className="text-xl font-bold">{shareholder.name}</div>
            <div className="text-sm text-muted-foreground">{shareholder.role}</div>
          </div>
        </SheetTitle>
      </SheetHeader>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
          <TabsTrigger value="equity">Sở hữu</TabsTrigger>
          <TabsTrigger value="documents">Tài liệu</TabsTrigger>
          <TabsTrigger value="history">Lịch sử</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm">{shareholder.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Điện thoại</Label>
                  <p className="text-sm">{shareholder.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Công ty</Label>
                  <p className="text-sm">{shareholder.company}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phòng ban</Label>
                  <p className="text-sm">{shareholder.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Tầng</Label>
                  <Badge className={getLevelColor(shareholder.level)}>{shareholder.level}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Ngày tham gia</Label>
                  <p className="text-sm">{shareholder.joinDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="equity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin sở hữu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{shareholder.equityPercent}%</div>
                  <div className="text-sm text-muted-foreground">Tỷ lệ sở hữu</div>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{shareholder.totalShares.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Số cổ phần</div>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{shareholder.shareValue}</div>
                  <div className="text-sm text-muted-foreground">Giá trị</div>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{shareholder.voteRights}</div>
                  <div className="text-sm text-muted-foreground">Quyền biểu quyết</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Loại cổ phần:</span>
                  <Badge variant={shareholder.shareType === "Phổ thông" ? "default" : "secondary"}>
                    {shareholder.shareType}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Lock-up period:</span>
                  <span>{shareholder.lockupPeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Vesting:</span>
                  <span>{shareholder.vestingSchedule}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tài liệu & Thỏa thuận</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-950/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">Chứng nhận cổ phần</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-950/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium">ESOP Agreement</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-950/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium">SHA - Thỏa thuận cổ đông</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nhật ký thay đổi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 pb-3 border-b">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="text-sm font-medium">Cấp chứng nhận cổ phần</div>
                    <div className="text-xs text-muted-foreground">2025-01-01 • Lý Hoàng Hải</div>
                    <div className="text-xs">Cấp 455,000 cổ phần (45.5%)</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 pb-3 border-b">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <div className="text-sm font-medium">Tạo hồ sơ cổ đông</div>
                    <div className="text-xs text-muted-foreground">2025-01-01 • Hệ thống</div>
                    <div className="text-xs">Khởi tạo hồ sơ CEO & Founder</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function getLevelColor(level: string) {
  const colors = {
    "F1": "text-red-600 bg-red-50",
    "F2": "text-orange-600 bg-orange-50", 
    "F3": "text-yellow-600 bg-yellow-50",
    "F4": "text-green-600 bg-green-50",
    "F5": "text-blue-600 bg-blue-50",
    "External": "text-purple-600 bg-purple-50"
  };
  return colors[level as keyof typeof colors] || "text-gray-600 bg-gray-50";
}