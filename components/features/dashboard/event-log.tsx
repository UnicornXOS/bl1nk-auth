import GlassCard from "@/components/shared/GlassCard";

interface EventLogItem {
    id: string;
    action: string;
    user: string;
    timestamp: string;
}

const MOCK_EVENTS: EventLogItem[] = [
    { id: "1", action: "User Logged In", user: "alice@example.com", timestamp: "1 min ago" },
    { id: "2", action: "Team Invite Sent", user: "admin@bl1nk.com", timestamp: "10 mins ago" },
    { id: "3", action: "Settings Updated", user: "bob@tech.org", timestamp: "1 hour ago" },
];

export function EventLog() {
    return (
        <GlassCard className="p-6">
            <h3 className="text-xl font-bold mb-4">Event Log</h3>
            <div className="space-y-4">
                {MOCK_EVENTS.map((event) => (
                    <div key={event.id} className="flex flex-col space-y-1">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium text-blue-400">{event.action}</span>
                            <span className="text-xs text-gray-400">{event.timestamp}</span>
                        </div>
                        <span className="text-xs text-gray-500">{event.user}</span>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}
