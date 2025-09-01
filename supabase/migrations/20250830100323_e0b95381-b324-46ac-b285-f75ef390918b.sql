-- Fix the organizations RLS policy security issue
-- The current policy incorrectly references user_organization_roles.id instead of organizations.id

-- Drop the existing flawed policy
DROP POLICY IF EXISTS "Users can view organizations they have access to" ON public.organizations;

-- Create the corrected policy that properly references organizations.id
CREATE POLICY "Users can view organizations they have access to" 
ON public.organizations 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM user_organization_roles 
    WHERE user_organization_roles.user_id = auth.uid() 
    AND user_organization_roles.organization_id = organizations.id
  )
);