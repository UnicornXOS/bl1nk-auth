import { CSSProperties, ReactNode } from 'react';

import { getQueueStats } from '@/lib/queue';
import { logger } from '@/lib/logger';

type QueueStats = Awaited<ReturnType<typeof getQueueStats>>;

type StatCardProps = {
  title: string;
  value: number;
  accent: string;
};

const layoutStyles: Record<string, CSSProperties> = {
  container: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '32px 24px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: '#111827',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },
  card: {
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 10px 20px rgba(15, 23, 42, 0.08)',
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: '13px',
    textTransform: 'uppercase',
    color: '#6b7280',
    letterSpacing: '0.08em',
  },
  value: {
    fontSize: '32px',
    fontWeight: 700,
    marginTop: '8px',
  },
  section: {
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    padding: '24px',
    boxShadow: '0 10px 20px rgba(15, 23, 42, 0.08)',
    marginBottom: '24px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    textAlign: 'left',
    fontSize: '12px',
    textTransform: 'uppercase',
    color: '#6b7280',
    padding: '12px 16px',
    borderBottom: '1px solid #e5e7eb',
  },
  tableCell: {
    fontSize: '14px',
    padding: '12px 16px',
    borderBottom: '1px solid #e5e7eb',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 600,
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
  },
};

async function loadStats(): Promise<QueueStats> {
  try {
    return await getQueueStats();
  } catch (err) {
    const error = err as Error;
    logger.error('Failed to load queue stats for dashboard', { error: error.message });
    return { waiting: 0, active: 0, completed: 0, failed: 0, total: 0 };
  }
}

export default async function DashboardPage(): Promise<ReactNode> {
  const stats = await loadStats();

  return (
    <div style={layoutStyles.container}>
      <h1 style={layoutStyles.heading}>Webhook Dashboard</h1>
      <div style={layoutStyles.grid}>
        <StatCard title="Waiting" value={stats.waiting} accent="#1d4ed8" />
        <StatCard title="Active" value={stats.active} accent="#f59e0b" />
        <StatCard title="Completed" value={stats.completed} accent="#16a34a" />
        <StatCard title="Failed" value={stats.failed} accent="#dc2626" />
      </div>

      <section style={layoutStyles.section}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>Queue Status</h2>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          A richer visualization can be connected later. For now, monitor the aggregate counts above and review
          recent errors below.
        </p>
      </section>

      <section style={layoutStyles.section}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>Recent Errors</h2>
        <ErrorList />
      </section>
    </div>
  );
}

function StatCard({ title, value, accent }: StatCardProps): JSX.Element {
  return (
    <div style={layoutStyles.card}>
      <p style={layoutStyles.label}>{title}</p>
      <p style={{ ...layoutStyles.value, color: accent }}>{value}</p>
    </div>
  );
}

async function ErrorList(): Promise<JSX.Element> {
  const items = [
    {
      id: 1,
      time: '2023-10-15 14:30',
      message: 'GitHub API rate limit exceeded',
      provider: 'github',
    },
    {
      id: 2,
      time: '2023-10-15 12:15',
      message: 'Invalid Notion database ID',
      provider: 'notion',
    },
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={layoutStyles.table}>
        <thead>
          <tr>
            <Th>Time</Th>
            <Th>Provider</Th>
            <Th>Error</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {items.map((error) => (
            <tr key={error.id}>
              <Td>{error.time}</Td>
              <Td>
                <span style={layoutStyles.badge}>{error.provider}</span>
              </Td>
              <Td>{error.message}</Td>
              <Td>
                <span
                  style={{
                    color: '#4f46e5',
                    fontWeight: 600,
                  }}
                >
                  Retry
                </span>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: ReactNode }): JSX.Element {
  return <th style={layoutStyles.tableHeader}>{children}</th>;
}

function Td({ children }: { children: ReactNode }): JSX.Element {
  return <td style={layoutStyles.tableCell}>{children}</td>;
}
