import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  ArrowUp, 
  Building2,
  Users,
  DollarSign 
} from "lucide-react";

interface AutoTieringSystemProps {
  entityData: {
    id: string;
    name: string;
    level: string;
    bmcOwnership: number;
    kpiAverage4Quarters: number;
    autoTieringStatus: string;
    nextTierTarget: string;
    tieringProgress: number;
  };
}

// Logic auto-tiering theo hệ sinh thái BMC
const tieringRules = {
  F5: {
    name: "Startup",
    nextTier: "F4",
    equityThreshold: 20,
    kpiThreshold: 70,
    additionalCriteria: ["Break-even 2 quý", "Product-Market Fit >60%", "Team >10 người"]
  },
  F4: {
    name: "Dự án/Chi nhánh", 
    nextTier: "F3",
    equityThreshold: 35,
    kpiThreshold: 75,
    additionalCriteria: ["Doanh thu >5 tỷ/tháng", "ROI >25%", "Compliance >90%"]
  },
  F3: {
    name: "Công ty chiến lược",
    nextTier: "F2", 
    equityThreshold: 55,
    kpiThreshold: 80,
    additionalCriteria: ["Kiểm soát điều hành", "Market leader", "Synergy với F1"]
  },
  F2: {
    name: "Công ty ngành",
    nextTier: "F1",
    equityThreshold: 80,
    kpiThreshold: 85,
    additionalCriteria: ["Hợp nhất sâu", "Cross-selling", "Shared resources"]
  },
  F1: {
    name: "Cụm ngành", 
    nextTier: "BMC",
    equityThreshold: 100,
    kpiThreshold: 90,
    additionalCriteria: ["Thống nhất điều lệ", "Full integration", "BMC branding"]
  }
};

