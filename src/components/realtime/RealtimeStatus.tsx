import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Wifi, 
  WifiOff, 
  Users, 
  FileText, 
  TrendingUp, 
  Bell,
  RefreshCw,
  Activity
} from 'lucide-react';
import { useRealtime, useNotifications, useEmployeeReports, useKPIUpdates } from '@/hooks/useRealtime';
import { useAuth } from '@/contexts/AuthContext';

interface RealtimeStatusProps {
  className?: string;
}

const RealtimeStatus: React.FC<RealtimeStatusProps> = ({ className }) => {
  const { user } = useAuth();
  const { isConnected, connectionStatus, clearAllUpdates } = useRealtime();
  const { notifications, unreadCount } = useNotifications();
  const { reports: employeeReports } = useEmployeeReports(
    user?.role === 'manager' ? user?.department : undefined
  );
  const { kpiUpdates } = useKPIUpdates('personal', user?.id);

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'bg-green-500';
      case 'connecting': return 'bg-yellow-500';
      case 'disconnected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'Đã kết nối';
      case 'connecting': return 'Đang kết nối';
      case 'disconnected': return 'Mất kết nối';
      default: return 'Không xác định';
    }
  };

  const realtimeStats = [
    {
      icon: Bell,
      label: 'Thông báo',
      count: notifications.length,
      unread: unreadCount,
      color: 'text-blue-600'
    },
    {
      icon: FileText,
      label: 'Báo cáo',
      count: employeeReports.length,
      unread: employeeReports.filter(r => 
        new Date(r.timestamp).getTime() > Date.now() - 5 * 60 * 1000
      ).length,
      color: 'text-green-600'
    },
    {
      icon: TrendingUp,
      label: 'KPI Updates',
      count: kpiUpdates.length,
      unread: kpiUpdates.filter(k => 
        new Date(k.timestamp).getTime() > Date.now() - 5 * 60 * 1000
      ).length,
      color: 'text-purple-600'
    }
  ];

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Realtime Status
          </div>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <Wifi className="w-4 h-4 text-green-600" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-600" />
            )}
            <Badge 
              variant="outline" 
              className={`${getStatusColor()} text-white border-0`}
            >
              {getStatusText()}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status Details */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          {realtimeStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center p-2 bg-gray-50 rounded">
                <IconComponent className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />
                <div className="font-medium">{stat.count}</div>
                <div className="text-gray-500">{stat.label}</div>
                {stat.unread > 0 && (
                  <Badge variant="destructive" className="text-xs mt-1">
                    {stat.unread} mới
                  </Badge>
                )}
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-700">Hoạt động gần đây:</div>
          <div className="space-y-1 max-h-20 overflow-y-auto">
            {notifications.slice(0, 3).map((notification, index) => (
              <div key={index} className="text-xs p-1 bg-blue-50 rounded flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                <span className="truncate">{notification.data.title}</span>
                <span className="text-gray-500 text-xs flex-shrink-0">
                  {new Date(notification.timestamp).toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            ))}
            {notifications.length === 0 && (
              <div className="text-xs text-gray-500 italic">Không có hoạt động nào</div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearAllUpdates}
            className="flex-1 text-xs"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Xóa tất cả
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealtimeStatus;