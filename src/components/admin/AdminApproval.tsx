import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Clock, Mail, Phone, User, Building, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface PendingUser {
  id: string;
  emailOrPhone: string;
  referralCode?: string;
  registrationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  assignedRole?: 'CEO' | 'Trưởng phòng' | 'Nhân viên';
  assignedCompany?: string;
  notes?: string;
}

interface ApprovalAction {
  userId: string;
  action: 'approve' | 'reject';
  role?: 'CEO' | 'Trưởng phòng' | 'Nhân viên';
  company?: string;
  notes?: string;
}

const AdminApproval: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [approvalData, setApprovalData] = useState<ApprovalAction>({
    userId: '',
    action: 'approve'
  });

  // Mock data for pending users
  useEffect(() => {
    const mockUsers: PendingUser[] = [
      {
        id: '1',
        emailOrPhone: 'nguyen.van.a@startup-a.com',
        referralCode: 'BMC2024',
        registrationDate: '2024-01-15T10:30:00Z',
        status: 'pending'
      },
      {
        id: '2',
        emailOrPhone: '0901234567',
        referralCode: '',
        registrationDate: '2024-01-14T14:20:00Z',
        status: 'pending'
      },
      {
        id: '3',
        emailOrPhone: 'tran.thi.b@logistics-pro.vn',
        referralCode: 'REF001',
        registrationDate: '2024-01-13T09:15:00Z',
        status: 'approved',
        assignedRole: 'CEO',
        assignedCompany: 'Startup A - AI Logistics'
      },
      {
        id: '4',
        emailOrPhone: 'le.van.c@techcorp.com',
        referralCode: '',
        registrationDate: '2024-01-12T16:45:00Z',
        status: 'rejected',
        notes: 'Không đủ điều kiện tham gia hệ sinh thái BMC'
      }
    ];
    setPendingUsers(mockUsers);
  }, []);

  const handleApproval = async (action: 'approve' | 'reject') => {
    if (!selectedUser) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update user status
      setPendingUsers(prev => prev.map(user => 
        user.id === selectedUser.id 
          ? {
              ...user,
              status: action,
              assignedRole: action === 'approve' ? approvalData.role : undefined,
              assignedCompany: action === 'approve' ? approvalData.company : undefined,
              notes: approvalData.notes
            }
          : user
      ));
      
      // Send email notification (simulated)
      if (action === 'approve') {
        toast({
          title: "Tài khoản đã được duyệt",
          description: `Email xác nhận đã được gửi đến ${selectedUser.emailOrPhone}. Role: ${approvalData.role}, Công ty: ${approvalData.company}`,
        });
      } else {
        toast({
          title: "Tài khoản đã bị từ chối",
          description: `Email thông báo đã được gửi đến ${selectedUser.emailOrPhone}`,
          variant: "destructive"
        });
      }
      
      setSelectedUser(null);
      setApprovalData({ userId: '', action: 'approve' });
    } catch (error) {
      toast({
        title: "Lỗi xử lý",
        description: "Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="w-3 h-3 mr-1" />Chờ duyệt</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="w-3 h-3 mr-1" />Đã duyệt</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600"><XCircle className="w-3 h-3 mr-1" />Từ chối</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const pendingCount = pendingUsers.filter(user => user.status === 'pending').length;
  const approvedCount = pendingUsers.filter(user => user.status === 'approved').length;
  const rejectedCount = pendingUsers.filter(user => user.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay trở lại
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                BMC Admin - Duyệt Tài Khoản
              </h1>
              <p className="text-gray-600 mt-2">Quản lý và duyệt tài khoản người dùng mới</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chờ duyệt</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">tài khoản</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đã duyệt</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
              <p className="text-xs text-muted-foreground">tài khoản</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Từ chối</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
              <p className="text-xs text-muted-foreground">tài khoản</p>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách tài khoản</CardTitle>
            <CardDescription>
              Quản lý tất cả tài khoản đăng ký trong hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email/SĐT</TableHead>
                  <TableHead>Mã giới thiệu</TableHead>
                  <TableHead>Ngày đăng ký</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Công ty</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {user.emailOrPhone.includes('@') ? (
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        ) : (
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        )}
                        {user.emailOrPhone}
                      </div>
                    </TableCell>
                    <TableCell>{user.referralCode || '-'}</TableCell>
                    <TableCell>{formatDate(user.registrationDate)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.assignedRole || '-'}</TableCell>
                    <TableCell>{user.assignedCompany || '-'}</TableCell>
                    <TableCell>
                      {user.status === 'pending' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user);
                                setApprovalData({ userId: user.id, action: 'approve' });
                              }}
                            >
                              Xử lý
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Duyệt tài khoản</DialogTitle>
                              <DialogDescription>
                                Xử lý yêu cầu đăng ký của {user.emailOrPhone}
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="action" className="text-right">
                                  Hành động
                                </Label>
                                <Select 
                                  value={approvalData.action} 
                                  onValueChange={(value: 'approve' | 'reject') => 
                                    setApprovalData({...approvalData, action: value})
                                  }
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="approve">Duyệt tài khoản</SelectItem>
                                    <SelectItem value="reject">Từ chối</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              {approvalData.action === 'approve' && (
                                <>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="role" className="text-right">
                                      Vai trò
                                    </Label>
                                    <Select 
                                      value={approvalData.role} 
                                      onValueChange={(value: 'CEO' | 'Trưởng phòng' | 'Nhân viên') => 
                                        setApprovalData({...approvalData, role: value})
                                      }
                                    >
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Chọn vai trò" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="CEO">CEO</SelectItem>
                                        <SelectItem value="Trưởng phòng">Trưởng phòng</SelectItem>
                                        <SelectItem value="Nhân viên">Nhân viên</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="company" className="text-right">
                                      Công ty
                                    </Label>
                                    <Select 
                                      value={approvalData.company} 
                                      onValueChange={(value) => 
                                        setApprovalData({...approvalData, company: value})
                                      }
                                    >
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Chọn công ty/dự án" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Startup A - AI Logistics">Startup A - AI Logistics</SelectItem>
                                        <SelectItem value="TechCorp - Fintech">TechCorp - Fintech</SelectItem>
                                        <SelectItem value="GreenEnergy - Renewable">GreenEnergy - Renewable</SelectItem>
                                        <SelectItem value="BMC Holdings">BMC Holdings</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </>
                              )}
                              
                              <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="notes" className="text-right mt-2">
                                  Ghi chú
                                </Label>
                                <Textarea
                                  id="notes"
                                  placeholder="Nhập ghi chú (tùy chọn)"
                                  value={approvalData.notes || ''}
                                  onChange={(e) => setApprovalData({...approvalData, notes: e.target.value})}
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            
                            <DialogFooter>
                              <Button 
                                variant="outline" 
                                onClick={() => setSelectedUser(null)}
                                disabled={isLoading}
                              >
                                Hủy
                              </Button>
                              <Button 
                                onClick={() => handleApproval(approvalData.action)}
                                disabled={isLoading || (approvalData.action === 'approve' && (!approvalData.role || !approvalData.company))}
                                className={approvalData.action === 'approve' 
                                  ? "bg-green-600 hover:bg-green-700" 
                                  : "bg-red-600 hover:bg-red-700"
                                }
                              >
                                {isLoading ? "Đang xử lý..." : (approvalData.action === 'approve' ? "Duyệt" : "Từ chối")}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                      
                      {user.status !== 'pending' && (
                        <Badge variant="secondary" className="text-xs">
                          {user.status === 'approved' ? 'Đã xử lý' : 'Đã từ chối'}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminApproval;