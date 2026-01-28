import prisma from "@/lib/db/prisma";
import { auth } from "@/lib/auth/middleware";
import { AdminStats } from "@/components/features/dashboard/admin-stats";
import { WebhookMonitor } from "@/components/features/dashboard/webhook-monitor";
import { EventLog } from "@/components/features/dashboard/event-log";

export default async function AdminPage() {
    const session = await auth();

    // Basic security check (placeholder)
    if (!session) {
        return <div>Not authorized</div>;
    }

    return (
        <div className="space-y-8 p-8">
            <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-gray-400">Manage system-wide configuration and monitoring.</p>
            </div>

            <AdminStats />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <WebhookMonitor />
                <EventLog />
            </div>
        </div>
    );
}
