import Link from "next/link";
import Image from "next/image";
import { PageShell } from "@/components/page-shell";
import { PricingCards } from "@/components/pricing-cards";
import { LaunchFilmLink, LaunchFilmSection } from "@/components/launch-film";
import { SignalJourney } from "@/components/signal-journey";

export default async function Home() {
  return (
    <PageShell overlay>
      <section className="home-hero">
        <div className="home-hero-noise" aria-hidden="true" />
        <div className="home-hero-grid">
          <div className="home-hero-copy">
            <p className="home-hero-kicker"><i aria-hidden="true" /> Buyer context, carried forward</p>
            <h1>Turn the click into the next <em>right</em> move.</h1>
            <p>Churnaut connects outbound links to known visits, personalized pages, and evidence-backed sales actions.</p>
            <div className="home-hero-proof" aria-label="What Churnaut does">
              <span>Recognize the buyer</span><span>Shape the visit</span><span>Act with context</span>
            </div>
            <div className="home-hero-actions">
              <a className="button button-ink" href="https://cal.com/sharath.mb/demo" target="_blank" rel="noreferrer">See Churnaut in action</a>
              <LaunchFilmLink />
            </div>
          </div>
          <div className="home-hero-product" aria-label="Churnaut account intelligence view showing a live buyer signal">
            <div className="home-hero-product-bar" aria-hidden="true"><span><i /> LIVE ACCOUNT INTELLIGENCE</span><strong>01 / 03</strong></div>
            <Image src="/media/journey-visit.png" alt="Churnaut account intelligence view showing a live buyer signal" fill priority sizes="(max-width: 900px) 100vw, 55vw" />
            <div className="home-hero-product-note" aria-hidden="true"><span>KNOWN VISIT</span><strong>Northstar Labs</strong><em>Returning account · high intent</em></div>
            <div className="home-hero-product-route" aria-hidden="true"><i /><i /><i /></div>
          </div>
        </div>
        <div className="home-hero-note"><span>Context travels with the click</span><i aria-hidden="true" /></div>
      </section>

      <section className="home-thesis" aria-labelledby="home-thesis-title">
        <div>
          <h2 id="home-thesis-title">A website visit should not erase the conversation.</h2>
          <p>Churnaut is a B2B SaaS platform for carrying the context from your outreach into the visit, then turning that intent into a clear next action.</p>
        </div>
        <div className="home-thesis-points">
          <p><strong>Recognize</strong><span>Know who arrived from the link they chose to click.</span></p>
          <p><strong>Personalize</strong><span>Shape the page around context your team already earned.</span></p>
          <p><strong>Act</strong><span>See meaningful intent and respond while the moment is fresh.</span></p>
        </div>
      </section>

      <SignalJourney />

      <section className="home-scout" aria-labelledby="home-scout-title">
        <div className="home-scout-product"><Image src="/media/journey-action.png" alt="Churnaut next best action view connecting intent signals to a teammate" fill sizes="(max-width: 900px) 100vw, 58vw" /></div>
        <div className="home-scout-copy">
          <p className="section-index">SCOUT AI / EVIDENCE, NOT GUESSWORK</p>
          <h2 id="home-scout-title">Your pipeline changes quietly. Scout explains why.</h2>
          <p>Scout reads the story beneath CRM activity and website signals, then grounds the next move in evidence.</p>
          <Link className="button button-ink" href="/scout">Meet Scout AI</Link>
        </div>
        <div className="home-scout-reads">
          <article><span>Momentum</span><h3>See which deals are gathering energy.</h3><p>Bring website behavior and CRM activity into one readable story.</p></article>
          <article><span>Risk</span><h3>Notice drift before it becomes silence.</h3><p>Understand what changed instead of relying on a stale deal stage.</p></article>
          <article><span>Next move</span><h3>Act with evidence, not guesswork.</h3><p>Give the rep a reason and a direction for the follow-up.</p></article>
        </div>
      </section>

      <section className="home-privacy" aria-labelledby="home-privacy-title">
        <h2 id="home-privacy-title">Signal, not surveillance.</h2>
        <div>
          <p>Churnaut begins with a link your prospect chose to click. Identity comes from that direct relationship, not hidden IP matching.</p>
          <Link className="text-arrow-link" href="/privacy">Read our privacy approach <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="pricing-home section-pad" id="pricing" aria-labelledby="pricing-home-title">
        <div className="pricing-home-heading">
          <h2 id="pricing-home-title">Choose how far you want the signal to travel.</h2>
          <div>
            <p>Monthly and annual plans for teams ready to recognize known prospects, personalize visits, and understand what happens next.</p>
            <Link className="text-arrow-link" href="/pricing">Compare every detail <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <PricingCards />
        <p className="pricing-home-note">Billing is currently offered through founder-led onboarding. Annual billing saves two months, and usage limits reset monthly.</p>
      </section>

      <LaunchFilmSection />

      <section className="home-explore section-pad" aria-labelledby="home-explore-title">
        <h2 id="home-explore-title">Go deeper.</h2>
        <div className="home-explore-links"><Link href="/product" className="home-explore-link"><span>Product</span><strong>See the complete signal system.</strong><i aria-hidden="true">↗</i></Link><Link href="/blog" className="home-explore-link"><span>Field notes</span><strong>Read practical ideas for attentive teams.</strong><i aria-hidden="true">↗</i></Link></div>
      </section>
    </PageShell>
  );
}
