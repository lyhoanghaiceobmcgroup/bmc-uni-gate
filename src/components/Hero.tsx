import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Users, Lock, ArrowRight, Globe, Target, Activity, FileText, BarChart3 } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import { ConsolidatedReports } from "./ConsolidatedReports";
import { useNavigate, Link } from "react-router-dom";

interface HeroProps {
  onLogin: () => void;
  onBusinessRegistration: () => void;
  onPermissionRequest: () => void;
}

const Hero = ({ onLogin, onBusinessRegistration, onPermissionRequest }: HeroProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden grid-bg">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse-glow" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-pulse-glow animation-delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-pulse-glow animation-delay-2000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <Badge variant="outline" className="border-primary/30 text-primary">
              <Shield className="w-3 h-3 mr-1" />
              Enterprise Access Control
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
              BMC Access & Control
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              Cổng truy cập & phân quyền toàn hệ sinh thái
            </p>
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Một tài khoản duy nhất để vào tất cả module ERP-AI. Xem được toàn bộ tính năng, 
              nhưng chỉ thao tác theo vai trò & quyền do cấp lãnh đạo phê duyệt.
            </p>
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="min-w-[200px]" onClick={onLogin}>
              <Lock className="w-4 h-4 mr-2" />
              🔑 Đăng nhập ERP-AI
            </Button>
            
            <Button 
              onClick={() => navigate('/dashboard/personal')}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <FileText className="w-5 h-5 mr-2" />
              Báo cáo
            </Button>
            
            <Link to="/enterprise-registration">
              <Button variant="outline" size="lg" className="min-w-[200px] border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-700 hover:text-emerald-800">
                <FileText className="w-4 h-4 mr-2" />
                🏢 Đăng ký doanh nghiệp mới
              </Button>
            </Link>
            
            <Button variant="ghost" size="lg" className="text-accent hover:bg-accent/10" onClick={onPermissionRequest}>
              Yêu cầu nâng quyền
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>


          {/* Consolidated Reports Preview */}
          <div className="mt-16">
            <ConsolidatedReports />
          </div>


          {/* Admin Access */}
          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-4">Quản trị hệ thống:</p>
            <div className="flex justify-center gap-4">
              <Link to="/admin/approval">
                <Button variant="outline" size="sm" className="border-purple-500/50 hover:bg-purple-500/10 text-purple-700 hover:text-purple-800">
                  <Users className="w-4 h-4 mr-2" />
                  🏛️ Hệ thống Duyệt Hồ sơ
                </Button>
              </Link>
              <Link to="/admin/roles">
                <Button variant="outline" size="sm" className="border-indigo-500/50 hover:bg-indigo-500/10 text-indigo-700 hover:text-indigo-800">
                  <Shield className="w-4 h-4 mr-2" />
                  🔐 Phân quyền RBAC
                </Button>
              </Link>
              <Link to="/dashboard/departments">
                <Button variant="outline" size="sm" className="border-teal-500/50 hover:bg-teal-500/10 text-teal-700 hover:text-teal-800">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  📊 Dashboard 9 Phòng ban
                </Button>
              </Link>
              <Link to="/ai/reporting">
                <Button variant="outline" size="sm" className="border-purple-500/50 hover:bg-purple-500/10 text-purple-700 hover:text-purple-800">
                  <Activity className="w-4 h-4 mr-2" />
                  🤖 AI Báo cáo Đa tầng
                </Button>
              </Link>
              <Link to="/security/system">
                <Button variant="outline" size="sm" className="border-red-500/50 hover:bg-red-500/10 text-red-700 hover:text-red-800">
                  <Shield className="w-4 h-4 mr-2" />
                  🔒 Bảo mật Đa tầng
                </Button>
              </Link>
              <Link to="/bi/dashboard">
                <Button variant="outline" size="sm" className="border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-700 hover:text-cyan-800">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  📊 BI Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="border-muted-foreground/20">
                <Globe className="w-4 h-4 mr-2" />
                Google SSO
              </Button>
              <Button variant="outline" size="sm" className="border-muted-foreground/20">
                <Globe className="w-4 h-4 mr-2" />
                Microsoft
              </Button>
              <Button variant="outline" size="sm" className="border-muted-foreground/20">
                <Shield className="w-4 h-4 mr-2" />
                2FA/OTP
              </Button>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
          <Card className="p-6 bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300 glow-card group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Một cửa – đa hệ thống</h3>
                <p className="text-muted-foreground">Truy cập tất cả module ERP + AI của BMC với một tài khoản duy nhất</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300 glow-card group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Lock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">An toàn theo vai trò</h3>
                <p className="text-muted-foreground">Xem hết tính năng, nhưng chỉ thấy dữ liệu và thực hiện hành động theo quyền được giao</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300 glow-card group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI hỗ trợ có kiểm soát</h3>
                <p className="text-muted-foreground">AI gợi ý – người có quyền mới phê duyệt/thi hành</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hero;