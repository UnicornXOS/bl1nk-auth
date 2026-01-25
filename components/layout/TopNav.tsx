import type { JSX } from 'react';

export default function TopNav(): JSX.Element {
    return (
        <header className="h-20 flex items-center justify-between px-8 py-4 bg-transparent">
            {/* Search Bar */}
            <div className="relative w-96 group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">🔍</span>
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-xl leading-5 bg-black/20 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-black/40 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 sm:text-sm transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
                    placeholder="Search components..."
                />
                <div className="absolute inset-0 rounded-xl pointer-events-none border border-white/5 group-hover:border-white/20 transition-colors" />
            </div>

            {/* Status / Actions */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-full border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                    <span className="text-xs font-mono text-green-400">SYSTEM ONLINE</span>
                </div>

                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    🔔
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    ⚙️
                </button>
            </div>
        </header>
    );
}
