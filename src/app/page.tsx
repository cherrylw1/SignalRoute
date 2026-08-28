import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { PricingCards } from "@/components/pricing-cards";
import { LaunchFilmLink, LaunchFilmSection } from "@/components/launch-film";
import { HomeSignalNarrative } from "@/components/home-signal-narrative";
import { SignalChronometer } from "@/components/signal-chronometer";

export default function Home() {
  return (
    <PageShell overlay>
      <SignalChronometer />
      <section className="story-hero" id="hero" aria-labelledby="hero-title">
        <div className="story-hero-glow" aria-hidden="true" />
        <div className="story-rail" aria-hidden="true"><span /><span /><span /><span /></div>
        <div className="story-hero-inner">
          <div className="story-hero-copy">
            <p className="story-eyebrow"><i aria-hidden="true" /> DETERMINISTIC PERSONALIZATION FOR OUTBOUND</p>
            <h1 id="hero-title">Your CRM knows who they are.<span>Your website should too.</span></h1>
            <p className="story-hero-lede">Every prospect who clicks your outbound link lands on a page that already knows them: name, company, campaign and rep.</p>
            <div className="story-hero-actions">
              <a className="story-button story-button-primary" href="https://cal.com/sharath.mb/demo" target="_blank" rel="noreferrer">Book a demo <span aria-hidden="true">↗</span></a>
              <LaunchFilmLink />
            </div>
            <p className="story-hero-note">No IP guessing. No invented identity. Just the signal your team already earned.</p>
            <p className="story-hero-latency"><span>▸ SIGNAL ROUTE READY</span><strong>scroll = time · 000.0 ms → 400.0 ms</strong></p>
          </div>

          <div className="story-hero-visual" aria-label="Churnaut account intelligence view showing a live buyer signal">
            <div className="story-hero-visual-top"><span><i /> LIVE SIGNAL ROUTE</span><strong>01 / 03</strong></div>
            <Image src="/media/journey-visit.png" alt="Churnaut account intelligence view showing a live buyer signal" fill priority sizes="(max-width: 900px) 100vw, 57vw" />
            <div className="story-hero-callout"><span>KNOWN VISIT</span><strong>Northstar Labs</strong><em>Returning account · high intent</em></div>
            <div className="story-hero-route" aria-hidden="true"><i /><i /><i /></div>
          </div>
        </div>
        <a className="story-scroll-cue" href="#signal"><span>SCROLL INTO THE SIGNAL</span><i aria-hidden="true">↓</i></a>
      </section>

      <section className="story-thesis" aria-labelledby="thesis-title">
        <div>
          <h2 id="thesis-title">A website visit should not erase the conversation.</h2>
          <p>Churnaut carries the context from your outreach into the visit, then turns that intent into a clear next action.</p>
        </div>
        <div className="story-thesis-list">
          <p><strong>Recognize</strong><span>Know who arrived from the link they chose to click.</span></p>
          <p><strong>Personalize</strong><span>Shape the page around context your team already earned.</span></p>
          <p><strong>Act</strong><span>See meaningful intent and respond while the moment is fresh.</span></p>
        </div>
      </section>

      <HomeSignalNarrative />

      <section className="story-scout" id="scout" aria-labelledby="scout-title">
        <div className="story-scout-copy">
          <p className="story-eyebrow story-eyebrow-dark">SCOUT AI / EVIDENCE, NOT GUESSWORK</p>
          <h2 id="scout-title">The signal becomes a reason to act.</h2>
          <p>Scout reads the story beneath CRM activity and website signals, then grounds the next move in evidence.</p>
          <Link className="story-button story-button-light" href="/scout">Meet Scout AI <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="story-scout-panel" aria-label="Scout AI evidence brief for the Northstar deal">
          <div className="story-scout-panel-head"><span>SCOUT / NORTHSTAR</span><strong>REFRESHED JUST NOW</strong></div>
          <div className="story-scout-read"><span className="story-scout-score">82</span><div><small>SCOUT&apos;S READ</small><strong>Northstar is warming up.</strong><p>Maya returned to pricing after the case-study email.</p></div></div>
          <div className="story-scout-evidence"><p><i /> Website intent <strong>High</strong></p><p><i /> Reply velocity <strong>Strong</strong></p><p><i /> Stakeholder depth <strong>Growing</strong></p></div>
          <div className="story-scout-next"><small>NEXT MOVE / GROUNDED IN THE EVIDENCE</small><p>Follow up on the rollout details while the moment is fresh.</p></div>
        </div>
      </section>

      <section className="story-privacy" id="privacy" aria-labelledby="privacy-title">
        <div><p className="story-eyebrow">THE IDENTITY BOUNDARY</p><h2 id="privacy-title">Signal, not surveillance.</h2></div>
        <div><p>Churnaut begins with a link your prospect chose to click. Identity comes from that direct relationship, not hidden IP matching.</p><Link className="story-text-link" href="/privacy">Read our privacy approach <span aria-hidden="true">↗</span></Link></div>
      </section>

      <LaunchFilmSection />

      <section className="story-proof" id="proof" aria-labelledby="proof-title">
        <div className="story-proof-heading"><p className="story-eyebrow">THE COMPLETE SYSTEM</p><h2 id="proof-title">Measured in moments, built for the whole journey.</h2><p>Start with the signal, personalize the visit and give sales the context to move.</p></div>
        <div className="story-proof-grid"><Link href="/product"><span>01</span><strong>Product</strong><p>Tracked links, known visits and approved page rules in one system.</p><i aria-hidden="true">↗</i></Link><Link href="/scout"><span>02</span><strong>Scout AI</strong><p>Evidence-grounded briefs for the deals that are changing now.</p><i aria-hidden="true">↗</i></Link><Link href="/blog"><span>03</span><strong>Field notes</strong><p>Practical ideas for building more attentive B2B experiences.</p><i aria-hidden="true">↗</i></Link></div>
      </section>

      <section className="story-pricing" id="pricing" aria-labelledby="pricing-title">
        <div className="story-pricing-heading"><div><p className="story-eyebrow">PRICING</p><h2 id="pricing-title">Choose how far the signal should travel.</h2></div><div><p>Monthly and annual plans for teams ready to recognize known prospects, personalize visits and understand what happens next.</p><Link className="story-text-link" href="/pricing">Compare every detail <span aria-hidden="true">↗</span></Link></div></div>
        <PricingCards />
        <p className="story-pricing-note">Billing is currently offered through founder-led onboarding. Annual billing saves two months, and usage limits reset monthly.</p>
      </section>

      <section className="story-finale" aria-labelledby="finale-title">
        <p className="story-eyebrow">THE NEXT MOVE</p>
        <h2 id="finale-title">Don&apos;t let the signal go quiet.</h2>
        <p>Meet the people already leaning in, and make your next move while it still matters.</p>
        <a className="story-button story-button-primary" href="https://cal.com/sharath.mb/demo" target="_blank" rel="noreferrer">Book a demo <span aria-hidden="true">↗</span></a>
      </section>
    </PageShell>
  );
}
