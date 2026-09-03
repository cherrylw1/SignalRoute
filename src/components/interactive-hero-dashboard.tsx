"use client";

import { useState, useEffect } from "react";
import { playSwitchSound, playSuccessSound } from "@/lib/sound";

interface SignalDetail {
  id: string;
  step: number;
  type: string;
  title: string;
  desc: string;
  badgeText: string;
  badgeColor: string;
  accentColor: string;
  bgLight: string;
  icon: "radar" | "return" | "eye";
}

interface AccountData {
  name: string;
  domain: string;
  pipeline: string;
  committee: string;
  recent: string;
  momentum: string;
  nextAction: string;
  rep: string;
  signals: SignalDetail[];
}

const ACCOUNTS: Record<string, AccountData> = {
  northstar: {
    name: "NORTHSTAR LABS",
    domain: "northstarlabs.com",
    pipeline: "$120,000 ARR",
    committee: "3 Active Stakeholders",
    recent: "Pricing & Enterprise Terms",
    momentum: "88% High Velocity",
    nextAction: "Trigger personalized outreach to Sarah Jenkins with enterprise pilot.",
    rep: "Sarah Jenkins",
    signals: [
      {
        id: "s1",
        step: 1,
        type: "high_intent",
        title: "HIGH INTENT",
        desc: "Northstar Labs viewed pricing page and explored enterprise plans.",
        badgeText: "High",
        badgeColor: "#df6344",
        accentColor: "#df6344",
        bgLight: "#fff1ec",
        icon: "radar",
      },
      {
        id: "s2",
        step: 2,
        type: "return_visit",
        title: "RETURN VISIT",
        desc: "Northstar Labs returned to the site and visited the integrations page.",
        badgeText: "Medium",
        badgeColor: "#5b8a74",
        accentColor: "#5b8a74",
        bgLight: "#eff6f2",
        icon: "return",
      },
      {
        id: "s3",
        step: 3,
        type: "known_account",
        title: "KNOWN ACCOUNT",
        desc: "Northstar Labs is a known account and matches your ideal customer profile.",
        badgeText: "Info",
        badgeColor: "#c2874a",
        accentColor: "#c2874a",
        bgLight: "#fcf4eb",
        icon: "eye",
      },
    ],
  },
  datadog: {
    name: "DATADOG SYSTEMS",
    domain: "datadoghq.com",
    pipeline: "$240,000 ARR",
    committee: "5 Active Stakeholders",
    recent: "API Docs & SOC2 Compliance",
    momentum: "94% High Velocity",
    nextAction: "Send technical architecture sandbox access to VP of Infrastructure.",
    rep: "Alex Chen",
    signals: [
      {
        id: "s1",
        step: 1,
        type: "high_intent",
        title: "HIGH INTENT",
        desc: "Datadog reviewed technical security docs and latency benchmarks.",
        badgeText: "Critical",
        badgeColor: "#df6344",
        accentColor: "#df6344",
        bgLight: "#fff1ec",
        icon: "radar",
      },
      {
        id: "s2",
        step: 2,
        type: "return_visit",
        title: "RETURN VISIT",
        desc: "Lead engineer returned 14m later via direct link to verify SLA uptime.",
        badgeText: "High",
        badgeColor: "#5b8a74",
        accentColor: "#5b8a74",
        bgLight: "#eff6f2",
        icon: "return",
      },
      {
        id: "s3",
        step: 3,
        type: "known_account",
        title: "KNOWN ACCOUNT",
        desc: "Enterprise Tier 1 account matched with active outbound campaign.",
        badgeText: "Tier 1",
        badgeColor: "#c2874a",
        accentColor: "#c2874a",
        bgLight: "#fcf4eb",
        icon: "eye",
      },
    ],
  },
};

interface InteractiveHeroDashboardProps {
  hoveredBadge?: string | null;
}

