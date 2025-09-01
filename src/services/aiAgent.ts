import { supabase } from '@/integrations/supabase/client';

export interface ReportData {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  company: string;
  department: string;
  reportType: string;
  revenue: number;
  kpiValue: number;
  kpiUnit: string;
  workStatus: 'in_progress' | 'completed' | 'delayed';
  description: string;
  attachments: string[];
  createdAt: Date;
  processedAt?: Date;
  aiInsights?: string;
  riskLevel?: 'low' | 'medium' | 'high';
  recommendations?: string[];
}

export interface ProcessedReport extends ReportData {
  normalizedRevenue: number;
  normalizedKpi: number;
  departmentImpact: number;
  companyImpact: number;
  trendAnalysis: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
    comparison: string;
  };
  alerts: {
    type: 'success' | 'warning' | 'danger';
    message: string;
  }[];
}

export interface NotificationData {
  id: string;
  recipientId: string;
  recipientRole: string;
  type: 'report_submitted' | 'report_processed' | 'alert' | 'approval_needed';
  title: string;
  message: string;
  data: any;
  priority: 'low' | 'medium' | 'high';
  read: boolean;
  createdAt: Date;
}

class AIAgentService {
  private static instance: AIAgentService;
  private processingQueue: ReportData[] = [];
  private isProcessing = false;

  static getInstance(): AIAgentService {
    if (!AIAgentService.instance) {
      AIAgentService.instance = new AIAgentService();
    }
    return AIAgentService.instance;
  }

  // Main entry point for processing reports
  async processReport(reportData: ReportData): Promise<ProcessedReport> {
    console.log('🤖 AI Agent: Processing report', reportData.id);
    
    try {
      // Step 1: Normalize data
      const normalizedData = await this.normalizeData(reportData);
      
      // Step 2: Analyze trends
      const trendAnalysis = await this.analyzeTrends(normalizedData);
      
      // Step 3: Generate insights
      const insights = await this.generateInsights(normalizedData, trendAnalysis);
      
      // Step 4: Calculate impact scores
      const impactScores = await this.calculateImpactScores(normalizedData);
      
      // Step 5: Generate alerts
      const alerts = await this.generateAlerts(normalizedData, insights);
      
      const processedReport: ProcessedReport = {
        ...normalizedData,
        trendAnalysis,
        alerts,
        aiInsights: insights.summary,
        riskLevel: insights.riskLevel,
        recommendations: insights.recommendations,
        departmentImpact: impactScores.department,
        companyImpact: impactScores.company,
        processedAt: new Date()
      };
      
      // Step 6: Update ERP database
      await this.updateERPDatabase(processedReport);
      
      // Step 7: Send notifications
      await this.sendNotifications(processedReport);
      
      console.log('✅ AI Agent: Report processed successfully', processedReport.id);
      return processedReport;
      
    } catch (error) {
      console.error('❌ AI Agent: Error processing report', error);
      throw error;
    }
  }

  // Normalize and standardize data
  private async normalizeData(reportData: ReportData): Promise<ReportData & { normalizedRevenue: number; normalizedKpi: number }> {
    // Convert revenue to standard currency (VND)
    let normalizedRevenue = reportData.revenue;
    
    // Convert KPI to standard units
    let normalizedKpi = reportData.kpiValue;
    
    // Apply currency conversion if needed
    if (reportData.kpiUnit === 'USD') {
      normalizedKpi = reportData.kpiValue * 24000; // Mock exchange rate
    }
    
    // Apply unit standardization
    const unitMultipliers: { [key: string]: number } = {
      'Khách hàng': 1,
      'Hợp đồng': 1,
      'Sản phẩm': 1,
      '%': 1,
      'Giờ': 1,
      'Ngày': 8, // Convert days to hours
      'VNĐ': 1,
      'USD': 24000
    };
    
    const multiplier = unitMultipliers[reportData.kpiUnit] || 1;
    normalizedKpi = reportData.kpiValue * multiplier;
    
    return {
      ...reportData,
      normalizedRevenue,
      normalizedKpi
    };
  }

  // Analyze trends compared to historical data
  private async analyzeTrends(reportData: ReportData & { normalizedRevenue: number; normalizedKpi: number }) {
    // Mock historical data analysis
    const mockHistoricalAverage = {
      revenue: 45000000, // 45M VND average
      kpi: reportData.normalizedKpi * 0.85 // Assume 15% improvement
    };
    
    const revenueChange = ((reportData.normalizedRevenue - mockHistoricalAverage.revenue) / mockHistoricalAverage.revenue) * 100;
    const kpiChange = ((reportData.normalizedKpi - mockHistoricalAverage.kpi) / mockHistoricalAverage.kpi) * 100;
    
    const overallChange = (revenueChange + kpiChange) / 2;
    
    let direction: 'up' | 'down' | 'stable';
    if (overallChange > 5) direction = 'up';
    else if (overallChange < -5) direction = 'down';
    else direction = 'stable';
    
    return {
      direction,
      percentage: Math.abs(overallChange),
      comparison: `So với tháng trước: Doanh thu ${revenueChange > 0 ? '+' : ''}${revenueChange.toFixed(1)}%, KPI ${kpiChange > 0 ? '+' : ''}${kpiChange.toFixed(1)}%`
    };
  }

