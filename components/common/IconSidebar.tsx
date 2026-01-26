"use client";

import Link from "next/link";
import type { JSX, ReactNode } from "react";

interface ItemProps {
  href: string;
  label: string;
  glyph: ReactNode;
}

function Item({ href, label, glyph }: ItemProps): JSX.Element {
  return (
    <Link
      href={href}
      className="group relative flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10"
    >
      <span className="text-white/70 group-hover:text-white" aria-hidden="true">
        {glyph}
      </span>
      <span className="pointer-events-none absolute left-12 whitespace-nowrap rounded bg-black/60 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100">
        {label}
      </span>
    </Link>
  );
}

export default function IconSidebar(): JSX.Element {
  return (
    <aside className="glass fixed left-0 top-0 hidden h-screen w-12 flex-col items-center gap-2 border-r border-white/10 pt-2 md:flex">
      <Item href="/board" glyph="📂" label="Board" />
      <Item href="/share" glyph="🔗" label="Share" />
      <Item href="/chat" glyph="💬" label="Chat" />
      <div className="mt-auto mb-3">
        <Item href="/settings" glyph="⚙️" label="Settings" />
      </div>
    </aside>
  );
}
