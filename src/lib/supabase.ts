// Re-export supabase client for convenience
export { supabase } from '@/integrations/supabase/client';
export type { Database } from '@/integrations/supabase/types';

// Re-export types from mockData
export type { Company, CompanyReport, ReportModule } from './mockData';

// Additional supabase utilities can be added here
export const getSupabaseUrl = () => {
  return 'https://blbgiudtlbbisotwummj.supabase.co';
};

export const isSupabaseConnected = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    return !error;
  } catch {
    return false;
  }
};

// SupabaseService for data operations
export class SupabaseService {
  static async getCompanies() {
    // Mock implementation - in real app this would query Supabase
    const { mockCompanies } = await import('./mockData');
    return mockCompanies;
  }

  static async getReportModules() {
    // Mock implementation - in real app this would query Supabase
    const { mockReportModules } = await import('./mockData');
    return mockReportModules;
  }

  static async getCompanyReports(companyId: string) {
    // Mock implementation - in real app this would query Supabase
    const { mockReportData } = await import('./mockData');
    return mockReportData[parseInt(companyId)] || {};
  }

  static async getLatestCompanyReports(companyId: string) {
    // Mock implementation - in real app this would query Supabase
    const { mockReportData } = await import('./mockData');
    const companyReports = mockReportData[parseInt(companyId)] || {};
    return Object.values(companyReports);
  }

  static async createReport(reportData: any) {
    // Mock implementation - in real app this would insert into Supabase
    console.log('Creating report:', reportData);
    return { success: true, id: Date.now().toString() };
  }

  static async updateReport(reportId: string, reportData: any) {
    // Mock implementation - in real app this would update Supabase
    console.log('Updating report:', reportId, reportData);
    return { success: true };
  }

  static async deleteReport(reportId: string) {
    // Mock implementation - in real app this would delete from Supabase
    console.log('Deleting report:', reportId);
    return { success: true };
  }
}