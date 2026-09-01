"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OdometerNumber } from "./odometer-counter";
import { playSuccessSound, playSwitchSound } from "@/lib/sound";

interface CompanyPreset {
  id: string;
  name: string;
  domain: string;
  industry: string;
  persona: string;
  rep: string;
  headline: string;
  subhead: string;
  ctaText: string;
  dealScore: number;
  dealStatus: string;
  evidence: string[];
  nextMove: string;
}

const PRESETS: Record<string, CompanyPreset> = {
  stripe: {
    id: "stripe",
    name: "Stripe",
    domain: "stripe.com",
    industry: "Fintech & Payments",
    persona: "VP of Growth",
    rep: "Sarah Jenkins",
    headline: "Deterministic pipeline intelligence for Stripe's revenue team.",
    subhead: "Recognize known payment decision makers the second they open your outreach link.",
    ctaText: "Book demo with Sarah (Growth Rep)",
    dealScore: 94,
    dealStatus: "High Velocity",
    evidence: [
      "Opened cold outreach email sequence #2",
      "Revisited pricing page twice in 24 hours",
      "VP Growth & Tech Lead viewed Security Docs",
    ],
    nextMove: "Send custom enterprise rollout timeline and offer technical sandbox.",
  },
  linear: {
    id: "linear",
    name: "Linear",
    domain: "linear.app",
    industry: "Developer Tools",
    persona: "Head of Product",
    rep: "Alex Chen",
    headline: "Turn developer momentum into clear sales action for Linear.",
    subhead: "Carry the context earned in outbound all the way through their site visit.",
    ctaText: "Explore Linear routing workflow",
    dealScore: 88,
    dealStatus: "Warming Up",
    evidence: [
      "Clicked custom tracked link from LinkedIn message",
      "Spent 4m 12s on integrations and webhook architecture",
      "SOC2 compliance docs downloaded",
    ],
    nextMove: "Offer dedicated solutions engineering review call.",
  },
  ramp: {
    id: "ramp",
    name: "Ramp",
    domain: "ramp.com",
    industry: "Spend Management",
    persona: "VP of Sales",
    rep: "Marcus Vance",
    headline: "Stop losing known Ramp prospects at the moment of highest intent.",
    subhead: "Tailor headlines, ROI metrics and calendar embeds automatically in 11ms.",
    ctaText: "Schedule 15-min pilot setup",
    dealScore: 82,
    dealStatus: "Active Intent",
    evidence: [
      "Revisited ROI calculator from previous email thread",
      "Calculated savings for 35 sales reps",
      "Economic buyer returned to case studies",
    ],
    nextMove: "Follow up with pre-calculated ROI breakdown for their sales org.",
  },
};

