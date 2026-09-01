"use client";

import React, { useState } from "react";
import { OdometerNumber } from "./odometer-counter";
import { MagneticButton } from "./magnetic-button";
import { TactileDial } from "./tactile-dial";
import { playSlideSound } from "@/lib/sound";

export function PipelineCalculator() {
  const [reps, setReps] = useState(8);
  const [dealSize, setDealSize] = useState(25000);
  const [monthlyOutbound, setMonthlyOutbound] = useState(1200);
  const [controlMode, setControlMode] = useState<"dials" | "sliders">("dials");

  const handleSliderChange = (setter: (v: number) => void, val: number, normalized: number) => {
    setter(val);
    playSlideSound(normalized);
  };

  // Calculations
  const totalOutboundYearly = reps * monthlyOutbound * 12;
  const estimatedReturnVisits = Math.round(totalOutboundYearly * 0.16);
  const blindPipelineLost = Math.round(reps * dealSize * 1.8);
  const recoveredRevenue = Math.round(blindPipelineLost * 2.4);
  const estimatedRoiMultiple = (recoveredRevenue / (399 * 12)).toFixed(1);

  return (
    <section className="pipeline-calc-section section-pad" id="calculator" aria-labelledby="calc-title">
      <div className="calc-head">
        <div className="calc-title-row">
          <div>
            <p className="reference-kicker">PIPELINE SIGNAL AUDIT</p>
            <h2 id="calc-title" className="section-title">
              How much revenue is<br /><em>leaking from blind returns?</em>
            </h2>
          </div>

          <div className="calc-mode-toggle">
            <button
              type="button"
              className={`mode-btn ${controlMode === "dials" ? "is-active" : ""}`}
              onClick={() => setControlMode("dials")}
              data-cursor="Dials"
            >
              Tactile Dials
            </button>
            <button
              type="button"
              className={`mode-btn ${controlMode === "sliders" ? "is-active" : ""}`}
              onClick={() => setControlMode("sliders")}
              data-cursor="Sliders"
            >
              Sliders
            </button>
          </div>
        </div>
        <p className="section-copy">
          When known prospects revisit your website after outreach, most teams never know until it is too late. Estimate your recoverable pipeline with Churnaut.
        </p>
      </div>

      <div className="calc-grid">
        {/* Sliders / Dials Box */}
        <div className="calc-sliders-card">
          {controlMode === "dials" ? (
            <div className="tactile-dials-stack">
              <TactileDial
                label="Sales Reps"
                min={2}
                max={50}
                step={1}
                value={reps}
                unit="Reps"
                onChange={setReps}
              />
              <TactileDial
                label="Average Deal Size"
                min={5000}
                max={100000}
                step={2500}
                value={dealSize}
                prefix="$"
                onChange={setDealSize}
              />
              <TactileDial
                label="Monthly Outbound / Rep"
                min={200}
                max={5000}
                step={100}
                value={monthlyOutbound}
                unit="/ rep"
                onChange={setMonthlyOutbound}
              />
            </div>
          ) : (
            <>
              <div className="calc-slider-group">
                <div className="calc-slider-header">
                  <label htmlFor="calc-reps">Outbound Sales Reps</label>
                  <strong><OdometerNumber value={reps} /> Reps</strong>
                </div>
                <input
                  id="calc-reps"
                  type="range"
                  min="2"
                  max="50"
                  step="1"
                  value={reps}
                  onChange={(e) =>
                    handleSliderChange(setReps, parseInt(e.target.value, 10), (parseInt(e.target.value, 10) - 2) / 48)
                  }
                  className="calc-range-slider"
                />
              </div>

              <div className="calc-slider-group">
                <div className="calc-slider-header">
                  <label htmlFor="calc-dealsize">Average Contract Value (ACV)</label>
                  <strong><OdometerNumber prefix="$" value={dealSize} /></strong>
                </div>
                <input
                  id="calc-dealsize"
                  type="range"
                  min="5000"
                  max="100000"
                  step="2500"
                  value={dealSize}
                  onChange={(e) =>
                    handleSliderChange(setDealSize, parseInt(e.target.value, 10), (parseInt(e.target.value, 10) - 5000) / 95000)
                  }
                  className="calc-range-slider"
                />
              </div>

              <div className="calc-slider-group">
                <div className="calc-slider-header">
                  <label htmlFor="calc-outbound">Monthly Outbound Prospects / Rep</label>
                  <strong><OdometerNumber value={monthlyOutbound} /> / rep</strong>
                </div>
                <input
                  id="calc-outbound"
                  type="range"
                  min="200"
                  max="5000"
                  step="100"
                  value={monthlyOutbound}
                  onChange={(e) =>
                    handleSliderChange(setMonthlyOutbound, parseInt(e.target.value, 10), (parseInt(e.target.value, 10) - 200) / 4800)
                  }
                  className="calc-range-slider"
                />
              </div>
            </>
          )}

          <div className="calc-subtext">
            <span>⚡ Based on ~16% benchmark return visit rate on cold outbound clicks.</span>
          </div>
        </div>

        {/* Results Output Card */}
        <div className="calc-results-card">
          <div className="calc-result-badge">
            <span className="calc-pulse-dot" /> ESTIMATED ANNUAL IMPACT
          </div>

          <div className="calc-metric-row">
            <div>
              <small>Blind High-Intent Visits / Year</small>
              <h3 className="calc-metric-val">
                <OdometerNumber value={estimatedReturnVisits} />
              </h3>
            </div>
            <div>
              <small>Est. Pipeline Leaked</small>
              <h3 className="calc-metric-val text-coral">
                <OdometerNumber prefix="$" value={blindPipelineLost} />
              </h3>
            </div>
          </div>

          <div className="calc-recovered-box">
            <small>POTENTIAL RECOVERED PIPELINE / YEAR</small>
            <h2 className="calc-recovered-num">
              <OdometerNumber prefix="+$" value={recoveredRevenue} />
            </h2>
            <p>
              Yields an estimated <b>{estimatedRoiMultiple}x ROI</b> on your Churnaut Growth tier rollout.
            </p>
          </div>

          <MagneticButton
            href="https://cal.com/sharath.mb/demo"
            target="_blank"
            rel="noreferrer"
            beam
            data-cursor="Audit"
            className="button button-signal calc-cta-btn"
          >
            Get a Custom Pipeline Audit <span>↗</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
