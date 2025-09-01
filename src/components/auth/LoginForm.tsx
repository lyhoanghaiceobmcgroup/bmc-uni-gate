import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { ReportForm } from "@/components/forms/ReportForm";
import { Loader2, Building2, Eye, FileText, ArrowLeft } from "lucide-react";

interface CompanyInfo {
  id: string;
  name: string;
  taxId: string;
  code: string;
}

interface LoginFormProps {
  onBack?: () => void;
}

export function LoginForm({ onBack }: LoginFormProps = {}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Company fields
  const [companyName, setCompanyName] = useState("");
  const [companyTaxId, setCompanyTaxId] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [savedCompanies, setSavedCompanies] = useState<CompanyInfo[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
  const [isNewCompany, setIsNewCompany] = useState(true);
  
  // Access permissions
  const [viewERPAI, setViewERPAI] = useState(false);
  const [fillReport, setFillReport] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  
  const { login } = useAuth();

  // Load saved companies from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bmcSavedCompanies');
    if (saved) {
      try {
        const companies = JSON.parse(saved);
        setSavedCompanies(companies);
      } catch (error) {
        console.error('Error loading saved companies:', error);
      }
    }
  }, []);

  // Save company info to localStorage
  const saveCompanyInfo = (company: CompanyInfo) => {
    const existing = savedCompanies.find(c => c.taxId === company.taxId || c.code === company.code);
    if (!existing) {
      const updated = [...savedCompanies, company];
      setSavedCompanies(updated);
      localStorage.setItem('bmcSavedCompanies', JSON.stringify(updated));
    }
  };

  // Handle company selection
  const handleCompanySelect = (companyId: string) => {
    setSelectedCompanyId(companyId);
    if (companyId === 'new') {
      setIsNewCompany(true);
      setCompanyName('');
      setCompanyTaxId('');
      setCompanyCode('');
    } else {
      const company = savedCompanies.find(c => c.id === companyId);
      if (company) {
        setIsNewCompany(false);
        setCompanyName(company.name);
        setCompanyTaxId(company.taxId);
        setCompanyCode(company.code);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isSignUp && !fullName)) return;
    
    // Validate company info if provided
    if (companyName && companyTaxId && companyCode) {
      const newCompany: CompanyInfo = {
        id: Date.now().toString(),
        name: companyName,
        taxId: companyTaxId,
        code: companyCode
      };
      saveCompanyInfo(newCompany);
    }

    setLoading(true);
    try {
      // Use the login method from AuthContext (handles both login and signup scenarios)
      const success = await login(email, password);
      if (!success) {
        throw new Error('Login failed');
      }
      
      // Store access permissions for later use
      if (viewERPAI || fillReport) {
        localStorage.setItem('bmcAccessPermissions', JSON.stringify({
          viewERPAI,
          fillReport,
          companyInfo: {
            name: companyName,
            taxId: companyTaxId,
            code: companyCode
          }
        }));
      }
      
      // Show report form if fillReport is selected
      if (fillReport) {
        setShowReportForm(true);
        return; // Don't proceed with normal login flow
      }
    } catch (error) {
      console.error("Authentication error:", error);
      // You could add a state here to show error messages to users
      // For now, we'll just log the error
    } finally {
      setLoading(false);
    }
  };

  // Show report form if user selected "Điền báo cáo"
  if (showReportForm) {
    return (
      <ReportForm
        companyInfo={{
          name: companyName,
          taxId: companyTaxId,
          code: companyCode
        }}
        onClose={() => setShowReportForm(false)}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center pb-4">
          {onBack && (
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Quay trở lại
              </Button>
              <div></div>
            </div>
          )}
          <CardTitle className="text-2xl font-bold text-primary">
            {isSignUp ? "Đăng Ký" : "Đăng Nhập"} BMC ERP-AI
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Hệ thống quản lý doanh nghiệp thông minh
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Authentication Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-primary rounded-full"></div>
                <Label className="text-base font-semibold">Thông tin đăng nhập</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isSignUp && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">Họ và tên *</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Nhập họ và tên đầy đủ"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={isSignUp}
                      className="h-11"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Mật khẩu *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
              </div>
            </div>
            
            {/* Company Information Section */}
            <div className="space-y-4 p-5 border rounded-xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-blue-200/50">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-5 w-5 text-blue-600" />
                <Label className="text-base font-semibold text-blue-900">Thông tin công ty</Label>
              </div>
              
              {savedCompanies.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="companySelect" className="text-sm font-medium">Chọn công ty</Label>
                  <Select value={selectedCompanyId} onValueChange={handleCompanySelect}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Chọn công ty đã lưu hoặc thêm mới" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new" className="font-medium text-primary">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          + Thêm công ty mới
                        </div>
                      </SelectItem>
                      {savedCompanies.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{company.name}</span>
                            <span className="text-xs text-muted-foreground">MST: {company.taxId}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {(isNewCompany || savedCompanies.length === 0) && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-sm font-medium">Tên công ty</Label>
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="Công ty TNHH ABC..."
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyTaxId" className="text-sm font-medium">Mã số thuế</Label>
                      <Input
                        id="companyTaxId"
                        type="text"
                        placeholder="0123456789"
                        value={companyTaxId}
                        onChange={(e) => setCompanyTaxId(e.target.value)}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyCode" className="text-sm font-medium">Mã công ty</Label>
                      <Input
                        id="companyCode"
                        type="text"
                        placeholder="ABC001"
                        value={companyCode}
                        onChange={(e) => setCompanyCode(e.target.value)}
                        className="h-11"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Access Permissions */}
            <div className="space-y-4 p-5 border rounded-xl bg-gradient-to-r from-green-50/50 to-emerald-50/50 border-green-200/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-green-600 rounded-full"></div>
                <Label className="text-base font-semibold text-green-900">Quyền truy cập hệ thống</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 p-3 rounded-lg border border-blue-200 bg-blue-50/50 hover:bg-blue-100/50 transition-colors">
                  <Checkbox
                    id="viewERPAI"
                    checked={viewERPAI}
                    onCheckedChange={(checked) => setViewERPAI(checked as boolean)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <Label htmlFor="viewERPAI" className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                      <Eye className="h-4 w-4 text-blue-600" />
                      Xem ERP-AI
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Truy cập dashboard và báo cáo (tùy quyền hạn)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg border border-green-200 bg-green-50/50 hover:bg-green-100/50 transition-colors">
                  <Checkbox
                    id="fillReport"
                    checked={fillReport}
                    onCheckedChange={(checked) => setFillReport(checked as boolean)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <Label htmlFor="fillReport" className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                      <FileText className="h-4 w-4 text-green-600" />
                      Điền báo cáo
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Truy cập form báo cáo doanh nghiệp
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold" 
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {isSignUp ? "Tạo tài khoản" : "Đăng nhập hệ thống"}
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                className="w-full h-10 text-sm"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Đã có tài khoản? Đăng nhập ngay" : "Chưa có tài khoản? Đăng ký miễn phí"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}