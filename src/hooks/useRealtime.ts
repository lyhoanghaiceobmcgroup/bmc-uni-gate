import { useEffect, useRef, useState, useCallback } from 'react';
import { realtimeService, RealtimeData, RealtimeSubscription } from '@/services/realtimeService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface UseRealtimeOptions {
  autoConnect?: boolean;
  showNotifications?: boolean;
  onError?: (error: Error) => void;
}

export interface UseRealtimeReturn {
  isConnected: boolean;
  lastUpdate: RealtimeData | null;
  updates: RealtimeData[];
  subscribe: (channelName: string, callback: (data: RealtimeData) => void, filters?: any) => void;
  unsubscribe: (channelName: string) => void;
  publish: (data: Omit<RealtimeData, 'id' | 'timestamp'>) => Promise<void>;
  clearUpdates: () => void;
}

export const useRealtime = (options: UseRealtimeOptions = {}): UseRealtimeReturn => {
  const { autoConnect = true, showNotifications = true, onError } = options;
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<RealtimeData | null>(null);
  const [updates, setUpdates] = useState<RealtimeData[]>([]);
  const subscriptionsRef = useRef<Map<string, RealtimeSubscription>>(new Map());

  const handleRealtimeUpdate = useCallback((data: RealtimeData) => {
    setLastUpdate(data);
    setUpdates(prev => [data, ...prev.slice(0, 49)]); // Keep last 50 updates

    // Show notification if enabled
    if (showNotifications && data.type === 'notification') {
      toast.info(data.data.title || 'Thông báo mới', {
        description: data.data.message || 'Bạn có thông báo mới'
      });
    }
  }, [showNotifications]);

  const subscribe = useCallback((channelName: string, callback: (data: RealtimeData) => void, filters?: any) => {
    try {
      const subscription = realtimeService.subscribe(channelName, callback, filters);
      subscriptionsRef.current.set(channelName, subscription);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to subscribe to realtime channel:', error);
      onError?.(error as Error);
    }
  }, [onError]);

  const unsubscribe = useCallback((channelName: string) => {
    const subscription = subscriptionsRef.current.get(channelName);
    if (subscription) {
      subscription.unsubscribe();
      subscriptionsRef.current.delete(channelName);
      
      if (subscriptionsRef.current.size === 0) {
        setIsConnected(false);
      }
    }
  }, []);

  const publish = useCallback(async (data: Omit<RealtimeData, 'id' | 'timestamp'>) => {
    try {
      await realtimeService.publish(data);
    } catch (error) {
      console.error('Failed to publish realtime data:', error);
      onError?.(error as Error);
      throw error;
    }
  }, [onError]);

  const clearUpdates = useCallback(() => {
    setUpdates([]);
    setLastUpdate(null);
  }, []);

  // Auto-connect to user notifications if enabled
  useEffect(() => {
    if (autoConnect && user?.id) {
      const subscription = realtimeService.subscribeToNotifications(
        user.id,
        handleRealtimeUpdate
      );
      
      subscriptionsRef.current.set('notifications', subscription);
      setIsConnected(true);

      return () => {
        subscription.unsubscribe();
        subscriptionsRef.current.delete('notifications');
      };
    }
  }, [autoConnect, user?.id, handleRealtimeUpdate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      subscriptionsRef.current.forEach(subscription => {
        subscription.unsubscribe();
      });
      subscriptionsRef.current.clear();
    };
  }, []);

  const testConnection = useCallback(() => {
    console.log('Testing realtime connection...');
    // Mock test connection
    setIsConnected(true);
  }, []);

  const subscribeToCompanyReports = useCallback((companyId: string, callback: (data: RealtimeData) => void) => {
    subscribe(`company_reports_${companyId}`, callback);
  }, [subscribe]);

  const subscribeToCompanyUpdates = useCallback((companyId: string, callback: (data: RealtimeData) => void) => {
    subscribe(`company_updates_${companyId}`, callback);
  }, [subscribe]);

  const subscribeToDashboardStats = useCallback((companyId: string, callback: (data: RealtimeData) => void) => {
    subscribe(`dashboard_stats_${companyId}`, callback);
  }, [subscribe]);

  return {
    isConnected,
    lastUpdate,
    updates,
    subscribe,
    unsubscribe,
    publish,
    clearUpdates,
    testConnection,
    subscribeToCompanyReports,
    subscribeToCompanyUpdates,
    subscribeToDashboardStats
  };
};

// Specialized hooks for different use cases

export const useEmployeeReports = (departmentId?: string) => {
  const { user } = useAuth();
  const [reports, setReports] = useState<RealtimeData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!departmentId || !user) return;

    setLoading(true);
    const subscription = realtimeService.subscribeToEmployeeReports(
      departmentId,
      (data) => {
        setReports(prev => [data, ...prev]);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [departmentId, user]);

  return { reports, loading };
};

export const useDepartmentReports = (companyId?: string) => {
  const { user } = useAuth();
  const [reports, setReports] = useState<RealtimeData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!companyId || !user) return;

    setLoading(true);
    const subscription = realtimeService.subscribeToDepartmentReports(
      companyId,
      (data) => {
        setReports(prev => [data, ...prev]);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [companyId, user]);

  return { reports, loading };
};

export const useCompanyReports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<RealtimeData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'bmc_holdings') return;

    setLoading(true);
    const subscription = realtimeService.subscribeToCompanyReports(
      (data) => {
        setReports(prev => [data, ...prev]);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return { reports, loading };
};

export const useKPIUpdates = (level: RealtimeData['level'], entityId?: string) => {
  const { user } = useAuth();
  const [kpiUpdates, setKpiUpdates] = useState<RealtimeData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const subscription = realtimeService.subscribeToKPIUpdates(
      level,
      entityId,
      (data) => {
        setKpiUpdates(prev => [data, ...prev]);
        setLoading(false);
        
        // Show toast for KPI updates
        toast.success('KPI đã được cập nhật', {
          description: `${data.data.title || 'Chỉ số KPI'} đã có dữ liệu mới`
        });
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [level, entityId, user]);

  return { kpiUpdates, loading };
};

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<RealtimeData[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    setLoading(true);
    const subscription = realtimeService.subscribeToNotifications(
      user.id,
      (data) => {
        setNotifications(prev => [data, ...prev]);
        setUnreadCount(prev => prev + 1);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [user?.id]);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, data: { ...notif.data, read: true } }
          : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, data: { ...notif.data, read: true } }))
    );
    setUnreadCount(0);
  }, []);

  return { 
    notifications, 
    unreadCount, 
    loading, 
    markAsRead, 
    markAllAsRead 
  };
};

export const useApprovals = (level: RealtimeData['level']) => {
  const { user } = useAuth();
  const [approvals, setApprovals] = useState<RealtimeData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const subscription = realtimeService.subscribeToApprovals(
      level,
      (data) => {
        setApprovals(prev => [data, ...prev]);
        setLoading(false);
        
        // Show toast for approval requests
        toast.info('Yêu cầu phê duyệt mới', {
          description: data.data.title || 'Bạn có yêu cầu phê duyệt mới'
        });
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [level, user]);

  return { approvals, loading };
};

export default useRealtime;