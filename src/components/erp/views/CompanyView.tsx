import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  FileText,
  Plus
} from "lucide-react";

interface CompanyViewProps {
  organizations: any[];
}

export function CompanyView({ organizations }: CompanyViewProps) {
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  const companies = organizations.filter(org => 
    org.organizations?.level === 'F3' || org.organizations?.level === 'F4'
  );

  const CompanyDashboard = ({ company }) => (
    <div className="space-y-6">
      {/* Company Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Doanh Thu Tháng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5B VNĐ</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12% so với tháng trước
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Nhân Sự</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <div className="text-sm text-muted-foreground">
              38 nhân viên + 7 quản lý
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Khách Hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <div className="text-sm text-muted-foreground">
              +89 khách hàng mới tháng này
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Lợi Nhuận</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">380M VNĐ</div>
            <div className="text-sm text-muted-foreground">
              Biên lợi nhuận: 15.2%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Modules */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="finance">Tài chính</TabsTrigger>
          <TabsTrigger value="hr">Nhân sự</TabsTrigger>
          <TabsTrigger value="crm">Khách hàng</TabsTrigger>
          <TabsTrigger value="inventory">Kho hàng</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 KPI Tháng Này</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Doanh thu</span>
                    <Badge variant="default">Đạt 105%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Lợi nhuận</span>
                    <Badge variant="secondary">Đạt 98%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Khách hàng mới</span>
                    <Badge variant="default">Đạt 112%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">⚡ Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Tạo báo cáo tài chính
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Quản lý nhân sự
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Kiểm tra đơn hàng
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="finance">
          <Card>
            <CardHeader>
              <CardTitle>💰 Quản Lý Tài Chính</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Báo cáo tài chính, công nợ, dòng tiền, và quản lý ngân sách công ty...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hr">
          <Card>
            <CardHeader>
              <CardTitle>👥 Quản Lý Nhân Sự</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Hồ sơ nhân viên, chấm công, KPI, lương thưởng...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crm">
          <Card>
            <CardHeader>
              <CardTitle>📞 Quản Lý Khách Hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                CRM, chăm sóc khách hàng, pipeline bán hàng...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>📦 Quản Lý Kho Hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nhập xuất tồn, quản lý nhà cung cấp, logistics...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">🏢 Quản Trị Công Ty</h1>
          <p className="text-muted-foreground mt-2">
            Quản trị hoạt động công ty thành viên (F3/F4) - BMC góp vốn 25-35%
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Building2 className="h-4 w-4 mr-2" />
            Xem danh sách
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Thêm Công Ty
          </Button>
        </div>
      </div>

      {!selectedCompany ? (
        /* Company List View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedCompany(company)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {company.organizations?.name}
                  </CardTitle>
                  <Badge variant="secondary">
                    {company.organizations?.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    🏭 {company.organizations?.industry}
                  </p>
                  <p className="text-sm">
                    💰 BMC: {company.organizations?.bmc_equity_percentage}%
                  </p>
                  <p className="text-sm">
                    📊 Vốn đầu tư: {(company.organizations?.total_investment_value / 1000000).toFixed(0)}M VNĐ
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <Badge 
                      variant={company.organizations?.status === 'active' ? 'default' : 'secondary'}
                    >
                      {company.organizations?.status || 'planning'}
                    </Badge>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {companies.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="text-center py-12">
                <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Chưa có công ty nào</h3>
                <p className="text-muted-foreground">
                  Hãy tạo công ty đầu tiên để bắt đầu quản trị doanh nghiệp
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        /* Selected Company Dashboard */
        <div>
          <div className="flex items-center space-x-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedCompany(null)}
            >
              ← Quay lại
            </Button>
            <div>
              <h2 className="text-2xl font-bold">{selectedCompany.organizations?.name}</h2>
              <p className="text-muted-foreground">
                {selectedCompany.organizations?.industry} • BMC {selectedCompany.organizations?.bmc_equity_percentage}%
              </p>
            </div>
          </div>
          <CompanyDashboard company={selectedCompany} />
        </div>
      )}
    </div>
  );
}