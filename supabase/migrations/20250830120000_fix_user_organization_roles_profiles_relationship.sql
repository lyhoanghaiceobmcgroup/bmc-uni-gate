-- Fix foreign key relationship between user_organization_roles and profiles
-- The user_organization_roles table should reference profiles.id instead of auth.users(id)
-- since profiles.id is the primary key that references auth.users(id)

-- First, drop the existing foreign key constraint
ALTER TABLE public.user_organization_roles 
DROP CONSTRAINT IF EXISTS user_organization_roles_user_id_fkey;

-- Add the correct foreign key constraint to profiles table
ALTER TABLE public.user_organization_roles 
ADD CONSTRAINT user_organization_roles_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Update the types.ts file will need to be regenerated to reflect this change
-- The relationship should now properly connect user_organization_roles to profiles