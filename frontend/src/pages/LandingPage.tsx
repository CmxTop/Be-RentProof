import { SectionHeading } from '../components/SectionHeading';
import { ShellFrame } from '../components/ShellFrame';
import { StatCard } from '../components/StatCard';
import { TimelineStep } from '../components/TimelineStep';
import {
  architecturePillars,
  featureCards,
  milestones,
  personas,
  stats,
} from '../data/siteContent';

export function LandingPage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Drips Wave / Stellar MVP</p>
          <h1>Rent history tenants actually own.</h1>
          <p className="hero-text">
            RentProof turns monthly rent payments into verifiable on-chain receipts so tenants can
            carry trust from one apartment to the next.
          </p>
          <div className="hero-actions">
            <a href="#architecture" className="button button-primary">
              View architecture
            </a>
            <a href="#features" className="button button-secondary">
              Explore the MVP
            </a>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-panel-header">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
          <div className="receipt-card">
            <p className="receipt-label">Rent History Profile</p>
            <h2>Ade Bello</h2>
            <div className="receipt-row">
              <span>14B Ajao Estate</span>
              <strong>12/12 paid</strong>
            </div>
            <div className="receipt-row">
              <span>3 Lekki Phase 1 Close</span>
              <strong>15/15 paid</strong>
            </div>
            <div className="receipt-footer">
              <span>Verified on Stellar</span>
              <span>Updated April 2026</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </section>

      <section id="features" className="content-section">
        <SectionHeading
          eyebrow="Problem"
          title="The product is simple because the problem is sharp."
          description="Tenants in Nigeria often have no portable rental reputation, while landlords have no reliable way to verify payment consistency."
        />
        <div className="feature-grid">
          {featureCards.map((feature) => (
            <article key={feature.title} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section split-layout">
        <div>
          <SectionHeading
            eyebrow="Flow"
            title="How the MVP works"
            description="The goal is to move from property registration to a shareable rent profile with as little operational overhead as possible."
          />
          <ol className="timeline">
            {milestones.map((step, index) => (
              <TimelineStep key={step} index={index} text={step} />
            ))}
          </ol>
        </div>
        <ShellFrame
          title="Core pages already scaffolded"
          subtitle="Frontend structure"
          items={[
            'Landing page for deployment and product storytelling',
            'Tenant dashboard placeholder',
            'Landlord dashboard placeholder',
            'Property setup placeholder',
            'Public rent history profile placeholder',
          ]}
        />
      </section>

      <section id="architecture" className="content-section">
        <SectionHeading
          eyebrow="Architecture"
          title="Set up for a fast MVP, not a bloated platform."
          description="The repo separates frontend storytelling and UI from backend integration points so contributors can move in parallel."
        />
        <div className="pillar-grid">
          {architecturePillars.map((pillar) => (
            <article key={pillar.title} className="pillar-card">
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section audience-section">
        <SectionHeading
          eyebrow="Users"
          title="Built for renters who start every negotiation from zero trust."
          description="RentProof gives credible payment proof to the people who usually have the least leverage in the rental process."
        />
        <div className="audience-list">
          {personas.map((persona) => (
            <article key={persona} className="audience-card">
              <p>{persona}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <p>Project setup complete for the Wave sprint.</p>
        <h2>Frontend is ready to deploy while the app flows are built out.</h2>
        <a href="https://stellar.org" className="button button-primary">
          Powered by Stellar
        </a>
      </section>
    </main>
  );
}
