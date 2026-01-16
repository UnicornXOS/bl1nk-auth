import type { JSX } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import DashboardShell, { type DashboardOverview } from '@/components/ui/dashboard-shell';
import IOS26Toggle from '@/components/ui/ios26-toggle';
import IOS26Pagination from '@/components/ui/ios26-pagination';
import IOS26LoadingSpinner from '@/components/ui/ios26-loading-spinner';
import IOS26Notification from '@/components/ui/ios26-notification';
import { useState } from 'react';

interface User {
  id?: string;
  name?: string;
  email?: string;
}

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
    queues: [
      { name: 'Webhook Queue', pending: 18, maxPending: 200, status: 'healthy' },
      { name: 'Email Notifications', pending: 54, maxPending: 150, status: 'warning' },
      { name: 'Customer Imports', pending: 4, maxPending: 50, status: 'healthy' }
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="ios26-card p-8">
          <h2 className="text-2xl font-bold mb-2">ยินดีต้อนรับกลับ</h2>
          <p className="text-lg text-muted-foreground mb-4">
            Hello {session.user?.name ?? 'friend'} 👋
          </p>
          <p className="text-muted-foreground">
            คุณสามารถเรียก webhook และตรวจสอบเหตุการณ์ได้ที่นี่
          </p>
        </div>

        {/* Settings Section */}
        <div className="ios26-card p-6">
          <h3 className="text-lg font-semibold mb-4">การตั้งค่า</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">การแจ้งเตือน</p>
              <p className="text-sm text-muted-foreground">รับการแจ้งเตือนเมื่อมีเหตุการณ์สำคัญ</p>
            </div>
            <IOS26Toggle
              checked={notificationsEnabled}
              onChange={handleNotificationToggle}
              label="เปิดใช้งานการแจ้งเตือน"
            />
          </div>
        </div>

        {/* Activities Section with Pagination */}
        <div className="ios26-card p-6">
          <h3 className="text-lg font-semibold mb-4">กิจกรรมล่าสุด</h3>
          <div className="space-y-4 mb-6">
            {overview.activities.slice((currentPage - 1) * 5, currentPage * 5).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{activity.messageTh}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          <IOS26Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(overview.activities.length / 5)}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Metrics Grid */}
        <div className="ios26-grid">
          {overview.metrics.map((metric) => (
            <div key={metric.id} className="ios26-card p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{metric.labelTh}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  metric.trend.direction === 'up' ? 'bg-green-500/20 text-green-400' :
                  metric.trend.direction === 'down' ? 'bg-red-500/20 text-red-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {metric.trend.percentage}
                </span>
              </div>
              <p className="text-2xl font-bold">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50">
          <IOS26Notification
            type="success"
            title="การตั้งค่าถูกบันทึก"
            message={`การแจ้งเตือน${notificationsEnabled ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}แล้ว`}
            onClose={() => setShowNotification(false)}
          />
        </div>
      )}
    </div>
  );
}
