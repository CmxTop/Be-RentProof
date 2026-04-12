import { SectionHeading } from '../components/SectionHeading';
import { StatCard } from '../components/StatCard';
import { TimelineStep } from '../components/TimelineStep';
import { featureCards, milestones, personas, stats } from '../data/siteContent';

export function LandingPage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <h1>Rent history tenants actually own.</h1>
          <p className="hero-text">
            RentProof turns monthly rent payments into verifiable on-chain receipts so tenants can
            carry trust from one apartment to the next.
          </p>
          <div className="hero-actions">
            <a href="#features" className="button button-secondary">
              Explore RentProof
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
          eyebrow="What it does"
          title="A portable rent record for every reliable tenant."
          description="RentProof gives landlords a clean payment trail and gives tenants a verified record they can reuse anywhere."
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
            title="How it works"
            description="The experience is designed to move from property registration to a shareable rent profile with as little friction as possible."
          />
          <ol className="timeline">
            {milestones.map((step, index) => (
              <TimelineStep key={step} index={index} text={step} />
            ))}
          </ol>
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
    </main>
  );
}
