"use client";

import { useState } from "react";
import IOS26Button from "@/components/common/ui/IOS26Button";
import GlassCard from "@/components/common/ui/GlassCard";
import { OAuthButtons } from "./oauth-buttons";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Logic for login
    };

    return (
        <GlassCard className="max-w-md w-full p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

            <OAuthButtons />

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0a0a0a] px-2 text-gray-400">Or continue with</span></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <IOS26Button type="submit" className="w-full">
                    Sign In
                </IOS26Button>
            </form>
        </GlassCard>
    );
}
