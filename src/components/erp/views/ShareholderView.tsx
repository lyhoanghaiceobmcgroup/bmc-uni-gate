import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Building2,
  ArrowLeft,
  Search,
  Plus,
  UserPlus,
  PieChart,
  BarChart3,
  Crown,
  Briefcase,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  FileText,
  History,
  ArrowRightLeft,
  Award,
  Shield
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface ShareholderViewProps {
  onBack: () => void;
}

// Mock data for demonstration
const mockShareholders = [
  {
    id: 1,
    name: "Lý Hoàng Hải",
    email: "lyhoanghaiceo@gmail.com",
    type: "Cổ đông sáng lập",
    totalShares: 80,
    totalInvestment: 50000000000, // 50B VNĐ
    joinDate: "2020-01-01",
    avatar: "LH",
    status: "active",
    role: "CEO & Founder",
    companies: [
      { name: "BMC Corporation", shares: 100, value: 30000000000 },
      { name: "BMC Tech", shares: 80, value: 15000000000 },
      { name: "BMC Finance", shares: 75, value: 5000000000 }
    ]
  },
  {
    id: 2,
    name: "Nguyễn Văn A",
    email: "nguyenvana@bmc.com",
    type: "Cổ đông chiến lược",
    totalShares: 15,
    totalInvestment: 8000000000, // 8B VNĐ
    joinDate: "2021-06-15",
    avatar: "NA",
    status: "active",
    role: "Strategic Investor",
    companies: [
      { name: "BMC Tech", shares: 20, value: 6000000000 },
      { name: "BMC Retail", shares: 25, value: 2000000000 }
    ]
  },
  {
    id: 3,
    name: "Trần Thị B",
    email: "tranthib@bmc.com",
    type: "Cổ đông nhân viên",
    totalShares: 3,
    totalInvestment: 1500000000, // 1.5B VNĐ
    joinDate: "2022-03-20",
    avatar: "TB",
    status: "active",
    role: "Employee Shareholder",
    companies: [
      { name: "BMC Corporation", shares: 3, value: 900000000 },
      { name: "BMC Tech", shares: 5, value: 600000000 }
    ]
  },
  {
    id: 4,
    name: "Lê Văn C",
    email: "levanc@external.com",
    type: "Nhà đầu tư ngoài",
    totalShares: 2,
    totalInvestment: 500000000, // 0.5B VNĐ
    joinDate: "2023-01-10",
    avatar: "LC",
    status: "active",
    role: "External Investor",
    companies: [
      { name: "BMC Startup Fund", shares: 10, value: 500000000 }
    ]
  }
];

