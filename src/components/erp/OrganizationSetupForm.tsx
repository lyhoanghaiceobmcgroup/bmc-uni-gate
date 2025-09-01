import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Plus, X, ArrowLeft } from "lucide-react";

type OrganizationLevel = "F5" | "F4" | "F3" | "F2" | "F1";

interface OrganizationFormData {
  name: string;
  taxCode: string;
  level: OrganizationLevel;
  industry: string;
  mainProducts: string[];
  bmcEquityPercentage: number;
  totalInvestmentValue: number;
  investmentYear: number;
  description: string;
}

const industries = [
  "F&B - Thực phẩm đồ uống",
  "Công nghệ - Technology",
  "Giáo dục - Education", 
  "Tài chính - Finance",
  "Bán lẻ - Retail",
  "Y tế - Healthcare",
  "Bất động sản - Real Estate",
  "Sản xuất - Manufacturing"
];

const organizationLevels = [
  { value: "F5", label: "F5 - Startup", equity: "10-20%" },
  { value: "F4", label: "F4 - Dự án/Chi nhánh", equity: "20-30%" },
  { value: "F3", label: "F3 - Công ty chiến lược", equity: "35%" },
  { value: "F2", label: "F2 - Nhóm ngành", equity: "55%" },
  { value: "F1", label: "F1 - Cụm ngành", equity: "80%" }
];

export function OrganizationSetupForm({ onComplete }: { onComplete: () => void }) {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState("");
  const [formData, setFormData] = useState<OrganizationFormData>({
    name: "",
    taxCode: "",
    level: "F5",
    industry: "",
    mainProducts: [],
    bmcEquityPercentage: 15,
    totalInvestmentValue: 0,
    investmentYear: new Date().getFullYear(),
    description: ""
  });

  const addProduct = () => {
    if (newProduct.trim() && !formData.mainProducts.includes(newProduct.trim())) {
      setFormData(prev => ({
        ...prev,
        mainProducts: [...prev.mainProducts, newProduct.trim()]
      }));
      setNewProduct("");
    }
  };

  const removeProduct = (product: string) => {
    setFormData(prev => ({
      ...prev,
      mainProducts: prev.mainProducts.filter(p => p !== product)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Check if user is CEO BMC
    if (user.email !== "lyhoanghaiceo@gmail.com") {
      toast.error("Chỉ CEO BMC mới có quyền tạo dự án/doanh nghiệp mới!");
      return;
    }

    setLoading(true);
    try {
      // First, ensure BMC Corporation exists
      let bmcCorporation;
      const { data: existingBMC, error: bmcCheckError } = await supabase
        .from('organizations')
        .select('id')
        .eq('name', 'BMC Corporation')
        .eq('level', 'F1')
        .maybeSingle();

      if (bmcCheckError) {
        throw bmcCheckError;
      }

      if (!existingBMC) {
        // Create BMC Corporation if it doesn't exist
        const { data: newBMC, error: bmcCreateError } = await supabase
          .from('organizations')
          .insert({
            name: 'BMC Corporation',
            tax_code: 'BMC-001',
            level: 'F1',
            industry: 'Tập đoàn đa ngành',
            main_products: ['Đầu tư chiến lược', 'Quản lý danh mục'],
            bmc_equity_percentage: 100,
            total_investment_value: 0,
            investment_year: new Date().getFullYear(),
            description: 'Tập đoàn BMC - Công ty mẹ của hệ sinh thái',
            code: 'F1-BMC-CORP'
          })
          .select()
          .single();

        if (bmcCreateError) throw bmcCreateError;
        bmcCorporation = newBMC;

        // Assign CEO as admin of BMC Corporation
        await supabase
          .from('user_organization_roles')
          .insert({
            user_id: user.id,
            organization_id: newBMC.id,
            role: 'admin'
          });
      } else {
        bmcCorporation = existingBMC;
      }

      // Create new organization under BMC Corporation
      const { data: organization, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: formData.name,
          tax_code: formData.taxCode || null,
          level: formData.level,
          industry: formData.industry,
          main_products: formData.mainProducts,
          bmc_equity_percentage: formData.bmcEquityPercentage,
          total_investment_value: formData.totalInvestmentValue,
          investment_year: formData.investmentYear,
          description: formData.description,
          code: `${formData.level}-${Date.now()}`,
          parent_id: bmcCorporation.id // Link to BMC Corporation
        })
        .select()
        .single();

      if (orgError) throw orgError;

      // Assign CEO as admin/founder of new organization
      const { error: roleError } = await supabase
        .from('user_organization_roles')
        .insert({
          user_id: user.id,
          organization_id: organization.id,
          role: formData.level === 'F5' ? 'founder' : 'admin'
        });

      if (roleError) throw roleError;

      // Create default departments for the new organization
      const defaultDepartments = [
        { name: 'Phòng Hành chính', description: 'Quản lý hành chính và nhân sự' },
        { name: 'Phòng Tài chính', description: 'Quản lý tài chính và kế toán' },
        { name: 'Phòng Kinh doanh', description: 'Phát triển kinh doanh và bán hàng' },
        { name: 'Phòng Kỹ thuật', description: 'Nghiên cứu và phát triển sản phẩm' }
      ];

      for (const dept of defaultDepartments) {
        await supabase
          .from('departments')
          .insert({
            name: dept.name,
            organization_id: organization.id,
            manager_id: user.id,
            description: dept.description
          });
      }

      // Create initial profile if not exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();

      if (!existingProfile) {
        await supabase
          .from('profiles')
          .insert({
            id: user.id,
            full_name: user.name || 'CEO BMC',
            email: user.email
          });
      }

      toast.success(`Tạo ${formData.level === 'F5' ? 'dự án' : 'doanh nghiệp'} "${formData.name}" thành công! Dữ liệu đã được đồng bộ toàn hệ thống.`);
      onComplete();
    } catch (error) {
      console.error('Error creating organization:', error);
      toast.error("Có lỗi xảy ra khi tạo tổ chức");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Khởi Tạo Dự Án/Doanh Nghiệp - ERP BMC</CardTitle>
          <p className="text-muted-foreground">
            Trang đầu tiên khi nhập dữ liệu dự án/doanh nghiệp vào hệ thống ERP-AI của BMC
          </p>
          <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-primary font-medium">
              🔒 Chỉ CEO BMC ({user?.email}) mới có quyền tạo dự án/doanh nghiệp mới
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên dự án/doanh nghiệp *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nhập tên dự án/doanh nghiệp"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxCode">Mã số thuế (nếu có)</Label>
                <Input
                  id="taxCode"
                  value={formData.taxCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, taxCode: e.target.value }))}
                  placeholder="Nhập mã số thuế"
                />
              </div>
            </div>

            {/* Organization Level */}
            <div className="space-y-2">
              <Label>Cấp độ tổ chức *</Label>
              <Select 
                value={formData.level} 
                onValueChange={(value: OrganizationLevel) => {
                  setFormData(prev => ({ 
                    ...prev, 
                    level: value
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {organizationLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Industry and Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Lĩnh vực chính *</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  placeholder="Nhập lĩnh vực chính"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Sản phẩm chính</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    placeholder="Nhập sản phẩm"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProduct())}
                  />
                  <Button type="button" onClick={addProduct} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.mainProducts.map(product => (
                    <Badge key={product} variant="secondary" className="flex items-center gap-1">
                      {product}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 hover:bg-transparent"
                        onClick={() => removeProduct(product)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Investment Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bmcEquity">Số cổ phần BMC Góp</Label>
                <Input
                  id="bmcEquity"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.bmcEquityPercentage}
                  onChange={(e) => setFormData(prev => ({ ...prev, bmcEquityPercentage: Number(e.target.value) }))}
                  placeholder="Nhập % cổ phần BMC"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalInvestment">Tổng giá trị góp vốn (VNĐ)</Label>
                <Input
                  id="totalInvestment"
                  type="number"
                  min="0"
                  value={formData.totalInvestmentValue}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalInvestmentValue: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="investmentYear">Năm góp vốn</Label>
                <Input
                  id="investmentYear"
                  type="number"
                  min="2020"
                  max="2030"
                  value={formData.investmentYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, investmentYear: Number(e.target.value) }))}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả chi tiết</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Mô tả chi tiết về dự án/doanh nghiệp"
                rows={4}
              />
            </div>

            <div className="flex justify-between items-center">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => logout()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Quay về trang chủ
              </Button>
              <Button type="submit" disabled={loading} className="px-8">
                {loading ? "Đang tạo..." : "Tạo Dự Án/Doanh Nghiệp"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}