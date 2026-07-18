import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { PricingCards } from "@/components/pricing-cards";
import { ProductWindow } from "@/components/product-window";
import { ScoutPanel } from "@/components/scout-panel";
import { getAllBlogPosts } from "@/lib/blog";

export default async function Home() {
  const posts = (await getAllBlogPosts()).slice(0, 3);
  return (
    <PageShell overlay>
      <section className="hero">
        <div className="hero-landscape" /><div className="hero-veil" />
        <div className="hero-copy">
          <p className="eyebrow">● YOUR PROSPECT JUST LEANED IN</p>
          <h1 className="display">Know the moment<br />they&apos;re ready <em>to talk.</em></h1>
          <p className="lede">Churnaut turns known prospect visits into the conversations your team should have next—with deterministic signals, personalized pages, and evidence your reps can act on.</p>
          <div className="hero-actions"><a className="button button-ink" href="https://cal.com/sharath.mb/demo" target="_blank" rel="noreferrer">See Churnaut in action <span>↗</span></a><Link className="button button-outline" href="/product">Explore the signal <span>↓</span></Link></div>
          <p className="hero-proof">KNOWN PEOPLE · NO IP GUESSING · BUILT FOR B2B SAAS</p>
        </div>
        <div className="hero-note hero-note-left">01 / IDENTITY<b>Known from the link you sent.</b></div><div className="hero-note hero-note-right">02 / TIMING<b>Act while the visit still matters.</b></div>
        <div className="hero-dashboard"><ProductWindow /></div>
      </section>

      <section className="thesis section-pad"><p className="eyebrow">01 / THE SIGNAL</p><div className="thesis-copy"><p className="eyebrow">YOUR OUTBOUND STARTED THE CONVERSATION.</p><h2 className="section-title">Churnaut tells you <em>when</em> it becomes a real one.</h2><p className="section-copy">When someone clicks a tracked link you sent, they are no longer anonymous traffic. They are a known person with a reason to be on your site—and a moment your team can use.</p></div></section>

      <section className="signal-journey section-pad">
        <div className="split-heading"><div><p className="eyebrow">HOW IT WORKS</p><h2 className="section-title">From a quiet click<br />to a confident <em>next move.</em></h2></div><p className="section-copy">One lightweight link connects the person, the page and the CRM context your rep already earned.</p></div>
        <div className="journey-grid"><article className="journey-card"><span className="journey-card-number">01</span><h3>Send the link</h3><p>Create a tracked Churnaut link and use it in the outbound your team already sends.</p></article><article className="journey-card"><span className="journey-card-number">02</span><h3>Recognize the person</h3><p>When they arrive, Churnaut resolves the known session and applies the right page experience.</p></article><article className="journey-card"><span className="journey-card-number">03</span><h3>Move while it matters</h3><p>Your rep sees the visit, the page and the context needed to follow up with confidence.</p></article></div>
      </section>

      <section className="scout-story section-pad"><div className="scout-copy"><p className="eyebrow">02 / SCOUT AI</p><h2 className="section-title">Your pipeline<br />has a <em>pulse.</em></h2><p className="section-copy">Scout reads the story beneath CRM activity and website signals: deals gathering momentum, deals drifting, and the evidence behind the next move.</p><Link className="button button-ink" href="/scout">Meet Scout AI <span>→</span></Link></div><ScoutPanel /></section>

      <section className="privacy-story section-pad"><div><p className="eyebrow">03 / PRIVACY, RECLAIMED</p><h2 className="section-title">Signal, not<br /><em>surveillance.</em></h2><p className="section-copy">Churnaut starts with a link your prospect chose to click. It does not depend on probabilistic company identification or hidden IP matching. The result is cleaner context and a more respectful way to pay attention.</p><Link className="button button-outline" href="/privacy">Read our approach <span>→</span></Link></div><div className="privacy-orbit"><div className="privacy-core">KNOWN<br />FROM YOUR LINK</div><div className="proof-pill">✓ No IP guessing</div><div className="proof-pill">✓ Deterministic resolution</div><div className="proof-pill">✓ Your CRM stays yours</div></div></section>

      <section className="pricing-preview section-pad"><div className="split-heading"><div><p className="eyebrow">04 / SIMPLE PRICING</p><h2 className="section-title">Make every<br /><em>signal count.</em></h2></div><p className="section-copy">Plans for founder-led teams first, with room to grow into a complete signal system.</p></div><PricingCards /></section>

      <section className="journal-preview section-pad"><div className="split-heading"><div><p className="eyebrow">05 / FIELD NOTES</p><h2 className="section-title">What we&apos;re learning<br />from the <em>signal.</em></h2></div><Link className="button button-outline" href="/blog">Read all field notes <span>→</span></Link></div><div className="journal-grid">{posts.map((post) => <Link className="journal-card" href={`/blog/${post.slug}`} key={post.slug}><time>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time><h3>{post.title}</h3><p>{post.description}</p></Link>)}</div></section>
    </PageShell>
  );
}