export function ShareholderView({ onBack }: ShareholderViewProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [shareholders, setShareholders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShareholder, setSelectedShareholder] = useState<any>(null);
  const [filterType, setFilterType] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  // Function to reset all shareholder data to 0
  const resetShareholderData = () => {
    setShareholders([]);
    setSelectedShareholder(null);
    setSearchTerm("");
    setFilterType("all");
    toast.success("Đã reset tất cả dữ liệu cổ đông về 0");
  };

  const filteredShareholders = shareholders.filter(shareholder => {
    const matchesSearch = shareholder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shareholder.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shareholder.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === "all" || 
      (filterType === "founder" && shareholder.type === "Cổ đông sáng lập") ||
      (filterType === "strategic" && shareholder.type === "Cổ đông chiến lược") ||
      (filterType === "employee" && shareholder.type === "Cổ đông nhân viên") ||
      (filterType === "external" && shareholder.type === "Nhà đầu tư ngoài");
    
    return matchesSearch && matchesFilter;
  });

  const totalShareholders = shareholders.length;
  const totalShares = shareholders.reduce((sum, s) => sum + s.totalShares, 0);
  const totalInvestment = shareholders.reduce((sum, s) => sum + s.totalInvestment, 0);
  const activeShareholders = shareholders.filter(s => s.status === 'active').length;

  const shareholdersByType = {
    founder: shareholders.filter(s => s.type === 'Cổ đông sáng lập').length,
    strategic: shareholders.filter(s => s.type === 'Cổ đông chiến lược').length,
    employee: shareholders.filter(s => s.type === 'Cổ đông nhân viên').length,
    external: shareholders.filter(s => s.type === 'Nhà đầu tư ngoài').length,
  };

  const getShareholderTypeIcon = (type: string) => {
    switch (type) {
      case 'Cổ đông sáng lập': return <Crown className="h-4 w-4 text-yellow-600" />;
      case 'Cổ đông chiến lược': return <Briefcase className="h-4 w-4 text-blue-600" />;
      case 'Cổ đông nhân viên': return <Users className="h-4 w-4 text-green-600" />;
      case 'Nhà đầu tư ngoài': return <TrendingUp className="h-4 w-4 text-purple-600" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getShareholderTypeColor = (type: string) => {
    switch (type) {
      case 'Cổ đông sáng lập': return 'text-yellow-600';
      case 'Cổ đông chiến lược': return 'text-blue-600';
      case 'Cổ đông nhân viên': return 'text-green-600';
      case 'Nhà đầu tư ngoài': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  if (selectedShareholder) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setSelectedShareholder(null)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại danh sách
            </Button>
            <div>
              <h1 className="text-3xl font-bold">👤 Chi Tiết Cổ Đông</h1>
              <p className="text-muted-foreground mt-2">
                Thông tin chi tiết về {selectedShareholder.name}
              </p>
            </div>
          </div>
        </div>

        {/* Shareholder Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông Tin Cá Nhân</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">{selectedShareholder.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedShareholder.name}</h3>
                    <p className="text-muted-foreground">{selectedShareholder.email}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Loại cổ đông:</span>
                    <div className="flex items-center space-x-1">
                      {getShareholderTypeIcon(selectedShareholder.type)}
                      <span className={getShareholderTypeColor(selectedShareholder.type)}>
                        {selectedShareholder.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Vai trò:</span>
                    <span className="font-medium">{selectedShareholder.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ngày tham gia:</span>
                    <span>{new Date(selectedShareholder.joinDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trạng thái:</span>
                    <Badge variant={selectedShareholder.status === 'active' ? 'default' : 'secondary'}>
                      {selectedShareholder.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            {/* Investment Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Tổng Cổ Phần</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{selectedShareholder.totalShares}%</div>
                  <p className="text-xs text-muted-foreground">
                    Tỷ lệ sở hữu toàn tập đoàn
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Tổng Đầu Tư</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(selectedShareholder.totalInvestment / 1000000000).toFixed(1)}B VNĐ
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Giá trị đầu tư tích lũy
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Số Công Ty</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{selectedShareholder.companies.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Công ty đang đầu tư
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Company Investments */}
            <Card>
              <CardHeader>
                <CardTitle>Danh Mục Đầu Tư</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedShareholder.companies.map((company, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{company.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Sở hữu {company.shares}% cổ phần
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {(company.value / 1000000000).toFixed(1)}B VNĐ
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Giá trị hiện tại
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold">👥 Quản Lý Cổ Đông</h1>
            <p className="text-muted-foreground mt-2">
              Tổng hợp thông tin cổ đông của tất cả công ty trong tập đoàn BMC
            </p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Button variant="destructive" onClick={resetShareholderData}>
            <Trash2 className="h-4 w-4 mr-2" />
            Reset dữ liệu
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Xuất dữ liệu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => toast.success("Đã xuất file Excel thành công!")}>
                <FileText className="h-4 w-4 mr-2" />
                Xuất Excel (.xlsx)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success("Đã xuất file PDF thành công!")}>
                <FileText className="h-4 w-4 mr-2" />
                Xuất PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success("Đã xuất file CSV thành công!")}>
                <FileText className="h-4 w-4 mr-2" />
                Xuất CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Nhập dữ liệu
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Nhập Dữ Liệu Cổ Đông</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Chọn file dữ liệu *</Label>
                  <Input type="file" accept=".xlsx,.csv,.xls" />
                  <p className="text-sm text-muted-foreground">
                    Hỗ trợ: Excel (.xlsx, .xls), CSV (.csv)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Mẫu file nhập liệu</Label>
                  <Button variant="outline" size="sm" onClick={() => toast.success("Đã tải xuống file mẫu!")}>
                    <Download className="h-4 w-4 mr-2" />
                    Tải xuống file mẫu
                  </Button>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Hướng dẫn:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Sử dụng file mẫu để đảm bảo định dạng đúng</li>
                    <li>• Các cột bắt buộc: Họ tên, Email, CCCD, Loại cổ đông</li>
                    <li>• Tối đa 1000 bản ghi mỗi lần nhập</li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowImportDialog(false)}>
                  Hủy
                </Button>
                <Button onClick={() => {
                  setShowImportDialog(false);
                  toast.success("Nhập dữ liệu thành công! Đã thêm 15 cổ đông mới.");
                }}>
                  Nhập dữ liệu
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Thêm Cổ Đông
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Thêm Cổ Đông Mới</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên *</Label>
                  <Input id="name" placeholder="Nguyễn Văn A" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="nguyen.vana@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" placeholder="0901234567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="id_number">CCCD/CMND *</Label>
                  <Input id="id_number" placeholder="001234567890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Loại cổ đông *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại cổ đong" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="founder">Cổ đông sáng lập</SelectItem>
                      <SelectItem value="strategic">Cổ đông chiến lược</SelectItem>
                      <SelectItem value="employee">Cổ đông nhân viên</SelectItem>
                      <SelectItem value="external">Nhà đầu tư ngoài</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Công ty đầu tư *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn công ty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bmc">BMC Corporation</SelectItem>
                      <SelectItem value="tech">BMC Tech</SelectItem>
                      <SelectItem value="finance">BMC Finance</SelectItem>
                      <SelectItem value="retail">BMC Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shares">Tỷ lệ cổ phần (%)</Label>
                  <Input id="shares" type="number" placeholder="5.0" min="0" max="100" step="0.1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="investment">Số tiền đầu tư (VNĐ)</Label>
                  <Input id="investment" type="number" placeholder="1000000000" min="0" />
                </div>
                <div className="space-y-2">
                  <Label>Ngày tham gia</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Chọn ngày"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Vai trò</Label>
                  <Input id="role" placeholder="Giám đốc điều hành" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Textarea id="address" placeholder="Nhập địa chỉ chi tiết..." rows={2} />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="note">Ghi chú</Label>
                  <Textarea id="note" placeholder="Thông tin bổ sung về cổ đông..." rows={2} />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Hủy
                </Button>
                <Button onClick={() => {
                  setShowAddDialog(false);
                  toast.success("Thêm cổ đông mới thành công!");
                }}>
                  Thêm cổ đông
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Hành Động Nhanh
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex flex-col h-20">
                  <UserPlus className="h-6 w-6 mb-2" />
                  <span className="text-sm">Thêm cổ đông mới</span>
                </Button>
              </DialogTrigger>
            </Dialog>
            
            <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex flex-col h-20">
                  <ArrowRightLeft className="h-6 w-6 mb-2" />
                  <span className="text-sm">Tạo chuyển nhượng</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Tạo Giao Dịch Chuyển Nhượng Cổ Phần</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Người chuyển nhượng *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn cổ đông" />
                      </SelectTrigger>
                      <SelectContent>
                        {shareholders.map(s => (
                          <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Người nhận chuyển nhượng *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn cổ đông" />
                      </SelectTrigger>
                      <SelectContent>
                        {shareholders.map(s => (
                          <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Công ty</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn công ty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bmc">BMC Corporation</SelectItem>
                        <SelectItem value="tech">BMC Tech</SelectItem>
                        <SelectItem value="finance">BMC Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tỷ lệ chuyển nhượng</Label>
                    <Input type="number" placeholder="2.5" />
                  </div>
                  <div className="space-y-2">
                    <Label>Giá chuyển nhượng (VNĐ)</Label>
                    <Input type="number" placeholder="500000000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Ngày hiệu lực</Label>
                    <Input type="date" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Ghi chú</Label>
                    <Textarea placeholder="Thông tin bổ sung về giao dịch..." />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowTransferDialog(false)}>
                    Hủy
                  </Button>
                  <Button onClick={() => {
                    setShowTransferDialog(false);
                    toast.success("Tạo giao dịch chuyển nhượng thành công!");
                  }}>
                    Tạo chuyển nhượng
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex flex-col h-20">
                  <Shield className="h-6 w-6 mb-2" />
                  <span className="text-sm">Phân quyền</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Phân Quyền Cổ Đông</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Chọn cổ đông</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn cổ đông" />
                        </SelectTrigger>
                        <SelectContent>
                          {shareholders.map(s => (
                            <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Công ty/Dự án</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn phạm vi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả công ty</SelectItem>
                          <SelectItem value="bmc">BMC Corporation</SelectItem>
                          <SelectItem value="tech">BMC Tech</SelectItem>
                          <SelectItem value="finance">BMC Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Quyền truy cập</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="view_financial" defaultChecked />
                          <Label htmlFor="view_financial">Xem báo cáo tài chính</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="view_shareholder" defaultChecked />
                          <Label htmlFor="view_shareholder">Xem danh sách cổ đông</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="view_governance" />
                          <Label htmlFor="view_governance">Tham gia họp đồng cổ đông</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="approve_major" />
                          <Label htmlFor="approve_major">Phê duyệt quyết định lớn</Label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="transfer_shares" />
                          <Label htmlFor="transfer_shares">Chuyển nhượng cổ phần</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="dividend_info" defaultChecked />
                          <Label htmlFor="dividend_info">Nhận thông tin cổ tức</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="voting_rights" />
                          <Label htmlFor="voting_rights">Quyền biểu quyết</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="board_nomination" />
                          <Label htmlFor="board_nomination">Đề cử HĐQT</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Thời hạn hiệu lực</Label>
                    <div className="flex space-x-2">
                      <Select defaultValue="permanent">
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="permanent">Vĩnh viễn</SelectItem>
                          <SelectItem value="1year">1 năm</SelectItem>
                          <SelectItem value="2year">2 năm</SelectItem>
                          <SelectItem value="custom">Tùy chỉnh</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input type="date" className="flex-1" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowPermissionDialog(false)}>
                    Hủy
                  </Button>
                  <Button onClick={() => {
                    setShowPermissionDialog(false);
                    toast.success("Cập nhật quyền hạn thành công!");
                  }}>
                    Lưu phân quyền
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="flex flex-col h-20" onClick={() => toast.success("Đã xuất chứng nhận cổ đông")}>
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-sm">Xuất chứng nhận</span>
            </Button>

            <Button variant="outline" className="flex flex-col h-20" onClick={() => toast.success("Đang tải lịch sử giao dịch...")}>
              <History className="h-6 w-6 mb-2" />
              <span className="text-sm">Lịch sử giao dịch</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Cổ Đông</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalShareholders}</div>
            <p className="text-xs text-muted-foreground">
              Đang hoạt động: {activeShareholders}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Vốn Góp</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(totalInvestment / 1000000000).toFixed(1)}B VNĐ
            </div>
            <p className="text-xs text-muted-foreground">
              Tổng giá trị đầu tư
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ Lệ Cổ Phần</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalShares.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Tổng tỷ lệ đã phân bổ
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hiệu Quả Đầu Tư</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Tích cực</div>
            <p className="text-xs text-muted-foreground">
              Tăng trưởng ổn định
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Danh sách cổ đông</TabsTrigger>
          <TabsTrigger value="analytics">Phân tích</TabsTrigger>
          <TabsTrigger value="distribution">Phân bổ cổ phần</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Tìm Kiếm & Bộ Lọc
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm theo tên, email hoặc loại cổ đông..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Lọc theo loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả loại</SelectItem>
                      <SelectItem value="founder">Cổ đông sáng lập</SelectItem>
                      <SelectItem value="strategic">Cổ đông chiến lược</SelectItem>
                      <SelectItem value="employee">Cổ đông nhân viên</SelectItem>
                      <SelectItem value="external">Nhà đầu tư ngoài</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shareholder List */}
          <Card>
            <CardHeader>
              <CardTitle>📋 Danh Sách Chi Tiết</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredShareholders.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Không có dữ liệu cổ đông</h3>
                    <p className="text-muted-foreground mb-4">
                      Danh sách cổ đông đã được reset về 0. Bạn có thể thêm cổ đông mới hoặc nhập dữ liệu từ file.
                    </p>
                    <div className="flex justify-center space-x-2">
                      <Button onClick={() => setShowAddDialog(true)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Thêm cổ đông mới
                      </Button>
                      <Button variant="outline" onClick={() => setShowImportDialog(true)}>
                        <Upload className="h-4 w-4 mr-2" />
                        Nhập từ file
                      </Button>
                    </div>
                  </div>
                ) : (
                  filteredShareholders.map((shareholder) => (
                    <div 
                      key={shareholder.id} 
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="font-bold">{shareholder.avatar}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{shareholder.name}</h4>
                          <p className="text-sm text-muted-foreground">{shareholder.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="flex items-center space-x-1">
                          {getShareholderTypeIcon(shareholder.type)}
                          <span>{shareholder.type}</span>
                        </Badge>
                        <Badge 
                          variant={shareholder.status === 'active' ? 'default' : 'secondary'}
                        >
                          {shareholder.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-muted-foreground">Tỷ lệ sở hữu:</span>
                        <div className="font-semibold text-lg">{shareholder.totalShares}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tổng đầu tư:</span>
                        <div className="font-semibold">
                          {(shareholder.totalInvestment / 1000000000).toFixed(1)}B VNĐ
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Số công ty:</span>
                        <div className="font-semibold">{shareholder.companies.length} công ty</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Ngày tham gia:</span>
                        <div className="font-semibold">
                          {new Date(shareholder.joinDate).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <Separator className="my-3" />
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Thao tác:
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedShareholder(shareholder)}
                          className="flex items-center space-x-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Xem chi tiết</span>
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => toast.success("Đang chỉnh sửa thông tin cổ đông")}>
                              <Edit className="h-4 w-4 mr-2" />
                              Chỉnh sửa thông tin
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.success("Đã gửi email thông báo")}>
                              <UserCheck className="h-4 w-4 mr-2" />
                              Gửi thông báo
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.success("Đã xuất chứng nhận cổ đông")}>
                              <FileText className="h-4 w-4 mr-2" />
                              Xuất chứng nhận
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.success("Đang tải lịch sử giao dịch")}>
                              <History className="h-4 w-4 mr-2" />
                              Xem lịch sử
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setShowTransferDialog(true)}>
                              <ArrowRightLeft className="h-4 w-4 mr-2" />
                              Tạo chuyển nhượng
                            </DropdownMenuItem>
                            <Separator />
                            <DropdownMenuItem className="text-red-600" onClick={() => toast.error("Chức năng xóa yêu cầu xác nhận")}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Xóa cổ đông
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Phân Bố Theo Loại Cổ Đông</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Crown className="h-4 w-4 text-yellow-600" />
                      <span>Cổ đông sáng lập</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>{shareholdersByType.founder}</span>
                      <div className="w-20 bg-muted h-2 rounded-full">
                        <div 
                          className="h-2 bg-yellow-600 rounded-full"
                          style={{ width: `${(shareholdersByType.founder / totalShareholders) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4 text-blue-600" />
                      <span>Cổ đông chiến lược</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>{shareholdersByType.strategic}</span>
                      <div className="w-20 bg-muted h-2 rounded-full">
                        <div 
                          className="h-2 bg-blue-600 rounded-full"
                          style={{ width: `${(shareholdersByType.strategic / totalShareholders) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-green-600" />
                      <span>Cổ đông nhân viên</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>{shareholdersByType.employee}</span>
                      <div className="w-20 bg-muted h-2 rounded-full">
                        <div 
                          className="h-2 bg-green-600 rounded-full"
                          style={{ width: `${(shareholdersByType.employee / totalShareholders) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                      <span>Nhà đầu tư ngoài</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>{shareholdersByType.external}</span>
                      <div className="w-20 bg-muted h-2 rounded-full">
                        <div 
                          className="h-2 bg-purple-600 rounded-full"
                          style={{ width: `${(shareholdersByType.external / totalShareholders) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Cổ Đông Lớn Nhất</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {shareholders
                    .sort((a, b) => b.totalShares - a.totalShares)
                    .slice(0, 5)
                    .map((shareholder, index) => (
                    <div key={shareholder.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{shareholder.name}</div>
                          <div className="text-xs text-muted-foreground">{shareholder.type}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{shareholder.totalShares}%</div>
                        <div className="text-xs text-muted-foreground">
                          {(shareholder.totalInvestment / 1000000000).toFixed(1)}B VNĐ
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>📊 Phân Bổ Cổ Phần Tổng Thể</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center border-2 border-dashed">
                <div className="text-center">
                  <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Biểu đồ phân bổ cổ phần theo từng công ty và cổ đông
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Visualization của ownership structure toàn tập đoàn
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}