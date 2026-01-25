import type { ReactNode, JSX } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopNav from '@/components/layout/TopNav';

export default function DashboardLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <div className="min-h-screen bg-carbon-fiber text-white flex">
            {/* Fixed Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 ml-64 flex flex-col relative w-full">
                <TopNav />

                <main className="flex-1 p-8 pt-2 overflow-auto">
                    {children}
                </main>

                {/* Decorative Background Elements */}
                <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none -z-10" />
                <div className="fixed bottom-0 right-0 w-[300px] h-[300px] bg-cyan-900/10 rounded-full blur-[80px] pointer-events-none -z-10" />
            </div>
        </div>
    );
}
