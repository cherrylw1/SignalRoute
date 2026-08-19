import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { HeroSignalScene } from "@/components/hero-signal-scene";
import { PrivacyBoundary, ScoutEvidenceScene, SignalMechanism } from "@/components/home-signal-system";
import { LaunchFilmLink, LaunchFilmSection } from "@/components/launch-film";

export default async function Home() {
  return (
    <PageShell overlay>
      <section className="hero">
        <div className="hero-sky" aria-hidden="true"><i /><i /><i /></div>
        <div className="hero-contours" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>Your outreach found the person.<br /><strong>Churnaut catches the moment.</strong></h1>
            <p className="lede">Carry the context your rep earned into the website visit. Personalize the page, see who leaned in and act with evidence while intent is still fresh.</p>
            <div className="hero-actions"><a className="button button-ink" href="https://cal.com/sharath.mb/demo" target="_blank" rel="noreferrer">See Churnaut in action</a><LaunchFilmLink /></div>
          </div>
          <div className="hero-visual"><HeroSignalScene /></div>
        </div>
      </section>

      <section className="signal-system section-pad">
        <div className="signal-system-intro"><p className="section-index">How it works</p><div><h2>One link carries the context <strong>all the way through.</strong></h2><p>When someone clicks a tracked link you sent, they are no longer anonymous traffic. Churnaut connects the person, the page and the CRM context your rep already earned.</p></div></div>
        <SignalMechanism />
      </section>

      <section className="scout-system section-pad"><div className="scout-system-copy"><p className="section-index">Scout AI</p><h2>Your pipeline has a pulse. <strong>Scout explains the change.</strong></h2><p>Scout reads the story beneath CRM activity and website signals: deals gathering momentum, deals drifting and the evidence behind the next move.</p><Link className="button button-signal" href="/scout">Meet Scout AI</Link></div><ScoutEvidenceScene /></section>

      <section className="privacy-system section-pad home-privacy"><div className="privacy-system-copy"><h2>Signal, <strong>not surveillance.</strong></h2><p>Churnaut starts with a link your prospect chose to click. It does not depend on probabilistic company identification or hidden IP matching.</p><Link className="button button-ink" href="/privacy">Read our approach</Link></div><PrivacyBoundary /></section>

      <LaunchFilmSection />

      <section className="home-explore section-pad" aria-labelledby="home-explore-title">
        <div className="home-explore-heading">
          <div><h2 id="home-explore-title">Keep exploring <strong>the signal system.</strong></h2><p>Clear monthly plans for founder-led teams first, with room to grow into a complete signal system.</p></div>
          <div className="home-explore-links"><Link href="/pricing" className="home-explore-link"><span>Pricing</span><strong>Start with the signal. Grow into the system.</strong><i aria-hidden="true">↗</i></Link><Link href="/blog" className="home-explore-link"><span>Field notes</span><strong>Ideas for teams that pay attention.</strong><i aria-hidden="true">↗</i></Link></div>
        </div>
      </section>
    </PageShell>
  );
}
