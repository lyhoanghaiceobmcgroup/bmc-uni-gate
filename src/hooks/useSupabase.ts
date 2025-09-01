import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Mock Supabase client for demonstration
interface SupabaseChannel {
  on: (event: string, table: string, callback: (payload: any) => void) => SupabaseChannel;
  subscribe: () => void;
}

interface SupabaseClient {
  from: (table: string) => {
    insert: (data: any) => Promise<{ data: any; error: any }>;
    update: (data: any) => {
      eq: (column: string, value: any) => Promise<{ data: any; error: any }>;
    };
    select: (columns?: string) => {
      eq?: (column: string, value: any) => Promise<{ data: any; error: any }>;
    };
  };
  channel: (name: string) => SupabaseChannel;
}

// Mock data for testing
const MOCK_REPORTS: SalesReportData[] = [
  {
    id: '1',
    user_id: 'user_001',
    report_date: '2025-01-21',
    project: 'F4-Startup AI Retail',
    department: 'Kinh doanh - Marketing',
    reporter: 'Nguyễn Văn A',
    role: 'Nhân viên KD',
    daily_revenue: 150000000,
    contracts_signed: 3,
    new_customers: 10,
    follow_up_customers: 25,
    avg_customer_value: 15000000,
    phone_calls: true,
    direct_meetings: true,
    product_demos: true,
    detailed_notes: 'Khách hàng quan tâm giải pháp ERP-AI, cần follow-up tuần tới.',
    work_status: 'completed',
    delay_reason: '',
    attachments: ['HopDong_KD001.docx', 'Invoice_001.jpg'],
    status: 'submitted',
    created_at: '2025-01-21T08:30:00Z',
    updated_at: '2025-01-21T17:45:00Z'
  },
  {
    id: '2',
    user_id: 'user_002',
    report_date: '2025-01-20',
    project: 'BMC Enterprise Solution',
    department: 'Kinh doanh - Marketing',
    reporter: 'Trần Thị B',
    role: 'Trưởng nhóm KD',
    daily_revenue: 280000000,
    contracts_signed: 5,
    new_customers: 15,
    follow_up_customers: 40,
    avg_customer_value: 18666667,
    phone_calls: true,
    direct_meetings: true,
    product_demos: true,
    detailed_notes: 'Đạt target doanh thu ngày. Khách hàng lớn quan tâm package enterprise.',
    work_status: 'completed',
    delay_reason: '',
    attachments: ['Proposal_Enterprise.pdf'],
    status: 'submitted',
    created_at: '2025-01-20T09:15:00Z',
    updated_at: '2025-01-20T18:20:00Z'
  },
  {
    id: '3',
    user_id: 'user_001',
    report_date: '2025-01-19',
    project: 'F4-Startup AI Retail',
    department: 'Kinh doanh - Marketing',
    reporter: 'Lê Văn C',
    role: 'Trưởng phòng KD',
    daily_revenue: 95000000,
    contracts_signed: 2,
    new_customers: 6,
    follow_up_customers: 18,
    avg_customer_value: 15833333,
    phone_calls: true,
    direct_meetings: false,
    product_demos: true,
    detailed_notes: 'Một số khách hàng yêu cầu demo thêm. Cần hỗ trợ technical team.',
    work_status: 'in-progress',
    delay_reason: '',
    attachments: [],
    status: 'draft',
    created_at: '2025-01-19T10:00:00Z',
    updated_at: '2025-01-19T16:30:00Z'
  }
];