export function SignalSimulator() {
  const [selectedId, setSelectedId] = useState<string>("stripe");
  const [customName, setCustomName] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const activePreset: CompanyPreset = isCustom
    ? {
        id: "custom",
        name: customName || "Acme Corp",
        domain: `${(customName || "acme").toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
        industry: "Enterprise SaaS",
        persona: "VP of Revenue",
        rep: "Sarah Jenkins",
        headline: `Deterministic personalization for ${(customName || "Acme Corp")}'s revenue team.`,
        subhead: `Carry the context from your outbound outreach into the website visit in real time.`,
        ctaText: `Schedule 15-min walk-through with Sarah`,
        dealScore: 89,
        dealStatus: "High Intent",
        evidence: [
          `Clicked tracked link from outbound campaign`,
          `Returned to pricing page for 2nd time this week`,
          `Deterministic session resolved in 11ms`,
        ],
        nextMove: `Follow up while buyer intent is fresh with tailored rollout schedule.`,
      }
    : PRESETS[selectedId] || PRESETS.stripe;

  const triggerSimulation = (presetId?: string) => {
    playSwitchSound();
    setIsSimulating(true);
    if (presetId) {
      setIsCustom(false);
      setSelectedId(presetId);
    }
    setTimeout(() => {
      setIsSimulating(false);
      playSuccessSound();
    }, 450);
  };

  return (
    <section className="signal-simulator-section section-pad" id="simulator" aria-labelledby="simulator-title">
      <div className="simulator-header">
        <div className="simulator-header-copy">
          <p className="reference-kicker">INTERACTIVE PRODUCT PLAYGROUND</p>
          <h2 id="simulator-title" className="section-title">
            Test the signal route<br /><em>in real time.</em>
          </h2>
          <p className="section-copy">
            Select an account or enter your own prospect company to watch Churnaut generate the tracked link, resolve deterministic session context in 11ms, and compute live Scout deal intelligence.
          </p>
        </div>

        {/* Account Selector Pill Tabs */}
        <div className="simulator-controls">
          <div className="simulator-preset-tabs">
            {Object.values(PRESETS).map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={`preset-tab-btn ${!isCustom && selectedId === preset.id ? "is-active" : ""}`}
                onClick={() => triggerSimulation(preset.id)}
                data-cursor="Select"
              >
                {!isCustom && selectedId === preset.id && (
                  <motion.span
                    layoutId="active-preset-pill"
                    className="preset-tab-indicator"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{preset.name}</span>
              </button>
            ))}
            <button
              type="button"
              className={`preset-tab-btn ${isCustom ? "is-active" : ""}`}
              onClick={() => {
                setIsCustom(true);
                triggerSimulation();
              }}
              data-cursor="Custom"
            >
              {isCustom && (
                <motion.span
                  layoutId="active-preset-pill"
                  className="preset-tab-indicator"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">Custom +</span>
            </button>
          </div>

          {isCustom && (
            <motion.div
              className="simulator-custom-input-wrap"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <input
                type="text"
                placeholder="Enter prospect company (e.g. Brex, Figma)..."
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="simulator-custom-input"
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Interactive 3-Stage Simulator Canvas */}
      <div className="simulator-workbench">
        {/* Step 1: Outbound Link Generation */}
        <div className="simulator-col simulator-col-link">
          <div className="sim-col-header">
            <span className="sim-step-badge">01</span>
            <strong>Tracked Outbound Link</strong>
          </div>
          <div className="sim-card sim-card-link">
            <div className="sim-link-meta">
              <span className="sim-rep-avatar">✦</span>
              <div>
                <small>Sent by {activePreset.rep}</small>
                <strong>To {activePreset.persona} @ {activePreset.name}</strong>
              </div>
            </div>
            <div className="sim-link-box">
              <code>
                https://churnaut.link/<b>{activePreset.id === "custom" ? (customName || "acme").toLowerCase() : activePreset.id}</b>-q3?rep=sarah
              </code>
              <span className="sim-copy-tag">Context Attached</span>
            </div>
            <p className="sim-note">
              No cookies required. Identity is grounded in the outbound link your prospect chose to click.
            </p>
          </div>
        </div>

        {/* Step 2: Live Browser Personalization Window */}
        <div className="simulator-col simulator-col-browser">
          <div className="sim-col-header">
            <span className="sim-step-badge">02</span>
            <strong>Dynamic Website Experience (11ms)</strong>
          </div>

          <div className="sim-browser-frame">
            <div className="sim-browser-topbar">
              <div className="sim-browser-dots">
                <i /><i /><i />
              </div>
              <div className="sim-browser-url">
                <span className="sim-lock-icon">🔒</span> https://www.yourproduct.com/<b>?ref=churnaut</b>
              </div>
              <span className="sim-latency-badge">⚡ 11ms Swap</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activePreset.name}-${isSimulating}`}
                className="sim-browser-content"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Laser Scanline Beam on DOM mutation */}
                <div className="sim-laser-scanline" />

                <div className="sim-prospect-banner">
                  <span>✦ WELCOME {activePreset.name.toUpperCase()} TEAM</span>
                </div>

                <div className="sim-inspectable-headline" data-cursor="Inspect">
                  <span className="sim-devtools-tag">#hero-title [480×64] · 11ms Swap</span>
                  <h3 className="sim-live-headline">{activePreset.headline}</h3>
                </div>

                <p className="sim-live-subhead">{activePreset.subhead}</p>
                <div className="sim-live-cta-row">
                  <button type="button" className="sim-live-cta-btn">
                    {activePreset.ctaText} <span>↗</span>
                  </button>
                  <span className="sim-rep-status">● Sarah is online</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Step 3: Scout AI Deal Intelligence Brief */}
        <div className="simulator-col simulator-col-scout">
          <div className="sim-col-header">
            <span className="sim-step-badge">03</span>
            <strong>Scout Deal Intelligence</strong>
          </div>

          <div className="sim-card sim-card-scout">
            <div className="sim-scout-top">
              <div className="sim-scout-account">
                <span className="sim-scout-spark">✦</span>
                <div>
                  <small>SCOUT&apos;S BRIEF</small>
                  <strong>{activePreset.name}</strong>
                </div>
              </div>
              <div className="sim-scout-score-box">
                <small>SCORE</small>
                <strong className="sim-score-num">
                  <OdometerNumber value={activePreset.dealScore} />
                </strong>
              </div>
            </div>

            <div className="sim-evidence-list">
              <span className="sim-evidence-title">EVIDENCE TRAIL</span>
              {activePreset.evidence.map((point, idx) => (
                <div key={idx} className="sim-evidence-item">
                  <i className="sim-evidence-check">✓</i>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="sim-next-move-box">
              <span className="sim-next-move-tag">SUGGESTED NEXT MOVE</span>
              <p>{activePreset.nextMove}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
