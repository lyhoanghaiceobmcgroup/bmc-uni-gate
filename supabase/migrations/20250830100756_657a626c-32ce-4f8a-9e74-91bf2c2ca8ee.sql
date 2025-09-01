-- Add F1 level support and create BMC CEO account

-- First, update the organization_level enum to include F1
ALTER TYPE organization_level ADD VALUE IF NOT EXISTS 'F1';

-- Update organization levels in OrganizationSetupForm to include F1 with 80% equity
-- F1 represents Industrial Clusters where BMC owns 80% stake

-- Create consolidated_reports table for F1 level financial consolidation
CREATE TABLE IF NOT EXISTS public.consolidated_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cluster_id UUID NOT NULL, -- F1 organization ID
  reporting_period DATE NOT NULL,
  report_type TEXT NOT NULL CHECK (report_type IN ('monthly', 'quarterly', 'yearly')),
  
  -- Financial consolidation data
  total_revenue BIGINT DEFAULT 0,
  total_expenses BIGINT DEFAULT 0,
  net_profit BIGINT DEFAULT 0,
  total_assets BIGINT DEFAULT 0,
  total_liabilities BIGINT DEFAULT 0,
  
  -- Risk and compliance metrics
  risk_score INTEGER DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 100),
  compliance_status TEXT DEFAULT 'pending' CHECK (compliance_status IN ('compliant', 'non_compliant', 'pending')),
  
  -- Portfolio metrics
  portfolio_value BIGINT DEFAULT 0,
  roi_percentage NUMERIC(5,2) DEFAULT 0,
  
  organization_id UUID NOT NULL,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on consolidated_reports
ALTER TABLE public.consolidated_reports ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for consolidated_reports
CREATE POLICY "Users can access consolidated reports for their organizations" 
ON public.consolidated_reports 
FOR SELECT 
USING (user_has_org_access(auth.uid(), organization_id));

-- Create cluster_portfolios table for F1 portfolio management
CREATE TABLE IF NOT EXISTS public.cluster_portfolios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cluster_id UUID NOT NULL, -- F1 organization ID
  child_organization_id UUID NOT NULL, -- F2, F3, F4, F5 organizations under this cluster
  investment_amount BIGINT DEFAULT 0,
  equity_percentage NUMERIC(5,2) DEFAULT 0,
  investment_date DATE DEFAULT CURRENT_DATE,
  current_valuation BIGINT DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'divested', 'under_review')),
  
  organization_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on cluster_portfolios
ALTER TABLE public.cluster_portfolios ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for cluster_portfolios
CREATE POLICY "Users can access cluster portfolios for their organizations" 
ON public.cluster_portfolios 
FOR SELECT 
USING (user_has_org_access(auth.uid(), organization_id));

-- Create strategic_initiatives table for F1 R&D and innovation tracking
CREATE TABLE IF NOT EXISTS public.strategic_initiatives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cluster_id UUID NOT NULL, -- F1 organization ID
  initiative_name TEXT NOT NULL,
  initiative_type TEXT NOT NULL CHECK (initiative_type IN ('r_and_d', 'market_expansion', 'digital_transformation', 'sustainability', 'brand_development')),
  budget_allocated BIGINT DEFAULT 0,
  budget_spent BIGINT DEFAULT 0,
  start_date DATE,
  target_completion_date DATE,
  actual_completion_date DATE,
  status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'completed', 'cancelled', 'on_hold')),
  expected_roi NUMERIC(5,2) DEFAULT 0,
  actual_roi NUMERIC(5,2) DEFAULT 0,
  
  organization_id UUID NOT NULL,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on strategic_initiatives
ALTER TABLE public.strategic_initiatives ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for strategic_initiatives
CREATE POLICY "Users can access strategic initiatives for their organizations" 
ON public.strategic_initiatives 
FOR SELECT 
USING (user_has_org_access(auth.uid(), organization_id));

-- Create triggers for updated_at columns
CREATE TRIGGER update_consolidated_reports_updated_at
  BEFORE UPDATE ON public.consolidated_reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cluster_portfolios_updated_at
  BEFORE UPDATE ON public.cluster_portfolios
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_strategic_initiatives_updated_at
  BEFORE UPDATE ON public.strategic_initiatives
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();