export function AutoTieringSystem({ entityData }: AutoTieringSystemProps) {
  const [activeTab, setActiveTab] = useState("status");
  
  const currentTier = tieringRules[entityData.level as keyof typeof tieringRules];
  const equityProgress = (entityData.bmcOwnership / currentTier.equityThreshold) * 100;
  const kpiProgress = (entityData.kpiAverage4Quarters / currentTier.kpiThreshold) * 100;
  
  const isEligible = entityData.bmcOwnership >= currentTier.equityThreshold && 
                    entityData.kpiAverage4Quarters >= currentTier.kpiThreshold;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "eligible":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "approaching": 
        return <Clock className="h-5 w-5 text-amber-600" />;
      case "developing":
        return <TrendingUp className="h-5 w-5 text-blue-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "eligible":
        return <Badge className="bg-green-100 text-green-800">Đủ điều kiện thăng cấp</Badge>;
      case "approaching":
        return <Badge className="bg-amber-100 text-amber-800">Sắp đạt ngưỡng</Badge>;
      case "developing":
        return <Badge className="bg-blue-100 text-blue-800">Đang phát triển</Badge>;
      default:
        return <Badge variant="outline">Chưa đủ điều kiện</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Auto-Tiering */}
      <Card className="border-l-4 border-l-gradient-primary">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ArrowUp className="h-5 w-5 text-primary" />
            🎯 Hệ thống Auto-Tiering BMC - {entityData.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Tự động đánh giá và đề xuất thăng cấp theo ngưỡng cổ phần và KPI
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(entityData.autoTieringStatus)}
              <div>
                <p className="font-medium">Cấp hiện tại: {entityData.level} ({currentTier.name})</p>
                <p className="text-sm text-muted-foreground">
                  Tiến độ thăng cấp lên {entityData.nextTierTarget}: {entityData.tieringProgress}%
                </p>
              </div>
            </div>
            <div className="text-right">
              {getStatusBadge(entityData.autoTieringStatus)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tiering Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Ngưỡng Cổ phần BMC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Hiện tại: {entityData.bmcOwnership}%</span>
                <span>Cần: {currentTier.equityThreshold}%</span>
              </div>
              <Progress value={equityProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {equityProgress >= 100 ? (
                  <span className="text-green-600">✓ Đạt yêu cầu</span>
                ) : (
                  <span>Cần thêm {(currentTier.equityThreshold - entityData.bmcOwnership).toFixed(1)}%</span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              KPI 4 Quý Liên tiếp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>TB 4Q: {entityData.kpiAverage4Quarters}%</span>
                <span>Cần: {currentTier.kpiThreshold}%</span>
              </div>
              <Progress value={kpiProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {kpiProgress >= 100 ? (
                  <span className="text-green-600">✓ Đạt chuẩn</span>
                ) : (
                  <span>Cần cải thiện {(currentTier.kpiThreshold - entityData.kpiAverage4Quarters).toFixed(1)}%</span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Tiến độ Tổng thể
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Hoàn thành: {entityData.tieringProgress}%</span>
                <span>Mục tiêu: {entityData.nextTierTarget}</span>
              </div>
              <Progress value={entityData.tieringProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {entityData.tieringProgress >= 85 ? (
                  <span className="text-green-600">✓ Sẵn sàng thăng cấp</span>
                ) : (
                  <span>Cần {(100 - entityData.tieringProgress).toFixed(0)}% nữa</span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="status">📊 Trạng thái</TabsTrigger>
          <TabsTrigger value="criteria">📋 Tiêu chí</TabsTrigger>
          <TabsTrigger value="workflow">🔄 Quy trình</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>📊 Phân tích chi tiết Auto-Tiering</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">🎯 Tiêu chí chính</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm">Cổ phần BMC</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{entityData.bmcOwnership}% / {currentTier.equityThreshold}%</span>
                        {entityData.bmcOwnership >= currentTier.equityThreshold ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Clock className="h-4 w-4 text-amber-600" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm">KPI trung bình</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{entityData.kpiAverage4Quarters}% / {currentTier.kpiThreshold}%</span>
                        {entityData.kpiAverage4Quarters >= currentTier.kpiThreshold ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Clock className="h-4 w-4 text-amber-600" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">📈 Dự báo AI</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">🤖 Khuyến nghị hệ thống</p>
                      <p className="text-xs text-blue-600 mt-1">
                        {isEligible ? 
                          "Đủ điều kiện thăng cấp. Khởi tạo workflow phê duyệt." :
                          `Cần ${Math.ceil((currentTier.equityThreshold - entityData.bmcOwnership) / 2)} tháng để đạt ngưỡng cổ phần.`
                        }
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-800">💡 Gợi ý tối ưu</p>
                      <p className="text-xs text-green-600 mt-1">
                        Focus vào KPI Marketing và Vận hành. Tăng hiệu suất 5-8% trong 2 quý tới.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="criteria" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>📋 Tiêu chí thăng cấp {entityData.level} → {entityData.nextTierTarget}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">✅ Tiêu chí bắt buộc</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <CheckCircle className={`h-5 w-5 ${entityData.bmcOwnership >= currentTier.equityThreshold ? 'text-green-600' : 'text-gray-400'}`} />
                      <div>
                        <p className="text-sm font-medium">Cổ phần BMC ≥ {currentTier.equityThreshold}%</p>
                        <p className="text-xs text-muted-foreground">Hiện tại: {entityData.bmcOwnership}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <CheckCircle className={`h-5 w-5 ${entityData.kpiAverage4Quarters >= currentTier.kpiThreshold ? 'text-green-600' : 'text-gray-400'}`} />
                      <div>
                        <p className="text-sm font-medium">KPI trung bình 4 quý ≥ {currentTier.kpiThreshold}%</p>
                        <p className="text-xs text-muted-foreground">Hiện tại: {entityData.kpiAverage4Quarters}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">🎯 Tiêu chí bổ sung</h4>
                  <div className="space-y-2">
                    {currentTier.additionalCriteria.map((criterion, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <Clock className="h-5 w-5 text-amber-600" />
                        <div>
                          <p className="text-sm font-medium">{criterion}</p>
                          <p className="text-xs text-muted-foreground">Đang đánh giá...</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🔄 Quy trình Workflow Auto-Tiering</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">📝 Các bước thực hiện</h4>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">AI Rule Engine kiểm tra ngưỡng</p>
                        <p className="text-xs text-muted-foreground">Tự động đánh giá cổ phần và KPI realtime</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-amber-600">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Tạo PromotionProposal</p>
                        <p className="text-xs text-muted-foreground">Hệ thống tự động tạo hồ sơ đề xuất thăng cấp</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-green-600">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Workflow phê duyệt</p>
                        <p className="text-xs text-muted-foreground">Manager → CEO F3/F2 → BMC Board</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-purple-600">4</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Migration & Relink</p>
                        <p className="text-xs text-muted-foreground">Chuyển cấp, cập nhật phân quyền, giữ nguyên history</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-subtle border border-primary/20 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">🚀 Trạng thái hiện tại</h4>
                    {getStatusBadge(entityData.autoTieringStatus)}
                  </div>
                  {isEligible ? (
                    <div className="space-y-2">
                      <p className="text-sm text-green-700">
                        ✅ Đã đủ điều kiện thăng cấp. Có thể khởi tạo workflow phê duyệt.
                      </p>
                      <Button className="w-full mt-3">
                        🚀 Khởi tạo đề xuất thăng cấp lên {entityData.nextTierTarget}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-amber-700">
                        ⏳ Chưa đủ điều kiện. Tiến độ hiện tại: {entityData.tieringProgress}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Dự kiến đạt ngưỡng trong {Math.ceil((100 - entityData.tieringProgress) / 10)} tháng nữa.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}