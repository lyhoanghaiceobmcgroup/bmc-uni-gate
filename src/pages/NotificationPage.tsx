import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import NotificationCenter from '@/components/realtime/NotificationCenter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotificationPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
              </Button>
              
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Thông báo
                </h1>
                <p className="text-sm text-gray-500">
                  Quản lý và theo dõi các thông báo realtime
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {user?.name}
                </div>
                <div className="text-xs text-gray-500">
                  {user?.role === 'manager' && 'Trưởng phòng'}
                  {user?.role === 'employee' && 'Nhân viên'}
                  {user?.role === 'ceo' && 'CEO'}
                  {user?.role === 'bmc_holdings' && 'BMC Holdings'}
                </div>
              </div>
              
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Cài đặt
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Notification Center */}
          <div className="lg:col-span-3">
            <NotificationCenter />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Thống kê nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Hôm nay</span>
                  <span className="font-medium">12 thông báo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tuần này</span>
                  <span className="font-medium">45 thông báo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tháng này</span>
                  <span className="font-medium">128 thông báo</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Notification Types */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Loại thông báo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Thông tin</span>
                  </div>
                  <span className="text-sm font-medium">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Thành công</span>
                  </div>
                  <span className="text-sm font-medium">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Cảnh báo</span>
                  </div>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Lỗi</span>
                  </div>
                  <span className="text-sm font-medium">3</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Thao tác nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Báo cáo hoạt động
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  KPI Dashboard
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  AI Reporting
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;