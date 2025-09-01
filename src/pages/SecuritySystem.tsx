import React from 'react';
import SecuritySystem from '@/components/security/SecuritySystem';

const SecuritySystemPage: React.FC = () => {
  // Mock user data - in real app, this would come from authentication context
  const userRole = 'security_officer';
  const accessLevel = 'admin'; // 'viewer' | 'analyst' | 'admin' | 'security_officer'

  return (
    <div className="min-h-screen bg-background">
      <SecuritySystem 
        userRole={userRole}
        accessLevel={accessLevel}
      />
    </div>
  );
};

export default SecuritySystemPage;