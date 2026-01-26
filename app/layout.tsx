import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/common/ui/ThemeProvider";
import { AccessibilityProvider } from "@/components/common/ui/AccessibilityProvider";
import PageTransition from "@/components/common/ui/PageTransition";
import type { ReactNode, JSX } from "react";

export const metadata = {
  title: "bl1nk-auth",
  description: "OAuth gateway with marketing pages and floating docs assistant",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground">
        <ThemeProvider defaultTheme="system" enableSystem>
          <AccessibilityProvider>
            {/* Skip link for accessibility */}
            <a href="#main-content" className="skip-link">
              ข้ามไปยังเนื้อหาหลัก
            </a>

            <PageTransition>
              <main id="main-content" role="main" className="flex-grow">
                {children}
              </main>
            </PageTransition>
          </AccessibilityProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
