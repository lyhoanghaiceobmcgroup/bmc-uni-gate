import { StrategicDashboard } from "@/components/erp/StrategicDashboard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StrategicDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
            <div>
              <h1 className="font-semibold">Quản lý Chiến lược & Mở rộng Toàn cầu</h1>
              <p className="text-sm text-muted-foreground">BMC Holdings Strategic Management</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">BMC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto py-6">
        <StrategicDashboard />
      </div>
    </div>
  );
}