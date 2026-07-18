import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function NotFound() { return <PageShell><section className="page-hero"><div className="page-hero-inner"><p className="eyebrow">404 · SIGNAL LOST</p><h1 className="display">This route went<br /><em>quiet.</em></h1><p className="lede">The page may have moved, or the link may no longer be active.</p><Link href="/" className="button button-ink">Return home <span>→</span></Link></div></section></PageShell>; }