const MOCK_MARKETING_REPORTS: MarketingReportData[] = [
  {
    id: 'mkt_001',
    user_id: 'user_003',
    report_date: '2025-01-21',
    project: 'F4-Startup E-commerce',
    department: 'Marketing',
    reporter: 'Trần Thị B',
    role: 'Nhân viên Marketing',
    campaign_name: 'Back-to-School 2025',
    campaign_start_date: '2025-01-15',
    campaign_end_date: '2025-01-31',
    channels: ['Facebook Ads', 'TikTok Ads'],
    planned_budget: 200000000,
    spent_budget: 180000000,
    impressions: 2500000,
    clicks: 125000,
    ctr: 5.0,
    leads: 2500,
    conversions: 500,
    cpa: 360000,
    roi: 145,
    strengths: 'Kênh TikTok Ads tạo nhiều khách hàng tiềm năng với CPA thấp.',
    issues: 'Facebook Ads CTR thấp hơn kỳ vọng, cần tối ưu nội dung.',
    improvements: 'Giảm 20% ngân sách Facebook, tăng 20% cho TikTok.',
    attachments: ['Report_Facebook_August2025.pdf', 'Report_TikTok_August2025.pdf'],
    status: 'submitted',
    created_at: '2025-01-21T09:00:00Z',
    updated_at: '2025-01-21T17:30:00Z'
  },
  {
    id: 'mkt_002',
    user_id: 'user_004',
    report_date: '2025-01-20',
    project: 'BMC Enterprise Solution',
    department: 'Marketing',
    reporter: 'Lê Văn D',
    role: 'Trưởng nhóm Marketing',
    campaign_name: 'Enterprise Launch Q1',
    campaign_start_date: '2025-01-10',
    campaign_end_date: '2025-01-25',
    channels: ['Google Ads', 'LinkedIn Ads', 'Email Marketing'],
    planned_budget: 350000000,
    spent_budget: 320000000,
    impressions: 1800000,
    clicks: 90000,
    ctr: 5.0,
    leads: 1800,
    conversions: 360,
    cpa: 888889,
    roi: 180,
    strengths: 'LinkedIn Ads hiệu quả cao với target B2B, Email Marketing có tỷ lệ mở cao.',
    issues: 'Google Ads chi phí cao, cần tối ưu từ khóa.',
    improvements: 'Tăng ngân sách LinkedIn, giảm Google Ads, phát triển content marketing.',
    attachments: ['Google_Ads_Report_Jan2025.xlsx', 'LinkedIn_Performance.pdf'],
    status: 'submitted',
    created_at: '2025-01-20T10:30:00Z',
    updated_at: '2025-01-20T18:45:00Z'
  }
];

const MOCK_AI_INSIGHTS: AIInsight[] = [
  {
    id: '1',
    report_id: '1',
    insight_type: 'revenue_trend',
    title: 'Xu hướng doanh thu tích cực',
    description: 'Doanh thu hôm nay tăng 25% so với hôm qua, cho thấy xu hướng tăng trưởng mạnh.',
    recommendation: 'Tiếp tục duy trì chiến lược hiện tại và mở rộng hoạt động tiếp thị.',
    confidence_score: 0.87,
    created_at: '2025-01-21T18:00:00Z'
  },
  {
    id: '2',
    report_id: '1',
    insight_type: 'conversion_rate',
    title: 'Tỷ lệ chuyển đổi cao',
    description: 'Tỷ lệ chuyển đổi từ khách hàng tiềm năng thành hợp đồng đạt 30%, cao hơn trung bình ngành.',
    recommendation: 'Phân tích quy trình bán hàng để nhân rộng thành công này.',
    confidence_score: 0.92,
    created_at: '2025-01-21T18:05:00Z'
  },
  {
    id: '3',
    report_id: '3',
    insight_type: 'kpi_warning',
    title: 'Cảnh báo: Doanh thu thấp hơn mục tiêu',
    description: 'Doanh thu hôm nay thấp hơn 40% so với mục tiêu, cần có biện pháp cải thiện.',
    recommendation: 'Tăng cường hoạt động bán hàng và review lại chiến lược tiếp cận khách hàng.',
    confidence_score: 0.78,
    created_at: '2025-01-19T18:10:00Z'
  },
  {
    id: '4',
    report_id: 'mkt_001',
    insight_type: 'channel_performance',
    title: 'TikTok Ads vượt trội',
    description: 'TikTok Ads có CPA thấp hơn 40% so với Facebook Ads, ROI cao hơn 25%.',
    recommendation: 'Chuyển 30% ngân sách từ Facebook sang TikTok để tối ưu hiệu quả.',
    confidence_score: 0.91,
    created_at: '2025-01-21T19:00:00Z'
  },
  {
    id: '5',
    report_id: 'mkt_002',
    insight_type: 'budget_optimization',
    title: 'Tối ưu phân bổ ngân sách',
    description: 'LinkedIn Ads có ROI 220%, cao hơn Google Ads (150%). Email Marketing chi phí thấp nhất.',
    recommendation: 'Tăng 40% ngân sách LinkedIn, giảm 25% Google Ads, duy trì Email Marketing.',
    confidence_score: 0.88,
    created_at: '2025-01-20T19:30:00Z'
  }
];

