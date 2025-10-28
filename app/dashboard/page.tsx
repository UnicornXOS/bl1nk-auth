import type { JSX } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import DashboardShell, { type DashboardOverview } from '@/components/ui/dashboard-shell';

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
    <div style={{ padding: '64px 24px' }}>
      <div
        style={{
          borderRadius: '20px',
          background: '#FFFFFF',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          padding: '32px',
          maxWidth: '640px',
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>ยินดีต้อนรับกลับ</h2>
        <p style={{ fontSize: '18px', color: '#475569' }}>Hello {session.user?.name ?? 'friend'} 👋</p>
        <p style={{ marginTop: '16px', color: '#64748B' }}>
          คุณสามารถเรียก webhook และตรวจสอบเหตุการณ์ได้ที่นี่
        </p>
      </div>
    </div>
  );
}
