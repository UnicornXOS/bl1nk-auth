import { auth } from "@/lib/auth/middleware";
import GlassCard from "@/components/common/ui/GlassCard";
import IOS26Button from "@/components/common/ui/IOS26Button";

export default async function TeamMembersPage() {
    const session = await auth();

    if (!session) {
        return <div>Not authorized</div>;
    }

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Team Members</h1>
                    <p className="text-gray-400">Manage your organization's team and their roles.</p>
                </div>
                <IOS26Button>Invite Member</IOS26Button>
            </div>

            <GlassCard className="overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-xs uppercase tracking-wider text-gray-400">
                        <tr>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs font-bold">B</div>
                                <div>
                                    <p className="font-medium">Bill Gates</p>
                                    <p className="text-xs text-gray-400">bill@microsoft.com</p>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">ADMIN</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-xs text-green-400">Active</span>
                            </td>
                            <td className="px-6 py-4">
                                <button className="text-xs text-gray-400 hover:text-white">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </GlassCard>
        </div>
    );
}
