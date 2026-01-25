import type { JSX } from 'react';
import Link from 'next/link';

export default function Sidebar(): JSX.Element {
    const menuItems = [
        { label: 'Home', href: '/dashboard', icon: '🏠' },
        { label: 'Main Terminal', href: '/dashboard/terminal', icon: '💻' },
        { label: 'Dashboard', href: '/dashboard', icon: '📊' },
        { label: 'Marketplace', href: '/dashboard/marketplace', icon: '🛍️' },
    ];

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col z-50">
            {/* Brand */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold font-display">
                    A
                </div>
                <span className="text-xl font-display tracking-widest text-white">AETHER</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.href + item.label}
                        href={item.href}
                        className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
                    >
                        <span className="opacity-70 group-hover:opacity-100 group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                            {item.icon}
                        </span>
                        <span className="font-mono text-sm group-hover:text-cyan-300 transition-colors">
                            {item.label}
                        </span>
                        {/* Active Indicator (Mock) */}
                        {item.label === 'Dashboard' && (
                            <div className="ml-auto w-1 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_#00ffff]" />
                        )}
                    </Link>
                ))}
            </nav>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 overflow-hidden relative">
                        {/* Avatar Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                            USR
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">Commander</p>
                        <p className="text-xs text-gray-500 truncate">Online</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                </div>
            </div>
        </aside>
    );
}
