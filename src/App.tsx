import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ConsolidatedReport from "./pages/ConsolidatedReport";
import StrategicDashboard from "./pages/StrategicDashboard";
import DrillDownAnalytics from "./pages/DrillDownAnalytics";
import GlobalExpansion from "./pages/GlobalExpansion";
import InvestmentCapitalDetail from "./pages/InvestmentCapitalDetail";
import ProjectRegistration from "./pages/ProjectRegistration";
import EnterpriseRegistration from "./pages/EnterpriseRegistration";
import AdminApproval from "./pages/AdminApproval";
import RoleManagementPage from "./pages/RoleManagement";
import DepartmentDashboardPage from "./pages/DepartmentDashboard";
import AIReportingPage from "./pages/AIReporting";
import KPIDashboardPage from "./pages/KPIDashboard";
import NotificationPage from "./pages/NotificationPage";
import SecuritySystemPage from "./pages/SecuritySystem";
import BIDashboardPage from "./pages/BIDashboard";
import LoginRegisterPage from "./pages/LoginRegister";
import PersonalDashboardPage from "./pages/PersonalDashboard";
import ActivityReportPage from "./pages/ActivityReport";
import SalesReportForm from "./components/reports/SalesReportForm";
import MarketingReportForm from "./components/reports/MarketingReportForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/project-registration" element={<ProjectRegistration />} />
            <Route path="/enterprise-registration" element={<EnterpriseRegistration />} />
          <Route 
            path="/admin/approval" 
            element={
              <ProtectedRoute requiredRole="bmc_holdings">
                <AdminApproval />
              </ProtectedRoute>
            } 
          />
          <Route path="/admin/roles" element={<RoleManagementPage />} />
          <Route path="/dashboard/departments" element={<DepartmentDashboardPage />} />
          <Route path="/ai/reporting" element={
            <ProtectedRoute requiredRole="manager">
              <AIReportingPage />
            </ProtectedRoute>
          } />
          <Route path="/kpi/dashboard" element={
            <ProtectedRoute>
              <KPIDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          } />
          <Route path="/security/system" element={<SecuritySystemPage />} />
          <Route path="/bi/dashboard" element={<BIDashboardPage />} />
          <Route path="/auth/login" element={<LoginRegisterPage />} />
          <Route 
              path="/dashboard/personal" 
              element={
                <ProtectedRoute>
                  <PersonalDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reports/activity" 
              element={
                <ProtectedRoute requiredPermission="submit_personal_report">
                  <ActivityReportPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reports/sales" 
              element={
                <ProtectedRoute requiredPermission="submit_personal_report">
                  <SalesReportForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reports/marketing" 
              element={
                <ProtectedRoute requiredPermission="submit_personal_report">
                  <MarketingReportForm />
                </ProtectedRoute>
              } 
            />
            <Route path="/consolidated-report" element={<ConsolidatedReport />} />
            <Route path="/strategic-dashboard" element={<StrategicDashboard />} />
            <Route path="/drill-down-analytics" element={<DrillDownAnalytics />} />
            <Route path="/global-expansion" element={<GlobalExpansion />} />
            <Route path="/investment-capital-detail" element={<InvestmentCapitalDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
