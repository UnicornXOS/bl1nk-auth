import React from 'react';

export interface DashboardOverview {
  metrics: { id: string; labelTh: string; labelEn: string; value: string; trend: { direction: string; percentage: string } }[];
  queues: { name: string; pending: number; maxPending: number; status: string }[];
  activities: { id: string; messageTh: string; messageEn: string; timestamp: string; status: string }[];
}

interface DashboardShellProps {
  userName?: string;
  userEmail?: string;
  overview: DashboardOverview;
}

const DashboardShell: React.FC<DashboardShellProps> = ({ userName, userEmail, overview }) => {
  return (
    <div className="dashboard-shell">
      <h1>Dashboard for {userName || 'Guest'}</h1>
      {userEmail && <p>Email: {userEmail}</p>}
      
      <h2>Overview</h2>
      <div>
        <h3>Metrics</h3>
        {overview.metrics.map(metric => (
          <div key={metric.id}>
            <p>{metric.labelTh} ({metric.labelEn}): {metric.value} ({metric.trend.percentage})</p>
          </div>
        ))}
      </div>

      <div>
        <h3>Queues</h3>
        {overview.queues.map(queue => (
          <div key={queue.name}>
            <p>{queue.name}: {queue.pending}/{queue.maxPending} ({queue.status})</p>
          </div>
        ))}
      </div>

      <div>
        <h3>Activities</h3>
        {overview.activities.map(activity => (
          <div key={activity.id}>
            <p>{activity.messageTh} ({activity.messageEn}) - {activity.timestamp} ({activity.status})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardShell;

