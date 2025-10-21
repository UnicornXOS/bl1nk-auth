'use client';

import { useMemo, useState } from 'react';
import type { JSX } from 'react';
import Link from 'next/link';
import { designTokens } from '@/theme/tokens';
import { trackEvent, useAnalyticsEvent } from '@/lib/analytics-client';

type TrendDirection = 'up' | 'down' | 'flat';

type Metric = {
  id: string;
  labelTh: string;
  labelEn: string;
  value: string;
  trend: {
    direction: TrendDirection;
    percentage: string;
  };
};

type QueueHealth = {
  name: string;
  pending: number;
  maxPending: number;
  status: 'healthy' | 'warning' | 'critical';
};

type ActivityItem = {
  id: string;
  messageTh: string;
  messageEn: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
};

export type DashboardOverview = {
  metrics: Metric[];
  queues: QueueHealth[];
  activities: ActivityItem[];
};

type Timeframe = '24h' | '7d' | '30d';

type DashboardShellProps = {
  userName: string;
  userEmail?: string;
  overview: DashboardOverview;
};

const timeframeOptions: Array<{ value: Timeframe; labelTh: string; labelEn: string }> = [
  { value: '24h', labelTh: '24 ชั่วโมง', labelEn: 'Last 24 hours' },
  { value: '7d', labelTh: '7 วัน', labelEn: 'Last 7 days' },
  { value: '30d', labelTh: '30 วัน', labelEn: 'Last 30 days' }
];

export default function DashboardShell({ userName, userEmail, overview }: DashboardShellProps): JSX.Element {
  const [timeframe, setTimeframe] = useState<Timeframe>('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState<DashboardOverview>(overview);

  useAnalyticsEvent('dashboard_viewed', { timeframe, userEmail }, []);

  const activeActivities = useMemo(() => data.activities.slice(0, 5), [data.activities]);

  const handleTimeframeChange = async (nextTimeframe: Timeframe) => {
    if (timeframe === nextTimeframe) return;
    setTimeframe(nextTimeframe);
    setIsRefreshing(true);
    trackEvent('dashboard_timeframe_changed', { timeframe: nextTimeframe });

    await new Promise((resolve) => setTimeout(resolve, 600));

    const multiplier = nextTimeframe === '24h' ? 1 : nextTimeframe === '7d' ? 3 : 5;
    setData((current) => ({
      ...current,
      metrics: current.metrics.map((metric) => ({
        ...metric,
        value: multiplyValue(metric.value, multiplier),
        trend: metric.trend
      })),
      queues: current.queues.map((queue) => ({
        ...queue,
        pending: Math.min(queue.pending * multiplier, queue.maxPending)
      }))
    }));

    setIsRefreshing(false);
  };

  return (
    <div className="container py-12">
      <section
        className="rounded-3xl border p-8"
        style={{ borderColor: designTokens.colors.border, backgroundColor: designTokens.colors.card }}
      >
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-white/60">ยินดีต้อนรับกลับมา · Welcome back</p>
            <h1 className="text-3xl font-semibold text-white">
              {userName || 'ผู้ใช้ของเรา'}
            </h1>
            <p className="text-sm text-white/80">{userEmail}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {timeframeOptions.map((option) => {
              const isActive = option.value === timeframe;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleTimeframeChange(option.value)}
                  className="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                  style={{
                    backgroundColor: isActive ? designTokens.colors.primary : 'transparent',
                    color: isActive ? designTokens.colors.primaryForeground : designTokens.colors.foreground,
                    border: `1px solid ${designTokens.colors.border}`
                  }}
                >
                  {option.labelTh}
                  <span className="ml-1 text-xs uppercase tracking-wide text-white/60">
                    {option.labelEn}
                  </span>
                </button>
              );
            })}
            {isRefreshing && (
              <span className="rounded-full border px-3 py-2 text-xs uppercase tracking-wide text-white/60" style={{ borderColor: designTokens.colors.border }}>
                กำลังอัปเดต…
              </span>
            )}
          </div>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {data.metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <QueuePanel queues={data.queues} />
          <ActivityPanel activities={activeActivities} />
        </section>
      </section>
    </div>
  );
}

function MetricCard({ metric }: { metric: Metric }): JSX.Element {
  const indicatorColor =
    metric.trend.direction === 'up'
      ? '#34d399'
      : metric.trend.direction === 'down'
      ? '#f87171'
      : 'rgba(255,255,255,0.5)';

  const indicatorSymbol =
    metric.trend.direction === 'up' ? '▲' : metric.trend.direction === 'down' ? '▼' : '■';

  return (
    <article
      className="rounded-2xl border p-6"
      style={{ borderColor: designTokens.colors.border, backgroundColor: 'rgba(15,23,42,0.35)' }}
    >
      <p className="text-xs uppercase tracking-wide text-white/60">{metric.labelEn}</p>
      <h3 className="mt-2 text-xl font-semibold text-white">{metric.labelTh}</h3>
      <div className="mt-4 flex items-end justify-between">
        <span className="text-3xl font-semibold text-white">{metric.value}</span>
        <span className="text-sm" style={{ color: indicatorColor }}>
          {indicatorSymbol} {metric.trend.percentage}
        </span>
      </div>
    </article>
  );
}

