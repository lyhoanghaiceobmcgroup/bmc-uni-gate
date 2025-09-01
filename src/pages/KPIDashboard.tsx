import React from 'react';
import KPIDashboard from '@/components/dashboard/KPIDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { useSearchParams } from 'react-router-dom';

const KPIDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  
  const level = searchParams.get('level') as 'personal' | 'department' | 'company' | 'group' || 'personal';
  const departmentId = searchParams.get('department') || undefined;
  const companyId = searchParams.get('company') || undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <KPIDashboard 
          level={level}
          departmentId={departmentId}
          companyId={companyId}
        />
      </div>
    </div>
  );
};

export default KPIDashboardPage;