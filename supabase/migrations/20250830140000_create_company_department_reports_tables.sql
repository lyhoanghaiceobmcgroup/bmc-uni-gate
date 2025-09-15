-- Create company_reports and department_reports tables for standardized reporting
-- These tables will store comprehensive report data for all companies including new enterprises

-- Create company_reports table
CREATE TABLE IF NOT EXISTS public.company_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id TEXT NOT NULL,
    company_name TEXT NOT NULL,
    report_date DATE NOT NULL,
    report_type TEXT DEFAULT 'initial_registration' CHECK (report_type IN ('initial_registration', 'monthly', 'quarterly', 'yearly')),
    
    -- Financial Metrics
    revenue BIGINT DEFAULT 0,
    total_profit BIGINT DEFAULT 0,
    total_assets BIGINT DEFAULT 0,
    total_expenses BIGINT DEFAULT 0,
    net_profit BIGINT DEFAULT 0,
    total_liabilities BIGINT DEFAULT 0,
    
    -- Operational Metrics
    employee_count INTEGER DEFAULT 0,
    kpi_score INTEGER DEFAULT 0 CHECK (kpi_score >= 0 AND kpi_score <= 100),
    
    -- Risk and Compliance
    risk_score INTEGER DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 100),
    compliance_status TEXT DEFAULT 'pending' CHECK (compliance_status IN ('compliant', 'non_compliant', 'pending')),
    compliance_score INTEGER DEFAULT 0 CHECK (compliance_score >= 0 AND compliance_score <= 100),
    
    -- Portfolio Metrics
    portfolio_value BIGINT DEFAULT 0,
    roi_percentage NUMERIC(5,2) DEFAULT 0,
    
    -- Business Information
    industry TEXT,
    business_type TEXT,
    business_field TEXT,
    establishment_year INTEGER,
    
    -- BMC Investment Details
    bmc_equity_percentage NUMERIC(5,2) DEFAULT 0,
    bmc_investment_amount BIGINT DEFAULT 0,
    
    -- Contact Information
    address TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    
    -- Representative Information
    representative_name TEXT,
    representative_position TEXT,
    representative_phone TEXT,
    representative_email TEXT,
    
    -- Business Strategy
    main_products TEXT,
    business_objectives TEXT,
    market_target TEXT,
    competitive_advantage TEXT,
    business_description TEXT,
    
    -- Organizational Details
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    organizational_level TEXT DEFAULT 'F5' CHECK (organizational_level IN ('BMC', 'F1', 'F2', 'F3', 'F4', 'F5')),
    
    -- AI Insights
    ai_insights JSONB DEFAULT '[]'::jsonb,
    
    -- Metadata
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create department_reports table
CREATE TABLE IF NOT EXISTS public.department_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    department_id TEXT NOT NULL,
    company_id TEXT NOT NULL,
    department_name TEXT NOT NULL,
    report_date DATE NOT NULL,
    
    -- Financial Metrics
    revenue BIGINT DEFAULT 0,
    employee_count INTEGER DEFAULT 0,
    kpi_score INTEGER DEFAULT 0 CHECK (kpi_score >= 0 AND kpi_score <= 100),
    
    -- Department-specific KPIs (stored as JSONB for flexibility)
    kpis JSONB DEFAULT '{}'::jsonb,
    
    -- Status
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'restructuring')),
    
    -- Metadata
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
-- Company Reports Indexes
CREATE INDEX IF NOT EXISTS idx_company_reports_company_id ON public.company_reports(company_id);
CREATE INDEX IF NOT EXISTS idx_company_reports_report_date ON public.company_reports(report_date);
CREATE INDEX IF NOT EXISTS idx_company_reports_organizational_level ON public.company_reports(organizational_level);
CREATE INDEX IF NOT EXISTS idx_company_reports_status ON public.company_reports(status);
CREATE INDEX IF NOT EXISTS idx_company_reports_created_by ON public.company_reports(created_by);
CREATE INDEX IF NOT EXISTS idx_company_reports_industry ON public.company_reports(industry);

-- Department Reports Indexes
CREATE INDEX IF NOT EXISTS idx_department_reports_department_id ON public.department_reports(department_id);
CREATE INDEX IF NOT EXISTS idx_department_reports_company_id ON public.department_reports(company_id);
CREATE INDEX IF NOT EXISTS idx_department_reports_department_name ON public.department_reports(department_name);
CREATE INDEX IF NOT EXISTS idx_department_reports_report_date ON public.department_reports(report_date);
CREATE INDEX IF NOT EXISTS idx_department_reports_status ON public.department_reports(status);
CREATE INDEX IF NOT EXISTS idx_department_reports_created_by ON public.department_reports(created_by);

-- Enable Row Level Security (RLS)
ALTER TABLE public.company_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.department_reports ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for company_reports
-- Users can view reports for companies they have access to
CREATE POLICY "Users can view company reports" ON public.company_reports
    FOR SELECT USING (
        auth.uid() = created_by OR
        EXISTS (
            SELECT 1 FROM public.user_organization_roles uor
            WHERE uor.user_id = auth.uid() 
            AND uor.role IN ('admin', 'manager', 'employee')
        )
    );

-- Users can insert company reports
CREATE POLICY "Users can create company reports" ON public.company_reports
    FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Users can update their own company reports
CREATE POLICY "Users can update company reports" ON public.company_reports
    FOR UPDATE USING (
        auth.uid() = created_by OR
        EXISTS (
            SELECT 1 FROM public.user_organization_roles uor
            WHERE uor.user_id = auth.uid() 
            AND uor.role IN ('admin', 'manager')
        )
    );

-- Create RLS policies for department_reports
-- Users can view department reports for companies they have access to
CREATE POLICY "Users can view department reports" ON public.department_reports
    FOR SELECT USING (
        auth.uid() = created_by OR
        EXISTS (
            SELECT 1 FROM public.user_organization_roles uor
            WHERE uor.user_id = auth.uid() 
            AND uor.role IN ('admin', 'manager', 'employee')
        )
    );

-- Users can insert department reports
CREATE POLICY "Users can create department reports" ON public.department_reports
    FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Users can update their own department reports
CREATE POLICY "Users can update department reports" ON public.department_reports
    FOR UPDATE USING (
        auth.uid() = created_by OR
        EXISTS (
            SELECT 1 FROM public.user_organization_roles uor
            WHERE uor.user_id = auth.uid() 
            AND uor.role IN ('admin', 'manager')
        )
    );

-- Create triggers to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_company_reports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_department_reports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_company_reports_updated_at
    BEFORE UPDATE ON public.company_reports
    FOR EACH ROW
    EXECUTE FUNCTION update_company_reports_updated_at();

CREATE TRIGGER trigger_update_department_reports_updated_at
    BEFORE UPDATE ON public.department_reports
    FOR EACH ROW
    EXECUTE FUNCTION update_department_reports_updated_at();

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON public.company_reports TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.department_reports TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Add comments for documentation
COMMENT ON TABLE public.company_reports IS 'Comprehensive company reports with financial, operational, and strategic metrics';
COMMENT ON TABLE public.department_reports IS 'Department-level reports with KPIs and performance metrics for each company department';
COMMENT ON COLUMN public.company_reports.ai_insights IS 'AI-generated insights and recommendations stored as JSON array';
COMMENT ON COLUMN public.department_reports.kpis IS 'Department-specific KPIs stored as flexible JSON object';