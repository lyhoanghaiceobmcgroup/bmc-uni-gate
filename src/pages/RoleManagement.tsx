import React from 'react';
import RoleManagement from '@/components/auth/RoleBasedAccess';
import { RBACProvider } from '@/components/auth/RoleBasedAccess';

const RoleManagementPage = () => {
  return (
    <RBACProvider>
      <div className="min-h-screen bg-background">
        <RoleManagement />
      </div>
    </RBACProvider>
  );
};

export default RoleManagementPage;