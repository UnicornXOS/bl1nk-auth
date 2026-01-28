import GlassCard from "@/components/shared/GlassCard";

interface StatItemProps {
    label: string;
    value: string | number;
    trend?: string;
}

function StatItem({ label, value, trend }: StatItemProps) {
    return (
        <div className="p-4 border-r border-white/10 last:border-0">
            <p className="text-sm text-gray-400">{label}</p>
            <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold">{value}</h3>
                {trend && <span className="text-xs text-green-400">{trend}</span>}
            </div>
        </div>
    );
}

export function AdminStats() {
    return (
        <GlassCard className="grid grid-cols-1 md:grid-cols-3 divide-x divide-white/10">
            <StatItem label="Total Users" value="1,284" trend="+12%" />
            <StatItem label="Webhooks Processed" value="45.2k" trend="+5.4%" />
            <StatItem label="Active Sessions" value="152" trend="-2%" />
        </GlassCard>
    );
}
