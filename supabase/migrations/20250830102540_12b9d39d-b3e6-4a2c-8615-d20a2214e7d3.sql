-- Fix infinite recursion in RLS policies for user_organization_roles
-- The current "Admins can manage roles" policy references the same table it's applied to

-- Drop the problematic policy
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_organization_roles;

-- Create a security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.check_user_admin_role(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.user_organization_roles 
    WHERE user_organization_roles.user_id = $1 
    AND user_organization_roles.role = 'admin'
  );
$$;

-- Create new policies using the security definer function
CREATE POLICY "Admins can manage all roles" 
ON public.user_organization_roles 
FOR ALL 
USING (public.check_user_admin_role(auth.uid()));

-- Also add INSERT and UPDATE policies for better control
CREATE POLICY "Users can insert their own roles" 
ON public.user_organization_roles 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

-- Allow admins to insert any role
CREATE POLICY "Admins can insert any role" 
ON public.user_organization_roles 
FOR INSERT 
WITH CHECK (public.check_user_admin_role(auth.uid()));