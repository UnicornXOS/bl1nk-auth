import type { JSX } from 'react';

export default function LoadingDashboard(): JSX.Element {
  return (
    <section className="container py-12">
      <div className="rounded-3xl border p-8" style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(15,23,42,0.35)' }}>
        <div className="h-6 w-48 rounded-full bg-white/10" />
        <div className="mt-4 h-10 w-64 rounded-full bg-white/10" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-32 rounded-2xl bg-white/5" />
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <div className="h-64 rounded-2xl bg-white/5" />
          <div className="h-64 rounded-2xl bg-white/5" />
        </div>
      </div>
    </section>
  );
}
