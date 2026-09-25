import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export interface BrandLogoProps extends ComponentPropsWithoutRef<"a"> {
  size?: number;
  showText?: boolean;
  textSuffix?: string;
}

/**
 * BrandLogo — Official bl1nk logo badge and typography mark.
 * Uses official logo icon with emerald #34d399 highlighted "1" numeral.
 */
export function BrandLogo({
  size = 32,
  showText = true,
  textSuffix = "",
  className = "",
  ...props
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group focus:outline-none ${className}`}
      {...props}
    >
      <div className="relative rounded-lg overflow-hidden shrink-0 shadow-glow-sm">
        <Image
          src="/assets/logo.png"
          alt="bl1nk logo"
          width={size}
          height={size}
          className="object-contain transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      {showText && (
        <span className="font-heading font-extrabold text-xl tracking-tight text-white select-none">
          bl<span className="text-[#34d399]">1</span>nk
          {textSuffix && (
            <span className="text-xs font-mono font-normal text-neutral-400 ml-1.5 px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700">
              {textSuffix}
            </span>
          )}
        </span>
      )}
    </Link>
  );
}
