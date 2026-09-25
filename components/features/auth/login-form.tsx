"use client";

import { useState } from "react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { GlassPanel } from "@/components/ui/glass-panel";
import { GlowButton } from "@/components/ui/glow-button";
import { Icon } from "@/components/ui/icon";
import { NeumorphicInput } from "@/components/ui/neumorphic-input";
import { OAuthButtons } from "./oauth-buttons";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for login
  };

  return (
    <GlassPanel tone="dark" className="max-w-md w-full p-8 shadow-2xl">
      <div className="flex flex-col items-center mb-6">
        <BrandLogo size={40} />
        <p className="text-xs text-neutral-400 mt-2">Sign in to your bl1nk identity account</p>
      </div>

      <OAuthButtons />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider">
          <span className="bg-[#0a0a0a] px-3 text-neutral-400">Or continue with</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="login-email"
            className="flex items-center gap-1.5 text-xs font-medium text-neutral-300 mb-1.5"
          >
            <Icon name="mail" size={14} className="text-[#34d399]" />
            <span>Email address</span>
          </label>
          <NeumorphicInput
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@bl1nk.site"
            required
          />
        </div>
        <div>
          <label
            htmlFor="login-password"
            className="flex items-center gap-1.5 text-xs font-medium text-neutral-300 mb-1.5"
          >
            <Icon name="key" size={14} className="text-[#34d399]" />
            <span>Password</span>
          </label>
          <NeumorphicInput
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <div className="pt-2">
          <GlowButton type="submit" variant="solid" size="lg" className="w-full">
            <Icon name="login" size={18} />
            <span>Sign in</span>
          </GlowButton>
        </div>
      </form>
    </GlassPanel>
  );
}
