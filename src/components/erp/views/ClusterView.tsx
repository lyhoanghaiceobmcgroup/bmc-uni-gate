import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Users, 
  AlertTriangle,
  BarChart3,
  Lightbulb,
  Shield,
  Briefcase,
  Globe
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ClusterViewProps {
  organizations: any[];
}

export function ClusterView({ organizations }: ClusterViewProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [consolidatedData, setConsolidatedData] = useState<any[]>([]);
  const [portfolioData, setPortfolioData] = useState<any[]>([]);
  const [strategicInitiatives, setStrategicInitiatives] = useState<any[]>([]);

  // Filter F1 organizations (Industrial Clusters where BMC owns 80%)
  const clusterOrganizations = organizations.filter(org => 
    org.organizations?.level === 'F1' && org.organizations?.bmc_equity_percentage >= 80
  );

  useEffect(() => {
    if (user && clusterOrganizations.length > 0) {
      loadClusterData();
    }
  }, [user, clusterOrganizations]);

  const loadClusterData = async () => {
    setLoading(true);
    try {
      const clusterIds = clusterOrganizations.map(org => org.organizations.id);
      
      // Load consolidated reports
      const { data: reports } = await supabase
        .from('consolidated_reports')
        .select('*')
        .in('cluster_id', clusterIds)
        .order('reporting_period', { ascending: false })
        .limit(10);
      
      // Load portfolio data
      const { data: portfolio } = await supabase
        .from('cluster_portfolios')
        .select(`
          *,
          child_organization:organizations!cluster_portfolios_child_organization_id_fkey(name, level)
        `)
        .in('cluster_id', clusterIds);
      
      // Load strategic initiatives
      const { data: initiatives } = await supabase
        .from('strategic_initiatives')
        .select('*')
        .in('cluster_id', clusterIds)
        .order('created_at', { ascending: false });

      setConsolidatedData(reports || []);
      setPortfolioData(portfolio || []);
      setStrategicInitiatives(initiatives || []);
    } catch (error) {
      console.error('Error loading cluster data:', error);
      toast.error("Lỗi tải dữ liệu cụm ngành");
    } finally {
      setLoading(false);
    }
  };

  if (clusterOrganizations.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">🏢 F1 - Cụm Ngành BMC (80%)</h2>
            <p className="text-muted-foreground">
              Quản lý cụm ngành chiến lược - Hợp nhất dữ liệu từ các nhóm ngành F2
            </p>
          </div>
          <Button variant="default">
            <Building2 className="h-4 w-4 mr-2" />
            Thêm Công ty
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Chưa có Cụm Ngành nào
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Bạn chưa có quyền truy cập vào cụm ngành nào ở tầng F1. 
              Cụm ngành là các tập hợp nhóm ngành (F2) theo lĩnh vực chiến lược lớn.
            </p>
            <div className="space-y-2 text-sm">
              <p>🔹 <strong>F1 - Cụm ngành:</strong> BMC góp 80% vốn</p>
              <p>🔹 <strong>Nhiệm vụ:</strong> Hợp nhất tài chính, quản lý danh mục đầu tư, R&D</p>
              <p>🔹 <strong>Ví dụ:</strong> Cụm F&B, Cụm Công nghệ, Cụm Tài chính...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const calculateClusterMetrics = () => {
    const totalRevenue = consolidatedData.reduce((sum, report) => sum + (report.total_revenue || 0), 0);
    const totalProfit = consolidatedData.reduce((sum, report) => sum + (report.net_profit || 0), 0);
    const totalPortfolioValue = portfolioData.reduce((sum, item) => sum + (item.current_valuation || 0), 0);
    const activeInitiatives = strategicInitiatives.filter(init => init.status === 'in_progress').length;
    
    return { totalRevenue, totalProfit, totalPortfolioValue, activeInitiatives };
  };

  const metrics = calculateClusterMetrics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">🏢 F1 - Cụm Ngành BMC (80%)</h2>
          <p className="text-muted-foreground">
            Quản lý cụm ngành chiến lược - Hợp nhất dữ liệu từ các nhóm ngành F2
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => {/* TODO: Implement view clusters list */}}>
            <Building2 className="h-4 w-4 mr-2" />
            Xem danh sách
          </Button>
          <Button onClick={loadClusterData} disabled={loading}>
            {loading ? "Đang tải..." : "Làm mới dữ liệu"}
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu hợp nhất</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(metrics.totalRevenue / 1000000000).toFixed(1)}B VNĐ
            </div>
            <p className="text-xs text-muted-foreground">
              Tổng doanh thu từ các nhóm ngành
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lợi nhuận hợp nhất</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(metrics.totalProfit / 1000000000).toFixed(1)}B VNĐ
            </div>
            <p className="text-xs text-muted-foreground">
              Lợi nhuận ròng toàn cụm ngành
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giá trị danh mục</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(metrics.totalPortfolioValue / 1000000000).toFixed(1)}B VNĐ
            </div>
            <p className="text-xs text-muted-foreground">
              Tổng giá trị đầu tư danh mục
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sáng kiến đang triển khai</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeInitiatives}</div>
            <p className="text-xs text-muted-foreground">
              Dự án R&D và đổi mới đang thực hiện
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="financial" className="space-y-4">
        <TabsList>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Tài chính hợp nhất
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Quản lý danh mục
          </TabsTrigger>
          <TabsTrigger value="initiatives" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            R&D & Đổi mới
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Rủi ro & Tuân thủ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo tài chính hợp nhất</CardTitle>
            </CardHeader>
            <CardContent>
              {consolidatedData.length > 0 ? (
                <div className="space-y-4">
                  {consolidatedData.slice(0, 5).map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">
                          Báo cáo {report.report_type} - {new Date(report.reporting_period).toLocaleDateString('vi-VN')}
                        </p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>Doanh thu: {(report.total_revenue / 1000000).toFixed(0)}M</span>
                          <span>Lợi nhuận: {(report.net_profit / 1000000).toFixed(0)}M</span>
                          <span>ROI: {report.roi_percentage}%</span>
                        </div>
                      </div>
                      <Badge variant={report.compliance_status === 'compliant' ? 'default' : 'destructive'}>
                        {report.compliance_status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Chưa có dữ liệu báo cáo tài chính hợp nhất</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh mục đầu tư cụm ngành</CardTitle>
            </CardHeader>
            <CardContent>
              {portfolioData.length > 0 ? (
                <div className="space-y-4">
                  {portfolioData.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{item.child_organization?.name}</p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>Cấp độ: {item.child_organization?.level}</span>
                          <span>Tỷ lệ góp vốn: {item.equity_percentage}%</span>
                          <span>Đầu tư: {(item.investment_amount / 1000000).toFixed(0)}M VNĐ</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{(item.current_valuation / 1000000).toFixed(0)}M VNĐ</p>
                        <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Chưa có dữ liệu danh mục đầu tư</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="initiatives" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sáng kiến R&D và đổi mới</CardTitle>
            </CardHeader>
            <CardContent>
              {strategicInitiatives.length > 0 ? (
                <div className="space-y-4">
                  {strategicInitiatives.slice(0, 5).map((initiative) => (
                    <div key={initiative.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{initiative.initiative_name}</h4>
                        <Badge variant={initiative.status === 'in_progress' ? 'default' : 'secondary'}>
                          {initiative.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>Loại: {initiative.initiative_type}</span>
                          <span>Ngân sách: {(initiative.budget_allocated / 1000000).toFixed(0)}M VNĐ</span>
                          <span>ROI dự kiến: {initiative.expected_roi}%</span>
                        </div>
                        {initiative.budget_allocated > 0 && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Tiến độ ngân sách</span>
                              <span>{((initiative.budget_spent / initiative.budget_allocated) * 100).toFixed(1)}%</span>
                            </div>
                            <Progress 
                              value={(initiative.budget_spent / initiative.budget_allocated) * 100}
                              className="h-2"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Chưa có sáng kiến R&D nào được khởi tạo</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Đánh giá rủi ro và tuân thủ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <h4 className="font-medium">Điểm rủi ro tổng thể</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">
                        {consolidatedData.length > 0 
                          ? Math.round(consolidatedData.reduce((sum, r) => sum + r.risk_score, 0) / consolidatedData.length)
                          : 0
                        }/100
                      </div>
                      <Progress 
                        value={consolidatedData.length > 0 
                          ? consolidatedData.reduce((sum, r) => sum + r.risk_score, 0) / consolidatedData.length
                          : 0
                        } 
                        className="h-2"
                      />
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <h4 className="font-medium">Trạng thái tuân thủ</h4>
                    </div>
                    <div className="space-y-2">
                      {consolidatedData.length > 0 ? (
                        <div className="text-sm">
                          <div className="flex justify-between">
                            <span>Tuân thủ:</span>
                            <span className="font-medium text-green-600">
                              {consolidatedData.filter(r => r.compliance_status === 'compliant').length}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Chưa tuân thủ:</span>
                            <span className="font-medium text-red-600">
                              {consolidatedData.filter(r => r.compliance_status === 'non_compliant').length}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Đang xử lý:</span>
                            <span className="font-medium text-orange-600">
                              {consolidatedData.filter(r => r.compliance_status === 'pending').length}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-sm">Chưa có dữ liệu tuân thủ</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Khuyến nghị AI về rủi ro</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Theo dõi sát các chỉ số tài chính của nhóm ngành F2</li>
                    <li>• Đa dạng hóa danh mục đầu tư giữa các lĩnh vực</li>
                    <li>• Tăng cường kiểm soát nội bộ và tuân thủ quy định</li>
                    <li>• Xây dựng quỹ dự phòng rủi ro ở cấp cụm ngành</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}