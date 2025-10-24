import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import type { JSX } from 'react';

export default async function Dashboard(): Promise<JSX.Element> {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
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