  // Generate AI insights and recommendations
  private async generateInsights(reportData: ReportData & { normalizedRevenue: number; normalizedKpi: number }, trendAnalysis: any) {
    const insights = {
      summary: '',
      riskLevel: 'low' as 'low' | 'medium' | 'high',
      recommendations: [] as string[]
    };
    
    // Analyze work status
    if (reportData.workStatus === 'delayed') {
      insights.riskLevel = 'high';
      insights.recommendations.push('Cần xem xét lại quy trình làm việc để tránh delay');
      insights.recommendations.push('Tăng cường hỗ trợ và theo dõi tiến độ công việc');
    }
    
    // Analyze revenue performance
    if (reportData.normalizedRevenue < 30000000) { // Below 30M VND
      insights.riskLevel = insights.riskLevel === 'high' ? 'high' : 'medium';
      insights.recommendations.push('Doanh thu thấp hơn mục tiêu, cần tăng cường hoạt động bán hàng');
    } else if (reportData.normalizedRevenue > 70000000) { // Above 70M VND
      insights.recommendations.push('Hiệu suất xuất sắc! Tiếp tục duy trì và mở rộng chiến lược hiện tại');
    }
    
    // Analyze trend
    if (trendAnalysis.direction === 'down') {
      insights.riskLevel = insights.riskLevel === 'high' ? 'high' : 'medium';
      insights.recommendations.push('Xu hướng giảm được phát hiện, cần điều chỉnh chiến lược');
    }
    
    // Generate summary
    insights.summary = `Báo cáo ${reportData.department} cho thấy doanh thu ${reportData.normalizedRevenue.toLocaleString()} VNĐ, KPI đạt ${reportData.normalizedKpi} ${reportData.kpiUnit}. Xu hướng ${trendAnalysis.direction === 'up' ? 'tích cực' : trendAnalysis.direction === 'down' ? 'tiêu cực' : 'ổn định'} với mức độ rủi ro ${insights.riskLevel}.`;
    
    return insights;
  }

  // Calculate impact scores for department and company
  private async calculateImpactScores(reportData: ReportData & { normalizedRevenue: number; normalizedKpi: number }) {
    // Mock calculation based on department weight and performance
    const departmentWeights: { [key: string]: number } = {
      'Kinh doanh - Marketing': 0.3,
      'Tài chính': 0.15,
      'Kế toán': 0.1,
      'Sản xuất - Kho vận': 0.2,
      'Nhân sự - Đào tạo': 0.1,
      'Công nghệ - Hạ tầng số': 0.15,
      'Chiến lược - R&D': 0.2,
      'Pháp chế - Tuân thủ': 0.05,
      'Đầu tư - Quỹ': 0.25,
      'Thông tin Cổ đông': 0.1
    };
    
    const departmentWeight = departmentWeights[reportData.department] || 0.1;
    const performanceScore = Math.min(100, (reportData.normalizedRevenue / 50000000) * 50 + (reportData.normalizedKpi / 10) * 50);
    
    return {
      department: Math.round(performanceScore),
      company: Math.round(performanceScore * departmentWeight * 100)
    };
  }

  // Generate alerts based on analysis
  private async generateAlerts(reportData: ReportData & { normalizedRevenue: number; normalizedKpi: number }, insights: any) {
    const alerts: { type: 'success' | 'warning' | 'danger'; message: string }[] = [];
    
    // Revenue alerts
    if (reportData.normalizedRevenue > 70000000) {
      alerts.push({
        type: 'success',
        message: `Doanh thu xuất sắc: ${reportData.normalizedRevenue.toLocaleString()} VNĐ vượt mục tiêu`
      });
    } else if (reportData.normalizedRevenue < 30000000) {
      alerts.push({
        type: 'danger',
        message: `Doanh thu thấp: ${reportData.normalizedRevenue.toLocaleString()} VNĐ cần cải thiện`
      });
    }
    
    // Work status alerts
    if (reportData.workStatus === 'delayed') {
      alerts.push({
        type: 'danger',
        message: 'Công việc bị delay - cần hỗ trợ ngay lập tức'
      });
    } else if (reportData.workStatus === 'completed') {
      alerts.push({
        type: 'success',
        message: 'Công việc hoàn thành đúng tiến độ'
      });
    }
    
    // Risk level alerts
    if (insights.riskLevel === 'high') {
      alerts.push({
        type: 'danger',
        message: 'Mức độ rủi ro cao - cần can thiệp của quản lý'
      });
    }
    
    return alerts;
  }

