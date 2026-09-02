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
import { SpatialDeckSection } from "@/components/spatial-deck-section";
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

      {/* Plate 1: Hero Stage (Vibrant Orange Canvas & Center Tablet) */}
      <ReferenceHero />

      {/* Plate 2: Trust Pillars & Identity Statement (Warm Paper) */}
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

      {/* Plate 3: Signal Simulator (Interactive Account Simulation) */}
      <SpatialDeckSection id="simulator" zIndex={10} theme="paper">
        <SignalSimulator />
      </SpatialDeckSection>

      {/* Plate 4: 11ms Camera Tunnel (Hardware-Grade Resolution Bus) */}
      <SpatialDeckSection id="tunnel" zIndex={20} theme="dark">
        <CameraTunnel />
      </SpatialDeckSection>

      {/* Plate 5: Deal Intelligence Bento Grid */}
      <SpatialDeckSection id="bento" zIndex={30} theme="paper">
        <BentoGrid />
      </SpatialDeckSection>

      {/* Plate 6: Cable Patch Bay (Interactive Node Wiring) */}
      <SpatialDeckSection id="patchbay" zIndex={40} theme="dark">
        <CablePatchBay />
      </SpatialDeckSection>

      {/* Plate 7: Split Lens (Before / After Transformation) */}
      <SpatialDeckSection id="lens" zIndex={50} theme="paper">
        <SplitLens />
      </SpatialDeckSection>

      {/* Plate 8: Reference Proof (Scout Deal Briefs) */}
      <SpatialDeckSection id="proof" zIndex={60} theme="paper">
        <ReferenceProof />
      </SpatialDeckSection>

      {/* Plate 9: Telemetry Terminal (Real-time Packet Bus) */}
      <SpatialDeckSection id="telemetry" zIndex={70} theme="dark">
        <TelemetryTerminal />
      </SpatialDeckSection>

      {/* Plate 10: Pipeline Calculator (Interactive ROI Simulator) */}
      <SpatialDeckSection id="calculator" zIndex={80} theme="paper">
        <PipelineCalculator />
      </SpatialDeckSection>

      {/* Plate 11: Privacy Boundary (The Identity Boundary) */}
      <SpatialDeckSection id="privacy" zIndex={90} theme="paper" ariaLabelledby="reference-privacy-title">
        <div className="reference-privacy" aria-labelledby="reference-privacy-title">
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
        </div>
      </SpatialDeckSection>

      {/* Plate 12: Precision Edge-Lit Pricing (Dark Forest & Lime Luxury Chassis) */}
      <SpatialDeckSection id="pricing" zIndex={100} theme="forest" ariaLabelledby="reference-pricing-title">
        <div className="reference-pricing" aria-labelledby="reference-pricing-title">
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
        </div>
      </SpatialDeckSection>

      {/* Plate 13: Technical FAQ Accordion */}
      <SpatialDeckSection id="faq" zIndex={110} theme="dark">
        <ReferenceFaq />
      </SpatialDeckSection>
    </PageShell>
  );
}