function QueuePanel({ queues }: { queues: QueueHealth[] }): JSX.Element {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{ borderColor: designTokens.colors.border, backgroundColor: 'rgba(5,11,29,0.45)' }}
    >
      <h2 className="text-lg font-semibold text-white">สถานะคิว · Queue Health</h2>
      <p className="mt-2 text-sm text-white/80">
        ติดตามคิว webhook, email, และ background jobs เพื่อให้การส่งข้อมูลไม่สะดุด.
      </p>
      <div className="mt-6 space-y-4">
        {queues.map((queue) => (
          <div key={queue.name} className="flex flex-col gap-2 rounded-xl border px-4 py-3" style={{ borderColor: designTokens.colors.border }}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">{queue.name}</span>
              <QueueStatus status={queue.status} />
            </div>
            <div className="flex items-center justify-between text-sm text-white/80">
              <span>งานค้าง: {queue.pending.toLocaleString('th-TH')}</span>
              <span>ขีดจำกัด: {queue.maxPending.toLocaleString('th-TH')}</span>
            </div>
          </div>
        ))}
      </div>
      <Link href="/dashboard/queues" className="mt-4 inline-block text-sm font-semibold text-white">
        ดูรายละเอียดคิวทั้งหมด ↗
      </Link>
    </div>
  );
}

function QueueStatus({ status }: { status: QueueHealth['status'] }): JSX.Element {
  const label =
    status === 'healthy' ? 'พร้อมใช้งาน' : status === 'warning' ? 'ต้องจับตา' : 'ต้องการการดูแล';
  const color =
    status === 'healthy' ? '#34d399' : status === 'warning' ? '#fbbf24' : '#f87171';

  return (
    <span
      className="rounded-full px-3 py-1 text-xs uppercase tracking-wide"
      style={{
        backgroundColor: `${color}22`,
        color
      }}
    >
      {label}
    </span>
  );
}

function ActivityPanel({ activities }: { activities: ActivityItem[] }): JSX.Element {
  if (activities.length === 0) {
    return (
      <div
        className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border p-6 text-center"
        style={{ borderColor: designTokens.colors.border, backgroundColor: 'rgba(15,23,42,0.35)' }}
      >
        <p className="text-lg font-semibold text-white">ยังไม่พบกิจกรรมล่าสุด</p>
        <p className="max-w-xs text-sm text-white/80">
          เริ่มต้นด้วยการสร้าง client ใหม่หรือเรียกใช้งาน API เพื่อตรวจสอบการไหลของ webhook.
        </p>
        <Link href="/docs/quickstart" className="rounded-full border px-4 py-2 text-sm font-semibold" style={{ borderColor: designTokens.colors.border }}>
          ดูคู่มือ Quickstart
        </Link>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border p-6"
      style={{ borderColor: designTokens.colors.border, backgroundColor: 'rgba(15,23,42,0.35)' }}
    >
      <h2 className="text-lg font-semibold text-white">กิจกรรมล่าสุด · Activity Feed</h2>
      <ul className="mt-4 space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="rounded-xl border px-4 py-3" style={{ borderColor: designTokens.colors.border }}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">{activity.messageTh}</span>
              <ActivityStatus status={activity.status} />
            </div>
            <p className="text-xs uppercase tracking-wide text-white/60">{activity.messageEn}</p>
            <p className="mt-1 text-xs text-white/60">{activity.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ActivityStatus({ status }: { status: ActivityItem['status'] }): JSX.Element {
  const config =
    status === 'success'
      ? { color: '#34d399', label: 'สำเร็จ' }
      : status === 'warning'
      ? { color: '#fbbf24', label: 'คำเตือน' }
      : { color: '#f87171', label: 'ข้อผิดพลาด' };

  return (
    <span
      className="rounded-full px-3 py-1 text-xs uppercase tracking-wide"
      style={{ backgroundColor: `${config.color}22`, color: config.color }}
    >
      {config.label}
    </span>
  );
}

function multiplyValue(value: string, multiplier: number): string {
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
  if (Number.isNaN(numeric)) return value;
  const suffix = value.includes('%') ? '%' : '';
  const result = numeric * multiplier;
  if (suffix === '%') {
    return `${Math.min(result, 100).toFixed(1)}%`;
  }
  return result >= 1000 ? `${Math.round(result).toLocaleString()}` : result.toFixed(0);
}
