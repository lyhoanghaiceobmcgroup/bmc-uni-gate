import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ProcessedReport } from '@/services/aiAgent';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Target,
  BarChart3,
  Lightbulb
} from 'lucide-react';

interface AIInsightsProps {
  processedReport: ProcessedReport;
  className?: string;
}

export const AIInsights: React.FC<AIInsightsProps> = ({ processedReport, className = '' }) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'danger': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            AI Insights & Analysis
          </CardTitle>
          <CardDescription>
            Phân tích tự động từ AI Agent cho báo cáo #{processedReport.id}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* AI Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tóm tắt AI</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{processedReport.aiInsights}</p>
          
          <div className="mt-4 flex items-center gap-4">
            <Badge className={`${getRiskColor(processedReport.riskLevel || 'low')} border`}>
              Rủi ro: {processedReport.riskLevel?.toUpperCase()}
            </Badge>
            
            <div className="flex items-center gap-2">
              {getTrendIcon(processedReport.trendAnalysis.direction)}
              <span className="text-sm text-gray-600">
                {processedReport.trendAnalysis.direction === 'up' ? 'Tăng trường' : 
                 processedReport.trendAnalysis.direction === 'down' ? 'Giảm' : 'Ổn định'} 
                {processedReport.trendAnalysis.percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Department Impact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="w-4 h-4" />
              Tác động Phòng ban
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Điểm số hiệu suất</span>
                <span className="font-semibold">{processedReport.departmentImpact}/100</span>
              </div>
              <Progress value={processedReport.departmentImpact} className="h-2" />
              <p className="text-xs text-gray-500">
                Đánh giá tác động của báo cáo này đến hiệu suất phòng ban {processedReport.department}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Company Impact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="w-4 h-4" />
              Tác động Công ty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Điểm số tổng thể</span>
                <span className="font-semibold">{processedReport.companyImpact}/100</span>
              </div>
              <Progress value={processedReport.companyImpact} className="h-2" />
              <p className="text-xs text-gray-500">
                Đánh giá tác động của báo cáo này đến hiệu suất tổng thể công ty
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Phân tích Xu hướng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">{processedReport.trendAnalysis.comparison}</p>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      {processedReport.alerts && processedReport.alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Cảnh báo & Thông báo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {processedReport.alerts.map((alert, index) => (
                <Alert key={index} className={`border-l-4 ${
                  alert.type === 'success' ? 'border-l-green-500 bg-green-50' :
                  alert.type === 'warning' ? 'border-l-yellow-500 bg-yellow-50' :
                  'border-l-red-500 bg-red-50'
                }`}>
                  <div className="flex items-start gap-2">
                    {getAlertIcon(alert.type)}
                    <AlertDescription className="text-sm">
                      {alert.message}
                    </AlertDescription>
                  </div>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {processedReport.recommendations && processedReport.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Khuyến nghị từ AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {processedReport.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-blue-800">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Info */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Xử lý bởi AI Agent</span>
            <span>
              {processedReport.processedAt ? 
                `Hoàn thành lúc ${new Date(processedReport.processedAt).toLocaleString('vi-VN')}` :
                'Đang xử lý...'
              }
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;