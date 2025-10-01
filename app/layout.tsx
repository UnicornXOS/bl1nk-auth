export const metadata = { title: 'bl1nk-auth', description: 'OAuth Gateway' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="th"><body style={{fontFamily:'ui-sans-serif,system-ui'}}>{children}</body></html>);
}