  // Update ERP database with processed data
  private async updateERPDatabase(processedReport: ProcessedReport) {
    try {
      // Mock database update - in real implementation, this would update Supabase
      const reportRecord = {
        id: processedReport.id,
        user_id: processedReport.userId,
        company: processedReport.company,
        department: processedReport.department,
        report_type: processedReport.reportType,
        revenue: processedReport.normalizedRevenue,
        kpi_value: processedReport.normalizedKpi,
        kpi_unit: processedReport.kpiUnit,
        work_status: processedReport.workStatus,
        description: processedReport.description,
        ai_insights: processedReport.aiInsights,
        risk_level: processedReport.riskLevel,
        department_impact: processedReport.departmentImpact,
        company_impact: processedReport.companyImpact,
        trend_direction: processedReport.trendAnalysis.direction,
        trend_percentage: processedReport.trendAnalysis.percentage,
        processed_at: processedReport.processedAt,
        created_at: processedReport.createdAt
      };
      
      // Simulate database insert
      console.log('📊 ERP Database Updated:', reportRecord);
      
      // In real implementation:
      // await supabase.from('processed_reports').upsert(reportRecord);
      
    } catch (error) {
      console.error('Error updating ERP database:', error);
      throw error;
    }
  }

  // Send real-time notifications
  private async sendNotifications(processedReport: ProcessedReport) {
    try {
      const notifications: NotificationData[] = [];
      
      // Notify manager about employee report
      if (processedReport.userRole === 'employee') {
        notifications.push({
          id: `notif-${Date.now()}-1`,
          recipientId: 'manager-id', // In real app, get from database
          recipientRole: 'manager',
          type: 'report_submitted',
          title: 'Báo cáo mới từ nhân viên',
          message: `${processedReport.userName} đã gửi báo cáo ${processedReport.reportType}`,
          data: { reportId: processedReport.id },
          priority: 'medium',
          read: false,
          createdAt: new Date()
        });
      }
      
      // Notify CEO about department summary
      if (processedReport.userRole === 'manager') {
        notifications.push({
          id: `notif-${Date.now()}-2`,
          recipientId: 'ceo-id',
          recipientRole: 'ceo',
          type: 'report_processed',
          title: 'Báo cáo phòng ban đã xử lý',
          message: `Báo cáo ${processedReport.department} đã được AI phân tích`,
          data: { reportId: processedReport.id, insights: processedReport.aiInsights },
          priority: 'medium',
          read: false,
          createdAt: new Date()
        });
      }
      
      // High-risk alerts to all relevant parties
      if (processedReport.riskLevel === 'high') {
        notifications.push({
          id: `notif-${Date.now()}-3`,
          recipientId: 'all-managers',
          recipientRole: 'manager',
          type: 'alert',
          title: '⚠️ Cảnh báo rủi ro cao',
          message: `${processedReport.department}: ${processedReport.alerts.find(a => a.type === 'danger')?.message}`,
          data: { reportId: processedReport.id, riskLevel: processedReport.riskLevel },
          priority: 'high',
          read: false,
          createdAt: new Date()
        });
      }
      
      // Send notifications via Supabase Realtime
      for (const notification of notifications) {
        console.log('🔔 Sending notification:', notification);
        
        // In real implementation:
        // await supabase.from('notifications').insert(notification);
        // await supabase.channel('notifications').send({
        //   type: 'broadcast',
        //   event: 'new_notification',
        //   payload: notification
        // });
      }
      
    } catch (error) {
      console.error('Error sending notifications:', error);
      throw error;
    }
  }

  // Public method to simulate report processing
  async simulateReportProcessing(reportData: Partial<ReportData>): Promise<ProcessedReport> {
    const mockReport: ReportData = {
      id: `RPT-${Date.now()}`,
      userId: 'user-123',
      userName: 'Nguyễn Văn A',
      userRole: 'employee',
      company: 'Startup A - AI Logistics',
      department: 'Kinh doanh - Marketing',
      reportType: 'Báo cáo doanh số',
      revenue: 50000000,
      kpiValue: 2,
      kpiUnit: 'Khách hàng',
      workStatus: 'completed',
      description: 'Hoàn thành mục tiêu bán hàng tháng này',
      attachments: [],
      createdAt: new Date(),
      ...reportData
    };
    
    return await this.processReport(mockReport);
  }
}

export const aiAgent = AIAgentService.getInstance();
export default aiAgent;