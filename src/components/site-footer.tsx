import Link from "next/link";
import { Brand } from "./brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <div><p className="section-index">THE MOMENT IS HAPPENING NOW</p><h2>Don&apos;t let the signal <strong>go quiet.</strong></h2><p>Meet the people already leaning in, and make your next move while it still matters.</p><a className="button button-signal" href="https://cal.com/sharath.mb/demo" target="_blank" rel="noreferrer">See Churnaut in action</a></div>
        <div className="footer-signal" aria-hidden="true"><div><small>JUST NOW / PRICING</small><b>Maya from Northstar is back.</b><span>Third high-intent visit this week</span></div><i /><p>KNOWN FROM YOUR LINK</p></div>
      </div>
      <div className="footer-grid">
        <div className="footer-brand">
          <Brand inverse />
          <p>Deterministic website signals and deal intelligence for small B2B SaaS sales teams.</p>
        </div>
        <div><h3>Explore</h3><Link href="/product">Product</Link><Link href="/scout">Scout AI</Link><Link href="/pricing">Pricing</Link><Link href="/blog">Field notes</Link></div>
        <div><h3>Company</h3><Link href="/about">About</Link><Link href="/careers">Careers</Link><a href="mailto:support@churnaut.com">Contact</a><a href="https://app.churnaut.com" target="_blank" rel="noreferrer">Sign in</a></div>
        <div><h3>Legal</h3><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Churnaut Technologies</span><span>Built in Bengaluru for the moment that matters.</span></div>
    </footer>
  );
}
