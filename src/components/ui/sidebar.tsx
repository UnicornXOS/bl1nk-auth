import type { JSX } from 'react';

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps): JSX.Element {
  return (
    <aside className="w-64 h-full bg-card border-r">
      {children}
    </aside>
  );
}