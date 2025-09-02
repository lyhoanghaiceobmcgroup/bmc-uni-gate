import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteCompanies() {
  try {
    // First, get all organizations to see what we have
    const { data: allOrgs, error: fetchError } = await supabase
      .from('organizations')
      .select('*');
    
    if (fetchError) {
      console.error('Error fetching organizations:', fetchError);
      return;
    }
    
    console.log('All organizations:', allOrgs);
    
    // Find organizations with names containing 'Olada' or 'adu'
    const toDelete = allOrgs.filter(org => 
      org.name.toLowerCase().includes('olada') || 
      org.name.toLowerCase().includes('adu')
    );
    
    console.log('Organizations to delete:', toDelete);
    
    if (toDelete.length === 0) {
      console.log('No organizations found with names containing "Olada" or "adu"');
      return;
    }
    
    // Delete the organizations
    for (const org of toDelete) {
      console.log(`Deleting organization: ${org.name} (ID: ${org.id})`);
      
      // First delete related user_organization_roles
      const { error: roleDeleteError } = await supabase
        .from('user_organization_roles')
        .delete()
        .eq('organization_id', org.id);
      
      if (roleDeleteError) {
        console.error(`Error deleting roles for ${org.name}:`, roleDeleteError);
        continue;
      }
      
      // Then delete the organization
      const { error: orgDeleteError } = await supabase
        .from('organizations')
        .delete()
        .eq('id', org.id);
      
      if (orgDeleteError) {
        console.error(`Error deleting organization ${org.name}:`, orgDeleteError);
      } else {
        console.log(`Successfully deleted organization: ${org.name}`);
      }
    }
    
    console.log('Deletion process completed.');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the deletion
deleteCompanies();