import Link from 'next/link';
import type { JSX } from 'react';

const highlightCards = [
  {
    title: 'AI Builder',
    caption: 'Model orchestration without friction.',
    variant: 'primary' as const
  },
  {
    title: 'Realtime Agents',
    caption: 'Route signals to assistants that stay online.',
    variant: 'pulse' as const
  },
  {
    title: 'Signal Studio',
    caption: 'Illuminate every webhook and user journey.',
    variant: 'outline' as const
  }
];

const benefitColumns = [
  {
    title: 'Pro automation',
    copy: 'Trigger OAuth flows, queue webhooks, and fan out actions with one consistent pipeline.'
  },
  {
    title: 'Evolving delivery',
    copy: 'Track latency, inspect payloads, and push improvements with real-time metrics overlays.'
  },
  {
    title: 'Secure-by-default',
    copy: 'Rotate RSA keys, verify signatures, and stay compliant with hardened defaults.'
  }
];

export function Hero(): JSX.Element {
  return (
    <section className="hero-surface">
      <div className="hero-backdrop hero-backdrop--left" />
      <div className="hero-backdrop hero-backdrop--right" />

      <div className="container hero-content">
        <header className="hero-lead">
          <span className="hero-pill">Blink Automation Suite</span>
          <h1 className="hero-title">Moments turn into intelligent journeys.</h1>
          <p className="hero-subtitle">
            Compose OAuth, webhooks, and live agents in a single canvas. Launch automations that feel
            futuristic today—without trading away control or insight.
          </p>
        </header>

        <div className="hero-cards">
          {highlightCards.map((card) => (
            <article
              key={card.title}
              className={`neon-card neon-card--${card.variant}`}
            >
              <span className="neon-card__chip">AI</span>
              <h3 className="neon-card__title">{card.title}</h3>
              <p className="neon-card__caption">{card.caption}</p>
            </article>
          ))}
        </div>

        <div className="hero-actions">
          <Link href="/docs/getting-started" className="btn-gradient btn-gradient--violet">
            Start building now
          </Link>
          <Link href="/dashboard" className="btn-gradient btn-gradient--cyan">
            Explore the console
          </Link>
          <Link href="/login" className="btn-gradient btn-gradient--magenta">
            Launch demo agents
          </Link>
        </div>

        <section className="hero-benefits">
          {benefitColumns.map((benefit) => (
            <div key={benefit.title} className="hero-benefits__column">
              <h4 className="hero-benefits__title">{benefit.title}</h4>
              <p className="hero-benefits__copy">{benefit.copy}</p>
            </div>
          ))}
        </section>

        <footer className="hero-footer">
          <span>Handoff to fleets, notebooks, or existing stacks in minutes.</span>
          <span className="hero-footer__cta">Contact 64657 · blinksts.lu · Montserrat family</span>
        </footer>
      </div>
    </section>
  );
}
