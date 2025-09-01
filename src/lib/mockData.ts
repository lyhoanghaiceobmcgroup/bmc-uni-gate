// Mock data for development and testing

export interface Company {
  id: string;
  name: string;
  type: 'corporation' | 'cluster' | 'company' | 'project' | 'department';
  description?: string;
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
  updated_at: string;
  taxCode?: string;
  level?: string;
  cluster?: string;
  bmcOwnership?: number;
  complianceScore?: number;
  location?: string;
  industry?: string;
  totalRevenue?: number;
  employeeCount?: number;
  establishedYear?: number;
}

export interface Department {
  id: string;
  name: string;
  company_id: string;
  manager: string;
  employeeCount: number;
  budget: number;
  description: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface DepartmentReport {
  id: string;
  department_id: string;
  company_id: string;
  module_id: string;
  data: Record<string, any>;
  status: 'draft' | 'submitted' | 'approved';
  created_at: string;
  updated_at: string;
  submitted_by?: string;
  approved_by?: string;
}

export interface CompanyReport {
  id: string;
  company_id: string;
  module_id: string;
  data: Record<string, any>;
  status: 'draft' | 'submitted' | 'approved';
  created_at: string;
  updated_at: string;
}

export interface ReportModule {
  id: string;
  name: string;
  description: string;
  fields: string[];
  metrics?: string[];
  template: Record<string, any>;
}

export const mockCompanies: Company[] = [
  {
    id: 'bmc-corp',
    name: 'BMC Holdings Corporation',
    type: 'corporation',
    description: 'Tập đoàn BMC Holdings - Công ty mẹ quản lý toàn bộ hệ sinh thái BMC',
    status: 'active',
    taxCode: '0100000001',
    level: 'BMC',
    cluster: 'Headquarters',
    bmcOwnership: 100,
    complianceScore: 98,
    location: 'Hà Nội, Việt Nam',
    industry: 'Tập đoàn đa ngành',
    totalRevenue: 50000000000,
    employeeCount: 5000,
    establishedYear: 2010,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-22T00:00:00Z'
  },
  {
    id: 'new-company-001',
    name: 'BMC Smart Agriculture',
    type: 'company',
    description: 'Công ty nông nghiệp thông minh và công nghệ sinh học',
    status: 'active',
    taxCode: '0100000013',
    level: 'New',
    cluster: 'Agriculture',
    bmcOwnership: 35,
    complianceScore: 78,
    location: 'Cần Thơ, Việt Nam',
    industry: 'Nông nghiệp công nghệ cao',
    totalRevenue: 450000000,
    employeeCount: 65,
    establishedYear: 2024,
    created_at: '2025-01-20T00:00:00Z',
    updated_at: '2025-01-22T00:00:00Z'
  }
];

export const mockDepartments: Department[] = [
  {
    id: 'dept-bmc-001',
    name: 'Ban Điều hành',
    company_id: 'bmc-corp',
    manager: 'Nguyễn Văn A',
    employeeCount: 25,
    budget: 5000000000,
    description: 'Ban điều hành tập đoàn, quản lý chiến lược và định hướng phát triển',
    status: 'active',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-22T00:00:00Z'
  },
  {
    id: 'dept-newagri-001',
    name: 'Phòng Nghiên cứu Sinh học',
    company_id: 'new-company-001',
    manager: 'Nguyễn Thị Lan',
    employeeCount: 15,
    budget: 180000000,
    description: 'Nghiên cứu và phát triển công nghệ sinh học ứng dụng',
    status: 'active',
    created_at: '2025-01-20T00:00:00Z',
    updated_at: '2025-01-22T00:00:00Z'
  }
];

export const mockReportModules: ReportModule[] = [
  {
    id: 'sales',
    name: 'Báo cáo Kinh doanh',
    description: 'Báo cáo doanh thu và hoạt động kinh doanh',
    fields: ['Doanh thu', 'Số hợp đồng', 'Khách hàng mới'],
    metrics: ['Tăng trưởng', 'Tỷ lệ chuyển đổi', 'Giá trị trung bình'],
    template: {
      revenue: 0,
      contracts: 0,
      customers: 0
    }
  },
  {
    id: 'marketing',
    name: 'Báo cáo Marketing',
    description: 'Báo cáo hoạt động marketing và quảng cáo',
    fields: ['Chiến dịch', 'Ngân sách', 'Hiệu quả'],
    metrics: ['CTR', 'CPA', 'ROI'],
    template: {
      campaigns: 0,
      budget: 0,
      roi: 0
    }
  },
  {
    id: 'finance',
    name: 'Báo cáo Tài chính',
    description: 'Báo cáo tình hình tài chính',
    fields: ['Thu nhập', 'Chi phí', 'Lợi nhuận'],
    metrics: ['Biên lợi nhuận', 'ROA', 'ROE'],
    template: {
      income: 0,
      expenses: 0,
      profit: 0
    }
  }
];

export const mockReportData: Record<string, Record<string, CompanyReport>> = {
  'bmc-corp': {
    sales: {
      id: 'report_bmc_sales',
      company_id: 'bmc-corp',
      module_id: 'sales',
      data: {
        revenue: 50000000000,
        contracts: 125,
        customers: 850,
        growth_rate: 15.2,
        market_share: 25.8
      },
      status: 'approved',
      created_at: '2025-01-15T00:00:00Z',
      updated_at: '2025-01-22T00:00:00Z'
    }
  },
  'new-company-001': {
    sales: {
      id: 'report_newagri_sales',
      company_id: 'new-company-001',
      module_id: 'sales',
      data: {
        revenue: 450000000,
        contracts: 18,
        customers: 85,
        crop_yield_improvement: 25,
        smart_farm_deployments: 12
      },
      status: 'submitted',
      created_at: '2025-01-20T00:00:00Z',
      updated_at: '2025-01-22T00:00:00Z'
    }
  }
};

export const mockDepartmentReports: Record<string, Record<string, DepartmentReport>> = {
  'dept-bmc-001': {
    finance: {
      id: 'dept_report_bmc001_finance',
      department_id: 'dept-bmc-001',
      company_id: 'bmc-corp',
      module_id: 'finance',
      data: {
        budget_utilization: 85,
        strategic_initiatives: 8,
        board_meetings: 12,
        governance_score: 95
      },
      status: 'approved',
      created_at: '2025-01-15T00:00:00Z',
      updated_at: '2025-01-22T00:00:00Z',
      submitted_by: 'Nguyễn Văn A',
      approved_by: 'CEO BMC'
    }
  },
  'dept-newagri-001': {
    sales: {
      id: 'dept_report_newagri001_sales',
      department_id: 'dept-newagri-001',
      company_id: 'new-company-001',
      module_id: 'sales',
      data: {
        research_projects: 8,
        biotech_innovations: 5,
        patent_applications: 3,
        lab_efficiency: 92
      },
      status: 'submitted',
      created_at: '2025-01-20T00:00:00Z',
      updated_at: '2025-01-22T00:00:00Z',
      submitted_by: 'Nguyễn Thị Lan'
    }
  }
};