import type { JSX } from 'react';

export function PricingPlans(): JSX.Element {
  return (
    <section className="container py-12">
      <h2 className="text-2xl font-semibold mb-6">Pricing Plans</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="text-lg font-medium">Free</h3>
          <p className="text-muted-foreground">$0/month</p>
          <ul className="mt-4 space-y-2">
            <li>Basic features</li>
            <li>Community support</li>
          </ul>
        </div>
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="text-lg font-medium">Pro</h3>
          <p className="text-muted-foreground">$29/month</p>
          <ul className="mt-4 space-y-2">
            <li>All features</li>
            <li>Priority support</li>
            <li>Advanced integrations</li>
          </ul>
        </div>
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="text-lg font-medium">Enterprise</h3>
          <p className="text-muted-foreground">Contact us</p>
          <ul className="mt-4 space-y-2">
            <li>Everything in Pro</li>
            <li>Dedicated support</li>
            <li>Custom solutions</li>
          </ul>
        </div>
      </div>
    </section>
  );
}