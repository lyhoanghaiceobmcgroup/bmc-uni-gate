import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2, RefreshCw } from 'lucide-react';

interface Organization {
  id: string;
  name: string;
  code: string | null;
  level: string;
  industry: string | null;
  created_at: string;
}

const DeleteCompanies = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const loadOrganizations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrganizations(data || []);
    } catch (error) {
      console.error('Error loading organizations:', error);
      toast.error('Lỗi tải danh sách công ty');
    } finally {
      setLoading(false);
    }
  };

  const deleteOrganizationRecursive = async (orgId: string): Promise<boolean> => {
    try {
      // First, find all child organizations
      const { data: childOrgs, error: childError } = await supabase
        .from('organizations')
        .select('id, name')
        .eq('parent_id', orgId);

      if (childError) {
        console.error('Error finding child organizations:', childError);
        return false;
      }

      // Recursively delete all child organizations first
      if (childOrgs && childOrgs.length > 0) {
        for (const child of childOrgs) {
          const success = await deleteOrganizationRecursive(child.id);
          if (!success) {
            return false;
          }
        }
      }

      // Delete related user_organization_roles for this organization
      const { error: roleDeleteError } = await supabase
        .from('user_organization_roles')
        .delete()
        .eq('organization_id', orgId);

      if (roleDeleteError) {
        console.error('Error deleting roles:', roleDeleteError);
        return false;
      }

      // Delete other related records that might reference this organization
      const relatedTables = [
        'departments', 'projects', 'tasks', 'financial_records', 
        'inventory', 'customers', 'orders', 'consolidated_reports',
        'cluster_portfolios', 'strategic_initiatives'
      ];

      for (const table of relatedTables) {
        const { error } = await supabase
          .from(table)
          .delete()
          .eq('organization_id', orgId);
        
        if (error && error.code !== '42P01') { // Ignore table not found errors
          console.warn(`Warning deleting from ${table}:`, error);
        }
      }

      // Finally delete the organization itself
      const { error: orgDeleteError } = await supabase
        .from('organizations')
        .delete()
        .eq('id', orgId);

      if (orgDeleteError) {
        console.error('Error deleting organization:', orgDeleteError);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Unexpected error in recursive delete:', error);
      return false;
    }
  };

  const deleteOrganization = async (org: Organization) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa công ty "${org.name}" và tất cả công ty con (nếu có)?`)) {
      return;
    }

    setDeleting(org.id);
    try {
      const success = await deleteOrganizationRecursive(org.id);
      
      if (success) {
        toast.success(`Đã xóa công ty "${org.name}" và tất cả công ty con thành công`);
        await loadOrganizations(); // Reload the list
      } else {
        toast.error('Lỗi xóa công ty');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Lỗi không mong muốn');
    } finally {
      setDeleting(null);
    }
  };

  const deleteTargetCompanies = async () => {
    const targetCompanies = organizations.filter(org => 
      org.level === 'F2' || org.level === 'F3' || org.level === 'F4' || org.level === 'F5'
    );

    if (targetCompanies.length === 0) {
      toast.info('Không tìm thấy công ty nào có cấp độ F2, F3, F4, F5');
      return;
    }

    if (!confirm(`Bạn có chắc chắn muốn xóa ${targetCompanies.length} công ty cấp F2, F3, F4, F5?`)) {
      return;
    }

    for (const org of targetCompanies) {
      await deleteOrganization(org);
    }
  };

  useEffect(() => {
    loadOrganizations();
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quản lý Công ty</CardTitle>
          <div className="flex gap-2">
            <Button 
              onClick={loadOrganizations} 
              disabled={loading}
              variant="outline"
              size="sm"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Tải lại
            </Button>
            <Button 
              onClick={deleteTargetCompanies}
              variant="destructive"
              size="sm"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Xóa F2, F3, F4, F5
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Đang tải...</div>
        ) : organizations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Không có công ty nào</div>
        ) : (
          <div className="space-y-4">
            {organizations.map((org) => (
              <div key={org.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{org.name}</h3>
                  <p className="text-sm text-gray-600">
                    Mã: {org.code || 'N/A'} | Cấp: {org.level} | Ngành: {org.industry || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-400">
                    Tạo lúc: {new Date(org.created_at).toLocaleString('vi-VN')}
                  </p>
                </div>
                <Button
                  onClick={() => deleteOrganization(org)}
                  variant="destructive"
                  size="sm"
                  disabled={deleting === org.id}
                >
                  {deleting === org.id ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeleteCompanies;