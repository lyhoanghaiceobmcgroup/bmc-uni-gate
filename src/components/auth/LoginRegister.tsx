import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Mail, Phone, Key, Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface LoginData {
  emailOrPhone: string;
  password: string;
}

interface RegisterData {
  emailOrPhone: string;
  password: string;
  confirmPassword: string;
  referralCode: string;
  acceptTerms: boolean;
}

const LoginRegister: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isLoading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [loginData, setLoginData] = useState<LoginData>({
    emailOrPhone: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState<RegisterData>({
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
    acceptTerms: false
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(loginData.emailOrPhone, loginData.password);
      
      if (success) {
        toast({
          title: "Đăng nhập thành công",
          description: "Chào mừng bạn quay trở lại!",
        });
        
        // Navigate to personal dashboard
        navigate('/dashboard/personal');
      } else {
        toast({
          title: "Lỗi đăng nhập",
          description: "Email/SĐT hoặc mật khẩu không chính xác.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Lỗi đăng nhập",
        description: "Đã xảy ra lỗi trong quá trình đăng nhập",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Lỗi xác nhận mật khẩu",
        description: "Mật khẩu xác nhận không khớp.",
        variant: "destructive"
      });
      return;
    }
    
    if (!registerData.acceptTerms) {
      toast({
        title: "Chưa chấp nhận điều khoản",
        description: "Vui lòng đọc và chấp nhận điều khoản sử dụng.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Đăng ký thành công",
        description: "Tài khoản của bạn đang chờ BMC Admin duyệt. Bạn sẽ nhận email xác nhận trong 24h.",
      });
      
      // Reset form
      setRegisterData({
        emailOrPhone: '',
        password: '',
        confirmPassword: '',
        referralCode: '',
        acceptTerms: false
      });
    } catch (error) {
      toast({
        title: "Lỗi đăng ký",
        description: "Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay trở lại
          </Button>
        </div>
        
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              BMC Uni-Gate
            </CardTitle>
            <CardDescription className="text-gray-600">
              Hệ thống quản lý tập đoàn thông minh
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Đăng nhập</TabsTrigger>
                <TabsTrigger value="register">Đăng ký</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email hoặc Số điện thoại</Label>
                    <div className="relative">
                      <Input
                        id="login-email"
                        type="text"
                        placeholder="Nhập email hoặc số điện thoại"
                        value={loginData.emailOrPhone}
                        onChange={(e) => setLoginData({...loginData, emailOrPhone: e.target.value})}
                        className="pl-10"
                        required
                      />
                      {loginData.emailOrPhone.includes('@') ? (
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      ) : (
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Mật khẩu</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="pl-10 pr-10"
                        required
                      />
                      <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    disabled={isLoading || authLoading}
                  >
                    {(isLoading || authLoading) ? "Đang đăng nhập..." : "Đăng nhập"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email hoặc Số điện thoại</Label>
                    <div className="relative">
                      <Input
                        id="register-email"
                        type="text"
                        placeholder="Nhập email hoặc số điện thoại"
                        value={registerData.emailOrPhone}
                        onChange={(e) => setRegisterData({...registerData, emailOrPhone: e.target.value})}
                        className="pl-10"
                        required
                      />
                      {registerData.emailOrPhone.includes('@') ? (
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      ) : (
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Mật khẩu</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu (tối thiểu 8 ký tự)"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                        className="pl-10 pr-10"
                        minLength={8}
                        required
                      />
                      <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                        className="pl-10 pr-10"
                        required
                      />
                      <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="referral-code">Mã giới thiệu (tùy chọn)</Label>
                    <div className="relative">
                      <Input
                        id="referral-code"
                        type="text"
                        placeholder="Nhập mã giới thiệu nếu có"
                        value={registerData.referralCode}
                        onChange={(e) => setRegisterData({...registerData, referralCode: e.target.value})}
                        className="pl-10"
                      />
                      <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={registerData.acceptTerms}
                      onCheckedChange={(checked) => setRegisterData({...registerData, acceptTerms: checked as boolean})}
                      className="mt-1"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="terms"
                        className="text-sm font-normal leading-snug peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Tôi đã đọc và đồng ý với{' '}
                        <button
                          type="button"
                          className="text-blue-600 hover:text-blue-800 underline"
                          onClick={() => {
                            // Open terms modal or navigate to terms page
                            toast({
                              title: "Điều khoản sử dụng",
                              description: "Tính năng xem điều khoản sẽ được cập nhật sớm.",
                            });
                          }}
                        >
                          Điều khoản sử dụng
                        </button>{' '}
                        và{' '}
                        <button
                          type="button"
                          className="text-blue-600 hover:text-blue-800 underline"
                          onClick={() => {
                            // Open privacy policy modal or navigate to privacy page
                            toast({
                              title: "Chính sách bảo mật",
                              description: "Tính năng xem chính sách bảo mật sẽ được cập nhật sớm.",
                            });
                          }}
                        >
                          Chính sách bảo mật
                        </button>
                      </Label>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang đăng ký..." : "Đăng ký tài khoản"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>© 2024 BMC Holdings. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;