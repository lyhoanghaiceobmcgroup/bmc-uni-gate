import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export type UserRole = 'employee' | 'manager' | 'ceo' | 'bmc_holdings';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company: string;
  department?: string;
  avatar?: string;
  permissions: string[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  canAccessDepartment: (department: string) => boolean;
  canAccessCompany: (company: string) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// RBAC/ABAC Permission Matrix
const ROLE_PERMISSIONS = {
  employee: [
    'view_personal_kpi',
    'submit_personal_report',
    'view_assigned_tasks'
  ],
  manager: [
    'view_personal_kpi',
    'submit_personal_report',
    'view_assigned_tasks',
    'view_department_data',
    'approve_employee_reports',
    'manage_department_kpi'
  ],
  ceo: [
    'view_personal_kpi',
    'submit_personal_report',
    'view_assigned_tasks',
    'view_department_data',
    'approve_employee_reports',
    'manage_department_kpi',
    'view_company_data',
    'view_consolidated_reports',
    'manage_company_strategy'
  ],
  bmc_holdings: [
    'view_personal_kpi',
    'submit_personal_report',
    'view_assigned_tasks',
    'view_department_data',
    'approve_employee_reports',
    'manage_department_kpi',
    'view_company_data',
    'view_consolidated_reports',
    'manage_company_strategy',
    'view_ecosystem_data',
    'manage_portfolio',
    'audit_all_activities'
  ]
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleDemoLogin = (email: string): boolean => {
    // Demo login for development
    let role: UserRole = 'employee';
    let company = 'Demo Company';
    let name = 'Demo User';
    
    if (email === 'lyhoanghaiceo@gmail.com' || email.includes('ceo')) {
      role = 'ceo';
      company = 'BMC Corporation';
      name = 'Lý Hoàng Hải - CEO BMC Group';
    } else if (email.includes('manager')) {
      role = 'manager';
      company = 'Demo Company';
      name = 'Demo Manager';
    } else if (email.includes('bmc')) {
      role = 'bmc_holdings';
      company = 'BMC Holdings';
      name = 'BMC Representative';
    }
    
    const demoUser: User = {
      id: 'demo-' + Date.now(),
      email,
      name,
      role,
      company,
      permissions: ROLE_PERMISSIONS[role]
    };
    
    setUser(demoUser);
    localStorage.setItem('bmc_user', JSON.stringify(demoUser));
    console.log('Demo login successful for:', email);
    return true;
  };

  useEffect(() => {
    // Check for existing Supabase session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Create user object from Supabase session
        let role: UserRole = 'employee';
        let company = 'Default Company';
        let name = session.user.user_metadata?.full_name || session.user.email || 'User';
        
        // Determine role based on email
        if (session.user.email === 'lyhoanghaiceo@gmail.com') {
          role = 'ceo';
          company = 'BMC Corporation';
          name = 'Lý Hoàng Hải - CEO BMC Group';
        } else if (session.user.email?.includes('ceo')) {
          role = 'ceo';
        } else if (session.user.email?.includes('manager')) {
          role = 'manager';
        } else if (session.user.email?.includes('bmc')) {
          role = 'bmc_holdings';
          company = 'BMC Holdings';
        }
        
        const userObj: User = {
          id: session.user.id,
          email: session.user.email || '',
          name,
          role,
          company,
          avatar: session.user.user_metadata?.avatar_url,
          permissions: ROLE_PERMISSIONS[role]
        };
        
        setUser(userObj);
        localStorage.setItem('bmc_user', JSON.stringify(userObj));
      } else {
        // Check for saved user session as fallback
        const savedUser = localStorage.getItem('bmc_user');
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (error) {
            console.error('Error parsing saved user:', error);
            localStorage.removeItem('bmc_user');
          }
        }
      }
      
      setIsLoading(false);
    };
    
    checkSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
        localStorage.removeItem('bmc_user');
      }
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Use Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Login error:', error);
        // Provide more specific error handling
        if (error.message.includes('Invalid login credentials')) {
          console.warn('Invalid credentials provided. Trying demo mode for development.');
          // Fallback to demo mode for development
          return handleDemoLogin(email);
        }
        return false;
      }
      
      if (data.user) {
        // Create user object based on Supabase user
        let role: UserRole = 'employee';
        let company = 'Default Company';
        let name = data.user.user_metadata?.full_name || data.user.email || 'User';
        
        // Determine role based on email
        if (email === 'lyhoanghaiceo@gmail.com') {
          role = 'ceo';
          company = 'BMC Corporation';
          name = 'Lý Hoàng Hải - CEO BMC Group';
        } else if (email.includes('ceo')) {
          role = 'ceo';
        } else if (email.includes('manager')) {
          role = 'manager';
        } else if (email.includes('bmc')) {
          role = 'bmc_holdings';
          company = 'BMC Holdings';
        }
        
        const userObj: User = {
          id: data.user.id,
          email: data.user.email || '',
          name,
          role,
          company,
          avatar: data.user.user_metadata?.avatar_url,
          permissions: ROLE_PERMISSIONS[role]
        };
        
        setUser(userObj);
        localStorage.setItem('bmc_user', JSON.stringify(userObj));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.warn('Logout error (network issue):', error);
      // Continue with local logout even if network request fails
    } finally {
      setUser(null);
      localStorage.removeItem('bmc_user');
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const canAccessDepartment = (department: string): boolean => {
    if (!user) return false;
    
    // BMC Holdings can access all departments
    if (user.role === 'bmc_holdings') return true;
    
    // CEO can access all departments in their company
    if (user.role === 'ceo') return true;
    
    // Manager can access their own department
    if (user.role === 'manager' && user.department === department) return true;
    
    // Employee can only access their own department for limited data
    if (user.role === 'employee' && user.department === department) return true;
    
    return false;
  };

  const canAccessCompany = (company: string): boolean => {
    if (!user) return false;
    
    // BMC Holdings can access all companies
    if (user.role === 'bmc_holdings') return true;
    
    // Others can only access their own company
    return user.company === company;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    hasPermission,
    canAccessDepartment,
    canAccessCompany,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};