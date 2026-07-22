import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { PricingCards } from "@/components/pricing-cards";
import { HeroSignalScene } from "@/components/hero-signal-scene";
import { PrivacyBoundary, ScoutEvidenceScene, SignalMechanism } from "@/components/home-signal-system";
import { ScrollSignalFilm } from "@/components/scroll-signal-film";
import { LaunchFilmLink, LaunchFilmSection } from "@/components/launch-film";
import { getAllBlogPosts } from "@/lib/blog";

export default async function Home() {
  const posts = (await getAllBlogPosts()).slice(0, 3);
  return (
    <PageShell overlay>
      <section className="hero">
        <div className="hero-sky" aria-hidden="true"><i /><i /><i /></div>
        <div className="hero-contours" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-live"><i /> A known prospect is on your site</p>
            <h1>Your outreach found the person.<br /><strong>Churnaut catches the moment.</strong></h1>
            <p className="lede">Carry the context your rep earned into the website visit. Personalize the page, see who leaned in and act with evidence while intent is still fresh.</p>
            <div className="hero-actions"><a className="button button-ink" href="https://cal.com/sharath.mb/demo" target="_blank" rel="noreferrer">See Churnaut in action</a><LaunchFilmLink /></div>
            <ul className="hero-proof" aria-label="Churnaut product principles"><li>Known from your link</li><li>No IP guessing</li><li>Built for B2B sales</li></ul>
          </div>
          <div className="hero-visual"><HeroSignalScene /></div>
        </div>
        <p className="hero-footnote">ONE LINK / ONE KNOWN VISITOR / ONE MOMENT THAT MATTERS</p>
      </section>

      <LaunchFilmSection />

      <ScrollSignalFilm />

      <section className="signal-system section-pad">
        <div className="signal-system-intro"><p className="section-index">01 / THE SIGNAL</p><div><h2>One link carries the context <strong>all the way through.</strong></h2><p>When someone clicks a tracked link you sent, they are no longer anonymous traffic. Churnaut connects the person, the page and the CRM context your rep already earned.</p></div></div>
        <SignalMechanism />
      </section>

      <section className="scout-system section-pad"><div className="scout-system-copy"><p className="section-index">02 / SCOUT AI</p><h2>Your pipeline has a pulse. <strong>Scout explains the change.</strong></h2><p>Scout reads the story beneath CRM activity and website signals: deals gathering momentum, deals drifting and the evidence behind the next move.</p><Link className="button button-signal" href="/scout">Meet Scout AI</Link></div><ScoutEvidenceScene /></section>

      <section className="privacy-system section-pad"><div className="privacy-system-copy"><p className="section-index">03 / PRIVACY, RECLAIMED</p><h2>Signal, <strong>not surveillance.</strong></h2><p>Churnaut starts with a link your prospect chose to click. It does not depend on probabilistic company identification or hidden IP matching.</p><Link className="button button-ink" href="/privacy">Read our approach</Link></div><PrivacyBoundary /></section>

      <section className="pricing-preview section-pad"><div className="pricing-heading"><p className="section-index">04 / SIMPLE PRICING</p><div><h2>Start with the signal. <strong>Grow into the system.</strong></h2><p>Clear monthly plans for founder-led teams first, with room to grow into a complete signal system.</p></div></div><PricingCards /></section>

      <section className="journal-preview section-pad"><div className="journal-heading"><div><p className="section-index">05 / FIELD NOTES</p><h2>Ideas for teams that <strong>pay attention.</strong></h2></div><Link className="button button-outline" href="/blog">Read all Field Notes</Link></div><div className="journal-grid">{posts.map((post) => <Link className="journal-card" href={`/blog/${post.slug}`} key={post.slug}><time>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time><h3>{post.title}</h3><p>{post.description}</p><span>Read Field Note</span></Link>)}</div></section>
    </PageShell>
  );
}
