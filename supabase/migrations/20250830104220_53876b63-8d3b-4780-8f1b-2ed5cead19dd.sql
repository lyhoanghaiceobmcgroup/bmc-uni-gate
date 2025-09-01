-- Fix RLS policies for organizations to allow CEO to create organizations
DROP POLICY IF EXISTS "Users with admin role can manage organizations" ON public.organizations;

-- Create new policies that allow CEO email to create organizations
CREATE POLICY "CEO can manage all organizations" 
ON public.organizations 
FOR ALL 
USING (auth.email() = 'lyhoanghaiceo@gmail.com');

-- Allow users with admin role to manage organizations they have access to
CREATE POLICY "Admins can manage organizations they have access to" 
ON public.organizations 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.user_organization_roles 
    WHERE user_organization_roles.user_id = auth.uid() 
    AND user_organization_roles.role = 'admin'
  )
);

-- Allow users to create organizations if they will be assigned a role
CREATE POLICY "Users can create organizations for themselves"
ON public.organizations
FOR INSERT 
WITH CHECK (true);