import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export interface KPIData {
  id: string;
  title: string;
  value: number;
  unit: string;
  target?: number;
  previousValue?: number;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  chartType: 'line' | 'area' | 'bar' | 'pie' | 'progress';
  chartData?: any[];
  aiInsight?: {
    summary: string;
    recommendation: string;
    confidence: number;
  };
  category: 'revenue' | 'performance' | 'efficiency' | 'quality' | 'growth';
}

interface KPICardProps {
  data: KPIData;
  size?: 'small' | 'medium' | 'large';
  showChart?: boolean;
  showAIInsight?: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ 
  data, 
  size = 'medium', 
  showChart = true, 
  showAIInsight = true 
}) => {
  const getTrendIcon = () => {
    switch (data.trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (data.status) {
      case 'excellent':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'good':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (data.status) {
      case 'excellent':
        return <CheckCircle className="w-4 h-4" />;
      case 'good':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'critical':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString();
  };

  const renderChart = () => {
    if (!showChart || !data.chartData) return null;

    const chartHeight = size === 'small' ? 80 : size === 'medium' ? 120 : 160;

    switch (data.chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart data={data.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <AreaChart data={data.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={data.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart>
              <Pie
                data={data.chartData}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={40}
                paddingAngle={5}
                dataKey="value"
              >
                {data.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'progress':
        const progressValue = data.target ? (data.value / data.target) * 100 : 0;
        return (
          <div className="space-y-2">
            <Progress value={progressValue} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatValue(data.value)} {data.unit}</span>
              {data.target && <span>Mục tiêu: {formatValue(data.target)} {data.unit}</span>}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const cardSize = {
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6'
  };

  return (
    <Card className={`${cardSize[size]} hover:shadow-lg transition-shadow duration-200`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className={`${size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg'} font-medium text-gray-700`}>
            {data.title}
          </CardTitle>
          <Badge className={`${getStatusColor()} flex items-center gap-1`}>
            {getStatusIcon()}
            <span className="capitalize">{data.status}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main Value */}
        <div className="flex items-center justify-between">
          <div>
            <div className={`${size === 'small' ? 'text-xl' : size === 'medium' ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900`}>
              {formatValue(data.value)} <span className="text-sm font-normal text-gray-500">{data.unit}</span>
            </div>
            {data.previousValue && (
              <div className="flex items-center gap-1 mt-1">
                {getTrendIcon()}
                <span className={`text-sm ${
                  data.trend === 'up' ? 'text-green-600' : 
                  data.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {data.trendPercentage > 0 ? '+' : ''}{data.trendPercentage.toFixed(1)}%
                </span>
                <span className="text-xs text-gray-500">so với kỳ trước</span>
              </div>
            )}
          </div>
        </div>

        {/* Chart */}
        {renderChart()}

        {/* AI Insight */}
        {showAIInsight && data.aiInsight && (
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-blue-700">AI Insight</span>
              <Badge variant="outline" className="text-xs">
                {data.aiInsight.confidence}% tin cậy
              </Badge>
            </div>
            <p className="text-xs text-blue-800 mb-2">{data.aiInsight.summary}</p>
            {data.aiInsight.recommendation && (
              <p className="text-xs text-blue-700 font-medium">
                💡 {data.aiInsight.recommendation}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KPICard;