import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  FileText, 
  Shield, 
  Gavel, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  BookOpen,
  Lock,
  Search,
  FileCheck,
  Scale,
  Users,
  Building2,
  FileSignature,
  Briefcase,
  TrendingUp,
  Eye,
  Calendar,
  MessageSquare,
  Download,
  Upload,
  Hash,
  Zap
} from "lucide-react";

interface LegalComplianceDetailViewProps {
  onBack: () => void;
}

export function LegalComplianceDetailView({ onBack }: LegalComplianceDetailViewProps) {
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
            <h1 className="text-3xl font-bold">⚖️ Pháp chế – Tuân thủ</h1>
            <p className="text-muted-foreground">
              Đảm bảo pháp lý & tuân thủ toàn hệ sinh thái, quản lý hợp đồng và rủi ro pháp lý BMC → F1 → F2 → F3 → F4 → F5
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="default" className="text-sm">
            🤖 AI Legal Agent
          </Badge>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Legal Docs
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* Enhanced Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tổng hợp đồng hệ thống</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">BMC: 2,847 | F1-F5: 10,000</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+15% vs tháng trước</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Sắp hết hạn cần gia hạn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">127</div>
            <p className="text-xs text-muted-foreground">BMC: 23 | F1: 31 | F2-F5: 73</p>
            <div className="flex items-center mt-2">
              <Clock className="h-3 w-3 text-orange-600 mr-1" />
              <span className="text-xs text-orange-600">47 trong 7 ngày</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tranh chấp & Rủi ro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">15</div>
            <p className="text-xs text-muted-foreground">Active: 5 | Monitoring: 10</p>
            <div className="flex items-center mt-2">
              <AlertTriangle className="h-3 w-3 text-red-600 mr-1" />
              <span className="text-xs text-red-600">2 vụ kiện nghiêm trọng</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Compliance Score Tổng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">96.7%</div>
            <p className="text-xs text-muted-foreground">BMC: 98% | F1-F5: 95.8%</p>
            <div className="flex items-center mt-2">
              <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">ISO 27001 certified</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">AI Legal Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">847</div>
            <p className="text-xs text-muted-foreground">Docs processed today</p>
            <div className="flex items-center mt-2">
              <Zap className="h-3 w-3 text-blue-600 mr-1" />
              <span className="text-xs text-blue-600">99.2% accuracy</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tiết kiệm chi phí</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">₫2.8B</div>
            <p className="text-xs text-muted-foreground">Saved by automation</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-purple-600 mr-1" />
              <span className="text-xs text-purple-600">67% cost reduction</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contracts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="contracts">Hợp đồng & Ký số</TabsTrigger>
          <TabsTrigger value="compliance">Tuân thủ & Compliance</TabsTrigger>
          <TabsTrigger value="risks">Rủi ro & Tranh chấp</TabsTrigger>
          <TabsTrigger value="workflow">Công việc Pháp chế</TabsTrigger>
          <TabsTrigger value="documents">Văn bản nội bộ</TabsTrigger>
          <TabsTrigger value="reports">Báo cáo Pháp lý</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
          {/* Organization Level Contract Distribution */}
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Phân bố Hợp đồng theo Cấp độ Tổ chức
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">BMC</div>
                    <div className="text-2xl font-bold">2,847</div>
                    <div className="text-xs text-muted-foreground">Strategic & M&A</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg">
                    <div className="text-lg font-bold text-green-600">F1</div>
                    <div className="text-2xl font-bold">3,421</div>
                    <div className="text-xs text-muted-foreground">Operational</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">F2</div>
                    <div className="text-2xl font-bold">2,893</div>
                    <div className="text-xs text-muted-foreground">Regional</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">F3</div>
                    <div className="text-2xl font-bold">2,156</div>
                    <div className="text-xs text-muted-foreground">Branch Level</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-950/20 dark:to-teal-900/20 rounded-lg">
                    <div className="text-lg font-bold text-teal-600">F4</div>
                    <div className="text-2xl font-bold">987</div>
                    <div className="text-xs text-muted-foreground">Local Operations</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20 rounded-lg">
                    <div className="text-lg font-bold text-pink-600">F5</div>
                    <div className="text-2xl font-bold">543</div>
                    <div className="text-xs text-muted-foreground">Project Specific</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Enhanced Business Contracts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Hợp đồng Kinh doanh & Thương mại
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Hợp đồng bán hàng (B2B)</span>
                    <Badge variant="outline" className="text-green-600">4,847</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pl-2 grid grid-cols-3 gap-1">
                    <span>BMC: 1,247</span>
                    <span>F1-F3: 2,890</span>
                    <span>F4-F5: 710</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Hợp đồng dịch vụ & Outsourcing</span>
                    <Badge variant="outline" className="text-blue-600">1,389</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pl-2">
                    <div>BMC: 289 | F1-F2: 890 | F3-F5: 210</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Franchise & Agency</span>
                    <Badge variant="outline" className="text-purple-600">456</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pl-2">Master agreements: 12</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">International Trade</span>
                    <Badge variant="outline" className="text-orange-600">167</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pl-2">Cross-border: 89</div>
                </div>

                <Button size="sm" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Business Contracts Hub
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Digital Signing & OCR */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSignature className="h-5 w-5" />
                  Ký số & AI Document Processing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">CA Digital Signature</span>
                    <Badge variant="outline" className="text-green-600">Active 100%</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pl-2">
                    BMC: VNPT-CA | F1-F5: FPT-CA, Viettel-CA
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Smart Contracts (Blockchain)</span>
                    <Badge variant="outline" className="text-blue-600">128 deployed</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pl-2">
                    Ethereum: 89 | BSC: 39
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">AI OCR Processing</span>
                    <Badge variant="outline" className="text-green-600">99.8% accuracy</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pl-2">
                    Processed: 28,847 docs/month
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Contract Templates AI</span>
                    <Badge variant="outline" className="text-purple-600">247 templates</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pl-2">
                    Auto-generation: 78% success
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <FileSignature className="h-4 w-4 mr-2" />
                  Digital Operations Center
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced HR & Labor Contracts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Hợp đồng Lao động & Nhân sự
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">HĐLĐ không thời hạn</span>
                    <Badge variant="outline" className="text-green-600">8,421</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pl-2 grid grid-cols-2 gap-1">
                    <span>C-Level: 47</span>
                    <span>Managers: 890</span>
                    <span>Staff: 6,284</span>
                    <span>Workers: 1,200</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">HĐLĐ có thời hạn</span>
                    <Badge variant="outline" className="text-orange-600">2,398</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pl-2">
                    Seasonal: 1,200 | Project: 890 | Temp: 308
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ESOP & Stock Options</span>
                    <Badge variant="outline" className="text-purple-600">147 agreements</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pl-2">
                    Vesting: 47 | Vested: 89 | Exercised: 11
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Consulting & Advisory</span>
                    <Badge variant="outline" className="text-blue-600">89 contracts</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pl-2">
                    External experts & Board advisors
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  HR Legal Management
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Investment & M&A */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Đầu tư, M&A & Partnerships
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Shareholder Agreements</span>
                    <Badge variant="outline" className="text-green-600">143 active</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pl-2">
                    BMC: 43 | F1: 28 | F2-F5: 72
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">M&A Documentation</span>
                    <Badge variant="outline" className="text-blue-600">28 deals</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pl-2">
                    Completed: 18 | Pipeline: 10
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Joint Ventures</span>
                    <Badge variant="outline" className="text-purple-600">15 partnerships</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pl-2">
                    International: 8 | Domestic: 7
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Strategic Alliances</span>
                    <Badge variant="outline" className="text-orange-600">47 MOUs</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pl-2">
                    Technology: 28 | Distribution: 19
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <Building2 className="h-4 w-4 mr-2" />
                  Strategic Legal Hub
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced AI Contract Analysis Dashboard */}
            <Card className="md:col-span-2 lg:col-span-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  AI Contract Intelligence & Risk Management System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">Urgent Renewals</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600">47</div>
                    <p className="text-sm text-muted-foreground">Expire trong 7 ngày</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs">BMC: 15 hợp đồng chiến lược</div>
                      <div className="text-xs">F1-F3: 32 hợp đồng vận hành</div>
                    </div>
                    <p className="text-xs text-red-600 mt-2 font-medium">🤖 AI: Auto-renewal được đề xuất cho 34 hợp đồng</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-lg border-l-4 border-orange-500">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Approval Pipeline</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">234</div>
                    <p className="text-sm text-muted-foreground">Chờ ký số & phê duyệt</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs">CEO approval: 12</div>
                      <div className="text-xs">Legal review: 89</div>
                      <div className="text-xs">Digital signing: 133</div>
                    </div>
                    <p className="text-xs text-orange-600 mt-2 font-medium">🤖 AI: Escalate 12 high-value contracts</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">AI Analysis Today</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">128</div>
                    <p className="text-sm text-muted-foreground">Contracts analyzed</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs">Risk flagged: 23 hợp đồng</div>
                      <div className="text-xs">Clauses optimized: 67</div>
                      <div className="text-xs">Cost saved: ₫890M</div>
                    </div>
                    <p className="text-xs text-blue-600 mt-2 font-medium">🤖 AI: 15 compliance issues detected</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Automation Success</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">78%</div>
                    <p className="text-sm text-muted-foreground">Process automation rate</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs">Templates: 247 active</div>
                      <div className="text-xs">Auto-draft: 189 contracts</div>
                      <div className="text-xs">Time saved: 2,340 hours</div>
                    </div>
                    <p className="text-xs text-green-600 mt-2 font-medium">🤖 AI: 89% accuracy in clause generation</p>
                  </div>
                </div>

                {/* AI Insights and Recommendations */}
                <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">🤖 AI Legal Intelligence Summary</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-purple-700 dark:text-purple-300">Risk Alerts:</p>
                      <ul className="list-disc list-inside text-purple-600 dark:text-purple-400 space-y-1">
                        <li>12 hợp đồng có điều khoản bất lợi mới phát hiện</li>
                        <li>F4 region có tỷ lệ tranh chấp tăng 23%</li>
                        <li>15 suppliers có thay đổi terms cần review</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-purple-700 dark:text-purple-300">Optimization Opportunities:</p>
                      <ul className="list-disc list-inside text-purple-600 dark:text-purple-400 space-y-1">
                        <li>Consolidate 89 similar contracts across F2-F3</li>
                        <li>Implement master agreements: save ₫1.2B annually</li>
                        <li>Auto-renewal cho 67% standard contracts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          {/* Compliance Overview by Organization Level */}
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Compliance Score Matrix - BMC → F1 → F2 → F3 → F4 → F5
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg">
                    <div className="text-lg font-bold text-green-600">BMC</div>
                    <div className="text-2xl font-bold">98.7%</div>
                    <div className="text-xs text-green-600">Excellent</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg">
                    <div className="text-lg font-bold text-green-600">F1</div>
                    <div className="text-2xl font-bold">97.2%</div>
                    <div className="text-xs text-green-600">Excellent</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg">
                    <div className="text-lg font-bold text-green-600">F2</div>
                    <div className="text-2xl font-bold">95.8%</div>
                    <div className="text-xs text-green-600">Good</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">F3</div>
                    <div className="text-2xl font-bold">94.1%</div>
                    <div className="text-xs text-orange-600">Acceptable</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">F4</div>
                    <div className="text-2xl font-bold">92.3%</div>
                    <div className="text-xs text-orange-600">Needs Attention</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 rounded-lg">
                    <div className="text-lg font-bold text-red-600">F5</div>
                    <div className="text-2xl font-bold">89.6%</div>
                    <div className="text-xs text-red-600">Action Required</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Enhanced Legal Compliance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Tuân thủ Pháp luật Việt Nam
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Luật Lao động 2019</span>
                      <Badge variant="outline" className="text-green-600">✓ 98.2%</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• HĐLĐ compliance: 100%</div>
                      <div>• Wage regulations: 99.1%</div>
                      <div>• Working hours: 97.8%</div>
                      <div>• Social insurance: 100%</div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Luật Thuế & Kế toán</span>
                      <Badge variant="outline" className="text-green-600">✓ 97.8%</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• VAT compliance: 99.2%</div>
                      <div>• CIT filings: 98.9%</div>
                      <div>• PIT compliance: 96.1%</div>
                      <div>• Transfer pricing: 95.4%</div>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">VSATTP & Quality</span>
                      <Badge variant="outline" className="text-orange-600">Pending 89%</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Food safety (F2-F3): 89.2%</div>
                      <div>• Product quality: 91.8%</div>
                      <div>• Certifications needed: 23</div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Luật Chứng khoán</span>
                      <Badge variant="outline" className="text-blue-600">✓ 96.7%</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Public disclosure: 98.9%</div>
                      <div>• Insider trading: 100%</div>
                      <div>• Related party: 94.2%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Security & Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Bảo mật & Quyền riêng tư
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">GDPR Compliance</span>
                      <Badge variant="outline" className="text-green-600">98.4%</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Data mapping: Complete</div>
                      <div>• Consent management: 99.1%</div>
                      <div>• Data breach protocol: Active</div>
                      <div>• DPO assigned: ✓</div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">ISO 27001 (ISMS)</span>
                      <Badge variant="outline" className="text-green-600">✓ Certified</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Security policies: 147 active</div>
                      <div>• Risk assessments: Quarterly</div>
                      <div>• Incident response: 99.8%</div>
                      <div>• Next audit: Q2 2024</div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Cybersecurity Law VN</span>
                      <Badge variant="outline" className="text-blue-600">Under Review</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Data localization: 94.2%</div>
                      <div>• Network security: 97.8%</div>
                      <div>• Incident reporting: Active</div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Banking & Fintech</span>
                      <Badge variant="outline" className="text-green-600">✓ Compliant</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• AML/KYC: 99.7%</div>
                      <div>• PCI DSS: Level 1</div>
                      <div>• SBV regulations: 98.9%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Industry-Specific Compliance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5" />
                  Tuân thủ theo Ngành nghề
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Manufacturing (F2-F4)</span>
                      <Badge variant="outline" className="text-green-600">✓ 96.1%</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Environmental: 97.8%</div>
                      <div>• Work safety: 98.9%</div>
                      <div>• Product standards: 93.2%</div>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Healthcare & Pharma</span>
                      <Badge variant="outline" className="text-orange-600">92.4%</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• GMP compliance: 89.7%</div>
                      <div>• Drug registration: 94.1%</div>
                      <div>• Clinical trials: 95.8%</div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Financial Services</span>
                      <Badge variant="outline" className="text-blue-600">✓ 98.7%</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Basel III: 99.2%</div>
                      <div>• Risk management: 98.9%</div>
                      <div>• Customer protection: 97.8%</div>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Technology & Data</span>
                      <Badge variant="outline" className="text-purple-600">✓ 97.3%</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Data protection: 98.4%</div>
                      <div>• IP compliance: 96.7%</div>
                      <div>• Export controls: 97.1%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          {/* Risk Overview by Organization Level */}
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Distribution Matrix - BMC → F1 → F2 → F3 → F4 → F5
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg">
                    <div className="text-lg font-bold text-green-600">BMC</div>
                    <div className="text-2xl font-bold">Low</div>
                    <div className="text-xs text-green-600">2 active risks</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg">
                    <div className="text-lg font-bold text-green-600">F1</div>
                    <div className="text-2xl font-bold">Low</div>
                    <div className="text-xs text-green-600">3 active risks</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">F2</div>
                    <div className="text-2xl font-bold">Medium</div>
                    <div className="text-xs text-orange-600">5 active risks</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">F3</div>
                    <div className="text-2xl font-bold">Medium</div>
                    <div className="text-xs text-orange-600">7 active risks</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 rounded-lg">
                    <div className="text-lg font-bold text-red-600">F4</div>
                    <div className="text-2xl font-bold">High</div>
                    <div className="text-xs text-red-600">12 active risks</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 rounded-lg">
                    <div className="text-lg font-bold text-red-600">F5</div>
                    <div className="text-2xl font-bold">High</div>
                    <div className="text-xs text-red-600">8 active risks</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Enhanced Legal Disputes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Tranh chấp & Kiện tụng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Tranh chấp hợp đồng thương mại</span>
                      <Badge variant="outline" className="text-red-600">5 cases</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• BMC vs. Supplier X: ₫2.8B (Court)</div>
                      <div>• F2 contract breach: ₫890M (Arbitration)</div>
                      <div>• F3 delivery disputes: 3 cases</div>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Khiếu nại lao động</span>
                      <Badge variant="outline" className="text-orange-600">8 cases</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Wrongful termination: 3 cases</div>
                      <div>• Wage disputes: 2 cases</div>
                      <div>• Work condition: 3 cases</div>
                    </div>
                  </div>

                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">IP & Copyright disputes</span>
                      <Badge variant="outline" className="text-yellow-600">2 cases</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Patent infringement claims pending
                    </div>
                  </div>

                  </div>

                <Button size="sm" className="w-full">
                  <Scale className="h-4 w-4 mr-2" />
                  Case Management System
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Legal Risks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Rủi ro Pháp lý theo Mức độ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border-l-4 border-red-500">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-red-700">Critical Risk</span>
                      <Badge variant="outline" className="text-red-600">3 issues</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Tax audit F4: Potential ₫1.2B fine</div>
                      <div>• Environmental compliance F2</div>
                      <div>• Securities disclosure deadline</div>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border-l-4 border-orange-500">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-orange-700">High Risk</span>
                      <Badge variant="outline" className="text-orange-600">12 issues</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• New regulation compliance: 7</div>
                      <div>• Contract renewal delays: 3</div>
                      <div>• GDPR data breaches: 2</div>
                    </div>
                  </div>

                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border-l-4 border-yellow-500">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-yellow-700">Medium Risk</span>
                      <Badge variant="outline" className="text-yellow-600">23 issues</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Monitoring various compliance areas
                    </div>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Risk Assessment Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced AI Legal Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  AI Legal Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-700">Today's AI Analysis</span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Contracts scanned: 247</div>
                      <div>• Risk flags detected: 23</div>
                      <div>• Clauses optimized: 67</div>
                      <div>• Compliance issues: 15</div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-700">Success Rate</span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Prediction accuracy: 97.8%</div>
                      <div>• False positives: &lt;2%</div>
                      <div>• Time saved: 2,340 hours</div>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="font-medium text-purple-700 mb-1">🤖 AI Recommendations</div>
                    <div className="text-xs text-purple-600 space-y-1">
                      <div>• Review F4 tax compliance urgently</div>
                      <div>• Update 15 contract templates</div>
                      <div>• Implement auto-renewal for 89 contracts</div>
                    </div>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  AI Contract Intelligence
                </Button>
              </CardContent>
            </Card>

            {/* Regulatory Monitoring */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Giám sát Quy định Pháp lý
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="font-medium text-blue-700 mb-2">New Regulations (Last 30 days)</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Circular 03/2024/TT-BTC (Tax)</div>
                      <div>• Decree 15/2024/NĐ-CP (Labor)</div>
                      <div>• Decision 247/QĐ-TTg (Environment)</div>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <div className="font-medium text-orange-700 mb-2">Impact Assessment</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• High impact: 3 regulations</div>
                      <div>• Medium impact: 7 regulations</div>
                      <div>• Compliance timeline: 30-90 days</div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="font-medium text-green-700 mb-2">Compliance Action Plan</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Updated policies: 15</div>
                      <div>• Training scheduled: 8 sessions</div>
                      <div>• System updates: 5 completed</div>
                    </div>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Regulatory Monitoring
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-4">
          {/* Legal Workflow Overview */}
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Legal Workflow Performance - BMC → F1 → F2 → F3 → F4 → F5
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">Pending Tasks</div>
                    <div className="text-3xl font-bold">234</div>
                    <div className="text-xs text-muted-foreground">Across all levels</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg">
                    <div className="text-lg font-bold text-green-600">Completed Today</div>
                    <div className="text-3xl font-bold">89</div>
                    <div className="text-xs text-muted-foreground">+15% vs yesterday</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">Overdue</div>
                    <div className="text-3xl font-bold">12</div>
                    <div className="text-xs text-muted-foreground">Needs attention</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">Automation Rate</div>
                    <div className="text-3xl font-bold">67%</div>
                    <div className="text-xs text-muted-foreground">AI-assisted tasks</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Contract Management Workflow */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Quy trình Quản lý Hợp đồng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div>
                      <div className="font-medium">Draft & Review</div>
                      <div className="text-xs text-muted-foreground">AI-assisted drafting</div>
                    </div>
                    <Badge variant="outline" className="text-blue-600">89 active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <div>
                      <div className="font-medium">Legal Approval</div>
                      <div className="text-xs text-muted-foreground">Multi-level approval</div>
                    </div>
                    <Badge variant="outline" className="text-orange-600">45 pending</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div>
                      <div className="font-medium">Digital Signing</div>
                      <div className="text-xs text-muted-foreground">CA certificate</div>
                    </div>
                    <Badge variant="outline" className="text-purple-600">23 ready</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div>
                      <div className="font-medium">Archive & Monitor</div>
                      <div className="text-xs text-muted-foreground">AI monitoring</div>
                    </div>
                    <Badge variant="outline" className="text-green-600">12,847 active</Badge>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="text-sm font-medium mb-2">Performance Metrics</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Average processing time</span>
                      <span className="text-green-600">4.2 days (-23%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>AI automation rate</span>
                      <span className="text-blue-600">78% (+12%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Error rate</span>
                      <span className="text-orange-600">0.8% (-15%)</span>
                    </div>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Contract Workflow Hub
                </Button>
              </CardContent>
            </Card>

            {/* Compliance Workflow */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Quy trình Tuân thủ Pháp lý
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div>
                      <div className="font-medium">Regulatory Monitoring</div>
                      <div className="text-xs text-muted-foreground">AI-powered scanning</div>
                    </div>
                    <Badge variant="outline" className="text-blue-600">24/7 active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <div>
                      <div className="font-medium">Impact Assessment</div>
                      <div className="text-xs text-muted-foreground">Cross-organization</div>
                    </div>
                    <Badge variant="outline" className="text-orange-600">15 pending</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div>
                      <div className="font-medium">Policy Updates</div>
                      <div className="text-xs text-muted-foreground">Auto-deployment</div>
                    </div>
                    <Badge variant="outline" className="text-purple-600">8 in progress</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div>
                      <div className="font-medium">Compliance Validation</div>
                      <div className="text-xs text-muted-foreground">Automated testing</div>
                    </div>
                    <Badge variant="outline" className="text-green-600">96.7% score</Badge>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="text-sm font-medium mb-2">Compliance KPIs</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Regulation updates tracked</span>
                      <span className="text-blue-600">1,247 this year</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Policy deployment time</span>
                      <span className="text-green-600">2.1 days (-45%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compliance violations</span>
                      <span className="text-red-600">3 (critical)</span>
                    </div>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Compliance Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Legal Team Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Hiệu suất Đội ngũ Pháp chế
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div>
                      <div className="font-medium">Legal Counsels</div>
                      <div className="text-xs text-muted-foreground">BMC + F1 specialists</div>
                    </div>
                    <Badge variant="outline" className="text-blue-600">28 lawyers</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div>
                      <div className="font-medium">Paralegals</div>
                      <div className="text-xs text-muted-foreground">F2-F5 support staff</div>
                    </div>
                    <Badge variant="outline" className="text-green-600">67 staff</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div>
                      <div className="font-medium">External Counsel</div>
                      <div className="text-xs text-muted-foreground">Specialized cases</div>
                    </div>
                    <Badge variant="outline" className="text-purple-600">15 firms</Badge>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="text-sm font-medium mb-2">Team Performance</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Case resolution rate</span>
                      <span className="text-green-600">89.2% (+8%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Client satisfaction</span>
                      <span className="text-blue-600">94.5% (internal)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Training completion</span>
                      <span className="text-green-600">97.8%</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="text-sm font-medium mb-2">🤖 AI Legal Assistant Usage</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Daily AI queries</span>
                      <span className="text-blue-600">2,847 queries</span>
                    </div>
                    <div className="flex justify-between">
                      <span>AI accuracy rate</span>
                      <span className="text-green-600">97.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time saved</span>
                      <span className="text-purple-600">15.6 hours/day</span>
                    </div>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Team Management
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          {/* Document Management Overview */}
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Hệ thống Quản lý Văn bản Pháp lý - BMC → F1 → F2 → F3 → F4 → F5
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">Total Documents</div>
                    <div className="text-3xl font-bold">45,847</div>
                    <div className="text-xs text-muted-foreground">All legal docs</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg">
                    <div className="text-lg font-bold text-green-600">Corporate Docs</div>
                    <div className="text-3xl font-bold">8,234</div>
                    <div className="text-xs text-muted-foreground">Governance</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">IP Portfolio</div>
                    <div className="text-3xl font-bold">1,847</div>
                    <div className="text-xs text-muted-foreground">Patents, TM</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">Templates</div>
                    <div className="text-3xl font-bold">847</div>
                    <div className="text-xs text-muted-foreground">AI-powered</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-950/20 dark:to-teal-900/20 rounded-lg">
                    <div className="text-lg font-bold text-teal-600">Digital Rate</div>
                    <div className="text-3xl font-bold">98.7%</div>
                    <div className="text-xs text-muted-foreground">Digitized</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Enhanced Corporate Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Văn bản Pháp lý Nội bộ & Quản trị
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Điều lệ Công ty</span>
                      <Badge variant="outline" className="text-green-600">Current v5.2</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• BMC Charter: Updated Q4/2023</div>
                      <div>• F1-F3 Articles: 28 subsidiaries</div>
                      <div>• Amendment history: 15 versions</div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Quy chế Nội bộ</span>
                      <Badge variant="outline" className="text-blue-600">147 policies</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Corporate governance: 25 policies</div>
                      <div>• Financial management: 34 policies</div>
                      <div>• HR & Operations: 88 policies</div>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Board Resolutions</span>
                      <Badge variant="outline" className="text-purple-600">289 docs</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Board decisions: 156</div>
                      <div>• Shareholder resolutions: 89</div>
                      <div>• Management appointments: 44</div>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Legal Opinions & Memos</span>
                      <Badge variant="outline" className="text-orange-600">1,847 docs</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Internal opinions: 1,234</div>
                      <div>• External counsel: 456</div>
                      <div>• Regulatory interpretations: 157</div>
                    </div>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Corporate Document Library
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Intellectual Property */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5" />
                  Sở hữu Trí tuệ & Thương hiệu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Nhãn hiệu & Thương hiệu</span>
                      <Badge variant="outline" className="text-green-600">147 active</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Vietnamese trademarks: 89</div>
                      <div>• International (Madrid): 34</div>
                      <div>• Regional filings: 24</div>
                      <div>• Renewal pipeline: 15</div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Patents & Innovations</span>
                      <Badge variant="outline" className="text-blue-600">67 portfolio</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Granted patents: 34</div>
                      <div>• Pending applications: 23</div>
                      <div>• Utility models: 10</div>
                      <div>• PCT filings: 8</div>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Copyrights & Trade Secrets</span>
                      <Badge variant="outline" className="text-purple-600">456 items</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Software copyrights: 234</div>
                      <div>• Creative works: 156</div>
                      <div>• Trade secrets database: 66</div>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Domain & Digital Assets</span>
                      <Badge variant="outline" className="text-orange-600">89 domains</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Primary domains: 28</div>
                      <div>• Defensive registrations: 45</div>
                      <div>• Social media handles: 16</div>
                    </div>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <FileCheck className="h-4 w-4 mr-2" />
                  IP Portfolio Management
                </Button>
              </CardContent>
            </Card>

            {/* Document Automation & AI */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  AI Document Automation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border-l-4 border-blue-500">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Smart Templates</span>
                      <Badge variant="outline" className="text-blue-600">847 active</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Contract templates: 234</div>
                      <div>• Legal forms: 345</div>
                      <div>• Compliance checklists: 156</div>
                      <div>• Policy templates: 112</div>
                    </div>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border-l-4 border-green-500">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">AI Document Analysis</span>
                      <Badge variant="outline" className="text-green-600">99.2% accuracy</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Documents processed: 28,847/month</div>
                      <div>• Clause extraction: 15,234</div>
                      <div>• Risk assessment: 4,567</div>
                      <div>• Compliance check: 8,946</div>
                    </div>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 rounded-lg border-l-4 border-purple-500">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Workflow Automation</span>
                      <Badge variant="outline" className="text-purple-600">78% automated</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Auto-routing: 2,340 docs/day</div>
                      <div>• Approval workflows: 156 active</div>
                      <div>• Version control: 100% tracked</div>
                      <div>• Digital signatures: 89% adoption</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="text-sm font-medium mb-2">🤖 AI Performance Metrics</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Processing speed</span>
                      <span className="text-green-600">47x faster than manual</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Error reduction</span>
                      <span className="text-blue-600">89% fewer mistakes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost savings</span>
                      <span className="text-purple-600">₫2.8B annually</span>
                    </div>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  AI Document Center
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          {/* Legal Reports Overview */}
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Legal Intelligence Dashboard - BMC → F1 → F2 → F3 → F4 → F5
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">Reports Generated</div>
                    <div className="text-3xl font-bold">2,847</div>
                    <div className="text-xs text-muted-foreground">This month</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg">
                    <div className="text-lg font-bold text-green-600">Compliance Score</div>
                    <div className="text-3xl font-bold">96.7%</div>
                    <div className="text-xs text-muted-foreground">+2.3% vs last month</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">Risk Exposure</div>
                    <div className="text-3xl font-bold">₫2.1B</div>
                    <div className="text-xs text-muted-foreground">Potential liability</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">AI Insights</div>
                    <div className="text-3xl font-bold">1,234</div>
                    <div className="text-xs text-muted-foreground">Recommendations</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Executive Legal Summary */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Executive Legal Summary & Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Key Legal Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg">
                      <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Contract Performance</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Active Contracts</span>
                          <span className="font-medium">12,847</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Contract Value</span>
                          <span className="font-medium">₫89.2B</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Renewal Rate</span>
                          <span className="font-medium text-green-600">94.7%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dispute Rate</span>
                          <span className="font-medium text-orange-600">0.12%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg">
                      <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">Compliance Status</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Overall Score</span>
                          <span className="font-medium">96.7%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Critical Issues</span>
                          <span className="font-medium text-red-600">3</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Resolved This Month</span>
                          <span className="font-medium text-green-600">47</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Training Completion</span>
                          <span className="font-medium">97.8%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg">
                      <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Legal Operations</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Team Efficiency</span>
                          <span className="font-medium">89.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cost per Case</span>
                          <span className="font-medium">₫2.8M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>AI Automation</span>
                          <span className="font-medium text-blue-600">78%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>External Spend</span>
                          <span className="font-medium">₫890M</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI-Powered Executive Insights */}
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg border-l-4 border-indigo-500">
                    <h4 className="font-medium text-indigo-800 dark:text-indigo-200 mb-3">🤖 AI Executive Intelligence Summary</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-indigo-700 dark:text-indigo-300 mb-2">Critical Actions Required:</p>
                        <ul className="list-disc list-inside text-indigo-600 dark:text-indigo-400 space-y-1">
                          <li>F4 tax audit response due in 5 days (₫1.2B exposure)</li>
                          <li>15 high-value contracts expiring this week</li>
                          <li>GDPR compliance gap in F5 subsidiaries</li>
                          <li>Securities filing deadline approaching (3 days)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-indigo-700 dark:text-indigo-300 mb-2">Strategic Opportunities:</p>
                        <ul className="list-disc list-inside text-indigo-600 dark:text-indigo-400 space-y-1">
                          <li>Consolidate 89 similar contracts: save ₫1.2B annually</li>
                          <li>Implement AI contract review: 67% faster processing</li>
                          <li>Master service agreements across F2-F3</li>
                          <li>IP monetization opportunities: 23 patents</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Legal Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Legal Analytics & Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Contract Volume Trends</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Q4 2023</span>
                        <span className="text-green-600">+15% growth</span>
                      </div>
                      <div className="flex justify-between">
                        <span>High-value contracts (&gt;₫100M)</span>
                        <span>247 active</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Digital signature adoption</span>
                        <span className="text-blue-600">89.2%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <h5 className="font-medium text-orange-800 dark:text-orange-200 mb-2">Risk & Dispute Analysis</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Active disputes</span>
                        <span className="text-red-600">15 cases</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average resolution time</span>
                        <span>127 days (-23%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Success rate</span>
                        <span className="text-green-600">89.2%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Compliance Performance</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Regulatory updates tracked</span>
                        <span>1,247 this year</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Policy deployment time</span>
                        <span className="text-green-600">2.1 days (-45%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Audit findings closed</span>
                        <span>94.7%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Detailed Analytics
                </Button>
              </CardContent>
            </Card>

            {/* AI Recommendations & Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  AI Legal Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-3 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 rounded-lg border-l-4 border-red-500">
                    <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">🚨 Urgent Actions</h5>
                    <div className="space-y-2 text-xs">
                      <div className="p-2 bg-white dark:bg-red-950/30 rounded">
                        <div className="font-medium">Tax Audit Response (F4)</div>
                        <div className="text-muted-foreground">Due: 5 days | Risk: ₫1.2B</div>
                      </div>
                      <div className="p-2 bg-white dark:bg-red-950/30 rounded">
                        <div className="font-medium">Securities Filing</div>
                        <div className="text-muted-foreground">Due: 3 days | Regulatory</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg border-l-4 border-blue-500">
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">💡 Process Optimization</h5>
                    <div className="space-y-2 text-xs">
                      <div className="p-2 bg-white dark:bg-blue-950/30 rounded">
                        <div className="font-medium">Contract Consolidation</div>
                        <div className="text-muted-foreground">Save ₫1.2B annually</div>
                      </div>
                      <div className="p-2 bg-white dark:bg-blue-950/30 rounded">
                        <div className="font-medium">AI Review Implementation</div>
                        <div className="text-muted-foreground">67% faster processing</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg border-l-4 border-green-500">
                    <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">📈 Growth Opportunities</h5>
                    <div className="space-y-2 text-xs">
                      <div className="p-2 bg-white dark:bg-green-950/30 rounded">
                        <div className="font-medium">IP Monetization</div>
                        <div className="text-muted-foreground">23 patents ready</div>
                      </div>
                      <div className="p-2 bg-white dark:bg-green-950/30 rounded">
                        <div className="font-medium">Master Agreements</div>
                        <div className="text-muted-foreground">F2-F3 standardization</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  AI Recommendations Hub
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}