import type { JSX } from 'react';

export function Testimonials(): JSX.Element {
  return (
    <section className="container py-12">
      <h2 className="text-2xl font-semibold mb-6">Testimonials</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 rounded-lg border bg-card">
          <p className="text-muted-foreground">&ldquo;This toolkit saved us hours of development time.&rdquo;</p>
          <p className="mt-4 font-medium">- Developer A</p>
        </div>
        <div className="p-6 rounded-lg border bg-card">
          <p className="text-muted-foreground">&ldquo;Easy to integrate and highly reliable.&rdquo;</p>
          <p className="mt-4 font-medium">- Developer B</p>
        </div>
      </div>
    </section>
  );
}