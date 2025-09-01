import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import KPICard, { KPIData } from './KPICard';
import { useAuth } from '@/contexts/AuthContext';
import { useKPIUpdates } from '@/hooks/useRealtime';
import { realtimeService } from '@/services/realtimeService';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target, 
  BarChart3, 
  PieChart, 
  Activity,
  RefreshCw,
  Filter,
  Download,
  Calendar
} from 'lucide-react';

interface KPIDashboardProps {
  level: 'personal' | 'department' | 'company' | 'group';
  departmentId?: string;
  companyId?: string;
}

const KPIDashboard: React.FC<KPIDashboardProps> = ({ level, departmentId, companyId }) => {
  const { user, hasPermission } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [kpiData, setKpiData] = useState<KPIData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { kpiUpdates } = useKPIUpdates(level, departmentId || companyId);

  // Mock KPI data generator
  const generateMockKPIData = (): KPIData[] => {
    const baseData: Partial<KPIData>[] = [
      {
        id: 'revenue',
        title: 'Doanh thu',
        category: 'revenue',
        unit: 'VNĐ',
        chartType: 'area',
        status: 'good'
      },
      {
        id: 'profit',
        title: 'Lợi nhuận',
        category: 'revenue',
        unit: 'VNĐ',
        chartType: 'line',
        status: 'excellent'
      },
      {
        id: 'customers',
        title: 'Khách hàng mới',
        category: 'growth',
        unit: 'người',
        chartType: 'bar',
        status: 'good'
      },
      {
        id: 'satisfaction',
        title: 'Hài lòng khách hàng',
        category: 'quality',
        unit: '%',
        chartType: 'progress',
        status: 'excellent'
      },
      {
        id: 'efficiency',
        title: 'Hiệu suất làm việc',
        category: 'efficiency',
        unit: '%',
        chartType: 'line',
        status: 'warning'
      },
      {
        id: 'projects',
        title: 'Dự án hoàn thành',
        category: 'performance',
        unit: 'dự án',
        chartType: 'bar',
        status: 'good'
      }
    ];

    return baseData.map((item, index) => {
      const value = Math.floor(Math.random() * 1000000) + 100000;
      const previousValue = value * (0.8 + Math.random() * 0.4);
      const trendPercentage = ((value - previousValue) / previousValue) * 100;
      
      // Generate chart data
      const chartData = Array.from({ length: 12 }, (_, i) => ({
        name: `T${i + 1}`,
        value: Math.floor(Math.random() * value * 0.5) + value * 0.5
      }));

      return {
        ...item,
        value,
        previousValue,
        target: item.category === 'quality' || item.category === 'efficiency' ? 100 : value * 1.2,
        trend: trendPercentage > 5 ? 'up' : trendPercentage < -5 ? 'down' : 'stable',
        trendPercentage,
        chartData,
        aiInsight: {
          summary: `${item.title} đang có xu hướng ${trendPercentage > 0 ? 'tăng' : 'giảm'} ${Math.abs(trendPercentage).toFixed(1)}% so với kỳ trước.`,
          recommendation: trendPercentage < 0 ? 
            `Cần tập trung cải thiện ${item.title?.toLowerCase()} trong thời gian tới.` :
            `Duy trì và phát huy xu hướng tích cực của ${item.title?.toLowerCase()}.`,
          confidence: Math.floor(Math.random() * 20) + 80
        }
      } as KPIData;
    });
  };

  useEffect(() => {
    const loadKPIData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data = generateMockKPIData();
      setKpiData(data);
      setLastUpdated(new Date());
      setLoading(false);
    };

    loadKPIData();
  }, [level, departmentId, companyId, selectedPeriod]);

  // Update KPI data when realtime updates are received
  useEffect(() => {
    if (kpiUpdates.length > 0) {
      const latestUpdate = kpiUpdates[0];
      if (latestUpdate.data.kpiData) {
        setKpiData(latestUpdate.data.kpiData);
        setLastUpdated(new Date(latestUpdate.timestamp));
      }
    }
  }, [kpiUpdates]);

  const filteredKPIData = selectedCategory === 'all' 
    ? kpiData 
    : kpiData.filter(item => item.category === selectedCategory);

  const handleRefresh = async () => {
    const data = generateMockKPIData();
    setKpiData(data);
    setLastUpdated(new Date());
    
    // Publish KPI update to realtime
    if (user?.id) {
      try {
        await realtimeService.publishKPIUpdate(
          {
            kpiData: data,
            period: selectedPeriod,
            updatedBy: user.name
          },
          level,
          user.id,
          departmentId || companyId
        );
      } catch (error) {
        console.error('Failed to publish KPI update:', error);
      }
    }
  };

  const getLevelTitle = () => {
    switch (level) {
      case 'personal': return 'KPI Cá nhân';
      case 'department': return 'KPI Phòng ban';
      case 'company': return 'KPI Công ty';
      case 'group': return 'KPI Tập đoàn';
      default: return 'KPI Dashboard';
    }
  };

  const getOverallStatus = () => {
    const excellentCount = filteredKPIData.filter(item => item.status === 'excellent').length;
    const goodCount = filteredKPIData.filter(item => item.status === 'good').length;
    const warningCount = filteredKPIData.filter(item => item.status === 'warning').length;
    const criticalCount = filteredKPIData.filter(item => item.status === 'critical').length;

    if (criticalCount > 0) return { status: 'critical', color: 'text-red-600', bg: 'bg-red-50' };
    if (warningCount > goodCount + excellentCount) return { status: 'warning', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (excellentCount > goodCount) return { status: 'excellent', color: 'text-green-600', bg: 'bg-green-50' };
    return { status: 'good', color: 'text-blue-600', bg: 'bg-blue-50' };
  };

  const overallStatus = getOverallStatus();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">Đang tải dữ liệu KPI...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{getLevelTitle()}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Cập nhật lần cuối: {lastUpdated.toLocaleString('vi-VN')}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="quarter">Quý này</SelectItem>
              <SelectItem value="year">Năm này</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-36">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="revenue">Doanh thu</SelectItem>
              <SelectItem value="performance">Hiệu suất</SelectItem>
              <SelectItem value="efficiency">Hiệu quả</SelectItem>
              <SelectItem value="quality">Chất lượng</SelectItem>
              <SelectItem value="growth">Tăng trưởng</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Làm mới
          </Button>
          
          {hasPermission('export_reports') && (
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button>
          )}
        </div>
      </div>

      {/* Overall Status */}
      <Card className={`${overallStatus.bg} border-l-4 ${overallStatus.color.replace('text-', 'border-')}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Tổng quan hiệu suất</h3>
              <p className={`text-sm ${overallStatus.color} font-medium`}>
                Trạng thái: <span className="capitalize">{overallStatus.status}</span>
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {filteredKPIData.filter(item => item.status === 'excellent').length}
                </div>
                <div className="text-gray-600">Xuất sắc</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {filteredKPIData.filter(item => item.status === 'good').length}
                </div>
                <div className="text-gray-600">Tốt</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-600">
                  {filteredKPIData.filter(item => item.status === 'warning').length}
                </div>
                <div className="text-gray-600">Cảnh báo</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">
                  {filteredKPIData.filter(item => item.status === 'critical').length}
                </div>
                <div className="text-gray-600">Nghiêm trọng</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredKPIData.map((kpi) => (
          <KPICard 
            key={kpi.id} 
            data={kpi} 
            size="medium"
            showChart={true}
            showAIInsight={true}
          />
        ))}
      </div>

      {filteredKPIData.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <BarChart3 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không có dữ liệu KPI</h3>
            <p className="text-gray-500">Chưa có dữ liệu KPI cho bộ lọc đã chọn.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KPIDashboard;