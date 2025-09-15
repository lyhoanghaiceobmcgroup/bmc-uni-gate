-- Create ai_insights table for storing AI-generated insights and recommendations
-- This table will store AI analysis results for companies and departments

CREATE TABLE IF NOT EXISTS public.ai_insights (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Reference Information
    entity_type TEXT NOT NULL CHECK (entity_type IN ('company', 'department', 'consolidated')),
    entity_id TEXT NOT NULL, -- company_id or department_id
    entity_name TEXT NOT NULL,
    
    -- Insight Content
    insight_type TEXT NOT NULL CHECK (insight_type IN ('performance', 'risk', 'opportunity', 'recommendation', 'trend', 'forecast')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    confidence_score INTEGER DEFAULT 0 CHECK (confidence_score >= 0 AND confidence_score <= 100),
    
    -- AI Analysis Data
    analysis_data JSONB DEFAULT '{}'::jsonb,
    metrics JSONB DEFAULT '{}'::jsonb,
    recommendations JSONB DEFAULT '[]'::jsonb,
    
    -- Priority and Status
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'dismissed')),
    
    -- Time-based Information
    analysis_period_start DATE,
    analysis_period_end DATE,
    
    -- Metadata
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ai_insights_entity_type ON public.ai_insights(entity_type);
CREATE INDEX IF NOT EXISTS idx_ai_insights_entity_id ON public.ai_insights(entity_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_insight_type ON public.ai_insights(insight_type);
CREATE INDEX IF NOT EXISTS idx_ai_insights_priority ON public.ai_insights(priority);
CREATE INDEX IF NOT EXISTS idx_ai_insights_status ON public.ai_insights(status);
CREATE INDEX IF NOT EXISTS idx_ai_insights_created_at ON public.ai_insights(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_insights_created_by ON public.ai_insights(created_by);

-- Enable Row Level Security (RLS)
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for ai_insights
-- Users can view insights for entities they have access to
CREATE POLICY "Users can view ai insights" ON public.ai_insights
    FOR SELECT USING (
        auth.uid() = created_by OR
        EXISTS (
            SELECT 1 FROM public.user_organization_roles uor
            WHERE uor.user_id = auth.uid() 
            AND uor.role IN ('admin', 'manager', 'employee')
        )
    );

-- Users can insert ai insights
CREATE POLICY "Users can create ai insights" ON public.ai_insights
    FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Users can update ai insights
CREATE POLICY "Users can update ai insights" ON public.ai_insights
    FOR UPDATE USING (
        auth.uid() = created_by OR
        EXISTS (
            SELECT 1 FROM public.user_organization_roles uor
            WHERE uor.user_id = auth.uid() 
            AND uor.role IN ('admin', 'manager')
        )
    );

-- Users can delete ai insights
CREATE POLICY "Users can delete ai insights" ON public.ai_insights
    FOR DELETE USING (
        auth.uid() = created_by OR
        EXISTS (
            SELECT 1 FROM public.user_organization_roles uor
            WHERE uor.user_id = auth.uid() 
            AND uor.role IN ('admin', 'manager')
        )
    );

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_ai_insights_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_ai_insights_updated_at
    BEFORE UPDATE ON public.ai_insights
    FOR EACH ROW
    EXECUTE FUNCTION update_ai_insights_updated_at();

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_insights TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Add comments for documentation
COMMENT ON TABLE public.ai_insights IS 'AI-generated insights and recommendations for companies and departments';
COMMENT ON COLUMN public.ai_insights.analysis_data IS 'Raw analysis data and metrics used to generate the insight';
COMMENT ON COLUMN public.ai_insights.recommendations IS 'AI-generated recommendations as JSON array';
COMMENT ON COLUMN public.ai_insights.confidence_score IS 'AI confidence level in the insight (0-100)';