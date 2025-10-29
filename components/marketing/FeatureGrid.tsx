import type { JSX } from 'react';

export function FeatureGrid(): JSX.Element {
  return (
    <section className="container py-12 grid gap-6 md:grid-cols-3">
      <div className="p-6 rounded-lg border bg-card">Docs + MDX</div>
      <div className="p-6 rounded-lg border bg-card">GitHub OAuth</div>
      <div className="p-6 rounded-lg border bg-card">Quickstart</div>
    </section>
  );
}