"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { GlowButton } from "@/components/ui/glow-button";
import { Icon } from "@/components/ui/icon";
import IOS26Notification from "@/components/shared/IOS26Notification";
import IOS26Pagination from "@/components/shared/IOS26Pagination";
import IOS26Toggle from "@/components/shared/IOS26Toggle";

export interface DashboardOverview {
  metrics: Array<{
    id: string;
    labelTh: string;
    labelEn: string;
    value: string;
    trend: { direction: "up" | "down" | "flat"; percentage: string };
  }>;
  activities: Array<{
    id: string;
    messageTh: string;
    messageEn: string;
    timestamp: string;
    status: "success" | "warning" | "error";
  }>;
}

export default function DashboardClient({
  session,
  overview,
}: {
  session: unknown;
  overview: DashboardOverview;
}) {
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

  const userName = (session as { user?: { name?: string } } | null)?.user?.name ?? "Commander";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Banner */}
      <GlassPanel
        tone="dark"
        className="p-8 sm:p-10 border border-white/10 relative overflow-hidden"
      >
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
            <span>Operational Mode</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            Welcome back, <span className="text-[#34d399]">{userName}</span>
          </h1>

          <p className="text-neutral-400 max-w-2xl font-mono text-sm leading-relaxed">
            All identity gateway clusters operational. Webhook delivery rate at 99.8%. No security
            incidents reported.
          </p>

          <div className="pt-2">
            <GlowButton variant="solid" size="default">
              <Icon name="terminal" size={18} />
              <span>Initialize Terminal</span>
            </GlowButton>
          </div>
        </div>

        {/* Ambient Emerald Radial Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#34d399]/15 via-teal-900/5 to-transparent blur-3xl pointer-events-none -z-10" />
      </GlassPanel>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Metrics Column (Left - 2cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {overview.metrics.map((metric, idx) => {
              const iconNames = ["verified", "speed", "cloud_done"];
              return (
                <GlassPanel
                  key={metric.id}
                  tone="dark"
                  className="p-5 border border-white/10 hover:border-[#34d399]/40 transition-all duration-200 group relative"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-neutral-400 text-xs font-mono uppercase tracking-wider">
                      {metric.labelEn}
                    </span>
                    <Icon
                      name={iconNames[idx % iconNames.length]}
                      size={20}
                      className="text-[#34d399] opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-heading font-bold text-white tracking-tight">
                      {metric.value}
                    </span>
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded-full border ${
                        metric.trend.direction === "up"
                          ? "bg-emerald-950/80 text-emerald-400 border-emerald-500/30"
                          : "bg-red-950/80 text-red-400 border-red-500/30"
                      }`}
                    >
                      {metric.trend.percentage}
                    </span>
                  </div>
                </GlassPanel>
              );
            })}
          </div>

          {/* Activity Feed */}
          <GlassPanel tone="dark" className="p-6 sm:p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Icon name="history" size={20} className="text-[#34d399]" />
                <h2 className="font-heading font-bold text-lg text-white">Recent Activity Log</h2>
              </div>
              <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 text-xs font-mono rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                Live Feed
              </span>
            </div>

            <div className="space-y-3">
              {overview.activities.slice((currentPage - 1) * 5, currentPage * 5).map((activity) => {
                const statusIcons = {
                  success: "check_circle",
                  warning: "warning",
                  error: "error",
                };
                const statusColors = {
                  success: "text-[#34d399]",
                  warning: "text-amber-400",
                  error: "text-red-400",
                };
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors"
                  >
                    <Icon
                      name={statusIcons[activity.status]}
                      size={20}
                      className={`mt-0.5 shrink-0 ${statusColors[activity.status]}`}
                    />
                    <div className="flex-1">
                      <p className="text-neutral-200 font-medium font-mono text-xs sm:text-sm">
                        {activity.messageEn}
                      </p>
                      <p className="text-neutral-500 text-xs mt-0.5">{activity.messageTh}</p>
                    </div>
                    <span className="text-xs text-neutral-500 font-mono shrink-0">
                      {activity.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6">
              <IOS26Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(overview.activities.length / 5)}
                onPageChange={handlePageChange}
              />
            </div>
          </GlassPanel>
        </div>

        {/* Settings / Usage Column (Right - 1col) */}
        <div className="space-y-8">
          {/* Quota Gauge */}
          <GlassPanel tone="dark" className="p-6 border border-white/10 text-center">
            <div className="flex items-center gap-2 mb-6 text-left">
              <Icon name="donut_large" size={20} className="text-[#34d399]" />
              <h2 className="font-heading font-bold text-lg text-white">Token Quota</h2>
            </div>
            <div className="relative aspect-square max-w-[200px] mx-auto flex items-center justify-center">
              <div className="w-44 h-44 rounded-full border-[12px] border-white/10 border-t-[#34d399] border-r-[#34d399]/70 rotate-45 transition-transform hover:scale-105" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-heading font-black text-white">73%</span>
                <span className="text-xs font-mono text-neutral-400 mt-1">QUOTA CONSUMED</span>
              </div>
            </div>
          </GlassPanel>

          {/* Quick Settings */}
          <GlassPanel tone="dark" className="p-6 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="tune" size={20} className="text-[#34d399]" />
              <h2 className="font-heading font-bold text-lg text-white">Gateway Controls</h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div className="flex items-center gap-2">
                  <Icon name="notifications" size={18} className="text-neutral-400" />
                  <span className="text-xs font-mono text-neutral-300">Push Dispatcher</span>
                </div>
                <IOS26Toggle
                  checked={notificationsEnabled}
                  onChange={handleNotificationToggle}
                  label="Notifications"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/5 opacity-60">
                <div className="flex items-center gap-2">
                  <Icon name="auto_mode" size={18} className="text-neutral-400" />
                  <span className="text-xs font-mono text-neutral-300">Auto-Scaler</span>
                </div>
                <span className="text-xs font-mono text-neutral-500">Locked</span>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right fade-in duration-300">
          <IOS26Notification
            type="success"
            title="System Updated"
            message={`Notification channel ${notificationsEnabled ? "active" : "muted"}. Reference ID: #SYS-99`}
            onClose={() => setShowNotification(false)}
          />
        </div>
      )}
    </div>
  );
}
