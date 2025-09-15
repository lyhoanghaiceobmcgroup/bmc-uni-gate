-- Add cluster and database_file_name columns to organizations table
ALTER TABLE public.organizations 
ADD COLUMN cluster TEXT,
ADD COLUMN database_file_name TEXT;

-- Add index for better performance
CREATE INDEX idx_organizations_cluster ON public.organizations(cluster);
CREATE INDEX idx_organizations_database_file_name ON public.organizations(database_file_name);

-- Add comment for documentation
COMMENT ON COLUMN public.organizations.cluster IS 'Industry cluster that the organization belongs to';
COMMENT ON COLUMN public.organizations.database_file_name IS 'Unique database file name generated based on organization name and level';