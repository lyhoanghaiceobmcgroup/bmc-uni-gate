import React from 'react';
import DepartmentDashboard from '@/components/dashboard/DepartmentDashboard';

const DepartmentDashboardPage: React.FC = () => {
  // In a real application, these would come from authentication context
  const userRole = 'ceo'; // Could be: 'bmc_holdings', 'ceo', 'department_manager', 'finance_manager', 'hr_manager', 'employee'
  const userDepartments = ['finance_accounting', 'hr_training']; // For department managers

  return (
    <div className="min-h-screen bg-background">
      <DepartmentDashboard 
        userRole={userRole}
        userDepartments={userDepartments}
      />
    </div>
  );
};

export default DepartmentDashboardPage;