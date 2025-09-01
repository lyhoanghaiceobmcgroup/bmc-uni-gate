import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Building2, 
  Search, 
  Filter, 
  ArrowLeft, 
  Eye,
  TrendingUp,
  Users,
  DollarSign
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface OrganizationListViewProps {
  onSelectOrganization: (organization: any) => void;
  onBack: () => void;
  level?: string;
}

export function OrganizationListView({ onSelectOrganization, onBack, level }: OrganizationListViewProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [filteredOrgs, setFilteredOrgs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState(level || "all");

  useEffect(() => {
    if (user) {
      loadOrganizations();
    }
  }, [user]);

  useEffect(() => {
    filterOrganizations();
  }, [organizations, searchTerm, statusFilter, levelFilter]);

  const loadOrganizations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_organization_roles')
        .select(`
          role,
          organizations (*)
        `)
        .eq('user_id', user?.id);

      if (error) throw error;

      setOrganizations(data || []);
    } catch (error) {
      console.error('Error loading organizations:', error);
      toast.error("Lỗi tải danh sách tổ chức");
    } finally {
      setLoading(false);
    }
  };

  const filterOrganizations = () => {
    let filtered = organizations;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(org => 
        org.organizations?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.organizations?.industry?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(org => 
        org.organizations?.status === statusFilter
      );
    }

    // Filter by level
    if (levelFilter !== "all") {
      filtered = filtered.filter(org => 
        org.organizations?.level === levelFilter
      );
    }

    setFilteredOrgs(filtered);
  };

  const getOrganizationTypeLabel = (level: string) => {
    switch (level) {
      case 'F1': return '🏢 Cụm ngành';
      case 'F2': return '🏭 Nhóm ngành';
      case 'F3': return '🏢 Công ty lớn';
      case 'F4': return '🏬 Công ty nhỏ';
      case 'F5': return '🚀 Startup';
      default: return '📋 Tổ chức';
    }
  };

  const getEquityColor = (equity: number) => {
    if (equity >= 80) return 'text-green-600';
    if (equity >= 50) return 'text-blue-600';
    if (equity >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  const totalInvestment = filteredOrgs.reduce((sum, org) => 
    sum + (org.organizations?.total_investment_value || 0), 0
  );
  const avgEquity = filteredOrgs.length > 0 
    ? filteredOrgs.reduce((sum, org) => sum + (org.organizations?.bmc_equity_percentage || 0), 0) / filteredOrgs.length 
    : 0;

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
            <h1 className="text-3xl font-bold">📋 Danh Sách Tổ Chức</h1>
            <p className="text-muted-foreground mt-2">
              Tất cả các dự án, chi nhánh, công ty và cụm ngành trong hệ sinh thái BMC
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Tổ Chức</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredOrgs.length}</div>
            <p className="text-xs text-muted-foreground">
              Từ tất cả các cấp độ
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Đầu Tư</CardTitle>
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
            <CardTitle className="text-sm font-medium">Sở Hữu BMC</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Kiểm soát</div>
            <p className="text-xs text-muted-foreground">
              Quyền quản lý tổ chức
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoạt Động</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {filteredOrgs.filter(org => org.organizations?.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Tổ chức đang hoạt động
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🔍 Bộ Lọc & Tìm Kiếm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm theo tên hoặc ngành..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Lọc theo cấp độ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả cấp độ</SelectItem>
                <SelectItem value="F1">F1 - Cụm ngành</SelectItem>
                <SelectItem value="F2">F2 - Nhóm ngành</SelectItem>
                <SelectItem value="F3">F3 - Công ty lớn</SelectItem>
                <SelectItem value="F4">F4 - Công ty nhỏ</SelectItem>
                <SelectItem value="F5">F5 - Startup</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="planning">Đang lên kế hoạch</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="paused">Tạm dừng</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Organization List */}
      <Card>
        <CardHeader>
          <CardTitle>📋 Danh Sách Chi Tiết</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground">Đang tải...</div>
            </div>
          ) : filteredOrgs.length > 0 ? (
            <div className="space-y-4">
              {filteredOrgs.map((org, index) => (
                <div 
                  key={index} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary">
                        {getOrganizationTypeLabel(org.organizations?.level)}
                      </Badge>
                      <h4 className="font-semibold text-lg">
                        {org.organizations?.name}
                      </h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={org.organizations?.status === 'active' ? 'default' : 'secondary'}
                      >
                        {org.organizations?.status || 'planning'}
                      </Badge>
                      <Button 
                        size="sm" 
                        onClick={() => onSelectOrganization(org)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Ngành:</span>
                      <div className="font-medium">{org.organizations?.industry}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">BMC sở hữu:</span>
                      <div className={`font-medium ${getEquityColor(org.organizations?.bmc_equity_percentage || 0)}`}>
                        {org.organizations?.bmc_equity_percentage}%
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Đầu tư:</span>
                      <div className="font-medium">
                        {(org.organizations?.total_investment_value / 1000000).toFixed(0)}M VNĐ
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Vai trò của bạn:</span>
                      <Badge variant="outline" className="ml-1">
                        {org.role}
                      </Badge>
                    </div>
                  </div>

                  {org.organizations?.description && (
                    <div className="mt-3 text-sm text-muted-foreground">
                      {org.organizations.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Không tìm thấy tổ chức nào</h3>
              <p className="text-muted-foreground">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}