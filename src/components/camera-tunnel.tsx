"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSwitchSound, playSuccessSound } from "@/lib/sound";

const STAGES = [
  {
    step: "01",
    tag: "OUTBOUND CLICK",
    kicker: "01 / OUTBOUND LINK ATTACHED",
    title: "The context begins in the CRM.",
    desc: "A sales rep sends a single tracked link via email or LinkedIn. Account ID, contact metadata, and sequence stage attach automatically.",
    badge: "Deterministic Outbound Link",
    specs: ["Protocol: Direct Link", "Cookies: 0", "CRM: HubSpot / Salesforce"],
    icon: "✉️",
  },
  {
    step: "02",
    tag: "DETERMINISTIC TUNNEL",
    kicker: "02 / 11MS RESOLVE BUS",
    title: "Zero IP guessing. Zero latency.",
    desc: "As the prospect clicks, Churnaut verifies known identity at the edge in under 12ms. Without a verified signal, the session remains 100% anonymous.",
    badge: "11ms Edge Resolution",
    specs: ["Latency: 11.2ms", "Accuracy: 100%", "Fingerprinting: None"],
    icon: "⚡",
  },
  {
    step: "03",
    tag: "DOM MUTATION CHAMBER",
    kicker: "03 / LIVE DOM MUTATION",
    title: "The website responds dynamically.",
    desc: "Approved headlines, proof points, customer logos, and rep calendar embeds swap cleanly before first contentful paint.",
    badge: "Sub-Frame DOM Swap",
    specs: ["Flicker: 0ms", "Variants: Dynamic", "Security: SOC2 Clean"],
    icon: "🪄",
  },
  {
    step: "04",
    tag: "SCOUT NEURAL CORE",
    kicker: "04 / ACTIONABLE EVIDENCE",
    title: "Scout connects the visit to the deal.",
    desc: "The return visit becomes real sales evidence. Scout calculates deal velocity scores and dispatches a Slack brief with the exact next move.",
    badge: "Evidence-Grounded Intelligence",
    specs: ["Deal Score: 94 / 100", "Slack: Real-Time", "Action: Direct Outreach"],
    icon: "✦",
  },
];

export function CameraTunnel() {
  const [activeStage, setActiveStage] = useState(0);
  const stage = STAGES[activeStage];

  const handleStageChange = (idx: number) => {
    playSwitchSound();
    setActiveStage(idx);
    if (idx === 3) {
      playSuccessSound();
    }
  };

  return (
    <section className="camera-tunnel-section section-pad" id="tunnel" aria-labelledby="tunnel-title">
      <div className="tunnel-head">
        <div className="tunnel-title-row">
          <div>
            <p className="reference-kicker"><i /> SPATIAL SIGNAL JOURNEY</p>
            <h2 id="tunnel-title" className="section-title">
              Fly through the signal route<br /><em>from outbound click to deal brief.</em>
            </h2>
          </div>

          {/* Magnetic Stage Scrubber */}
          <div className="tunnel-scrubber" role="tablist">
            {STAGES.map((s, idx) => (
              <button
                key={s.step}
                type="button"
                role="tab"
                aria-selected={activeStage === idx}
                className={`scrubber-step-btn ${activeStage === idx ? "is-active" : ""}`}
                onClick={() => handleStageChange(idx)}
                data-cursor={`Stage ${s.step}`}
              >
                {activeStage === idx && (
                  <motion.span
                    layoutId="tunnel-active-pill"
                    className="scrubber-active-pill"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{s.step} {s.tag}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Spatial 3D Tunnel Chamber */}
      <div className="tunnel-chamber">
        <div className="tunnel-grid-bg" aria-hidden="true" />
        <div className="tunnel-laser-ring" aria-hidden="true" />

        <AnimatePresence mode="wait">
          <motion.div
            key={stage.step}
            className="tunnel-stage-card"
            initial={{ opacity: 0, scale: 0.94, z: -80 }}
            animate={{ opacity: 1, scale: 1, z: 0 }}
            exit={{ opacity: 0, scale: 1.06, z: 80 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="tunnel-card-header">
              <span className="tunnel-stage-kicker">{stage.kicker}</span>
              <span className="tunnel-stage-badge">{stage.badge}</span>
            </div>

            <div className="tunnel-card-body">
              <div className="tunnel-icon-box">{stage.icon}</div>
              <div className="tunnel-copy-box">
                <h3>{stage.title}</h3>
                <p>{stage.desc}</p>
              </div>
            </div>

            <div className="tunnel-card-specs">
              {stage.specs.map((spec, i) => (
                <span key={i} className="tunnel-spec-pill">{spec}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Timeline Track */}
        <div className="tunnel-progress-track">
          <div
            className="tunnel-progress-bar"
            style={{ width: `${((activeStage + 1) / STAGES.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
