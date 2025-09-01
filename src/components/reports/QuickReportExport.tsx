import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import WordExportService from '@/utils/wordExport';
import { SupabaseService } from '@/lib/supabase';
import {
  Download,
  FileText,
  Search,
  Calendar,
  Building2,
  Filter,
  Eye,
  Loader2,
  CheckCircle,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';

interface QuickReportExportProps {
  companyId: number;
  companyName: string;
}

interface ReportSearchResult {
  id: string;
  module_id: string;
  company_id: number;
  report_data: any;
  status: string;
  submitted_by: string;
  submitted_at: string;
  version: number;
}

const reportModules = [
  { id: 'shareholders', name: '📌 Cổ đông', icon: Users },
  { id: 'business', name: '📊 Kinh doanh', icon: TrendingUp },
  { id: 'finance', name: '💰 Tài chính', icon: DollarSign },
  { id: 'hr', name: '👥 Nhân sự', icon: Users },
  { id: 'production', name: '🏭 Sản xuất', icon: Building2 },
  { id: 'marketing', name: '🎯 Marketing', icon: BarChart3 }
];

export function QuickReportExport({ companyId, companyName }: QuickReportExportProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [searchResults, setSearchResults] = useState<ReportSearchResult[]>([]);
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const { toast } = useToast();

  const handleQuickSearch = async () => {
    setIsSearching(true);
    try {
      // Simulate search from Supabase
      const results = await SupabaseService.searchCompanyReports({
        companyId,
        moduleId: selectedModule || undefined,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
        keyword: searchKeyword || undefined
      });
      
      setSearchResults(results);
      
      toast({
        title: "🔍 Tìm kiếm hoàn tất",
        description: `Tìm thấy ${results.length} báo cáo phù hợp`
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "❌ Lỗi tìm kiếm",
        description: "Không thể tìm kiếm báo cáo. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleExportReport = async (report: ReportSearchResult) => {
    setIsExporting(true);
    try {
      const moduleInfo = reportModules.find(m => m.id === report.module_id);
      
      // Create export data based on report type
      const exportData = {
        reportDate: new Date(report.submitted_at),
        reporterName: report.submitted_by,
        role: 'Nhân viên',
        project: companyName,
        department: moduleInfo?.name || 'Không xác định',
        dailyRevenue: report.report_data?.revenue || 0,
        contractsSigned: report.report_data?.contracts || 0,
        newCustomers: report.report_data?.newCustomers || 0,
        followUpCustomers: report.report_data?.followUpCustomers || 0,
        averageCustomerValue: report.report_data?.avgValue || 0,
        phoneCalls: report.report_data?.phoneCalls || 0,
        meetings: report.report_data?.meetings || 0,
        demos: report.report_data?.demos || 0,
        notes: report.report_data?.notes || 'Không có ghi chú',
        workStatus: report.status as 'completed' | 'in-progress' | 'delayed',
        delayReason: report.report_data?.delayReason || '',
        attachments: report.report_data?.attachments || []
      };

      await WordExportService.exportToWord(exportData, {
        template: 'standard',
        includeAttachments: true
      });

      toast({
        title: "📄 Xuất báo cáo thành công",
        description: `Báo cáo ${moduleInfo?.name} đã được tải xuống`
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "❌ Lỗi xuất báo cáo",
        description: "Không thể xuất báo cáo. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportAllReports = async () => {
    setIsExporting(true);
    try {
      for (const report of searchResults) {
        await handleExportReport(report);
        // Add small delay between exports
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      toast({
        title: "📄 Xuất tất cả báo cáo thành công",
        description: `Đã xuất ${searchResults.length} báo cáo`
      });
    } catch (error) {
      console.error('Bulk export error:', error);
      toast({
        title: "❌ Lỗi xuất báo cáo",
        description: "Có lỗi xảy ra khi xuất báo cáo hàng loạt.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Đã duyệt</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertCircle className="h-3 w-3 mr-1" />Chờ duyệt</Badge>;
      case 'draft':
        return <Badge variant="secondary"><FileText className="h-3 w-3 mr-1" />Nháp</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Tra cứu báo cáo nhanh - {companyName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="module">Phòng ban</Label>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả phòng ban" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tất cả phòng ban</SelectItem>
                  {reportModules.map((module) => (
                    <SelectItem key={module.id} value={module.id}>
                      {module.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="dateFrom">Từ ngày</Label>
              <Input
                id="dateFrom"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="dateTo">Đến ngày</Label>
              <Input
                id="dateTo"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="keyword">Từ khóa</Label>
              <Input
                id="keyword"
                placeholder="Tìm kiếm..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleQuickSearch} disabled={isSearching}>
              {isSearching ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Tìm kiếm
            </Button>
            
            {searchResults.length > 0 && (
              <Button variant="outline" onClick={handleExportAllReports} disabled={isExporting}>
                {isExporting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Xuất tất cả ({searchResults.length})
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Kết quả tìm kiếm ({searchResults.length} báo cáo)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {searchResults.map((report) => {
                const moduleInfo = reportModules.find(m => m.id === report.module_id);
                const ModuleIcon = moduleInfo?.icon || FileText;
                
                return (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <ModuleIcon className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{moduleInfo?.name || 'Không xác định'}</div>
                        <div className="text-sm text-muted-foreground">
                          Người gửi: {report.submitted_by} • 
                          Ngày: {new Date(report.submitted_at).toLocaleDateString('vi-VN')} • 
                          Phiên bản: {report.version}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getStatusBadge(report.status)}
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Xem
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <ModuleIcon className="h-5 w-5" />
                              Chi tiết báo cáo - {moduleInfo?.name}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div><strong>Người gửi:</strong> {report.submitted_by}</div>
                              <div><strong>Ngày gửi:</strong> {new Date(report.submitted_at).toLocaleDateString('vi-VN')}</div>
                              <div><strong>Trạng thái:</strong> {getStatusBadge(report.status)}</div>
                              <div><strong>Phiên bản:</strong> {report.version}</div>
                            </div>
                            <Separator />
                            <div>
                              <strong>Dữ liệu báo cáo:</strong>
                              <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto max-h-60">
                                {JSON.stringify(report.report_data, null, 2)}
                              </pre>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        size="sm" 
                        onClick={() => handleExportReport(report)}
                        disabled={isExporting}
                      >
                        {isExporting ? (
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4 mr-1" />
                        )}
                        Xuất
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
      
      {searchResults.length === 0 && !isSearching && (
        <Card>
          <CardContent className="text-center py-8">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Chưa có kết quả tìm kiếm</h3>
            <p className="text-muted-foreground">Sử dụng bộ lọc phía trên để tìm kiếm báo cáo</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default QuickReportExport;