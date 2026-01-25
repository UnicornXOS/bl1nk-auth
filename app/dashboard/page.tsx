import type { JSX } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import IOS26Toggle from '@/components/ui/ios26-toggle';
import IOS26Pagination from '@/components/ui/ios26-pagination';
import IOS26Notification from '@/components/ui/ios26-notification';
import GlassCard from '@/components/ui/glass-card';
import { useState } from 'react';

// Types
interface DashboardOverview {
  metrics: Array<{
    id: string;
    labelTh: string;
    labelEn: string;
    value: string;
    trend: { direction: 'up' | 'down' | 'flat'; percentage: string };
  }>;
  activities: Array<{
    id: string;
    messageTh: string;
    messageEn: string;
    timestamp: string;
    status: 'success' | 'warning' | 'error';
  }>;
}

// Mock Data Fetcher
async function getDashboardOverview(): Promise<DashboardOverview> {
  return {
    metrics: [
      {
        id: 'active-users',
        labelTh: 'ผู้ใช้ที่ลงชื่อเข้าใช้',
        labelEn: 'Active sessions',
        value: '1,286',
        trend: { direction: 'up', percentage: '+12%' }
      },
      {
        id: 'webhook-delivery',
        labelTh: 'การส่ง webhook ที่สำเร็จ',
        labelEn: 'Webhook success',
        value: '98.7%',
        trend: { direction: 'up', percentage: '+2.1%' }
      },
      {
        id: 'alerts',
        labelTh: 'การแจ้งเตือนช่วง 24 ชม.',
        labelEn: 'Alerts in window',
        value: '5',
        trend: { direction: 'flat', percentage: '0%' }
      }
    ],
    activities: [
      {
        id: 'activity-1',
        messageTh: 'ลูกค้าใหม่เชื่อม OAuth สำเร็จ (graphic-ai)',
        messageEn: 'New client graphic-ai completed OAuth handshake.',
        timestamp: 'วันนี้ · 09:24 น.',
        status: 'success'
      },
      {
        id: 'activity-2',
        messageTh: 'Webhook retry รอบที่ 2 สำเร็จ (note)',
        messageEn: 'Webhook retry cycle resolved for client note.',
        timestamp: 'วันนี้ · 08:41 น.',
        status: 'warning'
      },
      {
        id: 'activity-3',
        messageTh: 'มีการร้องขอสิทธิ์เพิ่ม (admin@finpeak.co)',
        messageEn: 'Elevated access request pending approval.',
        timestamp: 'เมื่อวาน · 19:12 น.',
        status: 'warning'
      }
    ]
  };
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect('/auth/login');
  }
  const overview = await getDashboardOverview();

  return (
    <DashboardClient session={session} overview={overview} />
  );
}

function DashboardClient({ session, overview }: { session: any; overview: DashboardOverview }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNotificationToggle = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 p-10">
        <div className="relative z-10">
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{session.user?.name ?? 'Commander'}</span>.
          </h1>
          <p className="text-gray-400 max-w-2xl font-mono text-sm">
            All systems operational. Webhook delivery rate at 99.8%.
            No critical alerts detected in the last 24 sectors.
          </p>
          <button className="mt-6 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all">
            Initialize Terminal
          </button>
        </div>

        {/* Abstract Background Waves */}
        <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 50 Q 50 100 100 50 T 200 50" fill="none" stroke="cyan" strokeWidth="0.5" />
            <path d="M0 60 Q 50 110 100 60 T 200 60" fill="none" stroke="purple" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Metrics Column (Left - 2cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {overview.metrics.map((metric) => (
              <GlassCard key={metric.id} hoverEffect className="relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                </div>
                <h3 className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-1">{metric.labelEn}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-display font-bold text-white">{metric.value}</span>
                  <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${metric.trend.direction === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                    {metric.trend.percentage}
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Activity Feed */}
          <GlassCard className="h-full">
            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
              <h3 className="font-display text-lg text-white">Recent Activity</h3>
              <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20 animate-pulse">Live</span>
            </div>

            <div className="space-y-4">
              {overview.activities.slice((currentPage - 1) * 5, currentPage * 5).map((activity) => (
                <div key={activity.id} className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className={`mt-1.5 w-2 h-2 rounded-full shadow-[0_0_8px] ${activity.status === 'success' ? 'bg-green-500 shadow-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500 shadow-yellow-500' : 'bg-red-500 shadow-red-500'
                    }`} />
                  <div className="flex-1">
                    <p className="text-gray-200 font-medium font-mono text-sm group-hover:text-cyan-300 transition-colors">{activity.messageEn}</p>
                    <p className="text-gray-500 text-xs mt-1">{activity.messageTh}</p>
                  </div>
                  <span className="text-xs text-gray-600 font-mono whitespace-nowrap">{activity.timestamp}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <IOS26Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(overview.activities.length / 5)}
                onPageChange={handlePageChange}
              />
            </div>
          </GlassCard>
        </div>

        {/* Settings / Usage Column (Right - 1col) */}
        <div className="space-y-8">
          {/* Chart Placeholder */}
          <GlassCard>
            <h3 className="font-display text-lg text-white mb-6">Token Consumption</h3>
            <div className="relative aspect-square flex items-center justify-center">
              {/* CSS Ring Chart Placeholder */}
              <div className="w-48 h-48 rounded-full border-[12px] border-white/5 border-t-cyan-500 border-r-purple-500 rotate-45 transform transition-transform hover:scale-105" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">73%</span>
                <span className="text-xs text-gray-400 mt-1">QUOTA USED</span>
              </div>
            </div>
          </GlassCard>

          {/* Quick Settings */}
          <GlassCard>
            <h3 className="font-display text-lg text-white mb-4">Quick Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                <span className="text-sm text-gray-300">System Notifications</span>
                <IOS26Toggle
                  checked={notificationsEnabled}
                  onChange={handleNotificationToggle}
                  label="Notifications"
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                <span className="text-sm text-gray-300">Auto-Scaling</span>
                <div className="w-10 h-6 rounded-full bg-white/10 opacity-50 cursor-not-allowed"></div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right fade-in duration-300">
          <IOS26Notification
            type="success"
            title="System Updated"
            message={`Notification channel ${notificationsEnabled ? 'active' : 'muted'}. Reference ID: #SYS-99`}
            onClose={() => setShowNotification(false)}
          />
        </div>
      )}
    </div>
  );
}

