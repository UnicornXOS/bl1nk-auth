import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AccessibilityProvider } from '@/components/ui/accessibility-provider';
import PageTransition from '@/components/ui/page-transition';
import type { ReactNode, JSX } from 'react';
import SiteNavbar from '@/components/layout/SiteNavbar';
import SiteFooter from '@/components/layout/SiteFooter';

export const metadata = {
  title: 'bl1nk-auth',
  description: 'OAuth gateway with marketing pages and floating docs assistant'
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground">
        <ThemeProvider defaultTheme="system" enableSystem>
          <AccessibilityProvider>
            {/* Skip link for accessibility */}
            <a href="#main-content" className="skip-link">
              ข้ามไปยังเนื้อหาหลัก
            </a>

            <SiteNavbar />
            <PageTransition>
              <main id="main-content" role="main">{children}</main>
            </PageTransition>
            <SiteFooter />
          </AccessibilityProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
