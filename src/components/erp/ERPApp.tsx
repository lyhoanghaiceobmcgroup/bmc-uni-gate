import { useState } from "react";
import { ERPDashboard } from "./ERPDashboard";
import { OrganizationListView } from "./views/OrganizationListView";
import { ShareholderView } from "./views/ShareholderView";

export type ERPViewMode = "dashboard" | "organization-list" | "shareholder-view" | "organization-detail";

export function ERPApp() {
  const [viewMode, setViewMode] = useState<ERPViewMode>("dashboard");
  const [selectedOrganization, setSelectedOrganization] = useState<any>(null);

  const handleViewOrganizationList = () => {
    setViewMode("organization-list");
  };

  const handleSelectOrganization = (organization: any) => {
    setSelectedOrganization(organization);
    setViewMode("organization-detail");
  };

  const handleViewShareholders = () => {
    setViewMode("shareholder-view");
  };

  const handleBackToDashboard = () => {
    setViewMode("dashboard");
    setSelectedOrganization(null);
  };

  switch (viewMode) {
    case "organization-list":
      return (
        <OrganizationListView 
          onSelectOrganization={handleSelectOrganization}
          onBack={handleBackToDashboard}
        />
      );
    case "shareholder-view":
      return (
        <ShareholderView 
          onBack={handleBackToDashboard}
        />
      );
    case "organization-detail":
      return (
        <ERPDashboard 
          selectedOrganization={selectedOrganization}
          onViewOrganizationList={handleViewOrganizationList}
          onViewShareholders={handleViewShareholders}
          onBack={handleBackToDashboard}
        />
      );
    default:
      return (
        <ERPDashboard 
          onViewOrganizationList={handleViewOrganizationList}
          onViewShareholders={handleViewShareholders}
        />
      );
  }
}