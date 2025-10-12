import './globals.css';
import { ThemeProvider } from 'next-themes';
import type { ReactNode, JSX } from 'react';
import { SiteNavbar } from '@/components/site-navbar';
import { SiteFooter } from '@/components/site-footer';

export const metadata = {
  title: 'bl1nk-auth',
  description: 'OAuth gateway with marketing pages and floating docs assistant'
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteNavbar />
          <main>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
