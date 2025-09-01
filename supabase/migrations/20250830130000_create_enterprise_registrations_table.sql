-- Create enterprise_registrations table to store new enterprise registration data
-- This table will store the registration information for newly created companies

CREATE TABLE IF NOT EXISTS public.enterprise_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id TEXT NOT NULL UNIQUE,
    registration_data JSONB NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    notes TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_enterprise_registrations_company_id ON public.enterprise_registrations(company_id);
CREATE INDEX IF NOT EXISTS idx_enterprise_registrations_status ON public.enterprise_registrations(status);
CREATE INDEX IF NOT EXISTS idx_enterprise_registrations_created_by ON public.enterprise_registrations(created_by);
CREATE INDEX IF NOT EXISTS idx_enterprise_registrations_created_at ON public.enterprise_registrations(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.enterprise_registrations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can view their own registrations
CREATE POLICY "Users can view their own enterprise registrations" ON public.enterprise_registrations
    FOR SELECT USING (auth.uid() = created_by);

-- Users can insert their own registrations
CREATE POLICY "Users can create enterprise registrations" ON public.enterprise_registrations
    FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Users can update their own pending registrations
CREATE POLICY "Users can update their own pending registrations" ON public.enterprise_registrations
    FOR UPDATE USING (auth.uid() = created_by AND status = 'pending');

-- Admins can view all registrations (assuming admin role exists)
CREATE POLICY "Admins can view all enterprise registrations" ON public.enterprise_registrations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_organization_roles uor
            WHERE uor.user_id = auth.uid() 
            AND uor.role = 'admin'
        )
    );

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_enterprise_registrations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_enterprise_registrations_updated_at
    BEFORE UPDATE ON public.enterprise_registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_enterprise_registrations_updated_at();

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON public.enterprise_registrations TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;