-- Fix security warning: add search_path to function
CREATE OR REPLACE FUNCTION public.check_user_admin_role(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.user_organization_roles 
    WHERE user_organization_roles.user_id = $1 
    AND user_organization_roles.role = 'admin'
  );
$$;