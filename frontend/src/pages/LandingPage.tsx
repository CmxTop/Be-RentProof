import { SectionHeading } from '../components/SectionHeading';
import { StatCard } from '../components/StatCard';
import { TimelineStep } from '../components/TimelineStep';
import { featureCards, milestones, personas, stats } from '../data/siteContent';

export function LandingPage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <h1>Your rent history, on-chain.</h1>
          <p className="hero-text">
            Pay rent on Stellar, own your payment record, carry it anywhere. RentProof turns every
            rent payment into permanent, verifiable proof that tenants control and future landlords
            can trust.
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
            <h2>J. Rivera</h2>
            <div className="receipt-row">
              <span>Unit 14B, Riverside Apartments</span>
              <strong>12/12 paid</strong>
            </div>
            <div className="receipt-row">
              <span>Unit 3, Harbor View Close</span>
              <strong>16/16 paid</strong>
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
          eyebrow="The Solution"
          title="A permanent, on-chain record that tenants own."
          description="RentProof creates verifiable payment history that belongs to the tenant — not the landlord, not the app. Every payment is recorded on Stellar, impossible to alter, and portable across any future rental."
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
          eyebrow="Target Users"
          title="Built for tenants who start every negotiation from zero trust."
          description="RentProof gives credible payment proof to the people who usually have the least leverage in the rental process — turning invisible reliability into verifiable reputation."
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
