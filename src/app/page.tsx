import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { PricingCards } from "@/components/pricing-cards";
import { SignalSimulator } from "@/components/signal-simulator";
import { BentoGrid } from "@/components/bento-grid";
import { SplitLens } from "@/components/split-lens";
import { PipelineCalculator } from "@/components/pipeline-calculator";
import { DynamicIsland } from "@/components/dynamic-island";
import { CablePatchBay } from "@/components/cable-patch-bay";
import { CameraTunnel } from "@/components/camera-tunnel";
import { TelemetryTerminal } from "@/components/telemetry-terminal";
import {
  ReferenceCursor,
  ReferenceFaq,
  ReferenceHero,
  ReferenceProof,
  ProgressiveStatement,
} from "@/components/reference-home";

export default function Home() {
  return (
    <PageShell overlay>
      <ReferenceCursor />
      <DynamicIsland />
      <ReferenceHero />

      <section className="reference-trust" aria-label="Churnaut product pillars">
        <p className="reference-kicker">A SIGNAL SYSTEM FOR REVENUE TEAMS</p>
        <div className="reference-trust-row">
          <span>Recognize the buyer</span>
          <span>Shape the visit</span>
          <span>Act with context</span>
          <span>Keep identity honest</span>
        </div>
      </section>

      <ProgressiveStatement />
      <SignalSimulator />
      <CameraTunnel />
      <BentoGrid />
      <CablePatchBay />
      <SplitLens />
      <ReferenceProof />
      <TelemetryTerminal />
      <PipelineCalculator />

      <section className="reference-privacy" id="privacy" aria-labelledby="reference-privacy-title">
        <div>
          <p className="reference-kicker"><i /> THE IDENTITY BOUNDARY</p>
          <h2 id="reference-privacy-title">Signal, not surveillance.</h2>
        </div>
        <div>
          <p>
            Churnaut begins with a link your prospect chose to click. When there is no known signal, the visitor stays anonymous.
          </p>
          <Link href="/privacy" className="reference-text-link" data-cursor="Open">
            Read our privacy approach <span>↗</span>
          </Link>
        </div>
      </section>

      <section className="reference-pricing" id="pricing" aria-labelledby="reference-pricing-title">
        <div className="reference-pricing-head">
          <div>
            <p className="reference-kicker"><i /> SIMPLE, FOUNDER-LED PRICING</p>
            <h2 id="reference-pricing-title">Choose how far the signal should travel.</h2>
          </div>
          <p>
            Start with the real product: known visits, approved personalization and evidence-grounded deal intelligence.
          </p>
        </div>
        <PricingCards />
        <p className="reference-pricing-note">
          Monthly and annual billing are available. Annual billing saves two months; usage limits reset monthly.
        </p>
      </section>

      <ReferenceFaq />
    </PageShell>
  );
}
