import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Building2, 
  Store, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  Bell,
  ChevronDown
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type NavigationLevel = "corporation" | "cluster" | "company" | "project" | "department" | "reports" | "companyhub" | "system";

interface GlobalNavigationProps {
  currentLevel: NavigationLevel;
  onLevelChange: (level: NavigationLevel) => void;
}

export function GlobalNavigation({ currentLevel, onLevelChange }: GlobalNavigationProps) {
  const { logout, user } = useAuth();
  const [notificationCount] = useState(5);

  // Các mục con của Tập đoàn BMC
  const bmcGroupItems = [
    {
      key: "corporation" as NavigationLevel,
      label: "🌐 Tổng quan BMC",
      icon: Globe,
      description: "Tổng quan toàn hệ sinh thái"
    },
    {
      key: "cluster" as NavigationLevel,
      label: "🏢 F1 - Cụm ngành",
      icon: Building2,
      description: "Quản lý cụm ngành (BMC 80%)"
    },
    {
      key: "company" as NavigationLevel,
      label: "🏬 F2-F3 - Công ty",
      icon: Store,
      description: "Quản trị công ty thành viên"
    },
    {
      key: "project" as NavigationLevel,
      label: "🏪 F4-F5 - Dự án",
      icon: Store,
      description: "Quản lý dự án và startup"
    }
  ];

  // Các mục menu chính
  const mainNavigationItems = [
    {
      key: "department" as NavigationLevel,
      label: "🗂 Phòng ban",
      icon: Users,
      description: "Quản lý theo khối chức năng"
    },
    {
      key: "reports" as NavigationLevel,
      label: "📊 Báo cáo",
      icon: BarChart3,
      description: "Trung tâm dữ liệu & phân tích"
    },
    {
      key: "companyhub" as NavigationLevel,
      label: "🏢 Công ty",
      icon: Building2,
      description: "Quản lý công ty & nhập báo cáo"
    },
    {
      key: "system" as NavigationLevel,
      label: "⚙️ Hệ thống",
      icon: Settings,
      description: "Quản trị hệ thống ERP-AI"
    }
   ];

  // Kiểm tra xem level hiện tại có thuộc BMC Group không
  const isBMCGroupActive = bmcGroupItems.some(item => item.key === currentLevel);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">BMC ERP-AI</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center space-x-1 ml-6 flex-1">
          {/* Dropdown cho Tập đoàn BMC */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={isBMCGroupActive ? "default" : "ghost"}
                size="sm"
                className="text-sm font-medium"
              >
                <Globe className="h-4 w-4 mr-2" />
                🌐 Tập đoàn BMC
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {bmcGroupItems.map((item) => (
                <DropdownMenuItem
                  key={item.key}
                  onClick={() => onLevelChange(item.key)}
                  className={currentLevel === item.key ? "bg-accent" : ""}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  <div className="flex flex-col">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Các mục menu chính khác */}
          {mainNavigationItems.map((item) => (
            <Button
              key={item.key}
              variant={currentLevel === item.key ? "default" : "ghost"}
              size="sm"
              className="text-sm font-medium"
              onClick={() => onLevelChange(item.key)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium max-w-32 truncate">
                  {user?.email}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => logout()}>
                <LogOut className="mr-2 h-4 w-4" />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}