// Mock Supabase implementation
const createMockSupabase = (): SupabaseClient => {
  const mockData: { [key: string]: any[] } = {
    sales_reports: [...MOCK_REPORTS],
    ai_insights: [...MOCK_AI_INSIGHTS]
  };

  return {
    from: (table: string) => ({
      insert: async (data: any) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const newRecord = {
          id: Date.now().toString(),
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        if (!mockData[table]) mockData[table] = [];
        mockData[table].push(newRecord);
        
        console.log(`📝 Inserted new record into ${table}:`, newRecord);
        return { data: newRecord, error: null };
      },
      update: (data: any) => ({
        eq: async (column: string, value: any) => {
          await new Promise(resolve => setTimeout(resolve, 300));
          
          const records = mockData[table] || [];
          const index = records.findIndex(record => record[column] === value);
          
          if (index !== -1) {
            records[index] = { ...records[index], ...data, updated_at: new Date().toISOString() };
            return { data: records[index], error: null };
          }
          
          return { data: null, error: { message: 'Record not found' } };
        }
      }),
      select: (columns?: string) => ({
        eq: async (column: string, value: any) => {
          await new Promise(resolve => setTimeout(resolve, 200));
          
          const records = mockData[table] || [];
          const filtered = records.filter(record => record[column] === value);
          
          console.log(`📊 Selected ${filtered.length} records from ${table} where ${column} = ${value}`);
          return { data: filtered, error: null };
        }
      })
    }),
    channel: (name: string) => {
      const channelInstance: SupabaseChannel = {
        on: (event: string, table: string, callback: (payload: any) => void) => {
          // Mock real-time subscription
          console.log(`🔔 Setting up listener for ${event} on ${table}`);
          return channelInstance; // Return self for chaining
        },
        subscribe: () => {
          console.log(`🔔 Successfully subscribed to channel: ${name}`);
          
          // Simulate real-time updates
          setTimeout(() => {
            console.log(`📡 Simulating real-time update on ${name}`);
          }, 2000);
        }
      };
      return channelInstance;
    }
  };
};

const supabase = createMockSupabase();

export interface SalesReportData {
  id?: string;
  user_id: string;
  report_date: string;
  project: string;
  department: string;
  reporter: string;
  role: string;
  daily_revenue: number;
  contracts_signed: number;
  new_customers: number;
  follow_up_customers: number;
  avg_customer_value: number;
  phone_calls: boolean;
  direct_meetings: boolean;
  product_demos: boolean;
  detailed_notes: string;
  work_status: 'completed' | 'in-progress' | 'delayed';
  delay_reason?: string;
  attachments: string[];
  status: 'draft' | 'submitted';
  created_at?: string;
  updated_at?: string;
}

export interface MarketingReportData {
  id?: string;
  user_id: string;
  report_date: string;
  project: string;
  department: string;
  reporter: string;
  role: string;
  campaign_name: string;
  campaign_start_date: string;
  campaign_end_date: string;
  channels: string[];
  planned_budget: number;
  spent_budget: number;
  impressions: number;
  clicks: number;
  ctr: number;
  leads: number;
  conversions: number;
  cpa: number;
  roi: number;
  strengths: string;
  issues: string;
  improvements: string;
  attachments: string[];
  status: 'draft' | 'submitted';
  created_at?: string;
  updated_at?: string;
}

export interface AIInsight {
  id?: string;
  report_id: string;
  insight_type: 'revenue_trend' | 'conversion_rate' | 'kpi_warning' | 'channel_performance' | 'budget_optimization';
  title: string;
  description: string;
  recommendation: string;
  confidence_score: number;
  created_at?: string;
}

