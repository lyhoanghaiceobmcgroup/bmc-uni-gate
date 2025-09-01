import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { useNotifications } from '@/hooks/useRealtime';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

interface NotificationCenterProps {
  className?: string;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ className }) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'info' | 'success' | 'warning' | 'error'>('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getNotificationBgColor = (type: string, isRead: boolean) => {
    const opacity = isRead ? 'bg-opacity-30' : 'bg-opacity-50';
    switch (type) {
      case 'success': return `bg-green-50 ${opacity}`;
      case 'warning': return `bg-yellow-50 ${opacity}`;
      case 'error': return `bg-red-50 ${opacity}`;
      default: return `bg-blue-50 ${opacity}`;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesReadFilter = 
      filter === 'all' || 
      (filter === 'read' && notification.read) ||
      (filter === 'unread' && !notification.read);
    
    const matchesTypeFilter = 
      typeFilter === 'all' || 
      notification.data.type === typeFilter;
    
    return matchesReadFilter && matchesTypeFilter;
  });

  const groupedNotifications = {
    today: filteredNotifications.filter(n => 
      new Date(n.timestamp).toDateString() === new Date().toDateString()
    ),
    yesterday: filteredNotifications.filter(n => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return new Date(n.timestamp).toDateString() === yesterday.toDateString();
    }),
    older: filteredNotifications.filter(n => {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      return new Date(n.timestamp) < twoDaysAgo;
    })
  };

  const renderNotificationGroup = (title: string, notifications: typeof filteredNotifications) => {
    if (notifications.length === 0) return null;

    return (
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700 px-2">{title}</h4>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg border transition-all hover:shadow-sm ${
              getNotificationBgColor(notification.data.type, notification.read)
            } ${!notification.read ? 'border-l-4 border-l-blue-500' : 'border-gray-200'}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getNotificationIcon(notification.data.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-gray-900 truncate">
                      {notification.data.title}
                    </h5>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {notification.data.message}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="h-6 w-6 p-0"
                      >
                        <Check className="w-3 h-3" />
                      </Button>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {notification.data.type}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(new Date(notification.timestamp), {
                      addSuffix: true,
                      locale: vi
                    })}
                  </span>
                  
                  {notification.data.data && (
                    <span className="text-xs text-blue-600 font-medium">
                      {Object.keys(notification.data.data).length} chi tiết
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Trung tâm thông báo
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <CheckCheck className="w-4 h-4 mr-1" />
              Đánh dấu tất cả
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearNotifications}
              disabled={notifications.length === 0}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Xóa tất cả
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger 
                value="all" 
                onClick={() => setFilter('all')}
                className="text-xs"
              >
                Tất cả ({notifications.length})
              </TabsTrigger>
              <TabsTrigger 
                value="unread" 
                onClick={() => setFilter('unread')}
                className="text-xs"
              >
                Chưa đọc ({unreadCount})
              </TabsTrigger>
              <TabsTrigger 
                value="read" 
                onClick={() => setFilter('read')}
                className="text-xs"
              >
                Đã đọc ({notifications.length - unreadCount})
              </TabsTrigger>
            </TabsList>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="text-xs border rounded px-2 py-1 ml-2"
            >
              <option value="all">Tất cả loại</option>
              <option value="info">Thông tin</option>
              <option value="success">Thành công</option>
              <option value="warning">Cảnh báo</option>
              <option value="error">Lỗi</option>
            </select>
          </div>
          
          <TabsContent value="all" className="mt-4">
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {renderNotificationGroup('Hôm nay', groupedNotifications.today)}
                {renderNotificationGroup('Hôm qua', groupedNotifications.yesterday)}
                {renderNotificationGroup('Cũ hơn', groupedNotifications.older)}
                
                {filteredNotifications.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Không có thông báo nào</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;