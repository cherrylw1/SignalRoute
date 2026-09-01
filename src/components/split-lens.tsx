"use client";

import React, { useState, useRef, useCallback } from "react";
import { playSlideSound, playSwitchSound } from "@/lib/sound";

export function SplitLens() {
  const [sliderPos, setSliderPos] = useState(50); // percentage (0 to 100)
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let pct = Math.max(0, Math.min(100, (x / rect.width) * 100));

    // Magnetic snap near edges
    if (pct < 4) pct = 0;
    if (pct > 96) pct = 100;

    setSliderPos(pct);
    playSlideSound(pct / 100);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const setToBlind = () => {
    playSwitchSound();
    setSliderPos(100);
  };

  const setToChurnaut = () => {
    playSwitchSound();
    setSliderPos(0);
  };

  const setSplit50 = () => {
    playSwitchSound();
    setSliderPos(50);
  };

  return (
    <section className="split-lens-section section-pad" id="comparison" aria-labelledby="split-lens-title">
      <div className="split-lens-head">
        <div className="split-head-row">
          <div>
            <p className="reference-kicker">THE TWO REALITIES</p>
            <h2 id="split-lens-title" className="section-title">
              Blind outbound<br /><em>versus deterministic signal.</em>
            </h2>
          </div>

          <div className="split-pill-toggle">
            <button
              type="button"
              className={`split-toggle-btn ${sliderPos > 70 ? "is-active" : ""}`}
              onClick={setToBlind}
              data-cursor="Blind"
            >
              ✕ Blind Outbound
            </button>
            <button
              type="button"
              className={`split-toggle-btn ${sliderPos > 30 && sliderPos <= 70 ? "is-active" : ""}`}
              onClick={setSplit50}
              data-cursor="Compare"
            >
              Split View
            </button>
            <button
              type="button"
              className={`split-toggle-btn ${sliderPos <= 30 ? "is-active" : ""}`}
              onClick={setToChurnaut}
              data-cursor="Signal"
            >
              ✦ With Churnaut
            </button>
          </div>
        </div>
        <p className="section-copy">
          Drag the lens or click the toggle to compare what happens when a prospect clicks your outreach link with and without Churnaut.
        </p>
      </div>

      <div
        className="split-lens-container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        data-cursor="Drag"
      >
        {/* Right Side (With Churnaut - Underlying Layer) */}
        <div className="split-layer layer-after">
          <div className="split-card-inner card-churnaut">
            <div className="split-status-pill pill-green">
              <span className="split-pulse-dot" /> WITH CHURNAUT · DETERMINISTIC CONTEXT
            </div>

            <div className="split-flow-grid">
              <div className="split-flow-step">
                <span className="split-step-num">01</span>
                <strong>Deterministic Resolve</strong>
                <p>Recognizes Maya @ Northstar in 11ms from direct outbound tracked link.</p>
              </div>
              <div className="split-flow-step">
                <span className="split-step-num">02</span>
                <strong>Live Dynamic Personalization</strong>
                <p>Hero headline & case studies swap to match Northstar&apos;s fintech stack.</p>
              </div>
              <div className="split-flow-step">
                <span className="split-step-num">03</span>
                <strong>Real-Time Scout Alert</strong>
                <p>Rep Sarah Jenkins receives Slack brief with exact pages viewed & next move.</p>
              </div>
            </div>

            <div className="split-outcome outcome-win">
              <strong>Outcome: Closed in 48 Hours</strong>
              <small>Rep follows up while buyer intent is hot, equipped with full visit evidence.</small>
            </div>
          </div>
        </div>

        {/* Left Side (Blind Outbound - Clipped Layer) */}
        <div
          className="split-layer layer-before"
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
        >
          <div className="split-card-inner card-blind">
            <div className="split-status-pill pill-gray">
              <span>✕</span> BLIND OUTBOUND · STATUS QUO
            </div>

            <div className="split-flow-grid">
              <div className="split-flow-step">
                <span className="split-step-num">01</span>
                <strong>Anonymous IP `192.168.1.1`</strong>
                <p>Website cannot identify visitor. No context carried over from outreach.</p>
              </div>
              <div className="split-flow-step">
                <span className="split-step-num">02</span>
                <strong>Generic One-Size Homepage</strong>
                <p>Prospect sees generic pitch, bounces after 18 seconds without converting.</p>
              </div>
              <div className="split-flow-step">
                <span className="split-step-num">03</span>
                <strong>Blind Follow-Up Guesswork</strong>
                <p>Rep sends cold follow-up email 5 days later: <em>&ldquo;Just bumping this...&rdquo;</em></p>
              </div>
            </div>

            <div className="split-outcome outcome-loss">
              <strong>Outcome: Stalled Deal Lost</strong>
              <small>Prospect went to a competitor who responded while intent was fresh.</small>
            </div>
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div className="split-divider-line" style={{ left: `${sliderPos}%` }}>
          <div className="split-handle-knob">
            <span>‹ ›</span>
          </div>
          <span className="split-laser-glow" />
        </div>
      </div>
    </section>
  );
}
