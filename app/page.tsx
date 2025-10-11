import Hero from '@/components/hero';
import type { CSSProperties, JSX } from 'react';

export default function Page(): JSX.Element {
  return (
    <>
      <Hero />
      <section
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          padding: '48px 24px'
        }}
      >
        <div style={cardStyle}>Serverless + Webhook</div>
        <div style={cardStyle}>Docs + MDX</div>
        <div style={cardStyle}>GitHub OAuth</div>
      </section>
    </>
  );
}

const cardStyle: CSSProperties = {
  padding: '24px',
  borderRadius: '16px',
  border: '1px solid rgba(226, 232, 240, 0.9)',
  background: '#FFFFFF',
  fontWeight: 600,
  color: '#0F172A',
  textAlign: 'center'
};
