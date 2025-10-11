import type { ReactNode, JSX } from 'react';

export const metadata = { title: 'bl1nk-auth', description: 'OAuth Gateway' };

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="th">
      <body
        style={{
          margin: 0,
          fontFamily: "'Inter', 'Sarabun', ui-sans-serif, system-ui",
          background: '#F1F5F9',
          color: '#0F172A',
          minHeight: '100dvh'
        }}
      >
        {children}
      </body>
    </html>
  );
}
