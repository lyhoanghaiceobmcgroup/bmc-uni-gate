import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Clock, FileText, Users, MessageSquare, Download, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RiskComplianceDetailViewProps {
  onBack: () => void;
  organizations: any[];
}

// Mock data cho Risk & Compliance
const mockRiskData = {
  totalRisks: 0,
  activeRisks: 0,
  resolvedRisks: 0,
  internalCompliance: 0,
  legalCompliance: 0,
  contractsExpiring: 0,
};

const mockRiskList = [];

const mockContractList = [];

const mockComplianceAreas = [];

export function RiskComplianceDetailView({ onBack, organizations }: RiskComplianceDetailViewProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const getRiskLevelBadge = (level: string) => {
    switch (level) {
      case "Cao":
        return <Badge variant="destructive">Cao</Badge>;
      case "Trung bình":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Trung bình</Badge>;
      case "Thấp":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Thấp</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Khắc phục xong":
        return <Badge variant="default" className="bg-green-100 text-green-800">Khắc phục xong</Badge>;
      case "Đang xử lý":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Đang xử lý</Badge>;
      case "Mới ghi nhận":
        return <Badge variant="destructive">Mới ghi nhận</Badge>;
      case "Đang giám sát":
        return <Badge variant="outline">Đang giám sát</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getContractStatus = (status: string) => {
    switch (status) {
      case "Còn hiệu lực":
        return <Badge variant="default" className="bg-green-100 text-green-800">Còn hiệu lực</Badge>;
      case "Sắp hết hạn":
        return <Badge variant="destructive">Sắp hết hạn</Badge>;
      case "Hết hạn":
        return <Badge variant="secondary">Hết hạn</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getComplianceStatus = (percentage: number) => {
    if (percentage >= 95) return { color: "text-green-600", bg: "bg-green-100", text: "Xuất sắc" };
    if (percentage >= 90) return { color: "text-blue-600", bg: "bg-blue-100", text: "Tốt" };
    if (percentage >= 85) return { color: "text-yellow-600", bg: "bg-yellow-100", text: "Khá tốt" };
    return { color: "text-red-600", bg: "bg-red-100", text: "Cần cải thiện" };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Báo cáo Rủi ro & Tuân thủ</h1>
            <p className="text-muted-foreground">Giám sát rủi ro và tuân thủ pháp chế toàn hệ thống</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Nhập liệu
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-4 p-4 bg-card rounded-lg border">
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Chọn tổ chức" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="bmc">BMC (Tập đoàn)</SelectItem>
            <SelectItem value="f1">F1 (Cụm ngành)</SelectItem>
            <SelectItem value="f2">F2 (Ngành)</SelectItem>
            <SelectItem value="f3">F3 (Công ty)</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Loại rủi ro" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="financial">Tài chính</SelectItem>
            <SelectItem value="legal">Pháp lý</SelectItem>
            <SelectItem value="hr">Nhân sự</SelectItem>
            <SelectItem value="tech">Công nghệ</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="month">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Ngày</SelectItem>
            <SelectItem value="week">Tuần</SelectItem>
            <SelectItem value="month">Tháng</SelectItem>
            <SelectItem value="quarter">Quý</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Tổng số rủi ro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockRiskData.totalRisks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Đã ghi nhận
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              Đang xử lý
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockRiskData.activeRisks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((mockRiskData.activeRisks / mockRiskData.totalRisks) * 100).toFixed(1)}% tổng số
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Đã khắc phục
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockRiskData.resolvedRisks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((mockRiskData.resolvedRisks / mockRiskData.totalRisks) * 100).toFixed(1)}% tổng số
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Tuân thủ nội bộ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockRiskData.internalCompliance}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tỷ lệ tuân thủ quy định nội bộ
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-500" />
              Tuân thủ pháp luật
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockRiskData.legalCompliance}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Cao hơn mức tối thiểu 85%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              HĐ sắp hết hạn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockRiskData.contractsExpiring}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Hợp đồng cần gia hạn
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insight Box */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            AI Risk & Compliance Insight
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-medium text-sm text-foreground mb-1">📊 Tóm tắt:</h4>
            <p className="text-sm text-muted-foreground">
              Trong {mockRiskData.totalRisks} rủi ro đã ghi nhận, có {mockRiskData.activeRisks} vụ đang xử lý, chiếm {((mockRiskData.activeRisks / mockRiskData.totalRisks) * 100).toFixed(1)}%. 
              Các rủi ro pháp lý tại Công ty A cần được ưu tiên vì mức độ cao.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm text-amber-600 mb-1">⚠️ Cảnh báo:</h4>
            <p className="text-sm text-muted-foreground">
              Tỷ lệ tuân thủ của Startup X chỉ đạt 75%, dưới chuẩn an toàn (85%). Cần có biện pháp khắc phục ngay.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm text-green-600 mb-1">💡 Gợi ý hành động:</h4>
            <p className="text-sm text-muted-foreground">
              Gia hạn sớm {mockRiskData.contractsExpiring} hợp đồng sắp hết hạn để tránh rủi ro pháp lý. Tăng cường kiểm tra tuân thủ tại các startup.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="risks">Rủi ro</TabsTrigger>
          <TabsTrigger value="contracts">Hợp đồng</TabsTrigger>
          <TabsTrigger value="compliance">Tuân thủ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Phân bổ rủi ro theo loại</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="font-medium text-sm">Pháp lý</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">35 vụ</div>
                      <div className="text-xs text-muted-foreground">29%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="font-medium text-sm">Tài chính</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">30 vụ</div>
                      <div className="text-xs text-muted-foreground">25%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="font-medium text-sm">Nhân sự</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">25 vụ</div>
                      <div className="text-xs text-muted-foreground">21%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      <span className="font-medium text-sm">Công nghệ</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">20 vụ</div>
                      <div className="text-xs text-muted-foreground">17%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tình trạng hợp đồng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Còn hiệu lực</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-sm font-medium">150</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sắp hết hạn (&lt; 30 ngày)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <span className="text-sm font-medium">25</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Đã hết hạn</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="text-sm font-medium">12</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách rủi ro chi tiết</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRiskList.map((risk, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{risk.unit}</h4>
                        <p className="text-xs text-muted-foreground">{risk.description}</p>
                      </div>
                      <div className="flex gap-2">
                        {getRiskLevelBadge(risk.level)}
                        {getStatusBadge(risk.status)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Loại rủi ro</p>
                        <p className="text-sm font-medium">{risk.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Tuân thủ</p>
                        <p className="text-sm font-medium">{risk.compliance}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Hợp đồng</p>
                        <p className="text-sm font-medium">{risk.contract}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Người phụ trách</p>
                        <p className="text-sm font-medium">{risk.assignee}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách hợp đồng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Mã HĐ</th>
                      <th className="text-left p-2">Đối tác</th>
                      <th className="text-left p-2">Loại hợp đồng</th>
                      <th className="text-right p-2">Ngày bắt đầu</th>
                      <th className="text-right p-2">Ngày hết hạn</th>
                      <th className="text-right p-2">Giá trị</th>
                      <th className="text-center p-2">Trạng thái</th>
                      <th className="text-right p-2">Còn lại</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockContractList.map((contract, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{contract.id}</td>
                        <td className="p-2">{contract.partner}</td>
                        <td className="p-2">{contract.type}</td>
                        <td className="p-2 text-right">{contract.startDate}</td>
                        <td className="p-2 text-right">{contract.endDate}</td>
                        <td className="p-2 text-right font-semibold">{contract.value}</td>
                        <td className="p-2 text-center">{getContractStatus(contract.status)}</td>
                        <td className="p-2 text-right">{contract.daysLeft} ngày</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tình hình tuân thủ theo lĩnh vực</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockComplianceAreas.map((area, index) => {
                  const status = getComplianceStatus(area.percentage);
                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{area.area}</h4>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded ${status.bg} ${status.color}`}>
                              {status.text}
                            </span>
                            <span className="font-semibold text-sm">{area.percentage}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-primary" 
                            style={{ width: `${area.percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {area.issues} vấn đề cần xử lý
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}