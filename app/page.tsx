import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { GlassPanel } from "@/components/ui/glass-panel";
import { GlowButton } from "@/components/ui/glow-button";
import { Icon } from "@/components/ui/icon";

export default function Home() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#34d399]/20 via-teal-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-lg w-full space-y-8">
        <GlassPanel tone="dark" className="p-8 sm:p-10 border border-white/10 space-y-6">
          <div className="flex flex-col items-center gap-3">
            <BrandLogo size={48} textSuffix="v1.1" />
          </div>

          <div className="space-y-3 pt-2">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-heading">
              Centralized Auth Gateway
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Unified OAuth2 & OIDC single sign-on provider built with dark-first liquid glass
              design system.
            </p>
          </div>

          <div className="grid gap-3 pt-2">
            <Link href="/auth">
              <GlowButton variant="solid" size="lg" className="w-full">
                <Icon name="lock" size={18} />
                <span>Get started / Sign in</span>
              </GlowButton>
            </Link>
            <Link href="/docs">
              <GlowButton variant="glass" size="lg" className="w-full">
                <Icon name="menu_book" size={18} />
                <span>Developer documentation</span>
              </GlowButton>
            </Link>
          </div>
        </GlassPanel>

        <div className="flex items-center justify-center gap-6 text-xs text-neutral-500 font-mono tracking-wide">
          <div className="flex items-center gap-1.5">
            <Icon name="verified_user" size={14} className="text-[#34d399]" />
            <span>OAuth 2.0 / OIDC</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="security" size={14} className="text-[#34d399]" />
            <span>Zero Trust Architecture</span>
          </div>
        </div>
      </div>
    </div>
  );
}