export function InteractiveHeroDashboard({ hoveredBadge }: InteractiveHeroDashboardProps) {
  const [selectedAccountKey, setSelectedAccountKey] = useState<string>("northstar");
  const [activeSignalIndex, setActiveSignalIndex] = useState<number>(0);
  const [activeNavTab, setActiveNavTab] = useState<string>("signals");
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<"signals" | "route" | "summary">("signals");

  // Sync mobile tab if a badge is hovered
  useEffect(() => {
    if (hoveredBadge === "maya") setMobileTab("signals");
    else if (hoveredBadge === "swap") setMobileTab("route");
    else if (hoveredBadge === "scout") setMobileTab("summary");
  }, [hoveredBadge]);

  const currentAccount = ACCOUNTS[selectedAccountKey] || ACCOUNTS.northstar;

  const handleSignalClick = (index: number) => {
    playSwitchSound();
    setActiveSignalIndex(index);
  };

  const handleNextActionClick = () => {
    playSuccessSound();
    setIsDispatched(true);
    setTimeout(() => {
      setIsDispatched(false);
    }, 3200);
  };

  const handleSwitchAccount = (key: string) => {
    playSwitchSound();
    setSelectedAccountKey(key);
    setActiveSignalIndex(0);
    setIsDispatched(false);
  };

  return (
    <div className={`hero-interactive-dashboard ${hoveredBadge ? `focus-${hoveredBadge}` : ""}`}>
      {/* 1. Left Rail / Sidebar */}
      <aside className="ihd-sidebar" aria-label="Dashboard navigation">
        <div className="ihd-logo-box">
          <div className="ihd-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
            </svg>
          </div>
        </div>

        <nav className="ihd-nav-items">
          <button
            type="button"
            className={`ihd-nav-btn ${activeNavTab === "home" ? "is-active" : ""}`}
            onClick={() => { playSwitchSound(); setActiveNavTab("home"); }}
            title="Home"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </button>

          <button
            type="button"
            className={`ihd-nav-btn ${activeNavTab === "signals" ? "is-active" : ""}`}
            onClick={() => { playSwitchSound(); setActiveNavTab("signals"); }}
            title="Signals & Route"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </button>

          <button
            type="button"
            className={`ihd-nav-btn ${activeNavTab === "team" ? "is-active" : ""}`}
            onClick={() => { playSwitchSound(); setActiveNavTab("team"); }}
            title="Accounts"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </button>

          <button
            type="button"
            className={`ihd-nav-btn ${activeNavTab === "notifications" ? "is-active" : ""}`}
            onClick={() => { playSwitchSound(); setActiveNavTab("notifications"); }}
            title="Alerts"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>

          <button
            type="button"
            className={`ihd-nav-btn ${activeNavTab === "settings" ? "is-active" : ""}`}
            onClick={() => { playSwitchSound(); setActiveNavTab("settings"); }}
            title="Settings"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </nav>

        <div className="ihd-sidebar-bottom">
          <div className="ihd-status-orb" title="System Live" />
        </div>
      </aside>

      {/* Mobile Tab Switcher */}
      <div className="ihd-mobile-tab-bar" role="tablist" aria-label="Dashboard views">
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === "signals"}
          className={`ihd-tab-btn ${mobileTab === "signals" ? "is-active" : ""}`}
          onClick={() => {
            playSwitchSound();
            setMobileTab("signals");
          }}
        >
          ✦ Signals ({currentAccount.signals.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === "route"}
          className={`ihd-tab-btn ${mobileTab === "route" ? "is-active" : ""}`}
          onClick={() => {
            playSwitchSound();
            setMobileTab("route");
          }}
        >
          ⚡ Live Route
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === "summary"}
          className={`ihd-tab-btn ${mobileTab === "summary" ? "is-active" : ""}`}
          onClick={() => {
            playSwitchSound();
            setMobileTab("summary");
          }}
        >
          🎯 Scout Action
        </button>
      </div>

      {/* 2. Main Dashboard Application Body */}
      <main className="ihd-body">
        {/* Column 1: SIGNALS */}
        <section className={`ihd-col ihd-col-signals ${mobileTab === "signals" ? "is-mobile-active" : ""}`}>
          <div className="ihd-col-header">
            <h3>SIGNALS</h3>
            <div className="ihd-account-pill-switch">
              <button
                type="button"
                className={`ihd-acc-btn ${selectedAccountKey === "northstar" ? "is-active" : ""}`}
                onClick={() => handleSwitchAccount("northstar")}
              >
                Northstar
              </button>
              <button
                type="button"
                className={`ihd-acc-btn ${selectedAccountKey === "datadog" ? "is-active" : ""}`}
                onClick={() => handleSwitchAccount("datadog")}
              >
                Datadog
              </button>
            </div>
          </div>

          <div className="ihd-signals-list">
            {currentAccount.signals.map((signal, idx) => {
              const isActive = activeSignalIndex === idx;
              return (
                <article
                  key={signal.id}
                  className={`ihd-signal-card ${isActive ? "is-active" : ""}`}
                  onClick={() => handleSignalClick(idx)}
                  style={{ "--accent-color": signal.accentColor } as React.CSSProperties}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                >
                  <div className="ihd-card-strip" style={{ backgroundColor: signal.accentColor }} />
                  <div className="ihd-card-icon-box" style={{ backgroundColor: signal.bgLight, color: signal.accentColor }}>
                    {signal.icon === "radar" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="12" cy="12" r="3" />
                        <circle cx="12" cy="12" r="7" strokeDasharray="3 3" />
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.4" />
                      </svg>
                    )}
                    {signal.icon === "return" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 14 4 9 9 4" />
                        <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
                      </svg>
                    )}
                    {signal.icon === "eye" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </div>

                  <div className="ihd-card-content">
                    <div className="ihd-card-top-row">
                      <h4>{signal.title}</h4>
                      <span className="ihd-chevron">›</span>
                    </div>
                    <p>{signal.desc}</p>
                    <span className="ihd-tag-pill" style={{ backgroundColor: signal.badgeColor }}>
                      {signal.badgeText}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Column 2: SIGNAL ROUTE */}
        <section className={`ihd-col ihd-col-route ${mobileTab === "route" ? "is-mobile-active" : ""}`}>
          <div className="ihd-col-header">
            <h3>SIGNAL ROUTE</h3>
            <span className="ihd-route-live-badge">
              <i className="ihd-pulse-dot" /> 11ms Deterministic
            </span>
          </div>

          <div className="ihd-route-tree">
            {currentAccount.signals.map((signal, idx) => {
              const isActive = activeSignalIndex === idx;
              const isFirst = idx === 0;
              const isLast = idx === currentAccount.signals.length - 1;

              return (
                <div key={`node-${signal.id}`} className="ihd-route-step-container">
                  <div
                    className={`ihd-route-step-row ${isActive ? "is-active" : ""}`}
                    onClick={() => handleSignalClick(idx)}
                    role="button"
                    tabIndex={0}
                  >
                    {/* Visual Node */}
                    <div
                      className={`ihd-route-node-orb ${isFirst ? "orb-glow-orange" : ""}`}
                      style={{
                        backgroundColor: isFirst ? "#df6344" : signal.bgLight,
                        borderColor: signal.accentColor,
                        color: isFirst ? "#ffffff" : signal.accentColor,
                      }}
                    >
                      {signal.icon === "radar" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="3" fill="currentColor" />
                          <circle cx="12" cy="12" r="6.5" />
                          <circle cx="12" cy="12" r="9.5" strokeDasharray="2 2" />
                        </svg>
                      )}
                      {signal.icon === "return" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 14 4 9 9 4" />
                          <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
                        </svg>
                      )}
                      {signal.icon === "eye" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                          <path d="M3 21h18M5 21V7l8-4v18M13 21V11l6 3v7" />
                        </svg>
                      )}
                    </div>

                    {/* Node Text */}
                    <div className="ihd-route-node-text">
                      <div className="ihd-node-headline">
                        <span className="ihd-step-number" style={{ backgroundColor: signal.accentColor }}>
                          {signal.step}
                        </span>
                        <strong>{signal.title}</strong>
                      </div>
                      <p>{signal.desc}</p>
                    </div>
                  </div>

                  {/* Connecting Line with Animated Laser Photon */}
                  {!isLast && (
                    <div className="ihd-route-connector" aria-hidden="true">
                      <div className="ihd-connector-line" />
                      <div className="ihd-connector-laser" />
                      <div className="ihd-connector-arrow">↓</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Column 3: ACCOUNT SUMMARY & NEXT ACTION */}
        <section className={`ihd-col ihd-col-summary ${mobileTab === "summary" ? "is-mobile-active" : ""}`}>
          <div className="ihd-col-header">
            <h3>ACCOUNT SUMMARY</h3>
          </div>

          {/* Account Card */}
          <div className="ihd-summary-card">
            <div className="ihd-summary-avatar-box">
              <div className="ihd-summary-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 21h18M5 21V7l8-4v18M13 21V11l6 3v7" />
                </svg>
              </div>
            </div>

            <h4 className="ihd-summary-company">{currentAccount.name}</h4>

            <div className="ihd-summary-attributes">
              <div className="ihd-attr-row">
                <span className="ihd-attr-icon" title="Pipeline Value">◎</span>
                <span className="ihd-attr-val">{currentAccount.pipeline}</span>
              </div>
              <div className="ihd-attr-row">
                <span className="ihd-attr-icon" title="Buying Committee">⁖</span>
                <span className="ihd-attr-val">{currentAccount.committee}</span>
              </div>
              <div className="ihd-attr-row">
                <span className="ihd-attr-icon" title="Recent Visit">▢</span>
                <span className="ihd-attr-val">{currentAccount.recent}</span>
              </div>
              <div className="ihd-attr-row">
                <span className="ihd-attr-icon" title="Momentum Score">≈</span>
                <span className="ihd-attr-val">{currentAccount.momentum}</span>
              </div>
            </div>
          </div>

          {/* Next Action Box */}
          <div className="ihd-next-action-card">
            <h4>NEXT ACTION</h4>
            <div className="ihd-action-row">
              <button
                type="button"
                className={`ihd-action-arrow-btn ${isDispatched ? "is-dispatched" : ""}`}
                onClick={handleNextActionClick}
                data-cursor="Dispatch"
                title="Execute Next Action"
              >
                {isDispatched ? "✓" : "→"}
              </button>
              <p className="ihd-action-desc">
                {isDispatched ? (
                  <strong className="ihd-dispatched-text">
                    Dispatched to Slack & HubSpot · Rep Notified!
                  </strong>
                ) : (
                  currentAccount.nextAction
                )}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
