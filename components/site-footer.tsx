import type { JSX } from 'react';

export function SiteFooter(): JSX.Element {
  return (
    <footer className="border-t mt-12">
      <div className="container py-8 text-sm text-muted-foreground">© YourBrand</div>
    </footer>
  );
}
