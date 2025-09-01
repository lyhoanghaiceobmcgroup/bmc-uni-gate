import React from 'react';
import BIDashboard from '@/components/bi/BIDashboard';

const BIDashboardPage: React.FC = () => {
  // Mock user data - in real app, this would come from authentication context
  const userRole = 'executive';
  const accessLevel = 'executive'; // 'viewer' | 'analyst' | 'manager' | 'executive'
  const department = 'all'; // or specific department

  return (
    <div className="min-h-screen bg-background">
      <BIDashboard 
        userRole={userRole}
        accessLevel={accessLevel}
        department={department}
      />
    </div>
  );
};

export default BIDashboardPage;