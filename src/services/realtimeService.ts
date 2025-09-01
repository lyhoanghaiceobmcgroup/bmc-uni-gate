import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface RealtimeData {
  id: string;
  type: 'report' | 'kpi' | 'notification' | 'approval';
  level: 'employee' | 'department' | 'company' | 'group';
  departmentId?: string;
  companyId?: string;
  userId: string;
  data: any;
  timestamp: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface RealtimeSubscription {
  channel: RealtimeChannel;
  unsubscribe: () => void;
}

class RealtimeService {
  private channels: Map<string, RealtimeChannel> = new Map();
  private subscribers: Map<string, Set<(data: RealtimeData) => void>> = new Map();

  /**
   * Subscribe to realtime updates for a specific channel
   */
  subscribe(
    channelName: string,
    callback: (data: RealtimeData) => void,
    filters?: {
      type?: RealtimeData['type'];
      level?: RealtimeData['level'];
      departmentId?: string;
      companyId?: string;
      userId?: string;
    }
  ): RealtimeSubscription {
    // Create channel if it doesn't exist
    if (!this.channels.has(channelName)) {
      const channel = supabase.channel(channelName);
      this.channels.set(channelName, channel);
      this.subscribers.set(channelName, new Set());

      // Subscribe to database changes
      channel
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'realtime_data'
          },
          (payload) => {
            const data = payload.new as RealtimeData;
            this.notifySubscribers(channelName, data, filters);
          }
        )
        .subscribe();
    }

    // Add callback to subscribers
    const channelSubscribers = this.subscribers.get(channelName)!;
    channelSubscribers.add(callback);

    return {
      channel: this.channels.get(channelName)!,
      unsubscribe: () => {
        channelSubscribers.delete(callback);
        
        // Remove channel if no more subscribers
        if (channelSubscribers.size === 0) {
          const channel = this.channels.get(channelName);
          if (channel) {
            supabase.removeChannel(channel);
            this.channels.delete(channelName);
            this.subscribers.delete(channelName);
          }
        }
      }
    };
  }

  /**
   * Notify subscribers with filtering
   */
  private notifySubscribers(
    channelName: string,
    data: RealtimeData,
    filters?: {
      type?: RealtimeData['type'];
      level?: RealtimeData['level'];
      departmentId?: string;
      companyId?: string;
      userId?: string;
    }
  ) {
    const subscribers = this.subscribers.get(channelName);
    if (!subscribers) return;

    // Apply filters
    if (filters) {
      if (filters.type && data.type !== filters.type) return;
      if (filters.level && data.level !== filters.level) return;
      if (filters.departmentId && data.departmentId !== filters.departmentId) return;
      if (filters.companyId && data.companyId !== filters.companyId) return;
      if (filters.userId && data.userId !== filters.userId) return;
    }

    // Notify all subscribers
    subscribers.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error in realtime callback:', error);
      }
    });
  }

  /**
   * Publish data to realtime channel
   */
  async publish(data: Omit<RealtimeData, 'id' | 'timestamp'>): Promise<void> {
    try {
      const realtimeData: RealtimeData = {
        ...data,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString()
      };

      // Insert into database (will trigger realtime updates)
      const { error } = await supabase
        .from('realtime_data')
        .insert(realtimeData);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error publishing realtime data:', error);
      throw error;
    }
  }

  /**
   * Subscribe to employee reports for department managers
   */
  subscribeToEmployeeReports(
    departmentId: string,
    callback: (data: RealtimeData) => void
  ): RealtimeSubscription {
    return this.subscribe(
      `department_${departmentId}`,
      callback,
      {
        type: 'report',
        level: 'employee',
        departmentId
      }
    );
  }

  /**
   * Subscribe to department reports for company executives
   */
  subscribeToDepartmentReports(
    companyId: string,
    callback: (data: RealtimeData) => void
  ): RealtimeSubscription {
    return this.subscribe(
      `company_${companyId}`,
      callback,
      {
        type: 'report',
        level: 'department',
        companyId
      }
    );
  }

  /**
   * Subscribe to company reports for group executives
   */
  subscribeToCompanyReports(
    callback: (data: RealtimeData) => void
  ): RealtimeSubscription {
    return this.subscribe(
      'group_reports',
      callback,
      {
        type: 'report',
        level: 'company'
      }
    );
  }

  /**
   * Subscribe to KPI updates
   */
  subscribeToKPIUpdates(
    level: RealtimeData['level'],
    entityId?: string,
    callback: (data: RealtimeData) => void
  ): RealtimeSubscription {
    const channelName = entityId ? `kpi_${level}_${entityId}` : `kpi_${level}`;
    
    return this.subscribe(
      channelName,
      callback,
      {
        type: 'kpi',
        level,
        ...(level === 'department' && entityId && { departmentId: entityId }),
        ...(level === 'company' && entityId && { companyId: entityId })
      }
    );
  }

  /**
   * Subscribe to notifications
   */
  subscribeToNotifications(
    userId: string,
    callback: (data: RealtimeData) => void
  ): RealtimeSubscription {
    return this.subscribe(
      `notifications_${userId}`,
      callback,
      {
        type: 'notification',
        userId
      }
    );
  }

  /**
   * Subscribe to approval requests
   */
  subscribeToApprovals(
    level: RealtimeData['level'],
    callback: (data: RealtimeData) => void
  ): RealtimeSubscription {
    return this.subscribe(
      `approvals_${level}`,
      callback,
      {
        type: 'approval',
        level
      }
    );
  }

  /**
   * Publish employee report
   */
  async publishEmployeeReport(
    reportData: any,
    userId: string,
    departmentId: string
  ): Promise<void> {
    await this.publish({
      type: 'report',
      level: 'employee',
      departmentId,
      userId,
      data: reportData,
      status: 'completed'
    });
  }

  /**
   * Publish department summary
   */
  async publishDepartmentSummary(
    summaryData: any,
    userId: string,
    departmentId: string,
    companyId: string
  ): Promise<void> {
    await this.publish({
      type: 'report',
      level: 'department',
      departmentId,
      companyId,
      userId,
      data: summaryData,
      status: 'completed'
    });
  }

  /**
   * Publish company summary
   */
  async publishCompanySummary(
    summaryData: any,
    userId: string,
    companyId: string
  ): Promise<void> {
    await this.publish({
      type: 'report',
      level: 'company',
      companyId,
      userId,
      data: summaryData,
      status: 'completed'
    });
  }

  /**
   * Publish KPI update
   */
  async publishKPIUpdate(
    kpiData: any,
    level: RealtimeData['level'],
    userId: string,
    entityId?: string
  ): Promise<void> {
    await this.publish({
      type: 'kpi',
      level,
      ...(level === 'department' && entityId && { departmentId: entityId }),
      ...(level === 'company' && entityId && { companyId: entityId }),
      userId,
      data: kpiData,
      status: 'completed'
    });
  }

  /**
   * Publish notification
   */
  async publishNotification(
    notificationData: any,
    targetUserId: string,
    fromUserId: string
  ): Promise<void> {
    await this.publish({
      type: 'notification',
      level: 'employee',
      userId: targetUserId,
      data: {
        ...notificationData,
        fromUserId
      },
      status: 'completed'
    });
  }

  /**
   * Cleanup all subscriptions
   */
  cleanup(): void {
    this.channels.forEach(channel => {
      supabase.removeChannel(channel);
    });
    this.channels.clear();
    this.subscribers.clear();
  }
}

// Export singleton instance
export const realtimeService = new RealtimeService();
export default realtimeService;