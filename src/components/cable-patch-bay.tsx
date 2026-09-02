"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { playRelaySnapSound, playSwitchSound } from "@/lib/sound";

interface Jack {
  id: string;
  label: string;
  meta: string;
  color: string;
}

interface Port {
  id: string;
  label: string;
  action: string;
  color: string;
}

const JACKS: Jack[] = [
  { id: "j1", label: "Outbound Sequence #2", meta: "Tracked Outbound Click", color: "#dfff5b" },
  { id: "j2", label: "Executive Re-visit (>3m)", meta: "Buying Committee Intent", color: "#df6344" },
  { id: "j3", label: "High ACV Account ($50k+)", meta: "Tier-1 Enterprise Deal", color: "#4ecdc4" },
];

const PORTS: Port[] = [
  { id: "p1", label: "11ms Hero Headline Swap", action: "DOM Mutation Active", color: "#dfff5b" },
  { id: "p2", label: "Scout Slack Deal Brief", action: "Real-Time Sales Alert", color: "#df6344" },
  { id: "p3", label: "VIP Calendar Embed", action: "Founder Demo Direct", color: "#4ecdc4" },
];

export function CablePatchBay() {
  const [connections, setConnections] = useState<Record<string, string>>({
    j1: "p1",
    j2: "p2",
    j3: "p3",
  });
  const [activeDragJack, setActiveDragJack] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [jackPositions, setJackPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [portPositions, setPortPositions] = useState<Record<string, { x: number; y: number }>>({});

  const measurePositions = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const jPos: Record<string, { x: number; y: number }> = {};
    JACKS.forEach((j) => {
      const el = document.getElementById(`jack-node-${j.id}`);
      if (el) {
        const r = el.getBoundingClientRect();
        jPos[j.id] = {
          x: r.left + r.width / 2 - containerRect.left,
          y: r.top + r.height / 2 - containerRect.top,
        };
      }
    });

    const pPos: Record<string, { x: number; y: number }> = {};
    PORTS.forEach((p) => {
      const el = document.getElementById(`port-node-${p.id}`);
      if (el) {
        const r = el.getBoundingClientRect();
        pPos[p.id] = {
          x: r.left + r.width / 2 - containerRect.left,
          y: r.top + r.height / 2 - containerRect.top,
        };
      }
    });

    setJackPositions(jPos);
    setPortPositions(pPos);
  }, []);

  useEffect(() => {
    measurePositions();
    window.addEventListener("resize", measurePositions);
    return () => window.removeEventListener("resize", measurePositions);
  }, [measurePositions]);

  const handleJackMouseDown = (jackId: string, e: React.MouseEvent) => {
    e.preventDefault();
    playSwitchSound();
    setActiveDragJack(jackId);

    if (containerRef.current) {
      const cr = containerRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - cr.left, y: e.clientY - cr.top });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!activeDragJack || !containerRef.current) return;
    const cr = containerRef.current.getBoundingClientRect();
    const curX = e.clientX - cr.left;
    const curY = e.clientY - cr.top;
    setMousePos({ x: curX, y: curY });

    // Check proximity to any port for magnetic snap
    PORTS.forEach((port) => {
      const pPos = portPositions[port.id];
      if (pPos) {
        const dist = Math.hypot(curX - pPos.x, curY - pPos.y);
        if (dist < 32 && connections[activeDragJack] !== port.id) {
          playRelaySnapSound();
          setConnections((prev) => ({ ...prev, [activeDragJack]: port.id }));
        }
      }
    });
  };

  const handleMouseUp = () => {
    if (activeDragJack) {
      setActiveDragJack(null);
    }
  };

  const resetAllCables = () => {
    playSwitchSound();
    setConnections({ j1: "p1", j2: "p2", j3: "p3" });
  };

  const clearAllCables = () => {
    playSwitchSound();
    setConnections({});
  };

  const activeCount = Object.keys(connections).length;

  return (
    <section className="patchbay-section section-pad" id="patchbay" aria-labelledby="patchbay-title">
      <div className="patchbay-head">
        <div className="patchbay-title-row">
          <div>
            <p className="reference-kicker"><i /> MODULAR SIGNAL CHASSIS</p>
            <h2 id="patchbay-title" className="section-title">
              Interactive Cable Patch-Bay.<br /><em>Route signals in real time.</em>
            </h2>
          </div>

          <div className="patchbay-actions">
            <button type="button" className="patchbay-ctrl-btn" onClick={resetAllCables} data-cursor="Reset">
              Auto-Route All
            </button>
            <button type="button" className="patchbay-ctrl-btn" onClick={clearAllCables} data-cursor="Clear">
              Disconnect
            </button>
          </div>
        </div>
        <p className="section-copy">
          Grab any glowing cable from the Signal Jacks on the left and drag it into an Action Port on the right to wire your deterministic route with magnetic snap feedback.
        </p>
      </div>

      <div
        className="patchbay-chassis"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Chassis Top Hardware Bar */}
        <div className="patchbay-topbar">
          <div className="patchbay-screws">
            <span className="screw" />
            <span className="screw" />
          </div>
          <div className="patchbay-status-meter">
            <span className="patchbay-status-dot" />
            <span>CHURNAUT 11MS MATRIX · <b>{activeCount} / 3 ACTIVE ROUTES</b></span>
          </div>
          <div className="patchbay-screws">
            <span className="screw" />
            <span className="screw" />
          </div>
        </div>

        {/* SVG Cable Rendering Layer */}
        <svg className="patchbay-cables-svg" aria-hidden="true">
          {/* Render Connected Cables */}
          {Object.entries(connections).map(([jackId, portId]) => {
            const start = jackPositions[jackId];
            const end = portPositions[portId];
            if (!start || !end) return null;

            const jack = JACKS.find((j) => j.id === jackId);
            const color = jack?.color || "#dfff5b";
            const dx = Math.abs(end.x - start.x) * 0.45;
            const sag = 45;

            const pathD = `M ${start.x} ${start.y} C ${start.x + dx} ${start.y + sag}, ${end.x - dx} ${end.y + sag}, ${end.x} ${end.y}`;

            return (
              <g key={`${jackId}-${portId}`} className="cable-group">
                {/* Outer Glow Wire */}
                <path d={pathD} fill="none" stroke={color} strokeWidth="6" strokeOpacity="0.25" strokeLinecap="round" />
                {/* Core Cable */}
                <path d={pathD} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
                {/* Traveling Photon Pulse */}
                <circle r="4" fill="#ffffff" filter="drop-shadow(0 0 6px #dfff5b)">
                  <animateMotion path={pathD} dur="2.2s" repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}

          {/* Render Currently Dragged Cable */}
          {activeDragJack && jackPositions[activeDragJack] && (
            <g className="cable-dragging">
              <path
                d={`M ${jackPositions[activeDragJack].x} ${jackPositions[activeDragJack].y} C ${jackPositions[activeDragJack].x + 60} ${jackPositions[activeDragJack].y + 40}, ${mousePos.x - 60} ${mousePos.y + 40}, ${mousePos.x} ${mousePos.y}`}
                fill="none"
                stroke="#dfff5b"
                strokeWidth="3.5"
                strokeDasharray="4 4"
              />
              <circle cx={mousePos.x} cy={mousePos.y} r="6" fill="#dfff5b" />
            </g>
          )}
        </svg>

        {/* Modular Jacks and Ports Grid */}
        <div className="patchbay-grid">
          {/* Signal Jacks Column */}
          <div className="patchbay-column">
            <span className="column-label">SIGNAL JACKS (INPUTS)</span>
            <div className="nodes-stack">
              {JACKS.map((jack) => {
                const isConnected = !!connections[jack.id];
                return (
                  <div key={jack.id} className={`node-card jack-card ${isConnected ? "is-connected" : ""}`}>
                    <div className="node-meta">
                      <strong>{jack.label}</strong>
                      <small>{jack.meta}</small>
                    </div>
                    <div
                      id={`jack-node-${jack.id}`}
                      className="patch-socket"
                      onMouseDown={(e) => handleJackMouseDown(jack.id, e)}
                      data-cursor="Drag Cable"
                      style={{ borderColor: jack.color }}
                    >
                      <span className="socket-inner" style={{ background: isConnected ? jack.color : "transparent" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center Hardware Divider */}
          <div className="patchbay-mid-rack">
            <span className="rack-rail" />
            <div className="rack-vu-display">
              <div className="vu-bar v-1" />
              <div className="vu-bar v-2" />
              <div className="vu-bar v-3" />
              <div className="vu-bar v-4" />
            </div>
            <span className="rack-rail" />
          </div>

          {/* Action Ports Column */}
          <div className="patchbay-column">
            <span className="column-label">ACTION PORTS (DESTINATIONS)</span>
            <div className="nodes-stack">
              {PORTS.map((port) => {
                const isTargeted = Object.values(connections).includes(port.id);
                return (
                  <div key={port.id} className={`node-card port-card ${isTargeted ? "is-connected" : ""}`}>
                    <div
                      id={`port-node-${port.id}`}
                      className="patch-socket"
                      style={{ borderColor: port.color }}
                    >
                      <span className="socket-inner" style={{ background: isTargeted ? port.color : "transparent" }} />
                    </div>
                    <div className="node-meta">
                      <strong>{port.label}</strong>
                      <small>{port.action}</small>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chassis Bottom Hardware Bar */}
        <div className="patchbay-bottombar">
          <small>DIRECT OUTBOUND CONTEXT · DETERMINISTIC RESOLVE BUS · ZERO THIRD-PARTY COOKIES</small>
        </div>
      </div>
    </section>
  );
}
