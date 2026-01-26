import GlassCard from "@/components/common/ui/GlassCard";

interface WebhookEvent {
    id: string;
    provider: string;
    status: "success" | "failed" | "pending";
    timestamp: string;
}

const MOCK_EVENTS: WebhookEvent[] = [
    { id: "1", provider: "GitHub", status: "success", timestamp: "2 mins ago" },
    { id: "2", provider: "Notion", status: "failed", timestamp: "15 mins ago" },
    { id: "3", provider: "Vercel", status: "success", timestamp: "1 hour ago" },
];

export function WebhookMonitor() {
    return (
        <GlassCard className="p-6">
            <h3 className="text-xl font-bold mb-4">Webhook Monitor</h3>
            <div className="space-y-3">
                {MOCK_EVENTS.map((event) => (
                    <div key={event.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                        <div className="flex items-center space-x-3">
                            <span className="font-medium">{event.provider}</span>
                            <span className="text-xs text-gray-400">{event.timestamp}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${event.status === "success" ? "bg-green-500/20 text-green-400" :
                            event.status === "failed" ? "bg-red-500/20 text-red-400" :
                                "bg-yellow-500/20 text-yellow-400"
                            }`}>
                            {event.status.toUpperCase()}
                        </span>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}
