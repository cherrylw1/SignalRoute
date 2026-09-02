"use client";

import React, { useState, useEffect } from "react";
import { playClickSound, playSuccessSound } from "@/lib/sound";

interface Packet {
  id: string;
  time: string;
  domain: string;
  type: string;
  latency: string;
  intent: string;
  status: string;
  hex: string;
}

const INITIAL_PACKETS: Packet[] = [
  {
    id: "pkt-101",
    time: "00:14:02.11",
    domain: "stripe.com",
    type: "PRICING_REVISIT",
    latency: "11.2ms",
    intent: "+38% MOMENTUM",
    status: "SLACK DISPATCHED",
    hex: "0x7F 0x45 0x4C 0x46 0x02 0x01 0x01 0x00 0x53 0x54 0x52",
  },
  {
    id: "pkt-102",
    time: "00:14:04.89",
    domain: "linear.app",
    type: "DOCS_EXPLORE",
    latency: "10.8ms",
    intent: "SEC LEAD CONSENSUS",
    status: "SCOUT BRIEF #94",
    hex: "0x4C 0x49 0x4E 0x45 0x41 0x52 0x2D 0x53 0x4F 0x43 0x32",
  },
  {
    id: "pkt-103",
    time: "00:14:08.45",
    domain: "ramp.com",
    type: "ROI_CALCULATOR",
    latency: "11.6ms",
    intent: "35 REPS SIMULATION",
    status: "RECONNECT ALERT",
    hex: "0x52 0x41 0x4D 0x50 0x2D 0x52 0x4F 0x49 0x2D 0x33 0x35",
  },
  {
    id: "pkt-104",
    time: "00:14:11.20",
    domain: "figma.com",
    type: "OUTBOUND_OPEN",
    latency: "11.1ms",
    intent: "VP OF GROWTH",
    status: "HEADLINE SWAPPED",
    hex: "0x46 0x49 0x47 0x4D 0x41 0x2D 0x56 0x50 0x2D 0x47 0x52",
  },
];

export function TelemetryTerminal() {
  const [packets, setPackets] = useState<Packet[]>(INITIAL_PACKETS);
  const [viewMode, setViewMode] = useState<"live" | "hex">("live");
  const [packetCount, setPacketCount] = useState(104);

  useEffect(() => {
    const interval = setInterval(() => {
      const domains = ["vercel.com", "notion.so", "datadog.com", "brex.com", "snowflake.com"];
      const types = ["PRICING_VIEW", "SECURITY_PAGE", "FEATURE_COMPARE", "CASE_STUDY"];
      const randomDomain = domains[Math.floor(Math.random() * domains.length)];
      const randomType = types[Math.floor(Math.random() * types.length)];

      const now = new Date();
      const timeStr = `00:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}.${String(Math.floor(Math.random() * 99)).padStart(2, "0")}`;

      setPacketCount((c) => {
        const nextCount = c + 1;
        const newPkt: Packet = {
          id: `pkt-${nextCount}`,
          time: timeStr,
          domain: randomDomain,
          type: randomType,
          latency: `${(10.5 + Math.random() * 1.5).toFixed(1)}ms`,
          intent: `+${Math.floor(20 + Math.random() * 40)}% VELOCITY`,
          status: "DETERMINISTIC VERIFIED",
          hex: `0x${Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase()} 0x${Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase()}`,
        };

        setPackets((prev) => [newPkt, ...prev.slice(0, 5)]);
        return nextCount;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const injectTestSignal = () => {
    playSuccessSound();
    const now = new Date();
    const timeStr = `00:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}.99`;
    const injected: Packet = {
      id: `pkt-${packetCount + 1}`,
      time: timeStr,
      domain: "openai.com",
      type: "DIRECT_INJECTION",
      latency: "10.4ms",
      intent: "✦ TEST PROBE RESOLVED",
      status: "SCOUT BRIEF ACTIVE",
      hex: "0x4F 0x50 0x45 0x4E 0x41 0x49 0x2D 0x54 0x45 0x53 0x54",
    };
    setPackets((prev) => [injected, ...prev.slice(0, 5)]);
    setPacketCount((c) => c + 1);
  };

  return (
    <section className="telemetry-section section-pad" id="telemetry" aria-labelledby="telemetry-title">
      <div className="telemetry-head">
        <div className="telemetry-title-row">
          <div>
            <p className="reference-kicker"><i /> REAL-TIME DATA BUS</p>
            <h2 id="telemetry-title" className="section-title">
              Live Signal Telemetry.<br /><em>High-frequency packet radar.</em>
            </h2>
          </div>

          <div className="telemetry-controls">
            <button
              type="button"
              className={`telemetry-view-btn ${viewMode === "live" ? "is-active" : ""}`}
              onClick={() => {
                playClickSound();
                setViewMode("live");
              }}
              data-cursor="Live"
            >
              Deal View
            </button>
            <button
              type="button"
              className={`telemetry-view-btn ${viewMode === "hex" ? "is-active" : ""}`}
              onClick={() => {
                playClickSound();
                setViewMode("hex");
              }}
              data-cursor="Hex"
            >
              Hex Packets
            </button>
            <button
              type="button"
              className="telemetry-inject-btn"
              onClick={injectTestSignal}
              data-cursor="Inject"
            >
              ⚡ Inject Test Signal
            </button>
          </div>
        </div>
      </div>

      {/* CRT Phosphor Terminal HUD */}
      <div className="telemetry-terminal-frame">
        <div className="telemetry-topbar">
          <div className="telemetry-dots">
            <span className="t-dot t-red" />
            <span className="t-dot t-yellow" />
            <span className="t-dot t-green" />
          </div>
          <div className="telemetry-title-bar">
            <span>CHURNAUT EDGE TELEMETRY BUS · STREAMING LIVE</span>
          </div>
          <div className="telemetry-status-tag">
            <span className="telemetry-live-pip" /> 60 FPS
          </div>
        </div>

        <div className="telemetry-feed">
          {packets.map((pkt, idx) => (
            <div key={pkt.id} className={`telemetry-row ${idx === 0 ? "is-new" : ""}`}>
              <span className="telemetry-time">{pkt.time}</span>
              <span className="telemetry-domain">{pkt.domain}</span>
              <span className="telemetry-type">{pkt.type}</span>
              <span className="telemetry-latency">{pkt.latency}</span>
              <span className="telemetry-intent">{pkt.intent}</span>
              {viewMode === "hex" ? (
                <span className="telemetry-hex">{pkt.hex}</span>
              ) : (
                <span className="telemetry-status">{pkt.status}</span>
              )}
            </div>
          ))}
        </div>

        <div className="telemetry-footer">
          <span>PACKETS PROCESSED: {packetCount}</span>
          <span>AVERAGE RESOLVE: 11.2MS</span>
          <span>INTEGRITY: 100% DETERMINISTIC</span>
        </div>
      </div>
    </section>
  );
}