export const useSupabase = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [realtimeStatus, setRealtimeStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');

  useEffect(() => {
    // Simulate connection to Supabase
    setRealtimeStatus('connecting');
    const timer = setTimeout(() => {
      setRealtimeStatus('connected');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const saveDraft = async (reportData: Partial<SalesReportData>): Promise<{ success: boolean; data?: any }> => {
    setIsLoading(true);
    
    try {
      const draftData = {
        ...reportData,
        status: 'draft' as const,
        daily_revenue: parseFloat(reportData.daily_revenue?.toString().replace(/,/g, '') || '0'),
        avg_customer_value: parseFloat(reportData.avg_customer_value?.toString().replace(/,/g, '') || '0')
      };

      const { data, error } = await supabase
        .from('sales_reports')
        .insert(draftData);

      if (error) throw error;

      toast({
        title: "Lưu nháp thành công",
        description: "Báo cáo đã được lưu vào nháp cá nhân.",
      });

      return { success: true, data };
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu nháp. Vui lòng thử lại.",
        variant: "destructive"
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const submitReport = async (reportData: SalesReportData): Promise<{ success: boolean; data?: any }> => {
    setIsLoading(true);
    
    try {
      // Validate required fields
      if (!reportData.project || !reportData.daily_revenue) {
        throw new Error('Vui lòng điền đầy đủ thông tin bắt buộc');
      }

      const submissionData = {
        ...reportData,
        status: 'submitted' as const,
        daily_revenue: parseFloat(reportData.daily_revenue.toString().replace(/,/g, '')),
        avg_customer_value: parseFloat(reportData.avg_customer_value?.toString().replace(/,/g, '') || '0')
      };

      const { data, error } = await supabase
        .from('sales_reports')
        .insert(submissionData);

      if (error) throw error;

      // Generate AI insights after successful submission
      await generateAIInsights(data.id, submissionData);

      toast({
        title: "Gửi báo cáo thành công",
        description: "Dữ liệu đã được đồng bộ realtime vào hệ thống.",
      });

      return { success: true, data };
    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Không thể gửi báo cáo.",
        variant: "destructive"
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIInsights = async (reportId: string, reportData: SalesReportData): Promise<AIInsight[]> => {
    try {
      // Simulate AI analysis delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const insights: Omit<AIInsight, 'id' | 'created_at'>[] = [];

      // Revenue trend analysis
      const revenue = reportData.daily_revenue;
      if (revenue > 100000000) { // > 100M VND
        insights.push({
          report_id: reportId,
          insight_type: 'revenue_trend',
          title: 'Doanh thu xuất sắc',
          description: `Doanh thu hôm nay ${revenue.toLocaleString('vi-VN')} VNĐ vượt mục tiêu 25%.`,
          recommendation: 'Tiếp tục duy trì chiến lược bán hàng hiện tại và mở rộng sang khách hàng mới.',
          confidence_score: 0.92
        });
      } else if (revenue < 50000000) { // < 50M VND
        insights.push({
          report_id: reportId,
          insight_type: 'kpi_warning',
          title: 'Cảnh báo KPI doanh thu',
          description: `Doanh thu ${revenue.toLocaleString('vi-VN')} VNĐ thấp hơn mục tiêu 40%.`,
          recommendation: 'Cần tăng cường hoạt động bán hàng và review lại chiến lược tiếp cận khách hàng.',
          confidence_score: 0.88
        });
      }

      // Conversion rate analysis
      const conversionRate = reportData.contracts_signed / Math.max(reportData.new_customers, 1);
      if (conversionRate > 0.3) {
        insights.push({
          report_id: reportId,
          insight_type: 'conversion_rate',
          title: 'Tỷ lệ chuyển đổi cao',
          description: `Tỷ lệ chuyển đổi ${(conversionRate * 100).toFixed(1)}% cao hơn trung bình ngành.`,
          recommendation: 'Áp dụng phương pháp bán hàng này cho toàn bộ team để tối ưu hiệu quả.',
          confidence_score: 0.85
        });
      }

      // Save insights to database
      for (const insight of insights) {
        await supabase.from('ai_insights').insert(insight);
      }

      return insights as AIInsight[];
    } catch (error) {
      console.error('Error generating AI insights:', error);
      return [];
    }
  };

  const getReportHistory = async (userId: string): Promise<SalesReportData[]> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('sales_reports')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching report history:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải lịch sử báo cáo.",
        variant: "destructive"
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getAIInsights = async (reportId: string): Promise<AIInsight[]> => {
    try {
      const { data, error } = await supabase
        .from('ai_insights')
        .select('*')
        .eq('report_id', reportId);

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      return [];
    }
  };

  const subscribeToRealtimeUpdates = (callback: (payload: any) => void) => {
    const channel = supabase
      .channel('sales_reports_realtime')
      .on('INSERT', 'sales_reports', callback)
      .on('UPDATE', 'sales_reports', callback)
      .subscribe();

    return () => {
      // Cleanup subscription
      console.log('Unsubscribed from realtime updates');
    };
  };

  const saveMarketingDraft = async (reportData: MarketingReportData): Promise<{ success: boolean; data?: any }> => {
    setIsLoading(true);
    
    try {
      const draftData = {
        ...reportData,
        status: 'draft' as const,
        planned_budget: parseFloat(reportData.planned_budget.toString().replace(/,/g, '')),
        spent_budget: parseFloat(reportData.spent_budget.toString().replace(/,/g, '')),
        cpa: parseFloat(reportData.cpa.toString().replace(/,/g, '')),
        roi: parseFloat(reportData.roi.toString().replace(/,/g, ''))
      };

      const { data, error } = await supabase
        .from('marketing_reports')
        .insert(draftData);

      if (error) throw error;

      toast({
        title: "Lưu nháp thành công",
        description: "Báo cáo Marketing đã được lưu tạm thời.",
      });

      return { success: true, data };
    } catch (error) {
      console.error('Error saving marketing draft:', error);
      toast({
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Không thể lưu nháp báo cáo.",
        variant: "destructive"
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const submitMarketingReport = async (reportData: MarketingReportData): Promise<{ success: boolean; data?: any }> => {
    setIsLoading(true);
    
    try {
      // Validate required fields
      if (!reportData.campaign_name || !reportData.planned_budget) {
        throw new Error('Vui lòng điền đầy đủ thông tin bắt buộc');
      }

      const submissionData = {
        ...reportData,
        status: 'submitted' as const,
        planned_budget: parseFloat(reportData.planned_budget.toString().replace(/,/g, '')),
        spent_budget: parseFloat(reportData.spent_budget.toString().replace(/,/g, '')),
        cpa: parseFloat(reportData.cpa.toString().replace(/,/g, '')),
        roi: parseFloat(reportData.roi.toString().replace(/,/g, ''))
      };

      const { data, error } = await supabase
        .from('marketing_reports')
        .insert(submissionData);

      if (error) throw error;

      // Generate AI insights after successful submission
      await generateMarketingAIInsights(data.id, submissionData);

      toast({
        title: "Gửi báo cáo thành công",
        description: "Dữ liệu Marketing đã được đồng bộ realtime vào hệ thống.",
      });

      return { success: true, data };
    } catch (error) {
      console.error('Error submitting marketing report:', error);
      toast({
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Không thể gửi báo cáo.",
        variant: "destructive"
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const generateMarketingAIInsights = async (reportId: string, reportData: MarketingReportData): Promise<AIInsight[]> => {
    try {
      // Simulate AI analysis delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const insights: Omit<AIInsight, 'id' | 'created_at'>[] = [];

      // Channel performance analysis
      if (reportData.roi > 150) {
        insights.push({
          report_id: reportId,
          insight_type: 'channel_performance',
          title: 'Hiệu quả chiến dịch xuất sắc',
          description: `ROI đạt ${reportData.roi}%, vượt trội so với trung bình ngành (120%).`,
          recommendation: 'Nhân rộng chiến lược này cho các chiến dịch tương lai và tăng ngân sách.',
          confidence_score: 0.92
        });
      }

      // Budget optimization analysis
      const budgetUtilization = (reportData.spent_budget / reportData.planned_budget) * 100;
      if (budgetUtilization < 90) {
        insights.push({
          report_id: reportId,
          insight_type: 'budget_optimization',
          title: 'Tối ưu ngân sách',
          description: `Đã sử dụng ${budgetUtilization.toFixed(1)}% ngân sách dự kiến. Còn dư ${reportData.planned_budget - reportData.spent_budget} VNĐ.`,
          recommendation: 'Có thể tăng cường quảng cáo hoặc mở rộng thời gian chiến dịch để tối ưu ngân sách.',
          confidence_score: 0.85
        });
      }

      // CPA analysis
      if (reportData.cpa < 500000) { // < 500k VND
        insights.push({
          report_id: reportId,
          insight_type: 'conversion_rate',
          title: 'Chi phí khách hàng tối ưu',
          description: `CPA ${reportData.cpa.toLocaleString()} VNĐ thấp hơn trung bình ngành.`,
          recommendation: 'Duy trì chiến lược hiện tại và có thể mở rộng quy mô chiến dịch.',
          confidence_score: 0.88
        });
      }

      // Store insights in mock database
      const newInsights = insights.map((insight, index) => ({
        ...insight,
        id: `ai_${reportId}_${index + 1}`,
        created_at: new Date().toISOString()
      }));

      MOCK_AI_INSIGHTS.push(...newInsights);
      return newInsights;
    } catch (error) {
      console.error('Error generating marketing AI insights:', error);
      return [];
    }
  };

  return {
    isLoading,
    realtimeStatus,
    saveDraft,
    submitReport,
    generateAIInsights,
    getReportHistory,
    getAIInsights,
    saveMarketingDraft,
    submitMarketingReport,
    generateMarketingAIInsights,
    subscribeToRealtimeUpdates
  };
};

export default useSupabase;