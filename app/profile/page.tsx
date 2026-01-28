import { auth } from "@/lib/auth/middleware";
import GlassCard from "@/components/shared/GlassCard";
import IOS26Button from "@/components/shared/IOS26Button";

export default async function ProfilePage() {
    const session = await auth();

    if (!session) {
        return <div>Not authorized</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 space-y-8">
            <h1 className="text-3xl font-bold">Your Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <GlassCard className="md:col-span-1 p-6 text-center">
                    <div className="w-24 h-24 bg-blue-500/20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                        {session.user?.name?.[0] || "U"}
                    </div>
                    <h2 className="text-xl font-semibold">{session.user?.name || "User"}</h2>
                    <p className="text-sm text-gray-400">{session.provider || "Standard Auth"}</p>
                </GlassCard>

                <GlassCard className="md:col-span-2 p-6 space-y-4">
                    <h3 className="text-lg font-semibold">Account Information</h3>
                    <div className="space-y-2">
                        <p className="text-sm">User ID: <code className="bg-white/5 p-1 rounded font-mono">{session.user?.id}</code></p>
                        {/* More fields here */}
                    </div>
                    <IOS26Button className="mt-4">Edit Profile</IOS26Button>
                </GlassCard>
            </div>
        </div>
    );
}
