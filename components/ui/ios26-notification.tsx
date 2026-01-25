import type { JSX } from 'react';

interface IOS26NotificationProps {
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    onClose: () => void;
}

export default function IOS26Notification({ type, title, message, onClose }: IOS26NotificationProps): JSX.Element {
    const colors = {
        success: 'bg-green-500/10 border-green-500/30 text-green-400',
        error: 'bg-red-500/10 border-red-500/30 text-red-400',
        warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
        info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    };

    return (
        <div className={`rounded-xl border p-4 shadow-lg backdrop-blur-xl ${colors[type]} min-w-[300px]`}>
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <h4 className="font-semibold mb-1">{title}</h4>
                    <p className="text-sm opacity-90">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="text-white/60 hover:text-white transition-colors"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
