"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OdometerNumber } from "./odometer-counter";
import { playSuccessSound, playSwitchSound } from "@/lib/sound";

export function BentoGrid() {
  const [copied, setCopied] = useState(false);
  const [domVariant, setDomVariant] = useState<"default" | "personalized">("personalized");

  const handleCopyLink = () => {
    playSuccessSound();
    navigator.clipboard?.writeText("https://churnaut.link/northstar-q3?rep=sarah");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVariantToggle = (variant: "default" | "personalized") => {
    playSwitchSound();
    setDomVariant(variant);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = ((y - centerY) / centerY) * -4;
    const ry = ((x - centerX) / centerX) * 4;
    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
    card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <section className="bento-section section-pad" id="how-it-works" aria-labelledby="bento-title">
      <div className="bento-head">
        <p className="reference-kicker"><i /> THE SIGNAL ARCHITECTURE</p>
        <h2 id="bento-title" className="section-title">
          How context travels from<br /><em>outbound link to closed deal.</em>
        </h2>
        <p className="section-copy">
          Four deterministic mechanisms that turn cold outreach into personalized website visits and evidence-grounded sales action.
        </p>
      </div>

      <div className="bento-grid-container">
        {/* Card 1: Outbound Link Engine (Large) */}
        <motion.div
          className="bento-card bento-card-wide has-border-beam"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bento-card-top">
            <span className="bento-step-tag">01 / OUTBOUND</span>
            <span className="bento-pulse-pip">● CRM SYNCED</span>
          </div>

          <div className="bento-copy">
            <h3>The message carries the context.</h3>
            <p>
              Your sales rep sends one tracked link. Account ID, prospect name and sequence metadata attach automatically from your CRM.
            </p>
          </div>

          <div className="bento-interactive-link-box">
            <div className="bento-url-bar">
              <span className="bento-link-icon">🔗</span>
              <code>
                https://churnaut.link/<b>northstar-q3</b>?rep=sarah&src=sequence_2
              </code>
            </div>
            <button
              type="button"
              className={`bento-copy-btn ${copied ? "is-copied" : ""}`}
              onClick={handleCopyLink}
              data-cursor="Copy"
            >
              {copied ? "✓ Copied" : "Copy Link"}
            </button>
          </div>

          <div className="bento-tag-row">
            <span className="bento-meta-pill">HubSpot Sync</span>
            <span className="bento-meta-pill">Sequence #2</span>
            <span className="bento-meta-pill">Rep: Sarah J.</span>
          </div>
        </motion.div>

        {/* Card 2: 11ms Deterministic Resolve (Compact) */}
        <motion.div
          className="bento-card bento-card-compact"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bento-card-top">
            <span className="bento-step-tag">02 / RESOLVE</span>
            <span className="bento-latency-tag">⚡ 11MS SPEED</span>
          </div>

          <div className="bento-copy">
            <h3>Zero IP Guessing.</h3>
            <p>
              When the link opens, Churnaut resolves known context deterministically. Without a signal, the visitor stays 100% anonymous.
            </p>
          </div>

          <div className="bento-gauge-box">
            <div className="bento-speedometer">
              <svg viewBox="0 0 100 60" className="gauge-svg">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(20,57,52,0.15)" strokeWidth="8" strokeLinecap="round" />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#dfff5b"
                  strokeWidth="8"
                  strokeDasharray="125"
                  strokeDashoffset="25"
                  strokeLinecap="round"
                  className="gauge-arc-active"
                />
              </svg>
              <div className="gauge-value">
                <strong>11ms</strong>
                <small>RESOLVE TIME</small>
              </div>
            </div>
            <div className="bento-guarantee-pills">
              <span>✓ 0 Cookies Required</span>
              <span>✓ 0 Probabilistic IP Guessing</span>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Live DOM Rule Swapper (Compact / Medium) */}
        <motion.div
          className="bento-card bento-card-compact"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bento-card-top">
            <span className="bento-step-tag">03 / PERSONALIZE</span>
            <div className="bento-variant-toggle">
              <button
                type="button"
                className={`variant-toggle-btn ${domVariant === "default" ? "is-active" : ""}`}
                onClick={() => handleVariantToggle("default")}
                data-cursor="Default"
              >
                Default
              </button>
              <button
                type="button"
                className={`variant-toggle-btn ${domVariant === "personalized" ? "is-active" : ""}`}
                onClick={() => handleVariantToggle("personalized")}
                data-cursor="Personalized"
              >
                Live Swap
              </button>
            </div>
          </div>

          <div className="bento-copy">
            <h3>The website responds.</h3>
            <p>Approved headlines, proof points and CTAs match the conversation before render.</p>
          </div>

          <div className="bento-dom-preview">
            <AnimatePresence mode="wait">
              {domVariant === "personalized" ? (
                <motion.div
                  key="personalized"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="dom-preview-personalized"
                >
                  <span className="dom-match-badge">✦ Personalized for Northstar</span>
                  <strong>Enterprise checkout signals for Northstar&apos;s revenue team.</strong>
                  <div className="dom-cta-mock">Book demo with Sarah <span>↗</span></div>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="dom-preview-default"
                >
                  <span className="dom-default-badge">Generic Anonymous Visit</span>
                  <strong>The modern revenue platform for all B2B sales teams.</strong>
                  <div className="dom-cta-mock-gray">Request general sales demo <span>↗</span></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Card 4: Scout Deal Intelligence Radar (Wide / Medium) */}
        <motion.div
          className="bento-card bento-card-wide"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bento-card-top">
            <span className="bento-step-tag">04 / ACT</span>
            <span className="bento-scout-badge">✦ SCOUT AI BRIEF</span>
          </div>

          <div className="bento-copy">
            <h3>A reason to act, not an alert.</h3>
            <p>
              Scout connects the return visit to deal history, surfaces what changed, and writes the next-step brief for the rep.
            </p>
          </div>

          <div className="bento-scout-row">
            <div className="bento-score-circle">
              <small>DEAL SCORE</small>
              <strong><OdometerNumber value={88} /></strong>
              <span className="bento-score-status">Warming Up</span>
            </div>

            <div className="bento-scout-evidence-box">
              <div className="bento-evidence-line">
                <i className="check-icon">✓</i>
                <span>Maya returned to pricing page (3rd visit this week)</span>
              </div>
              <div className="bento-evidence-line">
                <i className="check-icon">✓</i>
                <span>Tech Lead viewed SOC2 compliance doc</span>
              </div>
              <div className="bento-action-prompt">
                <b>Suggested Next Move:</b> Send custom rollout timeline to Maya before tomorrow&apos;s team sync.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
