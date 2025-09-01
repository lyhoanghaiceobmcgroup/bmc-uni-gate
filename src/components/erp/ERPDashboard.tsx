import { useState, useEffect } from "react";
import { GlobalNavigation, NavigationLevel } from "./GlobalNavigation";
import { CorporationView } from "./views/CorporationView";
import { ClusterManagementView } from "./views/ClusterManagementView";
import { CompanyManagementView } from "./views/CompanyManagementView";
import { CompanyView } from "./views/CompanyView";
import { ProjectManagementView } from "./views/ProjectManagementView";
import { DepartmentView } from "./views/DepartmentView";
import { ReportsView } from "./views/ReportsView";
import { CompanyHubView } from "./views/CompanyHubView";
import { SystemView } from "./views/SystemView";
import { Button } from "@/components/ui/button";
import { ArrowLeft, List } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ERPDashboardProps {
  selectedOrganization?: any;
  onViewOrganizationList?: () => void;
  onViewShareholders?: () => void;
  onBack?: () => void;
}

export function ERPDashboard({ 
  selectedOrganization, 
  onViewOrganizationList, 
  onViewShareholders,
  onBack
}: ERPDashboardProps) {
  const [currentLevel, setCurrentLevel] = useState<NavigationLevel>("corporation");
  const [userOrganizations, setUserOrganizations] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadUserOrganizations();
    }
  }, [user]);

  const loadUserOrganizations = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_organization_roles')
      .select(`
        role,
        organizations (*)
      `)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error loading organizations:', error);
      return;
    }

    setUserOrganizations(data || []);
  };

  const renderCurrentView = () => {
    switch (currentLevel) {
      case "corporation":
        return <CorporationView organizations={userOrganizations} onViewOrganizationList={onViewOrganizationList} />;
      case "cluster":
        return <ClusterManagementView organizations={userOrganizations} />;
      case "company":
        return <CompanyManagementView organizations={userOrganizations} />;
      case "project":
        return <ProjectManagementView organizations={userOrganizations} />;
      case "department":
        return <DepartmentView organizations={userOrganizations} onViewShareholders={onViewShareholders} />;
      case "reports":
        return <ReportsView organizations={userOrganizations} />;
      case "companyhub":
        return <CompanyHubView organizations={userOrganizations} />;
      case "system":
        return <SystemView organizations={userOrganizations} />;
      default:
        return <CorporationView organizations={userOrganizations} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop/Tablet Navigation */}
      <div className="hidden md:block">
        <GlobalNavigation 
          currentLevel={currentLevel} 
          onLevelChange={setCurrentLevel} 
        />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden border-b bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">BMC</span>
            </div>
            <span className="font-bold text-base">ERP-AI Holdings</span>
          </div>
          <div className="flex items-center space-x-2">
            {user && (
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Header with Back button and Organization List button */}
      {(selectedOrganization || onBack) && (
        <div className="border-b bg-background/95 backdrop-blur">
          <div className="flex items-center justify-between px-4 md:px-6 py-3">
            <div className="flex items-center space-x-2 md:space-x-4 flex-1">
              {onBack && (
                <Button variant="outline" size="sm" onClick={onBack} className="text-xs md:text-sm">
                  <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Quay lại tổng quan</span>
                  <span className="sm:hidden">Quay lại</span>
                </Button>
              )}
              {selectedOrganization && (
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-sm md:text-base truncate">{selectedOrganization.organizations?.name}</h2>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">
                    {selectedOrganization.organizations?.level} • {selectedOrganization.organizations?.industry}
                  </p>
                </div>
              )}
            </div>
            {onViewOrganizationList && (
              <Button variant="outline" size="sm" onClick={onViewOrganizationList} className="text-xs md:text-sm ml-2">
                <List className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Xem tất cả tổ chức</span>
                <span className="sm:hidden">Tất cả</span>
              </Button>
            )}
          </div>
        </div>
      )}
      
      <main className="p-3 md:p-6 pb-20 md:pb-6">
        {renderCurrentView()}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t">
        <div className="flex items-center justify-around py-2">
          <Button
            variant={currentLevel === "corporation" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1 p-2 h-auto text-xs"
            onClick={() => setCurrentLevel("corporation")}
          >
            <div className="text-lg">🌐</div>
            <span>Tập đoàn</span>
          </Button>
          <Button
            variant={currentLevel === "cluster" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1 p-2 h-auto text-xs"
            onClick={() => setCurrentLevel("cluster")}
          >
            <div className="text-lg">🏢</div>
            <span>Cụm ngành</span>
          </Button>
          <Button
            variant={currentLevel === "company" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1 p-2 h-auto text-xs"
            onClick={() => setCurrentLevel("company")}
          >
            <div className="text-lg">🏬</div>
            <span>Công ty</span>
          </Button>
          <Button
            variant={currentLevel === "project" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1 p-2 h-auto text-xs"
            onClick={() => setCurrentLevel("project")}
          >
            <div className="text-lg">🏪</div>
            <span>Dự án</span>
          </Button>
          <Button
            variant={currentLevel === "department" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1 p-2 h-auto text-xs"
            onClick={() => setCurrentLevel("department")}
          >
            <div className="text-lg">🗂</div>
            <span>Phòng ban</span>
          </Button>
        </div>
        <div className="flex items-center justify-around py-2 border-t">
          <Button
            variant={currentLevel === "reports" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1 p-2 h-auto text-xs"
            onClick={() => setCurrentLevel("reports")}
          >
            <div className="text-lg">📊</div>
            <span>Báo cáo</span>
          </Button>
          <Button
            variant={currentLevel === "companyhub" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1 p-2 h-auto text-xs"
            onClick={() => setCurrentLevel("companyhub")}
          >
            <div className="text-lg">🏢</div>
            <span>Công ty</span>
          </Button>
          <Button
            variant={currentLevel === "system" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1 p-2 h-auto text-xs"
            onClick={() => setCurrentLevel("system")}
          >
            <div className="text-lg">⚙️</div>
            <span>Hệ thống</span>
          </Button>
        </div>
      </div>
    </div>
  );
}