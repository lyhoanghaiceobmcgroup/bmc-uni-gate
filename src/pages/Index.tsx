import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import { LoginForm } from "@/components/auth/LoginForm";
import { BusinessRegistrationForm } from "@/components/auth/BusinessRegistrationForm";
import { PermissionRequestForm } from "@/components/auth/PermissionRequestForm";
import { OrganizationSetupForm } from "@/components/erp/OrganizationSetupForm";
import { ERPApp } from "@/components/erp/ERPApp";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { SupabaseService, Company, CompanyReport, ReportModule } from "@/lib/supabase";
import { mockCompanies, mockReportData, mockReportModules } from "@/lib/mockData";
import { useRealtime } from "@/hooks/useRealtime"
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const { user, isLoading } = useAuth();
  // State management
  const [companies, setCompanies] = useState<Company[]>([]);
  const [reportModules, setReportModules] = useState<ReportModule[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState('');
  const [reportData, setReportData] = useState<Record<number, Record<string, CompanyReport>>>({});
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [hasOrganization, setHasOrganization] = useState(false);
  const [checkingOrg, setCheckingOrg] = useState(true);
  
  // Realtime hook for live updates
  const {
    isConnected: isRealtimeConnected,
    subscribeToCompanyReports,
    subscribeToCompanyUpdates,
    subscribeToDashboardStats,
    testConnection
  } = useRealtime()
  const [showLogin, setShowLogin] = useState(false);
  const [showBusinessRegistration, setShowBusinessRegistration] = useState(false);
  const [showPermissionRequest, setShowPermissionRequest] = useState(false);

  // Load data from Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoadingData(true)
        
        // Load companies and report modules in parallel
        const [companiesData, modulesData] = await Promise.all([
          SupabaseService.getCompanies(),
          SupabaseService.getReportModules()
        ])
        
        setCompanies(companiesData)
        setReportModules(modulesData)
        
        // Load report data for all companies
        const allReportData: Record<number, Record<string, CompanyReport>> = {}
        
        for (const company of companiesData) {
          const companyReports = await SupabaseService.getLatestCompanyReports(company.id)
          allReportData[company.id] = {}
          
          companyReports.forEach(report => {
            allReportData[company.id][report.module_id] = report
          })
        }
        
        setReportData(allReportData)
        
      } catch (error) {
        console.error('Error loading data:', error)
        toast({
          title: "Lỗi tải dữ liệu",
          description: "Không thể tải dữ liệu từ database. Đang sử dụng dữ liệu mẫu.",
          variant: "destructive"
        })
        
        // Fallback to mock data if Supabase fails
        setCompanies(mockCompanies)
        setReportData(mockReportData)
      } finally {
        setIsLoadingData(false)
      }
    }
    
    loadData()
  }, [])
  
  // Set up realtime subscriptions for all companies
  useEffect(() => {
    if (companies.length === 0) return
    
    const subscriptions: any[] = []
    
    // Test connection first
    testConnection()
    
    // Subscribe to updates for each company
    companies.forEach(company => {
      // Subscribe to company reports
      const reportSub = subscribeToCompanyReports(company.id, (payload) => {
        console.log(`📊 Report update for ${company.name}:`, payload)
        
        // Update local state based on the payload
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          setReportData(prev => ({
            ...prev,
            [company.id]: {
              ...prev[company.id],
              [payload.new.module_id]: payload.new
            }
          }))
        } else if (payload.eventType === 'DELETE') {
          setReportData(prev => {
            const newData = { ...prev }
            if (newData[company.id]) {
              delete newData[company.id][payload.old.module_id]
            }
            return newData
          })
        }
      })
      
      // Subscribe to company updates
      const companySub = subscribeToCompanyUpdates(company.id, (payload) => {
        console.log(`🏢 Company update for ${company.name}:`, payload)
        
        // Update companies list
        if (payload.eventType === 'UPDATE') {
          setCompanies(prev => prev.map(c => 
            c.id === company.id ? { ...c, ...payload.new } : c
          ))
        }
      })
      
      // Subscribe to dashboard stats
      const statsSub = subscribeToDashboardStats(company.id, (payload) => {
        console.log(`📈 Stats update for ${company.name}:`, payload)
        // Dashboard stats updates can be handled here if needed
      })
      
      subscriptions.push(reportSub, companySub, statsSub)
    })
    
    // Cleanup subscriptions on unmount or when companies change
    return () => {
      subscriptions.forEach(sub => {
        if (sub && typeof sub.unsubscribe === 'function') {
          sub.unsubscribe()
        }
      })
    }
  }, [companies, subscribeToCompanyReports, subscribeToCompanyUpdates, subscribeToDashboardStats, testConnection])

  useEffect(() => {
    if (user) {
      checkUserOrganizations();
    } else {
      setCheckingOrg(false);
    }
  }, [user]);

  const checkUserOrganizations = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_organization_roles')
      .select('id')
      .eq('user_id', user.id)
      .limit(1);

    if (!error && data && data.length > 0) {
      setHasOrganization(true);
    }
    setCheckingOrg(false);
  };

  if (isLoading || checkingOrg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - show hero and login options
  if (!user) {
    if (showLogin) {
      return <LoginForm onBack={() => setShowLogin(false)} />;
    }
    
    if (showBusinessRegistration) {
      return <BusinessRegistrationForm onBack={() => setShowBusinessRegistration(false)} />;
    }
    
    if (showPermissionRequest) {
      return <PermissionRequestForm onBack={() => setShowPermissionRequest(false)} />;
    }

    return (
      <Hero 
        onLogin={() => setShowLogin(true)}
        onBusinessRegistration={() => setShowBusinessRegistration(true)}
        onPermissionRequest={() => setShowPermissionRequest(true)}
      />
    );
  }

  const getCurrentReportData = (companyId: number, moduleId: string) => {
    return reportData[companyId]?.[moduleId] || null
  }
  
  const getDepartmentTemplate = (moduleId: string) => {
     const module = reportModules.find(m => m.id === moduleId)
     return {
       fields: module?.fields || [],
       metrics: module?.metrics || []
     }
   }
   
   const handleInputChange = (field: string, value: any) => {
     setFormData(prev => ({
       ...prev,
       [field]: value
     }))
   }

  const handleSaveDraft = async () => {
    if (!selectedCompany || !selectedModule) return
    
    try {
      // Save as draft to Supabase
      const draftData = {
        company_id: selectedCompany.id,
        module_id: selectedModule,
        report_data: formData,
        status: 'draft' as const,
        submitted_by: user?.email || 'anonymous',
        version: 1
      }
      
      const savedDraft = await SupabaseService.createReport(draftData)
      
      if (savedDraft) {
        // Update local state
        setReportData(prev => ({
          ...prev,
          [selectedCompany.id]: {
            ...prev[selectedCompany.id],
            [selectedModule]: savedDraft
          }
        }))
        
        toast({
          title: "Bản nháp đã được lưu",
          description: "Dữ liệu đã được lưu vào database với trạng thái nháp."
        })
      }
      
    } catch (error) {
      console.error('Error saving draft:', error)
      // Fallback to localStorage
      const draftKey = `draft_${selectedCompany?.id}_${selectedModule}`
      localStorage.setItem(draftKey, JSON.stringify(formData))
      
      toast({
        title: "Bản nháp đã được lưu cục bộ",
        description: "Không thể lưu vào database, đã lưu tạm thời trên máy.",
        variant: "destructive"
      })
    }
  }

  // Handle report submission
  const handleReportSubmit = async () => {
    if (!selectedCompany || !selectedModule) return
    
    setIsSubmitting(true)
    
    try {
      // Create new report entry for Supabase
      const newReportData = {
        company_id: selectedCompany.id,
        module_id: selectedModule,
        report_data: formData,
        status: 'submitted' as const,
        submitted_by: user?.email || 'anonymous',
        submitted_at: new Date().toISOString(),
        version: 1
      }
      
      // Save to Supabase
      const savedReport = await SupabaseService.createReport(newReportData)
      
      if (savedReport) {
        // Update local state
        setReportData(prev => ({
          ...prev,
          [selectedCompany.id]: {
            ...prev[selectedCompany.id],
            [selectedModule]: savedReport
          }
        }))
        
        toast({
          title: "Báo cáo đã được gửi",
          description: `Báo cáo ${selectedModule} cho ${selectedCompany.name} đã được lưu vào database.`
        })
      }
      
      // Close modal and reset state
      setIsReportModalOpen(false)
      setSelectedModule('')
      setFormData({})
      
    } catch (error) {
      console.error('Error submitting report:', error)
      toast({
        title: "Lỗi gửi báo cáo",
        description: "Có lỗi xảy ra khi gửi báo cáo. Vui lòng thử lại.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state while data is being fetched
  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu từ database...</p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isRealtimeConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-500">
              {isRealtimeConnected ? 'Realtime: Đã kết nối' : 'Realtime: Đang kết nối...'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Authenticated - show ERP dashboard (organization setup moved to System section)
  return <ERPApp />;
};

export default Index;