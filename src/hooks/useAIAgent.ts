import { useState, useCallback } from 'react';
import { aiAgent, ReportData, ProcessedReport } from '@/services/aiAgent';
import { toast } from 'sonner';

export interface UseAIAgentReturn {
  isProcessing: boolean;
  processReport: (reportData: Partial<ReportData>) => Promise<ProcessedReport | null>;
  simulateProcessing: (reportData: Partial<ReportData>) => Promise<ProcessedReport | null>;
  lastProcessedReport: ProcessedReport | null;
  error: string | null;
}

export const useAIAgent = (): UseAIAgentReturn => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastProcessedReport, setLastProcessedReport] = useState<ProcessedReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processReport = useCallback(async (reportData: Partial<ReportData>): Promise<ProcessedReport | null> => {
    if (isProcessing) {
      toast.warning('AI Agent đang xử lý báo cáo khác, vui lòng đợi...');
      return null;
    }

    setIsProcessing(true);
    setError(null);
    
    try {
      toast.info('🤖 AI Agent đang xử lý báo cáo...', {
        description: 'Đang chuẩn hóa dữ liệu và phân tích xu hướng'
      });

      // Create complete report data with required fields
      const completeReportData: ReportData = {
        id: `RPT-${Date.now()}`,
        userId: reportData.userId || 'unknown',
        userName: reportData.userName || 'Unknown User',
        userRole: reportData.userRole || 'employee',
        company: reportData.company || 'Unknown Company',
        department: reportData.department || 'Unknown Department',
        reportType: reportData.reportType || 'Báo cáo chung',
        revenue: reportData.revenue || 0,
        kpiValue: reportData.kpiValue || 0,
        kpiUnit: reportData.kpiUnit || 'Đơn vị',
        workStatus: reportData.workStatus || 'in_progress',
        description: reportData.description || '',
        attachments: reportData.attachments || [],
        createdAt: new Date(),
        ...reportData
      };

      const processedReport = await aiAgent.processReport(completeReportData);
      setLastProcessedReport(processedReport);
      
      // Show success notification with insights
      toast.success('✅ Báo cáo đã được xử lý thành công!', {
        description: processedReport.aiInsights,
        duration: 5000
      });
      
      // Show alerts if any
      if (processedReport.alerts && processedReport.alerts.length > 0) {
        processedReport.alerts.forEach(alert => {
          const toastFn = alert.type === 'success' ? toast.success : 
                         alert.type === 'warning' ? toast.warning : toast.error;
          
          toastFn(alert.message, {
            duration: 4000
          });
        });
      }
      
      return processedReport;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định';
      setError(errorMessage);
      
      toast.error('❌ Lỗi xử lý báo cáo', {
        description: errorMessage
      });
      
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing]);

  const simulateProcessing = useCallback(async (reportData: Partial<ReportData>): Promise<ProcessedReport | null> => {
    if (isProcessing) {
      toast.warning('AI Agent đang xử lý báo cáo khác, vui lòng đợi...');
      return null;
    }

    setIsProcessing(true);
    setError(null);
    
    try {
      toast.info('🧪 Đang mô phỏng xử lý báo cáo...', {
        description: 'Sử dụng dữ liệu mẫu để demo AI Agent'
      });

      const processedReport = await aiAgent.simulateReportProcessing(reportData);
      setLastProcessedReport(processedReport);
      
      toast.success('✅ Mô phỏng hoàn thành!', {
        description: processedReport.aiInsights,
        duration: 5000
      });
      
      // Show alerts
      if (processedReport.alerts && processedReport.alerts.length > 0) {
        processedReport.alerts.forEach(alert => {
          const toastFn = alert.type === 'success' ? toast.success : 
                         alert.type === 'warning' ? toast.warning : toast.error;
          
          toastFn(alert.message, {
            duration: 4000
          });
        });
      }
      
      return processedReport;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định';
      setError(errorMessage);
      
      toast.error('❌ Lỗi mô phỏng xử lý', {
        description: errorMessage
      });
      
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing]);

  return {
    isProcessing,
    processReport,
    simulateProcessing,
    lastProcessedReport,
    error
  };
};

export default useAIAgent;