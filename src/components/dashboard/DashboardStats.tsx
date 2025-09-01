import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { BarChart3, TrendingUp, TrendingDown, DollarSign, Users, Target, Activity } from "lucide-react";

interface DashboardStatsProps {
  companyId: string;
}

interface CompanyStats {
  revenue: {
    current: number;
    target: number;
    growth: number;
  };
  employees: {
    total: number;
    growth: number;
  };
  projects: {
    active: number;
    completed: number;
    success_rate: number;
  };
  performance: {
    efficiency: number;
    satisfaction: number;
    quality: number;
  };
}

const mockStats: { [key: string]: CompanyStats } = {
  default: {
    revenue: {
      current: 2500000000,
      target: 3000000000,
      growth: 15.2
    },
    employees: {
      total: 1250,
      growth: 8.5
    },
    projects: {
      active: 24,
      completed: 156,
      success_rate: 92.3
    },
    performance: {
      efficiency: 87.5,
      satisfaction: 91.2,
      quality: 94.8
    }
  }
};

export function DashboardStats({ companyId }: DashboardStatsProps) {
  const [stats, setStats] = useState<CompanyStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchStats = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats(mockStats[companyId] || mockStats.default);
      setLoading(false);
    };

    fetchStats();
  }, [companyId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-2 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Không có dữ liệu thống kê</p>
      </div>
    );
  }

  const revenueProgress = (stats.revenue.current / stats.revenue.target) * 100;

  return (
    <div className="space-y-6 text-white">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Doanh thu</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(stats.revenue.current / 1000000000).toFixed(1)}B VNĐ
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {stats.revenue.growth > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={stats.revenue.growth > 0 ? "text-green-500" : "text-red-500"}>
                {stats.revenue.growth > 0 ? "+" : ""}{stats.revenue.growth}%
              </span>
              <span>so với tháng trước</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="h-2 rounded-full transition-all"
                style={{ 
                  width: `${revenueProgress}%`,
                  backgroundColor: '#f97316'
                }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {revenueProgress.toFixed(1)}% mục tiêu năm
            </p>
          </CardContent>
        </Card>

        {/* Employees */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Nhân viên</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.employees.total.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+{stats.employees.growth}%</span>
              <span>tăng trưởng</span>
            </div>
          </CardContent>
        </Card>

        {/* Projects */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Dự án</CardTitle>
            <Target className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projects.active}</div>
            <p className="text-xs text-muted-foreground">
              {stats.projects.completed} hoàn thành
            </p>
            <div className="flex items-center space-x-2 text-xs mt-1">
              <Badge variant="secondary" className="text-xs">
                {stats.projects.success_rate}% thành công
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Efficiency */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Hiệu suất</CardTitle>
            <Activity className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.performance.efficiency}%</div>
            <p className="text-xs text-muted-foreground">Hiệu quả tổng thể</p>
            <div className="space-y-1 mt-2">
              <div className="flex justify-between text-xs">
                <span>Hài lòng</span>
                <span>{stats.performance.satisfaction}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="h-1 rounded-full transition-all"
                  style={{ 
                    width: `${stats.performance.satisfaction}%`,
                    backgroundColor: '#3b82f6'
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs">
                <span>Chất lượng</span>
                <span>{stats.performance.quality}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="h-1 rounded-full transition-all"
                  style={{ 
                    width: `${stats.performance.quality}%`,
                    backgroundColor: '#10b981'
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <BarChart3 className="h-5 w-5" />
              Biểu đồ Doanh thu
            </CardTitle>
            <CardDescription className="text-gray-400">
              Theo dõi doanh thu theo tháng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 p-4">
              <div className="flex items-end justify-between h-full space-x-2">
                {[2.1, 2.3, 2.0, 2.4, 2.5, 2.2, 2.6, 2.8, 2.4, 2.7, 2.5, 2.5].map((value, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full rounded-t transition-all cursor-pointer"
                      style={{ 
                        height: `${(value / 3) * 100}%`,
                        backgroundColor: '#3b82f6'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                      title={`Tháng ${index + 1}: ${value}B VNĐ`}
                    ></div>
                    <span className="text-xs text-muted-foreground mt-1">
                      T{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5" />
              Xu hướng KPI
            </CardTitle>
            <CardDescription className="text-gray-400">
              Các chỉ số hiệu suất chính
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 p-4 space-y-4">
              {[
                { name: 'Hiệu suất', value: stats.performance.efficiency, color: '#10b981' },
                { name: 'Hài lòng KH', value: stats.performance.satisfaction, color: '#3b82f6' },
                { name: 'Chất lượng', value: stats.performance.quality, color: '#8b5cf6' },
                { name: 'Doanh thu', value: (stats.revenue.current / stats.revenue.target) * 100, color: '#f97316' }
              ].map((kpi, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{kpi.name}</span>
                    <span className="text-muted-foreground">{kpi.value.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all"
                      style={{ 
                        width: `${Math.min(kpi.value, 100)}%`,
                        backgroundColor: kpi.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardStats;