import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Crown, Mail, Lock, User } from "lucide-react";

interface CEOSignupProps {
  onSuccess: () => void;
}

export function CEOSignup({ onSuccess }: CEOSignupProps) {
  const [formData, setFormData] = useState({
    email: "lyhoanghaiceo@gmail.com",
    password: "Hai.1809",
    fullName: "Lý Hoàng Hải - CEO BMC Group"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email !== "lyhoanghaiceo@gmail.com") {
      setError("Chỉ CEO chính thức BMC mới có thể tạo tài khoản này.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: formData.fullName,
            role: 'ceo'
          }
        }
      });

      if (signUpError) {
        if (signUpError.message.includes('User already registered')) {
          // If user already exists, try to sign in
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          });

          if (signInError) {
            throw signInError;
          } else {
            toast.success("Đăng nhập thành công với tài khoản CEO BMC!");
            onSuccess();
            return;
          }
        } else {
          throw signUpError;
        }
      }

      // If signup successful
      if (data.user && !data.user.email_confirmed_at) {
        toast.success("Tài khoản CEO đã được tạo! Vui lòng kiểm tra email để xác thực.");
      } else {
        toast.success("Tài khoản CEO BMC đã được tạo và kích hoạt thành công!");
      }
      
      onSuccess();
    } catch (err: any) {
      console.error('CEO signup error:', err);
      setError(err.message || 'Có lỗi xảy ra khi tạo tài khoản CEO');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Crown className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl">Tạo Tài Khoản CEO BMC</CardTitle>
        <p className="text-sm text-muted-foreground">
          Tài khoản chính thức của Tập đoàn BMC
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Họ và tên</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="pl-10"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                className="pl-10"
                disabled={true}
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Email CEO chính thức của BMC Group
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="pl-10"
                required
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? "Đang tạo tài khoản..." : "Tạo Tài Khoản CEO BMC"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium text-sm mb-2">Quyền hạn CEO BMC:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Truy cập toàn bộ hệ sinh thái từ F5 đến F1</li>
            <li>• Quản lý cụm ngành và danh mục đầu tư</li>
            <li>• Dashboard tổng hợp và phân tích AI</li>
            <li>• Quyết định chiến lược tập đoàn</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}