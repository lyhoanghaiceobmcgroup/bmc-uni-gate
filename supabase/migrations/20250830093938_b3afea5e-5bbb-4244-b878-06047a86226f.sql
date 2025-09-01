-- Create enum for organization levels
CREATE TYPE public.organization_level AS ENUM ('F5', 'F4', 'F3', 'F2', 'F1');

-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM (
  'admin', 'ceo', 'cfo', 'coo', 'cmo', 'chro', 
  'founder', 'co_founder', 'investor', 'manager', 
  'employee', 'bmc_representative'
);

-- Create enum for project status
CREATE TYPE public.project_status AS ENUM ('planning', 'active', 'completed', 'suspended');

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create organizations table
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE,
  tax_code TEXT,
  level organization_level NOT NULL,
  parent_id UUID REFERENCES public.organizations(id),
  industry TEXT,
  main_products TEXT[],
  bmc_equity_percentage NUMERIC(5,2) DEFAULT 0,
  total_investment_value BIGINT DEFAULT 0,
  investment_year INTEGER,
  description TEXT,
  status project_status DEFAULT 'planning',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on organizations
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Create user_organization_roles table
CREATE TABLE public.user_organization_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, organization_id)
);

-- Enable RLS on user_organization_roles
ALTER TABLE public.user_organization_roles ENABLE ROW LEVEL SECURITY;

-- Create departments table
CREATE TABLE public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  manager_id UUID REFERENCES auth.users(id),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on departments
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  department_id UUID REFERENCES public.departments(id),
  manager_id UUID REFERENCES auth.users(id),
  description TEXT,
  start_date DATE,
  end_date DATE,
  budget BIGINT DEFAULT 0,
  spent_amount BIGINT DEFAULT 0,
  status project_status DEFAULT 'planning',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create tasks table
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  assignee_id UUID REFERENCES auth.users(id),
  creator_id UUID NOT NULL REFERENCES auth.users(id),
  due_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on tasks
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create financial_records table
CREATE TABLE public.financial_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'income', 'expense', 'investment'
  category TEXT NOT NULL,
  amount BIGINT NOT NULL,
  description TEXT,
  transaction_date DATE DEFAULT CURRENT_DATE,
  recorded_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on financial_records
ALTER TABLE public.financial_records ENABLE ROW LEVEL SECURITY;

-- Create inventory table
CREATE TABLE public.inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  product_code TEXT,
  category TEXT,
  quantity INTEGER DEFAULT 0,
  unit_price BIGINT DEFAULT 0,
  min_stock_level INTEGER DEFAULT 0,
  supplier_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on inventory
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- Create customers table
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  customer_type TEXT DEFAULT 'individual', -- 'individual', 'business'
  loyalty_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on customers
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id),
  order_number TEXT UNIQUE NOT NULL,
  total_amount BIGINT NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'pending',
  order_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID NOT NULL REFERENCES auth.users(id)
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create function to handle user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to check user organization access
CREATE OR REPLACE FUNCTION public.user_has_org_access(user_id UUID, org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_organization_roles
    WHERE user_organization_roles.user_id = $1 
    AND user_organization_roles.organization_id = $2
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create RLS policies for organizations
CREATE POLICY "Users can view organizations they have access to" ON public.organizations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_organization_roles
      WHERE user_organization_roles.user_id = auth.uid()
      AND user_organization_roles.organization_id = id
    )
  );

CREATE POLICY "Users with admin role can manage organizations" ON public.organizations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_organization_roles
      WHERE user_organization_roles.user_id = auth.uid()
      AND user_organization_roles.role = 'admin'
    )
  );

-- Create RLS policies for user_organization_roles
CREATE POLICY "Users can view their own roles" ON public.user_organization_roles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage roles" ON public.user_organization_roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_organization_roles AS uor
      WHERE uor.user_id = auth.uid()
      AND uor.role = 'admin'
    )
  );

-- Create RLS policies for other tables
CREATE POLICY "Users can access department data for their organizations" ON public.departments
  FOR SELECT USING (public.user_has_org_access(auth.uid(), organization_id));

CREATE POLICY "Users can access project data for their organizations" ON public.projects
  FOR SELECT USING (public.user_has_org_access(auth.uid(), organization_id));

CREATE POLICY "Users can access task data for their organizations" ON public.tasks
  FOR SELECT USING (public.user_has_org_access(auth.uid(), organization_id));

CREATE POLICY "Users can access financial data for their organizations" ON public.financial_records
  FOR SELECT USING (public.user_has_org_access(auth.uid(), organization_id));

CREATE POLICY "Users can access inventory data for their organizations" ON public.inventory
  FOR SELECT USING (public.user_has_org_access(auth.uid(), organization_id));

CREATE POLICY "Users can access customer data for their organizations" ON public.customers
  FOR SELECT USING (public.user_has_org_access(auth.uid(), organization_id));

CREATE POLICY "Users can access order data for their organizations" ON public.orders
  FOR SELECT USING (public.user_has_org_access(auth.uid(), organization_id));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON public.departments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON public.inventory FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();